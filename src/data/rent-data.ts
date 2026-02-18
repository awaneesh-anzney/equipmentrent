
export interface EquipmentItem {
    id: string;
    name: string;
    image: string;
    tags: string[];
    category: string;
    productType?: string;
    pricing?: {
        day: string;
        week: string;
        fourWeek: string;
    };
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
        description: "Rent high-quality Aerial Work Platforms (AWPs) from EquipmentShare for construction, maintenance, or elevated projects. Our inventory features scissor lifts, boom lifts, telescopic handlers, and more. Available nationwide, trust EquipmentShare rental for reliable performance from top brands like JLG, Genie, and Skytrack.",
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
                id: "aerial-1",
                name: "ELECTRIC SCISSOR LIFT, 19' NARROW",
                image: "https://images.unsplash.com/photo-1581094794329-cd194304611b?q=80&w=2940&auto=format&fit=crop",
                tags: ["ELECTRIC SCISSOR LIFT"],
                category: "Aerial Work Platforms",
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
            {
                id: "aerial-3",
                name: "ARTICULATING BOOM LIFT, 45'",
                image: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?q=80&w=2836&auto=format&fit=crop",
                tags: ["ARTICULATING BOOM LIFT"],
                category: "Aerial Work Platforms",
                productType: "ARTICULATING BOOM LIFT",
                pricing: {
                    day: "$-",
                    week: "$-",
                    fourWeek: "$-",
                }
            }
        ],
    },
    {
        id: "ag-landscaping",
        title: "Agriculture & Landscaping",
        slug: "agriculture-landscaping",
        description: "EquipmentRent offers a wide selection of agriculture and landscaping rentals to help you get the job done. From powerful stump grinders and chippers for effective debris management, to versatile machines for forestry and land clearing, our fleet is built for performance and reliability.",
        subcategories: [
            { title: "All Agriculture & Landscaping", slug: "agriculture-landscaping" },
            { title: "Landscaping Power Tool", slug: "landscaping-power-tool" },
            { title: "Stump Grinder and Chipper", slug: "stump-grinder-and-chipper" },
            { title: "Utility Vehicle", slug: "utility-vehicle" }
        ],
        items: [
            {
                id: "uv-1",
                name: "4 WHEEL BURDEN CARRIER, ELECTRIC",
                image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2000&auto=format&fit=crop",
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
                image: "https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?q=80&w=2000&auto=format&fit=crop",
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
        description: "Move the earth with power and precision.",
        subcategories: [
            { title: "All Earthmoving", slug: "earthmoving" },
            { title: "Excavators", slug: "excavators" },
            { title: "Dozers", slug: "dozers" }
        ],
        items: [
            {
                id: "earth-1",
                name: "MINI EXCAVATOR, 3.5 TON",
                image: "https://images.unsplash.com/photo-1578335964645-56d11f185786?q=80&w=2940&auto=format&fit=crop",
                tags: ["MINI EXCAVATOR"],
                category: "Earthmoving",
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

// Helper to find category data by slug (checking both main categories and subcategories)
// For subcategories, we might need to filter items or return generic pages if we don't have specific data
export const getCategoryData = (slug: string) => {
    // 1. Check main categories
    const mainCategory = RENT_CATEGORIES_DATA.find(c => c.slug === slug);
    if (mainCategory) return mainCategory;

    // 2. Check if it matches a subcategory
    // For now, if it's a subcategory, we'll return a filtered version of the parent category
    // or just the parent category with a filtered title/items if we had real data.
    // In this dummy implementation, I'll simulate "filtering" by returning the parent but maybe changing the title?
    // Or ideally, we should have specific data items tagged with subcategories.

    for (const cat of RENT_CATEGORIES_DATA) {
        const sub = cat.subcategories?.find(s => s.slug === slug);
        if (sub) {
            // Found a subcategory!
            // Let's filter items that match this subcategory (mocking the match logic)
            // In a real app we'd filter items by `productType` or `tags` or `subcategory_id`
            // For this dummy data, I'll try to fuzzy match items or return all items if none match

            // Simple mapping for demo:
            const filteredItems = cat.items.filter(item =>
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
