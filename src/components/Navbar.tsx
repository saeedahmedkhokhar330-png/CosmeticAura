import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

export type PageRoute = 'home' | 'shop' | 'skincare' | 'about' | 'contact' | 'product' | 'checkout';

interface NavbarProps {
  currentPage: PageRoute;
  cartCount: number;
  onNavigate: (page: PageRoute) => void;
  onOpenCart: () => void;
}

const NAV_ITEMS: { label: string; page: PageRoute }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Shop', page: 'shop' },
  { label: 'Skincare', page: 'skincare' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export function Navbar({ currentPage, cartCount, onNavigate, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf2f5]/90 backdrop-blur-md border-b border-[#ecdce2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display text-2xl font-semibold tracking-tight text-[#2b1e24] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c63664] rounded"
        >
          Aura
        </button>

        {/* Zone 2: Clean Single-Line Text Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.page || (currentPage === 'product' && item.page === 'shop');
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNav(item.page)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c63664] rounded ${
                  isActive
                    ? 'text-[#b9305c]'
                    : 'text-[#614b54] hover:text-[#2b1e24]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#eb618d] to-[#c63664] transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="neu-pink-gradient px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c63664]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden neu-btn w-10 h-10 rounded-full flex items-center justify-center text-[#2b1e24]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-5 pb-5 pt-2 border-t border-[#ecdce2] bg-[#faf2f5]">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNav(item.page)}
                  className={`text-left px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? 'neu-surface text-[#b9305c]'
                      : 'text-[#614b54] hover:text-[#2b1e24]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
