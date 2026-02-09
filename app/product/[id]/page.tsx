"use client"

import { notFound } from 'next/navigation';
import { use } from 'react';
import ProductDetail from '@/components/ProductDetail';
import { useMenu } from '@/context/MenuContext';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { menuItems } = useMenu();
    const product = menuItems.find(item => item.id === parseInt(id));

    if (!product) {
        notFound();
    }

    return <ProductDetail product={product} />;
}
