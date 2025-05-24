import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/blogs/getAll?id=my_id&from=0&to=12
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const from = Number(searchParams.get("from") ?? 0);
  const to = Number(searchParams.get("to") ?? 9);

  let query = supabase.from("blogs").select("*").range(from, to);

  if (id) {
    query = query.eq("user_id", id);
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
};
