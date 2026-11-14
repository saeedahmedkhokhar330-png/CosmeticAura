import { ArrowLeft, CheckCircle2, CreditCard, Truck } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { CartItem } from '../components/CartDrawer';

interface CheckoutPageProps {
  items: CartItem[];
  onClearCart: () => void;
  onBackToShop: () => void;
}

export function CheckoutPage({ items, onClearCart, onBackToShop }: CheckoutPageProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    customerName: string;
    city: string;
    method: string;
  } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 65 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) return;
    const orderNum = `AU-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      total,
      customerName: fullName.trim(),
      city: city.trim(),
      method: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment',
    });
    onClearCart();
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-12 pb-20">
        <div className="neu-surface rounded-[2rem] p-8 sm:p-12 text-center space-y-5">
          <div className="neu-btn w-16 h-16 rounded-full flex items-center justify-center mx-auto text-[#c63664]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-xs font-medium tracking-wider text-[#b9305c]">Order Confirmed</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2b1e24]">
            Order #{confirmedOrder.orderNumber} — Preparing Shipment
          </h1>
          <p className="text-sm text-[#614b54] max-w-md mx-auto">
            Thank you, {confirmedOrder.customerName}. Your parcel will be dispatched to{' '}
            {confirmedOrder.city} ({confirmedOrder.method}).
          </p>

          <div className="neu-inset rounded-2xl p-4 max-w-xs mx-auto flex items-center justify-between text-sm">
            <span className="text-[#614b54]">Total Paid / Due</span>
            <span className="font-semibold text-[#2b1e24] tabular-nums">
              ${confirmedOrder.total.toFixed(2)}
            </span>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={onBackToShop}
              className="neu-pink-gradient px-8 py-3.5 rounded-full text-sm font-semibold cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 sm:px-8 pt-16 pb-24 text-center">
        <div className="neu-surface rounded-[2rem] p-10 space-y-4">
          <h1 className="font-display text-3xl font-semibold text-[#2b1e24]">
            Your bag is empty
          </h1>
          <p className="text-sm text-[#614b54]">
            Add a few skincare or makeup essentials before checking out.
          </p>
          <button
            type="button"
            onClick={onBackToShop}
            className="neu-pink-gradient px-7 py-3.5 rounded-full text-sm font-semibold cursor-pointer"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-20 space-y-8">
      <button
        type="button"
        onClick={onBackToShop}
        className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-[#2b1e24] inline-flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Shop</span>
      </button>

      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2b1e24]">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-7 neu-surface rounded-[2rem] p-7 sm:p-9 space-y-5">
          <h2 className="font-display text-2xl font-semibold text-[#2b1e24]">Shipping Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="chk-name" className="block text-xs font-semibold text-[#5e4952] mb-2">
                Full Name
              </label>
              <input
                id="chk-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sana Tariq"
                className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664]"
              />
            </div>

            <div>
              <label htmlFor="chk-phone" className="block text-xs font-semibold text-[#5e4952] mb-2">
                Phone Number
              </label>
              <input
                id="chk-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 234 5678"
                className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="chk-address" className="block text-xs font-semibold text-[#5e4952] mb-2">
              Street Address
            </label>
            <input
              id="chk-address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House 14, Rose Avenue"
              className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="chk-city" className="block text-xs font-semibold text-[#5e4952] mb-2">
                City
              </label>
              <input
                id="chk-city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Lahore"
                className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664]"
              />
            </div>

            <div>
              <label htmlFor="chk-postal" className="block text-xs font-semibold text-[#5e4952] mb-2">
                Postal Code
              </label>
              <input
                id="chk-postal"
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="54000"
                className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664]"
              />
            </div>
          </div>

          <div className="pt-3">
            <p className="text-xs font-semibold text-[#5e4952] mb-3">Payment Method</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-2xl text-sm font-semibold flex items-center gap-3 cursor-pointer ${
                  paymentMethod === 'cod' ? 'neu-pink-gradient' : 'neu-btn text-[#2b1e24]'
                }`}
              >
                <Truck className="w-4 h-4 shrink-0" />
                <span>Cash on Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl text-sm font-semibold flex items-center gap-3 cursor-pointer ${
                  paymentMethod === 'card' ? 'neu-pink-gradient' : 'neu-btn text-[#2b1e24]'
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>Pay by Card</span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full neu-pink-gradient py-4 rounded-full text-sm font-semibold cursor-pointer tabular-nums"
            >
              Place Order · ${total.toFixed(2)}
            </button>
          </div>
        </form>

        <aside className="lg:col-span-5 neu-surface rounded-[2rem] p-7 space-y-5">
          <h2 className="font-display text-2xl font-semibold text-[#2b1e24]">Order Summary</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.shade}`}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover bg-[#f9eef2] shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#2b1e24] truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[#876b76]">
                      {item.shade} · Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#2b1e24] tabular-nums shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#ebd9e0] space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-[#614b54]">
              <span>Subtotal</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[#614b54]">
              <span>Shipping</span>
              <span className="tabular-nums">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-3 border-t border-[#ebd9e0] flex items-center justify-between text-base font-semibold text-[#2b1e24]">
              <span>Total</span>
              <span className="tabular-nums">${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
