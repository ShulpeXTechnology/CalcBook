import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";

export default function Tables({
  rows,
  onEdit,
  onDelete,
}: {
  rows: any;
  onEdit: any;
  onDelete: any;
}) {
  return (
    <Table>
      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
        <TableRow>
          <TableCell
            isHeader
            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            Id
          </TableCell>
          <TableCell
            isHeader
            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            User
          </TableCell>
          {/* <TableCell
            isHeader
            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            Category
          </TableCell> */}
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
            Plane
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
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {rows?.map((order: any) => (
          <TableRow key={order.id}>
            <TableCell
              className={`${"px-4 py-3"} text-gray-500 text-start text-theme-sm dark:text-gray-400"`}
            >
              {order.id}
            </TableCell>
            <TableCell className="px-5 py-4 sm:px-6 text-start">
              <div>
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {order.name}
                </span>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {order.category}
                </span>
              </div>
            </TableCell>
            {/* <TableCell
              className={`${"px-4 py-3"} text-gray-500 text-start text-theme-sm dark:text-gray-400"`}
            >
              {order.category?.toUpperCase()}
            </TableCell> */}
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.quantity}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.rate}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.total}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.discount} %
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              ₹ {order.discount_p}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.amount}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.short}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.plane}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.loss}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.amount}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.debit}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              {order.due_date}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
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
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
              <div className="flex items-center justify-center">
                <MdEditSquare
                  style={{ cursor: "pointer", color: "#1677ff" }}
                  onClick={() => onEdit(order)}
                />
                <MdDeleteForever
                  style={{ cursor: "pointer", color: "#ff4d4f", marginLeft: 8 }}
                  onClick={() => onDelete(order.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
