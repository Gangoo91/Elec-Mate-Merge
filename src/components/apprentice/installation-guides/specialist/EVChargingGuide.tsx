
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Zap,
  AlertTriangle,
  CheckCircle,
  Shield,
  Cable,
  Gauge,
  Building2,
  Home,
  Users,
  Award,
  BadgePoundSterling,
  Clock,
  Wrench,
  PlugZap,
  Settings,
  FileCheck,
  Lightbulb,
  CircuitBoard,
  ThermometerSun,
  Loader,
  Timer,
  Power,
  Globe
} from "lucide-react";

const EVChargingGuide = () => {
  const chargingModes = [
    {
      mode: "Mode 1",
      name: "Domestic Socket Charging",
      icon: Power,
      color: "red",
      description: "Direct connection to standard domestic socket - NOT RECOMMENDED IN UK",
      power: "Up to 3kW (13A)",
      connectorType: "Standard 3-pin plug",
      safety: "Minimal protection - relies on domestic circuit protection only",
      use: "Emergency use only - significant fire and shock risk",
      ukStatus: "Not recommended and potentially dangerous",
      details: [
        "No dedicated EV protection",
        "Risk of overheating domestic sockets",
        "Continuous high load not suitable for domestic circuits",
        "No communication between vehicle and supply",
        "Extended charging times (24+ hours for full charge)"
      ]
    },
    {
      mode: "Mode 2",
      name: "Portable EVSE with In-Cable Control",
      icon: Cable,
      color: "yellow",
      description: "Portable charger with in-cable control box (ICCB) connected to domestic socket",
      power: "Up to 3kW (typically limited to 10A = 2.3kW for safety)",
      connectorType: "3-pin plug to Type 1 or Type 2",
      safety: "ICCB provides RCD protection, temperature monitoring, earth monitoring",
      use: "Temporary/emergency charging, granny charger",
      ukStatus: "Acceptable for occasional use with limitations",
      details: [
        "In-cable control device (ICCB) provides protection",
        "RCD and earth monitoring included",
        "Temperature monitoring for cable and plug",
        "Communication with vehicle for safe charging",
        "Slower than dedicated charger but safer than Mode 1"
      ]
    },
    {
      mode: "Mode 3",
      name: "Dedicated AC Charging Station",
      icon: PlugZap,
      color: "green",
      description: "Dedicated wall-mounted or post-mounted AC charging point with control pilot",
      power: "3.6kW to 22kW (single or three-phase)",
      connectorType: "Type 2 (standard in UK/EU)",
      safety: "Full protection: RCD, earth monitoring, PE continuity, temperature monitoring",
      use: "Standard domestic, workplace, and destination charging",
      ukStatus: "Recommended standard for permanent installations",
      details: [
        "Dedicated circuit with appropriate protection",
        "Control pilot communication for safe charging",
        "Load balancing capability for multiple chargers",
        "Smart charging features available",
        "Most common installation type in UK"
      ]
    },
    {
      mode: "Mode 4",
      name: "DC Fast Charging",
      icon: Zap,
      color: "blue",
      description: "High-power DC charging with charger-integrated conversion",
      power: "50kW to 350kW+",
      connectorType: "CCS, CHAdeMO, Tesla Supercharger",
      safety: "Extensive safety systems, liquid cooling, isolation monitoring",
      use: "Public rapid charging, en-route charging",
      ukStatus: "Commercial/public installations only - specialist work",
      details: [
        "DC conversion happens in the charger, not the vehicle",
        "Very high currents require specialist installation",
        "Three-phase supply typically required",
        "Complex protection and monitoring systems",
        "Usually requires DNO application and network reinforcement"
      ]
    }
  ];

  const chargerTypes = [
    {
      type: "3.6kW Single Phase",
      current: "16A",
      voltage: "230V",
      typicalUse: "Entry-level home charger, budget option",
      chargeTime: "10-14 hours (40kWh battery)",
      cable: "2.5mm² typical, 4mm² for longer runs",
      protection: "Type A RCD 30mA, 20A MCB/RCBO",
      notes: "Adequate for overnight charging, lowest installation cost"
    },
    {
      type: "7kW Single Phase",
      current: "32A",
      voltage: "230V",
      typicalUse: "Standard UK domestic installation, most common",
      chargeTime: "5-7 hours (40kWh battery)",
      cable: "6mm² T&E or SWA (up to 30m), 10mm² for longer runs",
      protection: "Type A RCD 30mA (or Type B for some vehicles), 40A MCB/RCBO",
      notes: "Most popular choice - balances cost, speed, and demand"
    },
    {
      type: "11kW Three Phase",
      current: "16A per phase",
      voltage: "400V (3-phase)",
      typicalUse: "Commercial, vehicles with 3-phase onboard charger",
      chargeTime: "3-4 hours (40kWh battery)",
      cable: "2.5mm² per phase, 4-core + E SWA",
      protection: "3-pole Type A/B RCD, 20A 3-pole MCB",
      notes: "Requires 3-phase supply - not common in UK domestic"
    },
    {
      type: "22kW Three Phase",
      current: "32A per phase",
      voltage: "400V (3-phase)",
      typicalUse: "Commercial, fleet, destination charging",
      chargeTime: "1.5-2 hours (40kWh battery)",
      cable: "6mm² per phase minimum, 4-core + E SWA",
      protection: "3-pole Type A/B RCD, 40A 3-pole MCB",
      notes: "Maximum AC charging - few vehicles can use full power"
    }
  ];

  const cableSizing = {
    title: "Cable Sizing for EV Chargers",
    factors: [
      "Circuit current rating (16A, 32A, etc.)",
      "Voltage drop (max 3% for final circuits per BS 7671)",
      "Cable route length",
      "Installation method (clipped, enclosed, buried)",
      "Ambient temperature",
      "Grouping with other cables",
      "Type of cable (T&E, SWA, etc.)"
    ],
    commonConfigurations: [
      {
        charger: "7kW (32A)",
        method: "Clipped to surface",
        maxLength: "Up to 25m",
        cable: "6mm² T&E",
        protection: "40A Type B RCBO"
      },
      {
        charger: "7kW (32A)",
        method: "Clipped to surface",
        maxLength: "25m to 40m",
        cable: "10mm² T&E",
        protection: "40A Type B RCBO"
      },
      {
        charger: "7kW (32A)",
        method: "Underground (SWA)",
        maxLength: "Up to 40m",
        cable: "6mm² 3-core SWA",
        protection: "40A Type B RCBO"
      },
      {
        charger: "7kW (32A)",
        method: "Underground (SWA)",
        maxLength: "40m to 60m",
        cable: "10mm² 3-core SWA",
        protection: "40A Type B RCBO"
      },
      {
        charger: "22kW (32A 3-ph)",
        method: "Underground (SWA)",
        maxLength: "Up to 50m",
        cable: "6mm² 4-core + E SWA",
        protection: "40A 3-pole Type B RCBO"
      }
    ],
    voltageDropCalc: "Voltage drop = (mV/A/m x Current x Length) / 1000",
    maxVoltageDrop: "230V x 3% = 6.9V maximum for final circuit"
  };

  const protectionRequirements = {
    title: "Protection Requirements",
    rcdProtection: [
      {
        type: "Type A RCD",
        description: "Detects AC and pulsating DC residual currents",
        when: "Suitable for most Mode 3 chargers with simple onboard chargers",
        limitation: "Cannot detect smooth DC fault currents",
        rating: "30mA, time delayed (S type) may be appropriate"
      },
      {
        type: "Type B RCD",
        description: "Detects AC, pulsating DC, and smooth DC residual currents",
        when: "Required for some vehicles with specific onboard charger types",
        limitation: "Significantly more expensive than Type A",
        rating: "30mA, check charger/vehicle requirements"
      },
      {
        type: "Type A + 6mA DC Detection",
        description: "Type A RCD with additional 6mA DC residual current detection",
        when: "Alternative to Type B where charger has built-in DC detection",
        limitation: "Charger must have integral DC protection to 6mA",
        rating: "30mA AC, 6mA DC"
      }
    ],
    overcurrentProtection: [
      "MCB or RCBO rated for circuit current",
      "Typically 32A for 7kW single-phase",
      "Consider Type C characteristic for charger inrush",
      "Coordinate with upstream protection"
    ]
  };

  const openDevice = {
    title: "O-PEN (Open Protective Earth and Neutral) Device Requirements",
    description: "Protective device that disconnects the supply if the PEN conductor becomes open-circuit or the supply neutral is lost",
    requirement: "Required by BS 7671 Amendment 2 for TN-C-S (PME) supplies where vehicle may be connected during charging",
    reason: [
      "In PME systems, loss of the PEN conductor can cause metalwork to rise to dangerous voltages",
      "Electric vehicles provide a path between the supply neutral and true earth via the vehicle chassis and tyres",
      "Conventional RCDs cannot detect this fault condition",
      "Danger to anyone touching the vehicle during a PEN fault"
    ],
    solutions: [
      {
        solution: "O-PEN Device",
        description: "Automatic disconnection device that monitors neutral voltage and disconnects on fault",
        notes: "Most common solution - many EV chargers have this built-in"
      },
      {
        solution: "TT Earthing",
        description: "Install earth electrode (TT system) for the EV circuit only",
        notes: "Avoids need for O-PEN but requires earth electrode installation and testing"
      },
      {
        solution: "Charger with Built-in Protection",
        description: "Many modern chargers include O-PEN or PME fault detection",
        notes: "Check manufacturer specifications - must comply with BS 7671"
      }
    ],
    installation: [
      "O-PEN device installed on the EV charging circuit",
      "Usually installed adjacent to the consumer unit",
      "Must disconnect all live conductors",
      "Regular testing as part of periodic inspection"
    ]
  };

  const earthingConsiderations = {
    title: "Earthing Considerations",
    supplyTypes: [
      {
        type: "TN-C-S (PME)",
        description: "Combined neutral and earth supplied by DNO",
        requirements: [
          "O-PEN protection device required (BS 7671)",
          "Alternative: TT earthing for EV circuit",
          "Main bonding to installation earth",
          "Risk assessment for PME fault scenarios"
        ],
        prevalence: "Most common supply type in UK"
      },
      {
        type: "TN-S",
        description: "Separate neutral and earth from DNO",
        requirements: [
          "Standard earthing arrangements acceptable",
          "No O-PEN device required",
          "Connect EV charger earth to installation earth",
          "Verify earth fault loop impedance"
        ],
        prevalence: "Less common, older installations"
      },
      {
        type: "TT",
        description: "Earth electrode at the property",
        requirements: [
          "No O-PEN device required",
          "Earth electrode must be adequate",
          "RCD protection essential",
          "Earth fault loop impedance higher than TN systems"
        ],
        prevalence: "Rural areas, remote properties"
      }
    ],
    bonding: [
      "Main equipotential bonding to water, gas, oil if present",
      "No supplementary bonding required for charger itself",
      "Charger metalwork connected to CPC",
      "Verify continuity of protective conductors"
    ]
  };

  const loadManagement = {
    title: "Load Management & Smart Charging",
    types: [
      {
        type: "Static Load Management",
        description: "Fixed reduction in charger output to prevent supply overload",
        when: "Limited supply capacity, simple installations",
        implementation: "Charger programmed to reduced current (e.g., 24A instead of 32A)"
      },
      {
        type: "Dynamic Load Management (DLM)",
        description: "Real-time adjustment of charging current based on other loads",
        when: "Maximize charging speed while respecting supply limits",
        implementation: "CT clamp on supply monitors total load, charger adjusts accordingly"
      },
      {
        type: "Vehicle-to-Grid (V2G)",
        description: "Bidirectional charging - vehicle can export power to grid",
        when: "Future applications, grid balancing, backup power",
        implementation: "Specialist equipment and agreements required"
      }
    ],
    smartFeatures: [
      "Scheduled charging (off-peak rates)",
      "Solar integration (charge when generating)",
      "Load balancing (multiple chargers)",
      "Remote monitoring and control",
      "Usage data and billing integration"
    ]
  };

  const ozevGrant = {
    title: "OZEV Grant Requirements (Historical Reference)",
    note: "The EVHS (Electric Vehicle Homecharge Scheme) for homeowners has ended. Workplace and landlord schemes may still apply - check current gov.uk guidance.",
    workplaceScheme: {
      name: "Workplace Charging Scheme (WCS)",
      status: "Check current availability",
      eligibility: [
        "Registered businesses, charities, public sector",
        "Off-street parking for employees/visitors",
        "Dedicated EV charging points"
      ],
      requirements: [
        "OZEV-approved installer",
        "OZEV-approved chargepoint",
        "Smart functionality required",
        "Must be new installation"
      ]
    },
    installerApproval: [
      "Membership of Competent Person Scheme",
      "Completion of OZEV-approved training",
      "Registered on OZEV approved installer database",
      "Annual renewal and compliance checks"
    ]
  };

  const commercialConsiderations = {
    title: "Commercial EV Charging Considerations",
    factors: [
      {
        factor: "Power Supply",
        considerations: [
          "Assess available capacity (check with DNO)",
          "May require supply upgrade or reinforcement",
          "Three-phase supply often needed",
          "Consider future expansion"
        ]
      },
      {
        factor: "Number of Chargers",
        considerations: [
          "Usage patterns and dwell times",
          "Staff vs visitor vs fleet",
          "Load management strategy",
          "Phased rollout option"
        ]
      },
      {
        factor: "Payment Systems",
        considerations: [
          "Free to use (staff perks)",
          "RFID card access",
          "Contactless payment",
          "App-based payment",
          "Subscription models"
        ]
      },
      {
        factor: "Accessibility",
        considerations: [
          "Equality Act requirements",
          "Wheelchair accessible spaces",
          "Cable management for safety",
          "Adequate lighting"
        ]
      },
      {
        factor: "Network & Backend",
        considerations: [
          "4G/WiFi connectivity",
          "OCPP compatibility",
          "Management platform",
          "Usage reporting"
        ]
      }
    ]
  };

  const testingCommissioning = {
    title: "Testing & Commissioning",
    preInstallation: [
      "Supply capacity assessment",
      "Earth fault loop impedance at origin",
      "Existing installation condition",
      "Cable route survey"
    ],
    circuitTests: [
      { test: "Continuity of protective conductors", description: "R1+R2 for circuit CPC", acceptable: "Low resistance, continuous" },
      { test: "Continuity of ring final (if applicable)", description: "Ring circuit continuity", acceptable: "Ring verified intact" },
      { test: "Insulation resistance", description: "Between all conductors", acceptable: "Minimum 1M ohm" },
      { test: "Polarity", description: "Correct L, N, E connections", acceptable: "Correct at all points" },
      { test: "Earth fault loop impedance (Zs)", description: "At charger connection point", acceptable: "Within limits for protective device" },
      { test: "RCD operation", description: "Trip time and current", acceptable: "30mA: <300ms (standard), <40ms (Type S)" },
      { test: "Functional testing", description: "Charger operation and communication", acceptable: "Charger operates correctly" }
    ],
    oOpenTesting: [
      "Verify O-PEN device present and correctly installed",
      "Test O-PEN operation if test facility available",
      "Check manufacturer's test procedure",
      "Document O-PEN protection method"
    ],
    documentation: [
      "Electrical Installation Certificate (EIC)",
      "OZEV submission (if grant applicable)",
      "Charger registration with manufacturer",
      "Handover documentation to customer",
      "User instructions and safety guidance"
    ]
  };

  const installationScenarios = [
    {
      scenario: "Domestic - Driveway with Supply at Front",
      color: "green",
      typical: "7kW wall-mounted, short cable run",
      considerations: [
        "Shortest cable route - lowest cost",
        "Wall-mounted charger by parking space",
        "O-PEN device required (PME supply)",
        "6mm² T&E often sufficient",
        "Ensure charger accessible but secure"
      ],
      challenges: ["Outdoor cable route", "IP rating of charger", "Aesthetic considerations"]
    },
    {
      scenario: "Domestic - Garage/Outbuilding",
      color: "blue",
      typical: "7kW wall-mounted in garage, medium cable run",
      considerations: [
        "Consider SWA for external/underground run",
        "May require local isolation in garage",
        "Ventilation if charging inside garage",
        "Cable sizing for length",
        "O-PEN protection at origin"
      ],
      challenges: ["Longer cable run", "Garage door cable routing", "Multiple wiring methods"]
    },
    {
      scenario: "Domestic - Rear of Property",
      color: "amber",
      typical: "7kW post-mounted or wall-mounted, long cable run",
      considerations: [
        "Underground SWA cable usually required",
        "Cable sizing critical for voltage drop",
        "10mm² SWA may be needed",
        "Post-mount option for no suitable wall",
        "O-PEN device at origin"
      ],
      challenges: ["Long cable run", "Excavation required", "Voltage drop calculation critical"]
    },
    {
      scenario: "Workplace - Small Car Park",
      color: "purple",
      typical: "Multiple 7kW/22kW chargers, load management",
      considerations: [
        "Assess supply capacity",
        "Dynamic load management recommended",
        "Accessibility requirements",
        "Payment/access control",
        "DNO notification/application"
      ],
      challenges: ["Multiple charger coordination", "Supply limitations", "User management"]
    },
    {
      scenario: "Public - Retail/Destination",
      color: "cyan",
      typical: "Multiple fast chargers, payment systems",
      considerations: [
        "High availability/reliability required",
        "Network connectivity essential",
        "Payment integration",
        "Accessibility compliance",
        "Maintenance access"
      ],
      challenges: ["High utilization", "Vandalism protection", "Complex backend systems"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-green-400" />
            <div>
              <CardTitle className="text-green-300 text-2xl">EV Charging Installation Guide</CardTitle>
              <p className="text-green-200/80">BS 7671 Section 722 - Comprehensive guide for UK electricians</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
              <Award className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-xs text-white/80">Certification</p>
              <p className="text-sm font-medium text-white">OZEV Approved</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
              <Shield className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-xs text-white/80">Key Protection</p>
              <p className="text-sm font-medium text-white">O-PEN Device</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
              <PlugZap className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-xs text-white/80">Standard Power</p>
              <p className="text-sm font-medium text-white">7kW / 32A</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
              <Clock className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-xs text-white/80">Typical Install</p>
              <p className="text-sm font-medium text-white">2-4 Hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Safety Notice */}
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <AlertDescription className="text-red-200">
          <strong className="text-red-300">CRITICAL - PME SUPPLY WARNING:</strong> Most UK domestic supplies are TN-C-S (PME).
          A lost PEN conductor can cause vehicle metalwork to rise to dangerous voltages. O-PEN protection or TT earthing
          is MANDATORY for EV charging installations on PME supplies per BS 7671 Section 722.
        </AlertDescription>
      </Alert>

      {/* Charging Modes */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlugZap className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">EV Charging Modes (IEC 61851)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {chargingModes.map((mode, idx) => (
            <div key={idx} className={`p-4 rounded-lg border bg-${mode.color}-500/10 border-${mode.color}-500/30`}>
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${mode.color}-500/20 border border-${mode.color}-500/40 flex items-center justify-center`}>
                  <mode.icon className={`h-6 w-6 text-${mode.color}-400`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`border-${mode.color}-400 text-${mode.color}-300`}>
                      {mode.mode}
                    </Badge>
                    <h4 className="font-medium text-white">{mode.name}</h4>
                  </div>
                  <p className={`text-sm text-${mode.color}-200 mb-3`}>{mode.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                    <div className="text-xs">
                      <span className="text-white">Power:</span>
                      <span className="text-white ml-1">{mode.power}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-white">Connector:</span>
                      <span className="text-white ml-1">{mode.connectorType}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-white">UK Status:</span>
                      <span className={`ml-1 ${mode.color === 'green' ? 'text-green-300' : mode.color === 'red' ? 'text-red-300' : 'text-yellow-300'}`}>{mode.ukStatus}</span>
                    </div>
                  </div>

                  <ul className="space-y-1">
                    {mode.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-white/80 flex items-start gap-2">
                        <span className={`w-1 h-1 rounded-full bg-${mode.color}-400 mt-1.5`}></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Charger Types */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Charger Types & Specifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-green-500/30">
                  <th className="text-left p-3 text-green-200">Type</th>
                  <th className="text-left p-3 text-green-200">Current/Voltage</th>
                  <th className="text-left p-3 text-green-200">Typical Use</th>
                  <th className="text-left p-3 text-green-200">Cable</th>
                  <th className="text-left p-3 text-green-200">Protection</th>
                </tr>
              </thead>
              <tbody>
                {chargerTypes.map((charger, idx) => (
                  <tr key={idx} className={`border-b border-green-500/20 ${idx % 2 === 0 ? 'bg-green-500/5' : ''}`}>
                    <td className="p-3 text-white font-medium">{charger.type}</td>
                    <td className="p-3 text-white/80">{charger.current} / {charger.voltage}</td>
                    <td className="p-3 text-white/80">{charger.typicalUse}</td>
                    <td className="p-3 text-green-300 font-mono text-xs">{charger.cable}</td>
                    <td className="p-3 text-white/80 text-xs">{charger.protection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Alert className="mt-4 border-green-500/50 bg-green-500/10">
            <Lightbulb className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-sm">
              <strong>7kW (32A single-phase)</strong> is the most common domestic installation in the UK. It provides a good
              balance of charging speed (5-7 hours for typical EV) and installation cost. Most vehicles can accept this power level.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Cable Sizing */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">{cableSizing.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
            <h4 className="font-medium text-orange-200 mb-3">Factors Affecting Cable Size</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {cableSizing.factors.map((factor, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-x-auto">
            <h4 className="font-medium text-white mb-3">Common Configurations (7kW Domestic)</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-orange-500/30">
                  <th className="text-left p-2 text-orange-200">Charger</th>
                  <th className="text-left p-2 text-orange-200">Method</th>
                  <th className="text-left p-2 text-orange-200">Max Length</th>
                  <th className="text-left p-2 text-orange-200">Cable</th>
                  <th className="text-left p-2 text-orange-200">Protection</th>
                </tr>
              </thead>
              <tbody>
                {cableSizing.commonConfigurations.map((config, idx) => (
                  <tr key={idx} className="border-b border-orange-500/20">
                    <td className="p-2 text-white">{config.charger}</td>
                    <td className="p-2 text-white/80">{config.method}</td>
                    <td className="p-2 text-white/80">{config.maxLength}</td>
                    <td className="p-2 text-orange-300 font-mono">{config.cable}</td>
                    <td className="p-2 text-white/80 text-xs">{config.protection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <h4 className="font-medium text-amber-200 mb-2">Voltage Drop Calculation</h4>
            <code className="block bg-amber-900/30 p-2 rounded text-xs text-amber-200 mb-2">{cableSizing.voltageDropCalc}</code>
            <p className="text-xs text-white/80">Maximum voltage drop for final circuits: {cableSizing.maxVoltageDrop}</p>
          </div>
        </CardContent>
      </Card>

      {/* Protection Requirements */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">{protectionRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h4 className="font-medium text-white">RCD Protection Types</h4>
          <div className="space-y-3">
            {protectionRequirements.rcdProtection.map((rcd, idx) => (
              <div key={idx} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-red-400 text-red-300">{rcd.type}</Badge>
                  <span className="text-xs text-white">{rcd.rating}</span>
                </div>
                <p className="text-sm text-white/80 mb-2">{rcd.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-green-400">When to use:</span>
                    <p className="text-white/80">{rcd.when}</p>
                  </div>
                  <div>
                    <span className="text-amber-400">Limitation:</span>
                    <p className="text-white/80">{rcd.limitation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-sm">
              <strong>Important:</strong> Check charger manufacturer specifications for RCD type requirements.
              Some vehicles with specific onboard charger configurations require Type B RCD protection.
              Many modern chargers include DC fault protection, allowing Type A RCDs to be used.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* O-PEN Device */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{openDevice.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-purple-500/50 bg-purple-500/10">
            <Shield className="h-4 w-4 text-purple-400" />
            <AlertDescription className="text-purple-200 text-sm">
              <strong>Mandatory Requirement:</strong> {openDevice.requirement}
            </AlertDescription>
          </Alert>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Why O-PEN Protection is Required</h4>
            <ul className="space-y-2">
              {openDevice.reason.map((reason, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {openDevice.solutions.map((sol, idx) => (
              <div key={idx} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                <h5 className="font-medium text-purple-200 mb-2">{sol.solution}</h5>
                <p className="text-xs text-white/80 mb-2">{sol.description}</p>
                <p className="text-xs text-white">{sol.notes}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Installation Points</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {openDevice.installation.map((point, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Earthing Considerations */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{earthingConsiderations.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {earthingConsiderations.supplyTypes.map((supply, idx) => (
              <div key={idx} className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-amber-400 text-amber-300">{supply.type}</Badge>
                  <span className="text-xs text-white">{supply.prevalence}</span>
                </div>
                <p className="text-sm text-amber-200 mb-3">{supply.description}</p>
                <ul className="space-y-1">
                  {supply.requirements.map((req, reqIdx) => (
                    <li key={reqIdx} className="text-xs text-white/80 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <h4 className="font-medium text-amber-200 mb-3">Bonding Requirements</h4>
            <ul className="space-y-1">
              {earthingConsiderations.bonding.map((item, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Load Management */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">{loadManagement.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loadManagement.types.map((type, idx) => (
              <div key={idx} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                <h4 className="font-medium text-blue-200 mb-2">{type.type}</h4>
                <p className="text-xs text-white/80 mb-2">{type.description}</p>
                <p className="text-xs text-blue-300 mb-1"><strong>When:</strong> {type.when}</p>
                <p className="text-xs text-white"><strong>How:</strong> {type.implementation}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-medium text-blue-200 mb-3">Smart Charging Features</h4>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {loadManagement.smartFeatures.map((feature, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* OZEV Grant Information */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">{ozevGrant.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-500/50 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-sm">
              <strong>Note:</strong> {ozevGrant.note}
            </AlertDescription>
          </Alert>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-medium text-green-200 mb-3">{ozevGrant.workplaceScheme.name}</h4>
            <Badge variant="outline" className="border-green-400 text-green-300 mb-3">{ozevGrant.workplaceScheme.status}</Badge>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Eligibility</h5>
                <ul className="space-y-1">
                  {ozevGrant.workplaceScheme.eligibility.map((item, idx) => (
                    <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Requirements</h5>
                <ul className="space-y-1">
                  {ozevGrant.workplaceScheme.requirements.map((item, idx) => (
                    <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-medium text-green-200 mb-3">Installer Approval Requirements</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ozevGrant.installerApproval.map((item, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <Award className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Commercial Considerations */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{commercialConsiderations.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commercialConsiderations.factors.map((factor, idx) => (
              <div key={idx} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-medium text-purple-200 mb-3">{factor.factor}</h4>
                <ul className="space-y-1">
                  {factor.considerations.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testing & Commissioning */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gauge className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">{testingCommissioning.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tests" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pre">Pre-Install</TabsTrigger>
              <TabsTrigger value="tests">Circuit Tests</TabsTrigger>
              <TabsTrigger value="open">O-PEN Testing</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="pre" className="space-y-2">
              {testingCommissioning.preInstallation.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-cyan-500/10 rounded border border-cyan-500/20">
                  <CheckCircle className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-white/90">{item}</span>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="tests" className="space-y-3">
              {testingCommissioning.circuitTests.map((test, idx) => (
                <div key={idx} className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-cyan-200 text-sm">{test.test}</h5>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                      {test.acceptable}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/80">{test.description}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="open" className="space-y-2">
              {testingCommissioning.oOpenTesting.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-cyan-500/10 rounded border border-cyan-500/20">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-white/90">{item}</span>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="docs" className="space-y-2">
              {testingCommissioning.documentation.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-cyan-500/10 rounded border border-cyan-500/20">
                  <FileCheck className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-white/90">{doc}</span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Installation Scenarios */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Common Installation Scenarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {installationScenarios.map((scenario, idx) => (
            <div key={idx} className={`p-4 rounded-lg border bg-${scenario.color}-500/10 border-${scenario.color}-500/30`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-medium text-${scenario.color}-200`}>{scenario.scenario}</h4>
                <Badge variant="outline" className={`border-${scenario.color}-400 text-${scenario.color}-300 text-xs`}>
                  {scenario.typical}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Key Considerations</h5>
                  <ul className="space-y-1">
                    {scenario.considerations.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-2">
                        <CheckCircle className={`h-3 w-3 text-${scenario.color}-400 mt-0.5 flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Challenges</h5>
                  <ul className="space-y-1">
                    {scenario.challenges.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-2">
                        <AlertTriangle className={`h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Final Important Notice */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <AlertDescription className="text-amber-200">
          <strong className="text-amber-300">Remember:</strong> EV charging installations must comply with BS 7671 Section 722,
          including O-PEN protection for PME supplies. Always verify supply type, assess earthing arrangements, and ensure
          appropriate RCD protection. For grant-funded installations, ensure OZEV approval and use approved chargepoints.
          Keep up to date with changing regulations and grant schemes.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EVChargingGuide;
