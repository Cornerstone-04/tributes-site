import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// In-memory store — resets on cold start, fine for this use case
const ipSubmissions = new Map<string, { count: number; windowStart: number }>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_PER_WINDOW) return true;

  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a moment." },
      { status: 429 },
    );
  }

  const body = await req.json();

  const { data, error } = await supabase
    .from("tributes")
    .insert({
      full_name: body.full_name,
      relationship: body.relationship || null,
      title: body.title || null,
      message: body.message,
      voice_note_url: body.voice_note_url ?? null,
      voice_note_duration: body.voice_note_duration ?? null,
      cover_image_url: body.cover_image_url ?? null,
    })
    .select() // This tells Supabase to return the inserted row
    .single(); // Since we are inserting one row, we want a single object

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id });
}
