export const metadata = {
  title: "AI POD Engine",
  description: "Your backend is alive!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>{children}</body>
    </html>
  );
}
