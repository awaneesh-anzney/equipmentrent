
import React from 'react';
import { RENT_CATEGORIES_DATA, getCategoryData } from '@/data/rent-data';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ProductListCard } from '@/components/rent/ProductListCard';

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
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Breadcrumb Area */}
            <div className="bg-[#1a1a1a] text-white py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400 gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3 text-gray-600" />
                        <Link href="/rent" className="hover:text-white transition-colors">Rent Equipment</Link>
                        <ChevronRight className="h-3 w-3 text-gray-600" />
                        <span className="text-white">{parentCategory.title !== category.title ? `${parentCategory.title} / ${category.title}` : category.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4 hidden lg:block">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <Link
                                href="/rent"
                                className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-sm tracking-wide uppercase mb-6 group"
                            >
                                <ChevronRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                Back to All Equipment
                            </Link>

                            <h3 className="font-bold text-gray-900 border-b pb-2 mb-4">Category</h3>
                            <ul className="space-y-2">
                                {/* Use parentCategory so the sidebar stays stable even when viewing a subcategory */}
                                {parentCategory.subcategories?.map((sub, idx) => {
                                    const isSelected = sub.slug === slug;
                                    return (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            {/* Show orange square for selected item to match screenshot */}
                                            {isSelected && <span className="h-2 w-2 bg-[#E85C24] rounded-sm flex-shrink-0" />}
                                            <Link
                                                href={`/rent/categories/${sub.slug}`}
                                                className={`transition-colors hover:text-primary ${isSelected ? 'font-bold text-gray-900' : 'text-gray-600'}`}
                                            >
                                                {sub.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">
                                {category.title} Equipment Rental <span className="text-gray-400 font-medium text-lg ml-2">({category.items.length})</span>
                            </h1>
                            {category.description && (
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-4xl">
                                    {category.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            {category.items.length > 0 ? (
                                category.items.map((item) => (
                                    <ProductListCard key={item.id} item={item} />
                                ))
                            ) : (
                                <div className="p-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
                                    <p className="text-gray-500">No items found in this category yet.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
