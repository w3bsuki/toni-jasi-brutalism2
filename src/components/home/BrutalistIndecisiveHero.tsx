"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronRight } from "lucide-react";

interface BrutalistIndecisiveHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  leftHat?: {
    name: string;
    image: string;
    link: string;
  };
  rightHat?: {
    name: string;
    image: string;
    link: string;
  };
}

export function BrutalistIndecisiveHero({ 
  title = "INDECISIVE WEAR", 
  subtitle = "Two options. One decision. No regrets.", 
  ctaText = "SHOP NOW", 
  ctaLink = "/shop",
  leftHat = {
    name: "Classic Baseball Cap",
    image: "/images/hats/placeholder1.jpg",
    link: "/product/classic-baseball-cap"
  },
  rightHat = {
    name: "Vintage Dad Hat",
    image: "/images/hats/placeholder.jpg",
    link: "/product/vintage-dad-hat"
  }
}: BrutalistIndecisiveHeroProps) {
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const subtitleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5
      }
    }
  };

  const ctaVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.7
      }
    }
  };

  const blinkVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        repeatDelay: 3,
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  
  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden border-b-4 border-black bg-white">
      {/* Background diagonal pattern */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_1px,transparent_1px,transparent_15px)]"></div>
      </div>

      {/* Main hero grid - optimized for mobile and desktop layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        
        {/* Left column - First hat option - hidden on mobile */}
        <motion.div 
          className="relative overflow-hidden h-[0px] md:h-full border-r-0 md:border-r-4 border-black md:block hidden" 
          onMouseEnter={() => setHoverSide('left')}
          onMouseLeave={() => setHoverSide(null)}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Option indicator - moved to top center */}
          <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
            <div className="bg-yellow-300 text-black font-mono font-black text-lg py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] rotate-[-2deg] border-3 border-black">
              OPTION A
            </div>
          </div>
          
          {/* Image with grainy overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10"></div>
          <Image
            src={leftHat.image}
            alt={leftHat.name}
            fill
            className={`object-cover object-center transition-transform duration-500 ${hoverSide === 'left' ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={95}
          />
          
          {/* Hat name banner - improved button */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <Link 
              href={leftHat.link}
              className="group relative overflow-hidden bg-black text-white font-bold py-3 px-6 border-3 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{leftHat.name}</span>
              <span className="absolute inset-0 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          </div>
        </motion.div>
        
        {/* Middle column - Black with text - full width on mobile */}
        <div className="relative bg-black flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-0 h-full text-center border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden col-span-1 md:col-span-1">
          {/* Noisy background texture */}
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/noise.png"
              alt="Noise texture"
              fill
              className="object-cover"
              style={{ mixBlendMode: 'overlay' }}
            />
          </div>

          {/* Replaced Premium Headwear with Can't Decide Badge */}
          <motion.div 
            className="mb-6 md:mb-8 relative z-10"
            initial={{ opacity: 0, rotate: -3 }}
            animate={isLoaded ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-yellow-300 text-black font-bold py-2 px-4 transform rotate-[-2deg] border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
              <span className="tracking-wide text-base">CAN'T DECIDE? GET BOTH</span>
            </div>
          </motion.div>
          
          {/* Main title */}
          <motion.div
            className="relative"
            variants={titleVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative inline-block">
              {/* Title background elements */}
              <div className="absolute -inset-1 bg-yellow-300 rotate-1 z-0"></div>
              <div className="absolute -inset-1 bg-black -rotate-1 translate-x-1 translate-y-1 z-0"></div>
              
              <h1 className="relative text-white text-center font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter leading-none mb-3 md:mb-4 px-4 py-2 bg-black z-10 border-2 border-white">
                {title}
                <span className="inline-flex ml-2 align-top">
                  <BadgeCheck className="w-6 h-6 md:w-8 md:h-8 text-black fill-yellow-300 stroke-[3px]" />
                </span>
              </h1>
            </div>
          </motion.div>
          
          {/* Simplified Subtitle */}
          <motion.div
            className="text-yellow-300 text-center font-medium mb-8 md:mb-10 text-base md:text-lg max-w-xs md:max-w-sm relative z-10"
            variants={subtitleVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <p className="mb-3">{subtitle}</p>
          </motion.div>
          
          {/* Mobile hat options display - improved layout */}
          <div className="flex w-full space-x-4 justify-center mb-8 md:hidden">
            <div className="relative w-[130px] h-[130px]">
              <div className="absolute -top-3 left-0 right-0 flex justify-center z-30">
                <div className="bg-yellow-300 text-black font-mono font-bold text-[10px] py-1 px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] rotate-[-2deg] border-2 border-black">
                  OPTION A
                </div>
              </div>
              <Link 
                href={leftHat.link}
                className="inline-block relative w-[130px] h-[130px] overflow-hidden border-3 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
                <Image
                  src={leftHat.image}
                  alt={leftHat.name}
                  fill
                  className="object-cover object-center"
                  sizes="130px"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs font-bold py-2 text-center z-20 border-t-2 border-white">
                  {leftHat.name}
                </div>
              </Link>
            </div>
            
            <div className="relative w-[130px] h-[130px]">
              <div className="absolute -top-3 left-0 right-0 flex justify-center z-30">
                <div className="bg-yellow-300 text-black font-mono font-bold text-[10px] py-1 px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] rotate-[2deg] border-2 border-black">
                  OPTION B
                </div>
              </div>
              <Link 
                href={rightHat.link}
                className="inline-block relative w-[130px] h-[130px] overflow-hidden border-3 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply z-10"></div>
                <Image
                  src={rightHat.image}
                  alt={rightHat.name}
                  fill
                  className="object-cover object-center"
                  sizes="130px"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs font-bold py-2 text-center z-20 border-t-2 border-white">
                  {rightHat.name}
                </div>
              </Link>
            </div>
          </div>
          
          {/* CTA Button - better mobile sizing and touch target */}
          <motion.div
            className="relative z-10 mt-2 md:mt-4"
            variants={ctaVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <Link
              href={ctaLink}
              className="group relative inline-flex px-6 py-3 sm:px-8 sm:py-4 font-black text-white bg-black border-4 border-yellow-300 items-center text-base sm:text-lg z-20"
            >
              <div className="absolute inset-0 bg-yellow-300 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100 group-hover:origin-right z-0 pointer-events-none"></div>
              <span className="relative z-10 group-hover:text-black transition-colors flex items-center pointer-events-none">
                {ctaText}
                <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            {/* Blinking effect - moved behind the button and made non-interactive */}
            <motion.div
              className="absolute -inset-1 border-2 border-white pointer-events-none z-10"
              variants={blinkVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            ></motion.div>
          </motion.div>
        </div>
        
        {/* Right column - Second hat option - hidden on mobile */}
        <motion.div 
          className="relative overflow-hidden h-[0px] md:h-full md:block hidden"
          onMouseEnter={() => setHoverSide('right')}
          onMouseLeave={() => setHoverSide(null)}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Option indicator - moved to top center */}
          <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
            <div className="bg-yellow-300 text-black font-mono font-black text-lg py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] rotate-[2deg] border-3 border-black">
              OPTION B
            </div>
          </div>
          
          {/* Image with grainy overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10"></div>
          <Image
            src={rightHat.image}
            alt={rightHat.name}
            fill
            className={`object-cover object-center transition-transform duration-500 ${hoverSide === 'right' ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            quality={95}
          />
          
          {/* Hat name banner */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <Link 
              href={rightHat.link}
              className="group relative overflow-hidden bg-black text-white font-bold py-3 px-6 border-3 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{rightHat.name}</span>
              <span className="absolute inset-0 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BrutalistIndecisiveHero; 