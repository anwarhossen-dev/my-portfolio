import { motion, useScroll, useSpring } from 'framer-motion';
import { SOCIAL_LINKS } from '../constants';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Magnetic from './Magnetic';

const MagneticSocialLink = ({ href, icon, iconText, name, color }) => {
  return (
    <Magnetic strength={0.4}>
      <motion.div className="relative group flex items-center justify-end">
        <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl whitespace-nowrap z-50 uppercase tracking-tighter">
          {name}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
          relative w-11 h-11 flex items-center justify-center rounded-xl
          bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800
          text-slate-500 dark:text-slate-400 hover:text-white transition-colors duration-300
          shadow-lg shadow-black/5 z-10
          ${color}
        `}
        aria-label={name}
      >
          <span className="text-lg">{icon}</span>
        </a>
      </motion.div>
    </Magnetic>
  );
};

const Sidebar = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const socialData = [
    { name: 'GitHub', icon: <FaGithub />, href: SOCIAL_LINKS.github, color: 'hover:bg-[#333]' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, href: SOCIAL_LINKS.linkedin, color: 'hover:bg-[#0077b5]' },
    { name: 'WhatsApp', icon: <FaWhatsapp />, href: SOCIAL_LINKS.whatsapp, color: 'hover:bg-[#25D366]' },
    { name: 'Email', icon: <MdEmail />, href: SOCIAL_LINKS.email, color: 'hover:bg-primary' }
  ];

  return (
    <motion.aside 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
      className="hidden lg:flex fixed right-8 top-32 z-50 flex-col items-center gap-6"
    >
      {/* Smart Circular Scroll Indicator */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className="stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
        <div className="relative z-10 w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black text-xs shadow-lg">
          AH
        </div>
      </div>

      {/* Social Dock */}
      <div className="flex flex-col items-center gap-3 p-2.5 bg-white/30 dark:bg-slate-900/30 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-2xl">
        {socialData.map((social, index) => (
          <MagneticSocialLink key={index} {...social} />
        ))}
      </div>

      {/* Side Label */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent opacity-50" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] rotate-90 origin-center whitespace-nowrap">Connect</span>
      </div>
    </motion.aside>
  );
};

export default Sidebar;