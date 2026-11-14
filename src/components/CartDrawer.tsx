import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  shade: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, shade: string, delta: number) => void;
  onRemoveItem: (productId: string, shade: string) => void;
  onCheckout: () => void;
  onBrowseShop: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  onBrowseShop,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 65;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2b1e24]/30 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <aside className="relative z-10 w-full max-w-md h-full bg-[#faf2f5] shadow-2xl flex flex-col justify-between p-6 overflow-hidden">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#ebd9e0]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#2b1e24]">Your Bag</h2>
              <p className="text-xs text-[#876b76] mt-0.5 tabular-nums">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items selected
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bag"
              className="neu-btn w-10 h-10 rounded-full flex items-center justify-center text-[#5e4952] hover:text-[#2b1e24] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 p-4 rounded-2xl neu-surface">
            <p className="text-xs font-medium text-[#5e4952] mb-2">
              {remaining === 0
                ? 'Complimentary express shipping unlocked'
                : `Add $${remaining.toFixed(2)} more for free shipping`}
            </p>
            <div className="w-full h-2 rounded-full neu-inset overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#eb618d] to-[#c63664] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto my-5 space-y-4 pr-1">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
              <div className="neu-surface w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#c63664]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-display text-xl font-medium text-[#2b1e24]">Your bag is empty</p>
              <p className="text-sm text-[#614b54] mt-1 mb-6 max-w-xs">
                Explore gentle botanical skincare and soft everyday color.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseShop();
                }}
                className="neu-pink-gradient px-6 py-3 rounded-full text-sm font-semibold cursor-pointer"
              >
                Explore Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.shade}`}
                className="neu-surface rounded-2xl p-3.5 flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#f9eef2]"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#2b1e24] truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-[#876b76] mt-0.5">{item.shade}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="neu-inset rounded-full px-1.5 py-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.shade, -1)}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        className="neu-btn w-7 h-7 rounded-full flex items-center justify-center text-[#5e4952] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold text-[#2b1e24] w-5 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.shade, 1)}
                        aria-label={`Increase quantity of ${item.product.name}`}
                        className="neu-btn w-7 h-7 rounded-full flex items-center justify-center text-[#5e4952] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#2b1e24] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.shade)}
                        aria-label={`Remove ${item.product.name}`}
                        className="p-1.5 text-[#876b76] hover:text-[#b9305c] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-[#ebd9e0]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#614b54]">Subtotal</span>
              <span className="text-lg font-semibold text-[#2b1e24] tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="w-full neu-pink-gradient py-3.5 rounded-full text-sm font-semibold cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
