import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeQuickCheck = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          Quick Knowledge Check
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-base">
          Test your understanding of smart home concepts with these key questions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">🤔 What makes a home "smart"?</p>
            <p className="text-xs text-gray-400 mb-3">Think about interconnectivity, automation, and control capabilities beyond just internet connection.</p>
            <div className="text-xs text-green-400">
              ✓ Interconnected devices that communicate and automate functions
            </div>
          </div>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">🌐 Key protocols for device communication?</p>
            <p className="text-xs text-gray-400 mb-3">Consider mesh networks, low power consumption, and reliability requirements.</p>
            <div className="text-xs text-green-400">
              ✓ Zigbee, Z-Wave, Wi-Fi, Bluetooth for different use cases
            </div>
          </div>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">⚡ Primary benefits for homeowners?</p>
            <p className="text-xs text-gray-400 mb-3">Think about energy efficiency, convenience, security, and accessibility improvements.</p>
            <div className="text-xs text-green-400">
              ✓ Energy savings, enhanced security, convenience, accessibility
            </div>
          </div>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">⚠️ Main implementation challenges?</p>
            <p className="text-xs text-gray-400 mb-3">Consider costs, compatibility, security, and technical complexity issues.</p>
            <div className="text-xs text-green-400">
              ✓ Interoperability, security, costs, complexity
            </div>
          </div>
        </div>
        
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30 mt-6">
          <p className="text-blue-400 font-semibold text-sm mb-2">Self-Assessment Questions:</p>
          <ul className="text-sm space-y-2">
            <li>• Can you explain the difference between automation, monitoring, and control?</li>
            <li>• Which communication protocol would you choose for battery-powered sensors?</li>
            <li>• What security measures should be considered in smart home implementation?</li>
            <li>• How do smart homes benefit users with accessibility needs?</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};