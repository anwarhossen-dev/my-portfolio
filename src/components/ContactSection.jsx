import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can integrate with email service like EmailJS or backend API
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: 'email',
      label: 'Email Address',
      value: 'anwarhossendeveloper21@gmail.com',
      link: 'mailto:anwarhossendeveloper21@gmail.com',
      color: 'text-blue-500'
    },
    {
      icon: 'phone',
      label: 'Phone Number',
      value: '+880 1777498421',
      link: 'tel:+8801777498421',
      color: 'text-green-500'
    },
    {
      icon: 'chat',
      label: 'WhatsApp',
      value: '+880 1777498421',
      link: 'https://wa.me/8801777498421',
      color: 'text-green-600'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/anwarhossen-dev',
      color: 'hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://linkedin.com/in/anowar21',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: 'https://facebook.com/MD.Anowarhossenkabir',
      color: 'hover:bg-blue-700'
    }
  ];

  return (
    <section className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" id="contact">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <span className="text-cyan-500 font-semibold text-xs tracking-widest uppercase">Get In Touch</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">Me</span>
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4"></div>
        <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl">
          I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat about technology and development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Let's Connect</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Feel free to reach out to me through any of the following channels. I typically respond within 24 hours and would love to hear about your project ideas or collaboration opportunities.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform`}>
                  <span className="material-icons-outlined text-xl">{info.icon}</span>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{info.label}</p>
                  <p className="text-slate-900 dark:text-white font-semibold">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
              </div>
              <div>
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
                  placeholder="anwarhossendeveloper21@gmail.com"
                />
              </div>
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <span className="material-icons-outlined text-sm">send</span>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;