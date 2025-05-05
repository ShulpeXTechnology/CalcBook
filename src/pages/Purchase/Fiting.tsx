import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Fiting() {
  return (
    <>
      <PageMeta
        title="React.js Fiting Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Fiting Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Fiting" />
      <div className="space-y-6">
        <ComponentCard title="Fiting" showButton={true}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
