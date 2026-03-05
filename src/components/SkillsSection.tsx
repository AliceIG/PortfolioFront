import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import type { Skills } from "@/services/api";

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span className="font-mono">{name}</span>
      <span className="text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="h-full bg-primary rounded-full"
      />
    </div>
  </div>
);

const EMPTY: Skills = { backend: [], frontend: [], devops: [] };

const SkillsSection = () => {
  const { lang } = useTheme();
  const [skills, setSkills] = useState<Skills>(EMPTY);

  useEffect(() => {
    api.getSkills().then(setSkills).catch(() => setSkills(EMPTY));
  }, []);

  const categories = [
    { key: "backend",  data: skills.backend  },
    { key: "frontend", data: skills.frontend },
    { key: "devops",   data: skills.devops   },
  ] as const;

  return (
    <AnimatedSection className="section-padding bg-secondary/30">
      <div id="skills" className="max-w-6xl mx-auto scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("skills", "title", lang)}</h2>
        <p className="text-muted-foreground mb-12">{t("skills", "subtitle", lang)}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.key} className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-6 font-mono">
                {t("skills", cat.key, lang)}
              </h3>
              <div className="space-y-4">
                {cat.data.length > 0 ? (
                  cat.data.map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.1} />
                  ))
                ) : (
                  <p className="text-muted-foreground/40 italic text-sm font-mono">
                    # aucune compétence renseignée
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;

// import { useEffect, useState } from "react";
// import { useTheme } from "@/contexts/ThemeContext";
// import { t, SKILLS } from "@/constants/content";
// import AnimatedSection from "./AnimatedSection";
// import { motion } from "framer-motion";

// const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => (
//   <div className="space-y-1">
//     <div className="flex justify-between text-sm">
//       <span className="font-mono">{name}</span>
//       <span className="text-muted-foreground">{level}%</span>
//     </div>
//     <div className="h-2 bg-secondary rounded-full overflow-hidden">
//       <motion.div
//         initial={{ width: 0 }}
//         whileInView={{ width: `${level}%` }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, delay, ease: "easeOut" }}
//         className="h-full bg-primary rounded-full"
//       />
//     </div>
//   </div>
// );

// const SkillsSection = () => {
//   const { lang } = useTheme();

//   const categories = [
//     { key: "backend", data: SKILLS.backend },
//     { key: "frontend", data: SKILLS.frontend },
//     { key: "devops", data: SKILLS.devops },
//   ] as const;

//   return (
//     <AnimatedSection className="section-padding bg-secondary/30">
//       <div id="skills" className="max-w-6xl mx-auto scroll-mt-20">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("skills", "title", lang)}</h2>
//         <p className="text-muted-foreground mb-12">{t("skills", "subtitle", lang)}</p>

//         <div className="grid md:grid-cols-3 gap-8">
//           {categories.map((cat) => (
//             <div key={cat.key} className="glass-card p-6">
//               <h3 className="text-lg font-semibold mb-6 font-mono">
//                 {t("skills", cat.key, lang)}
//               </h3>
//               <div className="space-y-4">
//                 {cat.data.map((skill, i) => (
//                   <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.1} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </AnimatedSection>
//   );
// };

// export default SkillsSection;
