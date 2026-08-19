export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  techs: string[];
  github: string;
  category: string;
  stars: number;
  featured: boolean;
  badge: string;
  color: string;
}

export interface TechNode {
  id: string;
  label: string;
  category: 'language' | 'framework' | 'tool' | 'ai' | 'infra';
  x: number;
  y: number;
  z: number;
}

export interface NavItem {
  index: string;
  label: string;
  section: number;
}
