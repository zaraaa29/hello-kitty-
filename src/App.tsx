import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  Product,
  ProductCategory,
} from './data/products';
import { Navbar, NavFilterPreset } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { PromoBanner } from './components/PromoBanner';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CherryIcon, ResilientImage } from './components/DecorMotifs';

type CollectionTab = 'all' | 'best-sellers' | 'new-arrivals' | 'limited' | 'saved';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const FEATURED_COLLECTIONS: {
  title: string;
  subtitle: string;
  category: ProductCategory;
  image: string;
}[] = [
  {
    title: 'Plushies & Soft Toys',
    subtitle: 'Bouclé & satin ribbon companions',
    category: 'Plushies & Soft Toys',
    image: '/src/assets/images/prod_plush_velvet_1795664115251.jpg',
  },
  {
    title: 'Bags & Mini Backpacks',
    subtitle: 'Quilted coquette silhouettes',
    category: 'Bags & Mini Backpacks',
    image: '/src/assets/images/prod_bag_mini_1795664115454.jpg',
  },
  {
    title: 'Beauty & Vanity',
    subtitle: 'Satin pouches & heart compacts',
    category: 'Beauty & Makeup Accessories',
    image: '/src/assets/images/prod_beauty_vanity_1795664115740.jpg',
  },
  {
    title: 'Curated Gift Sets',
    subtitle: 'Ready-to-gift keepsake boxes',
    category: 'Gift Sets',
    image: '/src/assets/images/prod_gift_box_1795664166185.jpg',
  },
];

const ACCESSORIES_CATEGORIES: ProductCategory[] = [
  'Bags & Mini Backpacks',
  'Phone Cases & Tech Accessories',
  'Beauty & Makeup Accessories',
  'Keychains & Charms',
];

