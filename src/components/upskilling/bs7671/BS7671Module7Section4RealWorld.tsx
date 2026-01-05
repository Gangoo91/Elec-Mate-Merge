import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const BS7671Module7Section4RealWorld = () => {
  return (
    <Card className="bg-gradient-to-r from-red-900/20 to-elec-gray border-red-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Real-World Case Studies
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid gap-6">
          {/* Medical IT System Failure */}
          <div className="bg-elec-dark p-4 rounded-md border border-red-600/50">
            <h5 className="text-red-400 font-semibold mb-3">Case Study 1: Medical IT System Failure - Private Hospital, London</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Critical Incident:</h6>
                <p className="text-sm mb-3">
                  During a cardiac surgery procedure, the medical IT system alarm activated indicating insulation failure. The surgical team had to make an emergency decision whether to continue the operation or transfer the patient to another theatre, creating significant clinical risk.
                </p>
                <p className="text-sm">
                  Investigation revealed that moisture ingress into a socket outlet had reduced the system insulation to 45kΩ, below the 50kΩ alarm threshold. The backup IT transformer failed to automatically engage due to a faulty changeover switch.
                </p>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Emergency Response:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Surgery completed on emergency TN supply with enhanced monitoring</li>
                  <li>• Immediate isolation of affected IT circuit</li>
                  <li>• Full system inspection and testing protocol</li>
                  <li>• Moisture ingress repairs and improved sealing</li>
                  <li>• Changeover switch replacement and testing</li>
                  <li>• Enhanced preventive maintenance programme</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-800/30 border border-red-500/50 rounded">
              <p className="text-red-200 text-sm">
                <strong>Lesson Learned:</strong> Regular testing of changeover systems is as critical as the IT system itself. Monthly functional testing now includes full changeover verification under load conditions.
              </p>
            </div>
          </div>

          {/* Industrial Coordination Failure */}
          <div className="bg-elec-dark p-4 rounded-md border border-orange-600/50">
            <h5 className="text-orange-400 font-semibold mb-3">Case Study 2: Coordination Failure - Automotive Manufacturing, Midlands</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Production Loss:</h6>
                <p className="text-sm mb-3">
                  A single motor overload in the paint shop caused the main incoming breaker to trip, shutting down the entire production line for 4 hours. The lack of selective coordination meant that a minor fault escalated to major production disruption.
                </p>
                <p className="text-sm">
                  The fault occurred when a conveyor motor seized, causing overcurrent. Poor coordination settings meant the 1600A main breaker operated before the 32A motor protection, affecting 200+ other motors and control systems.
                </p>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The System Upgrade:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Complete coordination study and settings review</li>
                  <li>• Time-graded protection system implementation</li>
                  <li>• Electronic trip unit installation on main breakers</li>
                  <li>• Zone-selective interlocking system</li>
                  <li>• Real-time monitoring and fault location</li>
                  <li>• Staff training on protection principles</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-orange-800/30 border border-orange-500/50 rounded">
              <p className="text-orange-200 text-sm">
                <strong>Economic Impact:</strong> The £50,000 protection upgrade cost was recovered in 6 months through elimination of unnecessary production interruptions, demonstrating the value of proper coordination.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};