import React from "react";
import { Button } from "@/components/ui/button";
import { UserCheck, Truck, MessageSquareText } from "lucide-react";

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
        description: "Our culture and open positions",
        buttonText: "CAREER OPPORTUNITIES",
        buttonLink: "/careers",
    },
    {
        icon: Truck,
        title: "Ready To Rent?",
        description: "Browse our equipment & solutions",
        buttonText: "BROWSE EQUIPMENT",
        buttonLink: "/rent",
    },
    {
        icon: MessageSquareText,
        title: "Can We Help?",
        description: "Chat with our friendly experts",
        buttonText: "CHAT NOW",
        buttonLink: "/chat",
    },
];

const CallToActionSection = () => {
    return (
        <section className="bg-[#1a1a1f] pb-24 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ctaItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#222228] p-10 rounded-sm border border-white/5 flex flex-col items-center text-center hover:bg-[#27272e] transition-colors"
                        >
                            <div className="mb-6 text-primary">
                                <item.icon className="w-12 h-12 stroke-[1.5]" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 mb-8">{item.description}</p>
                            <Button
                                variant="outline"
                                className="border-primary text-white hover:bg-primary hover:text-white uppercase font-bold tracking-wider px-6 py-6 h-auto text-sm w-full md:w-auto"
                            >
                                {item.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
