import { Modal, Select, DatePicker, Input, Button } from "antd";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export default function AddItemModal({
  visible,
  onClose,
  onSubmit,
  item,
  setItem,
  isEdit,
  uniqueNames,
  uniqueCategories,
  uniqueStatus,
  uniqueDesc,
  uniqueDesign,
}: {
  visible: any;
  onClose: any;
  onSubmit: any;
  item: any;
  setItem: any;
  isEdit: any;
  uniqueNames: any;
  uniqueCategories: any;
  uniqueStatus: any;
  uniqueDesc: any;
  uniqueDesign: any;
}) {
  const inputRef = useRef<any>(null);
  const [name, setName] = useState<any>("");

  const handleChange = (value: any) => {
    setItem((prevItem: any) => ({ ...prevItem, name: value }));
  };

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };

  const addItem = (e: any) => {
    e.preventDefault();
    // Add new item only if it's not empty and not already in the list
    if (name && !uniqueNames.includes(name)) {
      uniqueNames.push(name);
    }
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Description
  const inputDescRef = useRef<any>(null);
  const [nameDesc, setNameDesc] = useState<any>("");

  const handleDescChange = (value: any) => {
    setItem((prevItem: any) => ({ ...prevItem, description: value }));
  };

  const onDescChange = (event: any) => {
    setNameDesc(event.target.value);
  };

  const addDesc = (e: any) => {
    e.preventDefault();
    if (nameDesc && !uniqueDesc.includes(nameDesc)) {
      uniqueDesc.push(nameDesc);
    }
    setNameDesc("");
    setTimeout(() => {
      inputDescRef.current?.focus();
    }, 0);
  };

  // Design
  const inputDesignRef = useRef<any>(null);
  const [nameDesign, setNameDesign] = useState<any>("");

  const handleDesignChange = (value: any) => {
    setItem((prevItem: any) => ({ ...prevItem, design: value }));
  };

  const onDesignChange = (event: any) => {
    setNameDesign(event.target.value);
  };

  const addDesign = (e: any) => {
    e.preventDefault();
    if (nameDesign && !uniqueDesc.includes(nameDesign)) {
      uniqueDesc.push(nameDesign);
    }
    setNameDesign("");
    setTimeout(() => {
      inputDescRef.current?.focus();
    }, 0);
  };

  return (
    <Modal
      title={isEdit ? "Edit Item" : "Add Item"}
      centered
      open={visible}
      onCancel={onClose}
      onOk={() => onSubmit(item)}
      okText={isEdit ? "Update" : "Add"}
      width={1100}
      bodyStyle={{
        maxHeight: 400,
        overflowY: "auto",
        paddingRight: 8,
      }}
    >
      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="mb-2 flex">
              <div className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1 mr-2">
                CATEGORY
              </div>
              <Select
                className="w-[50%]"
                value={item.category}
                onChange={(v) => setItem({ ...item, category: v })}
              >
                {uniqueCategories.map((name: any) => (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1">
                PARTY NAME
              </label>
              <Select
                className="w-full"
                value={item.name}
                onChange={handleChange}
                showSearch
                placeholder="Select or add item"
                dropdownRender={(menu: any) => (
                  <>
                    {menu}
                    <div className="flex items-center">
                      <Input
                        placeholder="Please enter party name"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<FaUserPlus />}
                        onClick={addItem}
                      >
                        Add Party
                      </Button>
                    </div>
                  </>
                )}
                options={uniqueNames.map((item: any) => ({
                  label: item,
                  value: item,
                }))}
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
                value={item.invoice}
                onChange={(e) => setItem({ ...item, invoice: e.target.value })}
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
                value={item.challnNo}
                onChange={(e) => setItem({ ...item, challnNo: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                DATE
              </div>
              <DatePicker
                className="w-full col-span-2 p-2"
                value={item.dueDate ? dayjs(item.dueDate, "DD-MM-YYYY") : null}
                onChange={(_date: any, dateString: any) =>
                  setItem({ ...item, dueDate: dateString })
                }
                format="DD-MM-YYYY"
              />
            </div>
          </div>
        </div>

        {/* Description, Design, Qty, Rate, Total */}
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-4">
            <div className="bg-red-900 text-yellow-300 font-bold text-center py-2 px-1 text-lg border border-red-800">
              DESCRIPTOIN
            </div>
            <Select
              className="w-full mt-1"
              value={item.description}
              onChange={handleDescChange}
              showSearch
              placeholder="Description"
              dropdownRender={(menu: any) => (
                <>
                  {menu}
                  <div style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Please enter party name"
                      ref={inputDescRef}
                      value={nameDesc}
                      onChange={onDescChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <div className="flex mx-auto justify-center">
                      <Button
                        type="text"
                        icon={<FaUserPlus />}
                        onClick={addDesc}
                      >
                        Add Description
                      </Button>
                    </div>
                  </div>
                </>
              )}
              options={uniqueDesc.map((item: any) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
          {/* Design columns */}
          <div className="col-span-2">
            <div className="bg-red-900 text-yellow-300 font-bold text-center py-2 px-1 text-lg border border-red-800">
              DESIGN
            </div>
            <Select
              className="w-full mt-1"
              value={item.design}
              onChange={handleDesignChange}
              showSearch
              placeholder="Design"
              dropdownRender={(menu: any) => (
                <>
                  {menu}
                  <div>
                    <Input
                      placeholder="Please enter design"
                      ref={inputDesignRef}
                      value={nameDesign}
                      onChange={onDesignChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <div className="flex mx-auto justify-center">
                      <Button
                        type="text"
                        icon={<FaUserPlus />}
                        onClick={addDesign}
                      >
                        Add Design
                      </Button>
                    </div>
                  </div>
                </>
              )}
              options={uniqueDesign.map((item: any) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
          <div className="col-span-2">
            <div className="bg-red-900 text-yellow-300 font-bold text-center py-2 px-1 text-lg border border-red-800">
              QTY
            </div>
            <input
              type="number"
              className="w-full border border-gray-400 py-1 px-2 mt-1 text-base focus:outline-none rounded"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
            />
          </div>
          {/* Rate - spans 2 columns */}
          <div className="col-span-2">
            <div className="bg-red-900 text-yellow-300 font-bold text-center py-2 px-1 text-lg border border-red-800">
              RATE
            </div>
            <input
              type="number"
              className="w-full border border-gray-400 py-1 px-2 mt-1 text-base focus:outline-none rounded"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => setItem({ ...item, rate: e.target.value })}
            />
          </div>
          {/* Total - spans 2 columns */}
          <div className="col-span-2">
            <div className="bg-red-900 text-yellow-300 font-bold text-center py-2 px-1 text-lg border border-red-800">
              TOTAL
            </div>
            <input
              type="number"
              className="w-full border border-gray-400 py-1 px-2 mt-1 text-base focus:outline-none rounded"
              placeholder="Total"
              value={item.total}
              onChange={(e) => setItem({ ...item, total: e.target.value })}
            />
          </div>
        </div>

        {/* Plane, Short, Discount, Loss, Amount */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 flex items-center justify-center">
            <div className="w-full mr-2">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  PAYMENT
                </div>
                <input
                  className="col-span-2 rounded w-full p-1"
                  placeholder="Debit / Credit"
                  value={item.debit}
                  onChange={(e) => setItem({ ...item, debit: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                  STATUS
                </div>
                <Select
                  className="col-span-2 w-full"
                  value={item.status}
                  onChange={(v) => setItem({ ...item, status: v })}
                >
                  {uniqueStatus.map((st: any) => (
                    <Select.Option key={st} value={st}>
                      {st}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-full">
              <div className="flex mb-2 items-center justify-center">
                <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1 mr-2">
                  PLANE
                </label>
                <input
                  className="p-1 w-full rounded"
                  value={item.plane}
                  onChange={(e) => setItem({ ...item, plane: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-center m-auto">
                <label className="block font-bold text-yellow-300 bg-red-900 px-2 py-1 rounded mb-1 mr-2">
                  SHORT
                </label>
                <input
                  className="p-1 w-full rounded"
                  value={item.short}
                  onChange={(e) => setItem({ ...item, short: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center col-span-1">
                DISCOUNT
              </div>
              <input
                className="rounded w-full"
                placeholder="Discount %"
                value={item.discount}
                onChange={(e) => setItem({ ...item, discount: e.target.value })}
              />
              <input
                className="rounded col-span-1"
                placeholder="Discount ₹"
                value={item.discountP}
                onChange={(e) =>
                  setItem({ ...item, discountP: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                LOSS
              </div>
              <input
                className="col-span-2 rounded w-full"
                placeholder="Loss"
                value={item.loss}
                onChange={(e) => setItem({ ...item, loss: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="flex font-bold text-yellow-300 bg-red-900 rounded items-center justify-center">
                AMOUNT
              </div>
              <input
                className="col-span-2 rounded"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) => setItem({ ...item, amount: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
