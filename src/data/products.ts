export type ProductCategory =
  | 'Plushies & Soft Toys'
  | 'Bags & Mini Backpacks'
  | 'Phone Cases & Tech Accessories'
  | 'Stationery & Journals'
  | 'Beauty & Makeup Accessories'
  | 'Clothing & Pajamas'
  | 'Keychains & Charms'
  | 'Mugs & Drinkware'
  | 'Room Decor'
  | 'Gift Sets';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Plushies & Soft Toys',
  'Bags & Mini Backpacks',
  'Phone Cases & Tech Accessories',
  'Stationery & Journals',
  'Beauty & Makeup Accessories',
  'Clothing & Pajamas',
  'Keychains & Charms',
  'Mugs & Drinkware',
  'Room Decor',
  'Gift Sets',
];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  tag?: 'Best Seller' | 'New Arrival' | 'Limited Edition';
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isLimitedEdition?: boolean;
  image: string;
  variants: string[];
  description: string;
  details: string[];
}

export const HERO_IMAGE = '/src/assets/images/hero_coquette_boutique_1795664113530.jpg';
export const PROMO_IMAGE = '/src/assets/images/promo_cherry_edition_1795664114004.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'hkc-plush-01',
    name: 'Velvet Bouclé Ribbon Kitty Plush',
    category: 'Plushies & Soft Toys',
    price: 1499,
    originalPrice: 1899,
    rating: 4.9,
    reviewCount: 214,
    tag: 'Best Seller',
    isBestseller: true,
    image: '/src/assets/images/prod_plush_velvet_1795664115251.jpg',
    variants: ['Cream & Cherry Bow', 'Blush & Pearl Bow'],
    description:
      'Crafted from ultra-plush cloud bouclé with a hand-tied cherry satin ribbon and faux-pearl collar. Weighted at the base so she sits gracefully on your vanity or bookshelf.',
    details: [
      'Height: 28 cm collectible display size',
      'Hypoallergenic cloud-fill stuffing',
      'Hand-stitched blush nose and pearl clasp',
    ],
  },
  {
    id: 'hkc-bag-01',
    name: 'Quilted Coquette Mini Backpack',
    category: 'Bags & Mini Backpacks',
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviewCount: 168,
    tag: 'Best Seller',
    isBestseller: true,
    image: '/src/assets/images/prod_bag_mini_1795664115454.jpg',
    variants: ['Baby Pink', 'Vanilla Cream'],
    description:
      'Diamond-quilted vegan pebble leather mini backpack finished with a sculpted silver bow turn-lock and detachable pearl zipper charm. Fits your phone, compact, gloss, and Kindle.',
    details: [
      'Dimensions: 22 × 18 × 10 cm',
      'Adjustable convertible shoulder straps',
      'Satin monogrammed interior lining',
    ],
  },
  {
    id: 'hkc-tech-01',
    name: 'Milky Pink Ribbon & Pearl Phone Case',
    category: 'Phone Cases & Tech Accessories',
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviewCount: 143,
    tag: 'New Arrival',
    isNewArrival: true,
    isBestseller: true,
    image: '/src/assets/images/prod_tech_case_1795664115875.jpg',
    variants: ['iPhone 15 / 16 Pro', 'iPhone 14 / 15', 'iPhone 13'],
    description:
      'Glossy translucent milky-blush MagSafe bumper case crowned with a tactile 3D cherry ribbon and a detachable freshwater-style pearl wrist strap with heart clasp.',
    details: [
      'Shock-absorbing raised camera bevel',
      'Includes detachable pearl charm strap',
      'Scratch-resistant glossy TPU finish',
    ],
  },
  {
    id: 'hkc-stat-01',
    name: 'Gilded Bow Linen Journal & Enamel Pen',
    category: 'Stationery & Journals',
    price: 949,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 97,
    tag: 'New Arrival',
    isNewArrival: true,
    image: '/src/assets/images/prod_stationery_journal_1795664115843.jpg',
    variants: ['Blush Linen (Ruled)', 'Blush Linen (Dotted)'],
    description:
      'Hardcover woven linen diary stamped with delicate gold-foil bows, ivory 120gsm fountain-friendly pages, a satin bookmark ribbon, and a weighted cream-and-cherry enamel pen.',
    details: [
      '192 cream ivory pages (120 gsm)',
      'Lay-flat Smyth-sewn binding',
      'Includes refillable 0.5mm black gel pen',
    ],
  },
  {
    id: 'hkc-beauty-01',
    name: 'Quilted Satin Vanity Pouch & Heart Mirror',
    category: 'Beauty & Makeup Accessories',
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviewCount: 186,
    tag: 'Best Seller',
    isBestseller: true,
    isLimitedEdition: true,
    image: '/src/assets/images/prod_beauty_vanity_1795664115740.jpg',
    variants: ['Rosewater Satin', 'Butter Cream'],
    description:
      'A padded diamond-stitched satin cosmetic pouch paired with our iconic cream enamel heart pocket mirror adorned with a sculpted cherry-red bow.',
    details: [
      'Water-resistant wipe-clean interior',
      'Dual-sided 1x & 2x magnification mirror',
      'Brushed gold zipper hardware',
    ],
  },
  {
    id: 'hkc-cloth-01',
    name: 'Cherry Piped Satin Loungewear Set',
    category: 'Clothing & Pajamas',
    price: 2199,
    originalPrice: 2699,
    rating: 4.9,
    reviewCount: 132,
    tag: 'Best Seller',
    isBestseller: true,
    image: '/src/assets/images/prod_clothing_pajama_1795664116511.jpg',
    variants: ['XS / S', 'M', 'L / XL'],
    description:
      'Butter-soft mulberry-feel satin sleepwear set in baby pink, tailored with crisp cherry-red piping, mother-of-pearl buttons, and an embroidered pocket ribbon.',
    details: [
      'Breathable cooling silk-touch weave',
      'Relaxed button-down & drawstring trouser',
      'Machine washable delicate care',
    ],
  },
  {
    id: 'hkc-charm-01',
    name: 'Enamel Cherry & Pearl Bag Charm',
    category: 'Keychains & Charms',
    price: 649,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 251,
    tag: 'Best Seller',
    isBestseller: true,
    isLimitedEdition: true,
    image: '/src/assets/images/prod_keychain_charm_1795664116949.jpg',
    variants: ['Gold & Cherry', 'Silver & Blush'],
    description:
      'Elevate your everyday tote or mini backpack with glossy hand-enameled cherries, a cream ribbon pendant, and twin strands of luminous pearl drops.',
    details: [
      '18k gold-plated brass lobster clasp',
      'Scratch-resistant kiln-baked enamel',
      'Length: 13 cm drop',
    ],
  },
  {
    id: 'hkc-mug-01',
    name: 'Sculpted Bow Ceramic Mug & Scallop Saucer',
    category: 'Mugs & Drinkware',
    price: 1149,
    originalPrice: 1399,
    rating: 4.9,
    reviewCount: 179,
    tag: 'Limited Edition',
    isLimitedEdition: true,
    isBestseller: true,
    image: '/src/assets/images/prod_mug_ceramic_1795664117817.jpg',
    variants: ['Cream & Cherry Handle', 'Blush & Cherry Handle'],
    description:
      'Hand-glazed stoneware mug with a whimsical sculpted red bow handle and matching scalloped petal saucer—designed for iced matcha, lattes, and slow mornings.',
    details: [
      'Capacity: 320 ml stoneware',
      'Lead-free food-safe glossy glaze',
      'Hand wash recommended to preserve luster',
    ],
  },
  {
    id: 'hkc-decor-01',
    name: 'Frosted Blush Bedside Lamp & Trinket Dish',
    category: 'Room Decor',
    price: 2799,
    originalPrice: 3299,
    rating: 4.8,
    reviewCount: 84,
    tag: 'New Arrival',
    isNewArrival: true,
    image: '/src/assets/images/prod_decor_lamp_1795664166671.jpg',
    variants: ['Frosted Pink Base', 'Warm Butter Base'],
    description:
      'Warm frosted glass globe lamp with a natural linen shade paired with a scalloped ceramic ring dish tied in satin ribbon for your bedside glow-up.',
    details: [
      'Warm 2700K LED bulb included',
      'Inline rotary dimmer switch',
      'Includes matching 12 cm ceramic tray',
    ],
  },
  {
    id: 'hkc-gift-01',
    name: 'Signature Keepsake Ribbon Gift Box',
    category: 'Gift Sets',
    price: 2999,
    originalPrice: 3699,
    rating: 5.0,
    reviewCount: 119,
    tag: 'Limited Edition',
    isLimitedEdition: true,
    isBestseller: true,
    image: '/src/assets/images/prod_gift_box_1795664166185.jpg',
    variants: ['Classic Pink Box', 'Butter & Cherry Box'],
    description:
      'Our ready-to-gift keepsake box wrapped in wide cherry grosgrain ribbon. Curated inside: a mini bow bear charm, pure silk pink scrunchie, and floral porcelain ring dish.',
    details: [
      'Includes handwritten gift note card',
      'Reusable rigid magnetic keepsake box',
      'Wrapped in gold-flecked tissue paper',
    ],
  },
  {
    id: 'hkc-plush-02',
    name: 'Strawberry Cream Mini Bag Plush Charm',
    category: 'Plushies & Soft Toys',
    price: 799,
    rating: 4.8,
    reviewCount: 92,
    tag: 'New Arrival',
    isNewArrival: true,
    image: '/src/assets/images/prod_plush_velvet_1795664115251.jpg',
    variants: ['Mini 12 cm Keyclip'],
    description:
      'Pocket-sized edition of our signature bouclé kitty complete with a brushed gold keyring clasp so she travels on your handbag everywhere you go.',
    details: [
      'Compact 12 cm keychain plush',
      'Detachable gold heart clasp',
      'Soft velvet inner ears',
    ],
  },
  {
    id: 'hkc-beauty-02',
    name: 'Cherry Ribbon Ruffled Cosmetic Pouch',
    category: 'Beauty & Makeup Accessories',
    price: 999,
    originalPrice: 1249,
    rating: 4.9,
    reviewCount: 108,
    tag: 'Limited Edition',
    isLimitedEdition: true,
    isNewArrival: true,
    image: '/src/assets/images/promo_cherry_edition_1795664114004.jpg',
    variants: ['Butter Cream Print'],
    description:
      'From the Cherry Ribbon Limited Drop: crisp cream duchesse satin printed with hand-drawn cherries and bows, trimmed with delicate gathered ruffles and a cherry zipper pull.',
    details: [
      'Fits full-size skincare & lip liners',
      'Inner elastic brush organizer pocket',
      'Signature enamel cherry zipper charm',
    ],
  },
];

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
