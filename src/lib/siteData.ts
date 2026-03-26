const STORAGE_KEY = "techTitans_siteData_v2";
const PUBLISHED_KEY = "techTitans_publishedData_v2";

// ── Block Types ──

export type BlockType =
  | "hero"
  | "heading"
  | "text"
  | "image"
  | "button"
  | "divider"
  | "spacer"
  | "cards"
  | "stats"
  | "team"
  | "coreValues"
  | "twoColumn"
  | "iconFeatures"
  | "quote"
  | "banner";

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}

export interface PageData {
  id: string;
  title: string;
  slug: string;
  showInNav: boolean;
  blocks: Block[];
}

export interface SiteData {
  pages: PageData[];
  penpotEmbedUrl: string;
}

// ── Block Defaults ──

export function createBlock(type: BlockType): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case "hero":
      return { id, type, props: { title: "Page Title", subtitle: "Subtitle text", badge: "", bgColor: "black" } };
    case "heading":
      return { id, type, props: { text: "Section Heading", level: "h2", accent: "Titans", align: "left" } };
    case "text":
      return { id, type, props: { content: "Enter your text content here. You can write multiple paragraphs.", align: "left" } };
    case "image":
      return { id, type, props: { src: "", alt: "Image description", caption: "", height: "256" } };
    case "button":
      return { id, type, props: { text: "Click Me", href: "#", variant: "primary", align: "left" } };
    case "divider":
      return { id, type, props: { color: "blue", width: "64" } };
    case "spacer":
      return { id, type, props: { height: "48" } };
    case "cards":
      return { id, type, props: { columns: "3", cards: [
        { title: "Card 1", description: "Description here", icon: "star" },
        { title: "Card 2", description: "Description here", icon: "heart" },
        { title: "Card 3", description: "Description here", icon: "zap" },
      ] } };
    case "stats":
      return { id, type, props: { stats: [
        { label: "Stat 1", value: "100" },
        { label: "Stat 2", value: "200" },
        { label: "Stat 3", value: "300" },
        { label: "Stat 4", value: "400" },
      ] } };
    case "team":
      return { id, type, props: { members: [
        { id: "1", name: "Member Name", role: "Role" },
      ] } };
    case "coreValues":
      return { id, type, props: { values: [
        { title: "Value", description: "Description", howWeDoIt: "How we live this" },
      ] } };
    case "twoColumn":
      return { id, type, props: { left: "Left column content", right: "Right column content" } };
    case "iconFeatures":
      return { id, type, props: { features: [
        { icon: "cpu", title: "Feature 1", description: "Feature description" },
        { icon: "target", title: "Feature 2", description: "Feature description" },
      ] } };
    case "quote":
      return { id, type, props: { text: "A meaningful quote goes here.", author: "Author Name" } };
    case "banner":
      return { id, type, props: { text: "Important announcement or call to action!", buttonText: "Learn More", href: "#", bgColor: "blue" } };
    default:
      return { id, type, props: {} };
  }
}

// ── Default Pages ──

export const defaultSiteData: SiteData = {
  pages: [
    {
      id: "home", title: "Home", slug: "/", showInNav: true,
      blocks: [
        { id: "h1", type: "hero", props: { title: "Tech Titans", subtitle: '"The future of the past is in our hands"', badge: "FLL Team #32795", bgColor: "black" } },
      ],
    },
  ],
  penpotEmbedUrl: "",
};

export function getPublishedData(): SiteData | null {
  try {
    const stored = localStorage.getItem(PUBLISHED_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return null;
}

export function publishSiteData(data: SiteData): void {
  localStorage.setItem(PUBLISHED_KEY, JSON.stringify(data));
}

export function getSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch { /* ignore */ }
  return defaultSiteData;
}

export function saveSiteData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetSiteData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
