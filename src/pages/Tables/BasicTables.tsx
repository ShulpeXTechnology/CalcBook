import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Sales Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Sales Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Sales" />
      <div className="space-y-6">
        <ComponentCard title="Sales" showButton={true}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
