import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Product, formatINR } from '../data/products';
import { ResilientImage, RibbonBowIcon } from './DecorMotifs';

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, variant: string, delta: number) => void;
  onRemoveItem: (productId: string, variant: string) => void;
  onClearCart: () => void;
}

type DrawerStep = 'bag' | 'checkout' | 'confirmed';

const FREE_SHIPPING_THRESHOLD = 1499;
const SHIPPING_FEE = 99;

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('bag');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    itemCount: number;
    payment: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && items.length > 0 && step === 'confirmed') {
      setStep('bag');
    }
  }, [open, items.length, step]);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping = subtotal === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = discountedSubtotal + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const freeShippingProgress = Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'HELLOCLUB10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Try code HELLOCLUB10 for 10% off your order.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fullName.trim() ||
      !email.trim() ||
      !/^\d{10}$/.test(phone.trim()) ||
      !address.trim() ||
      !city.trim() ||
      !/^\d{6}$/.test(pincode.trim())
    ) {
      setFormError('Please fill all delivery fields, a 10-digit phone number, and a 6-digit PIN code.');
      return;
    }

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setConfirmedOrder({
      orderId: `HKC-${randomNum}`,
      total,
      itemCount: totalCount,
      payment: paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI / Card',
      name: fullName.trim(),
    });
    setFormError('');
    onClearCart();
    setPromoApplied(false);
    setPromoInput('');
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2B1920]/40 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={handleCloseDrawer}
    >
      <aside
        className="w-full max-w-md h-full bg-[#FFF9F7] border-l border-[#F8C8DC] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#FCE4EC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to bag"
                className="p-1.5 -ml-1.5 text-[#6E515B] hover:text-[#2B1920] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-xl font-semibold text-[#2B1920]">
              {step === 'bag' && 'Your Shopping Bag'}
              {step === 'checkout' && 'Checkout Details'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close bag"
            className="w-9 h-9 rounded-full hover:bg-[#FCE4EC] flex items-center justify-center text-[#2B1920] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step: Bag */}
        {step === 'bag' && (
          <>
            {items.length > 0 && (
              <div className="px-6 py-3 bg-[#FCE4EC]/45 border-b border-[#FCE4EC]">
                <p className="text-xs font-medium text-[#2B1920] mb-1.5">
                  {remainingForFreeShipping === 0
                    ? 'You unlocked complimentary delivery & satin gift wrap ♡'
                    : `Add ${formatINR(remainingForFreeShipping)} more for complimentary delivery`}
                </p>
                <div className="h-1.5 w-full rounded-full bg-white overflow-hidden">
                  <div
                    className="h-full bg-[#E63950] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#FCE4EC] text-[#E63950] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="font-display text-xl font-semibold text-[#2B1920] mb-2">
                    Your bag is feeling light
                  </p>
                  <p className="text-sm text-[#6E515B] max-w-xs mb-6">
                    Explore our coquette plushies, mini bags, and keepsake gifts to fill it with joy.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="px-6 py-2.5 rounded-full bg-[#E63950] text-white text-sm font-semibold hover:bg-[#C8253C] transition-colors cursor-pointer"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant}`}
                    className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#F8C8DC]/60"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FCE4EC]/30 shrink-0">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-[#2B1920] truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-[#6E515B] truncate">{item.variant}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.variant)}
                          aria-label={`Remove ${item.product.name}`}
                          className="p-1 text-[#6E515B] hover:text-[#E63950] cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center rounded-full border border-[#F8C8DC] bg-[#FFF9F7]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.variant, -1)}
                            aria-label="Decrease item quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#2B1920] hover:text-[#E63950] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.variant, 1)}
                            aria-label="Increase item quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#2B1920] hover:text-[#E63950] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#2B1920] tabular-nums">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#FCE4EC] bg-white space-y-4">
                {/* Promo Code */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (HELLOCLUB10)"
                      disabled={promoApplied}
                      className="flex-1 h-10 px-3.5 rounded-full bg-[#FFF9F7] border border-[#F8C8DC] text-xs text-[#2B1920] placeholder:text-[#6E515B]/70 focus:outline-none focus:border-[#E63950]"
                    />
                    <button
                      type="submit"
                      disabled={promoApplied}
                      className="px-4 h-10 rounded-full bg-[#FCE4EC] hover:bg-[#F8C8DC] text-[#2B1920] text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {promoError && <p className="text-[11px] text-[#E63950] pl-2">{promoError}</p>}
                </form>

                {/* Summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#5C434B]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatINR(subtotal)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-[#E63950]">
                      <span>Club Discount (10%)</span>
                      <span className="tabular-nums">−{formatINR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5C434B]">
                    <span>Delivery</span>
                    <span className="tabular-nums">
                      {shipping === 0 ? 'Complimentary' : formatINR(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#2B1920] pt-2 border-t border-[#FCE4EC]">
                    <span>Total</span>
                    <span className="tabular-nums">{formatINR(total)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full h-12 rounded-full bg-[#E63950] hover:bg-[#C8253C] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Proceed to Checkout · {formatINR(total)}
                </button>
              </div>
            )}
          </>
        )}

        {/* Step: Checkout */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-[#FFF0B3]/50 border border-[#F8C8DC] text-xs text-[#2B1920] flex items-center justify-between">
              <span>Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-bold tabular-nums">{formatINR(total)}</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#2B1920] mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aanya Sharma"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#F8C8DC] text-sm focus:outline-none focus:border-[#E63950]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B1920] mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aanya@example.com"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#F8C8DC] text-sm focus:outline-none focus:border-[#E63950]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B1920] mb-1">
                    Mobile (10 digits)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#F8C8DC] text-sm focus:outline-none focus:border-[#E63950] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B1920] mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat 402, Roseate Residency, Bandra West"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#F8C8DC] text-sm focus:outline-none focus:border-[#E63950]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B1920] mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#F8C8DC] text-sm focus:outline-none focus:border-[#E63950]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B1920] mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400050"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#F8C8DC] text-sm focus:outline-none focus:border-[#E63950] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#2B1920] mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-[#FCE4EC] border-[#E63950] text-[#2B1920]'
                        : 'bg-white border-[#F8C8DC] text-[#5C434B]'
                    }`}
                  >
                    UPI / Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-[#FCE4EC] border-[#E63950] text-[#2B1920]'
                        : 'bg-white border-[#F8C8DC] text-[#5C434B]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>
            </div>

            {formError && (
              <p className="text-xs font-medium text-[#C8253C] bg-[#FCE4EC]/60 px-3 py-2 rounded-xl">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#E63950] hover:bg-[#C8253C] text-white text-sm font-semibold transition-colors cursor-pointer mt-2"
            >
              Place Order · {formatINR(total)}
            </button>
          </form>
        )}

        {/* Step: Confirmed */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-[#FCE4EC] text-[#E63950] flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <RibbonBowIcon className="w-6 h-5 text-[#E63950] mb-2" />
            <h3 className="font-display text-2xl font-semibold text-[#2B1920] mb-2">
              Thank you, {confirmedOrder.name}!
            </h3>
            <p className="text-sm text-[#5C434B] mb-6 max-w-xs">
              Order <strong className="text-[#2B1920]">{confirmedOrder.orderId}</strong> is confirmed and being wrapped in pastel tissue &amp; satin ribbon.
            </p>

            <div className="w-full rounded-2xl bg-white border border-[#F8C8DC] p-4 text-left space-y-2 text-xs text-[#5C434B] mb-6">
              <div className="flex justify-between">
                <span>Order Number</span>
                <span className="font-semibold text-[#2B1920] tabular-nums">
                  {confirmedOrder.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Items</span>
                <span className="font-semibold text-[#2B1920] tabular-nums">
                  {confirmedOrder.itemCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span className="font-semibold text-[#2B1920]">{confirmedOrder.payment}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#FCE4EC]">
                <span className="font-semibold text-[#2B1920]">Total Paid / Due</span>
                <span className="font-bold text-[#E63950] tabular-nums">
                  {formatINR(confirmedOrder.total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseDrawer}
              className="w-full h-11 rounded-full bg-[#2B1920] hover:bg-[#E63950] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
