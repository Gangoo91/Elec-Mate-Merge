
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sun,
  Zap,
  AlertTriangle,
  CheckCircle,
  Shield,
  ArrowRight,
  Battery,
  Gauge,
  Cable,
  Lightbulb,
  FileCheck,
  Building2,
  Flame,
  Award,
  BadgePoundSterling,
  Clock,
  ThermometerSun,
  Wrench,
  Grid3X3,
  CircuitBoard,
  PlugZap
} from "lucide-react";

const SolarPVGuide = () => {
  const howSolarWorks = {
    title: "How Solar PV Systems Work",
    stages: [
      {
        stage: 1,
        title: "DC Generation",
        icon: Sun,
        color: "yellow",
        description: "Solar panels convert sunlight into DC (Direct Current) electricity through the photovoltaic effect",
        details: [
          "Photons from sunlight strike silicon cells in the panel",
          "Electrons are released, creating an electrical current",
          "Each panel typically produces 300-450W at peak output",
          "Output varies with irradiance (sunlight intensity), temperature, and shading",
          "Panels are connected in series (strings) to increase voltage"
        ]
      },
      {
        stage: 2,
        title: "DC to AC Conversion",
        icon: CircuitBoard,
        color: "orange",
        description: "Inverters convert DC electricity from the panels to AC electricity for use in the property",
        details: [
          "Inverters convert DC to 230V AC at 50Hz",
          "Maximum Power Point Tracking (MPPT) optimizes panel output",
          "Monitors system performance and provides data",
          "Includes anti-islanding protection for grid safety",
          "Typical efficiency: 96-98%"
        ]
      },
      {
        stage: 3,
        title: "Distribution & Use",
        icon: PlugZap,
        color: "green",
        description: "AC electricity is used in the property or exported to the grid",
        details: [
          "Solar electricity feeds into the consumer unit",
          "Property loads use solar power first (self-consumption)",
          "Excess generation exports to the grid",
          "Generation meter records total output",
          "Smart meter can record import and export separately"
        ]
      },
      {
        stage: 4,
        title: "Grid Connection",
        icon: Grid3X3,
        color: "blue",
        description: "Connection to the grid allows export of excess electricity and import when needed",
        details: [
          "G98/G99 regulations govern grid connection",
          "DNO notification required for all installations",
          "Anti-islanding prevents export during power cuts",
          "Smart Export Guarantee (SEG) provides payment for exports",
          "Grid voltage and frequency monitoring required"
        ]
      }
    ]
  };

  const systemComponents = [
    {
      component: "Solar Panels (Modules)",
      description: "Convert sunlight to DC electricity",
      specifications: [
        "Monocrystalline: Higher efficiency (19-22%), more expensive",
        "Polycrystalline: Lower efficiency (15-17%), more affordable",
        "Typical power: 300-450W per panel",
        "Voltage: 30-50V DC per panel",
        "25-30 year performance warranty typical"
      ],
      installation: [
        "Mounting angle typically 30-40 degrees in UK",
        "South-facing orientation optimal (East/West acceptable)",
        "Avoid shading from trees, chimneys, aerials",
        "Secure fixing to roof structure",
        "Weather-proof cable entry points"
      ]
    },
    {
      component: "Inverters",
      description: "Convert DC to AC for use in property",
      specifications: [
        "String inverters: One inverter for entire array",
        "Micro-inverters: One per panel (shade tolerant)",
        "Hybrid inverters: Include battery charging capability",
        "Power rating matched to array size",
        "Typical lifespan: 10-15 years"
      ],
      installation: [
        "Mount in cool, ventilated location",
        "Accessible for maintenance and monitoring",
        "Protected from direct sunlight and rain",
        "Clear working space around unit",
        "Close to consumer unit to minimize AC cable runs"
      ]
    },
    {
      component: "DC Isolators",
      description: "Safely isolate DC supply for maintenance",
      specifications: [
        "Rated for DC voltage and current",
        "Load-break capability under fault conditions",
        "IP65 or higher for external mounting",
        "Clearly labeled with warning notices",
        "Fire-resistant enclosure where required"
      ],
      installation: [
        "Rooftop isolator within 2m of array",
        "Inverter input isolator for safe maintenance",
        "Accessible but secure from unauthorized operation",
        "Labeled with system voltage and isolation procedure",
        "Firefighter switch at ground level (where required)"
      ]
    },
    {
      component: "AC Isolator",
      description: "Isolate inverter output from consumer unit",
      specifications: [
        "Standard AC isolator rated for inverter output",
        "Double-pole isolation required",
        "Located adjacent to inverter",
        "Lockable for maintenance safety",
        "Clearly labeled"
      ],
      installation: [
        "Between inverter and consumer unit",
        "Accessible for maintenance",
        "Secure from accidental operation",
        "Part of safe isolation procedure"
      ]
    },
    {
      component: "Generation Meter",
      description: "Records total electricity generated",
      specifications: [
        "MID-approved meter required for SEG",
        "Records kWh generation",
        "May be integral to inverter",
        "Separate meter required for FiT claims",
        "Smart meter compatibility"
      ],
      installation: [
        "Connected to inverter AC output",
        "Accessible for meter readings",
        "Protected from tampering",
        "Clear labeling"
      ]
    }
  ];

  const dcSafetyConsiderations = [
    {
      hazard: "DC Arc Faults",
      severity: "Critical",
      description: "DC arcs are more dangerous than AC as they don't self-extinguish at zero crossing",
      risks: [
        "Fire hazard from sustained arcing",
        "Difficult to detect and extinguish",
        "Can occur at loose connections or damaged cables",
        "Arc temperatures can exceed 3000C"
      ],
      mitigations: [
        "Use correctly rated DC connectors (MC4 type)",
        "Proper cable crimping and connection techniques",
        "Arc Fault Circuit Interrupter (AFCI) in inverter",
        "Regular inspection of connections",
        "Proper cable management and support"
      ]
    },
    {
      hazard: "Always Live When Illuminated",
      severity: "Critical",
      description: "Solar panels generate electricity whenever exposed to light - cannot be switched off",
      risks: [
        "Shock hazard during installation and maintenance",
        "Combined string voltages can exceed 600V DC",
        "Lethal current potential even at low light levels",
        "Traditional isolation methods ineffective"
      ],
      mitigations: [
        "Cover panels during work if possible",
        "Work during low light (dawn/dusk) when practical",
        "Use insulated tools rated for DC voltage",
        "Treat all conductors as live",
        "Never disconnect under load"
      ]
    },
    {
      hazard: "High DC Voltage",
      severity: "High",
      description: "String voltages can reach 600V DC or higher in series configurations",
      risks: [
        "Lethal shock potential",
        "Different physiological effect to AC",
        "Harder to 'let go' with DC shock",
        "Burns from arcing"
      ],
      mitigations: [
        "System design limits maximum voltage (typically <600V DC)",
        "DC-rated PPE (gloves, footwear)",
        "DC-rated test equipment",
        "Safe working procedures",
        "Training in DC safety"
      ]
    },
    {
      hazard: "Reverse Polarity",
      severity: "Medium",
      description: "Incorrect polarity can damage equipment and create hazards",
      risks: [
        "Inverter damage",
        "Component failure",
        "Potential fire risk",
        "Reduced system lifespan"
      ],
      mitigations: [
        "Careful labeling of positive and negative",
        "Polarity checks before connection",
        "Proper connector types prevent reversal",
        "Testing before commissioning"
      ]
    }
  ];

  const stringSizing = {
    title: "String Sizing & Configuration",
    principles: [
      {
        principle: "Maximum String Voltage",
        description: "Total string voltage must not exceed inverter maximum input voltage",
        calculation: "Voc (at lowest temp) x Number of panels < Inverter Vmax",
        notes: [
          "Use coldest expected temperature for voltage calculation",
          "Temperature coefficient increases Voc in cold weather",
          "Typical UK: use -10C for calculations",
          "Safety margin recommended (e.g., 90% of max)"
        ]
      },
      {
        principle: "Minimum String Voltage",
        description: "String must produce enough voltage for inverter MPPT operation",
        calculation: "Vmp (at highest temp) x Number of panels > Inverter Vmin",
        notes: [
          "Use hottest expected temperature",
          "Voltage drops with increasing temperature",
          "Ensure adequate voltage for MPPT tracking",
          "Consider 60C module temperature in summer"
        ]
      },
      {
        principle: "String Current",
        description: "Each string current must not exceed inverter MPPT input current",
        calculation: "Isc x 1.25 < Inverter MPPT Imax",
        notes: [
          "Apply 1.25 safety factor per BS 7671",
          "Match strings for balanced operation",
          "Consider cable current rating"
        ]
      },
      {
        principle: "Power Matching",
        description: "Total DC array power matched to inverter rating",
        calculation: "Typically 1.0-1.2 DC:AC ratio",
        notes: [
          "Slight oversizing can improve yield",
          "Inverter will clip excess power",
          "Consider shading and orientation losses",
          "MCS guidance on sizing ratios"
        ]
      }
    ],
    configurations: [
      {
        type: "Series String",
        description: "Panels connected end-to-end, voltages add up",
        advantages: ["Higher voltage, lower current", "Reduced cable losses", "Fewer MPPT inputs needed"],
        disadvantages: ["Shading affects entire string", "All panels must match", "Limited flexibility"]
      },
      {
        type: "Parallel Strings",
        description: "Multiple strings connected in parallel to inverter",
        advantages: ["Better shade tolerance", "Design flexibility", "Redundancy"],
        disadvantages: ["Higher currents", "More complex wiring", "Blocking diodes may be needed"]
      },
      {
        type: "Micro-Inverter System",
        description: "Each panel has its own inverter",
        advantages: ["Maximum shade tolerance", "Panel-level monitoring", "Flexible design", "No DC high voltage"],
        disadvantages: ["Higher cost", "More installation complexity", "Multiple failure points"]
      }
    ]
  };

  const inverterTypes = [
    {
      type: "String Inverter",
      description: "Single inverter handles entire array or multiple strings",
      bestFor: "Unshaded roofs with consistent orientation",
      power: "3kW - 10kW typical domestic",
      efficiency: "96-98%",
      pros: ["Cost effective", "Simple installation", "Easy to service", "Proven technology"],
      cons: ["String-level shading impact", "Single point of failure", "Less design flexibility"]
    },
    {
      type: "Micro-Inverters",
      description: "Small inverter attached to each panel",
      bestFor: "Complex roofs, partial shading, multiple orientations",
      power: "250W - 500W per unit",
      efficiency: "95-97%",
      pros: ["Panel-level optimization", "Shade tolerant", "Modular expansion", "Panel-level monitoring"],
      cons: ["Higher upfront cost", "Multiple roof penetrations/units", "More complex maintenance"]
    },
    {
      type: "Power Optimizers + Inverter",
      description: "DC optimizers on each panel with central inverter",
      bestFor: "Compromise between string and micro-inverter systems",
      power: "Variable per optimizer",
      efficiency: "97-99%",
      pros: ["Panel-level MPPT", "Central inverter simplicity", "Rapid shutdown capability", "Good monitoring"],
      cons: ["Additional hardware cost", "Two-stage conversion", "Compatibility requirements"]
    },
    {
      type: "Hybrid Inverter",
      description: "Combines solar inverter with battery charger/inverter",
      bestFor: "Systems with battery storage or planned future storage",
      power: "3kW - 10kW typical",
      efficiency: "95-97%",
      pros: ["Integrated battery management", "Backup power capability", "Single unit solution", "Future-proof"],
      cons: ["Higher cost", "More complex", "Battery compatibility requirements"]
    }
  ];

  const installationBestPractices = [
    {
      category: "Roof Assessment",
      icon: Building2,
      practices: [
        "Survey roof structure and condition before installation",
        "Check roof orientation and pitch angle",
        "Identify shading from chimneys, trees, nearby buildings",
        "Assess roof loading capacity with structural engineer if needed",
        "Consider future tree growth and building development",
        "Check for asbestos in older roof materials"
      ]
    },
    {
      category: "Cable Installation",
      icon: Cable,
      practices: [
        "Use UV-resistant DC cables for external runs",
        "Maintain cable segregation from other services",
        "Support cables at regular intervals (max 300mm for external)",
        "Use appropriate cable entry points and glands",
        "Label all cables clearly (positive, negative, string ID)",
        "Route away from heat sources and moving parts"
      ]
    },
    {
      category: "Mounting Systems",
      icon: Grid3X3,
      practices: [
        "Use MCS-certified mounting systems",
        "Follow manufacturer's installation instructions",
        "Ensure appropriate fixings for roof type",
        "Maintain adequate ventilation gap under panels",
        "Seal all roof penetrations properly",
        "Consider wind and snow loading requirements"
      ]
    },
    {
      category: "Electrical Connections",
      icon: Zap,
      practices: [
        "Use correctly rated MC4 or equivalent connectors",
        "Check polarity before connection",
        "Apply correct torque to all terminals",
        "Protect connections from water ingress",
        "Maintain minimum bending radius for cables",
        "Document all connections and string configurations"
      ]
    }
  ];

  const roofAccessFireSafety = {
    title: "Roof Access & Fire Safety Considerations",
    accessRequirements: [
      "Maintain 1m clear zone at ridge for firefighter access",
      "Consider access paths between panel arrays",
      "Ensure roof loading allows for maintenance access",
      "Plan for safe access equipment requirements",
      "Document access procedures for maintenance"
    ],
    fireSafety: [
      {
        concern: "Firefighter Safety",
        description: "Emergency services need to safely access and work on roofs with PV",
        measures: [
          "Firefighter emergency switch at ground level (where required)",
          "Clear labeling of all isolators and their function",
          "Panel layout allows access paths",
          "Documentation provided to fire service if requested",
          "Consider rapid shutdown systems for larger installations"
        ]
      },
      {
        concern: "Fire Spread Prevention",
        description: "PV systems must not contribute to fire spread",
        measures: [
          "Maintain gaps between modules and roof edges",
          "Use fire-resistant cable types where required",
          "DC isolators in fire-resistant enclosures",
          "Arc fault detection in inverter",
          "Regular inspection of connections"
        ]
      },
      {
        concern: "Electrical Fire Risk",
        description: "DC systems present unique fire risks",
        measures: [
          "Properly rated DC equipment",
          "Correct cable sizing and protection",
          "Quality connectors and installation",
          "AFCI protection where available",
          "Thermal monitoring where practical"
        ]
      }
    ]
  };

  const mcsCertification = {
    title: "MCS Certification Requirements",
    overview: "MCS (Microgeneration Certification Scheme) is required for customers to access the Smart Export Guarantee (SEG) and other incentives",
    installerRequirements: [
      {
        requirement: "Competent Person Scheme Membership",
        description: "Full scope electrical registration with NAPIT, NICEIC, ELECSA, etc."
      },
      {
        requirement: "MCS Contractor Certification",
        description: "Specific certification for PV installation through MCS-approved body"
      },
      {
        requirement: "Training Requirements",
        description: "Completion of approved PV installation training course"
      },
      {
        requirement: "Insurance Requirements",
        description: "Appropriate Professional Indemnity and Public Liability insurance"
      },
      {
        requirement: "Annual Surveillance",
        description: "Annual audits and ongoing compliance monitoring"
      }
    ],
    installationRequirements: [
      "Design to MCS standards (MIS 3002 for PV)",
      "Use MCS-certified products where required",
      "Complete MCS documentation package",
      "System performance estimation per MCS methodology",
      "Handover documentation to customer",
      "Register installation on MCS database"
    ]
  };

  const gridConnection = {
    title: "G98/G99 Grid Connection Requirements",
    g98: {
      name: "G98",
      applies: "Single phase up to 16A per phase (3.68kW), Three phase up to 16A per phase (11.04kW)",
      process: [
        "Notification only - no application required",
        "Notify DNO within 28 days of commissioning",
        "Use DN01 notification form",
        "DNO acknowledgment typically within 10 working days",
        "No waiting period before energization"
      ],
      requirements: [
        "Inverter must be G98 Type Tested",
        "Protection settings as per G98",
        "Anti-islanding protection",
        "Comply with Engineering Recommendation G98"
      ]
    },
    g99: {
      name: "G99",
      applies: "Larger systems above G98 limits, multiple generators, export limiting required",
      process: [
        "Application to DNO required before installation",
        "May require network study",
        "DNO response within 45 working days (standard) or 65 working days (full study)",
        "May require network reinforcement at customer's cost",
        "Commissioning witnessed by DNO may be required"
      ],
      requirements: [
        "Inverter must be G99 Type Tested",
        "Protection relay settings agreed with DNO",
        "Witness testing may be required",
        "Ongoing compliance and protection testing"
      ]
    }
  };

  const testingRequirements = {
    dcSide: [
      { test: "Open Circuit Voltage (Voc)", description: "Measure voltage of each string with no load", acceptable: "Within 5% of expected value" },
      { test: "Short Circuit Current (Isc)", description: "Measure current capacity of each string", acceptable: "Within 10% of expected value" },
      { test: "Polarity Check", description: "Confirm correct polarity of all connections", acceptable: "Correct polarity confirmed" },
      { test: "Insulation Resistance (DC)", description: "IR between conductors and earth", acceptable: "Minimum 1M ohm per kV of system voltage" },
      { test: "Continuity of Earthing", description: "Verify protective earth connections", acceptable: "Low resistance, continuous path" },
      { test: "Visual Inspection", description: "Check for damage, correct installation", acceptable: "No defects, compliant installation" }
    ],
    acSide: [
      { test: "Continuity of Protective Conductors", description: "R1+R2 for AC circuit", acceptable: "Less than measured values" },
      { test: "Insulation Resistance (AC)", description: "Between live conductors and earth", acceptable: "Minimum 1M ohm" },
      { test: "Polarity", description: "Verify L, N, E connections", acceptable: "Correct polarity confirmed" },
      { test: "Earth Fault Loop Impedance (Zs)", description: "Verify protective device operation", acceptable: "Less than maximum for protective device" },
      { test: "RCD Operation", description: "Test RCD on AC circuit", acceptable: "Trip time within limits" },
      { test: "Functional Testing", description: "System operation and monitoring", acceptable: "System generates and exports correctly" }
    ],
    documentation: [
      "Electrical Installation Certificate (EIC) for AC installation",
      "MCS Certificate for the PV system",
      "G98/G99 notification/acceptance",
      "Commissioning checklist completed",
      "System performance test results",
      "Handover documentation package"
    ]
  };

  const smartExportGuarantee = {
    title: "Smart Export Guarantee (SEG)",
    description: "Government scheme requiring licensed electricity suppliers to offer tariffs for small-scale low-carbon generation export",
    eligibility: [
      "Installation must be MCS certified",
      "Generation meter must be MID-approved",
      "Smart meter capable of recording export (or export meter)",
      "System size up to 5MW",
      "Valid G98/G99 compliance"
    ],
    process: [
      "Complete MCS-certified installation",
      "Obtain MCS Certificate",
      "Apply to chosen SEG licensee (supplier)",
      "Provide MCS Certificate and meter details",
      "Receive confirmation and start exporting"
    ],
    rates: "Export rates vary by supplier - typically 3p to 15p per kWh (check current rates)",
    suppliers: [
      "Octopus Energy",
      "EDF",
      "E.ON",
      "British Gas",
      "Scottish Power",
      "Many others - compare rates"
    ]
  };

  const batteryIntegration = {
    title: "Battery Storage Integration Basics",
    benefits: [
      "Store excess solar generation for later use",
      "Increase self-consumption ratio",
      "Backup power during outages (if configured)",
      "Time-of-use tariff optimization",
      "Reduce grid demand charges"
    ],
    types: [
      {
        type: "AC-Coupled",
        description: "Separate battery inverter connected to AC side",
        pros: ["Works with existing PV systems", "Flexible placement", "Independent sizing"],
        cons: ["Additional inverter losses", "More complex wiring", "Higher cost"]
      },
      {
        type: "DC-Coupled",
        description: "Battery connected to DC side of hybrid inverter",
        pros: ["Higher efficiency", "Simpler system", "Single inverter"],
        cons: ["Hybrid inverter required", "Less flexible", "Sizing interdependence"]
      }
    ],
    considerations: [
      "Battery capacity matched to usage patterns",
      "Depth of discharge affects lifespan",
      "Round-trip efficiency typically 85-95%",
      "Installation location (temperature, ventilation)",
      "Additional certification may be required",
      "G98/G99 implications for larger systems"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-yellow-500/30 bg-yellow-500/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sun className="h-8 w-8 text-yellow-400" />
            <div>
              <CardTitle className="text-yellow-300 text-2xl">Solar PV Installation Guide</CardTitle>
              <p className="text-yellow-200/80">BS 7671 Section 712 - Comprehensive guide for UK electricians</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
              <Award className="h-5 w-5 text-yellow-400 mb-2" />
              <p className="text-xs text-white">Certification Required</p>
              <p className="text-sm font-medium text-white">MCS Certified</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
              <FileCheck className="h-5 w-5 text-yellow-400 mb-2" />
              <p className="text-xs text-white">Grid Connection</p>
              <p className="text-sm font-medium text-white">G98/G99</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
              <BadgePoundSterling className="h-5 w-5 text-yellow-400 mb-2" />
              <p className="text-xs text-white">Export Payment</p>
              <p className="text-sm font-medium text-white">SEG Available</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
              <Clock className="h-5 w-5 text-yellow-400 mb-2" />
              <p className="text-xs text-white">Typical Install</p>
              <p className="text-sm font-medium text-white">1-2 Days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Safety Warning */}
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <AlertDescription className="text-red-200">
          <strong className="text-red-300">CRITICAL DC SAFETY WARNING:</strong> Solar panels generate DC electricity whenever
          exposed to light and cannot be switched off. Combined string voltages can exceed 600V DC. Always treat all DC
          conductors as LIVE. DC shocks are more difficult to release from than AC. Use appropriate PPE and follow safe
          working practices at all times.
        </AlertDescription>
      </Alert>

      {/* How Solar PV Works */}
      <Card className="border-yellow-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">{howSolarWorks.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {howSolarWorks.stages.map((stage, idx) => (
            <div key={idx} className="relative">
              <div className={`p-4 rounded-lg border bg-${stage.color}-500/10 border-${stage.color}-500/30`}>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${stage.color}-500/20 border border-${stage.color}-500/40 flex items-center justify-center`}>
                    <stage.icon className={`h-6 w-6 text-${stage.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`border-${stage.color}-400 text-${stage.color}-300`}>
                        Stage {stage.stage}
                      </Badge>
                      <h4 className="font-medium text-white">{stage.title}</h4>
                    </div>
                    <p className={`text-sm text-${stage.color}-200 mb-3`}>{stage.description}</p>
                    <ul className="space-y-1">
                      {stage.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="text-xs text-white flex items-start gap-2">
                          <ArrowRight className={`h-3 w-3 text-${stage.color}-400 mt-0.5 flex-shrink-0`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {idx < howSolarWorks.stages.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="h-5 w-5 text-yellow-400 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Components */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">System Components</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="panels" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="panels">Panels</TabsTrigger>
              <TabsTrigger value="inverters">Inverters</TabsTrigger>
              <TabsTrigger value="dc-isolators">DC Isolators</TabsTrigger>
              <TabsTrigger value="ac-isolator">AC Isolator</TabsTrigger>
              <TabsTrigger value="meter">Meter</TabsTrigger>
            </TabsList>
            {systemComponents.map((component, idx) => (
              <TabsContent key={idx} value={component.component.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')} className="space-y-4">
                <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                  <h4 className="font-medium text-white mb-2">{component.component}</h4>
                  <p className="text-sm text-orange-200 mb-4">{component.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-white text-sm mb-2">Specifications</h5>
                      <ul className="space-y-1">
                        {component.specifications.map((spec, specIdx) => (
                          <li key={specIdx} className="text-xs text-white flex items-start gap-2">
                            <Gauge className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-white text-sm mb-2">Installation Notes</h5>
                      <ul className="space-y-1">
                        {component.installation.map((note, noteIdx) => (
                          <li key={noteIdx} className="text-xs text-white flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* DC Safety Considerations */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">DC Safety Considerations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {dcSafetyConsiderations.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${item.severity === 'Critical' ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{item.hazard}</h4>
                <Badge variant="outline" className={item.severity === 'Critical' ? 'border-red-400 text-red-300' : 'border-orange-400 text-orange-300'}>
                  {item.severity}
                </Badge>
              </div>
              <p className={`text-sm ${item.severity === 'Critical' ? 'text-red-200' : 'text-orange-200'} mb-3`}>{item.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-red-200 text-sm mb-2">Risks</h5>
                  <ul className="space-y-1">
                    {item.risks.map((risk, riskIdx) => (
                      <li key={riskIdx} className="text-xs text-white flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-200 text-sm mb-2">Mitigations</h5>
                  <ul className="space-y-1">
                    {item.mitigations.map((mitigation, mitIdx) => (
                      <li key={mitIdx} className="text-xs text-white flex items-start gap-2">
                        <Shield className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {mitigation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* String Sizing */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">{stringSizing.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {stringSizing.principles.map((principle, idx) => (
              <div key={idx} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-blue-200 mb-2">{principle.principle}</h4>
                <p className="text-sm text-white mb-2">{principle.description}</p>
                <code className="block bg-blue-900/50 p-2 rounded text-xs text-blue-200 mb-3">{principle.calculation}</code>
                <ul className="space-y-1">
                  {principle.notes.map((note, noteIdx) => (
                    <li key={noteIdx} className="text-xs text-white flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-white mb-4">Configuration Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stringSizing.configurations.map((config, idx) => (
                <div key={idx} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                  <h5 className="font-medium text-blue-200 mb-2">{config.type}</h5>
                  <p className="text-xs text-white mb-3">{config.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-green-400">Advantages:</span>
                      <ul className="space-y-0.5 mt-1">
                        {config.advantages.map((adv, advIdx) => (
                          <li key={advIdx} className="text-xs text-white">+ {adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs text-red-400">Disadvantages:</span>
                      <ul className="space-y-0.5 mt-1">
                        {config.disadvantages.map((dis, disIdx) => (
                          <li key={disIdx} className="text-xs text-white">- {dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inverter Types */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Inverter Selection Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inverterTypes.map((inverter, idx) => (
              <div key={idx} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-medium text-purple-200 mb-1">{inverter.type}</h4>
                <p className="text-xs text-white mb-2">{inverter.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                    {inverter.power}
                  </Badge>
                  <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                    {inverter.efficiency} efficiency
                  </Badge>
                </div>

                <p className="text-xs text-purple-200 mb-2"><strong>Best for:</strong> {inverter.bestFor}</p>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-green-400">Pros:</span>
                    <ul className="space-y-0.5 mt-1">
                      {inverter.pros.map((pro, proIdx) => (
                        <li key={proIdx} className="text-xs text-white">+ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs text-red-400">Cons:</span>
                    <ul className="space-y-0.5 mt-1">
                      {inverter.cons.map((con, conIdx) => (
                        <li key={conIdx} className="text-xs text-white">- {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Installation Best Practices */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Installation Best Practices</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {installationBestPractices.map((category, idx) => (
              <div key={idx} className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <category.icon className="h-5 w-5 text-green-400" />
                  <h4 className="font-medium text-green-200">{category.category}</h4>
                </div>
                <ul className="space-y-2">
                  {category.practices.map((practice, practiceIdx) => (
                    <li key={practiceIdx} className="text-xs text-white flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fire Safety */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">{roofAccessFireSafety.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <h4 className="font-medium text-amber-200 mb-2">Roof Access Requirements</h4>
            <ul className="space-y-1">
              {roofAccessFireSafety.accessRequirements.map((req, idx) => (
                <li key={idx} className="text-sm text-white flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {roofAccessFireSafety.fireSafety.map((item, idx) => (
            <div key={idx} className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <h4 className="font-medium text-red-200 mb-2">{item.concern}</h4>
              <p className="text-sm text-white mb-3">{item.description}</p>
              <ul className="space-y-1">
                {item.measures.map((measure, measureIdx) => (
                  <li key={measureIdx} className="text-xs text-white flex items-start gap-2">
                    <Shield className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                    {measure}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* MCS Certification */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">{mcsCertification.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500/50 bg-green-500/10">
            <Award className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-sm">
              {mcsCertification.overview}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-200 mb-3">Installer Requirements</h4>
              <ul className="space-y-2">
                {mcsCertification.installerRequirements.map((req, idx) => (
                  <li key={idx} className="text-sm text-white">
                    <strong className="text-green-300">{req.requirement}:</strong>
                    <span className="block text-xs text-white mt-1">{req.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-200 mb-3">Installation Requirements</h4>
              <ul className="space-y-1">
                {mcsCertification.installationRequirements.map((req, idx) => (
                  <li key={idx} className="text-sm text-white flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* G98/G99 Grid Connection */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">{gridConnection.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <Badge variant="outline" className="border-green-400 text-green-300 mb-3">
                {gridConnection.g98.name}
              </Badge>
              <p className="text-sm text-green-200 mb-3"><strong>Applies to:</strong> {gridConnection.g98.applies}</p>

              <h5 className="font-medium text-white text-sm mb-2">Process</h5>
              <ul className="space-y-1 mb-3">
                {gridConnection.g98.process.map((step, idx) => (
                  <li key={idx} className="text-xs text-white">{idx + 1}. {step}</li>
                ))}
              </ul>

              <h5 className="font-medium text-white text-sm mb-2">Requirements</h5>
              <ul className="space-y-1">
                {gridConnection.g98.requirements.map((req, idx) => (
                  <li key={idx} className="text-xs text-white flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <Badge variant="outline" className="border-amber-400 text-amber-300 mb-3">
                {gridConnection.g99.name}
              </Badge>
              <p className="text-sm text-amber-200 mb-3"><strong>Applies to:</strong> {gridConnection.g99.applies}</p>

              <h5 className="font-medium text-white text-sm mb-2">Process</h5>
              <ul className="space-y-1 mb-3">
                {gridConnection.g99.process.map((step, idx) => (
                  <li key={idx} className="text-xs text-white">{idx + 1}. {step}</li>
                ))}
              </ul>

              <h5 className="font-medium text-white text-sm mb-2">Requirements</h5>
              <ul className="space-y-1">
                {gridConnection.g99.requirements.map((req, idx) => (
                  <li key={idx} className="text-xs text-white flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Requirements */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gauge className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">Testing Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dc" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dc">DC Side Tests</TabsTrigger>
              <TabsTrigger value="ac">AC Side Tests</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="dc" className="space-y-3">
              {testingRequirements.dcSide.map((test, idx) => (
                <div key={idx} className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-cyan-200 text-sm">{test.test}</h5>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                      {test.acceptable}
                    </Badge>
                  </div>
                  <p className="text-xs text-white">{test.description}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="ac" className="space-y-3">
              {testingRequirements.acSide.map((test, idx) => (
                <div key={idx} className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-cyan-200 text-sm">{test.test}</h5>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                      {test.acceptable}
                    </Badge>
                  </div>
                  <p className="text-xs text-white">{test.description}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="docs" className="space-y-2">
              {testingRequirements.documentation.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-cyan-500/10 rounded border border-cyan-500/20">
                  <FileCheck className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-white">{doc}</span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Smart Export Guarantee */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BadgePoundSterling className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">{smartExportGuarantee.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white">{smartExportGuarantee.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-200 mb-3">Eligibility</h4>
              <ul className="space-y-1">
                {smartExportGuarantee.eligibility.map((item, idx) => (
                  <li key={idx} className="text-sm text-white flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-200 mb-3">Application Process</h4>
              <ul className="space-y-1">
                {smartExportGuarantee.process.map((step, idx) => (
                  <li key={idx} className="text-sm text-white">{idx + 1}. {step}</li>
                ))}
              </ul>
            </div>
          </div>

          <Alert className="border-green-500/50 bg-green-500/10">
            <BadgePoundSterling className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-sm">
              <strong>Current Rates:</strong> {smartExportGuarantee.rates}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Battery Storage Integration */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Battery className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{batteryIntegration.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Benefits of Battery Storage</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {batteryIntegration.benefits.map((benefit, idx) => (
                <li key={idx} className="text-sm text-white flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {batteryIntegration.types.map((type, idx) => (
              <div key={idx} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-medium text-purple-200 mb-2">{type.type}</h4>
                <p className="text-xs text-white mb-3">{type.description}</p>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-green-400">Pros:</span>
                    <ul className="space-y-0.5 mt-1">
                      {type.pros.map((pro, proIdx) => (
                        <li key={proIdx} className="text-xs text-white">+ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs text-red-400">Cons:</span>
                    <ul className="space-y-0.5 mt-1">
                      {type.cons.map((con, conIdx) => (
                        <li key={conIdx} className="text-xs text-white">- {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Key Considerations</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {batteryIntegration.considerations.map((item, idx) => (
                <li key={idx} className="text-sm text-white flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-purple-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Final Important Notice */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <AlertDescription className="text-amber-200">
          <strong className="text-amber-300">Remember:</strong> Solar PV installation requires MCS certification for customers
          to access the Smart Export Guarantee. Always follow manufacturer guidelines, MCS standards (MIS 3002), and BS 7671
          Section 712 requirements. Ensure proper training in DC safety before working on solar PV systems.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SolarPVGuide;
