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
        <div className="min-h-screen bg-background pt-24 pb-20">
            {/* Breadcrumb Area */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border/50 py-4 top-20 z-40">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex flex-wrap items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted-foreground gap-2">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                        <span className="text-foreground font-black">Shopping Cart</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-6 py-8 md:py-16">
                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight uppercase">Your Cart</h1>
                    {cartItems.length > 0 && <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1 text-sm font-black mt-2">{cartItems.length} items</span>}
                </div>

                {/* Account Banner */}
                <div className="bg-card border border-border/50 shadow-sm rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                    <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-muted-foreground">
                        Already have an account?
                        <Link href="#" className="text-primary hover:text-primary/80 transition-colors font-bold underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Sign in</Link>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-border/50 mx-4" />
                    <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-muted-foreground">
                        New to EquipmentRent?
                        <Link href="#" className="text-primary hover:text-primary/80 transition-colors font-bold underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Create account</Link>
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
                        <div className="w-full lg:w-[420px] shrink-0">
                            <CartSummary breakdown={breakdown} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-32 bg-card rounded-3xl border border-dashed border-border/50 shadow-sm flex flex-col items-center">
                        <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🛒</span>
                        </div>
                        <h2 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tight">Your cart is empty</h2>
                        <p className="text-muted-foreground font-medium mb-10 text-lg">It looks like you haven't added any equipment to your cart yet.</p>
                        <Link
                            href="/rent"
                            className="inline-flex items-center justify-center px-10 h-14 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all uppercase tracking-widest shadow-md shadow-primary/20 hover:-translate-y-0.5"
                        >
                            Browse Equipment
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
