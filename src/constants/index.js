// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '#', icon: 'home' },
  { name: 'About', href: '#about', icon: 'person' },
  { name: 'Services', href: '#services', icon: 'category' },
  { name: 'Skills', href: '#skills', icon: 'bolt' },
  { name: 'Education', href: '#education', icon: 'school' },
  { name: 'Experience', href: '#experience', icon: 'work_outline' },
  { name: 'Certificates', href: '#certificates', icon: 'verified_user' },
  { name: 'Projects', href: '#projects', icon: 'folder_open' },
  // { name: 'Testimonials', href: '#testimonials', icon: 'chat_bubble_outline' },
  { name: 'Contact', href: '#contact', icon: 'mail_outline' }
];

// Personal Information
export const PERSONAL_INFO = {
  name: 'MD. Anwar Hossen',
  title: 'Full Stack Developer',
  subtitle: 'ASP.NET & MERN Stack Developer',
  experience: '2+ Years',
  email: 'anwarhossendeveloper21@gmail.com',
  phone: '+8801777498421',
  location: 'Bangladesh',
  profileImage: 'https://i.ibb.co.com/mV56xyVm/profile.jpg' // Using the requested online URL
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
    { name: 'Bootstrap 5', level: 88, icon: 'fab fa-bootstrap' },
    { name: 'Tailwind CSS', level: 85, icon: 'fas fa-palette' }
  ],
  backend: [
    { name: 'ASP.NET Core', level: 85, icon: 'fas fa-code' },
    { name: 'C#', level: 80, icon: 'fas fa-hashtag' },
    { name: 'Node.js', level: 80, icon: 'fab fa-node-js' },
    { name: 'Express.js', level: 75, icon: 'fas fa-server' }
  ],
  database: [
    { name: 'MS SQL Server', level: 85, icon: 'fas fa-database' },
    { name: 'MongoDB', level: 70, icon: 'fas fa-leaf' },
    { name: 'Postgresql', level: 65, icon: 'fas fa-database' },
    { name: 'Entity Framework', level: 80, icon: 'fas fa-layer-group' }
  ],
  tools: [
    { name: 'Visual Studio', level: 90, icon: 'fas fa-code' },
    { name: 'VS Code', level: 95, icon: 'fas fa-code' },
    { name: 'Git', level: 85, icon: 'fab fa-git-alt' },
    { name: 'GitHub Actions', level: 85, icon: 'fab fa-github' },
    // { name: 'Azure DevOps', level: 80, icon: 'fab fa-microsoft' },
    { name: 'Docker', level: 75, icon: 'fab fa-docker' }
  ],
  ai: [
    { name: 'Gemini CLI', level: 98, icon: 'fas fa-terminal' },
    { name: 'Claude 3.5 Sonnet', level: 96, icon: 'fas fa-brain' },
    { name: 'ChatGPT / GPT-4', level: 95, icon: 'fas fa-robot' },
    { name: 'GitHub Copilot', level: 90, icon: 'fas fa-brain' },
    { name: 'Anthropic API', level: 88, icon: 'fas fa-microchip' },
    { name: 'OpenAI API', level: 85, icon: 'fas fa-microchip' },
    { name: 'LangChain', level: 75, icon: 'fas fa-link' }
  ]
};

