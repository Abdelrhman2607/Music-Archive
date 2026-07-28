import type { Metadata } from "next";
import { Outfit } from 'next/font/google'
import "./globals.css";

import Sidebar from './components/Sidebar/sidebar';

const outfit = Outfit({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Music Archive",
  description: "Music Archive",
};

export default function RootLayout({children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Sidebar />
        <div className="ml-[12vw]">
          {children}
        </div>
      </body>
    </html>
  );
}
