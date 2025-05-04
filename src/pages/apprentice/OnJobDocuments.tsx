
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface DocumentTemplate {
  id: number;
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
  previewUrl: string;
}

const OnJobDocuments = () => {
  const documentTemplates: DocumentTemplate[] = [
    {
      id: 1,
      title: "Electrical Installation Certificate",
      description: "Standard certificate for completed electrical installations",
      type: "PDF Form",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 2,
      title: "Minor Works Certificate",
      description: "For small-scale electrical work and alterations",
      type: "PDF Form",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 3,
      title: "Electrical Condition Report",
      description: "For reporting on the condition of existing electrical installations",
      type: "PDF Form",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 4,
      title: "Risk Assessment Template",
      description: "Template for documenting potential hazards and control measures",
      type: "Word Document",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 5,
      title: "Method Statement Template",
      description: "Step-by-step guide for carrying out work safely",
      type: "Word Document",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      id: 6,
      title: "Client Handover Checklist",
      description: "Checklist for ensuring all aspects of work are complete before handover",
      type: "Excel Sheet",
      downloadUrl: "#",
      previewUrl: "#"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Documentation Templates</h1>
        <Link to="/apprentice" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTemplates.map((template) => (
          <Card key={template.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <FileText className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
              </div>
              <CardDescription className="mt-2">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Document Type:</span> {template.type}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm" className="flex gap-1 items-center">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OnJobDocuments;
