import { NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/email/resend";
import { SITE_CONFIG } from "@/lib/constants/site";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").max(30),
  message: z.string().min(1, "Message is required").max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    const adminEmail = process.env.ADMIN_EMAIL || SITE_CONFIG.email;

    await getResend().emails.send({
      from: "Pulse Medication <noreply@pulsemedication.com>",
      to: adminEmail,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #C9A84C;">
    <h1 style="color: #1B2A4A; margin: 0;">New Contact Form Message</h1>
  </div>
  <div style="padding: 30px 0;">
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${phone.replace(/\D/g, "")}">${phone}</a></p>
    </div>
    <h3 style="color: #1B2A4A;">Message:</h3>
    <div style="background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 20px; white-space: pre-wrap;">${message}</div>
    <p style="margin-top: 20px; color: #666; font-size: 12px;">You can reply directly to this email to respond to ${name}.</p>
  </div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
