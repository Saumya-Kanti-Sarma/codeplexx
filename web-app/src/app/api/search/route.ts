import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/libs/suprabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ message: "No search query provided." }, { status: 400 });
  }

  // Search users (exclude password)
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, name, about, img")
    .or(`name.ilike.%${query}%`)


  // Search blogs (truncate content, paginate)
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("id, title, content, uploaded_by, image_url")
    .or(`title.ilike.%${query}%,tags.cs.{${query}},uploaded_by.ilike.%${query}%`)


  // Truncate blog content
  const blogsTruncated = blogs?.map(blog => ({
    ...blog,
    content: blog.content ? blog.content.slice(0, 200) + (blog.content.length > 200 ? "..." : "") : ""
  })) || [];

  if (userError || blogError) {
    return NextResponse.json({ message: "Error searching data.", userError, blogError }, { status: 500 });
  }
  const data = [...users, ...blogsTruncated]
  return NextResponse.json({ data }, { status: 200 });
}