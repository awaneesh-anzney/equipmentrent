"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { LocationDialog } from "@/components/commons/LocationDialog";
import { EquipmentItem, getLocationAdjustedPrice } from '@/data/rent-data';
import { X, Minus, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface AddToCartDialogProps {
    item: EquipmentItem;
    location?: string;
    onLocationChange?: (location: string) => void;
    initialQuantity?: number;
    initialLocation?: string;
    initialStartDate?: Date | null;
    initialEndDate?: Date | null;
    editItemIndex?: number;
    children: React.ReactNode;
}

export function AddToCartDialog({
    item,
    location,
    onLocationChange,
    initialQuantity = 1,
    initialLocation = "",
    initialStartDate = null,
    initialEndDate = null,
    editItemIndex,
    children
}: AddToCartDialogProps) {
    const { addToCart, updateCartItem } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(initialQuantity);

    // Helper to format Date to YYYY-MM-DD for input
    const toInputDate = (d: Date | null) => {
        if (!d) return "";
        // Adjust for timezone offset to ensure correct date string
        const offset = d.getTimezoneOffset();
        const adjustedDate = new Date(d.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('T')[0];
    };

    const [startDate, setStartDate] = useState(toInputDate(initialStartDate));
    const [endDate, setEndDate] = useState(toInputDate(initialEndDate));

    // Manage location internally if not controlled
    const [internalLocation, setInternalLocation] = useState(location ?? initialLocation);

    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    // Sync quantity if initialQuantity prop changes
    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    // Sync location if controlled prop changes
    useEffect(() => {
        if (location !== undefined) {
            setInternalLocation(location);
        }
    }, [location]);

    const handleInternalLocationChange = (newLoc: string) => {
        setInternalLocation(newLoc);
        if (onLocationChange) {
            onLocationChange(newLoc);
        }
    };

    const effectiveLocation = location !== undefined ? location : internalLocation;
    const isLocationSet = effectiveLocation && effectiveLocation !== "Set Location For Accurate Pricing";

    const dayPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.day, effectiveLocation) : item.basePrice.day;
    const weekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.week, effectiveLocation) : item.basePrice.week;
    const fourWeekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.fourWeek, effectiveLocation) : item.basePrice.fourWeek;

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format or prefer user's locale
    };

    const handleAddToCart = () => {
        const cartItem = {
            equipment: item,
            quantity: quantity,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
            location: effectiveLocation
        };

        if (editItemIndex !== undefined && editItemIndex >= 0) {
            updateCartItem(editItemIndex, cartItem);
        } else {
            addToCart(cartItem);
        }
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="max-w-4xl p-0 gap-0 overflow-hidden bg-card sm:rounded-3xl border border-border/50 shadow-2xl"
                showCloseButton={false}
            >
                <div className="relative p-6 md:p-8">
                    {/* Custom Close Button */}
                    <DialogClose className="absolute top-4 right-4 rounded-full p-1 opacity-70 transition-all hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-10">
                        <X className="h-5 w-5 text-muted-foreground" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Image */}
                        <div className="w-24 h-24 shrink-0 flex items-center justify-center bg-muted/20 rounded-2xl border border-border/30 p-2">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 pt-2">
                            <DialogTitle className="sr-only">
                                {item.name}
                            </DialogTitle>

                            <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-3">
                                {item.name}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-foreground">
                                <div className="bg-primary/5 border border-primary/20 rounded-xl px-2 py-1"><span className='font-black text-sm md:text-base text-primary'>SAR {dayPrice}</span> <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">/ day</span></div>
                                <div className="bg-primary/5 border border-primary/20 rounded-xl px-2 py-1"><span className='font-black text-sm md:text-base text-primary'>SAR {weekPrice}</span> <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">/ week</span></div>
                                <div className="bg-primary/5 border border-primary/20 rounded-xl px-2 py-1"><span className='font-black text-sm md:text-base text-primary'>SAR {fourWeekPrice}</span> <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">/ 4-week</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border/50 w-full my-6" />

                    <div className="space-y-4">
                        {/* Location Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                Where is your jobsite?
                            </label>
                            <LocationDialog onLocationSelect={handleInternalLocationChange}>
                                <div className="relative group cursor-pointer">
                                    <div className="flex items-center justify-between w-full rounded-xl border border-border/50 px-5 py-4 text-sm bg-muted/20 hover:bg-muted/40 transition-colors">
                                        <span className={cn("font-medium", isLocationSet ? "text-foreground" : "text-muted-foreground")}>
                                            {isLocationSet ? effectiveLocation : "Select Location"}
                                        </span>
                                        <span className="text-primary font-bold whitespace-nowrap ml-4">
                                            Change Location
                                        </span>
                                    </div>
                                </div>
                            </LocationDialog>
                        </div>

                        {/* Date Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Start date</label>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => startDateRef.current?.showPicker()}
                                >
                                    <input
                                        type="text"
                                        value={formatDate(startDate)}
                                        placeholder="-- / -- / --"
                                        className="w-full rounded-xl border border-border/50 px-5 py-4 text-sm text-center text-foreground font-medium bg-muted/20 hover:bg-muted/40 transition-colors focus:outline-none focus:border-primary placeholder:text-muted-foreground/50 pointer-events-none"
                                        readOnly
                                    />
                                    <input
                                        ref={startDateRef}
                                        type="date"
                                        value={startDate}
                                        className="absolute inset-0 opacity-0 w-full h-full pointer-events-none"
                                        onChange={(e) => setStartDate(e.target.value)}
                                        tabIndex={-1}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-base font-bold text-muted-foreground">End date</label>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => endDateRef.current?.showPicker()}
                                >
                                    <input
                                        type="text"
                                        value={formatDate(endDate)}
                                        placeholder="-- / -- / --"
                                        className="w-full rounded-md border border-border/50 px-5 py-4 text-sm text-center text-foreground font-medium bg-muted/20 hover:bg-muted/40 transition-colors focus:outline-none focus:border-primary placeholder:text-muted-foreground/50 pointer-events-none"
                                        readOnly
                                    />
                                    <input
                                        ref={endDateRef}
                                        type="date"
                                        value={endDate}
                                        className="absolute inset-0 opacity-0 w-full h-full pointer-events-none"
                                        onChange={(e) => setEndDate(e.target.value)}
                                        tabIndex={-1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-muted/30 border-t border-border/50 p-6 md:px-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="w-full md:w-auto flex flex-col gap-3">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quantity</span>
                        <div className="flex items-center bg-card border border-border/50 rounded-xl h-14 w-32 md:w-40 overflow-hidden shadow-sm">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="h-full w-14 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                                type="button"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                className="w-full h-full text-center font-black text-lg bg-transparent text-foreground outline-none border-x border-border/50"
                                readOnly
                            />
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="h-full w-14 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                                type="button"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full mt-7 flex justify-end">
                        <Button
                            type="button"
                            className="w-full md:w-auto min-w-[200px] h-14 bg-primary hover:bg-primary/90 text-white font-bold tracking-widest rounded-xl text-sm uppercase shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
                            size="lg"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                        >
                            {editItemIndex !== undefined && editItemIndex >= 0 ? "Update Cart" : "Add to Cart"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
