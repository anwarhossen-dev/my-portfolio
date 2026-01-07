// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '#', icon: 'home' },
  { name: 'About', href: '#about', icon: 'person' },
  { name: 'Skills', href: '#skills', icon: 'bolt' },
  { name: 'Education', href: '#education', icon: 'school' },
  { name: 'Experience', href: '#experience', icon: 'work_outline' },
  { name: 'Projects', href: '#projects', icon: 'folder_open' },
  { name: 'Contact', href: '#contact', icon: 'mail_outline' }
];

// Personal Information
export const PERSONAL_INFO = {
  name: 'MD. Anwar Hossen',
  title: 'MERN Stack Developer',
  subtitle: 'WordPress Developer',
  experience: '2+ Years',
  email: 'anwarhossendeveloper21@gmail.com',
  phone: '+8801777498421',
  location: 'Bangladesh',
  profileImage: 'https://i.ibb.co.com/mV56xyVm/profile.jpg'
};

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/anwarhossen-dev',
  linkedin: 'https://linkedin.com/in/anowar21',
  facebook: 'https://www.facebook.com/MD.Anowarhossenkabir/',
  whatsapp: 'https://wa.me/8801777498421',
  email: 'mailto:anwarhossendeveloper21@gmail.com'
};

// Skills Data
export const SKILLS = {
  frontend: [
    { name: 'React.js', level: 90, icon: 'fab fa-react' },
    { name: 'JavaScript', level: 85, icon: 'fab fa-js-square' },
    { name: 'HTML5', level: 95, icon: 'fab fa-html5' },
    { name: 'CSS3', level: 90, icon: 'fab fa-css3-alt' },
    { name: 'Tailwind CSS', level: 85, icon: 'fas fa-palette' }
  ],
  backend: [
    { name: 'Node.js', level: 80, icon: 'fab fa-node-js' },
    { name: 'Express.js', level: 75, icon: 'fas fa-server' },
    { name: 'MongoDB', level: 70, icon: 'fas fa-database' },
    { name: 'MySQL', level: 65, icon: 'fas fa-database' }
  ],
  tools: [
    { name: 'Git', level: 85, icon: 'fab fa-git-alt' },
    { name: 'VS Code', level: 90, icon: 'fas fa-code' },
    { name: 'WordPress', level: 80, icon: 'fab fa-wordpress' },
    { name: 'Figma', level: 70, icon: 'fab fa-figma' }
  ]
};

