import { OnSiteGuideProcessor } from "@/components/admin/OnSiteGuideProcessor";

const AdminRAGProcessor = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">RAG Database Management</h1>
          <p className="text-muted-foreground">
            Process and add electrical installation guides to the AI knowledge base
          </p>
        </div>

        <OnSiteGuideProcessor />
      </div>
    </div>
  );
};

export default AdminRAGProcessor;
