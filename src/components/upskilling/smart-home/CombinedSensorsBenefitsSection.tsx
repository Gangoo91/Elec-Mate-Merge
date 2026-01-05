import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Shield, Eye, Camera, Lightbulb } from 'lucide-react';

export const CombinedSensorsBenefitsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Layers className="h-5 w-5 text-elec-yellow" />
          Benefits of Combining Sensors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              Perimeter Security
            </h4>
            <p className="text-blue-100 text-sm">
              Contact sensors secure the perimeter by detecting when doors and windows are opened, providing the first line of defence.
            </p>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-400" />
              Interior Monitoring
            </h4>
            <p className="text-green-100 text-sm">
              PIR sensors monitor movement inside the property, detecting anyone who may have already gained entry.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-400" />
            Multi-Layered Security
          </h4>
          <p className="text-purple-100 text-sm mb-3">
            Together, contact sensors and PIR create comprehensive coverage that reduces blind spots and provides redundant detection.
          </p>
          <ul className="text-purple-100 text-sm space-y-1">
            <li>• Multiple detection methods increase reliability</li>
            <li>• Backup coverage if one sensor fails</li>
            <li>• Different trigger scenarios for various threats</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-orange-600 rounded-lg">
            <h4 className="font-semibold text-orange-200 mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4 text-orange-400" />
              CCTV Integration
            </h4>
            <p className="text-orange-100 text-sm">
              Sensor triggers can activate CCTV recording, ensuring evidence capture when activity is detected.
            </p>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-yellow-600 rounded-lg">
            <h4 className="font-semibold text-yellow-200 mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Lighting Deterrence
            </h4>
            <p className="text-yellow-100 text-sm">
              Integration with lighting systems provides visual deterrence and improves CCTV image quality.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};