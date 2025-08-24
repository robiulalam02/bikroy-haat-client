import React, { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AdminOrdersCharts() {
    const axiosSecure = useAxiosSecure();
    const [months, setMonths] = useState(12);
    const [successOnly, setSuccessOnly] = useState(true);
    const [tz, setTz] = useState("+06:00"); // Dhaka default

    const { data = [], isLoading, isError } = useQuery({
        queryKey: ["ordersPerMonth", months, successOnly],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/orders-per-month?months=${months}&successOnly=${successOnly}`);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

    const totals = useMemo(() => {
        const orders = data?.reduce((s, r) => s + (Number(r.orders) || 0), 0);
        const revenue = data?.reduce((s, r) => s + (Number(r.revenue) || 0), 0);
        const qty = data?.reduce((s, r) => s + (Number(r.qty) || 0), 0);
        return { orders, revenue, qty };
    }, [data]);

    const num = new Intl.NumberFormat();
    const bdt = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 });

    const nf = (n) => {
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
        if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
        return String(Math.round(n));
    };

    if (isLoading) return <p>Loading chart...</p>;
    if (isError) return <p>Failed to load chart data.</p>;

    return (
        <div className="w-full space-y-6">
            {/* Header / Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Orders & Revenue</h2>
                    <p className="text-sm text-muted-foreground">Summary of per month orders & revenue.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-2 py-1">
                        {[6, 12, 24].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMonths(m)}
                                className={`px-3 py-1.5 text-sm rounded-xl transition hover:bg-base-200 ${months === m ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-muted"}`}
                                aria-pressed={months === m}
                            >
                                Last {m}m
                            </button>
                        ))}
                    </div>
                    {/* <label className="flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-sm shadow-sm">
                        <input
                            type="checkbox"
                            className="accent-black"
                            checked={successOnly}
                            onChange={(e) => setSuccessOnly(e.target.checked)}
                        />
                        Success only
                    </label>
                    <select
                        value={tz}
                        onChange={(e) => setTz(e.target.value)}
                        className="rounded-2xl border px-3 py-1.5 text-sm shadow-sm"
                        title="Timezone used for month boundaries"
                    >
                        <option value="+06:00">GMT+06 Dhaka</option>
                        <option value="+00:00">UTC</option>
                        <option value="+05:30">GMT+05:30 IST</option>
                        <option value="+07:00">GMT+07</option>
                    </select> */}
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <KpiCard label="Total Orders" value={num.format(totals.orders)} />
                <KpiCard label="Total Revenue" value={bdt.format(totals.revenue)} />
                <KpiCard label="Total Qty" value={num.format(totals.qty)} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartCard title="Orders per Month" subtitle="Line trend (last few months)">
                    <ChartBody loading={isLoading} error={isError} empty={!isLoading && data.length === 0}>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" tickMargin={8} />
                                <YAxis tickFormatter={nf} width={48} />
                                <Tooltip formatter={(val, name) => [num.format(val), name]} labelFormatter={(l) => `Month: ${l}`} />
                                <Line type="monotone" dataKey="orders" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartBody>
                </ChartCard>

                <ChartCard title="Revenue per Month" subtitle="Sum of amount (BDT)">
                    <ChartBody loading={isLoading} error={isError} empty={!isLoading && data.length === 0}>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" tickMargin={8} />
                                <YAxis tickFormatter={(v) => nf(v)} width={64} />
                                <Tooltip formatter={(val) => bdt.format(val)} labelFormatter={(l) => `Month: ${l}`} />
                                <Bar dataKey="revenue" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartBody>
                </ChartCard>
            </div>
        </div>
    );
}

function KpiCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 p-4">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
    );
}

function ChartCard({ title, subtitle, children }) {
    return (
        <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3">
                <h3 className="text-lg font-semibold leading-tight">{title}</h3>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}

function ChartBody({ loading, error, empty, children }) {
    if (loading) {
        return (
            <div className="h-[280px] w-full animate-pulse rounded-xl bg-muted" />
        );
    }
    if (error) {
        return (
            <div className="flex h-[280px] items-center justify-center rounded-xl bg-red-50 text-sm text-red-700">
                Failed to load: {error}
            </div>
        );
    }
    if (empty) {
        return (
            <div className="flex h-[280px] items-center justify-center rounded-xl bg-muted/40 text-sm text-muted-foreground">
                No data in selected range
            </div>
        );
    }
    return <div className="h-[280px] w-full">{children}</div>;
}
