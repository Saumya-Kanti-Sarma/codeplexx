import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

// Example URL: http://localhost:3000/api/blogs/getAll?id=my_id&from=0&to=12&filter=react&latest=true
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const from = Number(searchParams.get("from") ?? 0);
  const to = Number(searchParams.get("to") ?? 9);
  const filter = searchParams.get("filter"); // e.g., "react"

  let query = supabase.from("blogs").select("*").range(from, to);

  // Filter by user ID if provided
  if (id) {
    query = query.eq("user_id", id);
  }

  // Filter by tag (checks if "tags" array contains the filter string)
  if (filter && filter !== "all") {
    query = query.contains("tags", [filter]); // tags: ["react", "js"]
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({
      status: 400,
      message: "cannot get post",
      error
    });
  }

  return NextResponse.json({
    status: 200,
    data
  });
}
