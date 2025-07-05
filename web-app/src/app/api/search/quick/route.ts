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
    .select("name")
    .or(`name.ilike.%${query}%`)

  // Search blogs (truncate content, paginate)
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("title, id")
    .or(`title.ilike.%${query}%`)


  if (userError || blogError) {
    return NextResponse.json({ message: "Error searching data.", userError, blogError }, { status: 500 });
  }
  const data = [...users, ...blogs]
  return NextResponse.json({ data }, { status: 200 });
}