import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";

const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;
const allowMock = process.env.ALLOW_MOCK_PAYMENTS === "true";

// Confirms with Stripe that a checkout session was actually paid before the
// UI is allowed to show "Payment Successful". Prevents anyone from faking the
// success screen by visiting /payment?success=true manually.
export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!stripeConfigured) {
      // In explicit dev/mock mode we let it through; otherwise never confirm.
      return NextResponse.json({ paid: allowMock });
    }

    if (!sessionId) {
      return NextResponse.json({ paid: false });
    }

    const session = await getStripeServer().checkout.sessions.retrieve(sessionId);

    return NextResponse.json({ paid: session.payment_status === "paid" });
  } catch (err) {
    console.error("[verify-session] error:", err);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
