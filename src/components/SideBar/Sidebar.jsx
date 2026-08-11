import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Sidebar.css";

import {
  LayoutDashboard,
  Wallet,
  Users,
  ChevronDown,
  FileText,
  Receipt,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  Truck,
  Sparkles,
  PieChart,
  X,
} from "lucide-react";

const rmsChildren = [
  { label: "Dashboard", to: "/rms", icon: LayoutDashboard, end: true },
  { label: "Loan", to: "/rms/loan", icon: FileText },
  { label: "Disbursement", to: "/rms/disbursement", icon: Receipt },
  { label: "Invoices", to: "/rms/invoices", icon: ClipboardList },
  { label: "PO", to: "/rms/po", icon: ClipboardList },
  { label: "RMS Reports", to: "/rms/reports", icon: BarChart3 },
];

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard, end: true },
  { label: "Finance", to: "/finance", icon: Wallet },
  { label: "Sales CRM", to: "/sales-crm", icon: Users },
  { label: "RMS", icon: Users, children: rmsChildren },
  { label: "Compliance", to: "/compliance", icon: ShieldCheck },
  { label: "Vendors", to: "/vendors", icon: Truck },
  { label: "AI Suits", to: "/ai-suits", icon: Sparkles },
  { label: "Reports", to: "/reports", icon: PieChart },
];

const linkBase =
  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
const linkActive = "bg-indigo-600 text-white shadow-sm";
const linkInactive = "text-slate-300 hover:bg-white/5 hover:text-white";

const matches = (label, query) =>
  label.toLowerCase().includes(query.toLowerCase());

const NavItem = ({ item, onNavigate, searchQuery }) => {
  const location = useLocation();
  const isRmsActive = item.children?.some((c) =>
    c.end ? location.pathname === c.to : location.pathname.startsWith(c.to)
  );

  const isSearching = searchQuery.trim().length > 0;
  const parentMatches = item.label && matches(item.label, searchQuery);

  // While searching: auto-expand any parent that matches (directly or via a child).
  // Otherwise: default open only if the route is currently inside it.
  const [manualOpen, setManualOpen] = useState(isRmsActive ?? false);
  const open = isSearching ? true : manualOpen;

  useEffect(() => {
    if (!isSearching) setManualOpen(isRmsActive ?? false);
  }, [isSearching, isRmsActive]);

  if (item.children) {
    // If the parent label itself matches, show all children.
    // Otherwise, while searching, show only the children that match.
    const visibleChildren = isSearching && !parentMatches
      ? item.children.filter((c) => matches(c.label, searchQuery))
      : item.children;

    return (
      <div>
        <button
          onClick={() => setManualOpen((o) => !o)}
          className={`${linkBase} w-full justify-between ${isRmsActive ? "text-white" : linkInactive
            }`}
        >
          <span className="flex items-center gap-2.5">
            <item.icon size={17} />
            {item.label}
          </span>
          <ChevronDown
            size={15}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="mt-1 ml-4 flex flex-col gap-0.5 border-l border-white/10 pl-3">
            {visibleChildren.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                end={child.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `${linkBase} text-[13px] ${isActive ? linkActive : linkInactive}`
                }
              >
                <child.icon size={15} />
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : linkInactive}`
      }
    >
      <item.icon size={17} />
      {item.label}
    </NavLink>
  );
};

export default function Sidebar({ mobileOpen, onClose }) {

  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenus = navItems.filter((menu) => {
    const mainMatch = menu.label?.toLowerCase().includes(searchQuery.toLowerCase());
    const subMatch = menu.children?.some((sub) =>
      sub.label?.toLowerCase().includes(searchQuery.toLowerCase()))
    return mainMatch || subMatch;
  })


  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed z-40 flex h-screen w-64 shrink-0 flex-col bg-[#151233] px-4 py-5 transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-1 pb-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              F
            </div>
            <span className="text-lg font-semibold text-white">FinBowl</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* <button className="mb-2 flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-slate-200 hover:bg-white/10">
          Gracia Advisory Group
          <ChevronDown size={14} className="text-slate-400" />
        </button>
        <button className="mb-4 flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-slate-200 hover:bg-white/10">
          ABC Advisory
          <ChevronDown size={14} className="text-slate-400" />
        </button> */}
        <div className="relative mb-4">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {filteredMenus.length === 0 ? (
            <p className="px-3 py-2 text-xs text-slate-500">No matches.</p>
          ) : (
            filteredMenus.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onNavigate={onClose}
                searchQuery={searchQuery}
              />
            ))
          )}
        </nav>

        {/* <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} onNavigate={onClose} />
          ))}
        </nav> */}

        <div className="mt-4 border-t border-white/10 pt-4 text-[11px] text-slate-500">
          © {new Date().getFullYear()} FinBowl
        </div>
      </aside>
    </>
  );
}
