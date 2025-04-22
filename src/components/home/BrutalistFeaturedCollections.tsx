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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
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
      
      {/* Collections grid with brutalist styling */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {collections.map((collection) => (
          <motion.div 
            key={collection.id}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setHoveredId(collection.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative"
          >
            {/* Collection card with thick border and off-kilter rotation */}
            <Link 
              href={`/collection/${collection.slug}`}
              className="relative block h-[450px] border-4 border-white overflow-hidden transform hover:rotate-1 transition-transform"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-gray-800">
                <Image 
                  src={collection.image} 
                  alt={collection.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-90"
                />
                
                {/* Harsh overlay */}
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity"></div>
                
                {/* Diagonal stripes overlay */}
                <div 
                  className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_20px)] opacity-20 mix-blend-multiply pointer-events-none"
                ></div>
              </div>
              
              {/* Collection information */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white transform translate-y-[calc(100%-4rem)] group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black uppercase text-black tracking-tighter">{collection.name}</h3>
                  <div className="bg-black text-white p-2 border-2 border-black group-hover:bg-yellow-300 group-hover:text-black transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <p className="text-black font-mono text-sm mb-4 line-clamp-3">{collection.description}</p>
                <div className="inline-block bg-black text-white px-4 py-2 font-bold tracking-tight uppercase">
                  View Collection
                </div>
              </div>
              
              {/* Collection badge/sticker effect - appears at random rotation */}
              {collection.badge && (
                <div 
                  className="absolute top-6 right-6 bg-yellow-300 text-black px-4 py-2 font-black text-xl uppercase tracking-tighter border-2 border-black transform rotate-[10deg] rounded-full z-10"
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
          className="inline-flex items-center gap-2 text-white font-bold text-xl tracking-tight uppercase border-b-4 border-white hover:border-yellow-300 hover:text-yellow-300 transition-colors"
        >
          View All Collections
          <Plus size={20} />
        </Link>
      </div>
    </section>
  );
}

export default BrutalistFeaturedCollections; 