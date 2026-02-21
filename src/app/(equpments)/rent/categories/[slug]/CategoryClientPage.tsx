"use client";

import React from 'react';
import { RENT_CATEGORIES_DATA, EquipmentCategory } from '@/data/rent-data';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ProductListCard } from '@/components/rent/ProductListCard';
import { useLocation } from "@/contexts/LocationContext";

interface CategoryClientPageProps {
    category: EquipmentCategory;
    parentCategory: EquipmentCategory;
}

export default function CategoryClientPage({ category, parentCategory }: CategoryClientPageProps) {
    const { selectedLocation, setSelectedLocation } = useLocation();

    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            {/* Breadcrumb Area */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border/50 py-4 top-20 z-40">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex flex-wrap items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted-foreground gap-2">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                        <Link href="/rent" className="hover:text-primary transition-colors">Rent Equipment</Link>
                        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                        <span className="text-foreground font-black">{parentCategory.title !== category.title ? `${parentCategory.title} / ${category.title}` : category.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-6 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4 hidden lg:block">
                        <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm sticky top-32">
                            <Link
                                href="/rent"
                                className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-xs tracking-widest uppercase mb-8 group bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 px-4 py-2.5 rounded-xl transition-all"
                            >
                                <ChevronRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                All Equipment
                            </Link>

                            <h3 className="font-black text-foreground border-b border-border/50 pb-3 mb-5 uppercase tracking-tight text-lg">Category Hierarchy</h3>
                            <ul className="space-y-3">
                                {/* Use parentCategory so the sidebar stays stable even when viewing a subcategory */}
                                {parentCategory.subcategories?.map((sub, idx) => {
                                    const isSelected = sub.title === category.title;
                                    return (
                                        <li key={idx} className="flex items-center gap-3 text-sm group">
                                            {/* Show primary square for selected item */}
                                            {isSelected ? (
                                                <span className="h-2 w-2 bg-primary rounded-sm flex-shrink-0 animate-pulse" />
                                            ) : (
                                                <span className="h-1.5 w-1.5 bg-muted-foreground/30 rounded-full flex-shrink-0 group-hover:bg-primary/50 transition-colors" />
                                            )}
                                            <Link
                                                href={`/rent/categories/${sub.slug}`}
                                                className={`transition-colors font-semibold hover:text-primary ${isSelected ? 'text-primary tracking-wide' : 'text-muted-foreground'}`}
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
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight uppercase leading-none">
                                {category.title} <br className="hidden md:block" /> Rental <span className="text-muted-foreground font-extrabold text-2xl ml-2 tracking-normal align-top">({category.items.length})</span>
                            </h1>
                            {category.description && (
                                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-3xl font-medium mt-4">
                                    {category.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-6">
                            {category.items.length > 0 ? (
                                category.items.map((item) => (
                                    <ProductListCard
                                        key={item.id}
                                        item={item}
                                        location={selectedLocation}
                                        onLocationChange={setSelectedLocation}
                                    />
                                ))
                            ) : (
                                <div className="p-16 text-center bg-card rounded-3xl border border-dashed border-border/50 shadow-sm flex flex-col items-center">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                        <ChevronRight className="h-8 w-8 text-muted-foreground opacity-50" />
                                    </div>
                                    <h4 className="text-xl font-bold text-foreground mb-2">No Equipment Found</h4>
                                    <p className="text-muted-foreground font-medium">There are currently no items available in this category.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
