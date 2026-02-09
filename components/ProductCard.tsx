"use client"

import Link from 'next/link';
import { Star, Plus } from 'lucide-react';
import type { MenuItem } from '@/lib/types';

interface ProductCardProps {
    item: MenuItem;
}

export default function ProductCard({ item }: ProductCardProps) {
    return (
        <Link
            href={`/product/${item.id}`}
            className="group bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition cursor-pointer"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star size={12} fill="currentColor" /> {item.rating}
                </div>
                {item.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-float">
                        -{item.discount}% OFF
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="text-xs font-bold text-amber-500 uppercase mb-2">{item.category}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-neutral-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    {item.discount ? (
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-amber-500">
                                Rs {(item.price * (1 - item.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-neutral-500 line-through">
                                Rs {item.price.toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-2xl font-black text-white">Rs {item.price.toFixed(2)}</span>
                    )}
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white group-hover:rotate-90 transition duration-300">
                        <Plus size={20} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
