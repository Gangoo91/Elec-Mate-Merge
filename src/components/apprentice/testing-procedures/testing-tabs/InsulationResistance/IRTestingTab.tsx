
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CircleCheck, Info } from "lucide-react";
import StepNavigation from "../../StepNavigation";
import CommonIssuesCard from "../../CommonIssuesCard";

const IRTestingTab = () => {
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
          <h2 className="text-xl font-semibold">Insulation Resistance (IR) Testing</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Tests the insulation resistance between live conductors and between live conductors and earth.
          </p>
          
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 1: Preparation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Test Equipment Required</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Insulation resistance tester (500V or 1000V rating)</li>
                      <li>Test leads rated for the test voltage</li>
                      <li>Test probes with integrated fused protection</li>
                      <li>Calibration certificate for the test instrument</li>
                      <li>Warning signs and lock-off equipment</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Safety Preparation</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Ensure the installation is completely isolated</li>
                      <li>Disconnect or isolate all electronic devices</li>
                      <li>Inform all personnel that testing is taking place</li>
                      <li>Check test equipment before use on a known source</li>
                      <li>Verify correct test voltage selection (typically 500V)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-950/20 border border-blue-500/30 p-4 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <h4 className="font-medium text-blue-300">Important Note:</h4>
                      <p className="text-blue-100/90">
                        Always follow the safe isolation procedure before commencing insulation resistance testing. Many electronic devices can be damaged by the high voltages used during insulation testing - ensure these are disconnected or otherwise protected.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                  <img src="/placeholder.svg" alt="IR Testing Preparation" className="mx-auto max-h-64" />
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    Safe isolation and preparation procedure
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 2: Testing Procedure</h3>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Test Sequence</h4>
                  <ol className="list-decimal pl-6 space-y-4 text-sm">
                    <li>
                      <span className="font-medium">Line-Neutral Test:</span>
                      <p className="mt-1">Connect the test leads between line and neutral conductors. Apply the test voltage for the required duration (usually 60 seconds) and record the result.</p>
                    </li>
                    <li>
                      <span className="font-medium">Line-Earth Test:</span>
                      <p className="mt-1">Connect the test leads between line conductor and earth. Apply the test voltage for the required duration and record the result.</p>
                    </li>
                    <li>
                      <span className="font-medium">Neutral-Earth Test:</span>
                      <p className="mt-1">Connect the test leads between neutral conductor and earth. Apply the test voltage for the required duration and record the result.</p>
                    </li>
                    <li>
                      <span className="font-medium">3-Phase Systems:</span>
                      <p className="mt-1">For three-phase systems, additional tests between phases (L1-L2, L2-L3, L3-L1) are required. Each phase must also be tested against neutral and earth.</p>
                    </li>
                  </ol>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Test Voltages</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="p-2 text-left">Circuit Rating</th>
                            <th className="p-2 text-left">Test Voltage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800">
                            <td className="p-2">SELV and PELV circuits</td>
                            <td className="p-2">250V DC</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-2">Up to 500V</td>
                            <td className="p-2">500V DC</td>
                          </tr>
                          <tr>
                            <td className="p-2">Above 500V</td>
                            <td className="p-2">1000V DC</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Minimum Acceptable Values</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="p-2 text-left">Circuit Type</th>
                            <th className="p-2 text-left">Minimum Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800">
                            <td className="p-2">SELV and PELV circuits</td>
                            <td className="p-2">0.5 MΩ</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="p-2">Up to 500V including FELV</td>
                            <td className="p-2">1.0 MΩ</td>
                          </tr>
                          <tr>
                            <td className="p-2">Above 500V</td>
                            <td className="p-2">1.0 MΩ</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                  <img src="/placeholder.svg" alt="IR Testing Connections" className="mx-auto max-h-64" />
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    IR test connection points diagram
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 3: Results & Documentation</h3>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Interpreting Results</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>All readings should exceed the minimum values specified in Table 61 of BS 7671</li>
                    <li>Lower readings may indicate insulation breakdown or moisture ingress</li>
                    <li>Values significantly higher than the minimum (100s of MΩ) are common in new installations</li>
                    <li>Identical or very similar readings across all tests suggest good insulation integrity</li>
                    <li>Results should be compared with previous tests to identify deterioration</li>
                  </ul>
                </div>
                
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Documentation Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Record all test results on appropriate certification</li>
                    <li>Document test voltage used</li>
                    <li>Note any external factors that may affect readings (e.g. humidity)</li>
                    <li>Record the specific location tested for each measurement</li>
                    <li>Include date, time and test equipment details</li>
                    <li>Sign and certify the documentation</li>
                  </ul>
                </div>
                
                <div className="p-4 mt-4 bg-green-950/20 border border-green-500/30 rounded-md flex items-start gap-3">
                  <CircleCheck className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <h4 className="font-medium text-green-300">Completion Checklist</h4>
                    <ul className="list-disc pl-6 space-y-1 mt-2 text-green-100/90">
                      <li>All tests conducted and results recorded</li>
                      <li>Any low values investigated and resolved</li>
                      <li>All disconnected equipment reconnected</li>
                      <li>System returned to operational status</li>
                      <li>Documentation completed and filed</li>
                    </ul>
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

export default IRTestingTab;
