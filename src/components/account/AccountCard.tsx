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
            className="group flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 md:p-8 shadow-sm transition-all hover:bg-muted/10 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50"
        >
            <div className="space-y-6">
                <div className="w-16 h-16 bg-muted/20 border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors flex items-center justify-center rounded-2xl">
                    <Icon className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
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
