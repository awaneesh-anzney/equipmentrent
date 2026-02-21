
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
        <Card className="group overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 bg-card rounded-2xl h-full flex flex-col hover:-translate-y-1">
            <CardContent className="p-0 flex-1 flex flex-col pt-1">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted/20 flex items-center justify-center rounded-t-2xl m-2 mb-0 border border-border/30">
                    <Link href={`/rent/equipment-classes/${item.slug}`} className="w-full h-full block">
                        <div className="w-full h-full p-6 flex items-center justify-center relative">
                            {/* Glow effect on hover behind image */}
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-2xl" />
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </Link>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3 flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link href={`/rent/equipment-classes/${item.slug}`}>
                        <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors mb-3 line-clamp-2 leading-tight">
                            {item.name}
                        </h3>
                    </Link>

                    <div className="mt-auto pt-5 border-t border-border/50 text-center text-xs">
                        {!isLocationSet ? (
                            <LocationDialog onLocationSelect={onLocationChange}>
                                <Button className="w-full font-bold uppercase tracking-wider text-xs shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all rounded-xl h-11">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Set location for prices
                                </Button>
                            </LocationDialog>
                        ) : (
                            <div className="grid grid-cols-3 gap-2 bg-muted/30 p-3 rounded-xl border border-border/50 backdrop-blur-sm">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-muted-foreground mb-1 uppercase tracking-widest font-bold text-[9px]">Day</div>
                                    <div className="font-extrabold text-foreground text-xs">
                                        SAR {dayPrice.toLocaleString()}
                                    </div>
                                </div>
                                <div className="border-l border-border/50 flex flex-col items-center justify-center">
                                    <div className="text-muted-foreground mb-1 uppercase tracking-widest font-bold text-[9px]">Week</div>
                                    <div className="font-extrabold text-foreground text-xs">
                                        SAR {weekPrice.toLocaleString()}
                                    </div>
                                </div>
                                <div className="border-l border-border/50 flex flex-col items-center justify-center">
                                    <div className="text-muted-foreground mb-1 uppercase tracking-widest font-bold text-[9px]">4 Week</div>
                                    <div className="font-extrabold text-foreground text-xs">
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
