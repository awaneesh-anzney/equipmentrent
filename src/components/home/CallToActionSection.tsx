import React from "react";
import { Button } from "@/components/ui/button";
import { UserCheck, Truck, MessageSquareText } from "lucide-react";
import Link from "next/link";

interface CTAProps {
    icon: React.ElementType;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

const ctaItems: CTAProps[] = [
    {
        icon: UserCheck,
        title: "Join The Team",
        description: "Explore our culture and help build Vision 2030.",
        buttonText: "CAREER OPPORTUNITIES",
        buttonLink: "/careers",
    },
    {
        icon: Truck,
        title: "Ready To Rent?",
        description: "Browse our premium machinery & equipment.",
        buttonText: "BROWSE EQUIPMENT",
        buttonLink: "/rent",
    },
    {
        icon: MessageSquareText,
        title: "Can We Help?",
        description: "Chat with our local on-the-ground experts.",
        buttonText: "CHAT NOW",
        buttonLink: "/chat",
    },
];

const CallToActionSection = () => {
    return (
        <section className="bg-background relative py-20 pb-32">
            {/* Subtle Gradient separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {ctaItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-card p-10 rounded-2xl border border-border/50 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                        >
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                    <item.icon className="w-10 h-10 text-primary stroke-[1.5]" />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-muted-foreground mb-8 text-sm md:text-base">{item.description}</p>
                            </div>

                            <Link href={item.buttonLink} className="w-full">
                                <Button
                                    variant="outline"
                                    className="border-border text-foreground hover:bg-primary hover:border-primary hover:text-white font-bold tracking-wider px-6 h-12 w-full rounded-xl transition-all shadow-sm group-hover:shadow-[0_4px_14px_0_rgba(var(--primary),0.2)]"
                                >
                                    {item.buttonText}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
