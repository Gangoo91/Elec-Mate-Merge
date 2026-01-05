import { BookOpen, FileText, AlertTriangle, CheckCircle, Shield, Settings, Eye, Cable } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ResultsDocumentationContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Legal Importance of Accurate Documentation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal Importance of Accurate Documentation</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              Electrical installation certificates are <strong>legal documents</strong> that may be scrutinised in court, 
              by insurance companies, or by regulatory authorities. Inaccurate or incomplete documentation can have 
              serious legal and financial consequences.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Legal Implications</h4>
                   <ul className="text-foreground text-sm sm:text-base space-y-1">
                    <li>• Criminal prosecution for false certification</li>
                    <li>• Civil liability for damages resulting from poor work</li>
                    <li>• Professional registration may be revoked</li>
                    <li>• Insurance claims may be invalidated</li>
                    <li>• Contracts may be terminated</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recording Test Values - The Fundamentals */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Recording Test Values - The Fundamentals</h3>
          <div className="space-y-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                The Golden Rule: Always Record Actual Values
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm sm:text-base">
                  Never write "pass", "OK", "satisfactory" or use tick marks instead of actual measured values. 
                  These subjective assessments provide no useful information and may be considered false certification.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                    <h5 className="text-red-200 font-medium mb-2">❌ Unacceptable</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      <li>• "OK" or "Pass"</li>
                      <li>• Tick marks (✓)</li>
                      <li>• "Within limits"</li>
                      <li>• "Satisfactory"</li>
                      <li>• Blank fields</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                    <h5 className="text-green-200 font-medium mb-2">✅ Acceptable</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      <li>• "1.23Ω" (actual Zs value)</li>
                      <li>• "2.4kA" (actual PFC value)</li>
                      <li>• "0.15MΩ" (actual IR value)</li>
                      <li>• "0.08Ω" (actual R1+R2 value)</li>
                      <li>• "N/A" (where test not applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Precision and Units
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm sm:text-base">
                  Record values to an appropriate level of precision and always include correct units:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                    <h5 className="text-blue-200 font-medium mb-2">Zs Values</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      <li>• Record to 2 decimal places</li>
                      <li>• Always include "Ω" unit</li>
                      <li>• Example: "1.23Ω"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                    <h5 className="text-green-200 font-medium mb-2">PFC Values</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      <li>• Record to 1 decimal place</li>
                      <li>• Include "kA" or "A" unit</li>
                      <li>• Example: "2.4kA"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                    <h5 className="text-yellow-200 font-medium mb-2">IR Values</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      <li>• Record to 2 decimal places</li>
                      <li>• Include "MΩ" or "GΩ" unit</li>
                      <li>• Example: "&gt;999MΩ"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparing Results Against Standards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Comparing Results Against BS7671 Standards</h3>
          <div className="space-y-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Earth Fault Loop Impedance (Zs) Limits
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm sm:text-base">
                  BS7671 Appendix 3 provides maximum Zs values for different protective devices. These values 
                  assume conductor temperature of 70°C under fault conditions.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-foreground font-medium py-2 px-3">Device Type</th>
                        <th className="text-left text-foreground font-medium py-2 px-3">Rating</th>
                        <th className="text-left text-foreground font-medium py-2 px-3">Max Zs (0.4s)</th>
                        <th className="text-left text-foreground font-medium py-2 px-3">Max Zs (5s)</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground text-sm sm:text-base">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 px-3">Type B MCB</td>
                        <td className="py-2 px-3">6A</td>
                        <td className="py-2 px-3 text-elec-yellow">7.67Ω</td>
                        <td className="py-2 px-3">30.68Ω</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 px-3">Type B MCB</td>
                        <td className="py-2 px-3">16A</td>
                        <td className="py-2 px-3 text-elec-yellow">2.87Ω</td>
                        <td className="py-2 px-3">11.50Ω</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 px-3">Type B MCB</td>
                        <td className="py-2 px-3">32A</td>
                        <td className="py-2 px-3 text-elec-yellow">1.44Ω</td>
                        <td className="py-2 px-3">5.75Ω</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Type B MCB</td>
                        <td className="py-2 px-3">40A</td>
                        <td className="py-2 px-3 text-elec-yellow">1.15Ω</td>
                        <td className="py-2 px-3">4.60Ω</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                  <p className="text-foreground text-sm sm:text-base">
                    <strong>Temperature Correction:</strong> Measured values should be significantly below these limits 
                    to account for conductor heating under fault conditions. A safety margin of 25% is recommended.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                Prospective Fault Current Limits
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm sm:text-base">
                  PFC values must not exceed the breaking capacity of protective devices:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                    <h5 className="text-blue-200 font-medium mb-2">Common MCB Ratings</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      <li>• Domestic: 6kA breaking capacity</li>
                      <li>• Enhanced domestic: 10kA</li>
                      <li>• Commercial: 16kA or 25kA</li>
                      <li>• Industrial: 36kA or higher</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                    <h5 className="text-red-200 font-medium mb-2">Failure Consequences</h5>
                    <ul className="text-foreground text-sm sm:text-base space-y-1">
                      <li>• Device destruction</li>
                      <li>• Fire risk</li>
                      <li>• Explosion hazard</li>
                      <li>• Inability to clear faults</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Types and Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Certificate Types and Documentation Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">EIC - Electrical Installation Certificate</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  For new installations or major alterations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Must include all test results in full detail
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Requires designer, installer, and inspector signatures
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Schedule of Test Results must be completed
                </li>
              </ul>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">MEIWC - Minor Electrical Installation Works Certificate</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  For additions to existing circuits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Single-sheet certificate format
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Must include specific test results for work area
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  No schedule required but key tests documented
                </li>
              </ul>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">EICR - Electrical Installation Condition Report</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  For periodic inspection and testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  May include sampling of circuits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Must identify code 1, 2, and 3 observations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Schedule shows representative test results
                </li>
              </ul>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">Schedule of Test Results</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Detailed record of all test measurements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Must include circuit details and cable specifications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Record test method variations and limitations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Note any deviations from standard procedures
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* When Results Fail - Actions Required */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">When Results Fail - Actions Required</h3>
          <div className="space-y-4">
            
            <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <h4 className="text-red-200 font-medium">Immediate Response to Test Failures</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Any test result that falls outside acceptable limits requires immediate investigation 
                    and documentation. You cannot issue a satisfactory certificate with failed test results.
                  </p>
                  
                  <ol className="space-y-2 text-foreground text-sm sm:text-base">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                      Stop work immediately and make the installation safe
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                      Investigate the root cause of the failure
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                      Document the fault and proposed remedial action
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                      Carry out necessary repairs or modifications
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                      Retest to confirm compliance before certification
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Cable className="h-5 w-5 text-elec-yellow" />
                Common Failure Scenarios and Solutions
              </h4>
              <div className="space-y-3">
                
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                  <h5 className="text-yellow-200 font-medium mb-2">High Zs Values</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-foreground text-sm sm:text-base mb-1">Possible causes:</p>
                      <ul className="text-foreground text-xs sm:text-sm space-y-1">
                        <li>• Poor earth connections</li>
                        <li>• Undersized protective conductors</li>
                        <li>• High supply Ze</li>
                        <li>• Damaged cables</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-foreground text-sm sm:text-base mb-1">Solutions:</p>
                      <ul className="text-foreground text-xs sm:text-sm space-y-1">
                        <li>• Improve earthing connections</li>
                        <li>• Install larger protective conductors</li>
                        <li>• Add RCD protection</li>
                        <li>• Replace damaged cables</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                  <h5 className="text-blue-200 font-medium mb-2">Excessive PFC Values</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-foreground text-sm sm:text-base mb-1">Immediate actions:</p>
                      <ul className="text-foreground text-xs sm:text-sm space-y-1">
                        <li>• Do not energise the installation</li>
                        <li>• Mark as dangerous</li>
                        <li>• Notify relevant parties</li>
                        <li>• Document thoroughly</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-foreground text-sm sm:text-base mb-1">Potential solutions:</p>
                      <ul className="text-foreground text-xs sm:text-sm space-y-1">
                        <li>• Upgrade protective devices</li>
                        <li>• Install current limiters</li>
                        <li>• Review supply arrangements</li>
                        <li>• Consider system design changes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Documentation and Storage */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Digital Documentation and Storage</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Modern testing equipment can store and transfer test results digitally, improving accuracy 
              and reducing transcription errors.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Digital Advantages</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Eliminates transcription errors</li>
                  <li>• Automatic calculation and comparison</li>
                  <li>• Timestamped results</li>
                  <li>• Easy backup and sharing</li>
                  <li>• Integration with certificate software</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Storage Requirements</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Keep digital copies secure</li>
                  <li>• Regular backup procedures</li>
                  <li>• Maintain for minimum periods</li>
                  <li>• Ensure data integrity</li>
                  <li>• Consider legal requirements</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-sm sm:text-base">
                <strong>Remember:</strong> Digital records are only as good as the original measurements. 
                Always ensure test equipment is properly calibrated and operated correctly.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};