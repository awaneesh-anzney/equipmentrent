"use client";

import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingBreakdown } from "@/lib/pricing-utils";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";

interface CartSummaryProps {
    breakdown: PricingBreakdown;
}

export function CartSummary({ breakdown }: CartSummaryProps) {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 sticky top-32 shadow-sm">
            <div className="mb-8">
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Estimated Total</span>
                <span className="text-4xl md:text-5xl font-black text-foreground block tracking-tight">
                    SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>

            <div className="space-y-4 mb-8 border-b border-border/50 pb-8">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-semibold">Rental Charges</span>
                    <span className="font-bold text-foreground">
                        SAR {breakdown.rentalCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5 group">
                        <span className="text-muted-foreground font-semibold">Rental Protection Plan</span>
                        <span title="Covers accidental damage to equipment" className="cursor-help">
                            <Info className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                        </span>
                    </div>
                    <span className="font-bold text-foreground">
                        SAR {breakdown.protectionPlan.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5 group">
                        <span className="text-muted-foreground font-semibold">Transportation Fee</span>
                        <span title="Based on delivery location" className="cursor-help">
                            <Info className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                        </span>
                    </div>
                    <span className="font-bold text-foreground">
                        {breakdown.transportationFee > 0
                            ? `SAR ${breakdown.transportationFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : "SAR -"}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5 group">
                        <span className="text-muted-foreground font-semibold">Equipment Charges</span>
                        <span title="Environmental and other fees" className="cursor-help">
                            <Info className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                        </span>
                    </div>
                    <span className="font-bold text-foreground">
                        SAR {breakdown.equipmentCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm pt-4 border-t border-border/30 border-dashed">
                    <span className="text-muted-foreground font-semibold">Taxes</span>
                    <span className="font-bold text-foreground">
                        SAR {breakdown.taxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>

            <div className="space-y-5">
                <Button
                    disabled={!user}
                    onClick={() => router.push("/rent/checkout")}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-sm rounded-xl shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                    CHECKOUT
                </Button>

                {!user && (
                    <div className="text-center text-sm text-muted-foreground font-medium bg-muted/30 py-4 px-2 rounded-xl border border-border/50 flex flex-col gap-3">
                        <div>
                            Already have an account?
                            <Link href="/login" className="text-primary hover:text-primary/80 font-bold ml-1 transition-colors underline-offset-4 hover:underline">Sign In</Link>
                        </div>
                        <div className="w-full h-px bg-border/50" />
                        <div>
                            New to EquipmentRent?
                            <Link href="/signup" className="text-primary hover:text-primary/80 font-bold ml-1 transition-colors underline-offset-4 hover:underline">Create account</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
