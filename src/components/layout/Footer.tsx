"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const footerLinks = {
    Rentals: [
        { label: "All Equipment", href: "/equipment" },
        { label: "Earthmoving", href: "/earthmoving" },
        { label: "Power & HVAC", href: "/power" },
        { label: "Location Directory", href: "/locations" },
    ],
    Company: [
        { label: "About EquipRent", href: "/about" },
        { label: "Vision 2030", href: "/vision-2030" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
    ],
    Support: [
        { label: "Help Center", href: "/help" },
        { label: "Request Service", href: "/service" },
        { label: "Rental Protection", href: "/protection" },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-[#051209] text-white pt-16 pb-8 border-t border-primary/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-extrabold text-2xl tracking-tight leading-none text-white flex items-center gap-1">
                                Equip<span className="text-primary">Rent</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
                            The Kingdom's leading equipment rental platform. Empowering mega projects and accelerating Saudi Arabia's Vision 2030.
                        </p>
                        <Button
                            className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wide w-full md:w-auto"
                        >
                            9200 RENTS (73687)
                        </Button>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-bold text-white uppercase tracking-wider mb-6 text-sm">
                                {category}
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <span>© {new Date().getFullYear()} EquipRent KSA. All rights reserved.</span>
                        <div className="hidden md:block w-px h-3 bg-white/20 self-center"></div>
                        <div className="flex gap-4">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">in</div>
                        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">𝕏</div>
                        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">f</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
