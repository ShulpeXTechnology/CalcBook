import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Purchase() {
  return (
    <>
      <PageMeta
        title="React.js Purchase Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Purchase Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Purchase" />
      <div className="space-y-6">
        <ComponentCard title="Purchase" showButton={true}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
