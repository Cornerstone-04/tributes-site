const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const LANDING_CHAPTERS = [
  {
    year: "1925",
    label: "Early Years",
    heading: "A life begins in Lagos.",
    body: "Born into a world still finding its shape, Olusola arrived with quiet strength. From the earliest days, those around him sensed something uncommon — a stillness, a warmth, a presence that made rooms feel safer.",
    accent: "The first of many chapters.",
  },
  {
    year: "1940s",
    label: "Coming of Age",
    heading: "A young man with vision.",
    body: "Through a Nigeria on the cusp of change, Olusola moved with intention. He studied, he built, he loved. He understood — long before it was fashionable — that legacy is made in the quiet, consistent choices.",
    accent: "Roots growing deeper.",
  },
  {
    year: "1960s",
    label: "Building a Life",
    heading: "A family takes shape.",
    body: "Marriage. Children. A home filled with laughter and discipline in equal measure. Olusola became the axis around which a family turned — the one everyone looked to, the one who never looked away.",
    accent: "A man becoming a patriarch.",
  },
  {
    year: "1980s",
    label: "Legacy",
    heading: "Pouring into others.",
    body: "Careers were shaped, wisdom was given freely, and the table was always long enough. Olusola did not hoard what he had learned. He gave it — to children, grandchildren, colleagues, strangers.",
    accent: "Wealth measured in people.",
  },
  {
    year: "2000s",
    label: "Elder & Anchor",
    heading: "The family's north star.",
    body: "As the world accelerated, Olusola remained steady. Grandchildren climbed on his lap. His voice in a room still settled arguments. He remained curious, kind, present. Still building, in his own way.",
    accent: "Undiminished.",
  },
  {
    year: "2026",
    label: "One Hundred Years",
    heading: "A century. A gift.",
    body: "One hundred years of grace, grit, faith, and love. July arrives and with it, the chance for all of us to say — in our own words — what this life has meant. What it continues to mean.",
    accent: "This is for you, Baba.",
  },
] as const;

export { supabaseAnonKey, supabaseUrl, LANDING_CHAPTERS };
