import { hash } from "@/app/libs/hashPasswords";
import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, password } = await request.json();

  const hashedPassword = hash(password);
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("name", name)
    .single();

  if (error || !data) {
    return NextResponse.json({
      status: 400,
      message: "invalid credentials",
      error: error
    }, { status: 400 });
  }

  // Check if the password matches
  if (data.password !== hashedPassword) {
    return NextResponse.json({
      status: 500,
      message: `Wrong password please try again`,
    }, { status: 500 });
  }
  return NextResponse.json({
    status: 200,
    message: `Welcome back ${data.name}`,
    data: data
  }, { status: 200 });

}