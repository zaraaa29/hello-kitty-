import React from 'react';
import { PRODUCT_CATEGORIES, ProductCategory } from '../data/products';
import { CherryIcon, RibbonBowIcon } from './DecorMotifs';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onSelectPreset: (preset: 'all' | 'new-arrivals' | 'best-sellers' | 'limited') => void;
}

export function Footer({ onSelectCategory, onSelectPreset }: FooterProps) {
  return (
    <footer className="bg-[#FCE4EC]/50 border-t border-[#F8C8DC] text-[#2B1920]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 font-display text-xl font-semibold text-[#2B1920]">
              <RibbonBowIcon className="w-5 h-4 text-[#E63950]" />
              <span>Hello Kitty Club</span>
            </div>
            <p className="text-sm text-[#5C434B] leading-relaxed max-w-sm">
              A dreamy lifestyle boutique bringing coquette softness, Y2K charm, and curated Sanrio-inspired keepsakes to your everyday routine across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6E515B]">
              <CherryIcon className="w-4 h-4 shrink-0" />
              <span>Complimentary shipping over ₹1,499</span>
              <span aria-hidden="true">·</span>
              <span>COD Available</span>
            </div>
          </div>

          {/* Categories Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#6E515B]">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-[#5C434B]">
              {PRODUCT_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-[#E63950] transition-colors text-left cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#6E515B]">
              More Curations
            </h3>
            <ul className="space-y-2 text-sm text-[#5C434B]">
              {PRODUCT_CATEGORIES.slice(5).map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-[#E63950] transition-colors text-left cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique Edits */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#6E515B]">
              Edits
            </h3>
            <ul className="space-y-2 text-sm text-[#5C434B]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPreset('all')}
                  className="hover:text-[#E63950] transition-colors cursor-pointer"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPreset('new-arrivals')}
                  className="hover:text-[#E63950] transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPreset('best-sellers')}
                  className="hover:text-[#E63950] transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPreset('limited')}
                  className="hover:text-[#E63950] transition-colors cursor-pointer"
                >
                  Limited Edition
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#F8C8DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E515B]">
          <p>© {new Date().getFullYear()} Hello Kitty Club. All rights reserved.</p>
          <p>Carefully wrapped in Mumbai · Pan-India Dispatch</p>
        </div>
      </div>
    </footer>
  );
}