// Projects Data
export const PROJECTS = [
  {
    id: 1,
    title: 'Local Chef Bazaar',
    category: 'MERN Stack',
    shortDescription: 'Local Chef Bazaar is a comprehensive full-stack e-commerce platform built with the MERN stack, designed to connect food enthusiasts with local chefs and authentic culinary experiences.',
    description: 'Local Chef Bazaar is a comprehensive full-stack e-commerce platform built with the MERN stack, designed to connect food enthusiasts with local chefs and authentic culinary experiences. This sophisticated web application features a modern, responsive design with advanced functionality including user authentication, secure payment processing, real-time order tracking, and an intuitive admin dashboard.',
    image: 'https://i.ibb.co.com/h1VpLnWn/Biryani-2.jpg', // Using a valid online placeholder
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-salad-in-the-kitchen-4623-large.mp4',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://local-chef-bazaar-pied.vercel.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/LocalChefBazaar',
    featured: true
  },
  {
    id: 2,
    title: 'ARTIFY Website',
    category: 'Frontend',
    shortDescription: 'ARTIFY is a stunning, fully responsive portfolio website that showcases creative work through elegant and modern design aesthetic.',
    description: 'ARTIFY is a stunning, fully responsive portfolio website that showcases creative work through an elegant and modern design aesthetic. Built with React.js and styled using Tailwind CSS, this project demonstrates advanced frontend development skills with a focus on user experience and visual appeal.',
    image: 'https://i.ibb.co.com/Z18112hy/71-P4fmg-Nmj-L.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-graphic-designer-working-on-a-digital-tablet-4621-large.mp4',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://tubular-sundae-69af35.netlify.app',
    githubUrl: 'https://github.com/anwarhossen-dev/ARTIFY-client',
    featured: false
  },
  {
    id: 3,
    title: 'CareerTrack',
    category: 'next.js',
    shortDescription: 'A structured system for organizing and managing student admission-related information efficiently.',
    description: 'This project focuses on organizing and managing admission-related information in a structured and efficient way. It includes student personal details, academic background, document verification status, and admission progress tracking.',
    image: 'https://i.ibb.co.com/fGQcbTWD/Screenshot-2026-08-05-212827.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-man-typing-on-a-computer-keyboard-40482-large.mp4',
    technologies: ['JavaScript', 'next.js','react.js','tailwindcss','Node.js, Express.js, TypeScript, REST API', 'PostgreSQL', 'Prisma ORM'],
    liveUrl: 'https://careertrack-frontend-puce.vercel.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/CareerTrack.git',
    featured: false
  },
  {
    id: 4,
    title: 'HERO.IO Management App',
    category: 'Full Stack',
    shortDescription: 'HERO.IO is an advanced collaborative task management application that revolutionizes team productivity through real-time updates and seamless communication.',
    description: 'HERO.IO is an advanced collaborative task management application that revolutionizes team productivity through real-time updates and seamless communication. This sophisticated platform features comprehensive project management tools including task assignment, progress tracking, deadline management, team collaboration spaces, and interactive dashboards with data visualization.',
    image: 'https://i.ibb.co.com/6c3DC3HJ/heroio.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-at-his-computer-34533-large.mp4',
    technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://taupe-moxie-6c1b13.netlify.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/B-12-A08-Hero-Apps',
    featured: true
  },
  
  {
    id: 5,
    title: 'Emergency-Hotline',
    category: 'JavaScript',
    shortDescription: 'Emergency-Hotline is a comprehensive emergency response platform providing quick access to emergency services with real-time location tracking.',
    description: 'Emergency-Hotline is a comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-flashing-light-of-an-ambulance-car-in-the-night-42407-large.mp4',
    technologies: ['React', 'JavaScript', 'Geolocation API'],
    liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
    githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline',
    featured: false
  },
  {
    id: 7,
    title: 'Green-Earth',
    category: 'Frontend',
    shortDescription: 'Green-Earth is an innovative environmental awareness platform dedicated to promoting eco-friendly practices and sustainability.',
    description: 'Green-Earth is an innovative environmental awareness and sustainability platform dedicated to promoting eco-friendly practices and environmental conservation. This comprehensive web application features interactive environmental data visualization and carbon footprint calculators.',
    image: 'https://i.ibb.co.com/rGXZMmbW/Green.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wind-turbines-on-a-sunny-day-43340-large.mp4',
    technologies: ['React', 'JavaScript', 'Data Visualization'],
    liveUrl: 'https://anwarhossen-dev.github.io/B12A06-Green-Earth',
    githubUrl: 'https://github.com/anwarhossen-dev/B12A06-Green-Earth',
    featured: false
  },
  {
    id: 6,
    title: 'Admission-info',
    category: 'ASP.NET',
    shortDescription: 'A structured system for organizing and managing student admission-related information efficiently.',
    description: 'This project focuses on organizing and managing admission-related information in a structured and efficient way. It includes student personal details, academic background, document verification status, and admission progress tracking.',
    image: 'https://i.ibb.co/5gtFGXHh/admission.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-man-typing-on-a-computer-keyboard-40482-large.mp4',
    technologies: ['JavaScript', 'Bootstrap 5', 'Local Storage'],
    liveUrl: 'https://anwarhossen-dev.github.io/Admission-info/',
    githubUrl: 'https://github.com/anwarhossen-dev/Admission-info',
    featured: false
  }
];

