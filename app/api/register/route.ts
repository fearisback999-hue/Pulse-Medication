import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { registrationSchema } from "@/lib/utils/validators";
import { createAdminClient } from "@/lib/supabase/server";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const allowMock = process.env.ALLOW_MOCK_PAYMENTS === "true";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!supabaseConfigured) {
      if (allowMock) {
        const registrationId = randomUUID();
        console.warn(
          "[register] ALLOW_MOCK_PAYMENTS=true — returning mock registrationId (not saved).",
          { registrationId, email: data.email }
        );
        return NextResponse.json({ registrationId, mock: true });
      }
      console.error(
        "[register] Supabase is not configured — cannot save registration."
      );
      return NextResponse.json(
        {
          error:
            "Registration is temporarily unavailable. Please try again later or contact us.",
        },
        { status: 503 }
      );
    }

    const supabase = createAdminClient();

    const { data: registration, error } = await supabase
      .from("registrations")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message || null,
        street: data.street,
        street2: data.street2 || null,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        course_selection: data.courseSelection,
        course_date: data.courseDate,
        terms_accepted: data.termsAccepted,
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save registration. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ registrationId: registration.id });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
