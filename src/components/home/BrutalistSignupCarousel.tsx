"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Instagram,
  Percent, 
  RotateCcw,
  Users,
  Bookmark,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';

export function BrutalistSignupCarousel() {
  // References to track the carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseVelocity = -1;
  const isPaused = useRef(false);
  const contentWidth = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const items = [
    { 
      icon: <Users className="w-5 h-5" />, 
      text: "JOIN THE GANG", 
      link: "/signup", 
      highlight: true,
      color: "bg-yellow-300"
    },
    { 
      icon: <Instagram className="w-5 h-5" />, 
      text: "FOLLOW ON INSTAGRAM", 
      link: "https://instagram.com",
      highlight: true,
      color: "bg-yellow-300"
    },
    { 
      icon: <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-black"
      >
        <path d="M19.321 5.562a5.122 5.122 0 0 1-3.664-1.514 5.12 5.12 0 0 1-1.514-3.664h-3.844v12.926c0 1.614-1.312 2.926-2.926 2.926a2.927 2.927 0 0 1-2.927-2.926 2.927 2.927 0 0 1 2.927-2.927c.323 0 .634.052.926.149V6.488a6.963 6.963 0 0 0-.926-.062C3.736 6.426 0 10.163 0 14.8c0 4.636 3.736 8.373 8.373 8.373 4.638 0 8.374-3.737 8.374-8.373V9.146a9.064 9.064 0 0 0 5.316 1.703v-3.844c-.94 0-1.84-.149-2.742-.443z"/>
      </svg>, 
      text: "FOLLOW ON TIKTOK", 
      link: "https://tiktok.com",
      highlight: true,
      color: "bg-yellow-300" 
    },
    { 
      icon: <Percent className="w-5 h-5" />, 
      text: "10% OFF FIRST ORDER", 
      link: "/discount",
      color: "bg-yellow-300" 
    },
    { 
      icon: <Bookmark className="w-5 h-5" />, 
      text: "LIMITED DROPS", 
      link: "/collections",
      color: "bg-yellow-300" 
    },
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      text: "FREE STICKERS", 
      link: "/stickers",
      color: "bg-yellow-300"
    }
  ];

  // Create duplicate sets of items for seamless looping
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  // Calculate content width once on mount
  useEffect(() => {
    if (carouselRef.current) {
      // Get width of a single set of items
      const singleSetWidth = carouselRef.current.scrollWidth / 4;
      contentWidth.current = singleSetWidth;
      
      // Start with x offset at exactly -1 set width for seamless loop
      x.set(-singleSetWidth);
    }
  }, []);
  
  useAnimationFrame((t, delta) => {
    if (isPaused.current || !carouselRef.current || contentWidth.current === 0) return;
    
    // Slower, smoother movement
    const moveBy = baseVelocity * (delta / 15);
    
    // Update the motion value
    x.set(x.get() + moveBy);
    
    // Reset when we've scrolled two content widths (one full loop)
    // This creates a truly seamless infinite loop
    if (x.get() <= -contentWidth.current * 2) {
      x.set(x.get() + contentWidth.current);
    }
  });

  function handleMouseEnter() {
    isPaused.current = true;
  }

  function handleMouseLeave() {
    isPaused.current = false;
    setHoveredIndex(null);
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="bg-black py-5 relative overflow-hidden"
      style={{ 
        margin: 0,
        padding: '1.25rem 0'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {/* Background pattern - removed repeating white lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full"></div>
      </div>
      
      {/* Remove all decorative elements */}
      
      <div className="overflow-hidden" ref={carouselRef}>
        <motion.div 
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {duplicatedItems.map((item, i) => (
            <Link 
              href={item.link} 
              key={i}
              target={item.text.includes("FOLLOW") ? "_blank" : undefined}
              rel={item.text.includes("FOLLOW") ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredIndex(i)} 
              onMouseLeave={() => setHoveredIndex(null)}
              className={`inline-flex items-center mx-10 group relative`}
            >
              <div className={`
                relative flex items-center
                ${hoveredIndex === i ? 'scale-105' : 'scale-100'} 
                transition-all duration-300
              `}>
                {/* Icon container with brutalist offset shadow */}
                <div className="relative mr-3">
                  <div className={`absolute inset-0 bg-yellow-300 transform translate-x-1 translate-y-1`}></div>
                  <div className="bg-yellow-300 text-black p-2 relative border border-black z-10 transition-all duration-300 ${hoveredIndex === i ? 'rotate-3' : ''}">
                    {item.icon}
                  </div>
                </div>
                
                {/* Text with potential highlight */}
                <span className={`
                  relative text-white group-hover:text-yellow-300 transition-colors
                  ${item.highlight ? 'font-black' : 'font-medium'}
                `}>
                  {item.text}
                  
                  {/* Animated underline on hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                </span>
                
                {/* Arrow indicator on hover */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div 
                      className="absolute -right-6 text-yellow-300"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BrutalistSignupCarousel; 