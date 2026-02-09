"use client"

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { useMenu } from '@/context/MenuContext';
import { useToast } from '@/context/ToastContext';
import type { MenuItem } from '@/lib/types';

interface AddEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: MenuItem) => void;
    editItem?: MenuItem | null;
}

function AddEditModal({ isOpen, onClose, onSave, editItem }: AddEditModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Main Course',
        rating: 4.5,
        image: '',
        description: '',
        discount: ''
    });

    useEffect(() => {
        if (editItem) {
            setFormData({
                name: editItem.name,
                price: editItem.price.toString(),
                category: editItem.category,
                rating: editItem.rating,
                image: editItem.image,
                description: editItem.description,
                discount: editItem.discount ? editItem.discount.toString() : ''
            });
        } else {
            setFormData({
                name: '',
                price: '',
                category: 'Main Course',
                rating: 4.5,
                image: '',
                description: '',
                discount: ''
            });
        }
    }, [editItem, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const item: MenuItem = {
            id: editItem?.id || Date.now(),
            name: formData.name,
            price: parseFloat(formData.price),
            category: formData.category,
            rating: formData.rating,
            image: formData.image,
            description: formData.description,
            discount: formData.discount ? parseInt(formData.discount) : undefined
        };
        onSave(item);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
                <h2 className="text-3xl font-black text-white mb-8">{editItem ? 'Edit Item' : 'Add New Item'}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Item Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="Grilled Salmon"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                            >
                                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Price (Rs)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="24.99"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Discount (%) - Optional</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Image URL</label>
                        <input
                            type="url"
                            required
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Description</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition resize-none"
                            placeholder="Delicious grilled salmon with herbs..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl transition"
                        >
                            {editItem ? 'UPDATE ITEM' : 'ADD ITEM'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-xl transition"
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function MenuManagement() {
    const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
    const { showToast } = useToast();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<MenuItem | null>(null);

    const handleAddItem = (item: MenuItem) => {
        addMenuItem(item);
        showToast(`${item.name} added successfully!`, 'success');
    };

    const handleEditItem = (item: MenuItem) => {
        updateMenuItem(item);
        setEditItem(null);
        showToast(`${item.name} updated successfully!`, 'success');
    };

    const handleDeleteItem = (id: number) => {
        const item = menuItems.find(i => i.id === id);
        if (confirm('Are you sure you want to delete this item?')) {
            deleteMenuItem(id);
            showToast(`${item?.name || 'Item'} deleted successfully!`, 'success');
        }
    };

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-white">Menu Management</h2>
                <button
                    onClick={() => { setEditItem(null); setShowModal(true); }}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl transition flex items-center gap-2"
                >
                    <Plus size={20} /> ADD NEW ITEM
                </button>
            </div>

            <div className="flex gap-3 flex-wrap">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-3 rounded-xl font-bold transition Rs {selectedCategory === cat
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden group">
                        <div className="relative h-48">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            {item.discount && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    -{item.discount}%
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="text-amber-500 text-xs font-bold uppercase mb-2">{item.category}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                            <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-black text-white">Rs {item.price.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setEditItem(item); setShowModal(true); }}
                                    className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
                                >
                                    <Edit size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AddEditModal
                isOpen={showModal}
                onClose={() => { setShowModal(false); setEditItem(null); }}
                onSave={editItem ? handleEditItem : handleAddItem}
                editItem={editItem}
            />
        </div>
    );
}
