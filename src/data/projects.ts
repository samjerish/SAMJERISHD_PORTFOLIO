export type Project = {
  id: number;
  name: string;
  brandName?: string;
  headline?: string;
  pills?: string[];
  cardClass?: string;
  shortDesc?: string;
  description: string;
  details: string;
  problemStatement: string;
  solution: string;
  impact?: string;
  techStack?: string[];
  link: string; // Live demo link (empty string if internal/hardware)
  githubUrl: string; // GitHub repository link
  image: string;
  tag?: string;
  date?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: "FOCUSFLOW",
    brandName: "FocusFlow",
    headline: "A distraction-free timer and study workspace for students.",
    pills: ["React", "TypeScript", "Vite", "Web Audio"],
    cardClass: "theme-focusflow",
    shortDesc:
      "I built FocusFlow because most productivity apps I tried were cluttered with social feeds, subscription popups, or complex setups. I wanted something clean and immediate: a focused Pomodoro timer, an assignment checklist, and ambient audio to help stay in the zone.",
    techStack: ["React", "TypeScript", "Vite", "LocalStorage API", "Web Audio API"],
    description: "A clean study timer and task checklist built for students.",
    details:
      "A distraction-free study tool combining customizable Pomodoro intervals, task tracking, and ambient sound generation without accounts, ads, or subscription paywalls.",
    problemStatement:
      "Most timer apps are either bloated with features you never use or require an account just to start a 25-minute study session.",
    solution:
      "Built a zero-latency web app with React and TypeScript. Tasks and study history persist in the browser via LocalStorage so it works offline with zero login wall.",
    impact:
      "Synthesized ambient focus sounds using the browser's Web Audio API directly in code, avoiding heavy audio streaming while providing white noise and ambient tones.",
    link: "https://samjerish.github.io/FOCUSFLOW",
    githubUrl: "https://github.com/samjerish/FOCUSFLOW",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/focsuflow.png`,
    tag: "Productivity Tool",
    date: "2026",
  },
  {
    id: 2,
    name: "COMMUNITY MAINTENANCE MANAGEMENT SYSTEM",
    brandName: "Community Maintenance System",
    headline: "A digital ledger to track monthly household collections and maintenance dues.",
    pills: ["React", "Node.js", "Express", "MongoDB"],
    cardClass: "theme-community",
    shortDesc:
      "Built for the residential committee at SSN Nagar in Hosur. They were tracking monthly maintenance payments and issuing receipts by hand in paper notebooks, which frequently led to misplaced records and confusion over who had paid.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    description: "Digital maintenance collection and billing ledger for SSN Nagar, Hosur.",
    details:
      "A simple full-stack web dashboard that lets community managers record maintenance payments, view outstanding dues by house number, and generate receipts.",
    problemStatement:
      "Handwritten records in paper notebooks led to calculation errors, missing payment history, and hours spent manually reconciling who still owed maintenance.",
    solution:
      "Built a centralized web app where the committee can log resident payments, search payment histories by door number, and generate instant digital receipts.",
    impact:
      "Replaced the paper logbook for over 100 households. The management can now see pending dues at a glance instead of flipping through paper registers.",
    link: "",
    githubUrl: "https://github.com/samjerish/COMMUNITY-MAINTENANCE-MANAGEMENT-SYSTEM",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/community_maintance.png`,
    tag: "Full-Stack System",
    date: "2025",
  },
  {
    id: 3,
    name: "DATABASE MANAGEMENT SYSTEM USING FIREBASE",
    brandName: "Workshop Tooling DBMS",
    headline: "Real-time inventory and status tracking for industrial workshop equipment.",
    pills: ["Firebase", "Firestore", "JavaScript", "Auth"],
    cardClass: "theme-firebase",
    shortDesc:
      "Built for Dynamic Tooling System to track the status and location of workshop equipment in real time. Replaced a paper slip check-out process that caused misplaced tools and confusion across workstations.",
    techStack: ["Firebase Firestore", "JavaScript", "Firebase Auth", "Real-time Listeners"],
    description: "Cloud database system for workshop tooling inventory.",
    details:
      "A web application enabling staff to check tool availability, record maintenance logs, and update checkout statuses across multiple workstations.",
    problemStatement:
      "Workers were using paper chits to check out precision tooling, resulting in lost tools, delayed handoffs between shifts, and no clear record of who last used what.",
    solution:
      "Created a web interface backed by Firebase Cloud Firestore using real-time listeners (`onSnapshot`). When a tool status changes on one workstation, all other screens update instantly without a page reload.",
    impact:
      "Configured role-based access rules so only authorized staff can mark tools as under-maintenance or retired, keeping inventory accurate across shifts.",
    link: "",
    githubUrl: "https://github.com/samjerish/DATABASE-MANAGEMENT-SYSTEM-USING-FIREBASE",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/DATABASE_MANGANMENT.png`,
    tag: "Cloud Database",
    date: "2025",
  },
  {
    id: 4,
    name: "ECOTRACKER",
    brandName: "EcoTracker",
    headline: "A fast, daily checklist to track personal carbon-saving habits.",
    pills: ["JavaScript", "HTML5", "CSS3", "SVG"],
    cardClass: "theme-ecotracker",
    shortDesc:
      "Most carbon calculators make you fill out a 30-question survey before giving you a vague number. I built EcoTracker as a quick daily checklist: tap what you did today (cycled instead of driving, turned off standby appliances, composted) and see immediate, estimated CO2 reductions.",
    techStack: ["JavaScript (ES6+)", "HTML5", "CSS3", "SVG Graphics"],
    description: "Daily habit tracker for estimated carbon savings.",
    details:
      "A lightweight web tool that translates everyday habits into estimated environmental savings using clean client-side math and SVG visualizations.",
    problemStatement:
      "People want to build greener habits, but traditional footprint calculators are too tedious to use on a daily basis.",
    solution:
      "Wrote a fast, dependency-free web tool in vanilla JavaScript. It calculates estimated savings on the fly and renders dynamic SVG visual meters right in the browser.",
    impact:
      "The entire site weighs under 35KB and loads instantly on any mobile browser without external analytics or tracking scripts.",
    link: "https://samjerish.github.io/ECOTRACKER",
    githubUrl: "https://github.com/samjerish/ECOTRACKER",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/ecotracker.png`,
    tag: "Web Utility",
    date: "2026",
  },
  {
    id: 5,
    name: "AUTONOMOUS ROBOT & COMPUTER VISION SYSTEM",
    brandName: "Autonomous Vision Rover",
    headline: "An Arduino-powered rover combining sensors with OpenCV to navigate around obstacles.",
    pills: ["Python", "OpenCV", "Arduino (C++)", "Robotics"],
    cardClass: "theme-robot",
    shortDesc:
      "A college robotics project combining an Arduino microcontroller with computer vision in Python. While simple ultrasonic sensors can tell you an obstacle is close, they can't tell you where it ends—so I added camera feeds and OpenCV contour detection to make smarter steering decisions.",
    techStack: ["Python", "OpenCV", "Arduino (C++)", "Serial Communication", "NumPy"],
    description: "Obstacle-avoidance rover using ultrasonic sensors and computer vision.",
    details:
      "Integrates Arduino motor hardware with a Python vision pipeline to process live camera frames, identify obstacle boundaries, and steer clear dynamically.",
    problemStatement:
      "Standard obstacle-avoidance robots with only proximity sensors get stuck in corners and can't judge the shape or width of obstacles in front of them.",
    solution:
      "Streamed video from a camera into a Python script using OpenCV to find open floor space and obstacle contours, then sent steering commands over serial communication to the Arduino motor driver.",
    impact:
      "Tested in campus corridors with dynamic obstacle courses, achieving reliable autonomous navigation and real-time path corrections.",
    link: "",
    githubUrl: "https://github.com/samjerish/AUTONOMOUS-ROBOT-USING-COMPUTER-VISION",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/ir%20project.png`,
    tag: "Robotics & Vision",
    date: "2024",
  },
];
