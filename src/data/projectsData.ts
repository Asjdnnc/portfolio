export type ProjectLink = {
  label: string;
  url: string;
  type: "live" | "github" | "docs" | "external";
  description?: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  summary: string;
  tags: string[];
  live?: string;
  source?: string;
  role: string;
  timeline: string;
  stats: { label: string; value: string }[];
  overview: string[];
  keyFeatures: { title: string; description: string }[];
  architecture?: {
    title: string;
    description: string;
    points: string[];
  };
  techStack: { category: string; items: string[] }[];
  links: ProjectLink[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  "ticket-booking": {
    slug: "ticket-booking",
    title: "Real-Time Ticket Booking Platform (CinePulse)",
    subtitle: "High-concurrency cinema seat booking engine with distributed locking and real-time synchronization",
    category: "Distributed Systems & Real-Time Web",
    image: "/projects/ticket.png",
    summary:
      "A high-performance, real-time seat booking system with distributed locking, concurrent booking handling, and live seat status updates across all connected clients.",
    tags: ["Next.js", "Redis", "WebSocket", "Socket.IO", "PostgreSQL", "Razorpay"],
    live: "https://ticket-booking-client-sigma.vercel.app",
    source: "https://github.com/Asjdnnc/Ticket-Booking",
    role: "Full-Stack Architect & Developer",
    timeline: "Hackathon Finalist Project",
    stats: [
      { label: "WebSocket Latency", value: "<10ms" },
      { label: "Seat Hold TTL", value: "120s" },
      { label: "Double Bookings", value: "0 Collisions" },
      { label: "Payment Response", value: "50ms (Decoupled)" },
    ],
    overview: [
      "CinePulse was engineered to solve one of the most demanding challenges in distributed web engineering: high-concurrency ticket surges. When thousands of users attempt to purchase high-demand seats simultaneously (such as during blockbuster cinema releases or major live concert tours), conventional database locking leads to catastrophic lock contention, timeouts, and double bookings.",
      "To eliminate these failure modes, CinePulse introduces a multi-tiered architecture featuring distributed atomic locking via Redis, sub-10ms real-time broadcasting via Socket.IO, an intelligent virtual waiting room queue, and asynchronous background workers that decouple immediate payment confirmation from persistent database writes.",
      "The platform provides an end-to-end journey from show exploration and virtual queueing to interactive 3D cinema seat selection, Razorpay payment verification, and automated E-ticket pass issuance with dynamic QR verification."
    ],
    keyFeatures: [
      {
        title: "Virtual Waiting Room Interceptor",
        description:
          "When active seat pickers exceed system capacity, incoming traffic is intercepted and placed into a Redis Sorted Set (ZSET) queue. Users view their dynamic position rank ('#3 Your Rank in Line'), users ahead count, and an animated progress ring. As active buyers check out or leave, WebSockets automatically promote queued users into the seat map."
      },
      {
        title: "Distributed Atomic Seat Locking (SET NX EX 120)",
        description:
          "To guarantee zero double bookings during concurrent clicks, seat holds are executed atomically in Redis via `SET hold:seat:${seatId} value NX EX 120`. If two users click the exact same seat within the same millisecond, the first request secures the hold while the second is rejected instantly with sub-millisecond feedback."
      },
      {
        title: "Sub-10ms Live Seat Map Synchronization",
        description:
          "Interactive cinema hall layout renders plush 3D chair headrests, armrests, aisle walkway gaps, and ticket quantity shortcuts. Socket.IO room broadcasts push seat state updates to all connected browsers in under 10 milliseconds."
      },
      {
        title: "Decoupled Persistence via SQS Simulation Worker",
        description:
          "Upon Razorpay payment confirmation, the seat status is synchronously promoted to 'BOOKED' in Redis within 50ms, while an asynchronous SQS background queue worker updates PostgreSQL. This decouples database disk write latency from payment response times."
      },
      {
        title: "Razorpay Checkout & Anti-Tampering Engine",
        description:
          "Integrated checkout modal with synchronized countdown timer. Server-side validation inspects the Redis TTL directly, preventing client DevTools timestamp manipulation and automatically rejecting expired hold orders."
      },
      {
        title: "Resilient Network & Socket Recovery",
        description:
          "Built-in mitigations for edge cases: 45s heartbeat tokens prune abandoned tabs, automatic reconnection handling recovers dropped Wi-Fi connections, and 10s TCP Keep-Alives safeguard against cloud Redis socket drops."
      }
    ],
    architecture: {
      title: "Seat State Transition Lifecycle",
      description: "State machine designed to prevent race conditions and lock contention:",
      points: [
        "AVAILABLE: Initial seat status stored in PostgreSQL and cached in Redis.",
        "HOLD: User selects seat. Atomic Redis SET NX EX 120 locks seat for 120 seconds, preventing concurrent selection.",
        "HOLD → AVAILABLE: 120-second TTL expires or user explicitly cancels selection.",
        "HOLD → BOOKED: Razorpay payment submitted. State promoted synchronously in Redis for instant client feedback.",
        "BOOKED → PostgreSQL: Background SQS queue worker asynchronously writes confirmed booking row to PostgreSQL."
      ]
    },
    techStack: [
      { category: "Frontend", items: ["React 18", "Vite", "SCSS Modules", "Lucide Icons", "Socket.IO Client"] },
      { category: "Backend & API", items: ["Next.js App Router", "Node.js", "REST APIs", "Socket Server"] },
      { category: "Real-Time & Caching", items: ["Redis (ioredis)", "Redis ZSET Queue", "Distributed Locks (SET NX)"] },
      { category: "Database & Queue", items: ["PostgreSQL (Neon SSL)", "SQS Simulation", "Background Workers"] },
      { category: "Payment & Security", items: ["Razorpay SDK", "JWT Authentication", "Server-Side TTL Validation"] }
    ],
    links: [
      {
        label: "Live Booking Application",
        url: "https://ticket-booking-client-sigma.vercel.app",
        type: "live",
        description: "Experience the interactive seat map, waiting room, and live booking flows."
      },
      {
        label: "GitHub Source Code",
        url: "https://github.com/Asjdnnc/Ticket-Booking",
        type: "github",
        description: "Explore the full codebase, Redis locking engine, and architecture documentation."
      }
    ]
  },

  wanderstay: {
    slug: "wanderstay",
    title: "WanderStay",
    subtitle: "Premium Stay Booking & Property Hosting Platform",
    category: "Full-Stack MERN & Cloud Architecture",
    image: "/projects/wanderstay.png",
    summary:
      "A listings platform for stays and travel properties, built around full-stack CRUD flows, Mapbox 3D vector maps, Razorpay payments, and automated CI/CD deployment.",
    tags: ["MERN", "MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS", "Docker", "AWS EC2", "Razorpay"],
    live: "https://majorproject-0elt.onrender.com/listings",
    source: "https://github.com/Asjdnnc/majorProject/tree/master",
    role: "Lead Full-Stack Developer",
    timeline: "Major Academic Project",
    stats: [
      { label: "Architecture", value: "Docker Multi-Stage" },
      { label: "CI/CD", value: "GitHub Actions → AWS EC2" },
      { label: "Payments", value: "Razorpay HMAC-SHA256" },
      { label: "Maps", value: "Mapbox 3D Vector" }
    ],
    overview: [
      "WanderStay is an Airbnb-inspired full-stack web application engineered for discovering, booking, hosting, and reviewing unique properties, luxury villas, mountain cabins, and beachfront stays around the world.",
      "The system handles the entire lifecycle of travel accommodations: guests can explore geo-located stays with interactive Mapbox maps and category filters, make instant reservations backed by Razorpay payment verification, and leave authentic reviews. Hosts can submit listings through a guided multi-step form.",
      "To guarantee quality and platform trust, WanderStay implements an administrative moderation workflow where newly submitted properties must be reviewed and approved by administrators before appearing in the public catalog."
    ],
    keyFeatures: [
      {
        title: "Airbnb-Inspired Responsive Design & Dark Mode",
        description:
          "Built with sleek typography, smooth glassmorphism, responsive CSS grids, animated skeleton shimmer loaders, and a global dark mode toggle."
      },
      {
        title: "Stay Catalog & Category Exploration",
        description:
          "Faceted navigation allows users to filter accommodations by diverse travel categories including Rooms, Trending, Iconics, Mountains, Castles, and Beachfront."
      },
      {
        title: "Host Your Space & Administrative Approval Queue",
        description:
          "Hosts submit properties with dynamic pricing, city/country location, and imagery. Submissions default to unapproved status and require administrator verification before going live."
      },
      {
        title: "Razorpay Payment Gateway with Signature Verification",
        description:
          "Calculates dynamic order pricing based on night rates and guest count, launches the official Razorpay checkout modal, and verifies legitimate transactions server-side using HMAC-SHA256 signatures."
      },
      {
        title: "Interactive Mapbox 3D Vector Maps",
        description:
          "Integrated Mapbox GL JS renders listing coordinates on interactive 3D vector maps with custom property pins and contextual popups."
      },
      {
        title: "Dual Authentication & Session Management",
        description:
          "Supports local email/password registration with Passport-Local and one-click Google Sign-In with Passport-Google-OAuth20, backed by MongoDB persistent session stores."
      }
    ],
    architecture: {
      title: "DevOps & Cloud Deployment Architecture",
      description: "Production-ready deployment pipeline designed for reliability and scalability:",
      points: [
        "Docker Multi-stage Build: Optimizes frontend and backend artifacts into a lean container image.",
        "Automated CI/CD: Pushing to master triggers GitHub Actions to SSH into an AWS EC2 instance, build containers, and reload services with zero downtime.",
        "Reverse Proxy: Nginx manages SSL termination, request routing, and client asset caching.",
        "Database Persistence: MongoDB Atlas cluster with Mongoose ODM schemas for users, listings, reviews, and reservations."
      ]
    },
    techStack: [
      { category: "Frontend", items: ["React 18", "Vite", "Tailwind CSS", "Lucide Icons", "Mapbox GL JS", "Axios"] },
      { category: "Backend", items: ["Node.js (v20)", "Express.js", "Passport.js", "Express Session", "Mongoose"] },
      { category: "Database", items: ["MongoDB Atlas", "connect-mongo Session Store"] },
      { category: "Payments", items: ["Razorpay Node SDK", "HMAC-SHA256 Verification"] },
      { category: "DevOps & Cloud", items: ["Docker", "GitHub Actions", "AWS EC2", "Nginx", "PM2", "Render"] }
    ],
    links: [
      {
        label: "Live WanderStay Platform",
        url: "https://majorproject-0elt.onrender.com/listings",
        type: "live",
        description: "Browse live stays, explore listings, and test the booking flow."
      },
      {
        label: "GitHub Source Code",
        url: "https://github.com/Asjdnnc/majorProject/tree/master",
        type: "github",
        description: "Review backend routes, Express controllers, models, and Docker configuration."
      }
    ]
  },

  testify: {
    slug: "testify",
    title: "Testify",
    subtitle: "Multi-Tenant Online Assessment & Exam SaaS Platform",
    category: "Enterprise SaaS & Academic Engineering",
    image: "/projects/testify.png",
    summary:
      "An online examination and assessment SaaS platform built as a College Major Project featuring multi-tenancy, RBAC, dynamic question banks, and versioned exam snapshots.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "RBAC", "AI"],
    live: "https://testify-mocha.vercel.app/",
    source: "https://github.com/Asjdnnc/testify",
    role: "Full-Stack SaaS Architect",
    timeline: "College Major Project",
    stats: [
      { label: "Tenancy", value: "Strict Multi-Tenant" },
      { label: "User Roles", value: "4 Tiered Roles" },
      { label: "Immutability", value: "Copy-on-Write Cloner" },
      { label: "ORM", value: "Prisma & PostgreSQL" }
    ],
    overview: [
      "Testify is a full-featured online examination and assessment SaaS platform built to solve the complex operational requirements of educational institutions and corporate training programs.",
      "Traditional assessment tools often struggle with data isolation across academic departments, accidental test corruption during live edits, and lack of fine-grained role permissions. Testify resolves these issues by implementing a strict multi-tenant hierarchy where all users, exams, question banks, and grading records are scoped by institution.",
      "Equipped with an intuitive drag-and-drop exam builder, automated marks scaling, and copy-on-write snapshot engines, Testify delivers an academic testing platform that guarantees assessment integrity."
    ],
    keyFeatures: [
      {
        title: "Strict Multi-Tenant Hierarchy",
        description:
          "Enforces complete institutional isolation across College (root tenant), Branch (academic departments), Batch (student cohorts), and tiered User Roles (Super Admin, College Admin, Teacher, Student)."
      },
      {
        title: "Centralized Question Bank Registry",
        description:
          "Institutional question library supporting multiple question formats: MCQ Single Choice, MCQ Multiple Choice, and Subjective questions with instant keyword search and tag filtering."
      },
      {
        title: "Drag-and-Drop Exam Builder",
        description:
          "Interactive builder allowing instructors to assemble assessments from the Question Bank, configure time boundaries, and automatically scale total marks with live validation."
      },
      {
        title: "The Copy-on-Write Asset Cloner",
        description:
          "If an instructor edits a question that is already associated with an ACTIVE or COMPLETED exam, the system automatically creates a versioned clone. This guarantees historical student submissions remain immutable while enabling real-time edits for future tests."
      },
      {
        title: "Stateless JWT RBAC & Middleware Guards",
        description:
          "Secure authentication verifying role and institutional tokens on every request. Guard middleware prevents unauthorized access to builder tools and keeps teachers isolated to their college."
      },
      {
        title: "Assessment Lifecycle Engine",
        description:
          "Strict state transitions (DRAFT → PUBLISHED → ACTIVE → COMPLETED) paired with cohort discovery controls to prevent premature test access."
      }
    ],
    architecture: {
      title: "Multi-Tenant Data Modeling & Integrity",
      description: "Prisma relational schemas structured for zero cross-tenant contamination:",
      points: [
        "Tenant Partitioning: All core models inherit foreign keys tying them back to their primary College entity.",
        "Stateless Authorization: JWT claims embed userId, role, collegeId, and branchId for high-speed sub-millisecond middleware validation.",
        "Snapshot Versioning: Question instances are snapshot-cloned upon exam publication to preserve historical question text, choices, and point values.",
        "Cascading Deletions: Referential integrity constraints ensure cleanup of departmental cohorts without orphaned data."
      ]
    },
    techStack: [
      { category: "Frontend & Full-Stack", items: ["Next.js (App Router)", "React", "Tailwind CSS", "Lucide Icons", "Shadcn/UI"] },
      { category: "Language & Logic", items: ["TypeScript", "JavaScript", "Prisma Client"] },
      { category: "Database & Models", items: ["PostgreSQL", "Prisma ORM", "Relational Multi-Tenancy"] },
      { category: "Security", items: ["JWT Stateless Tokens", "Bcrypt Hashing", "Role-Based Access Control (RBAC)"] },
      { category: "Deployment", items: ["Vercel", "Cloud Database Hosting"] }
    ],
    links: [
      {
        label: "Live Testify Platform",
        url: "https://testify-mocha.vercel.app/",
        type: "live",
        description: "Test the online assessment interface, student dashboard, and exam flows."
      },
      {
        label: "GitHub Source Code",
        url: "https://github.com/Asjdnnc/testify",
        type: "github",
        description: "Inspect the Prisma schema, RBAC middleware, and exam builder components."
      }
    ]
  },

  marvel: {
    slug: "marvel",
    title: "Marvel Cinematic Universe Explorer",
    subtitle: "Interactive MCU Catalog, Chronological Timeline & Watch Tracker",
    category: "Frontend Web App & Media Integration",
    image: "/projects/marvel.png",
    summary:
      "A Marvel-themed movie browsing experience with a visual-first interface, chronological timeline, watch progress tracker, and external film search.",
    tags: ["React", "Vite", "React Router", "TMDB API", "Spotify API", "Vanilla CSS"],
    live: "https://marvel-six-omega.vercel.app/",
    source: "https://github.com/Asjdnnc/marvel",
    role: "Frontend Developer & UI Designer",
    timeline: "Independent Project",
    stats: [
      { label: "Catalog Size", value: "38+ MCU Films" },
      { label: "Architecture", value: "100% Client-Side" },
      { label: "Progress Storage", value: "LocalStorage" },
      { label: "External APIs", value: "TMDB, YouTube, Spotify" }
    ],
    overview: [
      "Marvel Cinematic Universe Explorer is a sleek, fully client-side web application designed for MCU enthusiasts to explore movies, track personal viewing progress, follow the official storyline timeline, and search any film online.",
      "The project is engineered with zero backend dependency: all 38+ MCU movie details, release metadata, phases, and chronologies are packaged in a structured, local JavaScript catalog for instant page navigation and offline-ready responsiveness.",
      "Enriched with TMDB API integration for external film lookups, embedded YouTube movie trailer theater previews, and a persistent background Spotify soundtrack player, the app delivers an engaging, media-rich fan experience."
    ],
    keyFeatures: [
      {
        title: "Complete 38+ Film MCU Catalog",
        description:
          "Explore every theatrical release with high-resolution poster art, viewer ratings, directors, cast rosters, runtimes, budgets, and worldwide box office earnings."
      },
      {
        title: "Personal Watch Progress Tracker",
        description:
          "Mark films as watched with an interactive toggle. A visual progress bar calculates completion percentage and saves state persistently in browser localStorage."
      },
      {
        title: "Interactive Chronological Timeline",
        description:
          "View every MCU film in true storyline chronological order, neatly categorized by Marvel Phase (Phase 1 through Phase 5)."
      },
      {
        title: "Live Theatrical Countdown Timer",
        description:
          "Real-time countdown banner calculating days, hours, and minutes until the next official Marvel Studios theatrical release."
      },
      {
        title: "Online Film Search via TMDB API",
        description:
          "Integrated TMDB API client allowing users to query any film beyond the MCU, fetching movie overviews, poster imagery, and trailers on demand."
      },
      {
        title: "Embedded Trailer Theater & Background Music",
        description:
          "Watch embedded official YouTube movie trailers directly from movie detail pages and enjoy ambient music via a persistent session Spotify player."
      }
    ],
    architecture: {
      title: "Client-Side Data & State Architecture",
      description: "Designed for blazing-fast client execution without server latency:",
      points: [
        "Local Catalog Store: Static data layer with indexed helper utilities (getById, getRelatedMovies, getTimeline).",
        "Persistent LocalStorage: Custom watch hooks synchronize checklist state into browser storage.",
        "External Media Embedding: YouTube iframe APIs and Spotify widgets integrated cleanly without blocking UI render cycles."
      ]
    },
    techStack: [
      { category: "Frontend Framework", items: ["React 18", "Vite", "React Router v6"] },
      { category: "Styling & UI", items: ["Vanilla CSS", "FontAwesome Icons", "Responsive Design"] },
      { category: "APIs & Embeds", items: ["TMDB API", "YouTube Embed Player", "Spotify Audio Embed"] },
      { category: "State & Storage", items: ["React State", "Browser LocalStorage"] },
      { category: "Deployment", items: ["Vercel", "Static SPA Hosting"] }
    ],
    links: [
      {
        label: "Live Marvel Explorer",
        url: "https://marvel-six-omega.vercel.app/",
        type: "live",
        description: "Browse the MCU catalog, check your watch progress, and view upcoming releases."
      },
      {
        label: "GitHub Source Code",
        url: "https://github.com/Asjdnnc/marvel",
        type: "github",
        description: "Inspect the React components, catalog data structure, and API integrations."
      }
    ]
  },

  quickkart: {
    slug: "quickkart",
    title: "Quickkart.com.au",
    subtitle: "Enterprise Multi-Country eCommerce Platform",
    category: "Enterprise E-Commerce & Headless Architecture",
    image: "/projects/quickkart.png",
    summary:
      "A production-grade multi-country eCommerce platform built around Saleor and Next.js, managing 400,000+ products with Docker and Nginx deployment pipelines.",
    tags: ["Next.js", "Saleor", "GraphQL", "Docker", "Nginx", "Deployment"],
    live: "https://www.quickkart.com.au/",
    role: "Full-Stack Freelance Engineer",
    timeline: "Jul 2025 - Sep 2025",
    stats: [
      { label: "Inventory", value: "400,000+ SKUs" },
      { label: "Market Reach", value: "Multi-Country" },
      { label: "Performance", value: "Sub-Second LCP" },
      { label: "Infrastructure", value: "Docker & Nginx" }
    ],
    overview: [
      "Quickkart.com.au is a production-grade multi-country eCommerce platform built using Saleor (GraphQL headless commerce engine) and Next.js.",
      "Engineered to support a high-volume product catalog comprising over 400,000 items, the platform was optimized to deliver sub-second search speeds, instant faceted filtering, and optimized Core Web Vitals (LCP, INP, CLS).",
      "The application leverages modern headless commerce principles, separating storefront presentation from commerce business logic to deliver localized currency conversion, tax rates, and rapid continuous deployment."
    ],
    keyFeatures: [
      {
        title: "High-Volume SKU Catalog (400,000+ Products)",
        description:
          "Engineered performant pagination, instant text search, and multi-attribute faceted filters capable of browsing hundreds of thousands of inventory items effortlessly."
      },
      {
        title: "Next.js Headless Storefront",
        description:
          "Server-side rendering (SSR) and incremental static regeneration (ISR) ensure lightning-fast first contentful paint and top-tier SEO discoverability."
      },
      {
        title: "Multi-Country & Multi-Currency Support",
        description:
          "Dynamic pricing, currency conversion, and regional checkout flows customized for international customer segments across Australia and beyond."
      },
      {
        title: "Containerized Cloud Infrastructure",
        description:
          "Deployed using Docker containers with Nginx acting as a reverse proxy, managing SSL termination, HTTP gzip compression, and static asset caching."
      }
    ],
    techStack: [
      { category: "Storefront", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { category: "Headless Engine", items: ["Saleor", "GraphQL API", "Python Backend Services"] },
      { category: "DevOps & Infrastructure", items: ["Docker", "Nginx", "Vercel", "Cloud Hosting"] }
    ],
    links: [
      {
        label: "Visit Live Store",
        url: "https://www.quickkart.com.au/",
        type: "live",
        description: "Explore the live Quickkart eCommerce marketplace."
      }
    ]
  },

  "iiit-sonepat": {
    slug: "iiit-sonepat",
    title: "IIIT Sonepat Official Website",
    subtitle: "Official Institute Web Portal & Content Management Hub",
    category: "Institutional Web Portal & CMS",
    image: "/projects/iiits.png",
    summary:
      "Official website of IIIT Sonepat, built to provide institutional information, academic announcements, and secure administrative content management.",
    tags: ["MERN", "React", "Node.js", "Express.js", "MongoDB", "RBAC", "Deployment"],
    live: "https://www.iiitsonepat.ac.in/",
    role: "Full-Stack Web Lead & Maintainer",
    timeline: "2024 - Present",
    stats: [
      { label: "Institution", value: "IIIT Sonepat" },
      { label: "Traffic", value: "Thousands / Mo" },
      { label: "Uptime", value: "99.9% High Availability" },
      { label: "Permissions", value: "Multi-Role RBAC" }
    ],
    overview: [
      "The official website for the Indian Institute of Information Technology, Sonepat is the primary digital gateway for students, faculty, researchers, recruiters, and prospective applicants nationwide.",
      "The portal was developed to replace legacy systems with a modern, high-performance web architecture featuring dynamic notice publishing, tender announcements, departmental directories, and academic curriculum management.",
      "Backed by a role-based content management portal, authorized administrative staff and faculty members can seamlessly publish circulars and update department data while maintaining strict security and compliance standards."
    ],
    keyFeatures: [
      {
        title: "Central Institutional Information Hub",
        description:
          "Provides comprehensive information regarding academic programs (B.Tech CSE, IT), admission guidelines, fee structures, and campus achievements."
      },
      {
        title: "Dynamic Notice & Circular Management",
        description:
          "Administrative content management system enabling rapid publishing of examination timetables, recruitment circulars, and institutional tenders."
      },
      {
        title: "Departmental Portals & Faculty Profiles",
        description:
          "Dedicated sections for CSE and IT departments highlighting faculty qualifications, active research publications, and laboratory facilities."
      },
      {
        title: "Accessible & Responsive Government-Grade Design",
        description:
          "Engineered for high readability, responsive mobile navigation, and strict security compliance under high concurrent traffic spikes."
      }
    ],
    techStack: [
      { category: "Frontend", items: ["React", "HTML5", "CSS3", "JavaScript", "Responsive UI"] },
      { category: "Backend & CMS", items: ["Node.js", "Express.js", "REST APIs", "Role-Based Access Control"] },
      { category: "Database & Storage", items: ["MongoDB", "Cloud Document Storage"] },
      { category: "Deployment", items: ["Nginx Reverse Proxy", "Cloud Server Hosting", "SSL Security"] }
    ],
    links: [
      {
        label: "Official Institute Website",
        url: "https://www.iiitsonepat.ac.in/",
        type: "live",
        description: "Browse the official IIIT Sonepat university portal."
      }
    ]
  }
};

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projectDetails);
}
