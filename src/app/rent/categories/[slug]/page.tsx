
import { RENT_CATEGORIES_DATA, getCategoryData } from '@/data/rent-data';
import { notFound } from 'next/navigation';
import CategoryClientPage from './CategoryClientPage';

interface PageProps {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    // Wait for params to be available
    const { slug } = await params;

    // Use the helper to find data by slug (main category or subcategory)
    const category = getCategoryData(slug);

    // Also find the parent category to show correct sidebar hierarchy if we are in a subcategory
    const parentCategory = RENT_CATEGORIES_DATA.find(c =>
        c.slug === slug || c.subcategories?.some(s => s.slug === slug)
    );

    if (!category || !parentCategory) {
        notFound();
    }

    return (
        <CategoryClientPage category={category} parentCategory={parentCategory} />
    );
}
