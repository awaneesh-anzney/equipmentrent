
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Minus } from "lucide-react";
import { RENT_CATEGORIES_DATA } from "@/data/rent-data";
import { cn } from "@/lib/utils";

export function CategorySidebar() {
    const pathname = usePathname();
    const [openCategories, setOpenCategories] = useState<string[]>([]);

    const toggleCategory = (slug: string) => {
        setOpenCategories((prev) =>
            prev.includes(slug)
                ? prev.filter((id) => id !== slug)
                : [...prev, slug]
        );
    };

    return (
        <div className="w-full bg-card rounded-2xl border border-border p-6 shadow-sm hidden lg:block sticky top-28 h-fit">
            <h3 className="text-lg font-black text-foreground mb-6 uppercase tracking-tight">Browse Category</h3>
            <ul className="space-y-2">
                {RENT_CATEGORIES_DATA.map((category) => {
                    const isOpen = openCategories.includes(category.slug);
                    const isActive = pathname.includes(category.slug);

                    return (
                        <li key={category.id} className="border-b border-border/50 last:border-0 pb-1">
                            <div className="flex items-center justify-between py-2 group">
                                <button
                                    onClick={() => toggleCategory(category.slug)}
                                    className={cn(
                                        "flex-1 text-left text-sm font-semibold transition-colors hover:text-primary",
                                        isActive ? "text-primary tracking-wide text-base" : "text-muted-foreground"
                                    )}
                                >
                                    {category.title}
                                </button>
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <button
                                        onClick={() => toggleCategory(category.slug)}
                                        className="p-1.5 text-muted-foreground group-hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                                    >
                                        <ChevronDown
                                            className={cn(
                                                "h-4 w-4 transition-transform duration-300",
                                                isOpen ? "rotate-180 text-primary" : ""
                                            )}
                                        />
                                    </button>
                                )}
                            </div>

                            {/* Subcategories */}
                            {isOpen && category.subcategories && (
                                <ul className="pl-4 mt-2 space-y-2 pb-3 border-l-2 border-primary/20 ml-1.5 animate-in fade-in slide-in-from-left-2 duration-300">
                                    {category.subcategories.map((sub, idx) => (
                                        <li key={idx}>
                                            <Link
                                                href={`/rent/categories/${sub.slug}`}
                                                className="block py-1 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1"
                                            >
                                                {sub.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
