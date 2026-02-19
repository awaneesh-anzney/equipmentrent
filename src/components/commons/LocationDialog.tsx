
"use client";

import React from "react";
import { Locate, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface LocationDialogProps {
    children: React.ReactNode;
}

export function LocationDialog({ children }: LocationDialogProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-6" align="start" sideOffset={10}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-gray-900">Where is your jobsite?</h3>

                    <div className="relative">
                        <Input
                            placeholder="Enter city or zip code"
                            className="pr-10 h-11 border-gray-300 text-base"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-11 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-bold uppercase tracking-wide flex items-center gap-2"
                    >
                        <Locate className="h-5 w-5" />
                        Use My Current Location
                    </Button>
                </div>

                {/* Little arrow/triangle to match the screenshot style if needed, 
            though PopoverContent usually handles this if configured. 
            Shadcn's popover is built on Radix UI which has an optional arrow. 
            For now, the clean shadow box is standard. */}
            </PopoverContent>
        </Popover>
    );
}
