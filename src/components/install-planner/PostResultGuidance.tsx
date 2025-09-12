import React from 'react';
import EnhancedInstallationGuidance from './EnhancedInstallationGuidance';
import EnhancedPracticalGuidance from './EnhancedPracticalGuidance';
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
  BookOpen,
  Wrench
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
    const isRingCircuit = planData.loadType === "power" && planData.cableLength <= 106;
    const isSWA = planData.cableType?.toLowerCase().includes('swa');
    const isUnderground = planData.installationMethod?.includes('buried');
    
    const accessories = [
      {
        name: "Cable glands/connectors",
        description: "Secure cable entry and strain relief",
        quantity: `${Math.ceil(planData.cableLength / 20)} - ${Math.ceil(planData.cableLength / 10)} units`,
        importance: "Essential"
      },
      {
        name: "Terminations and joints",
        description: "Connection blocks and distribution points",
        quantity: "6-12 pieces",
        importance: "Essential"
      },
      {
        name: "Testing equipment access",
        description: "Test points and accessible connections",
        quantity: "As required per circuit",
        importance: "Mandatory"
      }
    ];
    
    // Add specific accessories based on installation
    if (isSWA) {
      accessories.push(
        {
          name: "SWA glands",
          description: "Armoured cable termination glands",
          quantity: `${Math.ceil(planData.cableLength / 50)} - ${Math.ceil(planData.cableLength / 25)} units`,
          importance: "Essential"
        },
        {
          name: "Earth tags",
          description: "Armour earth continuity tags",
          quantity: "1 per gland",
          importance: "Essential"
        },
        {
          name: "Mechanical protection",
          description: "Cable guards and impact protection",
          quantity: "As required by route",
          importance: "Recommended"
        }
      );
    } else {
      accessories.push({
        name: "Conduit/trunking system",
        description: "Cable routing and protection",
        quantity: `${Math.ceil(planData.cableLength * 1.2)}m`,
        importance: "Essential"
      });
    }
    
    if (isUnderground) {
      accessories.push(
        {
          name: "Warning tape",
          description: "Underground cable warning tape",
          quantity: `${Math.ceil(planData.cableLength)}m`,
          importance: "Mandatory"
        },
        {
          name: "Sand/aggregate bedding",
          description: "Cable protection bedding material",
          quantity: `${Math.ceil(planData.cableLength * 0.1)}m³`,
          importance: "Essential"
        },
        {
          name: "Ducting (if applicable)",
          description: "Underground cable ducting",
          quantity: `${Math.ceil(planData.cableLength)}m`,
          importance: "Optional"
        }
      );
    }
    
    if (isRingCircuit) {
      accessories.push(
        {
          name: "Socket outlet accessories",
          description: "Back boxes and mounting hardware",
          quantity: "As per socket count",
          importance: "Essential"
        }
      );
    }
    
    return {
      primaryCable: {
        specification: `${cable.size} ${planData.cableType || 'T&E'}`,
        length: `${length}m ${isRingCircuit ? '(ring main)' : '(radial)'}`,
        installationMethod: planData.installationMethod,
        estimate: cable.cost === "low" ? "£2-4/m" : cable.cost === "medium" ? "£4-8/m" : "£8-15/m",
        totalEstimate: cable.cost === "low" ? `£${(length * 3).toFixed(0)}-${(length * 4).toFixed(0)}` : 
                       cable.cost === "medium" ? `£${(length * 6).toFixed(0)}-${(length * 8).toFixed(0)}` : 
                       `£${(length * 12).toFixed(0)}-${(length * 15).toFixed(0)}`
      },
      protectiveDevice: {
        type: `${cable.ratedCurrent}A ${planData.protectiveDevice?.toUpperCase() || "MCB"} Type B`,
        characteristics: "10kA breaking capacity, 30mA RCD (if required)",
        estimate: planData.protectiveDevice?.includes('rcbo') ? "£25-45" : "£15-35",
        quantity: isMultiCircuit ? `${totalCircuits} required` : "1 required"
      },
      accessories,
      totalProjectEstimate: {
        materials: cable.cost === "low" ? "£150-300" : cable.cost === "medium" ? "£300-600" : "£600-1200",
        labour: isRingCircuit ? "£200-400" : "£150-300",
        testing: "£100-200"
      }
    };
  };

  const getTestingChecklist = () => {
    const isRingCircuit = planData.loadType === "power" && planData.cableLength <= 106;
    const maxZs = planData.voltage === 230 ? 1.44 : 0.83; // For 32A Type B MCB
    const expectedZs = planData.ze + (planData.cableLength * 0.02);
    
    const preEnergisationTests = [
      {
        test: "Continuity of Protective Conductors",
        reference: "BS 7671 Section 643.2",
        requirement: isRingCircuit ? "R1+R2 for each leg" : "R1+R2 end-to-end",
        expectedValue: `≤${(planData.cableLength * 0.02).toFixed(2)}Ω`,
        status: "required",
        category: "pre"
      },
      {
        test: "Continuity of Ring Final Circuit Conductors",
        reference: "BS 7671 Section 643.2.2", 
        requirement: "Line and neutral continuity",
        expectedValue: "Within 0.05Ω difference",
        status: isRingCircuit ? "required" : "n/a",
        category: "pre"
      },
      {
        test: "Insulation Resistance", 
        reference: "BS 7671 Section 643.3",
        requirement: "Line to neutral, line to earth, neutral to earth",
        expectedValue: "≥1MΩ at 500V DC",
        status: "required",
        category: "pre"
      },
      {
        test: "Protection by Automatic Disconnection",
        reference: "BS 7671 Section 643.4",
        requirement: "Verify protective device ratings",
        expectedValue: "Ib ≤ In ≤ Iz verification",
        status: "required",
        category: "pre"
      }
    ];
    
    const liveTests = [
      {
        test: "Earth Fault Loop Impedance (Zs)",
        reference: "BS 7671 Section 643.7",
        requirement: "Measured at furthest point",
        expectedValue: `≤${maxZs.toFixed(2)}Ω (actual: ~${expectedZs.toFixed(2)}Ω)`,
        status: "required",
        category: "live"
      },
      {
        test: "RCD Operation Test",
        reference: "BS 7671 Section 643.8",
        requirement: "½×IΔn, 1×IΔn, 5×IΔn tests",
        expectedValue: "30mA in ≤40ms (30mA RCD)",
        status: planData.protectiveDevice?.includes('rcd') || planData.protectiveDevice?.includes('rcbo') ? "required" : "recommended",
        category: "live"
      },
      {
        test: "Functional Testing",
        reference: "BS 7671 Section 643.10",
        requirement: "All switches, isolators, controls",
        expectedValue: "Correct operation verified",
        status: "required",
        category: "live"
      },
      {
        test: "Verification of Phase Sequence",
        reference: "BS 7671 Section 643.6",
        requirement: "Three-phase installations only",
        expectedValue: "L1, L2, L3 rotation",
        status: planData.phases === "three" ? "required" : "n/a",
        category: "live"
      }
    ];
    
    return { preEnergisationTests, liveTests };
  };

  const getRegulatoryReferences = () => [
    {
      title: "BS 7671:2018+A2:2022",
      subtitle: "Requirements for Electrical Installations (IET Wiring Regulations)",
      description: "The fundamental standard for electrical installation design, selection and verification in the UK",
      keyClauses: [
        "Section 411 - Protection against electric shock",
        "Section 433 - Protection against overcurrent",
        "Section 523 - Current-carrying capacity",
        "Section 525 - Voltage drop",
        "Part 6 - Inspection and testing"
      ],
      relevantSections: planData.loadType === "power" ? 
        ["Ring final circuits (Annex 15)", "Socket outlet circuits", "Part P compliance"] :
        ["Lighting circuits", "Switch control", "Emergency lighting"],
      compliance: "Mandatory for all electrical installations",
      icon: Shield
    },
    {
      title: "Part P Building Regulations",
      subtitle: "Electrical Safety in Dwellings",
      description: "Legal requirements for electrical work in domestic properties in England and Wales",
      keyClauses: [
        "New circuits and consumer units - Notifiable",
        "Kitchen/bathroom additions - Notifiable", 
        "Like-for-like replacements - Non-notifiable",
        "Competent person self-certification"
      ],
      relevantSections: planData.installationType === "domestic" ?
        ["Self-certification via NICEIC/NAPIT", "Building control notification", "EIC requirements"] :
        ["Commercial installations exempt", "BS 7671 compliance still required"],
      compliance: planData.installationType === "domestic" ? "Notifiable work" : "Not applicable",
      icon: FileText
    },
    {
      title: "IET Guidance Note 1",
      subtitle: "Selection & Erection of Equipment",
      description: "Practical guidance on implementing BS 7671 requirements for equipment selection",
      keyClauses: [
        "Cable selection criteria",
        "Environmental factor application",
        "Grouping and derating methods",
        "Voltage drop calculations"
      ],
      relevantSections: [
        "Tables for current-carrying capacity",
        "Installation method references",
        "Temperature correction factors",
        "Mechanical protection requirements"
      ],
      compliance: "Best practice guidance",
      icon: BookOpen
    },
    {
      title: "IET Guidance Note 3",
      subtitle: "Inspection & Testing",
      description: "Comprehensive guide to electrical installation testing and certification",
      keyClauses: [
        "Test sequence and methods",
        "Acceptable test results",
        "Certification requirements",
        "Periodic inspection intervals"
      ],
      relevantSections: [
        "Initial verification procedures",
        "Test instrument requirements",
        "EIC and EICR documentation",
        "Remedial action priorities"
      ],
      compliance: "Required for certification",
      icon: CheckCircle2
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
            Material requirements and cost estimates for this installation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Items */}
          <div className="space-y-4">
            {/* Primary Cable */}
            <div className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
              <h4 className="font-semibold flex items-center gap-2 mb-4 text-white">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Primary Cable
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Specification:</span>
                  <span className="font-medium text-white">{procurement.primaryCable.specification}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Length Required:</span>
                  <span className="font-medium text-white">{procurement.primaryCable.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Installation:</span>
                  <span className="font-medium text-white capitalize">{procurement.primaryCable.installationMethod?.replace('-', ' ')}</span>
                </div>
                <Separator className="my-3 bg-elec-yellow/20" />
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Rate:</span>
                  <span className="font-medium text-elec-green">{procurement.primaryCable.estimate}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Total Cable:</span>
                  <span className="font-bold text-elec-green text-lg">{procurement.primaryCable.totalEstimate}</span>
                </div>
              </div>
            </div>
            
            {/* Protective Device */}
            <div className="p-4 bg-elec-dark/30 rounded-lg border border-elec-blue/20">
              <h4 className="font-semibold flex items-center gap-2 mb-4 text-white">
                <Shield className="h-5 w-5 text-elec-blue" />
                Protective Device
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Type:</span>
                  <span className="font-medium text-white">{procurement.protectiveDevice.type}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Features:</span>
                  <span className="font-medium text-white text-sm leading-relaxed">{procurement.protectiveDevice.characteristics}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Quantity:</span>
                  <span className="font-medium text-white">{procurement.protectiveDevice.quantity}</span>
                </div>
                <Separator className="my-3 bg-elec-blue/20" />
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Unit Cost:</span>
                  <span className="font-bold text-elec-blue text-lg">{procurement.protectiveDevice.estimate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Items */}
          <div className="grid grid-cols-1 gap-4">
            {/* Installation Accessories */}
            <div className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
              <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-elec-yellow" />
                Installation Accessories
              </h4>
              <div className="space-y-3">
                {procurement.accessories.map((item: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-elec-dark/20 rounded-lg border border-elec-yellow/10">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-elec-green mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-white text-sm leading-tight">{item.name}</h5>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 sm:items-center">
                      <span className="text-white/60 text-xs uppercase tracking-wide">Quantity</span>
                      <span className="text-white text-sm font-medium">{item.quantity}</span>
                    </div>
                    <div className="flex flex-col gap-1 sm:items-center">
                      <span className="text-white/60 text-xs uppercase tracking-wide">Priority</span>
                      <Badge 
                        className={`text-xs px-2 py-0.5 ${
                          item.importance === 'Mandatory' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                          item.importance === 'Essential' ? 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30' :
                          'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {item.importance}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Project Total */}
            <div className="p-4 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-4">Estimated Project Cost</h4>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Materials:</span>
                  <span className="font-medium text-white">{procurement.totalProjectEstimate.materials}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Labour:</span>
                  <span className="font-medium text-white">{procurement.totalProjectEstimate.labour}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 text-sm">Testing/Cert:</span>
                  <span className="font-medium text-white">{procurement.totalProjectEstimate.testing}</span>
                </div>
                <Separator className="my-3 bg-elec-yellow/30" />
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="font-semibold text-white">Total Range:</span>
                  <span className="font-bold text-elec-yellow text-right text-lg">
                    £{(
                      parseInt(procurement.totalProjectEstimate.materials.split('-')[0].replace('£', '')) + 
                      parseInt(procurement.totalProjectEstimate.labour.split('-')[0].replace('£', '')) + 
                      parseInt(procurement.totalProjectEstimate.testing.split('-')[0].replace('£', ''))
                    ).toFixed(0)} - £{(
                      parseInt(procurement.totalProjectEstimate.materials.split('-')[1]) + 
                      parseInt(procurement.totalProjectEstimate.labour.split('-')[1]) + 
                      parseInt(procurement.totalProjectEstimate.testing.split('-')[1])
                    ).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Notes */}
          <Alert className="bg-blue-500/5 border-blue-500/20">
            <Calculator className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Cost Estimates:</strong> Prices are indicative and based on typical UK market rates. 
              Actual costs may vary based on supplier, location, quantity, and specific product selection. 
              Always obtain formal quotations before procurement.
            </AlertDescription>
          </Alert>
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
            BS 7671 Part 6 testing schedule for this installation type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pre-Energisation Tests */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-amber-500" />
              Pre-Energisation Tests
              <Badge variant="outline" className="text-amber-500 border-amber-500/30">POWER OFF</Badge>
            </h4>
            <div className="grid gap-3">
              {tests.preEnergisationTests.filter(test => test.status !== "n/a").map((test, index) => (
                <div key={index} className="p-4 border rounded-lg bg-amber-500/5 border-amber-500/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{test.test}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{test.requirement}</p>
                      <p className="text-xs font-medium text-amber-400 mt-1">{test.expectedValue}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={test.status === "required" ? "default" : "secondary"} className="text-xs">
                        {test.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{test.reference}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Live Tests */}
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-red-500" />
              Live Tests
              <Badge variant="outline" className="text-red-500 border-red-500/30">POWER ON</Badge>
            </h4>
            <div className="grid gap-3">
              {tests.liveTests.filter(test => test.status !== "n/a").map((test, index) => (
                <div key={index} className="p-4 border rounded-lg bg-red-500/5 border-red-500/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{test.test}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{test.requirement}</p>
                      <p className="text-xs font-medium text-red-400 mt-1">{test.expectedValue}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={test.status === "required" ? "default" : "secondary"} className="text-xs">
                        {test.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{test.reference}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Alert className="bg-red-500/5 border-red-500/20">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">
              <strong>Safety Warning:</strong> Live testing must only be performed by qualified electricians 
              with appropriate test equipment. Ensure safe isolation procedures and use of appropriate PPE.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Regulatory References */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BookOpen className="h-5 w-5 text-elec-primary" />
            Regulatory Framework
          </CardTitle>
          <CardDescription className="text-white">
            Essential regulations and standards governing this installation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {regulations.map((reg, index) => (
            <div key={index} className="space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3 pb-3">
                <reg.icon className="h-5 w-5 text-elec-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-elec-light">{reg.title}</h4>
                      <p className="text-sm text-elec-blue font-medium">{reg.subtitle}</p>
                    </div>
                    <Badge 
                      variant={reg.compliance === "Mandatory for all electrical installations" ? "default" : 
                              reg.compliance === "Notifiable work" ? "destructive" : "secondary"}
                      className="text-xs self-start sm:self-center"
                    >
                      {reg.compliance}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/80">{reg.description}</p>
                </div>
              </div>
              
              {/* Content Grid */}
              <div className="grid grid-cols-1 gap-4 pl-8">
                {/* Key Clauses */}
                <div>
                  <h5 className="font-medium text-sm mb-2 text-elec-yellow">Key Requirements</h5>
                   <ul className="space-y-1">
                      {reg.keyClauses.map((clause, idx) => (
                        <li key={idx} className="text-xs text-white flex items-start gap-2">
                          <span className="text-elec-primary mt-1 flex-shrink-0">•</span>
                          <span className="leading-tight">{clause}</span>
                        </li>
                      ))}
                   </ul>
                </div>
                
                {/* Relevant Sections */}
                <div>
                  <h5 className="font-medium text-sm mb-2 text-elec-blue">Relevant to This Installation</h5>
                   <ul className="space-y-1">
                      {reg.relevantSections.map((section, idx) => (
                        <li key={idx} className="text-xs text-blue-200 flex items-start gap-2">
                          <span className="text-elec-blue mt-1 flex-shrink-0">•</span>
                          <span className="leading-tight">{section}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
              
              {index < regulations.length - 1 && (
                <Separator className="mt-6 bg-elec-yellow/20" />
              )}
            </div>
          ))}
          
          {/* Professional Resources */}
          <Alert className="bg-elec-primary/5 border-elec-primary/20">
            <BookOpen className="h-4 w-4 text-elec-primary" />
            <AlertDescription>
              <strong>Professional Resources:</strong> Access the latest standards through the{' '}
              <a href="https://electrical.theiet.org/" target="_blank" rel="noopener noreferrer" 
                 className="text-elec-primary hover:underline">
                IET website
              </a>, or consult your local building control authority for Part P requirements. 
              Consider membership of professional bodies (NICEIC, NAPIT, ECA) for ongoing support.
            </AlertDescription>
          </Alert>
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
      
      {/* Enhanced Practical Guidance */}
      <EnhancedPracticalGuidance 
        planData={planData} 
        recommendedCable={recommendedCable} 
      />

      {/* Enhanced Installation Guidance */}
      <EnhancedInstallationGuidance 
        planData={planData} 
        recommendedCable={recommendedCable} 
      />
    </div>
  );
};

export default PostResultGuidance;