"use client";

import React, { useState } from "react";
import {
    CreditCard,
    Download,
    FileText,
    ArrowRight,
    Search,
    AlertCircle,
    CheckCircle2,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { KpiCard } from "@/components/invoices/KpiCard";

import { INVOICES_DATA } from "@/data/invoices";

export default function Invoices() {
    const [searchTerm, setSearchTerm] = useState("");

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Paid</Badge>;
            case "Pending":
                return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
            case "Overdue":
                return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"><AlertCircle className="w-3 h-3 mr-1" /> Overdue</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const filterInvoices = (statusFilter: string) => {
        return INVOICES_DATA.filter(inv => {
            const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inv.project.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    };

    const formatCurrency = (amount: number) => `SAR ${amount.toLocaleString()}`;

    // Compute dynamic KPI values
    const totalOutstanding = INVOICES_DATA.filter(inv => inv.status !== "Paid").reduce((acc, curr) => acc + curr.amount, 0);
    const pendingCount = INVOICES_DATA.filter(inv => inv.status === "Pending").length;

    const overdueAmount = INVOICES_DATA.filter(inv => inv.status === "Overdue").reduce((acc, curr) => acc + curr.amount, 0);
    const overdueCount = INVOICES_DATA.filter(inv => inv.status === "Overdue").length;

    const paidInvoices = INVOICES_DATA.filter(inv => inv.status === "Paid");
    const lastPaymentAmount = paidInvoices.length > 0 ? paidInvoices[0].amount : 0;
    const lastPaymentDate = paidInvoices.length > 0 ? paidInvoices[0].date : "N/A";

    return (
        <div className="w-full p-2">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
                <div>
                    <h1 className="text-xl md:text-2xl font-black tracking-tight text-foreground uppercase mb-2 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" />
                        Invoices & Payments
                    </h1>
                    <p className="text-muted-foreground font-medium md:text-lg">
                        View transactions, manage payments, and download statements.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="font-bold uppercase tracking-widest text-xs h-12 px-6 rounded-xl border-border/50 hover:bg-muted">
                        <Download className="w-4 h-4 mr-2" />
                        Statement
                    </Button>
                    <Button className="font-bold uppercase tracking-widest text-xs h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Make Payment
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <KpiCard
                    title="Total Outstanding"
                    value={formatCurrency(totalOutstanding)}
                    description={`${pendingCount} Invoices Pending`}
                    descriptionClassName="text-amber-500"
                />
                <KpiCard
                    title="Overdue Amount"
                    value={formatCurrency(overdueAmount)}
                    valueClassName="text-red-500"
                    description={`${overdueCount} Invoice${overdueCount !== 1 ? 's' : ''} Past Due`}
                    descriptionClassName="text-red-500/80"
                />
                <KpiCard
                    title="Last Payment"
                    value={formatCurrency(lastPaymentAmount)}
                    description={`Received on ${lastPaymentDate}`}
                    descriptionClassName="text-emerald-500"
                />
            </div>

            {/* Invoices List Section */}
            <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
                <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <Tabs defaultValue="All" className="w-full md:w-auto">
                        <TabsList className="h-12 bg-muted/50 p-1 rounded-xl">
                            <TabsTrigger value="All" className="rounded-lg font-bold uppercase tracking-wide text-xs px-6 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm">All</TabsTrigger>
                            <TabsTrigger value="Pending" className="rounded-lg font-bold uppercase tracking-wide text-xs px-6 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Pending</TabsTrigger>
                            <TabsTrigger value="Paid" className="rounded-lg font-bold uppercase tracking-wide text-xs px-6 h-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Paid</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search invoices or projects..."
                            className="h-12 pl-10 rounded-xl bg-background border-border/50 focus-visible:ring-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Shared Table View across all tabs using conditional rendering to keep it clean */}
                <CardContent className="p-0 overflow-x-auto">
                    <Tabs defaultValue="All" className="w-full">
                        {["All", "Pending", "Paid"].map(tabStatus => (
                            <TabsContent key={tabStatus} value={tabStatus} className="m-0 border-none outline-none data-[state=active]:block data-[state=inactive]:hidden">
                                <Table>
                                    <TableHeader className="bg-muted/30">
                                        <TableRow className="hover:bg-transparent border-border/50">
                                            <TableHead className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-muted-foreground whitespace-nowrap">Invoice #</TableHead>
                                            <TableHead className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-muted-foreground whitespace-nowrap">Project</TableHead>
                                            <TableHead className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-muted-foreground whitespace-nowrap">Issue Date</TableHead>
                                            <TableHead className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-muted-foreground whitespace-nowrap">Due Date</TableHead>
                                            <TableHead className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-muted-foreground whitespace-nowrap">Amount</TableHead>
                                            <TableHead className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-muted-foreground whitespace-nowrap">Status</TableHead>
                                            <TableHead className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-muted-foreground text-right whitespace-nowrap">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filterInvoices(tabStatus).map((invoice) => (
                                            <TableRow key={invoice.id} className="hover:bg-muted/30 border-border/50 transition-colors group">
                                                <TableCell className="py-4 px-6 font-bold whitespace-nowrap">{invoice.id}</TableCell>
                                                <TableCell className="py-4 px-6 font-medium text-muted-foreground whitespace-nowrap">{invoice.project}</TableCell>
                                                <TableCell className="py-4 px-6 text-sm whitespace-nowrap">{invoice.date}</TableCell>
                                                <TableCell className="py-4 px-6 text-sm whitespace-nowrap">{invoice.dueDate}</TableCell>
                                                <TableCell className="py-4 px-6 font-bold whitespace-nowrap">{formatCurrency(invoice.amount)}</TableCell>
                                                <TableCell className="py-4 px-6 whitespace-nowrap">
                                                    {getStatusBadge(invoice.status)}
                                                </TableCell>
                                                <TableCell className="py-4 px-6 text-right whitespace-nowrap">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted" title="Download PDF">
                                                            <Download className="w-4 h-4 text-muted-foreground" />
                                                        </Button>
                                                        {invoice.status !== "Paid" && (
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary" title="Pay Now">
                                                                <ArrowRight className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filterInvoices(tabStatus).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="py-12 text-center text-muted-foreground font-medium">
                                                    No invoices found matching your criteria.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
