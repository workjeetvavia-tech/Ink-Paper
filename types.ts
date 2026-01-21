export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

export type Category = 'Pens' | 'Notebooks' | 'Art Supplies' | 'Desk Accessories' | 'Gifts';

export interface CartItem extends Product {
  quantity: number;
}