"use client";

import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import ProductCard from "@/components/shop/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import ProductSort from "@/components/shop/ProductSort";
import ProductQuickView from "@/components/shop/ProductQuickView";
import { RecentlyViewedSection } from "@/components/shop/RecentlyViewedSection";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { Product } from "@/types/product";
import { Filter, SlidersHorizontal } from "lucide-react";

export default function ShopPageContent() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState({
    collections: [] as string[],
    priceRange: { min: 0, max: 100 },
    sizes: [] as string[],
    colors: [] as string[],
    onSale: false,
    inStock: false,
    newArrivals: false,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addProduct } = useRecentlyViewed();

  // Handle quick view open/close
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    
    // Add to recently viewed when opening quick view
    addProduct(product);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Filter by collection
    if (activeFilters.collections.length > 0) {
      result = result.filter(product => 
        activeFilters.collections.includes(product.collection)
      );
    }

    // Filter by price range
    result = result.filter(
      product => {
        const price = product.salePrice || product.price;
        return price >= activeFilters.priceRange.min && 
               price <= activeFilters.priceRange.max;
      }
    );

    // Filter by sizes
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => activeFilters.sizes.includes(size))
      );
    }

    // Filter by colors
    if (activeFilters.colors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => activeFilters.colors.includes(color))
      );
    }

    // Filter by on sale
    if (activeFilters.onSale) {
      result = result.filter(product => product.isSale);
    }

    // Filter by in stock
    if (activeFilters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Filter by new arrivals
    if (activeFilters.newArrivals) {
      result = result.filter(product => product.isNew);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high-low":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "top-rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "best-selling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default: // featured
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
        break;
    }

    setFilteredProducts(result);
  }, [activeFilters, sortOption]);

  // Get unique values for filters
  const uniqueSizes = [...new Set(products.flatMap(p => p.sizes))];
  const uniqueColors = [...new Set(products.flatMap(p => p.colors))];
  const priceRange = {
    min: Math.floor(Math.min(...products.map(p => p.salePrice || p.price))),
    max: Math.ceil(Math.max(...products.map(p => p.price)))
  };

  // Check if any filters are active
  const hasActiveFilters = 
    activeFilters.collections.length > 0 || 
    activeFilters.sizes.length > 0 || 
    activeFilters.colors.length > 0 || 
    activeFilters.onSale || 
    activeFilters.inStock || 
    activeFilters.newArrivals;

  return (
    <div className="w-full bg-white">
      {/* Hero section */}
      <div className="w-full bg-black border-b-4 border-yellow-300 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 sm:mb-4">
            SHOP ALL PRODUCTS
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Browse our complete collection of premium hats and headwear. 
            Find the perfect style to express yourself.
          </p>
        </div>
      </div>

      {/* Shop content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Mobile filters toggle */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <button
              type="button"
              className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-yellow-300 hover:text-black transition-colors flex items-center gap-2"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter size={16} />
              {mobileFiltersOpen ? "HIDE FILTERS" : "FILTERS"}
            </button>
            
            <div className="flex items-center text-sm font-semibold">
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setActiveFilters({
                      collections: [],
                      priceRange: { min: priceRange.min, max: priceRange.max },
                      sizes: [],
                      colors: [],
                      onSale: false,
                      inStock: false,
                      newArrivals: false,
                    });
                    setSortOption("featured");
                  }}
                  className="text-red-600 mr-4 underline"
                >
                  Clear all
                </button>
              )}
              <span>{filteredProducts.length} products</span>
            </div>
          </div>

          {/* Filters sidebar */}
          <div 
            className={`${
              mobileFiltersOpen ? 'block' : 'hidden'
            } md:block w-full md:w-64 lg:w-72 flex-shrink-0 transition-all duration-300 ease-in-out`}
          >
            <ProductFilters
              collections={collections}
              priceRange={priceRange}
              sizes={uniqueSizes}
              colors={uniqueColors}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {/* Desktop results count and sort */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="flex items-center">
                <p className="text-black font-bold">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setActiveFilters({
                        collections: [],
                        priceRange: { min: priceRange.min, max: priceRange.max },
                        sizes: [],
                        colors: [],
                        onSale: false,
                        inStock: false,
                        newArrivals: false,
                      });
                      setSortOption("featured");
                    }}
                    className="ml-4 text-red-600 underline text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              <ProductSort sortOption={sortOption} setSortOption={setSortOption} />
            </div>

            {/* Mobile sort dropdown */}
            <div className="mb-4 md:hidden">
              <ProductSort sortOption={sortOption} setSortOption={setSortOption} />
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onQuickView={() => openQuickView(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-black p-6 sm:p-8 text-center">
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setActiveFilters({
                      collections: [],
                      priceRange: { min: priceRange.min, max: priceRange.max },
                      sizes: [],
                      colors: [],
                      onSale: false,
                      inStock: false,
                      newArrivals: false,
                    });
                    setSortOption("featured");
                  }}
                  className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-yellow-300 hover:text-black transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recently viewed products section */}
      <RecentlyViewedSection />

      {/* Quick view modal */}
      <ProductQuickView 
        product={quickViewProduct} 
        isOpen={isQuickViewOpen} 
        onClose={closeQuickView}
      />
    </div>
  );
} 