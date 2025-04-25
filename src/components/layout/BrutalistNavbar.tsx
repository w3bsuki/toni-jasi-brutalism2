"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X, ChevronDown, Instagram, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";

interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
}

// Navigation items
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
    label: "SHOP",
    href: "/shop",
    children: [
      { label: "ALL PRODUCTS", href: "/shop" },
      { label: "SNAPBACK", href: "/styles/snapback" },
      { label: "FITTED", href: "/styles/fitted" },
      { label: "DAD HATS", href: "/styles/dad-hats" },
      { label: "BEANIES", href: "/styles/beanies" },
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
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileActiveSubmenu(prev => prev === label ? null : label);
  };

  return (
    <header 
      className={`sticky top-0 z-40 bg-black transition-all duration-300 border-b-4 border-yellow-300 w-full ${
        scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo and Social Media */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tighter transform hover:skew-x-2 transition-transform duration-200">
              ХУЛИГАНКА
            </Link>
            
            {/* Social Media - Brutalist Style */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-1.5 border-2 border-black hover:bg-yellow-300 transition-colors transform hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={2.5} />
              </a>
              
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-1.5 border-2 border-black hover:bg-yellow-300 transition-colors transform hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
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
            <nav className="flex items-center gap-6 lg:gap-8 mr-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-white font-bold text-sm tracking-widest hover:text-yellow-300 transition-colors py-1 relative"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180 text-yellow-300" : ""}`} />
                    )}
                  </Link>
                  
                  <div className={`absolute h-[3px] bottom-0 left-0 bg-yellow-300 transition-all duration-300 ${
                    activeDropdown === item.label ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                  
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white border-4 border-black overflow-hidden z-50 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
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
            
            {/* Desktop Search */}
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
                  className="text-white hover:text-yellow-300 transition-colors p-1 hover:rotate-[1deg]"
                  aria-label="Search"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={22} strokeWidth={2.5} />
                </button>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Search Button */}
          <div className="flex md:hidden ml-auto mr-2">
            <button
              className="text-white hover:text-yellow-300 transition-colors p-1"
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-5">
            {/* Brutalist SHOP button with visible borders */}
            <Link 
              href="/shop"
              className="hidden md:block relative bg-yellow-300 border-4 border-black font-black uppercase text-black tracking-widest px-6 py-2.5 text-base hover:bg-black hover:text-yellow-300 hover:border-yellow-300 transition-all"
            >
              SHOP
            </Link>
            
            {/* Cart Button - With improved brutalist style */}
            <Link 
              href="/cart"
              className="group relative bg-white border-2 sm:border-3 border-yellow-300 hover:bg-black transition-colors flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 relative">
                <ShoppingBag 
                  size={18} 
                  className="text-black group-hover:text-yellow-300 transition-colors" 
                />
                
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-black text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center border border-yellow-300">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-3"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="SEARCH..."
                  className="w-full pl-10 pr-10 py-2 bg-white border-2 border-black text-black font-bold text-sm focus:outline-none focus:bg-yellow-50"
                  autoFocus
                />
                <Search 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[57px] sm:top-[73px] bg-black border-t-2 border-yellow-300 overflow-auto pb-20 z-50"
          >
            <div className="p-4">
              <nav className="flex flex-col divide-y divide-gray-800">
                {navItems.map((item) => (
                  <div key={item.label} className="py-3">
                    <div className="flex items-center justify-between">
                      {!item.children ? (
                        <Link 
                          href={item.href}
                          className="text-white text-xl font-bold tracking-tight"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          className="flex items-center justify-between w-full text-left text-white text-xl font-bold tracking-tight"
                          onClick={() => toggleMobileSubmenu(item.label)}
                        >
                          <span>{item.label}</span>
                          <ChevronRight
                            className={`w-5 h-5 transform transition-transform duration-200 ${
                              mobileActiveSubmenu === item.label ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile Submenu */}
                    {item.children && (
                      <AnimatePresence>
                        {mobileActiveSubmenu === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 ml-4 overflow-hidden"
                          >
                            <div className="flex flex-col space-y-2 border-l-2 border-gray-700 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="text-gray-300 font-medium text-base py-1 hover:text-yellow-300 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Mobile Shop Button */}
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="block w-full bg-yellow-300 border-2 border-black font-black uppercase text-black tracking-widest px-6 py-3 text-center text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SHOP NOW
                </Link>
              </div>
              
              {/* Mobile Social Links */}
              <div className="mt-6 flex items-center gap-4 justify-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black p-2 border-2 border-black hover:bg-yellow-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} strokeWidth={2.5} />
                </a>
                
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black p-2 border-2 border-black hover:bg-yellow-300 transition-colors"
                  aria-label="TikTok"
                >
                  <svg 
                    width="18" 
                    height="18" 
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default BrutalistNavbar; 