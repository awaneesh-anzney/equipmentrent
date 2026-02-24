
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
            <PopoverContent className="w-[380px] p-6 rounded-3xl border-2 border-primary/30 bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] shadow-primary/10 text-gray-900" align="start" sideOffset={12}>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-gray-900">Where is your jobsite?</h3>
                    </div>

                    <div className="relative group">
                        <Input
                            placeholder="Enter city or zip code"
                            className="pr-10 h-12 border-gray-200 bg-gray-50/50 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:bg-white text-base rounded-xl transition-all text-gray-900 placeholder:text-gray-400 shadow-sm shadow-black/5"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-50 w-full bg-white border border-gray-100 rounded-xl shadow-xl mt-2 max-h-60 overflow-y-auto overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                {suggestions.map((city) => (
                                    <div
                                        key={city.zipCode}
                                        className="px-4 py-3 hover:bg-primary/5 cursor-pointer text-sm border-b border-gray-50 last:border-0 transition-colors flex items-center gap-3"
                                        onClick={() => handleSelectCity(city)}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-gray-500">{city.shortName.substring(0, 2)}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{city.name}</div>
                                            <div className="text-gray-500 text-xs">{city.shortName} • {city.zipCode}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-12 border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 transition-all group"
                    >
                        <Locate className="h-4 w-4 group-hover:animate-pulse" />
                        Use My Current Location
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
