"use client"

import { useApp } from '@/context/AppContext';

export default function Dashboard() {
    const { orders } = useApp();

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-black text-white">Admin Dashboard</h1>
                <div className="flex items-center gap-4 text-neutral-400">
                    <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div> System Live
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[32px]">
                    <span className="text-neutral-500 font-bold text-xs uppercase block mb-2">Total Revenue</span>
                    <div className="text-3xl font-black text-amber-500">Rs {orders.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[32px]">
                    <span className="text-neutral-500 font-bold text-xs uppercase block mb-2">Active Orders</span>
                    <div className="text-3xl font-black text-white">{orders.length}</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[32px]">
                    <span className="text-neutral-500 font-bold text-xs uppercase block mb-2">User Base</span>
                    <div className="text-3xl font-black text-white">328</div>
                </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-neutral-800 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                    <button className="text-sm font-bold text-amber-500">VIEW ALL</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-950/50">
                                <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase">Customer</th>
                                <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase">Items</th>
                                <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase">Type</th>
                                <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase">Total</th>
                                <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((order) => (
                                <tr key={order.id} className="border-b border-neutral-800 hover:bg-white/5 transition">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-white">{order.userName}</div>
                                        <div className="text-xs text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm text-neutral-300">{order.items.length} dishes</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase Rs {order.serviceType === 'Dine-in' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {order.serviceType}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-white">Rs {order.total.toFixed(2)}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase">
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.length === 0 && (
                        <div className="p-20 text-center text-neutral-500">No orders found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
