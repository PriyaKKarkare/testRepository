import React from "react";
import { Menu, Bell, Search } from "lucide-react";

export default function Topbar({ onMenuClick }) {
	return (
		<header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur lg:hidden">
			<button
				onClick={onMenuClick}
				className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
			>
				<Menu size={20} />
			</button>
			<div className="flex items-center gap-1.5">
				<div className="grid h-7 w-7 place-items-center rounded-md bg-indigo-600 text-xs font-bold text-white">
					F
				</div>
				<span className="text-sm font-semibold text-slate-800">FinBowl</span>
			</div>
			<div className="flex items-center gap-2">
				<button className="rounded-md p-2 text-slate-500 hover:bg-slate-100">
					<Search size={18} />
				</button>
				<button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100">
					<Bell size={18} />
					<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
				</button>
			</div>
		</header>
	);
}
