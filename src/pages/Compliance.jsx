import React from "react";
import { ShieldCheck } from "lucide-react";
import PagePlaceholder from "../components/PagePlaceholder/PagePlaceholder";

export default function Compliance() {
	return (
		<PagePlaceholder
			title="Compliance"
			crumbs={['Compliance']}
			icon={ShieldCheck}
			description="KYC checks, audit trails and regulatory filings will be managed here."
			actionLabel="New Filing"
		/>
	);
}
