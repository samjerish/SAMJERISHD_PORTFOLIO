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
    headline: "A simple productivity tool that helps students stay focused and manage tasks.",
    pills: ["Productivity", "Task Timer", "Students"],
    cardClass: "theme-focusflow",
    shortDesc:
      'A distraction-free web app built for students to organize assignments, run focus timers, and track study habits. <span style="color: #4ade80; font-weight: 600;">Made for students.</span>',
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "LocalStorage"],
    description:
      '<span style="color: #4ade80; font-weight: 600;">Made for students.</span>',
    details:
      'A clean web application combining a to-do list, timed focus sessions, and daily habit tracking to help students get their work done without distractions. <span style="color: #4ade80; font-weight: 600;">Made for students.</span>',
    problemStatement:
      "Students often get distracted by social media, procrastinate on assignments, and struggle to manage their daily study schedule.",
    solution:
      "FocusFlow gives students a clear task list and timed focus sessions so they can finish their schoolwork one step at a time.",
    link: "https://samjerish.github.io/FOCUSFLOW",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/focsuflow.png`,
    tag: "Productivity • Task Management",
    date: "2026",
  },
  {
    id: 3,
    name: "COMMUNITY MAINTENANCE MANAGEMENT SYSTEM",
    brandName: "Community Maintenance",
    headline: "A web app for tracking monthly maintenance collections from residents.",
    pills: ["Payment Records", "Collections", "Database"],
    cardClass: "theme-community",
    shortDesc:
      'Replaced manual paper notebooks with a simple digital system to record resident maintenance payments. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Built for SSN Nagar, Hosur.</span>',
    techStack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    description:
      '<span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Built for SSN Nagar, Hosur.</span>',
    details:
      'A web-based dashboard designed to record money collected from residents. It lets the manager log payments, check past payment history, and see pending amounts instantly. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Built for SSN Nagar, Hosur.</span>',
    problemStatement:
      "The neighborhood association was writing all payment records by hand in paper notebooks, leading to lost receipts, calculation errors, and confusion over who had paid.",
    solution:
      "Built an easy online system where the manager can enter resident payments, see instant receipts, and check pending dues with a single click.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/community_maintance.png`,
    tag: "Community Tool • Database",
    date: "2025",
  },
  {
    id: 4,
    name: "DATABASE MANAGEMENT SYSTEM USING FIREBASE",
    brandName: "Firebase DBMS",
    headline: "A cloud database system built for managing tool records in real time.",
    pills: ["Cloud Database", "User Auth", "Real-Time Data"],
    cardClass: "theme-firebase",
    shortDesc:
      'A fast cloud database to add, update, and track tooling inventory with secure user logins. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Built for Dynamic Tooling System.</span>',
    techStack: ["Firebase", "Firestore", "JavaScript", "Cloud Auth", "Security Rules"],
    description:
      '<span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Built for Dynamic Tooling System.</span>',
    details:
      'A web database project that allows users to securely log in, add new tool records, update equipment statuses, and view changes in real time. <span style="color: #ffffff; font-weight: 700; text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);">Built for Dynamic Tooling System.</span>',
    problemStatement:
      "Using paper forms or local spreadsheets made it hard to keep equipment lists up to date across multiple staff members.",
    solution:
      "Connected the system to Google Firebase, allowing the team to view and update equipment details live from any phone or computer.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/DATABASE_MANGANMENT.png`,
    tag: "Firebase • Cloud Database",
    date: "2025",
  },
  {
    id: 2,
    name: "ECOTRACKER",
    brandName: "EcoTracker",
    headline: "A daily tracker that encourages simple, eco-friendly everyday habits.",
    pills: ["Daily Habits", "Green Living", "Progress Tracker"],
    cardClass: "theme-ecotracker",
    shortDesc:
      "A clean web app where users can log green activities like saving electricity or recycling, and see their positive impact over time.",
    techStack: ["JavaScript", "HTML5", "CSS3", "Data Analytics", "GitHub Pages"],
    description: "",
    details:
      "An environmental habit tracker that makes it fun and easy to log green actions, check carbon savings, and build sustainable daily habits.",
    problemStatement:
      "Many people want to help the environment, but do not know which small daily actions make a meaningful difference.",
    solution:
      "EcoTracker provides a clear daily checklist of simple green activities and shows users their positive progress over time.",
    link: "https://samjerish.github.io/ECOTRACKER",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/ecotracker.png`,
    tag: "Sustainability • Habit Tracker",
    date: "2026",
  },
  {
    id: 5,
    name: "AUTONOMOUS UNIVERSITY ROBOT",
    brandName: "Campus Rover",
    headline: "A smart mobile robot that navigates college hallways and avoids obstacles.",
    pills: ["Robotics", "Hardware", "Arduino"],
    cardClass: "theme-robot",
    shortDesc:
      "A self-driving robot built with infrared sensors to safely move through campus corridors without bumping into walls or people.",
    techStack: ["Embedded C++", "Arduino", "IR Sensors", "Motor Drivers", "Robotics"],
    description: "",
    details:
      "A hardware robotics project built with Arduino and infrared sensors that can drive on its own, sense obstacles ahead, and steer around them.",
    problemStatement:
      "Carrying physical documents and lab equipment across large university buildings takes a lot of time and manual effort.",
    solution:
      "Built an autonomous robot using motor drivers and IR sensors that automatically detects obstacles in front of it and steers safely around them.",
    link: "",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/ir%20project.png`,
    tag: "Robotics • Autonomous Driving",
    date: "2024",
  },
  {
    id: 6,
    name: "AUTONOMOUS ROBOT USING COMPUTER VISION",
    brandName: "Vision Bot",
    headline: "A camera-guided robot that uses artificial intelligence to see and navigate.",
    pills: ["Computer Vision", "Python", "AI Navigation"],
    cardClass: "theme-vision",
    shortDesc:
      "An intelligent robot that uses a live camera and Python vision software to recognize objects in front of it and steer automatically.",
    techStack: ["Python", "OpenCV", "Vision AI", "Robotics", "NumPy"],
    description: "",
    details:
      "A robotics project combining a live video camera, Python, and OpenCV to help a robot understand its surroundings and navigate smoothly.",
    problemStatement:
      "Basic distance sensors only detect close-range walls, but cannot tell what kind of object is in front of the robot.",
    solution:
      "Equipped the robot with a camera and image-recognition software so it can visually identify objects and make smarter driving decisions in real time.",
    link: "",
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop",
    tag: "Computer Vision • AI",
    date: "2024",
  },
];
