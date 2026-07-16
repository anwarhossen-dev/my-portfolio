import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export interface Metric {
  label: string;
  value: string;
}

export interface GlassCardProps {
  index: number;
  badge?: string;
  icon: string;
  color: string;
  title: string;
  description: string;
  features?: string[];
  metrics?: Metric[];
  ctaText?: string;
  ctaHref?: string;
  progress?: number;
}

const getSpotlightColors = (colorStr: string) => {
  if (colorStr.includes('blue') || colorStr.includes('cyan')) {
    return {
      glow: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.35)',
      shadow: 'from-blue-500/10 to-cyan-500/10'
    };
  }
  if (colorStr.includes('purple') || colorStr.includes('indigo')) {
    return {
      glow: 'rgba(168, 85, 247, 0.12)',
      border: 'rgba(168, 85, 247, 0.35)',
      shadow: 'from-purple-500/10 to-indigo-500/10'
    };
  }
  if (colorStr.includes('orange') || colorStr.includes('red')) {
    return {
      glow: 'rgba(249, 115, 22, 0.12)',
      border: 'rgba(249, 115, 22, 0.35)',
      shadow: 'from-orange-500/10 to-red-500/10'
    };
  }
  return {
    glow: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.35)',
    shadow: 'from-cyan-500/10 to-blue-500/10'
  };
};

export const GlassCard: React.FC<GlassCardProps> = ({
  index,
  badge,
  icon,
  color,
  title,
  description,
  features = [],
  metrics = [],
  ctaText,
  ctaHref = "#contact",
  progress
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const formattedNumber = String(index + 1).padStart(2, '0');
  const themeColors = getSpotlightColors(color);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col p-8 md:p-10 overflow-visible"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Dynamic Colored Neon Background Glow Shadow (Smart Layer) */}
      <div className={`absolute -inset-[2px] bg-gradient-to-br ${themeColors.shadow} rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none -z-10`} />

      {/* Hover Spotlight Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${themeColors.glow},
              transparent 85%
            )
          `,
        }}
      />

      {/* Hover Spotlight Border Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          border: `1.5px solid ${themeColors.border}`,
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
        }}
      />

      {/* Card Header & Balanced Spacing */}
      <div className="relative z-20 flex justify-between items-start mb-8">
        {/* Icon container with colored gradient */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform duration-500`}>
          {icon.startsWith('fa') ? (
            <i className={`${icon} text-xl`} />
          ) : (
            <span className="material-icons-outlined text-3xl">{icon}</span>
          )}
        </div>

        {/* Industry Number Badge */}
        <div className="flex flex-col items-end">
          <span className="text-4xl font-extrabold text-slate-200/50 dark:text-slate-800/60 font-mono select-none transition-colors group-hover:text-cyan-500/20 leading-none">
            {formattedNumber}
          </span>
          {badge && (
            <span className="mt-2 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Title & Description with Clear Visual Hierarchy */}
      <div className="relative z-20 space-y-3 mb-6">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Optional Progress Bar (for Skills/Mastery) */}
      {progress !== undefined && (
        <div className="relative z-20 space-y-2 mb-6">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>Mastery Level</span>
            <span className="text-cyan-500 dark:text-cyan-400">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200/50 dark:bg-slate-800/50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${color}`}
            />
          </div>
        </div>
      )}

      {/* Metric Dashboard Display */}
      {metrics && metrics.length > 0 && (
        <div className="relative z-20 grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/5 mb-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-widest font-black mb-1">
                {metric.label}
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Feature List (Compact & Clean) */}
      {features && features.length > 0 && (
        <ul className="relative z-20 space-y-2 mb-8 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0">
                <span className="material-icons-outlined text-[10px]">done</span>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Professional Call To Action (CTA) */}
      {ctaText && (
        <div className="relative z-20 mt-auto pt-4 border-t border-slate-200/30 dark:border-slate-800/30">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 group/btn"
          >
            <span>{ctaText}</span>
            <span className="material-icons-outlined text-[14px] transform group-hover/btn:translate-x-1 transition-transform duration-300">
              arrow_forward
            </span>
          </a>
        </div>
      )}
    </motion.div>
  );
};
