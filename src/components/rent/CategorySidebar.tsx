
import React from "react";
import { ChevronDown } from "lucide-react";
import { RENT_CATEGORIES } from "@/data/rent-data";

export function CategorySidebar() {
    return (
        <div className="w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Browse By Category</h3>
            <ul className="space-y-1">
                {RENT_CATEGORIES.map((category) => (
                    <li key={category}>
                        <button className="w-full flex items-center justify-between py-3 text-left text-gray-600 hover:text-primary transition-colors group border-b border-transparent hover:border-gray-100">
                            <span className="text-sm font-medium">{category}</span>
                            <ChevronDown className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -rotate-90 group-hover:rotate-0" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
