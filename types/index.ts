export type TributeStatus = "pending" | "approved";

export type Tribute = {
  id: string;
  full_name: string;
  relationship: string | null;
  title: string | null;
  message: string;
  status: TributeStatus;
  featured: boolean;
  voice_note_url: string | null;
  voice_note_duration: number | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type TributeImage = {
  id: string;
  tribute_id: string;
  image_url: string;
  caption: string | null;
  order: number;
};

export type PageNavProps = {
  backHref: string;
  backLabel: string;
  actionHref?: string;
  actionLabel?: string;
};
