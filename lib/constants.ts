const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const TIMELINE_IMAGES = [
  {
    image:
      "https://images.unsplash.com/photo-1435194510257-0cf4a8b4a0a3?q=80&w=1432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Portrait of an elderly man with a calm expression",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601651583954-1e1595117de1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Elderly African man looking thoughtfully into the distance",
  },
  {
    image:
      "https://images.unsplash.com/photo-1667312147803-4b2437b5485e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Smiling senior man with warm eyes",
  },
  {
    image:
      "https://images.unsplash.com/photo-1699903674163-fb7b3a06225f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Close-up portrait of an older man showing wisdom and age",
  },
  {
    image:
      "https://images.unsplash.com/photo-1721713833987-d9af2570e3a7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Elderly man in traditional attire",
  },
  {
    image:
      "https://images.unsplash.com/photo-1721713833987-d9af2570e3a7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Portrait of a Black elderly man with dignified presence",
  },
];

const LANDING_CHAPTERS = [
  {
    year: "1925",
    label: "Early Years",
    heading: "A life begins in Lagos.",
    body: "Born into a world still finding its shape, Olusola arrived with quiet strength. From the earliest days, those around him sensed something uncommon — a stillness, a warmth, a presence that made rooms feel safer.",
    accent: "The first of many chapters.",
    ...TIMELINE_IMAGES[0],
  },
  {
    year: "1940s",
    label: "Coming of Age",
    heading: "A young man with vision.",
    body: "Through a Nigeria on the cusp of change, Olusola moved with intention. He studied, he built, he loved. He understood — long before it was fashionable — that legacy is made in the quiet, consistent choices.",
    accent: "Roots growing deeper.",
    ...TIMELINE_IMAGES[1],
  },
  {
    year: "1960s",
    label: "Building a Life",
    heading: "A family takes shape.",
    body: "Marriage. Children. A home filled with laughter and discipline in equal measure. Olusola became the axis around which a family turned — the one everyone looked to, the one who never looked away.",
    accent: "A man becoming a patriarch.",
    ...TIMELINE_IMAGES[2],
  },
  {
    year: "1980s",
    label: "Legacy",
    heading: "Pouring into others.",
    body: "Careers were shaped, wisdom was given freely, and the table was always long enough. Olusola did not hoard what he had learned. He gave it — to children, grandchildren, colleagues, strangers.",
    accent: "Wealth measured in people.",
    ...TIMELINE_IMAGES[3],
  },
  {
    year: "2000s",
    label: "Elder & Anchor",
    heading: "The family's north star.",
    body: "As the world accelerated, Olusola remained steady. Grandchildren climbed on his lap. His voice in a room still settled arguments. He remained curious, kind, present. Still building, in his own way.",
    accent: "Undiminished.",
    ...TIMELINE_IMAGES[4],
  },
  {
    year: "2026",
    label: "One Hundred Years",
    heading: "A century. A gift.",
    body: "One hundred years of grace, grit, faith, and love. July arrives and with it, the chance for all of us to say — in our own words — what this life has meant. What it continues to mean.",
    accent: "This is for you, Baba.",
    ...TIMELINE_IMAGES[5],
  },
] as const;

export { supabaseAnonKey, supabaseUrl, LANDING_CHAPTERS };
