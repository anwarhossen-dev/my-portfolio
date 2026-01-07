import { useState } from 'react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-surface-dark rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.name}</h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <span className="material-icons-outlined">close</span>
            </button>
          </div>

          {/* Project Image */}
          <div className="mb-6">
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-64 object-cover rounded-2xl"
            />
          </div>

          {/* Technology Stack */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Project Description</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Links */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Project Links</h4>
            <div className="flex gap-4">
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="material-icons-outlined text-sm">launch</span>
                Live Demo
              </a>
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <i className="fab fa-github"></i>
                GitHub
              </a>
            </div>
          </div>

          {/* Challenges */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Challenges Faced</h4>
            <ul className="space-y-2">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          {/* Future Improvements */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Future Improvements</h4>
            <ul className="space-y-2">
              {project.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onViewMore }) => {
  return (
    <div className="group relative bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* View More Button */}
        <button 
          onClick={() => onViewMore(project)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
        >
          <span className="material-icons-outlined text-sm">visibility</span>
          View Details
        </button>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      name: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
      fullDescription: "A comprehensive e-commerce platform built with the MERN stack. Features include user authentication, product catalog, shopping cart, order management, payment processing with Stripe, admin dashboard, and responsive design. The platform supports multiple user roles and provides a seamless shopping experience across all devices.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "JWT", "Tailwind CSS"],
      liveLink: "https://ecommerce-demo.com",
      githubLink: "https://github.com/username/ecommerce-platform",
      challenges: [
        "Implementing secure payment processing with Stripe API",
        "Managing complex state for shopping cart and user sessions",
        "Optimizing database queries for large product catalogs",
        "Ensuring responsive design across all device sizes"
      ],
      improvements: [
        "Add real-time inventory management",
        "Implement advanced search and filtering options",
        "Add product recommendation system",
        "Integrate with multiple payment gateways"
      ]
    },
    {
      name: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      fullDescription: "A modern task management application designed for team collaboration. Built with React.js and Firebase, it features real-time synchronization, drag-and-drop task organization, team member management, project timelines, and notification system. The app supports multiple project workspaces and provides detailed analytics for project tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      technologies: ["React.js", "Firebase", "Material-UI", "Redux", "Chart.js"],
      liveLink: "https://taskmanager-demo.com",
      githubLink: "https://github.com/username/task-manager",
      challenges: [
        "Implementing real-time data synchronization across multiple users",
        "Creating intuitive drag-and-drop functionality",
        "Managing complex user permissions and roles",
        "Optimizing performance for large datasets"
      ],
      improvements: [
        "Add calendar integration",
        "Implement time tracking features",
        "Add mobile app version",
        "Integrate with third-party tools like Slack"
      ]
    },
    {
      name: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts and interactive maps.",
      fullDescription: "A comprehensive weather dashboard that provides current weather conditions, 7-day forecasts, and interactive weather maps. Built with React.js and integrated with multiple weather APIs, it features location-based weather data, weather alerts, historical weather data, and customizable dashboard widgets. The application includes geolocation support and saves user preferences.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      technologies: ["React.js", "OpenWeather API", "Mapbox", "Chart.js", "Geolocation API"],
      liveLink: "https://weather-dashboard-demo.com",
      githubLink: "https://github.com/username/weather-dashboard",
      challenges: [
        "Integrating multiple weather APIs for comprehensive data",
        "Implementing accurate geolocation services",
        "Creating responsive charts and visualizations",
        "Handling API rate limits and error states"
      ],
      improvements: [
        "Add weather notifications and alerts",
        "Implement weather-based activity suggestions",
        "Add historical weather data analysis",
        "Create weather comparison between multiple locations"
      ]
    }
  ];

  const handleViewMore = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" id="projects">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <span className="text-purple-500 font-semibold text-xs tracking-widest uppercase">My Work</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Projects</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              onViewMore={handleViewMore}
            />
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsSection;