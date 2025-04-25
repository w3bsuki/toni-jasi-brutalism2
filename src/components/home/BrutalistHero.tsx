"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BrutalistHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function BrutalistHero({ 
  title = "ХУЛИГАНКА", 
  subtitle = "Limited drops, unlimited style.", 
  ctaText = "SHOP NOW", 
  ctaLink = "/shop" 
}: BrutalistHeroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Skip loading animation in development mode hot reloads
  useEffect(() => {
    const inDevMode = process.env.NODE_ENV === 'development';
    const skipAnimation = sessionStorage.getItem('skipHeroAnimation') === 'true';
    
    if (inDevMode && skipAnimation) {
      setIsLoading(false);
      return;
    }
    
    if (inDevMode) {
      sessionStorage.setItem('skipHeroAnimation', 'true');
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const images = useMemo(() => [
    {
      src: "/images/hats/placeholder.jpg",
      alt: "Brutalist Hat 1",
      caption: "01"
    },
    {
      src: "/images/hats/placeholder1.jpg",
      alt: "Brutalist Hat 2",
      caption: "02"
    },
    {
      src: "/images/hats/placeholder.jpg",
      alt: "Brutalist Hat 3",
      caption: "03"
    },
    {
      src: "/images/hats/placeholder1.jpg",
      alt: "Brutalist Hat 4",
      caption: "04"
    }
  ], []);

  const nextImage = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay effect
  useEffect(() => {
    if (isLoading) return;
    
    const intervalId = setInterval(() => {
      nextImage();
    }, 6000);
    
    return () => clearInterval(intervalId);
  }, [isLoading, nextImage]);

  // Left image index
  const leftIndex = useMemo(() => {
    return currentIndex;
  }, [currentIndex]);

  // Right image index
  const rightIndex = useMemo(() => {
    return (currentIndex + 1) % images.length;
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full h-[700px] overflow-hidden border-b-4 border-white bg-grid-pattern">
      {/* Decorative elements */}
      <div className="absolute top-0 left-8 h-3 w-12 bg-yellow-300 z-10"></div>
      <div className="absolute bottom-0 right-10 h-3 w-16 bg-yellow-300 z-10"></div>
      <div className="absolute top-1/4 left-24 h-8 w-1 bg-white z-10"></div>
      <div className="absolute bottom-1/4 right-16 h-6 w-1 bg-white z-10"></div>
      
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="absolute inset-0 bg-black z-50 flex flex-col justify-center items-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-3/4 max-w-lg h-1.5 bg-gray-800 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="h-full bg-yellow-300"
                initial={{ width: '0%' }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </motion.div>
            
            <motion.div 
              className="mt-4 text-yellow-300 font-mono text-xs tracking-widest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              LOADING BRUTALIST EXPERIENCE... {Math.floor(loadingProgress)}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main hero grid */}
      <div className="absolute inset-0 grid grid-cols-3 h-full">
        {/* Left column - Image */}
        <div className="relative overflow-hidden h-full border-r-4 border-white">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-4 bg-black text-white text-lg font-bold p-1 shadow-md z-20">
            {images[leftIndex].caption}
          </div>
          <Image
            src={images[leftIndex].src}
            alt={images[leftIndex].alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={95}
          />
        </div>
        
        {/* Middle column - Black with text */}
        <div className="flex flex-col justify-center items-center bg-black px-4 relative overflow-hidden">
          {/* Decorative elements - minimal and clean */}
          <div className="absolute top-12 right-4 h-20 w-1 bg-yellow-300 opacity-70"></div>
          <div className="absolute bottom-[60px] left-4 h-20 w-1 bg-yellow-300 opacity-70"></div>
          
          {/* Brand logo/text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLoading ? 1.0 : 0, duration: 0.5 }}
            className="mb-2"
          >
            <div className="bg-yellow-300 px-3 py-1">
              <span className="text-black text-xs font-mono tracking-widest">ESTABLISHED 2023</span>
            </div>
          </motion.div>
          
          {/* Main title and subtitle */}
          <motion.h1 
            className="text-white text-center font-black text-7xl tracking-tighter leading-none mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLoading ? 1.2 : 0, duration: 0.5 }}
          >
            {title}
          </motion.h1>
          
          <motion.p
            className="text-yellow-300 text-center font-medium mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLoading ? 1.4 : 0.1, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLoading ? 1.6 : 0.2, duration: 0.5 }}
          >
            <Link 
              href={ctaLink}
              className="group relative inline-block"
            >
              <div className="relative border-2 border-white px-10 py-4 bg-black text-yellow-300 font-black tracking-widest text-sm inline-block transition-all duration-300 ease-out">
                {ctaText}
                <span className="absolute left-0 top-0 h-full w-1 bg-white transition-all duration-300 ease-out group-hover:h-0"></span>
                <span className="absolute right-0 bottom-0 h-full w-1 bg-white transition-all duration-300 ease-out group-hover:h-0"></span>
                <span className="absolute bottom-[-2px] left-1 w-full h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-0"></span>
                <span className="absolute top-[-2px] right-1 w-full h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-0"></span>
              </div>
            </Link>
          </motion.div>
        </div>
        
        {/* Right column - Image */}
        <div className="relative overflow-hidden h-full border-l-4 border-white">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 right-4 bg-black text-white text-lg font-bold p-1 shadow-md z-20">
            {images[rightIndex].caption}
          </div>
          <Image
            src={images[rightIndex].src}
            alt={images[rightIndex].alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={95}
          />
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        <button 
          onClick={prevImage}
          className="bg-black text-white p-2 font-bold border-2 border-white hover:bg-white hover:text-black transition-colors duration-300"
          aria-label="Previous image"
        >
          <motion.span 
            whileHover={{ x: -2 }} 
            className="inline-block"
          >
            ←
          </motion.span>
        </button>
        <button 
          onClick={nextImage}
          className="bg-black text-white p-2 font-bold border-2 border-white hover:bg-white hover:text-black transition-colors duration-300"
          aria-label="Next image"
        >
          <motion.span 
            whileHover={{ x: 2 }} 
            className="inline-block"
          >
            →
          </motion.span>
        </button>
      </div>
    </div>
  );
}

export default BrutalistHero; 