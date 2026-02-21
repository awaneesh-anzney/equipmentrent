"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center mt-16">
                <div className="inline-block border border-primary/20 bg-primary/5 rounded-full px-5 py-2 mb-8 text-sm font-semibold text-primary animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-sm backdrop-blur-md">
                    Proudly Powering Saudi Arabia's Vision 2030
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tighter max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    Build The Future Of <br className="hidden md:block" /> The Kingdom
                </h1>

                <p className="text-lg md:text-xl font-medium text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 leading-relaxed">
                    Access premium machinery with true nationwide coverage. From Riyadh to NEOM, we deliver reliable equipment and on-the-ground support for mega projects.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                    <Button
                        size="lg"
                        className="font-bold rounded-lg h-14 px-8 text-lg w-full sm:w-auto shadow-[0_4px_14px_0_rgba(var(--primary),0.39)] transition-all hover:shadow-[0_6px_20px_rgba(var(--primary),0.23)] hover:-translate-y-0.5"
                    >
                        Browse Rentals
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-background border-border text-foreground hover:bg-muted font-bold rounded-lg h-14 px-8 text-lg w-full sm:w-auto transition-all"
                    >
                        Contact Sales
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </div>
    );
};

export default Hero;
