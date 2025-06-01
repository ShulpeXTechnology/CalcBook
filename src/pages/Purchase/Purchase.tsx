import { useState, useMemo, useEffect } from "react";
import { Tag } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/purchanse/Tables";
import AddItemModal from "../../components/purchanse/AddItem";
import FilterModal from "../../components/purchanse/FilterModal";
import { API_BASE_URL } from "../../config/env";
import { getToken } from "../../utils/auth";

export default function Purchase() {
  const token = getToken();
  const [rows, setRows] = useState<any>([]);

  // Get data
  const fetchPurchaseData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/purchase`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      if (!response.ok) throw new Error("Failed to fetch purchase data");

      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load purchase data. Please try again.");
    }
  };

  useEffect(() => {
    fetchPurchaseData();
  }, []);

  // Filter Modal
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    id: "",
    name: "",
    category: "",
    status: "",
    dateRange: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<any>({
    id: "",
    name: "",
    category: "",
    status: "",
    dateRange: [],
  });

  // Filtering logic
  const parseDate = (dateStr: any) => {
    if (!dateStr) return null;
    const parts = dateStr.split("-");
    if (parts.length != 3) return null;
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row: any) => {
      if (appliedFilters.id && row?.id != Number(appliedFilters.id))
        return false;
      if (appliedFilters.name && row?.name != appliedFilters.name) return false;
      if (appliedFilters.category && row?.category != appliedFilters.category)
        return false;
      if (appliedFilters.status && row?.status != appliedFilters.status)
        return false;
      if (appliedFilters.dateRange.length == 2) {
        const startDate = appliedFilters.dateRange[0].startOf("day").toDate();
        const endDate = appliedFilters.dateRange[1].endOf("day").toDate();
        const rowDate = parseDate(row?.dueDate);
        if (!rowDate) return false;
        if (rowDate < startDate || rowDate > endDate) return false;
      }
      return true;
    });
  }, [rows, appliedFilters]);

  // Dropdown options
  const uniqueCategories = Array.from(
    new Set(rows.map((r: any) => r?.category))
  ).filter(Boolean);

  const uniqueStatus = Array.from(
    new Set(rows.map((r: any) => r?.status))
  ).filter(Boolean);

  const uniqueNames = Array.from(new Set(rows.map((r: any) => r?.name))).filter(
    Boolean
  );

  const uniqueDesc = Array.from(
    new Set(rows?.map((r: any) => r?.description))
  ).filter(Boolean);

  const uniqueDesign = Array.from(
    new Set(rows?.map((r: any) => r?.design))
  ).filter(Boolean);

  // const getUniqueOptions = (key: string) => {
  //   const values = [
  //     ...new Set(rows.map((item: any) => item[key]).filter(Boolean)),
  //   ];
  //   return values.map((val) => ({ value: val, label: val }));
  // };

  // const categoryOptions = getUniqueOptions("category");
  // const partyOptions = getUniqueOptions("partyName");

  // Filter Modal handlers
  const openFilterModal = () => {
    setTempFilters({ ...appliedFilters });
    setFilterModalVisible(true);
  };

  const applyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setFilterModalVisible(false);
  };

  const resetFilters = () => {
    setTempFilters({
      id: "",
      name: "",
      category: "",
      status: "",
      dateRange: [],
    });
    setAppliedFilters({
      id: "",
      name: "",
      category: "",
      status: "",
      dateRange: [],
    });
    setFilterModalVisible(false);
  };

  // Prepare filter tags
  const filterTags: { key: string; label: string }[] = [];
  if (appliedFilters.id)
    filterTags.push({
      key: "id",
      label: `ID: ${appliedFilters?.id}`,
    });
  if (appliedFilters.name)
    filterTags.push({
      key: "name",
      label: `User: ${appliedFilters?.name}`,
    });
  if (appliedFilters.category)
    filterTags.push({
      key: "category",
      label: `Category: ${appliedFilters?.category}`,
    });
  if (appliedFilters.status)
    filterTags.push({
      key: "status",
      label: `Status: ${appliedFilters?.status}`,
    });
  if (appliedFilters.dateRange.length == 2)
    filterTags.push({
      key: "date",
      label: `Due: ${appliedFilters?.dateRange?.[0].format(
        "DD-MM-YYYY"
      )} ~ ${appliedFilters?.dateRange?.[1].format("DD-MM-YYYY")}`,
    });

  const removeFilter = (key: any) => {
    setAppliedFilters((filters: any) => ({
      ...filters,
      [key == "date" ? "dateRange" : key]: key == "date" ? [] : "",
    }));
  };

  // Add/Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [modalEditId, setModalEditId] = useState(null);
  const [item, setItem] = useState({
    name: "",
    category: "",
    quantity: "",
    rate: "",
    total: "",
    discount: "",
    discountP: "",
    amount: "",
    short: "",
    plane: "",
    loss: "",
    credit: "",
    debit: "",
    dueDate: "",
    status: "",
  });

  // Add Item handler
  const handleAddClick = () => {
    setModalEditId(null);
    setItem({
      name: "",
      category: "",
      quantity: "",
      rate: "",
      total: "",
      discount: "",
      discountP: "",
      amount: "",
      short: "",
      plane: "",
      loss: "",
      credit: "",
      debit: "",
      dueDate: "",
      status: "",
    });
    setShowModal(true);
  };

  const handleEdit = (row: any) => {
    setModalEditId(row.id);
    setItem({ ...row });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this purchase?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/purchase/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete purchase");
      }

      setRows((prevRows: any[]) => prevRows.filter((row) => row.id != id));
      alert("Purchase deleted successfully.");
    } catch (error) {
      console.error("Error deleting purchase:", error);
      alert("There was an error deleting the purchase. Please try again.");
    }
  };

  const handleModalSubmit = async (newItem: any) => {
    console.log(newItem.dueDate, "newItem.dueDate");

    const itemToSend = {
      ...newItem,
      challn_no: newItem.challnNo,
      discount_p: newItem.discountP,
      due_date: newItem.dueDate,
    };

    try {
      let response: any;
      let data: any;

      if (modalEditId) {
        // Edit mode: PUT request
        response = await fetch(`${API_BASE_URL}/api/purchase/${modalEditId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemToSend),
        });

        if (!response.ok) {
          throw new Error("Failed to update item");
        }

        data = await response.json();

        setRows((rows: any[]) =>
          rows.map((row) =>
            row.id == modalEditId
              ? { ...row, ...newItem, id: modalEditId }
              : row
          )
        );
      } else {
        response = await fetch(`${API_BASE_URL}/api/purchase`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemToSend),
        });

        if (!response.ok) {
          throw new Error("Failed to save item");
        }

        data = await response.json();

        setRows((prevRows: any[]) => [
          { ...newItem, id: data.id },
          ...prevRows,
        ]);
      }

      // Reset modal and form
      setShowModal(false);
      setModalEditId(null);
      setItem({
        name: "",
        category: "",
        quantity: "",
        rate: "",
        total: "",
        discount: "",
        discountP: "",
        amount: "",
        short: "",
        plane: "",
        loss: "",
        credit: "",
        debit: "",
        dueDate: "",
        status: "",
      });
    } catch (error) {
      console.error("Error submitting item:", error);
      alert("There was an error saving the purchase. Please try again.");
    }
  };

  return (
    <>
      <PageMeta
        title="Purchanse"
        description="This is Purchanse Dashboard page"
      />
      <PageBreadcrumb pageTitle="Purchanse" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                Purchanse
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {/* Applied Filter Tags */}
              {filterTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mr-2">
                  {filterTags.map((tag: any) => (
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
                onClick={openFilterModal}
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
                onClick={handleAddClick}
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="space-y-6">
              <BasicTableOne
                rows={filteredRows}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      <AddItemModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        item={item}
        setItem={setItem}
        isEdit={!!modalEditId}
        uniqueNames={uniqueNames}
        uniqueCategories={uniqueCategories}
        uniqueStatus={uniqueStatus}
        uniqueDesc={uniqueDesc}
        uniqueDesign={uniqueDesign}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        onReset={resetFilters}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        uniqueNames={uniqueNames}
        uniqueCategories={uniqueCategories}
        uniqueStatus={uniqueStatus}
      />
    </>
  );
}
