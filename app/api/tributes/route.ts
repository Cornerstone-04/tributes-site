import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// ===== RATE LIMITING CONFIG =====
const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 60_000, // 1 minute
  MAX_PER_WINDOW: 5,
} as const;

// In-memory store — resets on cold start, fine for this use case
const ipSubmissions = new Map<string, { count: number; windowStart: number }>();

// ===== RATE LIMITING UTILITIES =====
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded ? (forwarded.split(",")[0]?.trim() ?? "unknown") : "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);

  // If no entry or window expired, reset
  if (!entry || now - entry.windowStart > RATE_LIMIT_CONFIG.WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, windowStart: now });
    return false;
  }

  // Check if limit exceeded
  if (entry.count >= RATE_LIMIT_CONFIG.MAX_PER_WINDOW) {
    return true;
  }

  // Increment counter
  entry.count++;
  return false;
}

// ===== REQUEST HANDLER =====
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Check rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions. Please wait a moment before trying again.",
      },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();

    // Insert tribute into database
    const { data, error } = await supabaseAdmin
      .from("tributes")
      .insert({
        full_name: body.full_name,
        relationship: body.relationship || null,
        location: body.location || null,
        title: body.title || null,
        message: body.message,
        status: "pending",
        voice_note_url: body.voice_note_url ?? null,
        voice_note_duration: body.voice_note_duration ?? null,
        cover_image_url: body.cover_image_url ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[api/tributes] Database error:", error);

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[api/tributes] Request error:", message);

    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 400 },
    );
  }
}
