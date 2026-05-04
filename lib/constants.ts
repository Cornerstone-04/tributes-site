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
    year: "1926",
    label: "Early Years",
    heading: "A life begins on July 24th.",
    body: "Born to Ajolore (Onibon) and Naomi Ajolore in a large polygamous family of over thirty children. His father was a respected farmer and community leader, while his mother eventually embraced Christianity. From his earliest days, Olusola carried within him a quiet strength and profound spiritual foundation.",
    accent: "One of many, yet uniquely called.",
    ...TIMELINE_IMAGES[0],
  },
  {
    year: "1930s-1950s",
    label: "Education & Formation",
    heading: "Formal education opens new worlds.",
    body: "Beginning at age 11 with Baptist missionaries' introduction of Western education to Mọpa, Olusola pursued his path with determination. Baptist College, Iwo (1954-1956), GCE certification (1957), A-Levels and Advanced Teachers' Diploma in Zaria (1958-1960), and English Honours from the University of Ibadan (1964). Further studies at Manchester University (1966-1967) and a PhD in Psycholinguistics from the University of Illinois (1970-1973).",
    accent: "A lifelong student of wisdom and truth.",
    ...TIMELINE_IMAGES[1],
  },
  {
    year: "1962-1996",
    label: "Family & Marriage",
    heading: "A partnership of faith and purpose.",
    body: "Happily married to (Late) Esther Bamidele Ajolore for thirty-four years, they built a close-knit family blessed with five children, ten grandchildren, and many spiritual children across generations. Their marriage was marked by shared purpose, deep faith, and an unwavering commitment to raising a godly and united family.",
    accent: "Love that transcends generations.",
    ...TIMELINE_IMAGES[2],
  },
  {
    year: "1968-2003",
    label: "Academic Career",
    heading: "Shaping minds across Nigeria.",
    body: "Approximately 35 years serving in education at the University of Lagos (from 1968 as a lecturer) and Kwara State College of Technology, Ilorin, where he taught English and Nigerian languages. His contributions to teaching and academic excellence left lasting impressions on countless students and colleagues.",
    accent: "Legacy measured in minds enlightened.",
    ...TIMELINE_IMAGES[3],
  },
  {
    year: "1984-Present",
    label: "Ministry & Service",
    heading: "Pouring into the Body of Christ.",
    body: "State Secretary of the Christian Association of Nigeria (CAN), Kwara State for 22 years and 8 months (without salary). First President of Full Gospel Business Men's Fellowship International (FGBMFI), Ilorin Chapter (1986). Currently serves as Chairman of the Board of Trustees (BOT) nationally. Continues to minister at the FGBMFI Miracle Centre, Ilorin, on Tuesdays and Thursdays with an unbroken record of faithful service.",
    accent: "A vessel of grace, unblemished and true.",
    ...TIMELINE_IMAGES[4],
  },
  {
    year: "2026",
    label: "One Hundred Years of Grace",
    heading: "A century. A legacy. A celebration.",
    body: "One hundred years of grace, grit, faith, and love. As PA. Olusola Ajolore celebrates this milestone, his words echo: 'Above all, I attribute everything I am to the grace of God. Truly, by the grace of God, I am what I am.' July 24th arrives—the chance for all of us to say, in our own words, what this extraordinary life has meant.",
    accent: "This is for you, Baba. Forever.",
    ...TIMELINE_IMAGES[5],
  },
] as const;

export { supabaseAnonKey, supabaseUrl, LANDING_CHAPTERS };
