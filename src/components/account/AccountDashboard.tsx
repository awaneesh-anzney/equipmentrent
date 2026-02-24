"use client";

import {
    Truck,
    FileText,
    User,
    CreditCard,
    ClipboardList,
    Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountCard } from "./AccountCard";

const accountLinks = [
    {
        title: "Rental Management",
        description:
            "View and manage rentals, reservations and request equipment service",
        icon: Truck,
        href: "/account/rentals",
    },
    {
        title: "Order History",
        description: "View a detailed record of your previous and ongoing orders",
        icon: FileText,
        href: "/account/orders",
    },
    {
        title: "Profile",
        description: "Edit name, contact info, company and default branch",
        icon: User,
        href: "/account/profile",
    },
    {
        title: "Invoices & Payments",
        description: "View all transactions, manage payments and settings",
        icon: CreditCard,
        href: "/account/invoices",
        external: true,
    },
    {
        title: "Apply & Manage Account",
        description:
            "Set up your account to unlock full account benefits and get ready to rent faster.",
        icon: ClipboardList,
        href: "/account/manage",
    },
    {
        title: "Payment & Billing Details",
        description: "Save payment methods, update billing contacts and more.",
        icon: Layers,
        href: "/account/billing",
    },
];

export function AccountDashboard() {
    return (
        <div className="w-full px-4 lg:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
                <div>
                    <h1 className="text-xl md:text-2xl font-black tracking-tight text-foreground uppercase mb-2">
                        Your Account
                    </h1>
                    <p className="text-muted-foreground font-medium text-lg">Manage your rentals, history, and profile.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="outline" className="font-bold uppercase tracking-widest text-xs px-6 h-14 rounded-xl border-border/50 hover:bg-muted">
                        Request Service
                    </Button>
                    <Button className="font-bold uppercase tracking-widest text-xs px-8 h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all">
                        Rent Now
                    </Button>
                </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accountLinks.map((link) => (
                    <AccountCard
                        key={link.title}
                        title={link.title}
                        description={link.description}
                        icon={link.icon}
                        href={link.href}
                        external={link.external}
                    />
                ))}
            </div>
        </div>
    );
}
