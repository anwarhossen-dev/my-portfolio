/**
 * Global error handler for development
 */

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent the default browser behavior
  event.preventDefault();
});

// Handle global errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Console warning suppression for development
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    // Suppress specific React DevTools warnings
    if (
      args[0] && 
      typeof args[0] === 'string' && 
      args[0].includes('Download the React DevTools')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export default {};