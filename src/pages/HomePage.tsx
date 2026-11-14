import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { HERO_IMAGE, Product, PRODUCTS } from '../data/products';
import { PageRoute } from '../components/Navbar';

interface HomePageProps {
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (id: string) => void;
  onNavigate: (page: PageRoute) => void;
}

export function HomePage({
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}: HomePageProps) {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Section 1: Split Editorial Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center py-4">
            <p className="text-xs font-medium tracking-wider text-[#b9305c] mb-4">
              Botanical Skincare · Everyday Color
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#2b1e24] leading-[1.12] tracking-tight text-balance">
              Soft radiance, sculpted for calm skin.
            </h1>
            <p className="text-base text-[#614b54] mt-5 max-w-md leading-relaxed">
              Weightless rosewater serums, whipped ceramide creams, and satin lip shades crafted
              for gentle daily rituals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="neu-pink-gradient px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c63664]"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="neu-btn px-7 py-3.5 rounded-full text-sm font-semibold text-[#2b1e24] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c63664]"
              >
                Our Story
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <div className="neu-surface rounded-[2rem] p-4 w-full flex">
              <div className="relative w-full rounded-[1.5rem] overflow-hidden bg-[#f9eef2] min-h-[300px]">
                <img
                  src={HERO_IMAGE}
                  alt="Aura Luminous Serum and Velvet Cream on alabaster stone"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Bestsellers */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-[#2b1e24] text-balance">
              Featured Essentials
            </h2>
            <p className="text-sm text-[#614b54] mt-1.5">
              Three gentle staples loved for effortless morning glow.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="neu-btn px-5 py-2.5 rounded-full text-xs font-semibold text-[#2b1e24] inline-flex items-center gap-2 self-start sm:self-auto whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#b9305c]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Pure Botanicals Highlight */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="neu-pink-soft-gradient rounded-[2rem] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-medium tracking-wider text-[#b9305c]">
              Clean Formulation
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2b1e24] leading-tight text-balance">
              Kind ingredients that let skin breathe.
            </h2>
            <p className="text-sm sm:text-base text-[#614b54] max-w-xl leading-relaxed">
              Every jar and dropper blends cold-pressed Damask rosehip, plant squalane, and
              barrier-supporting ceramides—free from heavy silicones and synthetic dyes.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-4">
            <button
              type="button"
              onClick={() => onNavigate('skincare')}
              className="neu-pink-gradient px-7 py-3.5 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore Skincare
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="neu-btn px-7 py-3.5 rounded-full text-sm font-semibold text-[#2b1e24] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Ask a Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
