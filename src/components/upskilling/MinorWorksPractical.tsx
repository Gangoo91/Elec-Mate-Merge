import { Wrench, AlertTriangle, CheckCircle, Info, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MinorWorksPractical = () => {
  const practicalSteps = [
    {
      step: "1. Assess Work Scope",
      action: "Determine if work falls within minor works limitations",
      details: "Check against exclusions list, verify no design calculations needed, confirm existing installation adequacy"
    },
    {
      step: "2. Verify Existing Installation",
      action: "Inspect and test existing circuits to be modified",
      details: "Check circuit condition, verify protective device ratings, test RCD operation if applicable"
    },
    {
      step: "3. Complete Installation Work",
      action: "Perform installation following BS 7671 requirements",
      details: "Use appropriate materials, follow safe working practices, ensure proper terminations"
    },
    {
      step: "4. Perform Required Tests",
      action: "Carry out testing sequence for minor works",
      details: "Test continuity, insulation resistance, polarity, and functional operation"
    },
    {
      step: "5. Complete Certificate",
      action: "Fill in all sections of MEIWC accurately",
      details: "Record test results, circuit details, and work description completely"
    },
    {
      step: "6. Customer Handover",
      action: "Provide certificate and operation instructions",
      details: "Explain work completed, demonstrate operation, provide safety information"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Using MEIWC for work requiring design calculations",
      impact: "Invalid certification, potential safety issues",
      prevention: "Always assess if work affects installation characteristics significantly"
    },
    {
      mistake: "Incomplete testing of modified circuits",
      impact: "Undetected faults, safety risks",
      prevention: "Follow complete testing sequence, don't skip tests because work seems minor"
    },
    {
      mistake: "Poor documentation of circuit details",
      impact: "Future maintenance problems, compliance issues",
      prevention: "Complete all sections thoroughly, include all relevant technical data"
    },
    {
      mistake: "Not verifying competency for all aspects",
      impact: "Professional liability, safety concerns",
      prevention: "Ensure competency in both installation and testing before undertaking work"
    },
    {
      mistake: "Exceeding scope during work progression",
      impact: "Invalid certification, additional work requirements",
      prevention: "Stop work if scope exceeds minor works, complete proper EIC instead"
    },
    {
      mistake: "Inadequate customer communication",
      impact: "Misunderstandings, liability issues",
      prevention: "Clearly explain work scope, limitations, and ongoing responsibilities"
    }
  ];

  const practicalConsiderations = [
    {
      title: "Circuit Capacity Assessment",
      considerations: [
        "Check existing cable rating against new load requirements",
        "Verify protective device coordination with additional load",
        "Consider voltage drop impact of circuit extensions",
        "Assess mechanical protection for new cable routes"
      ]
    },
    {
      title: "RCD Protection Requirements",
      considerations: [
        "Determine if new work requires RCD protection",
        "Test existing RCD operation before connecting new circuits",
        "Verify RCD discrimination in complex installations",
        "Check for nuisance tripping potential with additional load"
      ]
    },
    {
      title: "Building Regulations Compliance",
      considerations: [
        "Determine if work requires Building Control notification",
        "Check if installer is registered with competent person scheme",
        "Verify special location requirements don't apply",
        "Consider structural implications of new cable routes"
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
          <h3 className="text-xl font-semibold text-foreground">Step-by-Step MEIWC Process</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Following a systematic approach ensures all aspects of minor works are properly addressed. 
              Each step builds upon the previous to create a comprehensive and compliant installation process.
            </p>
            <div className="space-y-4">
              {practicalSteps.map((item, index) => (
                <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-1">{item.step}</h4>
                      <p className="text-foreground text-sm font-medium mb-2">{item.action}</p>
                      <p className="text-foreground text-sm">{item.details}</p>
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
              Learning from common mistakes helps prevent compliance issues and safety problems. 
              These examples show typical errors and how to avoid them in minor works projects.
            </p>
            <div className="space-y-4">
              {commonMistakes.map((item, index) => (
                <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-red-300 font-medium mb-1">{item.mistake}</h4>
                      <p className="text-foreground text-sm mb-2"><strong>Impact:</strong> {item.impact}</p>
                      <p className="text-foreground text-sm"><strong>Prevention:</strong> {item.prevention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Practical Considerations</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Beyond basic compliance, these practical considerations help ensure successful minor works 
              completion and long-term installation performance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {practicalConsiderations.map((section, index) => (
                <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-elec-yellow" />
                    {section.title}
                  </h4>
                  <ul className="text-foreground text-sm space-y-2">
                    {section.considerations.map((consideration, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Quality Assurance Checklist</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4">
              <Clock className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="text-foreground font-medium mb-3">Pre-Completion Verification</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-foreground font-medium mb-3">Installation Quality</h5>
                  <ul className="text-foreground text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>All connections properly terminated and secure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Cable routing and support meets standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Appropriate materials used throughout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Protection and enclosure ratings correct</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Labelling and identification complete</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-3">Testing and Documentation</h5>
                  <ul className="text-foreground text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>All required tests completed successfully</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Test results within acceptable limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Certificate completely and accurately filled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Supporting documentation prepared</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Customer handover materials ready</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Professional Development</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4">
              <Shield className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="text-foreground font-medium mb-3">Maintaining Competency</h4>
              <p className="text-foreground text-sm mb-4">
                Minor works certification requires ongoing professional development to maintain competency 
                and stay current with regulation changes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-foreground font-medium mb-2">Technical Knowledge</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Regular BS 7671 updates and amendments</li>
                    <li>• Building Regulations Part P changes</li>
                    <li>• New product and technology awareness</li>
                    <li>• Testing equipment calibration and use</li>
                    <li>• Health and safety regulation updates</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-2">Practical Skills</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Installation technique improvements</li>
                    <li>• Testing and inspection skill development</li>
                    <li>• Fault diagnosis and problem solving</li>
                    <li>• Customer communication skills</li>
                    <li>• Quality management practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default MinorWorksPractical;