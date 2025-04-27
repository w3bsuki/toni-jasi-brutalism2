"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Collection } from '@/lib/types';

interface ProductFiltersProps {
  collections: Collection[];
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: string[];
  activeFilters: {
    collections: string[];
    priceRange: { min: number; max: number };
    sizes: string[];
    colors: string[];
    onSale: boolean;
    inStock: boolean;
    newArrivals: boolean;
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    collections: string[];
    priceRange: { min: number; max: number };
    sizes: string[];
    colors: string[];
    onSale: boolean;
    inStock: boolean;
    newArrivals: boolean;
  }>>;
}

export default function ProductFilters({
  collections,
  priceRange,
  sizes,
  colors,
  activeFilters,
  setActiveFilters
}: ProductFiltersProps) {
  // Local min/max for price slider
  const [localPriceRange, setLocalPriceRange] = useState({
    min: activeFilters.priceRange.min,
    max: activeFilters.priceRange.max
  });

  // Update local price range when activeFilters change
  useEffect(() => {
    setLocalPriceRange({
      min: activeFilters.priceRange.min,
      max: activeFilters.priceRange.max
    });
  }, [activeFilters.priceRange]);

  // Handle collection filter toggle
  const toggleCollection = (slug: string) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated.collections.includes(slug)) {
        updated.collections = updated.collections.filter(c => c !== slug);
      } else {
        updated.collections = [...updated.collections, slug];
      }
      return updated;
    });
  };

  // Handle size filter toggle
  const toggleSize = (size: string) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated.sizes.includes(size)) {
        updated.sizes = updated.sizes.filter(s => s !== size);
      } else {
        updated.sizes = [...updated.sizes, size];
      }
      return updated;
    });
  };

  // Handle color filter toggle
  const toggleColor = (color: string) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated.colors.includes(color)) {
        updated.colors = updated.colors.filter(c => c !== color);
      } else {
        updated.colors = [...updated.colors, color];
      }
      return updated;
    });
  };

  // Handle boolean filter toggle
  const toggleBooleanFilter = (filter: 'onSale' | 'inStock' | 'newArrivals') => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  // Handle price range change
  const handlePriceRangeMinChange = (value: number) => {
    const validValue = Math.max(priceRange.min, Math.min(value, localPriceRange.max));
    setLocalPriceRange(prev => ({ ...prev, min: validValue }));
  };

  const handlePriceRangeMaxChange = (value: number) => {
    const validValue = Math.max(localPriceRange.min, Math.min(value, priceRange.max));
    setLocalPriceRange(prev => ({ ...prev, max: validValue }));
  };

  // Apply price range
  const applyPriceRange = () => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: {
        min: localPriceRange.min,
        max: localPriceRange.max
      }
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      collections: [],
      priceRange: { min: priceRange.min, max: priceRange.max },
      sizes: [],
      colors: [],
      onSale: false,
      inStock: false,
      newArrivals: false,
    });
  };

  // Check if any filters are active
  const hasActiveFilters = 
    activeFilters.collections.length > 0 || 
    activeFilters.sizes.length > 0 || 
    activeFilters.colors.length > 0 || 
    activeFilters.onSale || 
    activeFilters.inStock || 
    activeFilters.newArrivals ||
    activeFilters.priceRange.min > priceRange.min ||
    activeFilters.priceRange.max < priceRange.max;

  return (
    <div className="bg-white border-4 border-black">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <h2 className="text-xl font-bold uppercase tracking-tight">FILTERS</h2>
        {hasActiveFilters && (
          <button 
            type="button"
            onClick={clearAllFilters}
            className="px-3 py-1 bg-white text-black font-bold text-sm uppercase hover:bg-yellow-300 transition-colors"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="p-3 border-b-4 border-black">
          <div className="flex flex-wrap gap-2">
            {activeFilters.collections.map(slug => {
              const collection = collections.find(c => c.slug === slug);
              return (
                <button
                  key={`active-collection-${slug}`}
                  type="button"
                  onClick={() => toggleCollection(slug)}
                  className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
                >
                  {collection?.name || slug} 
                  <X className="h-3 w-3 group-hover:text-yellow-300" />
                </button>
              );
            })}
            
            {activeFilters.sizes.map(size => (
              <button
                key={`active-size-${size}`}
                type="button"
                onClick={() => toggleSize(size)}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
              >
                {size} <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            ))}
            
            {activeFilters.colors.map(color => (
              <button
                key={`active-color-${color}`}
                type="button"
                onClick={() => toggleColor(color)}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
              >
                {color} <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            ))}
            
            {activeFilters.onSale && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('onSale')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
              >
                On Sale <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            )}
            
            {activeFilters.inStock && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('inStock')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
              >
                In Stock <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            )}
            
            {activeFilters.newArrivals && (
              <button
                type="button"
                onClick={() => toggleBooleanFilter('newArrivals')}
                className="px-2 py-1 bg-black text-white text-xs font-bold uppercase flex items-center gap-1 group"
              >
                New Arrivals <X className="h-3 w-3 group-hover:text-yellow-300" />
              </button>
            )}
            
            {(activeFilters.priceRange.min > priceRange.min || 
              activeFilters.priceRange.max < priceRange.max) && (
              <div className="px-2 py-1 bg-black text-white text-xs font-bold uppercase">
                ${activeFilters.priceRange.min} - ${activeFilters.priceRange.max}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Sections using Radix Accordion */}
      <Accordion.Root type="multiple" defaultValue={['collections', 'price', 'sizes', 'colors', 'special']} className="divide-y-4 divide-black">
        {/* Collections */}
        <Accordion.Item value="collections" className="overflow-hidden">
          <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-100 font-bold uppercase tracking-tight">
            <span>COLLECTIONS</span>
            <ChevronDown className="h-5 w-5 transition-transform duration-150 ease-in-out transform ui-state-open:rotate-180" />
          </Accordion.Trigger>
          
          <Accordion.Content className="bg-gray-100 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="grid grid-cols-1 divide-y-2 divide-gray-300">
              {collections.map(collection => (
                <FilterButton
                  key={`collection-${collection.slug}`}
                  label={collection.name}
                  isActive={activeFilters.collections.includes(collection.slug)}
                  onClick={() => toggleCollection(collection.slug)}
                />
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>
        
        {/* Price Range */}
        <Accordion.Item value="price" className="overflow-hidden">
          <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-100 font-bold uppercase tracking-tight">
            <span>PRICE RANGE</span>
            <ChevronDown className="h-5 w-5 transition-transform duration-150 ease-in-out transform ui-state-open:rotate-180" />
          </Accordion.Trigger>
          
          <Accordion.Content className="bg-gray-100 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="p-4">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-1/2">
                    <label htmlFor="min-price" className="block text-sm font-bold uppercase mb-1">
                      Min ($)
                    </label>
                    <input
                      id="min-price"
                      type="number"
                      min={priceRange.min}
                      max={localPriceRange.max}
                      value={localPriceRange.min}
                      onChange={(e) => handlePriceRangeMinChange(parseInt(e.target.value) || priceRange.min)}
                      onBlur={applyPriceRange}
                      className="w-full p-2 border-3 border-black bg-white text-lg font-bold"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="max-price" className="block text-sm font-bold uppercase mb-1">
                      Max ($)
                    </label>
                    <input
                      id="max-price"
                      type="number"
                      min={localPriceRange.min}
                      max={priceRange.max}
                      value={localPriceRange.max}
                      onChange={(e) => handlePriceRangeMaxChange(parseInt(e.target.value) || priceRange.max)}
                      onBlur={applyPriceRange}
                      className="w-full p-2 border-3 border-black bg-white text-lg font-bold"
                    />
                  </div>
                </div>
                
                <div className="relative h-4 bg-gray-300 mt-2">
                  <div 
                    className="absolute h-full bg-black"
                    style={{
                      left: `${((localPriceRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                      right: `${100 - ((localPriceRange.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`
                    }}
                  />
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={localPriceRange.min}
                    onChange={(e) => handlePriceRangeMinChange(parseInt(e.target.value))}
                    onMouseUp={applyPriceRange}
                    onTouchEnd={applyPriceRange}
                    className="absolute w-full h-4 opacity-0 cursor-pointer"
                    aria-labelledby="min-price"
                    title={`Minimum price: $${localPriceRange.min}`}
                  />
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={localPriceRange.max}
                    onChange={(e) => handlePriceRangeMaxChange(parseInt(e.target.value))}
                    onMouseUp={applyPriceRange}
                    onTouchEnd={applyPriceRange}
                    className="absolute w-full h-4 opacity-0 cursor-pointer"
                    aria-labelledby="max-price"
                    title={`Maximum price: $${localPriceRange.max}`}
                  />
                </div>
                
                <div className="flex justify-between text-sm font-bold">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
        
        {/* Sizes */}
        <Accordion.Item value="sizes" className="overflow-hidden">
          <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-100 font-bold uppercase tracking-tight">
            <span>SIZES</span>
            <ChevronDown className="h-5 w-5 transition-transform duration-150 ease-in-out transform ui-state-open:rotate-180" />
          </Accordion.Trigger>
          
          <Accordion.Content className="bg-gray-100 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-gray-300">
              {sizes.map(size => (
                <FilterButton
                  key={`size-${size}`}
                  label={size}
                  isActive={activeFilters.sizes.includes(size)}
                  onClick={() => toggleSize(size)}
                />
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>
        
        {/* Colors */}
        <Accordion.Item value="colors" className="overflow-hidden">
          <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-100 font-bold uppercase tracking-tight">
            <span>COLORS</span>
            <ChevronDown className="h-5 w-5 transition-transform duration-150 ease-in-out transform ui-state-open:rotate-180" />
          </Accordion.Trigger>
          
          <Accordion.Content className="bg-gray-100 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-gray-300">
              {colors.map(color => (
                <FilterButton
                  key={`color-${color}`}
                  label={color}
                  isActive={activeFilters.colors.includes(color)}
                  onClick={() => toggleColor(color)}
                />
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>
        
        {/* Special Filters */}
        <Accordion.Item value="special" className="overflow-hidden">
          <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-100 font-bold uppercase tracking-tight">
            <span>SPECIAL</span>
            <ChevronDown className="h-5 w-5 transition-transform duration-150 ease-in-out transform ui-state-open:rotate-180" />
          </Accordion.Trigger>
          
          <Accordion.Content className="bg-gray-100 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="grid grid-cols-1 divide-y-2 divide-gray-300">
              <FilterButton
                label="On Sale"
                isActive={activeFilters.onSale}
                onClick={() => toggleBooleanFilter('onSale')}
              />
              <FilterButton
                label="In Stock"
                isActive={activeFilters.inStock}
                onClick={() => toggleBooleanFilter('inStock')}
              />
              <FilterButton
                label="New Arrivals"
                isActive={activeFilters.newArrivals}
                onClick={() => toggleBooleanFilter('newArrivals')}
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

// Simple filter button component
function FilterButton({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center p-3 cursor-pointer text-sm uppercase font-medium transition-colors text-left",
        isActive ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
      )}
    >
      <span className={cn(
        "flex items-center justify-center w-5 h-5 mr-3 border-2 border-black",
        isActive ? "bg-white" : "bg-gray-100"
      )}>
        {isActive && <span className="text-black">✓</span>}
      </span>
      <span className="flex-1 font-bold">{label}</span>
    </button>
  );
} 