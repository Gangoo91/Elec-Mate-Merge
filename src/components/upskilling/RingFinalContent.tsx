
import { BookOpen, AlertTriangle, CheckCircle, Zap, Settings, Cable, Target, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RingFinalContent = () => {
  const whyRingMatters = [
    { issue: "Overloaded conductors", description: "If one leg breaks, full load flows through remaining conductor" },
    { issue: "No earth protection at some outlets", description: "CPC break leaves sockets without proper earthing" },
    { issue: "Unsafe disconnection during a fault", description: "Protective devices may not operate correctly" }
  ];

  const testStages = [
    {
      stage: 1,
      title: "Test Each Conductor Individually",
      steps: [
        "Disconnect both ends at the DB",
        "Test end-to-end resistance of line, neutral, and CPC loops",
        "Compare results—resistance should be low and values for L and N should match",
        "CPC may show slightly higher resistance due to smaller cross-section (if using 2.5mm²/1.5mm²)"
      ]
    },
    {
      stage: 2,
      title: "Cross-Connect L1–N2 and L2–N1",
      steps: [
        "Connect line conductor from one end to neutral from the other",
        "At each socket, measure resistance between line and neutral",
        "Readings should be similar at all sockets if wiring is correct",
        "This is known as the r1 + r2 method"
      ]
    },
    {
      stage: 3,
      title: "Repeat for L–CPC",
      steps: [
        "Repeat the same cross-connection with the CPC",
        "Resistance at each point should again be consistent",
        "Uneven readings could indicate swapped conductors, loose connections, or broken CPC"
      ]
    }
  ];

  const expectedReadings = [
    { test: "Continuity (end-to-end)", reading: "Very low resistance (typically under 1 ohm)" },
    { test: "Cross-connected socket readings", reading: "Similar values at each point, forming a slight curve from middle sockets to outer ones" },
    { test: "Fault indication", reading: "Drastically different readings or no continuity = fault that must be fixed" }
  ];

  const commonIssues = [
    "Incomplete or broken rings",
    "Interconnected rings", 
    "Shared neutrals",
    "CPC not connected at one end",
    "Incorrect connections causing parallel paths"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Why Ring Circuit Continuity Matters */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Why Ring Circuit Continuity Matters</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed">
              In a ring final circuit, current flows in both directions. A break in either leg (line, neutral, or CPC) can lead to:
            </p>
            <div className="space-y-3">
              {whyRingMatters.map((item, index) => (
                <div key={index} className="bg-red-600/10 border border-red-600/20 rounded p-3">
                  <h4 className="text-red-200 font-medium mb-1">{item.issue}</h4>
                  <p className="text-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3 mt-4">
              <p className="text-foreground text-sm">
                <strong>That's why continuity testing is essential</strong> to confirm each conductor forms a complete loop.
              </p>
            </div>
          </div>
        </div>

        {/* The 3-Part Ring Continuity Test */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">The 3-Part Ring Continuity Test</h3>
          <div className="space-y-4">
            {testStages.map((stage, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {stage.stage}
                  </span>
                  <h4 className="text-foreground font-semibold text-lg">{stage.title}</h4>
                </div>
                <div className="space-y-2 ml-11">
                  {stage.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Readings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Expected Readings</h3>
          <div className="space-y-3">
            {expectedReadings.map((reading, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <h4 className="text-foreground font-medium mb-2">{reading.test}</h4>
                <p className="text-foreground text-sm">{reading.reading}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Test Procedure */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Detailed Test Procedure</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
              <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Before You Start
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Isolate the circuit at the consumer unit</li>
                <li>• Remove all socket outlets from the ring</li>
                <li>• Identify the outgoing and return conductors</li>
                <li>• Ensure test equipment is zeroed and calibrated</li>
              </ul>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
              <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Test Method Details
              </h4>
              <div className="space-y-3">
                <div className="bg-[#404040] rounded p-3">
                  <h5 className="text-foreground font-medium mb-2">Stage 1: End-to-End Testing</h5>
                  <p className="text-foreground text-sm">
                    Test resistance between L1-L2, N1-N2, and E1-E2. Line and neutral should give similar readings.
                    Earth may be slightly higher if reduced CPC is used.
                  </p>
                </div>
                <div className="bg-[#404040] rounded p-3">
                  <h5 className="text-foreground font-medium mb-2">Stage 2: Cross-Connection L-N</h5>
                  <p className="text-foreground text-sm">
                    Join L1 to N2 and L2 to N1. Test at each socket outlet. Readings should be consistent, 
                    showing the combined resistance of line and neutral conductors.
                  </p>
                </div>
                <div className="bg-[#404040] rounded p-3">
                  <h5 className="text-foreground font-medium mb-2">Stage 3: Cross-Connection L-E</h5>
                  <p className="text-foreground text-sm">
                    Join L1 to E2 and L2 to E1. Test at each socket outlet. This gives the (R1+R2) value 
                    used for Zs calculations.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Common Issues Identified by Ring Testing */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Issues Identified by Ring Testing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonIssues.map((issue, index) => (
              <div key={index} className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm">{issue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* R1 + R2 Method Explained */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">The R1 + R2 Method Explained</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed">
              The R1 + R2 method provides the combined resistance of the line and CPC conductors, 
              which is essential for calculating earth fault loop impedance (Zs).
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <h4 className="text-yellow-200 font-medium mb-2">Why It Matters</h4>
              <p className="text-foreground text-sm">
                This value helps determine if protective devices will operate within required time limits 
                during an earth fault condition, ensuring safety.
              </p>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <h4 className="text-blue-200 font-medium mb-2">What to Look For</h4>
              <p className="text-foreground text-sm">
                Readings should be consistent across all outlets. Significant variations indicate wiring faults 
                that must be investigated and corrected.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
