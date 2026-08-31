import React, { useState } from "react";
import {
  Plus,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  Clock,
  UserCheck,
  Ban,
  X,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
} from "lucide-react";

const initialKycQueue = [
  {
    customer: "Rohan Deshmukh",
    account: "AC-77213",
    doc: "PAN + Address proof",
    submitted: "28-08-2026",
    risk: "Low",
  },
  {
    customer: "Anita Fernandes",
    account: "AC-77198",
    doc: "Income statement",
    submitted: "27-08-2026",
    risk: "Medium",
  },
  {
    customer: "Sneha Kulkarni",
    account: "AC-77042",
    doc: "PAN mismatch flagged",
    submitted: "25-08-2026",
    risk: "High",
  },
  {
    customer: "Vikram Nair",
    account: "AC-76991",
    doc: "Aadhaar + bank statement",
    submitted: "24-08-2026",
    risk: "Low",
  },
];

const riskStyle = {
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/20",
  High: "bg-red-50 text-red-700 ring-red-600/20",
};

const initialAuditTrail = [
  {
    time: "Today, 6:42 PM",
    actor: "System",
    action: "Flagged loan LN-2026-887 for duplicate PAN on file",
    severity: "high",
  },
  {
    time: "Today, 3:10 PM",
    actor: "Meera Joshi",
    action: "Approved KYC for AC-77213 after manual document review",
    severity: "low",
  },
  {
    time: "Yesterday, 11:05 AM",
    actor: "System",
    action: "Auto-verified 14 Aadhaar records via NSDL check",
    severity: "low",
  },
  {
    time: "Yesterday, 9:30 AM",
    actor: "Arjun Mehta",
    action: "Overrode risk score on AC-76930, added compliance note",
    severity: "medium",
  },
  {
    time: "26 Aug, 4:15 PM",
    actor: "System",
    action: "Escalated 3 accounts for AML review, weekly sweep",
    severity: "medium",
  },
];

const severityDot = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

const initialFilings = [
  {
    name: "Monthly NBFC Return",
    regulator: "RBI",
    due: "05 Sep 2026",
    status: "Due",
  },
  {
    name: "Suspicious Transaction Report",
    regulator: "FIU-IND",
    due: "01 Sep 2026",
    status: "Overdue",
  },
  {
    name: "Quarterly Portfolio Disclosure",
    regulator: "RBI",
    due: "15 Sep 2026",
    status: "Due",
  },
  {
    name: "Annual AML Audit Certificate",
    regulator: "Internal Audit",
    due: "10 Aug 2026",
    status: "Filed",
  },
];

