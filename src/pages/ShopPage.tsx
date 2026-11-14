import { Heart, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product, ProductCategory, PRODUCTS } from '../data/products';

interface ShopPageProps {
  initialCategory?: ProductCategory | 'All';
  title: string;
  subtitle: string;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (id: string) => void;
}

const CATEGORIES: (ProductCategory | 'All')[] = [
  'All',
  'Skincare',
  'Lips',
  'Cheeks',
  'Fragrance',
  'Sets',
];

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function ShopPage({
  initialCategory = 'All',
  title,
  subtitle,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [savedOnly, setSavedOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      if (savedOnly && !wishlist.includes(product.id)) return false;
      if (
        query &&
        !product.name.toLowerCase().includes(query) &&
        !product.shortNote.toLowerCase().includes(query) &&
        !product.category.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy, savedOnly, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSavedOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-20 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-semibold text-[#2b1e24] text-balance">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#614b54] mt-2">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="neu-inset rounded-full px-4 py-2.5 flex items-center gap-2.5 flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#876b76] shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cosmetics..."
              aria-label="Search cosmetics"
              className="w-full bg-transparent text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="text-[#876b76] hover:text-[#2b1e24] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSavedOnly((prev) => !prev)}
            aria-pressed={savedOnly}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              savedOnly ? 'neu-pink-gradient' : 'neu-btn text-[#2b1e24]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${savedOnly ? 'fill-white' : ''}`} />
            <span className="tabular-nums">Saved ({wishlist.length})</span>
          </button>
        </div>
      </div>

      {/* Category Segmented Controls & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Product categories"
          className="neu-inset p-1.5 rounded-full flex items-center gap-1 overflow-x-auto"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                  active
                    ? 'neu-pink-gradient'
                    : 'text-[#614b54] hover:text-[#2b1e24]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-[#876b76] tabular-nums whitespace-nowrap">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="neu-btn rounded-full px-4 py-2 text-xs font-semibold text-[#2b1e24] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c63664] cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="neu-surface rounded-3xl p-12 text-center max-w-lg mx-auto">
          <h2 className="font-display text-2xl font-semibold text-[#2b1e24]">
            No matching essentials
          </h2>
          <p className="text-sm text-[#614b54] mt-2 mb-6">
            Try clearing your search or switching back to all categories.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="neu-pink-gradient px-6 py-3 rounded-full text-sm font-semibold cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
}
