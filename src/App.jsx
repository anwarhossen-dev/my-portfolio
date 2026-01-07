import { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import { useScrollSpy } from './hooks/useScrollSpy.js';
import { getThemePreference, setThemePreference } from './utils';

function App() {
  const sectionIds = ['', 'about', 'skills', 'education', 'experience', 'projects', 'contact'];
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
        
        {/* Hero Section - Full Screen */}
        <HeroSection />
        
        {/* Left Sidebar - Social Links */}
        <Sidebar activeSection={activeSection} />
        
        {/* Main Content */}
        <main className="relative z-10">
          <div id="about" className="pt-20">
            <AboutSection />
          </div>
          <div id="skills" className="pt-20">
            <SkillsSection />
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
          <div id="contact" className="pt-20">
            <ContactSection />
          </div>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;