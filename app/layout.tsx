import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "BCBA Profiles",
  description: "Connect with BCBA professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
