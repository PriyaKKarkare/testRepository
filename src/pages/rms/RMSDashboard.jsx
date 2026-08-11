import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashBoardsCards from "../../components/DashBoardsCards/DashBoardsCards";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function RMSDashboard() {
	const navigate = useNavigate();
	const loans = useSelector((state) => state.loans.list);
	const recent = loans.slice(0, 6);

	return (
		<div className="flex flex-col gap-6 p-4 sm:p-6">
			<PageHeader
				title="RMS Dashboard"
				crumbs={["RMS", "Dashboard"]}
				actions={
					<button
						onClick={() => navigate("/rms/loan")}
						className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
					>
						Add Loan
					</button>
				}
			/>

			<DashBoardsCards />

			<div className="rounded-xl border border-gray-200 bg-white shadow-2xs">
				<div className="flex items-center justify-between border-b border-gray-100 p-4">
					<h2 className="text-sm font-semibold text-gray-800">Recent Loans</h2>
					<button
						onClick={() => navigate("/rms/disbursement")}
						className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
					>
						View all
					</button>
				</div>
				<div className="divide-y divide-gray-100">
					{recent.map((loan) => (
						<div
							key={loan.loanId}
							className="flex flex-wrap items-center justify-between gap-3 p-4 text-xs"
						>
							<div>
								<p className="font-medium text-gray-900">{loan.applicant}</p>
								<p className="text-gray-500">
									{loan.loanId} · {loan.bank}
								</p>
							</div>
							<div className="flex items-center gap-4">
								<span className="font-mono text-gray-700">{loan.sanctionedAmt}</span>
								<span
									className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium ${loan.statusColor}`}
								>
									<span className={`h-1.5 w-1.5 rounded-full ${loan.statusDot}`} />
									{loan.status}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
