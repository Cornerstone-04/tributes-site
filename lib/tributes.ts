import { supabase } from "@/lib/supabase";
import { Tribute, TributeImage } from "@/types";

export async function getApprovedTributes(): Promise<Tribute[]> {
  const { data, error } = await supabase
    .from("tributes")
    .select("*, images:tribute_images(*)")
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching approved tributes:", error);
    return [];
  }

  return data ?? [];
}

export async function getAllTributes(): Promise<Tribute[]> {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { error } = await supabase
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
  const { error } = await supabase
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
  const { error } = await supabase
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
  const { error } = await supabase.from("tributes").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting tribute ${id}:`, error);
    return false;
  }

  return true;
}
