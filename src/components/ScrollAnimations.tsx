import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 1,
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationProps: gsap.TweenVars = {};

    switch (animation) {
      case 'fadeInUp':
        gsap.set(element, { opacity: 0, y: 50 });
        animationProps = { opacity: 1, y: 0 };
        break;
      case 'slideInLeft':
        gsap.set(element, { opacity: 0, x: -100 });
        animationProps = { opacity: 1, x: 0 };
        break;
      case 'slideInRight':
        gsap.set(element, { opacity: 0, x: 100 });
        animationProps = { opacity: 1, x: 0 };
        break;
      case 'scaleIn':
        gsap.set(element, { opacity: 0, scale: 0.8 });
        animationProps = { opacity: 1, scale: 1 };
        break;
      case 'rotateIn':
        gsap.set(element, { opacity: 0, rotation: -180, scale: 0.5 });
        animationProps = { opacity: 1, rotation: 0, scale: 1 };
        break;
    }

    gsap.to(element, {
      ...animationProps,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimation;