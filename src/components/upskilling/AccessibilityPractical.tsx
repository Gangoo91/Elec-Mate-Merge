import { Wrench, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AccessibilityPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Learning Exercises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Exercise 1 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 1</Badge>
            <h3 className="text-foreground font-semibold">Accessibility Assessment Checklist</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-base sm:text-lg">
              Create a systematic approach to checking installation accessibility:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium text-lg">Physical Access:</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Working space clearances (700mm min.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Height accessibility (can reach safely)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>No obstructions blocking access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Adequate lighting for inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Safe access routes available</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium text-lg">Equipment Access:</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>All covers removable without damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Terminals visible and reachable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Test points accessible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Emergency controls readily accessible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">□</span>
                    <span>Isolation points clearly identified</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 2 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 2</Badge>
            <h3 className="text-foreground font-semibold">Label and Identification Audit</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-base sm:text-lg">
              Practice conducting a comprehensive labelling assessment:
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Distribution Board Assessment:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-foreground text-base font-medium mb-2">Check for:</h5>
                      <ul className="text-foreground text-sm sm:text-base space-y-1">
                        <li>• Circuit designation labels</li>
                        <li>• Protective device ratings</li>
                        <li>• RCD/RCBO test notices</li>
                        <li>• Phase identification</li>
                        <li>• Emergency lighting circuits</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-foreground text-base font-medium mb-2">Quality Assessment:</h5>
                      <ul className="text-foreground text-sm sm:text-base space-y-1">
                        <li>• Legibility of text</li>
                        <li>• Durability of labels</li>
                        <li>• Correct positioning</li>
                        <li>• Completeness of information</li>
                        <li>• Compliance with standards</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 3 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 3</Badge>
            <h3 className="text-foreground font-semibold">Accessibility Problem Scenarios</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-base sm:text-lg">
              Analyse different accessibility challenges and determine appropriate actions:
            </p>
            <div className="space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <h4 className="text-red-400 font-medium mb-2 text-base">Scenario A: Consumer Unit Behind Fixed Furniture</h4>
                <p className="text-foreground text-sm sm:text-base mb-2 leading-relaxed">
                  A kitchen consumer unit is installed behind built-in cabinets with no access panel.
                </p>
                <p className="text-red-400 text-sm sm:text-base">
                  <strong>Action Required:</strong> Code C2 - immediate remedial action required. Access must be provided.
                </p>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium mb-2 text-base">Scenario B: High-Mounted Distribution Board</h4>
                <p className="text-foreground text-sm sm:text-base mb-2 leading-relaxed">
                  Industrial DB mounted 3m high with no permanent access platform.
                </p>
                <p className="text-yellow-400 text-sm sm:text-base">
                  <strong>Action Required:</strong> Code C3 - improvement recommended. Provide safe access method.
                </p>
              </div>
              <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                <h4 className="text-orange-400 font-medium mb-2 text-base">Scenario C: Missing Circuit Labels</h4>
                <p className="text-foreground text-sm sm:text-base mb-2 leading-relaxed">
                  All protective devices in commercial DB have no circuit identification labels.
                </p>
                <p className="text-orange-400 text-sm sm:text-base">
                  <strong>Action Required:</strong> Code C2 - potentially dangerous. Labels must be provided.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 4 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 4</Badge>
            <h3 className="text-foreground font-semibold">Access Planning Workshop</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-base sm:text-lg">
              Plan safe access strategies for different installation types:
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">Planning Considerations:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-foreground text-base font-medium mb-2">Safety Assessment:</h5>
                        <ul className="text-foreground text-sm sm:text-base space-y-1">
                          <li>• Risk assessment required?</li>
                          <li>• PPE and safety equipment needed</li>
                          <li>• Working at height considerations</li>
                          <li>• Confined space requirements</li>
                          <li>• Live working implications</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-foreground text-base font-medium mb-2">Practical Arrangements:</h5>
                        <ul className="text-foreground text-sm sm:text-base space-y-1">
                          <li>• Access equipment required</li>
                          <li>• Client coordination needed</li>
                          <li>• Additional time allowances</li>
                          <li>• Specialist assistance required</li>
                          <li>• Alternative inspection methods</li>
                        </ul>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-medium mb-2">Key Learning Points</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Accessibility must be verified before any electrical work begins</li>
                <li>• Proper labelling is essential for safety and maintenance</li>
                <li>• Inaccessible equipment creates significant safety and compliance issues</li>
                <li>• Always prioritise safety when assessing access requirements</li>
                <li>• Document all accessibility limitations clearly in inspection reports</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};