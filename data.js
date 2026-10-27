/* ============================================================
   EDIT THIS FILE to make the site yours.
   - Photos: put files in /photos and reference them, e.g. "photos/nahkoda/01.jpg".
     Anything left as null shows a placeholder frame.
   - Add a project = add one object to PROJECTS. That's it.
   ============================================================ */

const SITE = {
  name: "Ruls",
  fullName: "Ruly Permana",
  city: "Surabaya, Indonesia",
  headline: ["A quiet observer with a camera, chasing", "light", "and the", "unseen", "moments worth keeping."],
  subline: "Photographer & videographer based in Surabaya — available evenings and Saturdays.",
  whatsapp: "6280000000000",          // format: country code + number, no "+" or spaces
  instagram: "https://instagram.com/yourhandle",
  email: "hello@example.com",
  bookYear: 2027,
  heroImages: []                        // optional: list of photo paths for the home mosaic
};

const CATEGORIES = ["Portrait", "Event", "Film Diary", "Video"];

const PACKAGES = [
  { name: "Mini Session", price: "IDR —", note: "1 hour · 1 location · 15 edited photos" },
  { name: "Half Day",     price: "IDR —", note: "4 hours · 2 locations · 50 edited photos" },
  { name: "Full Story",   price: "IDR —", note: "Photo + short video highlight · custom scope" }
];

const AWARDS = [
  // { title: "Name of award / feature", where: "Publication or community", year: "2026" }
];

const PROJECTS = [
  {
    slug: "nahkoda",
    title: "Nahkoda: Twenty-Five at Sea",
    category: "Portrait",
    date: "2026-10-06",
    count: 18,
    cover: null,
    photos: [],
    excerpt: "A self-directed portrait series about steering your own boat at twenty-five — bright, a little grainy, and unsure of the weather.",
    intro: "Placeholder text. Write two or three sentences about the idea behind this shoot, what you wanted people to feel, and how it came together.",
    credits: { Photography: "Ruls", Location: "Surabaya Harbour", Film: "35mm colour negative" }
  },
  {
    slug: "taman-harmony-early-light",
    title: "Taman Harmony, Early Light",
    category: "Portrait",
    date: "2026-09-20",
    count: 14,
    cover: null,
    photos: [],
    excerpt: "Five o'clock starts, wet grass, and the first soft light coming through the trees.",
    intro: "Placeholder text. Describe the session, the mood and what made the morning special.",
    credits: { Photography: "Ruls", Location: "Taman Harmony" }
  },
  {
    slug: "camden-after-dark",
    title: "Camden After Dark",
    category: "Event",
    date: "2026-08-30",
    count: 16,
    cover: null,
    photos: [],
    excerpt: "A venue that changes character when the sun goes down — flash, neon and a lot of movement.",
    intro: "Placeholder text. Explain the venue, the brief and your approach to the lighting.",
    credits: { Photography: "Ruls", Venue: "Camden, Surabaya" }
  },
  {
    slug: "half-frame-diary",
    title: "Half-Frame Diary",
    category: "Film Diary",
    date: "2026-07-12",
    count: 20,
    cover: null,
    photos: [],
    excerpt: "Two frames for the price of one — a month of everyday scenes shot on a half-frame camera.",
    intro: "Placeholder text. Mention the camera, the film stock and what you learned from the limits of the format.",
    credits: { Camera: "Olympus PEN", Film: "35mm" }
  },
  {
    slug: "city-in-motion",
    title: "City in Motion",
    category: "Video",
    date: "2026-06-05",
    count: 8,
    cover: null,
    photos: [],
    excerpt: "A short visual piece on Surabaya after work hours, cut to the rhythm of the commute.",
    intro: "Placeholder text. Add a video embed in project.html later if you want to feature the film itself.",
    credits: { Direction: "Ruls", Edit: "Ruls" }
  },
  {
    slug: "saturday-people",
    title: "Saturday People",
    category: "Portrait",
    date: "2026-05-16",
    count: 12,
    cover: null,
    photos: [],
    excerpt: "Candid portraits of friends and strangers, made in the half-day between work and the weekend.",
    intro: "Placeholder text. Share how you approached people and what you hoped to capture.",
    credits: { Photography: "Ruls" }
  }
];
