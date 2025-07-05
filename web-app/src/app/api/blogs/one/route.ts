import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/blogs/one?id=id
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)

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