import { useState } from "react";
import "./Sidebar.css";
import { FaHome, FaMoneyBill, FaChartBar, FaCog, FaUserFriends, FaSearch } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

const menus = [{
	title: "Dashboard",
	icon: <FaHome />,
},
{
	title: "Finance",
	icon: <FaMoneyBill />
},
{
	title: "Sales CRM",
	icon: <FaUserFriends />
},
{
	title: "RMS",
	icon: <FaUserFriends />,
	path: "#",
	subNav: [
		{
			title: "Dashboard",
			path: "#",
			icon: <FaHome />
		},
		{
			title: "Disbursement",
			path: "#",
			icon: <FaMoneyBill />
		},
		{
			title: "Invoices",
			path: "#",
			icon: <FaMoneyBill />
		},
		{
			title: "PO",
			path: "#",
			icon: <FaMoneyBill />
		},
		{
			title: "RMS Reports",
			path: "#",
			icon: <FaMoneyBill />
		},

	]
},
{
	title: "Compliance",
	icon: <FaChartBar />
},
{
	title: "Vendors",
	icon: <FaUserFriends />
},
{
	title: "AI Suits",
	icon: <FaChartBar />
},
{
	title: "Reports",
	icon: <FaChartBar />
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
						<SidebarItem key={menu.title} menu={menu} />
						{menu.title==="Dashboard"&&(
							<hr className="dashboard-divider"/>
						)}
					</div>
				))}
				</nav>
		</aside>
	)
}