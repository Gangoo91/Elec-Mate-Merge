
import { Eye, AlertTriangle, FileText, Tag, Shield, Wrench, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AccessibilityContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Eye className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Why Accessibility Matters */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Why Accessibility Matters</h3>
          <p className="text-foreground leading-relaxed text-base sm:text-lg">
            Inspection and testing cannot be done thoroughly—or safely—if you can't reach key parts of the installation. Inaccessible boards, switches, isolators, or junctions may hide defects and prevent complete testing.
          </p>
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <p className="text-blue-200 font-medium">
              BS 7671 requires that equipment be "readily accessible for inspection, testing, and maintenance."
            </p>
          </div>
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <p className="text-red-200 font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Legal Implication: Inadequate accessibility can result in incomplete certification and potential liability issues.
            </p>
          </div>
        </div>

        {/* Accessibility Requirements Detail */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Detailed Accessibility Requirements</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Distribution Boards & Consumer Units
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-foreground">
                <li>• Clear access for opening covers and testing</li>
                <li>• Adequate lighting for reading labels and conducting tests</li>
                <li>• Safe working space (minimum 0.6m clearance where practicable)</li>
                <li>• No obstructions preventing cover removal</li>
                <li>• Secure, stable access platforms where height requires</li>
              </ul>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                Main Switches & Isolators
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-foreground">
                <li>• Clearly visible and easily operated</li>
                <li>• Accessible in emergency situations</li>
                <li>• Not obstructed by furniture or equipment</li>
                <li>• Proper identification and labelling visible</li>
                <li>• Safe approach route maintained</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Accessibility Issues */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Common Accessibility Issues
          </h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-foreground font-medium mb-2">Physical Obstructions</h4>
                <ul className="space-y-2 text-foreground text-sm sm:text-base">
                  <li>• Distribution boards behind furniture or fixed equipment</li>
                  <li>• Terminations obscured by sealant or boxing-in</li>
                  <li>• Isolators blocked by racking or storage</li>
                  <li>• Junction boxes above false ceilings without access panels</li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-2">Safety Concerns</h4>
                <ul className="space-y-2 text-foreground text-sm sm:text-base">
                  <li>• Unsafe access routes (unstable ladders, confined spaces)</li>
                  <li>• Live equipment in proximity to test points</li>
                  <li>• Inadequate lighting for safe working</li>
                  <li>• Hazardous environmental conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Assessment Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Practical Assessment Steps
          </h3>
          <div className="space-y-3">
            {[
              {
                step: "1. Visual Survey",
                description: "Walk through the installation and identify all distribution boards, isolators, and key test points",
                details: "Document locations and assess initial accessibility without attempting access"
              },
              {
                step: "2. Physical Access Check",
                description: "Attempt to safely access each identified component",
                details: "Check for obstructions, adequate working space, and lighting conditions"
              },
              {
                step: "3. Safety Assessment",
                description: "Evaluate risks associated with accessing each component",
                details: "Consider height, proximity to live parts, environmental hazards, and required PPE"
              },
              {
                step: "4. Documentation",
                description: "Record any limitations or safety concerns identified",
                details: "Photograph inaccessible areas and note specific remedial actions required"
              }
            ].map((step, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-semibold mb-2">{step.step}</h4>
                <p className="text-foreground text-sm sm:text-base mb-2">{step.description}</p>
                <p className="text-foreground text-xs">{step.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What to Do If Access Is Restricted */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">What to Do If Access Is Restricted</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Immediate Actions
              </h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Record it as a limitation in your inspection report</li>
                <li>• Photograph the obstruction for evidence</li>
                <li>• Inform the client immediately</li>
                <li>• Never force access or remove covers unsafely</li>
              </ul>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">Critical Impact</h4>
              <p className="text-sm text-foreground mb-2">
                If key testing areas are inaccessible, you may be unable to verify compliance.
              </p>
              <p className="text-xs text-red-300">
                This can result in an unsatisfactory inspection outcome.
              </p>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">Next Steps</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Request client to provide safe access</li>
                <li>• Arrange return visit if necessary</li>
                <li>• Consider partial certification options</li>
                <li>• Document time and cost implications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comprehensive Labelling Requirements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Comprehensive Labelling Requirements Under BS 7671
          </h3>
          
          <div className="space-y-4">
            {/* Essential Labels */}
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-3">Essential Labels (Mandatory)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-green-200 font-medium mb-2">Circuit Identification</h5>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Every protective device must be clearly labelled</li>
                    <li>• Circuit purpose (e.g., "Ground Floor Sockets")</li>
                    <li>• Area served (e.g., "Kitchen Ring Main")</li>
                    <li>• Load type where relevant (e.g., "Immersion Heater")</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-green-200 font-medium mb-2">Main Controls</h5>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Main switch clearly identified</li>
                    <li>• Isolation points for different areas</li>
                    <li>• Emergency stop controls</li>
                    <li>• Generator changeover switches</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Safety Labels */}
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-3">Safety Labels & Warnings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-red-200 font-medium mb-2">RCD Test Notices</h5>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• "Test Quarterly" notice required</li>
                    <li>• Operating instructions clearly displayed</li>
                    <li>• Contact details for faults</li>
                    <li>• Date of last professional test</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-200 font-medium mb-2">Special System Warnings</h5>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• TT earthing system warnings</li>
                    <li>• Dual supply warnings</li>
                    <li>• PV system isolation notices</li>
                    <li>• High fault current warnings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Labels */}
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-3">Information & Reference Labels</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-blue-200 font-medium mb-2">Installation Details</h5>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Installation certificate reference</li>
                    <li>• Date of installation/testing</li>
                    <li>• Next inspection due date</li>
                    <li>• Installer contact information</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-200 font-medium mb-2">Technical Information</h5>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Supply characteristics (TN-S, TN-C-S, etc.)</li>
                    <li>• Earth fault loop impedance values</li>
                    <li>• Maximum demand calculations</li>
                    <li>• Protective device ratings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label Quality and Durability */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Label Quality and Durability Standards</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-foreground font-medium mb-2">Acceptable Labels</h4>
                <ul className="space-y-2 text-green-300 text-sm">
                  <li>• Permanent engraved labels</li>
                  <li>• Laminated printed labels</li>
                  <li>• Self-adhesive labels with protective coating</li>
                  <li>• Durable vinyl labels</li>
                  <li>• Labels appropriate for environmental conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-2">Unacceptable Labels</h4>
                <ul className="space-y-2 text-red-300 text-sm">
                  <li>• Handwritten labels in pencil or pen</li>
                  <li>• Temporary adhesive notes</li>
                  <li>• Faded or illegible labels</li>
                  <li>• Labels not secured properly</li>
                  <li>• Labels inappropriate for environment (e.g., paper in damp areas)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Proper Labelling Is Crucial */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Why Proper Labelling Is Crucial</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Safety During Testing</p>
                    <p className="text-foreground text-sm">Prevents incorrect assumptions and ensures safe isolation procedures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Time Efficiency</p>
                    <p className="text-foreground text-sm">Reduces time spent tracing circuits and identifying components</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Future Maintenance</p>
                    <p className="text-foreground text-sm">Essential for ongoing maintenance, fault-finding, and modifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Legal Compliance</p>
                    <p className="text-foreground text-sm">Supports certification accuracy and professional accountability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Labelling Assessment */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Practical Labelling Assessment Process</h3>
          <div className="space-y-3">
            {[
              {
                phase: "Initial Survey",
                tasks: ["Identify all distribution boards and control panels", "Check for presence of circuit schedules", "Verify main switch identification", "Look for obvious missing labels"]
              },
              {
                phase: "Detailed Verification",
                tasks: ["Cross-reference labels with actual circuits", "Test label accuracy by switching circuits", "Check label durability and legibility", "Verify special system warnings are present"]
              },
              {
                phase: "Documentation Review",
                tasks: ["Compare labels with installation certificates", "Check compliance with current standards", "Identify discrepancies or updates needed", "Record non-conformities for client attention"]
              }
            ].map((phase, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-semibold mb-2">{phase.phase}</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-foreground text-sm flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
