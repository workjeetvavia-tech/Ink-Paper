import { Product } from './types';

export const CATEGORIES = ['Pens', 'Notebooks', 'Art Supplies', 'Desk Accessories', 'Gifts'] as const;

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lamy Safari Fountain Pen - Charcoal',
    description: 'The timeless classic. Made of sturdy ABS plastic with a black steel nib. Ergonomic grip for tireless writing.',
    price: 2960,
    category: 'Pens',
    image: 'https://picsum.photos/id/1/600/600',
    rating: 4.9,
    reviews: 1250,
    isNew: false
  },
  {
    id: '2',
    name: 'Archer & Olive Dot Grid Notebook - A5',
    description: 'Ultra-thick 160gsm crisp white pages. No ghosting or bleeding. Perfect for bullet journaling.',
    price: 3400,
    category: 'Notebooks',
    image: 'https://picsum.photos/id/24/600/600',
    rating: 5.0,
    reviews: 890,
    isNew: true
  },
  {
    id: '3',
    name: 'Tombow Dual Brush Pen Set - Pastel',
    description: 'Set of 10 pastel colors. Flexible brush tip and fine tip in one marker. Water-based ink blends easily.',
    price: 2800,
    category: 'Art Supplies',
    image: 'https://picsum.photos/id/104/600/600',
    rating: 4.8,
    reviews: 2100,
    isSale: true
  },
  {
    id: '4',
    name: 'Rose Gold Desk Organizer Set',
    description: 'Keep your workspace tidy and stylish. Includes pen cup, letter sorter, and sticky note holder.',
    price: 1999,
    category: 'Desk Accessories',
    image: 'https://picsum.photos/id/201/600/600',
    rating: 4.5,
    reviews: 320
  },
  {
    id: '5',
    name: 'Kaweco Sport Classic Fountain Pen - Mint',
    description: 'Pocket-sized when closed, full-sized when open. A design icon since 1935. Gold-plated nib.',
    price: 2450,
    category: 'Pens',
    image: 'https://picsum.photos/id/250/600/600',
    rating: 4.7,
    reviews: 560
  },
  {
    id: '6',
    name: 'Sakura Pigma Micron Set - 005 to 08',
    description: '6-piece fineliner set. Archival quality ink that is waterproof, chemical resistant, and fade resistant.',
    price: 1200,
    category: 'Art Supplies',
    image: 'https://picsum.photos/id/367/600/600',
    rating: 4.9,
    reviews: 3200
  },
  {
    id: '7',
    name: 'Midori MD Notebook - A5 Grid',
    description: 'Made in Japan. Features MD Paper designed for the ultimate writing comfort. Opens flat.',
    price: 1150,
    category: 'Notebooks',
    image: 'https://picsum.photos/id/366/600/600',
    rating: 4.8,
    reviews: 450
  },
  {
    id: '8',
    name: 'Pilot Iroshizuku Ink - Kon-peki',
    description: 'Premium bottled ink from Japan. "Deep Cerulean Blue". Known for its smooth flow and beautiful shading.',
    price: 1650,
    category: 'Pens',
    image: 'https://picsum.photos/id/400/600/600',
    rating: 5.0,
    reviews: 890
  },
  {
    id: '9',
    name: 'Stationery Gift Box - "The Writer"',
    description: 'Includes a fountain pen, a premium notebook, and a bottle of ink. Beautifully gift wrapped.',
    price: 6500,
    category: 'Gifts',
    image: 'https://picsum.photos/id/500/600/600',
    rating: 4.9,
    reviews: 45,
    isNew: true
  },
  {
    id: '10',
    name: 'Rotring 600 Mechanical Pencil - 0.5mm',
    description: 'Professional drafting pencil with a full metal body. Hexagonal shape prevents sliding on tables.',
    price: 3200,
    category: 'Pens',
    image: 'https://picsum.photos/id/600/600/600',
    rating: 4.9,
    reviews: 1100
  },
  {
    id: '11',
    name: 'Winsor & Newton Cotman Watercolor Set',
    description: '12 half pans in a pocket-sized box. High quality, transparent watercolors with good tinting strength.',
    price: 2100,
    category: 'Art Supplies',
    image: 'https://picsum.photos/id/700/600/600',
    rating: 4.6,
    reviews: 780,
    isSale: true
  },
  {
    id: '12',
    name: 'MT Washi Tape - 5 Pack',
    description: 'Authentic Japanese masking tape. Versatile and decorative. Removes without leaving residue.',
    price: 850,
    category: 'Art Supplies',
    image: 'https://picsum.photos/id/800/600/600',
    rating: 4.7,
    reviews: 230
  }
];
