import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { RibbonBowIcon } from './DecorMotifs';

export type NavFilterPreset =
  | 'all'
  | 'new-arrivals'
  | 'best-sellers'
  | 'accessories'
  | 'plushies'
  | 'gifts';

interface NavbarProps {
  cartCount: number;
  activeNav: NavFilterPreset;
  onSelectNav: (preset: NavFilterPreset) => void;
  onOpenCart: () => void;
}

const NAV_ITEMS: { id: NavFilterPreset; label: string }[] = [
  { id: 'all', label: 'Shop All' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'plushies', label: 'Plushies' },
  { id: 'gifts', label: 'Gifts' },
];

export function Navbar({ cartCount, activeNav, onSelectNav, onOpenCart }: NavbarProps) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (preset: NavFilterPreset) => {
    onSelectNav(preset);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-[#FFF9F7]/95 backdrop-blur-md border-b border-[#F8C8DC]/60">
      {showAnnouncement && (
        <div className="relative bg-[#FCE4EC] text-[#2B1920] text-xs font-medium py-1.5 px-8 text-center border-b border-[#F8C8DC]/50">
          <p className="truncate">A little happiness, delivered to your doorstep ♡</p>
          <button
            type="button"
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss announcement"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#6E515B] hover:text-[#2B1920] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 -ml-2 text-[#2B1920] hover:text-[#E63950] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 font-display text-lg sm:text-xl font-semibold tracking-tight text-[#2B1920] whitespace-nowrap shrink-0"
          >
            <RibbonBowIcon className="w-5 h-4 text-[#E63950] shrink-0" />
            <span>Hello Kitty Club</span>
          </a>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#6E515B]" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-[#E63950]' : 'hover:text-[#2B1920]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#E63950] rounded-full transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Shopping Bag) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E63950] hover:bg-[#C8253C] text-white text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Bag</span>
            <span className="tabular-nums">({cartCount})</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F8C8DC]/60 bg-[#FFF9F7] px-4 py-3">
          <nav className="grid grid-cols-2 gap-2" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FCE4EC] text-[#E63950]'
                      : 'text-[#2B1920] hover:bg-[#FCE4EC]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
