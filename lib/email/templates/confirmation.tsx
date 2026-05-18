interface ConfirmationEmailProps {
  firstName: string;
  courseName: string;
  courseDate: string;
  amount: string;
}

export function confirmationEmailHtml({
  firstName,
  courseName,
  courseDate,
  amount,
}: ConfirmationEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #C9A84C;">
    <h1 style="color: #1B2A4A; margin: 0;">Pulse Medication</h1>
    <p style="color: #666; margin: 5px 0 0;">Monitor Tech Certification</p>
  </div>
  <div style="padding: 30px 0;">
    <h2 style="color: #1B2A4A;">Enrollment Confirmed!</h2>
    <p>Dear ${firstName},</p>
    <p>Thank you for enrolling in the <strong>${courseName}</strong> course. Your payment of <strong>${amount}</strong> has been received.</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #1B2A4A; margin-top: 0;">Course Details</h3>
      <p><strong>Course:</strong> ${courseName}</p>
      <p><strong>Dates:</strong> ${courseDate}</p>
      <p><strong>Time:</strong> 9:00 AM – 5:00 PM PST</p>
      <p><strong>Format:</strong> Live Online via Zoom</p>
    </div>
    <h3 style="color: #1B2A4A;">What's Next?</h3>
    <ul>
      <li>Course materials will be emailed about one week before class starts.</li>
      <li>The Zoom link will be sent with your course materials.</li>
      <li>Please ensure you have a stable internet connection and a computer with a webcam.</li>
    </ul>
    <p>If you have any questions, please contact us at <a href="mailto:Pulsemedication@gmail.com" style="color: #C9A84C;">Pulsemedication@gmail.com</a> or call <a href="tel:7145397081" style="color: #C9A84C;">(714) 539-7081</a>.</p>
    <p>We look forward to seeing you in class!</p>
    <p>Best regards,<br /><strong>Pulse Medication Team</strong></p>
  </div>
  <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #999; font-size: 12px;">
    <p>Pulse Medication | 1240 S State College Blvd, Anaheim, CA 92806</p>
  </div>
</body>
</html>`;
}
