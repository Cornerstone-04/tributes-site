import { supabaseAdmin } from "@/lib/supabase-admin";
import { Tribute, TributeImage, TributeStatus } from "@/types";
import { supabase } from "./supabase";

type PaginatedTributesResult = {
  tributes: Tribute[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

export async function getAdminTributesByStatus({
  status,
  page = 1,
  pageSize = 10,
}: {
  status: TributeStatus;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedTributesResult> {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);

  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  const { data, error, count } = await supabaseAdmin
    .from("tributes")
    .select("*", { count: "exact" })
    .eq("status", status)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(`[admin] Error fetching ${status} tributes:`, error);

    return {
      tributes: [],
      totalCount: 0,
      totalPages: 0,
      page: safePage,
      pageSize: safePageSize,
    };
  }

  const totalCount = count ?? 0;

  return {
    tributes: data ?? [],
    totalCount,
    totalPages: Math.ceil(totalCount / safePageSize),
    page: safePage,
    pageSize: safePageSize,
  };
}

export async function getApprovedTributes({
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  pageSize?: number;
} = {}): Promise<PaginatedTributesResult> {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);

  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  const { data, error, count } = await supabase
    .from("tributes")
    .select("*, images:tribute_images(*)", { count: "exact" })
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching approved tributes:", error);

    return {
      tributes: [],
      totalCount: 0,
      totalPages: 0,
      page: safePage,
      pageSize: safePageSize,
    };
  }

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / safePageSize);

  return {
    tributes: data ?? [],
    totalCount,
    totalPages,
    page: safePage,
    pageSize: safePageSize,
  };
}

export async function getAllTributes(): Promise<Tribute[]> {
  const { data, error } = await supabaseAdmin
    .from("tributes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all tributes:", error);
    return [];
  }

  return data ?? [];
}

export async function getTributeById(id: string): Promise<Tribute | null> {
  const { data, error } = await supabaseAdmin
    .from("tributes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching tribute ${id}:`, error);
    return null;
  }

  return data;
}

export async function getApprovedTributeById(
  id: string,
): Promise<Tribute | null> {
  const { data, error } = await supabase
    .from("tributes")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error) {
    console.error(`Error fetching approved tribute ${id}:`, error);
    return null;
  }

  return data;
}

export async function getTributeImages(
  tributeId: string,
): Promise<TributeImage[]> {
  const { data, error } = await supabaseAdmin
    .from("tribute_images")
    .select("*")
    .eq("tribute_id", tributeId)
    .order("order", { ascending: true });

  if (error) {
    console.error(`Error fetching images for tribute ${tributeId}:`, error);
    return [];
  }

  return data ?? [];
}

export async function approveTribute(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("tributes")
    .update({ status: "approved" })
    .eq("id", id);

  if (error) {
    console.error(`Error approving tribute ${id}:`, error);
    return false;
  }

  return true;
}

export async function unpublishTribute(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("tributes")
    .update({ status: "pending" })
    .eq("id", id);

  if (error) {
    console.error(`Error unpublishing tribute ${id}:`, error);
    return false;
  }

  return true;
}

export async function toggleFeaturedTribute(
  id: string,
  featured: boolean,
): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("tributes")
    .update({ featured })
    .eq("id", id);

  if (error) {
    console.error(`Error updating featured state for tribute ${id}:`, error);
    return false;
  }

  return true;
}

export async function deleteTribute(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("tributes").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting tribute ${id}:`, error);
    return false;
  }

  return true;
}
