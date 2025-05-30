
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  CheckCircle,
  Shield,
  Zap,
  AlertTriangle,
  FileText,
  Award,
  Target
} from "lucide-react";

const BS7671QuickReference = () => {
  const bs7671Parts = [
    {
      part: "Part 1: Scope & Definitions",
      section: "100",
      description: "Fundamental principles and scope of the regulations",
      keyPoints: [
        "Applies to electrical installations up to 1000V AC/1500V DC",
        "Covers design, erection and verification of electrical installations",
        "Excludes automotive and marine applications",
        "Fundamental principles for safety"
      ]
    },
    {
      part: "Part 2: Definitions", 
      section: "200",
      description: "Definitions of terms used throughout the regulations",
      keyPoints: [
        "Circuit protective conductor (CPC)",
        "Skilled person - adequate technical knowledge",
        "Special locations - additional requirements",
        "RCD - residual current device"
      ]
    },
    {
      part: "Part 3: Assessment",
      section: "300",
      description: "Assessment of general characteristics",
      keyPoints: [
        "Purpose and characteristics of installation",
        "External influences (environmental conditions)", 
        "Compatibility of equipment",
        "Maintainability and accessibility"
      ]
    },
    {
      part: "Part 4: Protection",
      section: "400",
      description: "Protection for safety requirements",
      keyPoints: [
        "Protection against electric shock (basic and fault protection)",
        "Protection against thermal effects",
        "Protection against overcurrent",
        "Protection against voltage disturbances"
      ]
    },
    {
      part: "Part 5: Selection & Erection",
      section: "500",
      description: "Selection and erection of electrical equipment",
      keyPoints: [
        "Equipment compliance and selection",
        "Wiring systems and cable installation", 
        "Protection and switching devices",
        "Earthing arrangements and bonding"
      ]
    },
    {
      part: "Part 6: Inspection & Testing",
      section: "600",
      description: "Inspection and testing requirements",
      keyPoints: [
        "Initial verification requirements",
        "Schedule of test results",
        "Electrical Installation Certificate",
        "Periodic inspection and testing"
      ]
    },
    {
      part: "Part 7: Special Installations",
      section: "700",
      description: "Requirements for special installations or locations",
      keyPoints: [
        "Bathrooms and shower rooms (701)",
        "Swimming pools (702)",
        "Solar photovoltaic systems (712)",
        "Electric vehicle charging (722)"
      ]
    }
  ];

  const protectionRequirements = [
    {
      type: "Basic Protection",
      description: "Protection against direct contact with live parts",
      methods: [
        "Insulation of live parts",
        "Barriers or enclosures (IP2X or IPXXB)",
        "Obstacles (restricted to skilled persons)",
        "Placing out of reach"
      ]
    },
    {
      type: "Fault Protection", 
      description: "Protection against indirect contact",
      methods: [
        "Automatic disconnection of supply (ADS)",
        "Double or reinforced insulation (Class II)",
        "Electrical separation",
        "Extra-low voltage (SELV/PELV)"
      ]
    },
    {
      type: "Additional Protection",
      description: "Additional measures for enhanced safety",
      methods: [
        "RCD protection (≤30mA)",
        "Supplementary bonding",
        "RCBO for circuit protection",
        "Type A RCD for electronic loads"
      ]
    }
  ];

  const testingSequence = [
    {
      test: "Continuity of Protective Conductors",
      purpose: "Verify earth continuity throughout installation",
      method: "Low resistance ohmmeter, test current >200mA",
      acceptable: "R1+R2 values within design limits"
    },
    {
      test: "Continuity of Ring Final Circuits",
      purpose: "Verify ring circuit integrity",
      method: "End-to-end test of line, neutral, and earth",
      acceptable: "Measured values confirm ring continuity"
    },
    {
      test: "Insulation Resistance",
      purpose: "Verify insulation between conductors",
      method: "500V DC for circuits ≤500V nominal",
      acceptable: "≥1MΩ (≥0.5MΩ with equipment connected)"
    },
    {
      test: "Polarity",
      purpose: "Verify correct connections throughout",
      method: "Continuity testing or approved test lamp",
      acceptable: "All connections correctly polarized"
    },
    {
      test: "Earth Fault Loop Impedance",
      purpose: "Verify disconnection times will be achieved",
      method: "Earth fault loop impedance tester",
      acceptable: "Zs ≤ values in BS 7671 tables"
    },
    {
      test: "RCD Operation",
      purpose: "Verify RCD disconnection time and sensitivity",
      method: "RCD tester at rated current",
      acceptable: "≤300ms at 1×IΔn, ≤40ms at 5×IΔn"
    }
  ];

  const specialLocationSummary = [
    {
      section: "701 - Bathrooms",
      zones: "Zones 0, 1, 2 based on proximity to water",
      requirements: [
        "Zone 0: IPX7, 12V SELV only",
        "Zone 1: IPX4, limited equipment",
        "Zone 2: IPX4, Class II equipment",
        "30mA RCD protection required"
      ]
    },
    {
      section: "702 - Swimming Pools", 
      zones: "Zones 0, 1, 2 around pool area",
      requirements: [
        "Zone 0: IPX8, 12V SELV only",
        "Zone 1: IPX5, SELV or Class II",
        "Zone 2: IPX4, standard requirements",
        "Supplementary bonding required"
      ]
    },
    {
      section: "712 - Solar PV",
      zones: "DC and AC sides of installation",
      requirements: [
        "DC isolation at array and inverter",
        "AC isolation at grid connection",
        "Fire safety considerations",
        "G98/G99 grid connection requirements"
      ]
    },
    {
      section: "722 - EV Charging",
      zones: "Based on installation location",
      requirements: [
        "Type A RCD protection (6mA DC)",
        "O-PEN device protection",
        "Load management systems",
        "Earthing arrangements critical"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            BS 7671 Quick Reference
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Essential sections of the 18th Edition Wiring Regulations (BS 7671:2018+A2:2022). 
          Quick reference guide for electrical installation requirements and compliance.
        </p>
        <BackButton customUrl="/apprentice/electrical-installation-guides" label="Back to Installation Guides" />
      </div>

      {/* BS 7671 Parts Overview */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">BS 7671 Structure Overview</CardTitle>
          </div>
          <p className="text-muted-foreground">Key parts of the 18th Edition Wiring Regulations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {bs7671Parts.map((part, index) => (
              <div key={index} className="bg-elec-dark/40 p-5 rounded-lg border border-elec-yellow/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-base mb-1">{part.part}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{part.description}</p>
                  </div>
                  <Badge variant="outline" className="border-elec-yellow text-elec-yellow ml-4">
                    Section {part.section}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {part.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Protection Requirements */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Protection Requirements (Part 4)</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential protection methods for electrical safety</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {protectionRequirements.map((protection, index) => (
              <div key={index} className="bg-elec-dark/40 p-5 rounded-lg">
                <h4 className="font-medium text-white text-lg mb-2">{protection.type}</h4>
                <p className="text-sm text-muted-foreground mb-4">{protection.description}</p>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-elec-yellow">Methods:</h5>
                  {protection.methods.map((method, methodIndex) => (
                    <div key={methodIndex} className="flex items-start gap-2">
                      <Target className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testing Sequence */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Testing Sequence (Part 6)</CardTitle>
          </div>
          <p className="text-muted-foreground">Required testing sequence for electrical installations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {testingSequence.map((test, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex items-start gap-4">
                  <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-base mb-2">{test.test}</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="text-elec-yellow font-medium mb-1">Purpose:</h5>
                        <p className="text-muted-foreground">{test.purpose}</p>
                      </div>
                      <div>
                        <h5 className="text-elec-yellow font-medium mb-1">Method:</h5>
                        <p className="text-muted-foreground">{test.method}</p>
                      </div>
                      <div>
                        <h5 className="text-elec-yellow font-medium mb-1">Acceptable:</h5>
                        <p className="text-muted-foreground">{test.acceptable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Locations Summary */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Special Locations (Part 7)</CardTitle>
          </div>
          <p className="text-muted-foreground">Key requirements for special installation locations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {specialLocationSummary.map((location, index) => (
              <div key={index} className="bg-elec-dark/40 p-5 rounded-lg border border-elec-yellow/20">
                <h4 className="font-medium text-white text-base mb-2">{location.section}</h4>
                <p className="text-sm text-muted-foreground mb-3">{location.zones}</p>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-elec-yellow">Key Requirements:</h5>
                  {location.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Amendment 2 Highlights */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Amendment 2:2022 Key Changes</CardTitle>
          </div>
          <p className="text-muted-foreground">Important updates in the latest amendment</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">New Requirements:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  Arc Fault Detection Devices (AFDDs) for certain circuits
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  Enhanced protection for cables in escape routes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  Updated EV charging requirements (Section 722)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5" />
                  Revised surge protection requirements
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Implementation:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-400 mt-0.5" />
                  New installations from 1st January 2024
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-400 mt-0.5" />
                  Risk assessment required for AFDD installation
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-400 mt-0.5" />
                  Enhanced documentation requirements
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-400 mt-0.5" />
                  Updated inspection and testing procedures
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Links */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Essential Tables & Appendices</CardTitle>
          </div>
          <p className="text-muted-foreground">Key reference tables for daily use</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-elec-dark/40 p-4 rounded-lg">
              <h4 className="font-medium text-elec-yellow mb-2">Appendix 2</h4>
              <p className="text-sm text-muted-foreground">Statutory regulations and associated memoranda</p>
            </div>
            <div className="bg-elec-dark/40 p-4 rounded-lg">
              <h4 className="font-medium text-elec-yellow mb-2">Appendix 3</h4>
              <p className="text-sm text-muted-foreground">Time/current characteristics of overcurrent protective devices</p>
            </div>
            <div className="bg-elec-dark/40 p-4 rounded-lg">
              <h4 className="font-medium text-elec-yellow mb-2">Appendix 4</h4>
              <p className="text-sm text-muted-foreground">Current-carrying capacity and voltage drop tables</p>
            </div>
            <div className="bg-elec-dark/40 p-4 rounded-lg">
              <h4 className="font-medium text-elec-yellow mb-2">Appendix 6</h4>
              <p className="text-sm text-muted-foreground">Model forms for electrical certificates</p>
            </div>
            <div className="bg-elec-dark/40 p-4 rounded-lg">
              <h4 className="font-medium text-elec-yellow mb-2">Appendix 15</h4>
              <p className="text-sm text-muted-foreground">Ring and radial final circuit arrangements</p>
            </div>
            <div className="bg-elec-dark/40 p-4 rounded-lg">
              <h4 className="font-medium text-elec-yellow mb-2">Appendix 16</h4>
              <p className="text-sm text-muted-foreground">Devices for protection against overvoltage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671QuickReference;
