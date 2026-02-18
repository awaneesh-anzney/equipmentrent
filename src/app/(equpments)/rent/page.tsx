
import React from "react";
import { RentHero } from "@/components/rent/RentHero";
import { CategorySidebar } from "@/components/rent/CategorySidebar";
import { EquipmentCategorySection } from "@/components/rent/EquipmentCategorySection";
import { EQUIPMENT_SECTIONS } from "@/data/rent-data";

export default function RentPage() {
    return (
        <div className="min-h-screen bg-white">
            <RentHero />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/6 hidden lg:block sticky top-20 h-fit">
                        <CategorySidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-5/6">
                        <div className="space-y-10">
                            {EQUIPMENT_SECTIONS.map((section) => (
                                <EquipmentCategorySection key={section.id} category={section} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
