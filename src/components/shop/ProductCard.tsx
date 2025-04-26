"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Check, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice !== null;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100) 
    : 0;

  const handleAddToCart = () => {
    // Prevent multiple clicks
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    // Add the first size and color by default, user can change on product page
    const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    const firstColor = product.colors && product.colors.length > 0 ? product.colors[0] : null;
    
    addItem(product, firstSize, firstColor, 1);
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: (
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3 border border-black relative flex-shrink-0">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-gray-500">
              {firstSize && `Size: ${firstSize}`} 
              {firstSize && firstColor && "・"} 
              {firstColor && `Color: ${firstColor}`}
            </p>
          </div>
        </div>
      ),
      action: (
        <Link href="/cart" className="bg-black text-white px-3 py-1 text-xs font-bold hover:bg-yellow-300 hover:text-black transition-colors">
          VIEW CART
        </Link>
      ),
    });
    
    // Reset the button state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product container - combined image and info */}
      <div className="border-2 sm:border-3 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 bg-white hover:translate-y-[-2px] hover:translate-x-[-2px]">
        {/* Product image with hover effect */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
              width={500}
              height={500}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          
          {/* Mobile action buttons - always visible */}
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex space-x-1">
            <button 
              onClick={handleQuickView}
              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-black border-2 border-black rounded-full hover:bg-yellow-300 transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} className="sm:hidden" />
              <Eye size={16} className="hidden sm:block" />
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border-2 border-black rounded-full transition-colors ${
                isAddingToCart 
                  ? 'bg-green-500 text-white' 
                  : 'bg-black text-white hover:bg-yellow-300 hover:text-black'
              }`}
              aria-label="Add to bag"
            >
              {isAddingToCart ? (
                <>
                  <Check size={14} className="sm:hidden" />
                  <Check size={16} className="hidden sm:block" />
                </>
              ) : (
                <>
                  <ShoppingBag size={14} className="sm:hidden" />
                  <ShoppingBag size={16} className="hidden sm:block" />
                </>
              )}
            </button>
          </div>
          
          {/* Desktop action buttons - visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 hidden sm:flex opacity-0 translate-y-4 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
            <button 
              onClick={handleQuickView}
              className="flex-1 bg-white text-black text-xs md:text-sm font-bold py-2 flex items-center justify-center border-t-3 md:border-t-4 border-r-1 md:border-r-2 border-black hover:bg-yellow-300 transition-colors"
            >
              QUICK VIEW <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-black text-white text-xs md:text-sm font-bold py-2 flex items-center justify-center border-t-3 md:border-t-4 border-l-1 md:border-l-2 border-black hover:bg-yellow-300 hover:text-black transition-colors disabled:opacity-70"
            >
              {isAddingToCart ? (
                <>
                  <Check className="mr-1 h-3 w-3 md:h-4 md:w-4" /> ADDED
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-1 h-3 w-3 md:h-4 md:w-4" /> ADD TO BAG
                </>
              )}
            </button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-0 left-0 flex flex-col">
            {product.isNew && (
              <span className="bg-yellow-300 text-black text-[8px] sm:text-xs md:text-sm font-bold px-1.5 sm:px-3.5 py-0.5 sm:py-1.5 border-r-2 border-b-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300">
                NEW
              </span>
            )}
            
            {product.isFeatured && (
              <span className="bg-purple-600 text-white text-[8px] sm:text-xs md:text-sm font-bold px-1.5 sm:px-3.5 py-0.5 sm:py-1.5 border-r-2 border-b-2 border-black mt-[2px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300">
                FEATURED
              </span>
            )}
            
            {hasDiscount && (
              <span className="bg-red-500 text-white text-[8px] sm:text-xs md:text-sm font-bold px-1.5 sm:px-3.5 py-0.5 sm:py-1.5 border-r-2 border-b-2 border-black mt-[2px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300">
                SAVE {discountPercentage}%
              </span>
            )}
          </div>
        </div>
        
        {/* Product info - directly connected to the image */}
        <div className="p-1.5 sm:p-3 border-t-2 sm:border-t-3 md:border-t-4 border-black bg-white relative group-hover:bg-gray-50 transition-colors duration-300">
          {/* Product name */}
          <h3 className="text-xs sm:text-base font-bold text-black uppercase tracking-tight line-clamp-1">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          
          {/* Rating */}
          <div className="mt-0.5 sm:mt-1 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-2.5 w-2.5 sm:h-4 sm:w-4 ${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400" 
                      : i < product.rating 
                        ? "text-yellow-400/50" 
                        : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-[8px] sm:text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          {/* Available colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-0.5 sm:mt-1.5 flex items-center gap-0.5 sm:gap-1.5">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="h-3 w-3 sm:h-5 sm:w-5 rounded-full border border-black sm:border-2 shadow-sm"
                  style={{ 
                    backgroundColor: color === 'natural' ? '#e8dcc2' : color
                  }}
                  title={color}
                />
              ))}
            </div>
          )}
          
          {/* Price */}
          <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-black flex items-center">
            {hasDiscount ? (
              <>
                <span className="text-xs sm:text-base md:text-xl font-black text-red-600 mr-1 sm:mr-2">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-[9px] sm:text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xs sm:text-base md:text-xl font-black text-black">
                ${displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Corner decorative element for brutalism */}
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-black transform rotate-45 group-hover:bg-yellow-300 transition-colors duration-300"></div>
        </div>
      </div>
    </div>
  );
} 