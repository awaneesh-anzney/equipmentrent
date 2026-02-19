"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { EquipmentItem } from "@/data/rent-data";

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

    const cartTotal = cartItems.reduce((total, item) => {
        // Calculate price based on duration or just use base day price for now as placeholder
        // In real app, calculate based on selected dates.
        // Assuming 'day' price for now multiplied by quantity.
        // Need to check if location pricing applies.
        // For simplicity, let's use the equipment's base day price * quantity.
        const price = item.equipment.basePrice.day;
        // Note: getLocationAdjustedPrice is not imported here, but we could use it if we stored the adjusted price or location.
        // Let's assume the price should be calculated dynamically.
        return total + (price * item.quantity);
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
