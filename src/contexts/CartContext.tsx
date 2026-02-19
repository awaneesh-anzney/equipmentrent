"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { EquipmentItem, getLocationAdjustedPrice } from "@/data/rent-data";

export interface CartItem {
    equipment: EquipmentItem;
    quantity: number;
    startDate: Date | null;
    endDate: Date | null;
    location?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (index: number) => void;
    updateCartItem: (index: number, updatedItem: CartItem) => void;
    isCartOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setCartOpen] = useState(false);

    const addToCart = (newItem: CartItem) => {
        setCartItems((prev) => [...prev, newItem]);
        setCartOpen(true);
    };

    const removeFromCart = (index: number) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const updateCartItem = (index: number, updatedItem: CartItem) => {
        setCartItems((prev) => prev.map((item, i) => (i === index ? updatedItem : item)));
    };

    const calculateItemCost = (item: CartItem) => {
        if (!item.startDate || !item.endDate) return 0;

        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive

        if (days <= 0) return 0;

        const location = item.location || "";
        const dayPrice = getLocationAdjustedPrice(item.equipment.basePrice.day, location);
        const weekPrice = getLocationAdjustedPrice(item.equipment.basePrice.week, location);
        const fourWeekPrice = getLocationAdjustedPrice(item.equipment.basePrice.fourWeek, location);

        // Rental logic
        let remainingDays = days;
        let cost = 0;

        const fourWeekPeriods = Math.floor(remainingDays / 28);
        cost += fourWeekPeriods * fourWeekPrice;
        remainingDays -= fourWeekPeriods * 28;

        const weekPeriods = Math.floor(remainingDays / 7);
        cost += weekPeriods * weekPrice;
        remainingDays -= weekPeriods * 7;

        let dailyCost = remainingDays * dayPrice;

        // Optimization: If daily cost exceeds weekly price, upgrade to a week
        if (dailyCost > weekPrice) {
            dailyCost = weekPrice;
        }

        cost += dailyCost;

        // Optimization: If total cost for remainder (weeks + days) exceeds 4-week price, upgrade
        // (This handles cases where e.g. 3 weeks + 5 days might be more than 4 weeks)
        // Recalculate just the remainder part to check
        const remainderCost = (weekPeriods * weekPrice) + dailyCost;
        if (remainderCost > fourWeekPrice) {
            // Remove the simpler addition and just add one 4-week price
            cost -= remainderCost; // undo
            cost += fourWeekPrice;
        }

        return cost * item.quantity;
    };

    const cartTotal = cartItems.reduce((total, item) => {
        return total + calculateItemCost(item);
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartItem,
            isCartOpen,
            setCartOpen,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
