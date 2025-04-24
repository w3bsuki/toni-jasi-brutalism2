"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";

const footerLinks = [
  {
    title: "SHOP",
    links: [
      { name: "ALL PRODUCTS", href: "/collections" },
      { name: "NEW ARRIVALS", href: "/new/arrivals" },
      { name: "BEST SELLERS", href: "/new/best-sellers" },
      { name: "ON SALE", href: "/sale" },
    ],
  },
  {
    title: "COLLECTIONS",
    links: [
      { name: "SNAPBACK", href: "/styles/snapback" },
      { name: "FITTED", href: "/styles/fitted" },
      { name: "DAD HATS", href: "/styles/dad-hats" },
      { name: "BEANIES", href: "/styles/beanies" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { name: "ABOUT US", href: "/about" },
      { name: "CONTACT", href: "/contact" },
      { name: "STORES", href: "/stores" },
    ],
  },
  {
    title: "HELP",
    links: [
      { name: "SHIPPING & RETURNS", href: "/shipping" },
      { name: "FAQ", href: "/faq" },
      { name: "PRIVACY POLICY", href: "/privacy" },
      { name: "TERMS OF SERVICE", href: "/terms" },
    ],
  },
];

export function BrutalistFooter() {
  return (
    <footer className="bg-black text-white border-t-4 border-yellow-300">
      {/* Newsletter signup - brutalist style */}
      <div className="w-full bg-yellow-300 py-10 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter leading-none">
                JOIN THE HAT GANG
              </h2>
              <p className="mt-3 text-black font-bold">
                Get 15% off your first order + exclusive drops
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative flex">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full py-3 px-4 bg-white border-4 border-black text-black font-bold focus:outline-none"
                />
                <button className="group relative flex items-center justify-center bg-black text-white py-3 px-5 border-4 border-black font-bold text-base uppercase hover:bg-white hover:text-black transition-colors">
                  <span>SIGN UP</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-black uppercase mb-6 text-white tracking-tight">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-yellow-300 font-bold transition-colors text-sm tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo and social media */}
        <div className="mt-16 pt-8 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-3xl font-black text-white uppercase tracking-tighter">
              NOCAP
            </Link>
            <p className="mt-2 text-white/60 text-sm">
              © {new Date().getFullYear()} NOCAP LLC. All rights reserved.
            </p>
          </div>
          
          {/* Social media links - brutalist style */}
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
            ].map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="bg-white text-black p-2 border-3 border-black hover:bg-yellow-300 transition-colors transform hover:rotate-2"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom brutalist design element */}
        <div className="mt-8 h-6 bg-yellow-300 border-t-4 border-b-4 border-black relative">
          <div className="absolute top-0 right-0 w-24 h-6 bg-white border-l-4 border-black transform -skew-x-12"></div>
        </div>
      </div>
    </footer>
  );
}

export default BrutalistFooter; 