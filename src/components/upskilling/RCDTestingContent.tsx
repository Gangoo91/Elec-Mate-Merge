import { Book, CheckCircle, Zap, Settings, AlertTriangle, Shield, Info, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RCDTestingContent = () => {
  const learningObjectives = [
    "Understand RCD operating principles and protection methods",
    "Master RCD test equipment operation and calibration requirements",
    "Perform standardised test sequences according to BS 7671",
    "Interpret test results and identify acceptable parameters",
    "Recognise common RCD problems and failure modes",
    "Complete accurate documentation and certification records"
  ];

  const testSteps = [
    { step: 1, action: "Verify supply voltage and RCD rating" },
    { step: 2, action: "Test RCD trip button operation" },
    { step: 3, action: "Perform ½×IΔn test (should not trip)" },
    { step: 4, action: "Perform 1×IΔn test (should trip within time limit)" },
    { step: 5, action: "Perform 5×IΔn test (rapid trip required)" },
    { step: 6, action: "Record all results and reset RCD" }
  ];

  const equipmentTypes = [
    { 
      type: "RCD Tester", 
      requirements: ["Calibrated within 12 months", "Variable test current capability", "Time measurement function", "Test button simulation"],
      color: "blue"
    },
    { 
      type: "Support Equipment", 
      requirements: ["Voltage indicator", "Test leads and adaptors", "Documentation forms", "Safety equipment"],
      color: "green"
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
        
        {/* What is RCD Testing */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">What is RCD Testing?</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Residual Current Devices (RCDs) are life-saving protective devices that detect earth leakage currents 
              and automatically disconnect the supply. Regular testing ensures these devices operate correctly when needed.
            </p>
            <div className="flex items-start gap-3 bg-green-600/10 border border-green-600/20 rounded p-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base">
                <strong>Remember:</strong> RCDs provide additional protection against electric shock and can 
                prevent fires caused by earth faults.
              </p>
            </div>
          </div>
        </div>

        {/* Why RCD Testing Matters */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Why RCD Testing Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
              <h4 className="text-red-200 font-medium mb-2">Without Proper RCD Function</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Earth faults may not be detected</li>
                <li>• Risk of fatal electric shock</li>
                <li>• Fire risk from undetected faults</li>
                <li>• Non-compliance with regulations</li>
              </ul>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">With Properly Tested RCDs</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Rapid fault detection and disconnection</li>
                <li>• Enhanced protection against shock</li>
                <li>• Fire prevention capability</li>
                <li>• Regulatory compliance assured</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Regulatory Requirements (BS 7671)</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <h4 className="text-blue-200 font-medium mb-2">Section 643.10</h4>
              <p className="text-foreground text-sm sm:text-base">
                The effectiveness of all RCDs shall be verified by means of test instruments 
                which check that they function correctly.
              </p>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <h4 className="text-yellow-200 font-medium mb-2">Testing Frequency</h4>
              <p className="text-foreground text-sm sm:text-base">
                Initial verification, after alterations, during periodic inspections, 
                and as specified in maintenance schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm sm:text-base">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Equipment Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Test Equipment Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipmentTypes.map((equipment, index) => (
              <div key={index} className={`bg-${equipment.color}-600/10 border border-${equipment.color}-600/20 rounded-lg p-4`}>
                <Zap className={`h-6 w-6 text-${equipment.color}-400 mb-3`} />
                <h4 className={`text-${equipment.color}-200 font-medium mb-2`}>{equipment.type}</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  {equipment.requirements.map((req, reqIndex) => (
                    <li key={reqIndex}>• {req}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Standard Test Sequence */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Standard Test Sequence</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {testSteps.map((item, index) => (
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
                <strong>Purpose:</strong> To verify RCD operates within specified parameters for different fault current levels.
              </p>
            </div>
          </div>
        </div>

        {/* Test Current Values */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Standard Test Current Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <Settings className="h-6 w-6 text-yellow-400 mb-3" />
              <h4 className="text-yellow-200 font-medium mb-2">½×IΔn Test</h4>
              <p className="text-foreground text-sm sm:text-base">
                RCD should NOT trip at half rated current. Verifies no nuisance tripping.
              </p>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">1×IΔn Test</h4>
              <p className="text-foreground text-sm sm:text-base">
                RCD should trip within 300ms (40ms for S-type). Primary operating test.
              </p>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <Zap className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="text-blue-200 font-medium mb-2">5×IΔn Test</h4>
              <p className="text-foreground text-sm sm:text-base">
                RCD should trip within 40ms. Tests rapid disconnection capability.
                <br /><strong>Note:</strong> Only mandatory for socket outlets ≤20A providing additional protection.
              </p>
            </div>
          </div>
        </div>

        {/* Test Location Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Test Location Selection</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Preferred Test Points</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Socket outlets on RCD-protected circuits</li>
                  <li>• Dedicated test points where installed</li>
                  <li>• Accessible final circuit outlets</li>
                  <li>• Points representing full circuit length</li>
                </ul>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-4">
                <h4 className="text-yellow-200 font-medium mb-2">Testing Considerations</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Test from multiple points if circuit is large</li>
                  <li>• Consider equipment disconnection needs</li>
                  <li>• Ensure safe working conditions</li>
                  <li>• Document test locations used</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Testing Notes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Important Testing Notes</h3>
          <div className="space-y-3">
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-orange-200 font-medium mb-2">Equipment Considerations</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Some sensitive equipment may be affected by RCD testing. Consider disconnection where necessary.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Safety During Testing</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Always ensure test equipment is calibrated and follow safe isolation procedures.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Documentation Requirements</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Record all test results including trip times, test currents used, and any observations.
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

export default RCDTestingContent;