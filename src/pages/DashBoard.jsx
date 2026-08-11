import React, { useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Bitcoin,
  Wallet,
} from "lucide-react";

const stats = [
  { label: "Portfolio Value", value: "$58,145.07", delta: "+2.5%", up: true },
  { label: "Total Crypto Earnings", value: "$23,450.25", delta: "+4.6%", up: true },
  { label: "Total Withdrawals", value: "$18,500.99", delta: "-4.3%", up: false },
  { label: "Staking Rewards", value: "$6,765.12", delta: "+8.2%", up: true },
];

const topGainers = [
  { name: "Bitcoin (BTC)", amount: "$26,000", pct: 78 },
  { name: "Ethereum (ETH)", amount: "$14,340", pct: 52 },
  { name: "Solana (SOL)", amount: "$10,400", pct: 65 },
];

const topLosers = [
  { name: "Cardano (ADA)", amount: "$2,600", pct: 35 },
  { name: "Ripple (XRP)", amount: "$1,340", pct: 20 },
  { name: "Polkadot (DOT)", amount: "$400", pct: 15 },
];

const transactions = [
  { name: "Bitcoin Buy", type: "Buy", amount: "+ 0.0204 BTC", val: "$1,500.00", date: "16 Oct 2025, 10:12 AM", initials: "BTC", tone: "bg-amber-100 text-amber-700" },
  { name: "Ethereum Swap", type: "Swap", amount: "- 0.45 ETH", val: "$1,250.00", date: "10 Oct 2025, 08:20 AM", initials: "ETH", tone: "bg-indigo-100 text-indigo-700" },
  { name: "Solana Deposit", type: "Deposit", amount: "+ 12.5 SOL", val: "$1,850.00", date: "07 Oct 2025, 07:31 PM", initials: "SOL", tone: "bg-purple-100 text-purple-700" },
  { name: "USDC Withdrawal", type: "Withdrawal", amount: "- 309.99 USDC", val: "$309.99", date: "06 Oct 2025, 07:31 PM", initials: "USDC", tone: "bg-blue-100 text-blue-700" },
  { name: "Cardano Sell", type: "Sell", amount: "- 500 ADA", val: "$409.99", date: "04 Oct 2025, 07:31 PM", initials: "ADA", tone: "bg-sky-100 text-sky-700" },
  { name: "Polkadot Stake", type: "Stake", amount: "+ 45 DOT", val: "$309.99", date: "02 Oct 2025, 12:31 PM", initials: "DOT", tone: "bg-pink-100 text-pink-700" },
];

