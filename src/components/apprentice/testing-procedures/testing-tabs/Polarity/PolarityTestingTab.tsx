
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, ChevronRight, CircleCheck, Info } from "lucide-react";
import StepNavigation from "../../StepNavigation";
import CommonIssuesCard from "../../CommonIssuesCard";

const PolarityTestingTab = () => {
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
          <h2 className="text-xl font-semibold">Polarity Testing</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Verifies that all connections are correctly wired and switches/fuses are in the line conductor.
          </p>
          
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 1: Polarity Testing Fundamentals</h3>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Purpose of Polarity Testing</h4>
                  <p className="text-sm">
                    Polarity testing ensures that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>All single pole devices (switches, fuses, circuit breakers) are connected in the line conductor only</li>
                    <li>Centre contacts of Edison screw (ES) and bayonet cap (BC) lampholders are connected to the line conductor</li>
                    <li>Socket outlets and similar accessories are correctly wired</li>
                    <li>The installation complies with BS 7671 Regulation 411.3.2</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">When to Test</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>During initial verification of new installations</li>
                      <li>After modifications to existing installations</li>
                      <li>During periodic testing</li>
                      <li>When performing fault finding</li>
                      <li>Prior to energising an installation</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Safety Implications</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Prevents unexpected live parts in supposedly "off" circuits</li>
                      <li>Ensures isolation points work effectively</li>
                      <li>Prevents electric shock during lamp replacement</li>
                      <li>Ensures RCDs operate correctly when needed</li>
                      <li>Prevents equipment damage due to incorrect connections</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 mt-4 bg-amber-950/20 border border-amber-500/30 rounded-md flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <h4 className="font-medium text-amber-300">Safety Critical</h4>
                    <p className="mt-1 text-amber-100/90">
                      Incorrect polarity is a serious safety issue that can result in electric shock hazards, even 
                      when a circuit is seemingly isolated. Thorough polarity testing must be conducted on all installations 
                      before energisation.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 2: Testing Methods</h3>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Test Equipment Required</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Low resistance ohmmeter or continuity tester</li>
                    <li>Voltage indicator (approved to GS38)</li>
                    <li>Proving unit for voltage indicator</li>
                    <li>Test leads</li>
                    <li>Socket outlet tester (optional supplementary method)</li>
                  </ul>
                </div>
                
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Testing Procedures</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium">1. Dead Testing Method (Preferred)</h5>
                      <ol className="list-decimal pl-6 space-y-2 text-sm mt-1">
                        <li>Ensure the circuit is completely isolated</li>
                        <li>At the distribution board, identify the line conductor for the circuit</li>
                        <li>Using a continuity tester, connect one lead to the line conductor at the origin</li>
                        <li>At each outlet, test between the supposed line terminal and earth</li>
                        <li>Continuity indicates correct polarity</li>
                        <li>Repeat for all outlets and accessories</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium">2. Socket Testing</h5>
                      <ol className="list-decimal pl-6 space-y-2 text-sm mt-1">
                        <li>Use a continuity tester on the de-energised circuit</li>
                        <li>Test between socket line terminal and the distribution board line connection</li>
                        <li>Test between socket neutral terminal and distribution board neutral connection</li>
                        <li>Test between socket earth terminal and main earthing terminal</li>
                        <li>Continuity should only be present between corresponding terminals</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium">3. Lighting Circuit Testing</h5>
                      <ol className="list-decimal pl-6 space-y-2 text-sm mt-1">
                        <li>Verify line connections to all switches</li>
                        <li>Verify line connections to lamp centre contacts</li>
                        <li>Check the switched line returns to the correct light fitting</li>
                        <li>For 2-way switching, verify correct operation in both switch positions</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
                  <img src="/placeholder.svg" alt="Polarity Testing Method" className="mx-auto max-h-64" />
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    Socket outlet and switch polarity testing diagram
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Step 3: Common Issues & Documentation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Common Polarity Issues</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Reversed line and neutral connections at socket outlets</li>
                      <li>Switches connected to the neutral conductor instead of line</li>
                      <li>Cross-polarity in ring final circuits</li>
                      <li>Incorrect connections in two-way switching arrangements</li>
                      <li>Line/neutral reversal at distribution boards</li>
                      <li>Incorrect connections in multi-phase systems</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Documentation Requirements</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Record "Satisfactory" or "Unsatisfactory" for each circuit tested</li>
                      <li>Document test method used</li>
                      <li>Note any remedial work carried out</li>
                      <li>Include all polarity testing in the schedule of test results</li>
                      <li>Sign and certify the documentation</li>
                    </ul>
                    
                    <div className="p-4 mt-4 bg-blue-950/20 border border-blue-500/30 rounded-md">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="text-blue-100/90">
                            BS 7671 Regulation 612.2 requires that polarity testing is performed on 100% of the installation. 
                            No sampling is permitted.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 mt-4 bg-green-950/20 border border-green-500/30 rounded-md flex items-start gap-3">
                  <CircleCheck className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <h4 className="font-medium text-green-300">Quick Reference Checklist</h4>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-100/90">Single-pole switches in line conductor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-100/90">Socket outlets correctly wired</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-100/90">Lampholders correctly connected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-100/90">Fuses in line conductors only</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-100/90">Multi-way switching functions correctly</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-100/90">Correct phase sequence in 3-phase</span>
                      </div>
                    </div>
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
      
      <div className="bg-green-950/20 border border-green-500/30 rounded-md p-4">
        <h3 className="text-green-200 font-medium mb-2">Safety Reminder</h3>
        <p className="text-sm text-green-100/80">
          Incorrect polarity is a serious safety issue that can result in electric shock hazards and incorrectly isolated circuits. 
          Always double-check polarity tests and immediately rectify any issues found.
        </p>
      </div>
      
      <CommonIssuesCard />
    </div>
  );
};

export default PolarityTestingTab;
