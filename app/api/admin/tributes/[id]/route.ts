// app/api/admin/tributes/[id]/route.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { TributeStatus } from "@/types";

function isValidStatus(status: unknown): status is TributeStatus {
  return status === "pending" || status === "approved";
}

async function isAdminAuthorized() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authorized";
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authorized = await isAdminAuthorized();

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const updates: {
    status?: TributeStatus;
    featured?: boolean;
  } = {};

  if ("status" in body) {
    if (!isValidStatus(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    updates.status = body.status;
  }

  if ("featured" in body) {
    if (typeof body.featured !== "boolean") {
      return NextResponse.json(
        { error: "Invalid featured value." },
        { status: 400 },
      );
    }

    updates.featured = body.featured;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No valid updates provided." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin
    .from("tributes")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("[api/admin/tributes] PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update tribute." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authorized = await isAdminAuthorized();

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabaseAdmin.from("tributes").delete().eq("id", id);

  if (error) {
    console.error("[api/admin/tributes] DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete tribute." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
