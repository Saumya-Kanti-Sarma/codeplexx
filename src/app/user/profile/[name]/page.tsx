import { Metadata } from "next";
import ProfilePage from "./ProfilePage";


export async function generateMetadata() {

  return {
    title: "Profile",
    description: "Profile section of c plexx",
  };
}


export default function Page() {
  return <ProfilePage />
}