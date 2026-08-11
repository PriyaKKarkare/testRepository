import React from "react";
import PageHeader from "../PageHeader/PageHeader";

export default function PagePlaceholder({ title, crumbs, icon: Icon, description, actionLabel }) {
  return (
	<div className="flex h-full flex-col gap-6 p-4 sm:p-6">
	  <PageHeader
		title={title}
		crumbs={crumbs}
		actions={
		  actionLabel && (
			<button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
			  {actionLabel}
			</button>
		  )
		}
	  />
	  <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
		{Icon && (
		  <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-indigo-50 text-indigo-600">
			<Icon size={22} />
		  </div>
		)}
		<h2 className="text-sm font-semibold text-gray-800">
		  Nothing here yet
		</h2>
		<p className="mt-1 max-w-sm text-xs text-gray-500">{description}</p>
	  </div>
	</div>
  );
}
