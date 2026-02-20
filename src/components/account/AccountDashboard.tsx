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
        <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                    Your Rental Account
                </h1>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="font-semibold uppercase tracking-wider text-xs px-6 py-5 border-2 hover:bg-muted">
                        Request Service
                    </Button>
                    <Button className="font-semibold uppercase tracking-wider text-xs px-8 py-5 bg-orange-600 hover:bg-orange-700 text-white shadow-md">
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
