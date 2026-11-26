import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { CherryIcon, ResilientImage, RibbonBowIcon } from './DecorMotifs';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreBestSellers: () => void;
}

export function HeroSection({ onShopNow, onExploreBestSellers }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#FFF9F7] pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-[#FCE4EC]/55 rounded-3xl p-8 sm:p-10 lg:p-12 border border-[#F8C8DC]/70">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-[#6E515B] mb-5">
              <CherryIcon className="w-4 h-4 shrink-0" />
              <span>Curated Boutique Edition</span>
              <span aria-hidden="true">·</span>
              <span>Coquette &amp; Y2K Lifestyle</span>
            </div>

            <h1
              className="font-display font-semibold text-[#2B1920] leading-[1.1] tracking-tight mb-5 text-balance"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)' }}
            >
              A Little World of Cuteness{' '}
              <span className="inline-block align-middle" aria-label="ribbon bow">
                🎀
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5C434B] leading-relaxed max-w-lg mb-8">
              Your favourite little things, all in one place. Thoughtfully crafted plushies, quilted mini bags, satin loungewear, and keepsake gifts designed to sweeten everyday rituals.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E63950] hover:bg-[#C8253C] text-white text-sm font-semibold tracking-wide transition-all duration-150 shadow-sm hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onExploreBestSellers}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#FFF9F7] hover:bg-[#FFF0B3]/70 text-[#2B1920] border border-[#F8C8DC] text-sm font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                <RibbonBowIcon className="w-4 h-3.5 text-[#E63950]" />
                <span>View Best Sellers</span>
              </button>
            </div>

            {/* Clean unboxed trust strip */}
            <div className="pt-6 border-t border-[#F8C8DC]/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6E515B]">
              <span>Free delivery over ₹1,499</span>
              <span aria-hidden="true">·</span>
              <span>Cash on Delivery across India</span>
              <span aria-hidden="true">·</span>
              <span>Satin ribbon gift wrap</span>
            </div>
          </div>

          {/* Right Editorial Photography Column */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-[#FCE4EC] border border-[#F8C8DC]/70 min-h-[300px] sm:min-h-[380px]">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Hello Kitty Club curated boutique collection featuring cream boucle plushie, quilted baby pink mini backpack, pearl cherry charm, and silk-ribbon gift box"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
