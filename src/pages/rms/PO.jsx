import React from "react";
import { ClipboardList } from "lucide-react";
import PagePlaceholder from "../../components/PagePlaceholder/PagePlaceholder";

export default function PO() {
	return (
		<PagePlaceholder
			title="Purchase Orders"
			crumbs={['RMS', 'PO']}
			icon={ClipboardList}
			description="Create and approve purchase orders tied to RMS vendors here."
			actionLabel="New PO"
		/>
	);
}
