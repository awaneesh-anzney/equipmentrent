"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { calculateCartBreakdown, calculateItemDisplayPrice } from "@/lib/pricing-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Lock, CreditCard, ShieldCheck, Wallet, PieChart, Smartphone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Payment() {
    const router = useRouter();
    const { cartItems } = useCart();
    const breakdown = calculateCartBreakdown(cartItems);

    const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' or 'apple_pay'
    const [formData, setFormData] = useState({
        nameOnCard: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Basic formatting for card number or expiry can be added here
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate payment processing...
        alert("Payment Successful! Order has been placed.");
        // Usually here you'd clear cart and redirect to order confirmation.
        router.push("/");
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-32 bg-card rounded-3xl border border-dashed border-border/50 shadow-sm flex flex-col items-center">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🛒</span>
                </div>
                <h2 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tight">Your cart is empty</h2>
                <p className="text-muted-foreground font-medium mb-10 text-lg">You must have items in your cart to proceed to payment.</p>
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
            {/* Left Side: Payment Form */}
            <div className="flex-1 w-full bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Payment Details</h2>
                    <p className="text-muted-foreground text-sm mt-2 font-medium">Please enter your payment information below. All transactions are secure and encrypted.</p>
                </div>

                {/* Payment Methods Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <button
                        onClick={() => setPaymentMethod("card")}
                        className={`flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 transition-all ${paymentMethod === "card"
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        <CreditCard className="h-6 w-6" />
                        <span className="font-bold text-sm tracking-widest uppercase">Credit Card</span>
                    </button>

                    <button
                        onClick={() => setPaymentMethod("mada")}
                        className={`flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 transition-all ${paymentMethod === "mada"
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        <CreditCard className="h-6 w-6" />
                        <span className="font-bold text-sm tracking-widest uppercase">mada</span>
                    </button>

                    <button
                        onClick={() => setPaymentMethod("apple_pay")}
                        className={`flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 transition-all ${paymentMethod === "apple_pay"
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        <div className="h-6 w-6 flex items-center justify-center font-black text-lg leading-none"></div>
                        <span className="font-bold text-sm tracking-widest uppercase">Apple Pay</span>
                    </button>

                    <button
                        onClick={() => setPaymentMethod("stc_pay")}
                        className={`flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 transition-all ${paymentMethod === "stc_pay"
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        <Smartphone className="h-6 w-6" />
                        <span className="font-bold text-sm tracking-widest uppercase">STC Pay</span>
                    </button>

                    <button
                        onClick={() => setPaymentMethod("tabby")}
                        className={`flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 transition-all ${paymentMethod === "tabby"
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        <PieChart className="h-6 w-6" />
                        <span className="font-bold text-sm tracking-widest uppercase">Tabby</span>
                    </button>

                    <button
                        onClick={() => setPaymentMethod("tamara")}
                        className={`flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 transition-all ${paymentMethod === "tamara"
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        <Wallet className="h-6 w-6" />
                        <span className="font-bold text-sm tracking-widest uppercase">Tamara</span>
                    </button>
                </div>

                <div className="border border-border/50 rounded-2xl p-6 md:p-8 bg-muted/10 relative overflow-hidden">

                    {/* Decorative elements for premium feel */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

                    {paymentMethod === "apple_pay" ? (
                        <div className="text-center py-12 flex flex-col items-center relative z-10">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 border border-border/50 shadow-inner">
                                <span className="text-4xl text-foreground"></span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Pay with Apple Pay</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8">
                                Quick, secure, and touchless payment using your Apple device.
                            </p>
                            <Button
                                onClick={handleSubmit}
                                className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background font-black uppercase tracking-widest text-sm rounded-xl shadow-md shadow-foreground/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                            >
                                <Lock className="h-4 w-4" />
                                Pay SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Button>
                        </div>
                    ) : paymentMethod === "tabby" || paymentMethod === "tamara" ? (
                        <div className="text-center py-12 flex flex-col items-center relative z-10">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 border border-border/50 shadow-inner">
                                {paymentMethod === "tabby" ? <PieChart className="w-10 h-10" /> : <Wallet className="w-10 h-10" />}
                            </div>
                            <h3 className="text-xl font-bold mb-2 uppercase">Pay with {paymentMethod === "tabby" ? "Tabby" : "Tamara"}</h3>
                            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
                                Split your total of SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2 })} into 4 interest-free payments. You will be redirected to {paymentMethod === "tabby" ? "Tabby" : "Tamara"} to complete your purchase.
                            </p>
                            <Button
                                onClick={handleSubmit}
                                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-sm rounded-xl shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                            >
                                <Lock className="h-4 w-4" />
                                Continue to {paymentMethod === "tabby" ? "Tabby" : "Tamara"}
                            </Button>
                        </div>
                    ) : paymentMethod === "stc_pay" ? (
                        <div className="py-6 space-y-6 relative z-10">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold mb-2 uppercase">STC Pay</h3>
                                <p className="text-sm text-muted-foreground">Enter your STC Pay mobile number to authenticate the payment.</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="stcPhone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mobile Number</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">
                                            +966
                                        </div>
                                        <Input
                                            id="stcPhone"
                                            name="stcPhone"
                                            placeholder="5X XXX XXXX"
                                            required
                                            className="h-12 bg-background border-border/50 rounded-xl focus-visible:ring-primary font-medium tracking-widest text-lg pl-14"
                                        />
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        className="w-full h-14 bg-[#4A2D87] hover:bg-[#3d2570] text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-md shadow-[#4A2D87]/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                    >
                                        <ShieldCheck className="h-5 w-5" />
                                        Pay SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Button>
                                    <p className="text-center text-xs text-muted-foreground mt-4 font-medium flex items-center justify-center gap-1.5">
                                        <Lock className="h-3 w-3" />
                                        Secure payment with STC Pay
                                    </p>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <Label htmlFor="nameOnCard" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name on Card</Label>
                                <Input
                                    id="nameOnCard"
                                    name="nameOnCard"
                                    placeholder="JOHN DOE"
                                    value={formData.nameOnCard}
                                    onChange={handleChange}
                                    required
                                    className="h-12 bg-background border-border/50 rounded-xl focus-visible:ring-primary font-medium uppercase"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cardNumber" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Card Number</Label>
                                <div className="relative">
                                    <Input
                                        id="cardNumber"
                                        name="cardNumber"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                        className="h-12 bg-background border-border/50 rounded-xl focus-visible:ring-primary font-medium tracking-widest text-lg pl-12"
                                    />
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expiry (MM/YY)</Label>
                                    <Input
                                        id="expiry"
                                        name="expiry"
                                        placeholder="12/26"
                                        maxLength={5}
                                        value={formData.expiry}
                                        onChange={handleChange}
                                        required
                                        className="h-12 bg-background border-border/50 rounded-xl focus-visible:ring-primary font-medium tracking-widest text-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">CVV</Label>
                                    <div className="relative">
                                        <Input
                                            id="cvv"
                                            name="cvv"
                                            type="password"
                                            placeholder="123"
                                            maxLength={4}
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            required
                                            className="h-12 bg-background border-border/50 rounded-xl focus-visible:ring-primary font-medium tracking-widest text-center pr-10"
                                        />
                                        <Info className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 cursor-help" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-sm rounded-xl shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck className="h-5 w-5" />
                                    Pay SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Button>
                                <p className="text-center text-xs text-muted-foreground mt-4 font-medium flex items-center justify-center gap-1.5">
                                    <Lock className="h-3 w-3" />
                                    Payment securely processed by our gateway
                                </p>
                            </div>
                        </form>
                    )}

                </div>
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
                        <span className="text-4xl md:text-5xl font-black text-foreground block tracking-tight">
                            SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}