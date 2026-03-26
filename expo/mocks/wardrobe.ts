export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  color: string;
  season: string;
  image: string;
  tags: string[];
  addedAt: string;
}

export const wardrobeItems: WardrobeItem[] = [
  {
    id: '1',
    name: 'Oversized Wool Blazer',
    brand: 'The Row',
    category: 'Outerwear',
    color: 'Charcoal',
    season: 'Autumn/Winter',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    tags: ['tailoring', 'layering', 'staple'],
    addedAt: '2025-12-01',
  },
  {
    id: '2',
    name: 'Silk Midi Skirt',
    brand: 'Totême',
    category: 'Bottoms',
    color: 'Ivory',
    season: 'Resort',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
    tags: ['silk', 'evening', 'elegant'],
    addedAt: '2025-11-20',
  },
  {
    id: '3',
    name: 'Cashmere Turtleneck',
    brand: 'Brunello Cucinelli',
    category: 'Tops',
    color: 'Oatmeal',
    season: 'Autumn/Winter',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    tags: ['cashmere', 'knitwear', 'neutral'],
    addedAt: '2025-11-15',
  },
  {
    id: '4',
    name: 'Leather Ankle Boots',
    brand: 'Bottega Veneta',
    category: 'Shoes',
    color: 'Black',
    season: 'All Season',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    tags: ['leather', 'boots', 'statement'],
    addedAt: '2025-10-30',
  },
  {
    id: '5',
    name: 'Linen Wide-Leg Trousers',
    brand: 'Lemaire',
    category: 'Bottoms',
    color: 'Sand',
    season: 'Spring/Summer',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    tags: ['linen', 'relaxed', 'summer'],
    addedAt: '2025-10-20',
  },
  {
    id: '6',
    name: 'Structured Shoulder Bag',
    brand: 'Celine',
    category: 'Accessories',
    color: 'Tan',
    season: 'All Season',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    tags: ['bag', 'leather', 'everyday'],
    addedAt: '2025-10-10',
  },
  {
    id: '7',
    name: 'Draped Jersey Dress',
    brand: 'Rick Owens',
    category: 'Dresses',
    color: 'Black',
    season: 'All Season',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    tags: ['avant-garde', 'draping', 'minimal'],
    addedAt: '2025-09-25',
  },
  {
    id: '8',
    name: 'Cotton Poplin Shirt',
    brand: 'Jil Sander',
    category: 'Tops',
    color: 'White',
    season: 'All Season',
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&q=80',
    tags: ['classic', 'crisp', 'wardrobe-essential'],
    addedAt: '2025-09-15',
  },
];

export const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'];
