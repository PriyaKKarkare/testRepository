import React, { useState } from "react";
import {
  Wallet,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  CreditCard,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
} from "lucide-react";

const INITIAL_TRANSACTIONS = [
  {
    id: "TRX-9401",
    type: "Payout",
    party: "FinTech Solutions Ltd",
    category: "Vendor Payment",
    amount: "$12,450.00",
    status: "Completed",
    date: "2026-08-10",
    account: "Operating Account (..4012)",
  },
  {
    id: "TRX-9402",
    type: "Repayment",
    party: "Apex Retailers Group",
    category: "Loan Principal + Interest",
    amount: "+$4,820.50",
    status: "Completed",
    date: "2026-08-10",
    account: "Escrow Reserve (..8821)",
  },
  {
    id: "TRX-9403",
    type: "Payout",
    party: "SecureVault POS Hardware",
    category: "Equipment Lease",
    amount: "$2,100.00",
    status: "Pending",
    date: "2026-08-11",
    account: "Operating Account (..4012)",
  },
  {
    id: "TRX-9404",
    type: "Reconciliation",
    party: "Global Payment Gateway",
    category: "Processing Fee Adjustment",
    amount: "$340.00",
    status: "Failed",
    date: "2026-08-09",
    account: "Clearing Account (..1092)",
  },
];

export default function Finance() {
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredTransactions = transactions.filter((trx) => {
    const matchesSearch =
      trx.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || trx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "Failed":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5" /> Failed
          </span>
        );
    }
  };

  return (
    <div className="sm:p-3 mx-auto space-y-3">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-b border-gray-200 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Finance</h1>
            <p className="text-xs text-gray-500">
              Ledgers, payouts, and reconciliation for loan and retail operations.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs rounded-md shadow-sm transition-colors">
            <Download className="w-3.5 h-3.5" /> Export Ledger
          </button>
          <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-md shadow-sm transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Entry
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        <div className="p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Total Portfolio Value
            </p>
            <p className="text-xl font-bold text-gray-900">$1,248,900.00</p>
            <p className="inline-flex items-center text-[11px] font-medium text-emerald-600">
              <TrendingUp className="w-3 h-3 mr-1" /> +4.2% from last month
            </p>
          </div>
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Pending Payouts
            </p>
            <p className="text-xl font-bold text-gray-900">$21,550.00</p>
            <p className="text-[11px] text-gray-500">3 disbursements queued</p>
          </div>
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded-md">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm flex items-start justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Cleared Collections
            </p>
            <p className="text-xl font-bold text-gray-900">$84,120.00</p>
            <p className="inline-flex items-center text-[11px] font-medium text-emerald-600">
              <ArrowDownLeft className="w-3 h-3 mr-1" /> 98.4% recovery rate
            </p>
          </div>
          <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transaction, ID, or party..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="flex items-center gap-1 text-xs font-medium text-gray-600 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5 text-gray-400" /> Entry Type:
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:bg-white focus:border-indigo-500"
          >
            <option value="All">All Types</option>
            <option value="Payout">Payout</option>
            <option value="Repayment">Repayment</option>
            <option value="Reconciliation">Reconciliation</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-2 px-3">Transaction ID</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Party / Counterparty</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Target Account</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Amount</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3 font-mono font-medium text-indigo-600">
                      {trx.id}
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-900">{trx.type}</td>
                    <td className="py-2 px-3 font-medium text-gray-900">{trx.party}</td>
                    <td className="py-2 px-3 text-gray-600">{trx.category}</td>
                    <td className="py-2 px-3 text-gray-500 font-mono text-[11px]">{trx.account}</td>
                    <td className="py-2 px-3 whitespace-nowrap">{getStatusBadge(trx.status)}</td>
                    <td
                      className={`py-2 px-3 text-right font-semibold font-mono ${
                        trx.amount.startsWith("+")
                          ? "text-emerald-600"
                          : "text-gray-900"
                      }`}
                    >
                      {trx.amount}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500 text-xs">
                    No financial records found matching your filters.
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