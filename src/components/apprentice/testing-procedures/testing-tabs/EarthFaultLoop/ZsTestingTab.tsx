
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronRight, CircleCheck, Info } from "lucide-react";
import StepNavigation from "../../StepNavigation";
import CommonIssuesCard from "../../CommonIssuesCard";

const ZsTestingTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold">Earth Fault Loop Impedance (Zs) Testing</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Measures the impedance of the earth fault loop path to ensure protective devices will operate in fault conditions.
          </p>
          
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 1: Understanding Earth Fault Loop Impedance</h3>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">What is Zs?</h4>
                  <p className="text-sm">
                    The earth fault loop impedance (Zs) is the total impedance of the earth fault current loop starting and ending at the point of earth fault. It includes the impedance of:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>The source (transformer secondary winding)</li>
                    <li>The phase conductor from the source to the fault</li>
                    <li>The protective conductor from the fault back to the source</li>
                  </ul>
                </div>
                
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Why Test Zs?</h4>
                  <p className="text-sm">
                    Testing ensures that in the event of a fault:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Sufficient fault current will flow to operate the protective device</li>
                    <li>The protective device will disconnect the circuit within the required time</li>
                    <li>Automatic disconnection of supply requirements in BS 7671 are met</li>
                    <li>Touch voltage during a fault will not exceed safe levels</li>
                  </ul>
                </div>
                
                <div className="p-4 mt-4 bg-amber-950/20 border border-amber-500/30 rounded-md flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <h4 className="font-medium text-amber-300">Important Regulation</h4>
                    <p className="mt-1 text-amber-100/90">
                      BS 7671 Regulation 411.4.6 requires that for circuits up to 32A, the fault should clear in 0.4 seconds.
                      For distribution circuits and circuits over 32A, disconnection time can be up to 5 seconds.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                  <img src="/placeholder.svg" alt="Earth Fault Loop Path" className="mx-auto max-h-64" />
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    Earth fault current loop path diagram
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 2: Testing Methodology</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Test Equipment Required</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Earth fault loop impedance tester</li>
                      <li>Appropriate test leads</li>
                      <li>RCD bypassing device (if applicable)</li>
                      <li>Reference tables from BS 7671</li>
                    </ul>
                    
                    <h4 className="text-sm font-medium mt-4">Test Methods</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>
                        <span className="font-medium">Standard Test:</span> Direct measurement using loop tester (may trip RCDs)
                      </li>
                      <li>
                        <span className="font-medium">No-Trip Test:</span> Uses low current and longer test duration to avoid tripping RCDs
                      </li>
                      <li>
                        <span className="font-medium">Ze + R1+R2 Method:</span> Measure external Ze then add measured R1+R2 values
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Testing Procedure</h4>
                    <ol className="list-decimal pl-6 space-y-3 text-sm">
                      <li>Ensure all main bonding is correctly installed</li>
                      <li>Connect test equipment to the circuit under test at the furthest point</li>
                      <li>Select appropriate test method based on circuit protection</li>
                      <li>For RCD protected circuits, use the 'no-trip' test setting</li>
                      <li>Perform the test and record the reading</li>
                      <li>Compare reading to maximum permitted value for the protection device</li>
                      <li>Test at multiple points on larger installations</li>
                    </ol>
                    
                    <div className="mt-4 bg-blue-950/20 border border-blue-500/30 p-4 rounded-md">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-100/90">
                          When measuring Zs in installations with PME (TN-C-S) earthing, a high reading may indicate a broken PEN conductor. This represents a potentially dangerous situation requiring immediate investigation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                  <img src="/placeholder.svg" alt="Zs Testing Setup" className="mx-auto max-h-64" />
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    Earth fault loop impedance test connection diagram
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 3: Results Analysis & Documentation</h3>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Interpreting Results</h4>
                  <p className="text-sm">
                    Compare measured Zs values with maximum permitted values from BS 7671 Tables 41.2, 41.3, 41.4:
                  </p>
                  <div className="overflow-x-auto mt-2">
                    <table className="min-w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="p-2 text-left">Device Rating</th>
                          <th className="p-2 text-left">Type B (Ω)</th>
                          <th className="p-2 text-left">Type C (Ω)</th>
                          <th className="p-2 text-left">Type D (Ω)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="p-2">6A</td>
                          <td className="p-2">7.67</td>
                          <td className="p-2">3.83</td>
                          <td className="p-2">1.92</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-2">10A</td>
                          <td className="p-2">4.60</td>
                          <td className="p-2">2.30</td>
                          <td className="p-2">1.15</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-2">16A</td>
                          <td className="p-2">2.87</td>
                          <td className="p-2">1.44</td>
                          <td className="p-2">0.72</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-2">20A</td>
                          <td className="p-2">2.30</td>
                          <td className="p-2">1.15</td>
                          <td className="p-2">0.57</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="p-2">32A</td>
                          <td className="p-2">1.44</td>
                          <td className="p-2">0.72</td>
                          <td className="p-2">0.36</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Values based on 230V supply. Apply correction factors for ambient temperature if needed.
                  </p>
                </div>
                
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Correction Factors</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Apply +0.004 Ω/°C temperature correction for copper conductors</li>
                    <li>Apply +0.005 Ω/°C temperature correction for aluminium conductors</li>
                    <li>For tests performed at 20°C, multiply readings by 1.2 to account for conductor heating</li>
                  </ul>
                </div>
                
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Documentation Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Record all test results on appropriate certification</li>
                    <li>Document test locations</li>
                    <li>Note ambient temperature at time of testing</li>
                    <li>Include any correction factors applied</li>
                    <li>Compare with maximum values for each circuit protection device</li>
                    <li>Record pass/fail status for each circuit tested</li>
                    <li>Document any remedial actions required</li>
                  </ul>
                </div>
                
                <div className="p-4 mt-4 bg-green-950/20 border border-green-500/30 rounded-md flex items-start gap-3">
                  <CircleCheck className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <h4 className="font-medium text-green-300">Completion Verification</h4>
                    <p className="mt-1 text-green-100/90">
                      Upon completion, verify that all Zs values are below the maximum permitted values for the corresponding protective devices. Where values exceed the maximum, either the circuit must be rewired with larger conductors or the protective device rating/type must be reconsidered.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <Separator className="my-6" />
            
            <StepNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </div>
        </CardContent>
      </Card>
      
      <CommonIssuesCard />
    </div>
  );
};

export default ZsTestingTab;
