import { Rentals } from "@/components/rentals/Rentals";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rental Management | Your Account",
    description: "Manage your active and past rentals.",
};

export default function RentalsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Rentals />
        </div>
    );
}
