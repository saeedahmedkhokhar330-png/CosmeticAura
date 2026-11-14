import { useEffect, useMemo, useState } from 'react';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Navbar, PageRoute } from './components/Navbar';
import { Product, PRODUCTS } from './data/products';
import { AboutPage } from './pages/AboutPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShopPage } from './pages/ShopPage';

interface RouteState {
  page: PageRoute;
  productId?: string;
}

function parseHashRoute(): RouteState {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { page: 'home' };
  if (raw.startsWith('product/')) {
    const id = raw.slice('product/'.length);
    if (PRODUCTS.some((p) => p.id === id)) {
      return { page: 'product', productId: id };
    }
  }
  const validPages: PageRoute[] = ['home', 'shop', 'skincare', 'about', 'contact', 'checkout'];
  if (validPages.includes(raw as PageRoute)) {
    return { page: raw as PageRoute };
  }
  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseHashRoute());
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart_v1');
      if (!saved) return [];
      const parsed = JSON.parse(saved) as { productId: string; shade: string; quantity: number }[];
      return parsed
        .map((entry) => {
          const product = PRODUCTS.find((p) => p.id === entry.productId);
          if (!product) return null;
          return { product, shade: entry.shade, quantity: Math.max(1, entry.quantity) };
        })
        .filter((item): item is CartItem => item !== null);
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist_v1');
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'aura_cart_v1',
        JSON.stringify(
          cart.map((item) => ({
            productId: item.product.id,
            shade: item.shade,
            quantity: item.quantity,
          })),
        ),
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  const navigate = (page: PageRoute, productId?: string) => {
    const targetHash = page === 'product' && productId ? `#/product/${productId}` : page === 'home' ? '#/' : `#/${page}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    } else {
      setRoute({ page, productId });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2200);
  };

  const handleAddToCart = (product: Product, shade?: string, quantity = 1) => {
    const chosenShade = shade ?? product.shades[0]?.name ?? 'Standard';
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.shade === chosenShade,
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [...prev, { product, shade: chosenShade, quantity }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  const handleUpdateQty = (productId: string, shade: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.shade === shade
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (productId: string, shade: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.shade === shade)),
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const activeProduct = useMemo(() => {
    if (route.page !== 'product' || !route.productId) return null;
    return PRODUCTS.find((p) => p.id === route.productId) ?? null;
  }, [route]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf2f5] text-[#2b1e24]">
      <Navbar
        currentPage={route.page}
        cartCount={cartCount}
        onNavigate={(p) => navigate(p)}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {route.page === 'home' && (
          <HomePage
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p)}
            onSelectProduct={(id) => navigate('product', id)}
            onNavigate={(p) => navigate(p)}
          />
        )}

        {route.page === 'shop' && (
          <ShopPage
            key="shop-all"
            initialCategory="All"
            title="All Cosmetics"
            subtitle="Thoughtfully crafted skincare, lip, cheek, and fragrance essentials."
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p)}
            onSelectProduct={(id) => navigate('product', id)}
          />
        )}

        {route.page === 'skincare' && (
          <ShopPage
            key="shop-skincare"
            initialCategory="Skincare"
            title="Botanical Skincare"
            subtitle="Gentle barrier-supporting serums and creams for calm, luminous skin."
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p)}
            onSelectProduct={(id) => navigate('product', id)}
          />
        )}

        {route.page === 'product' && activeProduct && (
          <ProductDetailPage
            product={activeProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={(id) => navigate('product', id)}
            onBackToShop={() => navigate('shop')}
          />
        )}

        {route.page === 'about' && <AboutPage onNavigate={(p) => navigate(p)} />}

        {route.page === 'contact' && <ContactPage />}

        {route.page === 'checkout' && (
          <CheckoutPage
            items={cart}
            onClearCart={() => setCart([])}
            onBackToShop={() => navigate('shop')}
          />
        )}
      </main>

      <Footer onNavigate={(p) => navigate(p)} />

      <CartDrawer
        isOpen={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          navigate('checkout');
        }}
        onBrowseShop={() => navigate('shop')}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-40 neu-surface px-5 py-3 rounded-full text-xs font-semibold text-[#2b1e24] flex items-center gap-3"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="text-[#b9305c] underline underline-offset-2 cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
