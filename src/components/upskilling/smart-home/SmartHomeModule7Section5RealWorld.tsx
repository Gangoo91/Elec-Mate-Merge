import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const SmartHomeModule7Section5RealWorld = () => {
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
          <h4 className="font-semibold text-foreground">Case Study: Smart Security System Handover in Sheffield</h4>
          
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-red-200 mb-2">The Problem</h5>
                <p className="text-red-100 text-sm mb-3">
                  A homeowner had a new smart security system installed but received no proper handover training:
                </p>
                <ul className="space-y-1 text-red-100 text-sm ml-4">
                  <li>• Installer left without showing app functionality</li>
                  <li>• No explanation of notification settings</li>
                  <li>• Client didn't understand how to arm/disarm system</li>
                  <li>• No documentation or contact information provided</li>
                  <li>• System generated constant false alarms</li>
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
                  Within a week, multiple problems emerged:
                </p>
                <ul className="space-y-1 text-amber-100 text-sm ml-4">
                  <li>• System was switched off due to annoying constant alerts</li>
                  <li>• Client lost confidence in the smart home technology</li>
                  <li>• Multiple frustrated calls to the installation company</li>
                  <li>• Negative online review posted by disappointed customer</li>
                  <li>• Security system became completely unused</li>
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
                  A follow-up electrician provided proper handover training:
                </p>
                <ul className="space-y-1 text-green-100 text-sm ml-4">
                  <li>• Re-enabled system and properly configured alert settings</li>
                  <li>• Conducted thorough app walkthrough with client present</li>
                  <li>• Demonstrated arming/disarming procedures multiple times</li>
                  <li>• Created personalised quick-reference guide</li>
                  <li>• Explained system limitations and realistic expectations</li>
                  <li>• Provided contact details with clear support boundaries</li>
                  <li>• Client gained confidence and began using system daily</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Key Lessons Learned</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Never skip the handover:</strong> It's as important as the installation itself
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Poor training destroys client confidence:</strong> Leading to system abandonment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Client understanding prevents support calls:</strong> Proper training reduces callbacks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Configuration matters as much as installation:</strong> Settings must match user needs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Professional reputation depends on complete service:</strong> Including proper handover
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section5RealWorld;