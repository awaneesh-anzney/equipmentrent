
import React from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { LocationDialog } from "@/components/commons/LocationDialog";

export function RentHero() {
    return (
        <div className="w-full">
            {/* Dark Top Bar */}
            <div className="bg-[#1a1a1a] text-white py-3 px-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
                    <LocationDialog>
                        <div className="flex items-center gap-2 mb-2 md:mb-0 cursor-pointer hover:text-primary transition-colors">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">Set Location For Accurate Pricing</span>
                        </div>
                    </LocationDialog>
                    <div className="flex items-center gap-6 font-medium text-xs md:text-sm tracking-wide">
                        <a href="#" className="hover:text-primary transition-colors uppercase">Core Solutions</a>
                        <a href="#" className="hover:text-primary transition-colors uppercase">Advanced Solutions</a>
                        <a href="#" className="hover:text-primary transition-colors uppercase">Tooling Solutions</a>
                    </div>
                </div>
            </div>

            {/* Main Hero Content */}
            <div className="bg-white py-5 md:py-4 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="max-w-4xl">
                            <h4 className="text-primary font-bold tracking-widest text-xs md:text-sm uppercase mb-3">
                                Heavy Equipment and Tools
                            </h4>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                                Equipment Rentals
                            </h3>
                        </div>
                        <span>
                            <p className="text-gray-600 text-xl font-medium leading-relaxed max-w-4xl">
                                Explore our wide selection of leading heavy equipment and tooling rental services.
                                Rent construction equipment, aerial platforms, earthmovers, forklifts, climate control solutions,
                                and more from our locations <a href="#" className="underline decoration-gray-400 underline-offset-4 hover:text-primary font-medium">373 nationwide</a>.
                                Our fleet features next-generation equipment from the brands you trust, like Genie, Takeuchi and Doosan.
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
