import React, { useState } from "react";
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from "lucide-react";

const INITIAL_VENDORS = [
  {
    id: "VEN-001",
    name: "FinTech Solutions Ltd",
    category: "Software & Technology",
    contactPerson: "Sarah Jenkins",
    email: "s.jenkins@fintechsolutions.com",
    phone: "+1 (555) 019-2834",
    status: "Active",
    contractEnd: "2025-12-31",
    pendingPayment: "$12,450.00",
  },
  {
    id: "VEN-002",
    name: "Apex Credit Assessment",
    category: "Underwriting Services",
    contactPerson: "Michael Chang",
    email: "m.chang@apexcredit.io",
    phone: "+1 (555) 014-4920",
    status: "Active",
    contractEnd: "2024-10-15",
    pendingPayment: "$4,200.00",
  },
  {
    id: "VEN-003",
    name: "SecureVault POS Hardware",
    category: "Retail Terminal Hardware",
    contactPerson: "David Ross",
    email: "dross@securevault.com",
    phone: "+1 (555) 017-8821",
    status: "Pending Review",
    contractEnd: "2024-08-30",
    pendingPayment: "$0.00",
  },
  {
    id: "VEN-004",
    name: "Global Payment Gateway",
    category: "Payment Processing",
    contactPerson: "Elena Rostova",
    email: "elena@globalpay.com",
    phone: "+1 (555) 011-3091",
    status: "Inactive",
    contractEnd: "2024-01-01",
    pendingPayment: "$0.00",
  },
];

export default function Vendors() {
  const [vendors] = useState(INITIAL_VENDORS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || vendor.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Active
          </span>
        );
      case "Pending Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
      case "Inactive":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <AlertCircle className="w-3.5 h-3.5" /> Inactive
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
            <p className="text-sm text-gray-500">
              Manage vendor onboarding, contracts, and payment schedules.
            </p>
          </div>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Vendors
            </p>
            <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Active Contracts
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {vendors.filter((v) => v.status === "Active").length}
            </p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pending Payments
            </p>
            <p className="text-2xl font-bold text-gray-900">$16,650.00</p>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendor, ID, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
            <Filter className="w-4 h-4" /> Filter:
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Software & Technology">Software & Technology</option>
            <option value="Underwriting Services">Underwriting Services</option>
            <option value="Retail Terminal Hardware">
              Retail Terminal Hardware
            </option>
            <option value="Payment Processing">Payment Processing</option>
          </select>
        </div>
      </div>

      {/* Vendor Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500 tracking-wider">
                <th className="py-3 px-4">Vendor Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Contract End</th>
                <th className="py-3 px-4 text-right">Pending Pay</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{vendor.name}</div>
                      <div className="text-xs text-gray-400 font-mono">{vendor.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{vendor.category}</td>
                    <td className="py-3.5 px-4">
                      <div className="text-gray-900">{vendor.contactPerson}</div>
                      <div className="text-xs text-gray-400">{vendor.email}</div>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(vendor.status)}</td>
                    <td className="py-3.5 px-4 text-gray-600 font-mono text-xs">
                      {vendor.contractEnd}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-gray-900 font-mono">
                      {vendor.pendingPayment}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No vendors found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}