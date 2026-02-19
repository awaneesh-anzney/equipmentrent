
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EquipmentItem, getLocationAdjustedPrice } from "@/data/rent-data";
import { LocationDialog } from "@/components/commons/LocationDialog";
import { MapPin } from "lucide-react";

interface EquipmentCardProps {
    item: EquipmentItem;
    location: string;
    onLocationChange: (location: string) => void;
}

export function EquipmentCard({ item, location, onLocationChange }: EquipmentCardProps) {
    const isLocationSet = location && location !== "Set Location For Accurate Pricing";

    const dayPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.day, location) : 0;
    const weekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.week, location) : 0;
    const fourWeekPrice = isLocationSet ? getLocationAdjustedPrice(item.basePrice.fourWeek, location) : 0;

    return (
        <Card className="group overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-none h-full flex flex-col">
            <CardContent className="p-0 flex-1 flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center">
                    <Link href={`/rent/equipment-classes/${item.slug}`} className="w-full h-full block">
                        <div className="w-full h-full p-6 flex items-center justify-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </Link>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 border-t border-gray-50">
                    <div className="mb-2">
                        {item.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold tracking-wider text-primary uppercase block mb-1">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <Link href={`/rent/equipment-classes/${item.slug}`}>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-primary transition-colors mb-4 line-clamp-2">
                            {item.name}
                        </h3>
                    </Link>

                    <div className="mt-auto pt-4 border-t border-gray-100 text-center text-xs">
                        {!isLocationSet ? (
                            <LocationDialog onLocationSelect={onLocationChange}>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs">
                                    <MapPin className="h-3 w-3 mr-2" />
                                    Set location to see prices
                                </Button>
                            </LocationDialog>
                        ) : (
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <div className="text-gray-500 mb-1 uppercase tracking-wider font-semibold text-[10px]">Day</div>
                                    <div className="font-bold text-gray-900">
                                        SAR {dayPrice.toLocaleString()}
                                    </div>
                                </div>
                                <div className="border-l border-gray-100">
                                    <div className="text-gray-500 mb-1 uppercase tracking-wider font-semibold text-[10px]">Week</div>
                                    <div className="font-bold text-gray-900">
                                        SAR {weekPrice.toLocaleString()}
                                    </div>
                                </div>
                                <div className="border-l border-gray-100">
                                    <div className="text-gray-500 mb-1 uppercase tracking-wider font-semibold text-[10px]">4 Week</div>
                                    <div className="font-bold text-gray-900">
                                        SAR {fourWeekPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
