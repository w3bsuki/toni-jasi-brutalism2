import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";

import { products } from "@/data/products";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Hat Store`,
    description: product.description || `Shop our ${product.name} hat`,
    openGraph: {
      title: `${product.name} | Premium Hats & Caps`,
      description: product.description || `Shop our ${product.name} hat`,
      images: [product.images[0]],
      type: 'article',
      url: `https://hatstore.example.com/product/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Create structured data for better SEO
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Hat Store',
    },
    offers: {
      '@type': 'Offer',
      url: `https://hatstore.example.com/product/${product.slug}`,
      priceCurrency: 'USD',
      price: product.salePrice || product.price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.5,
      reviewCount: product.reviewCount || 24,
    },
  };

  // Format price with discount
  const formatPrice = (price: number, discount?: number) => {
    if (discount && discount > 0) {
      const discountedPrice = price * (1 - discount / 100);
      return (
        <>
          <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg line-through opacity-60">${price.toFixed(2)}</span>
            <span className="text-sm bg-red-600 text-white px-2 py-1">-{discount}%</span>
          </div>
        </>
      );
    }
    return <span className="text-3xl font-bold">${price.toFixed(2)}</span>;
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen pb-16">
        {/* Brutalist Breadcrumb */}
        <div className="bg-yellow-300 border-y-4 border-black py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center font-bold text-black">
              <Link href="/" className="hover:underline">HOME</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/collections" className="hover:underline">COLLECTIONS</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>{product.name.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Images */}
            <div className="relative border-4 border-black">
              <div className="aspect-square relative">
                <Image 
                  src={product.images[0]} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                
                {/* Sale tag if discounted */}
                {product.discount && product.discount > 0 && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-4 py-1 text-sm uppercase">
                    Sale
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                {product.name}
              </h1>
              
              <div className="my-4">
                {formatPrice(product.price, product.discount)}
              </div>
              
              <div className="prose prose-lg max-w-none my-6">
                <p>{product.description || "No description available for this product."}</p>
              </div>
              
              <div className="my-6">
                <h3 className="text-lg font-bold mb-2">FEATURES:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Premium Quality Materials</li>
                  <li>Adjustable Fit</li>
                  <li>Water Resistant</li>
                  <li>Embroidered Logo</li>
                </ul>
              </div>
              
              {/* Add to Cart Button - Brutalist Style */}
              <button className="bg-black text-white border-4 border-black font-black text-lg uppercase py-3 px-6 hover:bg-yellow-300 hover:text-black transition-colors duration-300 flex items-center justify-center gap-2 mt-auto transform hover:-translate-y-1 hover:rotate-[-1deg]">
                <ShoppingBag size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function generateStaticParams() {
  // Ensure we have a valid array of products with the slug property
  const validProducts = Array.isArray(products) ? products.filter(product => product && product.slug) : [];
  return validProducts.map((product) => ({
    slug: product.slug,
  }));
} 