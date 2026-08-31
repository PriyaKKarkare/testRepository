import React, { useState } from "react";
import {
  PieChart,
  BarChart3,
  FileText,
  Download,
  Eye,
  Plus,
  X,
  Calendar,
  TrendingUp,
  WalletCards,
  Users,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const initialReports = [
  {
    id: "REP-001",
    name: "Monthly Portfolio Report",
    type: "Portfolio",
    period: "August 2026",
    generated: "31 Aug 2026",
    status: "Ready",
  },
  {
    id: "REP-002",
    name: "Loan Disbursement Report",
    type: "Finance",
    period: "August 2026",
    generated: "30 Aug 2026",
    status: "Ready",
  },
  {
    id: "REP-003",
    name: "Customer Performance Report",
    type: "Customer",
    period: "Q3 2026",
    generated: "28 Aug 2026",
    status: "Ready",
  },
  {
    id: "REP-004",
    name: "Compliance Summary",
    type: "Compliance",
    period: "August 2026",
    generated: "27 Aug 2026",
    status: "Ready",
  },
];

const reportTypes = [
  {
    title: "Portfolio Report",
    description:
      "View portfolio size, outstanding balance, repayment performance and portfolio trends.",
    icon: PieChart,
  },
  {
    title: "Finance Report",
    description:
      "Analyze disbursements, collections, revenue and financial performance.",
    icon: BarChart3,
  },
  {
    title: "Customer Report",
    description:
      "Review customer growth, activity and overall customer performance.",
    icon: Users,
  },
  {
    title: "Compliance Report",
    description:
      "Review KYC activity, audit flags and regulatory compliance metrics.",
    icon: CheckCircle2,
  },
];

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {status}
    </span>
  );
}

function KpiCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{label}</p>

        <Icon size={16} className="text-slate-300" />
      </div>

      <p className="mt-1.5 font-mono text-2xl text-slate-900 tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

