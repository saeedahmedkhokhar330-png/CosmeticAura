import { ArrowLeft, Check, Heart, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product, PRODUCTS } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, shade: string, quantity: number) => void;
  onSelectProduct: (id: string) => void;
  onBackToShop: () => void;
}

export function ProductDetailPage({
  product,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onBackToShop,
}: ProductDetailPageProps) {
  const [selectedShade, setSelectedShade] = useState(product.shades[0]?.name ?? 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setSelectedShade(product.shades[0]?.name ?? 'Standard');
    setQuantity(1);
    setAddedFeedback(false);
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    onAddToCart(product, selectedShade, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-20 space-y-16">
      <button
        type="button"
        onClick={onBackToShop}
        className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-[#2b1e24] inline-flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Shop</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Raised Neumorphic Product Gallery */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <div className="neu-surface rounded-[2rem] p-5">
            <div className="aspect-[4/3] w-full rounded-[1.5rem] overflow-hidden bg-[#f9eef2]">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-6 neu-surface rounded-[2rem] p-7 sm:p-9 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#876b76]">
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

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2b1e24] text-balance">
                {product.name}
              </h1>
              <span className="text-2xl font-semibold text-[#2b1e24] tabular-nums shrink-0">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#614b54] mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Shade / Edition Selector */}
          <div className="pt-4 border-t border-[#ebd9e0]">
            <p className="text-xs font-semibold text-[#2b1e24] mb-3">
              Option: <span className="font-normal text-[#614b54]">{selectedShade}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.shades.map((shade) => {
                const active = selectedShade === shade.name;
                return (
                  <button
                    key={shade.name}
                    type="button"
                    onClick={() => setSelectedShade(shade.name)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                      active
                        ? 'neu-pink-gradient'
                        : 'neu-btn text-[#2b1e24]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-xs shrink-0"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span>{shade.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="pt-4 border-t border-[#ebd9e0] space-y-2">
            {product.highlights.map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-[#5e4952]">
                <Check className="w-4 h-4 text-[#c63664] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Quantity & Primary Action */}
          <div className="pt-4 border-t border-[#ebd9e0] flex flex-wrap items-center gap-4">
            <div className="neu-inset rounded-full px-2 py-1.5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="neu-btn w-9 h-9 rounded-full flex items-center justify-center text-[#2b1e24] cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-semibold text-[#2b1e24] w-6 text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="neu-btn w-9 h-9 rounded-full flex items-center justify-center text-[#2b1e24] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 min-w-[180px] neu-pink-gradient py-3.5 px-6 rounded-full text-sm font-semibold cursor-pointer"
            >
              {addedFeedback
                ? 'Added to Bag'
                : `Add to Bag · $${(product.price * quantity).toFixed(2)}`}
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from saved' : 'Save item'}
              aria-pressed={isWishlisted}
              className="neu-btn w-12 h-12 rounded-full flex items-center justify-center text-[#5e4952] hover:text-[#c63664] cursor-pointer shrink-0"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#d44270] text-[#d44270]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="pt-6">
        <h2 className="font-display text-2xl font-semibold text-[#2b1e24] mb-7">
          Pair With
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isWishlisted={wishlist.includes(item.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={(prod) => onAddToCart(prod, prod.shades[0]?.name ?? 'Standard', 1)}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
