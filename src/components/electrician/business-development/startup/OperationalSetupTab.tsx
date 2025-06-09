
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Truck, Smartphone, Calculator, FileText, Clock, Shield, ExternalLink } from "lucide-react";

const OperationalSetupTab = () => {
  const operationalAreas = [
    {
      title: "Tools & Equipment",
      priority: "Essential",
      cost: "£2,000-5,000",
      timeframe: "Week 1-2",
      items: [
        "Basic hand tools set",
        "Multimeter & testing equipment",
        "Power tools (drill, grinder)",
        "Safety equipment & PPE",
        "Tool storage solution"
      ]
    },
    {
      title: "Vehicle & Transport",
      priority: "Essential",
      cost: "£8,000-25,000",
      timeframe: "Week 2-3",
      items: [
        "Van purchase/lease",
        "Van insurance",
        "Vehicle signwriting",
        "Roof rack & storage",
        "Fuel cards setup"
      ]
    },
    {
      title: "Business Systems",
      priority: "High",
      cost: "£200-1,000",
      timeframe: "Week 3-4",
      items: [
        "Accounting software",
        "Customer management system",
        "Invoice & quote software",
        "Job scheduling app",
        "Document storage"
      ]
    },
    {
      title: "Office Setup",
      priority: "Medium",
      cost: "£500-2,000",
      timeframe: "Week 4-6",
      items: [
        "Home office space",
        "Computer & printer",
        "Business phone line",
        "Stationery & forms",
        "Filing system"
      ]
    }
  ];

  const softwareTools = [
    {
      category: "Accounting",
      tools: [
        { name: "Xero", cost: "£24/month", features: ["Cloud-based", "VAT returns", "Bank feeds", "Mobile app"] },
        { name: "QuickBooks", cost: "£20/month", features: ["Invoicing", "Expenses", "Reports", "Integration"] },
        { name: "FreeAgent", cost: "£19/month", features: ["Time tracking", "Projects", "Estimates", "Support"] }
      ]
    },
    {
      category: "Customer Management",
      tools: [
        { name: "HubSpot", cost: "Free-£40/month", features: ["CRM", "Email marketing", "Live chat", "Analytics"] },
        { name: "Pipedrive", cost: "£12/month", features: ["Pipeline management", "Mobile", "Automation", "Reports"] },
        { name: "Zoho", cost: "£10/month", features: ["All-in-one", "Customisable", "Integration", "Support"] }
      ]
    },
    {
      category: "Job Management",
      tools: [
        { name: "ServiceM8", cost: "£29/month", features: ["Job scheduling", "GPS tracking", "Invoicing", "Photos"] },
        { name: "Tradify", cost: "£39/month", features: ["Quotes", "Jobs", "Invoices", "Stock management"] },
        { name: "Fergus", cost: "£45/month", features: ["Complete workflow", "Client portal", "Reports", "Mobile"] }
      ]
    }
  ];

  const dailyOperations = [
    {
      time: "6:00 AM",
      task: "Vehicle checks & loading",
      duration: "30 mins",
      description: "Safety checks, load tools and materials for the day"
    },
    {
      time: "7:00 AM",
      task: "First job travel",
      duration: "30-60 mins",
      description: "Navigate to first customer, review job details"
    },
    {
      time: "8:00 AM",
      task: "Customer consultation",
      duration: "15-30 mins",
      description: "Discuss work, explain process, confirm requirements"
    },
    {
      time: "8:30 AM",
      task: "Work execution",
      duration: "2-6 hours",
      description: "Complete electrical work safely and efficiently"
    },
    {
      time: "3:00 PM",
      task: "Testing & certification",
      duration: "30-60 mins",
      description: "Test work, complete certificates, customer handover"
    },
    {
      time: "4:00 PM",
      task: "Paperwork & invoicing",
      duration: "30 mins",
      description: "Complete job sheets, photos, create invoice"
    },
    {
      time: "5:00 PM",
      task: "Next day preparation",
      duration: "30 mins",
      description: "Review tomorrow's jobs, order materials if needed"
    }
  ];

  const qualityStandards = [
    {
      area: "Work Quality",
      standards: [
        "All work to BS 7671:2018 standards",
        "Proper testing and certification",
        "Clean and tidy work practices",
        "Use of quality materials only"
      ]
    },
    {
      area: "Customer Service",
      standards: [
        "Professional appearance and manner",
        "Clear communication throughout",
        "Respect for customer property",
        "Follow-up after completion"
      ]
    },
    {
      area: "Safety",
      standards: [
        "Risk assessments for all jobs",
        "Proper use of PPE",
        "Safe isolation procedures",
        "Incident reporting system"
      ]
    },
    {
      area: "Business Practice",
      standards: [
        "Transparent pricing structure",
        "Written quotes for all work",
        "Proper insurance coverage",
        "Accurate record keeping"
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Essential': return 'bg-red-500/20 text-red-400';
      case 'High': return 'bg-amber-500/20 text-amber-400';
      case 'Medium': return 'bg-blue-500/20 text-blue-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Operational Setup & Daily Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <Calculator className="h-5 w-5 text-green-400 mb-2" />
              <div className="text-sm text-muted-foreground">Setup Investment</div>
              <div className="text-xl font-bold text-green-400">£10K-35K</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <Clock className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-muted-foreground">Time to Operational</div>
              <div className="text-xl font-bold text-blue-400">4-8 weeks</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <Shield className="h-5 w-5 text-purple-400 mb-2" />
              <div className="text-sm text-muted-foreground">Daily Earning Target</div>
              <div className="text-xl font-bold text-purple-400">£250-500</div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Setup Phase Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-white mb-2">Week 1-2</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Purchase essential tools</li>
                  <li>• Set up insurance</li>
                  <li>• Open business bank account</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Week 3-4</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Vehicle acquisition</li>
                  <li>• Software setup</li>
                  <li>• Supplier accounts</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Week 5-6</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Office organisation</li>
                  <li>• Process documentation</li>
                  <li>• Marketing materials</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Week 7-8</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Final testing</li>
                  <li>• First customer jobs</li>
                  <li>• System refinement</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Essential Setup Areas</h3>
        {operationalAreas.map((area, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{area.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{area.timeframe}</p>
                </div>
                <Badge className={getPriorityColor(area.priority)}>
                  {area.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark/50 p-3 rounded">
                  <div className="text-sm text-muted-foreground">Estimated Investment</div>
                  <div className="text-xl font-bold text-elec-yellow">{area.cost}</div>
                </div>

                <div>
                  <h5 className="font-medium text-white mb-2">Key Items Required:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {area.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Business Software Solutions</h3>
        {softwareTools.map((category, index) => (
          <Card key={index} className="border-blue-500/20 bg-blue-500/10">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {category.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="border border-blue-500/20 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{tool.name}</h4>
                      <span className="text-sm text-blue-400">{tool.cost}</span>
                    </div>
                    <div className="space-y-1">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 bg-blue-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Typical Daily Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyOperations.map((operation, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-white">{operation.task}</h4>
                    <div className="text-right">
                      <div className="text-sm text-green-400">{operation.time}</div>
                      <div className="text-xs text-muted-foreground">{operation.duration}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{operation.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Quality Standards Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="border border-amber-500/20 rounded-lg p-3">
                  <h4 className="font-semibold text-white mb-2">{standard.area}</h4>
                  <div className="space-y-1">
                    {standard.standards.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-500/30 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Operations Resources & Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-purple-500/30">
              <FileText className="h-5 w-5 text-purple-400" />
              <span className="font-medium">Job Sheet Templates</span>
              <span className="text-xs text-muted-foreground">Customisable forms</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-blue-500/30">
              <Truck className="h-5 w-5 text-blue-400" />
              <span className="font-medium">Van Setup Guide</span>
              <span className="text-xs text-muted-foreground">Organisation tips</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-green-500/30">
              <Calculator className="h-5 w-5 text-green-400" />
              <span className="font-medium">Pricing Calculator</span>
              <span className="text-xs text-muted-foreground">Fair pricing tool</span>
            </Button>
          </div>

          <div className="pt-4 border-t border-purple-500/20">
            <h4 className="font-semibold text-purple-300 mb-3">Operational Excellence Checklist</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-white mb-2">Systems Setup</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>□ Accounting software configured</li>
                  <li>□ Customer database created</li>
                  <li>□ Invoice templates designed</li>
                  <li>□ Document storage organised</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Process Documentation</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>□ Standard operating procedures</li>
                  <li>□ Safety protocols documented</li>
                  <li>□ Customer communication scripts</li>
                  <li>□ Quality control checklists</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationalSetupTab;
