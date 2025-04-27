import { Suspense } from 'react';
import { Metadata, Viewport } from 'next';
import { BrutalistIndecisiveHero } from '@/components/home/BrutalistIndecisiveHero';
import { BrutalistFeaturedCollections } from '@/components/home/BrutalistFeaturedCollections';
import { BrutalistTrendingCarousel } from '@/components/home/BrutalistTrendingCarousel';
import { BrutalistLogoRibbon } from '@/components/home/BrutalistLogoRibbon';
import { BrutalistTextMarquee } from '@/components/home/BrutalistTextMarquee';
import { BrutalistSignupCarousel } from '@/components/home/BrutalistSignupCarousel';
import { BrutalistHatImageCarousel } from '@/components/home/BrutalistHatImageCarousel';
import { Collection, Product } from '@/lib/types';
import { getFeaturedCollections, getTrendingProducts } from '@/lib/api';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Home() {
  const collections = await getFeaturedCollections();
  const trendingProducts = await getTrendingProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Brutalist Hero section with two hat options */}
      <BrutalistIndecisiveHero 
        title="INDECISIVE WEAR" 
        subtitle="Two options. One decision. No regrets."
        ctaText="SHOP NOW"
        ctaLink="/shop"
        leftHat={{
          name: "Classic Baseball Cap",
          image: "/images/hats/placeholder1.jpg",
          link: "/product/classic-baseball-cap"
        }}
        rightHat={{
          name: "Vintage Dad Hat",
          image: "/images/hats/placeholder.jpg",
          link: "/product/vintage-dad-hat"
        }}
      />
      
      {/* Signup Carousel */}
      <BrutalistSignupCarousel />
      
      {/* Brutalist Logo Ribbon */}
      <BrutalistLogoRibbon />
      
      {/* Full-width Brutalist Featured Collections */}
      <BrutalistFeaturedCollections 
        title="SHOP BY STYLE"
        collections={collections} 
      />

      {/* Brutalist Text Marquee */}
      <BrutalistTextMarquee 
        text="INDECISIVE WEAR"
        bgColor="bg-black"
        textColor="text-yellow-300"
        borderColor="border-yellow-300"
        speed={80}
      />
      
      {/* Hat Image Carousel - before Trending Products */}
      <BrutalistHatImageCarousel 
        title="HAT GALLERY"
        speed={30}
        direction="left"
      />

      {/* Brutalist Trending Products Carousel */}
      <BrutalistTrendingCarousel 
        title="HOT RIGHT NOW"
        products={trendingProducts} 
      />
    </div>
  );
}
