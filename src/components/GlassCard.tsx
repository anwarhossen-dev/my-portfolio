import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FaGraduationCap, FaAward, FaLaravel } from 'react-icons/fa';

export interface Metric {
  label: string;
  value: string;
}

export interface GlassCardProps {
  index: number;
  badge?: string;
  statusLabel?: string;
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
  statusLabel,
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
      className="group relative rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col p-3.5 sm:p-4 overflow-visible"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Dynamic Colored Neon Background Glow Shadow (Smart Layer) */}
      <div className={`absolute -inset-[1px] bg-gradient-to-br ${themeColors.shadow} rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 pointer-events-none -z-10`} />

      {/* Hover Spotlight Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              ${themeColors.glow},
              transparent 85%
            )
          `,
        }}
      />

      {/* Hover Spotlight Border Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          border: `1px solid ${themeColors.border}`,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
        }}
      />

      {/* Card Header & Balanced Spacing */}
      <div className="relative z-20 flex justify-between items-start mb-2.5 gap-2">
        {/* Icon container with colored gradient */}
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-sm shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300`}>
          {icon.toLowerCase().includes('graduation-cap') && <FaGraduationCap className="text-sm" />}
          {icon.toLowerCase().includes('award') && <FaAward className="text-sm" />}
          {icon.toLowerCase().includes('laravel') && <FaLaravel className="text-sm" />}
          {icon.toLowerCase().startsWith('fa') && !['graduation-cap', 'award', 'laravel'].some(name => icon.toLowerCase().includes(name)) && (
            <span className="text-[10px]">★</span>
          )}
          {!icon.toLowerCase().startsWith('fa') && (
            <span className="material-icons-outlined text-lg">{icon}</span>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-end gap-1">
          {statusLabel && (
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-500/20 shadow-sm">
              {statusLabel}
            </span>
          )}
          <span className="text-2xl font-extrabold text-slate-300/60 dark:text-slate-800/70 font-mono select-none transition-colors group-hover:text-cyan-500/30 leading-none">
            {formattedNumber}
          </span>
          {badge && (
            <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Title & Description with Clear Visual Hierarchy */}
      <div className="relative z-20 space-y-1 mb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-snug">
          {description}
        </p>
      </div>

      {/* Optional Progress Bar (for Skills/Mastery) */}
      {progress !== undefined && (
        <div className="relative z-20 space-y-1 mb-3">
          <div className="flex justify-between text-[8px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>Mastery Level</span>
            <span className="text-cyan-500 dark:text-cyan-400">{progress}%</span>
          </div>
          <div className="h-1 w-full bg-slate-200/50 dark:bg-slate-800/50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${color}`}
            />
          </div>
        </div>
      )}

      {/* Metric Dashboard Display */}
      {metrics && metrics.length > 0 && (
        <div className="relative z-20 grid grid-cols-2 gap-1.5 p-2 rounded-lg bg-slate-500/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/5 mb-3">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[8px] text-slate-500 dark:text-slate-500 uppercase tracking-wider font-bold mb-0.5">
                {metric.label}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Feature List (Compact & Clean) */}
      {features && features.length > 0 && (
        <ul className="relative z-20 space-y-1 mb-4 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              <span className="w-3.5 h-3.5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0">
                <span className="material-icons-outlined text-[8px]">done</span>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Professional Call To Action (CTA) */}
      {ctaText && (
        <div className="relative z-20 mt-auto pt-2">
          <a
            href={ctaHref}
            target={ctaHref.startsWith('http') || ctaHref.endsWith('.pdf') ? "_blank" : undefined}
            rel={ctaHref.startsWith('http') || ctaHref.endsWith('.pdf') ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-bold uppercase tracking-wider text-[9px] shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all duration-200"
          >
            <span>{ctaText}</span>
            <span className="material-icons-outlined text-[12px]">arrow_forward</span>
          </a>
        </div>
      )}
    </motion.div>
  );
};
