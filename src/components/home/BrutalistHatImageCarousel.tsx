"use client";

/**
 * BrutalistHatImageCarousel
 * 
 * A visually striking, auto-scrolling gallery that showcases all hat images in a continuous
 * horizontal strip with brutalist design elements. Features:
 * - Continuous scrolling animation with adjustable speed and direction
 * - Pauses on hover and has manual pause/resume controls
 * - Brutalist design aesthetic with bold borders, shadows, and decorative elements
 * - Responsive sizing for different screen sizes
 * - Image hover effects with scaling and yellow highlight border
 * 
 * Used in the homepage between text marquee and trending products sections.
 */

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play, ArrowUpRight, Eye } from 'lucide-react';
import styles from './BrutalistHatImageCarousel.module.css';
import ProductQuickView from '@/components/shop/ProductQuickView';

interface BrutalistHatImageCarouselProps {
  speed?: number;
  direction?: 'left' | 'right';
  title?: string;
}

export function BrutalistHatImageCarousel({
  speed = 10, // Reduced speed for an even slower animation
  direction = 'left',
  title = "HAT GALLERY"
}: BrutalistHatImageCarouselProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hatImages, setHatImages] = useState<string[]>([]);
  const [currentDirection, setCurrentDirection] = useState(direction);
  const [animationDuration, setAnimationDuration] = useState(90); // Longer default duration
  const [quickViewImage, setQuickViewImage] = useState<string | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Sample product data for quick view (placeholder)
  const sampleProduct = {
    id: "sample-hat",
    name: "Hat Gallery Item",
    description: "This stunning hat from our gallery collection features premium materials and exceptional craftsmanship.",
    price: 79.99,
    category: "Gallery Collection",
    images: quickViewImage ? [quickViewImage] : ["/images/hats/1.jpg"],
    rating: 4.8,
    reviewCount: 24,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Navy"],
    isFeatured: true,
    isNew: false,
    slug: "gallery-hat"
  };
  
  // Calculate animation duration based on speed
  useEffect(() => {
    // Convert speed (px/sec) to duration (seconds for full scroll)
    // Slower by increasing the multiplier even more
    const newDuration = 100 / speed * 20; // Increased multiplier for much slower animation
    setAnimationDuration(newDuration);
  }, [speed]);

  // Collect all hat images
  useEffect(() => {
    const images = Array.from({ length: 23 }, (_, i) => `/images/hats/${i + 1}.jpg`);
    setHatImages(images);
    setIsLoaded(true);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Toggle direction
  const toggleDirection = () => {
    setCurrentDirection(prev => prev === 'left' ? 'right' : 'left');
  };

  // Open quick view for a specific hat
  const openQuickView = (imageSrc: string) => {
    setQuickViewImage(imageSrc);
    setIsQuickViewOpen(true);
  };
  
  // Close quick view
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewImage(null);
  };

  // Determine CSS classes based on state
  const getMarqueeClass = () => {
    let className = styles.marquee;
    
    if (isPaused) {
      className += ` ${styles.paused}`;
    }
    
    if (currentDirection === 'right') {
      className += ` ${styles.reverse}`;
    }
    
    return className;
  };

  return (
    <section className="relative w-full bg-black overflow-hidden border-y-8 border-yellow-300 py-8 md:py-12">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Title */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-12 flex justify-center">
        <div className="inline-block relative">
          <div className="absolute -inset-1.5 bg-yellow-300 rotate-2 z-0"></div>
          <h2 className="relative text-3xl md:text-5xl font-black uppercase tracking-tighter bg-black px-6 py-4 border-4 border-yellow-300 z-10 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {title}
          </h2>
        </div>
      </div>
      
      {/* Main carousel */}
      <div className="relative z-10 py-6 md:py-8 overflow-hidden max-w-[94%] mx-auto">
        {/* Left Control Button */}
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-30 w-12 h-20 md:w-14 md:h-24 bg-black text-yellow-300 border-4 border-yellow-300 hover:bg-yellow-300 hover:text-black transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
        >
          {isPaused ? 
            <Play className="w-6 h-6 md:w-7 md:h-7" /> : 
            <Pause className="w-6 h-6 md:w-7 md:h-7" />
          }
        </button>
        
        {/* The infinite carousel container */}
        <div className={styles.marqueeContainer}>
          <div 
            ref={marqueeRef}
            className={getMarqueeClass()}
            style={{ 
              '--duration': `${animationDuration}s` 
            } as React.CSSProperties}
          >
            <div className={styles.marqueeGroup}>
              {hatImages.map((src, index) => (
                <div 
                  key={`${src}-${index}`}
                  className="mx-3 md:mx-4 flex-shrink-0 group relative"
                >
                  <Link href={`/shop`} className="block relative">
                    <div className="w-36 h-48 md:w-44 md:h-60 lg:w-52 lg:h-72 relative overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                      <div className="absolute inset-0 bg-black z-0"></div>
                      <Image 
                        src={src} 
                        alt={`Hat Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                        className="object-cover z-10 transition-all duration-500 group-hover:scale-110"
                        priority={index < 5}
                      />
                      
                      {/* Frame */}
                      <div className="absolute inset-0 border-4 border-yellow-300 opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300"></div>
                      
                      {/* View icon on hover */}
                      <div className="absolute top-0 right-0 bg-yellow-300 p-2 border-l-2 border-b-2 border-black z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-4 w-4 text-black" />
                      </div>
                      
                      {/* Number tag */}
                      <div className="absolute bottom-0 left-0 bg-black text-white font-bold text-xs px-2 py-1 border-t-2 border-r-2 border-yellow-300 z-30">
                        #{index + 1}
                      </div>
                      
                      {/* Quick View Button */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
                        onClick={(e) => {
                          e.preventDefault();
                          openQuickView(src);
                        }}
                      >
                        <button className="bg-black text-white border-2 border-yellow-300 py-2 px-4 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-yellow-300 hover:text-black font-bold uppercase text-sm shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                          <Eye size={16} />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Duplicate for seamless loop */}
            <div className={styles.marqueeGroup}>
              {hatImages.map((src, index) => (
                <div 
                  key={`${src}-clone-${index}`}
                  className="mx-3 md:mx-4 flex-shrink-0 group relative"
                >
                  <Link href={`/shop`} className="block relative">
                    <div className="w-36 h-48 md:w-44 md:h-60 lg:w-52 lg:h-72 relative overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                      <div className="absolute inset-0 bg-black z-0"></div>
                      <Image 
                        src={src} 
                        alt={`Hat Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                        className="object-cover z-10 transition-all duration-500 group-hover:scale-110"
                      />
                      
                      {/* Frame */}
                      <div className="absolute inset-0 border-4 border-yellow-300 opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300"></div>
                      
                      {/* View icon on hover */}
                      <div className="absolute top-0 right-0 bg-yellow-300 p-2 border-l-2 border-b-2 border-black z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-4 w-4 text-black" />
                      </div>
                      
                      {/* Number tag */}
                      <div className="absolute bottom-0 left-0 bg-black text-white font-bold text-xs px-2 py-1 border-t-2 border-r-2 border-yellow-300 z-30">
                        #{index + 1}
                      </div>
                      
                      {/* Quick View Button */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
                        onClick={(e) => {
                          e.preventDefault();
                          openQuickView(src);
                        }}
                      >
                        <button className="bg-black text-white border-2 border-yellow-300 py-2 px-4 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-yellow-300 hover:text-black font-bold uppercase text-sm shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                          <Eye size={16} />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Control Button */}
        <button 
          onClick={toggleDirection}
          className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-30 w-12 h-20 md:w-14 md:h-24 bg-black text-yellow-300 border-4 border-yellow-300 hover:bg-yellow-300 hover:text-black transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Change direction"
        >
          {currentDirection === 'left' ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7"><path d="m9 18 6-6-6-6"></path></svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7"><path d="m15 18-6-6 6-6"></path></svg>
          }
        </button>
      </div>
      
      {/* ProductQuickView component */}
      <ProductQuickView
        product={quickViewImage ? sampleProduct : null}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </section>
  );
}

export default BrutalistHatImageCarousel; 