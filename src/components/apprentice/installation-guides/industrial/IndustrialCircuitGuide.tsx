
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Settings,
  Shield,
  AlertTriangle,
  Factory,
  Wrench,
  Eye,
  CheckCircle,
  Cog,
  Power,
  Cable,
  Gauge,
  StopCircle,
  Lock,
  Thermometer
} from "lucide-react";

const IndustrialCircuitGuide = () => {
  // Motor Starting Methods
  const motorStartingMethods = [
    {
      method: "Direct On-Line (DOL)",
      maxPower: "Up to 7.5kW (typical)",
      startingCurrent: "6-8x Full Load Current",
      startingTorque: "100% rated torque",
      advantages: [
        "Simple and lowest cost",
        "High starting torque",
        "Compact installation",
        "Easy to maintain"
      ],
      disadvantages: [
        "High inrush current",
        "Mechanical shock to driven equipment",
        "Voltage dip on supply",
        "May trip protection devices"
      ],
      application: "Small pumps, fans, compressors where high starting torque is acceptable",
      components: "Contactor, overload relay, isolator, start/stop buttons"
    },
    {
      method: "Star-Delta (Y-D)",
      maxPower: "7.5kW - 45kW",
      startingCurrent: "2-3x Full Load Current (1/3 of DOL)",
      startingTorque: "33% rated torque",
      advantages: [
        "Reduced starting current (1/3 of DOL)",
        "Lower voltage dip",
        "Suitable for light starting loads",
        "Cost-effective for medium motors"
      ],
      disadvantages: [
        "Reduced starting torque",
        "Current spike on changeover",
        "Requires 6-wire motor connection",
        "Not for high inertia loads"
      ],
      application: "Centrifugal pumps, fans, compressors with low starting torque requirements",
      components: "3 contactors, timer, overload relay, star-delta starter unit"
    },
    {
      method: "Soft Starter",
      maxPower: "5.5kW - 500kW+",
      startingCurrent: "2-4x Full Load Current (adjustable)",
      startingTorque: "Adjustable via ramp settings",
      advantages: [
        "Smooth, controlled acceleration",
        "Adjustable starting parameters",
        "Reduced mechanical stress",
        "Soft stop capability",
        "Built-in motor protection"
      ],
      disadvantages: [
        "Higher initial cost than DOL/Y-D",
        "Generates harmonics during start",
        "Reduced starting torque at low voltage",
        "Heat generation in thyristors"
      ],
      application: "Conveyors, crushers, pumps, fans requiring smooth acceleration",
      components: "Soft starter unit, bypass contactor (optional), control circuit"
    },
    {
      method: "Variable Frequency Drive (VFD)",
      maxPower: "0.37kW - 1MW+",
      startingCurrent: "1-1.5x Full Load Current",
      startingTorque: "Up to 150% rated torque",
      advantages: [
        "Full speed control",
        "Energy savings at partial load",
        "Lowest starting current",
        "Built-in protection features",
        "Process optimisation capability"
      ],
      disadvantages: [
        "Highest initial cost",
        "Generates harmonics (requires filtering)",
        "EMC considerations required",
        "Motor cable length limitations",
        "Requires specialist knowledge"
      ],
      application: "Pumps, fans, conveyors, cranes, any application needing speed control",
      components: "VFD unit, line reactor/filter, motor cable (screened), EMC filter"
    }
  ];

  // Motor Protection Types
  const motorProtection = [
    {
      type: "Thermal Overload Relay",
      function: "Protects against sustained overload conditions",
      mechanism: "Bimetallic strips or electronic sensing",
      tripClass: "Class 10, 20, or 30 (time to trip)",
      settings: "Set to 100-105% of motor FLC",
      features: [
        "Manual or automatic reset",
        "Adjustable current setting",
        "Test button for function check",
        "Phase loss protection (some models)"
      ],
      notes: "Standard protection for most motor circuits"
    },
    {
      type: "Electronic Motor Protection Relay",
      function: "Comprehensive motor protection with multiple functions",
      mechanism: "Current transformers and microprocessor",
      tripClass: "Programmable trip characteristics",
      settings: "Multiple parameters via keypad/software",
      features: [
        "Overload protection",
        "Phase unbalance detection",
        "Phase loss/reversal",
        "Ground fault protection",
        "Stall protection",
        "Underload detection"
      ],
      notes: "Recommended for critical motors and larger applications"
    },
    {
      type: "Thermistor Protection",
      function: "Direct motor winding temperature monitoring",
      mechanism: "PTC thermistors embedded in windings",
      tripClass: "Instantaneous on temperature threshold",
      settings: "Fixed threshold (typically 130-155C)",
      features: [
        "Direct temperature measurement",
        "Protects against blocked ventilation",
        "High ambient temperature protection",
        "Rapid response to overheating"
      ],
      notes: "Essential for motors in harsh environments"
    },
    {
      type: "Phase Failure Relay",
      function: "Detects loss or severe imbalance of supply phases",
      mechanism: "Voltage or current monitoring",
      tripClass: "Instantaneous (typically < 2 seconds)",
      settings: "Threshold adjustment for sensitivity",
      features: [
        "Phase loss detection",
        "Phase reversal detection",
        "Voltage imbalance monitoring",
        "Under/over voltage protection"
      ],
      notes: "Critical for preventing single-phasing damage"
    },
    {
      type: "Earth Fault Protection",
      function: "Detects current leakage to earth",
      mechanism: "Core balance CT or residual current sensing",
      tripClass: "Adjustable time delay",
      settings: "Typically 30mA-30A depending on application",
      features: [
        "Ground fault current detection",
        "Adjustable sensitivity",
        "Time delay for discrimination",
        "Integration with protection scheme"
      ],
      notes: "Essential for personnel and equipment protection"
    }
  ];

  // Control Circuits
  const controlCircuits = [
    {
      voltage: "24V DC",
      application: "PLC-based Control Systems",
      advantages: [
        "Safe voltage - no shock risk",
        "Compatible with PLCs and sensors",
        "Fast switching response",
        "No coil buzz or chatter",
        "Suitable for intrinsically safe circuits"
      ],
      cableRequirements: "Multi-core screened cable, typically 0.5-1.5mm2",
      protection: "Fused at source, typically 2-10A per circuit",
      typicalUse: [
        "PLC I/O connections",
        "Proximity sensors",
        "Photoelectric sensors",
        "Limit switches",
        "Indicator lamps (LED)"
      ]
    },
    {
      voltage: "110V AC (CTE)",
      application: "Standard Industrial Control Voltage",
      advantages: [
        "Reduced shock risk (centre-tapped earth)",
        "55V to earth maximum",
        "Industry standard for UK",
        "Wide range of control devices available"
      ],
      cableRequirements: "1.5mm2 multi-core, often with pilot cores",
      protection: "MCB or fuses at control transformer secondary",
      typicalUse: [
        "Contactor coils",
        "Control relays",
        "Push buttons and switches",
        "Indicator lamps",
        "Motor starters"
      ]
    },
    {
      voltage: "230V AC",
      application: "Higher Power Control Devices",
      advantages: [
        "Standard supply voltage",
        "Suitable for larger solenoids",
        "Direct connection to mains possible"
      ],
      cableRequirements: "1.5mm2 minimum, SWA for external routes",
      protection: "MCB protection, consider RCD for socket outlets",
      typicalUse: [
        "Large solenoid valves",
        "Electric actuators",
        "Heating elements",
        "240V coil contactors",
        "Convenience outlets in panels"
      ]
    }
  ];

  // Interlock Circuits
  const interlockCircuits = [
    {
      type: "Electrical Interlock",
      description: "Prevents simultaneous operation of incompatible equipment",
      example: "Forward/reverse motor operation",
      implementation: [
        "Auxiliary contacts wired in series with opposing coil",
        "NC contact of forward contactor in reverse coil circuit",
        "NC contact of reverse contactor in forward coil circuit",
        "Ensures only one contactor can operate at a time"
      ],
      diagram: "FWD(NC) -> REV Coil | REV(NC) -> FWD Coil"
    },
    {
      type: "Mechanical Interlock",
      description: "Physical barrier preventing simultaneous contact operation",
      example: "Changeover switches, interlock units",
      implementation: [
        "Mechanical linkage between contactors",
        "Physical bar prevents both contactors closing",
        "Used in addition to electrical interlock",
        "Provides backup protection"
      ],
      diagram: "Mechanical bar between contactor armatures"
    },
    {
      type: "Guard Interlock",
      description: "Safety interlock for machinery guards",
      example: "Machine guard door switches",
      implementation: [
        "Guard switch in series with start circuit",
        "Opening guard removes control power",
        "May include guard locking (prevents opening during cycle)",
        "Often safety-rated switches (ISO 14119)"
      ],
      diagram: "Guard Switch -> Safety Relay -> Contactor"
    },
    {
      type: "Sequence Interlock",
      description: "Ensures correct operational sequence",
      example: "Conveyor system startup sequence",
      implementation: [
        "Downstream equipment starts before upstream",
        "Auxiliary contacts prove equipment running",
        "Timer relays for sequence delays",
        "Prevents material pile-up"
      ],
      diagram: "Conveyor 3 -> Conveyor 2 -> Conveyor 1 (start sequence)"
    }
  ];

  // Emergency Stop Circuits (BS EN 60204-1)
  const emergencyStopCircuits = {
    requirements: [
      {
        aspect: "Category Selection",
        description: "Based on risk assessment per BS EN 60204-1",
        categories: [
          {
            category: "Category 0",
            action: "Immediate removal of power to machine actuators",
            method: "Uncontrolled stop by immediately removing power",
            use: "Where fastest possible stop is required"
          },
          {
            category: "Category 1",
            action: "Controlled stop with power removal after stopping",
            method: "Power available for braking, then removed",
            use: "Where controlled deceleration prevents hazard"
          },
          {
            category: "Category 2",
            action: "Controlled stop with power maintained",
            method: "Machine stopped but power remains available",
            use: "Where power-off would create additional hazard"
          }
        ]
      }
    ],
    buttonRequirements: [
      "Red mushroom head actuator",
      "Yellow background (where practicable)",
      "Self-latching (maintained) operation",
      "Direct opening action contacts",
      "Clearly marked 'EMERGENCY STOP' or E-STOP symbol",
      "Release by rotation, key, or special tool"
    ],
    circuitDesign: [
      "Hardwired - not software dependent",
      "Fail-safe design (wire break = safe state)",
      "Series connection of all E-stop devices",
      "Monitoring of device function (dual channel for higher categories)",
      "Must not be used as routine stop method",
      "Reset required before restart"
    ],
    safetyCategories: [
      {
        category: "Category B",
        description: "Basic safety function, no fault tolerance",
        mtbf: "Not specified",
        application: "Low risk applications only"
      },
      {
        category: "Category 1",
        description: "Enhanced reliability through component selection",
        mtbf: "Not specified",
        application: "Low-medium risk"
      },
      {
        category: "Category 2",
        description: "Safety function checked at intervals",
        mtbf: "Not specified",
        application: "Medium risk with checking"
      },
      {
        category: "Category 3",
        description: "Single fault does not lead to loss of safety function",
        mtbf: "High",
        application: "High risk applications"
      },
      {
        category: "Category 4",
        description: "Fault accumulation does not lead to loss of safety function",
        mtbf: "Very High",
        application: "Highest risk applications"
      }
    ]
  };

  // Machine Isolation (LOTO)
  const lockoutTagout = {
    principles: [
      {
        step: 1,
        action: "Prepare",
        details: [
          "Identify all energy sources (electrical, pneumatic, hydraulic, etc.)",
          "Locate all isolation points",
          "Notify affected personnel",
          "Obtain appropriate locks and tags"
        ]
      },
      {
        step: 2,
        action: "Shut Down",
        details: [
          "Use normal stopping procedure",
          "Operate emergency stop if required",
          "Wait for machine to stop completely",
          "Observe any run-down time"
        ]
      },
      {
        step: 3,
        action: "Isolate",
        details: [
          "Open all energy isolating devices",
          "Electrical: Open disconnector/isolator",
          "Pneumatic: Close and vent supply",
          "Hydraulic: Release pressure, block/prop"
        ]
      },
      {
        step: 4,
        action: "Lock and Tag",
        details: [
          "Apply personal safety lock to each isolator",
          "Attach personal identification tag",
          "Each worker applies own lock (multi-lock hasp if needed)",
          "Keys retained by lock owner only"
        ]
      },
      {
        step: 5,
        action: "Prove Dead (Electrical)",
        details: [
          "Use approved voltage indicator (GS38 compliant)",
          "Prove indicator before and after test",
          "Test all phases L1-L2, L2-L3, L3-L1, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E",
          "Confirm zero voltage at work location"
        ]
      },
      {
        step: 6,
        action: "Release Stored Energy",
        details: [
          "Discharge capacitors",
          "Release springs and tensioned parts",
          "Block or prop raised elements",
          "Vent pressure systems"
        ]
      }
    ],
    lockTypes: [
      {
        type: "Personal Safety Lock",
        description: "Individual lock, one key only held by owner",
        use: "Primary isolation lock for each worker"
      },
      {
        type: "Department Lock",
        description: "Controlled by supervisor, multiple keys may exist",
        use: "Group lockout situations"
      },
      {
        type: "Multi-lock Hasp",
        description: "Allows multiple locks on single isolation point",
        use: "When multiple workers need to lock out same equipment"
      }
    ]
  };

  // Industrial Cable Types
  const industrialCables = [
    {
      type: "Steel Wire Armoured (SWA)",
      construction: "XLPE insulated, steel wire armour, PVC sheath",
      voltageRating: "600/1000V",
      applications: [
        "Underground distribution",
        "Surface mounted power cables",
        "External cable runs",
        "Industrial submains"
      ],
      advantages: [
        "Mechanical protection from armour",
        "Can use armour as CPC (with care)",
        "Suitable for direct burial",
        "Good current carrying capacity"
      ],
      installation: [
        "Terminate with proper cable glands",
        "Support at regular intervals",
        "Minimum bend radius 6x diameter",
        "Earth armour at both ends"
      ]
    },
    {
      type: "Mineral Insulated Copper Clad (MICC)",
      construction: "Copper conductors, magite insulation, copper sheath",
      voltageRating: "500V or 750V",
      applications: [
        "Fire survival circuits",
        "High temperature environments",
        "Emergency lighting circuits",
        "Critical power feeds"
      ],
      advantages: [
        "Completely non-combustible",
        "Maintains circuit integrity in fire",
        "Very long life expectancy",
        "Small diameter for rating"
      ],
      installation: [
        "Specialist termination required (pots, seals)",
        "Must seal against moisture ingress",
        "Requires competent installer training",
        "Support to prevent strain on terminations"
      ]
    },
    {
      type: "Fire Performance (FP) Cables",
      construction: "Special fire-resistant insulation, various armour options",
      voltageRating: "300/500V typical",
      applications: [
        "Fire alarm circuits",
        "Emergency lighting",
        "Smoke ventilation systems",
        "Voice alarm systems"
      ],
      advantages: [
        "Maintains circuit integrity in fire",
        "Easier to install than MICC",
        "No special termination required",
        "Good flexibility"
      ],
      installation: [
        "Enhanced fire rated clips required",
        "Route away from fire hazards where possible",
        "Follow manufacturer fixing requirements",
        "Segregate from non-fire rated cables"
      ]
    },
    {
      type: "Armoured Instrumentation Cable",
      construction: "Screened pairs/triads, overall armour",
      voltageRating: "300/500V",
      applications: [
        "4-20mA instrument signals",
        "Thermocouple connections",
        "RTD circuits",
        "Communication cables"
      ],
      advantages: [
        "EMI/RFI screening",
        "Mechanical protection",
        "Low noise pickup",
        "Accurate signal transmission"
      ],
      installation: [
        "Screen earthed at one end only (typically control room)",
        "Separate from power cables",
        "Use proper glands maintaining screen continuity",
        "Label cores clearly"
      ]
    }
  ];

  // Cable Sizing Derating
  const cableDeratingFactors = {
    grouping: [
      { cables: 1, factor: 1.00 },
      { cables: 2, factor: 0.80 },
      { cables: 3, factor: 0.70 },
      { cables: 4, factor: 0.65 },
      { cables: 5, factor: 0.60 },
      { cables: 6, factor: 0.57 },
      { cables: "7-9", factor: 0.50 },
      { cables: "10-12", factor: 0.45 },
      { cables: "13-16", factor: 0.41 },
      { cables: "17-20", factor: 0.38 }
    ],
    ambientTemperature: [
      { temp: "25C", pvc: 1.03, xlpe: 1.04 },
      { temp: "30C", pvc: 1.00, xlpe: 1.00 },
      { temp: "35C", pvc: 0.94, xlpe: 0.96 },
      { temp: "40C", pvc: 0.87, xlpe: 0.91 },
      { temp: "45C", pvc: 0.79, xlpe: 0.87 },
      { temp: "50C", pvc: 0.71, xlpe: 0.82 },
      { temp: "55C", pvc: 0.61, xlpe: 0.76 },
      { temp: "60C", pvc: 0.50, xlpe: 0.71 }
    ],
    thermalInsulation: [
      { condition: "Cable touching thermal insulation one side", factor: 0.75 },
      { condition: "Cable surrounded by thermal insulation < 100mm", factor: 0.63 },
      { condition: "Cable surrounded by thermal insulation 100-200mm", factor: 0.55 },
      { condition: "Cable surrounded by thermal insulation 200-400mm", factor: 0.50 },
      { condition: "Cable surrounded by thermal insulation > 400mm", factor: 0.45 }
    ]
  };

  // Busbar Systems
  const busbarSystems = [
    {
      type: "Rising Main / Busbar Trunking",
      description: "Prefabricated busbar system for vertical or horizontal distribution",
      ratings: "100A - 6300A typical",
      applications: [
        "High-rise building distribution",
        "Factory main distribution",
        "Data centre power distribution",
        "Easy relocation of tap-off points"
      ],
      features: [
        "Factory assembled and tested",
        "IP rated enclosure (typically IP54+)",
        "Plug-in tap-off boxes",
        "Fire barrier options available",
        "Copper or aluminium conductors"
      ],
      installation: [
        "Structural support required",
        "Allow for thermal expansion",
        "Fire stopping at floor penetrations",
        "Testing of joints after installation"
      ]
    },
    {
      type: "LV Switchboard Busbars",
      description: "Internal distribution within switchboards and panels",
      ratings: "100A - 6300A",
      applications: [
        "Main LV switchboards",
        "Motor control centres",
        "Distribution boards",
        "Generator switchgear"
      ],
      features: [
        "Copper (most common) or aluminium",
        "Various cross-sections for different ratings",
        "Colour coded: L1=Brown, L2=Black, L3=Grey, N=Blue",
        "Insulated or bare conductors"
      ],
      installation: [
        "Adequate clearances for voltage level",
        "Joint resistance testing",
        "Torque settings for connections",
        "Regular thermographic inspection"
      ]
    }
  ];

  // Power Factor Correction
  const powerFactorCorrection = {
    basics: {
      definition: "Power Factor is the ratio of Real Power (kW) to Apparent Power (kVA)",
      formula: "Power Factor = kW / kVA = cos(phi)",
      problem: "Low power factor means higher current for same power, causing losses and charges",
      target: "Typically aim for 0.95 or higher to avoid utility penalties"
    },
    causes: [
      "Induction motors (especially lightly loaded)",
      "Welding equipment",
      "Fluorescent lighting with magnetic ballasts",
      "Variable frequency drives (input side)",
      "Transformers (especially lightly loaded)"
    ],
    solutions: [
      {
        method: "Static Capacitor Banks",
        description: "Fixed capacitor installation",
        application: "Constant, predictable loads",
        advantages: [
          "Low cost",
          "No moving parts",
          "Simple installation"
        ],
        disadvantages: [
          "Fixed correction only",
          "Can cause leading PF if load reduces",
          "Resonance risk with harmonics"
        ]
      },
      {
        method: "Automatic PFC Systems",
        description: "Switched capacitor stages controlled by PF controller",
        application: "Variable loads",
        advantages: [
          "Maintains target PF",
          "Adapts to load changes",
          "Prevents leading power factor"
        ],
        disadvantages: [
          "Higher cost",
          "Requires controller programming",
          "Capacitor switching transients"
        ]
      },
      {
        method: "Detuned Filter Systems",
        description: "Capacitors with series reactors to avoid resonance",
        application: "Systems with harmonic distortion",
        advantages: [
          "Safe operation with harmonics",
          "Prevents capacitor damage",
          "Some harmonic filtering effect"
        ],
        disadvantages: [
          "More expensive than plain capacitors",
          "Larger physical size",
          "Reduced effective kVAr"
        ]
      }
    ],
    equipmentConsiderations: [
      "Inrush current limiting (switching, soft-start)",
      "Harmonic voltage distortion assessment",
      "Short circuit rating of capacitors",
      "Discharge resistors for safety",
      "Overcurrent and overvoltage protection"
    ]
  };

  // Harmonic Filtering
  const harmonicFiltering = {
    basics: {
      definition: "Harmonics are voltages or currents at frequencies that are multiples of the fundamental (50Hz)",
      commonHarmonics: "3rd (150Hz), 5th (250Hz), 7th (350Hz), 11th, 13th are most common",
      sources: "VFDs, UPS systems, LED drivers, switched-mode power supplies, arc furnaces"
    },
    effects: [
      "Overheating of cables and transformers",
      "Nuisance tripping of protection devices",
      "Interference with sensitive equipment",
      "Increased neutral current (triplen harmonics)",
      "Capacitor bank failures",
      "Motor heating and noise"
    ],
    solutions: [
      {
        type: "Passive Filters",
        description: "LC circuits tuned to specific harmonic frequencies",
        application: "Known harmonic sources, specific frequencies",
        pros: "Lower cost, no power supply needed",
        cons: "Fixed frequency, can amplify non-target harmonics"
      },
      {
        type: "Active Filters",
        description: "Electronic devices injecting anti-phase harmonic currents",
        application: "Multiple harmonic sources, variable loads",
        pros: "Broad frequency range, adaptive",
        cons: "Higher cost, requires power supply"
      },
      {
        type: "Line Reactors",
        description: "Series inductors to limit harmonic current",
        application: "VFD input circuits",
        pros: "Simple, inexpensive, limits inrush",
        cons: "Voltage drop, limited effectiveness"
      },
      {
        type: "Multi-pulse Rectifiers",
        description: "12, 18, or 24 pulse rectifier configurations",
        application: "Large VFDs and UPS",
        pros: "Very effective reduction, no additional equipment",
        cons: "Requires special transformer, higher drive cost"
      }
    ],
    thd: {
      definition: "Total Harmonic Distortion - measure of overall harmonic content",
      limits: "Engineering Recommendation G5/4-1 specifies limits for connection to UK network",
      planning: "THD assessment required for significant non-linear loads"
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Industrial Circuit Design Guide</CardTitle>
          </div>
          <p className="text-neutral-300">
            Comprehensive specifications for industrial electrical systems including motor control,
            protection, cable selection, and power quality management.
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="starting" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1 h-auto">
          <TabsTrigger value="starting" className="text-xs px-2 py-2">Motor Starting</TabsTrigger>
          <TabsTrigger value="protection" className="text-xs px-2 py-2">Motor Protection</TabsTrigger>
          <TabsTrigger value="control" className="text-xs px-2 py-2">Control Circuits</TabsTrigger>
          <TabsTrigger value="estop" className="text-xs px-2 py-2">E-Stop & LOTO</TabsTrigger>
          <TabsTrigger value="cables" className="text-xs px-2 py-2">Cables & Sizing</TabsTrigger>
        </TabsList>

        {/* Motor Starting Methods */}
        <TabsContent value="starting" className="space-y-4">
          <Card className="border-blue-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cog className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Motor Starting Methods</CardTitle>
              </div>
              <p className="text-neutral-300">
                Selection of starting method depends on motor size, supply capacity, and application requirements
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {motorStartingMethods.map((method, index) => (
                <div key={index} className="bg-blue-500/10 p-5 rounded-lg border border-blue-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
                    <h3 className="font-bold text-blue-300 text-lg">{method.method}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-blue-400 text-blue-300">
                        {method.maxPower}
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        Start Current: {method.startingCurrent}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-500/5 p-3 rounded border border-blue-500/10">
                      <h4 className="font-medium text-blue-200 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Advantages
                      </h4>
                      <ul className="space-y-1">
                        {method.advantages.map((adv, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">+</span>
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-orange-500/5 p-3 rounded border border-orange-500/10">
                      <h4 className="font-medium text-orange-200 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        Disadvantages
                      </h4>
                      <ul className="space-y-1">
                        {method.disadvantages.map((dis, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                            <span className="text-orange-400 mt-1">-</span>
                            {dis}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-blue-300 font-medium">Starting Torque: </span>
                      <span className="text-neutral-300">{method.startingTorque}</span>
                    </div>
                    <div>
                      <span className="text-blue-300 font-medium">Components: </span>
                      <span className="text-neutral-300">{method.components}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-blue-300 font-medium">Application: </span>
                      <span className="text-neutral-300">{method.application}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card className="border-purple-500/30 bg-white/5">
            <CardHeader>
              <CardTitle className="text-purple-300">Quick Comparison Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-500/30">
                      <th className="text-left py-3 px-2 text-purple-300">Method</th>
                      <th className="text-left py-3 px-2 text-purple-300">Starting Current</th>
                      <th className="text-left py-3 px-2 text-purple-300">Starting Torque</th>
                      <th className="text-left py-3 px-2 text-purple-300">Cost</th>
                      <th className="text-left py-3 px-2 text-purple-300">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-300">
                    <tr className="border-b border-purple-500/20">
                      <td className="py-2 px-2 font-medium">DOL</td>
                      <td className="py-2 px-2">6-8x FLC</td>
                      <td className="py-2 px-2">100%</td>
                      <td className="py-2 px-2 text-green-400">Lowest</td>
                      <td className="py-2 px-2">Small motors, strong supply</td>
                    </tr>
                    <tr className="border-b border-purple-500/20">
                      <td className="py-2 px-2 font-medium">Star-Delta</td>
                      <td className="py-2 px-2">2-3x FLC</td>
                      <td className="py-2 px-2">33%</td>
                      <td className="py-2 px-2 text-blue-400">Low-Medium</td>
                      <td className="py-2 px-2">Light loads, fans, pumps</td>
                    </tr>
                    <tr className="border-b border-purple-500/20">
                      <td className="py-2 px-2 font-medium">Soft Starter</td>
                      <td className="py-2 px-2">2-4x FLC</td>
                      <td className="py-2 px-2">Variable</td>
                      <td className="py-2 px-2 text-yellow-400">Medium</td>
                      <td className="py-2 px-2">Conveyors, pumps, smooth start</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-medium">VFD</td>
                      <td className="py-2 px-2">1-1.5x FLC</td>
                      <td className="py-2 px-2">Up to 150%</td>
                      <td className="py-2 px-2 text-orange-400">Highest</td>
                      <td className="py-2 px-2">Speed control required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Motor Protection */}
        <TabsContent value="protection" className="space-y-4">
          <Card className="border-green-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">Motor Protection Systems</CardTitle>
              </div>
              <p className="text-neutral-300">
                Comprehensive motor protection prevents costly damage and downtime
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {motorProtection.map((protection, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <h3 className="font-bold text-green-300">{protection.type}</h3>
                    <Badge variant="outline" className="border-green-400 text-green-300 w-fit">
                      {protection.tripClass}
                    </Badge>
                  </div>

                  <p className="text-neutral-300 mb-3">{protection.function}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-green-200 font-medium text-sm">Mechanism: </span>
                      <span className="text-neutral-300 text-sm">{protection.mechanism}</span>
                    </div>
                    <div>
                      <span className="text-green-200 font-medium text-sm">Settings: </span>
                      <span className="text-neutral-300 text-sm">{protection.settings}</span>
                    </div>
                  </div>

                  <div className="bg-green-500/5 p-3 rounded">
                    <h4 className="text-green-200 font-medium text-sm mb-2">Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {protection.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-neutral-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-yellow-300 mt-3 italic">{protection.notes}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Protection Coordination Notice */}
          <Card className="border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Protection Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-neutral-300 text-sm">
                Motor protection must be coordinated with upstream protection to ensure:
              </p>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span><strong className="text-orange-300">Discrimination:</strong> Motor overload trips before upstream MCB/fuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span><strong className="text-orange-300">Starting Current:</strong> Protection allows for motor starting current (typically up to 30 seconds)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span><strong className="text-orange-300">Fault Current:</strong> Short circuit protection clears faults before motor/cable damage</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Control Circuits */}
        <TabsContent value="control" className="space-y-4">
          <Card className="border-purple-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Control Circuit Voltages</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {controlCircuits.map((circuit, index) => (
                <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-bold text-purple-300 text-lg">{circuit.voltage}</h3>
                    <Badge variant="outline" className="border-purple-400 text-purple-300">
                      {circuit.application}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-purple-200 font-medium text-sm mb-2">Advantages:</h4>
                      <ul className="space-y-1">
                        {circuit.advantages.map((adv, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-1" />
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-purple-200 font-medium text-sm mb-2">Typical Uses:</h4>
                      <ul className="space-y-1">
                        {circuit.typicalUse.map((use, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                            <Zap className="h-3 w-3 text-purple-400 mt-1" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-purple-500/5 p-3 rounded">
                    <div>
                      <span className="text-purple-300 font-medium">Cable: </span>
                      <span className="text-neutral-300">{circuit.cableRequirements}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Protection: </span>
                      <span className="text-neutral-300">{circuit.protection}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Interlock Circuits */}
          <Card className="border-blue-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Interlock Circuits</CardTitle>
              </div>
              <p className="text-neutral-300">
                Interlocks prevent unsafe or undesired equipment operation sequences
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {interlockCircuits.map((interlock, index) => (
                <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h3 className="font-bold text-blue-300 mb-2">{interlock.type}</h3>
                  <p className="text-neutral-300 text-sm mb-3">{interlock.description}</p>

                  <div className="mb-3">
                    <span className="text-blue-200 font-medium text-sm">Example: </span>
                    <span className="text-neutral-300 text-sm">{interlock.example}</span>
                  </div>

                  <div className="bg-blue-500/5 p-3 rounded">
                    <h4 className="text-blue-200 font-medium text-sm mb-2">Implementation:</h4>
                    <ul className="space-y-1">
                      {interlock.implementation.map((impl, i) => (
                        <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                          <span className="text-blue-400">{i + 1}.</span>
                          {impl}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Stop & LOTO */}
        <TabsContent value="estop" className="space-y-4">
          {/* Emergency Stop */}
          <Card className="border-red-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <StopCircle className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">Emergency Stop Systems (BS EN 60204-1)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stop Categories */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h3 className="font-bold text-red-300 mb-3">Stop Categories</h3>
                <div className="space-y-3">
                  {emergencyStopCircuits.requirements[0].categories.map((cat, index) => (
                    <div key={index} className="bg-red-500/5 p-3 rounded border border-red-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-red-400 text-red-300">
                          {cat.category}
                        </Badge>
                        <span className="text-red-200 font-medium">{cat.action}</span>
                      </div>
                      <p className="text-neutral-300 text-sm mb-1">
                        <strong>Method:</strong> {cat.method}
                      </p>
                      <p className="text-neutral-300 text-sm">
                        <strong>Use:</strong> {cat.use}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button Requirements */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h3 className="font-bold text-red-300 mb-3">E-Stop Button Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {emergencyStopCircuits.buttonRequirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-300">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circuit Design */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h3 className="font-bold text-red-300 mb-3">Circuit Design Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {emergencyStopCircuits.circuitDesign.map((design, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Shield className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-300">{design}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Categories Table */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h3 className="font-bold text-red-300 mb-3">Safety Categories (ISO 13849-1)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-red-500/30">
                        <th className="text-left py-2 px-2 text-red-300">Category</th>
                        <th className="text-left py-2 px-2 text-red-300">Description</th>
                        <th className="text-left py-2 px-2 text-red-300">Application</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {emergencyStopCircuits.safetyCategories.map((cat, index) => (
                        <tr key={index} className="border-b border-red-500/20">
                          <td className="py-2 px-2 font-medium text-red-200">{cat.category}</td>
                          <td className="py-2 px-2">{cat.description}</td>
                          <td className="py-2 px-2">{cat.application}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lockout/Tagout */}
          <Card className="border-orange-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-orange-400" />
                <CardTitle className="text-orange-300">Lockout/Tagout (LOTO) Procedures</CardTitle>
              </div>
              <p className="text-neutral-300">
                Safe isolation procedures to protect workers during maintenance
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {lockoutTagout.principles.map((step, index) => (
                <div key={index} className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-300 font-bold">{step.step}</span>
                    </div>
                    <h3 className="font-bold text-orange-300">{step.action}</h3>
                  </div>
                  <ul className="space-y-2 ml-13">
                    {step.details.map((detail, i) => (
                      <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Lock Types */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">Lock Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {lockoutTagout.lockTypes.map((lock, index) => (
                    <div key={index} className="bg-orange-500/5 p-3 rounded border border-orange-500/10">
                      <h4 className="text-orange-200 font-medium mb-1">{lock.type}</h4>
                      <p className="text-neutral-300 text-sm mb-2">{lock.description}</p>
                      <p className="text-neutral-400 text-xs italic">{lock.use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Warning */}
          <Card className="border-red-500/50 bg-gradient-to-r from-red-500/20 to-orange-500/20">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Critical LOTO Safety Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-neutral-300">
              <p><strong className="text-red-300">Personal Locks Only:</strong> Never remove another person's lock. Each worker must apply and remove their own lock.</p>
              <p><strong className="text-red-300">Prove Dead:</strong> Always use a voltage indicator to prove dead before touching any conductor. Test the indicator before and after use.</p>
              <p><strong className="text-red-300">All Energy Sources:</strong> Identify and isolate ALL energy sources - electrical, pneumatic, hydraulic, mechanical (springs, gravity).</p>
              <p><strong className="text-red-300">Authorisation:</strong> Only authorised and competent persons may perform LOTO procedures.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cables & Sizing */}
        <TabsContent value="cables" className="space-y-4">
          {/* Cable Types */}
          <Card className="border-blue-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cable className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Industrial Cable Types</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {industrialCables.map((cable, index) => (
                <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                    <h3 className="font-bold text-blue-300">{cable.type}</h3>
                    <Badge variant="outline" className="border-blue-400 text-blue-300 w-fit">
                      {cable.voltageRating}
                    </Badge>
                  </div>

                  <p className="text-neutral-400 text-sm mb-3">{cable.construction}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-blue-200 font-medium text-sm mb-2">Applications:</h4>
                      <ul className="space-y-1">
                        {cable.applications.map((app, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-start gap-1">
                            <span className="text-blue-400">-</span> {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-200 font-medium text-sm mb-2">Advantages:</h4>
                      <ul className="space-y-1">
                        {cable.advantages.map((adv, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-start gap-1">
                            <span className="text-green-400">+</span> {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-200 font-medium text-sm mb-2">Installation:</h4>
                      <ul className="space-y-1">
                        {cable.installation.map((inst, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-start gap-1">
                            <span className="text-orange-400">!</span> {inst}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Derating Factors */}
          <Card className="border-purple-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gauge className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Cable Sizing Derating Factors</CardTitle>
              </div>
              <p className="text-neutral-300">
                Apply these factors to reduce cable current capacity in industrial environments
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Grouping Factor */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Grouping Factor (Cg)</h3>
                <p className="text-neutral-300 text-sm mb-3">
                  When multiple cables are installed together, heat dissipation is reduced
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 px-3 text-purple-300">Number of Circuits</th>
                        {cableDeratingFactors.grouping.map((g, i) => (
                          <th key={i} className="text-center py-2 px-2 text-purple-300">{g.cables}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-3 text-neutral-300 font-medium">Derating Factor</td>
                        {cableDeratingFactors.grouping.map((g, i) => (
                          <td key={i} className="text-center py-2 px-2 text-neutral-300">{g.factor}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ambient Temperature */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Ambient Temperature Factor (Ca)</h3>
                <p className="text-neutral-300 text-sm mb-3">
                  Higher ambient temperatures reduce current capacity. Standard ratings assume 30C ambient.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 px-3 text-purple-300">Ambient Temp</th>
                        <th className="text-center py-2 px-3 text-purple-300">PVC Factor</th>
                        <th className="text-center py-2 px-3 text-purple-300">XLPE Factor</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {cableDeratingFactors.ambientTemperature.map((t, i) => (
                        <tr key={i} className="border-b border-purple-500/20">
                          <td className="py-2 px-3 font-medium">{t.temp}</td>
                          <td className="text-center py-2 px-3">{t.pvc}</td>
                          <td className="text-center py-2 px-3">{t.xlpe}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Thermal Insulation */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Thermal Insulation Factor (Ci)</h3>
                <div className="space-y-2">
                  {cableDeratingFactors.thermalInsulation.map((t, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-purple-500/20 last:border-0">
                      <span className="text-neutral-300 text-sm">{t.condition}</span>
                      <Badge variant="outline" className="border-purple-400 text-purple-300">
                        {t.factor}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula Box */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold text-yellow-300 mb-2">Cable Sizing Formula</h3>
                <p className="text-neutral-300 text-sm mb-2">
                  Minimum Cable Rating = Design Current / (Cg x Ca x Ci x Cc)
                </p>
                <p className="text-neutral-400 text-xs">
                  Where: Cg = Grouping, Ca = Ambient Temp, Ci = Thermal Insulation, Cc = Semi-enclosed fuse factor (if applicable)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Busbar Systems */}
          <Card className="border-green-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Power className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">Busbar Systems & Rising Mains</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {busbarSystems.map((busbar, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                    <h3 className="font-bold text-green-300">{busbar.type}</h3>
                    <Badge variant="outline" className="border-green-400 text-green-300 w-fit">
                      {busbar.ratings}
                    </Badge>
                  </div>
                  <p className="text-neutral-300 text-sm mb-3">{busbar.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-green-200 font-medium text-sm mb-2">Applications:</h4>
                      <ul className="space-y-1">
                        {busbar.applications.map((app, i) => (
                          <li key={i} className="text-sm text-neutral-300">- {app}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-200 font-medium text-sm mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {busbar.features.map((feat, i) => (
                          <li key={i} className="text-sm text-neutral-300">- {feat}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-200 font-medium text-sm mb-2">Installation:</h4>
                      <ul className="space-y-1">
                        {busbar.installation.map((inst, i) => (
                          <li key={i} className="text-sm text-neutral-300">- {inst}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Power Factor Correction */}
          <Card className="border-yellow-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gauge className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-yellow-300">Power Factor Correction (PFC)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basics */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="font-bold text-yellow-300 mb-3">Understanding Power Factor</h3>
                <div className="space-y-2 text-sm text-neutral-300">
                  <p><strong className="text-yellow-200">Definition:</strong> {powerFactorCorrection.basics.definition}</p>
                  <p><strong className="text-yellow-200">Formula:</strong> {powerFactorCorrection.basics.formula}</p>
                  <p><strong className="text-yellow-200">Problem:</strong> {powerFactorCorrection.basics.problem}</p>
                  <p><strong className="text-yellow-200">Target:</strong> {powerFactorCorrection.basics.target}</p>
                </div>
              </div>

              {/* Causes */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="font-bold text-yellow-300 mb-3">Common Causes of Low Power Factor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {powerFactorCorrection.causes.map((cause, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      {cause}
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="font-bold text-yellow-300 mb-3">PFC Solutions</h3>
                <div className="space-y-3">
                  {powerFactorCorrection.solutions.map((sol, index) => (
                    <div key={index} className="bg-yellow-500/5 p-3 rounded border border-yellow-500/10">
                      <h4 className="text-yellow-200 font-medium mb-1">{sol.method}</h4>
                      <p className="text-neutral-300 text-sm mb-2">{sol.description}</p>
                      <p className="text-neutral-400 text-xs mb-2"><strong>Application:</strong> {sol.application}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-green-400">Advantages: </span>
                          <span className="text-neutral-300">{sol.advantages.join(", ")}</span>
                        </div>
                        <div>
                          <span className="text-orange-400">Disadvantages: </span>
                          <span className="text-neutral-300">{sol.disadvantages.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Harmonic Filtering */}
          <Card className="border-orange-500/30 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-orange-400" />
                <CardTitle className="text-orange-300">Harmonic Filtering Basics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basics */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">What are Harmonics?</h3>
                <div className="space-y-2 text-sm text-neutral-300">
                  <p><strong className="text-orange-200">Definition:</strong> {harmonicFiltering.basics.definition}</p>
                  <p><strong className="text-orange-200">Common:</strong> {harmonicFiltering.basics.commonHarmonics}</p>
                  <p><strong className="text-orange-200">Sources:</strong> {harmonicFiltering.basics.sources}</p>
                </div>
              </div>

              {/* Effects */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">Effects of Harmonics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {harmonicFiltering.effects.map((effect, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      {effect}
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">Filtering Solutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {harmonicFiltering.solutions.map((sol, index) => (
                    <div key={index} className="bg-orange-500/5 p-3 rounded border border-orange-500/10">
                      <h4 className="text-orange-200 font-medium mb-1">{sol.type}</h4>
                      <p className="text-neutral-300 text-sm mb-2">{sol.description}</p>
                      <p className="text-neutral-400 text-xs"><strong>Use:</strong> {sol.application}</p>
                      <p className="text-green-400 text-xs mt-1"><strong>Pros:</strong> {sol.pros}</p>
                      <p className="text-red-400 text-xs"><strong>Cons:</strong> {sol.cons}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* THD Info */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold text-yellow-300 mb-2">Total Harmonic Distortion (THD)</h3>
                <p className="text-neutral-300 text-sm mb-1">{harmonicFiltering.thd.definition}</p>
                <p className="text-neutral-300 text-sm mb-1">{harmonicFiltering.thd.limits}</p>
                <p className="text-neutral-300 text-sm">{harmonicFiltering.thd.planning}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustrialCircuitGuide;
