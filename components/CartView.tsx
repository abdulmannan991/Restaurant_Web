"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, X, Utensils, Truck, CheckCircle, Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/context/ToastContext';
import CheckoutModal from './CheckoutModal';

export default function CartView() {
    const router = useRouter();
    const { cart, removeFromCart, placeOrder, user } = useApp();
    const { showToast } = useToast();
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Calculate subtotal with discounts
    const subtotal = cart.reduce((acc, curr) => {
        const finalPrice = curr.discount
            ? curr.price * (1 - curr.discount / 100)
            : curr.price;
        return acc + (finalPrice * curr.quantity);
    }, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const serviceType = cart[0]?.serviceType;
    const tableNumber = cart[0]?.tableNumber;

    const handlePlaceOrder = () => {
        if (!user) {
            router.push('/auth/login');
            return;
        }

        // If online delivery, show modal for delivery info
        if (serviceType === 'Online Delivery') {
            setShowCheckoutModal(true);
        } else {
            // For dine-in or takeaway, place order directly
            placeOrder();
            setOrderPlaced(true);
            showToast('Order placed successfully!', 'success');
        }
    };

    const handleCheckoutSubmit = (deliveryInfo: { name: string; phone: string; address: string }) => {
        placeOrder(deliveryInfo);
        setShowCheckoutModal(false);
        setOrderPlaced(true);
        showToast('Order placed successfully!', 'success');
    };

    if (orderPlaced) {
        return (
            <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto min-h-screen">
                <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] p-16 text-center animate-scale-in">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="text-green-500" size={48} />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-4">Order Confirmed!</h1>

                    {serviceType === 'Dine-in' && tableNumber && (
                        <p className="text-neutral-400 text-lg mb-8">
                            Your order will be served at <span className="text-amber-500 font-bold">Table #{tableNumber}</span> soon.
                        </p>
                    )}

                    {serviceType === 'Online Delivery' && (
                        <p className="text-neutral-400 text-lg mb-8">
                            You will receive your order soon! We'll notify you when it's on the way.
                        </p>
                    )}

                    {serviceType === 'Takeaway' && (
                        <p className="text-neutral-400 text-lg mb-8">
                            Your order is being prepared. Please collect it from the counter soon.
                        </p>
                    )}

                    <div className="flex gap-4 justify-center mt-8">
                        <Link
                            href="/menu"
                            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl transition"
                        >
                            ORDER MORE
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-xl transition"
                        >
                            GO HOME
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-4xl font-black text-white mb-10">Your Selection</h1>

                {cart.length === 0 ? (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] p-20 text-center">
                        <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-500">
                            <ShoppingBag size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                        <p className="text-neutral-500 mb-8">Looks like you haven't made your choice yet.</p>
                        <Link
                            href="/menu"
                            className="inline-block px-8 py-4 bg-amber-500 text-white font-bold rounded-xl transition hover:bg-amber-600"
                        >
                            BROWSE MENU
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item, i) => {
                                const finalPrice = item.discount
                                    ? item.price * (1 - item.discount / 100)
                                    : item.price;

                                return (
                                    <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex gap-6">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                            {item.discount && (
                                                <div className="absolute top-1 right-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                                    -{item.discount}%
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(i)}
                                                    className="text-neutral-500 hover:text-red-500 transition"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            <div className="text-sm font-bold text-amber-500 mb-2 flex items-center gap-2">
                                                {item.serviceType === 'Dine-in' ? <Utensils size={14} /> : item.serviceType === 'Online Delivery' ? <Truck size={14} /> : <Package size={14} />}
                                                {item.serviceType}
                                                {item.tableNumber && <span className="text-neutral-500">• Table #{item.tableNumber}</span>}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-neutral-400 font-medium">Qty: {item.quantity}</div>
                                                <div className="flex items-center gap-2">
                                                    {item.discount && (
                                                        <span className="text-sm text-neutral-500 line-through">
                                                            Rs {(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    )}
                                                    <div className="text-xl font-black text-white">
                                                        Rs {(finalPrice * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8 sticky top-28">
                                <h3 className="text-xl font-bold text-white mb-8 border-b border-neutral-800 pb-4">Order Summary</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Subtotal</span>
                                        <span className="text-white font-medium">Rs {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Service Tax (10%)</span>
                                        <span className="text-white font-medium">Rs {tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400 pt-4 border-t border-neutral-800">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-2xl font-black text-amber-500">Rs {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {!user && (
                                    <p className="text-sm text-neutral-500 mb-4 text-center">
                                        Please <Link href="/auth/login" className="text-amber-500 font-bold underline">Login</Link> to complete your order.
                                    </p>
                                )}

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={!user}
                                    className={`w-full py-5 rounded-2xl font-black transition flex items-center justify-center gap-3 Rs {user
                                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20 transform hover:scale-105'
                                        : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                                        }`}
                                >
                                    <CheckCircle size={20} /> COMPLETE ORDER
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CheckoutModal
                isOpen={showCheckoutModal}
                onClose={() => setShowCheckoutModal(false)}
                onSubmit={handleCheckoutSubmit}
                total={total}
            />
        </>
    );
}
