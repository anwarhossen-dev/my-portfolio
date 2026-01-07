const EducationSection = () => {
  const educationData = [
     {
      degree: "professional course",
      institution: "programming-hero",
      year: "2025 - 2025",
      Period: "july-2025 - dece-2025",
      description: "Focused on software engineering, data structures, algorithms, and web development. Completed capstone project on full-stack web application development.",
      icon: "Remote"
    },
     {
      degree: "Diploma in engineering of  Computer Science Technology",
      institution: "A K Khan UCEP Polytechnic Institute (AKKUPI)",
      year: "2020 - 2024",
      grade: "CGPA: 3.41/4.00",
      description: "Focused on software engineering, data structures, algorithms, and web development. Completed capstone project on full-stack web application development.",
      icon: "Polytechnic"
    },
  
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: " Govt. Hazi Muhammad Mohsin College, Chattogram",
      year: "2019 - 2021",
      grade: "GPA: 3.82/5.00",
      description: "Science background with focus on finance & banking, Accounting. Achieved excellent results in all subjects.",
      icon: "menu_book"
    }
  ];

  return (
    <section className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" id="education">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
          <span className="text-green-500 font-semibold text-xs tracking-widest uppercase">My Education</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Educational <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">Background</span>
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-4"></div>
      </div>

      {/* Education Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full hidden md:block"></div>
        
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Content Card */}
              <div className="flex-1 group">
                <div className="relative p-8 bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">
                      <span className="material-icons-outlined text-2xl">{edu.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <span className="text-primary font-semibold">{edu.institution}</span>
                        <span className="hidden sm:inline text-slate-400">•</span>
                        <span className="text-slate-600 dark:text-slate-400">{edu.year}</span>
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-semibold mb-3">
                        {edu.grade}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="hidden md:flex w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-4 border-white dark:border-background-dark shadow-lg flex-shrink-0 z-10"></div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;