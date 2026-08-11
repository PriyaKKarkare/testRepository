import React from 'react'
import { ChevronDown, Bell } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      {/* Left section: Organization / Advisory Dropdowns */}
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center">
          <select className="appearance-none rounded-md border border-gray-200 bg-white py-1 pl-3 pr-7 text-xs font-medium text-gray-700 outline-none hover:bg-gray-50 focus:border-indigo-500 cursor-pointer">
            <option>Gracia Advisory Group</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-gray-400" />
        </div>

        <div className="relative flex items-center">
          <select className="appearance-none rounded-md border border-gray-200 bg-white py-1 pl-3 pr-7 text-xs font-medium text-gray-700 outline-none hover:bg-gray-50 focus:border-indigo-500 cursor-pointer">
            <option>ABC Advisory Group</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      {/* Right section: Notifications & User Avatar */}
      <div className="flex items-center space-x-3">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User Profile Avatar */}
        <button 
          type="button" 
          className="h-8 w-8 overflow-hidden rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
            alt="User Profile"
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </header>
  )
}