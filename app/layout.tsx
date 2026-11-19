import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RC DNS LAB",
  description: "Bảng điều khiển DNS và kiểm thử thuê bao RevenueCat Sandbox.",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "RC DNS LAB" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
