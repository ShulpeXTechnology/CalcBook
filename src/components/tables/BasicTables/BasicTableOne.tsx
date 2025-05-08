import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { useState } from "react";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { IoSave } from "react-icons/io5";

export default function BasicTableOne({
  rows,
  setRows,
}: {
  rows: any;
  setRows: any;
}) {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState<any>({
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

  const handleEdit = (row: any) => {
    setEditRowId(row.id);
    setEditData({
      name: row.name,
      projectName: row.projectName,
      quantity: row.quantity,
      rate: row.rate,
      total: row.total,
      discount: row.discount,
      discountP: row.discountP,
      amount: row.amount,
      short: row.short,
      deko: row.deko,
      loss: row.loss,
      credit: row.credit,
      debit: row.debit,
      dueDate: row.dueDate,
      status: row.status,
    });
  };

  const handleSave = (id: any) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) => (row.id == id ? { ...row, ...editData } : row))
    );
    setEditRowId(null);
  };

  const handleDelete = (id: any) => {
    setRows(rows.filter((row: any) => row.id != id));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Quantity
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Rate
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Discount %
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Discount ₹
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Amount
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Short
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Deko
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Loss
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Credit
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Debit
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Due Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {rows?.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.projectName}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    className={`${
                      editRowId == order.id ? "p-0" : "px-4 py-3"
                    } text-gray-500 text-start text-theme-sm dark:text-gray-400"`}
                  >
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="projectName"
                        value={editData.projectName}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.projectName?.toUpperCase()
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="quantity"
                        value={editData.quantity}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.quantity
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="rate"
                        value={editData.rate}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.rate
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="total"
                        value={editData.total}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.total
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="discount"
                        value={editData.discount}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.discount + "%"
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="discountP"
                        value={editData.discountP}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      "₹" + order.discountP
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="amount"
                        value={editData.amount}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.amount
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="short"
                        value={editData.short}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.short
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="deko"
                        value={editData.deko}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.deko
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="loss"
                        value={editData.loss}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.loss
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="credit"
                        value={editData.credit}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.credit
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="debit"
                        value={editData.debit}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.debit
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="dueDate"
                        value={editData.dueDate}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      order.dueDate
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {editRowId == order.id ? (
                      <input
                        type="text"
                        name="status"
                        value={editData.status}
                        onChange={handleChange}
                        className="text-gray-500 dark:text-gray-400 bg-transparent"
                      />
                    ) : (
                      <Badge
                        size="sm"
                        color={
                          order.status == "Active"
                            ? "primary"
                            : order?.status == "Delivered"
                            ? "success"
                            : order.status == "Pending"
                            ? "warning"
                            : "error"
                        }
                      >
                        {order.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-2">
                      {editRowId == order.id ? (
                        <div
                          className="text-gray-500 cursor-pointer"
                          onClick={() => handleSave(order.id)}
                        >
                          <IoSave />
                        </div>
                      ) : (
                        <div
                          className="text-gray-500 cursor-pointer"
                          onClick={() => handleEdit(order)}
                        >
                          <MdEditSquare />
                        </div>
                      )}
                      <div
                        className="text-red-500 ml-2"
                        onClick={() => handleDelete(order.id)}
                      >
                        <MdDeleteForever />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
