"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { CartSummary } from "@/components/cart/CartSummary";
import { calculateCartBreakdown } from "@/lib/pricing-utils";

export default function CartPage() {
    const { cartItems } = useCart();
    const breakdown = calculateCartBreakdown(cartItems);

    return (
        <div className="min-h-screen bg-white pb-16">
            {/* Breadcrumb - Optional, but keeps consistency */}
            <div className="bg-[#1a1a1a] text-white py-3">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400 gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3 text-gray-600" />
                        <span className="text-white">Cart</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-black text-gray-900 mb-8">Cart</h1>

                {/* Account Banner */}
                <div className="border border-gray-200 rounded-lg p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 bg-white">
                    <div className="flex items-center gap-1 text-sm md:text-base font-medium text-gray-900">
                        Already have an account?
                        <Link href="#" className="text-[#E85C24] hover:underline font-bold ml-1">Sign in</Link>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-gray-300 mx-4" />
                    <div className="flex items-center gap-1 text-sm md:text-base font-medium text-gray-900">
                        New to EquipmentRent?
                        <Link href="#" className="text-[#E85C24] hover:underline font-bold ml-1">Create account</Link>
                    </div>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Left Side: Cart Items */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-col">
                                {cartItems.map((item, index) => (
                                    <CartItemCard key={index} item={item} index={index} />
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Summary - Sticky */}
                        <div className="w-full lg:w-[400px] shrink-0">
                            <CartSummary breakdown={breakdown} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">It looks like you haven't added any equipment to your cart yet.</p>
                        <Link
                            href="/rent"
                            className="inline-flex items-center justify-center px-8 py-3 bg-[#E85C24] text-white font-bold rounded hover:bg-[#d64e18] transition-colors uppercase tracking-wide"
                        >
                            Browse Equipment
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
