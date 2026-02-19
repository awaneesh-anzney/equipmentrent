// ================= TYPES =================

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


// ================= PRICE HELPER =================

export const getLocationAdjustedPrice = (basePrice: number, location: string): number => {
    if (!location || location === "Set Location For Accurate Pricing") return basePrice;

    let hash = 0;
    for (let i = 0; i < location.length; i++) {
        hash = location.charCodeAt(i) + ((hash << 5) - hash);
    }

    const variance = (hash % 25) - 10; // -10% to +15%
    const factor = 1 + (variance / 100);

    return Math.round(basePrice * factor);
};


// ================= DATA =================

export const RENT_CATEGORIES_DATA: EquipmentCategory[] = [
    {
        id: "earthmoving",
        title: "Earthmoving Machinery",
        slug: "earthmoving-machinery",
        description: "Heavy-duty earthmoving equipment for construction and mining.",
        subcategories: [
            { title: "JCBs / Backhoes", slug: "jcbs-backhoes" },
            { title: "Poclains / Excavators", slug: "poclains-excavators" },
            { title: "Dozers", slug: "dozers" },
            { title: "Loaders", slug: "loaders" },
        ],
        items: [
            {
                id: "jcb-1",
                name: "JCB 3DX Backhoe Loader",
                slug: "jcb-3dx-backhoe",
                image: "/jcb-3dx-plus-backhoe-loader.jpg",
                tags: ["JCB", "BACKHOE"],
                category: "Earthmoving Machinery",
                subcategorySlug: "jcbs-backhoes",
                productType: "Backhoe Loader",
                basePrice: { day: 900, week: 3000, fourWeek: 9500 },
                description: "Versatile machine for trenching, digging and loading.",
                specs: {
                    Engine: "76 HP",
                    Weight: "7600 kg",
                    Bucket: "1.1 m³"
                }
            },
            {
                id: "excavator-1",
                name: "Tata Hitachi EX200 Excavator",
                slug: "tata-ex200",
                image: "/tata-hitachi-ex200-excavator.jpg",
                tags: ["EXCAVATOR"],
                category: "Earthmoving Machinery",
                subcategorySlug: "poclains-excavators",
                productType: "Hydraulic Excavator",
                basePrice: { day: 1400, week: 4800, fourWeek: 15000 },
                description: "20 Ton excavator ideal for heavy excavation.",
                specs: {
                    Engine: "133 HP",
                    Weight: "19.8 Ton"
                }
            },
            {
                id: "dozer-1",
                name: "CAT D6 Crawler Dozer",
                slug: "cat-d6-dozer",
                image: "/CAT-D6-Crawler-Dozer.jpeg",
                tags: ["DOZER"],
                category: "Earthmoving Machinery",
                subcategorySlug: "dozers",
                productType: "Crawler Dozer",
                basePrice: { day: 1800, week: 6000, fourWeek: 19000 },
                description: "Used for grading and land clearing."
            },
            {
                id: "loader-1",
                name: "Komatsu WA380 Wheel Loader",
                slug: "komatsu-wa380",
                image: "/Komatsu-WA380-Wheel-Loader.jpeg",
                tags: ["LOADER"],
                category: "Earthmoving Machinery",
                subcategorySlug: "loaders",
                productType: "Wheel Loader",
                basePrice: { day: 1100, week: 3800, fourWeek: 12000 },
                description: "Material handling and aggregate loading machine."
            }
        ]
    },

    {
        id: "cranes",
        title: "Cranes & Lifting",
        slug: "cranes-lifting",
        description: "Cranes for industrial and infrastructure lifting.",
        subcategories: [
            { title: "Small Cranes", slug: "small-cranes" },
            { title: "Large Cranes", slug: "large-cranes" },
        ],
        items: [
            {
                id: "hydra-1",
                name: "ACE Hydra 12 Ton Crane",
                slug: "ace-hydra-12xw",
                image: "/ACE-Hydra-12-Ton-Crane.jpg",
                tags: ["HYDRA"],
                category: "Cranes & Lifting",
                subcategorySlug: "small-cranes",
                productType: "Pick & Carry Crane",
                basePrice: { day: 2000, week: 7500, fourWeek: 22000 },
                description: "Common site lifting crane used across India."
            },
            {
                id: "crane-large",
                name: "Liebherr 100 Ton Crane",
                slug: "liebherr-100t",
                image: "/Liebherr-100-Ton-Crane.jpeg",
                tags: ["CRANE", "HEAVY"],
                category: "Cranes & Lifting",
                subcategorySlug: "large-cranes",
                productType: "All Terrain Crane",
                basePrice: { day: 5500, week: 20000, fourWeek: 65000 },
                description: "Heavy infrastructure lifting crane."
            }
        ]
    },

    {
        id: "trucks",
        title: "Trucks & Transportation",
        slug: "trucks-transportation",
        description: "Transport vehicles for material movement.",
        subcategories: [
            { title: "Standard Trucks", slug: "standard-trucks" },
            { title: "Trailers", slug: "trailers" },
        ],
        items: [
            {
                id: "truck-1",
                name: "Tata Signa Dump Truck",
                slug: "tata-dump-truck",
                image: "/Tata-Signa-Dump-Truck.jpg",
                tags: ["DUMP"],
                category: "Trucks & Transportation",
                subcategorySlug: "standard-trucks",
                productType: "Dump Truck",
                basePrice: { day: 700, week: 2500, fourWeek: 8000 },
                description: "Used for sand and aggregate transport."
            },
            {
                id: "flatbed-1",
                name: "Ashok Leyland Flatbed Truck",
                slug: "ashok-leyland-flatbed",
                image: "/Ashok-Leyland-Flatbed-Truck.jpg",
                tags: ["FLATBED"],
                category: "Trucks & Transportation",
                subcategorySlug: "standard-trucks",
                productType: "Flatbed Truck",
                basePrice: { day: 800, week: 2800, fourWeek: 9000 }
            }
        ]
    }
];


// ================= EXPORT HELPERS =================

export const EQUIPMENT_SECTIONS = RENT_CATEGORIES_DATA;

export const getCategoryData = (slug: string) => {
    const mainCategory = RENT_CATEGORIES_DATA.find(c => c.slug === slug);
    if (mainCategory) return mainCategory;

    for (const cat of RENT_CATEGORIES_DATA) {
        const sub = cat.subcategories?.find(s => s.slug === slug);
        if (sub) {
            const filteredItems = cat.items.filter(item =>
                item.subcategorySlug === sub.slug
            );

            return {
                ...cat,
                title: sub.title,
                slug: sub.slug,
                description: `Rent ${sub.title}. ${cat.description}`,
                items: filteredItems.length ? filteredItems : cat.items
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
