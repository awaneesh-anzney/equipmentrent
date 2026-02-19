"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"; // Assuming sonner is installed

export default function SignUp() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Here you would typically make an API call to your backend
            // const response = await axios.post('/api/auth/register', formData);

            toast.success("Account created successfully!");
            router.push("/login"); // Redirect to login
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <Link
                href="/"
                className="absolute -top-12 left-0 flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            <Card className="w-full border-white/20 shadow-2xl backdrop-blur-md bg-white/90 dark:bg-black/90">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-primary">Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-9 bg-background/50 border-input/60 focus:bg-background transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-9 bg-background/50 border-input/60 focus:bg-background transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium leading-none">Phone Number</label>
                            <div className="relative">
                                <div className="absolute left-3 top-2.5 h-4 w-4 flex items-center justify-center text-muted-foreground font-semibold text-xs">Ph</div>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-9 bg-background/50 border-input/60 focus:bg-background transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-9 pr-9 bg-background/50 border-input/60 focus:bg-background transition-all"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">Toggle password visibility</span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-9 bg-background/50 border-input/60 focus:bg-background transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <Button className="w-full font-bold shadow-md" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground text-center w-full">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline font-bold">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
