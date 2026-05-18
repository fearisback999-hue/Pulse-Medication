import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/utils/validators";
import { createAdminClient } from "@/lib/supabase/server";

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
