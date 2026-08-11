import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  MoreHorizontal,
  ArrowUpRight,
  UserPlus,
  MessageSquare,
  Bell,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
} from "lucide-react";

const transactionData = [
  { id: "#95954", user: "Abu Bin Ishityak", email: "info@softnio.com", initials: "AB", bg: "bg-indigo-600", date: "02/11/2020", ref: "SUB-000414", amount: "$4,295.50", status: "Paid" },
  { id: "#95430", user: "Desiree Edwards", email: "desiree@example.com", initials: "DE", bg: "bg-cyan-600", date: "02/02/2020", ref: "SUB-000414", amount: "$596.75", status: "Canceled" },
  { id: "#95282", user: "Bianca Schultz", email: "bianca@example.com", avatar: "https://i.pravatar.cc/100?img=1", date: "01/24/2020", ref: "SUB-000414", amount: "$199.99", status: "Paid" },
  { id: "#95135", user: "Naomi Lawrence", email: "naomi@example.com", initials: "NL", bg: "bg-purple-600", date: "01/24/2020", ref: "SUB-000414", amount: "$1,099.99", status: "Paid" },
  { id: "#95125", user: "Cassandra Hogan", email: "cassandra@example.com", initials: "CH", bg: "bg-emerald-600", date: "01/18/2020", ref: "SUB-000414", amount: "$1,099.99", status: "Due" },
];

const newUsers = [
  { name: "Abu Bin Ishityak", email: "info@softnio.com", initials: "AB", bg: "bg-indigo-100 text-indigo-700" },
  { name: "Sharon Walker", email: "sharon-w@example.com", initials: "SW", bg: "bg-rose-100 text-rose-700" },
  { name: "Gloria Oliver", email: "gloria-70@example.com", initials: "GO", bg: "bg-emerald-100 text-emerald-700" },
  { name: "Philip Sullivan", email: "philip-s@example.com", initials: "PS", bg: "bg-sky-100 text-sky-700" },
];

const supportRequests = [
  { name: "Vincent Lopez", message: "Thanks for contact us with your...", status: "Pending", time: "6 min ago", statusStyle: "text-amber-600 bg-amber-50" },
  { name: "Daniel Moore", message: "We have fixed your issues, please...", status: "Open", time: "2 hours ago", statusStyle: "text-sky-600 bg-sky-50" },
  { name: "Larry Henry", message: "Thank you to let me know...", status: "Solved", time: "3 hours ago", statusStyle: "text-emerald-600 bg-emerald-50" },
];

const activities = [
  { title: "Keith Jensen requested to Withdraw.", time: "2 hours ago", initials: "KJ", bg: "bg-indigo-100 text-indigo-700" },
  { title: "Harry Simpson placed a Order.", time: "2 hours ago", initials: "HS", bg: "bg-amber-100 text-amber-700" },
  { title: "Stephanie Marshall got a huge bonus.", time: "5 hours ago", initials: "SM", bg: "bg-sky-100 text-sky-700" },
  { title: "Nicholas Carr deposited funds.", time: "8 hours ago", avatar: "https://i.pravatar.cc/100?img=3" },
  { title: "Timothy Moreno placed a Order.", time: "2 days ago", initials: "TM", bg: "bg-rose-100 text-rose-700" },
];

