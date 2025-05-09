import { Modal, Select, DatePicker } from "antd";
import dayjs from "dayjs";

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
}) {
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
                onChange={(v) => setItem({ ...item, name: v })}
                showSearch
              >
                {uniqueNames.map((name: any) => (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
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
                value={dayjs(item.dueDate, "DD-MM-YYYY")}
                onChange={(date) => setItem({ ...item, date })}
                format="DD-MM-YYYY"
                defaultValue={dayjs()}
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
            <input
              type="text"
              className="w-full border border-gray-400 py-1 px-2 mt-1 text-base focus:outline-none rounded"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
            />
          </div>
          {/* Design - spans 3 columns */}
          <div className="col-span-2">
            <div className="bg-red-900 text-yellow-300 font-bold text-center py-2 px-1 text-lg border border-red-800">
              DESIGNE
            </div>
            <input
              type="text"
              className="w-full border border-gray-400 py-1 px-2 mt-1 text-base focus:outline-none rounded"
              placeholder="Designe"
              value={item.designe}
              onChange={(e) => setItem({ ...item, designe: e.target.value })}
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
                  DEBIT
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
