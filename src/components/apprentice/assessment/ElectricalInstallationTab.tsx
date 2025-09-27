
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckSquare, AlertCircle, FileText, Shield, Eye } from "lucide-react";
import { useState } from "react";

const ElectricalInstallationTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [findings, setFindings] = useState("");

  const electricalChecklist = [
    {
      category: "Consumer Unit & Distribution",
      icon: Zap,
      items: [
        "Consumer unit condition and accessibility",
        "Adequate space for additional circuits if required",
        "Main switch operation and labelling",
        "RCD protection appropriate and functioning",
        "Circuit breaker ratings and condition",
        "Busbar connections tight and secure",
        "IP rating appropriate for location",
        "Isolation and switching arrangements adequate"
      ]
    },
    {
      category: "Existing Wiring",
      icon: CheckSquare,
      items: [
        "Cable types and conditions throughout installation",
        "Cable supports and fixing methods adequate",
        "No signs of overheating or damage",
        "Appropriate cable sizes for circuit loading",
        "Junction boxes and connections accessible",
        "Cable identification and labelling present",
        "Segregation of different voltage systems",
        "Cable entry methods and sealing adequate"
      ]
    },
    {
      category: "Earthing & Bonding",
      icon: Shield,
      items: [
        "Main earthing terminal condition and connection",
        "Earthing conductor size and condition",
        "Equipotential bonding to services complete",
        "Supplementary bonding where required",
        "Earth electrode system (if applicable)",
        "Continuity of protective conductors",
        "Bonding conductor sizes comply with BS 7671",
        "Earth fault loop impedance within limits"
      ]
    },
    {
      category: "Safety Systems",
      icon: Shield,
      items: [
        "RCD testing and operation within limits",
        "Emergency lighting systems functional",
        "Fire alarm systems unaffected by work",
        "Security systems consideration",
        "Smoke detection systems operational",
        "Emergency stop systems accessible",
        "Intruder alarm system compatibility",
        "Communication systems operational"
      ]
    },
    {
      category: "Testing & Documentation",
      icon: FileText,
      items: [
        "Previous test certificates available",
        "Installation complies with current edition of BS 7671",
        "Test results within acceptable limits",
        "Periodic inspection due dates noted",
        "Any departures from BS 7671 recorded",
        "Installation changes properly documented",
        "As-built drawings available and accurate",
        "Operation and maintenance manuals present"
      ]
    }
  ];

  const complianceRequirements = [
    {
      standard: "BS 7671:2018+A3:2024",
      description: "Requirements for Electrical Installations (IET Wiring Regulations)",
      keyPoints: ["Chapter 61: Initial verification", "Chapter 62: Periodic inspection", "Appendix 6: Model forms"]
    },
    {
      standard: "Part P Building Regulations",
      description: "Electrical safety in dwellings",
      keyPoints: ["Notification requirements", "Self-certification schemes", "Competent person schemes"]
    },
    {
      standard: "Electricity at Work Regulations 1989",
      description: "Legal requirements for electrical work",
      keyPoints: ["Regulation 4: Systems and equipment", "Regulation 13: Working dead", "Regulation 16: Persons"]
    }
  ];

  const testingPriorities = [
    { test: "Continuity", priority: "High", reason: "Ensures protective conductor integrity" },
    { test: "Insulation Resistance", priority: "High", reason: "Prevents dangerous leakage currents" },
    { test: "Polarity", priority: "Medium", reason: "Ensures correct connection of conductors" },
    { test: "Earth Fault Loop Impedance", priority: "High", reason: "Ensures protective device operation" },
    { test: "RCD Operation", priority: "High", reason: "Ensures personal protection from electric shock" }
  ];

  const toggleItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/20 text-red-400";
      case "Medium": return "bg-yellow-500/20 text-yellow-400";
      case "Low": return "bg-green-500/20 text-green-400";
      default: return "bg-elec-yellow/20 text-elec-yellow";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Electrical Installation Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Evaluate existing electrical installations to ensure compatibility and safety before commencing new work.
            This assessment ensures compliance with current regulations and identifies any remedial work required.
          </p>
        </CardContent>
      </Card>

      {electricalChecklist.map((category, index) => (
        <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <category.icon className="h-5 w-5 text-elec-yellow" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3 p-3 border border-elec-yellow/20 rounded-lg hover:bg-elec-yellow/5 transition-colors">
                  <button
                    onClick={() => toggleItem(item)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      checkedItems.includes(item)
                        ? 'bg-green-500 border-green-500'
                        : 'border-elec-yellow/40 hover:border-elec-yellow'
                    }`}
                  >
                    {checkedItems.includes(item) && (
                      <CheckSquare className="h-3 w-3 text-white" />
                    )}
                  </button>
                  <span className={`text-sm ${checkedItems.includes(item) ? 'text-green-400' : 'text-muted-foreground'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Key Standards & Regulations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceRequirements.map((req, index) => (
              <div key={index} className="border border-blue-400/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-1">{req.standard}</h4>
                <p className="text-sm text-blue-200 mb-2">{req.description}</p>
                <ul className="space-y-1">
                  {req.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Testing Priorities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testingPriorities.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-green-400/20 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">{test.test}</h4>
                  <p className="text-sm text-muted-foreground">{test.reason}</p>
                </div>
                <Badge className={getPriorityColor(test.priority)}>
                  {test.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Installation Findings & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            placeholder="Record any defects found, upgrade requirements, compliance issues, or recommendations for the existing installation..."
            className="min-h-24 mb-4"
          />
          <Button className="w-full">
            Complete Electrical Assessment
          </Button>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Important Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If any defects or safety concerns are identified during this assessment, 
            they must be reported immediately and rectified before proceeding with new installation work.
            All work must comply with the current edition of BS 7671 and relevant building regulations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationTab;
