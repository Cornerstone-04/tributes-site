const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const TIMELINE_IMAGES = [
  {
    image: "/images/1926.jpg",
    imageAlt: "Portrait of an elderly man with a calm expression",
  },
  {
    image: "/images/30-50.jpg",
    imageAlt: "Elderly African man looking thoughtfully into the distance",
  },
  {
    image: "/images/62-96(1).jpg",
    imageAlt: "Smiling senior man with warm eyes",
  },
  {
    image: "/images/68-03.jpg",
    imageAlt: "Close-up portrait of an older man showing wisdom and age",
  },
  {
    image: "/images/84.jpg",
    imageAlt: "Elderly man in traditional attire",
  },
  {
    image: "/images/26-legacy.jpg",
    imageAlt: "Portrait of a Black elderly man with dignified presence",
  },
];

const LANDING_CHAPTERS = [
  {
    year: "1926",
    label: "Early Years",
    heading: "A life begins on July 24th.",
    body: "Born to Ajolore (Onibon) and Naomi Ajolore in a large polygamous family of nine wives and over thirty children, he was the son of a prosperous farmer and community leader. Though both parents were traditional worshippers, his mother later embraced Christianity, which became his introduction to the faith.",
    accent: "One of many, yet uniquely called.",
    ...TIMELINE_IMAGES[0],
  },
  {
    year: "1930s-1970s",
    label: "Education & Formation",
    heading: "Formal education opens new worlds.",
    body: "Beginning at age 11 with Baptist missionaries' introduction of Western education to Mọpa, Pa. Olusola pursued his path with determination. Baptist College, Iwo (1954-1956), GCE certification (1957), A-Levels and Advanced Teachers' Diploma in Zaria (1958-1960), and English Honours from the University of Ibadan (1964). Further studies at Manchester University (1966-1967) and a PhD in Psycholinguistics from the University of Illinois (1970-1973).",
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
    year: "1945-1980",
    label: "Academic Career",
    heading: "Shaping minds across Nigeria.",
    body: "Approximately 35 years serving in education at the University of Lagos (from 1968 as a lecturer) and Kwara State College of Technology, Ilorin, where he taught English and Nigerian languages. His contributions to teaching and academic excellence left lasting impressions on countless students and colleagues.",
    accent: "Legacy measured in minds enlightened.",
    ...TIMELINE_IMAGES[3],
  },
  {
    year: "1959-Present",
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
    body: "One hundred years of grace, grit, faith, and love. As Pa. Olusola Ajolore celebrates this milestone, his words echo: 'Above all, I attribute everything I am to the grace of God. Truly, by the grace of God, I am what I am.' July 24th arrives—the chance for all of us to say, in our own words, what this extraordinary life has meant.",
    accent: "This is for you, Baba. Forever.",
    ...TIMELINE_IMAGES[5],
  },
] as const;

export { supabaseAnonKey, supabaseUrl, LANDING_CHAPTERS };
