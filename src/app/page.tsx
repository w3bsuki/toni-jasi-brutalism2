import { Suspense } from 'react';
import { BrutalistHero } from '@/components/home/BrutalistHero';
import { SignupCarousel } from '@/components/home/SignupCarousel';
import { BrutalistFeaturedCollections } from '@/components/home/BrutalistFeaturedCollections';
import { BrutalistTrendingCarousel } from '@/components/home/BrutalistTrendingCarousel';
import { BrutalistLogoRibbon } from '@/components/home/BrutalistLogoRibbon';
import { BrutalistTextMarquee } from '@/components/home/BrutalistTextMarquee';
import { Collection, Product } from '@/lib/types';
import { getFeaturedCollections, getTrendingProducts } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Home() {
  const collections = await getFeaturedCollections();
  const trendingProducts = await getTrendingProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Brutalist Hero section with carousel */}
      <BrutalistHero 
        title="BUCKET HATS" 
        subtitle="Bold designs for the urban explorer. Limited drops, unlimited style."
        ctaText="SHOP NOW"
        ctaLink="/collection/bucket-hats"
      />
      
      {/* Full-width SignupCarousel directly below Hero */}
      <SignupCarousel />
      
      {/* Brutalist Logo Ribbon */}
      <BrutalistLogoRibbon />
      
      {/* Full-width Brutalist Featured Collections */}
      <BrutalistFeaturedCollections 
        title="SHOP BY STYLE"
        collections={collections} 
      />

      {/* Brutalist Text Marquee */}
      <BrutalistTextMarquee 
        text={["LIMITED DROPS", "EXCLUSIVE ACCESS", "JOIN THE HAT GANG", "SHOP NOW"]} 
        speed={50}
      />

      {/* Brutalist Trending Products Carousel */}
      <BrutalistTrendingCarousel 
        title="HOT RIGHT NOW"
        products={trendingProducts} 
      />
    </div>
  );
}
