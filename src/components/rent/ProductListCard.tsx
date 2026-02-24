
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { EquipmentItem, getLocationAdjustedPrice } from '@/data/rent-data';
import { LocationDialog } from "@/components/commons/LocationDialog";
import { AddToCartDialog } from "@/components/commons/dialog/AddToCartDialog";

interface ProductListCardProps {
    item: EquipmentItem;
    location: string;
    onLocationChange: (location: string) => void;
}

export function ProductListCard({ item, location, onLocationChange }: ProductListCardProps) {
    const isLocationSet = location && location !== "Set Location For Accurate Pricing";
    const productUrl = `/rent/equipment-classes/${item.slug}`;

    const dayPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.day, location) : 0;
    const weekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.week, location) : 0;
    const fourWeekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.fourWeek, location) : 0;

    return (
        <div className="flex flex-col md:flex-row bg-card rounded-3xl border border-border/50 p-6 md:p-8 gap-8 hover:shadow-xl hover:-translate-y-1 hover:border-border/80 transition-all duration-300 group">
            {/* Image Section - Wrapped in Link */}
            <Link href={productUrl} className="w-full md:w-1/3 aspect-[4/3] md:min-w-[280px] relative flex items-center justify-center bg-muted/20 border border-border/30 rounded-2xl overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full mix-blend-multiply p-6 group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                />
            </Link>

            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <span className="inline-block border border-primary/20 bg-primary/10 rounded-full px-3 py-1 mb-4 text-[9px] font-extrabold tracking-widest uppercase text-primary">
                        {item.productType || "EQUIPMENT"}
                    </span>
                    {/* Title - Wrapped in Link */}
                    <Link href={productUrl}>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-6 uppercase tracking-tight hover:text-primary transition-colors leading-none">
                            {item.name}
                        </h3>
                    </Link>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-3 gap-0 mb-6 w-full max-w-lg bg-muted/30 p-4 rounded-xl border border-border/50">
                        <div className="flex flex-col text-center border-r border-border/50 pr-2">
                            <span className="text-xl md:text-2xl font-black text-foreground block tracking-tight">
                                {isLocationSet ? `SAR ${dayPrice.toLocaleString()}` : "—"}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">/ day</span>
                        </div>
                        <div className="flex flex-col text-center border-r border-border/50 px-2">
                            <span className="text-xl md:text-2xl font-black text-foreground block tracking-tight">
                                {isLocationSet ? `SAR ${weekPrice.toLocaleString()}` : "—"}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">/ week</span>
                        </div>
                        <div className="flex flex-col text-center pl-2">
                            <span className="text-xl md:text-2xl font-black text-foreground block tracking-tight">
                                {isLocationSet ? `SAR ${fourWeekPrice.toLocaleString()}` : "—"}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">/ 4-week</span>
                        </div>
                    </div>

                    {!isLocationSet && (
                        <LocationDialog onLocationSelect={onLocationChange}>
                            <button className="flex items-center gap-2 text-primary hover:text-primary transition-all text-sm font-bold mb-6 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 px-4 py-2.5 rounded-xl shadow-sm w-fit group">
                                <div className="p-1 rounded-full bg-primary/20 group-hover:bg-primary transition-colors text-primary group-hover:text-white">
                                    <MapPin className="h-3 w-3" />
                                </div>
                                <span>Set location to see prices</span>
                            </button>
                        </LocationDialog>
                    )}
                </div>

                <div className="flex justify-end mt-4 md:mt-0">
                    {/* Button - Wrapped in Link */}
                    <AddToCartDialog item={item} location={location} onLocationChange={onLocationChange}>
                        <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-widest rounded-xl px-10 h-12 uppercase text-xs shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 w-full md:w-auto">
                            Add to Cart
                        </Button>
                    </AddToCartDialog>
                </div>
            </div>
        </div>
    );
}
