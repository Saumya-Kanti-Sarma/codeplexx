import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter: IP -> { count, resetTime }
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10; // requests per minute
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  record.count += 1;
  return { allowed: true };
}

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limit = checkRateLimit(ip);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          retryAfter: limit.retryAfter,
        },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    const body = await req.json();
    const { messages, blogContent } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MIMOTRON_ULTRA_API_KEY || process.env.NVIDIA_API_KEY || "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const systemPrompt = `You are an AI assistant for CodePlexx, a developer blog platform. You can ONLY answer questions about the current blog post provided below. Do not answer questions unrelated to the blog post. If a user asks about anything else, politely decline and say you can only help with questions about this specific blog post.

Current blog post content:
${blogContent || ""}`;

    const normalizedMessages = messages.map((m: any) => ({
      role: m.role === "bot" ? "assistant" : m.role,
      content: m.content,
    }));

    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b",
      messages: [
        { role: "system", content: systemPrompt },
        ...normalizedMessages,
      ],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 4096,
      stream: false,
    });

    const reply = completion.choices[0]?.message?.content || "No response received.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    if (error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "Failed to get AI response. Please try again." },
      { status: 500 }
    );
  }
}
