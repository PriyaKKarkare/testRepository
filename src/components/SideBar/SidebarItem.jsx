import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";


export default function SidebarItem({ menu, searchQuery }) {

	const location = useLocation();

	const hasMatchingSub = menu.subNav?.some((sub) =>
		sub.title?.toLowerCase().includes((searchQuery || '').toLowerCase()));

	// const matchesSubnav = menu.subNav?.some((sub) =>
	// 	sub.title?.toLowerCase().includes((searchQuery || '').toLowerCase()));
	// const showSubNav = isOpen || (searchQuery && matchesSubnav);

	const isChildActive = menu.subNav?.some((sub) => location.pathname === sub.path || location.pathname === `${sub.path}`)

	const [isOpen, setIsOpen] = useState(isChildActive);

	const handleToggle = (e) => {
		// if (menu.subNav) {
		e.preventDefault();
		setIsOpen(!isOpen);
		// }
	}
	if (menu.subNav) {
		const showSubmenu = isOpen || (searchQuery.trim() !== "" && hasMatchingSub)
		return (
			<div className="menu-item-group">
				<button
					onClick={handleToggle}
					className={`menu-item flex w-full items-center justify-between ${isChildActive && !showSubmenu ? " active-link" : ""}`}
				>
					<span className="flex items-center gap-3">
						{menu.icon}
						<span>{menu.title}</span>
					</span>
					{showSubmenu ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}
				</button>
				{
					showSubmenu && (
						<div className="sub-menu">
							{menu.subNav
								.filter((sub) => sub.title.toLowerCase().includes((searchQuery || '').toLowerCase()))
								.map((sub) => (
									<NavLink
										key={sub.title}
										to={sub.path}
										className={({ isActive }) =>
											`sub-menu-item ${isActive ? "active-link" : ""}`}>
										{sub.icon}
										<span>{sub.title}</span>
									</NavLink>
								))}
						</div>
					)
				}

			</div >
		)
	}
	return (

		<NavLink
			to={menu.path || "/"}
			className={({ isActive }) =>
				`menu-item ${isActive ? "active-link" : ""}`}>
			{menu.icon}
			<span>{menu.title}</span>
		</NavLink>
	)

}
