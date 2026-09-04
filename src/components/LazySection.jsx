import React, { useState, useEffect, useRef } from 'react';

export const LazySection = ({ children, height = '300px', rootMargin = '200px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;
    const element = containerRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? 'auto' : height }}>
      {isVisible ? children : <div style={{ height }} className="w-full" />}
    </div>
  );
};

export default LazySection;
