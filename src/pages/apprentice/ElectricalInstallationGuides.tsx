
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  FileText,
  Home,
  Building,
  Factory,
  Plug,
  Clock,
  CheckCircle,
  BookOpen,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Wrench,
  Shield,
  Zap,
  Cable,
  Settings,
  Award,
  Target
} from "lucide-react";

const ElectricalInstallationGuides = () => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const installationTypes = [
    {
      id: "domestic",
      title: "Domestic Installations",
      icon: <Home className="h-6 w-6 text-elec-yellow" />,
      description: "Residential electrical work including new builds, extensions, and rewires",
      commonTypes: [
        "Full house rewires",
        "Kitchen and bathroom installations", 
        "Extension wiring",
        "Consumer unit upgrades",
        "Additional circuits and sockets",
        "Garden and outdoor lighting"
      ],
      cableTypes: [
        { application: "Lighting circuits", cable: "1.5mm² T&E", protection: "6A MCB", notes: "BS 7671 compliant" },
        { application: "Ring final circuits", cable: "2.5mm² T&E", protection: "32A RCBO", notes: "Max 100m² floor area" },
        { application: "Radial circuits", cable: "2.5mm² T&E", protection: "20A MCB", notes: "Max 50m² floor area" },
        { application: "Cooker circuits", cable: "6mm² T&E", protection: "32A MCB", notes: "Depends on load" },
        { application: "Shower circuits", cable: "10mm² T&E", protection: "40A RCBO", notes: "Up to 8.5kW shower" },
        { application: "Immersion heater", cable: "2.5mm² T&E", protection: "16A MCB", notes: "3kW maximum" }
      ],
      keyStandards: [
        "BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)",
        "Part P Building Regulations compliance",
        "RCD protection required for most circuits",
        "Electrical Installation Certificate (EIC) required",
        "Inspection and testing to BS 7671"
      ],
      detailedContent: {
        planning: "Before starting any domestic installation, conduct a thorough site survey. Check the existing installation condition, identify the consumer unit location, plan cable routes, and ensure adequate earthing arrangements. Consider future expansion needs and smart home integration requirements.",
        safety: "Isolate the supply at the main switch before commencing work. Use a suitable voltage tester to prove dead and lock off the supply. Ensure all RCD protection is tested and functional. Use appropriate PPE including safety boots and eye protection.",
        certification: "Upon completion, issue an Electrical Installation Certificate (EIC) for new circuits or a Minor Electrical Installation Works Certificate (MEIWC) for additions. Include schedule of test results and provide customer with Building Control notification if required under Part P."
      }
    },
    {
      id: "commercial",
      title: "Commercial Installations", 
      icon: <Building className="h-6 w-6 text-elec-yellow" />,
      description: "Office buildings, shops, restaurants and small commercial premises",
      commonTypes: [
        "Office lighting and power",
        "Shop fitting electrical work",
        "Restaurant kitchen installations",
        "Emergency lighting systems", 
        "Fire alarm installations",
        "Three-phase supplies"
      ],
      cableTypes: [
        { application: "General lighting", cable: "1.5mm² T&E", protection: "10A MCB", notes: "Emergency lighting required" },
        { application: "Socket outlets", cable: "2.5mm² T&E", protection: "20A RCBO", notes: "RCD protection essential" },
        { application: "Three-phase supply", cable: "4mm² 3-core SWA", protection: "20A 3-pole MCB", notes: "Balanced loading required" },
        { application: "Emergency lighting", cable: "1.5mm² FP200", protection: "6A MCB", notes: "Fire rated cable" },
        { application: "Fire alarm system", cable: "1.5mm² FP200", protection: "6A MCB", notes: "BS 5839 compliance" },
        { application: "Kitchen equipment", cable: "6mm² T&E", protection: "32A MCB", notes: "IP65 protection required" }
      ],
      keyStandards: [
        "BS 7671:2018+A2:2022 compliance",
        "BS 5266 Emergency lighting standards", 
        "BS 5839 Fire detection and alarm systems",
        "Electrical Installation Certificate required",
        "Periodic inspection every 5 years recommended"
      ],
      detailedContent: {
        planning: "Commercial installations require careful coordination with other trades. Plan cable routes to avoid interference with HVAC and data systems. Consider business hours for installation timing and plan phases to minimise disruption. Ensure adequate cable containment and segregation.",
        safety: "Additional safety considerations for commercial premises include maintaining fire escape routes during installation. Coordinate with building management for safe isolation procedures. Ensure all work areas are properly signed and barriers in place to protect public access.",
        certification: "Commercial installations require comprehensive documentation including electrical schematic drawings, equipment schedules, and operation and maintenance manuals. Provide training to building maintenance staff on new systems installed."
      }
    },
    {
      id: "industrial", 
      title: "Industrial Installations",
      icon: <Factory className="h-6 w-6 text-elec-yellow" />,
      description: "Manufacturing facilities, warehouses and heavy-duty electrical systems",
      commonTypes: [
        "Motor control systems",
        "High bay lighting",
        "Machinery installations",
        "Distribution board upgrades",
        "Emergency shutdown systems",
        "High voltage connections"
      ],
      cableTypes: [
        { application: "Motor circuits", cable: "4-25mm² SWA", protection: "DOL/Star-Delta", notes: "Cable calc required" },
        { application: "High bay lighting", cable: "2.5mm² SWA", protection: "16A MCB", notes: "IP65 fittings" },
        { application: "Sub-main feeds", cable: "16-95mm² SWA", protection: "MCCB", notes: "Discrimination required" },
        { application: "Emergency stops", cable: "1.5mm² SY", protection: "24V DC supply", notes: "Category 3 safety" },
        { application: "Control circuits", cable: "1.5mm² SY", protection: "2A MCB", notes: "Screened cable" },
        { application: "External supplies", cable: "25mm²+ SWA", protection: "HRC fuses", notes: "Underground installation" }
      ],
      keyStandards: [
        "BS 7671:2018+A2:2022 compliance",
        "BS EN 60204 Machinery safety standards",
        "Health and Safety at Work Act requirements",
        "DSEAR assessment for hazardous areas",
        "Annual electrical inspection recommended"
      ],
      detailedContent: {
        planning: "Industrial installations require detailed electrical design calculations including motor starting currents, cable sizing for voltage drop, and discrimination studies. Coordinate with production schedules and plan shutdowns carefully. Consider maintenance access and future expansion requirements.",
        safety: "Industrial environments present additional hazards including moving machinery, hazardous substances, and high voltage systems. Implement permit to work systems and ensure all isolation procedures are followed. Use appropriate PPE rated for the environment and voltage levels.",
        certification: "Industrial installations require comprehensive electrical design documentation, including single line diagrams, control circuit drawings, and equipment schedules. Provide detailed commissioning procedures and handover documentation including operation and maintenance manuals."
      }
    },
    {
      id: "specialist",
      title: "Specialist Installations",
      icon: <Plug className="h-6 w-6 text-elec-yellow" />,
      description: "Solar PV, EV charging, swimming pools and special location installations",
      commonTypes: [
        "Solar PV systems",
        "Electric vehicle charging points",
        "Swimming pool installations", 
        "Bathroom electrical work",
        "Agricultural installations",
        "Temporary electrical supplies"
      ],
      cableTypes: [
        { application: "Solar PV DC", cable: "4mm² DC cable", protection: "DC isolators", notes: "UV resistant" },
        { application: "EV charging", cable: "6mm² T&E", protection: "32A RCBO", notes: "Type A RCD required" },
        { application: "Pool equipment", cable: "2.5mm² SWA", protection: "16A RCBO", notes: "Zone classification" },
        { application: "Bathroom circuits", cable: "2.5mm² T&E", protection: "20A RCBO", notes: "IP rating crucial" },
        { application: "Agricultural", cable: "4mm² SWA", protection: "20A RCBO", notes: "SELV recommended" },
        { application: "Temporary supply", cable: "2.5mm² flexible", protection: "RCD protection", notes: "110V preferred" }
      ],
      keyStandards: [
        "BS 7671 Section 7 Special Installations",
        "MCS standards for renewable energy",
        "IET Code of Practice for EV charging",
        "Swimming pool zones BS 7671:701",
        "G59/G98 grid connection requirements"
      ],
      detailedContent: {
        planning: "Specialist installations often require additional approvals and notifications. Check with local building control and DNO requirements for grid connections. Plan cable routes considering special environmental conditions and access for maintenance. Consider ongoing monitoring requirements.",
        safety: "Special locations require enhanced safety measures including additional RCD protection, bonding requirements, and IP rating considerations. Ensure all personnel are trained for the specific installation type and environmental hazards present.",
        certification: "Specialist installations may require additional certification such as MCS for solar PV or specific commissioning procedures for EV charging points. Ensure all relevant standards are followed and appropriate warranties provided to the customer."
      }
    }
  ];

  const toolsAndMaterials = {
    essentialTools: [
      "Multifunction tester (insulation, continuity, RCD testing)",
      "Voltage tester and proving unit (GS38 compliant)",
      "Socket tester for quick outlet verification",
      "Cable strippers and crimping tools",
      "SWA cable stripping knife and gland spanners",
      "Cordless drill and SDS for cable runs"
    ],
    consumables: [
      "Twin & Earth cable (1.5mm², 2.5mm², 6mm², 10mm²)",
      "SWA cable for external runs",
      "Cable clips, trunking and conduit systems",
      "MCBs, RCBOs and consumer units",
      "Wago connectors and terminal blocks",
      "Cable glands and grommets"
    ],
    safetyEquipment: [
      "Voltage tester and proving unit",
      "Insulated tools (VDE approved)",
      "Safety boots and hard hat",
      "RCD plug tester",
      "Lock-off devices and safety signs",
      "First aid kit and emergency contacts"
    ]
  };

  const onsiteConsiderations = [
    {
      title: "Before Starting Work",
      points: [
        "Conduct thorough risk assessment",
        "Check existing installation condition",
        "Identify and test earthing arrangements",
        "Plan cable routes and access requirements",
        "Coordinate with other trades if applicable",
        "Ensure adequate lighting and ventilation"
      ]
    },
    {
      title: "During Installation", 
      points: [
        "Test circuits before energising",
        "Maintain earthing continuity throughout",
        "Protect cables from damage during installation",
        "Check connections are tight and secure",
        "Install appropriate circuit protection",
        "Document any deviations from original design"
      ]
    },
    {
      title: "Completion and Testing",
      points: [
        "Complete all required electrical tests",
        "Check RCD operation and timing",
        "Verify correct circuit labeling",
        "Test all outlets and switches for correct operation",
        "Complete electrical certificates",
        "Provide customer handover and explanation"
      ]
    }
  ];

  const bs7671Summary = [
    {
      section: "Part 1: Scope & Definitions",
      keyPoints: [
        "Applies to electrical installations up to 1000V AC/1500V DC",
        "Covers design, erection and verification of electrical installations",
        "Excludes automotive and marine applications",
        "Fundamental principles for safety"
      ]
    },
    {
      section: "Part 2: Definitions", 
      keyPoints: [
        "Circuit protective conductor (CPC)",
        "Skilled person - adequate technical knowledge",
        "Special locations - additional requirements",
        "RCD - residual current device"
      ]
    },
    {
      section: "Part 3: Assessment",
      keyPoints: [
        "Purpose and characteristics of installation",
        "External influences (environmental conditions)", 
        "Compatibility of equipment",
        "Maintainability and accessibility"
      ]
    },
    {
      section: "Part 4: Protection",
      keyPoints: [
        "Protection against electric shock (basic and fault protection)",
        "Protection against thermal effects",
        "Protection against overcurrent",
        "Protection against voltage disturbances"
      ]
    },
    {
      section: "Part 5: Selection & Erection",
      keyPoints: [
        "Equipment compliance and selection",
        "Wiring systems and cable installation", 
        "Protection and switching devices",
        "Earthing arrangements and bonding"
      ]
    },
    {
      section: "Part 6: Inspection & Testing",
      keyPoints: [
        "Initial verification requirements",
        "Schedule of test results",
        "Electrical Installation Certificate",
        "Periodic inspection and testing"
      ]
    },
    {
      section: "Part 7: Special Installations",
      keyPoints: [
        "Bathrooms and shower rooms (701)",
        "Swimming pools (702)",
        "Solar photovoltaic systems (712)",
        "Electric vehicle charging (722)"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-elec-yellow">
          Elec-Mate Installation Guidance
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Comprehensive electrical installation guidance for UK electricians. 
          Covering domestic, commercial, industrial and specialist installations with BS 7671 compliance.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      {/* Installation Type Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {installationTypes.map((installation) => (
          <Card key={installation.id} className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 via-elec-gray to-elec-dark/80">
            <CardHeader className="bg-elec-yellow/15 rounded-t-lg pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  {installation.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-elec-yellow text-lg md:text-xl">{installation.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">{installation.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              
              {/* Common Installation Types */}
              <div className="bg-elec-dark/40 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Common Installation Types
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {installation.commonTypes.map((type, index) => (
                    <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-elec-yellow">•</span>
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cable Types & Sizes Table */}
              <div className="bg-elec-dark/40 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Cable className="h-4 w-4 text-elec-yellow" />
                  Cable Types & Protection
                </h4>
                <div className="overflow-x-auto">
                  <div className="space-y-2">
                    {installation.cableTypes.map((cable, index) => (
                      <div key={index} className="bg-elec-dark/50 p-3 rounded border border-elec-yellow/20">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex-1">
                            <div className="font-medium text-white text-sm">{cable.application}</div>
                            <div className="text-xs text-muted-foreground">{cable.notes}</div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Badge variant="outline" className="text-xs border-elec-yellow text-elec-yellow">
                              {cable.cable}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                              {cable.protection}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Standards */}
              <div className="bg-elec-dark/40 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow" />
                  Installation Standards
                </h4>
                <ul className="space-y-1">
                  {installation.keyStandards.map((standard, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Award className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      {standard}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expandable Detailed Content */}
              <Collapsible 
                open={expandedSections[installation.id]} 
                onOpenChange={() => toggleSection(installation.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {expandedSections[installation.id] ? 'Hide' : 'Show'} Detailed Guidance
                    {expandedSections[installation.id] ? 
                      <ChevronUp className="h-4 w-4 ml-2" /> : 
                      <ChevronDown className="h-4 w-4 ml-2" />
                    }
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="bg-elec-dark/30 p-4 rounded-lg space-y-4">
                    <div>
                      <h5 className="font-medium text-elec-yellow mb-2">Planning Considerations</h5>
                      <p className="text-sm text-muted-foreground">{installation.detailedContent.planning}</p>
                    </div>
                    <Separator className="bg-elec-yellow/20" />
                    <div>
                      <h5 className="font-medium text-elec-yellow mb-2">Safety Procedures</h5>
                      <p className="text-sm text-muted-foreground">{installation.detailedContent.safety}</p>
                    </div>
                    <Separator className="bg-elec-yellow/20" />
                    <div>
                      <h5 className="font-medium text-elec-yellow mb-2">Certification & Compliance</h5>
                      <p className="text-sm text-muted-foreground">{installation.detailedContent.certification}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tools & Materials List */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Essential Tools & Materials</CardTitle>
          </div>
          <p className="text-muted-foreground">Complete toolkit requirements for professional electrical installations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-elec-dark/30 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4 text-elec-yellow" />
                Essential Tools
              </h4>
              <ul className="space-y-2">
                {toolsAndMaterials.essentialTools.map((tool, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-elec-dark/30 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Cable className="h-4 w-4 text-elec-yellow" />
                Consumables
              </h4>
              <ul className="space-y-2">
                {toolsAndMaterials.consumables.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-elec-dark/30 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-elec-yellow" />
                Safety Equipment
              </h4>
              <ul className="space-y-2">
                {toolsAndMaterials.safetyEquipment.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onsite Considerations */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Onsite Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Critical factors for safe and professional installation work</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {onsiteConsiderations.map((section, index) => (
              <div key={index} className="bg-elec-dark/30 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* BS 7671 Summary Reference */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">BS 7671 Quick Reference</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential sections of the 18th Edition Wiring Regulations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {bs7671Summary.map((part, index) => (
              <div key={index} className="bg-elec-dark/30 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-3">{part.section}</h4>
                <ul className="space-y-1">
                  {part.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow text-xs mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Important Safety Notice</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Always follow BS 7671:2018+A2:2022 requirements.</strong> All electrical installation work must be carried out by competent persons with appropriate qualifications and experience.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Part P Building Regulations:</strong> Notify Building Control or use a registered competent person scheme for notifiable work in dwellings.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-300">Testing and Certification:</strong> Complete all required electrical tests and provide appropriate certification upon completion of work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationGuides;
