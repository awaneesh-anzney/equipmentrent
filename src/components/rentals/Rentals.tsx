"use client";

import { ChevronDown, Loader2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RENTALS_DATA } from "@/data/rentals";

export function Rentals() {
    const [isLoading, setIsLoading] = useState(true);

    // We can simulate an API call or loading state.
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
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
                        <span className="text-foreground">ACTIVE RENTALS</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                        Rental Management
                    </h1>
                </div>

                {/* Tab section */}
                <div className="w-full bg-card border border-border/50 rounded-3xl shadow-sm overflow-hidden">
                    <div className="flex border-b border-border/50 w-full bg-muted/10">
                        <button className="relative px-8 py-5 text-sm font-black text-foreground uppercase tracking-widest bg-card">
                            ACTIVE
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />
                        </button>
                    </div>

                    {/* Table section */}
                    <div className="w-full overflow-x-auto p-2">
                        <Table className="min-w-[900px] w-full border-collapse">
                            <TableHeader>
                                <TableRow className="border-b border-border/50 hover:bg-transparent">
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[25%] uppercase whitespace-nowrap">
                                        Equipment
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[15%] uppercase cursor-pointer group whitespace-nowrap">
                                        <div className="flex items-center gap-2 hover:bg-primary/5 p-2 -ml-2 rounded-lg transition-colors w-max text-foreground">
                                            Start Date
                                            <ChevronDown className="h-4 w-4 text-primary" strokeWidth={3} />
                                        </div>
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[15%] uppercase whitespace-nowrap">
                                        End Date
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[20%] uppercase whitespace-nowrap">
                                        Jobsite
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[15%] uppercase whitespace-nowrap">
                                        Rental #
                                    </TableHead>
                                    <TableHead className="py-5 px-6 align-middle text-left font-bold text-xs text-muted-foreground tracking-widest w-[10%] uppercase whitespace-nowrap">
                                        Actions
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
                                ) : RENTALS_DATA.length > 0 ? (
                                    RENTALS_DATA.map((rental) => (
                                        <TableRow key={rental.id} className="hover:bg-muted/30 border-border/50 transition-colors group">
                                            <TableCell className="py-4 px-6 font-bold whitespace-nowrap text-foreground">{rental.equipment}</TableCell>
                                            <TableCell className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{rental.startDate}</TableCell>
                                            <TableCell className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{rental.endDate}</TableCell>
                                            <TableCell className="py-4 px-6 text-sm font-medium whitespace-nowrap">{rental.jobsite}</TableCell>
                                            <TableCell className="py-4 px-6 text-sm text-primary font-bold whitespace-nowrap">{rental.id}</TableCell>
                                            <TableCell className="py-4 px-6 whitespace-nowrap">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary" title="Details">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableCell colSpan={6} className="py-16 text-center text-muted-foreground font-medium h-[200px] text-lg">
                                            No active rentals found.
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
