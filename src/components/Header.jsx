import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import PropTypes from 'prop-types';
import { NAV_LINKS, PERSONAL_INFO } from '../constants';
import { scrollToElement } from '../utils';
import { useTheme } from '../hooks/useTheme';
import { gsap } from 'gsap';

const Header = ({ activeSection = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { scrollYProgress, scrollY } = useScroll();
  
  const isNavigating = useRef(false);
  const connectBtnRef = useRef(null);

  useEffect(() => {
    const btn = connectBtnRef.current;
    if (!btn) return;
    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
    };
    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-blue-500 to-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Smart Header Wrapper with Dynamic Padding (Margin Haba) */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${isScrolled ? 'pt-6 px-6' : 'pt-2 px-4 md:px-10'}`}>
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0,
            opacity: 1,
            scale: isScrolled ? 0.98 : 1
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className={`pointer-events-auto relative w-full group transition-all duration-500 ${isScrolled ? 'max-w-5xl' : 'max-w-7xl'}`}
        >
          {/* Smart Animated Gradient Border */}
          <div className={`absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 pointer-events-none ${isScrolled ? 'opacity-30' : ''}`} />
          
          <div className={`
            relative flex items-center justify-between
            w-full px-5 py-3 md:px-8
            rounded-[2rem] border transition-all duration-500
            ${isScrolled 
              ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-primary/20 dark:border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)]' 
              : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-white/20 dark:border-slate-800/50 shadow-lg'
            }
          `}>
            {/* Logo Section */}
            <div className="flex-1 flex justify-start">
              <motion.a
                href="#"
                onClick={(e) => handleNavClick('#', e)}
                className="flex items-center gap-2 group/logo"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                  <div className="flex items-center justify-center w-full h-full bg-white dark:bg-slate-950 rounded-[10px]">
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">
                      {PERSONAL_INFO.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col leading-tight text-left">
                  <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{PERSONAL_INFO.name}</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Creative</span>
                </div>
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl p-1 border border-slate-200/50 dark:border-slate-700/50">
              {NAV_LINKS.map((link) => {
                const section = link.href.replace('#', '');
                const isActive = (section === activeId) || (link.href === '#' && activeId === '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`relative px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md"
                        transition={{ type: 'spring', duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Actions Section */}
            <div className="flex-1 flex justify-end items-center gap-3">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isDark ? 'dark' : 'light'}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    className="material-icons-outlined text-xl"
                  >
                    {isDark ? 'light_mode' : 'dark_mode'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <div className="relative group/btn">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover/btn:opacity-60 transition duration-1000 group-hover/btn:duration-200"></div>
                <motion.a
                  ref={connectBtnRef}
                  href="#contact"
                  onClick={(e) => handleNavClick('#contact', e)}
                  className="relative hidden md:flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl"
                >
                  <span>Connect</span>
                  <motion.span 
                    className="material-icons-outlined text-sm text-primary"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    bolt
                  </motion.span>
                </motion.a>
              </div>

              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex xl:hidden items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm"
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
                  className="absolute top-full left-0 right-0 mt-4 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] border border-primary/20 dark:border-primary/20 shadow-2xl xl:hidden"
                >
                  <div className="flex flex-col gap-2">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(link.href, e)}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-black uppercase text-xs tracking-widest text-slate-600 dark:text-slate-400"
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