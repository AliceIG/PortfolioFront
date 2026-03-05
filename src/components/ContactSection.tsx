import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/constants/content";
import { api } from "@/services/api";
import AnimatedSection from "./AnimatedSection";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Required").max(2000),
});

const ContactSection = () => {
  const { lang } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    await api.sendContact(result.data as { name: string; email: string; message: string });
    setLoading(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = "w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground";

  return (
    <AnimatedSection className="section-padding">
      <div id="contact" className="max-w-2xl mx-auto scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("contact", "title", lang)}</h2>
        <p className="text-muted-foreground mb-10">{t("contact", "subtitle", lang)}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder={t("contact", "name", lang)}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder={t("contact", "email", lang)}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              rows={5}
              placeholder={t("contact", "message", lang)}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass + " resize-none"}
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {sent ? (
              <>
                <CheckCircle size={18} />
                {t("contact", "success", lang)}
              </>
            ) : (
              <>
                <Send size={16} />
                {t("contact", "send", lang)}
              </>
            )}
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;
