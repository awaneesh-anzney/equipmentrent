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
                <Button size="icon" variant="ghost" className="relative hover:bg-primary/5 hover:text-primary transition-colors rounded-full w-10 h-10">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black tracking-widest rounded-full h-5 w-5 flex items-center justify-center shadow-sm shadow-primary/20">
                            {cartItems.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 shadow-2xl rounded-2xl border border-border/50 bg-card overflow-hidden" align="end" sideOffset={12}>
                {/* Header */}
                <div className="p-5 border-b border-border/50 flex items-center justify-between bg-muted/10">
                    <h3 className="font-black text-foreground text-lg uppercase tracking-tight">Cart <span className="text-muted-foreground ml-1 font-bold text-sm">({cartItems.length})</span></h3>
                    <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors hover:bg-muted p-1.5 rounded-full">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Items List */}
                <div className="h-[340px] overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                                <ShoppingCart className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                            <div className="font-bold text-foreground">Your cart is empty</div>
                            <div className="text-sm text-muted-foreground mt-1">Start adding some equipment!</div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 p-5 border-b border-border/50 hover:bg-muted/10 transition-colors group">
                                    {/* Image */}
                                    <div className="w-20 h-20 shrink-0 bg-muted/20 border border-border/30 rounded-xl p-2 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                        <img
                                            src={item.equipment.image}
                                            alt={item.equipment.name}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="font-bold text-foreground text-sm uppercase tracking-tight leading-tight mb-1 line-clamp-2">
                                            {item.quantity} x {item.equipment.name}
                                        </h4>
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                            {formatDateRange(item.startDate, item.endDate)}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 items-end justify-center pt-1 pr-1">
                                        <AddToCartDialog
                                            item={item.equipment}
                                            initialQuantity={item.quantity}
                                            initialLocation={item.location}
                                            initialStartDate={item.startDate}
                                            initialEndDate={item.endDate}
                                            editItemIndex={index}
                                        >
                                            <button className="text-muted-foreground hover:text-primary transition-colors p-1.5 bg-muted/20 hover:bg-primary/10 rounded-full">
                                                <Edit2 className="h-3.5 w-3.5" />
                                            </button>
                                        </AddToCartDialog>
                                        <button
                                            onClick={() => removeFromCart(index)}
                                            className="text-muted-foreground hover:text-destructive transition-colors p-1.5 bg-muted/20 hover:bg-destructive/10 rounded-full"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-5 bg-muted/10 border-t border-border/50">
                    <div className="flex items-center justify-between mb-5">
                        <span className="font-bold text-muted-foreground uppercase tracking-widest text-xs">Estimated Total</span>
                        <span className="font-black text-foreground text-xl">SAR {cartTotal.toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/rent/cart" passHref>
                            <Button
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest h-12 rounded-xl shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-transform"
                                onClick={() => setCartOpen(false)}
                            >
                                View Cart & Checkout
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="w-full border-border/50 hover:bg-muted text-foreground font-bold uppercase tracking-widest h-12 rounded-xl"
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
