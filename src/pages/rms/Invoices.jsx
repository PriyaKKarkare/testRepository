import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Eye,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Printer,
  ArrowLeft,
  Building,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const stats = [
  { label: "Total Invoices", value: "937", delta: "+12%", up: true, icon: FileText, tone: "text-indigo-600 bg-indigo-50" },
  { label: "Paid Invoices", value: "682", delta: "+8.4%", up: true, icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-50" },
  { label: "Pending Payment", value: "184", delta: "-2.1%", up: false, icon: Clock, tone: "text-amber-600 bg-amber-50" },
  { label: "Cancelled / Unpaid", value: "71", delta: "-5.0%", up: false, icon: XCircle, tone: "text-rose-600 bg-rose-50" },
];

const invoicesData = [
  {
    id: "#746F5K2",
    invoiceNo: "66K5W3",
    client: "Gregory Anderson",
    email: "info@softnio.com",
    phone: "+012 8764 556",
    address: "House #65, 4328 Marion Street, Newbury, VT 05051",
    amount: "$478.50",
    date: "26 Jan 2025",
    createdDate: "18 Dec 2024, 01:02 PM",
    status: "Complete",
    items: [
      { id: "24108054", desc: "Dashlite - Conceptual App Dashboard - Regular License", price: 40.00, qty: 5, amount: 200.00 },
      { id: "24108054", desc: "6 months premium support", price: 25.00, qty: 1, amount: 25.00 },
      { id: "23604094", desc: "Invest Management Dashboard - Regular License", price: 131.25, qty: 1, amount: 131.25 },
      { id: "23604094", desc: "6 months premium support", price: 78.75, qty: 1, amount: 78.75 },
    ],
    subtotal: 435.00,
    processingFee: 10.00,
    tax: 43.50,
    grandTotal: 478.50,
  },
  {
    id: "#546H74W",
    invoiceNo: "55H74W",
    client: "Desiree Patterson",
    email: "desiree@example.com",
    phone: "+012 9876 123",
    address: "742 Evergreen Terrace, Springfield, OR 97477",
    amount: "$120.00",
    date: "12 Jan 2025",
    createdDate: "10 Jan 2025, 10:45 PM",
    status: "Pending",
    items: [
      { id: "10928374", desc: "Consulting Fee - Loan Strategy", price: 120.00, qty: 1, amount: 120.00 }
    ],
    subtotal: 120.00,
    processingFee: 0.00,
    tax: 0.00,
    grandTotal: 120.00,
  },
  {
    id: "#87X6A44",
    invoiceNo: "88X6A4",
    client: "Handson Roderick",
    email: "handson@example.com",
    phone: "+012 3456 789",
    address: "123 Market St, San Francisco, CA 94103",
    amount: "$560.00",
    date: "26 Dec 2024",
    createdDate: "20 Dec 2024, 12:15 PM",
    status: "Complete",
    items: [
      { id: "55443322", desc: "RMS Software Subscription - Annual", price: 560.00, qty: 1, amount: 560.00 }
    ],
    subtotal: 500.00,
    processingFee: 10.00,
    tax: 50.00,
    grandTotal: 560.00,
  },
];

const statusStyles = {
  Complete: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function Invoices() {
  const [checked, setChecked] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const toggleAll = () => {
    if (checked.length === invoicesData.length) {
      setChecked([]);
    } else {
      setChecked(invoicesData.map((inv) => inv.id));
    }
  };

  const toggleRow = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredInvoices = invoicesData.filter(
    (inv) =>
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If an invoice is selected for viewing, display the Invoice Details View
  if (selectedInvoice) {
    return (
      <div className="w-full min-h-screen bg-[#F6F5FD] p-4 sm:p-6 flex flex-col gap-6">
        {/* Back navigation & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 mb-2"
            >
              <ArrowLeft size={14} /> Back to Invoices
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              Invoice {selectedInvoice.id}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Created At: {selectedInvoice.createdDate}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-2xs hover:bg-gray-50"
            >
              <Printer size={16} className="text-gray-500" />
              Print
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Invoice Card Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xs flex flex-col gap-8">
          {/* Header Row */}
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-gray-100 pb-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg mb-4">
                <Building size={22} />
                <span>Payzen Finance</span>
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Invoice To</p>
              <h2 className="text-base font-bold text-gray-900">{selectedInvoice.client}</h2>
              <div className="mt-2 flex flex-col gap-1 text-xs text-gray-600">
                <p className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-gray-400 shrink-0" />
                  {selectedInvoice.address}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone size={13} className="text-gray-400 shrink-0" />
                  {selectedInvoice.phone}
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail size={13} className="text-gray-400 shrink-0" />
                  {selectedInvoice.email}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <h2 className="text-2xl font-black text-indigo-600 tracking-tight">INVOICE</h2>
              <div className="mt-3 flex flex-col gap-1 text-xs text-gray-600">
                <p><span className="font-semibold text-gray-500 uppercase">Invoice ID:</span> {selectedInvoice.invoiceNo}</p>
                <p><span className="font-semibold text-gray-500 uppercase">Date:</span> {selectedInvoice.date}</p>
                <p className="mt-1">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[selectedInvoice.status]}`}>
                    {selectedInvoice.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="py-2.5 font-semibold">Item ID</th>
                  <th className="py-2.5 font-semibold">Description</th>
                  <th className="py-2.5 font-semibold text-right">Price</th>
                  <th className="py-2.5 font-semibold text-center">Qty</th>
                  <th className="py-2.5 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {selectedInvoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-mono text-gray-500">{item.id}</td>
                    <td className="py-3 font-medium text-gray-900">{item.desc}</td>
                    <td className="py-3 text-right font-mono">${item.price.toFixed(2)}</td>
                    <td className="py-3 text-center">{item.qty}</td>
                    <td className="py-3 text-right font-mono font-semibold text-gray-900">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-gray-100 pt-6">
            <p className="text-[11px] text-gray-400 italic max-w-sm">
              Invoice was created on a computer and is valid without the signature and seal.
            </p>

            <div className="w-full sm:w-64 flex flex-col gap-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-gray-900">${selectedInvoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Processing fee</span>
                <span className="font-mono font-medium text-gray-900">${selectedInvoice.processingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>TAX</span>
                <span className="font-mono font-medium text-gray-900">${selectedInvoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-2 mt-1">
                <span>Grand Total</span>
                <span className="font-mono text-indigo-600">${selectedInvoice.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Primary Invoices List View
  return (
    <div className="w-full min-h-screen bg-[#F6F5FD] p-4 sm:p-6 flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <span>RMS</span>
            <span>/</span>
            <span className="text-gray-600 font-medium">Invoices</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Invoices</h1>
          <p className="text-xs text-gray-500 mt-0.5">Generate and track invoices raised against disbursed loans here.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-2xs hover:bg-gray-50">
            <Printer size={16} className="text-gray-500" />
            Print / Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
            <Plus size={16} />
            New Invoice
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-2 shadow-2xs sm:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-gray-100">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-3 px-4 py-3">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${stat.tone}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`text-xs font-medium ${stat.up ? "text-emerald-600" : "text-rose-500"}`}>
                    {stat.delta}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoices List Table Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs">
        {/* Table Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
          <h2 className="text-sm font-semibold text-gray-800">Invoice Registry</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search order ID or client..."
                className="w-48 rounded-lg border border-gray-200 py-1.5 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-64"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="border-b border-gray-100 uppercase tracking-wide text-gray-400">
              <tr>
                <th className="w-8 p-3.5 pl-4">
                  <input
                    type="checkbox"
                    checked={checked.length === invoicesData.length && invoicesData.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-indigo-600 accent-indigo-600"
                  />
                </th>
                <th className="p-3.5 font-medium">Order ID</th>
                <th className="p-3.5 font-medium">Client</th>
                <th className="p-3.5 font-medium">Date</th>
                <th className="p-3.5 font-medium">Amount</th>
                <th className="p-3.5 font-medium">Status</th>
                <th className="p-3.5 text-right font-medium pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-3.5 pl-4">
                    <input
                      type="checkbox"
                      checked={checked.includes(inv.id)}
                      onChange={() => toggleRow(inv.id)}
                      className="rounded border-gray-300 text-indigo-600 accent-indigo-600"
                    />
                  </td>
                  <td 
                    onClick={() => setSelectedInvoice(inv)}
                    className="p-3.5 font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    {inv.id}
                  </td>
                  <td className="p-3.5">
                    <div>
                      <p className="font-medium text-gray-800">{inv.client}</p>
                      <p className="text-[11px] text-gray-400">{inv.email}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-3.5 text-gray-500">{inv.date}</td>
                  <td className="p-3.5 font-mono font-medium text-gray-900">{inv.amount}</td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[inv.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full fill-current bg-current" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-gray-400">
                      <button 
                        onClick={() => setSelectedInvoice(inv)}
                        className="rounded-md p-1.5 hover:bg-gray-100 hover:text-gray-600" 
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button className="rounded-md p-1.5 hover:bg-gray-100 hover:text-gray-600" title="Download PDF">
                        <Download size={14} />
                      </button>
                      <button className="rounded-md p-1.5 hover:bg-gray-100 hover:text-rose-600" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4 text-xs text-gray-500">
          <span>Showing 1 to 3 of 937 entries</span>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft size={14} />
            </button>
            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 font-medium text-white">1</button>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-gray-600 hover:bg-gray-50">2</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-gray-600 hover:bg-gray-50">6</button>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-gray-600 hover:bg-gray-50">7</button>
            <button className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-gray-600 hover:bg-gray-50">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}