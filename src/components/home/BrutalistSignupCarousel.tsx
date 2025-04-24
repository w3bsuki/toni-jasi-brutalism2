"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Package, Clock, PercentCircle, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// The simplest, most reliable way to implement this
export function BrutalistSignupCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Items data
  const items = [
    {
      id: 1,
      icon: <Star className="w-5 h-5" />,
      text: "JOIN THE HAT GANG",
      cta: {
        text: "JOIN",
        url: "/signup"
      }
    },
    {
      id: 2,
      icon: <Package className="w-5 h-5" />,
      text: "FREE SHIPPING OVER $50",
      cta: {
        text: "SHOP",
        url: "/collections"
      }
    },
    {
      id: 3,
      icon: <PercentCircle className="w-5 h-5" />,
      text: "GET 15% OFF YOUR FIRST ORDER",
      cta: {
        text: "CLAIM",
        url: "/signup"
      }
    },
    {
      id: 4,
      icon: <Clock className="w-5 h-5" />,
      text: "LIMITED DROPS EVERY FRIDAY",
      cta: {
        text: "VIEW",
        url: "/collection/limited-edition"
      }
    }
  ];
  
  // Create carousel item component
  const CarouselItem = ({ item }: { item: typeof items[0] }) => (
    <div className="flex-shrink-0 inline-flex items-center mx-8">
      <div className="flex items-center mr-4">
        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-black text-yellow-300">
          {item.icon}
        </div>
        <span className="text-black font-black text-sm tracking-tight uppercase">
          {item.text}
        </span>
      </div>
      
      <Link 
        href={item.cta.url}
        className="relative overflow-hidden"
      >
        <motion.div
          initial="initial"
          whileHover="hover"
          className="relative"
        >
          <motion.div
            className="px-4 py-1 font-bold text-xs tracking-wider bg-black text-white border-2 border-black"
            variants={{
              initial: { 
                backgroundColor: "#000000",
                color: "#ffffff",
                scale: 1,
                rotate: 0
              },
              hover: { 
                backgroundColor: "#ffffff",
                color: "#000000",
                scale: [1, 1.05, 1],
                rotate: [-1, 1, 0],
                transition: { 
                  duration: 0.3,
                  ease: "easeOut",
                  scale: {
                    times: [0, 0.5, 1],
                    duration: 0.3
                  },
                  rotate: {
                    times: [0, 0.6, 1],
                    duration: 0.3
                  }
                }
              }
            }}
          >
            {item.cta.text}
          </motion.div>
        </motion.div>
      </Link>
      
      <div className="h-6 mx-8 border-r-2 border-black"></div>
    </div>
  );
  
  // Double the items for infinite scroll effect
  const allItems = [...items, ...items, ...items];
  
  return (
    <div 
      className="relative w-full border-b-4 border-black bg-yellow-300 py-2 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full overflow-hidden" style={{ height: '42px' }}>
        <motion.div
          className="whitespace-nowrap flex"
          animate={{
            x: isPaused ? "-0%" : "-33.33%"
          }}
          initial={{
            x: "-0%"
          }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {allItems.map((item, i) => (
            <CarouselItem key={`${item.id}-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
      
      {/* Edge fade effects */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-yellow-300 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-yellow-300 to-transparent z-10"></div>
    </div>
  );
}

export default BrutalistSignupCarousel; 