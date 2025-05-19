
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Zap, GitBranch, Activity, Check } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/common/BackButton";
import { useState } from "react";

const TestingProcedures = () => {
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
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Testing Procedures Mini Toolkit</h1>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to Tools" />
      </div>
      
      <p className="text-muted-foreground">
        Step-by-step guides to essential electrical testing procedures required for installation 
        and verification. Follow the wizard-style checklists to ensure complete and accurate testing.
      </p>

      <Tabs defaultValue="r1r2" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="r1r2">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden md:block">R1+R2 Testing</span>
              <span className="block md:hidden">R1+R2</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="ir">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>IR Testing</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="zs">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <GitBranch className="h-4 w-4" />
              <span>Zs Testing</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="polarity">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Polarity</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="r1r2" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">R1+R2 Testing (Continuity of Protective Conductors)</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Tests the continuity of the circuit protective conductors, main and supplementary bonding conductors.
                </p>
              </div>
              
              <div className="space-y-6 pb-4">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Step 1: Prepare for Testing</h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Isolate the circuit and ensure it's safe to test</li>
                      <li>Verify the test instrument is functioning correctly using a calibration check</li>
                      <li>Ensure all protective conductors are correctly identified</li>
                      <li>Remove any electronic devices that might be damaged by testing</li>
                    </ul>
                    <div className="mt-4 bg-gray-800/30 p-4 rounded-md">
                      <img src="/placeholder.svg" alt="R1+R2 Testing Equipment Setup" className="mx-auto max-h-64" />
                      <p className="text-xs text-center mt-2 text-muted-foreground">
                        Proper test equipment connection diagram
                      </p>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Step 2: Perform the Test</h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Set test meter to continuity/resistance mode</li>
                      <li>Null the test leads to remove their resistance from the measurement</li>
                      <li>Connect one lead to the main earth terminal</li>
                      <li>Connect the other lead to each point being tested</li>
                      <li>Record all readings in a systematic manner</li>
                    </ul>
                    <div className="mt-4 bg-gray-800/30 p-4 rounded-md">
                      <img src="/placeholder.svg" alt="R1+R2 Testing Process" className="mx-auto max-h-64" />
                      <p className="text-xs text-center mt-2 text-muted-foreground">
                        Testing process diagram showing proper testing technique
                      </p>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Step 3: Evaluate Results</h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>All readings should be low ohms (typically less than 1Ω)</li>
                      <li>For long cable runs, calculate the expected resistance based on cable length</li>
                      <li>Document all results on the appropriate certificate</li>
                      <li>Investigate any unexpectedly high readings</li>
                    </ul>
                    <div className="p-4 border border-amber-500/30 rounded-md bg-amber-900/20 mt-4">
                      <h4 className="font-medium text-amber-300 mb-1">Maximum Permissible Values</h4>
                      <p className="text-sm text-amber-100/90">
                        For radial circuits: R₁+R₂ should be less than the value that would cause excessive volt drop<br />
                        For ring circuits: Compare with values calculated from (R₁+R₂)/4
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  <Button 
                    onClick={handlePrevious} 
                    variant="outline" 
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="text-sm text-muted-foreground pt-2">
                    Step {currentStep} of {totalSteps}
                  </div>
                  
                  <Button 
                    onClick={handleNext} 
                    variant="default" 
                    disabled={currentStep === totalSteps}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-md p-4">
            <h3 className="text-blue-200 font-medium mb-2">Common Issues & Solutions</h3>
            <ul className="text-sm text-blue-100/80 space-y-2">
              <li><span className="font-medium">High readings:</span> Check for loose connections or damaged conductors</li>
              <li><span className="font-medium">Inconsistent readings:</span> Check for corrosion or poor contact at test points</li>
              <li><span className="font-medium">Zero readings:</span> Check for inadvertent short circuits in the test setup</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="ir" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold">Insulation Resistance (IR) Testing</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Tests the insulation resistance between live conductors and between live conductors and earth.
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-sm">
                <li>Ensure all circuit protection devices are ON and electronic devices are disconnected</li>
                <li>Select appropriate test voltage (typically 500V for most installations)</li>
                <li>Test between: Line-Neutral, Line-Earth, and Neutral-Earth</li>
                <li>Minimum acceptable values for new installations: 1MΩ for ≤ 500V installations</li>
                <li>Record all readings and note any unusually low values for investigation</li>
              </ul>
              
              <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                <img src="/placeholder.svg" alt="IR Testing Connections" className="mx-auto max-h-64" />
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  IR Test connection points diagram
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zs" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold">Earth Fault Loop Impedance (Zs) Testing</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Measures the impedance of the earth fault loop path to ensure protective devices will operate in fault conditions.
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-sm">
                <li>Connect test equipment correctly between line and earth at the furthest socket outlet</li>
                <li>Perform a "no-trip" test if RCDs/RCBOs are installed</li>
                <li>Compare measured Zs value with maximum Zs value in BS7671 Table 41.3</li>
                <li>Ensure value doesn't exceed maximum for the specific protective device</li>
                <li>Consider temperature factors when comparing to tabulated maximum values</li>
              </ul>
              
              <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                <img src="/placeholder.svg" alt="Zs Testing Setup" className="mx-auto max-h-64" />
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  Earth fault loop impedance test connection diagram
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="polarity" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold">Polarity Testing</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Verifies that all connections are correctly wired and switches/fuses are in the line conductor.
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-sm">
                <li>Verify that single pole devices (switches, fuses) are connected in the line conductor only</li>
                <li>Check that bayonet/Edison screw lampholders have line conductor connected to the center contact</li>
                <li>Confirm that all socket outlets have line/neutral/earth connected to the correct terminals</li>
                <li>Use a continuity tester to check correct polarity throughout the installation</li>
                <li>Pay special attention to two-way and intermediate switching arrangements</li>
              </ul>
              
              <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                <img src="/placeholder.svg" alt="Polarity Testing Method" className="mx-auto max-h-64" />
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  Socket outlet and switch polarity testing diagram
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-green-950/20 border border-green-500/30 rounded-md p-4">
            <h3 className="text-green-200 font-medium mb-2">Safety Reminder</h3>
            <p className="text-sm text-green-100/80">
              Incorrect polarity is a serious safety issue that can result in electric shock hazards and incorrectly isolated circuits. 
              Always double-check polarity tests and immediately rectify any issues found.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-6">
        <h3 className="text-lg font-semibold text-elec-yellow mb-2">Testing Resources</h3>
        <p className="text-sm text-amber-200/90 mb-4">
          These testing procedures are derived from the 18th Edition Wiring Regulations (BS 7671) and 
          the Guidance Note 3: Inspection and Testing. Always refer to the latest regulations for 
          definitive guidance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="border-amber-600/30 hover:bg-amber-950/30">
            Download Full Testing Guide
          </Button>
          <Button variant="outline" className="border-amber-600/30 hover:bg-amber-950/30">
            Print Checklist PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestingProcedures;
