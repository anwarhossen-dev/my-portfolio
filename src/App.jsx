import { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import AIPowerSection from './components/AIPowerSection.jsx';
import DevOpsSection from './components/DevOpsSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import FAQSection from './components/FAQSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Chatbot from './components/Chatbot.jsx';
import GithubStatus from './components/GithubStatus.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { useScrollSpy } from './hooks/useScrollSpy.js';
import { getThemePreference, setThemePreference } from './utils';

function App() {
  const sectionIds = ['', 'about', 'services', 'skills', 'ai', 'devops', 'education', 'experience', 'projects', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 120);

  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = getThemePreference();
    setThemePreference(savedTheme);
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-gray-50 dark:bg-background-dark text-slate-800 dark:text-slate-200 font-sans min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-white transition-colors duration-300">
        {/* Header - Fixed at Top */}
        <Header activeSection={activeSection} />

        {/* Live Github Status - Fixed below Header */}
        <div className="fixed top-24 left-6 z-[60] hidden md:block">
          <GithubStatus username="anwarhossen-dev" />
        </div>
        
        {/* Hero Section - Full Screen */}
        <HeroSection />
        
        {/* Left Sidebar - Social Links */}
        <Sidebar activeSection={activeSection} />
        
        {/* Main Content */}
        <main className="relative z-10">
          <div id="about" className="pt-20">
            <AboutSection />
          </div>
          <div id="services" className="pt-20">
            <ServicesSection />
          </div>
          <div id="skills" className="pt-20">
            <SkillsSection />
          </div>
          <div id="ai" className="pt-20">
            <AIPowerSection />
          </div>
          <div id="devops" className="pt-20">
            <DevOpsSection />
          </div>
          <div id="education" className="pt-20">
            <EducationSection />
          </div>
          <div id="experience" className="pt-20">
            <ExperienceSection />
          </div>
          <div id="projects" className="pt-20">
            <ProjectsSection />
          </div>
          <TestimonialsSection />
          <FAQSection />
          <div id="contact" className="pt-20">
            <ContactSection />
          </div>
        </main>
        
        <Footer />
        
        {/* Scroll to Top Button */}
        <ScrollToTop />
        
        {/* Chatbot Assistant */}
        <Chatbot />

        {/* Custom Interactive Cursor */}
        <CustomCursor />
      </div>
    </ErrorBoundary>
  );
}

export default App;