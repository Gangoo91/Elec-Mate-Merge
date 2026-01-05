import { Wrench, AlertTriangle, CheckCircle, Info, Clock, Search, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ObservationCodesPractical = () => {
  const practicalScenarios = [
    {
      scenario: "Damaged socket outlet with exposed live terminal",
      assessment: "Immediate danger - live parts accessible to touch",
      code: "C1",
      reasoning: "Direct risk of electric shock exists",
      action: "Isolate circuit immediately, make safe before continuing inspection",
      documentation: "Location, exact nature of damage, action taken to make safe"
    },
    {
      scenario: "Main earthing conductor disconnected in consumer unit",
      assessment: "Installation lacks essential safety measure",
      code: "C1", 
      reasoning: "No protective earthing for entire installation",
      action: "Reconnect if safe to do so, otherwise isolate installation",
      documentation: "Condition found, safety implications, remedial action required"
    },
    {
      scenario: "RCD not operating within required time limits",
      assessment: "Safety device not providing adequate protection",
      code: "C2",
      reasoning: "Automatic disconnection may not occur in fault conditions",
      action: "Investigation required, RCD replacement likely needed",
      documentation: "Test results, comparison with requirements, urgency explanation"
    },
    {
      scenario: "Circuit overloaded with 40A load on 32A MCB/25mm² cable",
      assessment: "Circuit operating beyond safe capacity",
      code: "C2",
      reasoning: "Risk of cable overheating and potential fire",
      action: "Load redistribution or circuit upgrade required urgently",
      documentation: "Measured load, cable rating, protective device rating, risk assessment"
    },
    {
      scenario: "Socket outlets in bathroom without RCD protection (old installation)",
      assessment: "Enhanced protection missing in high-risk location",
      code: "C3",
      reasoning: "Installation predates current requirements but improvement beneficial",
      action: "RCD protection recommended for enhanced safety",
      documentation: "Current standards, improvement benefits, non-urgent recommendation"
    },
    {
      scenario: "Circuit not tested due to critical equipment operation",
      assessment: "Safety status unknown without testing",
      code: "FI",
      reasoning: "Cannot determine compliance without appropriate testing",
      action: "Arrange testing during planned shutdown or use alternative methods",
      documentation: "Limitation reason, investigation required, alternative arrangements"
    }
  ];

  const documentationStandards = [
    {
      aspect: "Location Specification",
      requirement: "Precise location enabling easy identification",
      examples: [
        "Kitchen socket outlet adjacent to sink (circuit RFC1)",
        "First floor landing light switch",
        "Consumer unit position 3 - main switch"
      ],
      avoid: ["Socket upstairs", "Light switch", "In consumer unit"]
    },
    {
      aspect: "Technical Description",
      requirement: "Clear description of defect or non-compliance",
      examples: [
        "Live conductor exposed due to damaged cable sheath",
        "RCD test time 65ms at 30mA (requirement ≤300ms) and 45ms at 150mA (requirement ≤40ms)",
        "No main protective bonding to gas installation"
      ],
      avoid: ["Dangerous", "Not working properly", "Needs fixing"]
    },
    {
      aspect: "Risk Assessment",
      requirement: "Explanation of safety implications",
      examples: [
        "Risk of electric shock due to accessible live parts",
        "Automatic disconnection may not occur within required time",
        "Potential for dangerous touch voltages in fault conditions"
      ],
      avoid: ["Dangerous", "Safety risk", "Could be problem"]
    },
    {
      aspect: "Remedial Action",
      requirement: "Specific action required to address observation",
      examples: [
        "Replace damaged cable section maintaining existing route",
        "Install main protective bonding conductor to gas meter (10mm² minimum)",
        "Replace RCD with Type A device rated 30mA"
      ],
      avoid: ["Fix", "Repair", "Make safe"]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Confusing C1 and C2 classifications",
      explanation: "Difficulty distinguishing immediate vs urgent danger",
      solution: "Use 'touch test' - if danger exists through normal contact, it's C1",
      prevention: "Apply systematic decision tree for every observation"
    },
    {
      mistake: "Overusing C3 codes for old but safe installations",
      explanation: "Applying current standards retrospectively without benefit",
      solution: "Consider whether improvement genuinely enhances safety",
      prevention: "Understand grandfather rights and proportionate improvement"
    },
    {
      mistake: "Using FI to avoid difficult decisions",
      explanation: "Inappropriate use when sufficient information available",
      solution: "Use FI only when genuine investigation required",
      prevention: "Develop confidence in professional judgment through experience"
    },
    {
      mistake: "Inadequate documentation of observations",
      explanation: "Vague descriptions that don't enable effective action",
      solution: "Use structured approach: location, defect, risk, action",
      prevention: "Develop standard documentation templates and procedures"
    },
    {
      mistake: "Inconsistent application across similar defects",
      explanation: "Same type of defect receiving different codes",
      solution: "Develop and use decision-making criteria consistently",
      prevention: "Regular peer review and calibration exercises"
    },
    {
      mistake: "Failing to consider operational context",
      explanation: "Not accounting for specific installation usage and environment",
      solution: "Consider installation type, users, and operational requirements",
      prevention: "Include context assessment in inspection planning"
    }
  ];

  const qualityAssurance = [
    {
      stage: "Pre-Inspection Planning",
      activities: [
        "Review previous inspection reports and recommendations",
        "Understand installation type, usage, and user requirements",
        "Plan inspection approach and potential limitations",
        "Ensure current knowledge of standards and code applications"
      ]
    },
    {
      stage: "During Inspection",
      activities: [
        "Apply systematic decision-making process for each observation",
        "Document observations immediately with full details",
        "Cross-reference observations with test results where applicable",
        "Consider cumulative effect of multiple observations"
      ]
    },
    {
      stage: "Post-Inspection Review",
      activities: [
        "Review all observations for consistency and appropriateness",
        "Verify documentation completeness and clarity",
        "Consider client communication requirements for each code",
        "Plan follow-up and verification procedures"
      ]
    },
    {
      stage: "Continuous Improvement",
      activities: [
        "Seek feedback from clients and subsequent contractors",
        "Participate in peer review and calibration exercises",
        "Update knowledge through continuing professional development",
        "Maintain records of decision-making for future reference"
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
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Real-World Code Application Scenarios</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              These practical scenarios demonstrate systematic code application using real inspection situations. 
              Each example shows the decision-making process from observation through to appropriate code selection.
            </p>
            <div className="space-y-4">
              {practicalScenarios.map((scenario, index) => (
                <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      scenario.code === 'C1' ? 'bg-red-500 text-foreground' :
                      scenario.code === 'C2' ? 'bg-orange-500 text-foreground' :
                      scenario.code === 'C3' ? 'bg-yellow-500 text-black' :
                      'bg-blue-500 text-foreground'
                    }`}>
                      {scenario.code}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">{scenario.scenario}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <p><strong className="text-foreground">Assessment:</strong> <span className="text-foreground">{scenario.assessment}</span></p>
                          <p><strong className="text-foreground">Reasoning:</strong> <span className="text-foreground">{scenario.reasoning}</span></p>
                        </div>
                        <div className="space-y-2">
                          <p><strong className="text-foreground">Action:</strong> <span className="text-foreground">{scenario.action}</span></p>
                          <p><strong className="text-foreground">Documentation:</strong> <span className="text-foreground">{scenario.documentation}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Professional Documentation Standards</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Effective documentation supports code classification decisions and enables appropriate remedial action. 
              These standards ensure observations are clear, actionable, and professionally presented.
            </p>
            <div className="space-y-4">
              {documentationStandards.map((standard, index) => (
                <div key={index} className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {standard.aspect}
                  </h4>
                  <p className="text-foreground text-sm mb-3">{standard.requirement}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-green-300 font-medium text-sm mb-2">Good Examples:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        {standard.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-red-300 font-medium text-sm mb-2">Avoid:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        {standard.avoid.map((avoid, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{avoid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Mistakes and Prevention</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Learning from common mistakes helps prevent inconsistent code application and improves 
              professional standards. These examples show typical errors and practical prevention strategies.
            </p>
            <div className="space-y-4">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-red-300 font-medium mb-2">{mistake.mistake}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-3 text-sm">
                        <div>
                          <p className="text-foreground mb-2"><strong>Problem:</strong> {mistake.explanation}</p>
                          <p className="text-foreground mb-2"><strong>Solution:</strong> {mistake.solution}</p>
                          <p className="text-foreground"><strong>Prevention:</strong> {mistake.prevention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Quality Assurance Framework</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Systematic quality assurance ensures consistent code application and continuous improvement 
              in observation quality. This framework supports professional development and client confidence.
            </p>
            <div className="space-y-4">
              {qualityAssurance.map((stage, index) => (
                <div key={index} className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {stage.stage}
                  </h4>
                  <ul className="text-foreground text-sm space-y-2">
                    {stage.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Clock className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Decision Support Tools</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="bg-cyan-600/10 border border-cyan-600/20 rounded p-4">
              <Info className="h-6 w-6 text-cyan-400 mb-3" />
              <h4 className="text-cyan-200 font-medium mb-3">Code Selection Flowchart</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <span className="text-cyan-300 font-bold">1.</span>
                  <span className="text-foreground">Identify the defect or non-compliance clearly</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <span className="text-cyan-300 font-bold">2.</span>
                  <span className="text-foreground">Assess immediate danger (accessible live parts, missing earth) → C1</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <span className="text-cyan-300 font-bold">3.</span>
                  <span className="text-foreground">Evaluate potential danger in normal use (inadequate protection) → C2</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <span className="text-cyan-300 font-bold">4.</span>
                  <span className="text-foreground">Consider safety improvement opportunities → C3</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <span className="text-cyan-300 font-bold">5.</span>
                  <span className="text-foreground">Determine if investigation needed for classification → FI</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <span className="text-cyan-300 font-bold">6.</span>
                  <span className="text-foreground">Document decision rationale and supporting evidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default ObservationCodesPractical;