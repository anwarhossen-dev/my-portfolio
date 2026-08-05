import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, SOCIAL_LINKS } from '../constants';
import TypewriterText from './TypewriterText.jsx';
import { scrollToElement } from '../utils';
import Magnetic from './Magnetic.jsx';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: `Hi! I'm Claude 3.5 Sonnet, ${PERSONAL_INFO.name.split(' ')[0]}'s intelligent portfolio assistant. I can help you explore his skills, projects, and professional background. What would you like to know?`,
      type: 'bot',
      id: 1
    }
  ]);

  useEffect(() => {
    // Show proactive greeting after 3 seconds
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 3000);

    // Hide greeting after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollRef = useRef(null);

  const quickReplies = [
    { label: '🤖 AI Skills', value: 'ai_skills' },
    { label: '📂 Top Projects', value: 'projects' },
    { label: '📧 Contact info', value: 'contact' },
    { label: '⚡ Scroll to Contact', value: 'scroll_contact' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isAnalyzing]);

  const processInput = (input) => {
    const text = input.toLowerCase();
    let response = "";
    let action = null;

    // 1. Action Detection (The "Smart" part)
    if (text.includes('scroll') || text.includes('go to') || text.includes('show me')) {
      if (text.includes('contact')) {
        response = "I'm orchestrating a scroll to the contact section for you. One moment...";
        action = () => scrollToElement('contact');
      } else if (text.includes('project')) {
        response = "Analyzing projects... Initiating navigation to the showcase gallery.";
        action = () => scrollToElement('projects');
      } else if (text.includes('skill')) {
        response = "Synthesizing technical capabilities... Scrolling to skills matrix.";
        action = () => scrollToElement('skills');
      } else if (text.includes('about')) {
        response = "Retrieving professional profile... Navigating to about section.";
        action = () => scrollToElement('about');
      }
    }

    // 2. Information Retrieval
    if (!response) {
      if (text.includes('claude') || text.includes('anthropic')) {
        response = `As Claude 3.5 Sonnet, I am deeply integrated into Anwar's development workflow. He uses Anthropic's APIs to build intelligent features and automate complex engineering tasks.`;
      } else if (text.includes('gemini') || text.includes('cli') || text.includes('automated')) {
        response = `Anwar is a power user of Gemini CLI. It's his primary tool for rapid codebase analysis and architectural mapping. He has a 98% mastery level with it!`;
      } else if (text.includes('skill') || text.includes('tech') || text.includes('know')) {
        response = `Anwar's core expertise lies in ${SKILLS.frontend[0].name}, ${SKILLS.backend[0].name}, and Claude-driven AI integrations. He specializes in bridging the gap between traditional code and LLMs.`;
      } else if (text.includes('project') || text.includes('work') || text.includes('build')) {
        const p = PROJECTS[0];
        response = `He has delivered several high-impact projects. A notable one is "${p.title}", which utilizes ${p.technologies.join(', ')} to solve real-world problems.`;
      } else if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('reach')) {
        response = `Anwar is available at ${PERSONAL_INFO.email}. Would you like me to initiate a scroll to his contact form?`;
      } else if (text.includes('resume') || text.includes('cv')) {
        response = "You can access his full professional resume in the Hero section. It outlines his 2+ years of industry experience.";
      } else if (text.includes('who') || text.includes('anwar')) {
        response = `${PERSONAL_INFO.name} is a visionary ${PERSONAL_INFO.title}. He focuses on building ${PERSONAL_INFO.subtitle} with a heavy emphasis on AI-driven efficiency.`;
      } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
        response = "Hello! I am Anwar's Claude-powered assistant. How can I facilitate your exploration today?";
      } else {
        response = "I'm processing your request. Could you be more specific? I can provide details on Anwar's 'AI skills', 'projects', or 'contact information'.";
      }
    }

    return { response, action };
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { text, type: 'user', id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate "Claude Thinking" for a more authentic feel
    setTimeout(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        const { response, action } = processInput(text);
        
        setMessages(prev => [...prev, {
          text: response,
          type: 'bot',
          id: Date.now() + 1
        }]);
        
        setIsTyping(false);
        if (action) setTimeout(action, 1500);
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <AnimatePresence>
        {/* Proactive Greeting Bubble */}
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-br-none shadow-2xl border border-purple-500/20 min-w-[200px]"
          >
            <button 
              onClick={() => setShowGreeting(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg"
            >
              <span className="material-icons-outlined text-[12px]">close</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
                <span className="material-icons-outlined text-sm">auto_awesome</span>
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Claude 3.5 is online. How can I help?
              </p>
            </div>
          </motion.div>
        )}

        {/* Smart Hover Tooltip */}
        {isHovered && !isOpen && !showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 right-0 bg-purple-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-xl border border-white/10"
          >
            Ask Claude Assistant
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            style={{ maxHeight: '600px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30">
                  <span className="material-icons-outlined text-white">psychology</span>
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest">Claude 3.5 Sonnet</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold opacity-80 tracking-tighter">Powered by Anthropic</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="hover:bg-white/10 p-2 rounded-xl transition-colors"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            {/* Chat Content */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 min-h-[350px] scroll-smooth bg-slate-50/50 dark:bg-slate-950/50"
            >
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
                      msg.type === 'bot' 
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700' 
                        : 'bg-purple-600 text-white rounded-tr-none'
                    }`}
                  >
                    {msg.type === 'bot' ? (
                      <TypewriterText text={msg.text} speed={25} showCursor={false} />
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isAnalyzing && (
                <div className="flex justify-start">
                  <div className="text-[10px] font-mono text-purple-600 flex items-center gap-2 bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">
                    <span className="animate-spin material-icons-outlined text-[12px]">auto_awesome</span>
                    <span>Claude is thinking...</span>
                  </div>
                </div>
              )}

              {isTyping && !isAnalyzing && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input & Quick Replies */}
            <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              {/* Quick Replies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.value}
                    onClick={() => handleSend(reply.label)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-5 py-3 pr-12 text-sm focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  className="absolute right-2 p-2 text-purple-600 hover:bg-purple-500/10 rounded-xl transition-all"
                >
                  <span className="material-icons-outlined">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <Magnetic strength={0.3}>
        <motion.button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowGreeting(false);
          }}
          className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 relative overflow-hidden ${
            isOpen 
              ? 'bg-purple-900 rotate-90' 
              : 'bg-purple-600'
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                className="material-icons-outlined text-white text-3xl absolute"
              >
                close
              </motion.span>
            ) : showGreeting ? (
              <motion.span
                key="wave"
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.5 }}
                className="material-icons-outlined text-white text-3xl absolute"
              >
                waving_hand
              </motion.span>
            ) : isHovered ? (
              <motion.span
                key="brain"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="material-icons-outlined text-white text-3xl absolute"
              >
                psychology
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="material-icons-outlined text-white text-3xl absolute"
              >
                auto_awesome
              </motion.span>
            )}
          </AnimatePresence>

          {/* Background Neural Pulse Effect */}
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/20 rounded-full"
            />
          )}

          {!isOpen && (
            <div className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 border-2 border-white dark:border-slate-900"></span>
            </div>
          )}
        </motion.button>
      </Magnetic>
    </div>
  );
};

export default Chatbot;