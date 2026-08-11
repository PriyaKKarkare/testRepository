import React from "react";
import { BarChart3 } from "lucide-react";
import PagePlaceholder from "../../components/PagePlaceholder/PagePlaceholder";

export default function RMSReports() {
	return (
		<PagePlaceholder
			title="RMS Reports"
			crumbs={['RMS', 'RMS Reports']}
			icon={BarChart3}
			description="Loan pipeline, commission and disbursement reports will be generated here."

		/>
	);
}
