// app/user/blogs/[id]/page.tsx
import { Metadata } from "next";
import Blogs from "./Blogs";

export async function generateMetadata() {


  return {
    title: "Blogs",
    description: "this is the blogs section of c plexx",
  };
}



export default function Page() {
  return <Blogs />;
}
