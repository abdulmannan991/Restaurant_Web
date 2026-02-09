// TypeScript Type Definitions

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string; // Optional name field
}

export interface Profile {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  discount?: number; // Optional discount percentage
}

export interface CartItem extends MenuItem {
  quantity: number;
  serviceType: string;
  tableNumber?: string; // For dine-in orders
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
  serviceType: string;
  tableNumber?: string; // For dine-in orders
  deliveryInfo?: {
    name: string;
    phone: string;
    address: string;
  }; // For online delivery
  createdAt: string;
}
