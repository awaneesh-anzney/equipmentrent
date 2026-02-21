
"use client";

import React from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { LocationDialog } from "@/components/commons/LocationDialog";

interface RentHeroProps {
    selectedLocation: string;
    onLocationChange: (location: string) => void;
}

export function RentHero({ selectedLocation, onLocationChange }: RentHeroProps) {
    return (
        <div className="w-full relative overflow-hidden rounded-3xl bg-card shadow-sm border border-border/50 mb-12 container mx-auto">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Dark Top Bar mapped to a sleek glassy ribbon */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border/50 py-2 px-6 relative z-10 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4 md:gap-0">
                    <LocationDialog onLocationSelect={onLocationChange}>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 bg-primary/5 px-4 py-2 rounded-full border border-primary/20 transition-all text-primary font-semibold">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedLocation}</span>
                        </div>
                    </LocationDialog>

                    <div className="flex items-center gap-6 font-bold text-xs md:text-sm tracking-widest text-muted-foreground uppercase">
                        <a href="#" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform inline-block">Core</a>
                        <a href="#" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform inline-block">Advanced</a>
                        <a href="#" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform inline-block">Tooling</a>
                    </div>
                </div>
            </div>

            {/* Main Hero Content */}
            <div className="py-2 px-6 relative z-10">
                <div className="items-start gap-12">
                    <div className="flex flex-row gap-6">
                       <div>
                        <h4 className="inline-block border border-primary/20 bg-primary/5 rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-primary">
                            Heavy Machinery & Tools
                        </h4>
                        <h3 className="text-4xl font-black text-foreground mb-4 tracking-tighter leading-none">
                            Equipment <br className="hidden md:block" /> Rentals
                        </h3>
                       </div>
                       <div className="w-full lg:w-3/4 px-10">
                        <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
                            Power your mega projects with our industry-leading heavy equipment and tooling solutions.
                            From earthmovers to climate control, get exactly what you need delivered anywhere in the Kingdom.
                            We operate across <a href="#" className="text-primary font-bold underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors">Strategic Hubs</a> nationwide.
                        </p>
                       </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
