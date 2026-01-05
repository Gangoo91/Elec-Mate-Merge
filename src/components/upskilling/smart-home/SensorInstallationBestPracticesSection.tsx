import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Shield, Eye, CheckCircle } from 'lucide-react';

export const SensorInstallationBestPracticesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Installation Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              Contact Sensors
            </h4>
            <ul className="text-blue-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Align magnet and switch carefully for proper operation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Test sensor operation before finalising installation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Ensure secure mounting to prevent tampering</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Keep magnet within specified distance (usually 1-2cm)</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-400" />
              PIR Sensors
            </h4>
            <ul className="text-green-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Mount at 2–2.5m height for optimal coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Angle to cover main entry paths and movement zones</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Consider cross-movement for better detection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Test coverage area before permanent mounting</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-red-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3">PIR Placement to Avoid</h4>
            <ul className="text-red-100 text-sm space-y-1">
              <li>• Near windows (sunlight interference)</li>
              <li>• Facing radiators or heating vents</li>
              <li>• Direct sunlight exposure</li>
              <li>• Areas with air conditioning airflow</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-3">System Testing</h4>
            <ul className="text-purple-100 text-sm space-y-1">
              <li>• Test system sensitivity settings</li>
              <li>• Adjust detection zones as needed</li>
              <li>• Verify integration with hub/system</li>
              <li>• Monitor for false alarms initially</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-600/50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-200 mb-2">Professional Tip</h4>
          <p className="text-yellow-100 text-sm">
            Always perform a full system test with the end user present. Walk through different scenarios to ensure sensors trigger correctly and false alarms are minimised.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};