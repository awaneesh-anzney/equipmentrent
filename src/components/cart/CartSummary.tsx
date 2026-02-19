"use client";

import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingBreakdown } from "@/lib/pricing-utils";
import Link from "next/link";

interface CartSummaryProps {
    breakdown: PricingBreakdown;
}

export function CartSummary({ breakdown }: CartSummaryProps) {
    return (
        <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <div className="mb-6">
                <span className="text-sm font-bold text-gray-600 block mb-1">Estimated Total</span>
                <span className="text-3xl md:text-4xl font-black text-gray-900 block">
                    SAR {breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>

            <div className="space-y-3 mb-8 border-b border-gray-200 pb-8">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Rental Charges</span>
                    <span className="font-bold text-gray-900">
                        SAR {breakdown.rentalCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-600 font-medium">Rental Protection Plan</span>
                        <span title="Covers accidental damage to equipment" className="cursor-help">
                            <Info className="h-4 w-4 text-gray-400" />
                        </span>
                    </div>
                    <span className="font-bold text-gray-900">
                        SAR {breakdown.protectionPlan.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-600 font-medium">Estimated Transportation Fee</span>
                        <span title="Based on delivery location" className="cursor-help">
                            <Info className="h-4 w-4 text-gray-400" />
                        </span>
                    </div>
                    <span className="font-bold text-gray-900">
                        {breakdown.transportationFee > 0
                            ? `SAR ${breakdown.transportationFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : "SAR -"}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-600 font-medium">Equipment Charges</span>
                        <span title="Environmental and other fees" className="cursor-help">
                            <Info className="h-4 w-4 text-gray-400" />
                        </span>
                    </div>
                    <span className="font-bold text-gray-900">
                        SAR {breakdown.equipmentCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm pt-2">
                    <span className="text-gray-600 font-medium">Taxes</span>
                    <span className="font-bold text-gray-900">
                        SAR {breakdown.taxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <Button className="w-full h-12 bg-[#E85C24] hover:bg-[#d64e18] text-white font-bold uppercase tracking-wider text-sm rounded-sm shadow-sm">
                    CHECKOUT AS GUEST
                </Button>

                <div className="text-center text-sm text-gray-600 font-medium">
                    New to EquipmentRent? <Link href="#" className="text-[#E85C24] hover:underline">Create account</Link>
                </div>
            </div>
        </div>
    );
}