// Education Data
export const EDUCATION = [
  {
    degree: "Professional Web Development Course",
    institution: "Programming Hero",
    year: "2025 - 2025",
    period: "July 2025 - December 2025",
    grade: "In Progress",
    description: "Comprehensive full-stack web development program focusing on modern JavaScript frameworks, MERN stack development, and industry best practices. Learning advanced React.js, Node.js, MongoDB, Express.js, and professional development workflows with hands-on projects.",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript ES6+", "REST APIs"],
    icon: "laptop_mac",
    bgColor: "from-blue-500/20 to-purple-500/20",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-500"
  },
  {
    degree: "Diploma in Engineering of Computer Science & Technology",
    institution: "A K Khan UCEP Polytechnic Institute (AKKUPI)",
    year: "2020 - 2024",
    grade: "CGPA: 3.41/4.00",
    description: "Focused on software engineering, data structures, algorithms, and web development. Completed capstone project on full-stack web application development with modern technologies and best practices.",
    skills: ["Programming", "Data Structures", "Algorithms", "Web Development", "Database Management", "Software Engineering"],
    icon: "engineering",
    bgColor: "from-green-500/20 to-teal-500/20",
    borderColor: "border-green-500/20",
    textColor: "text-green-500"
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Govt. Hazi Muhammad Mohsin College, Chattogram",
    board: "BOU (Bangladesh Open University)",
    year: "2019 - 2021",
    grade: "GPA: 3.82/5.00",
    description: "Commerce background with focus on Accounting, Finance & Banking, and Business Studies. Achieved excellent results in all subjects with strong analytical and mathematical skills.",
    skills: ["Accounting", "Finance & Banking", "Business Studies", "Economics", "Mathematics"],
    icon: "account_balance",
    bgColor: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/20",
    textColor: "text-orange-500"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Sanowara Islam Boys' High School, Chattogram",
    board: "BOU (Bangladesh Open University)",
    year: "2017 - 2018",
    grade: "GPA: 2.65/5.00",
    description: "Commerce background with foundational knowledge in Accounting, Business Studies, and Mathematics. Built strong analytical thinking and problem-solving skills during secondary education.",
    skills: ["Basic Accounting", "Business Studies", "Mathematics", "General Science", "English"],
    icon: "school",
    bgColor: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20",
    textColor: "text-purple-500"
  }
];

// Experience Data
export const EXPERIENCE = [
  {
    title: "Jr. Programmer",
    company: "Genuine Technology & Research Ltd.",
    period: "Jan 2025 - Present",
    type: "Full-time",
    location: "On-site",
    description: "Developing and maintaining web applications using ASP.NET Core and MS SQL Server. Working with modern .NET technologies to build scalable enterprise applications and optimize database performance.",
    responsibilities: [
      "Developed 15+ ASP.NET Core web applications with clean architecture",
      "Designed and optimized MS SQL Server databases for improved performance",
      "Implemented RESTful APIs using ASP.NET Core Web API",
      "Improved application performance by 40% through code optimization and database tuning",
      "Collaborated with cross-functional teams using Agile methodologies"
    ],
    technologies: ["ASP.NET Core", "C#", "MS SQL Server", "Entity Framework", "Azure", "REST APIs"],
    icon: "work_outline"
  },
  {
    title: "Web Developer Intern",
    company: "Genuine Technology & Research Ltd.",
    period: "Sep 2024 - Dec 2024",
    type: "Internship",
    location: "On-site",
    description: "Gained hands-on experience in full-stack web development with focus on .NET technologies. Worked on client projects and learned industry best practices in ASP.NET development.",
    responsibilities: [
      "Developed 5+ client websites using ASP.NET Core MVC",
      "Created and maintained MS SQL Server databases",
      "Implemented user authentication and authorization systems",
      "Participated in code reviews and learned .NET best practices",
      "Learned version control with Git and Azure DevOps"
    ],
    technologies: ["ASP.NET Core", "C#", "MS SQL Server", "HTML", "CSS", "JavaScript", "Git"],
    icon: "code"
  }
];

