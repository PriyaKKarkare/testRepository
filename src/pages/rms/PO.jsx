import React, { useMemo, useState } from "react";
import {
	Search,
	SlidersHorizontal,
	ArrowDownUp,
	MoreHorizontal,
	Plus,
	X,
} from "lucide-react";

// ======================================================
// INITIAL PURCHASE ORDERS
// ======================================================

const initialPurchaseOrders = [
	{
		po: "#PO1",
		id: "R001",
		supplier: "Supplier1",
		destination: "Warehouse1",
		status: "Closed",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Jan 20, 2024",
	},
	{
		po: "#PO2",
		id: "R002",
		supplier: "Supplier2",
		destination: "Warehouse2",
		status: "Open",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Jan 24, 2024",
	},
	{
		po: "#PO3",
		id: "R003",
		supplier: "Supplier3",
		destination: "Warehouse3",
		status: "Closed",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Jan 26, 2024",
	},
	{
		po: "#PO4",
		id: "R004",
		supplier: "Supplier4",
		destination: "Warehouse4",
		status: "Open",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Jan 28, 2024",
	},
	{
		po: "#PO5",
		id: "R005",
		supplier: "Supplier5",
		destination: "Warehouse5",
		status: "Closed",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Feb 10, 2024",
	},
	{
		po: "#PO6",
		id: "R006",
		supplier: "Supplier6",
		destination: "Warehouse6",
		status: "Open",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Feb 12, 2024",
	},
	{
		po: "#PO7",
		id: "R007",
		supplier: "Supplier7",
		destination: "Warehouse7",
		status: "Closed",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Feb 14, 2024",
	},
	{
		po: "#PO8",
		id: "R008",
		supplier: "Supplier8",
		destination: "Warehouse8",
		status: "Open",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Feb 16, 2024",
	},
	{
		po: "#PO9",
		id: "R009",
		supplier: "Supplier9",
		destination: "Warehouse9",
		status: "Closed",
		received: "3 of 3",
		total: "$0.00",
		arrival: "Feb 18, 2024",
	},
];

// ======================================================
// TABS
// ======================================================

const tabs = [
	"All",
	"Draft",
	"Ordered",
	"Partial",
	"Received",
	"Closed",
];

// ======================================================
// COMPONENT
// ======================================================

