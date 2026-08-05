import { useEffect, useState, Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import CosmicBackground from './components/CosmicBackground.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Chatbot from './components/Chatbot.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { useScrollSpy } from './hooks/useScrollSpy.js';
import { getThemePreference, setThemePreference } from './utils';

const HeroSection = lazy(() => import('./components/HeroSection.jsx'));
const AboutSection = lazy(() => import('./components/AboutSection.jsx'));
const ServicesSection = lazy(() => import('./components/ServicesSection.jsx'));
const SkillsSection = lazy(() => import('./components/SkillsSection.jsx'));
const DevOpsSection = lazy(() => import('./components/DevOpsSection.jsx'));
const EducationSection = lazy(() => import('./components/EducationSection.jsx'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection.jsx'));
const CertificatesSection = lazy(() => import('./components/CertificatesSection.jsx'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection.jsx'));
const FAQSection = lazy(() => import('./components/FAQSection.jsx'));
const ContactSection = lazy(() => import('./components/ContactSection.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

const LoadingFallback = () => <div className="w-full h-screen flex items-center justify-center"><p>Loading Section...</p></div>;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const sectionIds = ['', 'about', 'services', 'skills', 'devops', 'education', 'experience', 'certificates', 'projects', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 120);

  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = getThemePreference();
    setThemePreference(savedTheme);
  }, []);

  return (
    <ErrorBoundary>
      {isLoading && <SplashScreen finishLoading={() => setIsLoading(false)} />}
      <div className="text-slate-800 dark:text-slate-200 font-sans min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-white transition-colors duration-300">
        
        <CosmicBackground />

        {/* Header - Fixed at Top */}
        <Suspense fallback={<div />}>
          <Header activeSection={activeSection} />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
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
            {/* <div id="ai" className="pt-20">
              <AIPowerSection />
            </div> */}
            <div id="devops" className="pt-20">
              <DevOpsSection />
            </div>
            <div id="education" className="pt-20">
              <EducationSection />
            </div>
            <div id="experience" className="pt-20">
              <ExperienceSection />
            </div>
            <div id="certificates" className="pt-20">
              <CertificatesSection />
            </div>
            <div id="projects" className="pt-20">
              <ProjectsSection />
            </div>
            {/* <div id="testimonials" className="pt-20">
              <TestimonialsSection />
            </div> */}
            <FAQSection />
            <div id="contact" className="pt-20">
              <ContactSection />
            </div>
          </main>
        </Suspense>
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        
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