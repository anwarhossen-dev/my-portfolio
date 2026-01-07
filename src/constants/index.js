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
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with MERN stack',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/anwarhossen-dev/project1',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/anwarhossen-dev/project2',
    featured: true
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with React and Tailwind CSS',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/anwarhossen-dev/project3',
    featured: false
  }
];

// Education Data
export const EDUCATION = [
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
    year: "2018 - 2020",
    grade: "GPA: 3.82/5.00",
    description: "Commerce background with focus on Accounting, and Finance & Banking. Achieved excellent results in all subjects.",
    icon: "menu_book"
  }
];

// Experience Data
export const EXPERIENCE = [
  {
    title: "Jr. Programmer",
    company: "Genuine Technology & Research Ltd.",
    period: "2024 - Present",
    description: "Developing and maintaining web applications using MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    technologies: ["SQL", "Node.js", "MongoDB", "Express", "ASP.NET"],
    icon: "work"
  },
  {
    title: "Internship",
    company: "Genuine Technology & Research Ltd.",
    period: "2024 - 2024",
    description: "Created responsive web interfaces and improved user experience. Worked closely with designers to implement pixel-perfect designs.",
    technologies: ["React", "JavaScript", "CSS3", "HTML5"],
    icon: "code"
  }
];