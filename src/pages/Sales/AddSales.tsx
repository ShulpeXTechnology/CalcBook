import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function AddSales() {
  const [rows, setRows] = useState([
    { id: 1, name: "Product A", quantity: 2 },
    { id: 2, name: "Product B", quantity: 5 },
  ]);
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState<any>({ name: "", quantity: "" });

  const handleEdit = (row: any) => {
    setEditRowId(row.id);
    setEditData({ name: row.name, quantity: row.quantity });
  };

  const handleSave = (id: any) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) => (row.id == id ? { ...row, ...editData } : row))
    );
    setEditRowId(null);
  };

  const handleDelete = (id: any) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleAddRow = () => {
    const newId: any = rows.length ? rows[rows.length - 1].id + 1 : 1;
    setRows([...rows, { id: newId, name: "", quantity: 0 }]);
    setEditRowId(newId);
    setEditData({ name: "", quantity: 0 });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <PageMeta
        title="React.js Editable Table | TailAdmin - Next.js Admin Dashboard Template"
        description="This page shows an editable table example using Tailwind CSS and React."
      />
      <PageBreadcrumb pageTitle="Editable Table" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Sales Table
          </h3>
          <button
            onClick={handleAddRow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Row
          </button>
        </div>

        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="border px-4 py-2">
                  {editRowId === row.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="border px-2 py-1 w-full rounded"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editRowId === row.id ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleChange}
                      className="border px-2 py-1 w-full rounded"
                    />
                  ) : (
                    row.quantity
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {editRowId === row.id ? (
                    <button
                      onClick={() => handleSave(row.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
