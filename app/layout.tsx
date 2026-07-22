import type { Metadata } from "next";
import "./globals.css";

import Sidebar from './components/Sidebar/sidebar';

export const metadata: Metadata = {
  title: "Music Archive",
  description: "Music Archive",
};

export default function RootLayout({children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="ml-[12vw]">
          {children}
        </div>
      </body>
    </html>
  );
}
