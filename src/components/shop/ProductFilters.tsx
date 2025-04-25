"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Collection } from "@/lib/types";

interface FilterProps {
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
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{
      collections: string[];
      priceRange: { min: number; max: number };
      sizes: string[];
      colors: string[];
      onSale: boolean;
      inStock: boolean;
      newArrivals: boolean;
    }>
  >;
}

export default function ProductFilters({
  collections,
  priceRange,
  sizes,
  colors,
  activeFilters,
  setActiveFilters,
}: FilterProps) {
  const [expandedSections, setExpandedSections] = useState({
    collections: true,
    price: true,
    sizes: true,
    colors: true,
    other: true
  });

  // Helper to toggle filter sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle collection filter changes
  const handleCollectionChange = (slug: string) => {
    setActiveFilters((prev) => {
      const isSelected = prev.collections.includes(slug);
      return {
        ...prev,
        collections: isSelected
          ? prev.collections.filter((c) => c !== slug)
          : [...prev.collections, slug],
      };
    });
  };

  // Handle size filter changes
  const handleSizeChange = (size: string) => {
    setActiveFilters((prev) => {
      const isSelected = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: isSelected
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });
  };

  // Handle color filter changes
  const handleColorChange = (color: string) => {
    setActiveFilters((prev) => {
      const isSelected = prev.colors.includes(color);
      return {
        ...prev,
        colors: isSelected
          ? prev.colors.filter((c) => c !== color)
          : [...prev.colors, color],
      };
    });
  };

  // Handle price range changes
  const handlePriceChange = (
    type: "min" | "max",
    value: string
  ) => {
    const numValue = parseInt(value, 10) || (type === "min" ? priceRange.min : priceRange.max);
    setActiveFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: numValue,
      },
    }));
  };

  // Handle boolean filter changes
  const handleBooleanFilter = (
    type: "onSale" | "inStock" | "newArrivals",
    value: boolean
  ) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Check if any filters are active
  const hasActiveFilters =
    activeFilters.collections.length > 0 ||
    activeFilters.sizes.length > 0 ||
    activeFilters.colors.length > 0 ||
    activeFilters.onSale ||
    activeFilters.inStock ||
    activeFilters.newArrivals ||
    activeFilters.priceRange.min !== priceRange.min ||
    activeFilters.priceRange.max !== priceRange.max;

  // Reset all filters
  const resetFilters = () => {
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

  // Filter section component
  const FilterSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="border-b-2 border-black/10 py-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between text-left font-bold text-black"
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            expandedSections[sectionKey] ? "rotate-180" : ""
          }`}
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2">{children}</div>
      )}
    </div>
  );

  // Checkbox component
  const Checkbox = ({
    id,
    label,
    checked,
    onChange,
    count,
  }: {
    id: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    count?: number;
  }) => (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 border-2 border-black text-yellow-400 focus:ring-yellow-400"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 text-sm text-black">
        {label} {count !== undefined && <span className="text-gray-500">({count})</span>}
      </label>
    </div>
  );

  return (
    <div className="sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-yellow-700 hover:text-black flex items-center"
          >
            Clear All <X className="ml-1 h-3 w-3" />
          </button>
        )}
      </div>

      {/* Collections filter */}
      <FilterSection title="COLLECTIONS" sectionKey="collections">
        <div className="space-y-2">
          {collections.map((collection) => (
            <Checkbox
              key={collection.slug}
              id={`collection-${collection.slug}`}
              label={collection.name}
              checked={activeFilters.collections.includes(collection.slug)}
              onChange={() => handleCollectionChange(collection.slug)}
              count={collection.products.length}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price range filter */}
      <FilterSection title="PRICE" sectionKey="price">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-xs text-gray-500">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min={priceRange.min}
                max={activeFilters.priceRange.max}
                value={activeFilters.priceRange.min}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-full rounded-none border-2 border-black py-1.5 pl-7 pr-3 text-sm"
                aria-label="Minimum price"
              />
            </div>
          </div>
          <div className="text-gray-400">-</div>
          <div className="flex-1">
            <label className="mb-1 block text-xs text-gray-500">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min={activeFilters.priceRange.min}
                max={priceRange.max}
                value={activeFilters.priceRange.max}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-full rounded-none border-2 border-black py-1.5 pl-7 pr-3 text-sm"
                aria-label="Maximum price"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Sizes filter */}
      <FilterSection title="SIZES" sectionKey="sizes">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`min-w-[40px] py-1 px-2 text-xs font-bold border-2 transition-colors ${
                activeFilters.sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/50 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Colors filter */}
      <FilterSection title="COLORS" sectionKey="colors">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isActive = activeFilters.colors.includes(color);
            const bgColor = color === 'natural' ? '#e8dcc2' : color;
            
            return (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`relative h-8 w-8 rounded-full border-2 transition-colors ${
                  isActive 
                    ? "border-black ring-2 ring-yellow-300 ring-offset-1" 
                    : "border-gray-400 hover:border-black"
                }`}
                style={{ backgroundColor: bgColor }}
                title={color}
              >
                {isActive && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 1L4.125 9L1 5.5" stroke={['white', 'yellow', 'beige', 'natural'].includes(color) ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Other filters */}
      <FilterSection title="OTHER" sectionKey="other">
        <div className="space-y-2">
          <Checkbox
            id="sale-items"
            label="On Sale"
            checked={activeFilters.onSale}
            onChange={() => handleBooleanFilter("onSale", !activeFilters.onSale)}
          />
          <Checkbox
            id="in-stock"
            label="In Stock"
            checked={activeFilters.inStock}
            onChange={() => handleBooleanFilter("inStock", !activeFilters.inStock)}
          />
          <Checkbox
            id="new-arrivals"
            label="New Arrivals"
            checked={activeFilters.newArrivals}
            onChange={() => handleBooleanFilter("newArrivals", !activeFilters.newArrivals)}
          />
        </div>
      </FilterSection>
    </div>
  );
} 