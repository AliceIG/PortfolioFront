import { useEffect, useState } from "react";
import { Database, Zap, Server, Globe, Code2, Layers, GitBranch, Cloud, Cpu, Layout, Shield, RefreshCw } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import type { TechHighlight } from "@/services/api";

const ICON_MAP: Record<string, React.ElementType> = {
  Database, Zap, Server, Globe, Code2, Layers, GitBranch, Cloud, Cpu, Layout, Shield, RefreshCw,
};

const TechHighlights = () => {
  const { lang } = useTheme();
  const [highlights, setHighlights] = useState<TechHighlight[]>([]);

  useEffect(() => {
    api.getTechHighlights().then(setHighlights).catch(() => setHighlights([]));
  }, []);

  return (
    <AnimatedSection className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("techHighlights", "title", lang)}</h2>
        <p className="text-muted-foreground mb-12">{t("techHighlights", "subtitle", lang)}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Database;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold mb-2">
                  {lang === "fr" ? item.titleFr : item.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lang === "fr" ? item.descFr : item.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TechHighlights;

// import { Database, Zap, Server, Globe } from "lucide-react";
// import { useTheme } from "@/contexts/ThemeContext";
// import { t, TECH_HIGHLIGHTS } from "@/constants/content";
// import AnimatedSection from "./AnimatedSection";
// import { motion } from "framer-motion";

// const ICON_MAP: Record<string, React.ElementType> = {
//   Database, Zap, Server, Globe,
// };

// const TechHighlights = () => {
//   const { lang } = useTheme();

//   return (
//     <AnimatedSection className="section-padding">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("techHighlights", "title", lang)}</h2>
//         <p className="text-muted-foreground mb-12">{t("techHighlights", "subtitle", lang)}</p>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {TECH_HIGHLIGHTS.map((item, i) => {
//             const Icon = ICON_MAP[item.icon] || Database;
//             return (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 whileHover={{ scale: 1.03 }}
//                 className="glass-card p-6 text-center group"
//               >
//                 <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                   <Icon size={22} />
//                 </div>
//                 <h3 className="font-semibold mb-2">{lang === "fr" ? item.titleFr : item.titleEn}</h3>
//                 <p className="text-sm text-muted-foreground">{lang === "fr" ? item.descFr : item.descEn}</p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </AnimatedSection>
//   );
// };

// export default TechHighlights;
