import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Archive",
  description: "Music Archive HomePage",
};

export default function RootLayout({children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
