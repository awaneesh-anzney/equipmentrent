import { AuthGuard } from "@/components/auth/AuthGuard";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
    return <AuthGuard>{children}</AuthGuard>;
}