const LineChart = () => {
  const width = 560;
  const height = 180;
  const seriesA = [40, 55, 50, 70, 60, 90, 75, 95, 85, 110, 100, 150];
  const seriesB = [90, 70, 60, 50, 65, 55, 75, 60, 90, 80, 95, 130];

  const toPoints = (series) => {
    const max = Math.max(...seriesA, ...seriesB);
    const stepX = width / (series.length - 1);
    return series
      .map((v, i) => `${i * stepX},${height - (v / max) * (height - 20)}`)
      .join(" ");
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      <polyline points={toPoints(seriesA)} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={toPoints(seriesB)} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function CryptoDashboard() {
  const [checked, setChecked] = useState([]);

  const toggleRow = (key) =>
    setChecked((prev) => (prev.includes(key) ? prev.filter((n) => n !== key) : [...prev, key]));

  return (
    <div className="w-full min-h-screen bg-[#F6F5FD] p-4 sm:p-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">Crypto Overview</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-2xs hover:bg-gray-50">
            <Wallet size={16} className="text-gray-500" />
            Manage Wallets
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
            <Plus size={16} />
            Buy / Sell Crypto
          </button>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-2 shadow-2xs sm:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-gray-100">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 py-3">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-rose-500"}`}>
              {stat.delta} <span className="font-normal text-gray-400">vs last month</span>
            </span>
          </div>
        ))}
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Market Performance</h2>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View All Assets</button>
          </div>

          <div className="mt-4 flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                <ArrowUpRight size={15} />
              </span>
              <div>
                <p className="text-xs text-gray-500">Total Buy Volume</p>
                <p className="text-sm font-semibold text-gray-900">$34,200.00</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-50 text-amber-500">
                <ArrowDownLeft size={15} />
              </span>
              <div>
                <p className="text-xs text-gray-500">Total Sell Volume</p>
                <p className="text-sm font-semibold text-gray-900">$18,400.00</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <LineChart />
            <div className="mt-1 flex justify-between text-[11px] text-gray-400">
              <span>01 June</span>
              <span>07 July</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Top Coin Performance</h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <button className="rounded-md p-1 hover:bg-gray-50">
                <ChevronLeft size={14} />
              </button>
              <span>Sep, 2025</span>
              <button className="rounded-md p-1 hover:bg-gray-50">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-100 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Top Gainers</p>
                  <p className="text-sm font-semibold text-gray-900">$50,740.00</p>
                </div>
                <MoreVertical size={14} className="text-gray-400" />
              </div>
              <div className="mt-3 flex flex-col gap-3">
                {topGainers.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-medium text-gray-800">{item.amount}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-indigo-100">
                      <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Declining Assets</p>
                  <p className="text-sm font-semibold text-gray-900">$4,340.00</p>
                </div>
                <MoreVertical size={14} className="text-gray-400" />
              </div>
              <div className="mt-3 flex flex-col gap-3">
                {topLosers.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-medium text-gray-800">{item.amount}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-amber-100">
                      <div className="h-1.5 rounded-full bg-amber-500" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions & Wallets Section */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
            <h2 className="text-sm font-semibold text-gray-800">Crypto Transactions</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search transactions..."
                  className="w-44 rounded-lg border border-gray-200 py-1.5 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-56"
                />
              </div>
              <button className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50">
                <SlidersHorizontal size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="border-b border-gray-100 uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="w-8 p-3"></th>
                  <th className="p-3 font-medium">Asset</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Crypto Amount</th>
                  <th className="p-3 font-medium">USD Value</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="w-8 p-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => {
                  const key = `${tx.name}-${tx.date}`;
                  return (
                    <tr key={key} className="hover:bg-gray-50/60">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={checked.includes(key)}
                          onChange={() => toggleRow(key)}
                          className="rounded border-gray-300 text-indigo-600 accent-indigo-600"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${tx.tone}`}>
                            {tx.initials}
                          </span>
                          <span className="font-medium text-gray-800">{tx.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">{tx.type}</td>
                      <td className={`p-3 font-mono ${tx.amount.startsWith("+") ? "text-emerald-600" : "text-gray-700"}`}>
                        {tx.amount}
                      </td>
                      <td className="p-3 font-mono text-gray-800">{tx.val}</td>
                      <td className="whitespace-nowrap p-3 text-gray-500">{tx.date}</td>
                      <td className="p-3 text-right">
                        <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100">
                          <MoreVertical size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Crypto Wallets</h2>
            <MoreVertical size={14} className="text-gray-400" />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            <div className="flex min-w-[220px] flex-col justify-between rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Bitcoin Wallet</span>
                <Bitcoin size={20} />
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-white/70">Balance</p>
                <p className="text-lg font-bold">1.245 BTC</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-white/80">
                <span>0x8F...39A2</span>
                <span className="font-semibold">~ $81,240 USD</span>
              </div>
            </div>

            <div className="flex min-w-[220px] flex-col justify-between rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Ethereum Wallet</span>
                <Wallet size={18} />
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-white/70">Balance</p>
                <p className="text-lg font-bold">14.82 ETH</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-white/80">
                <span>0x3B...12C9</span>
                <span className="font-semibold">~ $48,900 USD</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total Portfolio (USD)</span>
              <span className="font-semibold text-gray-900">$130,140.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Active Wallet</span>
              <span className="font-medium text-gray-800">0x8F...39A2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Network Fee Tier</span>
              <span className="font-medium text-gray-800">Standard (12 Gwei)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Security Status</span>
              <span className="font-medium text-emerald-600">2FA Enabled</span>
            </div>
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50">
            <Plus size={14} />
            Connect External Wallet
          </button>
        </div>
      </div>
    </div>
  );
}