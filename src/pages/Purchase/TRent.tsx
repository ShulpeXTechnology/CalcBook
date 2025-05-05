import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function TRent() {
  return (
    <>
      <PageMeta
        title="React.js T-Rent Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js T-Rent Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="T-Rent" />
      <div className="space-y-6">
        <ComponentCard title="T-Rent" showButton={true}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