// Projects Data
export const PROJECTS = [
  {
    id: 1,
    title: 'Local Chef Bazaar',
    shortDescription: 'Local Chef Bazaar is a comprehensive full-stack e-commerce platform built with the MERN stack, designed to connect food enthusiasts with local chefs and authentic culinary experiences. This sophisticated web application features modern, responsive design with advanced functionality including user authentication, secure payment processing, real-time order tracking, and intuitive admin dashboard for seamless food ordering experience.',
    description: 'Local Chef Bazaar is a comprehensive full-stack e-commerce platform built with the MERN stack, designed to connect food enthusiasts with local chefs and authentic culinary experiences. This sophisticated web application features a modern, responsive design with advanced functionality including user authentication, secure payment processing, real-time order tracking, and an intuitive admin dashboard. The platform showcases dynamic product catalogs, shopping cart management, user reviews and ratings, and seamless checkout processes. Built with React.js for the frontend, Node.js and Express.js for the backend API, and MongoDB for robust data management, this project demonstrates proficiency in full-stack development, database design, API integration, and modern web development best practices.',
    image: 'https://i.ibb.co.com/h1VpLnWn/Biryani-2.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://localchefbazaar-612c0.web.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/project1',
    featured: true
  },
  {
    id: 2,
    title: 'HERO.IO Management App',
    shortDescription: 'HERO.IO is an advanced collaborative task management application that revolutionizes team productivity through real-time updates and seamless communication. This sophisticated platform features comprehensive project management tools including task assignment, progress tracking, deadline management, team collaboration spaces, and interactive dashboards with data visualization for enhanced team productivity and project success.',
    description: 'HERO.IO is an advanced collaborative task management application that revolutionizes team productivity through real-time updates and seamless communication. This sophisticated platform features comprehensive project management tools including task assignment, progress tracking, deadline management, team collaboration spaces, and interactive dashboards with data visualization. Built with React.js for a dynamic user interface, Socket.io for real-time communication, Node.js for robust backend services, and PostgreSQL for reliable data storage. The application includes advanced features such as file sharing, comment systems, notification management, user role permissions, and detailed analytics. This project showcases expertise in real-time web applications, database optimization, user experience design, and scalable architecture development.',
    image: 'https://i.ibb.co.com/6c3DC3HJ/heroio.png',
    technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://taupe-moxie-6c1b13.netlify.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/B-12-A08-Hero-Apps',
    featured: true
  },
  {
    id: 3,
    title: 'ARTIFY Website',
    shortDescription: 'ARTIFY is a stunning, fully responsive portfolio website that showcases creative work through elegant and modern design aesthetic. Built with React.js and styled using Tailwind CSS, this project demonstrates advanced frontend development skills with focus on user experience and visual appeal. Features smooth animations, interactive galleries, responsive grid layouts, and optimized performance.',
    description: 'ARTIFY is a stunning, fully responsive portfolio website that showcases creative work through an elegant and modern design aesthetic. Built with React.js and styled using Tailwind CSS, this project demonstrates advanced frontend development skills with a focus on user experience and visual appeal. The website features smooth animations, interactive galleries, responsive grid layouts, optimized image loading, and seamless navigation across all devices. Powered by Vite for lightning-fast development and build processes, the site includes dynamic content management, contact forms, social media integration, and SEO optimization. This project highlights proficiency in modern CSS frameworks, component-based architecture, performance optimization, mobile-first design principles, and contemporary web development workflows that deliver exceptional user experiences.',
    image: 'https://i.ibb.co.com/Z18112hy/71-P4fmg-Nmj-L.jpg',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://stirring-frangipane-d150ce.netlify.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/ARTIFY-client',
    featured: false
  },
  {
    id: 4,
    title: 'Emergency-Hotline',
    shortDescription: 'Emergency-Hotline is a comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking. This life-saving application features one-click emergency calling, automatic GPS location sharing, offline functionality for critical situations, and accessibility-compliant design following WCAG 2.1 AA standards for universal access.',
    description: 'Emergency-Hotline is a comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support. This life-saving application features one-click emergency calling, automatic GPS location sharing, offline functionality for critical situations, and accessibility-compliant design following WCAG 2.1 AA standards. Built with React.js, JavaScript, CSS3, and HTML5, the platform integrates Geolocation API for precise location services and Local Storage for user preferences. The application includes emergency contact management, hospital locators, medical information storage, and cultural sensitivity features. This project demonstrates expertise in crisis-oriented UX design, accessibility implementation, progressive web app development, and creating applications that serve critical real-world needs while maintaining exceptional performance and user experience standards.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Geolocation API', 'Local Storage'],
    liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
    githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline?tab=readme-ov-file',
    featured: false
  },
  {
    id: 5,
    title: 'Green-Earth',
    shortDescription: 'Green-Earth is an innovative environmental awareness and sustainability platform dedicated to promoting eco-friendly practices and environmental conservation. This comprehensive web application features interactive environmental data visualization, carbon footprint calculators, sustainable living guides, and community engagement tools for environmental activism. Built with modern web technologies to inspire positive environmental change.',
    description: 'Green-Earth is an innovative environmental awareness and sustainability platform dedicated to promoting eco-friendly practices and environmental conservation. This comprehensive web application features interactive environmental data visualization, carbon footprint calculators, sustainable living guides, and community engagement tools for environmental activism. Built with React.js for dynamic user interactions, JavaScript for complex calculations, CSS3 for beautiful green-themed styling, and HTML5 for semantic structure. The platform includes features such as environmental news aggregation, eco-friendly product recommendations, recycling guides, energy-saving tips, and community forums for environmental discussions. This project showcases expertise in data visualization, environmental API integration, responsive design principles, and creating meaningful applications that contribute to environmental awareness and positive social impact through technology.',
    image: 'https://i.ibb.co.com/rGXZMmbW/Green.png',
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Environmental APIs', 'Data Visualization'],
    liveUrl: 'https://anwarhossen-dev.github.io/B12A06-Green-Earth',
    githubUrl: 'https://github.com/anwarhossen-dev/B12A06-Green-Earth',
    featured: false
  },
  {
    id: 6,
    title: 'Flowers-website',
    shortDescription: 'Flowers-website is a beautifully crafted, fully responsive e-commerce platform specializing in floral arrangements and botanical products. This elegant web application features stunning visual galleries, detailed product catalogs, seasonal flower collections, and intuitive shopping experience designed specifically for the floral industry with advanced customization tools and delivery scheduling.',
    description: 'Flowers-website is a beautifully crafted, fully responsive e-commerce platform specializing in floral arrangements and botanical products. This elegant web application features stunning visual galleries, detailed product catalogs, seasonal flower collections, and an intuitive shopping experience designed specifically for the floral industry. Built with React.js for dynamic component rendering, JavaScript for interactive features, CSS3 for beautiful floral-themed animations and styling, and HTML5 for semantic markup. The website includes advanced features such as flower care guides, arrangement customization tools, delivery scheduling, seasonal promotions, and customer testimonials. This project demonstrates expertise in e-commerce development, visual design principles, responsive web design, user experience optimization, and creating industry-specific solutions that combine aesthetic appeal with functional excellence in the digital marketplace.',
    image: 'https://i.ibb.co.com/BHQX5D5Z/flower.png',
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'E-commerce APIs', 'Payment Integration'],
    liveUrl: 'https://anwarhossen-dev.github.io/B12A02-Responsive-Flowers-website',
    githubUrl: 'https://github.com/anwarhossen-dev/B12A02-Responsive-Flowers-website',
    featured: false
  },
  {
    id: 7,
    title: 'influencer-website',
    shortDescription: 'Influencer-website is a sophisticated digital marketing and personal branding platform designed for content creators, social media influencers, and digital entrepreneurs. This comprehensive web application features dynamic portfolio showcases, social media integration, audience analytics, content management systems, and brand collaboration tools for building successful online presence.',
    description: 'Influencer-website is a sophisticated digital marketing and personal branding platform designed for content creators, social media influencers, and digital entrepreneurs. This comprehensive web application features dynamic portfolio showcases, social media integration, audience analytics, content management systems, and brand collaboration tools. Built with React.js for interactive user interfaces, JavaScript for complex functionality, CSS3 for modern styling and animations, and HTML5 for structured content presentation. The platform includes features such as media galleries, engagement tracking, sponsorship management, content scheduling tools, and audience demographics analysis. This project showcases expertise in social media API integration, data analytics implementation, responsive design for multiple devices, and creating platforms that empower digital creators to build and manage their online presence effectively while connecting with their audience and potential brand partners.',
    image: 'https://i.ibb.co.com/gM4vCnd2/photo.png',
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Social Media APIs', 'Analytics Integration'],
    liveUrl: 'https://anwarhossen-dev.github.io/influencer-website',
    githubUrl: 'https://github.com/anwarhossen-dev/influencer-website',
    featured: false
  },
  // {
  //   id: 8,
  //   title: 'Emergency-Hotline',
  //   description: 'A comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support.',
  //   image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
  //   technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Geolocation API', 'Local Storage'],
  //   liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
  //   githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline?tab=readme-ov-file',
  //   featured: false
  // },
  // {
  //   id: 9,
  //   title: 'Emergency-Hotline',
  //   description: 'A comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support.',
  //   image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
  //   technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Geolocation API', 'Local Storage'],
  //   liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
  //   githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline?tab=readme-ov-file',
  //   featured: false
  // },
  // {
  //   id: 10,
  //   title: 'Emergency-Hotline',
  //   description: 'A comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support.',
  //   image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
  //   technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Geolocation API', 'Local Storage'],
  //   liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
  //   githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline?tab=readme-ov-file',
  //   featured: false
  // },
  // {
  //   id: 11,
  //   title: 'Emergency-Hotline',
  //   description: 'A comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support.',
  //   image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
  //   technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Geolocation API', 'Local Storage'],
  //   liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
  //   githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline?tab=readme-ov-file',
  //   featured: false
  // },
  // {
  //   id: 12,
  //   title: 'Emergency-Hotline',
  //   description: 'A comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support.',
  //   image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
  //   technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Geolocation API', 'Local Storage'],
  //   liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
  //   githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline?tab=readme-ov-file',
  //   featured: false
  // }
];

