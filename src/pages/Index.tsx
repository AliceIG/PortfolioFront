import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechHighlights from "@/components/TechHighlights";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SettingsPanel from "@/components/SettingsPanel";
import DjangoAdminModal from "@/components/DjangoAdminModal";
import AboutSection from "@/components/AboutMe";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <div id="about" />
        <AboutSection/>
        <ProjectsSection />
        <TechHighlights />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
        <SettingsPanel />
        <DjangoAdminModal />
      </div>
    </ThemeProvider>
  );
};

export default Index;
