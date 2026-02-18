// Static product data — loaded into Redux store (productsSlice) on mount.
//
// Images: Unsplash placeholders (w=600&h=400&fit=crop for consistent aspect ratio).
//         Replace with client-provided assets before go-live.
//         Target file size: ≤80KB per image, WebP format with JPG fallback.
//
// category field must match one of the id values in the `categories` array below
// so that the ProductCategories filter works correctly.

export const products = [
  {
    id: 1,
    name: 'Premium Rice',
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
    description: 'High-quality premium rice for restaurants and retailers.',
  },
  {
    id: 2,
    name: 'Black Beans',
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e0?w=600&h=400&fit=crop',
    description: 'Nutritious black beans, perfect for Latin American cuisine.',
  },
  {
    id: 3,
    name: 'Chicken Breast',
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop',
    description: 'Fresh, USDA-approved chicken breast.',
  },
  {
    id: 4,
    name: 'Vegetable Oil',
    category: 'Oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop',
    description: 'Pure vegetable oil for cooking and frying.',
  },
  {
    id: 5,
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop',
    description: 'Farm-fresh tomatoes delivered daily.',
  },
  {
    id: 6,
    name: 'Wheat Flour',
    category: 'Baking',
    image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=600&h=400&fit=crop',
    description: 'All-purpose wheat flour for baking.',
  },
  {
    id: 7,
    name: 'Refined Sugar',
    category: 'Baking',
    image: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=600&h=400&fit=crop',
    description: 'High-quality refined sugar.',
  },
  {
    id: 8,
    name: 'Dry Pasta',
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=600&h=400&fit=crop',
    description: 'Italian-style dry pasta varieties.',
  },
];

// Categories drive the filter tabs in ProductCategories section.
// 'all' is added programmatically in the component — do not add it here.
export const categories = [
  {
    id: 'grains',
    name: 'Grains',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    description: 'Rice, beans, pasta, and more',
  },
  {
    id: 'meat',
    name: 'Meat',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bd656c?w=400&h=300&fit=crop',
    description: 'Fresh poultry and meat products',
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop',
    description: 'Farm-fresh vegetables',
  },
  {
    id: 'packaged',
    name: 'Packaged Goods',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop',
    description: 'Oils, flours, and packaged items',
  },
];
