import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Kharch() {
  return (
    <>
      <PageMeta
        title="React.js Kharch Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Kharch Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Kharch" />
      <div className="space-y-6">
        <ComponentCard title="Kharch" showButton={true}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
