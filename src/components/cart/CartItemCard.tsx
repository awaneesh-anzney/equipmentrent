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
        <div className="flex flex-col md:flex-row gap-6 py-8 border-b border-gray-200 last:border-0">
            {/* Image */}
            <div className="shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100">
                    <img
                        src={item.equipment.image}
                        alt={item.equipment.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-start">
                <div className="mb-2">
                    <h3 className="font-bold text-lg md:text-xl text-gray-900 leading-tight">
                        {item.equipment.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                        {getDurationString()}
                    </p>
                </div>

                <div className="mt-auto flex items-center gap-6 pt-4">
                    <AddToCartDialog
                        item={item.equipment}
                        initialQuantity={item.quantity}
                        initialLocation={item.location}
                        initialStartDate={item.startDate}
                        initialEndDate={item.endDate}
                        editItemIndex={index}
                    >
                        <button className="flex items-center gap-2 text-gray-600 hover:text-[#E85C24] transition-colors text-sm font-bold">
                            <Edit2 className="h-4 w-4" />
                            Edit
                        </button>
                    </AddToCartDialog>

                    <button
                        onClick={() => removeFromCart(index)}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#E85C24] transition-colors text-sm font-bold"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Quantity and Price - Right Side */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-8 mt-4 md:mt-0">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-gray-500 hidden md:block">Quantity</span>
                    <div className="flex items-center bg-white border border-gray-300 rounded-sm h-10">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="h-full px-3 text-gray-400 hover:text-[#E85C24] transition-colors"
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900 text-sm">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="h-full px-3 text-gray-400 hover:text-[#E85C24] transition-colors"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-xl font-black text-gray-900 block">
                        SAR {itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
}
