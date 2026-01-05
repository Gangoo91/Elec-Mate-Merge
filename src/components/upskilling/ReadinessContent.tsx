
import { BookOpen, CheckCircle, AlertTriangle, XCircle, Shield, Zap, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ReadinessContent = () => {
  const checklistItems = [
    {
      title: "Visual Inspection Completed",
      points: [
        "All observed defects addressed or recorded",
        "No signs of damage, overheating, or exposed live parts",
        "All circuits and DBs are labelled and accessible"
      ]
    },
    {
      title: "Documentation Reviewed",
      points: [
        "You understand the design and intended function",
        "Any limitations are agreed and recorded",
        "Protective devices and earthing systems are identified"
      ]
    },
    {
      title: "Safe Isolation Verified",
      points: [
        "Proved dead with a GS38-compliant tester",
        "Lock-off is in place and labelled",
        "No temporary supplies are active"
      ]
    },
    {
      title: "Circuit Condition Checked",
      points: [
        "No vulnerable equipment (e.g. dimmers, electronics) left connected",
        "Loads removed where required (especially for IR tests)",
        "Bonding and main earthing paths are present and visible"
      ]
    },
    {
      title: "Test Instruments Ready",
      points: [
        "Correct settings confirmed on tester",
        "Leads and probes inspected and safe",
        "Proving unit used to check function"
      ]
    }
  ];

  const safetyConsiderations = [
    "Confirm all personnel are aware of testing activities",
    "Ensure adequate lighting and access to work areas",
    "Check for presence of flammable materials or gases",
    "Verify emergency procedures are understood",
    "Confirm first aid facilities are available"
  ];

  const testPreparationSteps = [
    {
      step: "Environmental Assessment",
      description: "Check ambient conditions, temperature, and humidity that may affect test results"
    },
    {
      step: "Circuit Analysis",
      description: "Review circuit design to determine appropriate test methods and expected results"
    },
    {
      step: "Equipment Preparation",
      description: "Calibrate instruments, check battery levels, and prepare all necessary test leads"
    },
    {
      step: "Communication",
      description: "Inform relevant parties about testing schedule and any potential disruptions"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Testing with loads connected",
      consequence: "Inaccurate readings and potential equipment damage",
      prevention: "Always disconnect sensitive equipment before IR testing"
    },
    {
      mistake: "Inadequate isolation verification",
      consequence: "Risk of electric shock and false test results",
      prevention: "Use lock-off procedures and prove dead at multiple points"
    },
    {
      mistake: "Missing documentation review",
      consequence: "Testing inappropriate circuits or missing critical information",
      prevention: "Always review design information and installation certificates"
    },
    {
      mistake: "Rushing the readiness check",
      consequence: "Safety hazards and unreliable test results",
      prevention: "Follow systematic checklist approach every time"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-3">Why This Step Matters</h3>
          <div className="space-y-3">
            <p className="text-foreground leading-relaxed">
              Confirming readiness is the critical gateway between visual inspection and electrical testing. This stage determines whether it's safe and appropriate to proceed with applying test voltages to the installation.
            </p>
            <p className="text-foreground leading-relaxed">
              Failing to properly confirm readiness can result in personal injury, equipment damage, inaccurate test results, and potential legal liability. Under BS 7671, you have a duty of care to ensure all precautions are taken.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-4">Pre-Test Safety Considerations</h3>
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-red-400" />
              <h4 className="text-red-200 font-medium">Critical Safety Checks</h4>
            </div>
            <ul className="space-y-2">
              {safetyConsiderations.map((consideration, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {consideration}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-4">Systematic Readiness Checklist</h3>
          <div className="space-y-6">
            {checklistItems.map((item, index) => (
              <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                  <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {item.title}
                </h4>
                <ul className="space-y-2">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-4">Test Preparation Steps</h3>
          <div className="grid gap-4">
            {testPreparationSteps.map((item, index) => (
              <div key={index} className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-600/20 rounded-full p-2">
                    <Clock className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-green-200 font-medium mb-1">{item.step}</h4>
                    <p className="text-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-4">Common Mistakes to Avoid</h3>
          <div className="space-y-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-orange-200 font-medium">{item.mistake}</h4>
                      <p className="text-foreground text-sm mt-1">
                        <strong>Consequence:</strong> {item.consequence}
                      </p>
                      <p className="text-green-200 text-sm mt-1">
                        <strong>Prevention:</strong> {item.prevention}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-4">Special Considerations</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-blue-400" />
                <h4 className="text-blue-200 font-medium">Electronic Equipment</h4>
              </div>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Identify and disconnect sensitive devices</li>
                <li>• Check for LED drivers and control systems</li>
                <li>• Consider surge protection devices</li>
                <li>• Document any equipment left connected</li>
              </ul>
            </div>
            
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-purple-400" />
                <h4 className="text-purple-200 font-medium">Documentation</h4>
              </div>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Record all limitations and restrictions</li>
                <li>• Note any deviations from standard procedure</li>
                <li>• Document client agreements and permissions</li>
                <li>• Prepare test result forms in advance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <h4 className="text-red-200 font-medium mb-3 flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            If Anything's Missing - Stop and Address
          </h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h5 className="text-red-200 font-medium mb-2">Immediate Actions:</h5>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-foreground text-sm">
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  Do not proceed with testing
                </li>
                <li className="flex items-start gap-2 text-foreground text-sm">
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  Secure the work area
                </li>
                <li className="flex items-start gap-2 text-foreground text-sm">
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  Document the issue
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-red-200 font-medium mb-2">Communication:</h5>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-foreground text-sm">
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  Inform client or supervisor immediately
                </li>
                <li className="flex items-start gap-2 text-foreground text-sm">
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  Agree on remedial actions required
                </li>
                <li className="flex items-start gap-2 text-foreground text-sm">
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  Remember: You are legally responsible
                </li>
              </ul>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
