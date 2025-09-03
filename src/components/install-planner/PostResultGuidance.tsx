import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Zap, 
  Shield, 
  Calculator,
  ExternalLink,
  Clock,
  Users,
  BookOpen
} from "lucide-react";
import { InstallPlanData, CableRecommendation } from "./types";

interface PostResultGuidanceProps {
  planData: InstallPlanData;
  recommendedCable: CableRecommendation;
  isMultiCircuit?: boolean;
  totalCircuits?: number;
}

const PostResultGuidance: React.FC<PostResultGuidanceProps> = ({ 
  planData, 
  recommendedCable, 
  isMultiCircuit = false,
  totalCircuits = 1 
}) => {
  const designCurrent = planData.phases === "single" 
    ? planData.totalLoad / planData.voltage
    : planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.85));

  const getTopActions = () => {
    const actions = [];
    
    if (recommendedCable.suitability !== "suitable") {
      actions.push({
        priority: "high",
        action: "Design Review Required",
        description: "Current design does not meet BS7671 requirements",
        icon: AlertTriangle,
        color: "destructive"
      });
    }
    
    if (recommendedCable.voltageDropPercentage > 4) {
      actions.push({
        priority: "medium", 
        action: "Voltage Drop Assessment",
        description: "Review load sensitivity to voltage variations",
        icon: Zap,
        color: "warning"
      });
    }
    
    if (planData.installationMethod?.includes('buried')) {
      actions.push({
        priority: "medium",
        action: "Underground Cable Protection",
        description: "Ensure mechanical protection and warning tape",
        icon: Shield,
        color: "secondary"
      });
    }
    
    return actions;
  };

  const getProcurementSummary = () => {
    const cable = recommendedCable;
    const length = Math.ceil(planData.cableLength * 1.1); // Add 10% contingency
    
    return {
      primaryCable: {
        specification: `${cable.size}mm² ${planData.cableType}`,
        length: `${length}m`,
        installationMethod: planData.installationMethod,
        estimate: cable.cost === "low" ? "£2-4/m" : cable.cost === "medium" ? "£4-8/m" : "£8-15/m"
      },
      protectiveDevice: {
        type: planData.protectiveDevice || "MCB Type B",
        rating: `${cable.ratedCurrent}A`,
        estimate: "£15-35 each"
      },
      accessories: [
        "Cable glands/connectors",
        "Containment (conduit/trunking)",
        "Terminations and joints",
        "Testing equipment access"
      ]
    };
  };

  const getTestingChecklist = () => {
    const tests = [
      {
        test: "Continuity of Protective Conductors",
        reference: "BS 7671 Part 6",
        requirement: "R1+R2 measurement",
        status: "required"
      },
      {
        test: "Insulation Resistance", 
        reference: "BS 7671 Section 643",
        requirement: "≥1MΩ at 500V DC",
        status: "required"
      },
      {
        test: "Earth Fault Loop Impedance (Zs)",
        reference: "BS 7671 Section 643.7", 
        requirement: `≤${(planData.ze + (planData.cableLength * 0.02)).toFixed(2)}Ω`,
        status: "required"
      },
      {
        test: "RCD Operation (if applicable)",
        reference: "BS 7671 Section 643.8",
        requirement: "30mA in ≤40ms",
        status: planData.protectiveDevice?.includes('RCD') ? "required" : "n/a"
      }
    ];
    
    if (planData.loadType === "power" && planData.cableLength <= 106) {
      tests.push({
        test: "Ring Circuit Continuity",
        reference: "BS 7671 Section 643.2.2",
        requirement: "Each leg measurement",
        status: "required"
      });
    }
    
    return tests;
  };

  const getRegulatoryReferences = () => [
    {
      title: "BS 7671:2018+A2:2022",
      description: "Requirements for Electrical Installations",
      sections: ["Part 4: Protection for Safety", "Part 5: Selection & Erection"],
      link: "https://electrical.theiet.org/bs-7671/"
    },
    {
      title: "Part P Building Regulations",
      description: "Electrical Safety in Dwellings",
      sections: ["Notifiable work requirements", "Competent person schemes"],
      link: "https://www.gov.uk/building-regulations-approval"
    },
    {
      title: "IET Guidance Note 1",
      description: "Selection & Erection of Equipment",
      sections: ["Cable selection", "Environmental factors"],
      link: "https://electrical.theiet.org/guidance-notes/"
    }
  ];

  const actions = getTopActions();
  const procurement = getProcurementSummary();
  const tests = getTestingChecklist();
  const regulations = getRegulatoryReferences();

  return (
    <div className="space-y-6">
      {/* Priority Actions */}
      {actions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              Priority Actions
            </CardTitle>
            <CardDescription>
              Critical items requiring attention before installation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {actions.map((action, index) => (
              <Alert key={index} className="border-l-4 border-elec-yellow">
                <action.icon className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>{action.action}</strong>
                      <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                    </div>
                    <Badge variant={action.color as any}>{action.priority}</Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Procurement Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-blue" />
            Procurement Summary
          </CardTitle>
          <CardDescription>
            Material requirements and cost estimates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Primary Cable
                </h4>
                <div className="text-sm space-y-1 mt-2">
                  <p><strong>Specification:</strong> {procurement.primaryCable.specification}</p>
                  <p><strong>Length Required:</strong> {procurement.primaryCable.length}</p>
                  <p><strong>Installation:</strong> {procurement.primaryCable.installationMethod}</p>
                  <p><strong>Est. Cost:</strong> {procurement.primaryCable.estimate}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Protective Device
                </h4>
                <div className="text-sm space-y-1 mt-2">
                  <p><strong>Type:</strong> {procurement.protectiveDevice.type}</p>
                  <p><strong>Rating:</strong> {procurement.protectiveDevice.rating}</p>
                  <p><strong>Est. Cost:</strong> {procurement.protectiveDevice.estimate}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium">Additional Items</h4>
              <ul className="text-sm space-y-1 mt-2">
                {procurement.accessories.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-elec-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing & Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-green" />
            Testing & Verification Requirements
          </CardTitle>
          <CardDescription>
            BS 7671 Part 6 testing requirements for this installation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{test.test}</h4>
                  <p className="text-sm text-muted-foreground">{test.requirement}</p>
                  <p className="text-xs text-muted-foreground">{test.reference}</p>
                </div>
                <Badge variant={test.status === "required" ? "default" : "secondary"}>
                  {test.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regulatory References */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-primary" />
            Regulatory References
          </CardTitle>
          <CardDescription>
            Key regulations and guidance documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {regulations.map((reg, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{reg.title}</h4>
                <Button variant="outline" size="sm" asChild>
                  <a href={reg.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{reg.description}</p>
              <div className="flex flex-wrap gap-1">
                {reg.sections.map((section, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {section}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Professional Notice */}
      <Alert className="border-elec-yellow bg-elec-yellow/5">
        <Users className="h-4 w-4" />
        <AlertDescription>
          <strong>Professional Verification Required:</strong> This calculation tool provides guidance based on BS 7671 
          but does not replace professional electrical design and verification. All installations must be designed, 
          installed, and certified by qualified electrical personnel in accordance with current regulations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PostResultGuidance;