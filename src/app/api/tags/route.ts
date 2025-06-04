import { supabase } from "@/app/libs/suprabaseClient";
import { NextResponse } from "next/server";
export async function GET() {
  const { data, error } = await supabase
    .from("blogs")
    .select("tags");
  if (error) {
    return NextResponse.json({
      status: 400,
      message: error,
    }, { status: 400 })
  }
  const flatData = data.flatMap((item) => item.tags);
  const uniqueItems = [...new Set(flatData)]
  return NextResponse.json({
    status: 200,
    message: uniqueItems,
  }, { status: 200 })
}
