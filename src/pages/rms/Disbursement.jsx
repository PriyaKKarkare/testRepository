import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	FiChevronDown,
	FiBarChart2,
	FiDownload,
	FiSearch,
} from "react-icons/fi";
import DashBoardsCards from "../../components/DashBoardsCards/DashBoardsCards";
import { Pagination } from "../../components/Pagination/Pagination";
import { removeLoan } from "../../store/loanSlice";
import PageHeader from "../../components/PageHeader/PageHeader";

const Disbursement = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const tableData = useSelector((state) => state.loans.list);

	const [selectedRows, setSelectedRows] = useState([]);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const filtered = tableData.filter((row) =>
		`${row.applicant} ${row.loanId} ${row.bank}`
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	const handleSelectAll = (e) => {
		setSelectedRows(e.target.checked ? filtered.map((row) => row.loanId) : []);
	};

	const handleSelectRow = (loanId) => {
		setSelectedRows((prev) =>
			prev.includes(loanId) ? prev.filter((id) => id !== loanId) : [...prev, loanId]
		);
	};

	const isAllSelected = selectedRows.length === filtered.length && filtered.length > 0;

	return (
		<div className="flex flex-col gap-6 p-4 sm:p-6">
			<PageHeader
				title="Disbursement"
				crumbs={["RMS", "Disbursement"]}
				actions={
					<>
						<button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-2xs transition-colors hover:bg-gray-50">
							<FiBarChart2 className="h-4 w-4 text-gray-500" />
							<span className="hidden sm:inline">Activity</span>
						</button>
						<button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-2xs transition-colors hover:bg-gray-50">
							<FiDownload className="h-4 w-4 text-gray-500" />
							<span className="hidden sm:inline">Import Excel</span>
						</button>
						<div className="inline-flex rounded-lg shadow-2xs">
							<button
								onClick={() => navigate("/rms/loan")}
								className="rounded-l-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
							>
								Add Disbursement
							</button>
							<button className="flex items-center rounded-r-lg border-l border-indigo-500 bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
								<FiChevronDown className="h-4 w-4" />
							</button>
						</div>
					</>
				}
			/>

			<DashBoardsCards />

			<div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs">
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-4">
					<div className="relative min-w-[240px] max-w-md flex-1">
						<FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search for Disbursement"
							className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-4 text-xs text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						/>
					</div>
					<div className="flex items-center space-x-2">
						{selectedRows.length > 0 && (
							<span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
								{selectedRows.length} selected
							</span>
						)}
						<button className="flex items-center space-x-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
							<span>Saved View</span>
							<FiChevronDown className="text-gray-400" />
						</button>
						<button className="flex items-center space-x-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
							<span>Export All</span>
							<FiChevronDown className="text-gray-400" />
						</button>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-left text-xs text-gray-600">
						<thead className="border-b border-gray-200 bg-gray-50 font-medium uppercase tracking-wider text-gray-500">
							<tr>
								<th className="w-10 p-3.5 text-center">
									<input
										type="checkbox"
										checked={isAllSelected}
										onChange={handleSelectAll}
										className="cursor-pointer rounded border-gray-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
									/>
								</th>
								<th className="whitespace-nowrap p-3.5">Disbursement Date</th>
								<th className="whitespace-nowrap p-3.5">Loan ID</th>
								<th className="whitespace-nowrap p-3.5">Status</th>
								<th className="whitespace-nowrap p-3.5">Applicant Name</th>
								<th className="whitespace-nowrap p-3.5">Bank Name</th>
								<th className="whitespace-nowrap p-3.5 text-right">Sanctioned Amt</th>
								<th className="whitespace-nowrap p-3.5 text-right">Verified</th>
								<th className="whitespace-nowrap p-3.5 text-right">Referral %</th>
								<th className="whitespace-nowrap p-3.5">Credit Executive</th>
								<th className="whitespace-nowrap p-3.5">Bank RM</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100 bg-white">
							{filtered.map((row) => {
								const isSelected = selectedRows.includes(row.loanId);
								return (
									<tr
										key={row.loanId}
										className={`transition-colors ${isSelected ? "bg-indigo-50/40" : "hover:bg-gray-50/80"
											}`}
									>
										<td className="p-3.5 text-center">
											<input
												type="checkbox"
												checked={isSelected}
												onChange={() => handleSelectRow(row.loanId)}
												className="cursor-pointer rounded border-gray-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
											/>
										</td>
										<td className="whitespace-nowrap p-3.5 text-gray-700">{row.date}</td>
										<td className="whitespace-nowrap p-3.5 font-medium text-indigo-600 hover:underline cursor-pointer">
											{row.loanId}
										</td>
										<td className="whitespace-nowrap p-3.5">
											<span
												className={`inline-flex items-center space-x-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${row.statusColor}`}
											>
												<span className={`h-1.5 w-1.5 rounded-full ${row.statusDot}`}></span>
												<span>{row.status}</span>
											</span>
										</td>
										<td className="whitespace-nowrap p-3.5 font-medium text-gray-900">
											{row.applicant}
										</td>
										<td className="whitespace-nowrap p-3.5 text-gray-600">{row.bank}</td>
										<td className="whitespace-nowrap p-3.5 text-right font-mono text-gray-700">
											{row.sanctionedAmt}
										</td>
										<td className="whitespace-nowrap p-3.5 text-right font-mono text-gray-700">
											{row.verifiedAmt}
										</td>
										<td className="whitespace-nowrap p-3.5 text-right text-gray-600">
											{row.referralPct}
										</td>
										<td className="whitespace-nowrap p-3.5">
											<div className="flex items-center space-x-2">
												<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-100 text-[10px] font-semibold text-amber-800">
													{row.creditExecutive.charAt(0)}
												</div>
												<span className="font-medium text-gray-800">{row.creditExecutive}</span>
											</div>
										</td>
										<td className="whitespace-nowrap p-3.5">
											<div className="flex items-center space-x-2">
												<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rose-200 bg-rose-100 text-[10px] font-semibold text-rose-800">
													{row.bankRM.charAt(0)}
												</div>
												<span className="font-medium text-gray-800">{row.bankRM}</span>
											</div>
										</td>
									</tr>
								);
							})}
							{filtered.length === 0 && (
								<tr>
									<td colSpan={11} className="p-8 text-center text-xs text-gray-400">
										No loans match your search.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<Pagination
					currentPage={currentPage}
					totalPages={Math.max(1, Math.ceil(filtered.length / pageSize))}
					pageSize={pageSize}
					onPageChange={setCurrentPage}
					onPageSizeChange={setPageSize}
				/>
			</div>
		</div>
	);
};

export default Disbursement;
