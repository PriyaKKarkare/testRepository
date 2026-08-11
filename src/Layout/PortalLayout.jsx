import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/SideBar/Sidebar";
import Navbar from "./Navbar";

export default function PortalLayout() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="flex min-h-screen flex-col bg-[#F6F5FD]">
			<Navbar />
			<div className="flex flex-1">
				<Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
				<div className="flex min-h-screen flex-1 flex-col lg:min-w-0">
					<Topbar onMenuClick={() => setMobileOpen(true)} />
					<main className="flex-1">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
