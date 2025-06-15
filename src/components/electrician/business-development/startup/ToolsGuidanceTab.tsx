
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Settings, Calculator, Users, CheckCircle } from "lucide-react";

const ToolsGuidanceTab = () => {
  const businessTemplates = [
    {
      name: "Business Plan Template",
      description: "Comprehensive template for electrical contractors",
      type: "Document"
    },
    {
      name: "Quote & Invoice Templates",
      description: "Professional quote and invoice formats",
      type: "Spreadsheet"
    },
    {
      name: "Risk Assessment Forms",
      description: "Health & safety documentation pack",
      type: "Document Pack"
    },
    {
      name: "Customer Contract Template",
      description: "Legally compliant service agreements",
      type: "Document"
    }
  ];

  const operationalSteps = [
    {
      title: "Workspace Setup",
      points: [
        "Establish home office or workshop",
        "Set up filing system for documents",
        "Install accounting software",
        "Create customer database"
      ]
    },
    {
      title: "Marketing Strategy",
      points: [
        "Create professional website",
        "Set up Google My Business",
        "Design business cards and flyers",
        "Build social media presence"
      ]
    },
    {
      title: "Operational Procedures",
      points: [
        "Develop standard quoting process",
        "Create job scheduling system",
        "Establish safety protocols",
        "Set up supplier accounts"
      ]
    }
  ];

  const digitalTools = [
    {
      name: "Job Costing Calculator",
      description: "Calculate accurate job costs and pricing",
      type: "Interactive Tool"
    },
    {
      name: "Cash Flow Planner",
      description: "Plan and track your business finances",
      type: "Planning Tool"
    },
    {
      name: "Customer Database",
      description: "Manage client information and history",
      type: "Management Tool"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Download className="h-5 w-5" />
            Business Document Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {businessTemplates.map((template, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-elec-dark/30 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-white">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <Badge variant="outline" className="text-xs mt-2">{template.type}</Badge>
              </div>
              <Button size="sm" className="ml-4">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Operational Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {operationalSteps.map((step, index) => (
            <div key={index} className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-white mb-3">{step.title}</h4>
              <div className="space-y-2">
                {step.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-2 text-sm text-blue-200">
                    <CheckCircle className="h-3 w-3" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Digital Business Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {digitalTools.map((tool, index) => (
            <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                  <Badge className="bg-green-500/20 text-green-300">{tool.type}</Badge>
                </div>
                <Button size="sm" className="ml-4">Launch</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsGuidanceTab;
