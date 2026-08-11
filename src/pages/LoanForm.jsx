import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLoan } from "../store/loanSlice";

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-slate-500">
      {label} {required && <span className="text-indigo-500">*</span>}
    </label>
    {children}
  </div>
);

const inputClasses =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const SectionCard = ({ title, sideLabel, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 py-6 border-b border-slate-100 last:border-none">
    <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">{children}</div>
  </div>
);

export default function LoanForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    loanAmount: "",
    productType: "",
    bank: "",
    stage: "",
    status: "",
    priority: "",
    bankCommission: "",
    referralFee: "",
    creditExecutive: "",
    bankExecutive: "",
    brokerName: "",
    brokerType: "",
    brokerCode: "",
    commissionPct: "",
    notes: "",
  });

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleAddLoan = () => {
    dispatch(addLoan(form));
    navigate("/rms/disbursement");
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-800 font-sans">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page header */}
        <div className="px-8 pt-6 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Loans</h1>
            <div className="text-xs text-slate-400 mt-1">
              RMS <span className="mx-1">›</span> Loan <span className="mx-1">›</span>
              <span className="text-slate-500">Add New Loan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-slate-600 border border-slate-200 rounded-md px-4 py-2 bg-white hover:bg-slate-50">
              Save as Draft
            </button>
            <button onClick={handleAddLoan}
              className="text-sm font-medium text-white rounded-md px-4 py-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm">
              Add Loan
            </button>
          </div>
        </div>

        {/* Form card */}
        <main className="px-8 py-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-8">
            <SectionCard title="Customer Information">
              <Field label="Customer Name" required>
                <input
                  className={inputClasses}
                  placeholder="Enter Customer name"
                  value={form.customerName}
                  onChange={update("customerName")}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  className={inputClasses}
                   placeholder="billing@gmail.com"
                  value={form.email}
                  onChange={update("email")}
                />
              </Field>
              <Field label="Phone Number">
                <input
                  className={inputClasses}
                   placeholder="+91 7896545412"
                  value={form.phone}
                  onChange={update("phone")}
                />
              </Field>
            </SectionCard>

            <SectionCard title="Loan Details">
              <Field label="Loan Amount" required>
                <input
                  className={inputClasses}
                   placeholder="48,50,000"
                  value={form.loanAmount}
                  onChange={update("loanAmount")}
                />
              </Field>
              <Field label="Product Type" required>
                <div className="relative">
                  <input
                    className={inputClasses + " pr-8"}
                    value={form.productType}
                    onChange={update("productType")}
                  />
                  <Info
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                  />
                </div>
              </Field>
              <Field label="Bank" required>
                <input
                  className={inputClasses}
                  value={form.bank}
                  onChange={update("bank")}
                />
              </Field>
              <Field label="Stage" required>
                <select
                  className={inputClasses + " appearance-none"}
                  value={form.stage}
                  onChange={update("stage")}
                >
                  <option>Lead</option>
                  <option>Application</option>
                  <option>Underwriting</option>
                  <option>Approved</option>
                  <option>Disbursed</option>
                </select>
              </Field>
              <Field label="Status" required>
                <select
                  className={inputClasses + " appearance-none"}
                  value={form.status}
                  onChange={update("status")}
                >
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Closed</option>
                  <option>Rejected</option>
                </select>
              </Field>
              <Field label="Priority">
                <select
                  className={inputClasses + " appearance-none"}
                  value={form.priority}
                  onChange={update("priority")}
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </Field>
            </SectionCard>

            <SectionCard title="Commission & Executive Details">
              <Field label="Bank Commission %" required>
                <input
                  className={inputClasses}
                  value={form.bankCommission}
                  onChange={update("bankCommission")}
                />
              </Field>
              <Field label="Referral Fee" required>
                <input
                  className={inputClasses}
                  value={form.referralFee}
                  onChange={update("referralFee")}
                />
              </Field>
              <Field label="Credit Executive Details" required>
                <input
                  className={inputClasses}
                  value={form.creditExecutive}
                  onChange={update("creditExecutive")}
                />
              </Field>
              <Field label="Bank Executive Name" required>
                <input
                  className={inputClasses}
                  value={form.bankExecutive}
                  onChange={update("bankExecutive")}
                />
              </Field>
            </SectionCard>

            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 py-6 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700">
                Broker Information
              </h3>
              <div>
                <div className="bg-slate-50 rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  <Field label="Broker Name" required>
                    <input
                      className={inputClasses}
                      placeholder="Enter Broker Name"
                      value={form.brokerName}
                      onChange={update("brokerName")}
                    />
                  </Field>
                  <Field label="Broker Type" required>
                    <select
                      className={inputClasses + " appearance-none"}
                      value={form.brokerType}
                      onChange={update("brokerType")}
                    >
                      <option>Direct</option>
                      <option>Referral</option>
                      <option>Agency</option>
                    </select>
                  </Field>
                  <Field label="Broker Code" required>
                    <input
                      className={inputClasses}
                      value={form.brokerCode}
                      onChange={update("brokerCode")}
                    />
                  </Field>
                  <Field label="Commission %" required>
                    <input
                      className={inputClasses}
                      value={form.commissionPct}
                      onChange={update("commissionPct")}
                    />
                  </Field>
                </div>
                <button className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  <Plus size={15} />
                  Add another
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 py-6">
              <h3 className="text-sm font-semibold text-slate-700">
                Additional Information
              </h3>
              <Field
                label={
                  <span className="flex items-center gap-1">
                    Notes <Info size={12} className="text-slate-300" />
                  </span>
                }
                required
              >
                <textarea
                  rows={4}
                  className={inputClasses + " resize-none"}
                  placeholder="Add any additional notes or comments"
                  value={form.notes}
                  onChange={update("notes")}
                />
              </Field>
            </div>
          </div>
          <div className="h-8" />
        </main>
      </div>
    </div>
  );
}
