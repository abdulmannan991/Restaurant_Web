"use client"

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Plus, Minus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/context/ToastContext';
import type { MenuItem } from '@/lib/types';

interface ProductDetailProps {
    product: MenuItem;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const { addToCart } = useApp();
    const { showToast } = useToast();
    const [qty, setQty] = useState(1);
    const [serviceType, setServiceType] = useState('Dine-in');
    const [tableNumber, setTableNumber] = useState('');

    const handleAddToCart = () => {
        if (serviceType === 'Dine-in' && !tableNumber) {
            showToast('Please enter your table number', 'error');
            return;
        }
        addToCart(product, qty, serviceType, serviceType === 'Dine-in' ? tableNumber : undefined);
        showToast(`${product.name} added to cart!`, 'success');
        setQty(1);
        setTableNumber('');
    };

    // Calculate discounted price if discount exists
    const finalPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <Link
                href="/menu"
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition mb-8 font-bold"
            >
                <ArrowLeft size={18} /> BACK TO MENU
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="rounded-[40px] overflow-hidden border border-neutral-800 aspect-4/5 lg:aspect-auto relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover shadow-2xl"
                    />
                    {product.discount && (
                        <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-black animate-float">
                            -{product.discount}% OFF
                        </div>
                    )}
                </div>

                <div className="flex flex-col h-full">
                    <div className="mb-8">
                        <div className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">{product.category}</div>
                        <h1 className="text-5xl font-black text-neutral-900 dark:text-white mb-6 leading-tight">{product.name}</h1>
                        <div className="flex items-center gap-6 mb-8 text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center gap-1 text-amber-500">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill={i <= 4 ? "currentColor" : "none"} />)}
                                <span className="ml-2 font-bold text-neutral-900 dark:text-white">4.9 (120+ reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 border-l border-neutral-300 dark:border-neutral-800 pl-6">
                                <Clock size={16} /> 20-30 min
                            </div>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                            {product.description}
                            Our ingredients are ethically sourced and delivered fresh every morning.
                            Experience perfection in every bite.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 space-y-8 mb-8 shadow-xl dark:shadow-none">
                        <div className="flex items-center justify-between">
                            <span className="text-neutral-500 dark:text-neutral-400 font-bold">PRICE PER UNIT</span>
                            {product.discount ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-black text-amber-500">
                                        Rs {finalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-lg text-neutral-500 line-through">
                                        Rs {product.price.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-3xl font-black text-neutral-900 dark:text-white">Rs {product.price.toFixed(2)}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase">Dining Option</label>
                            <div className="relative">
                                <select
                                    value={serviceType}
                                    onChange={(e) => setServiceType(e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-4 rounded-xl appearance-none focus:outline-none focus:border-amber-500 transition cursor-pointer"
                                >
                                    <option value="Dine-in">Dine-in (At Restaurant)</option>
                                    <option value="Online Delivery">Online Delivery</option>
                                    <option value="Takeaway">Self Takeaway</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                    <Plus size={16} className="rotate-45" />
                                </div>
                            </div>
                        </div>

                        {serviceType === 'Dine-in' && (
                            <div className="flex flex-col gap-2 animate-fade-in">
                                <label className="text-xs font-bold text-neutral-500 uppercase">Table Number</label>
                                <input
                                    type="text"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    placeholder="Enter your table number"
                                    className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition"
                                    required
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-2">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-12 text-center font-black text-xl text-white">{qty}</span>
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="flex-1 text-right">
                                <span className="text-xs text-neutral-500 font-bold uppercase block mb-1">Subtotal</span>
                                <span className="text-3xl font-black text-amber-500">Rs {(finalPrice * qty).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-1 active:scale-95"
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}
