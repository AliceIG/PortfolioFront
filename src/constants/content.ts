export type Lang = "fr" | "en";

export const SOCIAL_LINKS = {
  github: "https://github.com/AliceIG",
  linkedin: "https://www.linkedin.com/in/alice-mbolatiana-057123333",
  facebook: "https://www.facebook.com/allyss.raz",
};

export const SKILLS = {
  backend: [
    { name: "Django / DRF", level: 95 },
    { name: "Python", level: 95 },
    { name: "PostgreSQL", level: 90 },
    { name: "Celery / Redis", level: 85 },
    { name: "Docker", level: 80 },
  ],
  frontend: [
    { name: "React / TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 85 },
    { name: "HTML / CSS", level: 90 },
  ],
  devops: [
    { name: "CI/CD", level: 75 },
    { name: "Nginx / Gunicorn", level: 80 },
    { name: "AWS / GCP", level: 70 },
  ],
};

export const TECH_HIGHLIGHTS = [
  {
    id: "orm",
    icon: "Database",
    titleFr: "Django ORM",
    titleEn: "Django ORM",
    descFr: "Requêtes complexes, optimisations N+1, migrations avancées et modèles personnalisés.",
    descEn: "Complex queries, N+1 optimizations, advanced migrations, and custom model managers.",
  },
  {
    id: "celery",
    icon: "Zap",
    titleFr: "Celery & Redis",
    titleEn: "Celery & Redis",
    descFr: "Tâches asynchrones, files d'attente distribuées, workers scalables et scheduling.",
    descEn: "Async tasks, distributed queues, scalable workers, and periodic scheduling.",
  },
  {
    id: "postgres",
    icon: "Server",
    titleFr: "PostgreSQL",
    titleEn: "PostgreSQL",
    descFr: "Full-text search, indexation avancée, JSON fields, réplication et optimisations.",
    descEn: "Full-text search, advanced indexing, JSON fields, replication, and performance tuning.",
  },
  {
    id: "api",
    icon: "Globe",
    titleFr: "REST & GraphQL",
    titleEn: "REST & GraphQL",
    descFr: "APIs RESTful avec DRF, sérialiseurs, pagination, throttling et documentation Swagger.",
    descEn: "RESTful APIs with DRF, serializers, pagination, throttling, and Swagger docs.",
  },
];

export interface Project {
  id: string;
  slug: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "ecommerce-api",
    titleFr: "API E-Commerce",
    titleEn: "E-Commerce API",
    descFr: "API REST complète pour une marketplace avec paiements Stripe, gestion des stocks et notifications en temps réel via WebSockets.",
    descEn: "Full REST API for a marketplace with Stripe payments, inventory management, and real-time notifications via WebSockets.",
    image: "",
    tags: ["Django", "DRF", "PostgreSQL", "Celery", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "2",
    slug: "saas-dashboard",
    titleFr: "SaaS Dashboard",
    titleEn: "SaaS Dashboard",
    descFr: "Tableau de bord analytique multi-tenant avec authentification JWT, graphiques temps réel et export PDF.",
    descEn: "Multi-tenant analytics dashboard with JWT authentication, real-time charts, and PDF exports.",
    image: "",
    tags: ["Django", "React", "Redis", "Docker", "Chart.js"],
    github: "https://github.com",
  },
  {
    id: "3",
    slug: "task-automation",
    titleFr: "Automatisation de Tâches",
    titleEn: "Task Automation Platform",
    descFr: "Plateforme de workflows automatisés avec Celery Beat, monitoring Flower et intégrations API tierces.",
    descEn: "Automated workflow platform with Celery Beat, Flower monitoring, and third-party API integrations.",
    image: "",
    tags: ["Django", "Celery", "Redis", "RabbitMQ", "Docker"],
    github: "https://github.com",
    live: "https://example.com",
  },
];

export interface Experience {
  id: string;
  company: string;
  period: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  tags: string[];
}


export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    company: "TechCorp",
    period: "2022 - Présent",
    titleFr: "Développeur Django Senior",
    titleEn: "Senior Django Developer",
    descFr: "Lead technique sur les APIs backend, migration de monolithes vers des microservices, mentoring d'équipe.",
    descEn: "Tech lead on backend APIs, monolith-to-microservices migration, team mentoring.",
    tags: ["Django", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "2",
    company: "StartupFlow",
    period: "2020 - 2022",
    titleFr: "Développeur Backend Python",
    titleEn: "Python Backend Developer",
    descFr: "Conception d'APIs RESTful, intégration de services tiers, mise en place de CI/CD.",
    descEn: "RESTful API design, third-party service integration, CI/CD pipeline setup.",
    tags: ["Django", "DRF", "Celery", "Redis"],
  },
  {
    id: "3",
    company: "AgenceWeb",
    period: "2018 - 2020",
    titleFr: "Développeur Full-Stack Junior",
    titleEn: "Junior Full-Stack Developer",
    descFr: "Développement de sites web et d'applications avec Django et React.",
    descEn: "Web application development with Django and React.",
    tags: ["Django", "React", "PostgreSQL"],
  },
];

