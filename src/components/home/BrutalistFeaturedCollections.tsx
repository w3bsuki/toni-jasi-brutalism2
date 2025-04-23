"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Collection } from "@/lib/types";

interface BrutalistFeaturedCollectionsProps {
  title?: string;
  collections: Collection[];
}

export function BrutalistFeaturedCollections({
  title = "EXPLORE COLLECTIONS",
  collections = [],
}: BrutalistFeaturedCollectionsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
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
        delayChildren: 0.2
      }
    }
  };

  // Item animations
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="relative w-full bg-black py-16 px-6">
      {/* Section title with brutalist style */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="inline-block text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2 relative">
          {title}
          <div className="absolute h-4 w-full bg-yellow-300 -bottom-1 left-0 z-0"></div>
        </h2>
      </div>
      
      {/* Collections grid with brutalist styling - exactly 3 cards per row with optimized responsive layout */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {collections.map((collection) => (
          <motion.div 
            key={collection.id}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            {/* Collection card with thick border and perfect hover animation */}
            <Link 
              href={`/collection/${collection.slug}`}
              className="relative block h-[400px] md:h-[450px] border-4 border-white hover:border-yellow-300 overflow-hidden transition-all duration-300 transform-gpu hover:-translate-y-2 hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,0.9)] will-change-transform"
            >
              {/* Image with fallback */}
              <div className="absolute inset-0 bg-gray-800">
                <Image 
                  src={collection.image || "/images/hats/placeholder1.jpg"} 
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
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white transform translate-y-[calc(100%-4.5rem)] group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1.1,0.3,1)] will-change-transform">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black uppercase text-black tracking-tighter truncate pr-2">{collection.name}</h3>
                  <div className="flex-shrink-0 bg-black text-white p-2 border-2 border-black transform rotate-0 group-hover:rotate-45 group-hover:bg-yellow-300 group-hover:text-black transition-all duration-300 ease-out will-change-transform">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <p className="text-black font-mono text-sm mb-4 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{collection.description}</p>
                <div className="inline-block bg-black text-white px-4 py-2 font-bold tracking-tight uppercase transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 ease-out will-change-transform hover:bg-yellow-300 hover:text-black border-2 border-black">
                  View Collection
                </div>
              </div>
              
              {/* Collection badge/sticker effect - perfect animation */}
              {collection.badge && (
                <div 
                  className="absolute top-6 right-6 bg-yellow-300 text-black px-4 py-2 font-black text-xl uppercase tracking-tighter border-2 border-black transform rotate-[10deg] group-hover:rotate-[5deg] group-hover:scale-110 rounded-full z-10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
                >
                  {collection.badge}
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>
      
      {/* View all collections link with brutalist design */}
      <div className="flex justify-center mt-12">
        <Link 
          href="/collections" 
          className="group inline-flex items-center gap-2 text-white font-bold text-xl tracking-tight uppercase border-b-4 border-white hover:border-yellow-300 hover:text-yellow-300 transition-colors duration-300"
        >
          View All Collections
          <Plus size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}

export default BrutalistFeaturedCollections; 