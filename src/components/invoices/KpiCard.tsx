import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
    title: string;
    value: React.ReactNode;
    description: string;
    valueClassName?: string;
    descriptionClassName?: string;
}

export function KpiCard({
    title,
    value,
    description,
    valueClassName = "text-foreground",
    descriptionClassName = "text-muted-foreground"
}: KpiCardProps) {
    return (
        <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden group">
            <CardContent className="p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
                <h2 className={`text-3xl font-black tracking-tight ${valueClassName}`}>{value}</h2>
                <div className={`mt-4 flex items-center text-sm font-medium ${descriptionClassName}`}>
                    <span>{description}</span>
                </div>
            </CardContent>
        </Card>
    );
}
