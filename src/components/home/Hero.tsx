"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for readability */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                    poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                >
                    {/* Dummy video link - using a reliable placeholder source or just stock footage if available */}
                    <source src="https://videos.pexels.com/video-files/3840441/3840441-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center pt-20">
                <h2 className="text-white/90 text-sm md:text-lg uppercase tracking-[0.2em] mb-4 font-semibold animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Building the future of construction
                </h2>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase mb-8 tracking-tighter drop-shadow-lg max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Expand Your Fleet
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white font-bold rounded-sm h-14 px-8 text-lg w-full sm:w-auto uppercase tracking-wide"
                    >
                        Buy Used
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black font-bold rounded-sm h-14 px-8 text-lg w-full sm:w-auto uppercase tracking-wide"
                    >
                        Buy New
                    </Button>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </div>
    );
};

export default Hero;
