
import { BarChart3 } from "lucide-react";
import PagePlaceholder from "../../components/PagePlaceholder/PagePlaceholder";

import React, { useMemo, useState } from "react";
import {
	Download,
	Calendar,
	Search,
	ChevronDown,
	ArrowUpRight,
	ArrowDownRight,
	FileText,
	RefreshCw,
	Flag,
} from "lucide-react";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";

const trend = [
	{ month: "Mar", disbursed: 812000 },
	{ month: "Apr", disbursed: 940000 },
	{ month: "May", disbursed: 875000 },
	{ month: "Jun", disbursed: 1080000 },
	{ month: "Jul", disbursed: 1155000 },
	{ month: "Aug", disbursed: 1240000 },
];

const loans = [
	{ id: "LN-2026-894", name: "Rohan Deshmukh", account: "AC-77213", principal: 500000, disbursed: 500000, status: "Disbursed", channel: "Direct ACH", date: "28-08-2026" },
	{ id: "LN-2026-893", name: "Anita Fernandes", account: "AC-77198", principal: 320000, disbursed: 0, status: "Pending Bank", channel: "Wire Transfer", date: "27-08-2026" },
	{ id: "LN-2026-891", name: "Karthik Iyer", account: "AC-77150", principal: 1250000, disbursed: 1250000, status: "Disbursed", channel: "Direct ACH", date: "26-08-2026" },
	{ id: "LN-2026-887", name: "Sneha Kulkarni", account: "AC-77042", principal: 180000, disbursed: 0, status: "Failed", channel: "Cheque", date: "25-08-2026" },
	{ id: "LN-2026-885", name: "Vikram Nair", account: "AC-76991", principal: 640000, disbursed: 640000, status: "Disbursed", channel: "Wire Transfer", date: "24-08-2026" },
	{ id: "LN-2026-882", name: "Priyanka Rao", account: "AC-76930", principal: 275000, disbursed: 0, status: "Pending Bank", channel: "Direct ACH", date: "23-08-2026" },
];

const statusStyle = {
	Disbursed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
	"Pending Bank": "bg-amber-50 text-amber-700 ring-amber-600/20",
	Failed: "bg-red-50 text-red-700 ring-red-600/20",
};

