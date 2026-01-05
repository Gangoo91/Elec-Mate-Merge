import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, XCircle, Smartphone } from 'lucide-react';

export const ContactSensorsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Door and Window Contact Sensors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              How They Work
            </h4>
            <p className="text-gray-300 text-sm">
              Contact sensors use a <strong className="text-foreground">magnetic reed switch</strong>. When the door or window opens, the magnet separates from the switch, creating an open circuit that triggers an alert.
            </p>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Typical Placement</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Main entry doors</li>
              <li>• Ground-floor windows</li>
              <li>• Garage doors</li>
              <li>• Patio/French doors</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Advantages
            </h4>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• Simple and reliable operation</li>
              <li>• Immediate alerts for forced entry</li>
              <li>• Long battery life</li>
              <li>• Low cost and easy installation</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-red-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              Limitations
            </h4>
            <ul className="text-red-100 text-sm space-y-1">
              <li>• Won't detect intruder already inside</li>
              <li>• Limited to entry points only</li>
              <li>• Can be bypassed if poorly installed</li>
              <li>• May trigger false alarms if loose</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-purple-400" />
            Smart Features
          </h4>
          <ul className="text-purple-100 text-sm space-y-1">
            <li>• Real-time app notifications when triggered</li>
            <li>• Integration with security alarms and lighting</li>
            <li>• Activity logging and timestamp records</li>
            <li>• Customisable trigger responses</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};