import React, { useMemo, useState } from "react";
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
  X,
  Trash2,
  Eye,
  Check,
  ExternalLink,
  RefreshCw,
  Copy,
  CircleDollarSign,
  ArrowDownUp,
} from "lucide-react";

/* =========================================================
   INITIAL DATA
========================================================= */

const initialStats = [
  {
    label: "Portfolio Value",
    value: 58145.07,
    delta: "+2.5%",
    up: true,
  },
  {
    label: "Total Crypto Earnings",
    value: 23450.25,
    delta: "+4.6%",
    up: true,
  },
  {
    label: "Total Withdrawals",
    value: 18500.99,
    delta: "-4.3%",
    up: false,
  },
  {
    label: "Staking Rewards",
    value: 6765.12,
    delta: "+8.2%",
    up: true,
  },
];

const initialAssets = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 26000,
    holdings: 1.245,
    change: "+5.42%",
    positive: true,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 14340,
    holdings: 14.82,
    change: "+3.81%",
    positive: true,
    tone: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    price: 10400,
    holdings: 12.5,
    change: "+8.21%",
    positive: true,
    tone: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    price: 2600,
    holdings: 500,
    change: "-2.31%",
    positive: false,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    id: 5,
    name: "Ripple",
    symbol: "XRP",
    price: 1340,
    holdings: 309,
    change: "-1.42%",
    positive: false,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    id: 6,
    name: "Polkadot",
    symbol: "DOT",
    price: 400,
    holdings: 45,
    change: "+1.82%",
    positive: true,
    tone: "bg-pink-100 text-pink-700",
  },
];

const topGainers = [
  {
    name: "Bitcoin (BTC)",
    amount: "$26,000",
    pct: 78,
  },
  {
    name: "Ethereum (ETH)",
    amount: "$14,340",
    pct: 52,
  },
  {
    name: "Solana (SOL)",
    amount: "$10,400",
    pct: 65,
  },
];

const topLosers = [
  {
    name: "Cardano (ADA)",
    amount: "$2,600",
    pct: 35,
  },
  {
    name: "Ripple (XRP)",
    amount: "$1,340",
    pct: 20,
  },
  {
    name: "Polkadot (DOT)",
    amount: "$400",
    pct: 15,
  },
];

const initialTransactions = [
  {
    id: 1,
    name: "Bitcoin Buy",
    type: "Buy",
    amount: "+ 0.0204 BTC",
    val: 1500,
    date: "16 Oct 2025, 10:12 AM",
    initials: "BTC",
    tone: "bg-amber-100 text-amber-700",
  },
  {
    id: 2,
    name: "Ethereum Swap",
    type: "Swap",
    amount: "- 0.45 ETH",
    val: 1250,
    date: "10 Oct 2025, 08:20 AM",
    initials: "ETH",
    tone: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 3,
    name: "Solana Deposit",
    type: "Deposit",
    amount: "+ 12.5 SOL",
    val: 1850,
    date: "07 Oct 2025, 07:31 PM",
    initials: "SOL",
    tone: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    name: "USDC Withdrawal",
    type: "Withdrawal",
    amount: "- 309.99 USDC",
    val: 309.99,
    date: "06 Oct 2025, 07:31 PM",
    initials: "USDC",
    tone: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    name: "Cardano Sell",
    type: "Sell",
    amount: "- 500 ADA",
    val: 409.99,
    date: "04 Oct 2025, 07:31 PM",
    initials: "ADA",
    tone: "bg-sky-100 text-sky-700",
  },
  {
    id: 6,
    name: "Polkadot Stake",
    type: "Stake",
    amount: "+ 45 DOT",
    val: 309.99,
    date: "02 Oct 2025, 12:31 PM",
    initials: "DOT",
    tone: "bg-pink-100 text-pink-700",
  },
];