const currency = (n) =>
	n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function KpiCard({ label, value, delta, positive, accent }) {
	return (
		<div className={`bg-white rounded-lg border border-slate-200 border-l-4 ${accent} p-4`}>
			<p className="text-xs font-medium text-slate-500">{label}</p>
			<p className="mt-1.5 font-mono text-2xl text-slate-900 tracking-tight">{value}</p>
			{delta && (
				<div className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${positive ? "text-emerald-600" : "text-amber-600"}`}>
					{positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
					{delta}
				</div>
			)}
		</div>
	);
}

export default function RMSReports() {
	const [range, setRange] = useState("This month");
	const [stage, setStage] = useState("All stages");
	const [query, setQuery] = useState("");

	const filtered = useMemo(
		() =>
			loans.filter(
				(l) =>
					(stage === "All stages" || l.status === stage) &&
					(l.id.toLowerCase().includes(query.toLowerCase()) ||
						l.name.toLowerCase().includes(query.toLowerCase()))
			),
		[stage, query]
	);


	return (
		<div className="min-h-full bg-slate-50 p-6">
			{/* Header */}
			<div className="flex flex-wrap items-start justify-between gap-4 mb-6">
				<div>
					<nav className="text-xs text-slate-400 mb-1">RMS / RMS Reports</nav>
					<h1 className="text-xl font-semibold text-slate-900">Disbursement &amp; loan status report</h1>
					<p className="text-xs text-slate-400 mt-1">Data updated 3 minutes ago</p>
				</div>
				<div className="flex items-center gap-2">
					<button className="flex items-center gap-2 h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
						<Calendar size={15} className="text-slate-400" />
						{range}
						<ChevronDown size={14} className="text-slate-400" />
					</button>
					<button className="flex items-center gap-2 h-9 px-3 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700">
						<Download size={15} />
						Export
					</button>
				</div>
			</div>

			{/* KPI row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<KpiCard label="Total disbursed" value={currency(1240000)} delta="4.2% vs last week" positive accent="border-l-emerald-500" />
				<KpiCard label="Pending disbursals" value={currency(310000)} delta="Awaiting bank release" accent="border-l-amber-500" />
				<KpiCard label="Active loan accounts" value="482" delta="12 new this week" positive accent="border-l-indigo-500" />
				<KpiCard label="Avg. processing time" value="1.8 days" delta="0.3 days faster" positive accent="border-l-slate-400" />
			</div>

			{/* Trend chart */}
			<div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-sm font-medium text-slate-700">Disbursement trend, last 6 months</h2>
				</div>
				<div style={{ height: 220 }}>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={trend} margin={{ left: -10 }}>
							<CartesianGrid vertical={false} stroke="#EEF2F7" />
							<XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
							<YAxis
								tick={{ fontSize: 12, fill: "#94A3B8" }}
								axisLine={false}
								tickLine={false}
								tickFormatter={(v) => `${v / 100000}L`}
							/>
							<Tooltip
								formatter={(v) => currency(v)}
								contentStyle={{ borderRadius: 8, borderColor: "#E2E8F0", fontSize: 13 }}
							/>
							<Bar dataKey="disbursed" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={36} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Filter bar */}
			<div className="bg-white rounded-lg border border-slate-200 p-3 mb-3 flex flex-wrap gap-2 items-center">
				<div className="relative flex-1 min-w-[200px]">
					<Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search loan ID or borrower"
						className="w-full h-9 pl-8 pr-3 rounded-md border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
					/>
				</div>
				<select
					value={stage}
					onChange={(e) => setStage(e.target.value)}
					className="h-9 px-3 rounded-md border border-slate-200 text-sm text-slate-700 bg-white"
				>
					{["All stages", "Disbursed", "Pending Bank", "Failed"].map((s) => (
						<option key={s}>{s}</option>
					))}
				</select>
				<select className="h-9 px-3 rounded-md border border-slate-200 text-sm text-slate-700 bg-white">
					<option>All products</option>
					<option>Personal loan</option>
					<option>SME business capital</option>
					<option>Mortgage</option>
				</select>
				<select className="h-9 px-3 rounded-md border border-slate-200 text-sm text-slate-700 bg-white">
					<option>All channels</option>
					<option>Direct ACH</option>
					<option>Wire transfer</option>
					<option>Cheque</option>
				</select>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="bg-slate-50 text-left text-xs font-medium text-slate-500 border-b border-slate-200">
								<th className="px-4 py-2.5">Loan ID</th>
								<th className="px-4 py-2.5">Borrower</th>
								<th className="px-4 py-2.5 text-right">Principal</th>
								<th className="px-4 py-2.5 text-right">Disbursed</th>
								<th className="px-4 py-2.5 text-center">Status</th>
								<th className="px-4 py-2.5">Release date</th>
								<th className="px-4 py-2.5 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filtered.map((l, i) => (
								<tr key={l.id} className={`border-b border-slate-100 last:border-0 ${i % 2 ? "bg-slate-50/50" : "bg-white"}`}>
									<td className="px-4 py-3 font-mono text-indigo-600 text-[13px]">{l.id}</td>
									<td className="px-4 py-3">
										<div className="text-slate-800">{l.name}</div>
										<div className="text-xs text-slate-400">{l.account}</div>
									</td>
									<td className="px-4 py-3 text-right font-mono text-slate-700">{currency(l.principal)}</td>
									<td className="px-4 py-3 text-right font-mono text-slate-700">
										{l.disbursed ? currency(l.disbursed) : "—"}
									</td>
									<td className="px-4 py-3 text-center">
										<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusStyle[l.status]}`}>
											{l.status}
										</span>
									</td>
									<td className="px-4 py-3 text-slate-500 font-mono text-[13px]">{l.date}</td>
									<td className="px-4 py-3">
										<div className="flex items-center justify-end gap-2 text-slate-400">
											<button title="View agreement" className="hover:text-indigo-600"><FileText size={15} /></button>
											<button title="Retry transfer" className="hover:text-indigo-600"><RefreshCw size={15} /></button>
											<button title="Flag issue" className="hover:text-red-600"><Flag size={15} /></button>
										</div>
									</td>
								</tr>
							))}
							{filtered.length === 0 && (
								<tr>
									<td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
										No loans match this search.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 text-xs text-slate-500">
					<span>Showing {filtered.length} of {loans.length} records</span>
					<div className="flex items-center gap-2">
						<select className="h-7 px-2 rounded-md border border-slate-200 text-xs bg-white">
							<option>10 / page</option>
							<option>25 / page</option>
							<option>50 / page</option>
						</select>
						<button className="h-7 px-2 rounded-md border border-slate-200 hover:bg-slate-50">Prev</button>
						<button className="h-7 px-2 rounded-md border border-slate-200 hover:bg-slate-50">Next</button>
					</div>
				</div>
			</div>
		</div>
	);
}
