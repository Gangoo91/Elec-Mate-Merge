
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Settings, Truck, Phone, Calendar, MapPin, Clock, Users, CheckCircle, Download, Star } from "lucide-react";

const OperationsTab = () => {
  const operationalAreas = [
    {
      title: "Service Area & Territory",
      priority: "High",
      items: [
        "Define your service radius (typically 10-25 miles)",
        "Research local competition and pricing",
        "Identify high-demand postcodes",
        "Plan travel time and fuel costs"
      ]
    },
    {
      title: "Scheduling & Time Management",
      priority: "High",
      items: [
        "Implement booking system (online/phone)",
        "Allow buffer time between jobs",
        "Plan for emergency call-outs",
        "Set realistic appointment windows"
      ]
    },
    {
      title: "Quality Control",
      priority: "Medium",
      items: [
        "Develop installation checklists",
        "Create testing procedures",
        "Document completion processes",
        "Follow-up customer satisfaction"
      ]
    }
  ];

  const businessSystems = [
    {
      category: "Customer Management",
      tools: [
        { name: "ServiceM8", cost: "£25/month", features: ["Job management", "Invoicing", "GPS tracking"] },
        { name: "Powered Now", cost: "£35/month", features: ["CRM", "Scheduling", "Quotes"] },
        { name: "FieldPulse", cost: "£29/month", features: ["Dispatch", "Payments", "Reports"] }
      ]
    },
    {
      category: "Communication",
      tools: [
        { name: "Professional Mobile", cost: "£30-60/month", features: ["24/7 availability", "Voicemail", "SMS"] },
        { name: "Google Workspace", cost: "£5/month", features: ["Email", "Calendar", "Storage"] },
        { name: "WhatsApp Business", cost: "Free", features: ["Customer chat", "Catalogue", "Labels"] }
      ]
    }
  ];

  const qualityStandards = [
    {
      stage: "Pre-Job",
      checklist: [
        "Site survey completed",
        "Risk assessment documented",
        "Materials list confirmed",
        "Customer briefed on process"
      ]
    },
    {
      stage: "Installation",
      checklist: [
        "Safe isolation procedures followed",
        "Installation to BS 7671 standards",
        "Regular progress updates",
        "Work area kept clean and tidy"
      ]
    },
    {
      stage: "Completion",
      checklist: [
        "All testing completed and documented",
        "Certificates issued",
        "Customer walkthrough",
        "Follow-up scheduled"
      ]
    }
  ];

  const customerService = [
    {
      area: "Communication",
      best_practices: [
        "Answer calls within 3 rings",
        "Return messages within 2 hours",
        "Send confirmation texts before arrival",
        "Provide realistic time estimates"
      ]
    },
    {
      area: "Professionalism",
      best_practices: [
        "Arrive on time or call ahead",
        "Wear clean, branded workwear",
        "Use protective shoe covers",
        "Explain work clearly to customers"
      ]
    },
    {
      area: "Problem Resolution",
      best_practices: [
        "Listen to customer concerns",
        "Offer multiple solutions when possible",
        "Be transparent about costs",
        "Follow up to ensure satisfaction"
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-amber-500/20 text-amber-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Operational Excellence Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">98%</div>
              <div className="text-sm text-muted-foreground">Target Reliability</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">2-4</div>
              <div className="text-sm text-muted-foreground">Jobs Per Day</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">15min</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">4.8★</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-elec-yellow" />
              Operational Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {operationalAreas.map((area, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{area.title}</h4>
                  <Badge className={getPriorityColor(area.priority)}>
                    {area.priority}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {area.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Phone className="h-5 w-5 text-elec-yellow" />
              Business Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {businessSystems.map((system, index) => (
              <div key={index}>
                <h4 className="font-semibold text-elec-yellow mb-3">{system.category}</h4>
                <div className="space-y-3">
                  {system.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="border border-elec-yellow/10 rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-white">{tool.name}</span>
                        <span className="text-green-400 text-sm">{tool.cost}</span>
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
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Quality Control Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualityStandards.map((standard, index) => (
              <div key={index} className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/10">
                <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {standard.stage}
                </h4>
                <ul className="space-y-2">
                  {standard.checklist.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Customer Service Excellence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerService.map((service, index) => (
              <div key={index} className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/10">
                <h4 className="font-semibold text-elec-yellow mb-3">{service.area}</h4>
                <ul className="space-y-2">
                  {service.best_practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="flex items-start gap-2 text-sm">
                      <Star className="h-3 w-3 text-amber-400 mt-1 flex-shrink-0" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Operational Efficiency Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Time Management</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Plan routes to minimise travel time
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Batch similar jobs in same area
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Pre-load van with common materials
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Use scheduling software for efficiency
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Cost Control</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Track fuel costs and mileage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Negotiate wholesale material prices
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Monitor hourly productivity rates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Regular equipment maintenance
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-green-500/20">
            <Button className="bg-green-500 text-green-900 hover:bg-green-400">
              <Download className="h-4 w-4 mr-2" />
              Download Operations Manual Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsTab;
