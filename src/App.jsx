import { useEffect, useState, Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import CosmicBackground from './components/CosmicBackground.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Chatbot from './components/Chatbot.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import HeroSection from './components/HeroSection.jsx';
import LazySection from './components/LazySection.jsx';
import BookingModal from './components/BookingModal.jsx';
import { useScrollSpy } from './hooks/useScrollSpy.js';
import { getThemePreference, setThemePreference } from './utils';

import AboutSection from './components/AboutSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

const DevOpsSection = lazy(() => import('./components/DevOpsSection.jsx'));
const EducationSection = lazy(() => import('./components/EducationSection.jsx'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection.jsx'));
const CertificatesSection = lazy(() => import('./components/CertificatesSection.jsx'));
const FAQSection = lazy(() => import('./components/FAQSection.jsx'));

const LoadingFallback = () => null;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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
        
        <Suspense fallback={null}>
          <CosmicBackground />
        </Suspense>

        {/* Header - Fixed at Top */}
        <Suspense fallback={<div />}>
          <Header activeSection={activeSection} onOpenBooking={() => setIsBookingOpen(true)} />
        </Suspense>

        {/* Hero Section - Statically Loaded for Instant FCP & LCP */}
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />
        
        {/* Left Sidebar - Social Links & Meeting Booking */}
        <Sidebar activeSection={activeSection} onOpenBooking={() => setIsBookingOpen(true)} />
        
        {/* Main Content - Lazy Loaded Offscreen Sections */}
        <main className="relative z-10">
          <div id="about" className="pt-20">
            <LazySection height="400px">
              <Suspense fallback={<LoadingFallback />}>
                <AboutSection />
              </Suspense>
            </LazySection>
          </div>

          <div id="services" className="pt-20">
            <LazySection height="400px">
              <Suspense fallback={<LoadingFallback />}>
                <ServicesSection />
              </Suspense>
            </LazySection>
          </div>

          <div id="skills" className="pt-20">
            <LazySection height="500px">
              <Suspense fallback={<LoadingFallback />}>
                <SkillsSection />
              </Suspense>
            </LazySection>
          </div>

          <div id="devops" className="pt-20">
            <LazySection height="500px">
              <Suspense fallback={<LoadingFallback />}>
                <DevOpsSection />
              </Suspense>
            </LazySection>
          </div>

          <div id="education" className="pt-20">
            <LazySection height="400px">
              <Suspense fallback={<LoadingFallback />}>
                <EducationSection />
              </Suspense>
            </LazySection>
          </div>

          <div id="experience" className="pt-20">
            <LazySection height="400px">
              <Suspense fallback={<LoadingFallback />}>
                <ExperienceSection />
              </Suspense>
            </LazySection>
          </div>

          <div id="certificates" className="pt-20">
            <LazySection height="400px">
              <Suspense fallback={<LoadingFallback />}>
                <CertificatesSection />
              </Suspense>
            </LazySection>
          </div>

          <div id="projects" className="pt-20">
            <LazySection height="600px">
              <Suspense fallback={<LoadingFallback />}>
                <ProjectsSection />
              </Suspense>
            </LazySection>
          </div>

          <LazySection height="300px">
            <Suspense fallback={<LoadingFallback />}>
              <FAQSection />
            </Suspense>
          </LazySection>

          <div id="contact" className="pt-20">
            <LazySection height="500px">
              <Suspense fallback={<LoadingFallback />}>
                <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
              </Suspense>
            </LazySection>
          </div>
        </main>
        
        <LazySection height="200px">
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </LazySection>
        
        {/* Scroll to Top Button */}
        <ScrollToTop />
        
        {/* Chatbot Assistant */}
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>

        {/* Custom Interactive Cursor */}
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>

        {/* Google Calendar & Google Meet Booking Modal */}
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </div>
    </ErrorBoundary>
  );
}

export default App;