import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Sirojkey() {
  return (
    <>
      <PageMeta
        title="React.js Sirojkey Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Sirojkey Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Sirojkey" />
      <div className="space-y-6">
        <ComponentCard title="Sirojkey" showButton={true}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
