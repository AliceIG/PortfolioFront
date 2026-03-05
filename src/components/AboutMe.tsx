import { useRef } from "react";
import { motion, useInView, easeOut } from "framer-motion";
import { User, MapPin, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import { useProfile } from "./HeroSection"; 

// ─── Typing hook ─────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

function useTypewriter(text: string, speed = 18, startDelay = 0, active = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, active, speed, startDelay]);
  return displayed;
}

// ─── Ligne terminal colorée ───────────────────────────────────────────────────
interface FieldProps {
  keyName: string;
  value:   string;
  type?:   "str" | "int" | "bool" | "list";
  delay?:  number;
  active:  boolean;
}

const Field = ({ keyName, value, type = "str", delay = 0, active }: FieldProps) => {
  const text = `  ${keyName}: ${value},`;
  const displayed = useTypewriter(active ? text : "", 18, delay, active);

  const valueColor =
    type === "str"  ? "text-emerald-400" :
    type === "int"  ? "text-blue-400"    :
    type === "bool" ? "text-amber-400"   :
                      "text-purple-400";

  const colonIdx = displayed.indexOf(":");
  const keyPart  = colonIdx > -1 ? displayed.slice(0, colonIdx) : displayed;
  const rest     = colonIdx > -1 ? displayed.slice(colonIdx)    : "";

  return (
    <div className="font-mono text-sm leading-6 whitespace-pre">
      <span className="text-zinc-500">{keyPart}</span>
      <span className={valueColor}>{rest}</span>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const { lang } = useTheme();
  const profile  = useProfile();
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-100px" });

  const bio    = profile ? (lang === "fr" ? profile.bioFr    : profile.bioEn)    : "";
  const traits = profile ? (lang === "fr" ? profile.traitsFr : profile.traitsEn) : [];

  // Valeurs terminal — toutes issues de l'API
  const stackStr = profile?.stack?.length
    ? `[${profile.stack.map((s) => `"${s}"`).join(", ")}]`
    : '["…"]';

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-14 text-center">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-mono mb-4">
            <User size={13} className="terminal-accent" />
            <span className="text-muted-foreground">developer.about()</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            {t("about", "title", lang)}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
            {t("about", "subtitle", lang)}
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid md:grid-cols-2 gap-8 items-start">

          {/* ── Terminal card ── */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl border border-border overflow-hidden shadow-xl">
              {/* Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">profile.py</span>
              </div>

              {/* Body */}
              <div className="bg-zinc-950/80 p-5 space-y-0.5 min-h-[300px]">
                {inView && <>
                  <div className="font-mono text-sm text-zinc-500 mb-1">{">>> from portfolio.models import Developer"}</div>
                  <div className="font-mono text-sm text-zinc-500 mb-3">{">>> Developer.objects.get(pk=1).__repr__()"}</div>
                  <div className="font-mono text-sm text-zinc-300">{"{"}</div>
                </>}

                <Field active={inView} delay={400}  keyName="name"            value={`"RAZAFIMAHARO Mbolatiana Alice"`} type="str" />
                <Field active={inView} delay={700}  keyName="role"            value={profile ? `"${lang === "fr" ? profile.titleFr : profile.titleEn}"` : '"…"'} type="str" />
                <Field active={inView} delay={1000} keyName="location"        value={`"${profile?.location ?? "…"}"`} type="str" />
                <Field active={inView} delay={1300} keyName="years_xp"        value={String(profile?.experienceYears ?? 0)} type="int" />
                <Field active={inView} delay={1600} keyName="open_to_remote"  value={profile?.openToRemote ? "True" : "False"} type="bool" />
                <Field active={inView} delay={1900} keyName="stack"           value={stackStr} type="list" />
                <Field active={inView} delay={2200} keyName="coffee_per_day"  value={String(profile?.coffeePerDay ?? 0)} type="int" />

                {inView && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="font-mono text-sm text-zinc-300">
                    {"}"}
                  </motion.div>
                )}
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2 h-4 bg-emerald-400 mt-1 align-middle" />
              </div>
            </div>
          </motion.div>

          {/* ── Bio + traits ── */}
          <motion.div variants={itemVariants} className="space-y-6">

            {/* Bio */}
            <div className="space-y-4">
              {bio
                ? bio.split("\n").filter(Boolean).map((para, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed text-[1.05rem]">{para}</p>
                  ))
                : <p className="text-muted-foreground/40 italic text-sm font-mono">
                    {lang === "fr" ? "# bio non renseignée" : "# bio not set"}
                  </p>
              }
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-sm font-mono">
                <MapPin size={13} className="terminal-accent" />
                {profile?.location ?? "…"}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t("about", "available", lang)}
              </span>
            </div>

            <div className="border-t border-border" />

            {/* Traits */}
            <div>
              <p className="text-sm text-muted-foreground font-mono mb-3">
                {lang === "fr" ? "# Ce que j'apporte" : "# What I bring"}
              </p>
              {traits.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait) => (
                    <span key={trait} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm font-medium hover:border-primary/50 transition-colors">
                      <ChevronRight size={12} className="terminal-accent" />
                      {trait}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground/40 italic text-sm font-mono">
                  {lang === "fr" ? "# traits non renseignés" : "# traits not set"}
                </p>
              )}
            </div>

            {/* CV dynamique */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
              {profile?.cv ? (
                <a href={profile.cv} download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm">
                  {lang === "fr" ? "Télécharger mon CV" : "Download my CV"}
                  <span className="font-mono opacity-70">↓</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-dashed border-border rounded-lg text-sm text-muted-foreground/50 font-mono cursor-default">
                  {lang === "fr" ? "CV non disponible" : "CV not available"}
                </span>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;


// import { useEffect, useRef, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import { User, MapPin, Coffee, Code2, Sparkles, ChevronRight } from "lucide-react";
// import { useTheme } from "@/contexts/ThemeContext";
// import { t } from "@/constants/content";



// // ─── Typing hook ────────────────────────────────────────────────────────────
// function useTypewriter(text: string, speed = 28, startDelay = 0) {
//   const [displayed, setDisplayed] = useState("");
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     setDisplayed("");
//     setDone(false);
//     let i = 0;
//     const start = setTimeout(() => {
//       const id = setInterval(() => {
//         i++;
//         setDisplayed(text.slice(0, i));
//         if (i >= text.length) {
//           clearInterval(id);
//           setDone(true);
//         }
//       }, speed);
//       return () => clearInterval(id);
//     }, startDelay);
//     return () => clearTimeout(start);
//   }, [text, speed, startDelay]);

//   return { displayed, done };
// }

// // ─── Syntax-highlighted "Python repr" line ──────────────────────────────────
// interface FieldProps {
//   indent?: number;
//   keyName: string;
//   value: string;
//   type?: "str" | "int" | "bool" | "list" | "none";
//   delay?: number;
//   inView?: boolean;
// }

// const Field = ({ indent = 2, keyName, value, type = "str", delay = 0, inView = false }: FieldProps) => {
//   const text = `${"  ".repeat(indent)}${keyName}: ${value},`;
//   const { displayed } = useTypewriter(inView ? text : "", 18, delay);

//   const valueColor =
//     type === "str"   ? "text-emerald-400" :
//     type === "int"   ? "text-blue-400"    :
//     type === "bool"  ? "text-amber-400"   :
//     type === "list"  ? "text-purple-400"  :
//                        "text-zinc-500";

//   // Split at first colon for coloring
//   const colonIdx = displayed.indexOf(":");
//   const keyPart   = colonIdx > -1 ? displayed.slice(0, colonIdx)     : displayed;
//   const restPart  = colonIdx > -1 ? displayed.slice(colonIdx)         : "";

//   return (
//     <div className="font-mono text-sm leading-6 whitespace-pre">
//       <span className="text-zinc-500">{keyPart}</span>
//       <span className={valueColor}>{restPart}</span>
//     </div>
//   );
// };

// // ─── Stat counter ────────────────────────────────────────────────────────────
// const StatCounter = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => (
//   <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-secondary/60 border border-border/50">
//     <Icon size={16} className="terminal-accent mb-1" />
//     <span className="text-2xl font-bold font-mono">{value}</span>
//     <span className="text-xs text-muted-foreground text-center">{label}</span>
//   </div>
// );

// // ─── Main component ──────────────────────────────────────────────────────────
// const AboutSection = () => {
//   const { lang } = useTheme();
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   const traits = [
//     t("about", "trait1", lang),
//     t("about", "trait2", lang),
//     t("about", "trait3", lang),
//     // t("about", "trait4", lang),
//   ];

//   const containerVariants = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden:  { opacity: 0, y: 24 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   return (
//     <section id="about" className="py-24 px-4 sm:px-6" ref={ref}>
//       <div className="max-w-5xl mx-auto">

//         {/* Header */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           className="mb-14 text-center"
//         >
//           <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-mono mb-4">
//             <User size={13} className="terminal-accent" />
//             <span className="text-muted-foreground">developer.about()</span>
//           </motion.div>
//           <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
//             {t("about", "title", lang)}
//           </motion.h2>
//           <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
//             {t("about", "subtitle", lang)}
//           </motion.p>
//         </motion.div>

//         {/* Main grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           className="grid md:grid-cols-2 gap-8 items-start"
//         >

//           {/* ── Left: Terminal card ── */}
//           <motion.div variants={itemVariants}>
//             <div className="rounded-2xl border border-border overflow-hidden shadow-xl">
//               {/* Window chrome */}
//               <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
//                 <span className="w-3 h-3 rounded-full bg-red-500/70" />
//                 <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
//                 <span className="w-3 h-3 rounded-full bg-green-500/70" />
//                 <span className="ml-3 font-mono text-xs text-muted-foreground">profile.py</span>
//               </div>

//               {/* Code body */}
//               <div className="bg-zinc-950/80 p-5 space-y-0.5 min-h-[280px]">
//                 <div className="font-mono text-sm text-zinc-500 mb-1">
//                   {inView && ">>> from portfolio.models import Developer"}
//                 </div>
//                 <div className="font-mono text-sm text-zinc-500 mb-3">
//                   {inView && ">>> Developer.objects.get(pk=1).__repr__()"}
//                 </div>

//                 {/* Opening brace */}
//                 {inView && (
//                   <div className="font-mono text-sm text-zinc-300">{"{"}</div>
//                 )}

//                 <Field inView={inView} delay={400}  keyName="  name"       value={`"RAZAFIMAHARO Mbolatiana Alice"`} type="str" />
//                 <Field inView={inView} delay={700}  keyName="  role"       value={`"Django Developer"`} type="str" />
//                 <Field inView={inView} delay={1000} keyName="  location"   value={`"${t("about", "location", lang)}"`} type="str" />
//                 <Field inView={inView} delay={1300} keyName="  experience" value="6"                          type="int" />
//                 <Field inView={inView} delay={1600} keyName="  open_to_remote" value="True"                  type="bool" />
//                 <Field inView={inView} delay={1900} keyName="  stack"      value={`["Django", "DRF", "Python", "PostgreSQL"]`} type="list" />
//                 <Field inView={inView} delay={2200} keyName="  coffee_per_day" value="3"                     type="int" />

//                 {/* Closing brace */}
//                 {inView && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 2.6 }}
//                     className="font-mono text-sm text-zinc-300"
//                   >
//                     {"}"}
//                   </motion.div>
//                 )}

//                 {/* Blinking cursor */}
//                 <motion.span
//                   animate={{ opacity: [1, 0, 1] }}
//                   transition={{ repeat: Infinity, duration: 1 }}
//                   className="inline-block w-2 h-4 bg-emerald-400 mt-1 align-middle"
//                 />
//               </div>
//             </div>

//             {/* Stat row 
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-3 gap-3 mt-4"
//             >
//               <StatCounter value="6+"  label={lang === "fr" ? "Ans d'expérience" : "Years exp."} icon={Code2} />
//               <StatCounter value="23"  label={lang === "fr" ? "Projets livrés"   : "Projects"  } icon={Sparkles} />
//               <StatCounter value="2.8k" label={lang === "fr" ? "Cafés bus"        : "Coffees"  } icon={Coffee} />
//             </motion.div>*/}
//           </motion.div>

//           {/* ── Right: Bio + traits ── */}
//           <motion.div variants={itemVariants} className="space-y-6">

//             {/* Bio paragraphs */}
//             <div className="space-y-4">
//               <p className="text-muted-foreground leading-relaxed text-[1.05rem]">
//                 {t("about", "bio1", lang)}
//               </p>
//               <p className="text-muted-foreground leading-relaxed text-[1.05rem]">
//                 {t("about", "bio2", lang)}
//               </p>
//             </div>

//             {/* Location / availability badges */}
//             <div className="flex flex-wrap gap-3">
//               <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-sm font-mono">
//                 <MapPin size={13} className="terminal-accent" />
//                 {t("about", "location", lang)}
//               </span>
//               <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-mono">
//                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//                 {t("about", "available", lang)}
//               </span>
//             </div>

//             {/* Divider */}
//             <div className="border-t border-border" />

//             {/* Traits */}
//             <div>
//               <p className="text-sm text-muted-foreground font-mono mb-3">
//                 {lang === "fr" ? "# Ce que j'apporte" : "# What I bring"}
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {traits.map((trait) => (
//                   <span
//                     key={trait}
//                     className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm font-medium hover:border-primary/50 transition-colors"
//                   >
//                     <ChevronRight size={12} className="terminal-accent" />
//                     {trait}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* CTA */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="pt-2"
//             >
//               <a
//                 href="/cv.pdf"
//                 download
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
//               >
//                 {lang === "fr" ? "Télécharger mon CV" : "Download my CV"}
//                 <span className="font-mono opacity-70">↓</span>
//               </a>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;