// Services Data
export const SERVICES = [
  {
    title: "Full Stack Development",
    description: "Building robust and scalable web applications from scratch using modern tech stacks like MERN and ASP.NET Core. I handle everything from database design to frontend polish.",
    icon: "layers",
    color: "from-blue-500 to-cyan-500",
    features: ["Custom Web Apps", "E-commerce Solutions", "API Integration"],
    badge: "Enterprise Grade",
    metrics: [
      { label: "Projects Delivered", value: "15+" },
      { label: "Performance Boost", value: "40%" }
    ],
    ctaText: "Inquire Development",
    ctaHref: "#contact"
  },
  {
    title: "AI Integration",
    description: "Transforming traditional workflows with AI power. I specialize in integrating LLMs, building AI-driven chatbots, and automating engineering tasks.",
    icon: "psychology",
    color: "from-purple-500 to-indigo-500",
    features: ["Chatbot Development", "AI Automation", "Prompt Engineering"],
    badge: "Next Gen",
    metrics: [
      { label: "Agents Configured", value: "10+" },
      { label: "Workflows Automated", value: "85%" }
    ],
    ctaText: "Consult AI Solutions",
    ctaHref: "contact"
  },
  {
    title: "DevOps & Cloud",
    description: "Ensuring high availability and performance through modern DevOps practices. From CI/CD pipelines to cloud deployment on Azure and Vercel.",
    icon: "cloud_done",
    color: "from-orange-500 to-red-500",
    features: ["CI/CD Pipelines", "Docker Containerization", "Cloud Hosting"],
    badge: "Cloud Certified",
    metrics: [
      { label: "Average Uptime", value: "99.9%" },
      { label: "Deployment Speed", value: "3x Faster" }
    ],
    ctaText: "Optimize Pipeline",
    ctaHref: "#contact"
  }
];

// Testimonials Data
export const TESTIMONIALS = [
  {
    name: "Alex Johnson",
    role: "CEO at TechFlow",
    content: "Anwar is an exceptional developer who truly understands the balance between aesthetics and functionality. His AI integration work saved our team hundreds of hours.",
    image: "https://i.pravatar.cc/150?u=alex",
    rating: 5
  },
  {
    name: "Sarah Miller",
    role: "Project Manager",
    content: "Working with MD. Anwar Hossen was a breeze. He delivered our complex ASP.NET project ahead of schedule and with impeccable code quality.",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Startup Founder",
    content: "The MERN stack application Anwar built for us is fast, responsive, and secure. His attention to detail in the UI/UX is what sets him apart.",
    image: "https://i.pravatar.cc/150?u=david",
    rating: 5
  }
];

