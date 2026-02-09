"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LayoutDashboard, Package } from 'lucide-react';
import MenuManagement from '@/components/admin/MenuManagement';
import OrderManagement from '@/components/admin/OrderManagement';

export default function DashboardPage() {
    const router = useRouter();
    const { profile, loading } = useApp();
    const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('menu');

    useEffect(() => {
        if (!loading && (!profile || profile.role !== 'admin')) {
            router.push('/');
        }
    }, [profile, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!profile || profile.role !== 'admin') {
        return null;
    }

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="mb-10">
                <h1 className="text-5xl font-black text-white mb-4">Admin Dashboard</h1>
                <p className="text-neutral-400 text-lg">Manage your restaurant menu and orders</p>
            </div>

            <div className="flex gap-4 mb-10">
                <button
                    onClick={() => setActiveTab('menu')}
                    className={`px-8 py-4 rounded-2xl font-black transition flex items-center gap-3 ${activeTab === 'menu'
                            ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                >
                    <LayoutDashboard size={20} /> MENU MANAGEMENT
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-8 py-4 rounded-2xl font-black transition flex items-center gap-3 ${activeTab === 'orders'
                            ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                >
                    <Package size={20} /> ORDER MANAGEMENT
                </button>
            </div>

            <div className="animate-fade-in">
                {activeTab === 'menu' ? <MenuManagement /> : <OrderManagement />}
            </div>
        </div>
    );
}