export const DJANGO_ADMIN_STATS = {
  totalVisitors: 12847,
  projectsCompleted: 23,
  commitsThisYear: 1342,
  coffeeCups: 2891,
  models: [
    { name: "Project", entries: 23, lastModified: "2026-02-19" },
    { name: "Experience", entries: 3, lastModified: "2026-01-15" },
    { name: "Skill", entries: 16, lastModified: "2026-02-10" },
    { name: "ContactMessage", entries: 47, lastModified: "2026-02-18" },
    { name: "BlogPost", entries: 12, lastModified: "2026-02-17" },
  ],
};

type I18nSection = Record<string, { fr: string; en: string }>;

export const i18n: Record<string, I18nSection> = {
  nav: {
    about: { fr: "À propos", en: "About" },
    projects: { fr: "Projets", en: "Projects" },
    skills: { fr: "Compétences", en: "Skills" },
    experience: { fr: "Expérience", en: "Experience" },
    contact: { fr: "Contact", en: "Contact" },
  },
  hero: {
    greeting: { fr: "Salut, je suis", en: "Hi, I'm" },
    name: { fr: "RAZAFIMAHARO Mbolatiana Alice", en: "RAZAFIMAHARO Mbolatiana Alice" },
    title: { fr: "Développeur Django", en: "Django Developer" },
    subtitle: {
      fr: "Je construis des backends robustes et des APIs performantes avec Python & Django.",
      en: "I build robust backends and high-performance APIs with Python & Django.",
    },
    cta: { fr: "Voir mes projets", en: "See my projects" },
    ctaSecondary: { fr: "Me contacter", en: "Contact me" },
  },
 
  about: {
    title:      { fr: "À propos",            en: "About Me" },
    subtitle:   { fr: "Un peu sur moi",       en: "A bit about me" },
    bio1: {
      fr: "Développeur Django passionné avec 6 ans d'expérience dans la construction de backends robustes et d'APIs performantes. J'aime transformer des problèmes complexes en solutions élégantes.",
      en: "Passionate Django developer with 6 years of experience building robust backends and high-performance APIs. I love turning complex problems into elegant solutions.",
    },
    bio2: {
      fr: "Basé à Madagascar, je travaille en remote avec des équipes internationales. Quand je ne code pas, je contribue à des projets open-source ou j'explore de nouveaux outils dans l'écosystème Python.",
      en: "Based in Madagascar, I work remotely with international teams. When I'm not coding, I contribute to open-source projects or explore new tools in the Python ecosystem.",
    },
    location:   { fr: "Madagascar",           en: "Madagascar" },
    available:  { fr: "Disponible en remote", en: "Available remotely" },
    trait1:     { fr: "Résolution de problèmes", en: "Problem Solving" },
    trait2:     { fr: "Code propre",           en: "Clean Code" },
    trait3:     { fr: "Open Source",           en: "Open Source" },
    trait4:     { fr: "Mentorat",              en: "Mentoring" },
  },
  projects: {
    title: { fr: "Projets", en: "Projects" },
    subtitle: { fr: "Une sélection de mes réalisations récentes", en: "A selection of my recent work" },
    viewCode: { fr: "Code source", en: "Source code" },
    viewLive: { fr: "Voir en ligne", en: "View live" },
  },
  skills: {
    title: { fr: "Stack Technique", en: "Tech Stack" },
    subtitle: { fr: "Les technologies que je maîtrise", en: "Technologies I master" },
    backend: { fr: "Backend", en: "Backend" },
    frontend: { fr: "Frontend", en: "Frontend" },
    devops: { fr: "DevOps", en: "DevOps" },
  },
  techHighlights: {
    title: { fr: "Expertise Django", en: "Django Expertise" },
    subtitle: { fr: "Maîtrise approfondie de l'écosystème", en: "Deep mastery of the ecosystem" },
  },
  experience: {
    title: { fr: "Expérience", en: "Experience" },
    subtitle: { fr: "Mon parcours professionnel", en: "My professional journey" },
  },
  contact: {
    title: { fr: "Contact", en: "Let's Talk" },
    subtitle: { fr: "Un projet en tête ? Discutons-en.", en: "Have a project in mind? Let's discuss." },
    name: { fr: "Nom", en: "Name" },
    email: { fr: "Email", en: "Email" },
    message: { fr: "Message", en: "Message" },
    send: { fr: "Envoyer", en: "Send" },
    success: { fr: "Message envoyé avec succès !", en: "Message sent successfully!" },
  },
  footer: {
    rights: { fr: "Tous droits réservés.", en: "All rights reserved." },
  },
  settings: {
    theme: { fr: "Thème", en: "Theme" },
    language: { fr: "Langue", en: "Language" },
    accent: { fr: "Accent", en: "Accent" },
    bw: { fr: "Noir & Blanc", en: "Black & White" },
    slate: { fr: "Bleu Nuit", en: "Night Blue" },
    forest: { fr: "Émeraude", en: "Emerald" },
    adminView: { fr: "Vue Admin", en: "Admin View" },
  },
};

export const t = (section: string, key: string, lang: Lang): string => {
  return i18n[section]?.[key]?.[lang] ?? key;
};