// Education Data
export const EDUCATION = [
  {
    degree: "Professional Web Development Course",
    institution: "Programming Hero",
    year: "2025 - 2025",
    period: "July 2025 - December 2025",
    grade: "In Progress",
    description: "Comprehensive full-stack web development program focusing on modern JavaScript frameworks, MERN stack development, and industry best practices. Learning advanced React.js, Node.js, MongoDB, and professional development workflows.",
    icon: "computer"
  },
  {
    degree: "Diploma in Engineering of Computer Science & Technology",
    institution: "A K Khan UCEP Polytechnic Institute (AKKUPI)",
    year: "2020 - 2024",
    grade: "CGPA: 3.41/4.00",
    description: "Focused on software engineering, data structures, algorithms, and web development. Completed capstone project on full-stack web application development.",
    icon: "school"
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Govt. Hazi Muhammad Mohsin College, Chattogram",
    Board:"BOU",
    year: "2019 - 2021",
    grade: "GPA: 3.82/5.00",
    description: "Commerce background with focus on Accounting, and Finance & Banking. Achieved excellent results in all subjects.",
    icon: "menu_book"
  }
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Sanowara Islam Boys' High School, Chattogram",
    Board:"BOU",
    year: "2017 - 2018",
    grade: "GPA: 2.65/5.00",
    description: "Commerce background with focus on Accounting, and Finance & Banking. Achieved excellent results in all subjects.",
    icon: "menu_book"
  }
];

