
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

type DocumentType = {
  name: string;
  fileType: string;
};

const documentTypes: DocumentType[] = [
  { name: "Invoice Template", fileType: "PDF" },
  { name: "Job Estimate", fileType: "Word" },
  { name: "Client Contract", fileType: "PDF" },
  { name: "Electrical Test Report", fileType: "Excel" },
  { name: "EICR Template", fileType: "PDF" },
  { name: "Material List", fileType: "Excel" }
];

const DocumentTemplates = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {documentTypes.map((doc, i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-elec-yellow" />
                <div>
                  <CardTitle className="text-base">{doc.name}</CardTitle>
                  <CardDescription>
                    {doc.fileType} • Editable
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Last updated: May 2023
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Custom Template Builder</CardTitle>
          <CardDescription>
            Create and customize your own document templates with your branding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Launch Template Builder</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentTemplates;
