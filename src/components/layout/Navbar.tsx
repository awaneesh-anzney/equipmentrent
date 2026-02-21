"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { CartDialog } from "@/components/commons/CartDialog";

interface NavbarProps {
    theme?: "light" | "dark";
}

const Navbar = ({ theme = "dark" }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
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
        { name: "Locations", href: "/locations" },
        { name: "Company", href: "/company" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full border-b",
                isScrolled
                    ? "bg-background/80 backdrop-blur-xl border-border/50 py-3 shadow-sm"
                    : "bg-transparent border-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <svg className="w-8 h-8 text-primary transition-transform group-hover:rotate-90 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-xl tracking-tight leading-none text-foreground flex items-center gap-1">
                            Equip<span className="text-primary">Rent</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative w-56 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            type="text"
                            placeholder="Find equipment..."
                            className="pl-9 h-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-full text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 border-l border-border/50 pl-4">
                        <Link href="/account">
                            <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>

                        <CartDialog />

                        <Button className="ml-2 rounded-full font-semibold shadow-[0_2px_10px_0_rgba(var(--primary),0.2)] hover:shadow-[0_4px_14px_rgba(var(--primary),0.3)] transition-all">
                            Call 1.888.RENTS <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-foreground p-2 -mr-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 p-6 flex flex-col gap-6 shadow-2xl border-t bg-background/95 backdrop-blur-2xl border-border animate-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-bold text-foreground hover:text-primary transition-colors pb-2 border-b border-border/50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Find equipment..."
                                className="pl-9 bg-muted h-12 rounded-xl border-transparent"
                            />
                        </div>
                        <Button className="w-full h-12 rounded-xl font-bold shadow-md">
                            Call 1.888.RENTS
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