// Experience Data
export const EXPERIENCE = [
  {
    title: "Jr. Programmer",
    company: "Genuine Technology & Research Ltd.",
    period: "Jan 2024 - Present",
    type: "Full-time",
    location: "On-site",
    description: "Developing and maintaining database systems using SQL and modern database technologies. Collaborating with cross-functional teams to deliver high-quality data solutions and optimize database performance.",
    responsibilities: [
      "Designed and optimized 20+ database schemas for improved performance",
      "Improved query performance by 50% through advanced SQL optimization techniques",
      "Collaborated with development teams to implement efficient data access patterns",
      "Mentored junior developers in SQL best practices and database design"
    ],
    technologies: ["SQL Server", "MySQL", "PostgreSQL", "T-SQL", "Database Design", "Performance Tuning"],
    icon: "work_outline"
  },
  {
    title: "Web Developer Intern",
    company: "Genuine Technology & Research Ltd.",
    period: "Sep 2024 - Dec 2024",
    type: "Internship",
    location: "On-site",
    description: "Gained hands-on experience in full-stack web development, working on client projects and learning industry best practices in both frontend and backend technologies.",
    responsibilities: [
      "Developed 5+ client websites using HTML, CSS, and JavaScript",
      "Assisted in ASP.NET application development and maintenance",
      "Participated in code reviews and team meetings",
      "Learned version control with Git and project management tools"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "ASP.NET", "PHP", "Git"],
    icon: "code"
  }
];