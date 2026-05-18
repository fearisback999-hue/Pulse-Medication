import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getResend } from "@/lib/email/resend";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { to, subject, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: "To, subject, and body are required." },
        { status: 400 }
      );
    }

    await getResend().emails.send({
      from: "Pulse Medication <noreply@pulsemedication.com>",
      to,
      subject,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #C9A84C;">
    <h1 style="color: #1B2A4A; margin: 0;">Pulse Medication</h1>
  </div>
  <div style="padding: 30px 0; white-space: pre-wrap;">${body}</div>
  <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #999; font-size: 12px;">
    <p>Pulse Medication | 1240 S State College Blvd, Anaheim, CA 92806</p>
    <p>(714) 539-7081 | Pulsemedication@gmail.com</p>
  </div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
