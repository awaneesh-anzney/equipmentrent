"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { calculateCartBreakdown, calculateItemDisplayPrice } from "@/lib/pricing-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Checkout() {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const breakdown = calculateCartBreakdown(cartItems);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    country: "Saudi Arabia",
    zip: "",
    city: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally proceed to payment
    console.log("Form Data Submitted:", formData);
    alert("Proceeding to payment...");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-32 bg-card rounded-3xl border border-dashed border-border/50 shadow-sm flex flex-col items-center">
        <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🛒</span>
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tight">Your cart is empty</h2>
        <p className="text-muted-foreground font-medium mb-10 text-lg">You must have items in your cart to checkout.</p>
        <Link
          href="/rent"
          className="inline-flex items-center justify-center px-10 h-14 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all uppercase tracking-widest shadow-md shadow-primary/20 hover:-translate-y-0.5"
        >
          Browse Equipment
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Left Side: Form */}
      <div className="flex-1 w-full bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Billing Details</h2>
          <p className="text-muted-foreground text-sm mt-2 font-medium">Please enter your billing and shipping information.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 bg-muted/50 border-border/50 rounded-xl focus-visible:ring-primary font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 bg-muted/50 border-border/50 rounded-xl focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+966 50 123 4567"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-12 bg-muted/50 border-border/50 rounded-xl focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Job Site Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Construction St, Site B"
                value={formData.address}
                onChange={handleChange}
                required
                className="h-12 bg-muted/50 border-border/50 rounded-xl focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                disabled
                className="h-12 bg-input/50 backdrop-blur-sm border-border/50 rounded-xl font-bold cursor-not-allowed opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Riyadh"
                value={formData.city}
                onChange={handleChange}
                required
                className="h-12 bg-muted/50 border-border/50 rounded-xl focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="zip" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">ZIP Code</Label>
              <Input
                id="zip"
                name="zip"
                placeholder="12345"
                value={formData.zip}
                onChange={handleChange}
                required
                className="h-12 bg-muted/50 border-border/50 rounded-xl focus-visible:ring-primary font-medium"
              />
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-sm rounded-xl shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Place Order
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4 font-medium flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3" />
              Secure Encrypted Checkout
            </p>
          </div>
        </form>
      </div>

      {/* Right Side: Order Summary */}
      <div className="w-full lg:w-[420px] shrink-0 space-y-6 lg:sticky lg:top-32">
        <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-black uppercase tracking-tight text-foreground border-b border-border/50 pb-4 mb-6">Order Summary</h2>

          {/* Products List */}
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar relative">
            {cartItems.map((item, index) => {
              const itemTotal = calculateItemDisplayPrice(item);
              return (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-muted/30 border border-border/30 rounded-xl flex items-center justify-center p-2 shrink-0 relative">
                    <img
                      src={item.equipment.image}
                      alt={item.equipment.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-foreground uppercase tracking-tight truncate">
                      {item.equipment.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-sm text-foreground">
                      SAR {itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Breakdown */}
          <div className="space-y-4 mb-8 border-t border-border/50 pt-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-semibold">Rental Charges</span>
              <span className="font-bold text-foreground">
                SAR {breakdown.rentalCharges.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5 group">
                <span className="text-muted-foreground font-semibold">Protection Plan</span>
                <span title="Covers accidental damage" className="cursor-help">
                  <Info className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </span>
              </div>
              <span className="font-bold text-foreground">
                SAR {breakdown.protectionPlan.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5 group">
                <span className="text-muted-foreground font-semibold">Transport</span>
              </div>
              <span className="font-bold text-foreground">
                {breakdown.transportationFee > 0
                  ? `SAR ${breakdown.transportationFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                  : "SAR -"}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm pt-4 border-t border-border/30 border-dashed">
              <span className="text-muted-foreground font-semibold">Taxes</span>
              <span className="font-bold text-foreground">
                SAR {breakdown.taxes.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="border-t border-border/50 pt-6">
            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Total to Pay</span>
            <span className="text-4xl md:text-4xl font-black text-foreground block tracking-tight">
              SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}