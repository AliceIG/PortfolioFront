import { useState } from "react";
import { Settings, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import { motion, AnimatePresence } from "framer-motion";

const SettingsPanel = () => {
  const [open, setOpen] = useState(false);
  const { dark, toggleDark, colorTheme, setColorTheme, lang, setLang } = useTheme();

  const accents = [
    { key: "default" as const, label: t("settings", "bw", lang) },
    { key: "slate" as const, label: t("settings", "slate", lang) },
    { key: "forest" as const, label: t("settings", "forest", lang) },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Settings"
      >
        <Settings size={20} className={open ? "animate-spin" : ""} style={{ animationDuration: "2s" }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-56 glass-card p-4 space-y-4 shadow-xl"
          >
            {/* Dark/Light Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("settings", "theme", lang)}</span>
              <button
                onClick={toggleDark}
                className="p-2 rounded-md bg-secondary hover:bg-accent transition-colors"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("settings", "language", lang)}</span>
              <button
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="p-2 rounded-md bg-secondary hover:bg-accent transition-colors flex items-center gap-1 text-xs font-mono"
              >
                <Globe size={14} />
                {lang.toUpperCase()}
              </button>
            </div>

            {/* Color Accent */}
            <div>
              <span className="text-sm font-medium block mb-2">{t("settings", "accent", lang)}</span>
              <div className="space-y-1">
                {accents.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => setColorTheme(a.key)}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors ${
                      colorTheme === a.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-accent"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPanel;
