import { PERSONAL_INFO } from '../constants';
import { scrollToElement } from '../utils';

const HeroSection = () => {
  const handleContactClick = (e) => {
    e.preventDefault();
    scrollToElement('contact', 100);
  };

  const handleScrollDown = (e) => {
    e.preventDefault();
    scrollToElement('about', 100);
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 lg:px-16 py-12 pt-24 gap-12 max-w-7xl mx-auto w-full bg-gray-50 dark:bg-background-dark">
      {/* Text Content */}
      <div className="flex-1 w-full text-left space-y-6 order-2 lg:order-1">
        <div className="inline-block px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium">
          Hello, I'm
        </div>
        
        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          <span className="block text-gray-900 dark:text-white mb-2">MD. Anwar</span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Hossen
          </span>
        </h1>
        
        <div className="flex items-center gap-3 text-lg font-medium text-gray-600 dark:text-gray-300">
          <span className="text-cyan-400 font-mono text-xl">&lt;/&gt;</span>
          <span className="font-semibold">MERN Stack Developer</span>
          <span className="text-gray-400">||</span>
          <span className="font-semibold">Frontend Developer</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-2xl">
          I am a passionate and dedicated developer with expertise in building scalable web applications. 
          With a strong foundation in <span className="text-cyan-600 dark:text-cyan-400 font-semibold">MongoDB, Express, React,</span> and <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Node.js</span>, 
          I transform ideas into seamless digital experiences. I also specialize in creating dynamic and user-friendly websites using <span className="text-cyan-600 dark:text-cyan-400 font-semibold">React.js</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
          <a 
            href="/resume.pdf" 
            download={`${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.pdf`}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold transition-all duration-300"
            aria-label="Download resume"
          >
            <span className="material-icons-outlined text-sm" aria-hidden="true">download</span>
            Download Resume
          </a>
          <button 
            onClick={handleContactClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-white hover:bg-cyan-500 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Contact me"
          >
            <span className="material-icons-outlined text-sm" aria-hidden="true">send</span>
            Contact Me
          </button>
        </div>
        
        <div className="flex items-center gap-2 pt-8 text-gray-400 text-sm">
          <span>Scroll Down</span>
          <button 
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1 p-2 hover:text-cyan-400 transition-colors cursor-pointer"
            aria-label="Scroll to about section"
          >
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Profile Image */}
      <div className="flex-1 w-full flex justify-center items-center relative order-1 lg:order-2">
        {/* Animated Rings */}
        <div className="absolute inset-0 m-auto w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-2 border-cyan-200 dark:border-cyan-800 animate-spin" style={{ animationDuration: '20s' }} aria-hidden="true"></div>
        <div className="absolute inset-0 m-auto w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-purple-200 dark:border-purple-800 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} aria-hidden="true"></div>
        
        {/* Profile Image Container */}
        <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full p-2 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-orange-300 overflow-hidden relative z-10 border-4 border-white dark:border-gray-800">
            <img 
              alt={`Portrait of ${PERSONAL_INFO.name}`}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
              src={PERSONAL_INFO.profileImage}
              loading="eager"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400/6366f1/ffffff?text=MD.+Anwar+Hossen';
              }}
            />
          </div>
          
          {/* Experience Badge */}
          <div className="absolute bottom-4 -right-4 sm:bottom-8 sm:-right-6 bg-white dark:bg-gray-800 p-3 pr-5 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex items-center gap-3 z-20">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center border-2 border-white dark:border-gray-800">
                <i className="fab fa-react text-white text-xs" aria-hidden="true"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-2 border-white dark:border-gray-800">
                <i className="fab fa-node-js text-white text-xs" aria-hidden="true"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center border-2 border-white dark:border-gray-800">
                <i className="fab fa-js-square text-white text-xs" aria-hidden="true"></i>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{PERSONAL_INFO.experience}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-8 right-16 text-purple-400 text-2xl font-bold opacity-60 select-none animate-pulse" aria-hidden="true">++</div>
          <div className="absolute bottom-16 -left-8 text-cyan-400 text-xl font-bold opacity-60 select-none animate-pulse" aria-hidden="true">**</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;