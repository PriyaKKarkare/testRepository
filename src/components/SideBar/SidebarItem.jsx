import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


export default function SidebarItem({ menu, searchQuery }) {
	const [isOpen, setIsOpen] = useState(false);
	const matchesSubnav = menu.subNav?.some((sub) =>
		sub.title?.toLowerCase().includes((searchQuery || '').toLowerCase()));
	const showSubNav = isOpen || (searchQuery && matchesSubnav);


	const handleToggle = (e) => {
		if (menu.subNav) {
			e.preventDefault();
			setIsOpen(!isOpen);
		}
	}

	return (
		<div className="menu-item-container">
			<div className="menu-header" onClick={handleToggle}>
				<div className="menu-title">
					<span className="icon">{menu.icon}</span>
					<span>{menu.title}</span>
				</div>
				{
					menu.title !== "Dashboard" && (
						<span className={`arrow ${showSubNav ? "open" : ""}`}>
							<FaChevronDown />
						</span>
					)
				}
			</div>
			{menu.subNav && showSubNav && (
				<div className="sidebar-submenu">
					{menu.subNav.filter((child) => child.title?.toLowerCase().includes((searchQuery || '').toLowerCase()))
						.map((child, index) => (
							<a key={index} href={child.path || '#'} className="submenu-item">
								<span className="icon">{child.icon}</span>
								<span >{child.title}</span>
							</a>
						))}
				</div>
			)}
		</div>
	);
}