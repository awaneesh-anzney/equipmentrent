"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
    title: string;
    subtitle: string;
    description?: string;
    image: string;
    highlight?: string;
}

const features: FeatureCardProps[] = [
    {
        subtitle: "Vision 2030 aligned",
        title: "BUILDing THE FUTURE",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    },
    {
        subtitle: "Expansive locations",
        title: "KINGDOM-WIDE COVERAGE",
        highlight: "Strategic hubs",
        description: "across all major regions, we deliver true coverage and boots-on-the-ground service everywhere in KSA.",
        image: "https://images.unsplash.com/photo-1581094794329-cd136ce4acd6?q=80&w=2670&auto=format&fit=crop",
    },
    {
        subtitle: "Smart job sites",
        title: "CONNECTED FLEETS",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2676&auto=format&fit=crop",
    },
    {
        subtitle: "Analytics driven",
        title: "BUILT ON DATA",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    },
];

const FeatureCards = () => {
    return (
        <section className="bg-background py-24 text-foreground relative overflow-hidden">
            {/* Background ambient glow matching the hero section */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-block border border-primary/20 bg-primary/5 rounded-full px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                            Beyond Equipment
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                            A Smarter Way to Build <br /> The Kingdom
                        </h2>
                    </div>
                    <Link
                        href="/story"
                        className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-all group pb-2"
                    >
                        Our Story <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>

                {/* CSS Grid for the card layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-2xl bg-muted/20 border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 dark:opacity-60 group-hover:opacity-100 dark:group-hover:opacity-80"
                                style={{ backgroundImage: `url(${feature.image})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                <span className="text-white/90 text-sm font-semibold tracking-wider uppercase bg-black/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/10 shadow-sm">
                                    {feature.subtitle}
                                </span>

                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-4 text-white drop-shadow-md">
                                        {feature.title}
                                    </h3>
                                    {feature.description && (
                                        <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-32 opacity-0 group-hover:opacity-100">
                                            <p className="text-white/80 text-sm leading-relaxed pb-2">
                                                With <span className="text-primary font-bold">{feature.highlight}</span> {feature.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;
