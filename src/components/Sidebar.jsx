const Sidebar = ({ activeSection }) => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/anwarhossen',
      hoverColor: 'hover:bg-[#333]'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://linkedin.com/in/anwarhossen',
      hoverColor: 'hover:bg-[#0077b5]'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: 'https://facebook.com/anwarhossen',
      hoverColor: 'hover:bg-[#1877f2]'
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: 'https://wa.me/8801234567890',
      hoverColor: 'hover:bg-[#25D366]'
    },
    {
      name: 'Email',
      icon: 'material-icons-outlined',
      iconText: 'email',
      url: 'mailto:anwar.hossen@example.com',
      hoverColor: 'hover:bg-secondary'
    }
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between items-center w-24 bg-surface-light/80 dark:bg-surface-dark/50 border-r border-slate-200 dark:border-slate-800 backdrop-blur-sm py-8 fixed h-full z-50">
      {/* Logo */}
      <div className="relative group cursor-pointer">
        <div className="w-12 h-12 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-primary transition-all group-hover:border-primary group-hover:scale-110">
          AH
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-col gap-6 items-center">
        {socialLinks.map((social, index) => (
          <a 
            key={index}
            className={`w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-300 transform hover:scale-110 ${social.hoverColor}`}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            {social.icon === 'material-icons-outlined' ? (
              <span className="material-icons-outlined text-lg">{social.iconText}</span>
            ) : (
              <i className={`${social.icon} text-xl`}></i>
            )}
          </a>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center animate-bounce cursor-pointer hover:border-primary hover:text-primary transition-colors">
          <span className="material-icons-outlined text-sm">arrow_downward</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;