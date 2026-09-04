import React from 'react';
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiNextdotjs,
  SiDotnet,
  SiCsharp,
  SiNodedotjs,
  SiExpress,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiPostgresql,
  SiVisualstudio,
  SiVisualstudiocode,
  SiGit,
  SiGithubactions,
  SiDocker,
  SiOpenai
} from 'react-icons/si';
import { FaCode, FaDatabase, FaLayerGroup, FaTerminal, FaBrain, FaRobot, FaMicrochip, FaLink } from 'react-icons/fa';

export const SmartTechIcon = ({ name, className = "text-2xl" }) => {
  const normName = (name || '').toLowerCase();

  if (normName.includes('react')) return <SiReact className={`${className} text-[#61DAFB]`} />;
  if (normName.includes('javascript') || normName.includes('js')) return <SiJavascript className={`${className} text-[#F7DF1E] bg-black rounded-sm p-[1px]`} />;
  if (normName.includes('html')) return <SiHtml5 className={`${className} text-[#E34F26]`} />;
  if (normName.includes('css')) return <SiCss3 className={`${className} text-[#1572B6]`} />;
  if (normName.includes('bootstrap')) return <SiBootstrap className={`${className} text-[#7952B3]`} />;
  if (normName.includes('tailwind')) return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
  if (normName.includes('next')) return <SiNextdotjs className={`${className} text-slate-900 dark:text-white`} />;
  
  if (normName.includes('asp.net') || normName.includes('.net')) return <SiDotnet className={`${className} text-[#512BD4]`} />;
  if (normName.includes('c#') || normName.includes('csharp')) return <SiCsharp className={`${className} text-[#239120]`} />;
  if (normName.includes('node')) return <SiNodedotjs className={`${className} text-[#339933]`} />;
  if (normName.includes('express')) return <SiExpress className={`${className} text-slate-800 dark:text-slate-200`} />;

  if (normName.includes('sql server') || normName.includes('mssql')) return <SiMicrosoftsqlserver className={`${className} text-[#CC292B]`} />;
  if (normName.includes('mongo')) return <SiMongodb className={`${className} text-[#47A248]`} />;
  if (normName.includes('postgres')) return <SiPostgresql className={`${className} text-[#4169E1]`} />;
  if (normName.includes('entity framework')) return <FaLayerGroup className={`${className} text-[#512BD4]`} />;
  if (normName.includes('database')) return <FaDatabase className={`${className} text-cyan-500`} />;

  if (normName.includes('visual studio code') || normName.includes('vs code')) return <SiVisualstudiocode className={`${className} text-[#007ACC]`} />;
  if (normName.includes('visual studio')) return <SiVisualstudio className={`${className} text-[#5C2D91]`} />;
  if (normName.includes('git') && !normName.includes('hub')) return <SiGit className={`${className} text-[#F05032]`} />;
  if (normName.includes('github action')) return <SiGithubactions className={`${className} text-[#2088FF]`} />;
  if (normName.includes('docker')) return <SiDocker className={`${className} text-[#2496ED]`} />;

  if (normName.includes('gemini')) return <FaTerminal className={`${className} text-[#8E75FF]`} />;
  if (normName.includes('claude') || normName.includes('anthropic')) return <FaBrain className={`${className} text-[#D97706]`} />;
  if (normName.includes('chatgpt') || normName.includes('gpt') || normName.includes('openai')) return <SiOpenai className={`${className} text-[#10A37F]`} />;
  if (normName.includes('copilot')) return <FaRobot className={`${className} text-[#6E40C9]`} />;
  if (normName.includes('langchain')) return <FaLink className={`${className} text-[#1C3C3C] dark:text-[#38BDF8]`} />;

  return <FaCode className={`${className} text-cyan-500`} />;
};

export default SmartTechIcon;
