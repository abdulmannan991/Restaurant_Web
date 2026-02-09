import { Award, Heart, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20 px-4">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto mb-20">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4">Our Story</h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        A journey of passion, dedication, and culinary excellence spanning over two decades
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="rounded-[40px] overflow-hidden animate-scale-in">
                        <img
                            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200"
                            alt="Restaurant Interior"
                            className="w-full h-[500px] object-cover"
                        />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <h2 className="text-4xl font-black text-white mb-6">Where Tradition Meets Innovation</h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                            Founded in 1999, Savory & Sage has been at the forefront of fine dining,
                            combining classical French techniques with modern culinary innovation. Our
                            commitment to excellence has earned us three Michelin stars and the hearts
                            of food enthusiasts worldwide.
                        </p>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            Every dish tells a story, crafted with locally-sourced ingredients and
                            international flavors. Our team of award-winning chefs brings decades of
                            experience to create unforgettable dining experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-black text-white text-center mb-12 animate-fade-in">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Award,
                            title: 'Excellence',
                            desc: 'Striving for perfection in every dish we serve'
                        },
                        {
                            icon: Heart,
                            title: 'Passion',
                            desc: 'Love for food drives everything we do'
                        },
                        {
                            icon: Users,
                            title: 'Community',
                            desc: 'Building relationships with local suppliers'
                        },
                        {
                            icon: Sparkles,
                            title: 'Innovation',
                            desc: 'Constantly evolving our culinary techniques'
                        }
                    ].map((value, i) => (
                        <div
                            key={i}
                            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center animate-scale-in hover:border-amber-500/50 transition group"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition">
                                <value.icon className="text-amber-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-neutral-400">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-black text-white text-center mb-12 animate-fade-in">Meet Our Chefs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Chef Alexandre Dubois',
                            role: 'Executive Chef',
                            img: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            name: 'Chef Maria Rodriguez',
                            role: 'Pastry Chef',
                            img: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            name: 'Chef Kenji Tanaka',
                            role: 'Sous Chef',
                            img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800'
                        }
                    ].map((chef, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-[32px] h-96 animate-scale-in"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            <img
                                src={chef.img}
                                alt={chef.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-2xl font-black text-white mb-1">{chef.name}</h3>
                                <p className="text-amber-500 font-bold">{chef.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
