
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DocumentTemplates from "@/components/electrician-tools/DocumentTemplates";

const DocumentTemplatesPage = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Templates</h1>
          <p className="text-muted-foreground">
            Access and download professional document templates for electrical work.
          </p>
        </div>
        <Link to="/electrician-tools/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin Tools
          </Button>
        </Link>
      </div>

      <DocumentTemplates />
    </div>
  );
};

export default DocumentTemplatesPage;
