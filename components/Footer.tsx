import Link from 'next/link';
import { Utensils, User, MapPin, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-neutral-950 border-t border-neutral-800 pt-20 pb-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                                <Utensils className="text-white w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white uppercase">Savory & Sage</span>
                        </div>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            The pinnacle of taste and elegance. Experience fine dining from the comfort of your heart.
                        </p>
                    </div>

                    <div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-sm text-neutral-500">
                                <li className="hover:text-amber-500 cursor-pointer transition">
                                    <Link href="/about">About Us</Link>
                                </li>
                                <li className="hover:text-amber-500 cursor-pointer transition">
                                    <Link href="/menu">Our Menu</Link>
                                </li>
                                <li className="hover:text-amber-500 cursor-pointer transition">
                                    <Link href="/contact">Contact</Link>
                                </li>
                                <li className="hover:text-amber-500 cursor-pointer transition">
                                    <Link href="/cart">Cart</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-amber-500" /> 123 Gourmet St, Food City
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock size={16} className="text-amber-500" /> 09:00 AM - 11:00 PM
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Demo Access</h4>
                        <p className="text-xs text-neutral-500 mb-4">Signup to place orders or contact admin for dashboard access.</p>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-amber-500 transition cursor-pointer">
                                <User size={14} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600 font-bold uppercase tracking-widest">
                    <p>&copy; 2025 Savory & Sage Restaurant Group</p>
                    <div className="flex gap-8">
                        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