export default function PO() {
	// ====================================================
	// PURCHASE ORDERS STATE
	// ====================================================

	const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);

	// ====================================================
	// TAB STATE
	// ====================================================

	const [activeTab, setActiveTab] = useState("All");

	// ====================================================
	// SEARCH STATE
	// ====================================================

	const [searchTerm, setSearchTerm] = useState("");
	const [showSearch, setShowSearch] = useState(false);

	// ====================================================
	// FILTER STATE
	// ====================================================

	const [showFilter, setShowFilter] = useState(false);
	const [statusFilter, setStatusFilter] = useState("All");

	// ====================================================
	// CHECKBOX STATE
	// ====================================================

	const [selectedOrders, setSelectedOrders] = useState([]);

	// ====================================================
	// SORT STATE
	// ====================================================

	const [sortOrder, setSortOrder] = useState("asc");

	// ====================================================
	// CREATE PO MODAL
	// ====================================================

	const [showCreatePO, setShowCreatePO] = useState(false);

	const [newPO, setNewPO] = useState({
		supplier: "",
		destination: "",
		total: "",
		arrival: "",
	});

	// ====================================================
	// FILTER + SEARCH + SORT
	// ====================================================

	const filteredOrders = useMemo(() => {
		let result = purchaseOrders.filter((order) => {
			// -------------------------------
			// TAB FILTER
			// -------------------------------

			let tabMatch = true;

			if (activeTab !== "All") {
				tabMatch = order.status === activeTab;
			}

			// -------------------------------
			// STATUS FILTER
			// -------------------------------

			let statusMatch = true;

			if (statusFilter !== "All") {
				statusMatch = order.status === statusFilter;
			}

			// -------------------------------
			// SEARCH
			// -------------------------------

			const search = searchTerm.toLowerCase().trim();

			const searchMatch =
				order.po.toLowerCase().includes(search) ||
				order.id.toLowerCase().includes(search) ||
				order.supplier.toLowerCase().includes(search) ||
				order.destination.toLowerCase().includes(search);

			return tabMatch && statusMatch && searchMatch;
		});

		// -------------------------------
		// SORT
		// -------------------------------

		result = [...result].sort((a, b) => {
			const first = a.po.toLowerCase();
			const second = b.po.toLowerCase();

			if (sortOrder === "asc") {
				return first.localeCompare(second, undefined, {
					numeric: true,
				});
			}

			return second.localeCompare(first, undefined, {
				numeric: true,
			});
		});

		return result;
	}, [
		purchaseOrders,
		activeTab,
		statusFilter,
		searchTerm,
		sortOrder,
	]);

	// ====================================================
	// SELECT ALL CHECKBOX
	// ====================================================

	const handleSelectAll = (event) => {
		if (event.target.checked) {
			const ids = filteredOrders.map((order) => order.id);

			setSelectedOrders(ids);
		} else {
			setSelectedOrders([]);
		}
	};

	// ====================================================
	// SELECT SINGLE CHECKBOX
	// ====================================================

	const handleSelectOne = (id) => {
		setSelectedOrders((previous) => {
			if (previous.includes(id)) {
				return previous.filter((item) => item !== id);
			}

			return [...previous, id];
		});
	};

	// ====================================================
	// CHECK WHETHER ALL FILTERED ORDERS ARE SELECTED
	// ====================================================

	const isAllSelected =
		filteredOrders.length > 0 &&
		filteredOrders.every((order) =>
			selectedOrders.includes(order.id)
		);

	// ====================================================
	// CLEAR FILTERS
	// ====================================================

	const clearFilters = () => {
		setActiveTab("All");
		setStatusFilter("All");
		setSearchTerm("");
		setSelectedOrders([]);
	};

	// ====================================================
	// OPEN CREATE PO MODAL
	// ====================================================

	const openCreatePOModal = () => {
		setNewPO({
			supplier: "",
			destination: "",
			total: "",
			arrival: "",
		});

		setShowCreatePO(true);
	};

	// ====================================================
	// CLOSE CREATE PO MODAL
	// ====================================================

	const closeCreatePOModal = () => {
		setShowCreatePO(false);

		setNewPO({
			supplier: "",
			destination: "",
			total: "",
			arrival: "",
		});
	};

	// ====================================================
	// CREATE PURCHASE ORDER
	// ====================================================

	const handleCreatePO = () => {
		// -------------------------------
		// VALIDATION
		// -------------------------------

		if (!newPO.supplier.trim()) {
			alert("Please enter supplier name.");
			return;
		}

		if (!newPO.destination.trim()) {
			alert("Please enter destination.");
			return;
		}

		if (!newPO.arrival) {
			alert("Please select expected arrival date.");
			return;
		}

		if (!newPO.total) {
			alert("Please enter total amount.");
			return;
		}

		// -------------------------------
		// CREATE NEW PO NUMBER
		// -------------------------------

		const nextNumber = purchaseOrders.length + 1;

		const newOrder = {
			po: `#PO${nextNumber}`,
			id: `R${String(nextNumber).padStart(3, "0")}`,
			supplier: newPO.supplier.trim(),
			destination: newPO.destination.trim(),
			status: "Open",
			received: "0 of 0",
			total: `$${Number(newPO.total).toFixed(2)}`,
			arrival: newPO.arrival,
		};

		// -------------------------------
		// ADD TO TABLE
		// -------------------------------

		setPurchaseOrders((previousOrders) => [
			...previousOrders,
			newOrder,
		]);

		// -------------------------------
		// RESET FORM
		// -------------------------------

		setNewPO({
			supplier: "",
			destination: "",
			total: "",
			arrival: "",
		});

		// -------------------------------
		// RESET FILTERS
		// -------------------------------

		setActiveTab("All");
		setStatusFilter("All");
		setSelectedOrders([]);

		// -------------------------------
		// CLOSE MODAL
		// -------------------------------

		setShowCreatePO(false);

		alert("Purchase Order created successfully.");
	};

	// ====================================================
	// RETURN
	// ====================================================

	return (
		<div className="min-h-full bg-white p-4 sm:p-6">

			{/* ==================================================
          HEADER
      ================================================== */}

			<div className="mb-5 flex items-start justify-between">

				<div>
					<h1 className="text-[18px] font-semibold text-gray-900">
						Purchase orders
					</h1>

					<p className="mt-1 text-[11px] text-gray-500">
						The inventory section on the ShopZen product page
						provides a snapshot of product availability.
					</p>
				</div>

				{/* CREATE PURCHASE ORDER */}

				<button
					type="button"
					onClick={openCreatePOModal}
					className="
            flex
            items-center
            gap-2
            rounded-md
            bg-violet-600
            px-3
            py-2
            text-[11px]
            font-medium
            text-white
            shadow-sm
            hover:bg-violet-700
          "
				>
					<Plus size={14} />
					Create Purchase orders
				</button>
			</div>

			{/* ==================================================
          TABS + ACTIONS
      ================================================== */}

			<div className="mb-4 flex items-center justify-between">

				{/* TABS */}

				<div
					className="
            flex
            items-center
            gap-1
            rounded-md
            border
            border-gray-200
            bg-white
            p-1
          "
				>
					{tabs.map((tab) => (
						<button
							type="button"
							key={tab}
							onClick={() => {
								setActiveTab(tab);
								setSelectedOrders([]);
							}}
							className={`
                rounded
                px-3
                py-1.5
                text-[11px]
                transition
                ${activeTab === tab
									? "bg-gray-100 font-medium text-gray-900"
									: "text-gray-500 hover:bg-gray-50"
								}
              `}
						>
							{tab}
						</button>
					))}

					{/* ADD */}

					<button
						type="button"
						onClick={openCreatePOModal}
						className="
              ml-1
              flex
              items-center
              gap-1
              px-2
              py-1.5
              text-[11px]
              text-gray-500
              hover:text-gray-800
            "
					>
						<Plus size={13} />
						Add
					</button>
				</div>

				{/* ==================================================
            RIGHT ACTIONS
        ================================================== */}

				<div className="relative flex items-center gap-1">

					{/* SEARCH INPUT */}

					{showSearch && (
						<div
							className="
                absolute
                right-[115px]
                top-0
                z-30
                flex
                items-center
                rounded-md
                border
                border-gray-300
                bg-white
                shadow-sm
              "
						>
							<Search
								size={14}
								className="ml-2 text-gray-400"
							/>

							<input
								type="text"
								autoFocus
								value={searchTerm}
								onChange={(event) =>
									setSearchTerm(event.target.value)
								}
								placeholder="Search..."
								className="
                  w-40
                  px-2
                  py-1.5
                  text-[11px]
                  outline-none
                "
							/>

							<button
								type="button"
								onClick={() => {
									setSearchTerm("");
									setShowSearch(false);
								}}
								className="
                  mr-1
                  text-gray-400
                  hover:text-gray-700
                "
							>
								<X size={13} />
							</button>
						</div>
					)}

					{/* SEARCH BUTTON */}

					<button
						type="button"
						onClick={() =>
							setShowSearch((previous) => !previous)
						}
						className={`
              rounded-md
              p-2
              ${showSearch || searchTerm
								? "bg-gray-100 text-gray-900"
								: "text-gray-500 hover:bg-gray-100"
							}
            `}
					>
						<Search size={16} />
					</button>

					{/* ==================================================
              FILTER BUTTON
          ================================================== */}

					<button
						type="button"
						onClick={() =>
							setShowFilter((previous) => !previous)
						}
						className={`
              rounded-md
              p-2
              ${statusFilter !== "All"
								? "bg-violet-100 text-violet-600"
								: "text-gray-500 hover:bg-gray-100"
							}
            `}
					>
						<SlidersHorizontal size={16} />
					</button>

					{/* FILTER DROPDOWN */}

					{showFilter && (
						<div
							className="
                absolute
                right-10
                top-10
                z-40
                w-44
                rounded-lg
                border
                border-gray-200
                bg-white
                p-3
                shadow-lg
              "
						>
							<div
								className="
                  mb-2
                  text-[11px]
                  font-semibold
                  text-gray-800
                "
							>
								Filter by status
							</div>

							{["All", "Open", "Closed"].map(
								(status) => (
									<label
										key={status}
										className="
                      flex
                      cursor-pointer
                      items-center
                      gap-2
                      rounded
                      px-2
                      py-2
                      text-[11px]
                      hover:bg-gray-50
                    "
									>
										<input
											type="radio"
											name="po-status"
											checked={
												statusFilter === status
											}
											onChange={() => {
												setStatusFilter(status);
												setSelectedOrders([]);
											}}
											className="cursor-pointer"
										/>

										<span>{status}</span>
									</label>
								)
							)}

							<button
								type="button"
								onClick={clearFilters}
								className="
                  mt-2
                  w-full
                  rounded
                  border
                  border-gray-200
                  py-1.5
                  text-[10px]
                  text-gray-600
                  hover:bg-gray-50
                "
							>
								Clear filters
							</button>
						</div>
					)}

					{/* ==================================================
              SORT BUTTON
          ================================================== */}

					<button
						type="button"
						onClick={() =>
							setSortOrder((previous) =>
								previous === "asc" ? "desc" : "asc"
							)
						}
						title="Sort purchase orders"
						className="
              rounded-md
              p-2
              text-gray-500
              hover:bg-gray-100
            "
					>
						<ArrowDownUp size={16} />
					</button>

					{/* MORE */}

					<button
						type="button"
						className="
              rounded-md
              p-2
              text-gray-500
              hover:bg-gray-100
            "
					>
						<MoreHorizontal size={17} />
					</button>
				</div>
			</div>

			{/* ==================================================
          SELECTED COUNT
      ================================================== */}

			{selectedOrders.length > 0 && (
				<div
					className="
            mb-3
            flex
            items-center
            justify-between
            rounded-md
            bg-violet-50
            px-3
            py-2
            text-[11px]
          "
				>
					<span className="font-medium text-violet-700">
						{selectedOrders.length} order
						{selectedOrders.length > 1 ? "s" : ""} selected
					</span>

					<button
						type="button"
						onClick={() => setSelectedOrders([])}
						className="
              text-violet-600
              hover:underline
            "
					>
						Clear selection
					</button>
				</div>
			)}

			{/* ==================================================
          TABLE
      ================================================== */}

			<div
				className="
          overflow-hidden
          rounded-lg
          border
          border-gray-200
        "
			>
				<div className="overflow-x-auto">

					<table
						className="w-full min-w-[850px] border-collapse "
					>
						{/* TABLE HEADER */}

						<thead>
							<tr className="border-b border-gray-200 bg-gray-50/40">

								<th className="w-[45px] px-3 py-3">
									<input
										type="checkbox"
										checked={isAllSelected}
										onChange={handleSelectAll}
										className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300"
									/>
								</th>

								<th className="px-3 py-3 text-left">
									<div className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
										Purchase order
										<ArrowDownUp size={11} />
									</div>
								</th>

								<th className="px-3 py-3 text-left text-[10px] font-medium text-gray-500">
									Supplier
								</th>

								<th className="px-3 py-3 text-left text-[10px] font-medium text-gray-500">
									Destination
								</th>

								<th className="px-3 py-3 text-left text-[10px] font-medium text-gray-500">
									Status
								</th>

								<th className="px-3 py-3 text-left text-[10px] font-medium text-gray-500">
									Received
								</th>

								<th className="px-3 py-3 text-left text-[10px] font-medium text-gray-500">
									Total
								</th>

								<th className="px-3 py-3 text-left text-[10px] font-medium text-gray-500">
									Expected arrival
								</th>

							</tr>
						</thead>
						{/* ==================================================
                TABLE BODY
            ================================================== */}

						<tbody>
							{filteredOrders.length > 0 ? (
								filteredOrders.map((order) => {
									const isSelected =
										selectedOrders.includes(order.id);

									return (
										<tr
											key={order.id}
											className={`border-b border-gray-100  last:border-0
                                          ${isSelected ? "bg-violet-50/50" : "hover:bg-gray-50/50"} `}
										>
											{/* CHECKBOX */}

											<td className="px-3 py-2.5">
												<input
													type="checkbox"
													checked={isSelected}
													onChange={() =>
														handleSelectOne(order.id)
													}
													className="h-3.5 w-3.5 cursor-pointer  rounded border-gray-300 " />
											</td>

											{/* PO */}

											<td className="px-3 py-2.5">
												<div
													className="
                            text-[11px]
                            font-medium
                            text-gray-800
                          "
												>
													{order.po}
												</div>

												<div
													className="
                            text-[9px]
                            text-gray-400
                          "
												>
													{order.id}
												</div>
											</td>

											{/* SUPPLIER */}

											<td
												className="
                          px-3
                          py-2.5
                          text-[11px]
                          text-gray-700
                        "
											>
												{order.supplier}
											</td>

											{/* DESTINATION */}

											<td
												className="
                          px-3
                          py-2.5
                          text-[11px]
                          text-gray-700
                        "
											>
												{order.destination}
											</td>

											{/* STATUS */}

											<td className="px-3 py-2.5">
												{order.status === "Open" ? (
													<span
														className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-full
                              border
                              border-green-300
                              bg-green-50
                              px-2
                              py-0.5
                              text-[9px]
                              font-medium
                              text-green-600
                            "
													>
														<span
															className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-green-500
                              "
														/>
														Open
													</span>
												) : (
													<span
														className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-full
                              border
                              border-red-300
                              bg-red-50
                              px-2
                              py-0.5
                              text-[9px]
                              font-medium
                              text-red-500
                            "
													>
														<span
															className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-red-400
                              "
														/>
														Closed
													</span>
												)}
											</td>

											{/* RECEIVED */}

											<td
												className="
                          px-3
                          py-2.5
                          text-[11px]
                          text-gray-700
                        "
											>
												{order.received}
											</td>

											{/* TOTAL */}

											<td
												className="
                          px-3
                          py-2.5
                          text-[11px]
                          text-gray-700
                        "
											>
												{order.total}
											</td>

											{/* ARRIVAL */}

											<td
												className="
                          px-3
                          py-2.5
                          text-[11px]
                          text-gray-700
                        "
											>
												{order.arrival}
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td
										colSpan={8}
										className="py-12 text-center"
									>
										<p
											className="
                        text-sm
                        font-medium
                        text-gray-700
                      "
										>
											No purchase orders found
										</p>

										<p
											className="
                        mt-1
                        text-xs
                        text-gray-400
                      "
										>
											Try changing your search or filters.
										</p>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* ==================================================
          RESULT INFO
      ================================================== */}

			<div
				className="
          mt-3
          flex
          items-center
          justify-between
        "
			>
				<p
					className="
            text-[10px]
            text-gray-400
          "
				>
					Showing {filteredOrders.length} of{" "}
					{purchaseOrders.length} orders
				</p>

				<button
					type="button"
					className="
            text-[10px]
            text-gray-700
            hover:text-violet-600
          "
				>
					Learn more about{" "}
					<span className="text-violet-600">
						Purchase orders
					</span>
				</button>
			</div>

			{/* ==================================================
          CREATE PURCHASE ORDER MODAL
      ================================================== */}

			{showCreatePO && (
				<div
					className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/30
            p-4
          "
					onClick={closeCreatePOModal}
				>
					{/* MODAL */}

					<div
						className="
              w-full
              max-w-md
              rounded-xl
              bg-white
              shadow-xl
            "
						onClick={(event) =>
							event.stopPropagation()
						}
					>
						{/* MODAL HEADER */}

						<div
							className="
                flex
                items-center
                justify-between
                border-b
                border-gray-200
                px-5
                py-4
              "
						>
							<div>
								<h2
									className="
                    text-sm
                    font-semibold
                    text-gray-900
                  "
								>
									Create Purchase Order
								</h2>

								<p
									className="
                    mt-1
                    text-[10px]
                    text-gray-500
                  "
								>
									Add details to create a new purchase order.
								</p>
							</div>

							{/* CLOSE */}

							<button
								type="button"
								onClick={closeCreatePOModal}
								className="
                  rounded-md
                  p-1
                  text-gray-400
                  hover:bg-gray-100
                  hover:text-gray-700
                "
							>
								<X size={17} />
							</button>
						</div>

						{/* ==================================================
                FORM
            ================================================== */}

						<div className="space-y-4 px-5 py-5">

							{/* SUPPLIER */}

							<div>
								<label
									className="
                    mb-1
                    block
                    text-[11px]
                    font-medium
                    text-gray-700
                  "
								>
									Supplier
								</label>

								<input
									type="text"
									value={newPO.supplier}
									onChange={(event) =>
										setNewPO((previous) => ({
											...previous,
											supplier: event.target.value,
										}))
									}
									placeholder="Enter supplier name"
									className="
                    w-full
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-xs
                    outline-none
                    focus:border-violet-500
                    focus:ring-1
                    focus:ring-violet-500
                  "
								/>
							</div>

							{/* DESTINATION */}

							<div>
								<label
									className="
                    mb-1
                    block
                    text-[11px]
                    font-medium
                    text-gray-700
                  "
								>
									Destination
								</label>

								<input
									type="text"
									value={newPO.destination}
									onChange={(event) =>
										setNewPO((previous) => ({
											...previous,
											destination:
												event.target.value,
										}))
									}
									placeholder="Enter warehouse"
									className="
                    w-full
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-xs
                    outline-none
                    focus:border-violet-500
                    focus:ring-1
                    focus:ring-violet-500
                  "
								/>
							</div>

							{/* EXPECTED ARRIVAL */}

							<div>
								<label
									className="
                    mb-1
                    block
                    text-[11px]
                    font-medium
                    text-gray-700
                  "
								>
									Expected arrival
								</label>

								<input
									type="date"
									value={newPO.arrival}
									onChange={(event) =>
										setNewPO((previous) => ({
											...previous,
											arrival: event.target.value,
										}))
									}
									className="
                    w-full
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-xs
                    outline-none
                    focus:border-violet-500
                    focus:ring-1
                    focus:ring-violet-500
                  "
								/>
							</div>

							{/* TOTAL */}

							<div>
								<label
									className="
                    mb-1
                    block
                    text-[11px]
                    font-medium
                    text-gray-700
                  "
								>
									Total
								</label>

								<div className="relative">
									<span
										className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-xs
                      text-gray-500
                    "
									>
										$
									</span>

									<input
										type="number"
										min="0"
										step="0.01"
										value={newPO.total}
										onChange={(event) =>
											setNewPO((previous) => ({
												...previous,
												total: event.target.value,
											}))
										}
										placeholder="0.00"
										className="
                      w-full
                      rounded-md
                      border
                      border-gray-300
                      py-2
                      pl-7
                      pr-3
                      text-xs
                      outline-none
                      focus:border-violet-500
                      focus:ring-1
                      focus:ring-violet-500
                    "
									/>
								</div>
							</div>
						</div>

						{/* ==================================================
                FOOTER
            ================================================== */}

						<div
							className="
                flex
                justify-end
                gap-2
                border-t
                border-gray-200
                px-5
                py-4
              "
						>
							{/* CANCEL */}

							<button
								type="button"
								onClick={closeCreatePOModal}
								className="
                  rounded-md
                  border
                  border-gray-300
                  px-4
                  py-2
                  text-[11px]
                  font-medium
                  text-gray-600
                  hover:bg-gray-50
                "
							>
								Cancel
							</button>

							{/* CREATE */}

							<button
								type="button"
								onClick={handleCreatePO}
								className="
                  rounded-md
                  bg-violet-600
                  px-4
                  py-2
                  text-[11px]
                  font-medium
                  text-white
                  hover:bg-violet-700
                "
							>
								Create Purchase Order
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}