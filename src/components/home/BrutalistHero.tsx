"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";

// Hero carousel images
const CAROUSEL_IMAGES = [
  {
    src: "/images/hats/placeholder1.jpg",
    alt: "Urban street style with bucket hat",
    caption: "STREET CRED",
  },
  {
    src: "/images/hats/placeholder1.jpg", 
    alt: "Festival vibes with bucket hat",
    caption: "FESTIVAL READY",
  },
  {
    src: "/images/hats/placeholder1.jpg",
    alt: "Skate park with bucket hat",
    caption: "SKATE CULTURE",
  }
];

// Marquee text for brutalist design
const MARQUEE_TEXT = "LIMITED DROPS • EXCLUSIVE STYLES • URBAN CLASSICS • ";

interface BrutalistHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function BrutalistHero({
  title = "BUCKET HATS",
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
      {/* Brutalist marquee - top scrolling text */}
      <div className="relative overflow-hidden h-[30px] bg-white text-black border-b-4 border-black z-10">
        <div className="absolute whitespace-nowrap animate-marquee flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-lg font-black uppercase tracking-tighter mr-4">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Main hero area with carousel */}
      <div className="relative h-[650px] w-full">
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
                  />
                  
                  {/* Caption marker for each slide */}
                  <div className="absolute left-8 top-8 bg-white text-black p-1 px-4 font-mono text-sm rotate-[2deg] z-10">
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

        {/* Brutalist navigation controls */}
        <div className="absolute left-6 right-6 bottom-1/2 flex justify-between items-center z-20">
          <button
            onClick={prevSlide}
            className="w-12 h-12 flex items-center justify-center bg-white hover:bg-yellow-300 text-black border-4 border-black transform hover:rotate-[-2deg] transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 flex items-center justify-center bg-white hover:bg-yellow-300 text-black border-4 border-black transform hover:rotate-[2deg] transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Brutalist content */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          {/* Progress indicators */}
          <div className="flex w-full h-2 mb-8">
            {CAROUSEL_IMAGES.map((_, index) => (
              <div 
                key={index} 
                className={`h-full flex-1 mx-[2px] ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          {/* Main content */}
          <div className="px-8 pb-16 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-[8rem] font-black uppercase leading-none tracking-tighter text-white mix-blend-difference">
                {title}
              </h1>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-6">
                <p className="text-2xl font-mono text-white max-w-md">{subtitle}</p>
                
                <Link href={ctaLink} className="group">
                  <div className="bg-yellow-300 hover:bg-white text-black px-8 py-4 border-4 border-black font-black text-xl tracking-tight flex items-center transition-all transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    {ctaText}
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrutalistHero; 