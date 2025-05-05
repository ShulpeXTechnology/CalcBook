import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Emb() {
  return (
    <>
      <PageMeta
        title="React.js Embroidery Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Emb Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Embroidery" />
      <div className="space-y-6">
        <ComponentCard title="Embroidery" showButton={true}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
