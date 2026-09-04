import { motion } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from '../utils/animations';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdKeyboardArrowUp } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: SOCIAL_LINKS.github,
      color: 'hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      url: SOCIAL_LINKS.linkedin,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      url: SOCIAL_LINKS.facebook,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: SOCIAL_LINKS.whatsapp,
      color: 'hover:bg-green-500'
    },
    {
      name: 'Email',
      icon: <MdEmail />,
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
        <motion.div variants={fadeInUp}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <motion.div 
                className="lg:col-span-2"
                variants={fadeInUp}
              >
                <motion.div 
                  className="flex items-center gap-2 group/logo cursor-pointer mb-6"
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                    <div className="flex items-center justify-center w-full h-full bg-slate-900 rounded-[10px]">
                      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">
                        {PERSONAL_INFO.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col leading-tight text-left">
                    <h3 className="text-sm font-black text-white tracking-tight">{PERSONAL_INFO.name}</h3>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Creative</p>
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
                      aria-label={`Follow me on ${social.name}`}
                      className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 ${social.color}`}
                      variants={staggerItem}
                      custom={index}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-sm">{social.icon}</span>
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
                    <MdEmail className="text-cyan-400 text-lg" />
                    <span className="text-sm">{PERSONAL_INFO.email}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 text-slate-400"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <MdPhone className="text-cyan-400 text-lg" />
                    <span className="text-sm">{PERSONAL_INFO.phone}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 text-slate-400"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <MdLocationOn className="text-cyan-400 text-lg" />
                    <span className="text-sm">{PERSONAL_INFO.location}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
                <MdKeyboardArrowUp 
                  className="text-lg"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
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