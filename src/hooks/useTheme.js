import { useState, useEffect } from 'react';
import { getThemePreference, setThemePreference } from '../utils';

/**
 * Custom hook for managing theme state
 * @returns {Object} - Theme state and toggle function
 */
export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = getThemePreference();
    setTheme(savedTheme);
    setThemePreference(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setThemePreference(newTheme);
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};