"use client";

import { useEffect, useState } from "react";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface RecentlyViewedSectionProps {
  currentProductId?: string;
}

export function RecentlyViewedSection({ currentProductId }: RecentlyViewedSectionProps) {
  const { products, clearProducts } = useRecentlyViewed();
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter out current product if we're on a product page
  const filteredProducts = currentProductId 
    ? products.filter(p => p.id !== currentProductId)
    : products;

  // Don't render if there are no products to show
  if (!isMounted || filteredProducts.length === 0) {
    return null;
  }

  // Display up to 4 products
  const displayProducts = filteredProducts.slice(0, 4);

  return (
    <section className="w-full bg-yellow-50 border-t-4 border-b-4 border-black py-6">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header with zigzag border */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b-4 border-black border-dashed">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-black mr-2"></div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Recently Viewed</h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={clearProducts}
              className="flex items-center px-3 py-1 text-xs font-bold bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Trash2 className="mr-1 h-3 w-3" />
              CLEAR ALL
            </button>
            
            <Link 
              href="/shop" 
              className="flex items-center px-3 py-1 text-xs font-bold bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-yellow-300 hover:text-black transition-all"
            >
              VIEW ALL
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative block bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
            >
              <div className="absolute top-0 right-0 z-10">
                <div className="bg-black p-1 border-l-2 border-b-2 border-black">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="relative aspect-square overflow-hidden border-b-3 border-black">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.salePrice && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-bold border-l-2 border-b-2 border-black">
                    SALE
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-bold border-r-2 border-b-2 border-black">
                    NEW
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="font-bold text-sm uppercase line-clamp-1">{product.name}</h3>
                <div className="mt-2 flex items-center">
                  {product.salePrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-black">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="text-gray-500 line-through text-xs">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-black">{formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
              
              {/* Square corner accent */}
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-yellow-300 border-t-2 border-r-2 border-black"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 