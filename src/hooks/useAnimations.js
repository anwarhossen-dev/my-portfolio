import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom hook for GSAP animations
export const useGSAP = (animationFn, dependencies = []) => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (element && animationFn) {
      const animation = animationFn(element);
      return () => {
        if (animation) {
          animation.kill();
        }
      };
    }
  }, dependencies);

  return ref;
};

// Scroll reveal animation
export const useScrollReveal = (options = {}) => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (element) {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 50,
          ...options.from
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            ...options.scrollTrigger
          },
          ...options.to
        }
      );
    }
  }, []);

  return ref;
};

// Stagger animation for multiple elements
export const useStaggerAnimation = (selector, options = {}) => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const elements = container.querySelectorAll(selector);
      
      gsap.fromTo(elements,
        {
          opacity: 0,
          y: 30,
          ...options.from
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse",
            ...options.scrollTrigger
          },
          ...options.to
        }
      );
    }
  }, [selector]);

  return containerRef;
};

// Typing animation
export const useTypingAnimation = (text, options = {}) => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (element && text) {
      element.textContent = '';
      
      gsap.to(element, {
        duration: text.length * 0.05,
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          const currentLength = Math.round(progress * text.length);
          element.textContent = text.substring(0, currentLength);
        },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
          ...options.scrollTrigger
        }
      });
    }
  }, [text]);

  return ref;
};