import React, { useState } from "react";
import {
  Sparkles,
  FileSearch,
  ShieldCheck,
  BrainCircuit,
  ScanText,
  Play,
  ArrowRight,
  CheckCircle2,
  Clock3,
  X,
  Zap,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const aiSuites = [
  {
    id: 1,
    title: "AI Underwriting",
    description:
      "Analyze borrower profiles, financial data and application details to support faster underwriting decisions.",
    icon: BrainCircuit,
    status: "Ready",
    category: "Lending",
  },
  {
    id: 2,
    title: "Document Intelligence",
    description:
      "Extract and validate information from financial and identity documents using AI-powered document analysis.",
    icon: FileSearch,
    status: "Ready",
    category: "Documents",
  },
  {
    id: 3,
    title: "Risk Analysis",
    description:
      "Identify risk patterns and generate an AI-assisted risk assessment for customer and loan applications.",
    icon: TrendingUp,
    status: "Ready",
    category: "Risk",
  },
  {
    id: 4,
    title: "KYC Verification",
    description:
      "Review identity documents and detect inconsistencies, missing information and potential verification issues.",
    icon: ShieldCheck,
    status: "Ready",
    category: "Compliance",
  },
  {
    id: 5,
    title: "OCR & Data Extraction",
    description:
      "Automatically extract structured data from uploaded invoices, bank statements and supporting documents.",
    icon: ScanText,
    status: "Ready",
    category: "Documents",
  },
  {
    id: 6,
    title: "Fraud Detection",
    description:
      "Detect suspicious patterns and potential fraud indicators across customer and transaction information.",
    icon: AlertTriangle,
    status: "Ready",
    category: "Security",
  },
];

const recentRuns = [
  {
    name: "KYC Verification",
    customer: "AC-77213",
    time: "Today, 6:42 PM",
    status: "Completed",
  },
  {
    name: "Risk Analysis",
    customer: "LN-2026-887",
    time: "Today, 4:18 PM",
    status: "Completed",
  },
  {
    name: "Document Intelligence",
    customer: "AC-77198",
    time: "Today, 2:30 PM",
    status: "Completed",
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

export default function AISuits() {
  const [selectedSuite, setSelectedSuite] = useState(null);
  const [showRunModal, setShowRunModal] = useState(false);
  const [running, setRunning] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Lending",
    "Documents",
    "Risk",
    "Compliance",
    "Security",
  ];

  const filteredSuites =
    activeCategory === "All"
      ? aiSuites
      : aiSuites.filter((suite) => suite.category === activeCategory);

  const handleRunSuite = (suite) => {
    setSelectedSuite(suite);
    setShowRunModal(true);
  };

  const handleStartSuite = () => {
    setRunning(true);

    setTimeout(() => {
      setRunning(false);
    }, 1800);
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <nav className="text-xs text-slate-400 mb-1">
            AI Suits
          </nav>

          <h1 className="text-xl font-semibold text-slate-900">
            AI Suits
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            AI-powered underwriting, document analysis and risk intelligence
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedSuite(null);
            setShowRunModal(true);
          }}
          className="flex items-center gap-2 h-9 px-3 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          <Play size={14} />
          Run Suite
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Available AI tools
            </p>

            <Sparkles size={16} className="text-slate-300" />
          </div>

          <p className="mt-1.5 font-mono text-2xl text-slate-900">
            6
          </p>

          <p className="mt-1 text-xs text-slate-400">
            All systems ready
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Runs today
            </p>

            <Zap size={16} className="text-slate-300" />
          </div>

          <p className="mt-1.5 font-mono text-2xl text-slate-900">
            28
          </p>

          <p className="mt-1 text-xs text-slate-400">
            +12% from yesterday
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Documents processed
            </p>

            <FileSearch size={16} className="text-slate-300" />
          </div>

          <p className="mt-1.5 font-mono text-2xl text-slate-900">
            142
          </p>

          <p className="mt-1 text-xs text-slate-400">
            This month
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              AI accuracy
            </p>

            <CheckCircle2 size={16} className="text-slate-300" />
          </div>

          <p className="mt-1.5 font-mono text-2xl text-slate-900">
            96.4%
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Based on recent reviews
          </p>
        </div>

      </div>

      {/* =====================================================
          AI SUITES SECTION
      ===================================================== */}

      <div className="bg-white rounded-lg border border-slate-200">

        {/* Section header */}

        <div className="px-5 py-4 border-b border-slate-200">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                AI capabilities
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Select an AI suite to analyze your data
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto">

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition ${
                    activeCategory === category
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>

          </div>

        </div>

        {/* Cards */}

        <div className="p-5">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {filteredSuites.map((suite) => {
              const Icon = suite.icon;

              return (
                <div
                  key={suite.id}
                  className="group rounded-lg border border-slate-200 p-4 hover:border-indigo-200 hover:shadow-sm transition bg-white"
                >

                  {/* Icon + status */}

                  <div className="flex items-start justify-between">

                    <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Icon
                        size={19}
                        className="text-indigo-600"
                      />
                    </div>

                    <StatusBadge status={suite.status} />

                  </div>

                  {/* Content */}

                  <div className="mt-4">

                    <div className="flex items-center gap-2">

                      <h3 className="text-sm font-semibold text-slate-800">
                        {suite.title}
                      </h3>

                    </div>

                    <p className="text-xs text-slate-400 leading-5 mt-2 min-h-[60px]">
                      {suite.description}
                    </p>

                  </div>

                  {/* Footer */}

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">

                    <span className="text-[11px] text-slate-400">
                      {suite.category}
                    </span>

                    <button
                      onClick={() => handleRunSuite(suite)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Run suite
                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-0.5 transition"
                      />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT RUNS
      ===================================================== */}

      <div className="bg-white rounded-lg border border-slate-200 mt-5">

        <div className="px-5 py-4 border-b border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Recent AI runs
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Latest activity across AI suites
              </p>
            </div>

            <Clock3
              size={16}
              className="text-slate-300"
            />

          </div>

        </div>

        <div className="divide-y divide-slate-100">

          {recentRuns.map((run, index) => (

            <div
              key={index}
              className="px-5 py-3 flex items-center justify-between gap-4"
            >

              <div className="flex items-center gap-3">

                <div className="h-8 w-8 rounded-md bg-slate-50 flex items-center justify-center">
                  <Sparkles
                    size={14}
                    className="text-indigo-500"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-800 font-medium">
                    {run.name}
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    {run.customer} · {run.time}
                  </p>
                </div>

              </div>

              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <CheckCircle2 size={13} />
                {run.status}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* =====================================================
          RUN SUITE MODAL
      ===================================================== */}

      {showRunModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">

            {/* Modal header */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">

              <div className="flex items-center gap-3">

                <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Sparkles
                    size={17}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {selectedSuite
                      ? selectedSuite.title
                      : "Run AI Suite"}
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    AI-assisted analysis
                  </p>
                </div>

              </div>

              <button
                onClick={() => {
                  setShowRunModal(false);
                  setRunning(false);
                }}
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>

            </div>

            {/* Modal content */}

            <div className="p-5">

              {selectedSuite ? (

                <>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">

                    <p className="text-xs text-slate-400">
                      Selected suite
                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {selectedSuite.title}
                    </p>

                    <p className="text-xs text-slate-500 leading-5 mt-2">
                      {selectedSuite.description}
                    </p>

                  </div>

                  <div className="mt-4">

                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Reference ID
                    </label>

                    <input
                      type="text"
                      placeholder="Enter account / loan ID"
                      className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />

                  </div>

                  <div className="mt-4">

                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Analysis mode
                    </label>

                    <select
                      className="w-full h-9 px-3 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                      <option>Standard analysis</option>
                      <option>Detailed analysis</option>
                      <option>High risk review</option>
                    </select>

                  </div>

                </>

              ) : (

                <div>

                  <p className="text-sm font-medium text-slate-800">
                    Choose an AI capability
                  </p>

                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    Select the AI suite you want to run.
                  </p>

                  <div className="space-y-2">

                    {aiSuites.map((suite) => {
                      const Icon = suite.icon;

                      return (
                        <button
                          key={suite.id}
                          onClick={() => setSelectedSuite(suite)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30 text-left transition"
                        >

                          <div className="h-9 w-9 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
                            <Icon
                              size={16}
                              className="text-indigo-600"
                            />
                          </div>

                          <div className="flex-1">

                            <p className="text-sm font-medium text-slate-800">
                              {suite.title}
                            </p>

                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {suite.category}
                            </p>

                          </div>

                          <ArrowRight
                            size={14}
                            className="text-slate-300"
                          />

                        </button>
                      );
                    })}

                  </div>

                </div>

              )}

              {/* Bottom actions */}

              {selectedSuite && (

                <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-slate-200">

                  <button
                    onClick={() => {
                      setShowRunModal(false);
                      setRunning(false);
                    }}
                    className="h-9 px-4 rounded-md border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleStartSuite}
                    disabled={running}
                    className="flex items-center gap-2 h-9 px-4 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >

                    {running ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        Start analysis
                      </>
                    )}

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}