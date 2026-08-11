import React from "react";
import { ChevronRight } from "lucide-react";

export default function PageHeader({ title, crumbs = [], actions }) {
	return (
		<div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 className="text-xl font-bold text-gray-900">{title}</h1>
				<div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-gray-500">
					{crumbs.map((crumb, i) => (
						<span key={crumb} className="flex items-center gap-1">
							{i > 0 && <ChevronRight size={12} className="text-gray-400" />}
							<span
								className={
									i === crumbs.length - 1
										? "font-medium text-indigo-600"
										: "text-gray-500"
								}
							>
								{crumb}
							</span>
						</span>
					))}
				</div>
			</div>
			{actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
		</div>
	);
}
