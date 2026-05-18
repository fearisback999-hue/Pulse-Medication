import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getResend } from "@/lib/email/resend";
import { confirmationEmailHtml } from "@/lib/email/templates/confirmation";
import { adminNotificationHtml } from "@/lib/email/templates/admin-notification";
import { SITE_CONFIG } from "@/lib/constants/site";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripeServer().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const registrationId = session.metadata?.registrationId;

    if (!registrationId) {
      console.error("No registrationId in session metadata");
      return NextResponse.json({ received: true });
    }

    const { data: existingPayment } = await supabase
      .from("payments")
      .select("id")
      .eq("stripe_session_id", session.id)
      .single();

    if (existingPayment) {
      return NextResponse.json({ received: true });
    }

    await supabase
      .from("registrations")
      .update({
        payment_status: "completed",
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .eq("id", registrationId);

    await supabase.from("payments").insert({
      registration_id: registrationId,
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      amount: session.amount_total || SITE_CONFIG.coursePrice,
      currency: session.currency || "usd",
      status: "succeeded",
      receipt_url: null,
    });

    const { data: registration } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (registration) {
      try {
        await getResend().emails.send({
          from: "Pulse Medication <noreply@pulsemedication.com>",
          to: registration.email,
          subject: "Enrollment Confirmed — EKG Monitor Tech Certification",
          html: confirmationEmailHtml({
            firstName: registration.first_name,
            courseName: registration.course_selection,
            courseDate: registration.course_date,
            amount: SITE_CONFIG.coursePriceDisplay,
          }),
        });

        const adminEmail = process.env.ADMIN_EMAIL || SITE_CONFIG.email;
        await getResend().emails.send({
          from: "Pulse Medication <noreply@pulsemedication.com>",
          to: adminEmail,
          subject: `New Registration: ${registration.first_name} ${registration.last_name}`,
          html: adminNotificationHtml({
            firstName: registration.first_name,
            lastName: registration.last_name,
            email: registration.email,
            phone: registration.phone,
            courseDate: registration.course_date,
            amount: SITE_CONFIG.coursePriceDisplay,
            registrationId,
          }),
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
      }
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const registrationId = session.metadata?.registrationId;

    if (registrationId) {
      await supabase
        .from("registrations")
        .update({ payment_status: "failed" })
        .eq("id", registrationId);
    }
  }

  return NextResponse.json({ received: true });
}
