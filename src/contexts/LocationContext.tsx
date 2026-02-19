"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationContextType {
    selectedLocation: string;
    setSelectedLocation: (location: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
    const [selectedLocation, setSelectedLocation] = useState<string>("Set Location For Accurate Pricing");

    // Optional: Persist to localStorage
    useEffect(() => {
        const stored = localStorage.getItem("equipmentRent_location");
        if (stored) {
            setSelectedLocation(stored);
        }
    }, []);

    const handleSetLocation = (location: string) => {
        setSelectedLocation(location);
        localStorage.setItem("equipmentRent_location", location);
    };

    return (
        <LocationContext.Provider value={{ selectedLocation, setSelectedLocation: handleSetLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
}
