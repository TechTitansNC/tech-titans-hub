const STORAGE_KEY = "techTitans_siteData_v2";

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
        { id: "h2", type: "heading", props: { text: "Explore Our World", level: "h2", accent: "Our World", align: "center" } },
        { id: "h3", type: "cards", props: { columns: "3", cards: [
          { title: "About Us", description: "Learn about our team and mission", icon: "users" },
          { title: "Team Members", description: "Meet the people behind the robots", icon: "users" },
          { title: "Innovation Project", description: "Our real-world problem solving", icon: "lightbulb" },
          { title: "Robot Games", description: "Our robot design and strategy", icon: "bot" },
          { title: "Core Values", description: "The values that drive us", icon: "heart" },
        ] } },
      ],
    },
    {
      id: "about", title: "About Us", slug: "/about", showInNav: true,
      blocks: [
        { id: "a1", type: "hero", props: { title: "About Us", subtitle: "Get to know Tech Titans", badge: "", bgColor: "black" } },
        { id: "a2", type: "heading", props: { text: "Who We Are", level: "h2", accent: "Are", align: "left" } },
        { id: "a3", type: "text", props: { content: "We are Tech Titans — a passionate FIRST LEGO League team dedicated to innovation, teamwork, and creative problem-solving. We believe the future of the past is in our hands, and we're building it one brick at a time.", align: "left" } },
        { id: "a4", type: "text", props: { content: "FIRST LEGO League challenges kids to think like scientists and engineers. Our team designs, builds, and programs autonomous robots to complete missions, while also developing an innovative solution to a real-world problem.", align: "left" } },
        { id: "a5", type: "image", props: { src: "", alt: "Team Photo", caption: "Team Photo Placeholder", height: "256" } },
        { id: "a6", type: "stats", props: { stats: [
          { label: "Team Members", value: "10" },
          { label: "Seasons", value: "3+" },
          { label: "Robots Built", value: "5" },
          { label: "Competitions", value: "8+" },
        ] } },
      ],
    },
    {
      id: "team", title: "Team Members", slug: "/team", showInNav: true,
      blocks: [
        { id: "t1", type: "hero", props: { title: "Team Members", subtitle: "Meet the people behind Tech Titans", badge: "", bgColor: "black" } },
        { id: "t2", type: "team", props: { members: [
          { id: "1", name: "Arjun Katta", role: "Team Member" },
          { id: "2", name: "Yogi Desai", role: "Team Member" },
          { id: "3", name: "Shreyan Sharma", role: "Team Member" },
          { id: "4", name: "Aarush Mene", role: "Team Member" },
          { id: "5", name: "Atharv Pardeshi", role: "Team Member" },
          { id: "6", name: "Anish Rudras", role: "Team Member" },
          { id: "7", name: "Prakhar Purohit", role: "Team Member" },
          { id: "8", name: "Sachin Senthil Kumar", role: "Team Member" },
        ] } },
      ],
    },
    {
      id: "innovation", title: "Innovation Project", slug: "/innovation", showInNav: true,
      blocks: [
        { id: "i1", type: "hero", props: { title: "Innovation Project", subtitle: "Solving real-world problems with creativity", badge: "", bgColor: "black" } },
        { id: "i2", type: "heading", props: { text: "The Challenge", level: "h2", accent: "Challenge", align: "left" } },
        { id: "i3", type: "text", props: { content: "Every FLL season presents a new theme and challenge. Our team researches a real-world problem related to the season's theme, identifies an innovative solution, and shares it with our community.", align: "left" } },
        { id: "i4", type: "iconFeatures", props: { features: [
          { icon: "search", title: "Research", description: "We identified a real-world problem by researching our community and talking to experts in the field." },
          { icon: "lightbulb", title: "Problem Statement", description: "We defined the specific challenge we wanted to address and explored what solutions already exist." },
          { icon: "flask", title: "Our Solution", description: "We developed an innovative solution that is creative, practical, and makes a real impact on the problem." },
          { icon: "presentation", title: "Sharing", description: "We presented our findings and solution to experts, community members, and at FLL competitions." },
        ] } },
        { id: "i5", type: "banner", props: { text: "Project Details Coming Soon", buttonText: "", href: "", bgColor: "blue" } },
      ],
    },
    {
      id: "robot", title: "Robot Games", slug: "/robot", showInNav: true,
      blocks: [
        { id: "r1", type: "hero", props: { title: "Robot Games", subtitle: "Our robot design, strategy, and achievements", badge: "", bgColor: "black" } },
        { id: "r2", type: "image", props: { src: "", alt: "Robot Photo", caption: "Robot Photo / Diagram Placeholder", height: "288" } },
        { id: "r3", type: "iconFeatures", props: { features: [
          { icon: "cpu", title: "Design & Build", description: "Our robot is designed for precision and reliability. We use LEGO SPIKE Prime to build a machine that can tackle every mission on the field." },
          { icon: "target", title: "Mission Strategy", description: "We analyze each mission carefully, planning the optimal run order and attachment designs to maximize our score within the 2.5-minute rounds." },
          { icon: "bot", title: "Programming", description: "We program our robot using block-based and Python code, utilizing sensors for precise navigation, alignment, and consistent performance." },
          { icon: "trophy", title: "Competition Results", description: "Our team competes at regional and state-level tournaments, continuously improving our robot score with each competition." },
        ] } },
        { id: "r4", type: "stats", props: { stats: [
          { label: "Best Score", value: "--" },
          { label: "Avg Score", value: "--" },
          { label: "Missions", value: "--" },
        ] } },
      ],
    },
    {
      id: "corevalues", title: "Core Values", slug: "/corevalues", showInNav: true,
      blocks: [
        { id: "c1", type: "hero", props: { title: "Core Values", subtitle: "The pillars that guide everything we do", badge: "", bgColor: "black" } },
        { id: "c2", type: "coreValues", props: { values: [
          { title: "Discovery", description: "We explore new skills and ideas, learning something new every meeting.", howWeDoIt: "We encourage every member to ask questions, experiment, and try things that might not work the first time." },
          { title: "Innovation", description: "We use creativity and persistence to solve problems.", howWeDoIt: "We brainstorm freely, prototype quickly, and aren't afraid to start over when we find a better approach." },
          { title: "Impact", description: "We apply what we learn to improve our world.", howWeDoIt: "Our Innovation Project tackles real community problems, and we share our solutions with the people who need them." },
          { title: "Inclusion", description: "We respect each other and embrace our differences.", howWeDoIt: "We make sure every team member has a role, a voice, and the support they need to contribute their best." },
          { title: "Teamwork", description: "We are stronger together.", howWeDoIt: "We divide tasks based on interests and skills, hold regular team meetings, and celebrate each other's wins." },
          { title: "Fun", description: "We enjoy what we do!", howWeDoIt: "We balance hard work with team bonding, celebrate milestones, and keep the energy positive at every meeting." },
        ] } },
      ],
    },
  ],
  penpotEmbedUrl: "",
};

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
