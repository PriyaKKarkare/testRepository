import React from 'react'
import DashBoardsCards from '../components/DashBoardsCards/DashBoardsCards'
import ActionBar from '../components/ActionBar/ActionBar'
import { FiBell, FiChevronDown, FiBarChart2, FiDownload } from 'react-icons/fi'


const DashBoard = () => {
	return (
		<div className='p-6 space-y-6 flex flex-col h-full bg-[#F6F5FD]'>
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
					<button className='flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors'>
						<FiBarChart2 className="h-4 w-4 text-gray-500" />
						<span>Activity</span>
					</button>

					{/* Import Excel Button */}
					<button className='flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors'>
						<FiDownload className="h-4 w-4 text-gray-500" />
						<span>Import Excel</span>
					</button>

					{/* Split Action Dropdown Button Group */}
					<div className='inline-flex rounded-lg shadow-sm'>
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


		</div>
	)
}

export default DashBoard
