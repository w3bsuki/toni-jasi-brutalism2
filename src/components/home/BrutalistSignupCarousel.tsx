"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Clock, PercentCircle, Star } from "lucide-react";

export function BrutalistSignupCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  
  // Items data with ХУЛИГАНКА branding
  const items = [
    {
      id: 1,
      icon: <Star className="w-5 h-5" />,
      text: "JOIN THE ХУЛИГАНКА GANG",
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

  return (
    <div 
      className="relative w-full border-y-4 border-black bg-yellow-300 py-3 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-container">
        <div className={`carousel-track ${isPaused ? 'paused' : ''}`}>
          {[...Array(8)].map((_, groupIndex) => (
            <div key={`group-${groupIndex}`} className="inline-flex flex-nowrap">
              {items.map((item) => (
                <div key={`item-${groupIndex}-${item.id}`} className="inline-flex items-center mx-6 whitespace-nowrap flex-nowrap">
                  {/* Left separator */}
                  <div className="h-6 mx-3 border-r-2 border-black"></div>
                  
                  <div className="flex items-center mx-4">
                    <div className="w-8 h-8 mr-3 flex items-center justify-center bg-black text-yellow-300">
                      {item.icon}
                    </div>
                    <span className="text-black font-black text-sm tracking-tight uppercase">
                      {item.text}
                    </span>
                  </div>
                  
                  <div className="mx-3">
                    <Link 
                      href={item.cta.url}
                      className="relative overflow-hidden group"
                    >
                      <div className="px-4 py-1 font-black text-xs tracking-wider bg-black text-white border-2 border-black transform transition-all duration-300 ease-out group-hover:bg-yellow-300 group-hover:text-black group-hover:translate-y-[-2px] group-hover:translate-x-[-2px]">
                        {item.cta.text}
                      </div>
                    </Link>
                  </div>
                  
                  {/* Right separator */}
                  <div className="h-6 mx-3 border-r-2 border-black"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Edge fade effects */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-yellow-300 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-yellow-300 to-transparent z-10 pointer-events-none"></div>
      
      <style jsx>{`
        .carousel-container {
          overflow: hidden;
          position: relative;
          height: 42px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .carousel-track {
          display: inline-flex;
          animation: marquee 120s linear infinite;
          white-space: nowrap;
          align-items: center;
        }
        
        .carousel-track.paused {
          animation-play-state: paused;
        }
        
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-12.5%); }
        }
      `}</style>
    </div>
  );
}

export default BrutalistSignupCarousel; 