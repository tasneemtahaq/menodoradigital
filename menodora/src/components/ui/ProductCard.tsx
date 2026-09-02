import Link from "next/link";
import Image from "next/image";
import { WishlistButton } from "./WishlistButton";
import { AddToCartButton } from "./AddToCartButton";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image1?: string | null;
};

export function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.discountPrice !== undefined;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-900">
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-72 overflow-hidden">
          {product.image1 ? (
            <Image
              src={product.image1}
              alt={`${product.name} - Digital Printed Rida Fabric | Menodora`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-neutral-800 to-neutral-900">
              <span className="text-sm tracking-widest text-luxury-gold/30 uppercase">
                {product.name} 
              </span>
            </div>
          )}

          {hasDiscount && (
            <span className="absolute top-3 left-3 rounded-full bg-luxury-gold px-3 py-1 text-xs font-semibold text-luxury-black">
              SALE
            </span>
          )}

          {isOutOfStock && (
            <span className="absolute top-3 left-3 rounded-full bg-neutral-700 px-3 py-1 text-xs font-semibold text-white">
              OUT OF STOCK
            </span>
          )}
        </div>
      </Link>

      <WishlistButton productId={product.id} />

      {/* Info */}
      <div className="p-5">
        <p className="text-xs tracking-wide text-gray-400 uppercase">
          {product.category}
        </p>
        <h3 className="mt-1 text-base font-semibold text-luxury-white">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-luxury-gold">
                Rs. {product.discountPrice?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-luxury-gold">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-gray-500">
          {isOutOfStock ? "Currently unavailable" : `${product.stock} pieces left`}
        </p>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}