export default function App() {
  const catalogRef = useRef<HTMLElement | null>(null);
  const bestsellersRef = useRef<HTMLElement | null>(null);

  const [activeNav, setActiveNav] = useState<NavFilterPreset>('all');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [collectionTab, setCollectionTab] = useState<CollectionTab>('all');
  const [accessoriesOnly, setAccessoriesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hkc_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hkc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hkc_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('hkc_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectNav = (preset: NavFilterPreset) => {
    setActiveNav(preset);
    setAccessoriesOnly(false);

    if (preset === 'all') {
      setSelectedCategory('All');
      setCollectionTab('all');
      scrollToCatalog();
    } else if (preset === 'new-arrivals') {
      setSelectedCategory('All');
      setCollectionTab('new-arrivals');
      scrollToCatalog();
    } else if (preset === 'best-sellers') {
      setSelectedCategory('All');
      setCollectionTab('best-sellers');
      bestsellersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (preset === 'accessories') {
      setSelectedCategory('All');
      setCollectionTab('all');
      setAccessoriesOnly(true);
      scrollToCatalog();
    } else if (preset === 'plushies') {
      setSelectedCategory('Plushies & Soft Toys');
      setCollectionTab('all');
      scrollToCatalog();
    } else if (preset === 'gifts') {
      setSelectedCategory('Gift Sets');
      setCollectionTab('all');
      scrollToCatalog();
    }
  };

  const handleSelectCategory = (category: 'All' | ProductCategory) => {
    setSelectedCategory(category);
    setAccessoriesOnly(false);
    setCollectionTab('all');
    if (category === 'All') setActiveNav('all');
    else if (category === 'Plushies & Soft Toys') setActiveNav('plushies');
    else if (category === 'Gift Sets') setActiveNav('gifts');
    else setActiveNav('all');
    scrollToCatalog();
  };

  const handleAddToCart = (product: Product, variant: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant === variant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, variant, quantity }];
    });
    showToast(`Added "${product.name}" to your bag ♡`);
  };

  const handleUpdateQty = (productId: string, variant: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.variant === variant
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, variant: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variant === variant))
    );
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const bestsellerSpotlight = useMemo(
    () => PRODUCTS.filter((p) => p.isBestseller).slice(0, 3),
    []
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      if (accessoriesOnly && !ACCESSORIES_CATEGORIES.includes(product.category)) {
        return false;
      }
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (collectionTab === 'best-sellers' && !product.isBestseller) return false;
      if (collectionTab === 'new-arrivals' && !product.isNewArrival) return false;
      if (collectionTab === 'limited' && !product.isLimitedEdition) return false;
      if (collectionTab === 'saved' && !wishlist.includes(product.id)) return false;

      if (query) {
        const match =
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
        if (!match) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [accessoriesOnly, selectedCategory, collectionTab, wishlist, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FFF9F7] text-[#2B1920]">
      <Navbar
        cartCount={totalCartCount}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onShopNow={scrollToCatalog}
          onExploreBestSellers={() =>
            bestsellersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        />

        {/* 2. Featured Collection Section */}
        <section className="py-10 sm:py-14 bg-[#FFF9F7] border-t border-[#FCE4EC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-medium text-[#6E515B] mb-1.5">
                  Featured Collections · Curated by Mood
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1920]">
                  Signature Boutique Edits
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleSelectCategory('All')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E63950] hover:text-[#C8253C] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>Explore all 10 categories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURED_COLLECTIONS.map((col) => (
                <button
                  key={col.category}
                  type="button"
                  onClick={() => handleSelectCategory(col.category)}
                  className="group text-left rounded-2xl bg-white border border-[#F8C8DC]/70 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(230,57,80,0.14)] cursor-pointer"
                >
                  <div className="aspect-[4/3] w-full bg-[#FCE4EC]/35 overflow-hidden">
                    <ResilientImage
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-[#2B1920] group-hover:text-[#E63950] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-[#6E515B] mt-0.5">{col.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Bestsellers Section */}
        <section ref={bestsellersRef} className="py-10 sm:py-14 bg-[#FCE4EC]/35 border-y border-[#F8C8DC]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#6E515B] mb-1.5">
                  <CherryIcon className="w-3.5 h-3.5" />
                  <span>Most Loved · Community Icons</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1920]">
                  Club Bestsellers
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setAccessoriesOnly(false);
                  setCollectionTab('best-sellers');
                  scrollToCatalog();
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E63950] hover:text-[#C8253C] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>See all bestsellers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {bestsellerSpotlight.map((product) => (
                <ProductCard
                  key={`bestseller-${product.id}`}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={setQuickViewProduct}
                  onAddToCart={(p, v) => handleAddToCart(p, v, 1)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Promotional Banner for Limited-Edition Collections */}
        <PromoBanner
          onExploreLimited={() => {
            setSelectedCategory('All');
            setAccessoriesOnly(false);
            setCollectionTab('limited');
            scrollToCatalog();
          }}
        />

        {/* 5. Complete Interactive Catalog (All 10 Categories + Filters + Search) */}
        <section ref={catalogRef} id="catalog" className="py-12 sm:py-16 bg-[#FFF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-7">
              <div>
                <p className="text-xs font-medium text-[#6E515B] mb-1.5">
                  Complete Boutique Directory · Prices in ₹
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#2B1920]">
                  {accessoriesOnly
                    ? 'Accessories Edit'
                    : selectedCategory === 'All'
                    ? 'Shop All Treasures'
                    : selectedCategory}
                </h2>
              </div>

              {/* Search + Sort Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[#6E515B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search plushies, bags, mugs..."
                    aria-label="Search products"
                    className="w-full h-10 pl-10 pr-9 rounded-full bg-white border border-[#F8C8DC] text-sm text-[#2B1920] placeholder:text-[#6E515B]/70 focus:outline-none focus:border-[#E63950]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E515B] hover:text-[#2B1920]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="relative inline-flex items-center">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6E515B] absolute left-3.5 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort products"
                    className="h-10 pl-9 pr-8 rounded-full bg-white border border-[#F8C8DC] text-xs font-semibold text-[#2B1920] focus:outline-none focus:border-[#E63950] cursor-pointer"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Segmented Collection Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-[#FCE4EC]">
              <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-[#FCE4EC]/60 border border-[#F8C8DC]/60">
                {(
                  [
                    { id: 'all', label: 'All Drops' },
                    { id: 'best-sellers', label: 'Best Sellers' },
                    { id: 'new-arrivals', label: 'New Arrivals' },
                    { id: 'limited', label: 'Limited Edition' },
                    { id: 'saved', label: `Saved (${wishlist.length})` },
                  ] as { id: CollectionTab; label: string }[]
                ).map((tab) => {
                  const active = collectionTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setCollectionTab(tab.id);
                        setAccessoriesOnly(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-white text-[#E63950] shadow-xs'
                          : 'text-[#5C434B] hover:text-[#2B1920]'
                      }`}
                    >
                      {tab.id === 'saved' && (
                        <Heart className="w-3 h-3 inline-block mr-1 -mt-0.5 fill-current text-[#E63950]" />
                      )}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-[#6E515B] tabular-nums">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
              </p>
            </div>

            {/* 10 Shopping Categories Bar */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-3 mb-8"
              role="tablist"
              aria-label="Product categories"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setAccessoriesOnly(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === 'All' && !accessoriesOnly
                    ? 'bg-[#2B1920] border-[#2B1920] text-white'
                    : 'bg-white border-[#F8C8DC] text-[#5C434B] hover:border-[#E63950]/50 hover:text-[#2B1920]'
                }`}
              >
                All Categories
              </button>

              {PRODUCT_CATEGORIES.map((category) => {
                const active = selectedCategory === category && !accessoriesOnly;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setAccessoriesOnly(false);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#E63950] border-[#E63950] text-white'
                        : 'bg-white border-[#F8C8DC] text-[#5C434B] hover:border-[#E63950]/50 hover:text-[#2B1920]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl bg-[#FCE4EC]/35 border border-[#F8C8DC] py-16 px-6 text-center">
                <p className="font-display text-2xl font-semibold text-[#2B1920] mb-2">
                  No pieces matched your filter
                </p>
                <p className="text-sm text-[#6E515B] mb-6 max-w-md mx-auto">
                  {collectionTab === 'saved'
                    ? 'Tap the heart on any item to save your favourites for later.'
                    : 'Try clearing your search or switching back to all categories.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setCollectionTab('all');
                    setAccessoriesOnly(false);
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#E63950] hover:bg-[#C8253C] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setQuickViewProduct}
                    onAddToCart={(p, v) => handleAddToCart(p, v, 1)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 6. Newsletter Section */}
        <NewsletterSection />
      </main>

      <Footer
        onSelectCategory={(cat) => handleSelectCategory(cat)}
        onSelectPreset={(preset) => {
          setSelectedCategory('All');
          setAccessoriesOnly(false);
          setCollectionTab(preset);
          scrollToCatalog();
        }}
      />

      {/* Quick View / Product Details Modal */}
      <ProductModal
        product={quickViewProduct}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Bag & Checkout Drawer */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* Subtle Add-to-Bag Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-[#2B1920] text-white text-xs sm:text-sm font-medium shadow-xl border border-[#F8C8DC]/30"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="text-[#FFF0B3] hover:text-white font-semibold underline cursor-pointer whitespace-nowrap"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
