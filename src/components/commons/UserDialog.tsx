"use client";

import React from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";

export function UserDialog() {
    const { user, logout } = useAuth();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <User className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 rounded-2xl border border-border/50 bg-card shadow-xl" align="end" sideOffset={12}>
                {user ? (
                    <div className="flex flex-col">
                        <div className="px-3 py-3 border-b border-border/50 mb-2">
                            <p className="text-sm font-black text-foreground truncate">{user.email.split('@')[0]}</p>
                        </div>
                        <Link href="/account" passHref onClick={() => document.body.click()}>
                            <Button variant="ghost" className="w-full justify-start font-bold h-10 hover:bg-muted text-foreground">
                                Account
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-bold h-10 hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors mt-1"
                            onClick={() => {
                                logout();
                                document.body.click();
                            }}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log out
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 p-1">
                        <Link href="/login" passHref onClick={() => document.body.click()}>
                            <Button variant="ghost" className="w-full justify-start font-bold h-10 hover:bg-muted text-foreground">Sign In</Button>
                        </Link>
                        <Link href="/signup" passHref onClick={() => document.body.click()}>
                            <Button className="w-full justify-start font-bold h-10">Create Account</Button>
                        </Link>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
