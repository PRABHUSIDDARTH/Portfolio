export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  details?: string;
}

export interface SkillGroup {
  title: string;
  icon: string;
  tags: string[];
  subtext?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  badge: string;
  category: string;
  techs: string[];
  github: string;
  extLink?: string;
  content: string;
  featured: boolean;
  featuredColor?: "cyan" | "gold";
  iconName: string;
}

export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  category: string;
  initialCode: string;
  testCases: { input: string; expected: string }[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}