export default function Reports() {
  const [reports, setReports] = useState(initialReports);

  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);

  const [reportForm, setReportForm] = useState({
    name: "",
    type: "Portfolio",
    period: "August 2026",
    fromDate: "",
    toDate: "",
  });

  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Portfolio",
    "Finance",
    "Customer",
    "Compliance",
  ];

  const filteredReports =
    activeFilter === "All"
      ? reports
      : reports.filter((report) => report.type === activeFilter);

  // ----------------------------------------
  // FORM HANDLER
  // ----------------------------------------

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setReportForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------------------------
  // GENERATE REPORT
  // ----------------------------------------

  const handleGenerateReport = (e) => {
    e.preventDefault();

    if (!reportForm.name.trim()) {
      alert("Please enter report name.");
      return;
    }

    const newReport = {
      id: `REP-${String(reports.length + 1).padStart(3, "0")}`,
      name: reportForm.name,
      type: reportForm.type,
      period: reportForm.period,
      generated: "31 Aug 2026",
      status: "Ready",
    };

    setReports((prev) => [newReport, ...prev]);

    setReportForm({
      name: "",
      type: "Portfolio",
      period: "August 2026",
      fromDate: "",
      toDate: "",
    });

    setShowGenerateModal(false);
  };

  // ----------------------------------------
  // DOWNLOAD REPORT
  // ----------------------------------------

  const handleDownload = (report) => {
    const reportContent = `
FinBowl Report

Report ID: ${report.id}
Report Name: ${report.name}
Report Type: ${report.type}
Period: ${report.period}
Generated: ${report.generated}

This is a generated FinBowl report.
`;

    const blob = new Blob([reportContent], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.name.replace(/\s+/g, "-")}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">

        <div>
          <nav className="text-xs text-slate-400 mb-1">
            Reports
          </nav>

          <h1 className="text-xl font-semibold text-slate-900">
            Reports
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Cross-module analytics and exportable reports
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-2 h-9 px-3 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          <Plus size={15} />
          Generate report
        </button>

      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <KpiCard
          icon={FileText}
          label="Total reports"
          value={reports.length}
          sub="Generated reports"
        />

        <KpiCard
          icon={WalletCards}
          label="Portfolio value"
          value="₹48.2 Cr"
          sub="Current outstanding"
        />

        <KpiCard
          icon={TrendingUp}
          label="Monthly growth"
          value="+8.4%"
          sub="Compared with July"
        />

        <KpiCard
          icon={CheckCircle2}
          label="Reports ready"
          value={reports.filter((r) => r.status === "Ready").length}
          sub="Available to download"
        />

      </div>

      {/* =====================================================
          ANALYTICS OVERVIEW
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* Portfolio overview */}

        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200">

          <div className="px-5 py-4 border-b border-slate-200">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Portfolio overview
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Monthly portfolio performance
                </p>
              </div>

              <select className="h-8 px-2 text-xs border border-slate-200 rounded-md text-slate-600 outline-none">
                <option>Last 6 months</option>
                <option>Last 12 months</option>
                <option>This year</option>
              </select>

            </div>

          </div>

          <div className="p-5">

            <div className="grid grid-cols-3 gap-4 mb-5">

              <div>
                <p className="text-xs text-slate-400">
                  Disbursed
                </p>

                <p className="text-lg font-semibold text-slate-900 mt-1">
                  ₹12.8 Cr
                </p>

                <p className="text-xs text-emerald-600 mt-1">
                  +12.4%
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Collections
                </p>

                <p className="text-lg font-semibold text-slate-900 mt-1">
                  ₹9.6 Cr
                </p>

                <p className="text-xs text-emerald-600 mt-1">
                  +7.8%
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Outstanding
                </p>

                <p className="text-lg font-semibold text-slate-900 mt-1">
                  ₹48.2 Cr
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Current
                </p>
              </div>

            </div>

            {/* Simple chart */}

            <div className="h-44 flex items-end gap-3 border-b border-slate-100">

              {[
                45,
                58,
                52,
                70,
                64,
                82,
                76,
                90,
                84,
                96,
                88,
                100,
              ].map((height, index) => (

                <div
                  key={index}
                  className="flex-1 flex flex-col justify-end h-full"
                >

                  <div
                    className="w-full bg-indigo-100 hover:bg-indigo-200 rounded-t-sm transition"
                    style={{
                      height: `${height}%`,
                    }}
                    title={`Month ${index + 1}`}
                  />

                </div>

              ))}

            </div>

            <div className="flex justify-between mt-2 text-[10px] text-slate-400">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>

          </div>

        </div>

        {/* Report categories */}

        <div className="bg-white rounded-lg border border-slate-200">

          <div className="px-5 py-4 border-b border-slate-200">

            <h2 className="text-sm font-semibold text-slate-900">
              Report categories
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Available analytics
            </p>

          </div>

          <div className="p-4 space-y-2">

            {reportTypes.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={() => {
                    setReportForm((prev) => ({
                      ...prev,
                      type: item.title.replace(" Report", ""),
                      name: item.title,
                    }));

                    setShowGenerateModal(true);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 text-left transition"
                >

                  <div className="h-9 w-9 rounded-md bg-indigo-50 flex items-center justify-center">
                    <Icon
                      size={16}
                      className="text-indigo-600"
                    />
                  </div>

                  <div className="flex-1">

                    <p className="text-xs font-medium text-slate-800">
                      {item.title}
                    </p>

                    <p className="text-[10px] text-slate-400 mt-1 leading-4">
                      {item.description}
                    </p>

                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-slate-300"
                  />

                </button>
              );
            })}

          </div>

        </div>

      </div>

      {/* =====================================================
          GENERATED REPORTS
      ===================================================== */}

      <div className="bg-white rounded-lg border border-slate-200">

        {/* Header */}

        <div className="px-5 py-4 border-b border-slate-200">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Generated reports
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                View and export your reports
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto">

              {filters.map((filter) => (

                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition ${
                    activeFilter === filter
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="bg-slate-50 text-left text-xs font-medium text-slate-500 border-b border-slate-200">

                <th className="px-5 py-3">
                  Report
                </th>

                <th className="px-4 py-3">
                  Type
                </th>

                <th className="px-4 py-3">
                  Period
                </th>

                <th className="px-4 py-3">
                  Generated
                </th>

                <th className="px-4 py-3">
                  Status
                </th>

                <th className="px-5 py-3 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredReports.map((report, index) => (

                <tr
                  key={report.id}
                  className={`border-b border-slate-100 last:border-0 ${
                    index % 2 ? "bg-slate-50/50" : "bg-white"
                  }`}
                >

                  <td className="px-5 py-3">

                    <div className="flex items-center gap-3">

                      <div className="h-8 w-8 rounded-md bg-indigo-50 flex items-center justify-center">
                        <FileText
                          size={14}
                          className="text-indigo-600"
                        />
                      </div>

                      <div>

                        <p className="text-sm font-medium text-slate-800">
                          {report.name}
                        </p>

                        <p className="text-[11px] text-slate-400 font-mono">
                          {report.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {report.type}
                  </td>

                  <td className="px-4 py-3 text-slate-500">
                    {report.period}
                  </td>

                  <td className="px-4 py-3 text-slate-500 font-mono text-[12px]">
                    {report.generated}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={report.status} />
                  </td>

                  <td className="px-5 py-3">

                    <div className="flex items-center justify-end gap-3">

                      <button
                        onClick={() => setSelectedReport(report)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        <Eye size={13} />
                        View
                      </button>

                      <button
                        onClick={() => handleDownload(report)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
                      >
                        <Download size={13} />
                        Download
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          GENERATE REPORT MODAL
      ===================================================== */}

      {showGenerateModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">

            {/* Header */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Generate report
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Create a new analytics report
                </p>
              </div>

              <button
                onClick={() => setShowGenerateModal(false)}
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleGenerateReport}
              className="p-5 space-y-4"
            >

              {/* Report name */}

              <div>

                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Report name
                </label>

                <input
                  type="text"
                  name="name"
                  value={reportForm.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Monthly Portfolio Report"
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />

              </div>

              {/* Type */}

              <div>

                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Report type
                </label>

                <select
                  name="type"
                  value={reportForm.type}
                  onChange={handleFormChange}
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="Portfolio">
                    Portfolio
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Customer">
                    Customer
                  </option>

                  <option value="Compliance">
                    Compliance
                  </option>

                </select>

              </div>

              {/* Period */}

              <div>

                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Reporting period
                </label>

                <select
                  name="period"
                  value={reportForm.period}
                  onChange={handleFormChange}
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option>August 2026</option>
                  <option>July 2026</option>
                  <option>Q3 2026</option>
                  <option>Q2 2026</option>
                  <option>Year 2026</option>
                </select>

              </div>

              {/* Date range */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    From
                  </label>

                  <div className="relative">

                    <Calendar
                      size={14}
                      className="absolute left-3 top-2.5 text-slate-400"
                    />

                    <input
                      type="date"
                      name="fromDate"
                      value={reportForm.fromDate}
                      onChange={handleFormChange}
                      className="w-full h-9 pl-9 pr-2 text-xs border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    To
                  </label>

                  <div className="relative">

                    <Calendar
                      size={14}
                      className="absolute left-3 top-2.5 text-slate-400"
                    />

                    <input
                      type="date"
                      name="toDate"
                      value={reportForm.toDate}
                      onChange={handleFormChange}
                      className="w-full h-9 pl-9 pr-2 text-xs border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />

                  </div>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="h-9 px-4 rounded-md border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 h-9 px-4 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <FileText size={14} />
                  Generate
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          VIEW REPORT MODAL
      ===================================================== */}

      {selectedReport && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">

              <div className="flex items-center gap-3">

                <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center">

                  <FileText
                    size={17}
                    className="text-indigo-600"
                  />

                </div>

                <div>

                  <h2 className="text-base font-semibold text-slate-900">
                    {selectedReport.name}
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedReport.id}
                  </p>

                </div>

              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>

            </div>

            <div className="p-5">

              {/* Report summary */}

              <div className="grid grid-cols-2 gap-3">

                <div className="border border-slate-200 rounded-lg p-3">

                  <p className="text-xs text-slate-400">
                    Report type
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {selectedReport.type}
                  </p>

                </div>

                <div className="border border-slate-200 rounded-lg p-3">

                  <p className="text-xs text-slate-400">
                    Period
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {selectedReport.period}
                  </p>

                </div>

                <div className="border border-slate-200 rounded-lg p-3">

                  <p className="text-xs text-slate-400">
                    Generated
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {selectedReport.generated}
                  </p>

                </div>

                <div className="border border-slate-200 rounded-lg p-3">

                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <div className="mt-1">
                    <StatusBadge status={selectedReport.status} />
                  </div>

                </div>

              </div>

              {/* Preview */}

              <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">

                <PieChart
                  size={30}
                  className="mx-auto text-indigo-400"
                />

                <p className="text-sm font-medium text-slate-700 mt-2">
                  Report preview
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Analytics data and detailed insights are available in the exported report.
                </p>

              </div>

              {/* Actions */}

              <div className="flex justify-end gap-2 mt-5">

                <button
                  onClick={() => setSelectedReport(null)}
                  className="h-9 px-4 rounded-md border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  onClick={() => handleDownload(selectedReport)}
                  className="flex items-center gap-2 h-9 px-4 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Download size={14} />
                  Download report
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}