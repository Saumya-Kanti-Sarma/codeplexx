"use Client";

import type { Metadata } from "next";
import Navbar from "@/components/UI/NavBar/Navbar";

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

    <>
      <Navbar />
      <main id="main-container">
        {children}
      </main>
    </>
  );
}
