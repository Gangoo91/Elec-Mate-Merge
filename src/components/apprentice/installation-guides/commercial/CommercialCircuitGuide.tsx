
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Zap,
  Settings,
  Triangle,
  Calculator,
  AlertTriangle,
  Info,
  Server,
  Cable,
  Gauge,
  Building,
  Network,
  Activity,
  CheckCircle
} from "lucide-react";

const CommercialCircuitGuide = () => {
  const threePhaseDistribution = {
    title: "Three-Phase Distribution Systems",
    description: "Commercial premises typically utilise three-phase supplies for higher power capacity and balanced loading",
    systems: [
      {
        type: "TN-C-S (PME)",
        voltage: "400V/230V",
        description: "Protective Multiple Earthing - most common in UK commercial",
        characteristics: [
          "Combined neutral and earth in supply (PEN conductor)",
          "Separation at origin - neutral and earth separate within installation",
          "Low Ze values typically 0.35 ohm or less",
          "Excellent fault current capability"
        ],
        requirements: [
          "Main bonding to water, gas, and structural steelwork",
          "Maximum 10mm main bonding for copper",
          "Reliable supply earth connection critical",
          "Special consideration for generators/UPS systems"
        ],
        limitations: [
          "Risk of neutral-earth fault causing dangerous potentials",
          "Special rules for caravans, boats, and petrol stations",
          "Requires equipotential bonding to extraneous parts"
        ]
      },
      {
        type: "TN-S",
        voltage: "400V/230V",
        description: "Separate neutral and earth throughout - older commercial buildings",
        characteristics: [
          "Earth provided via lead sheath or separate conductor from substation",
          "Clear separation of neutral and earth functions",
          "Higher Ze values typically 0.8 ohm or less",
          "No risk from supply neutral faults"
        ],
        requirements: [
          "Verification of earth electrode adequacy",
          "Main bonding to all extraneous parts",
          "Earth continuity testing essential"
        ],
        limitations: [
          "Less common in new installations",
          "May have higher loop impedance limiting circuit lengths"
        ]
      },
      {
        type: "TT System",
        voltage: "400V/230V",
        description: "Earth electrode at installation - rural or isolated supplies",
        characteristics: [
          "Local earth electrode provides earth reference",
          "High Ze values require RCD protection throughout",
          "Independent of supply earth"
        ],
        requirements: [
          "RCD protection mandatory for all circuits",
          "Earth electrode resistance testing (typically less than 200 ohm)",
          "Type B RCD may be needed for three-phase loads"
        ],
        limitations: [
          "RCD selectivity more complex",
          "Seasonal earth resistance variations",
          "May limit maximum demand available"
        ]
      }
    ]
  };

  const loadBalancing = {
    title: "Load Balancing Requirements",
    description: "Three-phase systems require careful load distribution to minimise neutral currents and maximise efficiency",
    principles: [
      {
        principle: "Equal Phase Loading",
        explanation: "Distribute loads evenly across L1, L2, and L3 phases",
        target: "Within 10-15% of each other at maximum demand",
        consequences: "Unbalanced loads cause neutral currents, overheating, and efficiency losses"
      },
      {
        principle: "Neutral Current Calculation",
        explanation: "In balanced systems, neutral current theoretically zero",
        formula: "In = square root of (IL1 squared + IL2 squared + IL3 squared - IL1.IL2 - IL2.IL3 - IL3.IL1)",
        notes: "Maximum neutral current occurs with single-phase loading"
      },
      {
        principle: "Phase Sequence",
        explanation: "Correct phase rotation essential for three-phase motors",
        testing: "Use phase sequence tester before connecting rotating machinery",
        standard: "L1-L2-L3 clockwise rotation (Red-Yellow-Blue historically)"
      }
    ],
    practicalGuidance: [
      {
        scenario: "Office Floor Lighting",
        approach: "Divide lighting circuits across three phases (L1: Bay 1, L2: Bay 2, L3: Bay 3)",
        benefit: "Balanced loading, reduced neutral current, easier maintenance isolation"
      },
      {
        scenario: "Socket Circuits",
        approach: "Allocate socket circuits based on anticipated loads per area",
        benefit: "Kitchen/server areas on separate phase from general office"
      },
      {
        scenario: "HVAC Equipment",
        approach: "Large three-phase units contribute to overall balance",
        benefit: "Single-phase FCUs and splits should be distributed across phases"
      }
    ],
    monitoring: [
      "Install current monitoring on each phase at main distribution",
      "Regular load surveys during peak demand periods",
      "Consider power quality monitoring for sensitive installations",
      "Document phase allocation on circuit charts"
    ]
  };

  const subDistributionDesign = {
    title: "Sub-Distribution Board Design",
    description: "Commercial installations typically require hierarchical distribution from main switchboard to final circuits",
    hierarchy: [
      {
        level: "Main LV Switchboard (MSB)",
        location: "Adjacent to transformer or main intake",
        typical: "800A - 3200A",
        features: [
          "Main incoming ACB or MCCB",
          "Bus section couplers (for resilience)",
          "Metering CT compartment",
          "Outgoing feeders to sub-mains"
        ],
        construction: "Form 4 Type 4/7 construction for safety segregation"
      },
      {
        level: "Sub-Main Distribution Board (SDB)",
        location: "Floor level or zone distribution rooms",
        typical: "100A - 400A",
        features: [
          "Three-phase busbars with neutral",
          "Main isolator with earth fault protection",
          "Outgoing ways for final circuits and sub-dbs",
          "Surge protection device (SPD Type 2)"
        ],
        construction: "IP rating appropriate to environment (IP4X minimum for commercial)"
      },
      {
        level: "Final Distribution Board (DB)",
        location: "Local to served area",
        typical: "63A - 125A",
        features: [
          "Consumer unit style or panel board",
          "RCBOs for individual circuit protection",
          "Clear circuit identification and labelling",
          "Adequate spare ways (minimum 20%)"
        ],
        construction: "Metal clad for commercial (Class II allowed in some applications)"
      }
    ],
    designConsiderations: [
      "Discrimination (selectivity) between upstream and downstream devices",
      "Fault level rating - verify all equipment rated for prospective fault current",
      "Arc flash hazard assessment for panels over 125A",
      "Accessibility for maintenance and testing",
      "Future expansion capacity",
      "Emergency lighting and life safety on dedicated circuits"
    ]
  };

  const busbarTrunking = {
    title: "Busbar Trunking Systems",
    description: "Busbar trunking provides flexible, high-current distribution in commercial and industrial applications",
    types: [
      {
        type: "Lighting Busbar",
        current: "25A - 63A",
        applications: ["Office lighting", "Retail display", "Warehouse lighting"],
        features: "Tap-off boxes at regular intervals, plug-in luminaire connections",
        advantages: "Rapid reconfiguration, reduced wiring labour, easy expansion"
      },
      {
        type: "Low Power Busbar",
        current: "100A - 160A",
        applications: ["Socket outlet distribution", "Small power risers", "Data centre PDU feeds"],
        features: "Plug-in tap-off units, fire barriers at compartment crossings",
        advantages: "Flexibility for tenant fit-out, higher current than traditional wiring"
      },
      {
        type: "Medium Power Busbar",
        current: "250A - 800A",
        applications: ["Floor distribution", "Main risers", "Sub-main distribution"],
        features: "Al or Cu conductors, various IP ratings, fire rated versions available",
        advantages: "Space saving vs cables, lower voltage drop, visual inspection possible"
      },
      {
        type: "High Power Busbar",
        current: "1000A - 6300A",
        applications: ["Main distribution", "Transformer to switchboard connections"],
        features: "Sandwich construction, forced cooling available, rated for high fault levels",
        advantages: "Compact installation, proven technology, easier installation than large cables"
      }
    ],
    installationRequirements: [
      "Fire stopping at compartment boundaries (BS 9999)",
      "Adequate support at specified intervals",
      "Earth continuity through joints verified",
      "IP rating maintained throughout length",
      "Access for tap-off installation and maintenance"
    ],
    testingRequirements: [
      "Continuity of all conductors including earth",
      "Insulation resistance between phases and to earth",
      "Tightness of all bolted connections (torque settings)",
      "Visual inspection of joints and supports"
    ]
  };

  const cableSizing = {
    title: "Cable Sizing for Commercial Installations",
    description: "Commercial cable sizing must account for diversity, grouping factors, and voltage drop over longer runs",
    diversityFactors: {
      title: "Diversity Factors (BS 7671 Appendix 1)",
      note: "Commercial diversity differs from domestic - generally lower diversity due to simultaneous use",
      factors: [
        { load: "General Lighting", diversity: "90%", notes: "Offices typically fully lit during working hours" },
        { load: "Socket Outlets (general)", diversity: "100% first 10A + 50% remainder", notes: "Per BS 7671 for offices" },
        { load: "Socket Outlets (process)", diversity: "100%", notes: "Where known continuous loads" },
        { load: "Air Conditioning", diversity: "100% largest + 80% others", notes: "Cooling typically simultaneous" },
        { load: "Lifts", diversity: "75% for 2-3 lifts, 60% for 4+ lifts", notes: "Unlikely all in use simultaneously" },
        { load: "Cooking Appliances", diversity: "80%", notes: "Commercial kitchens near simultaneous use" },
        { load: "Water Heating (storage)", diversity: "100%", notes: "Off-peak charging considered separately" },
        { load: "Server Rooms", diversity: "100%", notes: "Critical loads, no diversity applied" },
        { load: "Electric Heating", diversity: "100%", notes: "Peak demand during cold periods" }
      ]
    },
    groupingFactors: {
      title: "Grouping (Correction) Factors",
      description: "Derate cable current capacity when cables are grouped together",
      table: [
        { circuits: "1", factor: "1.00" },
        { circuits: "2", factor: "0.80" },
        { circuits: "3", factor: "0.70" },
        { circuits: "4", factor: "0.65" },
        { circuits: "5", factor: "0.60" },
        { circuits: "6", factor: "0.57" },
        { circuits: "7", factor: "0.54" },
        { circuits: "8", factor: "0.52" },
        { circuits: "9", factor: "0.50" },
        { circuits: "12", factor: "0.45" },
        { circuits: "16", factor: "0.41" },
        { circuits: "20+", factor: "0.38" }
      ],
      notes: [
        "Based on Table 4C1 for cables enclosed in conduit/trunking",
        "Factors improve if cables spaced or not all loaded",
        "Ventilated trunking may allow higher factors"
      ]
    },
    thermalInsulation: {
      title: "Thermal Insulation Factors",
      table: [
        { length: "50mm or less", factor: "0.89" },
        { length: "Over 50mm, up to 100mm", factor: "0.81" },
        { length: "Over 100mm, up to 200mm", factor: "0.68" },
        { length: "Over 200mm, up to 400mm", factor: "0.55" },
        { length: "Over 400mm (or totally surrounded)", factor: "0.50" }
      ]
    },
    commercialCableSizes: {
      title: "Typical Commercial Cable Applications",
      cables: [
        { size: "1.5mm SWA", current: "21A (3-core, clipped)", use: "Fire alarm, emergency lighting, small power" },
        { size: "2.5mm SWA", current: "28A (3-core, clipped)", use: "General socket circuits, small equipment" },
        { size: "4mm SWA", current: "37A (3-core, clipped)", use: "Air conditioning, dedicated equipment" },
        { size: "6mm SWA", current: "47A (3-core, clipped)", use: "Larger A/C, cooking, small motors" },
        { size: "10mm SWA", current: "65A (3-core, clipped)", use: "Sub-main distribution, large loads" },
        { size: "16mm SWA", current: "87A (3-core, clipped)", use: "Floor distribution, rising mains" },
        { size: "25mm SWA", current: "110A (3-core, clipped)", use: "Sub-main distribution boards" },
        { size: "35mm SWA", current: "135A (3-core, clipped)", use: "Larger sub-distribution" },
        { size: "50mm SWA", current: "163A (3-core, clipped)", use: "Main distribution feeders" },
        { size: "70mm SWA", current: "200A (3-core, clipped)", use: "Main incoming cables" },
        { size: "95mm SWA", current: "240A (3-core, clipped)", use: "Large main incoming" },
        { size: "120mm SWA", current: "275A (3-core, clipped)", use: "Major distribution" }
      ]
    }
  };

  const maximumDemand = {
    title: "Maximum Demand Calculations",
    description: "Determining maximum demand is essential for specifying supply capacity and main equipment ratings",
    method: {
      steps: [
        {
          step: 1,
          title: "List All Connected Loads",
          actions: [
            "Identify every load in the installation",
            "Record nameplate ratings (kW or kVA)",
            "Note power factor for motor loads",
            "Distinguish between single and three-phase loads"
          ]
        },
        {
          step: 2,
          title: "Apply Diversity Factors",
          actions: [
            "Group loads by type (lighting, power, HVAC, etc.)",
            "Apply appropriate diversity factor to each group",
            "Consider time-of-day usage patterns",
            "Account for seasonal variations"
          ]
        },
        {
          step: 3,
          title: "Sum Diversified Loads",
          actions: [
            "Add diversified loads by phase for balance check",
            "Calculate total kVA requirement",
            "Apply overall building diversity if applicable",
            "Add margin for future growth (typically 15-25%)"
          ]
        },
        {
          step: 4,
          title: "Convert to Current Demand",
          actions: [
            "Single phase: I = P / (V x pf) where V = 230V",
            "Three phase: I = P / (root 3 x V x pf) where V = 400V",
            "Verify phase balance is within acceptable limits",
            "Specify main protective device and cable sizes"
          ]
        }
      ]
    },
    exampleCalculation: {
      title: "Example: Small Office Building (1000m)",
      loads: [
        { item: "Lighting (LED)", connected: "15kW", diversity: "90%", diversified: "13.5kW" },
        { item: "General Sockets (100 doubles)", connected: "75kW", diversity: "40%", diversified: "30kW" },
        { item: "Server Room", connected: "25kW", diversity: "100%", diversified: "25kW" },
        { item: "Kitchen Equipment", connected: "20kW", diversity: "80%", diversified: "16kW" },
        { item: "Air Conditioning", connected: "60kW", diversity: "85%", diversified: "51kW" },
        { item: "Lifts (2 No.)", connected: "30kW", diversity: "75%", diversified: "22.5kW" },
        { item: "Small Power (misc)", connected: "10kW", diversity: "50%", diversified: "5kW" }
      ],
      total: "163kW diversified load",
      calculation: "I = 163,000 / (1.732 x 400 x 0.85) = 277A",
      conclusion: "Specify 315A main incomer, 400A switchboard, with 3x185mm per phase cables"
    }
  };

  const powerFactorCorrection = {
    title: "Power Factor Correction",
    description: "Commercial installations with motor and inductive loads often require power factor correction to reduce kVA demand and avoid DNO penalties",
    basics: {
      explanation: [
        "Power factor (pf) is the ratio of real power (kW) to apparent power (kVA)",
        "Unity power factor (1.0) means all power is doing useful work",
        "Lagging power factor (caused by inductive loads) is most common",
        "Target power factor typically 0.95 lagging or better"
      ],
      formula: "pf = kW / kVA = cos phi (angle between voltage and current)"
    },
    correctionMethods: [
      {
        method: "Bulk Correction",
        description: "Capacitor bank at main switchboard",
        advantages: "Cost effective, simple installation, reduces main cable sizing",
        disadvantages: "Does not reduce cable losses within installation",
        suitableFor: "Steady loads, single main distribution point"
      },
      {
        method: "Group Correction",
        description: "Capacitors at sub-distribution boards",
        advantages: "Reduces cable losses in sub-mains, targeted correction",
        disadvantages: "Higher cost than bulk, more equipment to maintain",
        suitableFor: "Large installations with distinct load centres"
      },
      {
        method: "Individual Correction",
        description: "Capacitors at each motor or load",
        advantages: "Maximum cable loss reduction, automatic with load",
        disadvantages: "Most expensive, many units to maintain",
        suitableFor: "Large motors, variable speed drives may have issues"
      }
    ],
    safetyConsiderations: [
      "Capacitors store energy - discharge before work",
      "Avoid over-correction leading to capacitive loads",
      "Harmonic distortion can damage capacitors",
      "Detuned reactors may be needed with VSD loads",
      "Automatic switching controllers must be set correctly"
    ],
    typicalValues: [
      { load: "Fluorescent lighting (magnetic)", pf: "0.5 - 0.6 lagging" },
      { load: "LED lighting (with driver)", pf: "0.9 - 0.95 lagging" },
      { load: "Induction motors (unloaded)", pf: "0.3 - 0.4 lagging" },
      { load: "Induction motors (loaded)", pf: "0.8 - 0.9 lagging" },
      { load: "Welding equipment", pf: "0.5 - 0.7 lagging" },
      { load: "Resistive heating", pf: "1.0 (unity)" },
      { load: "Variable speed drives", pf: "0.95+ (can be leading)" }
    ]
  };

  const socketCircuits = {
    title: "Commercial Socket Circuits: Ring vs Radial",
    description: "The debate between ring final circuits and radial circuits continues in commercial installations",
    comparison: {
      ring: {
        title: "Ring Final Circuits",
        protection: "32A MCB/RCBO with 2.5mm cable",
        maxArea: "100m per circuit",
        advantages: [
          "Lower voltage drop due to parallel paths",
          "Continued supply if single cable fault",
          "Established UK commercial practice",
          "Permits unlimited sockets on circuit"
        ],
        disadvantages: [
          "More complex testing (three-step test required)",
          "Higher copper usage than radial",
          "Risk of undetected breaks in ring",
          "Spur rules can be confusing"
        ],
        bestFor: "Open plan offices, areas with changing layouts"
      },
      radial: {
        title: "Radial Circuits",
        options: [
          { protection: "20A MCB with 2.5mm cable", maxArea: "50m" },
          { protection: "32A MCB with 4mm cable", maxArea: "75m" }
        ],
        advantages: [
          "Simpler installation and testing",
          "Clear circuit topology",
          "Better for fixed load patterns",
          "IEC/European standard approach"
        ],
        disadvantages: [
          "Higher voltage drop on long runs",
          "No redundancy if cable fails",
          "May need more circuits for same area"
        ],
        bestFor: "Server rooms, dedicated equipment, smaller areas"
      }
    },
    commercialConsiderations: [
      "Fire alarm interface may require switched spurs",
      "Clean power circuits for IT may justify radial approach",
      "Floor box layouts often suit ring circuit flexibility",
      "Tenant fit-out may favour flexible ring arrangements",
      "Some international tenants prefer radial approach"
    ],
    recommendation: "Neither is universally better - select based on specific installation requirements, maintenance capability, and client preferences"
  };

  const serverRoomPower = {
    title: "Server Room & IT Power Requirements",
    description: "Critical IT infrastructure requires careful electrical design for reliability and power quality",
    supplyRequirements: {
      title: "Power Supply Architecture",
      configurations: [
        {
          type: "Single Feed (N)",
          description: "Single utility supply to IT load",
          reliability: "Basic - no redundancy",
          suitableFor: "Small businesses, non-critical IT"
        },
        {
          type: "N+1 UPS",
          description: "UPS with redundant module",
          reliability: "Good - survives single UPS module failure",
          suitableFor: "Most commercial server rooms"
        },
        {
          type: "2N (Dual Path)",
          description: "Fully redundant A+B power paths to each rack",
          reliability: "High - survives entire path failure",
          suitableFor: "Data centres, mission critical IT"
        },
        {
          type: "2N+1",
          description: "Dual path with additional UPS redundancy",
          reliability: "Very High - multiple concurrent failures tolerated",
          suitableFor: "Tier III/IV data centres"
        }
      ]
    },
    upsRequirements: {
      title: "UPS System Considerations",
      types: [
        {
          type: "Offline/Standby",
          description: "Battery activated on mains failure",
          transferTime: "5-12ms",
          efficiency: "95-98%",
          suitableFor: "Desktop PCs, non-critical equipment"
        },
        {
          type: "Line Interactive",
          description: "AVR + battery backup",
          transferTime: "2-4ms",
          efficiency: "95-98%",
          suitableFor: "Workstations, small servers"
        },
        {
          type: "Online Double Conversion",
          description: "Continuous power conditioning",
          transferTime: "Zero (0ms)",
          efficiency: "90-96%",
          suitableFor: "Data centres, sensitive equipment"
        }
      ],
      sizing: [
        "Calculate total IT load in kVA (kW / pf)",
        "Add 20-25% growth capacity",
        "Consider N+1 or 2N redundancy requirements",
        "Specify runtime based on generator start time + margin"
      ],
      installation: [
        "Dedicated circuit from main distribution",
        "Bypass isolator for maintenance",
        "UPS room ventilation/cooling for heat dissipation",
        "Emergency stop provision where required"
      ]
    },
    cleanEarth: {
      title: "Clean Earth (Technical Earth) Systems",
      description: "Dedicated earth system for IT equipment to reduce electrical noise",
      methods: [
        {
          method: "Dedicated Earth Conductor",
          description: "Separate earth conductor from IT DB to MET",
          installation: "Green/yellow with additional white marking",
          notes: "Most common approach, BS 7671 compliant"
        },
        {
          method: "Star Point Earthing",
          description: "Single point connection to earth reference",
          installation: "All IT earths connect at common point near MET",
          notes: "Prevents earth loops, good for sensitive equipment"
        },
        {
          method: "Clean Earth Bar",
          description: "Separate earth bar for IT circuits only",
          installation: "Connected to MET via single conductor",
          notes: "Common in server rooms, maintains separation"
        }
      ],
      criticalPoints: [
        "Clean earth must still be connected to MET (not isolated)",
        "Resistance between clean earth and MET should be minimal",
        "Lightning protection earth must be bonded to main earthing",
        "Document clean earth arrangements on as-built drawings"
      ]
    },
    powerDistribution: {
      title: "IT Power Distribution",
      components: [
        {
          item: "Power Distribution Unit (PDU)",
          description: "Distribution within server racks",
          types: ["Basic (metered)", "Monitored (per outlet)", "Switched (remote control)"],
          features: "C13/C19 outlets, dual input for 2N systems"
        },
        {
          item: "Floor PDU / RPP",
          description: "Remote Power Panel for rack rows",
          types: ["Static transfer switch", "Maintenance bypass", "Metering"],
          features: "Distributes UPS output to rack PDUs"
        },
        {
          item: "Busway / Overhead PDU",
          description: "Overhead distribution to racks",
          types: ["Plug-in tap-offs", "Fixed connections"],
          features: "Flexibility for changing rack layouts"
        }
      ]
    },
    coolingIntegration: {
      title: "Electrical Requirements for Cooling",
      items: [
        "CRAC/CRAH units typically three-phase supply",
        "In-row cooling units may be single or three-phase",
        "Chilled water systems require pump and valve power",
        "Free cooling economisers need control power",
        "BMS integration for monitoring and alarms"
      ]
    }
  };

  const circuitDesign = [
    {
      circuit: "Office Lighting",
      cable: "1.5mm FP200 or MICC",
      protection: "10A MCB (Type B)",
      design: "Radial circuits with DALI/DSI control integration",
      features: ["PIR occupancy sensing", "Daylight dimming", "Emergency maintained/non-maintained", "Scene control capability"],
      notes: "Emergency circuits on separate phase, fire rated cable"
    },
    {
      circuit: "General Socket Outlets",
      cable: "2.5mm SWA or T&E in trunking",
      protection: "32A RCBO (Type A)",
      design: "Ring or radial per design preference",
      features: ["Floor boxes for flexibility", "USB charging integration", "Clean power where needed", "Cable management systems"],
      notes: "RCD protection mandatory (Reg 411.3.3)"
    },
    {
      circuit: "Air Conditioning Units",
      cable: "4mm/6mm SWA (varies by unit)",
      protection: "MCB sized to unit + contactor",
      design: "Dedicated three-phase supplies to FCUs/splits",
      features: ["Isolator at unit", "Interlock with fire alarm", "BMS connection", "Power monitoring"],
      notes: "Check manufacturer requirements for starter type"
    },
    {
      circuit: "Fire Alarm System",
      cable: "1.5mm FP200 Gold or equivalent",
      protection: "6A MCB Type B",
      design: "Dedicated circuit from main switchboard",
      features: ["Fire rated cable throughout", "Separate from other circuits", "No RCD protection", "Battery backup monitoring"],
      notes: "BS 5839-1 compliant installation required"
    },
    {
      circuit: "Emergency Lighting",
      cable: "1.5mm FP200 or MICC",
      protection: "6A MCB Type B",
      design: "Separate from general lighting for maintained systems",
      features: ["Central battery or self-contained", "Monthly/annual test facility", "Fire rated cable", "BS 5266 compliant"],
      notes: "Consider phase diversity for supply resilience"
    },
    {
      circuit: "Lift Installation",
      cable: "As specified by lift contractor",
      protection: "Per lift manufacturer requirements",
      design: "Dedicated supply, often regenerative capable",
      features: ["Isolator at machine room", "Emergency recall power", "Intercom power", "Ventilation interlock"],
      notes: "Coordinate with lift specialist contractor"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Three-Phase Distribution Systems */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Triangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">{threePhaseDistribution.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
            <Info className="h-4 w-4 text-elec-yellow" />
            <AlertDescription className="text-yellow-200 text-sm">
              {threePhaseDistribution.description}
            </AlertDescription>
          </Alert>

          {threePhaseDistribution.systems.map((system, index) => (
            <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-medium text-white">{system.type}</h4>
                <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
                  {system.voltage}
                </Badge>
              </div>
              <p className="text-sm text-gray-300 mb-4">{system.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-300 mb-2">Characteristics</h5>
                  <ul className="space-y-1">
                    {system.characteristics.map((char, idx) => (
                      <li key={idx} className="text-blue-200 text-xs flex items-start gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Requirements</h5>
                  <ul className="space-y-1">
                    {system.requirements.map((req, idx) => (
                      <li key={idx} className="text-green-200 text-xs flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-orange-300 mb-2">Limitations</h5>
                  <ul className="space-y-1">
                    {system.limitations.map((limit, idx) => (
                      <li key={idx} className="text-orange-200 text-xs flex items-start gap-2">
                        <span className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {limit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Load Balancing Requirements */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">{loadBalancing.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{loadBalancing.description}</p>

          {loadBalancing.principles.map((principle, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-white mb-2">{principle.principle}</h4>
              <p className="text-sm text-blue-200 mb-2">{principle.explanation}</p>
              {'target' in principle && (
                <p className="text-xs text-green-300"><strong>Target:</strong> {principle.target}</p>
              )}
              {'formula' in principle && (
                <p className="text-xs text-cyan-300 font-mono"><strong>Formula:</strong> {principle.formula}</p>
              )}
              {'testing' in principle && (
                <p className="text-xs text-amber-300"><strong>Testing:</strong> {principle.testing}</p>
              )}
              {'consequences' in principle && (
                <p className="text-xs text-orange-300"><strong>Consequence:</strong> {principle.consequences}</p>
              )}
              {'notes' in principle && (
                <p className="text-xs text-gray-400"><strong>Note:</strong> {principle.notes}</p>
              )}
              {'standard' in principle && (
                <p className="text-xs text-purple-300"><strong>Standard:</strong> {principle.standard}</p>
              )}
            </div>
          ))}

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-medium text-white mb-3">Practical Load Distribution Examples</h4>
            <div className="space-y-3">
              {loadBalancing.practicalGuidance.map((guide, idx) => (
                <div key={idx} className="bg-blue-600/10 p-3 rounded border border-blue-500/30">
                  <h5 className="font-medium text-blue-200 text-sm mb-1">{guide.scenario}</h5>
                  <p className="text-xs text-gray-300 mb-1"><strong>Approach:</strong> {guide.approach}</p>
                  <p className="text-xs text-green-300"><strong>Benefit:</strong> {guide.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-medium text-white mb-3">Monitoring Recommendations</h4>
            <ul className="space-y-1">
              {loadBalancing.monitoring.map((item, idx) => (
                <li key={idx} className="text-sm text-blue-100 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Sub-Distribution Board Design */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{subDistributionDesign.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{subDistributionDesign.description}</p>

          {subDistributionDesign.hierarchy.map((level, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h4 className="font-medium text-white">{level.level}</h4>
                <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                  {level.typical}
                </Badge>
              </div>
              <p className="text-sm text-purple-200 mb-2"><strong>Location:</strong> {level.location}</p>
              <p className="text-xs text-gray-400 mb-3"><strong>Construction:</strong> {level.construction}</p>

              <div>
                <h5 className="font-medium text-purple-200 mb-2 text-sm">Key Features</h5>
                <div className="grid grid-cols-2 gap-2">
                  {level.features.map((feature, idx) => (
                    <div key={idx} className="text-xs text-purple-100 flex items-start gap-2">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Alert className="border-purple-500/50 bg-purple-500/10">
            <AlertTriangle className="h-4 w-4 text-purple-400" />
            <AlertDescription className="text-purple-200 text-sm">
              <strong>Design Considerations:</strong>
              <ul className="mt-2 space-y-1">
                {subDistributionDesign.designConsiderations.map((item, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Busbar Trunking Systems */}
      <Card className="border-cyan-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Network className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">{busbarTrunking.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{busbarTrunking.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {busbarTrunking.types.map((type, index) => (
              <div key={index} className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-white text-sm">{type.type}</h4>
                  <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                    {type.current}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mb-2">{type.features}</p>
                <div className="mb-2">
                  <span className="text-xs text-cyan-200 font-medium">Applications:</span>
                  <ul className="mt-1 space-y-0.5">
                    {type.applications.map((app, idx) => (
                      <li key={idx} className="text-xs text-cyan-100">- {app}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-green-300"><strong>Advantages:</strong> {type.advantages}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
              <h4 className="font-medium text-cyan-200 mb-3">Installation Requirements</h4>
              <ul className="space-y-1">
                {busbarTrunking.installationRequirements.map((req, idx) => (
                  <li key={idx} className="text-xs text-cyan-100 flex items-start gap-2">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
              <h4 className="font-medium text-cyan-200 mb-3">Testing Requirements</h4>
              <ul className="space-y-1">
                {busbarTrunking.testingRequirements.map((req, idx) => (
                  <li key={idx} className="text-xs text-cyan-100 flex items-start gap-2">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cable Sizing */}
      <Card className="border-amber-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{cableSizing.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{cableSizing.description}</p>

          {/* Diversity Factors */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-2">{cableSizing.diversityFactors.title}</h4>
            <Alert className="border-amber-500/50 bg-amber-500/10 mb-3">
              <Info className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200 text-xs">
                {cableSizing.diversityFactors.note}
              </AlertDescription>
            </Alert>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Load Type</th>
                    <th className="text-left py-2 text-amber-200">Diversity</th>
                    <th className="text-left py-2 text-amber-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {cableSizing.diversityFactors.factors.map((factor, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white text-xs">{factor.load}</td>
                      <td className="py-2 text-amber-300 text-xs">{factor.diversity}</td>
                      <td className="py-2 text-gray-400 text-xs">{factor.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grouping Factors */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-2">{cableSizing.groupingFactors.title}</h4>
            <p className="text-xs text-gray-300 mb-3">{cableSizing.groupingFactors.description}</p>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-3">
              {cableSizing.groupingFactors.table.map((row, idx) => (
                <div key={idx} className="bg-amber-600/10 p-2 rounded text-center">
                  <div className="text-amber-200 text-xs font-medium">{row.circuits} circuits</div>
                  <div className="text-white text-sm font-bold">{row.factor}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-1">
              {cableSizing.groupingFactors.notes.map((note, idx) => (
                <li key={idx} className="text-xs text-amber-100 flex items-start gap-2">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Thermal Insulation Factors */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-2">{cableSizing.thermalInsulation.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Length in Insulation</th>
                    <th className="text-left py-2 text-amber-200">Derating Factor</th>
                  </tr>
                </thead>
                <tbody>
                  {cableSizing.thermalInsulation.table.map((row, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white text-xs">{row.length}</td>
                      <td className="py-2 text-amber-300 text-xs">{row.factor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Commercial Cable Sizes */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-2">{cableSizing.commercialCableSizes.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Cable Size</th>
                    <th className="text-left py-2 text-amber-200">Current Rating</th>
                    <th className="text-left py-2 text-amber-200">Typical Use</th>
                  </tr>
                </thead>
                <tbody>
                  {cableSizing.commercialCableSizes.cables.map((cable, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white text-xs font-medium">{cable.size}</td>
                      <td className="py-2 text-amber-300 text-xs">{cable.current}</td>
                      <td className="py-2 text-gray-300 text-xs">{cable.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maximum Demand Calculations */}
      <Card className="border-rose-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-rose-400" />
            <CardTitle className="text-rose-300">{maximumDemand.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{maximumDemand.description}</p>

          <div className="space-y-3">
            {maximumDemand.method.steps.map((step, index) => (
              <div key={index} className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-rose-400 text-rose-300">
                    Step {step.step}
                  </Badge>
                  <h4 className="font-medium text-white text-sm">{step.title}</h4>
                </div>
                <ul className="space-y-1">
                  {step.actions.map((action, idx) => (
                    <li key={idx} className="text-xs text-rose-100 flex items-start gap-2">
                      <span className="w-1 h-1 bg-rose-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Example Calculation */}
          <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
            <h4 className="font-medium text-white mb-3">{maximumDemand.exampleCalculation.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-rose-500/30">
                    <th className="text-left py-2 text-rose-200">Load Item</th>
                    <th className="text-left py-2 text-rose-200">Connected</th>
                    <th className="text-left py-2 text-rose-200">Diversity</th>
                    <th className="text-left py-2 text-rose-200">Diversified</th>
                  </tr>
                </thead>
                <tbody>
                  {maximumDemand.exampleCalculation.loads.map((load, idx) => (
                    <tr key={idx} className="border-b border-rose-500/20">
                      <td className="py-2 text-white text-xs">{load.item}</td>
                      <td className="py-2 text-gray-300 text-xs">{load.connected}</td>
                      <td className="py-2 text-gray-400 text-xs">{load.diversity}</td>
                      <td className="py-2 text-rose-300 text-xs font-medium">{load.diversified}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-rose-500/50">
                    <td colSpan={3} className="py-2 text-white font-medium">Total Diversified Load</td>
                    <td className="py-2 text-rose-300 font-bold">{maximumDemand.exampleCalculation.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-3 p-3 bg-rose-600/10 rounded border border-rose-500/30">
              <p className="text-xs text-rose-200"><strong>Calculation:</strong> {maximumDemand.exampleCalculation.calculation}</p>
              <p className="text-xs text-green-300 mt-1"><strong>Conclusion:</strong> {maximumDemand.exampleCalculation.conclusion}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power Factor Correction */}
      <Card className="border-teal-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gauge className="h-6 w-6 text-teal-400" />
            <CardTitle className="text-teal-300">{powerFactorCorrection.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{powerFactorCorrection.description}</p>

          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-white mb-3">Power Factor Basics</h4>
            <ul className="space-y-2">
              {powerFactorCorrection.basics.explanation.map((item, idx) => (
                <li key={idx} className="text-sm text-teal-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-teal-300 font-mono text-sm"><strong>Formula:</strong> {powerFactorCorrection.basics.formula}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-white">Correction Methods</h4>
            {powerFactorCorrection.correctionMethods.map((method, index) => (
              <div key={index} className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                <h5 className="font-medium text-teal-200 mb-2">{method.method}</h5>
                <p className="text-xs text-gray-300 mb-2">{method.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-green-400">Advantages: </span>
                    <span className="text-green-200">{method.advantages}</span>
                  </div>
                  <div>
                    <span className="text-orange-400">Disadvantages: </span>
                    <span className="text-orange-200">{method.disadvantages}</span>
                  </div>
                </div>
                <p className="text-xs text-teal-300 mt-2"><strong>Suitable for:</strong> {method.suitableFor}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
              <h4 className="font-medium text-teal-200 mb-3">Typical Power Factors</h4>
              <div className="space-y-1">
                {powerFactorCorrection.typicalValues.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-gray-300">{item.load}</span>
                    <span className="text-teal-300">{item.pf}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-medium text-red-200 mb-3">Safety Considerations</h4>
              <ul className="space-y-1">
                {powerFactorCorrection.safetyConsiderations.map((item, idx) => (
                  <li key={idx} className="text-xs text-red-100 flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Socket Circuits: Ring vs Radial */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">{socketCircuits.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{socketCircuits.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ring Circuit */}
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-white mb-2">{socketCircuits.comparison.ring.title}</h4>
              <p className="text-xs text-green-200 mb-3">
                <strong>Protection:</strong> {socketCircuits.comparison.ring.protection}
                <br />
                <strong>Max Area:</strong> {socketCircuits.comparison.ring.maxArea}
              </p>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-green-300 font-medium">Advantages:</span>
                  <ul className="mt-1 space-y-0.5">
                    {socketCircuits.comparison.ring.advantages.map((adv, idx) => (
                      <li key={idx} className="text-xs text-green-100">+ {adv}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs text-orange-300 font-medium">Disadvantages:</span>
                  <ul className="mt-1 space-y-0.5">
                    {socketCircuits.comparison.ring.disadvantages.map((dis, idx) => (
                      <li key={idx} className="text-xs text-orange-100">- {dis}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-blue-300 mt-2"><strong>Best for:</strong> {socketCircuits.comparison.ring.bestFor}</p>
            </div>

            {/* Radial Circuit */}
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-white mb-2">{socketCircuits.comparison.radial.title}</h4>
              <div className="text-xs text-green-200 mb-3">
                <strong>Options:</strong>
                <ul className="mt-1">
                  {socketCircuits.comparison.radial.options.map((opt, idx) => (
                    <li key={idx}>{opt.protection} - Max {opt.maxArea}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-green-300 font-medium">Advantages:</span>
                  <ul className="mt-1 space-y-0.5">
                    {socketCircuits.comparison.radial.advantages.map((adv, idx) => (
                      <li key={idx} className="text-xs text-green-100">+ {adv}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs text-orange-300 font-medium">Disadvantages:</span>
                  <ul className="mt-1 space-y-0.5">
                    {socketCircuits.comparison.radial.disadvantages.map((dis, idx) => (
                      <li key={idx} className="text-xs text-orange-100">- {dis}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-blue-300 mt-2"><strong>Best for:</strong> {socketCircuits.comparison.radial.bestFor}</p>
            </div>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <h4 className="font-medium text-white mb-3">Commercial Considerations</h4>
            <ul className="space-y-1">
              {socketCircuits.commercialConsiderations.map((item, idx) => (
                <li key={idx} className="text-xs text-green-100 flex items-start gap-2">
                  <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200 text-sm">
              {socketCircuits.recommendation}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Server Room & IT Power */}
      <Card className="border-indigo-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="h-6 w-6 text-indigo-400" />
            <CardTitle className="text-indigo-300">{serverRoomPower.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">{serverRoomPower.description}</p>

          {/* Power Supply Architecture */}
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-3">{serverRoomPower.supplyRequirements.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serverRoomPower.supplyRequirements.configurations.map((config, idx) => (
                <div key={idx} className="bg-indigo-600/10 p-3 rounded border border-indigo-500/30">
                  <h5 className="font-medium text-indigo-200 text-sm mb-1">{config.type}</h5>
                  <p className="text-xs text-gray-300 mb-1">{config.description}</p>
                  <p className="text-xs text-yellow-300"><strong>Reliability:</strong> {config.reliability}</p>
                  <p className="text-xs text-green-300"><strong>Suitable for:</strong> {config.suitableFor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* UPS Requirements */}
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-3">{serverRoomPower.upsRequirements.title}</h4>
            <div className="space-y-3">
              {serverRoomPower.upsRequirements.types.map((type, idx) => (
                <div key={idx} className="bg-indigo-600/10 p-3 rounded border border-indigo-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-indigo-200 text-sm">{type.type}</h5>
                    <Badge variant="outline" className="border-indigo-400 text-indigo-300 text-xs">
                      Transfer: {type.transferTime}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-300 mb-1">{type.description}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-green-300"><strong>Efficiency:</strong> {type.efficiency}</span>
                    <span className="text-blue-300"><strong>For:</strong> {type.suitableFor}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="font-medium text-indigo-200 mb-2 text-sm">UPS Sizing Considerations</h5>
                <ul className="space-y-1">
                  {serverRoomPower.upsRequirements.sizing.map((item, idx) => (
                    <li key={idx} className="text-xs text-indigo-100 flex items-start gap-2">
                      <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-indigo-200 mb-2 text-sm">Installation Requirements</h5>
                <ul className="space-y-1">
                  {serverRoomPower.upsRequirements.installation.map((item, idx) => (
                    <li key={idx} className="text-xs text-indigo-100 flex items-start gap-2">
                      <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Clean Earth */}
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-3">{serverRoomPower.cleanEarth.title}</h4>
            <p className="text-xs text-gray-300 mb-3">{serverRoomPower.cleanEarth.description}</p>

            <div className="space-y-3 mb-4">
              {serverRoomPower.cleanEarth.methods.map((method, idx) => (
                <div key={idx} className="bg-indigo-600/10 p-3 rounded border border-indigo-500/30">
                  <h5 className="font-medium text-indigo-200 text-sm mb-1">{method.method}</h5>
                  <p className="text-xs text-gray-300">{method.description}</p>
                  <p className="text-xs text-blue-200"><strong>Installation:</strong> {method.installation}</p>
                  <p className="text-xs text-gray-400"><strong>Note:</strong> {method.notes}</p>
                </div>
              ))}
            </div>

            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-xs">
                <strong>Critical Points:</strong>
                <ul className="mt-1 space-y-0.5">
                  {serverRoomPower.cleanEarth.criticalPoints.map((point, idx) => (
                    <li key={idx}>- {point}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          {/* Power Distribution & Cooling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
              <h4 className="font-medium text-white mb-3">{serverRoomPower.powerDistribution.title}</h4>
              <div className="space-y-2">
                {serverRoomPower.powerDistribution.components.map((comp, idx) => (
                  <div key={idx} className="bg-indigo-600/10 p-2 rounded border border-indigo-500/30">
                    <h5 className="font-medium text-indigo-200 text-xs">{comp.item}</h5>
                    <p className="text-xs text-gray-400">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
              <h4 className="font-medium text-white mb-3">{serverRoomPower.coolingIntegration.title}</h4>
              <ul className="space-y-1">
                {serverRoomPower.coolingIntegration.items.map((item, idx) => (
                  <li key={idx} className="text-xs text-indigo-100 flex items-start gap-2">
                    <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commercial Circuit Design Summary */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Commercial Circuit Design Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {circuitDesign.map((circuit, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-base mb-1">{circuit.circuit}</h4>
                  <p className="text-sm text-neutral-300">{circuit.design}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                    {circuit.cable}
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                    {circuit.protection}
                  </Badge>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-green-200 mb-2 text-sm">Features</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {circuit.features.map((feature, idx) => (
                    <div key={idx} className="text-xs text-green-100 flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2 italic">Note: {circuit.notes}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialCircuitGuide;
