import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

const Terminal = () => {
  const [lines, setLines] = useState([]);

  const terminalCommands = [
    { text: 'npm init portfolio', color: 'text-green-400' },
    { text: 'Installing core-dependencies...', color: 'text-slate-400' },
    { text: 'Found 12 active components', color: 'text-blue-400' },
    { text: 'Optimization level: 100%', color: 'text-emerald-400' },
    { text: 'Status: ONLINE & READY', color: 'text-cyan-400' }
  ];

  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (lines.length >= terminalCommands.length + 1) {
      setIsTyping(false);
      return;
    }

    const interval = setInterval(() => {
      setLines(prev => [...prev, terminalCommands[prev.length - 1]]);
    }, 1500);

    return () => clearInterval(interval);
  }, [lines, terminalCommands.length]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 font-mono text-sm mt-12">
      {/* Top Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-slate-400 text-[10px] ml-4 font-bold uppercase tracking-widest">system_terminal.exe</span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-2 min-h-[200px]">
        <div className="flex items-center gap-2 text-primary">
          <span>$</span>
          <TypewriterText text="whoami" speed={100} showCursor={false} />
        </div>
        
        <div className="text-slate-300 mb-4">
          &gt; MD. Anwar Hossen: Full Stack Architect
        </div>

        {lines.map((line, i) =>
          line ? (
            <div key={i} className={`flex items-start gap-2 ${line.color}`}>
              <span className="opacity-50">#</span>
              <TypewriterText text={line.text} speed={30} showCursor={false} />
            </div>
          ) : null
        )}

        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-primary ml-1"
          />
        )}
      </div>
    </div>
  );
};

export default Terminal;