const filingStatusStyle = {
  Due: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Overdue: "bg-red-50 text-red-700 ring-red-600/20",
  Filed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const tabs = [
  { id: "kyc", label: "KYC queue" },
  { id: "audit", label: "Audit trail" },
  { id: "filings", label: "Regulatory filings" },
];

function KpiCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 border-l-4 ${accent} p-4`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <Icon size={15} className="text-slate-300" />
      </div>

      <p className="mt-1.5 font-mono text-2xl text-slate-900 tracking-tight">
        {value}
      </p>

      {sub && (
        <p className="mt-1 text-xs text-slate-400">
          {sub}
        </p>
      )}
    </div>
  );
}

export default function Compliance() {
  const [tab, setTab] = useState("kyc");

  const [kycQueue, setKycQueue] = useState(initialKycQueue);

  const [auditTrail, setAuditTrail] = useState(initialAuditTrail);

  const [filings, setFilings] = useState(initialFilings);

  // Modal states
  const [showFilingModal, setShowFilingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Selected KYC customer
  const [selectedKyc, setSelectedKyc] = useState(null);

  // New filing form
  const [filingForm, setFilingForm] = useState({
    name: "",
    regulator: "",
    due: "",
    status: "Due",
  });

  // -----------------------------------------
  // NEW FILING
  // -----------------------------------------

  const handleFilingInput = (e) => {
    const { name, value } = e.target;

    setFilingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateFiling = (e) => {
    e.preventDefault();

    if (
      !filingForm.name.trim() ||
      !filingForm.regulator.trim() ||
      !filingForm.due
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const date = new Date(filingForm.due);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newFiling = {
      name: filingForm.name,
      regulator: filingForm.regulator,
      due: formattedDate,
      status: filingForm.status,
    };

    setFilings((prev) => [newFiling, ...prev]);

    setAuditTrail((prev) => [
      {
        time: "Just now",
        actor: "Me",
        action: `Created new regulatory filing: ${filingForm.name}`,
        severity: "low",
      },
      ...prev,
    ]);

    setFilingForm({
      name: "",
      regulator: "",
      due: "",
      status: "Due",
    });

    setShowFilingModal(false);

    // Automatically open filings tab
    setTab("filings");
  };

  // -----------------------------------------
  // REVIEW KYC
  // -----------------------------------------

  const handleReview = (kyc) => {
    setSelectedKyc(kyc);
    setShowReviewModal(true);
  };

  const handleKycAction = (action) => {
    if (!selectedKyc) return;

    let actionText = "";
    let severity = "low";

    if (action === "approve") {
      actionText = `Approved KYC for ${selectedKyc.account} after manual document review`;
      severity = "low";
    }

    if (action === "reject") {
      actionText = `Rejected KYC for ${selectedKyc.account} after document review`;
      severity = "high";
    }

    if (action === "escalate") {
      actionText = `Escalated ${selectedKyc.account} for compliance review`;
      severity = "medium";
    }

    // Remove from pending KYC queue
    setKycQueue((prev) =>
      prev.filter((item) => item.account !== selectedKyc.account)
    );

    // Add audit entry
    setAuditTrail((prev) => [
      {
        time: "Just now",
        actor: "Me",
        action: actionText,
        severity,
      },
      ...prev,
    ]);

    setShowReviewModal(false);
    setSelectedKyc(null);

    // If escalate, show audit trail
    if (action === "escalate") {
      setTab("audit");
    }
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <nav className="text-xs text-slate-400 mb-1">
            Compliance
          </nav>

          <h1 className="text-xl font-semibold text-slate-900">
            Compliance
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            KYC checks, audit trails and regulatory filings
          </p>
        </div>

        <button
          onClick={() => setShowFilingModal(true)}
          className="flex items-center gap-2 h-9 px-3 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          <Plus size={15} />
          New filing
        </button>
      </div>

      {/* ================= KPI ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <KpiCard
          icon={UserCheck}
          label="Pending KYC reviews"
          value={kycQueue.length}
          sub="6 submitted today"
          accent="border-l-indigo-500"
        />

        <KpiCard
          icon={ShieldAlert}
          label="Open audit flags"
          value="4"
          sub="1 high severity"
          accent="border-l-red-500"
        />

        <KpiCard
          icon={Clock}
          label="Filings due (30 days)"
          value={filings.filter((f) => f.status !== "Filed").length}
          sub="1 overdue"
          accent="border-l-amber-500"
        />

        <KpiCard
          icon={ShieldCheck}
          label="Compliance score"
          value="94%"
          sub="Up 2 pts this month"
          accent="border-l-emerald-500"
        />

      </div>

      {/* ================= TABS ================= */}

      <div className="flex items-center gap-1 mb-4 border-b border-slate-200">

        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition ${
              tab === t.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}

      </div>

      {/* ================= KYC QUEUE ================= */}

      {tab === "kyc" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">

          <table className="w-full text-sm">

            <thead>
              <tr className="bg-slate-50 text-left text-xs font-medium text-slate-500 border-b border-slate-200">

                <th className="px-4 py-2.5">
                  Customer
                </th>

                <th className="px-4 py-2.5">
                  Document
                </th>

                <th className="px-4 py-2.5">
                  Submitted
                </th>

                <th className="px-4 py-2.5 text-center">
                  Risk
                </th>

                <th className="px-4 py-2.5 text-right">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {kycQueue.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-sm text-slate-400"
                  >
                    No pending KYC reviews
                  </td>
                </tr>
              ) : (
                kycQueue.map((k, i) => (

                  <tr
                    key={k.account}
                    className={`border-b border-slate-100 last:border-0 ${
                      i % 2 ? "bg-slate-50/50" : "bg-white"
                    }`}
                  >

                    <td className="px-4 py-3">

                      <div className="text-slate-800">
                        {k.customer}
                      </div>

                      <div className="text-xs text-slate-400 font-mono">
                        {k.account}
                      </div>

                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {k.doc}
                    </td>

                    <td className="px-4 py-3 text-slate-500 font-mono text-[13px]">
                      {k.submitted}
                    </td>

                    <td className="px-4 py-3 text-center">

                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                          riskStyle[k.risk]
                        }`}
                      >
                        {k.risk}
                      </span>

                    </td>

                    <td className="px-4 py-3 text-right">

                      <button
                        onClick={() => handleReview(k)}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        Review
                      </button>

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>
      )}

      {/* ================= AUDIT TRAIL ================= */}

      {tab === "audit" && (
        <div className="bg-white rounded-lg border border-slate-200 p-5">

          <ol className="relative border-l border-slate-200 ml-1.5">

            {auditTrail.map((a, i) => (

              <li
                key={i}
                className="mb-6 last:mb-0 ml-4"
              >

                <span
                  className={`absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full ${
                    severityDot[a.severity]
                  }`}
                />

                <p className="text-xs text-slate-400 font-mono">
                  {a.time}
                </p>

                <p className="text-sm text-slate-800 mt-0.5">
                  {a.action}
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  {a.actor}
                </p>

              </li>

            ))}

          </ol>

        </div>
      )}

      {/* ================= REGULATORY FILINGS ================= */}

      {tab === "filings" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {filings.map((f, index) => (

            <div
              key={`${f.name}-${index}`}
              className="bg-white rounded-lg border border-slate-200 p-4 flex items-start justify-between gap-3"
            >

              <div className="flex items-start gap-3">

                <div className="mt-0.5 text-slate-300">

                  {f.status === "Overdue" ? (
                    <Ban size={18} />
                  ) : f.status === "Filed" ? (
                    <FileCheck2 size={18} />
                  ) : (
                    <AlertTriangle size={18} />
                  )}

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-800">
                    {f.name}
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    {f.regulator} &middot; due {f.due}
                  </p>

                </div>

              </div>

              <span
                className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                  filingStatusStyle[f.status]
                }`}
              >
                {f.status}
              </span>

            </div>

          ))}

        </div>
      )}

      {/* =====================================================
          NEW FILING MODAL
      ===================================================== */}

      {showFilingModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  New Regulatory Filing
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Create a new compliance filing
                </p>
              </div>

              <button
                onClick={() => setShowFilingModal(false)}
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleCreateFiling}
              className="p-5 space-y-4"
            >

              {/* Filing Name */}

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Filing name
                </label>

                <input
                  type="text"
                  name="name"
                  value={filingForm.name}
                  onChange={handleFilingInput}
                  placeholder="e.g. Monthly NBFC Return"
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {/* Regulator */}

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Regulator
                </label>

                <input
                  type="text"
                  name="regulator"
                  value={filingForm.regulator}
                  onChange={handleFilingInput}
                  placeholder="e.g. RBI"
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {/* Due Date */}

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Due date
                </label>

                <input
                  type="date"
                  name="due"
                  value={filingForm.due}
                  onChange={handleFilingInput}
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {/* Status */}

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Status
                </label>

                <select
                  name="status"
                  value={filingForm.status}
                  onChange={handleFilingInput}
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="Due">
                    Due
                  </option>

                  <option value="Overdue">
                    Overdue
                  </option>

                  <option value="Filed">
                    Filed
                  </option>

                </select>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => setShowFilingModal(false)}
                  className="h-9 px-4 rounded-md border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-9 px-4 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Create filing
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          KYC REVIEW MODAL
      ===================================================== */}

      {showReviewModal && selectedKyc && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">

            {/* Header */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">

              <div>

                <h2 className="text-base font-semibold text-slate-900">
                  KYC Review
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Review customer documents before taking action
                </p>

              </div>

              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedKyc(null);
                }}
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>

            </div>

            {/* Customer Details */}

            <div className="p-5">

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-lg border border-slate-200 p-3">

                  <p className="text-xs text-slate-400">
                    Customer
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {selectedKyc.customer}
                  </p>

                </div>

                <div className="rounded-lg border border-slate-200 p-3">

                  <p className="text-xs text-slate-400">
                    Account
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1 font-mono">
                    {selectedKyc.account}
                  </p>

                </div>

                <div className="rounded-lg border border-slate-200 p-3">

                  <p className="text-xs text-slate-400">
                    Document
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {selectedKyc.doc}
                  </p>

                </div>

                <div className="rounded-lg border border-slate-200 p-3">

                  <p className="text-xs text-slate-400">
                    Submitted
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1 font-mono">
                    {selectedKyc.submitted}
                  </p>

                </div>

              </div>

              {/* Risk */}

              <div className="mt-4 rounded-lg border border-slate-200 p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-slate-400">
                      Risk assessment
                    </p>

                    <p className="text-sm font-medium text-slate-800 mt-1">
                      Current customer risk level
                    </p>

                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${
                      riskStyle[selectedKyc.risk]
                    }`}
                  >
                    {selectedKyc.risk} Risk
                  </span>

                </div>

              </div>

              {/* Document preview */}

              <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center">

                <FileCheck2
                  size={28}
                  className="mx-auto text-slate-400"
                />

                <p className="text-sm font-medium text-slate-700 mt-2">
                  Document verification
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {selectedKyc.doc}
                </p>

                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View document
                  <ArrowUpRight size={13} />
                </button>

              </div>

              {/* Actions */}

              <div className="flex flex-wrap justify-end gap-2 mt-5">

                <button
                  onClick={() => handleKycAction("reject")}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-md border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50"
                >
                  <XCircle size={15} />
                  Reject
                </button>

                <button
                  onClick={() => handleKycAction("escalate")}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-md border border-amber-200 text-amber-600 text-sm font-medium hover:bg-amber-50"
                >
                  <ArrowUpRight size={15} />
                  Escalate
                </button>

                <button
                  onClick={() => handleKycAction("approve")}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
                >
                  <CheckCircle2 size={15} />
                  Approve KYC
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}