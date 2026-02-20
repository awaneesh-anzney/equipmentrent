import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LocationProvider } from "@/contexts/LocationContext";

export default function InfinitoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <LocationProvider>
                <Navbar theme="light" />
                <main className="flex-1">{children}</main>
                <Footer />
            </LocationProvider>
        </div>
    );
}
