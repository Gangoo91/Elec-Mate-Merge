
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Zap,
  FileCheck,
  TestTube,
  Factory,
  Settings,
  Thermometer,
  Activity,
  Gauge,
  FileText,
  ClipboardCheck,
  Cog,
  Eye
} from "lucide-react";

const IndustrialTestingGuide = () => {
  // High-Power Testing Safety
  const highPowerTestingSafety = {
    preparation: [
      {
        step: "Risk Assessment",
        details: [
          "Identify all hazards associated with the system",
          "Calculate prospective fault current (PSCC) at test points",
          "Assess arc flash risk and determine PPE requirements",
          "Identify safe zones and exclusion areas",
          "Review emergency procedures"
        ]
      },
      {
        step: "Safe Isolation Verification",
        details: [
          "Confirm all isolations are in place before testing",
          "Use lock-out/tag-out procedures",
          "Prove dead at the point of work",
          "Check for induced voltages on long cable runs",
          "Verify capacitors are discharged"
        ]
      },
      {
        step: "Equipment Selection",
        details: [
          "Use test equipment rated for the system voltage",
          "Check test equipment calibration dates",
          "Ensure leads comply with GS38 requirements",
          "Use insulated tools and barriers",
          "Have appropriate PPE available"
        ]
      },
      {
        step: "Documentation",
        details: [
          "Obtain permits to work where required",
          "Brief all personnel involved",
          "Record ambient conditions",
          "Document circuit identification",
          "Prepare test result sheets"
        ]
      }
    ],
    gs38Requirements: [
      "Fused test leads (max 500mA fuse)",
      "Maximum 4mm exposed probe tip",
      "Finger guards or barriers",
      "CAT III or CAT IV rating for industrial use",
      "Leads with shrouded connectors",
      "Probe tips with retractable shrouds"
    ]
  };

  // Motor Testing
  const motorTesting = [
    {
      test: "Insulation Resistance Testing",
      purpose: "Assess condition of motor winding insulation",
      method: [
        "Disconnect motor from supply and drive (if VFD)",
        "Disconnect any electronic protection devices",
        "Connect megger between each phase and earth",
        "Apply test voltage (500V for motors up to 500V, 1000V for HV motors)",
        "Allow reading to stabilise (minimum 1 minute)",
        "Record readings for trending"
      ],
      acceptableLimits: [
        "New motor: > 100 MOhm",
        "Service motor: > 10 MOhm minimum",
        "Warning level: < 5 MOhm",
        "Critical: < 1 MOhm - motor should not be energised"
      ],
      notes: [
        "Temperature affects readings (double value for every 10C above 40C)",
        "Damp conditions reduce readings",
        "Compare with previous readings for trending",
        "Polarisation Index (PI) test for larger motors (10 min/1 min ratio)"
      ]
    },
    {
      test: "Winding Resistance Testing",
      purpose: "Detect shorted turns, poor connections, phase imbalance",
      method: [
        "Disconnect motor from supply completely",
        "Allow motor to cool to ambient temperature",
        "Use low resistance ohmmeter or bridge",
        "Measure resistance between each phase pair: U1-V1, V1-W1, W1-U1",
        "Record temperature at time of test",
        "Compare readings between phases"
      ],
      acceptableLimits: [
        "Phase imbalance should be < 5%",
        "Significant variation indicates shorted turns or bad connection",
        "Compare with manufacturer's data if available",
        "Temperature correction required for accurate comparison"
      ],
      notes: [
        "Small motors have very low resistance - use appropriate meter",
        "Large motors may require Kelvin (4-wire) measurement",
        "Hot resistance will be higher than cold",
        "Formula: R2 = R1 x (235 + T2) / (235 + T1) for copper"
      ]
    },
    {
      test: "Continuity Testing",
      purpose: "Verify integrity of motor circuit and protective conductors",
      method: [
        "Test continuity from MCC to motor terminals",
        "Verify CPC continuity from motor frame to earth bar",
        "Check continuity through isolator and starter",
        "Test auxiliary circuit continuity",
        "Verify bonding of motor frame to local earth"
      ],
      acceptableLimits: [
        "R1+R2 values appropriate for cable size and length",
        "No significant difference between phases",
        "CPC continuity < 1 Ohm for most installations"
      ],
      notes: [
        "Long cable runs will have higher resistance",
        "Check for loose connections",
        "Verify all joints are properly made"
      ]
    },
    {
      test: "Bearing Insulation Testing (Large Motors)",
      purpose: "Prevent bearing currents causing premature failure",
      method: [
        "Apply 500V DC between shaft and earth",
        "Test with motor stationary",
        "Check insulated bearing housing integrity"
      ],
      acceptableLimits: [
        "Insulated bearings: > 1 MOhm",
        "Non-insulated bearings should show continuity"
      ],
      notes: [
        "VFD applications often cause shaft currents",
        "Grounding brushes may be fitted",
        "Bearing insulation kits prevent damage"
      ]
    }
  ];

  // Earth Fault Loop Impedance
  const earthFaultLoopImpedance = {
    considerations: [
      {
        factor: "Long Cable Runs",
        impact: "Higher Zs values than typical domestic/commercial",
        solutions: [
          "Calculate expected Zs before testing",
          "Consider parallel earth conductors",
          "May need larger CPC sizes",
          "Verify disconnection times can be achieved"
        ]
      },
      {
        factor: "High PSCC (Prospective Short Circuit Current)",
        impact: "Equipment must withstand fault levels",
        solutions: [
          "Verify protective device fault rating",
          "Check cable short circuit withstand",
          "Consider current limiting devices",
          "Back-up protection coordination"
        ]
      },
      {
        factor: "Motor Contribution",
        impact: "Motors contribute to fault current initially",
        solutions: [
          "Add motor contribution to PSCC calculations",
          "Consider motor run-back current",
          "Factor into protection settings"
        ]
      },
      {
        factor: "VFD Installations",
        impact: "VFD may mask true loop impedance",
        solutions: [
          "Test with VFD bypassed if possible",
          "Use alternative test methods",
          "Consider earth electrode testing separately"
        ]
      }
    ],
    maxZsValues: [
      { device: "32A Type B MCB", maxZs: "1.37 Ohm", voltage: "230V" },
      { device: "32A Type C MCB", maxZs: "0.68 Ohm", voltage: "230V" },
      { device: "32A Type D MCB", maxZs: "0.34 Ohm", voltage: "230V" },
      { device: "63A BS88 Fuse", maxZs: "0.57 Ohm", voltage: "230V" },
      { device: "100A BS88 Fuse", maxZs: "0.35 Ohm", voltage: "230V" },
      { device: "200A BS88 Fuse", maxZs: "0.18 Ohm", voltage: "230V" }
    ],
    testingMethod: [
      "1. Verify safe to test (PSCC within meter capability)",
      "2. Connect tester at furthest point of circuit",
      "3. Select correct test function on meter",
      "4. Initiate test and record Zs value",
      "5. Apply rule of thumb: Measured Zs x 1.2 < Max Zs (for temperature rise)",
      "6. Repeat for each phase on 3-phase circuits"
    ]
  };

  // Prospective Fault Current
  const prospectiveFaultCurrent = {
    importance: [
      "Protective devices must be rated to interrupt maximum fault current",
      "Cables must withstand fault current for clearance time",
      "Busbars and connections must handle magnetic forces",
      "Essential for Arc Flash risk assessment"
    ],
    measurement: [
      {
        method: "Direct Measurement",
        description: "Use PSCC meter at point of interest",
        considerations: [
          "Most loop impedance testers include PSCC function",
          "Result is calculated from measured Ze/Zs",
          "Check meter is rated for expected PSCC",
          "Typical industrial PSCC can be 10-50kA"
        ]
      },
      {
        method: "Calculation from Ze",
        description: "PSCC = Uo / Ze (phase-earth) or PSCC = Uline / Zphase-phase",
        considerations: [
          "Uo = 230V nominal phase voltage",
          "Uline = 400V nominal line voltage",
          "Add motor contribution for total PSCC",
          "Consider worst case (minimum impedance) conditions"
        ]
      }
    ],
    typicalValues: [
      { location: "DNO Substation", pscc: "Up to 80kA" },
      { location: "LV Main Switchboard (1000kVA Tx)", pscc: "20-30kA typical" },
      { location: "Sub-distribution Board", pscc: "10-20kA typical" },
      { location: "Final Circuit Origin", pscc: "5-15kA typical" },
      { location: "Remote Motor Starter", pscc: "2-10kA typical" }
    ]
  };

  // Functional Testing of Safety Circuits
  const safetyCircuitTesting = [
    {
      system: "Emergency Stop Circuits",
      tests: [
        {
          test: "Response Time Test",
          method: "Activate E-stop, measure time to safe state",
          acceptance: "As per risk assessment, typically < 1 second"
        },
        {
          test: "Reset Function Test",
          method: "Verify manual reset required after E-stop release",
          acceptance: "Machine must not restart automatically"
        },
        {
          test: "Multiple E-Stop Test",
          method: "Test each E-stop device individually",
          acceptance: "Any E-stop must stop machine"
        },
        {
          test: "Wire Break Detection (Cat 3/4)",
          method: "Disconnect a conductor, verify fault detected",
          acceptance: "System enters safe state on wire break"
        }
      ],
      documentation: "Record serial numbers, test dates, and results for each device"
    },
    {
      system: "Safety Interlock Systems",
      tests: [
        {
          test: "Guard Door Interlock",
          method: "Open guard while machine running (where safe)",
          acceptance: "Machine stops and cannot restart until guard closed"
        },
        {
          test: "Guard Locking Test",
          method: "Verify guard lock holds during machine cycle",
          acceptance: "Guard cannot be opened until cycle complete"
        },
        {
          test: "Defeat Detection (if fitted)",
          method: "Attempt to bypass interlock with guard open",
          acceptance: "Bypass attempts detected and machine stops"
        },
        {
          test: "Key Exchange Systems",
          method: "Verify key cannot be removed until safe state",
          acceptance: "Correct key sequence must be followed"
        }
      ],
      documentation: "Test each interlock device, record make/model and results"
    },
    {
      system: "Safety Light Curtains",
      tests: [
        {
          test: "Detection Capability",
          method: "Use test piece of specified diameter",
          acceptance: "Light curtain detects all test pieces"
        },
        {
          test: "Response Time",
          method: "Measure time from beam break to output state change",
          acceptance: "As specified by manufacturer"
        },
        {
          test: "Blanking Function (if enabled)",
          method: "Verify blanked areas work correctly",
          acceptance: "Only specified areas blanked"
        },
        {
          test: "Alignment Check",
          method: "Check alignment indicator on devices",
          acceptance: "Within manufacturer's tolerance"
        }
      ],
      documentation: "Record resolution, detection capability, and any blanking configuration"
    },
    {
      system: "Two-Hand Control",
      tests: [
        {
          test: "Synchronous Operation",
          method: "Attempt to operate with one hand",
          acceptance: "Both buttons must be pressed within 0.5 seconds"
        },
        {
          test: "Continuous Actuation",
          method: "Release during cycle",
          acceptance: "Machine stops if either button released"
        },
        {
          test: "Anti-Defeat",
          method: "Attempt to latch one button",
          acceptance: "Both buttons must be actuated to restart"
        }
      ],
      documentation: "Record button spacing and synchronous time window"
    }
  ];

  // Thermographic Surveys
  const thermographicSurveys = {
    applications: [
      "LV and HV switchboard inspections",
      "Busbar joint integrity checking",
      "Motor and bearing temperature monitoring",
      "Cable termination inspections",
      "Transformer connection checking",
      "Fuse and contactor connections"
    ],
    procedure: [
      {
        step: 1,
        action: "Preparation",
        details: [
          "Equipment should be under normal load (>40% minimum)",
          "Panels should be closed for at least 30 minutes before survey",
          "Note ambient temperature and load conditions",
          "Prepare camera and check calibration"
        ]
      },
      {
        step: 2,
        action: "Survey Execution",
        details: [
          "Open panel doors carefully (arc flash PPE may be required)",
          "Maintain safe working distance",
          "Scan all connections systematically",
          "Use comparison method (similar components should be similar temperature)",
          "Record images of any anomalies"
        ]
      },
      {
        step: 3,
        action: "Analysis",
        details: [
          "Compare similar phases/connections",
          "Calculate delta-T (temperature rise above ambient or reference)",
          "Prioritise findings based on severity",
          "Consider load conditions when interpreting"
        ]
      }
    ],
    severity: [
      { deltaT: "1-10C", priority: "Low", action: "Monitor at next survey", colour: "green" },
      { deltaT: "11-20C", priority: "Intermediate", action: "Repair at next opportunity", colour: "yellow" },
      { deltaT: "21-40C", priority: "Serious", action: "Repair as soon as possible", colour: "orange" },
      { deltaT: ">40C", priority: "Critical", action: "Immediate action required", colour: "red" }
    ],
    commonFaults: [
      "Loose connections (most common)",
      "Overloaded circuits",
      "Corroded connections",
      "Unbalanced loads",
      "Failing contactors",
      "Damaged cable terminations"
    ]
  };

  // Vibration Analysis Basics
  const vibrationAnalysis = {
    purpose: "Early detection of rotating machinery problems before failure",
    parameters: [
      {
        parameter: "Displacement",
        units: "mm or mils peak-to-peak",
        bestFor: "Low frequency vibration (< 10 Hz)"
      },
      {
        parameter: "Velocity",
        units: "mm/s RMS or in/s peak",
        bestFor: "General machinery (10-1000 Hz)"
      },
      {
        parameter: "Acceleration",
        units: "g or m/s2",
        bestFor: "High frequency vibration (> 1000 Hz)"
      }
    ],
    commonFaults: [
      {
        fault: "Unbalance",
        frequency: "1x running speed",
        characteristics: "Dominant radial vibration, phase stable"
      },
      {
        fault: "Misalignment",
        frequency: "1x, 2x, sometimes 3x running speed",
        characteristics: "High axial vibration, 180 degree phase across coupling"
      },
      {
        fault: "Bearing Wear",
        frequency: "High frequency, bearing defect frequencies",
        characteristics: "BPFO, BPFI, BSF, FTF frequencies visible in spectrum"
      },
      {
        fault: "Looseness",
        frequency: "Multiple harmonics of running speed",
        characteristics: "Many peaks in spectrum, unstable phase"
      },
      {
        fault: "Electrical (Motor)",
        frequency: "2x line frequency (100Hz on 50Hz supply)",
        characteristics: "Disappears immediately when power removed"
      }
    ],
    isoLimits: [
      { class: "Class I", description: "Small machines (< 15kW)", good: "< 0.71 mm/s", alarm: "1.8 mm/s", danger: "4.5 mm/s" },
      { class: "Class II", description: "Medium machines (15-75kW)", good: "< 1.12 mm/s", alarm: "2.8 mm/s", danger: "7.1 mm/s" },
      { class: "Class III", description: "Large rigid foundation", good: "< 1.8 mm/s", alarm: "4.5 mm/s", danger: "11.2 mm/s" },
      { class: "Class IV", description: "Large flexible foundation", good: "< 2.8 mm/s", alarm: "7.1 mm/s", danger: "18 mm/s" }
    ]
  };

  // PAT Testing in Industrial Environments
  const patTesting = {
    considerations: [
      "Equipment may be larger and heavier",
      "Equipment may be fixed but still require PAT testing",
      "Harsh environments affect test frequency",
      "Some equipment may need specialist testing",
      "Three-phase equipment needs appropriate test equipment"
    ],
    equipmentCategories: [
      {
        category: "Class I Equipment",
        description: "Earth bonded equipment",
        tests: ["Earth continuity", "Insulation resistance", "Functional"],
        frequency: "6-12 months in harsh environment"
      },
      {
        category: "Class II Equipment",
        description: "Double insulated",
        tests: ["Insulation resistance", "Functional"],
        frequency: "6-12 months in harsh environment"
      },
      {
        category: "IT Equipment",
        description: "Computers, office equipment",
        tests: ["Earth continuity (Class I)", "Functional", "Substitute leakage if required"],
        frequency: "Up to 48 months for fixed IT equipment"
      },
      {
        category: "Extension Leads & Tools",
        description: "Portable and handheld",
        tests: ["Earth continuity", "Insulation resistance", "Polarity"],
        frequency: "3-6 months for tools, monthly for site leads"
      }
    ],
    specialConsiderations: [
      {
        situation: "Equipment with electronic controls",
        consideration: "Use 250V insulation test or substitute leakage test"
      },
      {
        situation: "Large motors and fixed plant",
        consideration: "May be covered by fixed installation testing (EICR)"
      },
      {
        situation: "Equipment in hazardous areas",
        consideration: "Must maintain ATEX certification - follow manufacturer's guidance"
      },
      {
        situation: "Production line equipment",
        consideration: "Schedule testing during planned maintenance windows"
      }
    ],
    testLimits: [
      { test: "Earth Continuity (Class I)", pass: "< 0.1 Ohm + lead resistance", notes: "Up to 0.3 Ohm for long leads" },
      { test: "Insulation Resistance (Class I)", pass: "> 1 MOhm", notes: "At 500V DC" },
      { test: "Insulation Resistance (Class II)", pass: "> 2 MOhm", notes: "At 500V DC" },
      { test: "Earth Leakage Current", pass: "< 3.5mA Class I, < 0.25mA Class II", notes: "Measured or calculated" }
    ]
  };

  // Documentation
  const documentation = {
    eic: {
      title: "Electrical Installation Certificate (EIC)",
      use: "New installations and complete rewires",
      contents: [
        "Details of the designer, installer, and commissioner",
        "Installation address and extent of work",
        "Supply characteristics (TNS, TT, PME etc.)",
        "Earthing and bonding arrangements",
        "Maximum demand assessment",
        "Particulars of installation (method of protection)",
        "Schedule of circuit details",
        "All test results",
        "Declaration of compliance with BS 7671"
      ],
      industrialAdditions: [
        "ATEX zone classifications and equipment schedules",
        "Motor schedules with ratings and protection settings",
        "Control system descriptions",
        "Emergency stop system configuration",
        "Fire system interface details",
        "As-built drawings reference"
      ]
    },
    eicr: {
      title: "Electrical Installation Condition Report (EICR)",
      use: "Periodic inspection and testing of existing installations",
      sections: [
        "Extent and limitations of inspection",
        "Supply characteristics and earthing",
        "Particulars of installation at origin",
        "Observations requiring attention (coded C1, C2, C3, FI)",
        "Test results schedules",
        "Recommendations for next inspection"
      ],
      codes: [
        { code: "C1", meaning: "Danger present - immediate remedial action required", colour: "red" },
        { code: "C2", meaning: "Potentially dangerous - urgent remedial action required", colour: "orange" },
        { code: "C3", meaning: "Improvement recommended", colour: "yellow" },
        { code: "FI", meaning: "Further investigation required", colour: "blue" }
      ],
      inspectionFrequencies: [
        { premises: "Industrial", frequency: "3 years maximum" },
        { premises: "Commercial", frequency: "5 years maximum" },
        { premises: "Domestic", frequency: "10 years maximum or change of occupancy" },
        { premises: "Caravan Parks", frequency: "1 year" },
        { premises: "Swimming Pools", frequency: "1 year" },
        { premises: "Agricultural", frequency: "3 years" }
      ]
    },
    schedules: {
      circuitSchedule: [
        "Circuit number/reference",
        "Circuit designation (description)",
        "Type of wiring (cable type)",
        "Number and size of conductors",
        "Reference method",
        "Overcurrent device (type, rating, poles)",
        "RCD details (if fitted)",
        "Maximum Zs permitted",
        "Ring final circuit test results (r1, rn, r2)"
      ],
      testResultSchedule: [
        "Circuit identification",
        "Continuity results (R1+R2, R2, ring)",
        "Insulation resistance (live-earth, live-live)",
        "Polarity verification",
        "Earth fault loop impedance (Zs)",
        "RCD test results (type, In, operating time)",
        "Functional checks confirmation"
      ]
    }
  };

  // Commissioning Procedures
  const commissioning = {
    stages: [
      {
        stage: "Pre-commissioning Checks",
        activities: [
          "Visual inspection of all installations",
          "Check all connections are tight (torque checks)",
          "Verify cable sizing and protection coordination",
          "Check labelling and identification",
          "Review all documentation is complete",
          "Confirm spares and tools available"
        ]
      },
      {
        stage: "Dead Testing",
        activities: [
          "Continuity of protective conductors",
          "Continuity of ring final circuits",
          "Insulation resistance testing",
          "Polarity verification",
          "Earth electrode resistance (if applicable)"
        ]
      },
      {
        stage: "Initial Energisation",
        activities: [
          "Ensure all personnel clear of equipment",
          "Close main isolator/breaker",
          "Check for abnormal sounds/smells",
          "Verify voltages at key points",
          "Check phase rotation",
          "Measure earth fault loop impedance"
        ]
      },
      {
        stage: "Load Testing",
        activities: [
          "Energise loads progressively",
          "Monitor currents and voltages",
          "Check motor rotation direction",
          "Verify protection device settings",
          "Test control systems operation",
          "Check alarm and indication systems"
        ]
      },
      {
        stage: "Functional Testing",
        activities: [
          "Emergency stop system testing",
          "Safety interlock testing",
          "Automatic control sequence verification",
          "Protection relay testing",
          "UPS and backup power testing",
          "Fire system interface testing"
        ]
      },
      {
        stage: "Handover",
        activities: [
          "Complete all documentation",
          "Issue certificates (EIC, etc.)",
          "Provide operation and maintenance manuals",
          "Train client personnel",
          "Hand over keys and spares",
          "Sign off completion"
        ]
      }
    ],
    checklistItems: [
      "All isolators and breakers correctly labelled",
      "Protection relay settings documented and verified",
      "Motor rotation directions correct",
      "Emergency stop systems functional",
      "Phase rotation correct throughout",
      "Earth fault loop impedance within limits",
      "RCD operation tested",
      "All cable entries properly sealed",
      "All covers and guards in place",
      "Fire stopping complete at penetrations"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Testing Overview */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Industrial Testing & Certification Guide</CardTitle>
          </div>
          <p className="text-neutral-300">
            Comprehensive testing procedures for industrial electrical installations including
            high-power systems, motor testing, safety circuits, and commissioning procedures.
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="safety" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1 h-auto">
          <TabsTrigger value="safety" className="text-xs px-2 py-2">Testing Safety</TabsTrigger>
          <TabsTrigger value="motors" className="text-xs px-2 py-2">Motor Testing</TabsTrigger>
          <TabsTrigger value="systems" className="text-xs px-2 py-2">System Testing</TabsTrigger>
          <TabsTrigger value="predictive" className="text-xs px-2 py-2">Predictive Tests</TabsTrigger>
          <TabsTrigger value="documentation" className="text-xs px-2 py-2">Documentation</TabsTrigger>
        </TabsList>

        {/* Testing Safety */}
        <TabsContent value="safety" className="space-y-4">
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">High-Power Testing Safety</CardTitle>
              </div>
              <p className="text-neutral-300">
                Industrial testing requires enhanced safety measures due to higher voltages, currents, and fault levels
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {highPowerTestingSafety.preparation.map((prep, index) => (
                <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <h3 className="font-bold text-red-300 mb-3">{prep.step}</h3>
                  <ul className="space-y-2">
                    {prep.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* GS38 Requirements */}
          <Card className="border-orange-500/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                GS38 Test Equipment Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {highPowerTestingSafety.gs38Requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-neutral-300 bg-orange-500/10 p-3 rounded">
                    <Shield className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {req}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prospective Fault Current */}
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Prospective Fault Current (PSCC)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Why PSCC Matters</h3>
                <ul className="space-y-2">
                  {prospectiveFaultCurrent.importance.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Zap className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Typical PSCC Values</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 px-3 text-purple-300">Location</th>
                        <th className="text-left py-2 px-3 text-purple-300">Typical PSCC</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {prospectiveFaultCurrent.typicalValues.map((val, i) => (
                        <tr key={i} className="border-b border-purple-500/20">
                          <td className="py-2 px-3">{val.location}</td>
                          <td className="py-2 px-3 font-medium text-purple-200">{val.pscc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Motor Testing */}
        <TabsContent value="motors" className="space-y-4">
          <Card className="border-blue-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cog className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Motor Testing Procedures</CardTitle>
              </div>
              <p className="text-neutral-300">
                Comprehensive testing for induction motors including insulation and winding tests
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {motorTesting.map((test, index) => (
                <div key={index} className="bg-blue-500/10 p-5 rounded-lg border border-blue-500/20">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="font-bold text-blue-300 text-lg">{test.test}</h3>
                  </div>

                  <p className="text-neutral-300 mb-4"><strong className="text-blue-200">Purpose:</strong> {test.purpose}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-blue-500/5 p-4 rounded border border-blue-500/10">
                      <h4 className="text-blue-200 font-medium mb-3">Test Method</h4>
                      <ol className="space-y-2">
                        {test.method.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                            <span className="text-blue-400 font-medium">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-green-500/5 p-4 rounded border border-green-500/10">
                      <h4 className="text-green-200 font-medium mb-3">Acceptable Limits</h4>
                      <ul className="space-y-2">
                        {test.acceptableLimits.map((limit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {limit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 bg-yellow-500/10 p-3 rounded border border-yellow-500/20">
                    <h4 className="text-yellow-200 font-medium mb-2">Important Notes</h4>
                    <ul className="space-y-1">
                      {test.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                          <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Testing */}
        <TabsContent value="systems" className="space-y-4">
          {/* Earth Fault Loop Impedance */}
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gauge className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">Earth Fault Loop Impedance (Zs)</CardTitle>
              </div>
              <p className="text-neutral-300">
                Industrial installations present unique challenges for EFLI testing
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Considerations */}
              {earthFaultLoopImpedance.considerations.map((item, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h3 className="font-bold text-green-300 mb-2">{item.factor}</h3>
                  <p className="text-neutral-300 text-sm mb-3"><strong>Impact:</strong> {item.impact}</p>
                  <ul className="space-y-1">
                    {item.solutions.map((sol, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {sol}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Max Zs Values Table */}
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <h3 className="font-bold text-green-300 mb-3">Maximum Zs Values (Common Devices)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-green-500/30">
                        <th className="text-left py-2 px-3 text-green-300">Device</th>
                        <th className="text-left py-2 px-3 text-green-300">Max Zs</th>
                        <th className="text-left py-2 px-3 text-green-300">Voltage</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {earthFaultLoopImpedance.maxZsValues.map((val, i) => (
                        <tr key={i} className="border-b border-green-500/20">
                          <td className="py-2 px-3">{val.device}</td>
                          <td className="py-2 px-3 font-medium text-green-200">{val.maxZs}</td>
                          <td className="py-2 px-3">{val.voltage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Testing Method */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="font-bold text-yellow-300 mb-3">Testing Procedure</h3>
                <ol className="space-y-2">
                  {earthFaultLoopImpedance.testingMethod.map((step, i) => (
                    <li key={i} className="text-sm text-neutral-300">{step}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Safety Circuit Testing */}
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">Functional Testing of Safety Circuits</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {safetyCircuitTesting.map((system, index) => (
                <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <h3 className="font-bold text-red-300 mb-3">{system.system}</h3>
                  <div className="space-y-3">
                    {system.tests.map((test, i) => (
                      <div key={i} className="bg-red-500/5 p-3 rounded border border-red-500/10">
                        <h4 className="text-red-200 font-medium mb-1">{test.test}</h4>
                        <p className="text-neutral-300 text-sm mb-1"><strong>Method:</strong> {test.method}</p>
                        <p className="text-green-300 text-sm"><strong>Acceptance:</strong> {test.acceptance}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-neutral-400 text-xs mt-3 italic">{system.documentation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictive Testing */}
        <TabsContent value="predictive" className="space-y-4">
          {/* Thermographic Surveys */}
          <Card className="border-orange-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-orange-400" />
                <CardTitle className="text-orange-300">Thermographic Surveys</CardTitle>
              </div>
              <p className="text-neutral-300">
                Non-contact temperature measurement to identify hot spots and failing connections
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Applications */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {thermographicSurveys.applications.map((app, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <Eye className="h-4 w-4 text-orange-400" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">Survey Procedure</h3>
                <div className="space-y-3">
                  {thermographicSurveys.procedure.map((proc, index) => (
                    <div key={index} className="bg-orange-500/5 p-3 rounded border border-orange-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <span className="text-orange-300 font-bold text-sm">{proc.step}</span>
                        </div>
                        <h4 className="text-orange-200 font-medium">{proc.action}</h4>
                      </div>
                      <ul className="space-y-1 ml-10">
                        {proc.details.map((detail, i) => (
                          <li key={i} className="text-sm text-neutral-300">- {detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Severity Table */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">Severity Classification</h3>
                <div className="space-y-2">
                  {thermographicSurveys.severity.map((sev, i) => (
                    <div key={i} className={`p-3 rounded border flex items-center justify-between ${
                      sev.colour === 'green' ? 'bg-green-500/10 border-green-500/30' :
                      sev.colour === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      sev.colour === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                      'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={`${
                          sev.colour === 'green' ? 'border-green-400 text-green-300' :
                          sev.colour === 'yellow' ? 'border-yellow-400 text-yellow-300' :
                          sev.colour === 'orange' ? 'border-orange-400 text-orange-300' :
                          'border-red-400 text-red-300'
                        }`}>
                          {sev.deltaT}
                        </Badge>
                        <span className="text-neutral-300 text-sm font-medium">{sev.priority}</span>
                      </div>
                      <span className="text-neutral-300 text-sm">{sev.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Faults */}
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h3 className="font-bold text-orange-300 mb-3">Common Faults Detected</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {thermographicSurveys.commonFaults.map((fault, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                      {fault}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vibration Analysis */}
          <Card className="border-blue-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">Vibration Analysis Basics</CardTitle>
              </div>
              <p className="text-neutral-300">
                {vibrationAnalysis.purpose}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Parameters */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-blue-300 mb-3">Measurement Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {vibrationAnalysis.parameters.map((param, i) => (
                    <div key={i} className="bg-blue-500/5 p-3 rounded border border-blue-500/10">
                      <h4 className="text-blue-200 font-medium mb-1">{param.parameter}</h4>
                      <p className="text-neutral-400 text-xs mb-1">Units: {param.units}</p>
                      <p className="text-neutral-300 text-sm">Best for: {param.bestFor}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Faults */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-blue-300 mb-3">Common Fault Signatures</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-500/30">
                        <th className="text-left py-2 px-3 text-blue-300">Fault</th>
                        <th className="text-left py-2 px-3 text-blue-300">Frequency</th>
                        <th className="text-left py-2 px-3 text-blue-300">Characteristics</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {vibrationAnalysis.commonFaults.map((fault, i) => (
                        <tr key={i} className="border-b border-blue-500/20">
                          <td className="py-2 px-3 font-medium text-blue-200">{fault.fault}</td>
                          <td className="py-2 px-3">{fault.frequency}</td>
                          <td className="py-2 px-3">{fault.characteristics}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ISO Limits */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-blue-300 mb-3">ISO 10816 Vibration Limits (mm/s RMS)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-500/30">
                        <th className="text-left py-2 px-3 text-blue-300">Class</th>
                        <th className="text-left py-2 px-3 text-blue-300">Description</th>
                        <th className="text-center py-2 px-3 text-green-300">Good</th>
                        <th className="text-center py-2 px-3 text-yellow-300">Alarm</th>
                        <th className="text-center py-2 px-3 text-red-300">Danger</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {vibrationAnalysis.isoLimits.map((limit, i) => (
                        <tr key={i} className="border-b border-blue-500/20">
                          <td className="py-2 px-3 font-medium text-blue-200">{limit.class}</td>
                          <td className="py-2 px-3">{limit.description}</td>
                          <td className="py-2 px-3 text-center text-green-300">{limit.good}</td>
                          <td className="py-2 px-3 text-center text-yellow-300">{limit.alarm}</td>
                          <td className="py-2 px-3 text-center text-red-300">{limit.danger}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PAT Testing */}
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">PAT Testing in Industrial Environments</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Considerations */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Industrial Considerations</h3>
                <ul className="space-y-2">
                  {patTesting.considerations.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <AlertTriangle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment Categories */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Equipment Categories</h3>
                <div className="space-y-3">
                  {patTesting.equipmentCategories.map((cat, i) => (
                    <div key={i} className="bg-purple-500/5 p-3 rounded border border-purple-500/10">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-purple-200 font-medium">{cat.category}</h4>
                        <Badge variant="outline" className="border-purple-400 text-purple-300">
                          {cat.frequency}
                        </Badge>
                      </div>
                      <p className="text-neutral-400 text-sm mb-2">{cat.description}</p>
                      <p className="text-neutral-300 text-sm">
                        <strong>Tests:</strong> {cat.tests.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test Limits */}
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-bold text-purple-300 mb-3">Test Limits</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 px-3 text-purple-300">Test</th>
                        <th className="text-left py-2 px-3 text-purple-300">Pass Limit</th>
                        <th className="text-left py-2 px-3 text-purple-300">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {patTesting.testLimits.map((limit, i) => (
                        <tr key={i} className="border-b border-purple-500/20">
                          <td className="py-2 px-3">{limit.test}</td>
                          <td className="py-2 px-3 font-medium text-green-300">{limit.pass}</td>
                          <td className="py-2 px-3 text-neutral-400">{limit.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documentation */}
        <TabsContent value="documentation" className="space-y-4">
          {/* EIC */}
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">{documentation.eic.title}</CardTitle>
              </div>
              <p className="text-neutral-300">{documentation.eic.use}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <h3 className="font-bold text-green-300 mb-3">Standard Contents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {documentation.eic.contents.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="font-bold text-yellow-300 mb-3">Additional Industrial Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {documentation.eic.industrialAdditions.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Factory className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EICR */}
          <Card className="border-blue-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-blue-300">{documentation.eicr.title}</CardTitle>
              </div>
              <p className="text-neutral-300">{documentation.eicr.use}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sections */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-blue-300 mb-3">Report Sections</h3>
                <ul className="space-y-2">
                  {documentation.eicr.sections.map((section, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <FileText className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      {section}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Observation Codes */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-blue-300 mb-3">Observation Codes</h3>
                <div className="space-y-2">
                  {documentation.eicr.codes.map((code, i) => (
                    <div key={i} className={`p-3 rounded border flex items-center gap-4 ${
                      code.colour === 'red' ? 'bg-red-500/10 border-red-500/30' :
                      code.colour === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                      code.colour === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      'bg-blue-500/10 border-blue-500/30'
                    }`}>
                      <Badge variant="outline" className={`${
                        code.colour === 'red' ? 'border-red-400 text-red-300' :
                        code.colour === 'orange' ? 'border-orange-400 text-orange-300' :
                        code.colour === 'yellow' ? 'border-yellow-400 text-yellow-300' :
                        'border-blue-400 text-blue-300'
                      }`}>
                        {code.code}
                      </Badge>
                      <span className="text-neutral-300 text-sm">{code.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Frequencies */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-blue-300 mb-3">Recommended Inspection Frequencies</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-500/30">
                        <th className="text-left py-2 px-3 text-blue-300">Premises Type</th>
                        <th className="text-left py-2 px-3 text-blue-300">Maximum Interval</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      {documentation.eicr.inspectionFrequencies.map((freq, i) => (
                        <tr key={i} className="border-b border-blue-500/20">
                          <td className="py-2 px-3">{freq.premises}</td>
                          <td className="py-2 px-3 font-medium text-blue-200">{freq.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commissioning */}
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Commissioning Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stages */}
              {commissioning.stages.map((stage, index) => (
                <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-300 font-bold text-sm">{index + 1}</span>
                    </div>
                    <h3 className="font-bold text-purple-300">{stage.stage}</h3>
                  </div>
                  <ul className="space-y-1 ml-11">
                    {stage.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Checklist */}
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold text-yellow-300 mb-3">Final Commissioning Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {commissioning.checklistItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Critical Safety Notice */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Critical Industrial Testing Safety
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3 text-sm text-neutral-300">
            <p>
              <strong className="text-red-300">Arc Flash Protection:</strong> Industrial testing on high-voltage systems requires
              appropriate arc flash PPE and risk assessment. Ensure adequate incident energy calculations are completed.
            </p>
            <p>
              <strong className="text-red-300">PSCC Awareness:</strong> Always verify the prospective fault current before testing.
              Use test equipment rated for the expected fault level.
            </p>
            <p>
              <strong className="text-red-300">Competency Requirements:</strong> Industrial testing must be supervised by persons
              with appropriate qualifications including JIB grading and authorised person status for high voltage work.
            </p>
            <p>
              <strong className="text-red-300">Safe Isolation:</strong> Always follow safe isolation procedures (lock-out/tag-out)
              and prove dead before working on any circuit.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialTestingGuide;
