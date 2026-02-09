"use client"

import { useState } from 'react';
import { Package, CheckCircle, Utensils, Truck, MapPin, Phone, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/context/ToastContext';
import type { Order } from '@/lib/types';

export default function OrderManagement() {
    const { orders, updateOrderStatus } = useApp();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<'all' | 'online' | 'dinein' | 'completed'>('all');

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'all') return order.status === 'pending';
        if (activeTab === 'online') return order.serviceType === 'Online Delivery' && order.status === 'pending';
        if (activeTab === 'dinein') return order.serviceType === 'Dine-in' && order.status === 'pending';
        if (activeTab === 'completed') return order.status === 'completed';
        return true;
    });

    const handleCompleteOrder = (orderId: string) => {
        updateOrderStatus(orderId, 'completed');
        showToast('Order marked as completed!', 'success');
    };

    const handleUncompleteOrder = (orderId: string) => {
        updateOrderStatus(orderId, 'pending');
        showToast('Order moved back to pending!', 'success');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-white">Order Management</h2>

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'all'
                        ? 'bg-amber-500 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                        }`}
                >
                    All Orders ({orders.filter(o => o.status === 'pending').length})
                </button>
                <button
                    onClick={() => setActiveTab('online')}
                    className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${activeTab === 'online'
                        ? 'bg-amber-500 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                        }`}
                >
                    <Truck size={18} /> Online Delivery ({orders.filter(o => o.serviceType === 'Online Delivery' && o.status === 'pending').length})
                </button>
                <button
                    onClick={() => setActiveTab('dinein')}
                    className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${activeTab === 'dinein'
                        ? 'bg-amber-500 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                        }`}
                >
                    <Utensils size={18} /> Dine-in ({orders.filter(o => o.serviceType === 'Dine-in' && o.status === 'pending').length})
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${activeTab === 'completed'
                        ? 'bg-amber-500 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                        }`}
                >
                    <CheckCircle size={18} /> Completed ({orders.filter(o => o.status === 'completed').length})
                </button>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-16 text-center">
                    <Package className="mx-auto text-neutral-600 mb-4" size={48} />
                    <p className="text-neutral-500 text-lg">No orders in this category</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrders.map(order => (
                        <div key={order.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-xs text-neutral-500 font-bold uppercase mb-1">Order #{order.id.slice(-6)}</div>
                                    <div className="text-sm text-neutral-400">{new Date(order.createdAt).toLocaleString()}</div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'completed'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-amber-500/10 text-amber-500'
                                    }`}>
                                    {order.status === 'completed' ? 'Completed' : 'Pending'}
                                </div>
                            </div>

                            <div className="border-t border-neutral-800 pt-4">
                                <div className="flex items-center gap-2 text-amber-500 font-bold mb-3">
                                    {order.serviceType === 'Dine-in' ? <Utensils size={16} /> : <Truck size={16} />}
                                    {order.serviceType}
                                </div>

                                {order.tableNumber && (
                                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-2">
                                        <MapPin size={14} />
                                        Table #{order.tableNumber}
                                    </div>
                                )}

                                {order.deliveryInfo && (
                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                            <User size={14} />
                                            {order.deliveryInfo.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                            <Phone size={14} />
                                            {order.deliveryInfo.phone}
                                        </div>
                                        <div className="flex items-start gap-2 text-neutral-400 text-sm">
                                            <MapPin size={14} className="mt-0.5" />
                                            <span className="flex-1">{order.deliveryInfo.address}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="text-neutral-400 text-sm mb-2">
                                    <span className="font-bold">Customer:</span> {order.userName}
                                </div>
                            </div>

                            <div className="border-t border-neutral-800 pt-4 space-y-2">
                                <div className="text-xs text-neutral-500 font-bold uppercase mb-2">Items</div>
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span className="text-neutral-400">{item.quantity}x {item.name}</span>
                                        <span className="text-white font-bold">Rs {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-neutral-800 pt-4 flex items-center justify-between">
                                <span className="text-neutral-400 font-bold">Total</span>
                                <span className="text-2xl font-black text-amber-500">Rs {order.total.toFixed(2)}</span>
                            </div>

                            {order.status === 'pending' ? (
                                <button
                                    onClick={() => handleCompleteOrder(order.id)}
                                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl transition flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={18} /> MARK AS COMPLETED
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleUncompleteOrder(order.id)}
                                    className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-xl transition"
                                >
                                    MOVE TO PENDING
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
