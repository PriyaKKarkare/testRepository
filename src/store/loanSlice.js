import { createSlice } from "@reduxjs/toolkit";

const STATUS_STYLES = {
  Draft: { statusColor: "bg-gray-100 text-gray-700 border-gray-300", statusDot: "bg-gray-500" },
  Submitted: { statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200", statusDot: "bg-emerald-500" },
  Verified: { statusColor: "bg-blue-50 text-blue-700 border-blue-200", statusDot: "bg-blue-500" },
  Audited: { statusColor: "bg-purple-50 text-purple-700 border-purple-200", statusDot: "bg-purple-500" },
};

const initialLoans = [
  {
    date: "30/04/2024",
    loanId: "LN002-24-1001",
    status: "Draft",
    ...STATUS_STYLES.Draft,
    applicant: "Arjun Mehta",
    bank: "HDFC Bank",
    sanctionedAmt: "7500.00",
    verifiedAmt: "—",
    referralPct: "0.1500%",
    creditExecutive: "Arjun Mehta",
    bankRM: "Siddharth",
  },
  {
    date: "30/09/2024",
    loanId: "LN003-24-1002",
    status: "Submitted",
    ...STATUS_STYLES.Submitted,
    applicant: "Mohit Agarwal",
    bank: "ICICI Bank",
    sanctionedAmt: "12000.00",
    verifiedAmt: "—",
    referralPct: "0.2500%",
    creditExecutive: "Mohit Agarwal",
    bankRM: "Tanvi N",
  },
  {
    date: "12/05/2027",
    loanId: "LN004-24-1003",
    status: "Submitted",
    ...STATUS_STYLES.Submitted,
    applicant: "Priya Singh",
    bank: "Axis Bank",
    sanctionedAmt: "15000.00",
    verifiedAmt: "—",
    referralPct: "0.3500%",
    creditExecutive: "Priya Singh",
    bankRM: "Deepa",
  },
  {
    date: "15/01/2024",
    loanId: "LN005-24-1004",
    status: "Submitted",
    ...STATUS_STYLES.Submitted,
    applicant: "Simran Anand",
    bank: "State Bank of India",
    sanctionedAmt: "22000.00",
    verifiedAmt: "—",
    referralPct: "0.4500%",
    creditExecutive: "Simran Anand",
    bankRM: "Suresh",
  },
  {
    date: "20/02/2024",
    loanId: "LN010-24-1009",
    status: "Verified",
    ...STATUS_STYLES.Verified,
    applicant: "Neha Gupta",
    bank: "IDFC FIRST Bank",
    sanctionedAmt: "130000.00",
    verifiedAmt: "₹18,11,234.00",
    referralPct: "1.1500%",
    creditExecutive: "Neha Gupta",
    bankRM: "Ritika M",
  },
  {
    date: "20/02/2024",
    loanId: "LN009-24-1008",
    status: "Audited",
    ...STATUS_STYLES.Audited,
    applicant: "Karan Iyer",
    bank: "Union Bank of India",
    sanctionedAmt: "90000.00",
    verifiedAmt: "₹17,00,123.00",
    referralPct: "0.9500%",
    creditExecutive: "Karan Iyer",
    bankRM: "Ankit P",
  },
];

let seq = initialLoans.length + 1;

const loanSlice = createSlice({
  name: "loans",
  initialState: {
    list: initialLoans,
  },
  reducers: {
    addLoan: {
      reducer: (state, action) => {
        state.list.unshift(action.payload);
      },
      // Shapes the raw LoanForm state into a disbursement-table row.
      prepare: (form) => {
        const status = "Draft";
        const id = seq++;
        const newLoan = {
          date: new Date().toLocaleDateString("en-GB"),
          loanId: `LN${String(id).padStart(3, "0")}-24-${1000 + id}`,
          status,
          ...STATUS_STYLES[status],
          applicant: form.customerName || "Untitled Applicant",
          bank: form.bank || "—",
          sanctionedAmt: form.loanAmount || "0.00",
          verifiedAmt: "—",
          referralPct: form.referralFee ? `${form.referralFee}%` : "—",
          creditExecutive: form.creditExecutive || "—",
          bankRM: form.bankExecutive || "—",
        };
        return { payload: newLoan };
      },
    },
    updateLoanStatus: (state, action) => {
      const { loanId, status } = action.payload;
      const loan = state.list.find((l) => l.loanId === loanId);
      if (loan && STATUS_STYLES[status]) {
        loan.status = status;
        loan.statusColor = STATUS_STYLES[status].statusColor;
        loan.statusDot = STATUS_STYLES[status].statusDot;
      }
    },
    removeLoan: (state, action) => {
      state.list = state.list.filter((l) => l.loanId !== action.payload);
    },
  },
});

export const { addLoan, updateLoanStatus, removeLoan } = loanSlice.actions;
export default loanSlice.reducer;
