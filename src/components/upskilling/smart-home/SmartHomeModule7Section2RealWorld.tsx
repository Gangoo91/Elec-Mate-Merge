import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const SmartHomeModule7Section2RealWorld = () => {
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
          <h4 className="font-semibold text-foreground">Case Study: Smart Lighting Installation in Liverpool</h4>
          
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-red-200 mb-2">The Problem</h5>
                <p className="text-red-100 text-sm mb-3">
                  An electrician skipped thorough commissioning after installing smart lighting. The problems that emerged within a week:
                </p>
                <ul className="space-y-1 text-red-100 text-sm ml-4">
                  <li>• Several bulbs were left unnamed in the app ("Bulb 1", "Bulb 2", etc.)</li>
                  <li>• One PIR sensor wasn't properly paired to the system</li>
                  <li>• No testing of automation routines with the client</li>
                  <li>• Client couldn't identify which lights were which</li>
                  <li>• Random light activations from the unpaired sensor</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-green-200 mb-2">The Solution</h5>
                <p className="text-green-100 text-sm mb-3">
                  After a full re-commissioning process:
                </p>
                <ul className="space-y-1 text-green-100 text-sm ml-4">
                  <li>• Renamed all devices with descriptive names ("Kitchen Ceiling", "Lounge Table Lamp")</li>
                  <li>• Updated all firmware and properly paired the PIR sensor</li>
                  <li>• Tested all automation routines with the client present</li>
                  <li>• Provided training on app usage and basic troubleshooting</li>
                  <li>• System worked flawlessly and client was satisfied</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Key Lessons Learned</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Proper commissioning prevents costly call-backs and customer complaints
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Device naming is crucial for system usability
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Every device must be tested individually and as part of the system
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Client training builds confidence and reduces support calls
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section2RealWorld;