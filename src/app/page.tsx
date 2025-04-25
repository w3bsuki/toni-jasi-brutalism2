import { Suspense } from 'react';
import { Metadata, Viewport } from 'next';
import { BrutalistHero } from '@/components/home/BrutalistHero';
import { BrutalistFeaturedCollections } from '@/components/home/BrutalistFeaturedCollections';
import { BrutalistTrendingCarousel } from '@/components/home/BrutalistTrendingCarousel';
import { BrutalistLogoRibbon } from '@/components/home/BrutalistLogoRibbon';
import { BrutalistTextMarquee } from '@/components/home/BrutalistTextMarquee';
import { BrutalistSignupCarousel } from '@/components/home/BrutalistSignupCarousel';
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
      {/* Full-width Brutalist Hero section with carousel */}
      <BrutalistHero 
        title="ХУЛИГАНКА" 
        subtitle="Bold designs for the urban explorer. Limited drops, unlimited style."
        ctaText="SHOP NOW"
        ctaLink="/collection/bucket-hats"
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
        text="ХУЛИГАНКА"
        bgColor="bg-black"
        textColor="text-yellow-300"
        borderColor="border-yellow-300"
        speed={80}
      />

      {/* Brutalist Trending Products Carousel */}
      <BrutalistTrendingCarousel 
        title="HOT RIGHT NOW"
        products={trendingProducts} 
      />
    </div>
  );
}
