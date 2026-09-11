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
  brandName?: string;
  headline?: string;
  pills?: string[];
  cardClass?: string;
  shortDesc?: string;
  techStack?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    name: "FOCUSFLOW",
    brandName: "FocusFlow",
    headline: "Productivity System That Helped Students Eliminate Distractions & Build Focus",
    pills: ["Productivity", "Task Management", "Students"],
    cardClass: "theme-focusflow",
    shortDesc: "Turned the urge to procrastinate into an intuitive, structured focus engine developed specifically for students.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "LocalStorage"],
    description:
      '<span style="color: #4ade80; font-weight: 600;">Developed for students.</span>',
    details:
      'A productivity application combining task management, focus sessions, progress tracking, and productivity monitoring to help users work more efficiently. <span style="color: #4ade80; font-weight: 600;">Developed for students.</span>',
    problemStatement:
      "Students and professionals often struggle with distractions, poor time management, and difficulty maintaining focus while studying or working.",
    solution:
      "FOCUSFLOW is a productivity system that helps users organize tasks, manage their time, and maintain focused work sessions.",
    link: "https://samjerish.github.io/FOCUSFLOW",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/focsuflow.png`,
    tag: "Productivity • Task Management",
    date: "2026",
  },
  {
    id: 3,
    name: "COMMUNITY MAINTENANCE MANAGEMENT SYSTEM",
    brandName: "Community Maintenance",
    headline: "Digital Platform for Tracking Resident Maintenance Collection Records",
    pills: ["Payment Tracking", "Collections", "Database"],
    cardClass: "theme-community",
    shortDesc:
      'A web-based platform maintaining digital records of resident collections, payment histories, and financial contributions. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Developed for SSN Nagar @Hosur.</span>',
    techStack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    description:
      '<span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Developed for SSN Nagar @Hosur.</span>',
    details:
      'A web-based platform designed to maintain digital records of money collected from residents. It allows the organization to record payments, track individual contributions, manage collection history, and maintain a centralized database for easy monitoring and record keeping. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Developed for SSN Nagar @Hosur.</span>',
    problemStatement:
      "Residential communities often struggle with manual paper bookkeeping, tracking individual resident payments, and maintaining transparent collection histories.",
    solution:
      "A web-based platform designed to maintain digital records of money collected from residents. It allows the organization to record payments, track individual contributions, manage collection history, and maintain a centralized database for easy monitoring and record keeping.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/community_maintance.png`,
    tag: "Community Management • Database",
    date: "2025",
  },
  {
    id: 4,
    name: "DATABASE MANAGEMENT SYSTEM USING FIREBASE",
    brandName: "Firebase DBMS",
    headline: "Cloud Database & Real-Time Engine Built for Dynamic Tooling System",
    pills: ["Cloud Database", "Auth", "Real-Time"],
    cardClass: "theme-firebase",
    shortDesc:
      'Cloud database architecture demonstrating real-time CRUD operations, security rules, and user auth. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Developed for Dynamic Tooling System.</span>',
    techStack: ["Firebase", "Firestore", "JavaScript", "Cloud Auth", "Security Rules"],
    description:
      '<span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Developed for Dynamic Tooling System.</span>',
    details:
      'A Firebase-based project demonstrating CRUD operations, user authentication, cloud data storage, and real-time data management. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Developed for Dynamic Tooling System.</span>',
    problemStatement:
      "Applications require a reliable way to store, retrieve, update, and manage data efficiently without building complex backend infrastructure from scratch.",
    solution:
      "A cloud-based database management system using Firebase for data storage, authentication, and real-time database operations.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/DATABASE_MANGANMENT.png`,
    tag: "Firebase • Cloud Database",
    date: "2025",
  },
  {
    id: 2,
    name: "ECOTRACKER",
    brandName: "EcoTracker",
    headline: "Environmental Impact Tracker Inspiring Sustainable Daily Habits",
    pills: ["Sustainability", "Analytics", "Eco"],
    cardClass: "theme-ecotracker",
    shortDesc: "Environmental application helping users record eco actions, track carbon footprints, and visualize green progress.",
    techStack: ["JavaScript", "HTML5", "CSS3", "Data Analytics", "GitHub Pages"],
    description: "",
    details:
      "An environmental tracking application that allows users to record eco-friendly activities, monitor their environmental impact, and visualize their sustainability progress.",
    problemStatement:
      "People often lack awareness of their environmental impact, including waste generation, resource consumption, and daily sustainability habits.",
    solution:
      "ECOTRACKER helps users monitor their environmental activities and encourages more sustainable everyday habits.",
    link: "https://samjerish.github.io/ECOTRACKER",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/ecotracker.png`,
    tag: "Sustainability • Data Tracking",
    date: "2026",
  },
  {
    id: 5,
    name: "AUTONOMOUS UNIVERSITY ROBOT",
    brandName: "Campus Rover",
    headline: "Autonomous Navigation & Multi-Sensor Obstacle Avoidance Vehicle",
    pills: ["Robotics", "Embedded", "Hardware"],
    cardClass: "theme-robot",
    shortDesc: "Intelligent campus robot integrating infrared obstacle detection arrays, intelligent pathfinding, and autonomous university transit.",
    techStack: ["Embedded C++", "Arduino", "IR Sensors", "Motor Drivers", "Robotics"],
    description: "",
    details:
      "An intelligent robotic system combining sensors, obstacle detection, navigation, decision-making, and autonomous movement to operate within a university environment.",
    problemStatement:
      "Large university campuses require systems that can navigate different environments and perform tasks without continuous human control.",
    solution:
      "An autonomous university robot capable of navigating campus environments and performing predefined tasks using sensors and intelligent decision-making.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/ir%20project.png`,
    tag: "Robotics • Autonomous Navigation",
    date: "2024",
  },
  {
    id: 6,
    name: "AUTONOMOUS ROBOT USING COMPUTER VISION",
    brandName: "Vision Bot",
    headline: "AI Vision-Guided Pathfinding & Real-Time Object Recognition",
    pills: ["Computer Vision", "AI", "Navigation"],
    cardClass: "theme-vision",
    shortDesc: "Vision-driven robotics system leveraging live camera feeds and image classification algorithms for intelligent environmental traversal.",
    techStack: ["Python", "OpenCV", "Vision AI", "Robotics", "NumPy"],
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
