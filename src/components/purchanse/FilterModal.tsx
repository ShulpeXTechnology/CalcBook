import { Modal, Input, Select, DatePicker, Button } from "antd";
const { RangePicker } = DatePicker;

export default function FilterModal({
  visible,
  onClose,
  onApply,
  onReset,
  tempFilters,
  setTempFilters,
  uniqueNames,
  uniqueCategories,
  uniqueStatus,
}: {
  visible: any;
  onClose: any;
  onApply: any;
  onReset: any;
  tempFilters: any;
  setTempFilters: any;
  uniqueNames: any;
  uniqueCategories: any;
  uniqueStatus: any;
}) {
  return (
    <Modal
      title="Filter"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="reset" onClick={onReset}>
          Reset
        </Button>,
        <Button key="apply" type="primary" onClick={onApply}>
          Apply
        </Button>,
      ]}
      width={600}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input
          placeholder="ID"
          value={tempFilters.id}
          onChange={(e) =>
            setTempFilters((f: any) => ({
              ...f,
              id: e.target.value.replace(/\D/g, ""),
            }))
          }
          allowClear
        />
        <Select
          placeholder="User Name"
          value={tempFilters.name}
          onChange={(v) => setTempFilters((f: any) => ({ ...f, name: v }))}
          allowClear
        >
          {uniqueNames.map((name: any) => (
            <Select.Option key={name} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Category"
          value={tempFilters.category}
          onChange={(v) => setTempFilters((f: any) => ({ ...f, category: v }))}
          allowClear
        >
          {uniqueCategories.map((cat: any) => (
            <Select.Option key={cat} value={cat}>
              {cat}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Status"
          value={tempFilters.status}
          onChange={(v) => setTempFilters((f: any) => ({ ...f, status: v }))}
          allowClear
        >
          {uniqueStatus.map((st: any) => (
            <Select.Option key={st} value={st}>
              {st}
            </Select.Option>
          ))}
        </Select>
        <RangePicker
          value={tempFilters.dateRange}
          onChange={(dates) =>
            setTempFilters((f: any) => ({ ...f, dateRange: dates || [] }))
          }
          allowClear
          style={{ width: "100%" }}
        />
      </div>
    </Modal>
  );
}
