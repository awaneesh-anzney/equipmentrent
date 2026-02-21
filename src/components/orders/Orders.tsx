"use client";

import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function Orders() {
    const [isLoading, setIsLoading] = useState(true);

    // We can simulate an API call or loading state.
    useEffect(() => {
        const timer = setTimeout(() => {
            // Keep loading to match the image or set to false to show the empty state after a while
            // For demonstration of the UI from the image, we will let it spin for 5 seconds
            setIsLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full px-4 lg:px-6">
            <div className="space-y-8">
                {/* Header section */}
                <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        <span className="cursor-pointer hover:text-primary transition-colors">YOUR ACCOUNT</span>
                        <span className="mx-2 text-border">/</span>
                        <span className="text-foreground">YOUR ORDERS</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                        Your Order History
                    </h1>
                </div>

                {/* Tab section */}
                <div className="w-full bg-card border border-border/50 rounded-3xl shadow-sm overflow-hidden">
                    <div className="flex border-b border-border/50 w-full bg-muted/10">
                        <button className="relative px-8 py-5 text-sm font-black text-foreground uppercase tracking-widest bg-card">
                            ORDERS
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />
                        </button>
                    </div>

                    {/* Table section */}
                    <div className="w-full overflow-x-auto p-2">
                        <Table className="min-w-[900px] w-full border-collapse">
                            <TableHeader>
                                <TableRow className="border-b border-border/50 hover:bg-transparent">
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[15%] uppercase whitespace-nowrap">
                                        Order Placed
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[25%] uppercase whitespace-nowrap">
                                        Equipment
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[15%] uppercase whitespace-nowrap">
                                        Quantity
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[20%] uppercase whitespace-nowrap">
                                        Start / End Date
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[15%] uppercase whitespace-nowrap">
                                        Jobsite
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[10%] uppercase whitespace-nowrap">
                                        Status
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableCell colSpan={6} className="h-[300px] text-center">
                                            <div className="flex w-full items-center justify-center">
                                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableCell colSpan={6} className="py-16 text-center text-muted-foreground font-medium h-[200px] text-lg">
                                            No orders found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
