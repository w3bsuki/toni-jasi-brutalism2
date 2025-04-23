"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Package, Clock, PercentCircle } from "lucide-react";

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

// Marquee items for bottom brutalist banner
const MARQUEE_ITEMS = [
  {
    icon: <Star className="w-5 h-5" />,
    text: "JOIN THE HAT GANG",
    linkText: "JOIN",
    linkUrl: "/signup"
  },
  {
    icon: <Package className="w-5 h-5" />,
    text: "FREE SHIPPING OVER $50",
    linkText: "SHOP",
    linkUrl: "/collections"
  },
  {
    icon: <PercentCircle className="w-5 h-5" />,
    text: "GET 15% OFF YOUR FIRST ORDER",
    linkText: "CLAIM", 
    linkUrl: "/signup"
  },
  {
    icon: <Clock className="w-5 h-5" />,
    text: "LIMITED DROPS EVERY FRIDAY",
    linkText: "VIEW",
    linkUrl: "/collection/limited-edition"
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

        {/* Brutalist navigation controls - positioned in the center */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center z-20 px-6">
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
          {/* Main content */}
          <div className="px-8 pb-16 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-end h-full"
            >
              <h1 className="text-[8rem] font-black uppercase leading-none tracking-tighter text-white mix-blend-difference mb-10">
                {title}
              </h1>
              
              <div className="flex flex-col md:flex-row items-start gap-8">
                <p className="text-2xl font-mono text-white max-w-md mb-6 md:mb-0">{subtitle}</p>
                
                <Link href={ctaLink} className="group relative">
                  <motion.div 
                    className="bg-yellow-300 text-black px-8 py-4 border-4 border-white font-black text-xl tracking-tight flex items-center relative z-10"
                    whileHover="hover"
                    initial="initial"
                    variants={{
                      initial: { 
                        x: 0, 
                        y: 0,
                        backgroundColor: "#fde047", // yellow-300
                        borderColor: "#ffffff" // white border
                      },
                      hover: { 
                        x: -5, 
                        y: -5,
                        backgroundColor: "#ffffff",
                        borderColor: "#fde047", // yellow border on hover instead of black
                        transition: { 
                          duration: 0.2, 
                          ease: "easeOut" 
                        }
                      }
                    }}
                  >
                    {ctaText}
                    <motion.div
                      variants={{
                        initial: { x: 0 },
                        hover: { 
                          x: 6,
                          transition: { 
                            duration: 0.3, 
                            ease: "easeOut",
                            delay: 0.1
                          }
                        }
                      }}
                    >
                      <ArrowRight className="ml-3" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0 border-4 border-black bg-black z-0"
                    variants={{
                      initial: { 
                        opacity: 0,
                        x: 0,
                        y: 0
                      },
                      hover: { 
                        opacity: 1,
                        x: 2,
                        y: 2,
                        transition: { 
                          duration: 0.15
                        }
                      }
                    }}
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress indicators - Black line with indicators */}
      <div className="w-full h-2 border-t-2 border-black z-20">
        <div className="flex w-full h-full">
          {CAROUSEL_IMAGES.map((_, index) => (
            <div 
              key={index} 
              className={`h-full flex-1 ${index === currentSlide ? 'bg-white' : 'bg-white/50'} cursor-pointer`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Bottom marquee banner */}
      <div className="relative w-full border-t-4 border-b-4 border-black overflow-hidden bg-yellow-300 py-3">
        <div className="w-full overflow-hidden flex items-center" style={{ height: '42px' }}>
          <div className="flex whitespace-nowrap marquee items-center">
            {[...Array(8)].map((_, repeat) => (
              MARQUEE_ITEMS.map((item, idx) => (
                <div 
                  key={`${idx}-${repeat}`} 
                  className="inline-flex items-center mx-8 shrink-0"
                >
                  <div className="flex items-center mr-4">
                    <div className="w-8 h-8 mr-3 flex items-center justify-center bg-black text-yellow-300">
                      {item.icon}
                    </div>
                    <span className="text-black font-black text-sm tracking-tight uppercase">
                      {item.text}
                    </span>
                  </div>
                  
                  <Link 
                    href={item.linkUrl}
                    className="relative flex items-center"
                  >
                    <div className="px-4 py-1 font-bold text-xs tracking-wider bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors duration-150">
                      {item.linkText}
                    </div>
                  </Link>
                  
                  {/* Add visual separator between items */}
                  <div className="h-6 mx-8 border-r-2 border-black flex items-center"></div>
                </div>
              ))
            ))}
          </div>
        </div>
        
        {/* Edge fade effects */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-yellow-300 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-yellow-300 to-transparent z-10"></div>

        <style jsx>{`
          .marquee {
            animation: marquee 60s linear infinite;
          }
          
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .w-full:hover .marquee {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}

export default BrutalistHero; 