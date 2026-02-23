import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marbo9k E-Commerce",
  description: "E-Commerce with LINE LIFF & Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  );
}
