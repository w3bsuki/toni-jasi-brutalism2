"use client";

import { useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Truck, 
  Percent, 
  RotateCcw,
  Users,
  Bookmark
} from 'lucide-react';

export function BrutalistSignupCarousel() {
  // References to track the carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseVelocity = -1;
  const isPaused = useRef(false);
  const contentWidth = useRef(0);
  
  const items = [
    { 
      icon: <Users className="w-5 h-5" />, 
      text: "JOIN THE GANG", 
      link: "/signup", 
      highlight: true 
    },
    { 
      icon: <Truck className="w-5 h-5" />, 
      text: "FREE SHIPPING", 
      link: "/shipping" 
    },
    { 
      icon: <Percent className="w-5 h-5" />, 
      text: "10% OFF FIRST ORDER", 
      link: "/discount" 
    },
    { 
      icon: <RotateCcw className="w-5 h-5" />, 
      text: "30-DAY RETURNS", 
      link: "/returns" 
    },
    { 
      icon: <Bookmark className="w-5 h-5" />, 
      text: "LIMITED DROPS", 
      link: "/collections" 
    },
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      text: "FREE STICKERS", 
      link: "/stickers" 
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
  }

  return (
    <div 
      className="bg-black border-b-4 border-white py-3 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-1/4 w-8 h-[4px] bg-white"></div>
      
      <div className="overflow-hidden" ref={carouselRef}>
        <motion.div 
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {duplicatedItems.map((item, i) => (
            <Link 
              href={item.link} 
              key={i} 
              className={`inline-flex items-center mx-8 text-white hover:text-yellow-300 transition-colors ${item.highlight ? 'font-black' : 'font-medium'}`}
            >
              <span className="bg-yellow-300 text-black p-2 mr-3">{item.icon}</span>
              <span>{item.text}</span>
              {item.highlight && (
                <span className="ml-2 bg-yellow-300 text-black px-1 text-xs font-mono">NEW</span>
              )}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default BrutalistSignupCarousel; 