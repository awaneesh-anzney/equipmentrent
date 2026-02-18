
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { EquipmentItem } from '@/data/rent-data';

interface ProductListCardProps {
    item: EquipmentItem;
}

export function ProductListCard({ item }: ProductListCardProps) {
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg border border-gray-100 p-6 gap-6 hover:shadow-md transition-shadow">
            {/* Image Section */}
            <div className="w-full md:w-1/3 aspect-[4/3] md:min-w-[280px] relative flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full mix-blend-multiply p-4"
                />
            </div>

            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-orange-500 font-bold text-[10px] tracking-widest uppercase mb-1 block">
                        {item.productType || "EQUIPMENT"}
                    </span>
                    <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                        {item.name}
                    </h3>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-4 max-w-md">
                        <div>
                            <span className="text-lg font-bold text-gray-900 block">{item.pricing?.day || "$-"}</span>
                            <span className="text-xs text-gray-500 font-medium">/ day</span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-gray-900 block">{item.pricing?.week || "$-"}</span>
                            <span className="text-xs text-gray-500 font-medium">/ week</span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-gray-900 block">{item.pricing?.fourWeek || "$-"}</span>
                            <span className="text-xs text-gray-500 font-medium">/ 4-week</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium mb-6">
                        <MapPin className="h-4 w-4" />
                        Set location to see prices
                    </button>
                </div>

                <div className="flex justify-end">
                    {/* Using the brand orange specifically from the screenshot inspiration */}
                    <Button className="bg-[#E85C24] hover:bg-[#d64e18] text-white font-bold tracking-wider rounded px-8 h-10 uppercase text-xs">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
