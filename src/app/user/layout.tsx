"use Client";

import type { Metadata } from "next";
import Navbar from "@/components/NavBar/Navbar";



export const metadata: Metadata = {
  title: "CPLEXX | Blog post for developers from all across the world",
  description: "All your need is here!",
  icons: {
    icon: "/icons/cplexx.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />

      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
