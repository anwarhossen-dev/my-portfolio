import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { useScrollReveal } from '../hooks/useAnimations';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scaleIn
} from '../utils/animations';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  // GSAP scroll reveal
  const footerRef = useScrollReveal({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    scrollTrigger: {
      onEnter: () => setIsVisible(true),
      start: "top 90%"
    }
  });

  // React Spring animations
  const footerSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
    config: { tension: 280, friction: 60 },
  });

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      url: SOCIAL_LINKS.github,
      color: 'hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: SOCIAL_LINKS.linkedin,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: SOCIAL_LINKS.facebook,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: SOCIAL_LINKS.whatsapp,
      color: 'hover:bg-green-500'
    },
    {
      name: 'Email',
      icon: 'material-icons-outlined',
      iconText: 'email',
      url: SOCIAL_LINKS.email,
      color: 'hover:bg-red-500'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <animated.div style={footerSpring}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <motion.div 
                className="lg:col-span-2"
                variants={fadeInUp}
              >
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    AH
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">{PERSONAL_INFO.name}</h3>
                    <p className="text-slate-400 text-sm">{PERSONAL_INFO.title}</p>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-slate-400 leading-relaxed mb-6 max-w-md"
                  variants={staggerItem}
                >
                  Passionate MERN Stack Developer creating innovative web solutions. 
                  Let's build something amazing together!
                </motion.p>
                
                {/* Social Links */}
                <motion.div 
                  className="flex gap-4"
                  variants={staggerContainer}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 ${social.color}`}
                      variants={staggerItem}
                      custom={index}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon === 'material-icons-outlined' ? (
                        <span className="material-icons-outlined text-sm">{social.iconText}</span>
                      ) : (
                        <i className={`${social.icon} text-sm`}></i>
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <motion.ul 
                  className="space-y-3"
                  variants={staggerContainer}
                >
                  {quickLinks.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      variants={staggerItem}
                      custom={index}
                    >
                      <motion.a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.5 }}
                        />
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                >
                  <motion.div 
                    className="flex items-center gap-3 text-slate-400"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="material-icons-outlined text-cyan-400"
                      whileHover={{ scale: 1.2 }}
                    >
                      email
                    </motion.span>
                    <span className="text-sm">{PERSONAL_INFO.email}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 text-slate-400"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="material-icons-outlined text-cyan-400"
                      whileHover={{ scale: 1.2 }}
                    >
                      phone
                    </motion.span>
                    <span className="text-sm">{PERSONAL_INFO.phone}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 text-slate-400"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="material-icons-outlined text-cyan-400"
                      whileHover={{ scale: 1.2 }}
                    >
                      location_on
                    </motion.span>
                    <span className="text-sm">{PERSONAL_INFO.location}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </animated.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-slate-800 py-6"
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.p 
                className="text-slate-400 text-sm text-center md:text-left"
                variants={staggerItem}
              >
                © {currentYear} {PERSONAL_INFO.name}. All rights reserved. Made with ❤️ using React & Tailwind CSS
              </motion.p>
              
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-300 text-sm"
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="material-icons-outlined text-sm"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  keyboard_arrow_up
                </motion.span>
                Back to Top
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-10 right-10 text-cyan-400/10 text-6xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        &lt;/&gt;
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 text-blue-400/10 text-4xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        { }
      </motion.div>
    </motion.footer>
  );
};

export default Footer;