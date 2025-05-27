import { hash } from "@/app/libs/hashPasswords";
import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

// create user
export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({
      message: "All fields required"
    }, { status: 500 });
  };
  const newPassword = hash(password)

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: newPassword }])
    .select()
  if (error) {
    return NextResponse.json({
      message: "Cannot create account",
      error
    }, { status: 500 });
  };
  return NextResponse.json({
    message: `Welcome ${name}`,
    data
  }, { status: 200 })
};

// Get user
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json({
      message: "No Id was found"
    }, { status: 400 })
  };
  const { data, error } = await supabase
    .from("users")
    .select("id, name,email,img,created_at,about")
    .eq("name", name)
  if (error) {
    return NextResponse.json({
      message: "Cannot find account"
    }, { status: 500 });
  };
  return NextResponse.json({
    message: `got account`,
    data
  }, { status: 200 })
};

//update user
export async function PUT(req: NextRequest) {
  const { name, about, password, id, email, img } = await req.json();
  if (!id) {
    return NextResponse.json({
      message: "No Id was found"
    }, { status: 400 })
  };
  // logic to update name or about
  if (name || about || img) {
    const { data, error } = await supabase
      .from("users")
      .update({ name, about, img })
      .eq("id", id)
      .select()
    if (error) {
      return NextResponse.json({
        message: "Cannot update data",
        error: error
      }, { status: 500 });
    };
    return NextResponse.json({
      message: `data upated successfully`,
      data
    }, { status: 200 })
  };
  // logic to update password
  if (password) {
    const hashedPassword = hash(password);
    // Use plain email for lookup unless emails are stored hashed
    const { data, error } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("email", email)
      .select();
    if (error) {
      return NextResponse.json({
        message: "Invalid credentials, failed to change password"
      }, { status: 500 });
    }
    if (data.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "User not found"
      });
    }
    return NextResponse.json({
      message: "Password updated",
      data
    }, { status: 200 });
  }
}