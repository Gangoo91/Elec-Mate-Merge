import { Book, CheckCircle, Search, AlertTriangle, Shield, Info, Target, Zap, FileText, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RCDTroubleshootingContent = () => {
  const learningObjectives = [
    "Master systematic troubleshooting methodologies for RCD problems",
    "Identify and resolve common RCD failure modes and symptoms",
    "Use advanced diagnostic techniques and test equipment",
    "Understand interference and compatibility issues",
    "Implement proper documentation and reporting procedures",
    "Apply preventive measures to reduce future problems"
  ];

  const troubleshootingSteps = [
    { step: 1, action: "Gather initial information and symptoms" },
    { step: 2, action: "Perform visual inspection and safety checks" },
    { step: 3, action: "Conduct systematic electrical testing" },
    { step: 4, action: "Analyse results and identify root cause" },
    { step: 5, action: "Implement corrective action" },
    { step: 6, action: "Verify repair and document solution" }
  ];

  const commonProblems = [
    {
      symptom: "RCD trips immediately when reset",
      causes: ["Earth fault on protected circuit", "Insulation breakdown", "Water ingress", "Damaged cable"],
      diagnostics: ["Insulation resistance testing", "Circuit isolation testing", "Visual inspection", "Thermal imaging"],
      color: "red"
    },
    {
      symptom: "RCD won't trip during testing",
      causes: ["Internal RCD failure", "Incorrect wiring", "Test equipment failure", "Wrong RCD type"],
      diagnostics: ["Alternative test equipment", "Manual test button", "Wiring verification", "RCD replacement"],
      color: "orange"
    },
    {
      symptom: "Intermittent nuisance tripping",
      causes: ["Load switching transients", "Environmental factors", "Aging components", "EMI interference"],
      diagnostics: ["Load analysis", "Environmental monitoring", "Oscilloscope analysis", "Filter installation"],
      color: "yellow"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Book className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* What is RCD Troubleshooting */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Advanced RCD Troubleshooting</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              RCD troubleshooting requires systematic analysis of symptoms, comprehensive testing procedures, and 
              understanding of both electrical and environmental factors that can affect performance. Effective troubleshooting 
              minimises downtime and ensures reliable protection.
            </p>
            <div className="flex items-start gap-3 bg-green-600/10 border border-green-600/20 rounded p-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base">
                <strong>Remember:</strong> Safety must always be the priority during troubleshooting. Isolate circuits 
                and use appropriate test equipment to prevent accidents.
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting Methodology */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Systematic Troubleshooting Methodology</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {troubleshootingSteps.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded bg-gray-600/10 border border-gray-600/20">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-foreground">{item.action}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-sm sm:text-base">
                <strong>Purpose:</strong> To identify root causes efficiently and implement lasting solutions rather than temporary fixes.
              </p>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-blue-600/50">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm sm:text-base">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Problems and Solutions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Problems and Diagnostic Approaches</h3>
          <div className="space-y-4">
            {commonProblems.map((problem, index) => (
              <div key={index} className={`bg-${problem.color}-600/10 border border-${problem.color}-600/20 rounded-lg p-4`}>
                <h4 className={`text-${problem.color}-200 font-medium mb-3 flex items-center gap-2`}>
                  <AlertTriangle className={`h-5 w-5 text-${problem.color}-400`} />
                  {problem.symptom}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Possible Causes:</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      {problem.causes.map((cause, causeIndex) => (
                        <li key={causeIndex}>• {cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Diagnostic Methods:</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      {problem.diagnostics.map((diagnostic, diagIndex) => (
                        <li key={diagIndex}>• {diagnostic}</li>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <Search className="h-6 w-6 text-purple-400 mb-3" />
              <h4 className="text-purple-200 font-medium mb-2">Oscilloscope Analysis</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Capture transient events</li>
                <li>• Analyse switching waveforms</li>
                <li>• Identify EMI sources</li>
                <li>• Measure rise times</li>
              </ul>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <Zap className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="text-blue-200 font-medium mb-2">Thermal Imaging</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Detect hot connections</li>
                <li>• Identify overloading</li>
                <li>• Find loose terminals</li>
                <li>• Monitor component temperature</li>
              </ul>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <Settings className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">Power Quality Analysis</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Harmonic distortion measurement</li>
                <li>• Voltage unbalance analysis</li>
                <li>• Transient monitoring</li>
                <li>• Load profiling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Documentation Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Documentation and Reporting</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Essential Documentation</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Problem description and symptoms</li>
                  <li>• Environmental conditions</li>
                  <li>• Test results and measurements</li>
                  <li>• Root cause analysis</li>
                  <li>• Corrective actions taken</li>
                  <li>• Preventive recommendations</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Report Recipients</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Client/building owner</li>
                  <li>• Facility management</li>
                  <li>• Insurance companies</li>
                  <li>• Regulatory authorities</li>
                  <li>• Equipment manufacturers</li>
                  <li>• Maintenance contractors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Important Troubleshooting Considerations</h3>
          <div className="space-y-3">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Safety Precautions</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Always isolate circuits before detailed investigation. Use appropriate PPE and follow 
                    lock-out/tag-out procedures. Consider RCD protection compromised until fault is resolved.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-orange-200 font-medium mb-2">System Interactions</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Consider interactions with other protective devices, load equipment, and environmental 
                    factors. Problems may be symptoms of wider system issues.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Evidence Preservation</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Preserve failed components and take photographs before replacement. This evidence 
                    may be important for warranty claims or incident investigations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default RCDTroubleshootingContent;