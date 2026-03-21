const STORAGE_KEY = "techTitans_siteData";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface SiteStats {
  teamMembers: string;
  seasons: string;
  robotsBuilt: string;
  competitions: string;
}

export interface RobotScores {
  bestScore: string;
  avgScore: string;
  missions: string;
}

export interface PageContent {
  home: {
    tagline: string;
    slogan: string;
  };
  about: {
    paragraph1: string;
    paragraph2: string;
  };
  innovation: {
    challengeDescription: string;
    steps: { title: string; description: string }[];
  };
  robot: {
    features: { title: string; description: string }[];
  };
  coreValues: { title: string; description: string; howWeDoIt: string }[];
}

export interface SiteData {
  teamMembers: TeamMember[];
  stats: SiteStats;
  robotScores: RobotScores;
  pageContent: PageContent;
  penpotEmbedUrl: string;
}

export const defaultSiteData: SiteData = {
  teamMembers: [
    { id: "1", name: "Arjun Katta", role: "Team Member" },
    { id: "2", name: "Yogi Desai", role: "Team Member" },
    { id: "3", name: "Shreyan Sharma", role: "Team Member" },
    { id: "4", name: "Aarush Mene", role: "Team Member" },
    { id: "5", name: "Atharv Pardeshi", role: "Team Member" },
    { id: "6", name: "Anish Rudras", role: "Team Member" },
    { id: "7", name: "Prakhar Purohit", role: "Team Member" },
    { id: "8", name: "Sachin Senthil Kumar", role: "Team Member" },
  ],
  stats: {
    teamMembers: "10",
    seasons: "3+",
    robotsBuilt: "5",
    competitions: "8+",
  },
  robotScores: {
    bestScore: "--",
    avgScore: "--",
    missions: "--",
  },
  pageContent: {
    home: {
      tagline: "FLL Team #32795",
      slogan: '"The future of the past is in our hands"',
    },
    about: {
      paragraph1:
        "We are Tech Titans — a passionate FIRST LEGO League team dedicated to innovation, teamwork, and creative problem-solving. We believe the future of the past is in our hands, and we're building it one brick at a time.",
      paragraph2:
        "FIRST LEGO League challenges kids to think like scientists and engineers. Our team designs, builds, and programs autonomous robots to complete missions, while also developing an innovative solution to a real-world problem.",
    },
    innovation: {
      challengeDescription:
        "Every FLL season presents a new theme and challenge. Our team researches a real-world problem related to the season's theme, identifies an innovative solution, and shares it with our community. This page will be updated with our current season's Innovation Project details.",
      steps: [
        { title: "Research", description: "We identified a real-world problem by researching our community and talking to experts in the field." },
        { title: "Problem Statement", description: "We defined the specific challenge we wanted to address and explored what solutions already exist." },
        { title: "Our Solution", description: "We developed an innovative solution that is creative, practical, and makes a real impact on the problem." },
        { title: "Sharing", description: "We presented our findings and solution to experts, community members, and at FLL competitions." },
      ],
    },
    robot: {
      features: [
        { title: "Design & Build", description: "Our robot is designed for precision and reliability. We use LEGO SPIKE Prime to build a machine that can tackle every mission on the field." },
        { title: "Mission Strategy", description: "We analyze each mission carefully, planning the optimal run order and attachment designs to maximize our score within the 2.5-minute rounds." },
        { title: "Programming", description: "We program our robot using block-based and Python code, utilizing sensors for precise navigation, alignment, and consistent performance." },
        { title: "Competition Results", description: "Our team competes at regional and state-level tournaments, continuously improving our robot score with each competition." },
      ],
    },
    coreValues: [
      { title: "Discovery", description: "We explore new skills and ideas, learning something new every meeting. Curiosity drives our team forward.", howWeDoIt: "We encourage every member to ask questions, experiment, and try things that might not work the first time." },
      { title: "Innovation", description: "We use creativity and persistence to solve problems. There's always a better way — we just have to find it.", howWeDoIt: "We brainstorm freely, prototype quickly, and aren't afraid to start over when we find a better approach." },
      { title: "Impact", description: "We apply what we learn to improve our world. Our work extends beyond the competition table.", howWeDoIt: "Our Innovation Project tackles real community problems, and we share our solutions with the people who need them." },
      { title: "Inclusion", description: "We respect each other and embrace our differences. Everyone's voice matters on this team.", howWeDoIt: "We make sure every team member has a role, a voice, and the support they need to contribute their best." },
      { title: "Teamwork", description: "We are stronger together. We collaborate, communicate, and build on each other's strengths.", howWeDoIt: "We divide tasks based on interests and skills, hold regular team meetings, and celebrate each other's wins." },
      { title: "Fun", description: "We enjoy what we do! Learning, competing, and growing together should always be fun.", howWeDoIt: "We balance hard work with team bonding, celebrate milestones, and keep the energy positive at every meeting." },
    ],
  },
  penpotEmbedUrl: "",
};

export function getSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSiteData, ...parsed };
    }
  } catch {
    // ignore parse errors
  }
  return defaultSiteData;
}

export function saveSiteData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetSiteData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
