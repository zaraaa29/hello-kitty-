import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROMO_IMAGE } from '../data/products';
import { CherryIcon, ResilientImage } from './DecorMotifs';

interface PromoBannerProps {
  onExploreLimited: () => void;
}

export function PromoBanner({ onExploreLimited }: PromoBannerProps) {
  return (
    <section className="py-10 sm:py-14 bg-[#FFF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-[#F8C8DC]/70 bg-gradient-to-br from-[#FFF0B3]/70 via-[#FFF9F7] to-[#FCE4EC]/75 items-stretch">
          <div className="lg:col-span-7 min-h-[260px] sm:min-h-[340px] bg-[#FFF0B3]/40">
            <ResilientImage
              src={PROMO_IMAGE}
              alt="Cherry Ribbon Limited Edition ceramic bow mug, ruffled cosmetic pouch, and cherry compact mirror"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2 text-xs font-medium text-[#6E515B] mb-3">
              <CherryIcon className="w-4 h-4 shrink-0" />
              <span>Limited-Edition Drop</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E63950]">Small Batch</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1920] leading-tight mb-4 text-balance">
              The Cherry Ribbon Atelier Collection
            </h2>

            <p className="text-sm sm:text-base text-[#5C434B] leading-relaxed mb-7">
              Hand-glazed bow mugs, butter-cream duchesse satin pouches, and keepsake compacts crafted in limited studio runs—once sold out, they won&apos;t return until spring.
            </p>

            <div>
              <button
                type="button"
                onClick={onExploreLimited}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B1920] hover:bg-[#E63950] text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                <span>Shop Limited Edition</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
