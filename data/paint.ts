// Content for the Paint With Our Minds landing page (/paint).
//
// Every story and reel currently reuses the same clip with a different start
// time, mirror and hue so it reads as different artwork. Drop new 9:16 clips
// into /public/assets/media/paint/ and swap `video` (and `poster`) per item.

const REEL = "/assets/media/paint/reel-540.mp4";
const HERO = "/assets/media/paint_with_your_mind_by_travis_weerts_murdoch_university.mp4";

export const PAINT = {
  heroVideo: HERO,
  heroPoster: "/assets/media/paint/frame-1.jpg",
  canvasUrl: "https://paint.travis.work",
  mediumUrl:
    "https://medium.com/@travisaweerts/visualising-emotions-using-a-i-to-painting-with-your-mind-f3d6896589df",
};

export interface PaintClip {
  video: string;
  poster: string;
  /** Seconds into the clip to start from */
  start: number;
  /** CSS hue-rotate in degrees, to vary the palette of a reused clip */
  hue?: number;
  mirror?: boolean;
}

/** The tall reels that drift through the hero */
export const heroReels: PaintClip[] = [
  { video: REEL, poster: "/assets/media/paint/frame-2.jpg", start: 4 },
  { video: REEL, poster: "/assets/media/paint/frame-3.jpg", start: 9, hue: 140, mirror: true },
  { video: REEL, poster: "/assets/media/paint/frame-1.jpg", start: 0 },
  { video: REEL, poster: "/assets/media/paint/frame-4.jpg", start: 13, hue: -70 },
  { video: REEL, poster: "/assets/media/paint/frame-5.jpg", start: 16, hue: 210, mirror: true },
  { video: REEL, poster: "/assets/media/paint/frame-2.jpg", start: 6, hue: 60 },
];

export interface PaintStory extends PaintClip {
  id: string;
  /** Short label for the story bubble */
  name: string;
  title: string;
  caption: string;
  /** What the crowd did to make this */
  prompt: string;
}

/** Artwork types, shown as an Instagram-style stories viewer */
export const stories: PaintStory[] = [
  {
    id: "joy",
    name: "Joy",
    title: "Joy blooms",
    caption: "Happy words throw out warm, round strokes that bounce and spill into each other.",
    prompt: "\"ice cream robots!\"",
    video: REEL,
    poster: "/assets/media/paint/frame-1.jpg",
    start: 0,
  },
  {
    id: "calm",
    name: "Calm",
    title: "Slow tides",
    caption: "Quiet, gentle words pull the canvas into long, cool ribbons that drift across the frame.",
    prompt: "\"the ocean at night\"",
    video: REEL,
    poster: "/assets/media/paint/frame-3.jpg",
    start: 8,
    hue: 160,
    mirror: true,
  },
  {
    id: "storm",
    name: "Storm",
    title: "Electric storm",
    caption: "Anger and excitement sharpen everything. Fast, jagged, high-contrast marks.",
    prompt: "\"thunder and lightning\"",
    video: REEL,
    poster: "/assets/media/paint/frame-4.jpg",
    start: 12,
    hue: -40,
  },
  {
    id: "crowd",
    name: "Crowd",
    title: "A hundred voices",
    caption: "When the whole room joins in from their phones, every message becomes its own stroke.",
    prompt: "120 phones at once",
    video: REEL,
    poster: "/assets/media/paint/frame-5.jpg",
    start: 15,
    hue: 250,
  },
  {
    id: "body",
    name: "Body",
    title: "Move it",
    caption: "Stand in front of the canvas and it reads your pose and body language, painting with you.",
    prompt: "arms up, big energy",
    video: REEL,
    poster: "/assets/media/paint/frame-2.jpg",
    start: 4,
    hue: 90,
    mirror: true,
  },
  {
    id: "faces",
    name: "Faces",
    title: "Everyone's in it",
    caption: "Guests snap selfies on their phones and the canvas folds their faces into the paint.",
    prompt: "38 selfies at a gala",
    video: REEL,
    poster: "/assets/media/paint/frame-3.jpg",
    start: 10,
    hue: 300,
  },
];

