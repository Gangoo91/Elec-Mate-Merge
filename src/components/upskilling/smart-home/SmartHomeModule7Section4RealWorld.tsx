import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const SmartHomeModule7Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Case Study: Smart Relay Installation in Birmingham</h4>
          
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-red-200 mb-2">The Incident</h5>
                <p className="text-red-100 text-sm mb-3">
                  During a retrofit installation, an installer connected a smart relay to a lighting circuit without following proper isolation procedures:
                </p>
                <ul className="space-y-1 text-red-100 text-sm ml-4">
                  <li>• Relied on wall switch for isolation instead of consumer unit</li>
                  <li>• Did not use lock-off device or proving unit</li>
                  <li>• Failed to test circuits before energising</li>
                  <li>• Assumed circuit was safe based on switch position</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-amber-200 mb-2">The Consequences</h5>
                <p className="text-amber-100 text-sm mb-3">
                  The relay shorted during connection, causing multiple problems:
                </p>
                <ul className="space-y-1 text-amber-100 text-sm ml-4">
                  <li>• Circuit breaker tripped, causing building-wide power loss</li>
                  <li>• Arc fault nearly occurred, risking fire and injury</li>
                  <li>• Smart relay was destroyed, requiring replacement</li>
                  <li>• Client lost confidence in the installation</li>
                  <li>• Project delayed by several hours</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-green-200 mb-2">The Professional Solution</h5>
                <p className="text-green-100 text-sm mb-3">
                  On re-installation, the electrician followed proper BS 7671 procedures:
                </p>
                <ul className="space-y-1 text-green-100 text-sm ml-4">
                  <li>• Isolated circuit at consumer unit using lock-off device</li>
                  <li>• Used proving unit to verify isolation was effective</li>
                  <li>• Completed continuity and insulation resistance tests</li>
                  <li>• Verified polarity before connecting the smart relay</li>
                  <li>• Tested RCD protection and documented all results</li>
                  <li>• System worked safely and reliably thereafter</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Key Lessons Learned</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Never compromise on isolation:</strong> Even "simple" connections can be dangerous
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Proper procedures prevent incidents:</strong> BS 7671 requirements exist for good reasons
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Testing saves time and money:</strong> Finding faults before energising prevents damage
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Client confidence matters:</strong> Professional approach builds trust and reduces liability
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Documentation protects everyone:</strong> Proper records demonstrate competence and compliance
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section4RealWorld;