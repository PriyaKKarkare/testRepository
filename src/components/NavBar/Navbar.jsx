import React from 'react'
import { FiChevronDown, FiBell } from 'react-icons/fi'

const Navbar = () => {
	return (
		<header className='flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6'>
			<div className='flex items-center space-x-3'>
				<div className='relative flex items-center'>
					<select className='appearance-none rounded-lg border border-gray-300 bg-gray-50 py-1.5 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none hover:bg-gray-100'>
						<option>Gracia Advisory Group</option>
					</select>
					<FiChevronDown className="pointer-events-none absolute right-2.5 text-gray-500 text-sm" />
				</div>
				<div className='relative flex items-center'>
					<select className='appearance-none rounded-lg border border-gray-300 bg-gray-50 py-1.5 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none hover:bg-gray-100 cursor-pointer'>
						<option>ABC Advisory </option>
					</select>
					<FiChevronDown className="pointer-events-none absolute right-2.5 text-gray-500 text-sm" />
				</div>
			</div>

			{/* Right section : Notification & Profile Avatar */}
			<div className='flex items-center space-x-4'>
				{/* Notification bell button */}
				<button
					aria-label='Notifications'
					className='relative rounded-full p-2 text-gray-600 hover:bg-gray-100 focus:outline-none'
				>
					<FiBell className="h-5 w-5" />
					{/* Notification Badge Dot */}
					<span className='absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white'>
					</span>
				</button>

				{/* Profile Avatar */}
				<button className='h-9 w-9 overflow-hidden rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
					<img
						src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='User Profile'
						className='h-full w-full object-cover'
					/>
				</button>
			</div>

		</header>
	)
}

export default Navbar
