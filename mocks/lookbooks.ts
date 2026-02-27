export interface LookbookItem {
  id: string;
  title: string;
  description: string;
  image: string;
  itemCount: number;
  createdAt: string;
  mood: string;
}

export const lookbookItems: LookbookItem[] = [
  {
    id: 'lb1',
    title: 'Autumn Editorial',
    description: 'Layered textures in muted earth tones',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    itemCount: 5,
    createdAt: '2025-12-01',
    mood: 'Warm & Structured',
  },
  {
    id: 'lb2',
    title: 'Monochrome Minimal',
    description: 'The art of restraint in black and white',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80',
    itemCount: 4,
    createdAt: '2025-11-20',
    mood: 'Clean & Bold',
  },
  {
    id: 'lb3',
    title: 'Summer Linen',
    description: 'Effortless draping in natural fibers',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    itemCount: 6,
    createdAt: '2025-11-10',
    mood: 'Light & Airy',
  },
  {
    id: 'lb4',
    title: 'Evening Silhouettes',
    description: 'Sculptural forms for after dark',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    itemCount: 3,
    createdAt: '2025-10-25',
    mood: 'Dramatic & Elegant',
  },
  {
    id: 'lb5',
    title: 'Resort Collection',
    description: 'Curated pieces for coastal escapes',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    itemCount: 7,
    createdAt: '2025-10-15',
    mood: 'Relaxed & Refined',
  },
  {
    id: 'lb6',
    title: 'Avant-Garde Study',
    description: 'Deconstructed shapes and bold proportions',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    itemCount: 4,
    createdAt: '2025-10-01',
    mood: 'Experimental',
  },
];
