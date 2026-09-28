export type Project = {
  id: number;
  name: string;
  brandName?: string;
  headline?: string;
  summaryLines: [string, string, string];
  pills?: string[];
  cardClass?: string;
  shortDesc?: string;
  description: string;
  details?: string;
  problemStatement?: string;
  solution?: string;
  impact?: string;
  architecture?: string;
  challenges?: string;
  readingTime?: string;
  aiInsights?: {
    problem: string;
    techStack: string;
    architecture: string;
    impact: string;
  };
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
    headline: "Minimalist Pomodoro study workspace with offline task tracking.",
    readingTime: "3 min read",
    summaryLines: [
      "A clean, distraction-free study workspace combining a Pomodoro timer with an assignment checklist.",
      "Built with zero ads, logins, or subscription paywalls so students can enter deep work sessions instantly.",
      "Runs offline in the browser with local storage persistence and built-in ambient focus soundscapes.",
    ],
    pills: ["React", "TypeScript", "Vite", "Web Audio"],
    cardClass: "theme-focusflow",
    techStack: ["React 18", "TypeScript", "Vite", "LocalStorage API", "Web Audio API", "CSS Modules"],
    description: "A clean study timer and task checklist built for students.",
    shortDesc:
      "A clean, distraction-free study workspace combining a Pomodoro timer with an assignment checklist. Built with zero ads, logins, or subscription paywalls so students can enter deep work sessions instantly. Runs offline in the browser with local storage persistence and built-in ambient focus soundscapes.",
    problemStatement:
      "Most digital productivity and Pomodoro tools are overcrowded with cluttered dashboards, mandatory accounts, paywalls, and distracting analytics. Students need a direct, instant deep-work environment that opens in sub-seconds and runs completely offline without tracking.",
    solution:
      "FocusFlow simplifies focus sessions into an uncluttered, responsive dashboard featuring a customizable 25/5/15 Pomodoro interval engine, an auto-persisting task backlog, and procedural ambient white-noise soundscapes generated on-the-fly via the Web Audio API.",
    architecture:
      "Engineered as a lightweight Single Page Application powered by Vite and React. The timer loop runs via high-precision requestAnimationFrame and Web Workers to prevent browser background throttling. State is synchronized to localStorage with schema validation.",
    challenges:
      "Mitigating audio clipping across mobile Safari during background tab switches and ensuring timers remain strictly accurate even when the OS throttles inactive background threads.",
    impact:
      "Used actively by peer students during exam seasons, providing an instant 0ms-latency productivity workspace with zero tracking and full offline resilience.",
    aiInsights: {
      problem: "FocusFlow eliminates paywalls, intrusive login prompts, and cluttered dashboards, giving students an instant, privacy-first deep work environment.",
      techStack: "Built with React 18, TypeScript, and Vite, leveraging the native Web Audio API for ambient soundscapes and LocalStorage for zero-backend data persistence.",
      architecture: "Client-only SPA architecture utilizing Web Workers for drift-free background timers and responsive touch gestures optimized for mobile devices.",
      impact: "Provides students with a distraction-free, 100% offline study companion that loads under 200ms with zero data harvesting."
    },
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
    headline: "Digital billing and maintenance collection ledger for residential housing.",
    readingTime: "5 min read",
    summaryLines: [
      "A centralized web ledger built for the SSN Nagar residential community in Hosur to track monthly maintenance dues.",
      "Replaces error-prone paper notebooks with instant door-by-door payment logging and search.",
      "Automates pending dues visibility and generates digital receipts for more than 100 households.",
    ],
    pills: ["React", "Node.js", "Express", "MongoDB"],
    cardClass: "theme-community",
    techStack: ["React", "Node.js", "Express.js", "MongoDB Atlas", "Mongoose", "JWT Auth", "REST APIs"],
    description: "Digital maintenance collection and billing ledger for SSN Nagar, Hosur.",
    shortDesc:
      "A centralized web ledger built for the SSN Nagar residential community in Hosur to track monthly maintenance dues. Replaces error-prone paper notebooks with instant door-by-door payment logging and search. Automates pending dues visibility and generates digital receipts for more than 100 households.",
    problemStatement:
      "Residential neighborhoods like SSN Nagar previously managed monthly street maintenance, waste collection, and lighting funds through handwritten paper ledgers. This resulted in lost payment records, disputes regarding unpaid dues, and hours spent manually reconciling bills each month.",
    solution:
      "A tailored full-stack community management system providing street-by-street resident directories, instantaneous payment logging with receipt generation, role-based committee authorization, and automated aggregate financial analytics.",
    architecture:
      "Decoupled client-server architecture with a React frontend and Express REST API backend connected to MongoDB Atlas. Includes index-optimized schemas for resident door numbers and monthly billing audit trails.",
    challenges:
      "Designing an interface straightforward enough for non-technical community volunteers while ensuring transactional integrity so duplicate payment entries cannot occur under spotty network connectivity.",
    impact:
      "Digitized operations for over 100 households, cutting monthly audit reconciliation from 3 days to under 5 minutes and providing 100% transparency for committee funds.",
    aiInsights: {
      problem: "Replaces manual paper record-keeping in residential societies that suffered from missing receipts, payment disputes, and tedious accounting.",
      techStack: "MERN Stack (MongoDB, Express, React, Node.js) with JSON Web Token security and automated PDF receipt generation.",
      architecture: "RESTful microservice design with Mongoose transactions ensuring idempotent payment ledger updates and compound indexes for rapid resident searches.",
      impact: "Streamlined maintenance collection for 100+ families, eliminating accounting discrepancies and delivering automated monthly balance summaries."
    },
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
    headline: "Real-time cloud inventory portal for industrial workshop equipment.",
    readingTime: "4 min read",
    summaryLines: [
      "A cloud inventory portal designed to track the location, status, and availability of industrial workshop tooling.",
      "Eliminates misplaced precision tools and shift-handover delays caused by paper slip checkouts.",
      "Uses Firebase Firestore real-time listeners to synchronize checkout states across workstations instantly.",
    ],
    pills: ["Firebase", "Firestore", "JavaScript", "Auth"],
    cardClass: "theme-firebase",
    techStack: ["Firebase Firestore", "JavaScript (ES6+)", "Firebase Authentication", "Cloud Functions", "Real-time Listeners"],
    description: "Cloud database system for workshop tooling inventory.",
    shortDesc:
      "A cloud inventory portal designed to track the location, status, and availability of industrial workshop tooling. Eliminates misplaced precision tools and shift-handover delays caused by paper slip checkouts. Uses Firebase Firestore real-time listeners to synchronize checkout states across workstations instantly.",
    problemStatement:
      "In fast-paced manufacturing workshops and educational engineering labs, calibrated measuring gauges, press dies, and specialized cutting tools frequently go missing across shift changes when tracked via paper sign-out binders.",
    solution:
      "Developed a real-time web portal powered by Cloud Firestore that tracks tool checkouts, custodian histories, calibration expiration dates, and current workstation locations with live broadcast updates.",
    architecture:
      "Serverless cloud architecture utilizing Firebase Firestore real-time snapshot listeners. Firestore Security Rules enforce strict role segregation between machine operators and workshop inventory supervisors.",
    challenges:
      "Structuring denormalized Firestore collections to allow rapid multi-parameter filtering (by tool category, availability, and custodian) while keeping document read operations minimal and cost-effective.",
    impact:
      "Reduced tool retrieval search times by 65% across shop floor workstations and established complete accountability for critical industrial equipment.",
    aiInsights: {
      problem: "Solves lost tool inventory and unaccounted checkouts in precision manufacturing workshops and labs.",
      techStack: "Firebase Firestore real-time database, Firebase Authentication, and reactive JavaScript with live DOM synchronization.",
      architecture: "Event-driven serverless system with optimistic UI updates and declarative security rules for multi-tenant workshop stations.",
      impact: "Eliminated tool checkout bottlenecks and provided shop supervisors with live visibility into workstation equipment usage."
    },
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
    headline: "Fast, daily habit checklist to track personal carbon savings.",
    readingTime: "3 min read",
    summaryLines: [
      "A lightweight daily habit checklist that calculates estimated personal carbon footprint savings in real time.",
      "Replaces cumbersome 30-question carbon surveys with frictionless daily habit check-offs.",
      "Engineered under 35KB with zero dependencies, dynamic SVG progress meters, and complete privacy.",
    ],
    pills: ["JavaScript", "HTML5", "CSS3", "SVG"],
    cardClass: "theme-ecotracker",
    techStack: ["Vanilla JavaScript (ES6+)", "HTML5 Semantic Markup", "CSS3 Custom Properties", "Dynamic SVG Math"],
    description: "Daily habit tracker for estimated carbon savings.",
    shortDesc:
      "A lightweight daily habit checklist that calculates estimated personal carbon footprint savings in real time. Replaces cumbersome 30-question carbon surveys with frictionless daily habit check-offs. Engineered under 35KB with zero dependencies, dynamic SVG progress meters, and complete privacy.",
    problemStatement:
      "Most carbon footprint calculators require exhaustive questionnaires on utility bills and flight miles, causing over 80% of casual users to abandon them without forming any actionable sustainable habits.",
    solution:
      "EcoTracker converts climate consciousness into a micro-habit checklist (e.g. taking public transit, cold-water washing, reducing single-use plastics) that dynamically renders daily CO2e kilograms saved using animated SVG gauge charts.",
    architecture:
      "Zero-dependency vanilla web architecture engineered to load in under 50ms. Calculates emission offsets client-side based on environmental data models and stores daily streaks in browser localStorage.",
    challenges:
      "Crafting smooth, 60fps circular SVG meter animations and accessible micro-interactions without relying on heavy external charting libraries.",
    impact:
      "Achieved a 99+ Google Lighthouse performance score with zero external scripts, empowering users to track daily eco-actions in less than 10 seconds a day.",
    aiInsights: {
      problem: "Overcomes user drop-off from complex carbon questionnaires by offering a frictionless 10-second daily habit tracker.",
      techStack: "Pure Vanilla JS, Semantic HTML5, CSS3 Variables, and custom math-based SVG gauge visualizations.",
      architecture: "Ultra-lean architecture (<35KB total payload) running 100% in the client browser with zero network dependencies.",
      impact: "Flawless 100 Lighthouse performance score with instantaneous interaction and tangible daily sustainability tracking."
    },
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
    headline: "Smart robotic rover combining Arduino hardware with OpenCV vision.",
    readingTime: "5 min read",
    summaryLines: [
      "An autonomous obstacle-avoidance rover pairing an Arduino microcontroller chassis with a Python computer vision pipeline.",
      "Overcomes proximity sensor blind spots by analyzing live camera feeds to detect open floor space and obstacle contours.",
      "Processes video frames dynamically to calculate real-time path corrections through campus corridors.",
    ],
    pills: ["Python", "OpenCV", "Arduino (C++)", "Robotics"],
    cardClass: "theme-robot",
    techStack: ["Python 3", "OpenCV (cv2)", "Arduino C++", "Serial Telemetry (PySerial)", "NumPy", "Hardware Actuators"],
    description: "Obstacle-avoidance rover using ultrasonic sensors and computer vision.",
    shortDesc:
      "An autonomous obstacle-avoidance rover pairing an Arduino microcontroller chassis with a Python computer vision pipeline. Overcomes proximity sensor blind spots by analyzing live camera feeds to detect open floor space and obstacle contours. Processes video frames dynamically to calculate real-time path corrections through campus corridors.",
    problemStatement:
      "Standard educational obstacle-avoidance robots rely solely on single-point ultrasonic sensors, which often fail to detect thin chair legs, transparent obstacles, or low-profile floor hazards that fall outside the narrow sonic cone.",
    solution:
      "Engineered an integrated hybrid robotic system that pairs an Arduino motor controller with an onboard camera feed analyzed by Python OpenCV scripts to identify open traversable floor area and compute steering vectors in real time.",
    architecture:
      "Dual-tier hardware/software architecture: High-level Python/OpenCV vision pipeline running edge contour detection and HSV color mask filtering, transmitting directional control packets over serial telemetry to an Arduino Nano motor driver.",
    challenges:
      "Managing serial latency and variable indoor lighting conditions while maintaining a stable 25+ frames-per-second processing loop on edge computing hardware.",
    impact:
      "Successfully navigated complex university hall obstacle courses with a 92% autonomous navigation success rate, proving the viability of low-cost hybrid vision robotics.",
    aiInsights: {
      problem: "Solves acoustic sensor blind spots in autonomous rovers by supplementing ultrasonic pingers with live computer vision obstacle contour analysis.",
      techStack: "OpenCV for frame processing, NumPy for array calculations, and Arduino C++ for low-latency dual-H-bridge motor PWM control.",
      architecture: "Decoupled vision/control loop communicating via baud-optimized serial packets with hardware failsafe watchdogs.",
      impact: "Achieved reliable obstacle avoidance across diverse indoor environments at a fraction of the cost of commercial LiDAR systems."
    },
    link: "",
    githubUrl: "https://github.com/samjerish/AUTONOMOUS-ROBOT-USING-COMPUTER-VISION",
    image: `${import.meta.env.BASE_URL}PROJECTS%20ASSESTS/ir%20project.png`,
    tag: "Robotics & Vision",
    date: "2024",
  },
];
