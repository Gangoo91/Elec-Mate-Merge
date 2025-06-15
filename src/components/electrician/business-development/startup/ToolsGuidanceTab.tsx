
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Settings, Calculator, Users, CheckCircle } from "lucide-react";

const ToolsGuidanceTab = () => {
  const businessTemplates = [
    {
      name: "Comprehensive Business Plan Template",
      description: "Complete 25-page business plan template for electrical contractors",
      type: "Document",
      features: ["Financial projections", "Market analysis", "SWOT analysis", "Growth strategies"]
    },
    {
      name: "Quote & Invoice Templates",
      description: "Professional quote and invoice formats with automated calculations",
      type: "Spreadsheet",
      features: ["VAT calculations", "Payment terms", "Terms & conditions", "Branding options"]
    },
    {
      name: "Risk Assessment Forms Pack",
      description: "Complete health & safety documentation for electrical work",
      type: "Document Pack",
      features: ["Method statements", "COSHH assessments", "Site risk forms", "Incident reports"]
    },
    {
      name: "Customer Contract Templates",
      description: "Legally compliant service agreements and terms",
      type: "Document",
      features: ["Payment terms", "Warranty clauses", "Liability limitations", "Dispute resolution"]
    },
    {
      name: "Marketing Materials Pack",
      description: "Business cards, flyers, and social media templates",
      type: "Design Pack",
      features: ["Logo templates", "Vehicle signage", "Social media posts", "Website content"]
    },
    {
      name: "Financial Tracking Spreadsheets",
      description: "Cash flow, profit/loss, and tax tracking templates",
      type: "Spreadsheet",
      features: ["Monthly tracking", "Expense categories", "VAT calculations", "Profit analysis"]
    }
  ];

  const operationalSteps = [
    {
      title: "Digital Workspace Setup",
      timeline: "Week 1-2",
      points: [
        "Set up cloud storage system (Google Drive, Dropbox)",
        "Install accounting software (Xero, QuickBooks, Sage)",
        "Create customer database and CRM system",
        "Set up digital filing system for documents and certificates",
        "Install project management tools",
        "Configure backup systems for data protection"
      ]
    },
    {
      title: "Marketing & Online Presence",
      timeline: "Week 2-4",
      points: [
        "Create professional website with booking system",
        "Set up Google My Business profile",
        "Design business cards and vehicle signage",
        "Build social media presence (Facebook, Instagram)",
        "Join local business directories and trade websites",
        "Develop customer referral program"
      ]
    },
    {
      title: "Operational Procedures",
      timeline: "Week 3-4",
      points: [
        "Develop standard quoting and pricing procedures",
        "Create job scheduling and route planning system",
        "Establish safety protocols and equipment checks",
        "Set up supplier accounts and trade credit",
        "Implement quality control and follow-up procedures",
        "Create customer service standards and communication templates"
      ]
    },
    {
      title: "Financial Management",
      timeline: "Ongoing",
      points: [
        "Set up expense tracking and receipt management",
        "Create invoice and payment processing system",
        "Establish cash flow monitoring procedures",
        "Plan tax obligations and quarterly reviews",
        "Monitor key performance indicators (KPIs)",
        "Regular financial health assessments"
      ]
    }
  ];

  const digitalTools = [
    {
      name: "Advanced Job Costing Calculator",
      description: "Calculate accurate job costs including materials, labour, and profit margins",
      type: "Interactive Tool",
      features: ["Material cost database", "Labour rate calculator", "Overhead allocation", "Profit margin optimisation"]
    },
    {
      name: "Business Cash Flow Planner",
      description: "12-month cash flow planning and scenario modelling",
      type: "Planning Tool",
      features: ["Monthly projections", "Seasonal adjustments", "What-if scenarios", "Break-even analysis"]
    },
    {
      name: "Customer Relationship Manager",
      description: "Track customer information, job history, and follow-ups",
      type: "Management Tool",
      features: ["Contact management", "Job history", "Quote tracking", "Review requests"]
    },
    {
      name: "Marketing ROI Calculator",
      description: "Track marketing spend and return on investment",
      type: "Analytics Tool",
      features: ["Campaign tracking", "Lead source analysis", "Conversion rates", "Cost per acquisition"]
    },
    {
      name: "Equipment Maintenance Tracker",
      description: "Schedule and track equipment servicing and calibration",
      type: "Maintenance Tool",
      features: ["Service schedules", "Cost tracking", "Warranty management", "Replacement planning"]
    },
    {
      name: "Compliance Checklist Manager",
      description: "Ensure ongoing compliance with regulations and certifications",
      type: "Compliance Tool",
      features: ["Renewal reminders", "Document storage", "Audit trails", "Training records"]
    }
  ];

  const softwareRecommendations = [
    {
      category: "Accounting & Finance",
      tools: [
        { name: "Xero", price: "£12-30/month", features: ["Bank reconciliation", "Invoicing", "Expense tracking", "VAT returns"] },
        { name: "QuickBooks", price: "£10-20/month", features: ["Job costing", "Project tracking", "Payment processing", "Reports"] },
        { name: "Sage 50", price: "£25-45/month", features: ["Advanced accounting", "Stock management", "Payroll", "Multi-user"] }
      ]
    },
    {
      category: "Project Management",
      tools: [
        { name: "Tradify", price: "£25-45/month", features: ["Job scheduling", "Quote management", "Team tracking", "Customer portal"] },
        { name: "ServiceM8", price: "£20-35/month", features: ["Field service", "GPS tracking", "Automated workflows", "Photo documentation"] },
        { name: "Jobber", price: "£15-30/month", features: ["Scheduling", "Invoicing", "Customer management", "Route optimisation"] }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Download className="h-5 w-5" />
            Professional Business Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {businessTemplates.map((template, index) => (
            <div key={index} className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                  <Badge variant="outline" className="text-xs mb-2">{template.type}</Badge>
                </div>
                <Button size="sm" className="ml-4">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {template.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-elec-yellow" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Business Setup Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {operationalSteps.map((step, index) => (
            <div key={index} className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{step.title}</h4>
                <Badge className="bg-blue-500/20 text-blue-300">{step.timeline}</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {step.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-start gap-2 text-sm text-blue-200">
                    <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
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
            Interactive Business Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {digitalTools.map((tool, index) => (
            <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                  <Badge className="bg-green-500/20 text-green-300 mb-2">{tool.type}</Badge>
                </div>
                <Button size="sm" className="ml-4">Launch Tool</Button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {tool.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-xs text-green-200">
                    <CheckCircle className="h-3 w-3" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            Software Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {softwareRecommendations.map((category, index) => (
              <div key={index}>
                <h4 className="font-semibold text-purple-200 mb-3">{category.category}</h4>
                <div className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-white">{tool.name}</h5>
                          <Badge variant="outline" className="text-purple-300 border-purple-400/30">
                            {tool.price}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Try Free
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {tool.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-xs text-purple-200">
                            <CheckCircle className="h-3 w-3" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsGuidanceTab;
