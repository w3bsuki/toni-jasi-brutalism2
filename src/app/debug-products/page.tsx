import Link from "next/link";
import { products } from "@/data/products";

export default function DebugProductsPage() {
  // Ensure products is an array
  const productsList = Array.isArray(products) ? products : [];
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Products Debug</h1>
      <p className="mb-4">Total products: {productsList.length}</p>
      
      <div className="grid gap-4">
        {productsList.map((product) => (
          <div key={product.id} className="border p-4 rounded-md">
            <h2 className="font-bold">{product.name}</h2>
            <p className="font-mono text-sm">ID: {product.id}</p>
            <p className="font-mono text-sm">Slug: {product.slug}</p>
            <p>Images: {Array.isArray(product.images) ? product.images.length : 0} available</p>
            <p>First image: {Array.isArray(product.images) && product.images[0] ? product.images[0].substring(0, 30) + '...' : 'No image'}</p>
            <div className="mt-2 flex gap-2">
              <Link 
                href={`/product/${encodeURIComponent(product.slug)}`}
                className="text-blue-500 hover:underline"
              >
                View Product Page
              </Link>
              <span className="text-gray-400">|</span>
              <a 
                href={`/product/${encodeURIComponent(product.slug)}`}
                target="_blank"
                className="text-green-500 hover:underline"
              >
                Open in New Tab
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 