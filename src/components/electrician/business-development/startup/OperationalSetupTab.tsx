
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Clock, FileText, Truck, Wrench, Phone } from "lucide-react";

const OperationalSetupTab = () => {
  const operationalSystems = [
    {
      category: "Job Management",
      priority: "Essential",
      timeToSetup: "1-2 days",
      cost: "Free-£50/month",
      tools: [
        { name: "Booking System", description: "Online diary and appointment scheduling", cost: "Free-£20/month" },
        { name: "Customer Database", description: "Contact details and job history", cost: "Free-£15/month" },
        { name: "Job Sheets", description: "Standardised paperwork for all jobs", cost: "Free" },
        { name: "Invoicing Software", description: "Professional invoices and payment tracking", cost: "£10-30/month" }
      ]
    },
    {
      category: "Quality & Safety",
      priority: "Essential",
      timeToSetup: "2-3 days",
      cost: "£200-500",
      tools: [
        { name: "Testing Equipment", description: "MFT, socket testers, voltage indicators", cost: "£300-800" },
        { name: "Safety Procedures", description: "Risk assessments and method statements", cost: "Free" },
        { name: "Certification Process", description: "Test certificates and compliance docs", cost: "£50-100/month" },
        { name: "Tool Inventory", description: "Equipment tracking and maintenance", cost: "Free" }
      ]
    },
    {
      category: "Customer Service",
      priority: "Important",
      timeToSetup: "1 day",
      cost: "£50-150/month",
      tools: [
        { name: "Business Phone", description: "Dedicated number with voicemail", cost: "£20-40/month" },
        { name: "Email System", description: "Professional email address", cost: "£5-15/month" },
        { name: "Quote Templates", description: "Standardised pricing and proposals", cost: "Free" },
        { name: "Follow-up System", description: "Customer satisfaction and future work", cost: "Free-£30/month" }
      ]
    }
  ];

  const dailyOperations = [
    {
      time: "7:00 AM",
      task: "Check schedule and route planning",
      duration: "15 mins",
      importance: "High"
    },
    {
      time: "7:30 AM",
      task: "Load van and check equipment",
      duration: "30 mins",
      importance: "High"
    },
    {
      time: "8:00 AM",
      task: "First job - arrive on time",
      duration: "Variable",
      importance: "High"
    },
    {
      time: "End of job",
      task: "Complete paperwork and get payment",
      duration: "15 mins",
      importance: "High"
    },
    {
      time: "6:00 PM",
      task: "Update records and plan tomorrow",
      duration: "30 mins",
      importance: "Medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'essential': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'important': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'optional': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-green-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Operational Setup & Daily Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">1 Week</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">£500</div>
              <div className="text-sm text-muted-foreground">Monthly Running</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">15</div>
              <div className="text-sm text-muted-foreground">Systems Needed</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">80%</div>
              <div className="text-sm text-muted-foreground">Efficiency Gain</div>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Establish robust systems from day one to ensure professional service delivery, accurate record keeping, 
            and efficient operations that scale with your business growth.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Essential Systems</h3>
          {operationalSystems.map((system, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{system.category}</CardTitle>
                  <Badge className={getPriorityColor(system.priority)}>
                    {system.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-400 font-medium">Setup Time:</span>
                    <p className="text-white">{system.timeToSetup}</p>
                  </div>
                  <div>
                    <span className="text-green-400 font-medium">Cost:</span>
                    <p className="text-white">{system.cost}</p>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Tools:</span>
                    <p className="text-white">{system.tools.length} items</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {system.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="border border-elec-yellow/10 rounded p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="text-sm font-medium text-elec-yellow">{tool.name}</h5>
                        <span className="text-xs text-green-400">{tool.cost}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Daily Operations Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyOperations.map((operation, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-blue-400 font-bold text-sm">{operation.time}</span>
                    <Badge className={`text-xs ${getImportanceColor(operation.importance)}`}>
                      {operation.importance}
                    </Badge>
                  </div>
                  <p className="text-blue-200 text-sm mb-1">{operation.task}</p>
                  <p className="text-blue-300 text-xs">{operation.duration}</p>
                </div>
              ))}
              
              <Button className="w-full bg-blue-500 text-blue-900 hover:bg-blue-400">
                <FileText className="h-4 w-4 mr-2" />
                Download Schedule Template
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Van Setup Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-green-400 rounded"></div>
                  <span className="text-green-200 text-sm">Storage system installed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-green-400 rounded"></div>
                  <span className="text-green-200 text-sm">Tool inventory system</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-green-400 rounded"></div>
                  <span className="text-green-200 text-sm">Vehicle signage applied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-green-400 rounded"></div>
                  <span className="text-green-200 text-sm">Emergency contacts list</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-green-400 rounded"></div>
                  <span className="text-green-200 text-sm">Insurance documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-green-400 rounded"></div>
                  <span className="text-green-200 text-sm">First aid kit installed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/10">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Customer Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-amber-300 font-medium">Call Handling:</span>
                  <p className="text-amber-100 text-xs">Professional greeting, clear pricing, confirm appointments</p>
                </div>
                
                <div>
                  <span className="text-amber-300 font-medium">Arrival Etiquette:</span>
                  <p className="text-amber-100 text-xs">Text 15 mins before, wear uniform, carry ID</p>
                </div>
                
                <div>
                  <span className="text-amber-300 font-medium">Job Completion:</span>
                  <p className="text-amber-100 text-xs">Explain work done, leave area clean, get payment</p>
                </div>
                
                <div>
                  <span className="text-amber-300 font-medium">Follow-up:</span>
                  <p className="text-amber-100 text-xs">Text next day, ask for reviews, offer maintenance</p>
                </div>
              </div>
              
              <Button className="w-full bg-amber-500 text-amber-900 hover:bg-amber-400">
                <Wrench className="h-4 w-4 mr-2" />
                Communication Scripts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OperationalSetupTab;
