import {
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type Project = {
  title: string;
  category: string;
  image: string;
  summary: string;
  tags: string[];
  live?: string;
  source?: string;
};

export type TimelineItem = {
  title: string;
  meta: string;
  description: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Asjdnnc", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya05yt/", icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/aditya05yt/", icon: Code2 },
  { label: "Email", href: "mailto:aditya05yt@gmail.com", icon: Mail },
];

export const highlights = [
  { value: "800+", label: "LeetCode problems solved" },
  { value: "10", label: "featured projects" },
  { value: "1905", label: "LeetCode contest rating" },
  { value: "3★", label: "CodeChef Rating" },
];

export const strengths = [
  {
    title: "Full-stack builds",
    detail:
      "I design responsive interfaces, REST-backed flows, authentication patterns, and database-driven features with the MERN stack.",
  },
  {
    title: "Problem solving",
    detail:
      "I use data structures, algorithms, and Java fundamentals to reason through performance and implementation tradeoffs.",
  },
  {
    title: "AI/ML curiosity",
    detail:
      "I explore Python-based machine learning ideas and experiments while building a stronger software engineering base.",
  },
];

export const skillGroups: SkillGroup[] = [
  { title: "Core", items: ["DSA", "Java", "Python", "JavaScript"] },
  { title: "Frontend", items: ["React", "Next.js", "HTML5", "CSS3", "Responsive UI"] },
  { title: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL","Redis"] },
  { title: "Tools", items: ["Git", "GitHub", "Postman","Graphql", "Deployment", "Debugging"] },
  { title: "Exploring", items: ["AI/ML", "Data analysis", "Model experiments"] },
];

export const education: TimelineItem[] = [
  {
    title: "Indian Institute of Information Technology, Sonepat",
    meta: "B.Tech, Computer Science and Engineering - Cgpa 9.2",
    description:
      "I am building a strong foundation in algorithms, data structures, object-oriented design, and applied software development.",
  },
  {
    title: "Delhi Public School, Dhanbad",
    meta: "Class 12, CBSE - 93.6%",
    description:
      "I completed higher secondary education with a science and technology-focused academic track.",
  },
];

export const experience: TimelineItem[] = [
  {
  title: "IIIT Sonepat Official Website",
  meta: "2024 - Present",
  description:
    "Developed and managed the official IIIT Sonepat website, delivering secure role-based access, content management, and scalable deployment solutions.",
},
  {
  title: "Quickkart.com.au – Ecommerce Website (Freelance)",
  meta: "Jul 2025 - Sep 2025",
  description:
    "Built and deployed a production-grade multi-country eCommerce platform using Saleor, Next.js, Docker, and Nginx, managing 400,000+ products and optimizing SEO, scalability, and deployment workflows.",
},
{
  title: "National Informatics Centre (NIC) - Fullstack Intern",
  meta: "Jun 2024 - Aug 2024",
  description:
    "Contributed in building secure full-stack government applications (govDrive) serving many users, implementing frontend changes and deployment workflows on government infrastructure.",
},
];

export const projects: Project[] = [
  {
    title: "Quickkart.com.au",
    category: "Ecommerce Website",
    image: "/projects/quickkart.png",
    summary:
      "A ecommerce platform built around Saleor and Next.js, delivering a robust, scalable, multi-country shopping experience with 400,000+ products and seamless deployment workflows.",
    tags: ["Next.js", "Saleor", "Deployment"],
    live: "https://www.quickkart.com.au/",
  },
  {
    title: "IIIT Sonepat Official Website",
    category: "Website",
    image: "/projects/iiits.png",
    summary:
      "Official website of IIIT Sonepat, built to provide information about the institute, its programs, and events.",
    tags: ["MERN", "Deployment"],
    live: "https://www.iiitsonepat.ac.in/",
  },
  {
    title: "Testify",
    category: "Website",
    image: "/projects/testify.png",
    summary:
      "An online exam and platform (Saas)",
    tags: ["Next.js", "AI", "Deployment"],
    live: "https://testify-mocha.vercel.app/",
    source : "https://github.com/Asjdnnc/testify",
  },
  {
    title: "An Online Ticket booking Platform ",
    category: "Hackathon Project",
    image: "/projects/ticket.png",
    summary:
      "A high-performance, real-time seat booking system with distributed locking, concurrent booking handling, and live seat status updates across all connected clients.",
    tags: ["Next.js", "Redis","WebSocket", "Deployment"],
    live: "https://hack-the-winter-r3.vercel.app/",
    source: "https://github.com/Asjdnnc/Hack-The-Winter-R3",
  },
  {
    title: "Wanderstay",
    category: "Full-stack travel listings",
    image: "/projects/wanderstay.png",
    summary:
      "A listings platform for stays and travel properties, built around full-stack CRUD flows and a deployed user experience.",
    tags: ["MERN", "Listings", "Deployment"],
    live: "https://majorproject-0elt.onrender.com/listings",
    source: "https://github.com/Asjdnnc/majorProject/tree/master",
  },
  {
    title: "Marvel Movies",
    category: "Entertainment interface",
    image: "/projects/marvel.png",
    summary:
      "A Marvel-themed movie browsing experience with a visual-first interface and deployed frontend.",
    tags: ["React", "API", "Deployment"],
    live: "https://marvel-six-omega.vercel.app/",
    source: "https://github.com/Asjdnnc/marvel",
  },
];

export const contactCards = [
  { label: "Email", value: "aditya05yt@gmail.com", href: "mailto:aditya05yt@gmail.com", icon: Mail },
  { label: "Location", value: "Patna, Bihar", href: "https://www.google.com/maps/search/Patna+Bihar", icon: MapPin },
  { label: "GitHub", value: "github.com/Asjdnnc", href: "https://github.com/Asjdnnc", icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/aditya05yt", href: "https://www.linkedin.com/in/aditya05yt/", icon: Linkedin },
  { label: "LeetCode", value: "leetcode.com/u/aditya05yt", href: "https://leetcode.com/u/aditya05yt/", icon: Trophy },
];
