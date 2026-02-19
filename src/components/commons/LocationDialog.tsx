
"use client";

import React, { useState } from "react";
import { Locate, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { saudiCities, City } from "@/data/location";

interface LocationDialogProps {
    children: React.ReactNode;
    onLocationSelect?: (location: string) => void;
}

export function LocationDialog({ children, onLocationSelect }: LocationDialogProps) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [open, setOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filtered = saudiCities.filter((city) =>
                city.name.toLowerCase().includes(value.toLowerCase()) ||
                city.shortName.toLowerCase().includes(value.toLowerCase()) ||
                city.zipCode.includes(value)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelectCity = (city: City) => {
        setInputValue(`${city.name} (${city.zipCode})`);
        setSuggestions([]);
        setShowSuggestions(false);
        if (onLocationSelect) {
            onLocationSelect(city.name);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
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
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                                {suggestions.map((city) => (
                                    <div
                                        key={city.zipCode}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => handleSelectCity(city)}
                                    >
                                        <div className="font-medium text-gray-900">{city.name}</div>
                                        <div className="text-gray-500 text-xs">{city.shortName} - {city.zipCode}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-11 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-bold uppercase tracking-wide flex items-center gap-2"
                    >
                        <Locate className="h-5 w-5" />
                        Use My Current Location
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
