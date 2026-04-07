// api.ts — types alignés sur la sortie camelCase du serializer Django

const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export interface ProjectImage {
  id:    number;
  image: string;
  order: number;
}

export interface Project {
  image: string;
  id:      number;
  slug:    string;
  tags:    string[];
  github:  string;
  live:    string;
  titleFr: string;
  titleEn: string;
  descFr:  string;
  descEn:  string;
  images:  ProjectImage[];
}

export interface Experience {
  id:      number;
  company: string;
  period:  string;
  tags:    string[];
  titleFr: string;
  titleEn: string;
  descFr:  string;
  descEn:  string;
}

export interface SiteProfile {
  photo:           string | null;
  cv:              string | null;
  titleFr:         string;
  titleEn:         string;
  subtitleFr:      string;
  subtitleEn:      string;
  location:        string;
  experienceYears: number;
  openToRemote:    boolean;
  coffeePerDay:    number;
  stack:           string[];
  bioFr:           string;
  bioEn:           string;
  traitsFr:        string[];
  traitsEn:        string[];
}

export interface Skills {
  backend:  { name: string; level: number }[];
  frontend: { name: string; level: number }[];
  devops:   { name: string; level: number }[];
}

export interface TechHighlight {
  id:      string;
  icon:    string;
  titleFr: string;
  titleEn: string;
  descFr:  string;
  descEn:  string;
}

export interface AdminStats {
  totalVisitors:     number;
  projectsCompleted: number;
  commitsThisYear:   number;
  coffeeCups:        number;
  models: {
    name:         string;
    entries:      number;
    lastModified: string | null;
  }[];
}

export interface ContactPayload {
  name:    string;
  email:   string;
  message: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`API ${res.status} — ${path}: ${detail}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getProfile():                          Promise<SiteProfile>        { return request("/profile/"); },
  getProjects():                         Promise<Project[]>          { return request("/projects/"); },
  getExperiences():                      Promise<Experience[]>       { return request("/experiences/"); },
  getSkills():                           Promise<Skills>             { return request("/skills/"); },
  getTechHighlights():                   Promise<TechHighlight[]>    { return request("/tech-highlights/"); },
  getAdminStats():                       Promise<AdminStats>         { return request("/admin-stats/"); },
  sendContact(data: ContactPayload):     Promise<{ success: boolean }> {
    return request("/contact/", { method: "POST", body: JSON.stringify(data) });
  },
};

// import type { Project, Experience } from "@/constants/content";

// const API_BASE = "http://127.0.0.1:8000/api";

// // ── Types ─────────────────────────────────────────────────────────────────────

// export interface SiteProfile {
//   photo:       string | null;
//   cv:       string | null;

//   title_fr:    string;
//   title_en:    string;
//   subtitle_fr: string;
//   subtitle_en: string;
// }

// export interface Skills {
//   backend:  { name: string; level: number }[];
//   frontend: { name: string; level: number }[];
//   devops:   { name: string; level: number }[];
// }

// export interface TechHighlight {
//   id:      string;
//   icon:    string;
//   title_fr: string;
//   title_en: string;
//   desc_fr:  string;
//   desc_en:  string;
// }

// export interface AdminStats {
//   totalVisitors:    number;
//   projectsCompleted: number;
//   commitsThisYear:  number;
//   coffeeCups:       number;
//   models: {
//     name:         string;
//     entries:      number;
//     lastModified: string;
//   }[];
// }

// export interface ContactPayload {
//   name:    string;
//   email:   string;
//   message: string;
// }

// // ── Helper ────────────────────────────────────────────────────────────────────

// async function request<T>(path: string, options?: RequestInit): Promise<T> {
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: { "Content-Type": "application/json" },
//     ...options,
//   });

//   if (!res.ok) {
//     const detail = await res.text();
//     throw new Error(`API ${res.status} — ${path}: ${detail}`);
//   }

//   return res.json() as Promise<T>;
// }

// // ── API ───────────────────────────────────────────────────────────────────────

// export const api = {
//   getProfile(): Promise<SiteProfile> {
//     return request<SiteProfile>("/profile/");
//   },

//   getProjects(): Promise<Project[]> {
//     return request<Project[]>("/projects/");
//   },

//   getExperiences(): Promise<Experience[]> {
//     return request<Experience[]>("/experiences/");
//   },

//   getSkills(): Promise<Skills> {
//     return request<Skills>("/skills/");
//   },

//   getTechHighlights(): Promise<TechHighlight[]> {
//     return request<TechHighlight[]>("/tech-highlights/");
//   },

//   getAdminStats(): Promise<AdminStats> {
//     return request<AdminStats>("/admin-stats/");
//   },

//   sendContact(data: ContactPayload): Promise<{ success: boolean }> {
//     return request<{ success: boolean }>("/contact/", {
//       method: "POST",
//       body:   JSON.stringify(data),
//     });
//   },
// };

//========================================================================================
//-------------- Mock API — replace with real fetch() calls in production ----------------
//========================================================================================  


// import { PROJECTS, EXPERIENCES, SKILLS, TECH_HIGHLIGHTS, DJANGO_ADMIN_STATS } from "@/constants/content";
// import type { Project, Experience } from "@/constants/content";

// // Simulated API delay
// const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// const API_BASE = "/api/v1"; 

// // Mock implementations — swap with fetch() for production
// export const api = {
//   async getProjects(): Promise<Project[]> {
//     await delay(200);
//     // Production: return fetch(`${API_BASE}/projects/`).then(r => r.json());
//     return PROJECTS;
//   },

//   async getExperiences(): Promise<Experience[]> {
//     await delay(150);
//     return EXPERIENCES;
//   },

//   async getSkills() {
//     await delay(100);
//     return SKILLS;
//   },

//   async getTechHighlights() {
//     await delay(100);
//     return TECH_HIGHLIGHTS;
//   },

//   async getAdminStats() {
//     await delay(300);
//     return DJANGO_ADMIN_STATS;
//   },

//   async sendContact(data: { name: string; email: string; message: string }) {
//     await delay(500);
//     // Production: return fetch(`${API_BASE}/contact/`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
//     console.log("Contact form submitted:", data);
//     return { success: true };
//   },
// };
