"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ProductSortProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "top-rated", label: "Top Rated" },
  { value: "best-selling", label: "Best Selling" },
];

export default function ProductSort({ sortOption, setSortOption }: ProductSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get current option label
  const currentOption = sortOptions.find((option) => option.value === sortOption);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="sort-menu-button"
        type="button"
        className="flex items-center justify-between w-full border-2 border-black bg-white py-2 px-4 text-sm font-bold text-black hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">Sort by: {currentOption?.label || "Featured"}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-56 border-4 border-black bg-white shadow-lg">
          <ul
            role="listbox"
            aria-labelledby="sort-menu-button"
            className="py-1"
          >
            {sortOptions.map((option) => {
              const isSelected = sortOption === option.value;
              
              return (
                <li
                  key={option.value}
                  role="option"
                  className={`cursor-pointer px-4 py-2 text-sm font-bold hover:bg-yellow-300 border-b border-black/10 last:border-b-0 ${
                    isSelected ? "bg-yellow-300" : ""
                  }`}
                  onClick={() => {
                    setSortOption(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
} 