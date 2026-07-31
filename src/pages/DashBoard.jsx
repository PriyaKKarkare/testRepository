import React, { useState } from 'react'
import DashBoardsCards from '../components/DashBoardsCards/DashBoardsCards'
import { FiBell, FiChevronDown, FiBarChart2, FiDownload, FiChevronLeft, FiChevronRight, FiSearch, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { Pagination } from '../components/Pagination/Pagination'


const DashBoard = () => {

	// Define table columns configuration
	const tableData = [
		{
			date: '30/04/2024',
			loanId: 'LN002-24-1001',
			status: 'Draft',
			statusColor: 'bg-gray-100 text-gray-700 border-gray-300',
			statusDot: 'bg-gray-500',
			applicant: 'Arjun Mehta',
			bank: 'HDFC Bank',
			sanctionedAmt: '7500.00',
			verifiedAmt: '₹7,00,000.00',
			referralPct: '0.1500%',
			creditExecutive: 'Arjun Mehta',
			bankRM: 'Siddharth',
		},
		{
			date: '30/09/2024',
			loanId: 'LN003-24-1002',
			status: 'Submitted',
			statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			statusDot: 'bg-emerald-500',
			applicant: 'Mohit Agarwal',
			bank: 'ICICI Bank',
			sanctionedAmt: '12000.00',
			verifiedAmt: '—',
			referralPct: '0.2500%',
			creditExecutive: 'Mohit Agarwal',
			bankRM: 'Tanvi N',
		},
		{
			date: '12/05/2027',
			loanId: 'LN004-24-1003',
			status: 'Submitted',
			statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			statusDot: 'bg-emerald-500',
			applicant: 'Priya Singh',
			bank: 'Axis Bank',
			sanctionedAmt: '15000.00',
			verifiedAmt: '—',
			referralPct: '0.3500%',
			creditExecutive: 'Priya Singh',
			bankRM: 'Deepa',
		},
		{
			date: '15/01/2024',
			loanId: 'LN005-24-1004',
			status: 'Submitted',
			statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			statusDot: 'bg-emerald-500',
			applicant: 'Simran Anand',
			bank: 'State Bank of India',
			sanctionedAmt: '22000.00',
			verifiedAmt: '—',
			referralPct: '0.4500%',
			creditExecutive: 'Simran Anand',
			bankRM: 'Suresh',
		},
		{
			date: '20/02/2024',
			loanId: 'LN006-24-1005',
			status: 'Submitted',
			statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			statusDot: 'bg-emerald-500',
			applicant: 'Ravi Sharma',
			bank: 'Kotak Mahindra Bank',
			sanctionedAmt: '30000.00',
			verifiedAmt: '—',
			referralPct: '0.5500%',
			creditExecutive: 'Ravi Sharma',
			bankRM: 'Rahul V',
		},
		{
			date: '20/02/2024',
			loanId: 'LN007-24-1006',
			status: 'Submitted',
			statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			statusDot: 'bg-emerald-500',
			applicant: 'Sneha Joshi',
			bank: 'Punjab National Bank',
			sanctionedAmt: '40000.00',
			verifiedAmt: '—',
			referralPct: '0.6500%',
			creditExecutive: 'Sneha Joshi',
			bankRM: 'Pooja S',
		},
		{
			date: '20/02/2024',
			loanId: 'LN001-24-1004',
			status: 'Verified',
			statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
			statusDot: 'bg-blue-500',
			applicant: 'Vikram Desai',
			bank: 'Canara Bank',
			sanctionedAmt: '55000.00',
			verifiedAmt: '₹15,78,901.00',
			referralPct: '0.7500%',
			creditExecutive: 'Vikram Desai',
			bankRM: 'Manish',
		},
		{
			date: '20/02/2024',
			loanId: 'LN008-24-1007',
			status: 'Audited',
			statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
			statusDot: 'bg-purple-500',
			applicant: 'Anjali Rao',
			bank: 'Bank of Baroda',
			sanctionedAmt: '75000.00',
			verifiedAmt: '₹16,89,012.00',
			referralPct: '0.8500%',
			creditExecutive: 'Anjali Rao',
			bankRM: 'Kavita',
		},
		{
			date: '20/02/2024',
			loanId: 'LN009-24-1008',
			status: 'Audited',
			statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
			statusDot: 'bg-purple-500',
			applicant: 'Karan Iyer',
			bank: 'Union Bank of India',
			sanctionedAmt: '90000.00',
			verifiedAmt: '₹17,00,123.00',
			referralPct: '0.9500%',
			creditExecutive: 'Karan Iyer',
			bankRM: 'Ankit P',
		},
		{
			date: '20/02/2024',
			loanId: 'LN010-24-1009',
			status: 'Verified',
			statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
			statusDot: 'bg-blue-500',
			applicant: 'Neha Gupta',
			bank: 'IDFC FIRST Bank',
			sanctionedAmt: '130000.00',
			verifiedAmt: '₹18,11,234.00',
			referralPct: '1.1500%',
			creditExecutive: 'Neha Gupta',
			bankRM: 'Ritika M',
		},
	]

	// State for row selection
	const [selectedRows, setSelectedRows] = useState([])

	// State for pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	// Select All Handler
	const handleSelectAll = (e) => {
		if (e.target.checked) {
			setSelectedRows(tableData.map((row) => row.loanId))
		} else {
			setSelectedRows([])
		}
	}

	// Single Row Select Handler
	const handleSelectRow = (loanId) => {
		setSelectedRows((prev) =>
			prev.includes(loanId) ? prev.filter((id) => id !== loanId) : [...prev, loanId]
		)
	}

	const isAllSelected = selectedRows.length === tableData.length && tableData.length > 0


	return (
		<div className='p-6 space-y-6 flex flex-col h-full bg-[#F6F5FD] min-h-screen text-gray-800 font-sans'>
			{/* Page Header Area */}
			<div className='flex w-full items-center justify-between gap-6'>
				<div className='shrink-0'>
					<h1 className='text-xl font-bold text-gray-900'>Disbursement</h1>
					<div className='mt-1 flex items-center space-x-1.5 text-xs text-gray-500'>
						<span>RMS</span>
						<FiChevronDown className='text-gray-400 text-sm' />
						<span className='font-medium text-indigo-600'>
							Disbursement
						</span>
					</div>
				</div>
				<div className='flex items-center space-x-3 shrink-0'>
					{/* Activity Button */}
					<button className='flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors'>
						<FiBarChart2 className="h-4 w-4 text-gray-500" />
						<span>Activity</span>
					</button>

					{/* Import Excel Button */}
					<button className='flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors'>
						<FiDownload className="h-4 w-4 text-gray-500" />
						<span>Import Excel</span>
					</button>

					{/* Split Action Dropdown Button Group */}
					<div className='inline-flex rounded-lg shadow-2xs'>
						<button className='rounded-l-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors'>
							Add Disbursement
						</button>
						<button className='flex items-center rounded-r-lg border-l border-indigo-500 bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors'>
							<FiChevronDown className="h-4 w-4" />
						</button>
					</div>
				</div>

			</div>


			{/* Metric Component Cards */}
			<DashBoardsCards />

			<div className='bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col'>
				{/* Table Control Header */}
				<div className='p-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap'>
					<div className='relative flex-1 min-w-[240px] max-w-md'>
						<FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' />
						<input
							type='text'
							placeholder='Search for Disbursement'
							className='w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-700 placeholder-gray-400'
						/>
					</div>
					<div className='flex items-center space-x-2'>
						{selectedRows.length > 0 && (
							<span className='text-xs text-indigo-600 font-medium px-2 py-1 bg-indigo-50 rounded-md border border-indigo-100'>
								{selectedRows.length} selected
							</span>
						)}
						<button className='flex items-center space-x-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50'>
							<span>Saved View</span>
							<FiChevronDown className='text-gray-400' />
						</button>
						<button className='flex items-center space-x-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50'>
							<span>Export All</span>
							<FiChevronDown className='text-gray-400' />
						</button>
					</div>
				</div>

				{/* Responsive Scrollable Table */}
				<div className='overflow-x-auto'>
					<table className='w-full text-left text-xs text-gray-600 border-collapse'>
						<thead className='bg-gray-50 text-gray-500 font-medium border-b border-gray-200 uppercase tracking-wider'>
							<tr>
								<th className='p-3.5 w-10 text-center'>
									<input
										type='checkbox'
										checked={isAllSelected}
										onChange={handleSelectAll}
										className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer'
									/>
								</th>
								<th className='p-3.5 whitespace-nowrap'>
									<div className='flex items-center space-x-1 cursor-pointer'>
										<span>Disbursement Date</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap'>
									<div className='flex items-center space-x-1 cursor-pointer'>
										<span>Loan ID</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap'>
									<div className='flex items-center space-x-1 cursor-pointer'>
										<span>Status</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap'>
									<div className='flex items-center space-x-1 cursor-pointer'>
										<span>Applicant Name</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap'>
									<div className='flex items-center space-x-1 cursor-pointer'>
										<span>Bank Name</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap text-right'>
									<div className='flex items-center justify-end space-x-1 cursor-pointer'>
										<span>Sanctioned Amt</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap text-right'>
									<div className='flex items-center justify-end space-x-1 cursor-pointer'>
										<span>Verified</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap text-right'>
									<div className='flex items-center justify-end space-x-1 cursor-pointer'>
										<span>Referral %</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap'>
									<div className='flex items-center space-x-1 cursor-pointer'>
										<span>Credit Executive</span>
										<FiChevronDown className='text-gray-400' />
									</div>
								</th>
								<th className='p-3.5 whitespace-nowrap'>
									<div className='flex items-center space-x-1 cursor-pointer'>
										<span>Bank RM</span>
									</div>
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100 bg-white'>
							{tableData.map((row) => {
								const isSelected = selectedRows.includes(row.loanId)
								return (
									<tr
										key={row.loanId}
										className={`transition-colors ${isSelected ? 'bg-indigo-50/40' : 'hover:bg-gray-50/80'
											}`}
									>
										<td className='p-3.5 text-center'>
											<input
												type='checkbox'
												checked={isSelected}
												onChange={() => handleSelectRow(row.loanId)}
												className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer'
											/>
										</td>
										<td className='p-3.5 whitespace-nowrap text-gray-700'>{row.date}</td>
										<td className='p-3.5 whitespace-nowrap font-medium text-indigo-600 hover:underline cursor-pointer'>
											{row.loanId}
										</td>
										<td className='p-3.5 whitespace-nowrap'>
											<span
												className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${row.statusColor}`}
											>
												<span className={`w-1.5 h-1.5 rounded-full ${row.statusDot}`}></span>
												<span>{row.status}</span>
											</span>
										</td>
										<td className='p-3.5 whitespace-nowrap font-medium text-gray-900'>
											{row.applicant}
										</td>
										<td className='p-3.5 whitespace-nowrap text-gray-600'>{row.bank}</td>
										<td className='p-3.5 whitespace-nowrap text-right text-gray-700 font-mono'>
											{row.sanctionedAmt}
										</td>
										<td className='p-3.5 whitespace-nowrap text-right text-gray-700 font-mono'>
											{row.verifiedAmt}
										</td>
										<td className='p-3.5 whitespace-nowrap text-right text-gray-600'>
											{row.referralPct}
										</td>
										<td className='p-3.5 whitespace-nowrap'>
											<div className='flex items-center space-x-2'>
												<div className='w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-semibold text-[10px] shrink-0 border border-amber-200'>
													{row.creditExecutive.charAt(0)}
												</div>
												<span className='text-gray-800 font-medium'>{row.creditExecutive}</span>
											</div>
										</td>
										<td className='p-3.5 whitespace-nowrap'>
											<div className='flex items-center space-x-2'>
												<div className='w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-semibold text-[10px] shrink-0 border border-rose-200'>
													{row.bankRM.charAt(0)}
												</div>
												<span className='text-gray-800 font-medium'>{row.bankRM}</span>
											</div>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>


				</div >
				<Pagination
					currentPage={currentPage}
					totalPages={10}
					pageSize={pageSize}
					onPageChange={(page) => setCurrentPage(page)}
					onPageSizeChange={(size) => setPageSize(size)}
				/>
			</div>
		</div>
	)
}

export default DashBoard
