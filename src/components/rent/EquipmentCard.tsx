
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EquipmentItem } from "@/data/rent-data";

interface EquipmentCardProps {
    item: EquipmentItem;
}

export function EquipmentCard({ item }: EquipmentCardProps) {
    return (
        <Card className="group overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-none h-full flex flex-col">
            <CardContent className="p-0 flex-1 flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 p-6 flex items-center justify-center">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 items-start justify-end border-t border-gray-50">
                    <div className="mb-2">
                        {item.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold tracking-wider text-primary uppercase block mb-1">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-primary transition-colors">
                        {item.name}
                    </h3>
                </div>
            </CardContent>
        </Card>
    );
}
