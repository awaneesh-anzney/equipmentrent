
export interface EquipmentItem {
    id: string;
    name: string;
    slug: string; // Added slug for routing
    image: string;
    tags: string[];
    category: string;
    subcategorySlug?: string; // To help with breadcrumbs
    productType?: string;
    pricing?: {
        day: string;
        week: string;
        fourWeek: string;
    };
    description?: string; // Detailed description for product page
    specs?: { [key: string]: string }; // For "Additional Specs"
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

export const RENT_CATEGORIES_DATA: EquipmentCategory[] = [
    {
        id: "aerial",
        title: "Aerial Work Platforms",
        slug: "aerial-work-platforms",
        description: "Rent high-quality Aerial Work Platforms (AWPs) from EquipmentShare for construction, maintenance, or elevated projects.",
        subcategories: [
            { title: "All Aerial Work Platforms", slug: "aerial-work-platforms" },
            { title: "Articulating Boom Lift", slug: "articulating-boom-lift" },
            { title: "Atrium Lift", slug: "atrium-lift" },
            { title: "Electric Boom Lift", slug: "electric-boom-lift" },
            { title: "Electric Scissor Lift", slug: "electric-scissor-lift" },
            { title: "Push Around One Man Lift", slug: "push-around-one-man-lift" },
            { title: "Rough Terrain Scissor Lift", slug: "rough-terrain-scissor-lift" },
            { title: "Telescopic Boom Lift", slug: "telescopic-boom-lift" },
            { title: "Towable Boom Lift", slug: "towable-boom-lift" },
        ],
        items: [
            {
                id: "atrium-1",
                name: "ATRIUM LIFT, 60' - 65'",
                slug: "atrium-lift-60-65",
                image: "https://images.unsplash.com/photo-1581094794329-cd194304611b?q=80&w=2940&auto=format&fit=crop", // Placeholder
                tags: ["ATRIUM LIFT"],
                category: "Aerial Work Platforms",
                subcategorySlug: "atrium-lift",
                productType: "ATRIUM LIFT",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                },
                description: `Atrium (spider) lifts in the 60 to 65 foot class are built for access in tight, hard-to-reach areas. Stowed widths typically fit through standard double doors, and the tracked undercarriage provides low ground pressure and non-marking travel on finished floors. Outriggers level the machine on uneven surfaces for safe setup in lobbies, atriums, and other confined spaces.\n\nIn this range, platform heights are about 60—65 feet with working heights generally in the high-60s, and horizontal outreach commonly around the mid-20s to low-30s feet. Many units run on electric or bi-energy power for indoor work with the option to operate outdoors when needed. Rent a 60—65 ft atrium lift from an EquipmentShare location near you.`
            },
            {
                id: "aerial-1",
                name: "ELECTRIC SCISSOR LIFT, 19' NARROW",
                slug: "electric-scissor-lift-19-narrow",
                image: "https://images.unsplash.com/photo-1581094794329-cd194304611b?q=80&w=2940&auto=format&fit=crop",
                tags: ["ELECTRIC SCISSOR LIFT"],
                category: "Aerial Work Platforms",
                subcategorySlug: "electric-scissor-lift",
                productType: "ELECTRIC SCISSOR LIFT",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                }
            },
            {
                id: "aerial-2",
                name: "VERTICAL MAST LIFT SINGLE OPERATOR, 20'",
                slug: "vertical-mast-lift-20",
                image: "https://images.unsplash.com/photo-1629804558552-e6176d6537eb?q=80&w=2940&auto=format&fit=crop",
                tags: ["VERTICAL MAST LIFT"],
                category: "Aerial Work Platforms",
                productType: "VERTICAL MAST LIFT",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                }
            },
        ],
    },
    {
        id: "ag-landscaping",
        title: "Agriculture & Landscaping",
        slug: "agriculture-landscaping",
        description: "EquipmentRent offers a wide selection of agriculture and landscaping rentals.",
        subcategories: [
            { title: "All Agriculture & Landscaping", slug: "agriculture-landscaping" },
            { title: "Utility Vehicle", slug: "utility-vehicle" }
        ],
        items: [
            {
                id: "uv-1",
                name: "4 WHEEL BURDEN CARRIER, ELECTRIC",
                slug: "4-wheel-burden-carrier-electric",
                image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2000&auto=format&fit=crop",
                tags: ["UTILITY VEHICLE"],
                category: "Agriculture & Landscaping",
                subcategorySlug: "utility-vehicle",
                productType: "Utility Vehicle",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                }
            },
        ]
    },
    {
        id: "earthmoving",
        title: "Earthmoving",
        slug: "earthmoving",
        description: "Move the earth with power and precision.",
        subcategories: [
            { title: "All Earthmoving", slug: "earthmoving" },
            { title: "Excavators", slug: "excavators" }
        ],
        items: [
            {
                id: "earth-1",
                name: "MINI EXCAVATOR, 3.5 TON",
                slug: "mini-excavator-3-5-ton",
                image: "https://images.unsplash.com/photo-1578335964645-56d11f185786?q=80&w=2940&auto=format&fit=crop",
                tags: ["MINI EXCAVATOR"],
                category: "Earthmoving",
                subcategorySlug: "excavators",
                productType: "Mini Excavator",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                }
            },
        ],
    },
];

export const EQUIPMENT_SECTIONS = RENT_CATEGORIES_DATA;

// Helper to find category data by slug
export const getCategoryData = (slug: string) => {
    // 1. Check main categories
    const mainCategory = RENT_CATEGORIES_DATA.find(c => c.slug === slug);
    if (mainCategory) return mainCategory;

    // 2. Check if it matches a subcategory
    for (const cat of RENT_CATEGORIES_DATA) {
        const sub = cat.subcategories?.find(s => s.slug === slug);
        if (sub) {
            // Found a subcategory!
            // In a real app, filtering logic would be more robust
            const filteredItems = cat.items.filter(item =>
                // Match by explicitly assigned subcategory slug if available
                (item.subcategorySlug === sub.slug) ||
                // Or fuzzy match name/tags
                item.name.toLowerCase().includes(sub.title.toLowerCase()) ||
                item.tags.some(t => t.toLowerCase() === sub.title.toLowerCase()) ||
                item.productType?.toLowerCase() === sub.title.toLowerCase()
            );

            return {
                ...cat,
                title: sub.title,
                slug: sub.slug,
                description: `Rent ${sub.title} equipment. ${cat.description}`,
                items: filteredItems.length > 0 ? filteredItems : cat.items // Fallback to all if empty for demo
            };
        }
    }

    return null;
};

// Helper to find equipment by slug
export const getEquipmentBySlug = (slug: string): EquipmentItem | null => {
    for (const cat of RENT_CATEGORIES_DATA) {
        const item = cat.items.find(i => i.slug === slug);
        if (item) return item;
    }
    return null;
};
