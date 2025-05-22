"use client";;
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "../../store/zestStore/Store";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const userUUID = Cookies.get("user_UUID");
    if (userUUID) {
      setUser({
        name: Cookies.get("name"),
        email: Cookies.get("email"),
        profile: Cookies.get("img"),
        about: Cookies.get("about"),
        id: Cookies.get("id"),
      })
    };
  }, [])
  return (
    <html >
      <head>
        <title>Get started with Code plexx</title>
        <link rel="icon" type="image/x-icon" href="/icons/cplexx.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />

      </head>
      <body>
        <Toaster position='top-center' reverseOrder={false} />
        {children}
        <br />
        <br />
        <br />
      </body>
    </html>
  );
}
