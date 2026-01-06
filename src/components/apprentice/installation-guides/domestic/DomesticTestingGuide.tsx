
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
  ListOrdered
} from "lucide-react";

const DomesticTestingGuide = () => {
  const testSequenceOrder = {
    title: "Initial Verification Test Sequence",
    description: "Tests must be performed in this specific order as per BS 7671 Chapter 64",
    note: "Earlier tests verify conditions required for later tests to give valid results",
    sequence: [
      { order: 1, test: "Continuity of protective conductors (including main and supplementary bonding)" },
      { order: 2, test: "Continuity of ring final circuit conductors" },
      { order: 3, test: "Insulation resistance" },
      { order: 4, test: "Polarity" },
      { order: 5, test: "Earth electrode resistance (TT systems only)" },
      { order: 6, test: "Earth fault loop impedance (Zs)" },
      { order: 7, test: "Prospective fault current (Ipf)" },
      { order: 8, test: "Functional testing (including RCDs)" }
    ]
  };

  const detailedTests = [
    {
      test: "Continuity of Protective Conductors",
      testNumber: 1,
      purpose: "Verify earth continuity throughout installation and confirm R1+R2 values for Zs calculation",
      method: [
        "Connect test leads to main earthing terminal",
        "Null (zero) test leads together",
        "Test from MET to earth terminal at each point",
        "Record highest value for each circuit"
      ],
      expectedValues: [
        { circuit: "Ring (2.5mm²)", typicalR1R2: "0.4 - 1.2 ohm", maxZs: "1.09 ohm (32A Type B)" },
        { circuit: "Radial (2.5mm²)", typicalR1R2: "0.3 - 0.8 ohm", maxZs: "1.37 ohm (20A Type B)" },
        { circuit: "Lighting (1.5mm²)", typicalR1R2: "0.5 - 1.5 ohm", maxZs: "7.28 ohm (6A Type B)" },
        { circuit: "Shower (6mm²)", typicalR1R2: "0.2 - 0.5 ohm", maxZs: "0.55 ohm (40A Type B)" }
      ],
      equipment: "Low resistance ohmmeter (continuity function), test leads, wandering lead",
      tips: [
        "Ensure good contact at test points",
        "Use long wandering lead from MET",
        "Test to furthest point on each circuit"
      ]
    },
    {
      test: "Continuity of Ring Final Circuit Conductors",
      testNumber: 2,
      purpose: "Confirm ring circuit is continuous and has no interconnections or faults",
      method: [
        "Identify L1, L2, N1, N2, E1, E2 at consumer unit",
        "Step 1: Measure end-to-end resistance of each conductor (r1, rn, r2)",
        "Step 2: Cross-connect L1-L2 and N1-N2, measure at each socket",
        "Step 3: Cross-connect L1-L2 and E1-E2, measure at each socket (gives R1+R2)"
      ],
      expectedValues: [
        { measurement: "End-to-end Line (r1)", typical: "0.3 - 0.8 ohm", note: "Both legs same value" },
        { measurement: "End-to-end Neutral (rn)", typical: "0.3 - 0.8 ohm", note: "Same as r1 (tolerance 0.05)" },
        { measurement: "End-to-end CPC (r2)", typical: "0.5 - 1.2 ohm", note: "Higher due to smaller CPC" },
        { measurement: "Cross-connect L-N (Step 2)", typical: "(r1+rn)/4 at mid-point", note: "Constant around ring" },
        { measurement: "Cross-connect L-E (R1+R2)", typical: "(r1+r2)/4 at mid-point", note: "Record for Zs check" }
      ],
      equipment: "Low resistance ohmmeter",
      tips: [
        "Clearly label conductors before disconnecting",
        "Plot results to identify breaks or interconnections",
        "Mid-point socket should show lowest reading"
      ]
    },
    {
      test: "Insulation Resistance",
      testNumber: 3,
      purpose: "Verify cable insulation integrity and detect faults before energising",
      method: [
        "Disconnect/isolate all loads and electronic equipment",
        "Remove lamps and disconnect sensitive equipment",
        "Test between Line-Neutral, Line-Earth, Neutral-Earth",
        "Apply 500V DC for circuits up to 500V AC"
      ],
      expectedValues: [
        { circuit: "Individual circuit", minimum: "1 M ohm", typical: "10 - 200 M ohm" },
        { circuit: "Whole installation", minimum: "1 M ohm", typical: "2 - 50 M ohm" },
        { circuit: "SELV/PELV circuits", minimum: "0.5 M ohm", typical: "1 - 100 M ohm" }
      ],
      equipment: "Insulation resistance tester (500V DC)",
      tips: [
        "Disconnect all electronic equipment",
        "Link L and N for L+N to E test",
        "Wait for reading to stabilise",
        "Low readings may indicate moisture"
      ],
      warnings: [
        "High voltage test - ensure isolation",
        "Can damage electronic equipment",
        "Capacitive discharge on long cables"
      ]
    },
    {
      test: "Polarity",
      testNumber: 4,
      purpose: "Confirm correct connection of line, neutral and earth conductors",
      method: [
        "Visual inspection at consumer unit and accessories",
        "Continuity test from line at CU to line terminal at each point",
        "Verify switches are in line conductor only",
        "Check socket outlets for correct L, N, E positions"
      ],
      checkpoints: [
        "Single-pole switches in line conductor only",
        "Centre contact of ES lampholders connected to line",
        "Socket outlets: Line (right), Neutral (left), Earth (top)",
        "Fuses/MCBs in line conductor only"
      ],
      equipment: "Continuity tester, socket tester, visual inspection",
      tips: [
        "Socket testers give quick indication but not definitive",
        "Continuity testing provides confirmation",
        "Check all switch positions"
      ]
    },
    {
      test: "Earth Fault Loop Impedance (Zs)",
      testNumber: 6,
      purpose: "Verify disconnection time requirements will be met under fault conditions",
      method: [
        "Test at furthest point of each circuit",
        "For socket circuits: test at furthest socket",
        "For lighting: test at furthest luminaire",
        "Record highest reading for each circuit"
      ],
      expectedValues: [
        { device: "32A Type B MCB/RCBO", maxZs: "1.09 ohm", notes: "Ring circuits" },
        { device: "20A Type B MCB", maxZs: "1.37 ohm", notes: "20A radials" },
        { device: "16A Type B MCB", maxZs: "1.71 ohm", notes: "16A radials" },
        { device: "6A Type B MCB", maxZs: "7.28 ohm", notes: "Lighting" },
        { device: "40A Type B MCB", maxZs: "0.55 ohm", notes: "Showers" },
        { device: "30mA RCD", maxZs: "1667 ohm", notes: "Supplementary protection" }
      ],
      equipment: "Earth fault loop impedance tester",
      calculation: "Zs = Ze + (R1+R2) - verify against tables",
      tips: [
        "Apply temperature correction factor (0.8 x Zs max)",
        "Compare measured Zs with calculated (Ze + R1+R2)",
        "High Zs may indicate poor earth connection"
      ]
    },
    {
      test: "RCD Operation",
      testNumber: 8,
      purpose: "Confirm RCD provides required protection within specified time",
      method: [
        "Test at rated residual current (I delta n)",
        "Test at 5 x I delta n for general RCDs",
        "Test positive and negative half-cycles",
        "Record trip time at rated current"
      ],
      expectedValues: [
        { rcdType: "General (Type AC/A)", atIdn: "Trip within 300ms", at5Idn: "Trip within 40ms" },
        { rcdType: "Time-delayed (Type S)", atIdn: "Trip 130-500ms", at5Idn: "Trip 50ms" },
        { rcdType: "30mA RCD", testCurrent: "30mA", maxTime: "300ms" },
        { rcdType: "100mA RCD", testCurrent: "100mA", maxTime: "300ms" },
        { rcdType: "At 50% Idn", testCurrent: "15mA for 30mA RCD", expected: "Should NOT trip" }
      ],
      equipment: "RCD tester with variable test current",
      tips: [
        "Test both polarities",
        "Test ramp function if available",
        "Check 5x Idn for 40ms requirement",
        "Use test button regularly between instrument tests"
      ]
    },
    {
      test: "Prospective Fault Current (Ipf)",
      testNumber: 7,
      purpose: "Verify protective devices have adequate breaking capacity",
      method: [
        "Measure at origin of installation",
        "Record both line-neutral and line-earth values",
        "Compare with protective device ratings"
      ],
      expectedValues: [
        { location: "Domestic origin (typical)", psc: "1 - 3 kA", notes: "TN-C-S supply" },
        { location: "Urban areas", psc: "3 - 6 kA", notes: "Higher DNO capacity" },
        { location: "MCB breaking capacity", minimum: "6 kA", typical: "6 - 10 kA" }
      ],
      equipment: "Prospective fault current tester (usually combined with Zs tester)",
      tips: [
        "Test at main switch incoming",
        "Higher value is worst case",
        "Verify device rating exceeds measured Ipf"
      ]
    }
  ];

  const commonFaultsAndSolutions = [
    {
      fault: "High Earth Fault Loop Impedance (Zs)",
      symptoms: ["Zs exceeds maximum for protective device", "Calculated and measured Zs don't match"],
      causes: [
        "Poor connection at earth terminals",
        "Corroded earth connections",
        "Undersized CPC for circuit length",
        "High supply impedance (Ze)"
      ],
      solutions: [
        "Clean and re-terminate earth connections",
        "Check main earth terminal and bonding",
        "Verify CPC size is adequate",
        "Consider larger CPC or shorter run",
        "Upgrade to RCD protection if Zs marginal"
      ],
      prevention: "Regular inspection and maintenance of earth connections"
    },
    {
      fault: "RCD Nuisance Tripping",
      symptoms: ["RCD trips randomly", "RCD trips when specific appliances used", "Trip on startup"],
      causes: [
        "High cumulative earth leakage from multiple appliances",
        "Faulty appliance with earth leakage",
        "Damaged cable insulation",
        "Moisture in connections"
      ],
      solutions: [
        "Split circuits across multiple RCDs",
        "Identify and replace faulty appliances",
        "Check insulation resistance of circuits",
        "Use RCBO protection for sensitive circuits",
        "Consider time-delayed RCD for upstream protection"
      ],
      prevention: "Limit circuits per RCD, regular insulation testing"
    },
    {
      fault: "Low Insulation Resistance",
      symptoms: ["IR reading below 1M ohm", "Reading decreases over time", "Varies with humidity"],
      causes: [
        "Damaged cable insulation",
        "Moisture ingress",
        "Connected appliances affecting reading",
        "Aged cable insulation"
      ],
      solutions: [
        "Disconnect all loads and retest",
        "Test individual circuits to locate fault",
        "Check for moisture in junction boxes",
        "Replace damaged cables",
        "Allow damp areas to dry before retesting"
      ],
      prevention: "Proper cable installation, weatherproofing outdoors"
    },
    {
      fault: "Ring Circuit Fault",
      symptoms: ["Inconsistent end-to-end readings", "Cross-connect readings not constant", "Open circuit indication"],
      causes: [
        "Break in ring conductor",
        "Loose connection in socket",
        "Unauthorised modifications/spurs",
        "Interconnection with another circuit"
      ],
      solutions: [
        "Plot readings to locate fault position",
        "Check all socket connections",
        "Verify no unauthorised modifications",
        "Repair break or reconnect ring"
      ],
      prevention: "Document modifications, regular testing"
    },
    {
      fault: "Polarity Error",
      symptoms: ["Socket tester shows fault", "Line and neutral reversed", "Switch in neutral"],
      causes: [
        "Incorrect termination at accessory",
        "Cables connected wrong way at CU",
        "Third-party previous work"
      ],
      solutions: [
        "Re-terminate correctly",
        "Check all connections in circuit",
        "Test entire circuit for polarity"
      ],
      prevention: "Visual inspection, careful termination, testing before energisation"
    }
  ];

  const documentationRequirements = {
    title: "Documentation Requirements",
    certificates: [
      {
        name: "Electrical Installation Certificate (EIC)",
        when: "New installations, additions, and alterations to existing circuits",
        sections: [
          { section: "Part 1", content: "Installation details, extent of work, particulars" },
          { section: "Part 2", content: "Designer declaration (if different from constructor)" },
          { section: "Part 3", content: "Constructor declaration" },
          { section: "Part 4", content: "Inspector and tester declaration" },
          { section: "Part 5", content: "Comments on existing installation" },
          { section: "Part 6", content: "Essential tests and inspection recommendations" }
        ],
        attachments: ["Schedule of inspections", "Schedule of test results", "Circuit charts"],
        signatures: "Three signatures required: Designer, Constructor, Inspector/Tester (can be same person)"
      },
      {
        name: "Minor Electrical Installation Works Certificate (MEIWC)",
        when: "Additions or alterations that do not extend to new circuits",
        sections: [
          { section: "Part 1", content: "Description of minor works, details of work performed" },
          { section: "Part 2", content: "Essential test results" },
          { section: "Part 3", content: "Declaration" }
        ],
        attachments: ["None required but keep records"],
        signatures: "One signature from person carrying out the work"
      },
      {
        name: "Electrical Installation Condition Report (EICR)",
        when: "Periodic inspection of existing installations",
        sections: [
          { section: "Part A", content: "Details of installation and contractor" },
          { section: "Part B", content: "Summary of the condition" },
          { section: "Part C", content: "Observations and recommendations" },
          { section: "Part D", content: "Declaration" }
        ],
        classifications: [
          { code: "C1", meaning: "Danger present - immediate remedial action required" },
          { code: "C2", meaning: "Potentially dangerous - urgent remedial action required" },
          { code: "C3", meaning: "Improvement recommended" },
          { code: "FI", meaning: "Further investigation required" }
        ],
        signatures: "Inspector signature required, competent person to supervise if trainee"
      }
    ],
    retention: "Keep records for minimum 10 years, provide copy to client within 28 days",
    recordKeeping: [
      "Test results for each circuit",
      "Photographs of installation before and after",
      "Risk assessment documentation",
      "Any variations from original design"
    ]
  };

  const testEquipmentCalibration = {
    title: "Test Equipment Requirements",
    equipment: [
      {
        instrument: "Low Resistance Ohmmeter",
        function: "Continuity testing, R1+R2, ring circuit testing",
        accuracy: "Resolution 0.01 ohm, accuracy 2%",
        calibration: "Annual calibration recommended"
      },
      {
        instrument: "Insulation Resistance Tester",
        function: "Insulation resistance testing",
        voltage: "250V, 500V, 1000V DC options",
        accuracy: "Within 5% at rated voltage",
        calibration: "Annual calibration required"
      },
      {
        instrument: "Earth Fault Loop Impedance Tester",
        function: "Zs measurement, Ze measurement",
        accuracy: "Within 5%",
        calibration: "Annual calibration required"
      },
      {
        instrument: "RCD Tester",
        function: "RCD trip time and current testing",
        features: "Variable test current, trip time measurement, positive/negative half-cycle",
        accuracy: "Time within 1ms, current within 1mA",
        calibration: "Annual calibration required"
      },
      {
        instrument: "Prospective Fault Current Tester",
        function: "Ipf measurement",
        accuracy: "Within 5%",
        notes: "Often combined with loop impedance tester"
      }
    ],
    generalRequirements: [
      "All instruments must comply with BS EN 61557",
      "Calibration certificates must be available",
      "Test leads in good condition",
      "Batteries adequately charged",
      "Zero/null leads before use where applicable"
    ]
  };

  const certificationRequirements = [
    {
      certificate: "Electrical Installation Certificate (EIC)",
      when: "New installations and additions",
      whoSigns: "Designer, Constructor, Inspector & Tester",
      contents: ["Installation details", "Test results", "Observations", "Limitations"]
    },
    {
      certificate: "Minor Electrical Installation Works Certificate",
      when: "Small additions and alterations",
      whoSigns: "Person carrying out work",
      contents: ["Work description", "Test results", "Declaration of compliance"]
    }
  ];

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

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <p className="text-sm text-white/80 mb-4">{testSequenceOrder.description}</p>
            <div className="space-y-2">
              {testSequenceOrder.sequence.map((item) => (
                <div key={item.order} className="flex items-center gap-3 text-sm">
                  <Badge variant="outline" className="border-blue-400 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center p-0">
                    {item.order}
                  </Badge>
                  <span className="text-blue-100">{item.test}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Test Procedures */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Detailed Test Procedures & Expected Values</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {detailedTests.map((test, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                  Test {test.testNumber}
                </Badge>
                <h4 className="font-medium text-white text-sm">{test.test}</h4>
              </div>

              <p className="text-sm text-green-200 mb-4">{test.purpose}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-200 mb-2 text-sm">Method</h5>
                  <ul className="space-y-1">
                    {test.method.map((step, idx) => (
                      <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                        <span className="text-green-400 font-medium">{idx + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-green-200 mb-2 text-sm">Expected Values</h5>
                  {test.expectedValues && (
                    <div className="space-y-1">
                      {test.expectedValues.map((val, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="text-white/80">
                            {'circuit' in val && <><strong className="text-green-300">{val.circuit}:</strong> R1+R2 {val.typicalR1R2}</>}
                            {'measurement' in val && <><strong className="text-green-300">{val.measurement}:</strong> {val.typical}</>}
                            {'device' in val && <><strong className="text-green-300">{val.device}:</strong> Max Zs {val.maxZs}</>}
                            {'rcdType' in val && <><strong className="text-green-300">{val.rcdType}:</strong> {'atIdn' in val ? val.atIdn : `${val.testCurrent} - ${val.maxTime}`}</>}
                            {'location' in val && <><strong className="text-green-300">{val.location}:</strong> {val.psc}</>}
                            {'minimum' in val && !('circuit' in val) && <><strong className="text-green-300">{val.circuit}:</strong> Min {val.minimum}</>}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {test.checkpoints && (
                    <ul className="space-y-1">
                      {test.checkpoints.map((checkpoint, idx) => (
                        <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {checkpoint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-green-500/20">
                <div className="flex items-start gap-2">
                  <span className="text-xs text-green-300 font-medium">Equipment:</span>
                  <span className="text-xs text-white/80">{test.equipment}</span>
                </div>
                {test.tips && (
                  <div className="mt-2">
                    <span className="text-xs text-green-300 font-medium">Tips:</span>
                    <ul className="mt-1 space-y-1">
                      {test.tips.map((tip, idx) => (
                        <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {test.warnings && (
                  <div className="mt-2">
                    <span className="text-xs text-red-300 font-medium">Warnings:</span>
                    <ul className="mt-1 space-y-1">
                      {test.warnings.map((warning, idx) => (
                        <li key={idx} className="text-xs text-red-200 flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Common Faults and Solutions */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Common Faults and Solutions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {commonFaultsAndSolutions.map((item, index) => (
            <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-medium text-white mb-3">{item.fault}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-orange-300 mb-2">Symptoms</h5>
                  <ul className="space-y-1">
                    {item.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-xs text-orange-100 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-red-300 mb-2">Causes</h5>
                  <ul className="space-y-1">
                    {item.causes.map((cause, idx) => (
                      <li key={idx} className="text-xs text-red-100 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-green-300 mb-2">Solutions</h5>
                  <ul className="space-y-1">
                    {item.solutions.map((solution, idx) => (
                      <li key={idx} className="text-xs text-green-100 flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-red-500/20">
                <span className="text-xs text-blue-300"><strong>Prevention:</strong> {item.prevention}</span>
              </div>
            </div>
          ))}
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
          <Alert className="border-purple-500/50 bg-purple-500/10">
            <Info className="h-4 w-4 text-purple-400" />
            <AlertDescription className="text-purple-200 text-sm">
              <strong>Retention:</strong> {documentationRequirements.retention}
            </AlertDescription>
          </Alert>

          {documentationRequirements.certificates.map((cert, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">{cert.name}</h4>
              <p className="text-sm text-purple-200 mb-3"><strong>When:</strong> {cert.when}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-purple-200 mb-2 text-sm">Sections</h5>
                  <div className="space-y-1">
                    {cert.sections.map((section, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="text-purple-300 font-medium">{section.section}:</span>
                        <span className="text-white/80 ml-1">{section.content}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {'classifications' in cert && cert.classifications && (
                    <>
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
                                'border-blue-400 text-blue-300'
                              }`}
                            >
                              {classification.code}
                            </Badge>
                            <span className="text-white/80">{classification.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  <div className="mt-3">
                    <span className="text-xs text-purple-300"><strong>Signatures:</strong> {cert.signatures}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h4 className="font-medium text-white mb-3">Record Keeping</h4>
            <ul className="space-y-1">
              {documentationRequirements.recordKeeping.map((item, idx) => (
                <li key={idx} className="text-sm text-purple-100 flex items-start gap-2">
                  <ClipboardList className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Test Equipment */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{testEquipmentCalibration.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testEquipmentCalibration.equipment.map((equip, index) => (
              <div key={index} className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                <h4 className="font-medium text-amber-200 text-sm mb-2">{equip.instrument}</h4>
                <p className="text-xs text-white/80 mb-1"><strong>Function:</strong> {equip.function}</p>
                {'voltage' in equip && <p className="text-xs text-white/80 mb-1"><strong>Voltage:</strong> {equip.voltage}</p>}
                {'accuracy' in equip && <p className="text-xs text-white/80 mb-1"><strong>Accuracy:</strong> {equip.accuracy}</p>}
                {'features' in equip && <p className="text-xs text-white/80 mb-1"><strong>Features:</strong> {equip.features}</p>}
                {'calibration' in equip && <p className="text-xs text-amber-100"><strong>Calibration:</strong> {equip.calibration}</p>}
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">General Requirements</h4>
            <ul className="space-y-1">
              {testEquipmentCalibration.generalRequirements.map((req, idx) => (
                <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticTestingGuide;
