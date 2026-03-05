import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = ["about", "projects", "skills", "experience", "contact"] as const;
type NavItem = typeof NAV_ITEMS[number];

// ── Hook : détecte la section visible ────────────────────────────────────────
function useActiveSection(): NavItem | null {
  const [active, setActive] = useState<NavItem | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {
          // La section est "active" quand elle occupe 30%+ de l'écran,
          // avec une marge haute pour compenser la navbar fixe
          rootMargin: "-64px 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

// ─────────────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang } = useTheme();
  const activeSection = useActiveSection();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 font-mono text-sm font-bold"
        >
          <Terminal size={18} className="terminal-accent" />
          <span>django_dev</span>
          <span className="terminal-accent">$</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md group"
                style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {/* Underline actif */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-md bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    style={{ zIndex: -1 }}
                  />
                )}

                {/* Point accent sous le label */}
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  {t("nav", item, lang)}
                  <motion.span
                    className="block h-[2px] rounded-full terminal-accent-bg"
                    style={{ backgroundColor: "var(--terminal-accent, #10b981)" }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item;
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                    style={{
                      background: isActive ? "var(--secondary)" : "transparent",
                      color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                    }}
                  >
                    {/* Barre latérale verte si actif */}
                    <span
                      className="w-1 h-4 rounded-full transition-all"
                      style={{
                        backgroundColor: isActive
                          ? "var(--terminal-accent, #10b981)"
                          : "transparent",
                      }}
                    />
                    {t("nav", item, lang)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


// import { useState } from "react";
// import { Menu, X, Terminal } from "lucide-react";
// import { useTheme } from "@/contexts/ThemeContext";
// import { t } from "@/constants/content";
// import { motion, AnimatePresence } from "framer-motion";

// const NAV_ITEMS = ["about", "projects", "skills", "experience", "contact"] as const;

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { lang } = useTheme();

//   const scrollTo = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     setMobileOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
//         <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 font-mono text-sm font-bold">
//           <Terminal size={18} className="terminal-accent" />
//           <span>django_dev</span>
//           <span className="terminal-accent">$</span>
//         </button>

//         {/* Desktop */}
//         <div className="hidden md:flex items-center gap-6">
//           {NAV_ITEMS.map((item) => (
//             <button
//               key={item}
//               onClick={() => scrollTo(item)}
//               className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
//             >
//               {t("nav", item, lang)}
//             </button>
//           ))}
//         </div>

//         {/* Mobile */}
//         <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
//           {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden overflow-hidden bg-background border-b border-border"
//           >
//             <div className="px-4 py-4 space-y-3">
//               {NAV_ITEMS.map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => scrollTo(item)}
//                   className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   {t("nav", item, lang)}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;
