
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Cloud, Calculator, FileText, Users, CreditCard, Shield } from "lucide-react";

const TechnologyToolsTab = () => {
  const softwareCategories = [
    {
      category: "Job Management Systems",
      icon: <FileText className="h-5 w-5" />,
      tools: [
        {
          name: "ServiceM8",
          price: "£25/month",
          features: ["Job scheduling", "Customer management", "Invoicing", "GPS tracking"],
          rating: 4.8,
          bestFor: "Small to medium electrical contractors"
        },
        {
          name: "Tradify",
          price: "£35/month",
          features: ["Project management", "Quote creation", "Time tracking", "Material ordering"],
          rating: 4.6,
          bestFor: "Growing businesses with multiple jobs"
        },
        {
          name: "simPRO",
          price: "£55/month",
          features: ["Enterprise features", "Inventory management", "Compliance tracking", "Reporting"],
          rating: 4.4,
          bestFor: "Larger electrical contractors"
        }
      ]
    },
    {
      category: "Accounting & Finance",
      icon: <Calculator className="h-5 w-5" />,
      tools: [
        {
          name: "Xero",
          price: "£12/month",
          features: ["Cloud accounting", "Bank reconciliation", "VAT returns", "Expense tracking"],
          rating: 4.7,
          bestFor: "Most small businesses"
        },
        {
          name: "QuickBooks",
          price: "£15/month",
          features: ["Invoicing", "Receipt capture", "Tax calculations", "Payroll integration"],
          rating: 4.5,
          bestFor: "Businesses needing payroll features"
        },
        {
          name: "FreeAgent",
          price: "£19/month",
          features: ["Time tracking", "Project profitability", "Tax estimates", "MTD ready"],
          rating: 4.3,
          bestFor: "Contractors and freelancers"
        }
      ]
    },
    {
      category: "Digital Payment Solutions",
      icon: <CreditCard className="h-5 w-5" />,
      tools: [
        {
          name: "Square Reader",
          price: "1.75% per transaction",
          features: ["Contactless payments", "Chip & PIN", "Mobile app", "Next-day funding"],
          rating: 4.6,
          bestFor: "On-site card payments"
        },
        {
          name: "iZettle",
          price: "1.75% per transaction",
          features: ["Card reader", "Invoicing", "Sales analytics", "Inventory tracking"],
          rating: 4.4,
          bestFor: "Integrated POS system"
        },
        {
          name: "SumUp",
          price: "1.69% per transaction",
          features: ["Mobile payments", "Online store", "QR code payments", "Receipt printing"],
          rating: 4.3,
          bestFor: "Low-cost card processing"
        }
      ]
    }
  ];

  const mobileTech = [
    {
      tool: "Electrical Calc Pro",
      type: "Mobile App",
      price: "£15 one-time",
      description: "Advanced electrical calculations for load, voltage drop, and wire sizing",
      platforms: ["iOS", "Android"]
    },
    {
      tool: "Fluke Connect",
      type: "Mobile App",
      price: "Free",
      description: "Connect and manage Fluke test equipment, store measurements",
      platforms: ["iOS", "Android"]
    },
    {
      tool: "Megger Link",
      type: "Mobile App",
      price: "Free",
      description: "Download test results from Megger instruments to smartphone",
      platforms: ["iOS", "Android"]
    },
    {
      tool: "NAPIT Spark",
      type: "Mobile App",
      price: "Free for members",
      description: "Access regulations, guidance, and technical support",
      platforms: ["iOS", "Android"]
    }
  ];

  const cloudSolutions = [
    {
      name: "Google Workspace",
      price: "£4.60/user/month",
      features: ["Email", "Cloud storage", "Document collaboration", "Video meetings"],
      storage: "30GB per user"
    },
    {
      name: "Microsoft 365",
      price: "£4.70/user/month",
      features: ["Office apps", "OneDrive", "Teams", "Exchange email"],
      storage: "1TB per user"
    },
    {
      name: "Dropbox Business",
      price: "£12.50/user/month",
      features: ["File sync", "Version history", "Team folders", "Advanced sharing"],
      storage: "5TB per user"
    }
  ];

  const cybersecurityTools = [
    {
      tool: "Bitdefender GravityZone",
      price: "£25/device/year",
      protection: "Advanced threat detection, web protection, firewall",
      businessFeatures: true
    },
    {
      tool: "Norton Small Business",
      price: "£80/year (5 devices)",
      protection: "Antivirus, backup, password manager",
      businessFeatures: false
    },
    {
      tool: "Kaspersky Small Office Security",
      price: "£120/year (10 devices)",
      protection: "Endpoint protection, email security, encryption",
      businessFeatures: true
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            Modern Technology for Electrical Contractors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">15+</div>
              <div className="text-sm text-muted-foreground">Essential Tools</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">50%</div>
              <div className="text-sm text-muted-foreground">Time Savings</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">£200</div>
              <div className="text-sm text-muted-foreground">Monthly Budget</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {softwareCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {category.icon}
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="border border-elec-yellow/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white">{tool.name}</h4>
                        <p className="text-sm text-muted-foreground">{tool.bestFor}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500/20 text-green-300">{tool.price}</Badge>
                        <div className="text-xs text-yellow-400 mt-1">★ {tool.rating}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
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
        <Card className="border-blue-500/50 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Mobile Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mobileTech.map((tech, index) => (
                <div key={index} className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-blue-200">{tech.tool}</h4>
                      <Badge variant="outline" className="text-xs mt-1">{tech.type}</Badge>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300">{tech.price}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{tech.description}</p>
                  <div className="flex gap-1">
                    {tech.platforms.map((platform, platformIndex) => (
                      <Badge key={platformIndex} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Cloud & Collaboration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cloudSolutions.map((solution, index) => (
                <div key={index} className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-purple-200">{solution.name}</h4>
                    <Badge className="bg-purple-500/20 text-purple-300">{solution.price}</Badge>
                  </div>
                  <div className="text-xs text-purple-300 mb-2">{solution.storage}</div>
                  <div className="flex flex-wrap gap-1">
                    {solution.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Cybersecurity for Small Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cybersecurityTools.map((security, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                <div className="flex-1">
                  <h4 className="font-medium text-red-200">{security.tool}</h4>
                  <p className="text-sm text-muted-foreground">{security.protection}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs mt-1 ${security.businessFeatures ? 'text-green-400' : 'text-yellow-400'}`}
                  >
                    {security.businessFeatures ? 'Business Features' : 'Basic Protection'}
                  </Badge>
                </div>
                <Badge className="bg-red-500/20 text-red-300">{security.price}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnologyToolsTab;
