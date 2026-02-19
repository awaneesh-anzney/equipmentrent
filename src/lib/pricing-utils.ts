import { EquipmentItem, getLocationAdjustedPrice } from "@/data/rent-data";

export interface PricingBreakdown {
    rentalCharges: number;
    protectionPlan: number; // e.g. 15%
    transportationFee: number; // e.g. fixed or distance based
    equipmentCharges: number; // e.g. environmental fees
    taxes: number; // e.g. 10%
    total: number;
}

export const calculateItemDisplayPrice = (
    item: {
        equipment: EquipmentItem;
        quantity: number;
        startDate: Date | null;
        endDate: Date | null;
        location?: string
    }
): number => {
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
    const weekCost = weekPeriods * weekPrice;
    remainingDays -= weekPeriods * 7;

    const daysRemainder = remainingDays;
    let dayCost = daysRemainder * dayPrice;

    // Optimization: If daily cost exceeds weekly price, upgrade to a week
    if (dayCost > weekPrice) {
        dayCost = weekPrice;
    }

    let remainderTotal = weekCost + dayCost;

    // Optimization: If total remainder cost exceeds 4-week price, upgrade
    if (remainderTotal > fourWeekPrice) {
        remainderTotal = fourWeekPrice;
    }

    cost += remainderTotal;

    return cost * item.quantity;
};

export const calculateCartBreakdown = (items: any[]): PricingBreakdown => {
    let rentalCharges = 0;

    items.forEach(item => {
        rentalCharges += calculateItemDisplayPrice(item);
    });

    // Mock calculations based on rental charges
    // In real app, these would be configurable or dynamic
    const protectionPlan = Math.round(rentalCharges * 0.15); // 15%
    const transportationFee = rentalCharges > 0 ? 0 : 0; // Usually calculated on distance, placeholder 0 if pickup or based on location logic
    // For demo purposes let's add a fixed fee if items exist to match screenshot "Estimated Transportation Fee"
    // Screenshot showed $-, so maybe 0 is fine. Let's stick to 0 or small fee. Let's say 0 for now.

    const equipmentCharges = Math.round(rentalCharges * 0.039); // ~3.9% miscellaneous
    const subtotal = rentalCharges + protectionPlan + transportationFee + equipmentCharges;
    const taxes = Math.round(subtotal * 0.10); // 10% tax

    return {
        rentalCharges,
        protectionPlan,
        transportationFee,
        equipmentCharges,
        taxes,
        total: subtotal + taxes
    };
};
