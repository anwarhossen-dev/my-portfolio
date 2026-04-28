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
  title: 'Full Stack Developer',
  subtitle: 'ASP.NET & MERN Stack Developer',
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
    { name: 'MySQL', level: 65, icon: 'fas fa-database' },
    { name: 'Entity Framework', level: 80, icon: 'fas fa-layer-group' }
  ],
  tools: [
    { name: 'Visual Studio', level: 90, icon: 'fas fa-code' },
    { name: 'VS Code', level: 95, icon: 'fas fa-code' },
    { name: 'Git', level: 85, icon: 'fab fa-git-alt' },
    { name: 'Azure', level: 75, icon: 'fab fa-microsoft' },
    { name: 'Figma', level: 70, icon: 'fab fa-figma' }
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
    image: 'https://i.ibb.co.com/h1VpLnWn/Biryani-2.jpg',
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70878-537443187_tiny.mp4',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://local-chef-bazaar-pied.vercel.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/LocalChefBazaar',
    featured: true
  },
  {
    id: 2,
    title: 'HERO.IO Management App',
    category: 'Full Stack',
    shortDescription: 'HERO.IO is an advanced collaborative task management application that revolutionizes team productivity through real-time updates and seamless communication.',
    description: 'HERO.IO is an advanced collaborative task management application that revolutionizes team productivity through real-time updates and seamless communication. This sophisticated platform features comprehensive project management tools including task assignment, progress tracking, deadline management, team collaboration spaces, and interactive dashboards with data visualization.',
    image: 'https://i.ibb.co.com/6c3DC3HJ/heroio.png',
    technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://taupe-moxie-6c1b13.netlify.app/',
    githubUrl: 'https://github.com/anwarhossen-dev/B-12-A08-Hero-Apps',
    featured: true
  },
  {
    id: 3,
    title: 'ARTIFY Website',
    category: 'Frontend',
    shortDescription: 'ARTIFY is a stunning, fully responsive portfolio website that showcases creative work through elegant and modern design aesthetic.',
    description: 'ARTIFY is a stunning, fully responsive portfolio website that showcases creative work through an elegant and modern design aesthetic. Built with React.js and styled using Tailwind CSS, this project demonstrates advanced frontend development skills with a focus on user experience and visual appeal.',
    image: 'https://i.ibb.co.com/Z18112hy/71-P4fmg-Nmj-L.jpg',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://tubular-sundae-69af35.netlify.app',
    githubUrl: 'https://github.com/anwarhossen-dev/ARTIFY-client',
    featured: false
  },
  {
    id: 4,
    title: 'Emergency-Hotline',
    category: 'JavaScript',
    shortDescription: 'Emergency-Hotline is a comprehensive emergency response platform providing quick access to emergency services with real-time location tracking.',
    description: 'Emergency-Hotline is a comprehensive emergency response platform providing quick access to emergency services, medical assistance, and crisis support with real-time location tracking and multi-language support.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
    technologies: ['React', 'JavaScript', 'Geolocation API'],
    liveUrl: 'https://anwarhossen-dev.github.io/B12-A5-Emergency-Hotline',
    githubUrl: 'https://github.com/anwarhossen-dev/B12-A5-Emergency-Hotline',
    featured: false
  },
  {
    id: 5,
    title: 'Green-Earth',
    category: 'Frontend',
    shortDescription: 'Green-Earth is an innovative environmental awareness platform dedicated to promoting eco-friendly practices and sustainability.',
    description: 'Green-Earth is an innovative environmental awareness and sustainability platform dedicated to promoting eco-friendly practices and environmental conservation. This comprehensive web application features interactive environmental data visualization and carbon footprint calculators.',
    image: 'https://i.ibb.co.com/rGXZMmbW/Green.png',
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
    period: "Jan 2024 - Present",
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