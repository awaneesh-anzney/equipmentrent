
import React from "react";
import { ChevronRight } from "lucide-react";
import { EquipmentCategory } from "@/data/rent-data";
import { EquipmentCard } from "./EquipmentCard";

interface EquipmentCategorySectionProps {
    category: EquipmentCategory;
    location: string;
    onLocationChange: (location: string) => void;
}

export function EquipmentCategorySection({ category, location, onLocationChange }: EquipmentCategorySectionProps) {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{category.title}</h2>
                {/* Mobile 'See All' link if needed, or keeping it at bottom generally */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {category.items.map((item) => (
                    <div key={item.id} className="h-full">
                        <EquipmentCard item={item} location={location} onLocationChange={onLocationChange} />
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-4">
                <a
                    href={`/rent/categories/${category.slug}`}
                    className="inline-flex items-center text-xs font-bold tracking-widest text-gray-900 uppercase hover:text-primary transition-colors group"
                >
                    See All {category.title}
                    <span className="bg-primary text-white ml-2 p-0.5 rounded-sm group-hover:bg-primary/80 transition-colors">
                        <ChevronRight className="h-3 w-3" />
                    </span>
                </a>
            </div>
        </div>
    );
}
