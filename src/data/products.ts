import heroCosmeticsImg from '../assets/images/hero_cosmetics_1794650899437.jpg';
import productRoseSerumImg from '../assets/images/product_rose_serum_1794650898819.jpg';
import productVelvetLipstickImg from '../assets/images/product_velvet_lipstick_1794650899546.jpg';
import productSilkCreamImg from '../assets/images/product_silk_cream_1794650899958.jpg';
import productBlushCompactImg from '../assets/images/product_blush_compact_1794650901187.jpg';
import productPetalMistImg from '../assets/images/product_petal_mist_1794650900612.jpg';

export type ProductCategory = 'Skincare' | 'Lips' | 'Cheeks' | 'Fragrance' | 'Sets';

export interface ProductShade {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  size: string;
  price: number;
  image: string;
  shortNote: string;
  description: string;
  highlights: string[];
  shades: ProductShade[];
  featured?: boolean;
  tag?: string;
}

export const HERO_IMAGE = heroCosmeticsImg;

export const PRODUCTS: Product[] = [
  {
    id: 'rose-botanical-serum',
    name: 'Blush Botanical Serum',
    category: 'Skincare',
    size: '30 ml',
    price: 42,
    image: productRoseSerumImg,
    shortNote: 'Dewy rosehip & hyaluronic radiance drops',
    description:
      'Weightless glass-skin serum infused with Damask rosewater and plant squalane for soft, hydrated luminosity.',
    highlights: [
      'Cold-pressed organic rosehip oil',
      'Triple-weight hyaluronic hydration',
      'Gentle for sensitive daily wear',
    ],
    shades: [
      { name: '30 ml Standard', hex: '#F4C6D2' },
      { name: '50 ml Deluxe', hex: '#E9A3B8' },
    ],
    featured: true,
    tag: 'Bestseller',
  },
  {
    id: 'velvet-satin-lipstick',
    name: 'Velvet Rose Lipstick',
    category: 'Lips',
    size: '3.5 g',
    price: 28,
    image: productVelvetLipstickImg,
    shortNote: 'Cushiony satin pigment with shea butter',
    description:
      'Creamy single-swipe satin lip color enriched with sweet almond oil and rose wax for comfortable all-day wear.',
    highlights: [
      'Buildable satin-matte finish',
      'Nourishing botanical butter core',
      'Refillable pearl-white casing',
    ],
    shades: [
      { name: 'Dusty Rose', hex: '#BA6E7B' },
      { name: 'Petal Nude', hex: '#D99AA4' },
      { name: 'Soft Berry', hex: '#9E485B' },
    ],
    featured: true,
  },
  {
    id: 'silk-whip-cream',
    name: 'Silk Whip Moisturizer',
    category: 'Skincare',
    size: '50 ml',
    price: 46,
    image: productSilkCreamImg,
    shortNote: 'Cloud-soft barrier repair face cream',
    description:
      'Air-whipped daily moisturizer blending ceramides, white tea, and squalane to cushion dry skin without heaviness.',
    highlights: [
      'Ceramide barrier support',
      'Silky fast-absorbing whip texture',
      'Fragrance-free gentle formula',
    ],
    shades: [
      { name: '50 ml Jar', hex: '#FBE5EC' },
      { name: '100 ml Refill', hex: '#F3C7D5' },
    ],
    featured: true,
    tag: 'New Formula',
  },
  {
    id: 'petal-cloud-blush',
    name: 'Petal Cloud Blush',
    category: 'Cheeks',
    size: '6 g',
    price: 34,
    image: productBlushCompactImg,
    shortNote: 'Soft-focus milled cheek veil',
    description:
      'Finely milled pressed blush that melts seamlessly into skin for a natural flushed glow with zero powdery fallout.',
    highlights: [
      'Velvet micro-milled pigments',
      'Built-in compact mirror',
      'Talc-free soothing blend',
    ],
    shades: [
      { name: 'Soft Petal', hex: '#E89EB0' },
      { name: 'Blush Peach', hex: '#EEA89D' },
      { name: 'Rosewood', hex: '#C67483' },
    ],
  },
  {
    id: 'rose-aurora-parfum',
    name: 'Rose Aurora Eau de Parfum',
    category: 'Fragrance',
    size: '75 ml',
    price: 78,
    image: productPetalMistImg,
    shortNote: 'White peony, pink pepper & soft musk',
    description:
      'A delicate daytime floral fragrance opening with crisp bergamot and fresh peony over warm cashmere woods.',
    highlights: [
      'Clean vegan alcohol base',
      'Long-lasting 8-hour skin sillage',
      'Sculpted porcelain-touch cap',
    ],
    shades: [
      { name: '75 ml Eau de Parfum', hex: '#F2CED7' },
      { name: '30 ml Travel Spray', hex: '#E8B3C1' },
    ],
    tag: 'Signature',
  },
  {
    id: 'luminous-glow-duo',
    name: 'Luminous Ritual Duo',
    category: 'Sets',
    size: '30 ml + 50 ml',
    price: 76,
    image: heroCosmeticsImg,
    shortNote: 'Serum & Velvet Cream morning pairing',
    description:
      'Our two-step morning ritual pairing the Blush Botanical Serum with Silk Whip Moisturizer for calm, radiant skin.',
    highlights: [
      'Complete 2-step hydration ritual',
      'Saves $12 compared to singles',
      'Gift-ready embossed keepsake box',
    ],
    shades: [{ name: 'Full Size Set', hex: '#F6CFD9' }],
  },
];
