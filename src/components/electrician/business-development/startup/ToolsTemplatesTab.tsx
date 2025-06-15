
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calculator, Users, PoundSterling, CheckCircle, ExternalLink } from "lucide-react";

const ToolsTemplatesTab = () => {
  const businessTemplates = [
    {
      name: "Business Plan Template",
      description: "Comprehensive template for electrical contractors",
      type: "Document",
      size: "2.5 MB",
      downloads: 1250,
      rating: 4.8
    },
    {
      name: "Quote & Invoice Templates",
      description: "Professional quote and invoice formats",
      type: "Spreadsheet",
      size: "850 KB",
      downloads: 2100,
      rating: 4.9
    },
    {
      name: "Risk Assessment Forms",
      description: "Health & safety documentation pack",
      type: "Document Pack",
      size: "1.8 MB",
      downloads: 980,
      rating: 4.7
    },
    {
      name: "Customer Contract Template",
      description: "Legally compliant service agreements",
      type: "Document",
      size: "1.2 MB",
      downloads: 1450,
      rating: 4.6
    }
  ];

  const digitalTools = [
    {
      name: "Job Costing Calculator",
      description: "Calculate accurate job costs and pricing",
      features: ["Material costs", "Labour rates", "Profit margins", "Tax calculations"],
      type: "Interactive Tool"
    },
    {
      name: "Cash Flow Planner",
      description: "Plan and track your business finances",
      features: ["Monthly projections", "Expense tracking", "Revenue forecasting", "Break-even analysis"],
      type: "Planning Tool"
    },
    {
      name: "Customer Database",
      description: "Manage client information and history",
      features: ["Contact management", "Job history", "Payment tracking", "Follow-up reminders"],
      type: "Management Tool"
    }
  ];

  const softwareRecommendations = [
    {
      name: "QuickBooks",
      category: "Accounting",
      price: "From £6/month",
      features: ["Invoicing", "Expense tracking", "Tax preparation", "Financial reports"],
      ukSpecific: true
    },
    {
      name: "Sage Business Cloud",
      category: "Accounting",
      price: "From £10/month", 
      features: ["VAT returns", "Payroll", "Bank reconciliation", "Mobile app"],
      ukSpecific: true
    },
    {
      name: "Tradify",
      category: "Job Management",
      price: "From £29/month",
      features: ["Job scheduling", "Quote creation", "Material tracking", "Time tracking"],
      ukSpecific: false
    },
    {
      name: "ServiceM8",
      category: "Field Service",
      price: "From £25/month",
      features: ["GPS tracking", "Photo reports", "Customer communication", "Invoice generation"],
      ukSpecific: false
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Business Document Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {businessTemplates.map((template, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-elec-dark/30 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-white">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">{template.type}</Badge>
                  <span className="text-xs text-muted-foreground">{template.size}</span>
                  <span className="text-xs text-muted-foreground">★ {template.rating}</span>
                  <span className="text-xs text-muted-foreground">{template.downloads} downloads</span>
                </div>
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
            <Calculator className="h-5 w-5" />
            Interactive Business Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {digitalTools.map((tool, index) => (
            <div key={index} className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-1 text-xs text-blue-200">
                        <CheckCircle className="h-3 w-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ml-4">
                  <Badge className="bg-blue-500/20 text-blue-300">{tool.type}</Badge>
                  <Button size="sm" className="ml-2">Launch</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Recommended Software Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {softwareRecommendations.map((software, index) => (
            <div key={index} className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-white">{software.name}</h4>
                    {software.ukSpecific && (
                      <Badge variant="outline" className="text-xs text-purple-300 border-purple-400/30">
                        UK Specific
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <Badge className="bg-purple-500/20 text-purple-300">{software.category}</Badge>
                    <span className="text-sm font-medium text-purple-200">{software.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {software.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-1 text-xs text-purple-200">
                        <CheckCircle className="h-3 w-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsTemplatesTab;
