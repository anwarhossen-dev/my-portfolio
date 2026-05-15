import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';

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

    // For Netlify Forms to work with AJAX, we send the POST via fetch
    try {
      // EmailJS এর মাধ্যমে আসল ইমেইল পাঠানো (লোকাল এবং প্রোডাকশন উভয় জায়গায় কাজ করবে)
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Anwar",
      };

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (serviceId && templateId) {
        await emailjs.send(
          serviceId,
          templateId,
          templateParams
        );
      }

      // Netlify Forms এর জন্য রিকোয়েস্ট (শুধুমাত্র লাইভ সাইটে কাজ করবে)
      if (import.meta.env.PROD) {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ "form-name": "contact", ...formData }).toString(),
        });
      }

      // Note: In development we handle it as success for simulation
      showNotification(`✅ Message sent successfully! I will get back to you soon.`, 'success');

      // Save to localStorage as backup
      const emailData = {
        to: 'anwarhossendeveloper21@gmail.com',
        from: formData.email,
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: 'sent_via_ajax'
      };

      const emailHistory = JSON.parse(localStorage.getItem('sentEmails') || '[]');
      emailHistory.push({ ...emailData, id: Date.now() });
      localStorage.setItem('sentEmails', JSON.stringify(emailHistory));

      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification('Submission encountered a problem. Please try again.', 'error');
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
      icon: 'email',
      label: 'Email Address',
      value: PERSONAL_INFO.email,
      link: `mailto:${PERSONAL_INFO.email}`,
      color: 'text-blue-500'
    },
    {
      icon: 'phone',
      label: 'Phone Number',
      value: PERSONAL_INFO.phone,
      link: `tel:${PERSONAL_INFO.phone}`,
      color: 'text-green-500'
    },
    {
      icon: 'chat',
      label: 'WhatsApp',
      value: PERSONAL_INFO.phone,
      link: SOCIAL_LINKS.whatsapp,
      color: 'text-green-600'
    }
  ];

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
                  <span className="material-icons-outlined text-xl">{info.icon}</span>
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
                  <i className={`${social.icon} text-lg`}></i>
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
              <span className="material-icons-outlined text-sm">
                {isSubmitting ? 'hourglass_empty' : 'send'}
              </span>
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