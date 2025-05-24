// app/users/blogs/[id]/page.tsx
import { Metadata } from "next";
import Blogs from "./Blogs";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.URL}/api/blogs/one?id=${params.id}`);
  const blog = await res.json();
  const data = blog.data[0];
  return {
    title: data?.title || "Blog",
    description: data?.content?.slice(0, 160) || "Blog description",
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <Blogs id={params.id} />;
}
