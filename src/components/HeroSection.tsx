import { useEffect, useState } from "react";
import { ArrowDown, Terminal, Circle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import { motion } from "framer-motion";
import { SiteProfile } from "@/services/api";
import { api } from "@/services/api";  

export function useProfile() {
  const [profile, setProfile] = useState<SiteProfile | null>(null);

  useEffect(() => {
    api.getProfile()
      .then(setProfile)
      .catch(() =>
        setProfile({
          photo: null, cv: null,
          titleFr: "Développeur Fullstack",
          titleEn: "Fullstack Developer",
          subtitleFr: "Je construis des applications web complètes avec Python, Django et React.",
          subtitleEn: "I build complete web applications with Python, Django, and React.",
          location: "Madagascar", experienceYears: 6,
          openToRemote: true, coffeePerDay: 3,
          stack: ["Django", "DRF", "React", "TypeScript"],
          bioFr: "", bioEn: "", traitsFr: [], traitsEn: [],
        })
      );
  }, []);

  return profile;
}

const HeroSection = () => {
  const { lang } = useTheme();
  const profile = useProfile();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const title    = profile ? (lang === "fr" ? profile.titleFr    : profile.titleEn)    : "";
const subtitle = profile ? (lang === "fr" ? profile.subtitleFr : profile.subtitleEn) : "";
  const badgeLabel = title.split(" ").slice(0, 2).join(" ");

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* ── Left ── */}
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-mono mb-8">
              <Terminal size={14} className="terminal-accent" />
              <span className="text-muted-foreground">python manage.py runserver</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-muted-foreground text-lg mb-2">
              {t("hero", "greeting", lang)}
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              {t("hero", "name", lang)}
            </motion.h1>

            <motion.p key={title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-medium text-muted-foreground mb-6">
              {title}
            </motion.p>

            <motion.p key={subtitle} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted-foreground max-w-xl mb-10 text-lg">
              {subtitle}
            </motion.p>

       <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {t("hero", "cta", lang)}
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                {t("hero", "ctaSecondary", lang)}
              </button>
            </motion.div>
          </div>

          {/* ── Right : photo ── */}
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }} className="relative flex-shrink-0">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: "1.5px dashed var(--terminal-accent, #10b981)", opacity: 0.35, margin: "-14px" }} />
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: "2px solid var(--terminal-accent, #10b981)", opacity: 0.18, margin: "-5px" }} />

            <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-secondary border-2 border-border">
              {profile?.photo ? (
                <motion.img key={profile.photo} src={profile.photo} alt="RAZAFIMAHARO M. Alice"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground font-mono text-xs">
                  <Circle size={32} className="terminal-accent opacity-40" />
                  <span>photo.jpg</span>
                </div>
              )}
            </div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-mono shadow-lg">
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              {lang === "fr" ? "Disponible" : "Available"}
            </motion.div>

            <motion.div key={badgeLabel} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute -top-2 -left-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-mono shadow-lg terminal-accent">
              {badgeLabel}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;


// import { ArrowDown, Terminal, Circle } from "lucide-react";
// import { useTheme } from "@/contexts/ThemeContext";
// import { t } from "@/constants/content";
// import { motion } from "framer-motion";
// import profilePhoto from "@/assets/alice_covert.jpeg";

// // const profilePhoto = ""; // ← mets le chemin de ta photo ici

// const HeroSection = () => {
//   const { lang } = useTheme();

//   const scrollTo = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section
//       id="hero"
//       className="min-h-screen flex items-center justify-center relative overflow-hidden"
//       style={{ background: "var(--hero-gradient)" }}
//     >
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
//         <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

//           {/* ── Left: text content ───────────────────────────────────────── */}
//           <div className="flex-1 text-center md:text-left">

//             {/* Terminal badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-mono mb-8"
//             >
//               <Terminal size={14} className="terminal-accent" />
//               <span className="text-muted-foreground">python manage.py runserver</span>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-muted-foreground text-lg mb-2"
//             >
//               {t("hero", "greeting", lang)}
//             </motion.p>

//             <motion.h1
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-5xl sm:text-6xl font-bold tracking-tight mb-4"
//             >
//               {t("hero", "name", lang)}
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="text-2xl sm:text-3xl font-medium text-muted-foreground mb-6"
//             >
//               {t("hero", "title", lang)}
//             </motion.p>

//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="text-muted-foreground max-w-xl mb-10 text-lg"
//             >
//               {t("hero", "subtitle", lang)}
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
//             >
//               <button
//                 onClick={() => scrollTo("projects")}
//                 className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
//               >
//                 {t("hero", "cta", lang)}
//               </button>
//               <button
//                 onClick={() => scrollTo("contact")}
//                 className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
//               >
//                 {t("hero", "ctaSecondary", lang)}
//               </button>
//             </motion.div>
//           </div>

//           {/* ── Right: photo ─────────────────────────────────────────────── */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.88 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
//             className="relative flex-shrink-0"
//           >
//             {/* Rotating dashed ring */}
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
//               className="absolute inset-0 rounded-full"
//               style={{
//                 border: "1.5px dashed var(--terminal-accent, #10b981)",
//                 opacity: 0.35,
//                 margin: "-14px",
//               }}
//             />

//             {/* Static solid ring */}
//             <div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 border: "2px solid var(--terminal-accent, #10b981)",
//                 opacity: 0.18,
//                 margin: "-5px",
//               }}
//             />

//             {/* Photo container */}
//             <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-secondary border-2 border-border">
//               {profilePhoto ? (
//                 <img
//                   src={profilePhoto}
//                   alt="RAZAFIMAHARO M. Alice"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 /* Placeholder quand pas de photo */
//                 <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground font-mono text-xs">
//                   <Circle size={32} className="terminal-accent opacity-50" />
//                   <span>photo.jpg</span>
//                 </div>
//               )}
//             </div>

//             {/* Floating badge — "disponible" */}
//             <motion.div
//               initial={{ opacity: 0, x: 10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.9, duration: 0.4 }}
//               className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-mono shadow-lg"
//             >
//               <motion.span
//                 animate={{ opacity: [1, 0.3, 1] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
//               />
//               {lang === "fr" ? "Disponible" : "Available"}
//             </motion.div>

//             {/* Floating badge — stack hint */}
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 1.1, duration: 0.4 }}
//               className="absolute -top-2 -left-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-mono shadow-lg terminal-accent"
//             >
//               Django · Python
//             </motion.div>
//           </motion.div>

//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2"
//       >
//         <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
//           <ArrowDown size={20} className="text-muted-foreground" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;
