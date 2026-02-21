"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function Rentals() {
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
        <div className="w-full  mx-auto px-4  ">
            <div className="space-y-8">
                {/* Header section */}
                <div>
                    <div className="flex items-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        <span className="cursor-pointer hover:text-gray-900 transition-colors">YOUR ACCOUNT</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-400">ACTIVE RENTALS</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
                        Rental Management
                    </h1>
                </div>

                {/* Tab section */}
                <div className="w-full ">
                    <div className="flex border-b border-gray-200 w-full">
                        <button className="relative px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wide">
                            ACTIVE
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F97316] rounded-t-sm" />
                        </button>
                    </div>

                    {/* Table section */}
                    <div className="w-full overflow-x-auto">
                        <Table className="min-w-[900px] w-full border-collapse">
                            <TableHeader>
                                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                                    <TableHead className="py-4 px-4 align-middle text-left font-bold text-sm text-gray-900 w-[25%] uppercase whitespace-nowrap">
                                        Equipment
                                    </TableHead>
                                    <TableHead className="py-4 px-4 align-middle text-left font-bold text-sm text-gray-900 w-[15%] uppercase cursor-pointer group whitespace-nowrap">
                                        <div className="flex items-center gap-2 hover:bg-gray-50 p-1 -ml-1 rounded transition-colors w-max">
                                            Start Date
                                            <ChevronDown className="h-4 w-4 text-[#F97316]" strokeWidth={3} />
                                        </div>
                                    </TableHead>
                                    <TableHead className="py-4 px-4 align-middle text-left font-bold text-sm text-gray-900 w-[15%] uppercase whitespace-nowrap">
                                        End Date
                                    </TableHead>
                                    <TableHead className="py-4 px-4 align-middle text-left font-bold text-sm text-gray-900 w-[20%] uppercase whitespace-nowrap">
                                        Jobsite
                                    </TableHead>
                                    <TableHead className="py-4 px-4 align-middle text-left font-bold text-sm text-gray-900 w-[15%] uppercase whitespace-nowrap">
                                        Rental #
                                    </TableHead>
                                    <TableHead className="py-4 px-4 align-middle text-left font-bold text-sm text-gray-900 w-[10%] uppercase whitespace-nowrap">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableCell colSpan={6} className="h-[300px] text-center">
                                            <div className="flex w-full items-center justify-center">
                                                {/* Custom SVG to match the image's specific loader */}
                                                <svg
                                                    className="h-10 w-10 animate-spin text-[#F97316]"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-100"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableCell colSpan={6} className="py-12 text-center text-gray-500 font-medium h-[200px]">
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
