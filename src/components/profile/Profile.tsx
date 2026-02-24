"use client";

import React, { useState } from "react";
import { User, Building2, MapPin, Mail, Phone, Camera, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner"; // Assuming sonner is installed based on standard shadcn setups or we can add it later

export default function Profile() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            try {
                toast.success("Profile updated successfully!");
            } catch (err) {
                console.log("Toast not fully configured but mocked success.")
            }
        }, 1000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 lg:px-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
                <div>
                    <h1 className="text-xl md:text-2xl font-black tracking-tight text-foreground uppercase mb-2">
                        Profile Settings
                    </h1>
                    <p className="text-muted-foreground font-medium text-lg">
                        Manage your personal info, company details, and preferences.
                    </p>
                </div>
                <div>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="font-bold uppercase tracking-widest text-xs px-8 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 transition-all gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Quick Actions */}
                <div className="space-y-6 lg:col-span-1">
                    <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl bg-muted flex items-center justify-center">
                                    <User className="w-16 h-16 text-muted-foreground" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-105 transition-transform">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">John Doe</h3>
                                <p className="text-sm text-muted-foreground">Administrator</p>
                            </div>
                            <div className="w-full pt-4 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                                    <Mail className="w-4 h-4" />
                                    john.doe@example.com
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                                    <Building2 className="w-4 h-4" />
                                    Acme Corp Inc.
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold">
                                <Shield className="w-4 h-4 text-primary" />
                                Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full justify-start rounded-xl font-medium">
                                Change Password
                            </Button>
                            <Button variant="outline" className="w-full justify-start rounded-xl font-medium">
                                Two-Factor Authentication
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Editing Form */}
                <div className="space-y-8 lg:col-span-2">
                    <form id="profile-form" onSubmit={handleSave} className="space-y-8">

                        {/* Personal Information */}
                        <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                            <CardHeader className="pb-4 border-b border-border/50 mb-6 px-8 pt-8">
                                <CardTitle className="text-lg uppercase tracking-wider font-bold flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Personal Details
                                </CardTitle>
                                <CardDescription>Update your personal and contact information.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="font-semibold text-muted-foreground">First Name</Label>
                                        <Input id="firstName" defaultValue="John" className="h-12 rounded-xl bg-background" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="font-semibold text-muted-foreground">Last Name</Label>
                                        <Input id="lastName" defaultValue="Doe" className="h-12 rounded-xl bg-background" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="font-semibold text-muted-foreground">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="email" type="email" defaultValue="john.doe@example.com" className="h-12 rounded-xl pl-10 bg-background" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="font-semibold text-muted-foreground">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="h-12 rounded-xl pl-10 bg-background" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Settings */}
                        <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                            <CardHeader className="pb-4 border-b border-border/50 mb-6 px-8 pt-8">
                                <CardTitle className="text-lg uppercase tracking-wider font-bold flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-primary" />
                                    Company Settings
                                </CardTitle>
                                <CardDescription>Manage organization details and primary branch.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName" className="font-semibold text-muted-foreground">Company Name</Label>
                                        <Input id="companyName" defaultValue="Acme Corp Inc." className="h-12 rounded-xl bg-background" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="branch" className="font-semibold text-muted-foreground">Default Branch</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="branch" defaultValue="Main Hub - New York" className="h-12 rounded-xl pl-10 bg-background" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </form>
                </div>
            </div>
        </div>
    );
}