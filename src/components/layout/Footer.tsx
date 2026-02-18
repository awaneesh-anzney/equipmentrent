"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const footerLinks = {
    "My Account": [
        { label: "Rental Login", href: "/login" },
        { label: "T3 Login", href: "/t3-login" },
        { label: "Credit Application", href: "/credit" },
    ],
    Rent: [
        { label: "All Equipment", href: "/equipment" },
        { label: "National Accounts", href: "/national" },
        { label: "Government Services", href: "/government" },
        { label: "Location Directory", href: "/locations" },
        { label: "Rental Protection", href: "/protection" },
    ],
    Buy: [
        { label: "Buy New", href: "/buy-new" },
        { label: "Buy Used", href: "/buy-used" },
        { label: "Parts & Tools", href: "/parts" },
    ],
    "T3 Tech": [
        { label: "T3 Technology", href: "/t3" },
        { label: "Help Center", href: "/help" },
        { label: "Release Updates", href: "/updates" },
        { label: "Account Login", href: "/login" },
    ],
    Company: [
        { label: "Our Story", href: "/story" },
        { label: "Careers", href: "/careers" },
        { label: "Our Culture", href: "/culture" },
        { label: "Awards", href: "/awards" },
        { label: "Giving Back", href: "/giving-back" },
        { label: "Articles", href: "/articles" },
        { label: "Press Room", href: "/press" },
        { label: "Investor Relations", href: "/investors" },
    ],
    Resources: [
        { label: "Pay Bill", href: "/pay-bill" },
        { label: "Request Service", href: "/service" },
        { label: "Contact Us", href: "/contact" },
        { label: "Real Estate", href: "/real-estate" },
        { label: "Disaster Response", href: "/disaster" },
        { label: "Hiring Veterans", href: "/veterans" },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-[#121217] text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-bold text-white uppercase tracking-wider mb-6 text-sm">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-primary transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Special styling for the My Account section to match mockup */}
                            {category === "My Account" && (
                                <div className="mt-8">
                                    <Button
                                        variant="outline"
                                        className="w-full text-primary border-primary hover:bg-primary hover:text-white font-bold"
                                    >
                                        1-888-80-RENTS
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
                        <span>© 2026 EquipmentRent. All rights reserved.</span>
                        <div className="hidden md:block w-px h-3 bg-white/20 self-center"></div>
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Social icons placeholders */}
                        <div className="flex gap-4">
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">F</div>
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">T</div>
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">I</div>
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">L</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
