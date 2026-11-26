import React, { useState } from 'react';
import { Check, Heart, ShoppingBag, Star } from 'lucide-react';
import { Product, formatINR } from '../data/products';
import { ResilientImage } from './DecorMotifs';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, variant: string) => void;
}

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.variants[0]);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#F8C8DC]/60 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(230,57,80,0.14)]">
      {/* Image Stage (~70% card lead) */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/3] w-full bg-[#FCE4EC]/35 overflow-hidden cursor-pointer"
      >
        <ResilientImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Wishlist Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-150 cursor-pointer ${
            isWishlisted
              ? 'bg-[#E63950] text-white shadow-sm'
              : 'bg-[#FFF9F7]/90 text-[#6E515B] hover:text-[#E63950] border border-[#F8C8DC]/70'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Quiet unboxed 1-line metadata */}
        <div className="flex items-center gap-1.5 text-xs text-[#6E515B] mb-1.5 truncate">
          <span className="truncate">{product.category}</span>
          {product.tag && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#E63950] font-medium shrink-0">{product.tag}</span>
            </>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-base font-semibold text-[#2B1920] leading-snug mb-2 line-clamp-2">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="text-left hover:text-[#E63950] transition-colors cursor-pointer"
          >
            {product.name}
          </button>
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 text-xs text-[#6E515B] mb-3">
          <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
          <span className="font-semibold text-[#2B1920] tabular-nums">{product.rating.toFixed(1)}</span>
          <span className="tabular-nums">({product.reviewCount})</span>
        </div>

        {/* Price Row + Add to Bag anchored cleanly to bottom */}
        <div className="mt-auto pt-3 border-t border-[#FCE4EC] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#2B1920] tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#6E515B] line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            {discountPercent && (
              <span className="text-[11px] font-semibold text-[#E63950] tabular-nums">
                Save {discountPercent}%
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              justAdded
                ? 'bg-[#2B1920] text-white'
                : 'bg-[#FCE4EC] hover:bg-[#E63950] text-[#2B1920] hover:text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
