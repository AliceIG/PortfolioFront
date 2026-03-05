import { Facebook, Github, Linkedin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { t, SOCIAL_LINKS } from "@/constants/content";

const Footer = () => {
  const { lang } = useTheme();

  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("hero", "name", lang)}. {t("footer", "rights", lang)}
        </p>
        <div className="flex items-center gap-4">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={18} />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin size={18} />
          </a>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