// Certificates & Awards Data
export const CERTIFICATES = [
  {
    title: 'MERN Stack Web Development Specialization',
    issuer: 'Programming Hero',
    date: '2025',
    statusLabel: 'Certified',
    icon: 'fas fa-graduation-cap',
    color: 'from-blue-500 to-cyan-500',
    credentialUrl: '/certificate_student.pdf',
    description: 'Comprehensive specialization covering React, Node.js, Express, MongoDB, Firebase Authentication, and advanced state management.',
    features: ['React', 'Node.js', 'Express', 'MongoDB'],
    metrics: [
      { label: 'Issuer', value: 'Programming Hero' },
      { label: 'Year', value: '2025' }
    ]
  },
  {
    title: 'ASP.NET Core & C# Web Development',
    issuer: 'freeCodeCamp / Microsoft',
    date: '13-April-2025',
    statusLabel: 'Verified',
    icon: 'fas fa-award',
    color: 'from-purple-500 to-indigo-500',
    credentialUrl: 'https://www.freecodecamp.org/certification/fcce202fee5-13de-4218-84e2-1b931dae5a35/foundational-c-sharp-with-microsoft',
    description: 'Deep dive into ASP.NET Core MVC, Web API, Entity Framework Core, SQL Server, Repository Pattern, and Clean Architecture.',
    features: ['ASP.NET Core', 'Web API', 'EF Core', 'Clean Architecture'],
    metrics: [
      { label: 'Issuer', value: 'freeCodeCamp / Microsoft' },
      { label: 'Date', value: 'Apr 2025' }
    ]
  },
  {
    title: 'Laravel PHP Development',
    issuer: 'Creative IT Institute',
    date: '04 February, 2025',
    statusLabel: 'Recognized',
    icon: 'fab fa-laravel',
    color: 'from-red-500 to-orange-500',
    credentialUrl: '/certificate.pdf',
    description: 'Hands-on training in Laravel, PHP, MySQL, MVC, REST API, Authentication, CRUD operations, Eloquent ORM, Blade Template, and modern web application development.',
    features: ['Laravel', 'Eloquent', 'Blade', 'REST API'],
    metrics: [
      { label: 'Issuer', value: 'Creative IT Institute' },
      { label: 'Year', value: '2025' }
    ]
  },
  {
    title: 'Web Development, NTVQF Level-IV',
    issuer: 'Bangladesh Technical Education Board (BTEB)',
    date: '29 March, 2024',
    statusLabel: 'Board Certified',
    icon: 'fas fa-award',
    color: 'from-blue-500 to-cyan-500',
    credentialUrl: '/14187267024000035.pdf',
    description: 'Successfully completed the National Skill Certificate-IV in Web Development under the National Technical & Vocational Qualification Framework (NTVQF). Developed competencies in responsive web development, UI/UX mark-up conversion, client-side scripting, CMS development, deployment, workplace communication, and occupational safety.',
    features: ['HTML/CSS', 'JavaScript', 'UI/UX', 'Deployment'],
    metrics: [
      { label: 'Issuer', value: 'BTEB' },
      { label: 'Date', value: 'Mar 2024' }
    ]
  },
  {
    title: 'IT Support Technician, NTVQF Level-I',
    issuer: 'Bangladesh Technical Education Board (BTEB)',
    date: '09 June, 2023',
    statusLabel: 'Credentialed',
    icon: 'fas fa-laptop-medical',
    color: 'from-cyan-500 to-blue-500',
    credentialUrl: '/14107237023000134.pdf',
    description: 'Completed the National Skill Certificate-I in IT Support Technician under NTVQF, building practical competencies in hardware assembly, PC configuration, office applications, email/web communication, workplace safety, and IT support fundamentals.',
    features: ['Hardware', 'Office Apps', 'Email Systems', 'Support Fundamentals'],
    metrics: [
      { label: 'Issuer', value: 'BTEB' },
      { label: 'Date', value: 'Jun 2023' }
    ]
  }
];

// FAQ Data
export const FAQS = [
  {
    question: "What is your primary tech stack?",
    answer: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) and ASP.NET Core for enterprise-level applications."
  },
  {
    question: "Are you available for freelance projects?",
    answer: "Yes! I'm always open to discussing new projects and collaborations. Feel free to reach out via the contact section."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Absolutely. I provide ongoing maintenance, bug fixes, and updates to ensure your application continues to run smoothly."
  }
];