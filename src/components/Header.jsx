import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import PropTypes from 'prop-types';
import { NAV_LINKS, PERSONAL_INFO } from '../constants';
import { scrollToElement } from '../utils';
import { useTheme } from '../hooks/useTheme'; 
import Magnetic from './Magnetic';

const Header = ({ activeSection = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { scrollY } = useScroll();

  const isNavigating = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    isNavigating.current = true;
    const targetId = href === '#' ? null : href.replace('#', '');
    if (!targetId) window.scrollTo({ top: 0, behavior: 'smooth' });
    else scrollToElement(targetId, 100);
    setTimeout(() => { isNavigating.current = false; }, 1000);
  };

  const activeId = activeSection || '';

  return (
    <>
      {/* Fixed Solid Header Wrapper */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4 md:px-8 pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="pointer-events-auto relative w-full max-w-7xl group"
        >
          {/* Smart Animated Gradient Border */}
          <div className={`absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-cyan-500/30 via-primary/50 to-blue-500/30 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 pointer-events-none ${isScrolled ? 'opacity-40' : ''}`} />
          
          <div className={`
            relative flex items-center justify-between
            w-full px-4 py-2.5 md:px-6
            rounded-[2rem] transition-all duration-300
            ${isScrolled
              ? 'bg-[#0a192f]/95 backdrop-blur-xl border border-primary/20 shadow-2xl'
              : 'bg-[#0a192f]/90 backdrop-blur-md border border-white/10 shadow-lg'
            }
          `}>
            {/* Logo Section */}
            <div className="flex items-center">
              <motion.a
                href="#"
                onClick={(e) => handleNavClick('#', e)}
                className="flex items-center gap-2 group/logo"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative flex items-center justify-center w-9 h-9 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-sm">
                  <div className="flex items-center justify-center w-full h-full bg-slate-950 rounded-[9px]">
                    <span className="text-base font-black bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-blue-500">
                      {PERSONAL_INFO.name.split(' ')[0].charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col leading-tight text-left">
                  <span className="text-xs sm:text-sm font-black text-white tracking-tight truncate max-w-[140px] sm:max-w-none">{PERSONAL_INFO.name}</span>
                  <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.2em]">Creative</span>
                </div>
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center bg-slate-800/40 rounded-2xl p-1 border border-slate-700/40">
              {NAV_LINKS.map((link) => {
                const section = link.href.replace('#', '');
                const isActive = (section === activeId) || (link.href === '#' && activeId === '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`relative px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-200 ${
                      isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-slate-900 rounded-xl shadow-md border border-cyan-500/30"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-gray-300 border border-white/20 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isDark ? 'dark' : 'light'}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    className="material-icons-outlined text-lg"
                  >
                    {isDark ? 'light_mode' : 'dark_mode'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* <Magnetic strength={0.3}>
                <div className="relative group/btn hidden md:flex">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover/btn:opacity-60 transition duration-1000 group-hover/btn:duration-200"></div>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick('#contact', e)}
                    className="relative flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl"
                  >
                    <span>Connect</span>
                    <motion.span className="material-icons-outlined text-sm text-primary" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      bolt
                    </motion.span>
                  </a>
                </div>
              </Magnetic> */}

              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="flex xl:hidden items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-gray-300 border border-white/20 shadow-sm"
              >
                <span className="material-icons-outlined text-xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-full left-0 right-0 mt-4 p-4 bg-[#0a192f] rounded-[2rem] border border-primary/20 shadow-2xl xl:hidden"
                >
                  <div className="flex flex-col gap-2">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(link.href, e)}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all font-black uppercase text-xs tracking-widest text-gray-300"
                      >
                        <span className="material-icons-outlined text-primary">{link.icon}</span>
                        {link.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </header>
    </>
  );
};

Header.propTypes = {
  activeSection: PropTypes.string,
};

export default Header;