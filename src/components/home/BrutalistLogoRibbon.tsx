"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function BrutalistLogoRibbon() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const brands = [
    "Nike",
    "Adidas",
    "Supreme",
    "New Era",
    "Vans",
    "ХУЛИГАНКА",
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Individual logo animation
  const logoVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="w-full py-12 px-6 bg-white">
      {/* Title with brutalist style */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h3 className="inline-block text-2xl md:text-3xl font-black uppercase tracking-tighter relative">
          BRANDS WE CARRY
          <div className="absolute h-3 w-4/5 bg-yellow-300 -bottom-1 left-1/2 -translate-x-1/2 z-0"></div>
        </h3>
      </div>

      {/* Logo ribbon with horizontal scrolling on mobile */}
      <motion.div 
        className="max-w-7xl mx-auto overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between py-5 md:py-8 border-t-4 border-b-4 border-black px-4">
          {brands.map((brand, index) => (
            <React.Fragment key={brand}>
              <motion.div 
                className="flex-shrink-0 px-4 md:px-6 my-4 md:my-0"
                variants={logoVariants}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-24 h-16 md:w-32 md:h-20 relative ${brand !== "ХУЛИГАНКА" ? "grayscale hover:grayscale-0" : ""} transition-all duration-300 flex items-center justify-center`}>
                  <div className={`w-full h-full ${brand === "ХУЛИГАНКА" ? "text-yellow-500" : "text-black hover:text-yellow-500"} transition-colors duration-300 flex items-center justify-center`}>
                    <div className={`flex items-center font-bold text-lg md:text-xl uppercase tracking-tighter text-center ${brand !== "ХУЛИГАНКА" ? "line-through" : ""}`}>
                      {brand}
                      {brand === "ХУЛИГАНКА" && (
                        <span className="inline-flex ml-2">
                          <CheckCircle className="w-6 h-6 text-black fill-yellow-400 stroke-[3px]" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Add separators between logos */}
              {index < brands.length - 1 && (
                <span className="hidden md:block h-8 w-1 bg-black transform rotate-12"></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
      
      {/* Brutalist design element - angled yellow bar */}
      <div className="max-w-7xl mx-auto relative h-3 mt-1">
        <div className="absolute left-0 w-1/3 h-full bg-yellow-300 transform -skew-x-12"></div>
        <div className="absolute right-0 w-1/4 h-full bg-yellow-300 transform skew-x-12"></div>
      </div>
    </section>
  );
}

export default BrutalistLogoRibbon; 