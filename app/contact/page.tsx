"use client"

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Message sent! We\'ll get back to you soon.', 'success');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4">Get In Touch</h1>
                <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                    Have questions or want to make a reservation? We'd love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 animate-scale-in">
                    <h2 className="text-3xl font-black text-white mb-8">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Your Name</label>
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
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1 block mb-2">Message</label>
                            <textarea
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition resize-none"
                                placeholder="Tell us about your inquiry..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transform hover:scale-105"
                        >
                            <Send size={20} /> SEND MESSAGE
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                        <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                            <MapPin className="text-amber-500" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                        <p className="text-neutral-400">123 Gourmet Street<br />Food City, FC 12345</p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                        <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                            <Phone className="text-amber-500" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                        <p className="text-neutral-400">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                        <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                            <Mail className="text-amber-500" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                        <p className="text-neutral-400">info@savoryandsage.com<br />reservations@savoryandsage.com</p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                        <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                            <Clock className="text-amber-500" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Opening Hours</h3>
                        <p className="text-neutral-400">
                            Monday - Friday: 11:00 AM - 11:00 PM<br />
                            Saturday - Sunday: 10:00 AM - 12:00 AM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
