"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { CartDialog } from "@/components/commons/CartDialog";

// ... inside component ...

interface NavbarProps {
    theme?: "light" | "dark";
}

const Navbar = ({ theme = "dark" }: NavbarProps) => {
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

    const isLight = theme === "light";
    const textColor = isLight ? "text-gray-900" : "text-white";
    const mutedTextColor = isLight ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white";
    const borderColor = isLight ? "border-gray-200" : "border-white/10";
    const inputBg = isLight ? "bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-500" : "bg-white/10 border-white/20 text-white placeholder:text-white/50";
    const buttonVariant = isLight ? "outline" : "outline"; // We'll customize classes
    const buttonClass = isLight
        ? "border-primary text-primary hover:bg-primary hover:text-white"
        : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white";

    return (
        <nav
            className={cn(
                "z-50 transition-all duration-300 w-full",
                isLight ? "sticky top-0 bg-white border-b border-gray-100" : "fixed top-0 left-0 right-0",
                !isLight && isScrolled ? "bg-black/90 backdrop-blur-md py-2 border-b border-white/10" : "py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    {/* EquipmentRent Logo - Text Color Depends on Theme */}
                    <div className="flex items-center gap-2">
                        <span className="sr-only">EquipmentRent</span>
                        {/* Replicating the logo style from screenshot - Cog icon + Text */}
                        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-1.5 5.5-2.28-7.5-3.5 13 8-11 2.5z" />
                            {/* Simplified geometric shape for "EquipmentShare" like logo */}
                            <path d="M12 1L9 6H15L12 1Z" className="hidden" />
                        </svg>
                        {/* Actual heavy equipment share logo involves a cog. Using a placeholder cog-like SVG path or just text for now */}
                        <div className="flex flex-col">
                            <span className={cn("font-black text-xl tracking-tighter leading-none", isLight ? "text-gray-900" : "text-white")}>
                                EquipmentRent
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-bold uppercase tracking-wide transition-colors",
                                mutedTextColor,
                                link.name === "Rent" && isLight ? "text-primary" : ""
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative w-64">
                        <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4", isLight ? "text-primary" : "text-white/50")} />
                        <Input
                            type="text"
                            placeholder="Search..."
                            className={cn("pl-9 rounded-sm focus-visible:ring-primary h-10", inputBg)}
                        />
                    </div>

                    {/* Phone Button */}
                    <Button variant="outline" className={cn("h-10 rounded-sm font-bold tracking-wide border-2", buttonClass)}>
                        1.888.80.RENTS
                    </Button>

                    {/* Icons */}

                    <Button size="icon" variant="ghost" className={cn("hover:text-primary", textColor)}>
                        <User className="h-6 w-6" />
                    </Button>
                    <CartDialog />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn("lg:hidden", textColor)}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className={cn("lg:hidden absolute top-full left-0 right-0 p-4 flex flex-col gap-4 shadow-xl border-t", isLight ? "bg-white border-gray-100" : "bg-black/95 border-white/10")}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn("text-lg font-bold border-b pb-2", isLight ? "text-gray-900 border-gray-100 hover:text-primary" : "text-white/90 border-white/5 hover:text-primary")}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="relative w-full">
                            <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4", isLight ? "text-gray-400" : "text-white/50")} />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className={cn("pl-9 rounded-sm", inputBg)}
                            />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-sm mt-2 font-bold">
                            1.888.80.RENTS
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
