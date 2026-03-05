import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import type { Experience } from "@/constants/content";
import { api } from "@/services/api";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const ExperienceSection = () => {
  const { lang } = useTheme();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    api.getExperiences().then(setExperiences);
  }, []);

  return (
    <AnimatedSection className="section-padding bg-secondary/30">
      <div id="experience" className="max-w-4xl mx-auto scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("experience", "title", lang)}</h2>
        <p className="text-muted-foreground mb-12">{t("experience", "subtitle", lang)}</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="sm:pl-12 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background hidden sm:block" />

                <div className="glass-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                      {lang === "fr" ? exp.titleFr : exp.titleEn}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {lang === "fr" ? exp.descFr : exp.descEn}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ExperienceSection;
