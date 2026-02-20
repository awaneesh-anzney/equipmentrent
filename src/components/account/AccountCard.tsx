import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AccountCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    external?: boolean;
}

export function AccountCard({
    title,
    description,
    icon: Icon,
    href,
    external,
}: AccountCardProps) {
    return (
        <Link
            href={href}
            className="group flex flex-col justify-between rounded-lg border bg-card p-6 shadow-xs transition-all hover:shadow-md hover:border-primary/50"
        >
            <div className="space-y-4">
                <Icon className="h-8 w-8 text-foreground" strokeWidth={1.5} />
                <div className="space-y-2">
                    <h3 className="font-bold uppercase tracking-tight flex items-center gap-2">
                        {title}
                        {external && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
