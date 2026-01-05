
import { Settings, Zap, FileCheck, Eye, AlertTriangle, Table, CheckCircle, Clock, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationTestMethodsContent = () => {
  const setupSteps = [
    "Use a multifunction tester (MFT) or dedicated IR tester",
    "Select the appropriate test voltage—typically 500 V DC for circuits up to 500 V",
    "Ensure the circuit is safely isolated and proven dead",
    "Disconnect electronic devices that could be damaged by the test voltage"
  ];

  const testCombinations = [
    {
      test: "Line to Neutral (L–N)",
      purpose: "Tests insulation between live conductors",
      procedure: "Connect probes between Line and Neutral conductors"
    },
    {
      test: "Line to Earth (L–E)",
      purpose: "Tests insulation between Line and protective conductor",
      procedure: "Connect probes between Line conductor and Earth terminal"
    },
    {
      test: "Neutral to Earth (N–E)",
      purpose: "Tests insulation between Neutral and protective conductor",
      procedure: "Connect probes between Neutral conductor and Earth terminal"
    }
  ];

  const finalCircuitProcedure = [
    "Disconnect the live conductors at the origin (e.g. MCB/RCBO terminals)",
    "Link L & N together if testing L+N to Earth (common where loads can't be disconnected)",
    "Test between the conductor pairs using the meter's probes",
    "Maintain probe contact for several seconds until the reading stabilises"
  ];

  const interpretationCriteria = [
    { result: "≥ 1 MΩ", status: "Pass", action: "Acceptable - record actual value", color: "green" },
    { result: "< 1 MΩ", status: "Fail", action: "Investigate and rectify before proceeding", color: "red" }
  ];

  const investigationSteps = [
    "Check for moisture in fittings and enclosures",
    "Inspect for damaged cable insulation",
    "Look for incorrectly terminated conductors",
    "Verify no foreign objects in termination points",
    "Consider environmental factors (humidity, contamination)"
  ];

  const advancedTechniques = [
    {
      title: "Progressive Testing Method",
      description: "Test circuits in stages, starting from the distribution board and working outward to isolate problem areas",
      when: "When initial readings are marginal or when faults are suspected"
    },
    {
      title: "Sectional Testing",
      description: "Divide long circuits into sections to pinpoint specific problem areas more accurately",
      when: "For long cable runs or complex installations with multiple junction points"
    },
    {
      title: "Comparative Testing",
      description: "Compare readings between similar circuits to identify anomalies or degradation patterns",
      when: "During periodic testing or when investigating intermittent problems"
    }
  ];

  const environmentalFactors = [
    {
      factor: "Temperature",
      impact: "Higher temperatures generally reduce IR readings due to increased molecular movement",
      compensation: "Test during consistent temperature conditions and note ambient temperature"
    },
    {
      factor: "Humidity",
      impact: "High humidity can significantly reduce readings, especially on surface contamination",
      compensation: "Avoid testing in very humid conditions or ensure surfaces are clean and dry"
    },
    {
      factor: "Contamination",
      impact: "Dust, dirt, or conductive deposits can create false low readings",
      compensation: "Clean termination points and cable surfaces before testing"
    }
  ];

  const installationSpecifics = [
    {
      type: "Domestic Installations",
      considerations: [
        "Test individual circuits separately where possible",
        "Pay attention to RCD-protected circuits - may need special handling",
        "Document any loads that cannot be disconnected",
        "Consider impact of smart devices and electronic equipment"
      ]
    },
    {
      type: "Commercial Installations",
      considerations: [
        "Coordinate with building management for access and isolation",
        "Consider impact on business operations during testing",
        "Document complex sub-distribution arrangements",
        "Account for emergency lighting and fire alarm circuits"
      ]
    },
    {
      type: "Industrial Installations",
      considerations: [
        "Follow permit-to-work procedures strictly",
        "Consider impact of motor circuits and large equipment",
        "Account for process control systems that cannot be isolated",
        "Document any explosion-proof or hazardous area requirements"
      ]
    }
  ];

  const troubleshootingGuide = [
    {
      problem: "Readings fluctuating widely",
      causes: ["Poor probe contact", "Contaminated surfaces", "Parallel paths through equipment"],
      solutions: ["Clean contact points", "Ensure firm probe connection", "Disconnect more equipment", "Check for alternative earth paths"]
    },
    {
      problem: "Unexpectedly high readings (>999 MΩ)",
      causes: ["Open circuit", "Disconnected neutral", "Meter range selection"],
      solutions: ["Verify circuit continuity first", "Check all connections", "Confirm correct meter range", "Test with known good circuit"]
    },
    {
      problem: "Readings improving during test",
      causes: ["Capacitive charging", "Moisture evaporation", "Contact cleaning effect"],
      solutions: ["Allow longer stabilisation time", "Repeat test after interval", "Clean terminations thoroughly"]
    },
    {
      problem: "Different readings on similar circuits",
      causes: ["Age differences", "Installation methods", "Environmental exposure", "Load differences"],
      solutions: ["Investigate installation history", "Check environmental conditions", "Look for moisture ingress", "Document differences"]
    }
  ];

  const documentationRequirements = [
    "Circuit identification and description",
    "Test voltage used and reason for selection",
    "Actual measured values (not just pass/fail)",
    "Temperature and environmental conditions",
    "Any limitations or deviations from standard procedure",
    "Equipment used (model, calibration date)",
    "Date, time, and duration of test",
    "Name and signature of competent person"
  ];

  const safetyReminders = [
    "Always prove dead before testing - IR testing uses high voltage",
    "Ensure all personnel are clear of the circuit during testing",
    "Use appropriate PPE including insulated gloves when handling test leads",
    "Never touch probe tips during testing - they carry high voltage",
    "Be aware that some IR testers can deliver a significant shock",
    "Ensure test leads are in good condition with no damaged insulation",
    "Always discharge circuits after testing before reconnection"
  ];

  return (
    <div className="space-y-6">
      {/* Test Equipment Setup */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Test Equipment Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {setupSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-200 font-medium mb-3">Test Voltage Selection</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#2a2a2a] p-3 rounded">
                <p className="text-foreground font-medium mb-1">Circuits ≤ 500V</p>
                <p className="text-elec-yellow text-lg font-semibold">500V DC</p>
                <p className="text-foreground text-sm">Standard for domestic/commercial</p>
              </div>
              <div className="bg-[#2a2a2a] p-3 rounded">
                <p className="text-foreground font-medium mb-1">Extra-Low Voltage</p>
                <p className="text-elec-yellow text-lg font-semibold">250V DC</p>
                <p className="text-foreground text-sm">SELV/PELV circuits</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Between These Points */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Test Between These Points (Standard Practice)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            All three combinations must be tested unless conductors are joined for a global test.
          </p>
          <div className="space-y-4">
            {testCombinations.map((test, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <h4 className="text-foreground font-medium mb-2">{test.test}</h4>
                <p className="text-foreground text-sm mb-2"><strong>Purpose:</strong> {test.purpose}</p>
                <p className="text-blue-300 text-sm"><strong>Procedure:</strong> {test.procedure}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IR Testing on Final Circuits */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileCheck className="h-5 w-5 text-elec-yellow" />
            IR Testing on Final Circuits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {finalCircuitProcedure.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-200 font-medium mb-2">Important</h4>
                <p className="text-foreground text-sm leading-relaxed">
                  Maintain probe contact for several seconds to allow the reading to stabilise. 
                  Capacitive effects in cables can cause initial high readings that settle to the true value.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Testing Techniques */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Advanced Testing Techniques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Beyond basic IR testing, these advanced techniques can help diagnose complex problems and provide more detailed analysis.
          </p>
          <div className="space-y-4">
            {advancedTechniques.map((technique, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-blue-500/50">
                <h4 className="text-foreground font-medium mb-2">{technique.title}</h4>
                <p className="text-foreground text-sm mb-2">{technique.description}</p>
                <p className="text-blue-300 text-sm"><strong>When to use:</strong> {technique.when}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Considerations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Environmental Factors Affecting Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Environmental conditions significantly impact IR test results. Understanding these factors helps interpret readings correctly.
          </p>
          <div className="space-y-4">
            {environmentalFactors.map((factor, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-2">{factor.factor}</h4>
                <p className="text-foreground text-sm mb-2"><strong>Impact:</strong> {factor.impact}</p>
                <p className="text-green-300 text-sm"><strong>Compensation:</strong> {factor.compensation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Installation-Specific Considerations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5 text-elec-yellow" />
            Installation-Specific Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Different installation types require specific approaches and considerations during IR testing.
          </p>
          <div className="space-y-6">
            {installationSpecifics.map((installation, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-3">{installation.type}</h4>
                <ul className="space-y-2">
                  {installation.considerations.map((consideration, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-sm">{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recording and Interpreting Readings */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Eye className="h-5 w-5 text-elec-yellow" />
            Recording and Interpreting Readings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interpretationCriteria.map((item, index) => (
                <div key={index} className={`p-4 rounded border-l-4 ${
                  item.color === 'green' ? 'bg-green-600/10 border-green-500/50' : 'bg-red-600/10 border-red-500/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">{item.result}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.color === 'green' ? 'bg-green-600/20 text-green-200' : 'bg-red-600/20 text-red-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-foreground text-sm">{item.action}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-200 font-medium mb-3">Healthy Circuit Indicators</h4>
            <p className="text-foreground text-sm leading-relaxed">
              Higher values (e.g. 200+ MΩ) are common in healthy circuits. New installations often show 
              readings well above the minimum requirement, indicating excellent insulation integrity.
            </p>
          </div>

          <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
            <h4 className="text-orange-200 font-medium mb-3">If Readings Fall Below Threshold</h4>
            <div className="space-y-2">
              {investigationSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting Common Problems */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Troubleshooting Common Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Understanding common IR testing problems and their solutions helps ensure accurate results and efficient testing.
          </p>
          <div className="space-y-4">
            {troubleshootingGuide.map((item, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-red-300 font-medium mb-2">{item.problem}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-foreground text-sm font-medium mb-2">Possible Causes:</h5>
                    <ul className="space-y-1">
                      {item.causes.map((cause, idx) => (
                        <li key={idx} className="text-foreground text-sm">• {cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-foreground text-sm font-medium mb-2">Solutions:</h5>
                    <ul className="space-y-1">
                      {item.solutions.map((solution, idx) => (
                        <li key={idx} className="text-green-300 text-sm">• {solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Requirements */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileCheck className="h-5 w-5 text-elec-yellow" />
            Documentation Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Proper documentation is essential for compliance and future reference. Record all relevant information systematically.
          </p>
          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-3">Essential Information to Record:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {documentationRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-200 font-medium mb-3">Additional Best Practices</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• Include photographs of problem areas or unique configurations</li>
              <li>• Record any unusual environmental conditions during testing</li>
              <li>• Note any equipment that required special handling or couldn't be disconnected</li>
              <li>• Document recommendations for future testing or maintenance</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Special Circumstances */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Table className="h-5 w-5 text-elec-yellow" />
            What If Loads Can't Be Disconnected?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-200 font-medium mb-3">Alternative Testing Method</h4>
            <p className="text-foreground text-sm leading-relaxed mb-3">
              If there are sensitive devices (e.g. dimmers, smart gear, LED drivers), use the L+N to Earth test only.
            </p>
            <div className="bg-[#2a2a2a] p-3 rounded">
              <p className="text-foreground font-medium mb-2">Procedure:</p>
              <ol className="space-y-1 text-foreground text-sm">
                <li>1. Link Line and Neutral conductors together</li>
                <li>2. Test between L+N (linked) and Earth</li>
                <li>3. Record the result</li>
                <li>4. Document this limitation in your report</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-200 font-medium mb-2">Documentation Requirements</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Note this as a limitation in your test results</li>
                  <li>• Explain the reason in your report</li>
                  <li>• Always record the actual value obtained</li>
                  <li>• Document any deviations from standard procedure</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Reminders */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Critical Safety Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <p className="text-red-200 font-medium mb-3">IR Testing Safety is Critical</p>
            <div className="space-y-2">
              {safetyReminders.map((reminder, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{reminder}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ring Final Circuits */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Special Notes for Ring Final Circuits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">Testing Requirements</h4>
               <ul className="space-y-2 text-foreground text-sm">
                <li>• Test insulation resistance on each conductor loop</li>
                <li>• L–N, L–E, and N–E must all meet minimum IR values</li>
                <li>• Test with ring ends separated at the distribution board</li>
              </ul>
            </div>
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">Troubleshooting</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• If high readings drop during socket testing, check for connected loads</li>
                <li>• Look for damp conditions at socket outlets</li>
                <li>• Verify all connections are properly terminated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