export const steps = [
  {
    n: "01",
    title: "Scan",
    body: "Guests scan a QR code. No app, no login. Their phone becomes a paintbrush.",
  },
  {
    n: "02",
    title: "Say anything",
    body: "They type or speak whatever's on their mind. A word, a wish, a terrible joke.",
  },
  {
    n: "03",
    title: "Watch it paint",
    body: "AI reads the feeling behind it and turns it into colour, shape and motion, live on the big screen.",
  },
];

export const formats = [
  {
    id: "projector",
    name: "Projection",
    body: "Wall-sized and immersive. Best for dark rooms, foyers, launches and anything after sunset.",
    spec: "Projector + screen or blank wall",
  },
  {
    id: "frame",
    name: "Frame TV",
    body: "Hung like a real painting. Feels like a gallery piece that happens to be alive.",
    spec: "Samsung Frame style TV, portrait",
  },
  {
    id: "led",
    name: "LED wall",
    body: "Bright enough for daylight, trade show floors and big crowds.",
    spec: "Your LED wall or one we hire in",
  },
];

export const extensions = [
  {
    id: "crowd",
    name: "Crowd painting",
    body: "Everyone in the room paints together from their phones by typing or talking. The canvas becomes a live portrait of the crowd's mood.",
  },
  {
    id: "body",
    name: "Body reading",
    body: "A camera reads pose, body language and sentiment of whoever steps up, and rigs their movement into the brushwork.",
  },
  {
    id: "photo",
    name: "Photo painting",
    body: "Add a camera, or let guests upload selfies from their phones. Faces from across the crowd get woven into the brushwork, so the final piece is a portrait of everyone there.",
  },
  {
    id: "voice",
    name: "Talk back",
    body: "Give the painting a voice. It listens, replies out loud and explains what it's painting and why.",
  },
];

// Indicative pricing. Update these to your real numbers.
export const packages = [
  {
    id: "canvas",
    name: "The Canvas",
    price: "From $2,500",
    blurb: "A single screen that listens and paints all day.",
    items: ["One screen or projection", "Crowd painting from phones", "Custom event canvas + QR", "Remote setup + support"],
  },
  {
    id: "activation",
    name: "The Activation",
    price: "From $5,500",
    blurb: "The full experience, run on the day.",
    featured: true,
    items: [
      "Everything in The Canvas",
      "One extension: body reading, photo painting or talk back",
      "Your branding and colour palette",
      "On-site setup + host",
      "Time-lapse video of the night",
    ],
  },
  {
    id: "custom",
    name: "Bespoke",
    price: "Let's talk",
    blurb: "Multi-screen, touring, or something nobody's tried yet.",
    items: ["Multiple canvases", "All extensions", "Custom AI behaviour", "Prints + takeaways for guests"],
  },
];

export const appearances = [
  { year: "2022", where: "Murdoch University", note: "Where it started" },
  { year: "2026", where: "Scitech, Perth", note: "A room full of kids shouting ideas" },
  { year: "Next", where: "Your event", note: "Launches, festivals, conferences, balls" },
];

export const faqs = [
  {
    q: "Do guests need to download anything?",
    a: "No. They scan a QR code and paint from their mobile browser.",
  },
  {
    q: "Is it suitable for kids?",
    a: "Yes. Messages are moderated before they reach the canvas, and kids are honestly the best painters.",
  },
  {
    q: "Can it match our brand?",
    a: "Yes. The palette, brush styles, intro screen and QR page can all be tuned to your event.",
  },
  {
    q: "Where do you travel?",
    a: "Based in Perth, WA. Happy to travel anywhere in Australia, or run it remotely with your AV team.",
  },
];

/** Where it fits best */
export const useCases = [
  "Art events + galleries",
  "Kids education + STEM",
  "Technology shows",
  "AI + innovation conferences",
  "Creative festivals",
  "Balls, galas + parties",
  "Brand launches",
  "Experimental activations",
  "Museums + science centres",
];
