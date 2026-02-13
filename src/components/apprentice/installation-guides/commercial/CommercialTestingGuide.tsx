
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TestTube,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  ClipboardList,
  Wrench,
  ListOrdered,
  Shield,
  Flame,
  Lightbulb,
  Clock,
  Building,
  Zap,
  Activity
} from "lucide-react";

const CommercialTestingGuide = () => {
  const testSequenceOrder = {
    title: "Initial Verification Test Sequence (BS 7671 Chapter 64)",
    description: "Commercial installations require the same test sequence as domestic, but with additional considerations for three-phase systems and larger scale",
    note: "Tests must be performed in order - earlier tests verify conditions required for later tests to give valid results",
    sequence: [
      { order: 1, test: "Continuity of protective conductors (including main and supplementary bonding)", commercial: "More extensive due to larger installation size" },
      { order: 2, test: "Continuity of ring final circuit conductors", commercial: "May have multiple rings - test each separately" },
      { order: 3, test: "Insulation resistance", commercial: "Three-phase testing required - more isolation needed" },
      { order: 4, test: "Polarity", commercial: "Phase sequence critical for three-phase equipment" },
      { order: 5, test: "Earth electrode resistance (TT systems)", commercial: "May have multiple electrodes - test each" },
      { order: 6, test: "Earth fault loop impedance (Zs)", commercial: "Test at end of longest circuits on each phase" },
      { order: 7, test: "Prospective fault current (Ipf)", commercial: "Higher values typical - verify equipment ratings" },
      { order: 8, test: "Functional testing (including RCDs)", commercial: "Type A, B, and F RCDs may all be present" }
    ]
  };

  const continuityTesting = {
    title: "Continuity Testing in Large Installations",
    description: "Commercial installations present unique challenges for continuity testing due to scale and complexity",
    challenges: [
      {
        challenge: "Long Cable Runs",
        issue: "Wandering lead length limitations",
        solutions: [
          "Use longer wandering leads (100m+) from MET",
          "Consider temporary earth connection points",
          "Use two-person testing with radio communication",
          "Record mid-point readings for verification"
        ]
      },
      {
        challenge: "Multiple Distribution Boards",
        issue: "Complex earthing arrangements",
        solutions: [
          "Test from each DB back to MET",
          "Verify bonding between DBs",
          "Check sub-main earth conductor continuity",
          "Document earth bar connections"
        ]
      },
      {
        challenge: "Busbar Systems",
        issue: "Multiple joints and tap-offs",
        solutions: [
          "Test earth continuity through all joints",
          "Check each tap-off point",
          "Verify torque on bolted connections",
          "Look for signs of overheating at joints"
        ]
      },
      {
        challenge: "Rising Mains",
        issue: "Multi-floor distribution",
        solutions: [
          "Test each floor connection point",
          "Verify earth continuity at risers",
          "Check fire stopping integrity",
          "Document rising main schedule"
        ]
      }
    ],
    practicalTips: [
      "Create a test schedule before starting - plan the sequence",
      "Mark tested points to avoid duplication",
      "Use coloured tape to identify tested circuits",
      "Record temperature at time of test for correction",
      "Take photographs of test setup for documentation"
    ]
  };

  const insulationResistance = {
    title: "Insulation Resistance for Three-Phase Systems",
    description: "Three-phase testing requires systematic approach to ensure all phase-to-phase and phase-to-earth combinations are tested",
    testVoltages: [
      { circuit: "SELV (up to 50V AC)", voltage: "250V DC", minimum: "0.5 M ohm" },
      { circuit: "Up to 500V AC (most circuits)", voltage: "500V DC", minimum: "1.0 M ohm" },
      { circuit: "Over 500V AC", voltage: "1000V DC", minimum: "1.0 M ohm" }
    ],
    threePhaseMethod: {
      steps: [
        {
          step: 1,
          action: "Isolate supply and all equipment",
          details: "Turn off main isolator, disconnect sensitive equipment (VFDs, PLCs, UPS), remove lamps"
        },
        {
          step: 2,
          action: "Link all phase conductors together",
          details: "Connect L1, L2, L3, and N together at the DB using temporary jumpers"
        },
        {
          step: 3,
          action: "Test phases to earth",
          details: "Connect IR tester between linked phases and earth bar - this tests all conductors to earth simultaneously"
        },
        {
          step: 4,
          action: "Separate phases and test phase-to-phase",
          details: "Remove jumpers, test L1-L2, L2-L3, L3-L1 individually"
        },
        {
          step: 5,
          action: "Test neutral to earth",
          details: "With phases disconnected from neutral, test N-E"
        },
        {
          step: 6,
          action: "Record all readings",
          details: "Document each test result with circuit reference"
        }
      ],
      expectedValues: [
        { installation: "New installation", typical: "100-200 M ohm per circuit" },
        { installation: "Older installation (10+ years)", typical: "10-50 M ohm per circuit" },
        { installation: "Damp conditions (temporary)", typical: "2-10 M ohm (investigate cause)" },
        { installation: "Whole installation test", typical: "Greater than 1 M ohm minimum" }
      ]
    },
    troubleshooting: [
      {
        symptom: "Very low reading (under 0.5 M ohm)",
        causes: ["Direct short circuit", "Severe insulation damage", "Equipment still connected"],
        actions: ["Disconnect circuit by circuit to locate", "Check for trapped cables", "Inspect for visible damage"]
      },
      {
        symptom: "Marginal reading (0.5-2 M ohm)",
        causes: ["Moisture ingress", "Aged insulation", "Poor connections", "Electronic equipment connected"],
        actions: ["Allow to dry if moisture suspected", "Test individual circuits", "Disconnect all equipment and retest"]
      },
      {
        symptom: "Reading drops over time",
        causes: ["Capacitive effect on long cables", "Moisture absorption", "Intermittent fault"],
        actions: ["Allow reading to stabilise (60 seconds)", "Test in sections", "Repeat test on different day"]
      }
    ]
  };

  const loopImpedance = {
    title: "Loop Impedance for Long Cable Runs",
    description: "Commercial installations often have long cable runs requiring careful consideration of maximum Zs values",
    considerations: [
      {
        factor: "Temperature Correction",
        explanation: "Measured Zs at 20C will increase at conductor operating temperature",
        method: "Use 0.8 multiplier: If measured Zs exceeds 0.8 x max Zs from tables, circuit fails",
        example: "32A Type B max Zs = 1.09 ohm, so measured must be under 0.87 ohm"
      },
      {
        factor: "Voltage Drop Impact",
        explanation: "Long runs for Zs compliance may still fail voltage drop requirements",
        method: "Calculate voltage drop: Vd = (mV/A/m x Ib x L) / 1000",
        example: "Must be under 3% for lighting (6.9V) or 5% for power (11.5V)"
      },
      {
        factor: "Parallel Conductors",
        explanation: "Larger installations may use parallel conductors per phase",
        method: "Zs calculation changes - each conductor path contributes",
        example: "Two 95mm parallel = equivalent to single 190mm for Zs purposes"
      }
    ],
    maxZsValues: {
      title: "Maximum Zs Values (Type B MCB/RCBO at 20C)",
      note: "Apply 0.8 factor for circuits at operating temperature",
      values: [
        { device: "6A Type B", maxZs: "7.28 ohm", corrected: "5.82 ohm", use: "Lighting" },
        { device: "10A Type B", maxZs: "4.37 ohm", corrected: "3.50 ohm", use: "Lighting/small power" },
        { device: "16A Type B", maxZs: "2.73 ohm", corrected: "2.18 ohm", use: "Socket circuits" },
        { device: "20A Type B", maxZs: "2.19 ohm", corrected: "1.75 ohm", use: "Radial circuits" },
        { device: "32A Type B", maxZs: "1.37 ohm", corrected: "1.09 ohm", use: "Ring circuits" },
        { device: "40A Type B", maxZs: "1.09 ohm", corrected: "0.87 ohm", use: "Showers/cookers" },
        { device: "50A Type B", maxZs: "0.87 ohm", corrected: "0.70 ohm", use: "Sub-mains" },
        { device: "63A Type B", maxZs: "0.69 ohm", corrected: "0.55 ohm", use: "Sub-mains" },
        { device: "80A Type B", maxZs: "0.55 ohm", corrected: "0.44 ohm", use: "Distribution" },
        { device: "100A Type B", maxZs: "0.44 ohm", corrected: "0.35 ohm", use: "Main distribution" }
      ]
    },
    longRunsSolutions: [
      "Increase cable size to reduce R1+R2",
      "Use Type C MCBs (higher Zs permitted but check for protection)",
      "Install RCD/RCBO protection (increases permitted Zs for fault protection)",
      "Consider additional sub-distribution to reduce run lengths",
      "Use copper rather than aluminium conductors"
    ]
  };

  const rcdTesting = {
    title: "RCD Testing Requirements",
    description: "Commercial installations may include various RCD types requiring different test procedures",
    rcdTypes: [
      {
        type: "Type AC",
        symbol: "~",
        description: "Detects sinusoidal AC residual current only",
        application: "General use (becoming less common)",
        testMethod: "Standard test at In and 5xIn",
        limitations: "Will not detect DC components in fault current"
      },
      {
        type: "Type A",
        symbol: "~---",
        description: "Detects AC and pulsating DC residual current",
        application: "Required for most modern equipment (VFDs, LED drivers, EV chargers)",
        testMethod: "Test AC waveform and pulsating DC (if tester capable)",
        limitations: "Will not detect smooth DC fault current"
      },
      {
        type: "Type F",
        symbol: "~---F",
        description: "As Type A plus high frequency fault detection",
        application: "Variable speed drives, inverter-fed equipment",
        testMethod: "Standard AC test, specialist test for high frequency",
        limitations: "More expensive than Type A"
      },
      {
        type: "Type B",
        symbol: "~===",
        description: "Detects AC, pulsating DC, and smooth DC",
        application: "Three-phase rectifier loads, EV charging (Mode 3/4)",
        testMethod: "Requires specialist tester for DC component testing",
        limitations: "Most expensive, may nuisance trip on harmonic-rich loads"
      },
      {
        type: "Type S (Time Delayed)",
        symbol: "S",
        description: "Selective - time delayed operation",
        application: "Upstream RCD for discrimination",
        testMethod: "Test at In (trip 130-500ms) and 5xIn (trip within 50ms)",
        limitations: "Must have downstream 30mA for shock protection"
      }
    ],
    testResults: {
      title: "RCD Test Requirements",
      tests: [
        { test: "At rated current (In)", requirement: "Must trip within 300ms", notes: "Both polarities" },
        { test: "At 50% In", requirement: "Must NOT trip", notes: "Confirms sensitivity" },
        { test: "At 5 x In (general)", requirement: "Must trip within 40ms", notes: "For 30mA RCDs" },
        { test: "At 5 x In (Type S)", requirement: "Must trip within 50ms", notes: "Time delayed type" },
        { test: "Ramp test", requirement: "Note trip current", notes: "Should be 50-100% of In" }
      ]
    },
    commercialConsiderations: [
      "Test all RCDs quarterly using test button (document in logbook)",
      "Instrument test annually as part of EICR",
      "Consider discrimination between upstream and downstream RCDs",
      "Label each RCD with circuits protected",
      "Ensure correct RCD type for connected equipment"
    ]
  };

  const phaseSequenceTesting = {
    title: "Three-Phase Sequence Testing",
    description: "Correct phase sequence is essential for three-phase rotating machinery and some electronic equipment",
    importance: [
      "Motors run backwards with reversed sequence - can cause mechanical damage",
      "Three-phase rectifiers affected by incorrect sequence",
      "Some control systems phase-sequence sensitive",
      "Lift motors particularly critical - safety systems may fail"
    ],
    testMethod: {
      steps: [
        { step: 1, action: "Use phase sequence tester/rotation indicator" },
        { step: 2, action: "Connect to L1, L2, L3 at supply point" },
        { step: 3, action: "Verify clockwise rotation indication (standard UK)" },
        { step: 4, action: "If anti-clockwise, swap any two phases at source" },
        { step: 5, action: "Re-test to confirm correction" },
        { step: 6, action: "Document phase sequence on circuit chart" }
      ],
      notes: [
        "Standard UK phase sequence: L1-L2-L3 clockwise (formerly R-Y-B)",
        "Test at each three-phase DB or equipment connection",
        "Some motors designed for anti-clockwise - check nameplate",
        "Phase sequence testers available as standalone or multifunction"
      ]
    },
    phaseColours: {
      title: "Conductor Colour Identification",
      current: [
        { phase: "L1", colour: "Brown" },
        { phase: "L2", colour: "Black" },
        { phase: "L3", colour: "Grey" },
        { phase: "Neutral", colour: "Blue" },
        { phase: "Earth", colour: "Green/Yellow" }
      ],
      historic: [
        { phase: "L1 (Red)", colour: "Red (pre-2004)" },
        { phase: "L2 (Yellow)", colour: "Yellow (pre-2004)" },
        { phase: "L3 (Blue)", colour: "Blue (pre-2004)" },
        { phase: "Neutral", colour: "Black (pre-2004)" }
      ],
      note: "Mixed installations require phase identification labels"
    }
  };

  const emergencyLightingTesting = {
    title: "Emergency Lighting Testing (BS 5266)",
    description: "Commercial premises require regular emergency lighting testing to ensure life safety compliance",
    testTypes: [
      {
        type: "Daily Check",
        frequency: "Daily (visual)",
        duration: "N/A",
        requirement: "Check indicator lights on self-contained units, central system status",
        record: "Note any faults in logbook"
      },
      {
        type: "Monthly Function Test",
        frequency: "Monthly",
        duration: "Brief (flick test)",
        requirement: "Operate test button to verify battery illumination, check all lamps light",
        record: "Record date, time, any failures, remedial action"
      },
      {
        type: "Annual Full Duration Test",
        frequency: "Annually",
        duration: "Full rated duration (1hr or 3hr)",
        requirement: "Discharge batteries fully, verify maintained operation for rated period",
        record: "Record start/end time, all readings, lamp failures"
      }
    ],
    centralBatterySystem: {
      title: "Central Battery System Testing",
      tests: [
        { test: "Battery voltage (float)", expected: "Typically 110V or 220V DC nominal", tolerance: "+/- 5%" },
        { test: "Battery voltage (on load)", expected: "Should not drop below 85% nominal", tolerance: "Check manufacturer data" },
        { test: "Charger operation", expected: "Correct charging current and voltage", tolerance: "Per manufacturer spec" },
        { test: "Changeover operation", expected: "Seamless transfer to battery", tolerance: "Within 0.5 seconds" },
        { test: "Earth fault monitoring", expected: "Alarm on earth fault", tolerance: "Must indicate fault" },
        { test: "Individual circuit monitoring", expected: "Lamp failure indication", tolerance: "Per circuit/zone" }
      ],
      additionalChecks: [
        "Verify battery room ventilation adequate",
        "Check for signs of battery damage or leakage",
        "Clean battery terminals and connections",
        "Record specific gravity (vented cells) or voltage (sealed)",
        "Verify automatic test system functioning"
      ]
    },
    selfContainedUnits: {
      title: "Self-Contained Unit Testing",
      checks: [
        "Green 'mains healthy' LED illuminated",
        "No fault LEDs showing",
        "Lamp illuminates when test button pressed",
        "Full duration test shows rated duration achieved",
        "Physical condition of unit and diffuser"
      ]
    },
    documentationRequired: [
      "Test logbook maintained on site",
      "Record of all monthly tests with date, tester name, results",
      "Annual full duration test certificate",
      "Replacement lamp and battery records",
      "Emergency lighting certificate (design compliance)"
    ]
  };

  const fireAlarmTesting = {
    title: "Fire Alarm Testing Coordination (BS 5839)",
    description: "Electricians installing fire alarm supplies must coordinate testing with fire alarm specialists",
    electricalResponsibilities: [
      "Dedicated supply circuit from main switchboard",
      "Correct cable type (fire rated where required)",
      "Adequate supply capacity and protection",
      "Supply changeover for generator backup",
      "Interface with building management system"
    ],
    testCoordination: {
      title: "Coordination with Fire Alarm Contractors",
      requirements: [
        {
          item: "Before Testing",
          actions: [
            "Notify fire alarm monitoring company",
            "Inform building management/occupants",
            "Arrange for lift recall test coordination",
            "Coordinate with HVAC shutdown interface"
          ]
        },
        {
          item: "Supply Testing",
          actions: [
            "Verify correct supply voltage (230V AC)",
            "Test supply earth fault loop impedance",
            "Confirm no RCD protection on fire alarm circuit",
            "Check battery charger operation"
          ]
        },
        {
          item: "Interface Testing",
          actions: [
            "Cause and effect testing (with FA contractor)",
            "Verify correct operation of interfaces",
            "Check door holder releases function",
            "Confirm lift recall operation"
          ]
        },
        {
          item: "Documentation",
          actions: [
            "Record supply test results on EIC/EICR",
            "Fire alarm contractor provides commissioning certificate",
            "Document interface test results",
            "Provide as-built drawings for supply"
          ]
        }
      ]
    },
    weeklyTesting: {
      title: "Weekly Test (Call Point Rotation)",
      procedure: [
        "Test different call point each week",
        "Verify panel receives correct zone indication",
        "Check sounders/beacons operate correctly",
        "Record test in fire alarm logbook",
        "Note any faults for rectification"
      ],
      note: "Weekly tests typically performed by building manager or fire alarm maintainer, not electrician"
    },
    cableSeparation: {
      title: "Fire Alarm Cable Separation",
      requirements: [
        "Minimum 300mm from mains power cables",
        "Or use mechanical/fire barrier separation",
        "No shared containment with power cables",
        "Fire stopping at all compartment boundaries"
      ]
    }
  };

  const documentationRequirements = {
    title: "Commercial Documentation Requirements",
    certificates: [
      {
        name: "Electrical Installation Certificate (EIC)",
        when: "New installations, major additions",
        sections: [
          { section: "Part 1-3", content: "Details of installation, designer, constructor" },
          { section: "Part 4", content: "Inspector and tester declaration" },
          { section: "Part 5", content: "Condition of existing installation" },
          { section: "Part 6", content: "Summary of inspection and testing" },
          { section: "Schedule of Inspections", content: "Detailed inspection checklist" },
          { section: "Schedule of Test Results", content: "Full test results for all circuits" }
        ],
        attachments: [
          "Distribution board schedule (circuit chart)",
          "Single line diagram",
          "As-built drawings",
          "Equipment schedules",
          "Inspection and test results spreadsheet"
        ],
        signatures: "Designer, Constructor, Inspector/Tester (may be same person for smaller works)"
      },
      {
        name: "Distribution Board Schedule",
        when: "Every distribution board installed or modified",
        requirements: [
          "Circuit number and reference",
          "Device type and rating (MCB, RCBO, etc.)",
          "Circuit designation (description of use)",
          "Points served (number and type)",
          "Cable size and type",
          "Phase allocation (L1/L2/L3)",
          "Test results columns"
        ]
      },
      {
        name: "EICR (Electrical Installation Condition Report)",
        when: "Periodic inspection - typically 5 years for commercial",
        sections: [
          { section: "Part A", content: "Installation details, purpose, extent" },
          { section: "Part B", content: "Summary of condition" },
          { section: "Part C", content: "Observations and recommendations" },
          { section: "Part D", content: "Declaration" },
          { section: "Part E", content: "Schedule of inspections" },
          { section: "Part F", content: "Schedule of circuit details and test results" }
        ],
        classifications: [
          { code: "C1", meaning: "Danger present - Risk of injury. Immediate remedial action required.", colour: "red" },
          { code: "C2", meaning: "Potentially dangerous - Urgent remedial action required.", colour: "orange" },
          { code: "C3", meaning: "Improvement recommended - Does not meet current standard.", colour: "yellow" },
          { code: "FI", meaning: "Further Investigation required without delay.", colour: "purple" }
        ],
        frequencyGuide: [
          { premises: "Commercial offices", frequency: "5 years" },
          { premises: "Industrial", frequency: "3 years" },
          { premises: "Theatres/cinemas", frequency: "1 year" },
          { premises: "Places of public entertainment", frequency: "1 year" },
          { premises: "Hotels/guest houses", frequency: "5 years" },
          { premises: "Restaurants/cafes", frequency: "5 years" },
          { premises: "Hospitals/medical", frequency: "5 years" },
          { premises: "Educational establishments", frequency: "5 years" },
          { premises: "Petrol stations", frequency: "1 year" },
          { premises: "Churches/religious buildings", frequency: "5 years" }
        ]
      }
    ]
  };

  const eicrRequirements = {
    title: "EICR Requirements for Commercial Premises",
    description: "Commercial installations require periodic inspection at intervals determined by premises type and use",
    inspectionScope: {
      title: "Scope of Commercial EICR",
      areas: [
        {
          area: "Main Switchboard/LV Panel",
          checks: [
            "Physical condition and labelling",
            "Clearance and access requirements",
            "Internal condition and cleanliness",
            "Evidence of thermal damage",
            "Fault level rating adequacy",
            "Protection discrimination studies (where available)"
          ]
        },
        {
          area: "Distribution Boards",
          checks: [
            "Condition and security",
            "Circuit identification and labelling",
            "Adequate spare ways",
            "Evidence of overheating",
            "RCD test button operation",
            "Earth bar connections"
          ]
        },
        {
          area: "Wiring and Containment",
          checks: [
            "Cable condition where visible",
            "Containment integrity",
            "Fire stopping at penetrations",
            "Support and fixings adequate",
            "Signs of mechanical damage",
            "Thermal damage or discolouration"
          ]
        },
        {
          area: "Accessories and Equipment",
          checks: [
            "Physical condition",
            "Correct mounting",
            "Earth continuity",
            "Terminal condition",
            "Signs of overheating",
            "Appropriate IP rating for location"
          ]
        },
        {
          area: "Special Installations",
          checks: [
            "Emergency lighting - visual check and operation",
            "Fire alarm supply - supply parameters",
            "UPS systems - supply and bypass",
            "External lighting - condition and seals",
            "Car park lighting - earth arrangements"
          ]
        }
      ]
    },
    sampleTesting: {
      title: "Sampling for Large Installations",
      description: "Where 100% testing is impractical, representative sampling may be applied",
      guidance: [
        "Minimum 10% of circuits per phase per distribution board",
        "All different circuit types should be represented",
        "Increase sample if defects found",
        "100% RCD testing always required",
        "Document sampling methodology in report",
        "Client agreement to sampling scope required"
      ],
      criticalCircuits: [
        "Life safety circuits - always 100% test",
        "Emergency lighting - always 100% test",
        "Fire alarm supply - always test",
        "Circuits with previous C1/C2 observations - always test"
      ]
    },
    reportingDefects: {
      title: "Defect Reporting and Classification",
      process: [
        "Record all observations objectively",
        "Apply correct classification (C1, C2, C3, FI)",
        "Describe defect location precisely",
        "Recommend remedial action",
        "Provide regulation reference where applicable",
        "Prioritise safety-critical items"
      ],
      commonDefects: [
        { defect: "Missing/damaged circuit breakers", typical: "C1/C2" },
        { defect: "Exposed live parts", typical: "C1" },
        { defect: "Missing earth connections", typical: "C1/C2" },
        { defect: "RCD not functioning", typical: "C2" },
        { defect: "Zs exceeds maximum", typical: "C2" },
        { defect: "IR below minimum", typical: "C2/FI" },
        { defect: "Missing circuit identification", typical: "C3" },
        { defect: "Accessories showing age", typical: "C3" },
        { defect: "Cable derating not applied", typical: "C2/FI" }
      ]
    }
  };

  const testEquipment = {
    title: "Test Equipment for Commercial Testing",
    equipment: [
      {
        instrument: "Multifunction Tester",
        function: "Continuity, IR, Loop, RCD, PFC",
        requirements: "BS EN 61557 compliant, 500V IR capability, three-phase capable",
        calibration: "Annual calibration certificate required",
        notes: "Essential for commercial testing"
      },
      {
        instrument: "Phase Sequence Indicator",
        function: "Verify three-phase rotation direction",
        requirements: "Rotary display or LED indication",
        calibration: "Functional check before use",
        notes: "Critical for motor installations"
      },
      {
        instrument: "Low Resistance Ohmmeter",
        function: "Accurate bonding conductor testing",
        requirements: "Resolution 0.001 ohm minimum",
        calibration: "Annual calibration recommended",
        notes: "Better accuracy than MFT continuity function"
      },
      {
        instrument: "Clamp Meter (True RMS)",
        function: "Load current measurement, leakage current",
        requirements: "True RMS for non-sinusoidal loads, DC capability",
        calibration: "Annual calibration recommended",
        notes: "Essential for load balancing verification"
      },
      {
        instrument: "Power Quality Analyser",
        function: "Harmonics, voltage dips, power factor",
        requirements: "Three-phase capable, data logging",
        calibration: "Per manufacturer schedule",
        notes: "For complex installations or fault finding"
      },
      {
        instrument: "Earth Electrode Tester",
        function: "Earth electrode resistance measurement",
        requirements: "Fall of potential method, stake-less option useful",
        calibration: "Annual calibration required",
        notes: "Required for TT installations"
      },
      {
        instrument: "Thermal Imaging Camera",
        function: "Identify hot spots at connections",
        requirements: "Adequate resolution and range",
        calibration: "Per manufacturer schedule",
        notes: "Increasingly expected for commercial EICR"
      }
    ],
    beforeTesting: [
      "Verify calibration status of all instruments",
      "Check test leads for damage",
      "Ensure batteries adequately charged",
      "Zero/null test leads where applicable",
      "Record serial numbers and calibration dates"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Test Sequence Order */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListOrdered className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">{testSequenceOrder.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200 text-sm">
              <strong>Important:</strong> {testSequenceOrder.note}
            </AlertDescription>
          </Alert>

          <p className="text-sm text-white">{testSequenceOrder.description}</p>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <div className="space-y-3">
              {testSequenceOrder.sequence.map((item) => (
                <div key={item.order} className="flex items-start gap-3">
                  <Badge variant="outline" className="border-blue-400 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center p-0 flex-shrink-0">
                    {item.order}
                  </Badge>
                  <div className="flex-1">
                    <span className="text-blue-100 text-sm">{item.test}</span>
                    <p className="text-xs text-blue-300 mt-1">{item.commercial}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continuity Testing in Large Installations */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">{continuityTesting.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{continuityTesting.description}</p>

          {continuityTesting.challenges.map((challenge, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-white mb-2">{challenge.challenge}</h4>
              <p className="text-sm text-orange-200 mb-3"><strong>Issue:</strong> {challenge.issue}</p>
              <div>
                <span className="text-sm text-green-200 font-medium">Solutions:</span>
                <ul className="mt-1 space-y-1">
                  {challenge.solutions.map((solution, idx) => (
                    <li key={idx} className="text-xs text-green-100 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <h4 className="font-medium text-white mb-3">Practical Tips</h4>
            <ul className="space-y-2">
              {continuityTesting.practicalTips.map((tip, idx) => (
                <li key={idx} className="text-sm text-green-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Insulation Resistance for Three-Phase */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{insulationResistance.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{insulationResistance.description}</p>

          {/* Test Voltages */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Test Voltages and Minimum Values</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Circuit Type</th>
                    <th className="text-left py-2 text-amber-200">Test Voltage</th>
                    <th className="text-left py-2 text-amber-200">Minimum IR</th>
                  </tr>
                </thead>
                <tbody>
                  {insulationResistance.testVoltages.map((row, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white text-xs">{row.circuit}</td>
                      <td className="py-2 text-amber-300 text-xs">{row.voltage}</td>
                      <td className="py-2 text-green-300 text-xs">{row.minimum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Three-Phase Method */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Three-Phase Testing Method</h4>
            <div className="space-y-3">
              {insulationResistance.threePhaseMethod.steps.map((step, idx) => (
                <div key={idx} className="bg-amber-600/10 p-3 rounded border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs">
                      Step {step.step}
                    </Badge>
                    <span className="text-white text-sm font-medium">{step.action}</span>
                  </div>
                  <p className="text-xs text-amber-100">{step.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Values */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Typical Expected Values</h4>
            <div className="space-y-2">
              {insulationResistance.threePhaseMethod.expectedValues.map((val, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-white">{val.installation}</span>
                  <span className="text-amber-300">{val.typical}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Troubleshooting Low Readings</h4>
            {insulationResistance.troubleshooting.map((issue, index) => (
              <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h5 className="font-medium text-red-200 mb-2">{issue.symptom}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-orange-300 font-medium">Possible Causes:</span>
                    <ul className="mt-1 space-y-0.5">
                      {issue.causes.map((cause, idx) => (
                        <li key={idx} className="text-xs text-orange-100">- {cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs text-green-300 font-medium">Actions:</span>
                    <ul className="mt-1 space-y-0.5">
                      {issue.actions.map((action, idx) => (
                        <li key={idx} className="text-xs text-green-100">- {action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loop Impedance for Long Cable Runs */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{loopImpedance.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{loopImpedance.description}</p>

          {/* Considerations */}
          {loopImpedance.considerations.map((item, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">{item.factor}</h4>
              <p className="text-sm text-purple-200 mb-2">{item.explanation}</p>
              <p className="text-xs text-purple-300"><strong>Method:</strong> {item.method}</p>
              <p className="text-xs text-white"><strong>Example:</strong> {item.example}</p>
            </div>
          ))}

          {/* Max Zs Values Table */}
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h4 className="font-medium text-white mb-2">{loopImpedance.maxZsValues.title}</h4>
            <Alert className="border-purple-500/50 bg-purple-500/10 mb-3">
              <AlertTriangle className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-purple-200 text-xs">
                {loopImpedance.maxZsValues.note}
              </AlertDescription>
            </Alert>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="text-left py-2 text-purple-200">Device</th>
                    <th className="text-left py-2 text-purple-200">Max Zs (20C)</th>
                    <th className="text-left py-2 text-purple-200">Corrected (0.8)</th>
                    <th className="text-left py-2 text-purple-200">Typical Use</th>
                  </tr>
                </thead>
                <tbody>
                  {loopImpedance.maxZsValues.values.map((row, idx) => (
                    <tr key={idx} className="border-b border-purple-500/20">
                      <td className="py-2 text-white text-xs">{row.device}</td>
                      <td className="py-2 text-purple-300 text-xs">{row.maxZs}</td>
                      <td className="py-2 text-amber-300 text-xs">{row.corrected}</td>
                      <td className="py-2 text-white text-xs">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Solutions for Long Runs */}
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h4 className="font-medium text-white mb-3">Solutions for Excessive Zs on Long Runs</h4>
            <ul className="space-y-2">
              {loopImpedance.longRunsSolutions.map((solution, idx) => (
                <li key={idx} className="text-sm text-purple-100 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* RCD Testing Requirements */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">{rcdTesting.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{rcdTesting.description}</p>

          {/* RCD Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rcdTesting.rcdTypes.map((rcd, index) => (
              <div key={index} className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-white text-sm">{rcd.type}</h4>
                  <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs font-mono">
                    {rcd.symbol}
                  </Badge>
                </div>
                <p className="text-xs text-cyan-200 mb-2">{rcd.description}</p>
                <p className="text-xs text-white mb-1"><strong>Application:</strong> {rcd.application}</p>
                <p className="text-xs text-blue-300 mb-1"><strong>Test Method:</strong> {rcd.testMethod}</p>
                <p className="text-xs text-orange-300"><strong>Limitations:</strong> {rcd.limitations}</p>
              </div>
            ))}
          </div>

          {/* Test Results Table */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-white mb-3">{rcdTesting.testResults.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 text-cyan-200">Test</th>
                    <th className="text-left py-2 text-cyan-200">Requirement</th>
                    <th className="text-left py-2 text-cyan-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {rcdTesting.testResults.tests.map((test, idx) => (
                    <tr key={idx} className="border-b border-cyan-500/20">
                      <td className="py-2 text-white text-xs">{test.test}</td>
                      <td className="py-2 text-cyan-300 text-xs">{test.requirement}</td>
                      <td className="py-2 text-white text-xs">{test.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Commercial Considerations */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="font-medium text-white mb-3">Commercial RCD Considerations</h4>
            <ul className="space-y-2">
              {rcdTesting.commercialConsiderations.map((item, idx) => (
                <li key={idx} className="text-sm text-cyan-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Phase Sequence Testing */}
      <Card className="border-rose-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-rose-400" />
            <CardTitle className="text-rose-300">{phaseSequenceTesting.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{phaseSequenceTesting.description}</p>

          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-sm">
              <strong>Why Phase Sequence Matters:</strong>
              <ul className="mt-1 space-y-1">
                {phaseSequenceTesting.importance.map((item, idx) => (
                  <li key={idx} className="text-xs">- {item}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>

          {/* Test Method */}
          <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
            <h4 className="font-medium text-white mb-3">Test Procedure</h4>
            <div className="space-y-2">
              {phaseSequenceTesting.testMethod.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Badge variant="outline" className="border-rose-400 text-rose-300 text-xs">
                    {step.step}
                  </Badge>
                  <span className="text-sm text-rose-100">{step.action}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-rose-500/20">
              <h5 className="text-sm font-medium text-rose-200 mb-2">Important Notes:</h5>
              <ul className="space-y-1">
                {phaseSequenceTesting.testMethod.notes.map((note, idx) => (
                  <li key={idx} className="text-xs text-rose-100 flex items-start gap-2">
                    <span className="w-1 h-1 bg-rose-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Phase Colours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
              <h4 className="font-medium text-white mb-3">Current Colour Code (2004+)</h4>
              <div className="space-y-2">
                {phaseSequenceTesting.phaseColours.current.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-white">{item.phase}</span>
                    <span className="text-rose-300">{item.colour}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
              <h4 className="font-medium text-white mb-3">Historic Colour Code (Pre-2004)</h4>
              <div className="space-y-2">
                {phaseSequenceTesting.phaseColours.historic.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-white">{item.phase}</span>
                    <span className="text-rose-300">{item.colour}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white mt-2">{phaseSequenceTesting.phaseColours.note}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Lighting Testing */}
      <Card className="border-yellow-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">{emergencyLightingTesting.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{emergencyLightingTesting.description}</p>

          {/* Test Types */}
          <div className="space-y-3">
            {emergencyLightingTesting.testTypes.map((test, index) => (
              <div key={index} className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  <h4 className="font-medium text-white">{test.type}</h4>
                  <Badge variant="outline" className="border-yellow-400 text-yellow-300 text-xs">
                    {test.frequency}
                  </Badge>
                </div>
                <p className="text-sm text-yellow-200 mb-2"><strong>Duration:</strong> {test.duration}</p>
                <p className="text-sm text-white mb-2"><strong>Requirement:</strong> {test.requirement}</p>
                <p className="text-sm text-blue-300"><strong>Record:</strong> {test.record}</p>
              </div>
            ))}
          </div>

          {/* Central Battery System */}
          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
            <h4 className="font-medium text-white mb-3">{emergencyLightingTesting.centralBatterySystem.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-500/30">
                    <th className="text-left py-2 text-yellow-200">Test</th>
                    <th className="text-left py-2 text-yellow-200">Expected</th>
                    <th className="text-left py-2 text-yellow-200">Tolerance</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyLightingTesting.centralBatterySystem.tests.map((test, idx) => (
                    <tr key={idx} className="border-b border-yellow-500/20">
                      <td className="py-2 text-white text-xs">{test.test}</td>
                      <td className="py-2 text-yellow-300 text-xs">{test.expected}</td>
                      <td className="py-2 text-white text-xs">{test.tolerance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 pt-3 border-t border-yellow-500/20">
              <h5 className="text-sm font-medium text-yellow-200 mb-2">Additional Checks:</h5>
              <ul className="space-y-1">
                {emergencyLightingTesting.centralBatterySystem.additionalChecks.map((check, idx) => (
                  <li key={idx} className="text-xs text-yellow-100 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
            <h4 className="font-medium text-white mb-3">Documentation Required</h4>
            <ul className="space-y-2">
              {emergencyLightingTesting.documentationRequired.map((item, idx) => (
                <li key={idx} className="text-sm text-yellow-100 flex items-start gap-2">
                  <FileCheck className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Fire Alarm Testing Coordination */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">{fireAlarmTesting.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{fireAlarmTesting.description}</p>

          {/* Electrical Responsibilities */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-white mb-3">Electrician's Responsibilities</h4>
            <ul className="space-y-2">
              {fireAlarmTesting.electricalResponsibilities.map((item, idx) => (
                <li key={idx} className="text-sm text-red-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Test Coordination */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-white mb-3">{fireAlarmTesting.testCoordination.title}</h4>
            <div className="space-y-3">
              {fireAlarmTesting.testCoordination.requirements.map((req, index) => (
                <div key={index} className="bg-red-600/10 p-3 rounded border border-red-500/30">
                  <h5 className="font-medium text-red-200 text-sm mb-2">{req.item}</h5>
                  <ul className="space-y-1">
                    {req.actions.map((action, idx) => (
                      <li key={idx} className="text-xs text-red-100 flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Cable Separation */}
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-sm">
              <strong>{fireAlarmTesting.cableSeparation.title}:</strong>
              <ul className="mt-1 space-y-1">
                {fireAlarmTesting.cableSeparation.requirements.map((req, idx) => (
                  <li key={idx} className="text-xs">- {req}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Documentation Requirements */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{documentationRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {documentationRequirements.certificates.map((cert, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">{cert.name}</h4>
              <p className="text-sm text-purple-200 mb-3"><strong>When:</strong> {cert.when}</p>

              {'sections' in cert && cert.sections && (
                <div className="mb-3">
                  <h5 className="font-medium text-purple-200 mb-2 text-sm">Sections</h5>
                  <div className="space-y-1">
                    {cert.sections.map((section, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="text-purple-300 font-medium">{section.section}:</span>
                        <span className="text-white ml-1">{section.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {'attachments' in cert && cert.attachments && (
                <div className="mb-3">
                  <h5 className="font-medium text-purple-200 mb-2 text-sm">Required Attachments</h5>
                  <ul className="space-y-1">
                    {cert.attachments.map((attachment, idx) => (
                      <li key={idx} className="text-xs text-purple-100 flex items-start gap-2">
                        <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {attachment}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {'requirements' in cert && cert.requirements && (
                <div className="mb-3">
                  <h5 className="font-medium text-purple-200 mb-2 text-sm">Requirements</h5>
                  <ul className="space-y-1">
                    {cert.requirements.map((req, idx) => (
                      <li key={idx} className="text-xs text-purple-100 flex items-start gap-2">
                        <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {'classifications' in cert && cert.classifications && (
                <div className="mb-3">
                  <h5 className="font-medium text-purple-200 mb-2 text-sm">Classification Codes</h5>
                  <div className="space-y-1">
                    {cert.classifications.map((classification, idx) => (
                      <div key={idx} className="text-xs flex items-start gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs flex-shrink-0 ${
                            classification.code === 'C1' ? 'border-red-400 text-red-300' :
                            classification.code === 'C2' ? 'border-orange-400 text-orange-300' :
                            classification.code === 'C3' ? 'border-yellow-400 text-yellow-300' :
                            'border-purple-400 text-purple-300'
                          }`}
                        >
                          {classification.code}
                        </Badge>
                        <span className="text-white">{classification.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {'frequencyGuide' in cert && cert.frequencyGuide && (
                <div>
                  <h5 className="font-medium text-purple-200 mb-2 text-sm">EICR Frequency Guide</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {cert.frequencyGuide.map((item, idx) => (
                      <div key={idx} className="bg-purple-600/10 p-2 rounded border border-purple-500/30">
                        <div className="text-xs text-white">{item.premises}</div>
                        <div className="text-sm text-purple-300 font-medium">{item.frequency}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {'signatures' in cert && (
                <p className="text-xs text-white mt-2"><strong>Signatures:</strong> {cert.signatures}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* EICR Requirements */}
      <Card className="border-indigo-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-indigo-400" />
            <CardTitle className="text-indigo-300">{eicrRequirements.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">{eicrRequirements.description}</p>

          {/* Inspection Scope */}
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-3">{eicrRequirements.inspectionScope.title}</h4>
            <div className="space-y-3">
              {eicrRequirements.inspectionScope.areas.map((area, index) => (
                <div key={index} className="bg-indigo-600/10 p-3 rounded border border-indigo-500/30">
                  <h5 className="font-medium text-indigo-200 text-sm mb-2">{area.area}</h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {area.checks.map((check, idx) => (
                      <li key={idx} className="text-xs text-indigo-100 flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-indigo-400 mt-0.5 flex-shrink-0" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sampling */}
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-2">{eicrRequirements.sampleTesting.title}</h4>
            <p className="text-xs text-white mb-3">{eicrRequirements.sampleTesting.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-indigo-200 mb-2">Sampling Guidance:</h5>
                <ul className="space-y-1">
                  {eicrRequirements.sampleTesting.guidance.map((item, idx) => (
                    <li key={idx} className="text-xs text-indigo-100 flex items-start gap-2">
                      <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-indigo-200 mb-2">100% Testing Required:</h5>
                <ul className="space-y-1">
                  {eicrRequirements.sampleTesting.criticalCircuits.map((item, idx) => (
                    <li key={idx} className="text-xs text-red-100 flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Common Defects */}
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
            <h4 className="font-medium text-white mb-3">Common Defects and Typical Classifications</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-indigo-500/30">
                    <th className="text-left py-2 text-indigo-200">Defect</th>
                    <th className="text-left py-2 text-indigo-200">Typical Code</th>
                  </tr>
                </thead>
                <tbody>
                  {eicrRequirements.reportingDefects.commonDefects.map((defect, idx) => (
                    <tr key={idx} className="border-b border-indigo-500/20">
                      <td className="py-2 text-white text-xs">{defect.defect}</td>
                      <td className="py-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            defect.typical.includes('C1') ? 'border-red-400 text-red-300' :
                            defect.typical.includes('C2') ? 'border-orange-400 text-orange-300' :
                            'border-yellow-400 text-yellow-300'
                          }`}
                        >
                          {defect.typical}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Equipment */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{testEquipment.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testEquipment.equipment.map((equip, index) => (
              <div key={index} className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                <h4 className="font-medium text-amber-200 text-sm mb-2">{equip.instrument}</h4>
                <p className="text-xs text-white mb-1"><strong>Function:</strong> {equip.function}</p>
                <p className="text-xs text-white mb-1"><strong>Requirements:</strong> {equip.requirements}</p>
                <p className="text-xs text-white mb-1"><strong>Calibration:</strong> {equip.calibration}</p>
                <p className="text-xs text-amber-100"><strong>Note:</strong> {equip.notes}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Before Testing Checklist</h4>
            <ul className="space-y-2">
              {testEquipment.beforeTesting.map((item, idx) => (
                <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialTestingGuide;
