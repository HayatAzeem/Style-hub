import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RotateCcw, Headphones, Star, Zap, Award, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../components/ProductCard';
import ThreeBackground from '../components/ThreeBackground';
import ScrollAnimation from '../components/ScrollAnimations';
import ParallaxSection from '../components/ParallaxSection';
import AnimatedCounter from '../components/AnimatedCounter';
import MorphingButton from '../components/MorphingButton';
import FloatingElement from '../components/FloatingElements';
import Spline3DModel from '../components/Spline3DModel';
import Advanced3DScene from '../components/Advanced3DScene';
import Interactive3DCard from '../components/Interactive3DCard';
import Holographic3DDisplay from '../components/Holographic3DDisplay';
import Product3DViewer from '../components/Product3DViewer';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredProducts = products.filter(product => product.isFeatured);
  const newArrivals = products.filter(product => product.isNew);

  useEffect(() => {
    // Hero section animations
    const tl = gsap.timeline();
    
    tl.from('.hero-title', {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-buttons', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-3d', {
      duration: 1.5,
      scale: 0.8,
      opacity: 0,
      ease: 'power3.out'
    }, '-=1');

    // Parallax effect for hero background
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <ThreeBackground />
      
      {/* Hero Section with Spline 3D */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 opacity-90 dark:opacity-95"></div>
        
        {/* Advanced 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Advanced3DScene className="w-full h-full" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <FloatingElement delay={0} duration={8} amplitude={30} className="absolute top-20 left-10">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={2} duration={10} amplitude={40} className="absolute top-40 right-20">
            <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-15 blur-2xl"></div>
          </FloatingElement>
          <FloatingElement delay={4} duration={12} amplitude={25} className="absolute bottom-20 left-1/4">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur-xl"></div>
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.h1 
                className="hero-title text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                Discover Your
                <span className="block text-gradient-warm bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              >
                Explore our curated collection with immersive 3D experiences and cutting-edge fashion technology.
              </motion.p>
              
              <motion.div 
                className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                <MorphingButton variant="primary" size="lg">
                  <Link to="/products" className="flex items-center">
                    Shop in 3D
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </MorphingButton>
                
                <MorphingButton variant="ghost" size="lg">
                  <Link to="/products?category=dresses" className="flex items-center">
                    Virtual Try-On
                  </Link>
                </MorphingButton>
              </motion.div>
            </div>
            
            <motion.div 
              className="hero-3d relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="relative h-96">
                <Holographic3DDisplay className="w-full h-full" />
                
                {/* Floating stats */}
                <motion.div 
                  className="absolute -top-4 -left-4 glass rounded-xl p-4 text-white"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">4.9 Rating</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -right-4 glass rounded-xl p-4 text-white"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">50K+ Customers</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Interactive Cards Section */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Experience Fashion in 3D
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Immerse yourself in our revolutionary 3D shopping experience
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Interactive3DCard
                  title="Virtual Try-On"
                  description="See how clothes fit before you buy"
                  color="#3b82f6"
                  className="h-64"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Interactive3DCard
                  title="360° Product View"
                  description="Explore every detail in stunning 3D"
                  color="#ef4444"
                  className="h-64"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Interactive3DCard
                  title="AR Fitting Room"
                  description="Try on clothes in augmented reality"
                  color="#10b981"
                  className="h-64"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Interactive3DCard
                  title="Style Configurator"
                  description="Customize colors and materials in real-time"
                  color="#f59e0b"
                  className="h-64"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Stats Section */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 text-white relative overflow-hidden">
          <ParallaxSection speed={0.3}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="text-center" variants={itemVariants}>
                  <div className="mb-4">
                    <AnimatedCounter end={50000} suffix="+" className="text-4xl font-bold text-gradient" />
                  </div>
                  <p className="text-gray-300">Happy Customers</p>
                </motion.div>
                
                <motion.div className="text-center" variants={itemVariants}>
                  <div className="mb-4">
                    <AnimatedCounter end={1000} suffix="+" className="text-4xl font-bold text-gradient" />
                  </div>
                  <p className="text-gray-300">3D Products</p>
                </motion.div>
                
                <motion.div className="text-center" variants={itemVariants}>
                  <div className="mb-4">
                    <AnimatedCounter end={99} suffix="%" className="text-4xl font-bold text-gradient" />
                  </div>
                  <p className="text-gray-300">Satisfaction Rate</p>
                </motion.div>
                
                <motion.div className="text-center" variants={itemVariants}>
                  <div className="mb-4">
                    <AnimatedCounter end={24} suffix="/7" className="text-4xl font-bold text-gradient" />
                  </div>
                  <p className="text-gray-300">Support</p>
                </motion.div>
              </motion.div>
            </div>
          </ParallaxSection>
        </section>
      </ScrollAnimation>

      {/* 3D Product Showcase */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Interactive 3D Product Gallery
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience our products like never before with interactive 3D models
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Product3DViewer
                  productName="Premium Cotton T-Shirt"
                  productImage="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg"
                  className="w-full"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Product3DViewer
                  productName="Designer Denim Jeans"
                  productImage="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
                  className="w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Features Section */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="text-center group" variants={itemVariants}>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Free Shipping</h3>
                <p className="text-gray-600 dark:text-gray-400">Free shipping on orders over $50</p>
              </motion.div>
              
              <motion.div className="text-center group" variants={itemVariants}>
                <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Secure Payment</h3>
                <p className="text-gray-600 dark:text-gray-400">Your payment information is safe</p>
              </motion.div>
              
              <motion.div className="text-center group" variants={itemVariants}>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <RotateCcw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Easy Returns</h3>
                <p className="text-gray-600 dark:text-gray-400">30-day return policy</p>
              </motion.div>
              
              <motion.div className="text-center group" variants={itemVariants}>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Customer support anytime</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Featured Products */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-white dark:bg-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Featured Products
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover our hand-picked selection with enhanced 3D visualization
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="text-center">
              <MorphingButton variant="secondary" size="lg">
                <Link to="/products" className="flex items-center">
                  Explore 3D Catalog
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </MorphingButton>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* New Arrivals */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 relative">
          <ParallaxSection speed={0.2}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  New Arrivals in 3D
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Stay ahead of the trends with our latest collection in immersive 3D
                </motion.p>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {newArrivals.map((product, index) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ParallaxSection>
        </section>
      </ScrollAnimation>

      {/* Categories */}
      <ScrollAnimation animation="fadeInUp">
        <section className="py-20 bg-white dark:bg-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Shop by Category
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Find exactly what you're looking for in our organized 3D categories
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { name: 'Tops', image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800', path: '/products?category=tops' },
                { name: 'Bottoms', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', path: '/products?category=bottoms' },
                { name: 'Dresses', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800', path: '/products?category=dresses' },
                { name: 'Outerwear', image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800', path: '/products?category=outerwear' }
              ].map((category, index) => (
                <motion.div key={category.name} variants={itemVariants}>
                  <Link
                    to={category.path}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 block"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300">
                        {category.name}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
};

export default Home;