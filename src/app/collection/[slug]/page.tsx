import React from "react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import type { Metadata } from "next";

// Define a list of valid collection slugs for static generation
const VALID_COLLECTIONS = [
  "snapbacks",
  "dad-hats",
  "fitted-caps",
  "beanies",
  "bucket-hats",
  "limited-edition"
];

// Get collection details (would normally come from database)
function getCollectionDetails(slug: string) {
  const collections = {
    "snapbacks": {
      name: "Snapbacks",
      description: "Adjustable snapback hats with flat brims and structured crowns."
    },
    "dad-hats": {
      name: "Dad Hats",
      description: "Relaxed, low-profile caps with curved brims and unstructured crowns."
    },
    "fitted-caps": {
      name: "Fitted Caps",
      description: "Structured caps with flat brims that come in specific sizes for a perfect fit."
    },
    "beanies": {
      name: "Beanies",
      description: "Warm, knitted caps that fit snugly on the head, perfect for cold weather."
    },
    "bucket-hats": {
      name: "Bucket Hats",
      description: "Round, wide-brimmed hats that slope downward, offering sun protection and a casual look."
    },
    "limited-edition": {
      name: "Limited Edition",
      description: "Exclusive, limited-run designs that are only available for a short time."
    }
  };
  
  return collections[slug as keyof typeof collections];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { slug } = params;
  const collection = getCollectionDetails(slug);
  
  if (!collection) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: `${collection.name} | Hat Store`,
    description: collection.description || `Shop our ${collection.name} collection`,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const collection = getCollectionDetails(slug);
  
  if (!collection) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{collection.name}</h1>
          {collection.description && (
            <p className="mt-2 text-gray-600">{collection.description}</p>
          )}
        </div>
        
        <Suspense fallback={<ProductGridSkeleton />}>
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">We're working on adding products to this collection.</p>
            <p className="text-gray-500">Please check back soon!</p>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_COLLECTIONS.map(slug => ({ slug }));
} 