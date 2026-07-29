import { useState } from "react";
import "./Sidebar.css";
import { FaHome, FaMoneyBill, FaChartBar, FaCog, FaUserFriends, FaSearch } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

const menus = [{
	title: "Dashboard",
	icon: <FaHome />,
	path: "/"
},
{
	title: "Finance",
	icon: <FaMoneyBill />,
	path: "finance"
},
{
	title: "Sales CRM",
	icon: <FaUserFriends />,
	path: '/salescrm'
},
{
	title: "RMS",
	icon: <FaUserFriends />,
	path: "#",
	subNav: [
		{
			title: "Dashboard",
			path: "/rms/dashboard",
			icon: <FaHome />
		},
		{
			title: "Disbursement",
			path: "rms/disbursement",
			icon: <FaMoneyBill />
		},
		{
			title: "Invoices",
			path: "rms/invoice",
			icon: <FaMoneyBill />
		},
		{
			title: "PO",
			path: "rms/po",
			icon: <FaMoneyBill />
		},
		{
			title: "RMS Reports",
			path: "rms/rmsreports",
			icon: <FaMoneyBill />
		},

	]
},
{
	title: "Compliance",
	icon: <FaChartBar />,
	path: "/compliance"
},
{
	title: "Vendors",
	icon: <FaUserFriends />,
	path: "/vendors"
},
{
	title: "AI Suits",
	icon: <FaChartBar />,
	path: "/aisuits"
},
{
	title: "Reports",
	icon: <FaChartBar />,
	path: "/reports"
},
]

export default function Sidebar() {
	const [searchQuery, setSearchQuery] = useState("");


	const filteredMenus = menus.filter((menu) => {
		const mainMatch = menu.title?.toLowerCase().includes(searchQuery.toLowerCase());
		const subMatch = menu.subNav?.some((sub) =>
			sub.title.toLowerCase().includes(searchQuery.toLowerCase()))
		return mainMatch || subMatch;
	})

	return (
		<aside className="sidebar">
			<h2 className="logo">
				FinBowl
			</h2>

			<div className="search-container">
				<FaSearch className="search-icon" />
				<input
					type="text"
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="search-input"
				/>
			</div>
			<nav className="menu-list">
				{filteredMenus.map((menu) => (
					<div key={menu.title}>
						<SidebarItem key={menu.title} menu={menu} searchQuery={searchQuery} />
						{menu.title === "Dashboard" && (
							<hr className="dashboard-divider" />
						)}
					</div>
				))}
			</nav>
		</aside>
	)
}