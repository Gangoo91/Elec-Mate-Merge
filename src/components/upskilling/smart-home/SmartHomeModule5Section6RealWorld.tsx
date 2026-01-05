import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

export const SmartHomeModule5Section6RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-red-950/20 p-4 rounded-lg border border-red-800/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h4 className="font-semibold text-red-400">Case Study: Baby Monitor Hack</h4>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            In 2022, a UK family discovered their baby monitor camera had been hacked after noticing 
            it was moving on its own. Investigation revealed the device was still using its default 
            factory password "admin123".
          </p>
          <p className="text-gray-300 text-sm">
            The hackers had gained access through the unsecured device and could view live footage 
            of the baby's room, control the camera movement, and even speak through the monitor's 
            built-in speaker system.
          </p>
        </div>

        <div className="bg-green-950/20 p-4 rounded-lg border border-green-800/30">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <h4 className="font-semibold text-green-400">Resolution</h4>
          </div>
          <p className="text-gray-300 text-sm mb-2">
            Once the family updated the device with a strong unique password and applied 
            the latest firmware patch, the problem was resolved. Additional steps taken:
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              Enabled two-factor authentication on the mobile app
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              Set up a separate IoT network for smart devices
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              Configured automatic firmware updates
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              Regular security audits of all connected devices
            </li>
          </ul>
        </div>

        <div className="bg-blue-950/20 p-4 rounded-lg border border-blue-800/30">
          <h4 className="font-semibold text-blue-400 mb-2">Key Lessons</h4>
          <p className="text-gray-300 text-sm">
            This case highlights why electricians must stress security to clients during installation. 
            Default passwords are easily found online, and many attacks target devices that haven't 
            been properly secured. Professional installation includes security configuration as a 
            standard service, not an optional extra.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};