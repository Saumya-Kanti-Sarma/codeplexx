import { NextResponse } from "next/server";
import { withApiKey } from "../libs/middleware/checkApiKey";

async function handler() {
  return NextResponse.json({
    message: "ApiKey Validated",
  }, { status: 200 })
}
export const GET = withApiKey(handler);