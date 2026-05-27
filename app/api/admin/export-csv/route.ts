import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: registrations, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Street",
    "Street2",
    "City",
    "State",
    "ZIP",
    "Country",
    "Course",
    "Course Date",
    "Payment Status",
    "Message",
    "Created At",
  ];

  const rows = (registrations || []).map((r) =>
    [
      r.id,
      r.first_name,
      r.last_name,
      r.email,
      r.phone,
      r.street,
      r.street2 || "",
      r.city,
      r.state,
      r.zip,
      r.country,
      r.course_selection,
      r.course_date,
      r.payment_status,
      (r.message || "").replace(/"/g, '""'),
      r.created_at,
    ]
      .map((val) => `"${val}"`)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
