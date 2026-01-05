import { ArrowLeft, ArrowRight, CheckCircle, Book, AlertTriangle, Target, Shield, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BS7671Module6Section1Quiz from '@/components/upskilling/quiz/BS7671Module6Section1Quiz';

const BS7671Module6Section1 = () => {
  const [expandedCheck, setExpandedCheck] = useState<number | null>(null);

  const inlineChecks = [
    {
      question: "Why is initial verification required before energising a new installation?",
      answer: "Initial verification is a legal requirement under the Electricity at Work Regulations 1989 and BS 7671. It ensures the installation is safe, compliant with regulations, and fit for service before energisation. Without it, there's risk of electric shock, fire, equipment damage, and legal non-compliance."
    },
    {
      question: "What are the main categories of work requiring initial verification?",
      answer: "New installations (complete new builds), additions (new circuits or major modifications), alterations (significant changes to existing installations), and any work that affects the safety or compliance of the electrical system."
    },
    {
      question: "Who can sign an Electrical Installation Certificate?",
      answer: "Only a skilled person who is competent in electrical installation work and testing. This typically means someone who is qualified, experienced, and registered with a competent person scheme or approved under Building Regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div>
        <Link to="../bs7671-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Requirements for Initial Verification
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Module 6, Section 1
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Before any new electrical installation can be handed over, it must undergo initial verification. 
                This is a mandatory process under BS 7671 (Amendment 3) that ensures the work is safe, compliant, 
                and fit for service. Initial verification includes inspections, testing, and recording results on 
                the correct certification forms. Skipping or rushing this step risks non-compliance, safety hazards, 
                and potential legal consequences.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Explain the purpose of initial verification in electrical installations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify the mandatory checks required under BS 7671</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand when initial verification must be carried out</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recognise the electrician's responsibilities in recording results</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 1 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">1. Purpose of Initial Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Legal and Safety Foundation
              </p>
              <p className="mb-4">
                Initial verification is not merely a recommended practice—it's a fundamental legal requirement under 
                the Electricity at Work Regulations 1989 and BS 7671. This process serves as the critical bridge 
                between installation completion and safe energisation, protecting lives, property, and ensuring 
                regulatory compliance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Primary Safety Objectives
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• Confirms compliance with BS 7671 Wiring Regulations (18th Edition Amendment 3)</li>
                    <li>• Ensures protection against electric shock (direct and indirect contact)</li>
                    <li>• Verifies protection against thermal effects and overcurrent</li>
                    <li>• Validates fault protection measures and earthing arrangements</li>
                    <li>• Confirms fire safety measures and emergency provisions</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Legal Compliance Requirements</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Electricity at Work Regulations 1989 (Regulation 4)</li>
                    <li>• Building Regulations Part P compliance</li>
                    <li>• CDM Regulations 2015 (Construction Design and Management)</li>
                    <li>• Health and Safety at Work Act 1974</li>
                    <li>• Insurance policy requirements and liability protection</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-md border border-green-600/30 mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Documentation and Evidence Trail</h4>
                <p className="text-sm mb-3">
                  Initial verification creates a comprehensive evidence trail that serves multiple critical purposes:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold text-sm mb-2">For Clients</h5>
                    <p className="text-xs">Proof of safe, compliant installation meeting all design requirements and building regulations</p>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold text-sm mb-2">For Insurers</h5>
                    <p className="text-xs">Evidence of professional installation reducing liability and supporting claims</p>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold text-sm mb-2">For Regulators</h5>
                    <p className="text-xs">Demonstration of compliance with statutory requirements and industry standards</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30 mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Consequences of Non-Compliance
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Legal Consequences</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Criminal prosecution under EaWR 1989</li>
                      <li>• Unlimited fines and imprisonment</li>
                      <li>• Professional disqualification</li>
                      <li>• Personal liability for accidents</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Commercial Impact</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Insurance claim rejection</li>
                      <li>• Project delays and costs</li>
                      <li>• Reputation damage</li>
                      <li>• Loss of registration status</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Card 
                className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
                onClick={() => setExpandedCheck(expandedCheck === 0 ? null : 0)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-yellow-400" />
                      Interactive Check: Legal Requirements
                    </div>
                    {expandedCheck === 0 ? 
                      <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                      <ChevronRight className="h-4 w-4 text-yellow-400" />
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-white mb-3">{inlineChecks[0].question}</p>
                  {expandedCheck === 0 && (
                    <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                      <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                      <p className="text-sm text-white">{inlineChecks[0].answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 2 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">2. When Initial Verification is Required</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Comprehensive Application Scenarios
              </p>
              
              <div className="grid gap-6 mb-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    New Installations (Complete Scope)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Domestic Properties</h5>
                      <ul className="text-sm space-y-1">
                        <li>• New build houses and flats</li>
                        <li>• Complete rewiring of existing properties</li>
                        <li>• New consumer unit installations</li>
                        <li>• Garage and outbuilding electrical supplies</li>
                        <li>• Garden electrical installations</li>
                        <li>• Electric vehicle charging points</li>
                        <li>• Solar PV and battery storage systems</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Commercial & Industrial</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Office buildings and retail premises</li>
                        <li>• Manufacturing facilities</li>
                        <li>• Warehouses and distribution centres</li>
                        <li>• Educational establishments</li>
                        <li>• Healthcare facilities</li>
                        <li>• Agricultural and horticultural premises</li>
                        <li>• Temporary construction site installations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Additions and Alterations
                  </h4>
                  <p className="text-sm mb-3">
                    Initial verification applies to ANY addition or alteration that creates new circuits or 
                    significantly modifies existing electrical installations. The scope depends on the extent of work:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">New Circuits</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Additional socket circuits</li>
                        <li>• New lighting circuits</li>
                        <li>• Cooker and shower circuits</li>
                        <li>• Immersion heater circuits</li>
                        <li>• Security system circuits</li>
                        <li>• Fire alarm circuits</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Major Modifications</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Distribution board replacements</li>
                        <li>• Change of earthing system</li>
                        <li>• Installation of RCD protection</li>
                        <li>• Special location installations</li>
                        <li>• Three-phase supply upgrades</li>
                        <li>• Supply capacity increases</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Extensions & Upgrades</h5>
                      <ul className="text-sm space-y-1">
                        <li>• House extensions requiring new circuits</li>
                        <li>• Loft and basement conversions</li>
                        <li>• Kitchen and bathroom refurbishments</li>
                        <li>• Commercial fit-outs</li>
                        <li>• Plant room installations</li>
                        <li>• Emergency lighting systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-md border border-orange-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Timing Requirements
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Before Energisation</h5>
                      <p className="text-sm mb-2">
                        Initial verification MUST be completed before any part of the installation is energised. 
                        This includes:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• All visual inspections completed</li>
                        <li>• Dead testing procedures finished</li>
                        <li>• Safety checks verified</li>
                        <li>• Documentation prepared</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Live Testing Phase</h5>
                      <p className="text-sm mb-2">
                        Only after dead testing, the installation may be temporarily energised for:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Earth fault loop impedance testing</li>
                        <li>• RCD testing and verification</li>
                        <li>• Functional testing of protective devices</li>
                        <li>• Phase sequence verification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-md border border-purple-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Scope Determination Matrix
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left p-2 text-yellow-400">Work Type</th>
                          <th className="text-left p-2 text-yellow-400">Verification Required</th>
                          <th className="text-left p-2 text-yellow-400">Certificate Type</th>
                          <th className="text-left p-2 text-yellow-400">Building Control</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-gray-700">
                          <td className="p-2">New installation</td>
                          <td className="p-2">Full verification</td>
                          <td className="p-2">EIC</td>
                          <td className="p-2">Notification required</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">New circuit</td>
                          <td className="p-2">Full verification</td>
                          <td className="p-2">EIC</td>
                          <td className="p-2">May require notification</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">Minor addition</td>
                          <td className="p-2">Limited verification</td>
                          <td className="p-2">MEIWC</td>
                          <td className="p-2">Usually exempt</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">Consumer unit change</td>
                          <td className="p-2">Full verification</td>
                          <td className="p-2">EIC</td>
                          <td className="p-2">Notification required</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30 mt-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-400 mb-1">In-line Check:</p>
                    <p className="text-sm">👉 Question: When must initial verification take place — before or after energising an installation?</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 3 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">3. Mandatory Checks under BS 7671</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Comprehensive Verification Protocol (Chapter 61)
              </p>
              
              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3">⚠️ Sequential Requirements</h4>
                <p className="text-sm mb-3">
                  BS 7671 Chapter 61 mandates a specific sequence for verification activities. This sequence is designed 
                  to ensure safety and prevent damage to equipment. Deviation from this sequence may invalidate results 
                  and compromise safety.
                </p>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm font-semibold text-white">
                    Step 1: Visual Inspection (Installation de-energised) → Step 2: Electrical Testing
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    👁️ Phase 1: Visual Inspection (Regulation 611)
                  </h4>
                  <p className="text-sm mb-4">
                    Visual inspection must be carried out with the installation completely disconnected from the supply. 
                    This non-intrusive examination verifies compliance with design specifications and BS 7671 requirements.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Design Compliance Verification</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Selection and erection of equipment compliance</li>
                        <li>• Manufacturer's instructions adherence</li>
                        <li>• Environmental suitability (IP ratings, fire resistance)</li>
                        <li>• Cable selection for current-carrying capacity</li>
                        <li>• Protective device coordination</li>
                        <li>• Special location requirements (bathrooms, zones)</li>
                        <li>• Accessibility for operation and maintenance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Safety Systems Verification</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Direct contact protection (basic protection)</li>
                        <li>• Indirect contact protection (fault protection)</li>
                        <li>• RCD and protective device presence</li>
                        <li>• Earthing and equipotential bonding</li>
                        <li>• Fire barrier integrity maintenance</li>
                        <li>• Emergency switching and isolation</li>
                        <li>• Warning notices and safety signage</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-900/20 rounded border border-yellow-600/30">
                    <h6 className="font-semibold text-yellow-400 mb-2">Critical Visual Checks</h6>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-white">Connections</p>
                        <p>All terminations secure, correctly identified, adequate insulation</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white">Conductors</p>
                        <p>Correct size, type, identification, support at ≤300mm intervals</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white">Protection</p>
                        <p>Correct ratings, discrimination, labelling, test button functionality</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    🔬 Phase 2: Electrical Testing (Regulation 612)
                  </h4>
                  <p className="text-sm mb-4">
                    Electrical testing follows a prescribed sequence to verify the electrical performance and safety 
                    characteristics of the installation. Each test builds upon the previous, ensuring comprehensive validation.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Dead Testing Sequence (Installation Isolated)</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-semibold text-white mb-2">1. Continuity of Protective Conductors</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Earth continuity conductor (CPC) integrity</li>
                            <li>• Main earthing terminal connections</li>
                            <li>• Equipotential bonding continuity</li>
                            <li>• Maximum resistance: (R1 + R2) values</li>
                            <li>• Test current: 200mA minimum</li>
                          </ul>
                          
                          <h6 className="font-semibold text-white mb-2 mt-3">2. Ring Final Circuit Continuity</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Line, neutral, and CPC ring integrity</li>
                            <li>• Cross-connection identification</li>
                            <li>• Socket outlet polarity verification</li>
                            <li>• (R1 + R2) uniformity across ring</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">3. Insulation Resistance</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Line to neutral: ≥1MΩ (SELV/PELV: ≥0.5MΩ)</li>
                            <li>• Line to earth: ≥1MΩ</li>
                            <li>• Neutral to earth: ≥1MΩ</li>
                            <li>• Test voltage: 250V DC (≤50V), 500V DC (&gt;50V≤500V)</li>
                            <li>• Electronic equipment disconnection required</li>
                          </ul>
                          
                          <h6 className="font-semibold text-white mb-2 mt-3">4. Polarity Verification</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Single-pole devices in line conductor only</li>
                            <li>• Edison screw lampholders correct polarity</li>
                            <li>• Socket outlet polarity verification</li>
                            <li>• Three-phase supply correct sequence</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Live Testing Sequence (Installation Energised)</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-semibold text-white mb-2">5. Earth Fault Loop Impedance (Zs)</h6>
                          <ul className="text-sm space-y-1">
                            <li>• External loop impedance (Ze) measurement</li>
                            <li>• Circuit loop impedance verification</li>
                            <li>• Maximum Zs values per BS 7671 Table 41.3</li>
                            <li>• Temperature correction factors</li>
                            <li>• RCD-protected circuit considerations</li>
                          </ul>
                          
                          <h6 className="font-semibold text-white mb-2 mt-3">6. Additional Protection (RCD Testing)</h6>
                          <ul className="text-sm space-y-1">
                            <li>• General purpose RCDs: ≤300ms at IΔn</li>
                            <li>• Type AC, A, F, B characteristics</li>
                            <li>• Trip time verification at ½IΔn, IΔn, 5IΔn</li>
                            <li>• Non-trip verification at ½IΔn</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">7. Phase Sequence (Three-Phase)</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Clockwise rotation verification</li>
                            <li>• Motor direction confirmation</li>
                            <li>• Three-phase equipment compatibility</li>
                          </ul>
                          
                          <h6 className="font-semibold text-white mb-2 mt-3">8. Functional Testing</h6>
                          <ul className="text-sm space-y-1">
                            <li>• RCD test button operation</li>
                            <li>• Emergency stop button functionality</li>
                            <li>• Isolation and switching device operation</li>
                            <li>• Control circuit verification</li>
                            <li>• Warning device functionality</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30 mt-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-400 mb-1">In-line Check:</p>
                    <p className="text-sm">👉 Question: Name two tests included in the initial verification process.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 4 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">4. Recording Results</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Legal Documentation and Accountability Framework
              </p>
              
              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3">⚖️ Legal Status of Certification</h4>
                <p className="text-sm mb-3">
                  Electrical installation certificates are legal documents that can be used in criminal and civil 
                  proceedings. The competent person signing these certificates assumes full legal responsibility 
                  for the accuracy of all recorded information and the safety of the installation.
                </p>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm font-semibold text-white">
                    "I being the person responsible for the inspection and testing of the electrical installation... 
                    certify that the work for which I have been responsible is to the best of my knowledge and belief 
                    in accordance with BS 7671."
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">📋 Certificate Types and Applications</h4>
                  
                  <div className="grid gap-4">
                    <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Electrical Installation Certificate (EIC)</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-semibold text-white mb-2">When Required</h6>
                          <ul className="text-sm space-y-1">
                            <li>• New electrical installations</li>
                            <li>• Complete rewiring projects</li>
                            <li>• New circuits added to existing installations</li>
                            <li>• Consumer unit replacements</li>
                            <li>• Major alterations involving design work</li>
                            <li>• Installation of new distribution boards</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">Documentation Components</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Designer's responsibility declaration</li>
                            <li>• Constructor's responsibility declaration</li>
                            <li>• Inspector and tester's declaration</li>
                            <li>• Schedule of inspections performed</li>
                            <li>• Schedule of test results</li>
                            <li>• Circuit charts and maximum Zs values</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Minor Electrical Installation Works Certificate (MEIWC)</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-semibold text-white mb-2">When Required</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Addition of socket outlets to existing circuits</li>
                            <li>• Addition of lighting points to existing circuits</li>
                            <li>• Installation of fused spurs</li>
                            <li>• Replacement of accessories (like-for-like)</li>
                            <li>• Minor alterations not involving new circuits</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">Limitations</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Cannot be used for new circuits</li>
                            <li>• Not valid for special locations</li>
                            <li>• Limited testing requirements</li>
                            <li>• Single-page format</li>
                            <li>• Single responsible person only</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">🎯 Competent Person Responsibilities</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-900/20 p-4 rounded border border-red-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Legal Accountability</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Criminal liability</strong> under Health and Safety legislation</li>
                        <li>• <strong>Professional indemnity</strong> insurance requirements</li>
                        <li>• <strong>Competence demonstration</strong> through qualifications and experience</li>
                        <li>• <strong>Continuous professional development</strong> obligations</li>
                        <li>• <strong>Registration scheme</strong> membership (NICEIC, NAPIT, etc.)</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Technical Requirements</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Understanding of BS 7671</strong> current edition and amendments</li>
                        <li>• <strong>Testing competence</strong> using calibrated instruments</li>
                        <li>• <strong>Risk assessment</strong> and method statement preparation</li>
                        <li>• <strong>Design verification</strong> and calculation checking</li>
                        <li>• <strong>Defect identification</strong> and remedial action specification</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-purple-900/20 p-4 rounded border border-purple-600/30">
                    <h5 className="font-semibold text-yellow-400 mb-3">Quality Assurance Requirements</h5>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <h6 className="font-semibold text-white mb-2">Documentation</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Accurate test result recording</li>
                          <li>• Clear defect identification</li>
                          <li>• Limitation statements</li>
                          <li>• Recommendation priorities</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold text-white mb-2">Instrument Calibration</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Annual calibration certificates</li>
                          <li>• Traceability to national standards</li>
                          <li>• Accuracy verification</li>
                          <li>• Instrument maintenance records</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold text-white mb-2">Verification Process</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Independent verification checks</li>
                          <li>• Peer review procedures</li>
                          <li>• Client communication</li>
                          <li>• Follow-up recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">📊 Future Baseline Establishment</h4>
                  <p className="text-sm mb-4">
                    Initial verification certificates serve as the benchmark for all future electrical safety assessments. 
                    This baseline data is critical for:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-2">Periodic Inspection (EICR)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Deterioration assessment</li>
                        <li>• Performance comparison</li>
                        <li>• Trend analysis</li>
                        <li>• Maintenance planning</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-2">Insurance Claims</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Installation standards proof</li>
                        <li>• Compliance verification</li>
                        <li>• Risk assessment support</li>
                        <li>• Liability determination</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded border border-orange-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-2">Property Transactions</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Due diligence evidence</li>
                        <li>• Safety assurance</li>
                        <li>• Value protection</li>
                        <li>• Legal compliance proof</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30 mt-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-400 mb-1">In-line Check:</p>
                    <p className="text-sm">👉 Question: What certificate is normally issued after initial verification of a new installation?</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comprehensive Practical Guidance */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Comprehensive Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              {/* Pre-Verification Safety Protocols */}
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Pre-Verification Safety Protocols
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Risk Assessment Requirements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Complete site-specific risk assessment before commencing</li>
                      <li>• Identify hazardous areas (flammable atmospheres, wet locations)</li>
                      <li>• Assess structural integrity and access safety</li>
                      <li>• Verify adequate lighting for inspection activities</li>
                      <li>• Ensure emergency procedures and first aid provisions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Personal Safety Equipment</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Voltage detector (proving unit and test leads)</li>
                      <li>• Insulated tools and appropriate PPE</li>
                      <li>• Non-conductive ladder or access equipment</li>
                      <li>• Torch/headlight for inspection in dark areas</li>
                      <li>• Emergency contact procedures established</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Equipment Calibration Procedures */}
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Test Equipment Calibration and Verification</h4>
                <div className="grid gap-4">
                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                    <h5 className="font-semibold text-white mb-2">Before Each Use Checks</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Verify calibration certificate validity (annual requirement)</li>
                      <li>• Check test leads for damage or insulation breakdown</li>
                      <li>• Perform instrument self-test and battery check</li>
                      <li>• Test on known live and dead sources</li>
                      <li>• Document equipment serial numbers and calibration dates</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Verification Workflow */}
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Step-by-Step Verification Workflow</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h6 className="font-semibold text-white">Pre-Verification Planning</h6>
                      <p className="text-sm text-gray-300">Review design drawings, specifications, and any previous certificates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h6 className="font-semibold text-white">Isolation and Safety</h6>
                      <p className="text-sm text-gray-300">Isolate all circuits, lock off, and verify dead using appropriate test equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h6 className="font-semibold text-white">Visual Inspection</h6>
                      <p className="text-sm text-gray-300">Complete systematic visual inspection using BS 7671 Schedule of Inspections</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h6 className="font-semibold text-white">Dead Testing</h6>
                      <p className="text-sm text-gray-300">Conduct all dead tests: continuity, insulation resistance, polarity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <h6 className="font-semibold text-white">Live Testing</h6>
                      <p className="text-sm text-gray-300">Carefully energise for live tests: earth fault loop impedance, RCD testing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">6</div>
                    <div>
                      <h6 className="font-semibold text-white">Documentation</h6>
                      <p className="text-sm text-gray-300">Complete certificates, provide client documentation, and handover procedures</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Pitfalls and Solutions */}
              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Common Pitfalls and Prevention</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Frequently Overlooked Items</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Continuity of protective conductors in steel conduit systems</li>
                      <li>• RCD testing on circuits with electronic equipment</li>
                      <li>• Verification of AFDD operation where installed</li>
                      <li>• Checking surge protection device status indicators</li>
                      <li>• Confirming compatibility of LED drivers with dimming systems</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Professional Standards</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Never sign certificates for work not personally verified</li>
                      <li>• Maintain detailed records beyond minimum legal requirements</li>
                      <li>• Seek peer review for complex or unusual installations</li>
                      <li>• Update knowledge regularly through CPD activities</li>
                      <li>• Maintain professional indemnity insurance coverage</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Client Communication Procedures */}
              <div className="bg-green-900/20 p-4 rounded-md border border-green-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Client Communication and Handover</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-white mb-2">During Verification</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Explain any defects found and required remedial work</li>
                      <li>• Provide realistic timescales for completion</li>
                      <li>• Discuss any design changes that may be necessary</li>
                      <li>• Keep client informed of progress and any delays</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Certificate Handover</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Explain certificate contents and their significance</li>
                      <li>• Provide guidance on periodic inspection requirements</li>
                      <li>• Supply operation and maintenance instructions</li>
                      <li>• Establish ongoing maintenance and support arrangements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Check 2 */}
          <Card 
            className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
            onClick={() => setExpandedCheck(expandedCheck === 1 ? null : 1)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-yellow-400" />
                  Interactive Check: Work Categories
                </div>
                {expandedCheck === 1 ? 
                  <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                  <ChevronRight className="h-4 w-4 text-yellow-400" />
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-white mb-3">{inlineChecks[1].question}</p>
              {expandedCheck === 1 && (
                <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                  <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                  <p className="text-sm text-white">{inlineChecks[1].answer}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comprehensive Real World Example */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Case Study: Manchester Office Complex
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card p-4 rounded border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Project Background</h4>
                <p className="text-sm mb-2">
                  <strong>Location:</strong> 12-storey commercial office building, Manchester city centre
                </p>
                <p className="text-sm mb-2">
                  <strong>Work Scope:</strong> Complete electrical fit-out for floors 8-10 (3,000m²)
                </p>
                <p className="text-sm mb-2">
                  <strong>Circuits Installed:</strong> 48 lighting circuits, 36 power circuits, 12 HVAC circuits, emergency lighting, fire alarm, security systems
                </p>
                <p className="text-sm">
                  <strong>Timeline:</strong> 8-week installation with critical handover deadline
                </p>
              </div>

              <div className="bg-red-900/20 p-4 rounded border border-red-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Critical Discovery During Verification</h4>
                <p className="text-sm mb-3">
                  During initial verification, the electrician discovered multiple serious issues that would have caused significant problems:
                </p>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Polarity Reversal:</strong> 12 lighting circuits had live and neutral reversed at distribution board</li>
                  <li>• <strong>Earth Fault:</strong> Main earthing conductor had poor connection (resistance &gt;1Ω)</li>
                  <li>• <strong>RCD Issues:</strong> Two RCDs failed to trip within required time limits</li>
                  <li>• <strong>Labelling:</strong> 60% of circuits incorrectly identified in distribution boards</li>
                  <li>• <strong>Cable Damage:</strong> Three cables damaged during ceiling installation</li>
                </ul>
              </div>

              <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Response and Resolution</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Immediate Actions</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Installation remained isolated until all defects corrected</li>
                      <li>• Client immediately notified with written defect report</li>
                      <li>• Additional 5 days allocated for remedial work</li>
                      <li>• Re-verification scheduled after corrections</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Corrective Measures</h5>
                    <ul className="text-sm space-y-1">
                      <li>• All circuits re-terminated and polarity verified</li>
                      <li>• Main earthing connection remade and tested</li>
                      <li>• Faulty RCDs replaced and functionally tested</li>
                      <li>• Complete circuit schedule updated and verified</li>
                      <li>• Damaged cables replaced with new runs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Consequences Avoided and Lessons Learned</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Potential Consequences Prevented</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Electric shock risk to 300+ office workers from polarity issues</li>
                      <li>• Fire risk from poor earthing and potential fault escalation</li>
                      <li>• £50,000+ equipment damage from inadequate fault protection</li>
                      <li>• Legal liability and prosecution under EaWR 1989</li>
                      <li>• Insurance claim rejection due to non-compliant installation</li>
                      <li>• Business disruption and reputational damage</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Professional Learning Points</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Initial verification saved significant costs and prevented injuries</li>
                      <li>• Client appreciated professional approach and thorough reporting</li>
                      <li>• Project completed successfully with proper certification</li>
                      <li>• Ongoing maintenance contract secured due to professional standards</li>
                      <li>• Case study used for apprentice training within company</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Check 3 */}
          <Card 
            className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
            onClick={() => setExpandedCheck(expandedCheck === 2 ? null : 2)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-yellow-400" />
                  Interactive Check: Certification Authority
                </div>
                {expandedCheck === 2 ? 
                  <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                  <ChevronRight className="h-4 w-4 text-yellow-400" />
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-white mb-3">{inlineChecks[2].question}</p>
              {expandedCheck === 2 && (
                <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                  <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                  <p className="text-sm text-white">{inlineChecks[2].answer}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <ul className="space-y-2">
                <li>• Initial verification is a legal and safety requirement under BS 7671</li>
                <li>• Must be completed before energising new circuits or installations</li>
                <li>• Includes both visual inspections and electrical testing</li>
                <li>• Results must be recorded on the correct certificate</li>
                <li>• Proper verification protects clients, end-users, and electricians</li>
              </ul>
            </CardContent>
          </Card>

          {/* Knowledge Assessment */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Knowledge Assessment: Initial Verification Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BS7671Module6Section1Quiz />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <div></div>
            <Link to="../bs7671-module-6-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module6Section1;