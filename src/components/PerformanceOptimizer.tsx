import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkRequests: number;
}

const PerformanceOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkRequests: 0
  });

  useEffect(() => {
    // Performance monitoring
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          setMetrics(prev => ({
            ...prev,
            loadTime: navEntry.loadEventEnd - navEntry.loadEventStart
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });

    // Memory usage monitoring
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memoryInfo.usedJSHeapSize / 1024 / 1024 // MB
      }));
    }

    return () => observer.disconnect();
  }, []);

  // Image lazy loading optimization
  useEffect(() => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, []);

  // Preload critical resources
  useEffect(() => {
    const preloadCriticalResources = () => {
      const criticalImages = [
        'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();
  }, []);

  return null; // This component doesn't render anything visible
};

export default PerformanceOptimizer;