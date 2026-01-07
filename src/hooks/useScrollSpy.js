import { useState, useEffect } from 'react';
import { debounce } from '../utils';

/**
 * Custom hook for scroll spy functionality
 * @param {Array} sectionIds - Array of section IDs to track
 * @param {number} offset - Offset from top for active section detection
 * @returns {string} - Currently active section ID
 */
export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};