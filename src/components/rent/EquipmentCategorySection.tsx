import React from "react";
import { ChevronRight } from "lucide-react";
import { EquipmentCategory } from "@/data/rent-data";
import { EquipmentCard } from "./EquipmentCard";
import Link from "next/link";

interface EquipmentCategorySectionProps {
    category: EquipmentCategory;
    location: string;
    onLocationChange: (location: string) => void;
}

export function EquipmentCategorySection({ category, location, onLocationChange }: EquipmentCategorySectionProps) {
    return (
        <div className="mb-14">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{category.title}</h2>
                <Link
                    href={`/rent/categories/${category.slug}`}
                    className="hidden md:inline-flex items-center text-sm font-bold tracking-widest text-muted-foreground uppercase hover:text-primary transition-all group"
                >
                    See Catalog
                    <span className="bg-primary/10 text-primary ml-2 p-1 rounded-full group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ChevronRight className="h-4 w-4" />
                    </span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
                {category.items.map((item) => (
                    <div key={item.id} className="h-full">
                        <EquipmentCard item={item} location={location} onLocationChange={onLocationChange} />
                    </div>
                ))}
            </div>

            <div className="flex justify-center md:hidden mt-6">
                <Link
                    href={`/rent/categories/${category.slug}`}
                    className="inline-flex items-center text-sm font-bold tracking-widest text-primary uppercase transition-all group border border-primary/20 bg-primary/5 px-6 py-3 rounded-full hover:bg-primary hover:text-white"
                >
                    See Full Catalog
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
