"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocationDialog } from '@/components/commons/LocationDialog';
import { useLocation } from "@/contexts/LocationContext";
import { EquipmentItem, EquipmentCategory, SubCategory, getLocationAdjustedPrice } from '@/data/rent-data';

interface ProductClientPageProps {
    equipment: EquipmentItem;
    parentCategory?: EquipmentCategory;
    subcategory?: SubCategory;
}

export default function ProductClientPage({ equipment, parentCategory, subcategory }: ProductClientPageProps) {
    const { selectedLocation, setSelectedLocation } = useLocation();
    const [quantity, setQuantity] = useState(1);

    const isLocationSet = selectedLocation && selectedLocation !== "Set Location For Accurate Pricing";

    const dayPrice = isLocationSet ? getLocationAdjustedPrice(equipment.basePrice.day, selectedLocation) : 0;
    const weekPrice = isLocationSet ? getLocationAdjustedPrice(equipment.basePrice.week, selectedLocation) : 0;
    const fourWeekPrice = isLocationSet ? getLocationAdjustedPrice(equipment.basePrice.fourWeek, selectedLocation) : 0;

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="bg-white min-h-screen pb-16">
            {/* Breadcrumb Area */}
            <div className="bg-white py-4 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500 gap-2">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                        <Link href="/rent" className="hover:text-primary transition-colors">Rent Equipment</Link>
                        {parentCategory && (
                            <>
                                <ChevronRight className="h-3 w-3 text-gray-400" />
                                <Link href={`/rent/categories/${parentCategory.slug}`} className="hover:text-primary transition-colors">
                                    {parentCategory.title}
                                </Link>
                            </>
                        )}
                        {subcategory && (
                            <>
                                <ChevronRight className="h-3 w-3 text-gray-400" />
                                <Link href={`/rent/categories/${subcategory.slug}`} className="hover:text-primary transition-colors">
                                    {subcategory.title}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-300">{equipment.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Image */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white border border-gray-100 rounded-sm p-8 md:p-16 flex items-center justify-center aspect-square md:aspect-[4/3]">
                            <img
                                src={equipment.image}
                                alt={equipment.name}
                                className="w-full h-full object-contain mix-blend-multiply max-h-[500px]"
                            />
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-6">
                            <span className="text-[#E85C24] font-bold text-xs tracking-widest uppercase mb-2 block">
                                {equipment.productType || "Equipment"}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-none">
                                {equipment.name}
                            </h1>

                            <div className="grid grid-cols-3 gap-8 mb-6 max-w-md border-b border-gray-100 pb-6">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900 block">
                                        {isLocationSet ? `SAR ${dayPrice.toLocaleString()}` : "$-"}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">/ day</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-bold text-gray-900 block">
                                        {isLocationSet ? `SAR ${weekPrice.toLocaleString()}` : "$-"}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">/ week</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-bold text-gray-900 block">
                                        {isLocationSet ? `SAR ${fourWeekPrice.toLocaleString()}` : "$-"}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">/ 4-week</span>
                                </div>
                            </div>

                            {!isLocationSet && (
                                <LocationDialog onLocationSelect={setSelectedLocation}>
                                    <button className="flex items-center gap-2 text-[#E85C24] hover:text-[#d64e18] transition-colors text-sm font-bold mb-8 group">
                                        <div className="p-1 rounded-full border border-[#E85C24] group-hover:bg-[#E85C24] group-hover:text-white transition-colors">
                                            <MapPin className="h-3 w-3" />
                                        </div>
                                        <span className="underline underline-offset-4 decoration-[#E85C24]/30 group-hover:decoration-[#E85C24]">Set location to see prices</span>
                                    </button>
                                </LocationDialog>
                            )}

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-xs font-bold text-gray-900">Quantity</span>
                                    <div className="flex items-center border border-gray-300 rounded-sm w-32 h-12">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="h-full px-3 text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            className="w-full h-full text-center font-bold text-gray-900 outline-none border-x border-gray-200"
                                            readOnly
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="h-full px-3 text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 sm:pt-6">
                                    <Button className="w-full h-12 bg-[#E85C24] hover:bg-[#d64e18] text-white font-bold tracking-wider rounded-sm text-sm uppercase shadow-sm">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Equipment Details:</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    {equipment.description || "No description available."}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 pt-8 mb-8">
                                <h3 className="text-lg font-black uppercase tracking-wide text-gray-900 mb-6">Additional Specs</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Dummy specs for now */}
                                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                                        <span className="font-bold text-gray-900 block mb-1">Make</span>
                                        Unknown
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                                        <span className="font-bold text-gray-900 block mb-1">Model</span>
                                        Unknown
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end text-sm text-gray-600 font-medium">
                                Have questions? Talk with your local branch <span className="text-[#E85C24] font-bold ml-1">1.888.80.RENTS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