export default function SalesCRM() {
  return (
    <div className="w-full min-h-screen bg-[#F5F6FA] p-4 sm:p-6 text-gray-700 font-sans flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Overview</h1>
          <p className="text-xs text-gray-500 mt-0.5">Welcome to Sales Dashboard Template.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50">
            <Calendar size={14} className="text-gray-500" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700">
            Reports
          </button>
        </div>
      </div>

      {/* Top Section: Revenue & Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Revenue Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Sales Revenue</span>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">In last 30 days revenue from subscription.</p>
            <div className="my-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">14,299.59</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <TrendingUp size={12} className="mr-0.5" /> 4.63%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">This Month</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Sales Revenue</span>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
            </div>
            <div className="my-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">7,299.59</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <TrendingUp size={12} className="mr-0.5" /> 2.34%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">This Week</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Active Subscriptions</span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">9.69K</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <TrendingUp size={12} className="mr-0.5" /> 1.93%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">vs last month</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Avg Subscriptions</span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">346.2</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <TrendingUp size={12} className="mr-0.5" /> 2.42%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">vs last week</p>
          </div>
        </div>

        {/* Sales Overview Banner */}
        <div className="lg:col-span-5 rounded-xl border border-gray-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xs font-semibold text-gray-500">Sales Overview</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">In 30 days performance of subscription.</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 border border-indigo-100 rounded-lg px-2.5 py-1 hover:bg-indigo-50">
              <Download size={13} /> Download
            </button>
          </div>

          <div className="my-4">
            <div className="text-2xl font-bold text-gray-900">$82,944.60</div>
            <div className="text-xs text-gray-500 mt-1"><span className="font-semibold text-gray-700">1,937</span> Subscribers</div>
          </div>

          {/* Sparkline chart placeholder area */}
          <div className="h-20 w-full bg-indigo-50/50 rounded-lg border border-dashed border-indigo-200 flex items-center justify-center text-xs text-indigo-400 font-medium">
            [ Sales Trend Graph Area ]
          </div>
        </div>
      </div>

      {/* Middle Section: Transactions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Transaction Table */}
        <div className="lg:col-span-8 rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">Transaction</h2>
            <div className="flex items-center gap-3 text-xs">
              <button className="text-indigo-600 font-semibold hover:underline">See History</button>
              <div className="flex gap-1 border-l border-gray-200 pl-3">
                <button className="px-2 py-0.5 rounded bg-gray-100 font-medium text-gray-700">Paid</button>
                <button className="px-2 py-0.5 text-gray-400 hover:text-gray-600">Pending</button>
                <button className="px-2 py-0.5 text-gray-400 hover:text-gray-600">All</button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="uppercase tracking-wider text-[10px] text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="py-3 px-2 font-medium">Order No.</th>
                  <th className="py-3 px-2 font-medium">Customer</th>
                  <th className="py-3 px-2 font-medium">Date</th>
                  <th className="py-3 px-2 font-medium">Ref</th>
                  <th className="py-3 px-2 font-medium">Amount</th>
                  <th className="py-3 px-2 font-medium">Status</th>
                  <th className="py-3 px-2 text-right font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactionData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70">
                    <td className="py-3 px-2 font-semibold text-indigo-600">{row.id}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        {row.avatar ? (
                          <img src={row.avatar} alt={row.user} className="h-7 w-7 rounded-full object-cover" />
                        ) : (
                          <div className={`h-7 w-7 rounded-full ${row.bg} text-white font-semibold flex items-center justify-center text-[10px]`}>
                            {row.initials}
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{row.user}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-400">{row.date}</td>
                    <td className="py-3 px-2 text-indigo-600 font-mono text-[11px]">{row.ref}</td>
                    <td className="py-3 px-2 font-semibold text-gray-900">{row.amount}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                        row.status === "Paid" ? "text-emerald-600" : row.status === "Due" ? "text-amber-600" : "text-rose-600"
                      }`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-4 rounded-xl border border-gray-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Recent Activities</h2>
              <div className="flex gap-2 text-xs">
                <button className="text-gray-400 hover:text-gray-600">Cancel</button>
                <button className="text-indigo-600 font-semibold">All</button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {activities.map((act, i) => (
                <div key={i} className="flex items-center gap-3">
                  {act.avatar ? (
                    <img src={act.avatar} alt="User" className="h-8 w-8 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className={`h-8 w-8 rounded-full shrink-0 ${act.bg} font-bold text-xs flex items-center justify-center`}>
                      {act.initials}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-800 truncate">{act.title}</p>
                    <p className="text-[10px] text-gray-400">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: New Users, Support Requests & Notifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* New Users */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">New Users</h2>
            <button className="text-xs font-semibold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="mt-3 divide-y divide-gray-50">
            {newUsers.map((u, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${u.bg} font-bold text-xs flex items-center justify-center`}>
                    {u.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{u.name}</p>
                    <p className="text-[10px] text-gray-400">{u.email}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Support Requests */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">Support Requests</h2>
            <button className="text-xs font-semibold text-indigo-600 hover:underline">All Tickets</button>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {supportRequests.map((req, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">{req.name}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${req.statusStyle}`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{req.message}</p>
                <span className="text-[10px] text-gray-400">{req.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Timeline */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">Notifications</h2>
            <button className="text-xs font-semibold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="mt-4 flex flex-col gap-4 text-xs">
            <div className="relative pl-4 border-l-2 border-indigo-500">
              <span className="text-[10px] text-gray-400 font-medium">November, 2019</span>
              <p className="font-semibold text-gray-800 mt-0.5">Submitted KYC Application</p>
              <p className="text-[11px] text-gray-400">Re-submitted KYC form</p>
            </div>
            <div className="relative pl-4 border-l-2 border-sky-400">
              <span className="text-[10px] text-gray-400 font-medium">13 Nov</span>
              <p className="font-semibold text-gray-800 mt-0.5">Submitted KYC Application</p>
              <p className="text-[11px] text-gray-400">Ishityak submitted KYC form</p>
            </div>
            <div className="relative pl-4 border-l-2 border-rose-400">
              <span className="text-[10px] text-gray-400 font-medium">12 Nov</span>
              <p className="font-semibold text-gray-800 mt-0.5">Submitted KYC Application</p>
              <p className="text-[11px] text-gray-400">Re-submitted KYC form</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}