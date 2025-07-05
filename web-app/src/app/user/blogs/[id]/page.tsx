// app/user/blogs/[id]/page.tsx
import Blogs from "./Blogs";
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {

  const id = (await params).id;
  const data = await fetch(`${process.env.URL}/api/blogs/one?id=${id}`)
  const response = await data.json();

  return {
    title: response.data[0].title || "Blogs",
    description: response.data[0].content.substring(0, 60) || "this is the blogs section of c plexx",
    openGraph: {
      title: response.data[0].title || "Blogs",
      description: response.data[0].content.substring(0, 60) || "this is the blogs section of c plexx",
      url: `${process.env.URL}/user/blogs/${id}`,
      siteName: 'C Plexx',
      images: [
        {
          url: response.data[0].image_url || '/def.def-img.jpeg',
          width: 1200,
          height: 630,
          alt: response.data[0].title || "Blogs",
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: response.data[0].title || "Blogs",
      description: response.data[0].content.substring(0, 60) || "this is the blogs section of c plexx",
      images: [response.data[0].image_url || '/def.def-img.jpeg'],
      creator: response.data[0].uploaded_by || "Codeplexx",
    },
  };
}



export default function Page() {
  return <Blogs />;
}
