"use client"

import { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '@/lib/constants';
import { useMenu } from '@/context/MenuContext';

export default function MenuList() {
    const { menuItems } = useMenu();
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredItems = menuItems.filter(item =>
        activeCategory === "All" || item.category === activeCategory
    );

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">Our Culinary Art</h2>
                    <p className="text-neutral-500">Curated dishes from our master chefs</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${activeCategory === cat
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map(item => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
