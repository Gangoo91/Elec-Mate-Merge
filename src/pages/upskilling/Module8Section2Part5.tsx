import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8Section2Part5 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="module-8/section-2">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hints & Tips
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Using Regulations to Back Up Your Answers
                </h1>
                <p className="text-lg sm:text-xl text-white break-words">
                  Section 5 - Leveraging BS 7671 to support your responses
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                Section 2.5
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">What This Helps With</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p>Shows you how to sound confident and accurate in written answers — even if you're unsure. Proper regulatory language can turn a weak answer into a passing one.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Professional Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Use professional phrasing:</strong> "As required by BS 7671, this would not be compliant due to..."</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Reference specific regulations:</strong> "Regulation 514.11.1 requires..." (if you're certain)</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Use standard phrases:</strong> "This would require a C2 observation as it presents a potential risk"</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Avoid weak language:</strong> Never say "I think..." — say "This installation would not meet requirements"</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>When in doubt, use safety logic:</strong> protection, isolation, and disconnection time principles</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Key Regulatory Phrases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Copy These Phrases:</p>
                <ul className="space-y-2 text-white text-sm">
                  <li><strong>"Does not comply with BS 7671 requirements"</strong></li>
                  <li><strong>"Presents a potential danger and requires immediate attention"</strong></li>
                  <li><strong>"Would not provide adequate protection in the event of a fault"</strong></li>
                  <li><strong>"Fails to meet the disconnection time requirements"</strong></li>
                  <li><strong>"Does not provide adequate earthing arrangements"</strong></li>
                  <li><strong>"Would result in a non-compliant installation"</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Common Regulation References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Part 4 - Protection for Safety</p>
                    <ul className="text-sm text-white space-y-1">
                    <li>410 - General protective measures</li>
                    <li>411 - Automatic disconnection</li>
                    <li>414 - Additional protection (RCD)</li>
                    <li>418 - TT systems</li>
                  </ul>
                </div>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Part 5 - Selection & Erection</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>514 - Earthing arrangements</li>
                      <li>526 - Electrical connections</li>
                      <li>543 - Protective conductors</li>
                      <li>559 - Luminaires & lighting</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white"><strong>Only reference numbers you're certain about</strong> — wrong reg numbers lose marks</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Inspection Codes (C1, C2, C3)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <p className="text-red-400 font-semibold mb-1">C1 - Danger Present</p>
                  <p className="text-white text-sm">Immediate action required. Installation unsafe.</p>
                  <p className="text-white text-sm italic">Example: Live parts accessible, no RCD protection in bathroom</p>
                </div>
                <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                  <p className="text-orange-400 font-semibold mb-1">C2 - Potentially Dangerous</p>
                  <p className="text-white text-sm">Urgent remedial action required.</p>
                  <p className="text-white text-sm italic">Example: No CPC, high Zs values, incorrect polarity</p>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-400/30">
                  <p className="text-yellow-400 font-semibold mb-1">C3 - Improvement Recommended</p>
                  <p className="text-white text-sm">Does not comply with current standards.</p>
                  <p className="text-white text-sm italic">Example: Old-style consumer unit, lack of RCD on some circuits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 7671 Structure - Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Part 1 - Scope & Definitions</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>110 - Introduction and scope</li>
                      <li>120 - Definitions</li>
                      <li>130 - Principles</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Part 2 - Assessment</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>130 - General characteristics</li>
                      <li>131 - Purpose, supplies and structure</li>
                      <li>132 - Nature of demand</li>
                      <li>133 - Continuity of service</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Part 3 - Assessment of Conditions</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>310 - Sequence of tests</li>
                      <li>320 - General</li>
                      <li>330 - Environmental conditions</li>
                      <li>340 - Compatibility</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Part 6 - Inspection & Testing</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>610 - Initial verification</li>
                      <li>620 - Initial verification procedures</li>
                      <li>630 - Periodic inspection and testing</li>
                    </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Regulatory Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Professional Phrases for Different Situations:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-semibold mb-1">For Earthing Issues:</p>
                    <p className="text-white text-sm italic">"In accordance with Regulation 411.3.1.1, protective equipotential bonding is required to ensure all exposed-conductive-parts are at the same potential under fault conditions."</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">For RCD Requirements:</p>
                    <p className="text-white text-sm italic">"Regulation 411.3.3 requires additional protection by RCD not exceeding 30mA for socket outlets likely to supply portable equipment outdoors."</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">For Cable Installation:</p>
                    <p className="text-white text-sm italic">"The installation method does not comply with the requirements of Chapter 52, which specifies appropriate cable selection and installation methods."</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Special Locations Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Section 701 - Bathrooms</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Zone 0: Inside bath/shower</li>
                      <li>Zone 1: Above bath to 2.25m</li>
                      <li>Zone 2: 0.6m beyond zones 0&1</li>
                      <li>30mA RCD protection required</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Section 704 - Construction Sites</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Reduced low voltage systems</li>
                      <li>Assembly and socket-outlets</li>
                      <li>External influences</li>
                      <li>Additional protection requirements</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Section 705 - Agricultural</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Equipotential bonding</li>
                      <li>Additional protection by RCD</li>
                      <li>Isolation and switching</li>
                      <li>Socket-outlet requirements</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Section 708 - Car Parks</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Cable installation methods</li>
                      <li>Fire risk considerations</li>
                      <li>Emergency lighting requirements</li>
                      <li>Ventilation coordination</li>
                    </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Testing Standards Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Key Testing Standards to Reference:</p>
                <ul className="space-y-2 text-white text-sm">
                  <li><strong>BS EN 61557 series:</strong> Electrical safety in low voltage distribution systems</li>
                  <li><strong>GS 38:</strong> Electrical test equipment for use by electricians</li>
                  <li><strong>BS 7909:</strong> Code of practice for temporary electrical systems</li>
                  <li><strong>IET Guidance Note 3:</strong> Inspection and Testing procedures</li>
                </ul>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Integration tip:</strong> "In accordance with BS EN 61557-4, insulation resistance measurements shall be..."</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Practical Regulation Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="text-white font-semibold mb-2">Scenario: Kitchen Socket Installation</p>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-white text-sm"><strong>Question:</strong> "Is RCD protection required for a socket outlet above a kitchen worktop?"</p>
                    <p className="text-yellow-400 text-sm mt-2"><strong>Regulatory Answer:</strong></p>
                    <p className="text-white text-sm italic">"Regulation 411.3.3 requires additional protection by RCD not exceeding 30mA for socket outlets in domestic premises. While kitchens are not classified as special locations under Section 7, the socket outlet installation must comply with general RCD requirements for socket outlets likely to supply portable equipment."</p>
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold mb-2">Scenario: Garage Consumer Unit</p>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-white text-sm"><strong>Question:</strong> "Can a plastic consumer unit be installed in a garage?"</p>
                    <p className="text-yellow-400 text-sm mt-2"><strong>Regulatory Answer:</strong></p>
                    <p className="text-white text-sm italic">"Regulation 421.1.201 requires consumer units in domestic premises to have enclosures manufactured from non-combustible material or enclosed in a cabinet constructed of non-combustible material. This applies to all consumer units within domestic premises, including garages integral to the dwelling."</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Documentation and Certification Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Professional Certification Phrases:</p>
                <ul className="space-y-2 text-white text-sm">
                  <li><strong>"I certify that the work for which I have been responsible..."</strong></li>
                  <li><strong>"...has been designed, constructed, inspected and tested..."</strong></li>
                  <li><strong>"...in accordance with BS 7671:2018+A2:2022..."</strong></li>
                  <li><strong>"The installation is suitable for continued service..."</strong></li>
                  <li><strong>"Subject to the limitations and recommendations contained herein..."</strong></li>
                </ul>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Legal significance:</strong> These phrases carry legal weight - understand their implications</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Answer Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-2">For High Zs Values:</p>
                <p className="text-white text-sm italic">"This exceeds the maximum Zs value permitted for this type of protective device. The circuit may not disconnect within the required time under fault conditions and would be classified as C2."</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-2">For Missing Earthing:</p>
                <p className="text-white text-sm italic">"The absence of protective conductor connectivity presents a danger as exposed metalwork could become live under fault conditions. This requires immediate attention - C1 classification."</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-2">For RCD Issues:</p>
                <p className="text-white text-sm italic">"Additional protection by RCD is required for this circuit type under current BS 7671 requirements. Failure to provide this protection would result in C2 classification."</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Extended Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">The Zs Value Question</p>
                <p className="mb-3">You're asked about an incorrect Zs value. You don't know the exact maximum permitted value. Instead of guessing, you write:</p>
                <div className="bg-card p-4 rounded-lg border border-gray-600 italic">
                  <p>"This reading exceeds the maximum Zs value permitted for a Type B circuit breaker of this rating. Under fault conditions, the protective device may not disconnect within the required time as specified in BS 7671. This presents a potentially dangerous situation and would require a C2 observation code. Immediate remedial action would be required to reduce the earth fault loop impedance to within acceptable limits."</p>
                </div>
                <p className="mt-3 text-sm">This answer shows understanding without stating specific values you're uncertain about.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">One-liner</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="font-semibold text-yellow-400">Even when unsure, talk like someone who's read the regs — it's often enough to pass the question.</p>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/inspection-testing-module-8-section-2-part-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card min-h-[48px]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Key Values
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/inspection-testing-module-8-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 min-h-[48px]">
                Back to Overview
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module8Section2Part5;