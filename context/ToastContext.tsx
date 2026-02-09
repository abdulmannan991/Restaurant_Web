"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-24 right-4 z-[100] space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-neutral-900 border border-amber-500/50 rounded-2xl p-4 shadow-2xl shadow-amber-500/20 flex items-center gap-3 min-w-[300px] animate-slide-in"
                    >
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                            <CheckCircle className="text-white" size={20} />
                        </div>
                        <p className="text-white font-medium flex-1">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-neutral-400 hover:text-white transition"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
