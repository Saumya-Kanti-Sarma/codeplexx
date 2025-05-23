import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/blogs/getAll
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = Number(searchParams.get("from") ?? 0);
  const to = Number(searchParams.get("to") ?? 9);

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .range(from, to);

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
