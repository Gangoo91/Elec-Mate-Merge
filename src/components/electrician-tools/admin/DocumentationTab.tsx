
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentationTab = () => {
  const documentCategories = [
    {
      category: "Electrical Certificates",
      count: 12,
      documents: [
        { name: "Electrical Installation Certificate", type: "BS 7671", popular: true },
        { name: "Minor Works Certificate", type: "BS 7671", popular: true },
        { name: "Electrical Installation Condition Report", type: "EICR", popular: false },
        { name: "Periodic Inspection Report", type: "BS 7671", popular: false }
      ]
    },
    {
      category: "Risk Assessments",
      count: 8,
      documents: [
        { name: "Generic Electrical RAMS", type: "Safety", popular: true },
        { name: "Domestic Installation RAMS", type: "Safety", popular: true },
        { name: "Commercial Electrical RAMS", type: "Safety", popular: false },
        { name: "Emergency Call-out RAMS", type: "Safety", popular: false }
      ]
    },
    {
      category: "Business Documents",
      count: 15,
      documents: [
        { name: "Professional Quote Template", type: "Business", popular: true },
        { name: "Invoice Template", type: "Business", popular: true },
        { name: "Contract of Employment", type: "HR", popular: false },
        { name: "Subcontractor Agreement", type: "Legal", popular: false }
      ]
    },
    {
      category: "Health & Safety",
      count: 10,
      documents: [
        { name: "Site Safety Checklist", type: "Safety", popular: true },
        { name: "Accident Report Form", type: "Safety", popular: false },
        { name: "Tool Inspection Log", type: "Maintenance", popular: false },
        { name: "PPE Inspection Record", type: "Safety", popular: false }
      ]
    }
  ];

  const quickActions = [
    { action: "Generate Quote", description: "Create professional electrical quotes", link: "/electrician-tools/quote-library" },
    { action: "Download Certificates", description: "Access BS 7671 compliant certificates", link: "/electrician-tools/document-templates" },
    { action: "Create RAMS", description: "Generate risk assessment documents", link: "/electrician-tools/site-safety" },
    { action: "View All Templates", description: "Browse complete document library", link: "/electrician-tools/document-templates" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Document Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold text-white text-sm mb-1">{action.action}</h4>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documentCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{category.category}</CardTitle>
                <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                  {category.count} docs
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.documents.map((doc, docIndex) => (
                  <div key={docIndex} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white text-sm">{doc.name}</h4>
                        {doc.popular && <Star className="h-3 w-3 text-elec-yellow fill-current" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{doc.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Link to="/electrician-tools/document-templates">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All {category.category}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentationTab;
