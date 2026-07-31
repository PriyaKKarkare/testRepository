import React from 'react'
import {
	FiChevronLeft,
	FiChevronRight,
	FiChevronsLeft,
	FiChevronsRight,
} from 'react-icons/fi'

export const Pagination = ({
	currentPage = 1,
	totalPages = 10,
	pageSize = 10,
	onPageChange,
	onPageSizeChange,
}) => {
	return (
		<div className='p-3.5 border-t border-gray-100 bg-white flex items-center justify-between text-xs text-gray-500 flex-wrap gap-4'>
			{/* Page Info & Rows selector */}
			<div className='flex items-center space-x-4'>
				<div>
					Page <span className='font-semibold text-gray-700'>{currentPage}</span> of{' '}
					<span className='font-semibold text-gray-700'>{totalPages}</span>
				</div>
				<div className='flex items-center space-x-1.5'>
					<span>Rows per page</span>
					<select
						value={pageSize}
						onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
						className='border border-gray-200 rounded px-2 py-0.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer'
					>
						<option value={10}>10</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
					</select>
				</div>
			</div>

			{/* Page Buttons */}
			<div className='flex items-center space-x-1'>
				{/* First Page */}
				<button
					onClick={() => onPageChange && onPageChange(1)}
					disabled={currentPage === 1}
					className='p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed'
				>
					<FiChevronsLeft className='text-base' />
				</button>
				{/* Previous Page */}
				<button
					onClick={() => onPageChange && onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className='p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed'
				>
					<FiChevronLeft className='text-base' />
				</button>

				{/* Numbered Page Buttons */}
				{[1, 2, 3].map((page) => (
					<button
						key={page}
						onClick={() => onPageChange && onPageChange(page)}
						className={`px-2.5 py-0.5 rounded transition-colors ${currentPage === page
							? 'bg-indigo-50 text-indigo-600 font-semibold border border-indigo-100'
							: 'hover:bg-gray-100 text-gray-600'
							}`}
					>
						{page}
					</button>
				))}

				<span className='px-1 text-gray-400'>...</span>

				{[8, 9, 10].map((page) => (
					<button
						key={page}
						onClick={() => onPageChange && onPageChange(page)}
						className={`px-2.5 py-0.5 rounded transition-colors ${currentPage === page
							? 'bg-indigo-50 text-indigo-600 font-semibold border border-indigo-100'
							: 'hover:bg-gray-100 text-gray-600'
							}`}
					>
						{page}
					</button>
				))}

				{/* Next Page */}
				<button
					onClick={() => onPageChange && onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className='p-1 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed'
				>
					<FiChevronRight className='text-base' />
				</button>
				{/* Last Page */}
				<button
					onClick={() => onPageChange && onPageChange(totalPages)}
					disabled={currentPage === totalPages}
					className='p-1 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed'
				>
					<FiChevronsRight className='text-base' />
				</button>
			</div>
		</div>
	)
}