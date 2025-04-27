"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Check, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const hasDiscount = product.salePrice !== null;
  const displayPrice = product.salePrice || product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  // Navigation functions for images
  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    // Prevent multiple clicks
    if (isAdded) return;
    
    // If size or color options exist, ensure one is selected
    const sizeToAdd = product.sizes && product.sizes.length > 0 
      ? selectedSize || product.sizes[0]
      : null;
    
    const colorToAdd = product.colors && product.colors.length > 0
      ? selectedColor || product.colors[0]
      : null;

    addItem(product, sizeToAdd, colorToAdd, quantity);
    setIsAdded(true);
    
    // Show toast notification
    toast({
      title: `${quantity > 1 ? `${quantity}x ` : ""}ADDED TO CART`,
      description: (
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3 border-2 border-black relative flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-bold">{product.name}</p>
            <p className="text-xs font-medium">
              {sizeToAdd && `Size: ${sizeToAdd}`} 
              {sizeToAdd && colorToAdd && "・"} 
              {colorToAdd && `Color: ${colorToAdd}`}
            </p>
          </div>
        </div>
      ),
      action: (
        <Link href="/cart" className="bg-black text-white px-3 py-1 text-xs font-bold hover:bg-yellow-300 hover:text-black transition-colors uppercase">
          View Cart
        </Link>
      ),
    });
    
    // Reset added status after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div 
        className="bg-white border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-transform"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b-4 border-black bg-yellow-300">
          <h2 className="text-xl font-black uppercase tracking-tight">Quick View</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors"
            aria-label="Close quick view"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product images section */}
          <div className="flex flex-col gap-2">
            {/* Main image */}
            <div className="aspect-square relative border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Sale tag if discounted */}
              {hasDiscount && (
                <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 border-r-2 border-b-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  SAVE {discountPercentage}%
                </span>
              )}
            </div>
            
            {/* Thumbnail gallery - always shows exactly 3 thumbnails */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {product.images.length > 1 ? (
                // Only show thumbnails if we have more than one image
                Array.from({ length: 3 }).map((_, idx) => {
                  // Calculate which image to show in thumbnails
                  // We want to show the 3 images that aren't currently selected as main
                  let imageIndex = (selectedImageIndex + 1 + idx) % product.images.length;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(imageIndex)}
                      className={`aspect-square border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative hover:opacity-90`}
                      aria-label={`View image ${imageIndex + 1} of ${product.name}`}
                    >
                      <Image
                        src={product.images[imageIndex]}
                        alt={`${product.name} - View ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })
              ) : (
                // If only one image, show three identical thumbnails
                Array.from({ length: 3 }).map((_, idx) => (
                  <button
                    key={idx}
                    className="aspect-square border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative opacity-70"
                    aria-label={`View image of ${product.name}`}
                    disabled
                  >
                    <Image
                      src={product.images[0]}
                      alt={`${product.name}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))
              )}
            </div>
            
            {/* Navigation arrows */}
            {product.images.length > 1 && (
              <div className="flex justify-center items-center mt-2 gap-4">
                <button
                  onClick={handlePreviousImage}
                  className="p-2 border-2 border-black bg-white hover:bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-bold text-sm">
                  {selectedImageIndex + 1} / {product.images.length}
                </span>
                <button
                  onClick={handleNextImage}
                  className="p-2 border-2 border-black bg-white hover:bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center justify-center"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div className="flex flex-col border-2 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-2xl font-black uppercase tracking-tight border-b-2 border-black pb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Available colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-3">
                <p className="font-bold mb-2 uppercase text-sm">Color:</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const isActive = selectedColor === color;
                    const bgColor = color === 'natural' ? '#e8dcc2' : color;
                    
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative h-8 w-8 rounded-full border-2 transition-colors ${
                          isActive 
                            ? "border-black ring-2 ring-yellow-300 ring-offset-1" 
                            : "border-gray-400 hover:border-black"
                        }`}
                        style={{ backgroundColor: bgColor }}
                        aria-label={`Select color ${color}`}
                        title={color}
                      >
                        {isActive && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path 
                                d="M11 1L4.125 9L1 5.5" 
                                stroke={['white', 'yellow', 'beige', 'natural'].includes(color) ? 'black' : 'white'} 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Price */}
            <div className="mt-4 flex items-center border-t-2 border-b-2 border-black py-3 my-2">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-black text-red-600 mr-3">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-black">${displayPrice.toFixed(2)}</span>
              )}
            </div>
            
            {/* Short description */}
            <p className="mt-3 text-gray-700">{product.description}</p>
            
            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <p className="font-bold mb-2 uppercase text-sm">Size:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] py-2 px-3 border-2 font-bold transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity selection */}
            <div className="mt-4">
              <p className="font-bold mb-2 uppercase text-sm">Quantity:</p>
              <div className="flex items-center border-2 border-black w-max shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-xl font-bold border-r-2 border-black hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-xl font-bold border-l-2 border-black hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex items-center justify-center px-4 sm:px-6 py-3 font-bold text-base sm:text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                  isAdded
                    ? "bg-green-500 text-white"
                    : "bg-black text-white hover:bg-yellow-300 hover:text-black hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} className="mr-2" />
                    ADDED
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} className="mr-2" />
                    ADD BAG
                  </>
                )}
              </button>
              
              <Link
                href={`/product/${product.slug}`}
                className="flex items-center justify-center px-4 sm:px-6 py-3 font-bold text-base sm:text-lg bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <ArrowRight size={20} className="mr-2" />
                DETAILS
              </Link>
            </div>
            
            {/* Corner decorative element for brutalism */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black transform rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 