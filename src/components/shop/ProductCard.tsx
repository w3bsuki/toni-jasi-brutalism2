"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Check } from "lucide-react";
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
      <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Product image with hover effect */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              width={500}
              height={500}
            />
          </div>
          
          {/* Quick view and add to cart buttons */}
          <div className="absolute bottom-0 left-0 right-0 flex opacity-0 translate-y-4 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
            <button 
              onClick={handleQuickView}
              className="flex-1 bg-white text-black text-sm font-bold py-2 flex items-center justify-center border-t-4 border-r-2 border-black hover:bg-yellow-300 transition-colors"
            >
              QUICK VIEW <ArrowRight className="ml-1 h-4 w-4" />
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-black text-white text-sm font-bold py-2 flex items-center justify-center border-t-4 border-l-2 border-black hover:bg-yellow-300 hover:text-black transition-colors disabled:opacity-70"
            >
              {isAddingToCart ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> ADDED
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-1 h-4 w-4" /> ADD TO BAG
                </>
              )}
            </button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-0 left-0 flex flex-col">
            {product.isNew && (
              <span className="bg-yellow-300 text-black text-xs font-bold px-3 py-1 border-r-2 border-b-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                NEW
              </span>
            )}
            
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 border-r-2 border-b-2 border-black mt-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                SAVE {discountPercentage}%
              </span>
            )}
          </div>
        </div>
        
        {/* Product info - directly connected to the image */}
        <div className="p-3 border-t-4 border-black bg-white relative">
          {/* Product name */}
          <h3 className="text-base font-bold text-black uppercase tracking-tight">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          
          {/* Rating */}
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
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
            <span className="ml-1.5 text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          {/* Available colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-1.5 flex items-center gap-1.5">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="h-5 w-5 rounded-full border-2 border-black shadow-sm"
                  style={{ 
                    backgroundColor: color === 'natural' ? '#e8dcc2' : color
                  }}
                  title={color}
                />
              ))}
            </div>
          )}
          
          {/* Price */}
          <div className="mt-2 pt-2 border-t-2 border-black flex items-center">
            {hasDiscount ? (
              <>
                <span className="text-xl font-black text-red-600 mr-2">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-black text-black">
                ${displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Corner decorative element for brutalism */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
} 