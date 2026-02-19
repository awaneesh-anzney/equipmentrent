"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { LocationDialog } from "@/components/commons/LocationDialog";
import { EquipmentItem, getLocationAdjustedPrice } from '@/data/rent-data';
import { X, Minus, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AddToCartDialogProps {
    item: EquipmentItem;
    location: string;
    onLocationChange: (location: string) => void;
    initialQuantity?: number;
    children: React.ReactNode;
}

export function AddToCartDialog({ item, location, onLocationChange, initialQuantity = 1, children }: AddToCartDialogProps) {
    const [quantity, setQuantity] = useState(initialQuantity);
    // Placeholder states for dates
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    // Sync quantity if initialQuantity prop changes
    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const isLocationSet = location && location !== "Set Location For Accurate Pricing";

    const dayPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.day, location) : item.basePrice.day;
    const weekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.week, location) : item.basePrice.week;
    const fourWeekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.fourWeek, location) : item.basePrice.fourWeek;

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format or prefer user's locale
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="w-3xl p-0 gap-0 overflow-hidden bg-white sm:rounded-lg border-0"
                showCloseButton={false}
            >
                <div className="relative p-4">
                    {/* Custom Close Button */}
                    <DialogClose className="absolute top-4 right-4 rounded-full p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-6 w-6 text-gray-400" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Image */}
                        <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 pt-2">
                            {/* Visually hidden title for accessibility, but we render our own custom one */}
                            <DialogTitle className="sr-only">
                                {item.name}
                            </DialogTitle>

                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">
                                {item.name}
                            </h3>
                            <div className="flex flex-row gap-4 text-gray-900">  
                                <div><span className='text-bold text-xl text-[#E85C24]'>SAR {dayPrice}</span> <span className="text-gray-500">/ day</span></div>
                                <div><span className='text-bold text-xl text-[#E85C24]'>SAR {weekPrice}</span> <span className="text-gray-500">/ week</span></div>
                                <div><span className='text-bold text-xl text-[#E85C24]'>SAR {fourWeekPrice}</span> <span className="text-gray-500">/ 4-week</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-200 w-full my-6" />

                    <div className="space-y-4">
                        {/* Location Input */}
                        <div className="space-y-2">
                            <label className="text-base font-medium text-gray-800">
                                Where is your jobsite?
                            </label>
                            <LocationDialog onLocationSelect={onLocationChange}>
                                <div className="relative group cursor-pointer">
                                    <div className="flex items-center justify-between w-full rounded-md border border-gray-300 px-4 py-3 text-sm ring-offset-background bg-white">
                                        <span className={cn("font-medium", isLocationSet ? "text-gray-900" : "text-gray-500")}>
                                            {isLocationSet ? location : "Select Location"}
                                        </span>
                                        <span className="text-[#E85C24] font-bold whitespace-nowrap ml-4">
                                            Change Location
                                        </span>
                                    </div>
                                </div>
                            </LocationDialog>
                        </div>

                        {/* Date Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-base font-medium text-gray-800">Start date</label>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => startDateRef.current?.showPicker()}
                                >
                                    <input
                                        type="text"
                                        value={formatDate(startDate)}
                                        placeholder="-- / -- / --"
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-center text-gray-500 focus:outline-none focus:border-[#E85C24] placeholder:text-gray-300 pointer-events-none"
                                        readOnly
                                    />
                                    {/* Native date input, hidden but functional via showPicker */}
                                    <input
                                        ref={startDateRef}
                                        type="date"
                                        className="absolute inset-0 opacity-0 w-full h-full pointer-events-none"
                                        onChange={(e) => setStartDate(e.target.value)}
                                        tabIndex={-1}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-base font-medium text-gray-800">End date</label>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => endDateRef.current?.showPicker()}
                                >
                                    <input
                                        type="text"
                                        value={formatDate(endDate)}
                                        placeholder="-- / -- / --"
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-center text-gray-500 focus:outline-none focus:border-[#E85C24] placeholder:text-gray-300 pointer-events-none"
                                        readOnly
                                    />
                                    <input
                                        ref={endDateRef}
                                        type="date"
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
                <div className="bg-[#EFEEEE] p-5 md:px-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="w-full md:w-auto flex flex-col gap-2">
                        <span className="text-base font-medium text-gray-800">Quantity</span>
                        <div className="flex items-center bg-white border border-gray-300 rounded-md h-12 w-32 md:w-40">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="h-full px-4 text-gray-400 hover:text-[#E85C24] transition-colors flex items-center justify-center text-xl"
                                type="button"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                className="w-full h-full text-center font-bold text-gray-900 outline-none border-x border-gray-200 text-lg"
                                readOnly
                            />
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="h-full px-4 text-gray-400 hover:text-[#E85C24] transition-colors flex items-center justify-center text-xl"
                                type="button"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="w-full mt-7 flex justify-end">
                        <Button
                            className="w-full md:w-auto min-w-[200px] h-11 bg-[#E85C24] hover:bg-[#d64e18] text-white font-bold tracking-wide rounded text-base uppercase shadow-sm"
                            size="lg"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
