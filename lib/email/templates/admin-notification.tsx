interface AdminNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseDate: string;
  amount: string;
  registrationId: string;
}

export function adminNotificationHtml({
  firstName,
  lastName,
  email,
  phone,
  courseDate,
  amount,
  registrationId,
}: AdminNotificationProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #C9A84C;">
    <h1 style="color: #1B2A4A; margin: 0;">New Registration &amp; Payment</h1>
  </div>
  <div style="padding: 30px 0;">
    <p>A new student has registered and completed payment.</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #1B2A4A; margin-top: 0;">Student Information</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Course Date:</strong> ${courseDate}</p>
      <p><strong>Amount Paid:</strong> ${amount}</p>
      <p><strong>Registration ID:</strong> ${registrationId}</p>
    </div>
    <p>View all registrations in the <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="color: #C9A84C;">Admin Dashboard</a>.</p>
  </div>
</body>
</html>`;
}
