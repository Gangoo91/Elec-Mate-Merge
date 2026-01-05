import { FileText, CheckCircle, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FaultCurrentSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Key Learning Points */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Key Learning Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Prospective fault current testing verifies that protective devices can safely interrupt 
                  fault currents and have adequate breaking capacity.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Ipsc (short-circuit current) is typically higher than Ipef (earth fault current) 
                  due to different fault path impedances.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Modern supplies often have very low impedance, resulting in high fault currents 
                  that require high breaking capacity protective devices.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Temperature effects must be considered as conductor resistance increases with 
                  temperature, reducing fault current levels.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Testing should be performed at critical points including the origin, distribution 
                  boards, and where protective device ratings change.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Documentation must include test results, protective device compliance, and any 
                  remedial actions required for non-compliant installations.
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
                  <strong>Breaking Capacity Exceeded:</strong> If fault current exceeds protective device 
                  breaking capacity, the device may fail explosively during fault clearance.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  <strong>Live Testing Hazards:</strong> Fault current testing involves high energy levels 
                  and must be performed with appropriate PPE and safety procedures.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  <strong>Non-Compliance Actions:</strong> Installations with inadequate breaking capacity 
                  cannot be certified and require immediate remedial action.
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
              <h4 className="text-blue-200 font-medium mb-3">Testing Approach</h4>
              <ul className="text-foreground text-sm space-y-2">
                <li>• Test at origin for maximum fault current values</li>
                <li>• Test at each distribution level for local compliance</li>
                <li>• Use both measurement and calculation methods for verification</li>
                <li>• Document ambient conditions during testing</li>
              </ul>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="text-green-200 font-medium mb-3">Safety Procedures</h4>
              <ul className="text-foreground text-sm space-y-2">
                <li>• Wear appropriate arc flash protection</li>
                <li>• Establish safe working procedures before testing</li>
                <li>• Ensure test equipment is properly rated</li>
                <li>• Have emergency procedures readily available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">BS 7671 Compliance Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              <p className="text-foreground text-sm">
                <strong>Regulation 434.5.1:</strong> Every protective device shall have adequate breaking 
                capacity for the maximum prospective fault current at the point where it is installed.
              </p>
              <p className="text-foreground text-sm">
                <strong>Regulation 434.5.2:</strong> The breaking capacity may be achieved by a combination 
                of devices in series, provided that the combination can safely interrupt the fault current.
              </p>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                <p className="text-foreground text-sm">
                  <strong>Note:</strong> These regulations ensure that electrical installations can safely 
                  handle fault conditions without endangering persons or property. Compliance verification 
                  through testing is mandatory for certification.
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
                  <li>• Review current testing procedures</li>
                  <li>• Verify test equipment calibration</li>
                  <li>• Check breaking capacity compliance on recent jobs</li>
                  <li>• Update safety procedures if necessary</li>
                </ul>
              </div>
              <div>
                <h4 className="text-elec-yellow font-medium mb-2">Ongoing Development</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Practice fault current calculations</li>
                  <li>• Study protective device specifications</li>
                  <li>• Monitor supply impedance trends</li>
                  <li>• Maintain detailed test records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section Conclusion */}
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
          <p className="text-foreground text-sm leading-relaxed">
            <strong>Section Conclusion:</strong> Prospective fault current testing is a critical verification 
            process that ensures electrical installations can safely handle fault conditions. By understanding 
            the relationship between fault current and protective device capabilities, practitioners can ensure 
            compliance with BS 7671 and maintain the highest safety standards. Regular testing, proper 
            documentation, and immediate action on non-compliant results are essential for electrical safety.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};