import { Wrench, CheckCircle, AlertTriangle, Search, Zap, Settings, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RCDTroubleshootingPractical = () => {
  const diagnosticTools = [
    {
      tool: "Digital Multimeter",
      applications: ["Voltage measurement", "Resistance testing", "Continuity checks", "Current measurement"],
      tips: ["Use auto-ranging for efficiency", "Check calibration dates", "Verify test lead condition"]
    },
    {
      tool: "Insulation Resistance Tester",
      applications: ["Earth fault location", "Cable integrity", "Equipment condition", "Moisture detection"],
      tips: ["Allow temperature stabilisation", "Use appropriate test voltage", "Record environmental conditions"]
    },
    {
      tool: "RCD Tester",
      applications: ["Performance verification", "Trip time measurement", "Sensitivity testing", "Ramp testing"],
      tips: ["Calibrate annually", "Use correct test angles", "Test from multiple locations"]
    },
    {
      tool: "Oscilloscope",
      applications: ["Transient capture", "Waveform analysis", "Timing measurement", "Noise investigation"],
      tips: ["Set appropriate trigger levels", "Use differential probes", "Capture pre-trigger data"]
    }
  ];

  const troubleshootingFlowchart = [
    {
      step: "Initial Assessment",
      questions: ["What are the exact symptoms?", "When did the problem start?", "What changed recently?"],
      actions: ["Document symptoms", "Check recent work", "Review maintenance logs"],
      nextStep: "visual"
    },
    {
      step: "Visual Inspection",
      questions: ["Any obvious damage?", "Correct connections?", "Environmental issues?"],
      actions: ["Photograph findings", "Check terminals", "Assess conditions"],
      nextStep: "electrical"
    },
    {
      step: "Electrical Testing",
      questions: ["RCD function correct?", "Circuit integrity good?", "Load conditions normal?"],
      actions: ["Test RCD operation", "Check insulation", "Measure loads"],
      nextStep: "analysis"
    }
  ];

  const commonScenarios = [
    {
      scenario: "New Installation Trips Immediately",
      investigation: [
        "Check cable routing for damage",
        "Verify neutral-earth separation",
        "Test each circuit individually",
        "Check for moisture ingress"
      ],
      solutions: [
        "Repair damaged cables",
        "Correct neutral connections",
        "Improve weatherproofing",
        "Replace faulty components"
      ]
    },
    {
      scenario: "Intermittent Tripping in Wet Weather",
      investigation: [
        "Check outdoor connections",
        "Test insulation when wet",
        "Inspect cable entry points",
        "Monitor during rain"
      ],
      solutions: [
        "Improve IP ratings",
        "Seal cable entries",
        "Relocate vulnerable connections",
        "Install drainage"
      ]
    },
    {
      scenario: "Tripping When Large Load Starts",
      investigation: [
        "Measure starting currents",
        "Check motor conditions",
        "Analyse switching transients",
        "Review load diversity"
      ],
      solutions: [
        "Install soft starters",
        "Use time-delayed RCDs",
        "Improve earthing",
        "Add surge suppressors"
      ]
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Diagnostic Tools and Equipment */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Essential Diagnostic Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diagnosticTools.map((item, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                  {item.tool}
                </h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-foreground font-medium text-sm mb-1">Applications:</h5>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      {item.applications.map((app, appIndex) => (
                        <li key={appIndex}>• {app}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-foreground font-medium text-sm mb-1">Best Practices:</h5>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      {item.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Systematic Troubleshooting Process */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Systematic Troubleshooting Process</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            {troubleshootingFlowchart.map((phase, index) => (
              <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  {phase.step}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Key Questions:</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      {phase.questions.map((question, qIndex) => (
                        <li key={qIndex}>• {question}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Actions to Take:</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      {phase.actions.map((action, aIndex) => (
                        <li key={aIndex}>• {action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Troubleshooting Scenarios */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Real-World Troubleshooting Scenarios</h3>
          <div className="space-y-4">
            {commonScenarios.map((item, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <Search className="h-5 w-5 text-elec-yellow" />
                  {item.scenario}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded p-3">
                    <h5 className="text-orange-200 font-medium mb-2">Investigation Steps:</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      {item.investigation.map((step, stepIndex) => (
                        <li key={stepIndex}>• {step}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                    <h5 className="text-green-200 font-medium mb-2">Typical Solutions:</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      {item.solutions.map((solution, solIndex) => (
                        <li key={solIndex}>• {solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Diagnostic Techniques */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Advanced Diagnostic Techniques</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-600/10 border border-purple-600/20 rounded p-4">
                <h4 className="text-purple-200 font-medium mb-2">Transient Analysis</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Use storage oscilloscopes</li>
                  <li>• Set long capture times</li>
                  <li>• Monitor during switching events</li>
                  <li>• Analyse frequency content</li>
                </ul>
              </div>
              <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
                <h4 className="text-red-200 font-medium mb-2">Load Profiling</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Monitor current patterns</li>
                  <li>• Identify load switching</li>
                  <li>• Check harmonic content</li>
                  <li>• Assess neutral currents</li>
                </ul>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Environmental Monitoring</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Temperature logging</li>
                  <li>• Humidity measurement</li>
                  <li>• Vibration analysis</li>
                  <li>• EMI assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Best Practices */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Documentation Best Practices</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">During Investigation</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Photograph all findings</li>
                  <li>• Record test readings</li>
                  <li>• Note environmental conditions</li>
                  <li>• Document timeline of events</li>
                  <li>• Preserve failed components</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Final Report</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Clear problem description</li>
                  <li>• Root cause analysis</li>
                  <li>• Actions taken</li>
                  <li>• Preventive recommendations</li>
                  <li>• Follow-up requirements</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3 mt-3">
              <p className="text-foreground text-sm sm:text-base">
                <strong>Important:</strong> Good documentation protects against liability, supports warranty claims, 
                and helps prevent similar problems in the future.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Safety During Troubleshooting</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <h4 className="text-red-200 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Critical Safety Points
              </h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Assume RCD protection is compromised</li>
                <li>• Use additional safety measures</li>
                <li>• Isolate circuits before detailed work</li>
                <li>• Verify isolation with approved testers</li>
                <li>• Use appropriate PPE throughout</li>
                <li>• Have emergency procedures ready</li>
              </ul>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <h4 className="text-green-200 font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Good Practices
              </h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Work with a colleague when possible</li>
                <li>• Inform building occupants of work</li>
                <li>• Use barrier tape and warning signs</li>
                <li>• Keep emergency contact numbers handy</li>
                <li>• Test portable equipment before use</li>
                <li>• Review risk assessments regularly</li>
              </ul>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default RCDTroubleshootingPractical;