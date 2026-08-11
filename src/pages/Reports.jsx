import React from "react";
import { PieChart } from "lucide-react";
import PagePlaceholder from "../components/PagePlaceholder/PagePlaceholder";

export default function Reports() {
	return (
		<PagePlaceholder
			title="Reports"
			crumbs={['Reports']}
			icon={PieChart}
			description="Cross-module analytics and exportable reports will be built here."

		/>
	);
}
