import { Project, SkillGroup, TimelineItem, LeetCodeProblem } from "./types";

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2026",
    title: "RLaaS Release",
    subtitle: "Full Architecture Finalization",
    details: "Launched distributed rate limiting services supported by Redis clustering and LUA scripts, achieving sub-millisecond latencies under high concurrency."
  },
  {
    year: "2025",
    title: "Microsoft Azure AI Internship",
    subtitle: "AICTE Virtual Program · Certified",
    details: "Explored advanced machine learning algorithms, trained customized vision trackers, and specialized in deploying pipeline solutions with azure orchestration."
  },
  {
    year: "2025",
    title: "IBM × EDUNET Internship",
    subtitle: "Frontend Developer · Certified",
    details: "Built interactive dashboards and single-page client engines, implementing responsive state management models and visual ergonomics."
  },
  {
    year: "2025",
    title: "AlgoMentor AI Project",
    subtitle: "LLM Integration & Deployment",
    details: "Architected socratic code evaluation mechanisms utilizing the Gemini API, structuring helpful prompting frameworks for DSA candidates."
  },
  {
    year: "2024 - Present",
    title: "B.Tech IT · Sri Shakthi",
    subtitle: "Academic Foundations & Core CS",
    details: "Studying Data Structures & Algorithms, Operating Systems, Database Management, and Object-Oriented Software Design at Sri Shakthi Institute in Coimbatore."
  },
  {
    year: "2023 - 2025",
    title: "HSC Completion",
    subtitle: "Strong Mathematical Base",
    details: "Consolidated a solid foundation in calculus and computer logic, starting in-depth self-teaching of programming languages."
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "LANGUAGES",
    icon: "code",
    tags: ["JAVA", "PYTHON", "C", "JAVASCRIPT", "TYPESCRIPT"]
  },
  {
    title: "MOBILE & WEB",
    icon: "smartphone",
    tags: ["ANDROID (JAVA)", "ANDROID STUDIO", "HTML5", "CSS3", "REACT", "TAILWIND CSS"]
  },
  {
    title: "AI / ML",
    icon: "psychology",
    tags: ["TENSORFLOW", "OPENCV", "MEDIAPIPE", "GEMINI API"]
  },
  {
    title: "BACKEND & DATABASES",
    icon: "storage",
    tags: ["FASTAPI", "SPRING BOOT", "POSTGRESQL", "REDIS", "MONGODB", "SQL"]
  },
  {
    title: "TOOLS & DEVOPS",
    icon: "build",
    tags: ["GIT", "DOCKER", "LINUX", "VS CODE", "GCR", "POSTMAN"]
  },
  {
    title: "HARDWARE & IOT",
    icon: "memory",
    tags: ["RASPBERRY PI", "ARDUINO", "EMBEDDED SYSTEMS"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "rlaas",
    title: "RLaaS — Rate Limiter as a Service",
    description: "Distributed API protection framework supporting 5 algorithms. Redis-backed for high-throughput microservices.",
    badge: "FEATURED_GOLD",
    category: "Distributed Systems & Cloud",
    techs: ["Java", "Spring Boot", "Redis"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "shield",
    featured: true,
    featuredColor: "gold",
    content: "An enterprise-grade rate-limiting solution configured to secure high-concurrency environments. Utilizes Token Bucket, Leaky Bucket, Sliding Window Log, Fixed Window, and Sliding Window Counter. Supports low latency via inline Redis LUA algorithms."
  },
  {
    id: "nexus",
    title: "NexusCloud Orchestration Engine",
    description: "Multi-Cloud Orchestration engine for seamless resource provisioning across providers.",
    badge: "CORE_SYSTEM",
    category: "Cloud Infrastructure",
    techs: ["Python", "Docker", "Kubernetes"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "cloud",
    featured: true,
    featuredColor: "gold",
    content: "Standardized orchestration engine that interfaces with cluster deployment providers. Provides a lightweight CLI interface to automatically manage compute pods and dynamic load balancers."
  },
  {
    id: "swara",
    title: "Swara Music Player",
    description: "Offline Android Music Player built with modern architectural patterns for high efficiency.",
    badge: "MOBILE_APP",
    category: "Android Mobile",
    techs: ["Kotlin", "Java", "ExoPlayer"],
    github: "https://github.com/PRABHUSIDDARTH/SwaraApp",
    iconName: "music",
    featured: false,
    content: "Native Android application implementing Clean Architecture + MVVM models. Employs ExoPlayer integration, dynamic playlist curation, notification widget channels, and sound card adjustments."
  },
  {
    id: "algomentor",
    title: "AlgoMentor AI DSA Coach",
    description: "AI-Powered DSA Assistant leveraging Gemini API for personalized problem-solving guidance.",
    badge: "AI_AGENT",
    category: "Generative AI",
    techs: ["Python", "FastAPI", "Gemini API"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "brain",
    featured: false,
    content: "A specialized tech mentor that evaluates algorithms socratically, assisting candidates in solving DSA exercises and optimizing spatial-temporal complexities."
  },
  {
    id: "distraction",
    title: "Distraction Monitor",
    description: "AI Attention Tracker using computer vision to detect focus levels and trigger alerts.",
    badge: "VISION_AI",
    category: "Computer Vision",
    techs: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "eye",
    featured: false,
    content: "Real-time computer vision agent that measures eye aspect ratio (EAR) and mouth gap ratios to calculate attention indexes and emit custom focus warnings."
  },
  {
    id: "phishing",
    title: "Phishing Detector",
    description: "Security tool for URL pattern analysis and malicious link detection using heuristic filters.",
    badge: "SECURITY",
    category: "Information Security",
    techs: ["TypeScript", "Heuristics", "React"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "alert-triangle",
    featured: false,
    content: "Security validator designed to dissect URI networks. Scans domain namespaces looking for homograph targets, excessive sub-level framings, and keyword baiting indicators."
  },
  {
    id: "elected",
    title: "ElectED awareness portal",
    description: "Modern educational portal for election awareness and voting literacy.",
    badge: "WEB_APP",
    category: "Web Application",
    techs: ["HTML", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "vote",
    featured: false,
    content: "Fully responsive system packed with voting tutorials, election map simulations, and interactive civic literacy quizzes to increase voting demographics."
  },
  {
    id: "blog",
    title: "Markdown Blog Website",
    description: "Dynamic content management system with user authentication and markdown support.",
    badge: "FULLSTACK",
    category: "Web Application",
    techs: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "edit",
    featured: false,
    content: "Self-hosted blogging canvas which compiles markdown source templates on the fly, with high-security route controllers and reader-analytics boards."
  },
  {
    id: "bank",
    title: "Bank Management System",
    description: "Console-based banking simulation managing accounts, transactions, and user records.",
    badge: "CORE_JAVA",
    category: "Console Utility",
    techs: ["Java", "OOP", "JDBC"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "dollar-sign",
    featured: false,
    content: "Robust console implementation for tracking credit ledgers, processing cross-account wire flows, handling safe password salts, and writing transaction audit sheets."
  },
  {
    id: "inventory",
    title: "Inventory Management System",
    description: "Scalable solution for stock tracking, order processing, and supplier management.",
    badge: "ENTERPRISE",
    category: "Enterprise System",
    techs: ["Python", "SQLite", "Tkinter"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "package",
    featured: false,
    content: "High-performance enterprise tracker utilizing structured relational triggers to log shipping entries, automatically calculate restock lists, and alert on low stock levels."
  },
  {
    id: "task",
    title: "Minimalist Task Manager",
    description: "Minimalist productivity tool with local persistence and category filtering.",
    badge: "UTILITY",
    category: "Web Application",
    techs: ["React", "LocalStorage", "Motion"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "check-square",
    featured: false,
    content: "Productive dashboard using smooth, responsive drag-and-drop mechanics, interactive deadline charts, categorizations, and persistent client-side schemas."
  },
  {
    id: "javamicro",
    title: "Java Micro Projects Repository",
    description: "A curated repository of 20+ logic-heavy mini applications and algorithms.",
    badge: "COLLECTION",
    category: "Data Structures",
    techs: ["Java", "Multithreading", "Algorithms"],
    github: "https://github.com/PRABHUSIDDARTH",
    iconName: "folder",
    featured: false,
    content: "Collection of recursive maze resolvers, multithreaded ticket bookings, socket message bridges, file compression plugins, and general algorithm validations."
  }
];

export const LEETCODE_PROBLEMS: LeetCodeProblem[] = [
  {
    id: "twosum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    initialCode: `function twoSum(nums: number[], target: number): number[] {
  // Use a Hash Map for O(N) lookup
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,
    testCases: [
      { input: "[2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "[3, 2, 4], target = 6", expected: "[1, 2]" }
    ]
  },
  {
    id: "revlist",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    description: "Given the head of a singly linked list, reverse the list, and return its reversed representation.\nMust handle iterative or recursive patterns in O(N) time complexity.",
    initialCode: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  
  return prev;
}`,
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: "[5, 4, 3, 2, 1]" }
    ]
  },
  {
    id: "water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, find two lines that together with the x-axis forms a container, such that the container contains the most water.",
    initialCode: `function maxArea(height: number[]): number {
  let maxVal = 0;
  let left = 0;
  let right = height.length - 1;
  
  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    maxVal = Math.max(maxVal, width * currentHeight);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxVal;
}`,
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" }
    ]
  },
  {
    id: "merge",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Divide & Conquer",
    description: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\nMerge all the linked-lists into one sorted linked-list and return it.",
    initialCode: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  // Try implementing a Min-Heap or Divide & Conquer!
  // Socratic Coach tip: A divide & conquer approach splits the array
  // of lists and merges them pairwise, reducing runtime to O(N log k).
  
  return null; 
}`,
    testCases: [
      { input: "[[1,4,5], [1,3,4], [2,6]]", expected: "[1,1,2,3,4,4,5,6]" }
    ]
  }
];
