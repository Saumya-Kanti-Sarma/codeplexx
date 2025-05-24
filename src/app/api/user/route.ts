import { hash } from "@/app/libs/hashPasswords";
import { supabase } from "@/app/libs/suprabaseClient";
import { NextRequest, NextResponse } from "next/server";

// create user
export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({
      status: 500,
      message: "All fields required"
    });
  };
  const newPassword = hash(password)

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: newPassword }])
    .select()
  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Cannot create account",
      error: error
    });
  };
  return NextResponse.json({
    status: 200,
    message: `Welcome ${name}`,
    data: data
  })
};

// Get user
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json({
      status: 400,
      message: "No Id was found"
    }, { status: 400 })
  };
  const { data, error } = await supabase
    .from("users")
    .select("id, name,email,img,created_at,about")
    .eq("name", name)
  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Cannot find account"
    });
  };
  return NextResponse.json({
    status: 200,
    message: `got account`,
    data: data
  })
};

//update user
export async function PUT(req: NextRequest) {
  const { name, about, password, id, email, img } = await req.json();
  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "No Id was found"
    })
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
        status: 500,
        message: "Cannot update data",
        error: error
      });
    };
    return NextResponse.json({
      status: 200,
      message: `updating data successful`,
      data: data
    })
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
        status: 500,
        message: "Invalid credentials, failed to change password"
      });
    }
    if (data.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "User not found"
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Password updated",
      data: data
    });
  }
}