import { Collection } from "@/lib/types";
import { products } from "@/data/products";

// Helper function to get products for a collection
const getProductsForCollection = (collectionSlug: string) => {
  const filteredProducts = products.filter(product => 
    product.collection === collectionSlug || 
    product.category === collectionSlug
  );
  // Always return an array, even if empty
  return Array.isArray(filteredProducts) ? filteredProducts : [];
};

export const collections: Collection[] = [
  {
    id: "1",
    name: "Snapbacks",
    slug: "snapbacks",
    description: "Adjustable snapback hats with flat brims and structured crowns.",
    image: "/images/hats/placeholder1.jpg",
    products: getProductsForCollection("snapbacks")
  },
  {
    id: "2",
    name: "Dad Hats",
    slug: "dad-hats",
    description: "Relaxed, low-profile caps with curved brims and unstructured crowns.",
    image: "/images/hats/placeholder1.jpg",
    products: getProductsForCollection("dad-hats")
  },
  {
    id: "3",
    name: "Fitted Caps",
    slug: "fitted-caps",
    description: "Structured caps with flat brims that come in specific sizes for a perfect fit.",
    image: "/images/hats/placeholder1.jpg",
    products: getProductsForCollection("fitted-caps")
  },
  {
    id: "4",
    name: "Beanies",
    slug: "beanies",
    description: "Warm, knitted caps that fit snugly on the head, perfect for cold weather.",
    image: "/images/hats/placeholder1.jpg",
    products: getProductsForCollection("beanies")
  },
  {
    id: "5",
    name: "Bucket Hats",
    slug: "bucket-hats",
    description: "Round, wide-brimmed hats that slope downward, offering sun protection and a casual look.",
    image: "/images/hats/placeholder1.jpg",
    products: getProductsForCollection("bucket-hats")
  },
  {
    id: "6",
    name: "Limited Edition",
    slug: "limited-edition",
    description: "Exclusive, limited-run designs that are only available for a short time.",
    image: "/images/hats/placeholder1.jpg",
    products: getProductsForCollection("limited-edition")
  },
]; 