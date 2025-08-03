import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Clock, FileText, Truck, Shield, Smartphone } from "lucide-react";

export const OperationsTab = () => {
  const operationalSystems = [
    {
      system: "Job Management",
      description: "Streamline job scheduling and tracking",
      icon: <Clock className="h-5 w-5" />,
      tools: ["Digital scheduling systems", "Customer management CRM", "Mobile job tracking", "Time and materials tracking"],
      benefits: ["Improved efficiency", "Better customer service", "Accurate job costing", "Professional appearance"]
    },
    {
      system: "Documentation & Compliance",
      description: "Maintain proper records and certifications",
      icon: <FileText className="h-5 w-5" />,
      tools: ["Digital certificates", "Test result software", "Compliance checklists", "Photo documentation"],
      benefits: ["Legal compliance", "Professional credibility", "Quality assurance", "Audit trail"]
    },
    {
      system: "Vehicle & Equipment Management",
      description: "Optimise mobile workshop efficiency",
      icon: <Truck className="h-5 w-5" />,
      tools: ["Van stock management", "Tool tracking systems", "Route optimisation", "Equipment maintenance logs"],
      benefits: ["Reduced travel time", "Better stock control", "Professional image", "Cost savings"]
    },
    {
      system: "Safety Management",
      description: "Ensure safety compliance and risk management",
      icon: <Shield className="h-5 w-5" />,
      tools: ["Risk assessment templates", "Safety method statements", "Incident reporting", "Training records"],
      benefits: ["Legal compliance", "Insurance benefits", "Worker safety", "Professional reputation"]
    }
  ];

  const digitalTools = [
    {
      category: "Job Management Software",
      examples: ["ServiceM8", "Housecall Pro", "FieldEdge", "BigChange"],
      cost: "£30-100/month",
      features: "Scheduling, invoicing, customer management, GPS tracking"
    },
    {
      category: "Electrical Testing Apps",
      examples: ["Megger Smart PAT", "Socket & See", "Kewtech EZ PAT", "Fluke Connect"],
      cost: "£20-50/month",
      features: "Digital test certificates, cloud storage, automatic calculations"
    },
    {
      category: "Accounting Software",
      examples: ["Xero", "QuickBooks", "FreeAgent", "Sage"],
      cost: "£15-40/month",
      features: "Invoicing, expense tracking, VAT returns, financial reporting"
    },
    {
      category: "Communication Tools",
      examples: ["WhatsApp Business", "Microsoft Teams", "Slack", "Google Workspace"],
      cost: "£0-15/month",
      features: "Customer communication, team coordination, file sharing"
    }
  ];

  const processImprovements = [
    {
      area: "Quote Process",
      current: "Handwritten estimates, manual calculations",
      improved: "Digital templates, automatic calculations, instant delivery",
      benefit: "Faster response, fewer errors, professional appearance"
    },
    {
      area: "Job Documentation",
      current: "Paper certificates, manual filing",
      improved: "Digital certificates, cloud storage, automatic backups",
      benefit: "Better organisation, quick retrieval, legal compliance"
    },
    {
      area: "Customer Communication",
      current: "Phone calls, text messages",
      improved: "Automated updates, photo sharing, digital reports",
      benefit: "Better service, reduced queries, professional image"
    },
    {
      area: "Stock Management",
      current: "Manual inventory, van searches",
      improved: "Digital tracking, reorder alerts, supplier integration",
      benefit: "Less waste, faster jobs, improved cash flow"
    }
  ];

  const scalingTips = [
    "Standardise processes before expanding",
    "Invest in training for all team members",
    "Use technology to reduce administrative burden",
    "Develop clear procedures for quality control",
    "Create systems that work without your direct involvement",
    "Plan for seasonal variations in workload"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Operational Systems for Growth
          </CardTitle>
          <CardDescription>
            Essential systems and processes to support business expansion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {operationalSystems.map((system, index) => (
              <Card key={index} className="bg-elec-gray/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {system.icon}
                    {system.system}
                  </CardTitle>
                  <CardDescription>{system.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="font-medium mb-2">Key Tools</h5>
                      <div className="space-y-2">
                        {system.tools.map((tool, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                            <span className="text-sm">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Benefits</h5>
                      <div className="space-y-2">
                        {system.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-elec-yellow" />
            Digital Tools & Software (2025)
          </CardTitle>
          <CardDescription>
            Technology solutions to streamline your electrical business operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {digitalTools.map((tool, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{tool.category}</CardTitle>
                    <Badge variant="outline">{tool.cost}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-sm font-medium text-elec-yellow">Popular Options</h6>
                      <p className="text-sm text-muted-foreground">{tool.examples}</p>
                    </div>
                    <div>
                      <h6 className="text-sm font-medium text-elec-yellow">Key Features</h6>
                      <p className="text-sm text-muted-foreground">{tool.features}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Process Improvement Opportunities
          </CardTitle>
          <CardDescription>
            Transform manual processes for better efficiency and growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processImprovements.map((process, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{process.area}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h6 className="text-sm font-medium text-red-400">Current State</h6>
                      <p className="text-sm text-muted-foreground">{process.current}</p>
                    </div>
                    <div>
                      <h6 className="text-sm font-medium text-green-400">Improved State</h6>
                      <p className="text-sm text-muted-foreground">{process.improved}</p>
                    </div>
                    <div>
                      <h6 className="text-sm font-medium text-elec-yellow">Business Benefit</h6>
                      <p className="text-sm text-muted-foreground">{process.benefit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">Scaling Your Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {scalingTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <Settings className="h-4 w-4 text-elec-yellow mt-0.5 shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};