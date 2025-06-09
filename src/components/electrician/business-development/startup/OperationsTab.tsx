
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Calendar, Smartphone, Truck, Clock, Target, ExternalLink } from "lucide-react";

const OperationsTab = () => {
  const systemsNeeded = [
    {
      system: "Job Management",
      tools: ["Simpro", "ServiceMax", "Custom CRM"],
      cost: "£30-£150/month",
      priority: "high",
      description: "Track jobs, schedules, and customer communications"
    },
    {
      system: "Invoicing & Accounts",
      tools: ["Xero", "QuickBooks", "FreshBooks"],
      cost: "£20-£50/month",
      priority: "high",
      description: "Handle billing, expenses, and tax preparation"
    },
    {
      system: "Estimating & Quoting",
      tools: ["EstimatorXpress", "Custom spreadsheets"],
      cost: "£40-£100/month",
      priority: "medium",
      description: "Create professional quotes quickly and accurately"
    },
    {
      system: "Digital Certificates",
      tools: ["CertPad", "ElectricalOM", "PDF forms"],
      cost: "£15-£40/month",
      priority: "medium",
      description: "Generate EICR, EIC, and Minor Works certificates"
    }
  ];

  const dailyWorkflow = [
    {
      time: "7:00 AM",
      task: "Check schedule and route planning",
      duration: "15 mins",
      tools: "Phone app, Google Maps"
    },
    {
      time: "8:00 AM",
      task: "First job arrival and assessment",
      duration: "30 mins",
      tools: "MFT, camera, job sheet"
    },
    {
      time: "12:00 PM",
      task: "Update job progress and lunch",
      duration: "60 mins",
      tools: "Mobile app, invoicing system"
    },
    {
      time: "5:00 PM",
      task: "Complete certificates and invoicing",
      duration: "30 mins",
      tools: "CertPad, accounting software"
    },
    {
      time: "6:00 PM",
      task: "Plan next day and admin tasks",
      duration: "30 mins",
      tools: "Calendar, email, quotes"
    }
  ];

  const qualityStandards = [
    {
      area: "Workmanship",
      standards: [
        "All work to BS 7671 standards",
        "Clean, professional installation",
        "Proper cable management",
        "Clear labelling and documentation"
      ]
    },
    {
      area: "Customer Service",
      standards: [
        "Punctual arrival within 15-minute window",
        "Clean van and professional appearance",
        "Clear explanation of work and costs",
        "Tidy workplace and proper cleanup"
      ]
    },
    {
      area: "Documentation",
      standards: [
        "Detailed job sheets and photos",
        "Completed certificates within 24 hours",
        "Clear invoices with breakdown",
        "Follow-up warranty information"
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Operations Framework Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">4</div>
              <div className="text-sm text-muted-foreground">Core Systems</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">2.5hrs</div>
              <div className="text-sm text-muted-foreground">Daily Admin</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">£105-340</div>
              <div className="text-sm text-muted-foreground">Monthly Software</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">95%+</div>
              <div className="text-sm text-muted-foreground">Target Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-elec-yellow" />
            Essential Business Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {systemsNeeded.map((system, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{system.system}</h4>
                  <Badge className={getPriorityColor(system.priority)}>
                    {system.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{system.description}</p>
                <div className="space-y-2">
                  <div className="text-xs text-blue-400">
                    Tools: {system.tools.join(", ")}
                  </div>
                  <div className="text-xs text-green-400">
                    Cost: {system.cost}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              Daily Workflow Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyWorkflow.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-3 bg-elec-dark/50 rounded-lg">
                  <div className="text-elec-yellow font-mono text-sm min-w-[70px]">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{item.task}</div>
                    <div className="text-xs text-muted-foreground">{item.tools}</div>
                  </div>
                  <div className="text-xs text-amber-400 min-w-[60px] text-right">
                    {item.duration}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Quality Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <h5 className="font-semibold text-elec-yellow mb-3">{standard.area}</h5>
                  <ul className="space-y-1">
                    {standard.standards.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-cyan-500/30 bg-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Operational Efficiency Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-cyan-300">Time Management</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Plan routes efficiently to minimise travel time</li>
                <li>• Batch similar jobs together when possible</li>
                <li>• Always carry common materials and spares</li>
                <li>• Set realistic time estimates and add buffer</li>
                <li>• Use downtime for admin and planning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-cyan-300">Customer Relations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Send appointment confirmations 24 hours ahead</li>
                <li>• Provide accurate arrival windows</li>
                <li>• Take before/after photos for documentation</li>
                <li>• Follow up within 48 hours of completion</li>
                <li>• Request reviews and referrals professionally</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-cyan-500/20 flex gap-3">
            <Button className="bg-cyan-500 text-cyan-900 hover:bg-cyan-400">
              <Calendar className="h-4 w-4 mr-2" />
              Workflow Templates
            </Button>
            <Button variant="outline" className="border-cyan-500/30">
              <ExternalLink className="h-4 w-4 mr-2" />
              System Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsTab;
