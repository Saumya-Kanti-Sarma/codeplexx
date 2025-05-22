import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/blogs?id=myid&?from=0&?to=1
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const from = Number(searchParams.get("from") ?? 0);
  const to = Number(searchParams.get("to") ?? 9);

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("user_id", id)
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

export async function POST(req: NextRequest) {
  const { title, content, image_url, tags, user_id } = await req.json();
  const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, content, image_url, tags, user_id }])
    .select()
  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Cannot post blog, please try again",
      error
    });
  };
  return NextResponse.json({
    status: 200,
    message: `Blog posted`,
    data
  })
};
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { title, content, image_url, tags } = await req.json();
  const { data, error } = await supabase
    .from("blogs")
    .update([{ title, content, image_url, tags }])
    .eq("id", id);
  if (error) {
    return NextResponse.json({
      status: 400,
      message: "Cannot update, please try later",
      error
    });
  }
  return NextResponse.json({
    status: 200,
    message: "Blog updated",
    data
  });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { data, error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({
      status: 400,
      message: "Cannot delete blog",
      error
    });
  }
  return NextResponse.json({
    status: 200,
    message: "Blog deleted",
    data
  });
}