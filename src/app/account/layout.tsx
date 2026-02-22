"use client";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LocationProvider } from "@/contexts/LocationContext";

export default function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col">
                <LocationProvider>
                    <Navbar theme="light" />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </LocationProvider>
            </div>
        </AuthGuard>
    );
}
