
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
        <div className="w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Browse By Category</h3>
            <ul className="space-y-1">
                {RENT_CATEGORIES_DATA.map((category) => {
                    const isOpen = openCategories.includes(category.slug);
                    const isActive = pathname.includes(category.slug);

                    return (
                        <li key={category.id}>
                            <div className="flex items-center justify-between py-2 group">
                                <button
                                    onClick={() => toggleCategory(category.slug)}
                                    className={cn(
                                        "flex-1 text-left text-sm font-medium transition-colors hover:text-primary",
                                        isActive ? "text-primary font-bold" : "text-gray-600"
                                    )}
                                >
                                    {category.title}
                                </button>
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <button
                                        onClick={() => toggleCategory(category.slug)}
                                        className="p-1 text-primary hover:bg-gray-50 rounded"
                                    >
                                        <ChevronDown
                                            className={cn(
                                                "h-4 w-4 transition-transform duration-200",
                                                isOpen ? "rotate-180" : ""
                                            )}
                                        />
                                    </button>
                                )}
                            </div>

                            {/* Subcategories */}
                            {isOpen && category.subcategories && (
                                <ul className="pl-4 space-y-1 pb-2 border-l border-gray-100 ml-1">
                                    {category.subcategories.map((sub, idx) => (
                                        <li key={idx}>
                                            <Link
                                                href={`/rent/categories/${sub.slug}`}
                                                className="block py-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
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
