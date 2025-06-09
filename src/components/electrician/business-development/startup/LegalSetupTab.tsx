
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Users, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const LegalSetupTab = () => {
  const legalSteps = [
    {
      id: 1,
      title: "Choose Business Structure",
      status: "required",
      description: "Decide between sole trader, limited company, or partnership",
      timeframe: "1-2 weeks",
      cost: "£12-£50"
    },
    {
      id: 2,
      title: "Register with Companies House",
      status: "required",
      description: "Register your limited company (if applicable)",
      timeframe: "1-3 days",
      cost: "£12"
    },
    {
      id: 3,
      title: "Get Public Liability Insurance",
      status: "essential",
      description: "Minimum £2 million cover required for electrical work",
      timeframe: "1-2 days",
      cost: "£200-£500/year"
    },
    {
      id: 4,
      title: "Professional Indemnity Insurance",
      status: "recommended",
      description: "Protection against professional negligence claims",
      timeframe: "1-2 days",
      cost: "£300-£800/year"
    }
  ];

  const complianceItems = [
    {
      title: "NICEIC/NAPIT Registration",
      description: "Essential for Part P compliance and customer confidence",
      priority: "high",
      annualCost: "£500-£800"
    },
    {
      title: "JIB Membership",
      description: "Industry recognition and grading scheme",
      priority: "medium",
      annualCost: "£150-£300"
    },
    {
      title: "ECA Membership",
      description: "Electrical Contractors' Association benefits",
      priority: "medium",
      annualCost: "£200-£400"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'essential': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'recommended': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-amber-500/20 text-amber-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Legal Foundation Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">4-6</div>
              <div className="text-sm text-muted-foreground">Weeks Setup Time</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">£1K-3K</div>
              <div className="text-sm text-muted-foreground">Initial Costs</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">7</div>
              <div className="text-sm text-muted-foreground">Key Requirements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              Essential Legal Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {legalSteps.map((step) => (
              <div key={step.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{step.title}</h4>
                  <Badge className={getStatusColor(step.status)}>
                    {step.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-400">⏱️ {step.timeframe}</span>
                  <span className="text-green-400">💰 {step.cost}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              Industry Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceItems.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <div className="text-xs text-green-400">{item.annualCost}/year</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Legal Pitfalls to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Documentation Errors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Inadequate contracts and terms of service</li>
                <li>• Missing health and safety documentation</li>
                <li>• Incomplete insurance coverage</li>
                <li>• Poor record keeping systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Regulatory Oversights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Working without proper scheme membership</li>
                <li>• Incorrect Part P notification procedures</li>
                <li>• Missing professional qualifications</li>
                <li>• Inadequate public liability limits</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-amber-500/20">
            <Button className="bg-amber-500 text-amber-900 hover:bg-amber-400">
              <ExternalLink className="h-4 w-4 mr-2" />
              Download Legal Checklist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalSetupTab;
