// LocalStorage Utilities

import { STORAGE_KEYS } from './constants';
import type { User, Profile, Order } from './types';

export const storage = {
  // User
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  setUser: (user: User) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  removeUser: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Profile
  getProfile: (): Profile | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  },
  setProfile: (profile: Profile) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },
  removeProfile: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  },

  // Orders
  getOrders: (): Order[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },
  setOrders: (orders: Order[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  // Users list (for authentication)
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('restaurant_users');
    return data ? JSON.parse(data) : [];
  },
  setUsers: (users: User[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('restaurant_users', JSON.stringify(users));
  },

  // Menu Items (for admin management)
  getMenuItems: () => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    return data ? JSON.parse(data) : null;
  },
  setMenuItems: (items: any[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  }
};
