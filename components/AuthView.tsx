"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

interface AuthViewProps {
    type: 'login' | 'signup';
}

export default function AuthView({ type }: AuthViewProps) {
    const router = useRouter();
    const { login, signup, authError, setAuthError } = useApp();
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAuthError("");
        setSuccessMessage("");
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = type === 'signup' ? formData.get('name') as string : '';

        if (type === 'signup') {
            signup(name, email, password);
            // Check if signup was successful (no error)
            setTimeout(() => {
                const error = document.querySelector('[role="alert"]');
                if (!error) {
                    setSuccessMessage("Account created! Redirecting to login...");
                    setTimeout(() => router.push('/auth/login'), 1500);
                }
            }, 100);
        } else {
            login(email, password);
            // Check if login was successful (no error) and redirect accordingly
            setTimeout(() => {
                const error = document.querySelector('[role="alert"]');
                if (!error) {
                    // Redirect admin to dashboard, regular users to home
                    if (email === 'admin@gmail.com') {
                        router.push('/dashboard');
                    } else {
                        router.push('/');
                    }
                }
            }, 100);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-neutral-950">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>

                <h2 className="text-3xl font-black text-white mb-2">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-neutral-500 mb-10">{type === 'login' ? 'Sign in to access your profile' : 'Join our gourmet community'}</p>

                {authError && (
                    <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl mb-6">
                        {authError}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm p-4 rounded-xl mb-6 animate-fade-in">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {type === 'signup' && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="John Doe"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl transition shadow-lg shadow-amber-500/20 mt-4"
                    >
                        {type === 'login' ? 'SIGN IN' : 'SIGN UP'}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
                    <p className="text-neutral-500 text-sm">
                        {type === 'login' ? "Don't have an account?" : "Already have an account?"}
                        <Link
                            href={type === 'login' ? '/auth/signup' : '/auth/login'}
                            className="text-amber-500 font-bold ml-2 hover:underline"
                        >
                            {type === 'login' ? 'Create One' : 'Sign In'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
