
export interface EquipmentItem {
    id: string;
    name: string;
    image: string;
    tags: string[];
    category: string;
}

export interface EquipmentCategory {
    id: string;
    title: string;
    slug: string;
    items: EquipmentItem[];
}

export const RENT_CATEGORIES = [
    "Aerial Work Platforms",
    "Agriculture & Landscaping",
    "Attachments",
    "Climate Control",
    "Compaction",
    "Compressed Air",
    "Concrete & Masonry",
    "Earthmoving",
    "Forklifts & Material Handling",
    "Ground Protection",
    "Industrial Tooling",
    "Ladders & Scaffolding",
    "Lighting and Security",
    "Power Solutions",
    "Power Tools & Small Equipment",
    "Safety, Testing & Communication",
    "Storage Solutions & Containers",
    "Surface Preparation & Cleaning",
    "Vehicles & Trailers",
    "Welding, Cutting & Pipe Fabrication",
];

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
