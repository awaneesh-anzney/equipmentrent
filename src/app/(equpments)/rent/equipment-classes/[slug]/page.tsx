
import React from 'react';
import { getEquipmentBySlug, RENT_CATEGORIES_DATA } from '@/data/rent-data';
import { notFound } from 'next/navigation';
import ProductClientPage from './ProductClientPage';

interface PageProps {
    params: { slug: string };
}

export default async function EquipmentDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const equipment = getEquipmentBySlug(slug);

    if (!equipment) {
        notFound();
    }

    // Find parent category for breadcrumbs
    const parentCategory = RENT_CATEGORIES_DATA.find(c => c.title === equipment.category);
    // Find subcategory title if available
    const subcategory = parentCategory?.subcategories?.find(s => s.slug === equipment.subcategorySlug);

    return (
        <ProductClientPage
            equipment={equipment}
            parentCategory={parentCategory}
            subcategory={subcategory}
        />
    );
}
