"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { EquipmentItem, getLocationAdjustedPrice } from "@/data/rent-data";
import { calculateItemDisplayPrice } from "@/lib/pricing-utils";

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
        return total + calculateItemDisplayPrice(item);
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
