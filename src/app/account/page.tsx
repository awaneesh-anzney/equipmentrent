import { AccountDashboard } from "@/components/account/AccountDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Account | EquipmentRent",
    description: "Manage your rentals, view order history, and control your account settings.",
};

export default function AccountPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <AccountDashboard />
        </div>
    );
}
