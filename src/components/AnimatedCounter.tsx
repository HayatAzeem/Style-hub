import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    const animation = gsap.to({ value: 0 }, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: function() {
        setCount(Math.round(this.targets()[0].value));
      },
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    return () => {
      animation.kill();
    };
  }, [end, duration]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;