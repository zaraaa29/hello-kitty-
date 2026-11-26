import React, { useEffect, useState } from 'react';
import { Check, Heart, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import { Product, formatINR } from '../data/products';
import { ResilientImage } from './DecorMotifs';

interface ProductModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
}

export function ProductModal({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAdd = () => {
    onAddToCart(product, selectedVariant || product.variants[0], quantity);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B1920]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FFF9F7] rounded-3xl border border-[#F8C8DC] shadow-2xl grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FFF9F7]/90 border border-[#F8C8DC] text-[#2B1920] hover:text-[#E63950] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Column */}
        <div className="md:col-span-6 bg-[#FCE4EC]/35 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white">
            <ResilientImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6E515B] mb-2">
              <span>{product.category}</span>
              {product.tag && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#E63950]">{product.tag}</span>
                </>
              )}
            </div>

            <h2
              id="modal-product-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1920] leading-tight mb-3"
            >
              {product.name}
            </h2>

            <div className="flex items-center gap-2 text-xs text-[#6E515B] mb-4">
              <div className="flex items-center gap-0.5 text-[#F59E0B]">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="font-semibold text-[#2B1920] tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="tabular-nums">({product.reviewCount} verified reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-[#FCE4EC]">
              <span className="text-2xl font-bold text-[#2B1920] tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#6E515B] line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs font-semibold text-[#E63950] tabular-nums">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <p className="text-sm text-[#5C434B] leading-relaxed mb-5">{product.description}</p>

            {/* Variant Selector */}
            <div className="mb-5">
              <span className="block text-xs font-semibold text-[#2B1920] mb-2">
                Style / Option: <span className="font-normal text-[#6E515B]">{selectedVariant}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const active = selectedVariant === variant;
                  return (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#FCE4EC] border-[#E63950] text-[#2B1920]'
                          : 'bg-white border-[#F8C8DC] text-[#5C434B] hover:border-[#E63950]/50'
                      }`}
                    >
                      {variant}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Highlights */}
            <ul className="space-y-1.5 text-xs text-[#5C434B] mb-6">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span className="text-[#E63950] mt-0.5" aria-hidden="true">
                    ♡
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Purchase Controls */}
          <div className="pt-4 border-t border-[#FCE4EC] flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-[#F8C8DC] bg-white h-11 px-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 flex items-center justify-center text-[#2B1920] hover:text-[#E63950] cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold tabular-nums">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 flex items-center justify-center text-[#2B1920] hover:text-[#E63950] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 min-w-[160px] h-11 px-6 rounded-full bg-[#E63950] hover:bg-[#C8253C] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · {formatINR(product.price * quantity)}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isWishlisted
                  ? 'bg-[#FCE4EC] border-[#E63950] text-[#E63950]'
                  : 'bg-white border-[#F8C8DC] text-[#6E515B] hover:text-[#E63950]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
