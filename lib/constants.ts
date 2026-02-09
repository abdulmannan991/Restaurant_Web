// Constants

export const ADMIN_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: 'admin1234'
} as const;

export const STORAGE_KEYS = {
  USER: 'restaurant_user',
  PROFILE: 'restaurant_profile',
  ORDERS: 'restaurant_orders',
  MENU_ITEMS: 'restaurant_menu_items'
} as const;

export const CATEGORIES = ["All", "Appetizers", "Main Course", "Desserts", "Beverages"];

export const MENU_ITEMS = [
  { 
    id: 1, 
    name: "Truffle Ribeye Steak", 
    price: 42.00, 
    category: "Main Course", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800", 
    description: "Premium aged ribeye drizzled with Italian black truffle oil and served with roasted seasonal vegetables." 
  },
  { 
    id: 2, 
    name: "Salmon Carpaccio", 
    price: 24.50, 
    category: "Appetizers", 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800", 
    description: "Thinly sliced wild-caught salmon with capers, lemon zest, and premium extra virgin olive oil." 
  },
  { 
    id: 3, 
    name: "Gourmet Lobster Mac", 
    price: 34.00, 
    category: "Main Course", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800", 
    description: "Fresh Maine lobster tossed in a five-cheese blend and topped with herb breadcrumbs." 
  },
  { 
    id: 4, 
    name: "Vanilla Bean Panna Cotta", 
    price: 12.00, 
    category: "Desserts", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800", 
    description: "Silky smooth panna cotta infused with Madagascar vanilla beans, served with berry coulis." 
  },
  { 
    id: 5, 
    name: "Saffron Risotto", 
    price: 28.00, 
    category: "Main Course", 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0f?auto=format&fit=crop&q=80&w=800", 
    description: "Creamy Arborio rice slow-cooked with Persian saffron and topped with parmesan crisps." 
  },
  { 
    id: 6, 
    name: "Signature Old Fashioned", 
    price: 16.00, 
    category: "Beverages", 
    rating: 5.0, 
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", 
    description: "A classic cocktail with a modern twist, using barrel-aged bourbon and house-made bitters." 
  }
];
