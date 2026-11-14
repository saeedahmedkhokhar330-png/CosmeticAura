import { PageRoute } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#ebd9e0] bg-[#f7edf1]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="font-display text-xl font-semibold text-[#2b1e24] cursor-pointer"
          >
            Aura
          </button>
          <p className="text-xs text-[#876b76] mt-1">
            Botanical skincare and soft color cosmetics.
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#614b54]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#b9305c] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="hover:text-[#b9305c] transition-colors cursor-pointer"
          >
            Shop
          </button>
          <button
            type="button"
            onClick={() => onNavigate('skincare')}
            className="hover:text-[#b9305c] transition-colors cursor-pointer"
          >
            Skincare
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-[#b9305c] transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="hover:text-[#b9305c] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        <p className="text-xs text-[#876b76]">
          © {new Date().getFullYear()} Aura Cosmetics
        </p>
      </div>
    </footer>
  );
}
