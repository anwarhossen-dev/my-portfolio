import { useState } from 'react';
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Email submission using mailto
  const handleEmailSubmit = () => {
    const { name, email, subject, message } = formData;
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  // WhatsApp submission
  const handleWhatsAppSubmit = () => {
    const { name, email, subject, message } = formData;
    const whatsappMessage = `*New Contact Form Message*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
    const whatsappLink = `https://wa.me/8801777498421?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink, '_blank');
  };

  // SMS submission
  const handleSMSSubmit = () => {
    const { name, subject, message } = formData;
    const smsMessage = `Contact Form - ${subject}\nFrom: ${name}\n\n${message}`;
    const smsLink = `sms:+8801777498421?body=${encodeURIComponent(smsMessage)}`;
    window.location.href = smsLink;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Auto-send via email
    setTimeout(() => {
      handleEmailSubmit();
      setIsSubmitting(false);
      resetForm();
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
      successMessage.innerHTML = `
        <span class="material-icons-outlined text-sm">check_circle</span>
        <span>Message sent successfully! Opening your email client...</span>
      `;
      document.body.appendChild(successMessage);
      
      // Remove success message after 4 seconds
      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 4000);
    }, 1000); // Small delay for better UX
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
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                {isSubmitting ? 'hourglass_empty' : 'email'}
              </span>
              {isSubmitting ? 'Sending...' : 'Send via Email'}
            </motion.button>
            
            <motion.p 
              className="text-center text-sm text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              Click to send message via your email client
            </motion.p>

            {/* Alternative Contact Methods */}
            <motion.div 
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <motion.button
                type="button"
                onClick={() => {
                  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    alert('Please fill in all fields first');
                    return;
                  }
                  handleWhatsAppSubmit();
                  resetForm();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all duration-300 border border-green-500/20"
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
                    alert('Please fill in all fields first');
                    return;
                  }
                  handleSMSSubmit();
                  resetForm();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition-all duration-300 border border-purple-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-icons-outlined text-lg">sms</span>
                <span className="text-sm font-medium">SMS</span>
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