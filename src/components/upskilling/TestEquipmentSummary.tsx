import { FileText, CheckCircle, Lightbulb, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestEquipmentSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        {/* Key Learning Points */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Key Learning Points
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-xs sm:text-sm">
                  Proper test equipment setup is fundamental to obtaining accurate, reliable measurements 
                  and ensuring safe testing operations.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-xs sm:text-sm">
                  Regular calibration and daily verification checks are essential for maintaining 
                  measurement accuracy and traceability.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-xs sm:text-sm">
                  Test lead quality and condition directly affect measurement accuracy and safety, 
                  requiring regular inspection and maintenance.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-xs sm:text-sm">
                  Environmental conditions including temperature, humidity, and EMI can significantly 
                  affect measurement results and must be considered.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-xs sm:text-sm">
                  Comprehensive safety procedures are essential for live testing, including appropriate 
                  PPE, work procedures, and emergency protocols.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-xs sm:text-sm">
                  Systematic troubleshooting procedures help identify and resolve measurement issues 
                  quickly and effectively.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Safety Points */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Critical Safety Points
          </h3>
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  <strong>Live Testing Hazards:</strong> Live electrical testing presents risks of electric shock, 
                  arc flash, and equipment damage. Always follow comprehensive safety procedures.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  <strong>Equipment Failure:</strong> Uncalibrated or faulty equipment can provide misleading 
                  results that may indicate safety when dangerous conditions exist.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  <strong>Test Lead Damage:</strong> Damaged test leads can cause measurement errors and 
                  create dangerous conditions during testing operations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practice Guidelines */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Best Practice Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-200 font-medium mb-3">Equipment Management</h4>
              <ul className="text-foreground text-sm space-y-2">
                <li>• Maintain current calibration certificates</li>
                <li>• Perform daily verification checks</li>
                <li>• Keep detailed maintenance records</li>
                <li>• Use manufacturer-approved accessories</li>
                <li>• Store equipment in appropriate conditions</li>
              </ul>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="text-green-200 font-medium mb-3">Safety Excellence</h4>
              <ul className="text-foreground text-sm space-y-2">
                <li>• Always verify voltage before testing</li>
                <li>• Use appropriate PPE for conditions</li>
                <li>• Establish clear communication protocols</li>
                <li>• Prepare emergency response procedures</li>
                <li>• Maintain situational awareness</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Equipment Setup Checklist */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Essential Equipment Setup Checklist</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-foreground font-medium mb-3">Pre-Test Verification</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Equipment visual inspection completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Calibration certificate validity confirmed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Battery level adequate for testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Test leads inspected and verified</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-3">Configuration Setup</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Correct test function selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Appropriate voltage range configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Environmental conditions recorded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-foreground text-sm">Safety procedures implemented</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Standards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Professional Standards Compliance</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              <p className="text-foreground text-sm">
                <strong>GS 38 Requirements:</strong> Test equipment and test leads must comply with HSE Guidance Note GS 38 
                for electrical test equipment used by electricians, including appropriate safety categories and protection features.
              </p>
              <p className="text-foreground text-sm">
                <strong>BS 7671 Verification:</strong> Test equipment must be capable of performing all required tests 
                for initial verification and periodic inspection as specified in BS 7671 Part 6.
              </p>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                <p className="text-foreground text-sm">
                  <strong>Note:</strong> Professional competence includes not only knowing how to use test equipment, 
                  but also understanding its limitations, maintaining it properly, and interpreting results correctly 
                  in the context of electrical safety requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items for Practitioners */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Action Items for Practitioners</h3>
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-elec-yellow font-medium mb-2">Immediate Actions</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Review current equipment calibration status</li>
                  <li>• Inspect all test leads for damage</li>
                  <li>• Verify daily check procedures are in place</li>
                  <li>• Update safety procedures if necessary</li>
                </ul>
              </div>
              <div>
                <h4 className="text-elec-yellow font-medium mb-2">Ongoing Development</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Practice equipment setup procedures</li>
                  <li>• Study manufacturer operation manuals</li>
                  <li>• Monitor equipment performance trends</li>
                  <li>• Maintain comprehensive equipment records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section Conclusion */}
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
          <p className="text-foreground text-sm leading-relaxed">
            <strong>Section Conclusion:</strong> Proper test equipment setup and safety procedures are fundamental 
            to reliable electrical testing. By understanding equipment capabilities and limitations, maintaining 
            calibration standards, and implementing comprehensive safety procedures, practitioners ensure accurate 
            measurements while protecting themselves and electrical installations. The investment in proper equipment 
            management pays dividends in measurement reliability, safety assurance, and professional credibility.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};