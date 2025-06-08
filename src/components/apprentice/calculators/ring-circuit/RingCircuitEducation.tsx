
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, AlertTriangle, CheckCircle, Zap, Shield, Calculator } from "lucide-react";

const RingCircuitEducation = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Ring Final Circuit Testing - Complete Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theory" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 bg-elec-dark">
            <TabsTrigger value="theory" className="text-xs">Theory</TabsTrigger>
            <TabsTrigger value="procedure" className="text-xs">Procedure</TabsTrigger>
            <TabsTrigger value="results" className="text-xs">Results</TabsTrigger>
            <TabsTrigger value="issues" className="text-xs">Issues</TabsTrigger>
            <TabsTrigger value="regulations" className="text-xs lg:block hidden">Regulations</TabsTrigger>
            <TabsTrigger value="practice" className="text-xs lg:block hidden">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="theory" className="mt-4">
            <div className="space-y-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">What is a Ring Final Circuit?</h3>
                <p className="text-elec-light/80 mb-3">
                  A ring final circuit is a wiring configuration where the live and neutral conductors form a continuous loop, 
                  starting and ending at the same protective device in the consumer unit. This design provides two parallel paths 
                  for current flow, reducing voltage drop and allowing smaller cable sizes for the same load.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-2">Key Characteristics:</h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• Maximum floor area: 100m²</li>
                      <li>• Typically protected by 32A MCB/RCBO</li>
                      <li>• Usually wired in 2.5mm² T&E cable</li>
                      <li>• Maximum of 13A socket outlets plus FCUs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-2">Advantages:</h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• Reduced voltage drop</li>
                      <li>• Smaller cable size required</li>
                      <li>• Continued supply if cable damaged</li>
                      <li>• Economic installation method</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Understanding the Mathematics
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="r1-r2" className="border-blue-500/20">
                    <AccordionTrigger className="text-blue-300">R1 + R2 Calculation</AccordionTrigger>
                    <AccordionContent className="text-elec-light/80">
                      <p className="mb-2">
                        R1 + R2 represents the resistance of the live and earth conductors combined. For a ring circuit:
                      </p>
                      <div className="bg-elec-dark rounded p-3 font-mono text-sm">
                        R1 + R2 (at midpoint) = (R1 + R2) ÷ 4
                      </div>
                      <p className="mt-2 text-xs">
                        This is because at the midpoint of the ring, you have two parallel paths, each with half the total resistance.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="end-to-end" className="border-blue-500/20">
                    <AccordionTrigger className="text-blue-300">End-to-End Resistance</AccordionTrigger>
                    <AccordionContent className="text-elec-light/80">
                      <p className="mb-2">
                        End-to-end resistance is measured across the entire loop:
                      </p>
                      <div className="bg-elec-dark rounded p-3 font-mono text-sm">
                        End-to-End = (R1 + R2) ÷ 2
                      </div>
                      <p className="mt-2 text-xs">
                        This confirms the ring is continuous and helps identify any high resistance joints.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="procedure" className="mt-4">
            <div className="space-y-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Step-by-Step Test Procedure</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-elec-yellow pl-4">
                    <h4 className="font-semibold text-white mb-2">Step 1: Preparation</h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• Isolate the circuit at the consumer unit</li>
                      <li>• Verify isolation with voltage indicator</li>
                      <li>• Remove all loads (unplug appliances)</li>
                      <li>• Identify the ring circuit conductors</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-semibold text-white mb-2">Step 2: Continuity Tests</h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• Connect L1 to L2 (live ends together)</li>
                      <li>• Connect N1 to N2 (neutral ends together)</li>
                      <li>• Measure R1 between live conductors at each socket</li>
                      <li>• Measure R2 between earth conductors at each socket</li>
                      <li>• Measure Rn between neutral conductors at each socket</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-white mb-2">Step 3: Verification</h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• Calculate R1 + R2 at the midpoint</li>
                      <li>• Verify readings are consistent around the ring</li>
                      <li>• Check for any unusually high readings</li>
                      <li>• Document all readings on test certificate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            <div className="space-y-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Interpreting Test Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Good Results
                    </h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• Consistent readings around the ring</li>
                      <li>• R1 ≈ R2 (similar conductor sizes)</li>
                      <li>• Neutral resistance similar to live</li>
                      <li>• No readings above expected values</li>
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Problem Indicators
                    </h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• High resistance at specific points</li>
                      <li>• Significant difference between R1 and R2</li>
                      <li>• Infinite readings (open circuit)</li>
                      <li>• Inconsistent readings around ring</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Typical Values</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-elec-light/60">2.5mm² cable (100m ring):</span>
                      <span className="text-white ml-2">~0.15Ω</span>
                    </div>
                    <div>
                      <span className="text-elec-light/60">1.5mm² earth (100m ring):</span>
                      <span className="text-white ml-2">~0.24Ω</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="issues" className="mt-4">
            <div className="space-y-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Common Issues & Solutions</h3>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="high-resistance" className="border-elec-yellow/20">
                    <AccordionTrigger className="text-white">High Resistance Readings</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-red-300 mb-1">Possible Causes:</h5>
                          <ul className="text-sm text-elec-light/80 space-y-1">
                            <li>• Loose connections at socket outlets</li>
                            <li>• Corroded or damaged conductors</li>
                            <li>• Poor quality terminations</li>
                            <li>• Junction box connections</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-300 mb-1">Solutions:</h5>
                          <ul className="text-sm text-elec-light/80 space-y-1">
                            <li>• Check and retighten all connections</li>
                            <li>• Inspect cable for damage</li>
                            <li>• Replace damaged sections</li>
                            <li>• Use proper termination techniques</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="open-circuit" className="border-elec-yellow/20">
                    <AccordionTrigger className="text-white">Open Circuit (Infinite Reading)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-red-300 mb-1">Possible Causes:</h5>
                          <ul className="text-sm text-elec-light/80 space-y-1">
                            <li>• Completely disconnected conductor</li>
                            <li>• Severe cable damage</li>
                            <li>• Incorrect wiring (not actually a ring)</li>
                            <li>• Switch or FCU interrupting ring</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-300 mb-1">Investigation:</h5>
                          <ul className="text-sm text-elec-light/80 space-y-1">
                            <li>• Trace cable route carefully</li>
                            <li>• Check all junction boxes</li>
                            <li>• Verify ring circuit design</li>
                            <li>• Use cable locating equipment if needed</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="interconnection" className="border-elec-yellow/20">
                    <AccordionTrigger className="text-white">Cross-Connected Rings</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-elec-light/80">
                          When rings are accidentally interconnected, test results may appear normal but the circuits 
                          won't function correctly under fault conditions.
                        </p>
                        <div>
                          <h5 className="font-medium text-elec-yellow mb-1">Detection Methods:</h5>
                          <ul className="text-sm text-elec-light/80 space-y-1">
                            <li>• Unusual current distribution patterns</li>
                            <li>• Unexpected socket outlet operation</li>
                            <li>• Multiple protective devices tripping</li>
                            <li>• Phase rotation testing</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="regulations" className="mt-4">
            <div className="space-y-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  BS 7671 Requirements
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-300 mb-2">Ring Final Circuit Standards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-white mb-1">Circuit Design (Regulation 433.1.204):</h5>
                        <ul className="text-elec-light/80 space-y-1">
                          <li>• Maximum floor area: 100m²</li>
                          <li>• Minimum cable size: 2.5mm²</li>
                          <li>• Maximum protective device: 32A</li>
                          <li>• Earth conductor: 1.5mm² minimum</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-white mb-1">Testing Requirements (Chapter 64):</h5>
                        <ul className="text-elec-light/80 space-y-1">
                          <li>• Continuity of ring final conductors</li>
                          <li>• Continuity of protective conductors</li>
                          <li>• Verification of polarity</li>
                          <li>• Earth fault loop impedance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-300 mb-2">Documentation Requirements</h4>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      <li>• Electrical Installation Certificate (new work)</li>
                      <li>• Schedule of Test Results</li>
                      <li>• Circuit charts showing ring arrangement</li>
                      <li>• Test instrument details and calibration</li>
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-300 mb-2">Key Regulation References</h4>
                    <div className="text-sm text-elec-light/80 space-y-1">
                      <div className="flex justify-between">
                        <span>Regulation 433.1.204:</span>
                        <span className="text-white">Ring final circuit requirements</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regulation 612.2.2:</span>
                        <span className="text-white">Continuity testing procedure</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Table 54.7:</span>
                        <span className="text-white">Minimum cross-sectional areas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Appendix 15:</span>
                        <span className="text-white">Ring final circuit testing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="mt-4">
            <div className="space-y-4">
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Practical Tips & Best Practices</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <h4 className="font-semibold text-blue-300 mb-2">Before You Start</h4>
                      <ul className="text-sm text-elec-light/80 space-y-1">
                        <li>• Always verify safe isolation</li>
                        <li>• Check test instrument calibration</li>
                        <li>• Review circuit documentation</li>
                        <li>• Plan your testing sequence</li>
                      </ul>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <h4 className="font-semibold text-green-300 mb-2">During Testing</h4>
                      <ul className="text-sm text-elec-light/80 space-y-1">
                        <li>• Test methodically around the ring</li>
                        <li>• Record readings immediately</li>
                        <li>• Note any unusual observations</li>
                        <li>• Double-check unexpected results</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                      <h4 className="font-semibold text-amber-300 mb-2">Common Mistakes</h4>
                      <ul className="text-sm text-elec-light/80 space-y-1">
                        <li>• Not removing all loads from circuit</li>
                        <li>• Mixing up conductor identities</li>
                        <li>• Poor test lead connections</li>
                        <li>• Rushing the test procedure</li>
                      </ul>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                      <h4 className="font-semibold text-purple-300 mb-2">Professional Tips</h4>
                      <ul className="text-sm text-elec-light/80 space-y-1">
                        <li>• Label conductors clearly</li>
                        <li>• Use proper test lead storage</li>
                        <li>• Maintain clean test probe contacts</li>
                        <li>• Keep detailed test records</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Safety Reminders
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-elec-light/80">
                    <div>
                      <span className="font-medium text-white">Isolation:</span>
                      <p>Always verify complete isolation before starting work</p>
                    </div>
                    <div>
                      <span className="font-medium text-white">PPE:</span>
                      <p>Wear appropriate personal protective equipment</p>
                    </div>
                    <div>
                      <span className="font-medium text-white">Verification:</span>
                      <p>Prove test instruments before and after testing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RingCircuitEducation;
