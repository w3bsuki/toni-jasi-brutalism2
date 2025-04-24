"use client";

import React, { useState } from "react";

interface BrutalistTextMarqueeProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export function BrutalistTextMarquee({
  text = "LIMITED DROPS • EXCLUSIVE STYLES • URBAN CLASSICS • ",
  bgColor = "bg-white",
  textColor = "text-black",
  borderColor = "border-black"
}: BrutalistTextMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden h-[45px] ${bgColor} ${textColor} border-y-4 ${borderColor} z-10`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`absolute whitespace-nowrap ${isPaused ? 'animate-none' : 'animate-marquee'} flex items-center h-full`}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-xl font-black uppercase tracking-tighter mr-6">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BrutalistTextMarquee; 