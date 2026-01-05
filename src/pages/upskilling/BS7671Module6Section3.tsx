import { ArrowLeft, Settings, Shield, Zap, FileCheck, AlertTriangle, CheckCircle, HelpCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import BS7671Module6Section3Quiz from '@/components/upskilling/quiz/BS7671Module6Section3Quiz';

const BS7671Module6Section3 = () => {
  const [openInlineCheck, setOpenInlineCheck] = useState<string | null>(null);

  const toggleInlineCheck = (checkId: string) => {
    setOpenInlineCheck(openInlineCheck === checkId ? null : checkId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Settings className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Sequence of Tests and Testing Procedures
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Module 6, Section 3
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                35 minutes
              </Badge>
            </div>
          </div>
          {/* Introduction */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                The sequence of tests is critical in ensuring electrical installations are verified safely and systematically. BS 7671 (Amendment 3) sets out the correct order so that dangerous conditions are detected early and results remain valid. Testing out of sequence can lead to misleading readings or, worse, expose electricians to live hazards.
              </p>
              <p>
                The specified test sequence ensures that the installation is progressively verified from basic safety through to operational performance, with each test building upon the results of previous tests.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recall the correct order of tests as required by BS 7671</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand why the sequence is important for safety and accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply testing procedures step by step in real-world installations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify what each test confirms in relation to compliance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Safe Isolation and Preliminary Checks */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                1. Safe Isolation and Preliminary Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Before testing, confirm safe isolation of the installation using proven safe isolation procedures. This is fundamental to electrician safety during verification.
              </p>
              <div className="space-y-3">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Safe Isolation Procedure</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Switch off and lock off the supply</li>
                    <li>• Test voltage indicator on a known live source</li>
                    <li>• Test for absence of voltage on all conductors</li>
                    <li>• Re-test voltage indicator on known live source</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Preliminary Checks</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Visually inspect for obvious defects (as covered in Section 2)</li>
                    <li>• Confirm supply characteristics (voltage, earthing arrangement)</li>
                    <li>• Verify protective devices are correctly rated and installed</li>
                    <li>• Check accessibility of all equipment to be tested</li>
                  </ul>
                </div>
              </div>
              
              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check1'} 
                  onOpenChange={() => toggleInlineCheck('check1')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: What must always be carried out before any electrical testing begins?</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check1' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: Safe isolation of the installation</p>
                      <p className="text-white text-sm">
                        Safe isolation must always be the first step. This includes switching off and locking off the supply, testing for absence of voltage using a proven voltage indicator, and ensuring the installation cannot be re-energised during testing. This protects the electrician from electric shock and ensures accurate test results.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* Dead Testing */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-yellow-400" />
                2. Dead Testing (Carried Out Before Energisation)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Dead testing is performed on de-energised installations to verify basic safety and integrity before the installation is energised for live testing.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">A. Continuity of Protective Conductors</h4>
                  <p className="text-white text-sm mb-2">
                    Including main and supplementary bonding conductors. This test ensures all metalwork is properly earthed and bonded.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Use low-resistance ohmmeter with test current ≥200mA</li>
                    <li>• Test between main earthing terminal and all exposed conductive parts</li>
                    <li>• Record R1 + R2 values for each circuit</li>
                    <li>• Maximum values depend on circuit protection and cable CSA</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">B. Continuity of Ring Final Circuit Conductors</h4>
                  <p className="text-white text-sm mb-2">
                    For 32A ring circuits only. Verifies the ring integrity and calculates R1 + R2 values.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Measure end-to-end resistance of each conductor</li>
                    <li>• Cross-connect and test from each socket outlet</li>
                    <li>• Values should be (R1+R2)/4 for a perfect ring</li>
                    <li>• Identify any interconnections or spur connections</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">C. Insulation Resistance</h4>
                  <p className="text-white text-sm mb-2">
                    Tests insulation between conductors and between conductors and earth.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Test at 500V DC for circuits up to 500V nominal</li>
                    <li>• Minimum 1MΩ for most installations</li>
                    <li>• Test line to neutral, line to earth, neutral to earth</li>
                    <li>• Remove/disconnect sensitive equipment before testing</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">D. Polarity</h4>
                  <p className="text-white text-sm mb-2">
                    Checking correct connection of line, neutral, and circuit protective conductor.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Verify line conductor connects to correct terminals</li>
                    <li>• Check switches are in line conductor only</li>
                    <li>• Confirm correct connections at accessories</li>
                    <li>• Essential for safety and correct operation</li>
                  </ul>
                </div>
              </div>

              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check2'} 
                  onOpenChange={() => toggleInlineCheck('check2')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: Name two tests that are carried out while the installation is de-energised.</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check2' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: Any two from: Continuity of protective conductors, Continuity of ring circuits, Insulation resistance, Polarity</p>
                      <p className="text-white text-sm">
                        All dead tests are carried out while the installation is isolated and de-energised for safety. These tests verify the basic integrity and safety of the installation before it is energised for live testing.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* Live Testing */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                3. Live Testing (After Energisation)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Live testing is performed after the installation has been safely energised and all dead tests have been completed satisfactorily.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">A. Earth Fault Loop Impedance (Zs)</h4>
                  <p className="text-white text-sm mb-2">
                    Confirms the effectiveness of protective devices under earth fault conditions.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Measured from line conductor to earth at each point</li>
                    <li>• Must be low enough to ensure automatic disconnection</li>
                    <li>• Compare results with maximum values in BS 7671</li>
                    <li>• Critical for safety in fault conditions</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">B. RCD Testing</h4>
                  <p className="text-white text-sm mb-2">
                    Tests residual current devices for correct operation and trip times.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Test at half rated current (should not trip)</li>
                    <li>• Test at rated current (should trip within time limits)</li>
                    <li>• Test at 5 times rated current for instantaneous trip</li>
                    <li>• Verify correct operation of test button</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">C. Prospective Fault Current (PFC/PSC)</h4>
                  <p className="text-white text-sm mb-2">
                    Measures maximum fault currents to ensure protective devices can safely interrupt them.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Measured at origin of installation</li>
                    <li>• Both prospective short circuit and earth fault current</li>
                    <li>• Must not exceed breaking capacity of protective devices</li>
                    <li>• Essential for confirming protective device ratings</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">D. Functional Testing</h4>
                  <p className="text-white text-sm mb-2">
                    Ensures all switches, controls, and protective devices operate correctly.
                  </p>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Test all switching devices and controls</li>
                    <li>• Verify correct sequence of operation</li>
                    <li>• Check interlocks and safety systems</li>
                    <li>• Confirm proper labelling and identification</li>
                  </ul>
                </div>
              </div>

              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check3'} 
                  onOpenChange={() => toggleInlineCheck('check3')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: What test confirms the effectiveness of protective devices under fault conditions?</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check3' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: Earth Fault Loop Impedance (Zs) testing</p>
                      <p className="text-white text-sm">
                        Earth fault loop impedance testing measures the total impedance of the earth fault loop, which determines whether protective devices will operate quickly enough to provide automatic disconnection in the event of an earth fault. This is fundamental to electrical safety.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* Order and Recording */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                4. Order and Recording of Results
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                The order prevents unsafe energisation and ensures accuracy of results. Proper documentation is essential for compliance and future reference.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Why Sequence Matters</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Dead tests first ensure installation is safe to energise</li>
                    <li>• Each test builds upon results of previous tests</li>
                    <li>• Prevents exposure to hazardous conditions</li>
                    <li>• Ensures accurate and meaningful results</li>
                    <li>• Compliance with BS 7671 legal requirements</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Recording Requirements</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Test results must be recorded on relevant certificate (EIC/MEIWC)</li>
                    <li>• Results compared against maximum permissible values in BS 7671</li>
                    <li>• Clear circuit identification and referencing</li>
                    <li>• Signatures and dates from competent persons</li>
                    <li>• Copies provided to client and building control where required</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Quality Assurance</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Use calibrated test instruments within certification period</li>
                    <li>• Cross-check unexpected results with alternative methods</li>
                    <li>• Ensure environmental conditions don't affect readings</li>
                    <li>• Document any limitations or departures from standard procedures</li>
                  </ul>
                </div>
              </div>

              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check4'} 
                  onOpenChange={() => toggleInlineCheck('check4')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: Why must test results be recorded and compared to BS 7671 values?</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check4' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: To provide documented evidence of compliance and safety</p>
                      <p className="text-white text-sm">
                        Recording and comparing test results to BS 7671 values provides documented proof that the installation meets safety standards, creates a baseline for future inspections, satisfies legal requirements, and protects both the electrician and client. The comparison ensures the installation will operate safely under normal and fault conditions.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>As an electrician:</p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Pre-Testing Protocols</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Conduct thorough risk assessment before starting any work</li>
                    <li>• Ensure all test equipment is calibrated and within certification</li>
                    <li>• Verify safe isolation procedures are understood by all team members</li>
                    <li>• Check environmental conditions are suitable for testing</li>
                    <li>• Confirm client understands testing will cause temporary power loss</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Testing Sequence Management</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Always follow the dead tests first, live tests second rule</li>
                    <li>• Use properly calibrated instruments for valid results</li>
                    <li>• Double-check polarity and insulation resistance before energising</li>
                    <li>• Keep detailed records during testing, not just final results</li>
                    <li>• Plan testing sequence to minimise disruption to occupants</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Documentation and Quality Control</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Keep results neat, accurate, and linked to correct circuit reference</li>
                    <li>• Use digital certification systems where possible to reduce errors</li>
                    <li>• Cross-reference test results with design calculations</li>
                    <li>• Conduct peer reviews of critical test results</li>
                    <li>• Maintain testing records for warranty and insurance purposes</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Common Pitfalls and Prevention</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Never skip tests even under time pressure - safety is paramount</li>
                    <li>• Be aware of parallel paths affecting continuity measurements</li>
                    <li>• Consider temperature effects on resistance measurements</li>
                    <li>• Account for voltage drop in long cable runs</li>
                    <li>• Verify RCD operation with both test button and test instrument</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Professional Development</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Stay updated with BS 7671 amendments and industry guidance</li>
                    <li>• Attend regular training on testing procedures and equipment</li>
                    <li>• Practice testing procedures on training installations</li>
                    <li>• Maintain competence records for scheme provider requirements</li>
                    <li>• Learn from near-misses and share experiences with colleagues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Example: Housing Development Testing Error
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-3">The Situation</h4>
                <p className="text-white text-sm mb-3">
                  An electrician testing a new housing development with 47 properties skipped the continuity of ring final circuits before energising the installation. The testing schedule was tight, and pressure was mounting to complete certification for handover to the developer.
                </p>
                
                <h4 className="font-semibold text-yellow-400 mb-2">What Went Wrong</h4>
                <ul className="space-y-1 text-white text-sm mb-3">
                  <li>• Ring circuit continuity test omitted due to time pressure</li>
                  <li>• Installation energised based on other successful dead tests</li>
                  <li>• Initial functional testing appeared normal</li>
                  <li>• Properties handed over and occupied by residents</li>
                </ul>

                <h4 className="font-semibold text-yellow-400 mb-2">The Consequences</h4>
                <p className="text-white text-sm mb-3">
                  Three weeks later, several properties experienced nuisance MCB tripping. Investigation revealed a broken ring circuit in the kitchen outlets of House 23, causing the entire ring to operate as a radial circuit. This resulted in:
                </p>
                <ul className="space-y-1 text-white text-sm mb-3">
                  <li>• Overloading of one leg of the &quot;ring&quot; circuit</li>
                  <li>• 32A MCB protecting a cable effectively operating as 20A radial</li>
                  <li>• Potential fire risk from cable overload</li>
                  <li>• Multiple properties affected by power outages</li>
                </ul>

                <h4 className="font-semibold text-yellow-400 mb-2">The Investigation</h4>
                <p className="text-white text-sm mb-3">
                  A complete re-test identified the issue through proper ring circuit continuity testing. The broken connection was found in a joint box that had worked loose during construction. The fault would have been immediately obvious if the correct test sequence had been followed.
                </p>

                <h4 className="font-semibold text-yellow-400 mb-2">Lessons Learned</h4>
                <ul className="space-y-1 text-white text-sm">
                  <li>• Time and cost could have been saved by following correct sequence initially</li>
                  <li>• Emergency call-outs and remedial work cost far more than proper initial testing</li>
                  <li>• Reputation damage to contractor and electrician involved</li>
                  <li>• Potential legal liability for unsafe installation</li>
                  <li>• BS 7671 test sequence exists for good reasons - it cannot be abbreviated</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Testing must follow the sequence set out in BS 7671</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Safe isolation comes first, then dead tests, then live tests</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dead tests: continuity, insulation resistance, polarity</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Live tests: loop impedance, RCD operation, PFC, functional checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recording accurate results is essential for certification and compliance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671Module6Section3Quiz />

        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="../bs7671-module-6-section-2">
              <Button
                variant="outline"
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Visual Inspection
              </Button>
            </Link>
            <Link to="../bs7671-module-6-section-4">
              <Button
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto"
              >
                Next: Certification Forms
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module6Section3;