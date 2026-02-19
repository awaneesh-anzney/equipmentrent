
export interface EquipmentItem {
    id: string;
    name: string;
    slug: string;
    image: string;
    tags: string[];
    category: string;
    subcategorySlug?: string;
    productType?: string;
    basePrice: {
        day: number;
        week: number;
        fourWeek: number;
    };
    description?: string;
    specs?: { [key: string]: string };
}

export interface SubCategory {
    title: string;
    slug: string;
}

export interface EquipmentCategory {
    id: string;
    title: string;
    slug: string;
    description?: string;
    items: EquipmentItem[];
    subcategories?: SubCategory[];
}

// Helper to calculate price based on location
export const getLocationAdjustedPrice = (basePrice: number, location: string): number => {
    if (!location || location === "Set Location For Accurate Pricing") return basePrice;

    // Simple deterministic hash to simulate regional pricing differences
    let hash = 0;
    for (let i = 0; i < location.length; i++) {
        hash = location.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Variance between -10% and +15%
    const variance = (hash % 25) - 10;
    const factor = 1 + (variance / 100);

    return Math.round(basePrice * factor);
};

export const RENT_CATEGORIES_DATA: EquipmentCategory[] = [
    {
        id: "earthmoving",
        title: "Earthmoving Machinery",
        slug: "earthmoving-machinery",
        description: "Heavy-duty earthmoving equipment including JCBs, Poclains, and Dozers.",
        subcategories: [
            { title: "JCBs / Backhoes", slug: "jcbs-backhoes" },
            { title: "Poclains / Excavators", slug: "poclains-excavators" },
            { title: "Dozers", slug: "dozers" },
            { title: "Loaders", slug: "loaders" },
        ],
        items: [
            {
                id: "jcb-1",
                name: "JCB 3DX BACKHOE LOADER",
                slug: "jcb-3dx-backhoe",
                image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
                tags: ["JCB", "BACKHOE"],
                category: "Earthmoving Machinery",
                subcategorySlug: "jcbs-backhoes",
                productType: "Backhoe Loader",
                basePrice: {
                    day: 900,
                    week: 3000,
                    fourWeek: 9500
                },
                description: "Versatile JCB Backhoe Loader suitable for digging, lifting, and loading."
            },
            {
                id: "poclain-1",
                name: "POCLAIN EXCAVATOR, 20 TON",
                slug: "poclain-excavator-20-ton",
                image: "https://images.unsplash.com/photo-1578335964645-56d11f185786?auto=format&fit=crop&q=80&w=800",
                tags: ["POCLAIN", "EXCAVATOR"],
                category: "Earthmoving Machinery",
                subcategorySlug: "poclains-excavators",
                productType: "Excavator",
                basePrice: {
                    day: 1400,
                    week: 4800,
                    fourWeek: 15000
                },
                description: "Heavy-duty Hydraulic Excavator (Poclain) for major earthworks."
            },
            {
                id: "dozer-1",
                name: "CRAWLER DOZER D6",
                slug: "crawler-dozer-d6",
                image: "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?auto=format&fit=crop&q=80&w=800",
                tags: ["DOZER", "CRAWLER"],
                category: "Earthmoving Machinery",
                subcategorySlug: "dozers",
                productType: "Dozer",
                basePrice: {
                    day: 1800,
                    week: 6000,
                    fourWeek: 19000
                },
                description: "Powerful Crawler Dozer for pushing large quantities of soil."
            },
            {
                id: "loader-1",
                name: "WHEEL LOADER (EARTH MOVER)",
                slug: "wheel-loader-earth-mover",
                image: "https://images.unsplash.com/photo-1579623807206-3843f5505e60?auto=format&fit=crop&q=80&w=800",
                tags: ["LOADER", "EARTH MOVER"],
                category: "Earthmoving Machinery",
                subcategorySlug: "loaders",
                productType: "Wheel Loader",
                basePrice: {
                    day: 1100,
                    week: 3800,
                    fourWeek: 12000
                },
                description: "Heavy Earth Mover Wheel Loader for material handling."
            }
        ],
    },
    {
        id: "cranes",
        title: "Cranes & Lifting",
        slug: "cranes-lifting",
        description: "Small and Large Cranes for all lifting requirements.",
        subcategories: [
            { title: "Small Cranes", slug: "small-cranes" },
            { title: "Large Cranes", slug: "large-cranes" },
        ],
        items: [
            {
                id: "crane-small",
                name: "MOBILE CRANE (SMALL), 25 TON",
                slug: "mobile-crane-small-25-ton",
                image: "https://images.unsplash.com/photo-1578575436955-ef29da568c6c?q=80&w=2940&auto=format&fit=crop",
                tags: ["CRANE", "SMALL"],
                category: "Cranes & Lifting",
                subcategorySlug: "small-cranes",
                productType: "Mobile Crane",
                basePrice: {
                    day: 2000,
                    week: 7500,
                    fourWeek: 22000
                },
                description: "Compact mobile crane for city and tight site lifting."
            },
            {
                id: "crane-large",
                name: "ALL TERRAIN CRANE (LARGE), 100 TON",
                slug: "all-terrain-crane-large-100-ton",
                image: "https://images.unsplash.com/photo-1531652496739-1667fb5471cd?q=80&w=2787&auto=format&fit=crop",
                tags: ["CRANE", "LARGE", "HEAVY"],
                category: "Cranes & Lifting",
                subcategorySlug: "large-cranes",
                productType: "All Terrain Crane",
                basePrice: {
                    day: 5500,
                    week: 20000,
                    fourWeek: 65000
                },
                description: "Heavy duty All Terrain Crane for major construction lifts."
            }
        ]
    },
    {
        id: "trucks",
        title: "Trucks & Transportation",
        slug: "trucks-transportation",
        description: "Standard Trucks and Heavy Vehicles for transport.",
        subcategories: [
            { title: "Standard Trucks", slug: "standard-trucks" },
            { title: "Trailers", slug: "trailers" },
        ],
        items: [
            {
                id: "truck-1",
                name: "STANDARD DUMP TRUCK, 18 CUBIC METER",
                slug: "standard-dump-truck",
                image: "https://images.unsplash.com/photo-1591730472655-66774e1d71cb?auto=format&fit=crop&q=80&w=800",
                tags: ["TRUCK", "STANDARD"],
                category: "Trucks & Transportation",
                subcategorySlug: "standard-trucks",
                productType: "Dump Truck",
                basePrice: {
                    day: 700,
                    week: 2500,
                    fourWeek: 8000
                },
                description: "Standard heavy duty dump truck for material transport."
            },
            {
                id: "flatbed-1",
                name: "FLATBED TRUCK (LARGE)",
                slug: "flatbed-truck-large",
                image: "https://images.unsplash.com/photo-1605218427306-635bbcaf9a61?auto=format&fit=crop&q=80&w=800",
                tags: ["TRUCK", "FLATBED"],
                category: "Trucks & Transportation",
                subcategorySlug: "standard-trucks",
                productType: "Flatbed Truck",
                basePrice: {
                    day: 800,
                    week: 2800,
                    fourWeek: 9000
                }
            }
        ]
    }
];

export const EQUIPMENT_SECTIONS = RENT_CATEGORIES_DATA;

export const getCategoryData = (slug: string) => {
    const mainCategory = RENT_CATEGORIES_DATA.find(c => c.slug === slug);
    if (mainCategory) return mainCategory;

    for (const cat of RENT_CATEGORIES_DATA) {
        const sub = cat.subcategories?.find(s => s.slug === slug);
        if (sub) {
            const filteredItems = cat.items.filter(item =>
                (item.subcategorySlug === sub.slug) ||
                item.name.toLowerCase().includes(sub.title.toLowerCase()) ||
                item.tags.some(t => t.toLowerCase() === sub.title.toLowerCase()) ||
                item.productType?.toLowerCase() === sub.title.toLowerCase()
            );

            return {
                ...cat,
                title: sub.title,
                slug: sub.slug,
                description: `Rent ${sub.title} equipment. ${cat.description}`,
                items: filteredItems.length > 0 ? filteredItems : cat.items
            };
        }
    }
    return null;
};

export const getEquipmentBySlug = (slug: string): EquipmentItem | null => {
    for (const cat of RENT_CATEGORIES_DATA) {
        const item = cat.items.find(i => i.slug === slug);
        if (item) return item;
    }
    return null;
};
