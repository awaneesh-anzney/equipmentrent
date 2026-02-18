"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Rent", href: "/rent" },
        { name: "Buy", href: "/buy" },
        { name: "Service", href: "/service" },
        { name: "T3 Tech", href: "/tech" },
        { name: "Company", href: "/company" },
        { name: "Careers", href: "/careers" },
        { name: "Locations", href: "/locations" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/90 backdrop-blur-md py-2 border-b border-white/10"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    {/* Simple Logo Icon */}
                    <div className="size-8 rounded bg-primary flex items-center justify-center text-white font-bold text-xl">
                        E
                    </div>
                    <span className="text-white font-extrabold text-xl tracking-tight">
                        EQUIPMENTRENT
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/80 hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-9 rounded-sm focus-visible:ring-primary h-9"
                        />
                    </div>

                    {/* Phone Button */}
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white h-9 rounded-sm font-semibold">
                        1.888.80.RENTS
                    </Button>

                    {/* Icons */}
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 hover:text-primary">
                        <User className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 hover:text-primary">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/90 hover:text-primary text-lg font-semibold border-b border-white/5 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-9 rounded-sm"
                            />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-sm mt-2">
                            1.888.80.RENTS
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
