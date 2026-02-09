"use client"

import { useState } from 'react';
import { X, Package } from 'lucide-react';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (deliveryInfo: { name: string; phone: string; address: string }) => void;
    total: number;
}

export default function CheckoutModal({ isOpen, onClose, onSubmit, total }: CheckoutModalProps) {
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', phone: '', address: '' });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 max-w-md w-full animate-scale-in">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                            <Package className="text-amber-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">Delivery Details</h2>
                            <p className="text-neutral-500 text-sm">Complete your order</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Phone Number</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Delivery Address</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition resize-none"
                            placeholder="123 Main St, Apt 4B, City, State 12345"
                        />
                    </div>

                    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between">
                        <span className="text-neutral-400 font-bold">Total Amount</span>
                        <span className="text-2xl font-black text-amber-500">Rs {total.toFixed(2)}</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl transition shadow-xl shadow-amber-500/20 transform hover:scale-105"
                    >
                        PLACE ORDER
                    </button>
                </form>
            </div>
        </div>
    );
}
