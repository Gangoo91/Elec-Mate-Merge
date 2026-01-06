
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Waves,
  Zap,
  AlertTriangle,
  CheckCircle,
  Shield,
  Droplets,
  ThermometerSun,
  Lightbulb,
  Cable,
  Gauge,
  Building2,
  FileCheck,
  Wrench,
  CircuitBoard,
  Power,
  Timer,
  Fan,
  Sun
} from "lucide-react";

const SwimmingPoolGuide = () => {
  const zoneDefinitions = [
    {
      zone: "Zone 0",
      color: "red",
      description: "Interior of the basin of the pool, fountain basin, or paddling pool",
      extends: "The interior volume of the bath tub or shower basin",
      ipRating: "IPX8",
      voltage: "12V AC or 30V DC SELV only",
      equipmentAllowed: [
        "Equipment specifically designed for Zone 0",
        "SELV circuits with source outside Zones 0, 1, and 2",
        "Fixed equipment rated IPX8"
      ],
      equipmentProhibited: [
        "All socket outlets",
        "All switches (except SELV)",
        "Any equipment not specifically rated for Zone 0",
        "Any equipment operating above SELV"
      ],
      cableAllowed: [
        "Cables supplying equipment in Zone 0",
        "Must be kept to minimum necessary",
        "Protected against mechanical damage"
      ]
    },
    {
      zone: "Zone 1",
      color: "orange",
      description: "Above Zone 0 up to 2.5m above floor level, and 2m horizontal from basin edge",
      extends: "2.5m vertically from floor level, 2m horizontally from Zone 0 boundary",
      ipRating: "IPX4 (IPX5 where water jets likely for cleaning)",
      voltage: "SELV up to 25V AC or 60V DC, or 230V with 30mA RCD",
      equipmentAllowed: [
        "Switchgear for SELV circuits only",
        "Fixed electrical equipment for swimming pool use",
        "Water heaters, pumps, luminaires if suitably protected",
        "Equipment rated minimum IPX4 (IPX5 if water jets possible)"
      ],
      equipmentProhibited: [
        "Socket outlets (except SELV shaver units complying with BS EN 61558-2-5)",
        "Switches other than SELV",
        "Junction boxes (unless part of allowed equipment)"
      ],
      cableAllowed: [
        "Cables supplying equipment in Zones 0 and 1",
        "Surface wiring should be avoided where possible"
      ]
    },
    {
      zone: "Zone 2",
      color: "yellow",
      description: "1.5m horizontal beyond Zone 1, up to 2.5m above floor level",
      extends: "1.5m horizontally beyond Zone 1 boundary, up to 2.5m vertically",
      ipRating: "IPX4 (IPX5 where water jets likely)",
      voltage: "230V with 30mA RCD protection",
      equipmentAllowed: [
        "Socket outlets for shaver supply units to BS EN 61558-2-5",
        "SELV socket outlets",
        "Fixed equipment with 30mA RCD protection",
        "Equipment rated minimum IPX4"
      ],
      equipmentProhibited: [
        "Standard socket outlets (13A, etc.)",
        "Switches other than those forming part of fixed equipment"
      ],
      cableAllowed: [
        "Cables supplying equipment in Zones 0, 1, and 2",
        "Circuit wiring routed outside zones where practical"
      ]
    },
    {
      zone: "Outside Zones",
      color: "green",
      description: "Beyond Zone 2 boundaries",
      extends: "Beyond 1.5m from Zone 1 boundary, or above 2.5m from floor level",
      ipRating: "IPX4 minimum recommended for wet areas",
      voltage: "230V with 30mA RCD protection required",
      equipmentAllowed: [
        "Standard electrical equipment",
        "Socket outlets (with 30mA RCD)",
        "Switches and control equipment",
        "Consumer units and distribution boards"
      ],
      equipmentProhibited: [
        "None specifically prohibited",
        "But 30mA RCD protection still required for all circuits"
      ],
      cableAllowed: [
        "Standard wiring methods appropriate for location",
        "Consider moisture and chlorine exposure"
      ]
    }
  ];

  const ipRatingRequirements = {
    title: "IP Rating Requirements by Zone",
    ratings: [
      {
        rating: "IPX8",
        meaning: "Protected against continuous immersion in water",
        zones: ["Zone 0"],
        depth: "Suitable for use underwater at specified depth",
        examples: ["Underwater lights", "Pool sensors", "Fountain pumps"]
      },
      {
        rating: "IPX7",
        meaning: "Protected against temporary immersion (up to 1m for 30 mins)",
        zones: ["May be used in Zone 0 if manufacturer specifies"],
        depth: "Up to 1 metre depth for 30 minutes",
        examples: ["Some pool equipment", "Submersible items"]
      },
      {
        rating: "IPX5",
        meaning: "Protected against water jets from all directions",
        zones: ["Zone 1 (where water jets used)", "Zone 2 (where water jets used)"],
        depth: "N/A - surface protection",
        examples: ["Equipment subject to hosing down", "Commercial pool areas"]
      },
      {
        rating: "IPX4",
        meaning: "Protected against splashing water from all directions",
        zones: ["Zone 1 (minimum)", "Zone 2 (minimum)"],
        depth: "N/A - surface protection",
        examples: ["Most pool-side equipment", "General wet area equipment"]
      }
    ],
    firstDigit: "Protection against solid objects (not applicable for water - use X)",
    secondDigit: "Protection against water ingress (critical for pool installations)"
  };

  const selvRequirements = {
    title: "SELV (Safety Extra Low Voltage) Requirements",
    description: "SELV provides protection by limitation of voltage to values that are not harmful under all conditions",
    voltageLimits: {
      ac: "Maximum 25V AC RMS in Zone 0, 50V AC RMS elsewhere (but 25V AC preferred for wet locations)",
      dc: "Maximum 60V DC ripple-free in Zone 0, 120V DC elsewhere (but 60V DC preferred)"
    },
    requirements: [
      {
        requirement: "Transformer Location",
        description: "SELV transformer must be located outside Zones 0, 1, and 2",
        details: [
          "Typically in plant room or outside zones",
          "Must be a safety isolating transformer to BS EN 61558-2-6",
          "Double or reinforced insulation between primary and secondary",
          "Earth screen between windings"
        ]
      },
      {
        requirement: "Circuit Separation",
        description: "SELV circuits must be electrically separated from other circuits",
        details: [
          "Separate wiring from other circuits",
          "SELV cables in separate conduit/trunking",
          "No connection to earth on secondary side",
          "Plugs and sockets must not be interchangeable with other systems"
        ]
      },
      {
        requirement: "Protection",
        description: "Live parts must be protected against direct contact",
        details: [
          "Basic insulation minimum",
          "IP2X or IPXXB for live parts",
          "No reliance on earthing for safety",
          "Overcurrent protection required"
        ]
      }
    ],
    applications: [
      "Underwater lighting (12V SELV)",
      "Fountain pumps in Zone 0",
      "Pool control systems",
      "Low-voltage garden lighting near pools"
    ]
  };

  const supplementaryBonding = {
    title: "Supplementary Bonding Requirements",
    description: "Supplementary equipotential bonding connects together extraneous and exposed conductive parts within the pool area",
    requirement: "All extraneous-conductive-parts and exposed-conductive-parts in Zones 0, 1, and 2 must be connected by supplementary bonding conductors",
    partsToBeconnected: [
      {
        part: "Metal pool structure",
        description: "Pool shell reinforcement, metal ladders, grab rails"
      },
      {
        part: "Metal fixtures",
        description: "Handrails, diving boards, starting blocks"
      },
      {
        part: "Metal ducting",
        description: "Ventilation ducts, cable trays if metallic"
      },
      {
        part: "Metal pipes",
        description: "Water pipes, heating pipes, drainage if metallic"
      },
      {
        part: "Exposed-conductive-parts",
        description: "Metallic enclosures of Class I equipment"
      },
      {
        part: "Reinforcement",
        description: "Steel reinforcement in pool structure (if accessible)"
      }
    ],
    conductorSizing: [
      { connection: "Between extraneous-conductive-parts", size: "Minimum 2.5mm² copper (4mm² if not mechanically protected)" },
      { connection: "To exposed-conductive-parts", size: "Not less than half the CPC of connected equipment" },
      { connection: "Main bonding", size: "As per BS 7671 main bonding requirements" }
    ],
    omissionConditions: [
      "Supplementary bonding MAY be omitted if ALL conditions are met:",
      "All circuits comply with automatic disconnection requirements",
      "All final circuits protected by 30mA RCD",
      "All extraneous-conductive-parts effectively connected to protective equipotential bonding",
      "Risk assessment supports omission"
    ],
    notes: [
      "Bonding must be accessible for inspection and testing",
      "Use corrosion-resistant connections",
      "Document all bonding locations",
      "Test continuity during initial verification and periodic inspection"
    ]
  };

  const poolPumpCircuits = {
    title: "Pool Pump and Filter Circuits",
    components: [
      {
        component: "Circulation Pump",
        typicalRating: "0.5kW - 3kW (domestic), up to 15kW+ (commercial)",
        circuitDesign: [
          "Dedicated circuit from distribution board",
          "Typically 2.5mm² to 4mm² cable for domestic",
          "Motor-rated switch or isolator",
          "Consider DOL or star-delta starting for larger motors"
        ],
        protection: [
          "MCB/MCBO rated for motor starting current",
          "30mA RCD protection",
          "Motor overload protection (thermal or electronic)",
          "Consider Type C MCB for motor inrush"
        ],
        location: "Usually in plant room (outside zones) - easiest installation"
      },
      {
        component: "Filter System",
        typicalRating: "Included with pump or separate 0.1kW - 0.5kW",
        circuitDesign: [
          "Often on same circuit as pump",
          "Separate circuit if significant load",
          "Timer or controller circuit"
        ],
        protection: [
          "As per pump circuit",
          "Timer protection where fitted"
        ],
        location: "Plant room with pump"
      },
      {
        component: "Chlorinator/Sanitizer",
        typicalRating: "50W - 500W typical",
        circuitDesign: [
          "Low current requirement",
          "May be on pump circuit via FCU",
          "Or dedicated 6A circuit"
        ],
        protection: [
          "MCB/RCBO appropriate to load",
          "30mA RCD protection",
          "Consider corrosion from chemicals"
        ],
        location: "Plant room, chemical resistant enclosure"
      },
      {
        component: "Pool Controller",
        typicalRating: "50W - 200W",
        circuitDesign: [
          "Usually fed from FCU or small MCB",
          "Separate circuit recommended for reliability",
          "Consider UPS for critical systems"
        ],
        protection: [
          "Low current circuit protection",
          "SPD protection recommended",
          "30mA RCD"
        ],
        location: "Plant room or accessible location outside zones"
      }
    ],
    plantRoomRequirements: [
      "Adequate ventilation for chlorine/chemical fumes",
      "Equipment accessible for maintenance",
      "Emergency stop accessible",
      "Clear labeling of all circuits and controls",
      "IP rating appropriate for humidity",
      "Consider chemical resistance of equipment"
    ]
  };

  const underwaterLighting = {
    title: "Underwater Lighting (12V SELV)",
    requirements: [
      {
        requirement: "Voltage",
        description: "Maximum 12V AC or DC for underwater lights",
        details: "Lower voltage reduces shock hazard if insulation fails"
      },
      {
        requirement: "Transformer",
        description: "Safety isolating transformer to BS EN 61558-2-6",
        details: "Must be located outside Zones 0, 1, and 2"
      },
      {
        requirement: "IP Rating",
        description: "IPX8 for lights and junction boxes in Zone 0",
        details: "Specifically designed for continuous immersion"
      },
      {
        requirement: "Cable",
        description: "Cables rated for underwater use",
        details: "Often specialist pool cable, routed through pool wall"
      }
    ],
    installationSteps: [
      "Plan cable routes through pool structure during construction",
      "Install conduit through pool wall before finishing",
      "Use pool-specific cable glands and seals",
      "Mount transformer in plant room (outside zones)",
      "Connect with appropriate underwater-rated connectors",
      "Test insulation resistance before filling pool",
      "Verify SELV circuit isolation"
    ],
    maintenanceConsiderations: [
      "Lamp replacement must maintain waterproof seal",
      "Use only manufacturer-specified replacement lamps",
      "Check seals and gaskets regularly",
      "IR testing during periodic inspection",
      "Isolate and drain if major work required"
    ],
    ledBenefits: [
      "Lower heat generation",
      "Longer lamp life (50,000+ hours)",
      "Lower transformer load",
      "RGB colour options available",
      "Reduced maintenance"
    ]
  };

  const heatPumpConnections = {
    title: "Heat Pump Connections for Pools",
    types: [
      {
        type: "Air Source Heat Pump (ASHP)",
        typicalRating: "5kW - 25kW for domestic pools",
        electricalRequirements: [
          "Single or three-phase supply depending on size",
          "Dedicated circuit from distribution board",
          "Motor-rated isolator at heat pump",
          "Cable sized for compressor starting current",
          "30mA RCD protection"
        ],
        circuitDesign: [
          "5kW-10kW: Single phase, 32A circuit typical",
          "10kW-25kW: Three phase often required",
          "Consider soft-start for larger units",
          "Locate outside zones where possible"
        ]
      },
      {
        type: "Ground Source Heat Pump (GSHP)",
        typicalRating: "8kW - 40kW for pools",
        electricalRequirements: [
          "Usually three-phase for pool applications",
          "Higher starting currents than ASHP",
          "Circulation pump power additional",
          "Control system power"
        ],
        circuitDesign: [
          "Typically 32A-63A three-phase",
          "Located in plant room usually",
          "May require DNO consultation for larger units"
        ]
      }
    ],
    installationConsiderations: [
      "Verify supply capacity before installation",
      "Consider diversity with other pool equipment",
      "Heat pump usually outside zones (plant room or external)",
      "Interlock with circulation pump often required",
      "Timer/controller integration",
      "Noise considerations for ASHP location"
    ]
  };

  const hotTubsSpas = {
    title: "Hot Tubs and Spa Pools",
    description: "Hot tubs and spa pools have similar requirements to swimming pools but with some specific considerations",
    zones: [
      "Zone 0: Inside the hot tub basin",
      "Zone 1: Above Zone 0 to 2.25m, and within projection of tub",
      "Zone 2: Not usually applicable for portable hot tubs",
      "Pre-formed tubs may have equipment in inaccessible Zone 1 areas"
    ],
    types: [
      {
        type: "Plug-In Hot Tubs",
        connection: "13A socket outlet (limited heating capacity)",
        circuit: "Dedicated 13A socket with 30mA RCD",
        notes: "Lower heating power, suitable for occasional use"
      },
      {
        type: "Hardwired Hot Tubs",
        connection: "32A or 40A dedicated circuit",
        circuit: "6mm² minimum, 32A RCBO, isolator at tub",
        notes: "Better heating performance, professional installation required"
      },
      {
        type: "Swim Spas",
        connection: "Often 32A to 63A, may need three-phase",
        circuit: "As per manufacturer specification",
        notes: "Larger heaters and jet pumps require higher capacity"
      }
    ],
    requirements: [
      "Local isolator within sight of and reach from hot tub",
      "30mA RCD protection",
      "O-PEN protection if PME supply and outdoors",
      "Supplementary bonding to extraneous-conductive-parts",
      "IP rating appropriate for location",
      "Equipment within reach must meet zone requirements"
    ],
    outdoorConsiderations: [
      "SWA cable for outdoor runs",
      "Weatherproof isolator (IP65 minimum)",
      "Consider PME/O-PEN requirements",
      "Frost protection for pipes and equipment",
      "GFCI/RCD protection essential"
    ]
  };

  const testingRequirements = {
    title: "Testing Requirements for Pool Installations",
    initialVerification: [
      {
        test: "Continuity of Protective Conductors",
        description: "R1+R2 for all circuits",
        acceptable: "Low resistance continuous path",
        notes: "Critical for fault protection"
      },
      {
        test: "Continuity of Bonding",
        description: "All supplementary bonding conductors",
        acceptable: "Maximum 0.05 ohms between bonded parts",
        notes: "Test between all bonded items"
      },
      {
        test: "Insulation Resistance",
        description: "Between live conductors and earth",
        acceptable: "Minimum 1M ohm at 500V DC",
        notes: "Test SELV circuits at 250V DC"
      },
      {
        test: "Separation of SELV Circuits",
        description: "Insulation between SELV and other circuits",
        acceptable: "Minimum 1M ohm at 500V DC",
        notes: "Test between SELV secondary and earth"
      },
      {
        test: "Earth Fault Loop Impedance",
        description: "Zs at all points",
        acceptable: "Within limits for protective device",
        notes: "Account for temperature during testing"
      },
      {
        test: "RCD Operation",
        description: "All 30mA RCDs",
        acceptable: "Trip time <300ms at rated current, <40ms at 5x",
        notes: "Test all RCDs including those protecting pool circuits"
      },
      {
        test: "Polarity",
        description: "All circuits",
        acceptable: "Correct at all points",
        notes: "Essential for safety"
      },
      {
        test: "Functional Testing",
        description: "All equipment operation",
        acceptable: "Equipment operates correctly",
        notes: "Pumps, lights, controls, etc."
      }
    ],
    periodicInspection: [
      "Recommended maximum interval: 1 year for public pools, 3 years for private",
      "More frequent inspection for heavily used or commercial pools",
      "Visual inspection of all equipment and wiring",
      "Test all protective devices and RCDs",
      "Verify supplementary bonding continuity",
      "Check condition of underwater equipment",
      "Inspect for chemical damage and corrosion"
    ],
    documentation: [
      "Electrical Installation Certificate (EIC) for new installations",
      "Electrical Installation Condition Report (EICR) for periodic inspection",
      "Schedule of test results",
      "Diagram showing zone boundaries",
      "Schedule of bonding connections",
      "Equipment specifications and locations"
    ]
  };

  const commonIssues = [
    {
      issue: "Bonding Continuity Failure",
      causes: ["Corrosion from pool chemicals", "Poor connections", "Mechanical damage"],
      solution: "Use corrosion-resistant connectors, regular testing, accessible connections"
    },
    {
      issue: "SELV Transformer Failure",
      causes: ["Overloading", "Age", "Poor ventilation"],
      solution: "Correct sizing, adequate cooling, periodic inspection"
    },
    {
      issue: "Underwater Light Seal Failure",
      causes: ["Age", "Poor maintenance", "Wrong lamp replacement"],
      solution: "Use manufacturer parts, regular inspection, proper gasket replacement"
    },
    {
      issue: "RCD Nuisance Tripping",
      causes: ["Moisture ingress", "Equipment fault", "High leakage current"],
      solution: "Check equipment IR, improve IP ratings, split circuits"
    },
    {
      issue: "Pump Motor Failure",
      causes: ["Overloading", "Poor power quality", "Lack of protection"],
      solution: "Proper motor protection, regular maintenance, correct sizing"
    },
    {
      issue: "Corrosion of Electrical Equipment",
      causes: ["Chlorine atmosphere", "Splash exposure", "Poor IP rating"],
      solution: "Specify corrosion-resistant equipment, adequate IP rating, ventilation"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Waves className="h-8 w-8 text-cyan-400" />
            <div>
              <CardTitle className="text-cyan-300 text-2xl">Swimming Pool Installation Guide</CardTitle>
              <p className="text-cyan-200/80">BS 7671 Section 702 - Comprehensive guide for UK electricians</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-cyan-500/20 p-3 rounded-lg border border-cyan-500/30">
              <Shield className="h-5 w-5 text-cyan-400 mb-2" />
              <p className="text-xs text-white/80">Key Protection</p>
              <p className="text-sm font-medium text-white">SELV + Bonding</p>
            </div>
            <div className="bg-cyan-500/20 p-3 rounded-lg border border-cyan-500/30">
              <Droplets className="h-5 w-5 text-cyan-400 mb-2" />
              <p className="text-xs text-white/80">Zone 0 IP Rating</p>
              <p className="text-sm font-medium text-white">IPX8</p>
            </div>
            <div className="bg-cyan-500/20 p-3 rounded-lg border border-cyan-500/30">
              <Zap className="h-5 w-5 text-cyan-400 mb-2" />
              <p className="text-xs text-white/80">Zone 0 Voltage</p>
              <p className="text-sm font-medium text-white">12V SELV Max</p>
            </div>
            <div className="bg-cyan-500/20 p-3 rounded-lg border border-cyan-500/30">
              <FileCheck className="h-5 w-5 text-cyan-400 mb-2" />
              <p className="text-xs text-white/80">RCD Protection</p>
              <p className="text-sm font-medium text-white">30mA Required</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Safety Warning */}
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <AlertDescription className="text-red-200">
          <strong className="text-red-300">CRITICAL SAFETY WARNING:</strong> Swimming pools present an extremely high risk
          of electric shock due to water immersion reducing body resistance and providing excellent electrical contact.
          Strict adherence to zone requirements, IP ratings, SELV systems, and supplementary bonding is essential. All
          circuits must have 30mA RCD protection. Any deviation from BS 7671 Section 702 requirements can be fatal.
        </AlertDescription>
      </Alert>

      {/* Zone Definitions */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Zone Definitions (BS 7671 Section 702)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500/50 bg-blue-500/10 mb-4">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200 text-sm">
              Swimming pool zones define areas with progressively reducing shock risk. Each zone has specific requirements
              for IP ratings, voltage limits, and permitted equipment. Understanding zones is fundamental to safe pool
              electrical installation.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zoneDefinitions.map((zone, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  zone.color === 'red' ? 'bg-red-500/10 border-red-500/30' :
                  zone.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                  zone.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-green-500/10 border-green-500/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      zone.color === 'red' ? 'border-red-400 text-red-300' :
                      zone.color === 'orange' ? 'border-orange-400 text-orange-300' :
                      zone.color === 'yellow' ? 'border-yellow-400 text-yellow-300' :
                      'border-green-400 text-green-300'
                    }`}
                  >
                    {zone.zone}
                  </Badge>
                  <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                    {zone.ipRating}
                  </Badge>
                </div>

                <p className={`text-sm mb-2 ${
                  zone.color === 'red' ? 'text-red-200' :
                  zone.color === 'orange' ? 'text-orange-200' :
                  zone.color === 'yellow' ? 'text-yellow-200' :
                  'text-green-200'
                }`}>
                  {zone.description}
                </p>

                <p className="text-xs text-white mb-3"><strong>Extent:</strong> {zone.extends}</p>
                <p className="text-xs text-white mb-3"><strong>Voltage:</strong> {zone.voltage}</p>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-green-400">Permitted Equipment:</span>
                    <ul className="space-y-0.5 mt-1">
                      {zone.equipmentAllowed.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs text-red-400">Prohibited:</span>
                    <ul className="space-y-0.5 mt-1">
                      {zone.equipmentProhibited.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IP Rating Requirements */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">{ipRatingRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-cyan-500/30">
                  <th className="text-left p-3 text-cyan-200">IP Rating</th>
                  <th className="text-left p-3 text-cyan-200">Protection Level</th>
                  <th className="text-left p-3 text-cyan-200">Zones</th>
                  <th className="text-left p-3 text-cyan-200">Examples</th>
                </tr>
              </thead>
              <tbody>
                {ipRatingRequirements.ratings.map((rating, idx) => (
                  <tr key={idx} className={`border-b border-cyan-500/20 ${idx % 2 === 0 ? 'bg-cyan-500/5' : ''}`}>
                    <td className="p-3 text-cyan-300 font-mono font-bold">{rating.rating}</td>
                    <td className="p-3 text-white/80">{rating.meaning}</td>
                    <td className="p-3 text-white/80">{rating.zones.join(', ')}</td>
                    <td className="p-3 text-white text-xs">{rating.examples.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <h4 className="font-medium text-cyan-200 mb-2">Understanding IP Codes</h4>
            <p className="text-sm text-white/80 mb-2"><strong>First digit:</strong> {ipRatingRequirements.firstDigit}</p>
            <p className="text-sm text-white/80"><strong>Second digit:</strong> {ipRatingRequirements.secondDigit}</p>
          </div>
        </CardContent>
      </Card>

      {/* SELV Requirements */}
      <Card className="border-yellow-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">{selvRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <Shield className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200 text-sm">
              {selvRequirements.description}
            </AlertDescription>
          </Alert>

          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
            <h4 className="font-medium text-yellow-200 mb-2">Voltage Limits</h4>
            <p className="text-sm text-white/80 mb-1"><strong>AC:</strong> {selvRequirements.voltageLimits.ac}</p>
            <p className="text-sm text-white/80"><strong>DC:</strong> {selvRequirements.voltageLimits.dc}</p>
          </div>

          <div className="space-y-4">
            {selvRequirements.requirements.map((req, idx) => (
              <div key={idx} className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h4 className="font-medium text-yellow-200 mb-2">{req.requirement}</h4>
                <p className="text-sm text-white/80 mb-3">{req.description}</p>
                <ul className="space-y-1">
                  {req.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="text-xs text-white/80 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
            <h4 className="font-medium text-yellow-200 mb-3">Common SELV Applications</h4>
            <ul className="grid grid-cols-2 gap-2">
              {selvRequirements.applications.map((app, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Supplementary Bonding */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{supplementaryBonding.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-purple-500/50 bg-purple-500/10">
            <Shield className="h-4 w-4 text-purple-400" />
            <AlertDescription className="text-purple-200 text-sm">
              {supplementaryBonding.description}
            </AlertDescription>
          </Alert>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Parts to be Bonded</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {supplementaryBonding.partsToBeconnected.map((part, idx) => (
                <div key={idx} className="bg-purple-600/10 p-3 rounded border border-purple-500/30">
                  <h5 className="font-medium text-purple-200 text-sm">{part.part}</h5>
                  <p className="text-xs text-white/80">{part.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Conductor Sizing</h4>
            <div className="space-y-2">
              {supplementaryBonding.conductorSizing.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-white/80">{item.connection}</span>
                  <Badge variant="outline" className="border-purple-400 text-purple-300">{item.size}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <h4 className="font-medium text-amber-200 mb-3">Conditions for Omitting Supplementary Bonding</h4>
            <ul className="space-y-1">
              {supplementaryBonding.omissionConditions.map((condition, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  {idx === 0 ? (
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  )}
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Important Notes</h4>
            <ul className="space-y-1">
              {supplementaryBonding.notes.map((note, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Pool Pump and Filter Circuits */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Fan className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">{poolPumpCircuits.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="pump" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pump">Pump</TabsTrigger>
              <TabsTrigger value="filter">Filter</TabsTrigger>
              <TabsTrigger value="chlorinator">Chlorinator</TabsTrigger>
              <TabsTrigger value="controller">Controller</TabsTrigger>
            </TabsList>

            {poolPumpCircuits.components.map((component, idx) => (
              <TabsContent key={idx} value={component.component.toLowerCase().split(' ')[0]} className="space-y-4">
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-green-200">{component.component}</h4>
                    <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                      {component.typicalRating}
                    </Badge>
                  </div>

                  <p className="text-xs text-white mb-3"><strong>Location:</strong> {component.location}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-white mb-2">Circuit Design</h5>
                      <ul className="space-y-1">
                        {component.circuitDesign.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-2">
                            <Cable className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-white mb-2">Protection</h5>
                      <ul className="space-y-1">
                        {component.protection.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-2">
                            <Shield className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-medium text-green-200 mb-3">Plant Room Requirements</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {poolPumpCircuits.plantRoomRequirements.map((req, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Underwater Lighting */}
      <Card className="border-yellow-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">{underwaterLighting.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {underwaterLighting.requirements.map((req, idx) => (
              <div key={idx} className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h4 className="font-medium text-yellow-200 mb-2">{req.requirement}</h4>
                <p className="text-sm text-white/80 mb-1">{req.description}</p>
                <p className="text-xs text-white">{req.details}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
            <h4 className="font-medium text-yellow-200 mb-3">Installation Steps</h4>
            <ol className="space-y-2">
              {underwaterLighting.installationSteps.map((step, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">{idx + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
              <h4 className="font-medium text-yellow-200 mb-3">Maintenance Considerations</h4>
              <ul className="space-y-1">
                {underwaterLighting.maintenanceConsiderations.map((item, idx) => (
                  <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                    <Wrench className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-200 mb-3">LED Benefits</h4>
              <ul className="space-y-1">
                {underwaterLighting.ledBenefits.map((benefit, idx) => (
                  <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heat Pump Connections */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">{heatPumpConnections.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {heatPumpConnections.types.map((type, idx) => (
              <div key={idx} className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-orange-200">{type.type}</h4>
                  <Badge variant="outline" className="border-orange-400 text-orange-300 text-xs">
                    {type.typicalRating}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Electrical Requirements</h5>
                    <ul className="space-y-1">
                      {type.electricalRequirements.map((req, reqIdx) => (
                        <li key={reqIdx} className="text-xs text-white/80 flex items-start gap-2">
                          <Zap className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Circuit Design</h5>
                    <ul className="space-y-1">
                      {type.circuitDesign.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs text-white/80 flex items-start gap-2">
                          <CircuitBoard className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
            <h4 className="font-medium text-orange-200 mb-3">Installation Considerations</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {heatPumpConnections.installationConsiderations.map((item, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Hot Tubs and Spa Pools */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{hotTubsSpas.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/80">{hotTubsSpas.description}</p>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-purple-200 mb-3">Zone Application</h4>
            <ul className="space-y-1">
              {hotTubsSpas.zones.map((zone, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <Building2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  {zone}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotTubsSpas.types.map((type, idx) => (
              <div key={idx} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-medium text-purple-200 mb-2">{type.type}</h4>
                <p className="text-xs text-white/80 mb-1"><strong>Connection:</strong> {type.connection}</p>
                <p className="text-xs text-white/80 mb-1"><strong>Circuit:</strong> {type.circuit}</p>
                <p className="text-xs text-white">{type.notes}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <h4 className="font-medium text-purple-200 mb-3">General Requirements</h4>
              <ul className="space-y-1">
                {hotTubsSpas.requirements.map((req, idx) => (
                  <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <h4 className="font-medium text-amber-200 mb-3">Outdoor Considerations</h4>
              <ul className="space-y-1">
                {hotTubsSpas.outdoorConsiderations.map((item, idx) => (
                  <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                    <Sun className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                    {item}
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
            <CardTitle className="text-cyan-300">{testingRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="initial" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="initial">Initial Verification</TabsTrigger>
              <TabsTrigger value="periodic">Periodic Inspection</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="initial" className="space-y-3">
              {testingRequirements.initialVerification.map((test, idx) => (
                <div key={idx} className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-cyan-200 text-sm">{test.test}</h5>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                      {test.acceptable}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/80">{test.description}</p>
                  <p className="text-xs text-white mt-1">{test.notes}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="periodic" className="space-y-2">
              {testingRequirements.periodicInspection.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-cyan-500/10 rounded border border-cyan-500/20">
                  <Timer className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-white/90">{item}</span>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="docs" className="space-y-2">
              {testingRequirements.documentation.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-cyan-500/10 rounded border border-cyan-500/20">
                  <FileCheck className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-white/90">{doc}</span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Common Issues & Troubleshooting</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {commonIssues.map((issue, idx) => (
            <div key={idx} className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <h4 className="font-medium text-red-200 mb-2">{issue.issue}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-red-400">Causes:</span>
                  <ul className="space-y-0.5 mt-1">
                    {issue.causes.map((cause, causeIdx) => (
                      <li key={causeIdx} className="text-xs text-white/80">- {cause}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs text-green-400">Solution:</span>
                  <p className="text-xs text-white/80 mt-1">{issue.solution}</p>
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
          <strong className="text-amber-300">Remember:</strong> Swimming pool installations are high-risk special locations.
          Strict adherence to BS 7671 Section 702 is essential. All electrical equipment in zones must meet IP and voltage
          requirements. Supplementary bonding is critical for safety. Regular inspection and testing is vital for ongoing
          safety. When in doubt, seek specialist advice. Lives depend on getting pool installations right.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SwimmingPoolGuide;
