import { useEffect, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t, type Lang } from "@/constants/content";
import { api } from "@/services/api";
import type { Project } from "@/services/api";
import AnimatedSection from "./AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

// ── Carousel ─────────────────────────────────────────────────────────────────
const ImageCarousel = ({ images, isHovered }: { images: { id: number; image: string; order: number }[]; isHovered: boolean }) => {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  // Reset index when carousel becomes visible
  useEffect(() => {
    if (isHovered) {
      setIdx(0);
    }
  }, [isHovered]);

  if (images.length === 0) return null;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setIdx((i) => (i + 1) % images.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <motion.div 
      className="relative w-full h-44 rounded-lg overflow-hidden bg-secondary/40"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.img
          key={images[idx].id}
          src={images[idx].image}
          alt=""
          className="w-full h-full object-cover"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Contrôles — visibles seulement si > 1 image et hover */}
      {images.length > 1 && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-all hover:scale-110"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-all hover:scale-110"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots avec animation */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(i > idx ? 1 : -1);
                  setIdx(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === idx ? "bg-white" : "bg-white/40"
                }`}
                whileHover={{ scale: 1.5 }}
                animate={i === idx ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// ── Project Card ────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, lang }: { project: Project; index: number; lang: Lang }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasImages = project.images && project.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-card p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      {/* Effet de lueur au hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Zone d'image (apparaît au hover) */}
      <AnimatePresence mode="wait">
        {isHovered && hasImages ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ImageCarousel images={project.images} isHovered={isHovered} />
          </motion.div>
        ) : (
          <motion.div
            key="description"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!hasImages && isHovered ? (
              // Pas d'images : on garde la description mais avec un léger effet
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground mb-4">
                  {lang === "fr" ? project.descFr : project.descEn}
                </p>
              </motion.div>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">
                {lang === "fr" ? project.descFr : project.descEn}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Titre et tags toujours visibles */}
      <motion.div
        animate={isHovered ? { y: hasImages ? -2 : 0 } : { y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-2">
          {lang === "fr" ? project.titleFr : project.titleEn}
        </h3>
        
        {/* Tags avec animation au hover */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0.7 }}
              animate={isHovered ? { 
                opacity: 1,
                scale: 1.05,
                transition: { delay: i * 0.03 }
              } : { opacity: 0.7, scale: 1 }}
              className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Liens avec animation */}
      <motion.div 
        className="flex gap-3 pt-2 border-t border-border"
        animate={isHovered ? { y: hasImages ? -2 : 0 } : { y: 0 }}
      >
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={14} /> {t("projects", "viewCode", lang)}
          </motion.a>
        )}
        {project.live && (
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={14} /> {t("projects", "viewLive", lang)}
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Main Section ────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const { lang } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <AnimatedSection className="section-padding">
      <div id="projects" className="max-w-6xl mx-auto scroll-mt-20">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {t("projects", "title", lang)}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t("projects", "subtitle", lang)}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;

// import { useEffect, useState } from "react";
// import { ExternalLink, Github } from "lucide-react";
// import { useTheme } from "@/contexts/ThemeContext";
// import { t } from "@/constants/content";
// import { api } from "@/services/api";
// import type { Project } from "@/constants/content";
// import AnimatedSection from "./AnimatedSection";
// import { motion } from "framer-motion";

// const ProjectsSection = () => {
//   const { lang } = useTheme();
//   const [projects, setProjects] = useState<Project[]>([]);

//   useEffect(() => {
//     api.getProjects().then((data) => {
//       const projectsWithImages = data.map((project) => ({
//         ...project,
//         id: String(project.id),
//         image: project.image || "",
//       }));
//       setProjects(projectsWithImages);
//     });
//   }, []);

//   return (
//     <AnimatedSection className="section-padding" >
//       <div id="projects" className="max-w-6xl mx-auto scroll-mt-20">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("projects", "title", lang)}</h2>
//         <p className="text-muted-foreground mb-12">{t("projects", "subtitle", lang)}</p>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project, i) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ y: -4 }}
//               className="glass-card p-6 flex flex-col justify-between group"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">
//                   {lang === "fr" ? project.titleFr : project.titleEn}
//                 </h3>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   {lang === "fr" ? project.descFr : project.descEn}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tags.map((tag) => (
//                     <span key={tag} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-2 border-t border-border">
//                 {project.github && (
//                   <a href={project.github} target="_blank" rel="noopener noreferrer"
//                     className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
//                     <Github size={14} /> {t("projects", "viewCode", lang)}
//                   </a>
//                 )}
//                 {project.live && (
//                   <a href={project.live} target="_blank" rel="noopener noreferrer"
//                     className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
//                     <ExternalLink size={14} /> {t("projects", "viewLive", lang)}
//                   </a>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </AnimatedSection>
//   );
// };

// export default ProjectsSection;
