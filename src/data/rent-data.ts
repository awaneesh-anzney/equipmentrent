
export interface EquipmentItem {
    id: string;
    name: string;
    image: string;
    tags: string[];
    category: string;
    productType?: string; // e.g., "Utility Vehicle"
    pricing?: { // Dummy pricing structure
        day: string;
        week: string;
        fourWeek: string;
    };
}

export interface EquipmentCategory {
    id: string;
    title: string;
    slug: string;
    description?: string; // Category description for the top of the page
    items: EquipmentItem[];
    subcategories?: string[]; // For sidebar expansion
}

export const RENT_CATEGORIES_DATA: EquipmentCategory[] = [
    {
        id: "aerial",
        title: "Aerial Work Platforms",
        slug: "aerial-work-platforms",
        subcategories: ["Boom Lifts", "Scissor Lifts", "Vertical Mass Lifts"],
        items: [], // Populated elsewhere or kept simple for now
    },
    {
        id: "ag-landscaping",
        title: "Agriculture & Landscaping",
        slug: "agriculture-landscaping",
        description: "EquipmentRent offers a wide selection of agriculture and landscaping rentals to help you get the job done. From powerful stump grinders and chippers for effective debris management, to versatile machines for forestry and land clearing, our fleet is built for performance and reliability. With trusted brands like Kubota, Polaris, and Stihl, you're sure to find the right equipment to help handle any project with confidence.",
        subcategories: [
            "All Agriculture & Landscaping",
            "Landscaping Power Tool",
            "Stump Grinder and Chipper",
            "Utility Vehicle"
        ],
        items: [
            {
                id: "uv-1",
                name: "4 WHEEL BURDEN CARRIER, ELECTRIC",
                image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2000&auto=format&fit=crop", // Placeholder resembling util vehicle
                tags: ["UTILITY VEHICLE"],
                category: "Agriculture & Landscaping",
                productType: "Utility Vehicle",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                }
            },
            {
                id: "uv-2",
                name: "UTILITY VEHICLE 2 - 3 PASSENGER, DIESEL",
                image: "https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?q=80&w=2000&auto=format&fit=crop", // Placeholder
                tags: ["UTILITY VEHICLE"],
                category: "Agriculture & Landscaping",
                productType: "Utility Vehicle",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                }
            }
        ]
    },
    {
        id: "earthmoving",
        title: "Earthmoving",
        slug: "earthmoving",
        subcategories: ["Excavators", "Dozers", "Backhoes"],
        items: [],
    },
    // ... we can expand others as needed, keeping minimal for now to focus on the requested feature
];

// Helper to keep the simple string list if needed, or we can derive it
export const RENT_CATEGORIES = RENT_CATEGORIES_DATA.map(c => c.title);

// Re-exporting the section data used on the main page, maybe we merge these concepts eventually
export const EQUIPMENT_SECTIONS: EquipmentCategory[] = [
    {
        id: "aerial",
        title: "Aerial Work Platforms",
        slug: "aerial-work-platforms",
        items: [
            {
                id: "1",
                name: "ELECTRIC SCISSOR LIFT",
                image: "https://images.unsplash.com/photo-1581094794329-cd194304611b?q=80&w=2940&auto=format&fit=crop", // Placeholder
                tags: ["CORE SOLUTIONS"],
                category: "Aerial Work Platforms",
            },
            {
                id: "2",
                name: "ARTICULATING BOOM LIFT",
                image: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?q=80&w=2836&auto=format&fit=crop", // Placeholder
                tags: ["CORE SOLUTIONS"],
                category: "Aerial Work Platforms",
            },
            {
                id: "3",
                name: "TELESCOPIC BOOM LIFT",
                image: "https://images.unsplash.com/photo-1563725697669-79ae3e1c667d?q=80&w=2942&auto=format&fit=crop", // Placeholder
                tags: ["CORE SOLUTIONS"],
                category: "Aerial Work Platforms",
            },
        ],
    },
    {
        id: "earthmoving",
        title: "Earthmoving",
        slug: "earthmoving",
        items: [
            {
                id: "4",
                name: "MINI EXCAVATOR",
                image: "https://images.unsplash.com/photo-1578335964645-56d11f185786?q=80&w=2940&auto=format&fit=crop",
                tags: ["CORE SOLUTIONS"],
                category: "Earthmoving",
            },
            {
                id: "5",
                name: "BACKHOE AND SKIP LOADER",
                image: "https://images.unsplash.com/photo-1517596853123-0df0b4f8841a?q=80&w=2942&auto=format&fit=crop",
                tags: ["CORE SOLUTIONS"],
                category: "Earthmoving",
            },
            {
                id: "6",
                name: "DOZER",
                image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop",
                tags: ["CORE SOLUTIONS"],
                category: "Earthmoving",
            },
        ],
    },
    {
        id: "forklifts",
        title: "Forklifts & Material Handling",
        slug: "forklifts",
        items: [
            {
                id: "7",
                name: "TELEHANDLER",
                image: "https://images.unsplash.com/photo-1550953685-6f81e3381a7b?q=80&w=2940&auto=format&fit=crop",
                tags: ["CORE & TOOLING SOLUTIONS"],
                category: "Forklifts & Material Handling",
            },
            {
                id: "8",
                name: "INDUSTRIAL FORKLIFT",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop",
                tags: ["CORE & TOOLING SOLUTIONS"],
                category: "Forklifts & Material Handling",
            },
            {
                id: "9",
                name: "ROUGH TERRAIN FORKLIFT",
                image: "https://images.unsplash.com/photo-1629804558552-e6176d6537eb?q=80&w=2940&auto=format&fit=crop",
                tags: ["CORE & TOOLING SOLUTIONS"],
                category: "Forklifts & Material Handling",
            },
        ],
    },
];
