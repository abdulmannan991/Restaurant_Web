"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '@/lib/storage';
import { MENU_ITEMS as DEFAULT_MENU_ITEMS } from '@/lib/constants';
import type { MenuItem } from '@/lib/types';

interface MenuContextType {
    menuItems: MenuItem[];
    addMenuItem: (item: MenuItem) => void;
    updateMenuItem: (item: MenuItem) => void;
    deleteMenuItem: (id: number) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        // Load menu items from storage or use defaults
        const stored = storage.getMenuItems();
        setMenuItems(stored || DEFAULT_MENU_ITEMS);
    }, []);

    const saveMenuItems = (items: MenuItem[]) => {
        setMenuItems(items);
        storage.setMenuItems(items);
    };

    const addMenuItem = (item: MenuItem) => {
        saveMenuItems([...menuItems, item]);
    };

    const updateMenuItem = (item: MenuItem) => {
        saveMenuItems(menuItems.map(i => i.id === item.id ? item : i));
    };

    const deleteMenuItem = (id: number) => {
        saveMenuItems(menuItems.filter(i => i.id !== id));
    };

    const value: MenuContextType = {
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}
