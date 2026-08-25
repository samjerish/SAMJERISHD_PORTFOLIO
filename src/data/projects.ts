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
    name: 'PHYSITRACK GROUP IR',
    description: "Redesigning Physitrack Group's Investor Relations website to make...",
    details: 'This project involved architecting a scalable backend using Node.js and WebSockets to handle real-time data from hundreds of simulated IoT devices. The frontend is a React Native app with a custom dark-mode UI designed for quick access to critical controls.',
    problemStatement: 'The legacy investor relations website was difficult to navigate and lacked real-time stock updates, causing friction for stakeholders and potential investors seeking critical financial information.',
    solution: 'Designed and developed a sleek, modern portal with intuitive navigation, integrated real-time data feeds, and fully responsive layouts to ensure stakeholders have seamless access to financial reports and stock trends across all devices.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tag: 'Corporate UI/UX',
    date: 'Nov 2025'
  },
  {
    id: 2,
    name: 'DEUX HEADLESS CMS',
    description: 'A hands-on exploration of building, connecting, and deploying a scalable...',
    details: 'Built with React, Vite, and Recharts, this dashboard processes large datasets to render interactive graphs. It features customizable widget layouts, complex filtering, and export capabilities, tailored specifically for power-users in retail management.',
    problemStatement: 'Content editors were bottlenecked by traditional monolithic CMS architectures, which tightly coupled content management to frontend presentation, slowing down omnichannel content delivery.',
    solution: 'Built a headless CMS using modern stack technologies to decouple the backend repository from the frontend presentation layer. This allowed developers to deliver content across web, mobile, and IoT devices via a flexible API, significantly accelerating the publishing workflow.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    tag: 'Full-Stack Web',
    date: 'Nov 2025'
  },
  {
    id: 3,
    name: 'GAMIFYING ECOSIA',
    description: 'Designing a gamified Impact Dashboard that connects individual user activity...',
    details: 'Leveraging RAG (Retrieval-Augmented Generation) and vector databases, this assistant contextually understands user queries based on a company\'s internal documentation. It reduced support ticket volume by 30% in its initial pilot phase.',
    problemStatement: 'While Ecosia users plant trees by searching, individual user engagement was plateauing because users lacked visibility into their personal environmental impact and long-term milestones.',
    solution: 'Designed an interactive Impact Dashboard that gamifies the experience. Introduced milestones, personalized impact statistics, and visual feedback loops to reward continuous usage, resulting in increased daily active users and higher retention rates.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    tag: 'Feature Scaling',
    date: 'Oct 2025'
  },
  {
    id: 4,
    name: 'FITNESS TRACKER APP',
    description: 'A cross-platform mobile application that gamifies daily exercise routines.',
    details: 'Designed from the ground up to prioritize user retention, this app uses subtle animations and a rewarding badge system. The technical stack includes Flutter and Firebase, with rigorous testing for offline-first capabilities.',
    problemStatement: 'Many fitness apps struggle with long-term user retention due to monotonous tracking mechanisms and a lack of engaging motivational features.',
    solution: 'Developed a cross-platform mobile application that integrates gamification into daily exercise routines. Users earn badges and unlock achievements for consistency, utilizing a robust offline-first architecture with Firebase sync to ensure progress is never lost.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    date: 'Sep 2025'
  },
  {
    id: 5,
    name: 'PORTFOLIO REDESIGN',
    description: 'A modern, interactive portfolio website leveraging sleek CSS animations.',
    details: 'A fully responsive web application built with React. It focuses heavily on micro-interactions, CSS 3D transforms, and performant scroll-based animations to create a highly engaging, story-driven user experience without relying on heavy WebGL libraries.',
    problemStatement: 'The previous portfolio was static and failed to accurately reflect my growth as a developer and my design capabilities, leading to low engagement from potential clients and recruiters.',
    solution: 'Rebuilt the portfolio from scratch as a highly interactive React application. I implemented a custom global space theme, intricate scroll-based animations, and responsive layouts to showcase technical proficiency and create a memorable user experience.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    tag: 'Development',
    date: 'Aug 2025'
  }
];
