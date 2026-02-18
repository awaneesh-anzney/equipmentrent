
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { EquipmentItem } from '@/data/rent-data';

interface ProductListCardProps {
    item: EquipmentItem;
}

export function ProductListCard({ item }: ProductListCardProps) {
    const productUrl = `/rent/equipment-classes/${item.slug}`;

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg border border-gray-100 p-6 gap-6 hover:shadow-md transition-shadow">
            {/* Image Section - Wrapped in Link */}
            <Link href={productUrl} className="w-full md:w-1/3 aspect-[4/3] md:min-w-[280px] relative flex items-center justify-center bg-gray-50 rounded-md overflow-hidden group">
                <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-300"
                />
            </Link>

            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-orange-500 font-bold text-[10px] tracking-widest uppercase mb-1 block">
                        {item.productType || "EQUIPMENT"}
                    </span>
                    {/* Title - Wrapped in Link */}
                    <Link href={productUrl}>
                        <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight hover:text-[#E85C24] transition-colors">
                            {item.name}
                        </h3>
                    </Link>

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
                    {/* Button - Wrapped in Link */}
                    <Link href={productUrl}>
                        <Button className="bg-[#E85C24] hover:bg-[#d64e18] text-white font-bold tracking-wider rounded px-8 h-10 uppercase text-xs">
                            Add to Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
