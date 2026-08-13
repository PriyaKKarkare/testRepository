import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/SideBar/Sidebar";
import Navbar from "./Navbar";

export default function PortalLayout({ onLogout }) {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="flex h-screen w-full overflow-hidden bg-[#F6F5FD]">
			{/* Sidebar spans full browser height */}
			<Sidebar
				mobileOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
				onLogout={onLogout}
			/>

			{/* Right content area */}
			<div className="flex flex-1 flex-col min-w-0 h-full overflow-y-auto">
				<Navbar />
				<Topbar onMenuClick={() => setMobileOpen(true)} />
				<main className="flex-1 p-4 lg:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
