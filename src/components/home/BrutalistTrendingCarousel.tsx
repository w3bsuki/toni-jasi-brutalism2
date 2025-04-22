"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";

interface BrutalistTrendingCarouselProps {
  title?: string;
  products: Product[];
}

export function BrutalistTrendingCarousel({
  title = "TRENDING NOW",
  products = [],
}: BrutalistTrendingCarouselProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set number of products to show per slide based on screen size
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  // Adjust slides per view based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate total number of slides
  const totalSlides = Math.ceil(products.length / slidesPerView);
  
  // Handler for next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  // Handler for previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  // Format price with discount if available
  const formatPrice = (price: number, discount?: number) => {
    if (discount && discount > 0) {
      const discountedPrice = price * (1 - discount / 100);
      return (
        <div className="flex flex-col">
          <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm line-through opacity-60">${price.toFixed(2)}</span>
            <span className="text-xs bg-red-600 text-white px-1 py-[1px]">-{discount}%</span>
          </div>
        </div>
      );
    }
    return <span className="text-2xl font-bold">${price.toFixed(2)}</span>;
  };

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Diagonal lines background pattern - brutalist style */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,black,black_1px,transparent_1px,transparent_10px)]"></div>
      </div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading with yellow highlight */}
        <div className="mb-12 flex justify-between items-end">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter relative inline-block">
            {title}
            <div className="absolute h-4 w-full bg-yellow-300 -bottom-1 left-0 z-0"></div>
          </h2>
          
          {/* Pagination indicator - brutalist style */}
          <div className="hidden md:flex items-center gap-2 text-xl font-mono">
            <span className="font-black">{currentSlide + 1}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>
        </div>
        
        {/* Navigation controls - brutalist style */}
        <div className="flex justify-end mb-6 gap-3">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 border-4 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="w-12 h-12 border-4 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Products carousel */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0,
              x: `-${currentSlide * 100}%`
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Group products into slides */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div 
                key={slideIndex} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-full"
              >
                {products.slice(
                  slideIndex * slidesPerView, 
                  slideIndex * slidesPerView + slidesPerView
                ).map((product) => (
                  <motion.div
                    key={product.id}
                    className="group"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={`/product/${product.slug}`} className="block">
                      {/* Product card with brutalist styling */}
                      <div className="relative border-4 border-black">
                        {/* Product image */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Quick-add button - brutalist style */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                              <div className="bg-white border-4 border-black py-2 px-4 flex items-center gap-2 hover:bg-yellow-300">
                                <ShoppingBag size={18} />
                                <span className="font-bold uppercase text-sm">Add to Cart</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Sale tag if discounted */}
                          {product.discount && product.discount > 0 && (
                            <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase">
                              Sale
                            </div>
                          )}
                        </div>
                        
                        {/* Product info */}
                        <div className="p-4 bg-white">
                          <h3 className="font-bold uppercase text-lg mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center justify-between mt-2">
                            {formatPrice(product.price, product.discount)}
                            
                            <button 
                              className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" 
                              aria-label="Add to wishlist"
                            >
                              <Heart size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* View all products link - brutalist style */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/collections" 
            className="relative group inline-flex items-center"
          >
            <div className="bg-black text-white px-8 py-4 font-black uppercase flex items-center gap-2 border-4 border-black transform group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform">
              <span>View All Products</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 border-4 border-black translate-x-2 translate-y-2 -z-10 bg-yellow-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BrutalistTrendingCarousel; 