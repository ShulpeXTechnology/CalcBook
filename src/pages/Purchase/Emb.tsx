import { useState, useMemo } from "react";
import { Modal, Input, Select, DatePicker, Button, Tag } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Emb() {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "KRISHNA-GHANABHAI",
      projectName: "Embroidery",
      quantity: "56",
      rate: "195",
      total: "10920",
      discount: "7",
      discountP: "764",
      amount: "10156",
      short: "-",
      deko: "168",
      loss: "168",
      credit: "9988",
      debit: "9988",
      dueDate: "19-04-2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Kaiya George",
      projectName: "CLOTH",
      quantity: "56",
      rate: "195",
      total: "10920",
      discount: "7",
      discountP: "764",
      amount: "10156",
      short: "-",
      deko: "168",
      loss: "168",
      credit: "9988",
      debit: "9988",
      dueDate: "19-04-2025",
      status: "Pending",
    },
    {
      id: 3,
      name: "Zain Geidt",
      projectName: "SIROJKEY",
      quantity: "56",
      rate: "195",
      total: "10920",
      discount: "7",
      discountP: "764",
      amount: "10156",
      short: "-",
      deko: "168",
      loss: "168",
      credit: "9988",
      debit: "9988",
      dueDate: "19-04-2025",
      status: "Active",
    },
    {
      id: 4,
      name: "Abram Schleifer",
      projectName: "FITING",
      quantity: "56",
      rate: "195",
      total: "10920",
      discount: "7",
      discountP: "764",
      amount: "10156",
      short: "-",
      deko: "168",
      loss: "168",
      credit: "9988",
      debit: "9988",
      dueDate: "19-04-2025",
      status: "Cancel",
    },
    {
      id: 5,
      name: "Carla George",
      projectName: "T-RENT",
      quantity: "56",
      rate: "195",
      total: "10920",
      discount: "7",
      discountP: "764",
      amount: "10156",
      short: "-",
      deko: "168",
      loss: "168",
      credit: "9988",
      debit: "9988",
      dueDate: "19-04-2025",
      status: "Active",
    },
    {
      id: 6,
      name: "Zain Geidt",
      projectName: "P KHARCH",
      quantity: "56",
      rate: "195",
      total: "10920",
      discount: "7",
      discountP: "764",
      amount: "10156",
      short: "-",
      deko: "168",
      loss: "168",
      credit: "9988",
      debit: "9988",
      dueDate: "19-04-2025",
      status: "Delivered",
    },
  ]);

  // Add Item Modal
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    name: "",
    projectName: "",
    quantity: "",
    rate: "",
    total: "",
    discount: "",
    discountP: "",
    amount: "",
    short: "",
    deko: "",
    loss: "",
    credit: "",
    debit: "",
    dueDate: "",
    status: "",
  });

  // Filter Modal
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Temporary filter states (for modal)
  const [tempFilterId, setTempFilterId] = useState("");
  const [tempFilterName, setTempFilterName] = useState("");
  const [tempFilterCategory, setTempFilterCategory] = useState("");
  const [tempFilterStatus, setTempFilterStatus] = useState("");
  const [tempFilterDateRange, setTempFilterDateRange] = useState<any>([]);

  // Applied filter states (for actual filtering)
  const [appliedFilterId, setAppliedFilterId] = useState("");
  const [appliedFilterName, setAppliedFilterName] = useState("");
  const [appliedFilterCategory, setAppliedFilterCategory] = useState("");
  const [appliedFilterStatus, setAppliedFilterStatus] = useState("");
  const [appliedFilterDateRange, setAppliedFilterDateRange] = useState<any>([]);

  // Filtering logic
  const parseDate = (dateStr: any) => {
    if (!dateStr) return null;
    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (appliedFilterId && row.id != Number(appliedFilterId)) return false;
      if (appliedFilterName && row.name != appliedFilterName) return false;
      if (appliedFilterCategory && row.projectName != appliedFilterCategory)
        return false;
      if (appliedFilterStatus && row.status != appliedFilterStatus)
        return false;
      if (appliedFilterDateRange.length == 2) {
        const startDate = appliedFilterDateRange[0].startOf("day").toDate();
        const endDate = appliedFilterDateRange[1].endOf("day").toDate();
        const rowDate = parseDate(row.dueDate);
        if (!rowDate) return false;
        if (rowDate < startDate || rowDate > endDate) return false;
      }
      return true;
    });
  }, [
    rows,
    appliedFilterId,
    appliedFilterName,
    appliedFilterCategory,
    appliedFilterStatus,
    appliedFilterDateRange,
  ]);

  // Dropdown options
  const uniqueCategories = Array.from(
    new Set(rows.map((r) => r.projectName))
  ).filter(Boolean);
  const uniqueStatuses = Array.from(new Set(rows.map((r) => r.status))).filter(
    Boolean
  );
  const uniqueNames = Array.from(new Set(rows.map((r) => r.name))).filter(
    Boolean
  );

  // Filter Modal handlers
  const applyFilters = () => {
    setAppliedFilterId(tempFilterId);
    setAppliedFilterName(tempFilterName);
    setAppliedFilterCategory(tempFilterCategory);
    setAppliedFilterStatus(tempFilterStatus);
    setAppliedFilterDateRange(tempFilterDateRange);
    setFilterModalVisible(false);
  };

  const resetFilters = () => {
    setTempFilterId("");
    setTempFilterName("");
    setTempFilterCategory("");
    setTempFilterStatus("");
    setTempFilterDateRange([]);
    setAppliedFilterId("");
    setAppliedFilterName("");
    setAppliedFilterCategory("");
    setAppliedFilterStatus("");
    setAppliedFilterDateRange([]);
    setFilterModalVisible(false);
  };

  // Remove individual filter
  const removeFilter = (key: any) => {
    switch (key) {
      case "id":
        setAppliedFilterId("");
        break;
      case "name":
        setAppliedFilterName("");
        break;
      case "category":
        setAppliedFilterCategory("");
        break;
      case "status":
        setAppliedFilterStatus("");
        break;
      case "date":
        setAppliedFilterDateRange([]);
        break;
      default:
        break;
    }
  };

  // Prepare filter tags
  const filterTags = [];
  if (appliedFilterId)
    filterTags.push({
      key: "id",
      label: `ID: ${appliedFilterId}`,
    });
  if (appliedFilterName)
    filterTags.push({
      key: "name",
      label: `User: ${appliedFilterName}`,
    });
  if (appliedFilterCategory)
    filterTags.push({
      key: "category",
      label: `Category: ${appliedFilterCategory}`,
    });
  if (appliedFilterStatus)
    filterTags.push({
      key: "status",
      label: `Status: ${appliedFilterStatus}`,
    });
  if (appliedFilterDateRange.length === 2)
    filterTags.push({
      key: "date",
      label: `Due: ${appliedFilterDateRange[0].format(
        "DD-MM-YYYY"
      )} ~ ${appliedFilterDateRange[1].format("DD-MM-YYYY")}`,
    });

  // Add Item handler
  const handleAddItem = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    const newRow = { id: newId, ...newItem };
    setRows([newRow, ...rows]);
    setNewItem({
      name: "",
      projectName: "",
      quantity: "",
      rate: "",
      total: "",
      discount: "",
      discountP: "",
      amount: "",
      short: "",
      deko: "",
      loss: "",
      credit: "",
      debit: "",
      dueDate: "",
      status: "",
    });
    setShowModal(false);
  };

  return (
    <>
      <PageMeta
        title="React.js Embroidery Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Embroidery Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Embroidery" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                Embroidery
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {/* Applied Filter Tags */}
              {filterTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mr-2">
                  {filterTags.map((tag) => (
                    <Tag
                      key={tag.key}
                      closable
                      onClose={() => removeFilter(tag.key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        padding: "2px 8px",
                        background: "#f5f5f5",
                        border: "1px solid #d9d9d9",
                      }}
                    >
                      {tag.label}
                    </Tag>
                  ))}
                </div>
              )}
              {/* Filter Button */}
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={() => {
                  setTempFilterId(appliedFilterId);
                  setTempFilterName(appliedFilterName);
                  setTempFilterCategory(appliedFilterCategory);
                  setTempFilterStatus(appliedFilterStatus);
                  setTempFilterDateRange(appliedFilterDateRange);
                  setFilterModalVisible(true);
                }}
              >
                <svg
                  className="stroke-current fill-white dark:fill-gray-800"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.29004 5.90393H17.7067"
                    stroke=""
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.7075 14.0961H2.29085"
                    stroke=""
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                    fill=""
                    stroke=""
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                    fill=""
                    stroke=""
                    strokeWidth="1.5"
                  />
                </svg>
                Filter
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={() => setShowModal(true)}
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="space-y-6">
              <BasicTableOne rows={filteredRows} setRows={setRows} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <Modal
        title="Filter Sales"
        open={filterModalVisible}
        onCancel={() => setFilterModalVisible(false)}
        footer={[
          <Button key="reset" onClick={resetFilters}>
            Reset
          </Button>,
          <Button key="apply" type="primary" onClick={applyFilters}>
            Apply
          </Button>,
        ]}
        width={600}
        centered
      >
        <div className="space-y-4">
          <Input
            placeholder="Filter by ID"
            value={tempFilterId}
            onChange={(e) => setTempFilterId(e.target.value.replace(/\D/g, ""))}
            allowClear
          />
          <Select
            placeholder="Filter by User Name"
            value={tempFilterName || undefined}
            onChange={setTempFilterName}
            allowClear
            style={{ width: "100%" }}
            showSearch
            optionFilterProp="children"
          >
            {uniqueNames.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Filter by Category"
            value={tempFilterCategory || undefined}
            onChange={setTempFilterCategory}
            allowClear
            style={{ width: "100%" }}
          >
            {uniqueCategories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Filter by Status"
            value={tempFilterStatus || undefined}
            onChange={setTempFilterStatus}
            allowClear
            style={{ width: "100%" }}
          >
            {uniqueStatuses.map((st) => (
              <Option key={st} value={st}>
                {st}
              </Option>
            ))}
          </Select>
          <RangePicker
            format="DD-MM-YYYY"
            value={tempFilterDateRange}
            onChange={(dates) => setTempFilterDateRange(dates || [])}
            allowClear
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

      {/* Add Item Modal with Scrollbar */}
      <Modal
        title="Add New Item"
        centered
        open={showModal}
        onOk={handleAddItem}
        onCancel={() => setShowModal(false)}
        width={"auto"}
        bodyStyle={{
          maxHeight: 400,
          overflowY: "auto",
          paddingRight: 8,
        }}
      >
        {/* <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={newItem.projectName}
            onChange={(e) =>
              setNewItem({ ...newItem, projectName: e.target.value })
            }
            className="input"
          />
          <Input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            className="input"
          />
          <Input
            type="text"
            name="rate"
            placeholder="Rate"
            value={newItem.rate}
            onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="total"
            placeholder="Total"
            value={newItem.total}
            onChange={(e) => setNewItem({ ...newItem, total: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="discount"
            placeholder="Discount %"
            value={newItem.discount}
            onChange={(e) =>
              setNewItem({ ...newItem, discount: e.target.value })
            }
            className="input"
          />
          <Input
            type="text"
            name="discountP"
            placeholder="Discount ₹"
            value={newItem.discountP}
            onChange={(e) =>
              setNewItem({ ...newItem, discountP: e.target.value })
            }
            className="input"
          />
          <Input
            type="text"
            name="amount"
            placeholder="Amount"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="short"
            placeholder="Short"
            value={newItem.short}
            onChange={(e) => setNewItem({ ...newItem, short: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="deko"
            placeholder="Deko"
            value={newItem.deko}
            onChange={(e) => setNewItem({ ...newItem, deko: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="loss"
            placeholder="Loss"
            value={newItem.loss}
            onChange={(e) => setNewItem({ ...newItem, loss: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="credit"
            placeholder="Credit"
            value={newItem.credit}
            onChange={(e) => setNewItem({ ...newItem, credit: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="debit"
            placeholder="Debit"
            value={newItem.debit}
            onChange={(e) => setNewItem({ ...newItem, debit: e.target.value })}
            className="input"
          />
          <Input
            type="text"
            name="dueDate"
            placeholder="Due Date (DD-MM-YYYY)"
            value={newItem.dueDate}
            onChange={(e) =>
              setNewItem({ ...newItem, dueDate: e.target.value })
            }
            className="input"
          />
          <Input
            type="text"
            name="status"
            placeholder="Status"
            value={newItem.status}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            className="input"
          />
        </div> */}

        <div className="">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="mb-2">
                <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                  CATEGORY
                </label>
                <Select
                  className="w-full"
                  value={newItem.category}
                  onChange={(v) => setNewItem({ ...newItem, category: v })}
                  options={[
                    { value: "EMB", label: "EMB" },
                    { value: "PRINT", label: "PRINT" },
                  ]}
                />
              </div>
              <div>
                <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                  PARTY NAME
                </label>
                <Select
                  className="w-full"
                  value={newItem.partyName}
                  onChange={(v) => setNewItem({ ...newItem, partyName: v })}
                  options={[
                    { value: "Party 1", label: "Party 1" },
                    { value: "Party 2", label: "Party 2" },
                  ]}
                  showSearch
                />
              </div>
            </div>
            <div className="">
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  INVOICE
                </div>
                <input
                  className="col-span-2 rounded"
                  type="number"
                  name="invoice"
                  placeholder="Invoice"
                  value={newItem.invoice}
                  onChange={(e) =>
                    setNewItem({ ...newItem, invoice: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  CHALLN NO
                </div>
                <input
                  className="col-span-2 rounded"
                  type="number"
                  name="challnNo"
                  placeholder="Challn No"
                  value={newItem.challnNo}
                  onChange={(e) =>
                    setNewItem({ ...newItem, challnNo: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  DATE
                </div>
                <DatePicker
                  className="w-full col-span-2 p-2"
                  value={newItem.dueDate}
                  onChange={(date) => setNewItem({ ...newItem, date })}
                  format="DD-MM-YYYY"
                />
              </div>
            </div>
          </div>

          {/* Description, Design, Qty, Rate, Total */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <div className="">
              <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                DESCRIPTOIN
              </label>
              <input
                className="p-2 rounded w-full"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                DESIGNE
              </label>
              <input
                className="p-2 rounded w-full"
                value={newItem.design}
                onChange={(e) =>
                  setNewItem({ ...newItem, design: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                QTY
              </label>
              <input
                className="p-2 rounded w-full"
                value={newItem.qty}
                onChange={(e) =>
                  setNewItem({ ...newItem, qty: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                RATE
              </label>
              <input
                className="p-2 rounded w-full"
                value={newItem.rate}
                onChange={(e) =>
                  setNewItem({ ...newItem, rate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                TOTAL
              </label>
              <input
                className="p-2 rounded w-full"
                value={newItem.total}
                onChange={(e) =>
                  setNewItem({ ...newItem, total: e.target.value })
                }
              />
            </div>
          </div>

          {/* Plane, Short, Discount, Loss, Amount */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="col-span-2">
              <div className="mb-2">
                <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                  PLANE
                </label>
                <input
                  className="p-1 w-full rounded"
                  value={newItem.plane}
                  onChange={(e) =>
                    setNewItem({ ...newItem, plane: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                  SHORT
                </label>
                <input
                  className="p-1 w-full rounded"
                  value={newItem.short}
                  onChange={(e) =>
                    setNewItem({ ...newItem, short: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  DISCOUNT
                </div>
                <input
                  className="col-span-2 rounded"
                  placeholder="Discount"
                  value={newItem.discount}
                  onChange={(e) =>
                    setNewItem({ ...newItem, discount: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  LOSS
                </div>
                <input
                  className="col-span-2 rounded"
                  placeholder="Loss"
                  value={newItem.loss}
                  onChange={(e) =>
                    setNewItem({ ...newItem, discount: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  AMOUNT
                </div>
                <input
                  className="col-span-2 rounded"
                  placeholder="Amount"
                  value={newItem.amount}
                  onChange={(e) =>
                    setNewItem({ ...newItem, discount: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* <div className="flex gap-4 mt-6 justify-center">
            <Button
              type="default"
              className="bg-gray-100 font-bold"
              // onClick={() => setNewItem({})}
            >
              NEW-DATA
            </Button>
            <Button
              type="primary"
              className="bg-red-900 font-bold"
              onClick={handleAddItem}
            >
              SAVE
            </Button>
            <Button
              type="default"
              className="bg-gray-100 font-bold"
              onClick={() => setShowModal(false)}
            >
              EXIT
            </Button>
          </div> */}
        </div>
      </Modal>
    </>
  );
}