const initialWallets = [
  {
    id: 1,
    name: "Bitcoin Wallet",
    network: "Bitcoin",
    balance: "1.245 BTC",
    address: "0x8F...39A2",
    usd: 81240,
    color: "from-amber-500 to-orange-600",
    icon: "BTC",
  },
  {
    id: 2,
    name: "Ethereum Wallet",
    network: "Ethereum",
    balance: "14.82 ETH",
    address: "0x3B...12C9",
    usd: 48900,
    color: "from-indigo-500 to-purple-600",
    icon: "ETH",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (value) => {
  return `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const getCurrentDate = () => {
  return new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* =========================================================
   LINE CHART
========================================================= */

const LineChart = () => {
  const width = 560;
  const height = 180;

  const seriesA = [
    40,
    55,
    50,
    70,
    60,
    90,
    75,
    95,
    85,
    110,
    100,
    150,
  ];

  const seriesB = [
    90,
    70,
    60,
    50,
    65,
    55,
    75,
    60,
    90,
    80,
    95,
    130,
  ];

  const toPoints = (series) => {
    const max = Math.max(...seriesA, ...seriesB);
    const stepX = width / (series.length - 1);

    return series
      .map(
        (v, i) =>
          `${i * stepX},${height - (v / max) * (height - 20)}`
      )
      .join(" ");
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      preserveAspectRatio="none"
    >
      <polyline
        points={toPoints(seriesA)}
        fill="none"
        stroke="#6366f1"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <polyline
        points={toPoints(seriesB)}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* =========================================================
   MODAL WRAPPER
========================================================= */

function Modal({ children, onClose, maxWidth = "max-w-lg" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl`}
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function DashBoard() {
  /* =======================================================
     STATE
  ======================================================= */

  const [stats, setStats] = useState(initialStats);

  const [assets, setAssets] = useState(initialAssets);

  const [transactions, setTransactions] = useState(
    initialTransactions
  );

  const [wallets, setWallets] = useState(initialWallets);

  const [checked, setChecked] = useState([]);

  /* Modals */

  const [showTradeModal, setShowTradeModal] = useState(false);

  const [showWalletModal, setShowWalletModal] = useState(false);

  const [showAssetsModal, setShowAssetsModal] = useState(false);

  const [showConnectModal, setShowConnectModal] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  /* Trade */

  const [tradeType, setTradeType] = useState("Buy");

  const [tradeCoin, setTradeCoin] = useState("BTC");

  const [tradeAmount, setTradeAmount] = useState("");

  const [tradePrice, setTradePrice] = useState("26000");

  /* Search / Filter */

  const [transactionSearch, setTransactionSearch] =
    useState("");

  const [transactionFilter, setTransactionFilter] =
    useState("All");

  const [showFilter, setShowFilter] = useState(false);

  /* Asset search */

  const [assetSearch, setAssetSearch] = useState("");

  /* Wallet */

  const [walletAddress, setWalletAddress] = useState("");

  const [walletError, setWalletError] = useState("");

  const [newWalletAddress, setNewWalletAddress] =
    useState("");

  const [newWalletName, setNewWalletName] =
    useState("");

  /* =======================================================
     FILTER TRANSACTIONS
  ======================================================= */

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.name
          .toLowerCase()
          .includes(transactionSearch.toLowerCase()) ||
        tx.type
          .toLowerCase()
          .includes(transactionSearch.toLowerCase()) ||
        tx.amount
          .toLowerCase()
          .includes(transactionSearch.toLowerCase());

      const matchesFilter =
        transactionFilter === "All" ||
        tx.type === transactionFilter;

      return matchesSearch && matchesFilter;
    });
  }, [
    transactions,
    transactionSearch,
    transactionFilter,
  ]);

  /* =======================================================
     FILTER ASSETS
  ======================================================= */

  const filteredAssets = assets.filter((asset) => {
    const search = assetSearch.toLowerCase();

    return (
      asset.name.toLowerCase().includes(search) ||
      asset.symbol.toLowerCase().includes(search)
    );
  });

  /* =======================================================
     CHECKBOX
  ======================================================= */

  const toggleRow = (id) => {
    setChecked((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (
      checked.length === filteredTransactions.length &&
      filteredTransactions.length > 0
    ) {
      setChecked([]);
    } else {
      setChecked(
        filteredTransactions.map((tx) => tx.id)
      );
    }
  };

  /* =======================================================
     OPEN TRADE
  ======================================================= */

  const openTradeModal = (type = "Buy") => {
    setTradeType(type);
    setShowTradeModal(true);
  };

  /* =======================================================
     TRADE PRICE CHANGE
  ======================================================= */

  const handleCoinChange = (e) => {
    const symbol = e.target.value;

    setTradeCoin(symbol);

    const selectedAsset = assets.find(
      (asset) => asset.symbol === symbol
    );

    if (selectedAsset) {
      setTradePrice(selectedAsset.price);
    }
  };

  /* =======================================================
     BUY / SELL
  ======================================================= */

  const handleTrade = (e) => {
    e.preventDefault();

    const amount = Number(tradeAmount);

    const price = Number(tradePrice);

    if (!amount || amount <= 0) {
      alert("Please enter a valid crypto amount.");
      return;
    }

    if (!price || price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    const usdValue = amount * price;

    const sign = tradeType === "Buy" ? "+" : "-";

    const newTransaction = {
      id: Date.now(),

      name: `${tradeCoin} ${tradeType}`,

      type: tradeType,

      amount: `${sign} ${amount} ${tradeCoin}`,

      val: usdValue,

      date: getCurrentDate(),

      initials: tradeCoin,

      tone:
        tradeCoin === "BTC"
          ? "bg-amber-100 text-amber-700"
          : tradeCoin === "ETH"
          ? "bg-indigo-100 text-indigo-700"
          : tradeCoin === "SOL"
          ? "bg-purple-100 text-purple-700"
          : "bg-blue-100 text-blue-700",
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    /* Update portfolio value */

    setStats((prev) =>
      prev.map((stat) =>
        stat.label === "Portfolio Value"
          ? {
              ...stat,
              value:
                tradeType === "Buy"
                  ? stat.value + usdValue
                  : Math.max(
                      0,
                      stat.value - usdValue
                    ),
            }
          : stat
      )
    );

    /* Update earnings */

    if (tradeType === "Buy") {
      setStats((prev) =>
        prev.map((stat) =>
          stat.label === "Total Crypto Earnings"
            ? {
                ...stat,
                value:
                  stat.value + usdValue * 0.02,
              }
            : stat
        )
      );
    }

    setTradeAmount("");

    setShowTradeModal(false);

    alert(
      `${tradeType} order for ${amount} ${tradeCoin} created successfully.`
    );
  };

  /* =======================================================
     DELETE TRANSACTION
  ======================================================= */

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );

    setChecked((prev) =>
      prev.filter((item) => item !== id)
    );

    setSelectedTransaction(null);
  };

  /* =======================================================
     DELETE SELECTED
  ======================================================= */

  const deleteSelectedTransactions = () => {
    if (checked.length === 0) return;

    setTransactions((prev) =>
      prev.filter((tx) => !checked.includes(tx.id))
    );

    setChecked([]);
  };

  /* =======================================================
     ADD WALLET
  ======================================================= */

  const addWallet = () => {
    if (!newWalletAddress.trim()) {
      alert("Please enter wallet address.");
      return;
    }

    const newWallet = {
      id: Date.now(),

      name:
        newWalletName.trim() ||
        "External Wallet",

      network: "External",

      balance: "0.00",

      address: newWalletAddress,

      usd: 0,

      color:
        "from-slate-600 to-slate-800",

      icon: "EXT",
    };

    setWallets((prev) => [
      ...prev,
      newWallet,
    ]);

    setNewWalletAddress("");

    setNewWalletName("");
  };

  /* =======================================================
     REMOVE WALLET
  ======================================================= */

  const removeWallet = (id) => {
    setWallets((prev) =>
      prev.filter((wallet) => wallet.id !== id)
    );
  };

  /* =======================================================
     COPY WALLET
  ======================================================= */

  const copyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);

      alert("Wallet address copied.");
    } catch {
      alert("Unable to copy address.");
    }
  };

  /* =======================================================
     CONNECT EXTERNAL WALLET
  ======================================================= */

  const connectExternalWallet = async () => {
    setWalletError("");

    if (!window.ethereum) {
      setWalletError(
        "No browser wallet detected. Please install MetaMask or another compatible wallet."
      );

      return;
    }

    try {
      const accounts =
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

      if (accounts && accounts.length > 0) {
        const address = accounts[0];

        setWalletAddress(address);

        const shortened = `${address.slice(
          0,
          6
        )}...${address.slice(-4)}`;

        const alreadyExists = wallets.some(
          (wallet) =>
            wallet.address === shortened
        );

        if (!alreadyExists) {
          setWallets((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: "Connected External Wallet",
              network: "Ethereum",
              balance: "Connected",
              address: shortened,
              usd: 0,
              color:
                "from-violet-500 to-indigo-600",
              icon: "EXT",
            },
          ]);
        }

        setShowConnectModal(false);

        alert(
          `Wallet connected: ${shortened}`
        );
      }
    } catch (error) {
      setWalletError(
        error?.message ||
          "Wallet connection was rejected."
      );
    }
  };

  /* =======================================================
     DISCONNECT WALLET
  ======================================================= */

  const disconnectWallet = () => {
    setWalletAddress("");

    setShowConnectModal(false);

    setWalletError("");
  };

  /* =======================================================
     RETURN UI
  ======================================================= */

  return (
    <div className="w-full min-h-screen bg-[#F6F5FD] p-4 sm:p-6 flex flex-col gap-6">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <h1 className="text-xl font-bold text-gray-900">
          Crypto Overview
        </h1>

        <div className="flex flex-wrap items-center gap-3">

          <button
            onClick={() =>
              setShowWalletModal(true)
            }
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Wallet
              size={16}
              className="text-gray-500"
            />

            Manage Wallets
          </button>

          <button
            onClick={() =>
              openTradeModal("Buy")
            }
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus size={16} />

            Buy / Sell Crypto
          </button>

        </div>

      </div>

      {/* ===================================================
          STATS
      =================================================== */}

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-gray-100">

        {stats.map((stat) => (

          <div
            key={stat.label}
            className="px-4 py-3"
          >

            <p className="text-xs text-gray-500">
              {stat.label}
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatCurrency(stat.value)}
            </p>

            <span
              className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
                stat.up
                  ? "text-emerald-600"
                  : "text-rose-500"
              }`}
            >
              {stat.delta}

              <span className="font-normal text-gray-400">
                vs last month
              </span>
            </span>

          </div>

        ))}

      </div>

      {/* ===================================================
          CHARTS
      =================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">

        {/* Market Performance */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <h2 className="text-sm font-semibold text-gray-800">
              Market Performance
            </h2>

            <button
              onClick={() =>
                setShowAssetsModal(true)
              }
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              View All Assets
            </button>

          </div>

          <div className="mt-4 flex flex-wrap gap-8">

            <div className="flex items-center gap-2">

              <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                <ArrowUpRight size={15} />
              </span>

              <div>

                <p className="text-xs text-gray-500">
                  Total Buy Volume
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  $34,200.00
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-50 text-amber-500">
                <ArrowDownLeft size={15} />
              </span>

              <div>

                <p className="text-xs text-gray-500">
                  Total Sell Volume
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  $18,400.00
                </p>

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

        {/* Top Coins */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <h2 className="text-sm font-semibold text-gray-800">
              Top Coin Performance
            </h2>

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

              <p className="text-xs text-gray-500">
                Top Gainers
              </p>

              <p className="text-sm font-semibold text-gray-900">
                $50,740.00
              </p>

              <div className="mt-3 flex flex-col gap-3">

                {topGainers.map((item) => (

                  <div key={item.name}>

                    <div className="flex items-center justify-between text-xs">

                      <span className="text-gray-600">
                        {item.name}
                      </span>

                      <span className="font-medium text-gray-800">
                        {item.amount}
                      </span>

                    </div>

                    <div className="mt-1 h-1.5 w-full rounded-full bg-indigo-100">

                      <div
                        className="h-1.5 rounded-full bg-indigo-500"
                        style={{
                          width: `${item.pct}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="rounded-lg border border-gray-100 p-3">

              <p className="text-xs text-gray-500">
                Declining Assets
              </p>

              <p className="text-sm font-semibold text-gray-900">
                $4,340.00
              </p>

              <div className="mt-3 flex flex-col gap-3">

                {topLosers.map((item) => (

                  <div key={item.name}>

                    <div className="flex items-center justify-between text-xs">

                      <span className="text-gray-600">
                        {item.name}
                      </span>

                      <span className="font-medium text-gray-800">
                        {item.amount}
                      </span>

                    </div>

                    <div className="mt-1 h-1.5 w-full rounded-full bg-amber-100">

                      <div
                        className="h-1.5 rounded-full bg-amber-500"
                        style={{
                          width: `${item.pct}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ===================================================
          TRANSACTIONS + WALLETS
      =================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">

        {/* Transactions */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">

            <div>

              <h2 className="text-sm font-semibold text-gray-800">
                Crypto Transactions
              </h2>

              {checked.length > 0 && (

                <p className="mt-1 text-[11px] text-indigo-600">
                  {checked.length} transaction
                  {checked.length > 1
                    ? "s"
                    : ""} selected
                </p>

              )}

            </div>

            <div className="flex items-center gap-2">

              {/* Search */}

              <div className="relative">

                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={transactionSearch}
                  onChange={(e) =>
                    setTransactionSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search transactions..."
                  className="w-44 rounded-lg border border-gray-200 py-1.5 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-56"
                />

              </div>

              {/* Filter */}

              <div className="relative">

                <button
                  onClick={() =>
                    setShowFilter(
                      (prev) => !prev
                    )
                  }
                  className={`rounded-lg border p-1.5 hover:bg-gray-50 ${
                    transactionFilter !== "All"
                      ? "border-indigo-300 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <SlidersHorizontal
                    size={14}
                  />
                </button>

                {showFilter && (

                  <div className="absolute right-0 top-9 z-30 w-36 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">

                    {[
                      "All",
                      "Buy",
                      "Sell",
                      "Deposit",
                      "Withdrawal",
                      "Swap",
                      "Stake",
                    ].map((type) => (

                      <button
                        key={type}
                        onClick={() => {
                          setTransactionFilter(
                            type
                          );

                          setShowFilter(false);
                        }}
                        className={`w-full rounded-md px-3 py-2 text-left text-xs ${
                          transactionFilter ===
                          type
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {type}
                      </button>

                    ))}

                  </div>

                )}

              </div>

              {/* Delete selected */}

              {checked.length > 0 && (

                <button
                  onClick={
                    deleteSelectedTransactions
                  }
                  className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
                  title="Delete selected"
                >
                  <Trash2 size={14} />
                </button>

              )}

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left text-xs text-gray-600">

              <thead className="border-b border-gray-100 uppercase tracking-wide text-gray-400">

                <tr>

                  <th className="w-8 p-3">

                    <input
                      type="checkbox"
                      checked={
                        filteredTransactions.length >
                          0 &&
                        checked.length ===
                          filteredTransactions.length
                      }
                      onChange={toggleAll}
                      className="rounded border-gray-300 accent-indigo-600"
                    />

                  </th>

                  <th className="p-3 font-medium">
                    Asset
                  </th>

                  <th className="p-3 font-medium">
                    Type
                  </th>

                  <th className="p-3 font-medium">
                    Crypto Amount
                  </th>

                  <th className="p-3 font-medium">
                    USD Value
                  </th>

                  <th className="p-3 font-medium">
                    Date
                  </th>

                  <th className="w-8 p-3"></th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredTransactions.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="p-8 text-center text-gray-400"
                    >
                      No transactions found.
                    </td>

                  </tr>

                ) : (

                  filteredTransactions.map(
                    (tx) => (

                      <tr
                        key={tx.id}
                        className="hover:bg-gray-50/60"
                      >

                        <td className="p-3">

                          <input
                            type="checkbox"
                            checked={checked.includes(
                              tx.id
                            )}
                            onChange={() =>
                              toggleRow(tx.id)
                            }
                            className="rounded border-gray-300 accent-indigo-600"
                          />

                        </td>

                        <td className="p-3">

                          <div className="flex items-center gap-2">

                            <span
                              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${tx.tone}`}
                            >
                              {tx.initials}
                            </span>

                            <span className="font-medium text-gray-800">
                              {tx.name}
                            </span>

                          </div>

                        </td>

                        <td className="p-3 text-gray-600">
                          {tx.type}
                        </td>

                        <td
                          className={`p-3 font-mono ${
                            tx.amount.startsWith(
                              "+"
                            )
                              ? "text-emerald-600"
                              : "text-gray-700"
                          }`}
                        >
                          {tx.amount}
                        </td>

                        <td className="p-3 font-mono text-gray-800">
                          {formatCurrency(
                            tx.val
                          )}
                        </td>

                        <td className="whitespace-nowrap p-3 text-gray-500">
                          {tx.date}
                        </td>

                        <td className="relative p-3 text-right">

                          <button
                            onClick={() =>
                              setSelectedTransaction(
                                selectedTransaction?.id ===
                                  tx.id
                                  ? null
                                  : tx
                              )
                            }
                            className="rounded-md p-1 text-gray-400 hover:bg-gray-100"
                          >
                            <MoreVertical
                              size={14}
                            />
                          </button>

                          {selectedTransaction?.id ===
                            tx.id && (

                            <div className="absolute right-2 top-9 z-20 w-28 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">

                              <button
                                onClick={() =>
                                  setSelectedTransaction(
                                    tx
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
                              >
                                <Eye size={12} />
                                View
                              </button>

                              <button
                                onClick={() =>
                                  deleteTransaction(
                                    tx.id
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50"
                              >
                                <Trash2 size={12} />
                                Delete
                              </button>

                            </div>

                          )}

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =================================================
            CRYPTO WALLETS
        ================================================= */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-sm font-semibold text-gray-800">
                Crypto Wallets
              </h2>

              <p className="mt-1 text-[11px] text-gray-400">
                {wallets.length} connected wallet
                {wallets.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

            <button
              onClick={() =>
                setShowWalletModal(true)
              }
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Manage
            </button>

          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">

            {wallets.map((wallet) => (

              <div
                key={wallet.id}
                className={`flex min-w-[220px] flex-col justify-between rounded-2xl bg-gradient-to-br ${wallet.color} p-4 text-white shadow-md`}
              >

                <div className="flex items-center justify-between">

                  <span className="text-sm font-semibold">
                    {wallet.name}
                  </span>

                  {wallet.icon ===
                  "BTC" ? (
                    <Bitcoin size={20} />
                  ) : (
                    <Wallet size={18} />
                  )}

                </div>

                <div className="mt-3">

                  <p className="text-[10px] text-white/70">
                    Balance
                  </p>

                  <p className="text-lg font-bold">
                    {wallet.balance}
                  </p>

                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-white/80">

                  <span>
                    {wallet.address}
                  </span>

                  <span className="font-semibold">
                    ~{" "}
                    {formatCurrency(
                      wallet.usd
                    )}
                  </span>

                </div>

              </div>

            ))}

          </div>

          <div className="mt-4 flex flex-col gap-2 text-xs">

            <div className="flex items-center justify-between">

              <span className="text-gray-500">
                Total Portfolio (USD)
              </span>

              <span className="font-semibold text-gray-900">
                {formatCurrency(
                  wallets.reduce(
                    (total, wallet) =>
                      total + wallet.usd,
                    0
                  )
                )}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-500">
                Active Wallet
              </span>

              <span className="font-medium text-gray-800">
                {walletAddress
                  ? `${walletAddress.slice(
                      0,
                      6
                    )}...${walletAddress.slice(
                      -4
                    )}`
                  : wallets[0]?.address ||
                    "Not connected"}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-500">
                Network Fee Tier
              </span>

              <span className="font-medium text-gray-800">
                Standard (12 Gwei)
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-500">
                Security Status
              </span>

              <span className="font-medium text-emerald-600">
                2FA Enabled
              </span>

            </div>

          </div>

          <button
            onClick={() =>
              setShowConnectModal(true)
            }
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            <Plus size={14} />

            Connect External Wallet
          </button>

        </div>

      </div>

      {/* ===================================================
          BUY / SELL MODAL
      =================================================== */}

      {showTradeModal && (

        <Modal
          onClose={() =>
            setShowTradeModal(false)
          }
          maxWidth="max-w-md"
        >

          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

            <div>

              <h2 className="text-base font-semibold text-gray-900">
                Buy / Sell Crypto
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Create a simulated crypto order
              </p>

            </div>

            <button
              onClick={() =>
                setShowTradeModal(false)
              }
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

          </div>

          <form
            onSubmit={handleTrade}
            className="p-5"
          >

            {/* Buy Sell tabs */}

            <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">

              <button
                type="button"
                onClick={() =>
                  setTradeType("Buy")
                }
                className={`rounded-md py-2 text-sm font-medium ${
                  tradeType === "Buy"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Buy
              </button>

              <button
                type="button"
                onClick={() =>
                  setTradeType("Sell")
                }
                className={`rounded-md py-2 text-sm font-medium ${
                  tradeType === "Sell"
                    ? "bg-white text-red-500 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Sell
              </button>

            </div>

            <div className="mt-5 space-y-4">

              {/* Coin */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Cryptocurrency
                </label>

                <select
                  value={tradeCoin}
                  onChange={
                    handleCoinChange
                  }
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-500"
                >

                  {assets.map((asset) => (

                    <option
                      key={asset.symbol}
                      value={asset.symbol}
                    >
                      {asset.name} (
                      {asset.symbol})
                    </option>

                  ))}

                </select>

              </div>

              {/* Amount */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Crypto Amount
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={tradeAmount}
                  onChange={(e) =>
                    setTradeAmount(
                      e.target.value
                    )
                  }
                  placeholder="0.00"
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-500"
                />

              </div>

              {/* Price */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Price per coin (USD)
                </label>

                <input
                  type="number"
                  min="0"
                  value={tradePrice}
                  onChange={(e) =>
                    setTradePrice(
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-500"
                />

              </div>

              {/* Total */}

              <div className="rounded-lg bg-gray-50 p-3">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-gray-500">
                    Estimated total
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(
                      Number(tradeAmount || 0) *
                        Number(
                          tradePrice || 0
                        )
                    )}
                  </span>

                </div>

              </div>

            </div>

            <button
              type="submit"
              className={`mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white ${
                tradeType === "Buy"
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              <ArrowDownUp size={15} />

              {tradeType} {tradeCoin}
            </button>

          </form>

        </Modal>

      )}

      {/* ===================================================
          MANAGE WALLETS MODAL
      =================================================== */}

      {showWalletModal && (

        <Modal
          onClose={() =>
            setShowWalletModal(false)
          }
          maxWidth="max-w-xl"
        >

          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

            <div>

              <h2 className="text-base font-semibold text-gray-900">
                Manage Wallets
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Manage connected crypto wallets
              </p>

            </div>

            <button
              onClick={() =>
                setShowWalletModal(false)
              }
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

          </div>

          <div className="p-5">

            {/* Existing wallets */}

            <div className="space-y-3">

              {wallets.map((wallet) => (

                <div
                  key={wallet.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                >

                  <div className="flex items-center gap-3">

                    <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                      {wallet.icon}
                    </div>

                    <div>

                      <p className="text-sm font-medium text-gray-800">
                        {wallet.name}
                      </p>

                      <p className="mt-0.5 font-mono text-[11px] text-gray-400">
                        {wallet.address}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        copyAddress(
                          wallet.address
                        )
                      }
                      className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
                      title="Copy address"
                    >
                      <Copy size={14} />
                    </button>

                    <button
                      onClick={() =>
                        removeWallet(
                          wallet.id
                        )
                      }
                      className="rounded-md p-2 text-red-400 hover:bg-red-50"
                      title="Remove wallet"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Add wallet */}

            <div className="mt-5 rounded-lg border border-dashed border-gray-300 p-4">

              <div className="flex items-center gap-2">

                <Wallet
                  size={16}
                  className="text-indigo-600"
                />

                <p className="text-sm font-medium text-gray-800">
                  Add wallet manually
                </p>

              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">

                <input
                  value={newWalletName}
                  onChange={(e) =>
                    setNewWalletName(
                      e.target.value
                    )
                  }
                  placeholder="Wallet name"
                  className="h-9 rounded-md border border-gray-200 px-3 text-xs outline-none focus:border-indigo-500"
                />

                <input
                  value={newWalletAddress}
                  onChange={(e) =>
                    setNewWalletAddress(
                      e.target.value
                    )
                  }
                  placeholder="Wallet address"
                  className="h-9 rounded-md border border-gray-200 px-3 text-xs outline-none focus:border-indigo-500"
                />

              </div>

              <button
                onClick={addWallet}
                className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <Plus size={14} />
                Add Wallet
              </button>

            </div>

            <button
              onClick={() => {
                setShowWalletModal(false);
                setShowConnectModal(true);
              }}
              className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              <ExternalLink size={14} />
              Connect External Wallet
            </button>

          </div>

        </Modal>

      )}

      {/* ===================================================
          ALL ASSETS MODAL
      =================================================== */}

      {showAssetsModal && (

        <Modal
          onClose={() =>
            setShowAssetsModal(false)
          }
          maxWidth="max-w-2xl"
        >

          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

            <div>

              <h2 className="text-base font-semibold text-gray-900">
                All Assets
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Your complete crypto portfolio
              </p>

            </div>

            <button
              onClick={() =>
                setShowAssetsModal(false)
              }
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

          </div>

          <div className="p-5">

            {/* Search */}

            <div className="relative">

              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={assetSearch}
                onChange={(e) =>
                  setAssetSearch(
                    e.target.value
                  )
                }
                placeholder="Search assets..."
                className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-xs outline-none focus:border-indigo-500"
              />

            </div>

            {/* Assets */}

            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">

              <table className="w-full text-left text-xs">

                <thead className="border-b border-gray-100 bg-gray-50 text-gray-400">

                  <tr>

                    <th className="p-3">
                      Asset
                    </th>

                    <th className="p-3">
                      Holdings
                    </th>

                    <th className="p-3">
                      Value
                    </th>

                    <th className="p-3">
                      24h
                    </th>

                    <th className="p-3 text-right">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredAssets.map(
                    (asset) => {

                      const value =
                        asset.holdings *
                        asset.price;

                      return (

                        <tr
                          key={asset.id}
                          className="hover:bg-gray-50"
                        >

                          <td className="p-3">

                            <div className="flex items-center gap-2">

                              <span
                                className={`grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold ${asset.tone}`}
                              >
                                {asset.symbol}
                              </span>

                              <div>

                                <p className="font-medium text-gray-800">
                                  {asset.name}
                                </p>

                                <p className="text-[10px] text-gray-400">
                                  {asset.symbol}
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="p-3 font-mono text-gray-700">
                            {asset.holdings}
                          </td>

                          <td className="p-3 font-mono font-medium text-gray-800">
                            {formatCurrency(
                              value
                            )}
                          </td>

                          <td
                            className={`p-3 font-medium ${
                              asset.positive
                                ? "text-emerald-600"
                                : "text-red-500"
                            }`}
                          >
                            {asset.change}
                          </td>

                          <td className="p-3 text-right">

                            <button
                              onClick={() => {
                                setTradeCoin(
                                  asset.symbol
                                );

                                setTradePrice(
                                  asset.price
                                );

                                setShowAssetsModal(
                                  false
                                );

                                openTradeModal(
                                  "Buy"
                                );
                              }}
                              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                            >
                              Trade
                            </button>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

              {filteredAssets.length ===
                0 && (

                <div className="p-8 text-center text-xs text-gray-400">
                  No assets found.
                </div>

              )}

            </div>

          </div>

        </Modal>

      )}

      {/* ===================================================
          CONNECT WALLET MODAL
      =================================================== */}

      {showConnectModal && (

        <Modal
          onClose={() =>
            setShowConnectModal(false)
          }
          maxWidth="max-w-md"
        >

          <div className="p-5">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-base font-semibold text-gray-900">
                  Connect External Wallet
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Connect a compatible browser wallet
                </p>

              </div>

              <button
                onClick={() =>
                  setShowConnectModal(false)
                }
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 text-center">

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white shadow-sm">

                <Wallet
                  size={24}
                  className="text-indigo-600"
                />

              </div>

              <h3 className="mt-3 text-sm font-semibold text-gray-800">
                Browser Wallet
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Connect MetaMask or another
                EVM-compatible browser wallet.
              </p>

            </div>

            {walletAddress && (

              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">

                <div className="flex items-center gap-2 text-emerald-700">

                  <Check size={15} />

                  <span className="text-xs font-medium">
                    Wallet connected
                  </span>

                </div>

                <p className="mt-2 break-all font-mono text-[11px] text-emerald-700">
                  {walletAddress}
                </p>

              </div>

            )}

            {walletError && (

              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-600">
                {walletError}
              </div>

            )}

            <div className="mt-5 flex gap-2">

              {walletAddress ? (

                <button
                  onClick={
                    disconnectWallet
                  }
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Disconnect
                </button>

              ) : (

                <button
                  onClick={
                    connectExternalWallet
                  }
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <Wallet size={15} />
                  Connect Wallet
                </button>

              )}

            </div>

          </div>

        </Modal>

      )}

      {/* ===================================================
          TRANSACTION DETAILS MODAL
      =================================================== */}

      {selectedTransaction && (

        <Modal
          onClose={() =>
            setSelectedTransaction(null)
          }
          maxWidth="max-w-md"
        >

          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

            <div>

              <h2 className="text-base font-semibold text-gray-900">
                Transaction Details
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Transaction #{selectedTransaction.id}
              </p>

            </div>

            <button
              onClick={() =>
                setSelectedTransaction(null)
              }
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

          </div>

          <div className="p-5">

            <div className="flex items-center gap-3">

              <div
                className={`grid h-11 w-11 place-items-center rounded-full text-xs font-bold ${selectedTransaction.tone}`}
              >
                {selectedTransaction.initials}
              </div>

              <div>

                <p className="text-sm font-semibold text-gray-900">
                  {selectedTransaction.name}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {selectedTransaction.type}
                </p>

              </div>

            </div>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between border-b border-gray-100 pb-3">

                <span className="text-xs text-gray-400">
                  Crypto Amount
                </span>

                <span className="font-mono text-xs font-medium text-gray-800">
                  {selectedTransaction.amount}
                </span>

              </div>

              <div className="flex justify-between border-b border-gray-100 pb-3">

                <span className="text-xs text-gray-400">
                  USD Value
                </span>

                <span className="font-mono text-xs font-medium text-gray-800">
                  {formatCurrency(
                    selectedTransaction.val
                  )}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-xs text-gray-400">
                  Date
                </span>

                <span className="text-xs font-medium text-gray-800">
                  {selectedTransaction.date}
                </span>

              </div>

            </div>

            <button
              onClick={() =>
                setSelectedTransaction(null)
              }
              className="mt-5 h-9 w-full rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              Close
            </button>

          </div>

        </Modal>

      )}

    </div>
  );
}