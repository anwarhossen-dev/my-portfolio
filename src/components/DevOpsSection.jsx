import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { MdSync, MdCode, MdConstruction, MdBiotech, MdRocketLaunch, MdCloudDone, MdSettings, MdCheck, MdTerminal } from 'react-icons/md';

const DevOpsSection = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const pipelineStages = [
    { title: 'Code', icon: <MdCode />, gradient: 'from-blue-600 to-cyan-500' },
    { title: 'Build', icon: <MdConstruction />, gradient: 'from-indigo-600 to-blue-500' },
    { title: 'Test', icon: <MdBiotech />, gradient: 'from-purple-600 to-indigo-500' },
    { title: 'Release', icon: <MdRocketLaunch />, gradient: 'from-pink-600 to-purple-500' },
    { title: 'Deploy', icon: <MdCloudDone />, gradient: 'from-emerald-600 to-teal-500' }
  ];

  const triggerPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStage(0);
    setProgress(0);
    setShowSuccess(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning && activeStage < pipelineStages.length) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (activeStage === pipelineStages.length - 1) {
              setIsRunning(false);
              setShowSuccess(true);
              clearInterval(timer);
              return 100;
            }
            setActiveStage((s) => s + 1);
            return 0;
          }
          return prev + 4;
        });
      }, 80);
    }
    return () => clearInterval(timer);
  }, [isRunning, activeStage]);

  return (
    <section className="px-6 lg:px-16 py-32 max-w-7xl mx-auto w-full relative overflow-hidden" id="devops">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <AnimatePresence>
          {activeStage >= 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 blur-[150px] bg-gradient-to-r ${pipelineStages[activeStage].gradient} opacity-20 transition-all duration-1000`}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 mb-6">
            <MdSync className="text-xs animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Futuristic Laravel CI/CD</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-8">
            Smart <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 italic">Pipeline Engine</span>
          </motion.h2>

          <motion.button
            onClick={triggerPipeline}
            disabled={isRunning}
            whileHover={!isRunning ? { scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" } : {}}
            whileTap={!isRunning ? { scale: 0.95 } : {}}
            className={`relative px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 flex items-center gap-4 overflow-hidden group ${
              isRunning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl'
            }`}
          >
            <div
  className={`relative z-10 w-10 h-10 rounded-full
  flex items-center justify-center
  ${
    isRunning
      ? 'bg-white/10'
      : 'bg-cyan-500 text-white'
  }`}
>
  <div
    className={`text-[20px]
    ${
      isRunning
        ? 'animate-spin'
        : 'group-hover:rotate-12 transition-transform duration-300'
    }`}
  >
    {isRunning ? <MdSettings /> : <MdRocketLaunch />}
  </div>
</div>
            {/* Success Animation Overlay */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-emerald-500 z-0"
                />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Interactive Pipeline Track */}
        <div className="relative max-w-6xl mx-auto py-24 px-4">
          {/* Glowing Progress Line */}
          <div className="absolute top-[50%] left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800 hidden md:block">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: showSuccess ? '100%' : isRunning ? `${(activeStage / (pipelineStages.length - 1)) * 100}%` : '0%' 
              }}
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-20 md:gap-4 relative">
            {pipelineStages.map((stage, index) => {
              const isCompleted = index < activeStage || showSuccess;
              const isActive = index === activeStage && !showSuccess;

              return (
                <div key={index} className="flex flex-col items-center relative group">
                  {/* Stage Node */}
                  <div className="relative w-28 h-28 md:w-32 md:h-32">
                    {/* SVG Progress Ring */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.svg 
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 w-full h-full p-1"
                        >
                          <circle
                            cx="50%"
                            cy="50%"
                            r="48%"
                            fill="none"
                            stroke="url(#neonGradient)"
                            strokeWidth="4"
                            strokeDasharray="100 100"
                            strokeDashoffset={100 - progress}
                            className="transition-all duration-150"
                          />
                          <defs>
                            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#22d3ee" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </motion.svg>
                      )}
                    </AnimatePresence>

                    {/* Node Body */}
                    <motion.div 
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        boxShadow: isActive ? "0 0 50px rgba(6, 182, 212, 0.4)" : "0 0 0px transparent"
                      }}
                      className={`w-full h-full rounded-full border-2 flex flex-col items-center justify-center backdrop-blur-3xl transition-all duration-500 z-10 relative
                        ${isCompleted 
                          ? `bg-gradient-to-br ${stage.gradient} border-transparent text-white shadow-2xl` 
                          : isActive 
                          ? 'bg-white dark:bg-slate-900 border-cyan-400' 
                          : 'bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400'
                        }
                      `}
                    >
                      <span className={`text-3xl mb-1 ${isCompleted ? 'scale-110' : ''}`}>
                        {isCompleted ? <MdCheck /> : stage.icon}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{stage.title}</span>
                    </motion.div>
                  </div>

                  {/* Progress Info Below */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-6 text-center whitespace-nowrap"
                      >
                        <p className="text-cyan-500 font-mono text-[10px] font-bold uppercase tracking-tighter mb-1">
                          System {stage.title} in progress...
                        </p>
                        <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                          <span className="text-cyan-400 font-black text-xs">{progress}%</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success State Indicator */}
                  {showSuccess && index === pipelineStages.length - 1 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-12 px-4 py-2 rounded-2xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-xl"
                    >
                      Build Successful
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Futuristic Console Output Card */}
        <motion.div 
          variants={fadeInUp}
          className="mt-24 p-[1px] rounded-[3rem] bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 shadow-2xl overflow-hidden"
        >
          <div className="bg-slate-950/90 backdrop-blur-2xl rounded-[2.95rem] p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-3xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-inner">
                    <MdTerminal className="text-cyan-400 text-3xl animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-3xl tracking-tight">AI Deployment <span className="text-cyan-400 italic">Control</span></h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Advanced Orchestration</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeStage}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 relative group"
                    >
                      <div className="absolute top-4 right-6 flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <p className="text-cyan-400 font-mono text-[11px] mb-4">
                        {activeStage === -1 ? '> STATUS: STANDBY' : `> PROCESS: ${pipelineStages[activeStage].title.toUpperCase()}_STAGE`}
                      </p>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        {activeStage === 0 && "Gemini CLI is executing deep-scan code analysis. Vulnerability check: 0 issues found. Architectural alignment verified."}
                        {activeStage === 1 && "Spinning up multi-threaded build clusters. Optimizing binary size and asset compression for edge delivery."}
                        {activeStage === 2 && "Initiating 150+ automated test cases. Real-time stress testing and UI regression auditing in progress."}
                        {activeStage === 3 && "Packaging production-ready artifacts. Generating secure manifest and version-locked dependencies."}
                        {activeStage === 4 && "Production swap initiated. Global CDN cache warming. Telemetry indicates 100% health in all regions."}
                        {activeStage === -1 && "Ready to launch mission-critical deployment. All systems are green. Waiting for orchestrator trigger."}
                        {showSuccess && "DEPLOYMENT SUCCESSFUL. Production environment optimized. Monitoring active. Logs synced to cloud."}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-between h-28">
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Engine Status</p>
                      <p className={`font-black text-xl tracking-tighter ${isRunning ? 'text-cyan-400' : 'text-slate-600'}`}>
                        {isRunning ? 'CALCULATING' : 'READY_TO_RUN'}
                      </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-between h-28">
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">System Health</p>
                      <div className="flex items-end gap-2">
                        <p className="text-emerald-400 font-black text-3xl tracking-tighter">100%</p>
                        <span className="text-[10px] text-emerald-500/50 font-bold mb-1">OPTIMAL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Streaming Log Terminal */}
              <div className="bg-black/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 font-mono text-[10px] h-[350px] overflow-hidden flex flex-col shadow-inner">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-cyan-500 animate-pulse' : 'bg-slate-700'}`} />
                    <span className="text-slate-500 font-bold uppercase tracking-widest">pipeline_runtime.v2.log</span>
                  </div>
                  <span className="text-slate-600">ID: DC-88-02</span>
                </div>
                
                <div className="space-y-2 text-cyan-400/60 overflow-y-auto custom-scrollbar">
                  {activeStage >= 0 && <p className="animate-pulse"><span className="text-slate-600">[0.00s]</span> INITIALIZING_HANDSHAKE...</p>}
                  {activeStage >= 0 && <p><span className="text-slate-600">[0.45s]</span> ANALYZING_REPOSITORY_DELTAS...</p>}
                  {activeStage >= 1 && <p><span className="text-slate-600">[2.12s]</span> STARTING_COMPILATION_SEQUENCE...</p>}
                  {activeStage >= 1 && <p className="text-blue-400"><span className="text-slate-600">[5.88s]</span> ASSET_COMPRESSION_COMPLETE</p>}
                  {activeStage >= 2 && <p><span className="text-slate-600">[8.22s]</span> RUNNING_SECURITY_UNIT_TESTS...</p>}
                  {activeStage >= 2 && <p className="text-emerald-400/80"><span className="text-slate-600">[12.4s]</span> PASS: 156/156 TESTS</p>}
                  {activeStage >= 3 && <p><span className="text-slate-600">[15.1s]</span> GENERATING_VERSION_MANIFEST...</p>}
                  {activeStage >= 4 && <p className="text-purple-400"><span className="text-slate-600">[18.9s]</span> ROUTING_TO_AZURE_CLUSTERS...</p>}
                  {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <p className="text-emerald-400 font-black text-xs leading-none">&gt;&gt;&gt; DEPLOYMENT_SUCCESSFUL</p>
                      <p className="text-emerald-500/50 text-[9px] mt-1 italic tracking-widest">PRODUCTION_READY_V1.4.2</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DevOpsSection;