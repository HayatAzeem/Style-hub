import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tops',
    subcategory: 't-shirts',
    description: 'Premium cotton t-shirt with a classic fit. Perfect for everyday wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    inStock: true,
    rating: 4.5,
    reviewCount: 124,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'bottoms',
    subcategory: 'jeans',
    description: 'Modern slim fit jeans with premium denim construction.',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Light Blue'],
    inStock: true,
    rating: 4.3,
    reviewCount: 89,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Elegant Silk Blouse',
    price: 149.99,
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tops',
    subcategory: 'blouses',
    description: 'Luxurious silk blouse perfect for professional settings.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Navy', 'Burgundy'],
    inStock: true,
    rating: 4.7,
    reviewCount: 45,
    isNew: true
  },
  {
    id: '4',
    name: 'Casual Summer Dress',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'dresses',
    subcategory: 'casual',
    description: 'Light and airy summer dress perfect for warm weather.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral', 'Solid Blue', 'White'],
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
    isFeatured: true
  },
  {
    id: '5',
    name: 'Wool Blend Sweater',
    price: 119.99,
    images: [
      'https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tops',
    subcategory: 'sweaters',
    description: 'Cozy wool blend sweater for cooler weather.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Cream', 'Navy'],
    inStock: true,
    rating: 4.4,
    reviewCount: 67
  },
  {
    id: '6',
    name: 'Formal Blazer',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/7679764/pexels-photo-7679764.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'outerwear',
    subcategory: 'blazers',
    description: 'Tailored blazer perfect for business and formal occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true,
    rating: 4.8,
    reviewCount: 34,
    isNew: true
  },
  {
    id: '7',
    name: 'Athletic Leggings',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/8129903/pexels-photo-8129903.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'activewear',
    subcategory: 'leggings',
    description: 'High-performance leggings for workouts and active lifestyle.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray', 'Burgundy'],
    inStock: true,
    rating: 4.5,
    reviewCount: 156,
    isFeatured: true
  },
  {
    id: '8',
    name: 'Vintage Leather Jacket',
    price: 299.99,
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'outerwear',
    subcategory: 'jackets',
    description: 'Premium leather jacket with vintage styling.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    inStock: true,
    rating: 4.9,
    reviewCount: 23,
    isNew: true
  }
];

export const categories = [
  { id: 'tops', name: 'Tops', subcategories: ['t-shirts', 'blouses', 'sweaters'] },
  { id: 'bottoms', name: 'Bottoms', subcategories: ['jeans', 'pants', 'shorts'] },
  { id: 'dresses', name: 'Dresses', subcategories: ['casual', 'formal', 'maxi'] },
  { id: 'outerwear', name: 'Outerwear', subcategories: ['jackets', 'coats', 'blazers'] },
  { id: 'activewear', name: 'Activewear', subcategories: ['leggings', 'sports-bras', 'shorts'] }
];