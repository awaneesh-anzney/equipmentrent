"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocationDialog } from '@/components/commons/LocationDialog';
import { AddToCartDialog } from '@/components/commons/dialog/AddToCartDialog';
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
        <div className="bg-background min-h-screen pt-24 pb-20">
            {/* Breadcrumb Area */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border/50 py-4 top-20 z-40">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex flex-wrap items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted-foreground gap-2">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                        <Link href="/rent" className="hover:text-primary transition-colors">Rent Equipment</Link>
                        {parentCategory && (
                            <>
                                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                                <Link href={`/rent/categories/${parentCategory.slug}`} className="hover:text-primary transition-colors">
                                    {parentCategory.title}
                                </Link>
                            </>
                        )}
                        {subcategory && (
                            <>
                                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                                <Link href={`/rent/categories/${subcategory.slug}`} className="hover:text-primary transition-colors">
                                    {subcategory.title}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                        <span className="text-foreground font-black">{equipment.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-6 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Left Column: Image Area */}
                    <div className="w-full lg:w-5/12">
                        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-16 flex items-center justify-center aspect-square shadow-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-3xl" />
                            <img
                                src={equipment.image}
                                alt={equipment.name}
                                className="w-full h-full object-contain mix-blend-multiply max-h-[400px] group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                            />
                        </div>
                    </div>

                    {/* Right Column: Details Area */}
                    <div className="w-full lg:w-7/12 flex flex-col">
                        <div className="mb-8">
                            <span className="inline-block border border-primary/20 bg-primary/10 rounded-full px-4 py-1.5 mb-4 text-[10px] font-extrabold uppercase tracking-widest text-primary">
                                {equipment.productType || "Equipment"}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 uppercase tracking-tight leading-none">
                                {equipment.name}
                            </h1>

                            {/* Pricing Section */}
                            <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg bg-card border border-border/50 rounded-2xl p-4 md:p-6 shadow-sm">
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <span className="text-2xl lg:text-3xl font-black text-foreground block tracking-tight">
                                        {isLocationSet ? `SAR ${dayPrice.toLocaleString()}` : "—"}
                                    </span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">/ day</span>
                                </div>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left border-l border-border/50 pl-4">
                                    <span className="text-2xl lg:text-3xl font-black text-foreground block tracking-tight">
                                        {isLocationSet ? `SAR ${weekPrice.toLocaleString()}` : "—"}
                                    </span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">/ week</span>
                                </div>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left border-l border-border/50 pl-4">
                                    <span className="text-2xl lg:text-3xl font-black text-foreground block tracking-tight">
                                        {isLocationSet ? `SAR ${fourWeekPrice.toLocaleString()}` : "—"}
                                    </span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">/ 4-week</span>
                                </div>
                            </div>

                            {!isLocationSet && (
                                <LocationDialog onLocationSelect={setSelectedLocation}>
                                    <button className="flex items-center gap-3 text-primary hover:text-primary transition-all text-sm font-bold mb-10 group bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 px-5 py-3 rounded-xl shadow-sm w-fit truncate">
                                        <div className="p-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors text-primary group-hover:text-white">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <span>Set location for accurate pricing</span>
                                    </button>
                                </LocationDialog>
                            )}

                            {/* Actions & Quantity */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-5 mb-12">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quantity</span>
                                    <div className="flex items-center bg-card border border-border/50 rounded-xl shadow-sm h-14 overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="h-full w-14 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            className="w-16 h-full text-center font-black text-lg bg-transparent text-foreground outline-none border-x border-border/50"
                                            readOnly
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="h-full w-14 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <AddToCartDialog
                                        item={equipment}
                                        location={selectedLocation}
                                        onLocationChange={setSelectedLocation}
                                        initialQuantity={quantity}
                                    >
                                        <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold tracking-widest rounded-xl text-sm uppercase shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
                                            Add to Cart
                                        </Button>
                                    </AddToCartDialog>
                                </div>
                            </div>

                            {/* Product Info Sections */}
                            <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Equipment Details</h3>
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                        {equipment.description || "No description available."}
                                    </p>
                                </div>

                                <div className="border-t border-border/50 pt-8 mt-8">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Additional Specs</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                                            <span className="font-bold text-muted-foreground uppercase tracking-widest text-[9px] block mb-1">Make</span>
                                            <span className="font-bold text-foreground text-sm">Unknown</span>
                                        </div>
                                        <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                                            <span className="font-bold text-muted-foreground uppercase tracking-widest text-[9px] block mb-1">Model</span>
                                            <span className="font-bold text-foreground text-sm">Unknown</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center border border-primary/20 bg-primary/5 p-4 rounded-xl mt-8">
                                <span className="text-sm text-foreground font-medium">
                                    Need help deciding? Contact an expert <span className="text-primary font-black ml-1 tracking-wider">9200 RENTS (73687)</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
