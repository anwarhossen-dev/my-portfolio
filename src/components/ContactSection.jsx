import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { MdEmail, MdPhone, MdChat, MdHourglassEmpty } from 'react-icons/md';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification('Please fill in all fields', 'error');
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      setIsSubmitting(false);
      return;
    }

    // --- CLEAN & RELIABLE DELIVERY SYSTEM ---
    try {
      let sentSuccessfully = false;
      let usedService = '';

      // Get keys from environment variables (No hardcoded placeholders)
      const web3Key = import.meta.env.VITE_WEB3FORMS_KEY;
      const emailjsService = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailjsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const emailjsPublic = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

      // Helper to check if a key is actually a real value
      const isReal = (val) => val && !val.includes('your') && !val.includes('placeholder') && val.length > 5;

      // 1. Try Web3Forms (Only if a REAL key is provided in .env)
      if (isReal(web3Key)) {
        try {
          const web3Response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              access_key: web3Key,
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message,
              from_name: "Portfolio Visitor"
            }),
          });
          const web3Data = await web3Response.json();
          if (web3Data.success) {
            sentSuccessfully = true;
            usedService = 'Web3Forms';
          }
        } catch (err) { console.warn("Web3Forms background send failed"); }
      }

      // 2. Try EmailJS (Only if REAL keys are provided in .env)
      if (!sentSuccessfully && isReal(emailjsService)) {
        try {
          await emailjs.send(emailjsService, emailjsTemplate, {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: "Anwar Hossen",
            reply_to: formData.email
          }, emailjsPublic);
          sentSuccessfully = true;
          usedService = 'EmailJS';
        } catch (err) { console.warn("EmailJS background send failed"); }
      }

      // 3. Try Formspree (Only if a REAL ID is provided in .env)
      if (!sentSuccessfully && isReal(formspreeId)) {
        try {
          const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message
            }),
          });
          if (formspreeResponse.ok) {
            sentSuccessfully = true;
            usedService = 'Formspree';
          }
        } catch (err) { console.warn("Formspree background send failed"); }
      }

      // --- Results & Final Fallback ---
      if (sentSuccessfully) {
        showNotification(`✅ Success! Your message has been sent via ${usedService}.`, 'success');
        
        // Save to history
        const emailHistory = JSON.parse(localStorage.getItem('sentEmails') || '[]');
        emailHistory.push({ ...formData, timestamp: new Date().toISOString(), service: usedService });
        localStorage.setItem('sentEmails', JSON.stringify(emailHistory));
        
        resetForm();
      } else {
        // ULTIMATE FALLBACK: Mailto (Guaranteed to work everywhere without keys or CORS)
        console.info("Automatic sending skipped (No keys configured). Using reliable fallback.");
        
        const emailContent = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
        navigator.clipboard.writeText(emailContent);
        
        const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
        const mailtoBody = encodeURIComponent(emailContent);
        window.location.href = `mailto:anwarhossendeveloper21@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        showNotification('✅ Opening your email app to send the message...', 'info');
        resetForm();
      }

    } catch (error) {
      console.error('Submission error:', error);
      showNotification('Something went wrong. Please try WhatsApp.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    // Fallback if no notification system is integrated yet
    alert(message);
  };

  const sendWhatsApp = () => {
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${PERSONAL_INFO.phone.replace(/\s+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MdEmail />,
      label: 'Email Address',
      value: PERSONAL_INFO.email,
      link: `mailto:${PERSONAL_INFO.email}`,
      color: 'text-blue-500'
    },
    {
      icon: <MdPhone />,
      label: 'Phone Number',
      value: PERSONAL_INFO.phone,
      link: `tel:${PERSONAL_INFO.phone}`,
      color: 'text-green-500'
    },
    {
      icon: <MdChat />,
      label: 'WhatsApp',
      value: PERSONAL_INFO.phone,
      link: SOCIAL_LINKS.whatsapp,
      color: 'text-green-600'
    }
  ];

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
    }
  ];

  return (
    <motion.section 
      className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" 
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <motion.div 
        className="flex flex-col items-center text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-cyan-500 font-semibold text-xs tracking-widest uppercase">Get In Touch</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">Me</span>
        </h2>
        <motion.div 
          className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl">
          I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat about technology and development.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Let's Connect</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Feel free to reach out to me through any of the following channels. I typically respond within 24 hours and would love to hear about your project ideas or collaboration opportunities.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${info.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xl">{info.icon}</span>
                </motion.div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{info.label}</p>
                  <p className="text-slate-900 dark:text-white font-semibold">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white transition-all duration-300 ${social.color}`}
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6" name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label htmlFor="name" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label htmlFor="subject" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="What's this about?"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <label htmlFor="message" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project or just say hello..."
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="text-sm">
                {isSubmitting ? <MdHourglassEmpty className="animate-spin" /> : <FaPaperPlane />}
              </div>
              {isSubmitting ? 'Sending Direct...' : 'Send Message'}
            </motion.button>
            
            <motion.p 
              className="text-center text-sm text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              Direct email sending to anwarhossendeveloper21@gmail.com
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div 
              className="flex gap-2 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <motion.button
                type="button"
                onClick={() => {
                  try {
                    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
                    console.log('📧 SENT EMAILS TO anwarhossendeveloper21@gmail.com:');
                    console.log('='.repeat(60));
                    
                    if (sentEmails.length === 0) {
                      console.log('No emails sent yet');
                      showNotification('No emails sent yet', 'info');
                    } else {
                      sentEmails.forEach((email, index) => {
                        console.log(`Email ${index + 1} (${email.status.toUpperCase()}):`);
                        console.log(`To: ${email.to}`);
                        console.log(`From: ${email.name} <${email.from}>`);
                        console.log(`Subject: ${email.subject}`);
                        console.log(`Message: ${email.message}`);
                        console.log(`Sent: ${new Date(email.timestamp).toLocaleString()}`);
                        console.log('-'.repeat(40));
                      });
                      showNotification(`✅ ${sentEmails.length} emails sent to anwarhossendeveloper21@gmail.com`, 'success');
                    }
                    console.log('='.repeat(60));
                  } catch (error) {
                    console.log('Error reading sent emails:', error);
                    showNotification('Error reading sent emails', 'error');
                  }
                }}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all duration-300 border border-green-500/20 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-icons-outlined text-sm">mark_email_read</span>
                <span className="font-medium">View Sent</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    showNotification('Please fill in all fields first', 'error');
                    return;
                  }
                  sendWhatsApp();
                  resetForm();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all duration-300 border border-green-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fab fa-whatsapp text-lg"></i>
                <span className="text-sm font-medium">WhatsApp</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    showNotification('Please fill in all fields first', 'error');
                    return;
                  }
                  
                  const emailContent = `To: anwarhossendeveloper21@gmail.com
Subject: Portfolio Contact from ${formData.name}

📧 New Portfolio Contact Message

From: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Time: ${new Date().toLocaleString()}`;

                  navigator.clipboard.writeText(emailContent);
                  console.log('📧 EMAIL COPIED FOR anwarhossendeveloper21@gmail.com:');
                  console.log(emailContent);
                  showNotification('✅ Email content copied! Paste in Gmail to send to anwarhossendeveloper21@gmail.com', 'success');
                  resetForm();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-icons-outlined text-lg">content_copy</span>
                <span className="text-sm font-medium">Copy for Gmail</span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 right-10 text-cyan-400/20 text-5xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        💬
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 text-blue-400/20 text-4xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, 25, 0],
          x: [0, 15, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        📧
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;