"use client";

import React, { useState } from "react";
import { Trash2, Edit2, Minus, Plus } from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";
import { calculateItemDisplayPrice } from "@/lib/pricing-utils";
import { AddToCartDialog } from "@/components/commons/dialog/AddToCartDialog";

interface CartItemCardProps {
    item: CartItem;
    index: number;
}

export function CartItemCard({ item, index }: CartItemCardProps) {
    const { updateCartItem, removeFromCart } = useCart();
    // Local quantity before updating context? Or direct update?
    // Direct update is better for cart page.

    // Calculate duration details
    const getDurationString = () => {
        if (!item.startDate || !item.endDate) return "";
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const startStr = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const endStr = end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); // Year might be redundant if same

        return `${startStr} - ${endStr} (${days} Days)`;
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, item.quantity + delta);
        updateCartItem(index, { ...item, quantity: newQuantity });
    };

    const itemTotal = calculateItemDisplayPrice(item);

    return (
        <div className="flex flex-col md:flex-row gap-6 py-6 border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors p-4 rounded-3xl -mx-4 group">
            {/* Image */}
            <div className="shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-muted/20 border border-border/30 rounded-2xl flex items-center justify-center p-3 group-hover:bg-primary/5 transition-colors">
                    <img
                        src={item.equipment.image}
                        alt={item.equipment.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="mb-2">
                    <h3 className="font-black text-xl md:text-2xl text-foreground uppercase tracking-tight leading-none mb-2">
                        {item.equipment.name}
                    </h3>
                    <p className="inline-block bg-muted py-1 px-3 rounded-md text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        {getDurationString()}
                    </p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <AddToCartDialog
                        item={item.equipment}
                        initialQuantity={item.quantity}
                        initialLocation={item.location}
                        initialStartDate={item.startDate}
                        initialEndDate={item.endDate}
                        editItemIndex={index}
                    >
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest bg-muted/30 px-3 py-1.5 rounded-full hover:bg-primary/10">
                            <Edit2 className="h-3.5 w-3.5" />
                            Edit
                        </button>
                    </AddToCartDialog>

                    <button
                        onClick={() => removeFromCart(index)}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors text-xs font-bold uppercase tracking-widest bg-muted/30 px-3 py-1.5 rounded-full hover:bg-destructive/10"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Quantity and Price - Right Side */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-5 mt-4 md:mt-0">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hidden md:block">Quantity</span>
                    <div className="flex items-center bg-card border border-border/50 rounded-xl h-12 shadow-sm">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="h-full px-3 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded-l-xl"
                        >
                            <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center font-black text-foreground text-sm border-x border-border/50">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="h-full px-3 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded-r-xl"
                        >
                            <Plus className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-2xl font-black text-foreground block tracking-tight">
                        SAR {itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
}
