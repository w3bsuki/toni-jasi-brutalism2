"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Hero carousel images
const CAROUSEL_IMAGES = [
  {
    src: "/images/hats/placeholder.jpg",
    alt: "Urban street style with bucket hat",
    caption: "STREET CRED",
  },
  {
    src: "/images/hats/placeholder1.jpg", 
    alt: "Festival vibes with bucket hat",
    caption: "FESTIVAL READY",
  },
  {
    src: "/images/hats/placeholder.jpg",
    alt: "Skate park with bucket hat",
    caption: "SKATE CULTURE",
  }
];

interface BrutalistHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function BrutalistHero({
  title = "ХУЛИГАНКА",
  subtitle = "Bold designs for the streets.",
  ctaText = "SHOP NOW",
  ctaLink = "/collections/bucket-hats"
}: BrutalistHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  // Handle carousel navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  }, []);

  // Set up autoplay
  useEffect(() => {
    setIsLoaded(true);
    
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(nextSlide, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, nextSlide]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section 
      className="relative w-full bg-black overflow-hidden border-b-4 border-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main hero area with carousel */}
      <div className="relative h-[450px] sm:h-[550px] md:h-[650px] w-full">
        {/* Carousel container */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {CAROUSEL_IMAGES.map((image, index) => (
              index === currentSlide && (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    className="object-cover brightness-[0.8]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  />
                  
                  {/* Caption marker for each slide */}
                  <div className="absolute left-3 sm:left-8 top-4 sm:top-8 bg-white text-black p-1 px-2 sm:px-4 font-mono text-xs sm:text-sm rotate-[2deg] z-10">
                    <span className="font-bold">{image.caption}</span>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Glitch/noise overlay for brutalist effect */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Brutalist navigation controls - positioned in the center */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center z-20 px-3 sm:px-6">
          <button
            onClick={prevSlide}
            className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-white hover:bg-yellow-300 text-black border-2 sm:border-4 border-black transform hover:rotate-[-2deg] transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="sm:hidden" />
            <ChevronLeft size={24} className="hidden sm:block" />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-white hover:bg-yellow-300 text-black border-2 sm:border-4 border-black transform hover:rotate-[2deg] transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="sm:hidden" />
            <ChevronRight size={24} className="hidden sm:block" />
          </button>
        </div>

        {/* Brutalist content */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          {/* Main content */}
          <div className="px-4 sm:px-8 pb-8 sm:pb-16 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-end h-full"
            >
              <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[8rem] font-black uppercase leading-none tracking-tighter text-white mix-blend-difference mb-2 sm:mb-4">
                {title}
              </h1>
              
              <div className="flex flex-col md:flex-row items-start gap-3 sm:gap-6">
                <p className="text-lg sm:text-xl md:text-2xl font-mono text-white max-w-md mb-4 md:mb-0">{subtitle}</p>
                
                <Link 
                  href={ctaLink} 
                  className="relative group"
                >
                  <div className="bg-yellow-300 text-black px-4 sm:px-8 py-2 sm:py-4 border-2 sm:border-4 border-white font-black text-base sm:text-xl tracking-tight flex items-center relative z-10 transition-all duration-300 group-hover:rotate-2 group-hover:bg-white group-hover:border-yellow-300">
                    {ctaText}
                    <ArrowRight className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="absolute inset-0 border-2 sm:border-4 border-black bg-black z-0 opacity-0 group-hover:opacity-100 group-hover:rotate-[-1deg] transition-all duration-300"></div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress indicators - Black line with indicators */}
      <div className="w-full h-2 sm:h-3 bg-black border-t-2 border-black z-20">
        <div className="flex w-full h-full">
          {CAROUSEL_IMAGES.map((_, index) => (
            <div 
              key={index} 
              className={`h-full flex-1 ${index === currentSlide ? 'bg-white' : 'bg-gray-600'} cursor-pointer transition-colors duration-300`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrutalistHero; 