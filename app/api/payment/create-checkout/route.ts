import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/server";
import { SITE_CONFIG } from "@/lib/constants/site";
import { COURSE_INFO } from "@/lib/constants/course";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;
// The fake-success fallback ONLY runs when explicitly opted in for local dev.
// Without this flag, missing keys must fail loudly so we never charge nothing
// while telling the customer "Payment Successful".
const allowMock = process.env.ALLOW_MOCK_PAYMENTS === "true";

export async function POST(request: Request) {
  try {
    const { registrationId } = await request.json();

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!supabaseConfigured || !stripeConfigured) {
      if (allowMock) {
        console.warn(
          "[checkout] ALLOW_MOCK_PAYMENTS=true — returning mock clientSecret (NO real charge).",
          { registrationId, supabaseConfigured, stripeConfigured }
        );
        return NextResponse.json({ clientSecret: "mock", mock: true });
      }
      console.error(
        "[checkout] Payment is not configured — refusing to fake a successful payment.",
        { supabaseConfigured, stripeConfigured }
      );
      return NextResponse.json(
        {
          error:
            "Payments are not configured yet. Please contact us to complete your enrollment.",
        },
        { status: 503 }
      );
    }

    const supabase = createAdminClient();
    const { data: registration, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (error || !registration) {
      return NextResponse.json(
        { error: "Registration not found. Please register first." },
        { status: 404 }
      );
    }

    if (registration.payment_status === "completed") {
      return NextResponse.json(
        { error: "Payment has already been completed for this registration." },
        { status: 400 }
      );
    }

    // Embedded Checkout keeps the customer on our /payment page instead of
    // redirecting to Stripe's hosted page. We return the session's
    // client_secret and mount Stripe's <EmbeddedCheckout> with it.
    const session = await getStripeServer().checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: SITE_CONFIG.coursePrice,
            product_data: {
              name: COURSE_INFO.title,
              description: `${COURSE_INFO.duration} — ${COURSE_INFO.hours} — ${COURSE_INFO.format}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${siteUrl}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
      customer_email: registration.email,
      metadata: { registrationId },
    });

    await supabase
      .from("registrations")
      .update({ stripe_session_id: session.id })
      .eq("id", registrationId);

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
