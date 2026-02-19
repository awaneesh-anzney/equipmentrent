
"use client";

import React, { useState } from "react";
import { RentHero } from "@/components/rent/RentHero";
import { CategorySidebar } from "@/components/rent/CategorySidebar";
import { EquipmentCategorySection } from "@/components/rent/EquipmentCategorySection";
import { EQUIPMENT_SECTIONS } from "@/data/rent-data";

export default function RentPage() {
    // Shared state for location, lifted from RentHero
    const [selectedLocation, setSelectedLocation] = useState<string>("Set Location For Accurate Pricing");

    return (
        <div className="min-h-screen bg-white">
            <RentHero selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} />

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
                                <EquipmentCategorySection
                                    key={section.id}
                                    category={section}
                                    location={selectedLocation}
                                    onLocationChange={setSelectedLocation}
                                />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
