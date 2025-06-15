
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calculator, Smartphone, Laptop, Wrench, CheckCircle } from "lucide-react";

const ToolsTemplatesTab = () => {
  const documentTemplates = [
    {
      category: "Legal Documents",
      icon: FileText,
      templates: [
        { name: "Terms & Conditions Template", description: "Customisable T&Cs for electrical work", price: "Free" },
        { name: "Customer Contract Template", description: "Standard contract for electrical services", price: "Free" },
        { name: "Health & Safety Policy", description: "Template policy for small electrical businesses", price: "Free" },
        { name: "Risk Assessment Forms", description: "Site-specific risk assessment templates", price: "Free" }
      ]
    },
    {
      category: "Business Planning",
      icon: Calculator,
      templates: [
        { name: "Business Plan Template", description: "Comprehensive business plan for electrical contractors", price: "Free" },
        { name: "Financial Projections Spreadsheet", description: "3-year financial forecasting tool", price: "Free" },
        { name: "Cash Flow Template", description: "Monthly cash flow planning spreadsheet", price: "Free" },
        { name: "Pricing Calculator", description: "Job pricing and quoting tool", price: "Free" }
      ]
    },
    {
      category: "Marketing Materials",
      icon: Smartphone,
      templates: [
        { name: "Business Card Templates", description: "Professional designs for electrical contractors", price: "Free" },
        { name: "Flyer Templates", description: "Marketing flyers for local advertising", price: "Free" },
        { name: "Website Template", description: "Basic website template for electricians", price: "Free" },
        { name: "Social Media Kit", description: "Graphics and content for social media", price: "Free" }
      ]
    }
  ];

  const digitalTools = [
    {
      name: "QuickBooks",
      category: "Accounting",
      description: "Complete accounting solution for small businesses",
      price: "£15-30/month",
      features: ["Invoicing", "Expense tracking", "Tax preparation", "Payroll"]
    },
    {
      name: "Tradify",
      category: "Job Management",
      description: "All-in-one job management for trades",
      price: "£29-79/month",
      features: ["Job scheduling", "Quoting", "Invoicing", "Customer management"]
    },
    {
      name: "MyBuilder Pro",
      category: "Lead Generation",
      description: "Professional profile and lead generation",
      price: "£39/month",
      features: ["Lead generation", "Professional profile", "Customer reviews", "Marketing tools"]
    },
    {
      name: "Canva Pro",
      category: "Design",
      description: "Professional design tool for marketing materials",
      price: "£10/month",
      features: ["Logo design", "Marketing materials", "Social media graphics", "Brand kit"]
    }
  ];

  const physicalTools = [
    {
      category: "Basic Hand Tools",
      essential: true,
      tools: [
        "Wire strippers and crimpers",
        "Screwdriver set (flathead and Phillips)",
        "Pliers set (long nose, side cutters)",
        "Electrical tape and cable ties",
        "Torch and headlamp"
      ]
    },
    {
      category: "Testing Equipment",
      essential: true,
      tools: [
        "Multifunction tester (MFT)",
        "Voltage indicator",
        "Socket tester",
        "Insulation resistance tester",
        "Earth fault loop impedance tester"
      ]
    },
    {
      category: "Power Tools",
      essential: false,
      tools: [
        "Cordless drill/driver",
        "SDS drill for masonry",
        "Angle grinder",
        "Reciprocating saw",
        "Cable pulling system"
      ]
    }
  ];

  const checklists = [
    {
      title: "Pre-Launch Checklist",
      items: [
        "Business registration completed",
        "Insurance policies in place",
        "Bank account opened",
        "Marketing materials prepared",
        "First customers identified"
      ]
    },
    {
      title: "Daily Operations Checklist",
      items: [
        "Safety equipment checked",
        "Vehicle inspection completed",
        "Tools and materials loaded",
        "Customer contact confirmed",
        "Site risk assessment prepared"
      ]
    },
    {
      title: "Monthly Review Checklist",
      items: [
        "Financial records updated",
        "Tax obligations reviewed",
        "Insurance policies checked",
        "Marketing performance analysed",
        "Customer feedback collected"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {documentTemplates.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <category.icon className="h-4 w-4 text-elec-yellow" />
                  {category.category}
                </h4>
                <div className="grid gap-3">
                  {category.templates.map((template, templateIndex) => (
                    <div key={templateIndex} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                      <div>
                        <h5 className="font-medium text-white">{template.name}</h5>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-400 border-green-400/30">
                          {template.price}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            Recommended Digital Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {digitalTools.map((tool, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-white">{tool.name}</h4>
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30 mt-1">
                      {tool.category}
                    </Badge>
                  </div>
                  <div className="text-blue-300 font-medium">{tool.price}</div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                <div className="flex flex-wrap gap-1">
                  {tool.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Essential Tools & Equipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {physicalTools.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white">{category.category}</h4>
                  {category.essential && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      Essential
                    </Badge>
                  )}
                </div>
                <ul className="space-y-1 ml-4">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Business Checklists
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {checklists.map((checklist, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-white">{checklist.title}</h4>
                <ul className="space-y-2">
                  {checklist.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-purple-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsTemplatesTab;
