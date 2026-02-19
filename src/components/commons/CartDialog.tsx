"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, Trash2, Edit2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AddToCartDialog } from "@/components/commons/dialog/AddToCartDialog";

export function CartDialog() {
    const { cartItems, removeFromCart, cartTotal, isCartOpen, setCartOpen } = useCart();

    // Format date helper
    const formatDateRange = (start: Date | null, end: Date | null) => {
        if (!start || !end) return "Select dates";
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        // If years are different, show year. If same year and current year, maybe hide?
        // Matching image: "26 Feb - 27 Feb 2026"
        const startStr = start.toLocaleDateString('en-GB', options);
        const endStr = end.toLocaleDateString('en-GB', { ...options, year: 'numeric' });
        return `${startStr} - ${endStr}`;
    };

    return (
        <Popover open={isCartOpen} onOpenChange={setCartOpen}>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="relative hover:text-[#E85C24] transition-colors">
                    <ShoppingCart className="h-6 w-6" />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#E85C24] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            {cartItems.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 shadow-xl border-t-4 border-t-[#E85C24]" align="end" sideOffset={10}>
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-lg">Cart ({cartItems.length} Items)</h3>
                    <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Items List */}
                <div className="h-[320px] overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Your cart is empty.
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    {/* Image */}
                                    <div className="w-16 h-16 shrink-0 bg-white border border-gray-100 rounded p-1 flex items-center justify-center">
                                        <img
                                            src={item.equipment.image}
                                            alt={item.equipment.name}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 truncate">
                                            {item.quantity} x {item.equipment.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {formatDateRange(item.startDate, item.endDate)}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 items-center justify-start pt-1">
                                        <AddToCartDialog
                                            item={item.equipment}
                                            initialQuantity={item.quantity}
                                            initialLocation={item.location}
                                            initialStartDate={item.startDate}
                                            initialEndDate={item.endDate}
                                            editItemIndex={index}
                                        >
                                            <button className="text-[#E85C24] hover:text-[#d64e18]">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                        </AddToCartDialog>
                                        <button
                                            onClick={() => removeFromCart(index)}
                                            className="text-[#E85C24] hover:text-[#d64e18]"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-gray-900">Estimated Total:</span>
                        <span className="font-bold text-gray-900 text-lg">SAR {cartTotal.toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/rent/cart" passHref>
                            <Button
                                className="w-full bg-[#E85C24] hover:bg-[#d64e18] text-white font-bold uppercase tracking-wider h-11"
                                onClick={() => setCartOpen(false)}
                            >
                                View Cart & Checkout
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="w-full border-[#E85C24] text-[#E85C24] hover:bg-[#E85C24] hover:text-white font-bold uppercase tracking-wider h-11 bg-white"
                            onClick={() => setCartOpen(false)}
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
