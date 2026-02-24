"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Checkout from "@/components/checkout/Checkout";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Breadcrumb Area */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border/50 py-4 top-20 z-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted-foreground gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            <Link href="/rent/cart" className="hover:text-primary transition-colors">Cart</Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            <span className="text-foreground font-black">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8 md:py-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight uppercase">Checkout</h1>
        </div>

        <Checkout />
      </div>
    </div>
  );
}