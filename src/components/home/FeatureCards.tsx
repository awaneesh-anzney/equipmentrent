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
        subtitle: "The future of the jobsite",
        title: "BUILD THE FUTURE",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2662&auto=format&fit=crop",
    },
    {
        subtitle: "Expansive locations",
        title: "COAST TO COAST COVERAGE",
        highlight: "373 branches",
        description: "across 45 states, we deliver true nationwide coverage and boots-on-the-ground service.",
        image: "https://images.unsplash.com/photo-1581094794329-cd136ce4acd6?q=80&w=2670&auto=format&fit=crop",
    },
    {
        subtitle: "Building connectivity",
        title: "CONNECTED JOBSITES",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2676&auto=format&fit=crop",
    },
    {
        subtitle: "Billions of datapoints",
        title: "BUILT ON DATA",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    },
];

const FeatureCards = () => {
    return (
        <section className="bg-[#1a1a1f] py-20 text-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <div className="inline-block border border-white/20 rounded-full px-4 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-white/80">
                            More Than Equipment
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            A Smarter Way To Build
                        </h2>
                    </div>
                    <Link
                        href="/story"
                        className="flex items-center gap-2 text-primary font-bold hover:text-white transition-colors group"
                    >
                        Our Story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* CSS Grid for the card layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-sm bg-neutral-900 border border-white/5 shadow-2xl transition-all duration-500 hover:scale-[1.01]"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                style={{ backgroundImage: `url(${feature.image})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                <span className="text-white/80 text-sm font-medium tracking-wide">
                                    {feature.subtitle}
                                </span>

                                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-black uppercase leading-tight mb-3">
                                        {feature.title}
                                    </h3>
                                    {feature.description && (
                                        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                                            With <span className="text-primary font-bold">{feature.highlight}</span> {feature.description}
                                        </p>
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
