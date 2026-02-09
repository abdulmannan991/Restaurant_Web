"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '@/lib/storage';
import { ADMIN_CREDENTIALS } from '@/lib/constants';
import type { User, Profile, CartItem, Order, MenuItem } from '@/lib/types';

interface AppContextType {
    // Auth
    user: User | null;
    profile: Profile | null;
    authError: string;
    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
    setAuthError: (error: string) => void;

    // Cart
    cart: CartItem[];
    addToCart: (product: MenuItem, quantity: number, serviceType: string, tableNumber?: string) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;

    // Orders
    orders: Order[];
    placeOrder: (deliveryInfo?: { name: string; phone: string; address: string }) => void;
    updateOrderStatus: (orderId: string, status: 'pending' | 'completed') => void;

    // Loading
    loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState("");

    // Initialize from localStorage
    useEffect(() => {
        const initAuth = () => {
            try {
                const storedUser = storage.getUser();
                const storedProfile = storage.getProfile();
                const storedOrders = storage.getOrders();

                if (storedUser) setUser(storedUser);
                if (storedProfile) setProfile(storedProfile);
                if (storedOrders) setOrders(storedOrders);
            } catch (err) {
                console.error("Init error:", err);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    // Save orders to localStorage
    useEffect(() => {
        if (orders.length > 0) {
            storage.setOrders(orders);
        }
    }, [orders]);

    // Auth functions
    const signup = (name: string, email: string, password: string) => {
        setAuthError("");
        try {
            if (password.length < 6) {
                setAuthError("Password must be at least 6 characters");
                return;
            }

            const existingUsers = storage.getUsers();
            if (existingUsers.find((u: User) => u.email === email)) {
                setAuthError("User already exists with this email");
                return;
            }

            const newUser: User = {
                id: Date.now().toString(),
                email,
                password,
                name: name || 'Guest'
            };
            const newProfile: Profile = {
                name: name || 'Guest',
                email,
                role: 'user' as const
            };

            existingUsers.push(newUser);
            storage.setUsers(existingUsers);
            storage.setUser(newUser);
            storage.setProfile(newProfile);

            setUser(newUser);
            setProfile(newProfile);
        } catch (err: unknown) {
            setAuthError((err as Error).message || "An error occurred");
        }
    };

    const login = (email: string, password: string) => {
        setAuthError("");
        try {
            // Check if admin credentials FIRST (before checking database)
            const isAdmin = email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;

            if (isAdmin) {
                const adminUser: User = {
                    id: 'admin',
                    email: ADMIN_CREDENTIALS.email,
                    password: ADMIN_CREDENTIALS.password,
                    name: 'Admin'
                };
                const adminProfile: Profile = {
                    name: 'Admin',
                    email: ADMIN_CREDENTIALS.email,
                    role: 'admin'
                };
                storage.setUser(adminUser);
                storage.setProfile(adminProfile);
                setUser(adminUser);
                setProfile(adminProfile);
                return;
            }

            // Then check regular users
            if (password.length < 6) {
                setAuthError("Password must be at least 6 characters");
                return;
            }

            const existingUsers = storage.getUsers();
            const foundUser = existingUsers.find((u: User) => u.email === email && u.password === password);

            if (!foundUser) {
                setAuthError("Invalid email or password");
                return;
            }

            const userProfile: Profile = {
                name: foundUser.name || email.split('@')[0],
                email: foundUser.email,
                role: 'user'
            };

            storage.setUser(foundUser);
            storage.setProfile(userProfile);

            setUser(foundUser);
            setProfile(userProfile);
        } catch (err: unknown) {
            setAuthError((err as Error).message || "An error occurred");
        }
    };

    const logout = () => {
        storage.removeUser();
        storage.removeProfile();
        setUser(null);
        setProfile(null);
    };

    // Cart functions
    const addToCart = (product: MenuItem, quantity: number, serviceType: string, tableNumber?: string) => {
        const newItem: CartItem = { ...product, quantity, serviceType };
        if (tableNumber) {
            newItem.tableNumber = tableNumber;
        }

        const existing = cart.find(item => item.id === product.id && item.serviceType === serviceType);
        if (existing) {
            setCart(cart.map(item =>
                (item.id === product.id && item.serviceType === serviceType)
                    ? { ...item, quantity: item.quantity + quantity, tableNumber: tableNumber || item.tableNumber }
                    : item
            ));
        } else {
            setCart([...cart, newItem]);
        }
    };

    const removeFromCart = (index: number) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Order functions
    const placeOrder = (deliveryInfo?: { name: string; phone: string; address: string }) => {
        if (!user || cart.length === 0) return;

        const firstItem = cart[0];

        // Calculate total with discounts
        const total = cart.reduce((acc, curr) => {
            const finalPrice = curr.discount
                ? curr.price * (1 - curr.discount / 100)
                : curr.price;
            return acc + (finalPrice * curr.quantity);
        }, 0);

        const orderData: Order = {
            id: Date.now().toString(),
            userId: user.id,
            userName: profile?.name || 'Anonymous',
            items: cart,
            total: total,
            status: 'pending',
            serviceType: firstItem.serviceType,
            createdAt: new Date().toISOString()
        };

        // Add table number for dine-in
        if (firstItem.serviceType === 'Dine-in' && firstItem.tableNumber) {
            orderData.tableNumber = firstItem.tableNumber;
        }

        // Add delivery info for online orders
        if (firstItem.serviceType === 'Online Delivery' && deliveryInfo) {
            orderData.deliveryInfo = deliveryInfo;
        }

        setOrders([...orders, orderData]);
        clearCart();
    };

    const updateOrderStatus = (orderId: string, status: 'pending' | 'completed') => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status } : order
        ));
    };

    const value: AppContextType = {
        user,
        profile,
        authError,
        login,
        signup,
        logout,
        setAuthError,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        updateOrderStatus,
        loading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
