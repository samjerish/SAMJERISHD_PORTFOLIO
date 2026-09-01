export type Project = {
  id: number;
  name: string;
  description: string;
  details: string;
  problemStatement: string;
  solution: string;
  link: string;
  image: string;
  tag?: string;
  date?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: "FOCUSFLOW",
    description:
      '<span style="color: #4ade80; font-weight: 600;">Developed for students.</span>',
    details:
      'A productivity application combining task management, focus sessions, progress tracking, and productivity monitoring to help users work more efficiently. <span style="color: #4ade80; font-weight: 600;">Developed for students.</span>',
    problemStatement:
      "Students and professionals often struggle with distractions, poor time management, and difficulty maintaining focus while studying or working.",
    solution:
      "FOCUSFLOW is a productivity system that helps users organize tasks, manage their time, and maintain focused work sessions.",
    link: "https://samjerish.github.io/FOCUSFLOW",
    image: `${import.meta.env.BASE_URL}PROJECTS ASSESTS/focsuflow.png`,
    tag: "Productivity • Task Management",
    date: "2026",
  },
  {
    id: 3,
    name: "COMMUNITY MAINTENANCE MANAGEMENT SYSTEM",
    description:
      '<span style="color: #4ade80; font-weight: 600;">Developed for SSN Nagar @Hosur.</span>',
    details:
      'A community management system connecting residents, maintenance staff, and administrators. Issues can be tracked through stages such as Reported, Assigned, In Progress, and Resolved. <span style="color: #4ade80; font-weight: 600;">Developed for SSN Nagar @Hosur.</span>',
    problemStatement:
      "Maintenance issues in residential communities can be difficult to report, assign, monitor, and resolve efficiently using manual processes.",
    solution:
      "A centralized platform where residents can report maintenance issues and administrators can assign, track, and manage them until resolution.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS ASSESTS/community_maintance.png`,
    tag: "Community Management • Database",
    date: "2025",
  },
  {
    id: 4,
    name: "DATABASE MANAGEMENT SYSTEM USING FIREBASE",
    description:
      '<span style="color: #4ade80; font-weight: 600;">Developed specifically for DYNAMIC TOOLING SYSTEM.</span>',
    details:
      'A Firebase-based project demonstrating CRUD operations, user authentication, cloud data storage, and real-time data management. <span style="color: #4ade80; font-weight: 600;">Developed specifically for DYNAMIC TOOLING SYSTEM.</span>',
    problemStatement:
      "Applications require a reliable way to store, retrieve, update, and manage data efficiently without building complex backend infrastructure from scratch.",
    solution:
      "A cloud-based database management system using Firebase for data storage, authentication, and real-time database operations.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS ASSESTS/DATABASE_MANGANMENT.png`,
    tag: "Firebase • Cloud Database",
    date: "2025",
  },
  {
    id: 5,
    name: "AUTONOMOUS UNIVERSITY ROBOT",
    description: "",
    details:
      "An intelligent robotic system combining sensors, obstacle detection, navigation, decision-making, and autonomous movement to operate within a university environment.",
    problemStatement:
      "Large university campuses require systems that can navigate different environments and perform tasks without continuous human control.",
    solution:
      "An autonomous university robot capable of navigating campus environments and performing predefined tasks using sensors and intelligent decision-making.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS ASSESTS/ir project.png`,
    tag: "Robotics • Autonomous Navigation",
    date: "2024",
  },
  {
    id: 2,
    name: "ECOTRACKER",
    description: "",
    details:
      "An environmental tracking application that allows users to record eco-friendly activities, monitor their environmental impact, and visualize their sustainability progress.",
    problemStatement:
      "People often lack awareness of their environmental impact, including waste generation, resource consumption, and daily sustainability habits.",
    solution:
      "ECOTRACKER helps users monitor their environmental activities and encourages more sustainable everyday habits.",
    link: "https://samjerish.github.io/ECOTRACKER",
    image: `${import.meta.env.BASE_URL}PROJECTS ASSESTS/ecotracker.png`,
    tag: "Sustainability • Data Tracking",
    date: "2026",
  },
  {
    id: 6,
    name: "AUTONOMOUS ROBOT USING COMPUTER VISION",
    description: "",
    details:
      "A computer-vision-based autonomous robotic system that uses a camera and vision algorithms to understand its surroundings and navigate accordingly.",
    problemStatement:
      "Traditional robots may have limited awareness of their surroundings and often depend on predefined paths or basic sensors.",
    solution:
      "Computer vision enables the robot to visually perceive its environment, detect objects and obstacles, and make navigation decisions.",
    link: "",
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop",
    tag: "Computer Vision • AI",
    date: "2024",
  },
];
