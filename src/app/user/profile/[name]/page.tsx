import { Metadata } from "next";
import ProfilePage from "./ProfilePage";
export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const req = await fetch(`http://localhost:3000//api/user?name=${params.name}`);
  const res = await req.json();
  console.log(res);
  return {
    title: `Profile of ${res.data[0]?.name}` || "Name",
    description: `${res.data[0]?.about}` || "user description",
  };
}



export default function page({ params }: { params: { name: string } }) {
  return (
    <ProfilePage name={params.name} />
  );
}