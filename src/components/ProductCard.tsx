import { Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelect: (productId: string) => void;
}

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelect,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="neu-card rounded-3xl p-4 flex flex-col justify-between">
      <div>
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#f9eef2] mb-4">
          <button
            type="button"
            onClick={() => onSelect(product.id)}
            className="block w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c63664] rounded-2xl"
            aria-label={`View ${product.name}`}
          >
            {imgError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#fff5f8] to-[#f3d9e3] text-[#876b76] p-4 text-center">
                <Sparkles className="w-6 h-6 mb-2 text-[#c63664]" />
                <span className="text-sm font-medium">{product.name}</span>
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
              />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? `Remove ${product.name} from saved` : `Save ${product.name}`}
            aria-pressed={isWishlisted}
            className="neu-btn absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-[#5e4952] hover:text-[#c63664] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c63664]"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-[#d44270] text-[#d44270]' : ''
              }`}
            />
          </button>
        </div>

        <div className="px-1">
          <div className="flex items-center gap-2 text-xs text-[#876b76] mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.size}</span>
            {product.tag ? (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#b9305c] font-medium">{product.tag}</span>
              </>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onSelect(product.id)}
            className="text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c63664] rounded"
          >
            <h3 className="text-lg font-semibold text-[#2b1e24] group-hover:text-[#b9305c] transition-colors leading-snug">
              {product.name}
            </h3>
          </button>

          <p className="text-sm text-[#614b54] mt-1 line-clamp-1">{product.shortNote}</p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#ebd9e0] px-1 flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-[#2b1e24] tabular-nums">
          ${product.price.toFixed(2)}
        </span>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="neu-pink-gradient px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c63664]"
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}
