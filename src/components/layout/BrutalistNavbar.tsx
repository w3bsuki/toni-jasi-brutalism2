"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X, ChevronDown, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
}

const navItems: NavItem[] = [
  {
    label: "NEW",
    href: "/new",
    children: [
      { label: "NEW ARRIVALS", href: "/new/arrivals" },
      { label: "BEST SELLERS", href: "/new/best-sellers" },
    ],
  },
  {
    label: "COLLECTIONS",
    href: "/collections",
    children: [
      { label: "SUMMER COLLECTION", href: "/collections/summer" },
      { label: "WINTER COLLECTION", href: "/collections/winter" },
      { label: "LIMITED EDITION", href: "/collections/limited-edition" },
    ],
  },
  {
    label: "STYLES",
    href: "/styles",
    children: [
      { label: "SNAPBACK", href: "/styles/snapback" },
      { label: "FITTED", href: "/styles/fitted" },
      { label: "DAD HATS", href: "/styles/dad-hats" },
      { label: "BEANIES", href: "/styles/beanies" },
    ],
  },
  { label: "SALE", href: "/sale" },
];

export function BrutalistNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component renders client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`sticky top-0 z-40 bg-black transition-all duration-300 border-b-4 border-yellow-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo and Social Media */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-black text-white tracking-tighter transform hover:skew-x-2 transition-transform duration-200">
              NOCAP
            </Link>
            
            {/* Social Media - Brutalist Style */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-1.5 border-2 border-black hover:bg-yellow-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={2.5} />
              </a>
              
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-1.5 border-2 border-black hover:bg-yellow-300 transition-colors"
                aria-label="TikTok"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M19.321 5.562a5.122 5.122 0 0 1-3.664-1.514 5.12 5.12 0 0 1-1.514-3.664h-3.844v12.926c0 1.614-1.312 2.926-2.926 2.926a2.927 2.927 0 0 1-2.927-2.926 2.927 2.927 0 0 1 2.927-2.927c.323 0 .634.052.926.149V6.488a6.963 6.963 0 0 0-.926-.062C3.736 6.426 0 10.163 0 14.8c0 4.636 3.736 8.373 8.373 8.373 4.638 0 8.374-3.737 8.374-8.373V9.146a9.064 9.064 0 0 0 5.316 1.703v-3.844c-.94 0-1.84-.149-2.742-.443z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Desktop Navigation with Search */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-8 mr-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-white font-bold text-sm tracking-widest hover:text-yellow-300 transition-colors"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180 text-yellow-300" : ""}`} />
                    )}
                  </Link>
                  
                  <div className={`absolute h-[3px] bottom-0 left-0 bg-yellow-300 transition-all duration-300 ${
                    activeDropdown === item.label || !item.children ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                  
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white border-4 border-black overflow-hidden z-50"
                      >
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm font-bold text-black tracking-tight hover:bg-yellow-300 transition-colors border-b border-black last:border-b-0"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            
            {/* Search */}
            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "220px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="SEARCH..."
                    className="w-full pl-10 pr-4 py-2 bg-white border-3 border-black text-black font-bold text-sm focus:outline-none focus:bg-yellow-50"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                  <Search 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                  />
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-yellow-600"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              ) : (
                <button
                  className="text-white hover:text-yellow-300 transition-colors p-1"
                  aria-label="Search"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={22} strokeWidth={2.5} />
                </button>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Brutalist SHOP button - Larger */}
            <Link 
              href="/collections"
              className="hidden md:block bg-white border-4 border-black font-black uppercase text-black tracking-widest transform transition-all duration-200 hover:-rotate-1 hover:bg-yellow-300 hover:translate-y-[-2px] px-6 py-2.5 text-base"
            >
              SHOP
            </Link>
            
            {/* Cart Button - Icon only */}
            <Link 
              href="/cart"
              className="relative bg-white p-2.5 border-3 border-black hover:bg-yellow-300 transition-colors flex items-center justify-center"
              aria-label="View cart"
            >
              <ShoppingBag size={20} strokeWidth={2.5} className="text-black" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                0
              </span>
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-yellow-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X size={28} strokeWidth={2.5} />
              ) : (
                <Menu size={28} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t-4 border-yellow-300 overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <Link
                    href={item.href}
                    className="font-bold text-black text-lg py-2 tracking-tight flex items-center justify-between"
                    onClick={() => !item.children && setMobileMenuOpen(false)}
                  >
                    {item.label}
                    {item.children && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.label ? null : item.label);
                        }}
                        aria-label={`${activeDropdown === item.label ? "Collapse" : "Expand"} ${item.label} menu`}
                      >
                        <ChevronDown 
                          className={`h-5 w-5 transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                    )}
                  </Link>
                  
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 border-l-4 border-black ml-2 mt-1"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block py-3 font-bold text-black hover:text-yellow-700 tracking-tight"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="h-[2px] w-full bg-black/10 mt-2" />
                </div>
              ))}
              
              {/* Mobile Shop Button */}
              <Link
                href="/collections" 
                className="bg-black text-white font-black text-xl uppercase py-3 text-center tracking-widest border-2 border-black hover:bg-yellow-300 hover:text-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SHOP NOW
              </Link>
              
              {/* Social Icons */}
              <div className="flex gap-3 justify-end mt-2 pt-2 border-t-2 border-black/10">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white p-2 border-2 border-black"
                  aria-label="Instagram"
                >
                  <Instagram size={16} strokeWidth={2.5} />
                </a>
                
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white p-2 border-2 border-black"
                  aria-label="TikTok"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M19.321 5.562a5.122 5.122 0 0 1-3.664-1.514 5.12 5.12 0 0 1-1.514-3.664h-3.844v12.926c0 1.614-1.312 2.926-2.926 2.926a2.927 2.927 0 0 1-2.927-2.926 2.927 2.927 0 0 1 2.927-2.927c.323 0 .634.052.926.149V6.488a6.963 6.963 0 0 0-.926-.062C3.736 6.426 0 10.163 0 14.8c0 4.636 3.736 8.373 8.373 8.373 4.638 0 8.374-3.737 8.374-8.373V9.146a9.064 9.064 0 0 0 5.316 1.703v-3.844c-.94 0-1.84-.149-2.742-.443z"/>
                  </svg>
                </a>
              </div>
              
              {/* Search input in mobile menu */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 text-black font-bold text-sm border-3 border-black focus:outline-none focus:bg-yellow-50"
                />
                <Search 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default BrutalistNavbar; 