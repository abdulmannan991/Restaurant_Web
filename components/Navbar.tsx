"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, LogOut, LayoutDashboard, Utensils } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
    const pathname = usePathname();
    const { user, profile, cart, logout } = useApp();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Utensils className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase">Savory & Sage</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-neutral-400 text-sm font-medium">
                    <Link
                        href="/"
                        className={pathname === '/' ? 'text-amber-500' : 'hover:text-white transition'}
                    >
                        HOME
                    </Link>
                    <Link
                        href="/menu"
                        className={pathname === '/menu' ? 'text-amber-500' : 'hover:text-white transition'}
                    >
                        MENU
                    </Link>
                    {profile?.role === 'admin' && (
                        <Link
                            href="/dashboard"
                            className={`${pathname === '/dashboard' ? 'text-amber-500' : 'hover:text-white transition'} flex items-center gap-1`}
                        >
                            <LayoutDashboard size={16} /> DASHBOARD
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/cart"
                        className="relative p-2 text-neutral-400 hover:text-white transition"
                    >
                        <ShoppingBag size={24} />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:block text-sm text-neutral-300 font-medium">Hi, {profile?.name}</span>
                            <button
                                onClick={logout}
                                className="p-2 text-neutral-400 hover:text-red-400 transition"
                            >
                                <LogOut size={22} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-bold transition shadow-lg shadow-amber-500/20"
                        >
                            LOGIN
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
