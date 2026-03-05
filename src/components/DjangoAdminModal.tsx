import { useState, useEffect } from "react";
import { X, Shield } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import { api } from "@/services/api";
import type { Lang } from "@/constants/content";
import { motion, AnimatePresence } from "framer-motion";

interface AdminStats {
  totalVisitors: number;
  projectsCompleted: number;
  commitsThisYear: number;
  coffeeCups: number;
  models: { name: string; entries: number; lastModified: string }[];
}

const DjangoAdminModal = () => {
  const { lang } = useTheme();
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    if (open) {
      api.getAdminStats().then(setStats);
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-mono shadow-lg hover:opacity-90 transition-opacity"
      >
        <Shield size={16} />
        {t("settings", "adminView", lang)}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[80vh] overflow-auto rounded-lg border border-border shadow-2xl"
            >
              {/* Django Admin Header */}
              <div className="bg-[hsl(152,40%,18%)] text-white px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">Django administration</span>
                </div>
                <button onClick={() => setOpen(false)} className="hover:opacity-70">
                  <X size={18} />
                </button>
              </div>

              {/* Breadcrumb */}
              <div className="bg-secondary px-6 py-2 text-xs font-mono text-muted-foreground border-b border-border">
                Home › Portfolio › Dashboard
              </div>

              {/* Content */}
              <div className="bg-card p-6">
                {!stats ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
                ) : (
                  <>
                    {/* Stats Grid */}
                    <h3 className="text-sm font-bold uppercase text-muted-foreground mb-4 tracking-wider">
                      Portfolio Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {[
                        { label: "Visitors", value: stats.totalVisitors.toLocaleString() },
                        { label: "Projects", value: stats.projectsCompleted },
                        { label: "Commits", value: stats.commitsThisYear.toLocaleString() },
                        { label: "☕ Cups", value: stats.coffeeCups.toLocaleString() },
                      ].map((s) => (
                        <div key={s.label} className="bg-secondary rounded p-4 text-center">
                          <div className="text-2xl font-bold font-mono">{s.value}</div>
                          <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Models Table */}
                    <h3 className="text-sm font-bold uppercase text-muted-foreground mb-4 tracking-wider">
                      Registered Models
                    </h3>
                    <div className="border border-border rounded overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-secondary">
                            <th className="text-left px-4 py-2 font-medium">Model</th>
                            <th className="text-left px-4 py-2 font-medium">Entries</th>
                            <th className="text-left px-4 py-2 font-medium">Last Modified</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.models.map((m) => (
                            <tr key={m.name} className="border-t border-border hover:bg-secondary/50">
                              <td className="px-4 py-2 font-mono text-sm">{m.name}</td>
                              <td className="px-4 py-2">{m.entries}</td>
                              <td className="px-4 py-2 text-muted-foreground">{m.lastModified}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DjangoAdminModal;
