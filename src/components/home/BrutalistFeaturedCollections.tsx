"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, BadgeCheck, ChevronRight, TagIcon } from "lucide-react";
import { Collection } from "@/lib/types";

interface BrutalistFeaturedCollectionsProps {
  title?: string;
  collections: Collection[];
}

export function BrutalistFeaturedCollections({
  title = "SHOP BY STYLE",
  collections = [],
}: BrutalistFeaturedCollectionsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Container animations for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  // Item animations
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Title animation
  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.2
      }
    }
  };

  // Link button animation
  const linkVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.7
      }
    }
  };

  return (
    <section className="relative w-full bg-black py-24 px-6 overflow-hidden">
      {/* Diagonal lines background pattern - brutalist style */}
      <div className="absolute inset-0 z-0 opacity-15">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Decorative elements - enhanced */}
      <div className="absolute top-0 left-0 w-full h-6 bg-yellow-300"></div>
      <div className="absolute bottom-0 right-0 w-full h-6 bg-yellow-300"></div>
      
      {/* Section title with brutalist style - enhanced and centered */}
      <motion.div 
        className="max-w-7xl mx-auto mb-20 relative z-10 flex justify-center"
        variants={titleVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-yellow-300 rotate-2 z-0"></div>
          <div className="absolute -inset-2 bg-black -rotate-1 translate-x-1 translate-y-1 z-0"></div>
          <h2 className="relative inline-block text-5xl md:text-7xl font-black text-white uppercase tracking-tighter px-6 py-4 bg-black border-4 border-yellow-300 z-10 shadow-[6px_6px_0px_0px_rgba(253,224,71,0.8)]">
            {title}
            <div 
              className="absolute -top-5 -right-5 bg-yellow-300 text-black font-black text-base uppercase px-4 py-2 rotate-[-6deg] border-3 border-black z-20 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]"
            >
              FEATURED
            </div>
          </h2>
        </div>
      </motion.div>
      
      {/* Collections grid with brutalist styling - exactly 3 cards per row with optimized responsive layout */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {collections.slice(0, 3).map((collection) => (
          <motion.div 
            key={collection.id}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="group relative"
            onMouseEnter={() => setHoveredItem(collection.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Collection card with thick border and perfect hover animation */}
            <Link 
              href={`/collection/${collection.slug}`}
              className="relative block h-[400px] md:h-[450px] overflow-hidden transition-all duration-300 transform-gpu will-change-transform"
            >
              {/* Offset background for brutalist effect */}
              <div className="absolute inset-0 border-4 border-black bg-yellow-300 transform translate-x-2 translate-y-2 z-0"></div>
              
              {/* Main card */}
              <div className="absolute inset-0 border-4 border-white hover:border-yellow-300 overflow-hidden z-10 bg-gray-800 transform group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-300">
                {/* Image with fallback */}
                <div className="absolute inset-0">
                  <Image 
                    src={collection.image || "/images/hats/placeholder.jpg"} 
                    alt={collection.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out scale-100 group-hover:scale-105 will-change-transform"
                  />
                  
                  {/* Harsh overlay with smoother transition */}
                  <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300 ease-in-out"></div>
                  
                  {/* Diagonal stripes overlay with hover effect */}
                  <div 
                    className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_20px)] opacity-20 group-hover:opacity-5 mix-blend-multiply pointer-events-none transition-opacity duration-300"
                  ></div>
                </div>
                
                {/* Collection information - perfect animation with custom easing */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t-4 border-black transform translate-y-[calc(100%-4.5rem)] group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1.1,0.3,1)] will-change-transform">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black uppercase text-black tracking-tighter truncate pr-2">{collection.name}</h3>
                    <div className="flex-shrink-0 bg-black text-white p-2 border-2 border-black transform rotate-0 group-hover:rotate-45 group-hover:bg-yellow-300 group-hover:text-black transition-all duration-300 ease-out will-change-transform">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <p className="text-black font-mono text-sm mb-4 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{collection.description}</p>
                  <button className="inline-flex bg-black text-white px-3 py-1.5 font-bold tracking-tight uppercase transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 ease-out will-change-transform hover:bg-yellow-300 hover:text-black border-2 border-black items-center text-sm">
                    View Collection
                    <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Collection badge/sticker effect - perfect animation */}
                {collection.badge && (
                  <div 
                    className="absolute top-6 right-6 bg-yellow-300 text-black px-4 py-2 font-black text-xl uppercase tracking-tighter border-3 border-black transform rotate-[10deg] group-hover:rotate-[5deg] group-hover:scale-110 z-10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
                  >
                    {collection.badge}
                    <BadgeCheck className="w-5 h-5 text-black" />
                  </div>
                )}
              </div>
              
              {/* Pulse effect on hover */}
              {hoveredItem === collection.id && (
                <motion.div 
                  className="absolute inset-0 bg-yellow-300 rounded-full opacity-0 z-5"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: 1.2, 
                    opacity: 0,
                    transition: { duration: 1, repeat: Infinity }
                  }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>
      
      {/* View all collections link with brutalist design */}
      <motion.div 
        className="flex justify-center mt-20"
        variants={linkVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <Link 
          href="/collections" 
          className="relative group inline-flex items-center"
        >
          <div className="bg-black text-white px-8 py-4 font-black uppercase flex items-center gap-2 border-4 border-yellow-300 transform group-hover:translate-x-[-6px] group-hover:translate-y-[-6px] group-hover:bg-yellow-300 group-hover:text-black transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(253,224,71,0.8)]">
            <span>View All Collections</span>
            <Plus size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <div className="absolute inset-0 border-4 border-black translate-x-3 translate-y-3 -z-10 bg-yellow-300"></div>
        </Link>
      </motion.div>
    </section>
  );
}

export default BrutalistFeaturedCollections; 