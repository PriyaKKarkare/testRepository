import React from 'react'
import Card from './Card'
import "./DashBoardsCards.css";

const DashBoardsCards = () => {
	const cards = [
		{
			id: 1,
			title: "Total Disbursements",
			value: "8",
			hasCurrency: false

		},
		{
			id: 2,
			title: "Total Disbursed Amount",
			value: "3,62,50,000",
			hasCurrency: true
		},
		{
			id: 3,
			title: "Submitted",
			value: "12",
			hasCurrency: false
		},
		{
			id: 4,
			title: "Verified",
			value: "1",
			hasCurrency: false
		},
		{
			id: 5,
			title: "Processed",
			value: "5",
			hasCurrency: false
		},
		{
			id: 6,
			title: "Audited",
			value: "12",
			hasCurrency: false
		},
	]

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full'>
			{cards.map((card, index) => (
				<div
					key={index}
					className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[110px]"
				>
					<span className='text-xs font-medium text-gray-500 tracking-wide block mb-3 line-clamp-2'>
						{card.title}
					</span>

					<div className='flex items-baseline gap-0.5 mt-auto'>
						{
							card.hasCurrency && (
								<span className='text-xl font-bold text-gray-800 font-sans mr-0.5'>₹</span>
							)
						}
						<span className='text-2xl font-bold text-gray-900 tracking-tight'>
							{card.value}
						</span>
					</div>
					</div>
			))}

				</div>
			)
}

			export default DashBoardsCards
