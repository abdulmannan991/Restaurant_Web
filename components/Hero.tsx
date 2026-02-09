import Link from 'next/link';
import { ChevronRight, Star, Award, Users, Clock } from 'lucide-react';

export default function Hero() {
    return (
        <>
            {/* Main Hero Section */}
            <div className="relative h-screen flex items-center overflow-hidden bg-neutral-900">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-40"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-2xl animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-6 tracking-widest uppercase animate-float">
                            <Star size={14} fill="currentColor" /> Excellence in Every Bite
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
                            FINE DINING <br />
                            <span className="text-amber-500">REDEFINED.</span>
                        </h1>
                        <p className="text-neutral-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                            Experience a symphony of flavors crafted by Michelin-starred chefs.
                            From local organic produce to world-class wines.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/menu"
                                className="px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl transition flex items-center justify-center gap-2 transform hover:scale-105 shadow-xl shadow-amber-500/20"
                            >
                                EXPLORE MENU <ChevronRight size={20} />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl border border-white/10 transition backdrop-blur-sm transform hover:scale-105"
                            >
                                BOOK A TABLE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-neutral-950 py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Award, label: 'Michelin Stars', value: '3' },
                        { icon: Users, label: 'Happy Customers', value: '10K+' },
                        { icon: Clock, label: 'Years Experience', value: '25+' },
                        { icon: Star, label: 'Average Rating', value: '4.9' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="text-amber-500" size={32} />
                            </div>
                            <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                            <div className="text-neutral-500 text-sm font-bold uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Section */}
            <div className="bg-neutral-900 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-5xl font-black text-white mb-4">Why Choose Us</h2>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            We combine tradition with innovation to create unforgettable dining experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Premium Ingredients',
                                desc: 'Sourced from local farms and international suppliers',
                                img: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&q=80&w=800'
                            },
                            {
                                title: 'Expert Chefs',
                                desc: 'Trained in world-renowned culinary institutions',
                                img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800'
                            },
                            {
                                title: 'Elegant Ambiance',
                                desc: 'Sophisticated atmosphere for every occasion',
                                img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl h-80 animate-scale-in" style={{ animationDelay: `${i * 0.15}s` }}>
                                <img src={feature.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={feature.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-2xl font-black text-white mb-2">{feature.title}</h3>
                                    <p className="text-neutral-300">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
