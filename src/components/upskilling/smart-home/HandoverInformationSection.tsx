import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Key, AlertTriangle } from 'lucide-react';

const HandoverInformationSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-6 w-6 text-elec-yellow" />
          3. Key Handover Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Comprehensive handover information ensures clients have everything needed to operate and maintain their smart home system effectively.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Key className="h-4 w-4 text-green-400" />
                Device Names and Locations
              </h4>
              <p className="text-gray-300 text-sm mb-2">Provide clear identification for all devices:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Descriptive names (e.g., "Kitchen Ceiling Light")</li>
                <li>• Room-by-room device lists</li>
                <li>• Physical location notes for hidden devices</li>
                <li>• Device serial numbers and model information</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-foreground mb-2">Login Details and Access</h4>
              <p className="text-gray-300 text-sm mb-2">Securely provide access credentials:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Master account usernames and passwords</li>
                <li>• Wi-Fi network details for devices</li>
                <li>• Hub/controller access information</li>
                <li>• Mobile app account setup details</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-purple-500">
              <h4 className="font-medium text-foreground mb-2">Emergency Contact Information</h4>
              <p className="text-gray-300 text-sm mb-2">Ensure clients know who to contact:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Installer/company contact details</li>
                <li>• Manufacturer support numbers</li>
                <li>• Local electrician for urgent issues</li>
                <li>• Hours of operation for different services</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="font-medium text-amber-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                System Limitations
              </h4>
              <p className="text-amber-100 text-sm mb-2">Be honest about system constraints:</p>
              <ul className="text-amber-100 text-sm space-y-1">
                <li>• Wi-Fi dependency for remote access</li>
                <li>• Battery replacement schedules</li>
                <li>• Internet outage backup procedures</li>
                <li>• Device compatibility limitations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-red-200 mb-2">Security Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Password Security</h5>
              <ul className="space-y-1 text-red-100 text-sm">
                <li>• Provide passwords in sealed envelope or secure digital format</li>
                <li>• Recommend changing default passwords</li>
                <li>• Explain importance of strong, unique passwords</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Privacy Considerations</h5>
              <ul className="space-y-1 text-red-100 text-sm">
                <li>• Explain what data is collected and stored</li>
                <li>• Discuss remote access implications</li>
                <li>• Provide privacy policy information</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Documentation Package Contents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>✓ Device inventory with locations</li>
              <li>✓ Login credentials (secure format)</li>
              <li>✓ Emergency contact sheet</li>
              <li>✓ System limitation summary</li>
            </ul>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>✓ Quick reference guides</li>
              <li>✓ Troubleshooting checklist</li>
              <li>✓ Warranty information</li>
              <li>✓ Maintenance schedule</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HandoverInformationSection;