import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import { NAV_LINKS, PERSONAL_INFO } from '../constants';
import { scrollToElement } from '../utils';
import { useGSAP } from '../hooks/useAnimations';
import { gsap } from 'gsap';
import { fadeInDown, staggerContainer, staggerItem, buttonHover } from '../utils/animations';

const Header = ({ activeSection = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // GSAP scroll animation
  const headerRef = useGSAP((element) => {
    gsap.to(element, {
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isScrolled]);

  // React Spring animations
  const logoSpring = useSpring({
    transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
    config: { tension: 300, friction: 25 }
  });

  const mobileMenuSpring = useSpring({
    opacity: isMobileMenuOpen ? 1 : 0,
    transform: isMobileMenuOpen ? 'translateY(0%)' : 'translateY(-100%)',
    config: { tension: 300, friction: 30 }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = href.replace('#', '');
      scrollToElement(targetId, 100);
    }
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newDarkMode = !isDarkMode;
    
    if (newDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
    >
      <motion.nav 
        className="max-w-7xl mx-auto px-6 lg:px-8"
        variants={staggerContainer}
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <animated.div style={logoSpring}>
            <motion.a
              href="#"
              onClick={(e) => handleNavClick('#', e)}
              className="flex items-center space-x-2 group"
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                AH
              </motion.div>
              <motion.span 
                className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {PERSONAL_INFO.name.split(' ')[0]}
              </motion.span>
            </motion.a>
          </animated.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center space-x-1"
            variants={staggerContainer}
          >
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                  activeSection === link.href.replace('#', '') || (link.href === '#' && activeSection === '')
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
                }`}
                variants={staggerItem}
                custom={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="material-icons-outlined text-lg"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.icon}
                </motion.span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <motion.div 
            className="flex items-center space-x-4"
            variants={staggerItem}
          >
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span 
                className="material-icons-outlined text-xl"
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span 
                className="material-icons-outlined text-xl"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? 'close' : 'menu'}
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <animated.div 
              style={mobileMenuSpring}
              className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-xl"
            >
              <motion.div 
                className="px-6 py-4 space-y-2"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      activeSection === link.href.replace('#', '') || (link.href === '#' && activeSection === '')
                        ? 'bg-cyan-500 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    variants={staggerItem}
                    custom={index}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span 
                      className="material-icons-outlined text-xl"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.icon}
                    </motion.span>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            </animated.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
};

Header.propTypes = {
  activeSection: PropTypes.string,
};

export default Header;