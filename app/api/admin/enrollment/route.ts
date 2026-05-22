import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { registrationId, enrollmentStatus } = await request.json();

    if (!registrationId || !enrollmentStatus) {
      return NextResponse.json(
        { error: "Registration ID and enrollment status are required." },
        { status: 400 }
      );
    }

    const validStatuses = ["registered", "enrolled", "completed", "withdrawn"];
    if (!validStatuses.includes(enrollmentStatus)) {
      return NextResponse.json(
        { error: "Invalid enrollment status." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("registrations")
      .update({ enrollment_status: enrollmentStatus })
      .eq("id", registrationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enrollment update error:", err);
    return NextResponse.json(
      { error: "Failed to update enrollment status." },
      { status: 500 }
    );
  }
}
