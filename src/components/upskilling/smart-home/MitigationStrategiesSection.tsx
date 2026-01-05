import { Shield, CheckCircle, Settings, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MitigationStrategiesSection = () => {
  const channelStrategies = [
    "Use Wi-Fi analyser apps to identify least congested channels",
    "Separate Wi-Fi and Zigbee by at least 5 channels",
    "Prefer 5 GHz Wi-Fi for high-bandwidth devices",
    "Configure Zigbee networks on channels 15, 20, or 25"
  ];

  const placementStrategies = [
    "Keep hubs at least 1 metre apart from each other",
    "Place devices away from metal objects and appliances",
    "Use central locations for mesh network coordinators",
    "Avoid kitchen areas for 2.4 GHz sensitive devices"
  ];

  const networkStrategies = [
    "Use wired backhaul for mesh systems where possible",
    "Implement network segmentation for large installations",
    "Consider multiple smaller networks vs one large network",
    "Use repeaters strategically to extend range"
  ];

  const advancedTechniques = [
    "Power level adjustment to reduce interference footprint",
    "Scheduled operations during low-traffic periods",
    "VLAN separation for different device categories",
    "Professional site surveys for complex installations"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Mitigation Strategies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Effective interference mitigation requires a combination of proper channel planning, strategic device placement, and network architecture decisions. Here are proven strategies for building robust smart home networks.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6 flex flex-col">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Channel Management
              </h4>
              <ul className="space-y-2">
                {channelStrategies.map((strategy, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Device Placement
              </h4>
              <ul className="space-y-2">
                {placementStrategies.map((strategy, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Network Architecture
              </h4>
              <ul className="space-y-2">
                {networkStrategies.map((strategy, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-orange-400 font-semibold mb-3">Advanced Techniques</h4>
              <ul className="space-y-2">
                {advancedTechniques.map((technique, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{technique}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3">Quick Win: The 1-6-11 Rule</h4>
          <p className="text-sm text-foreground mb-2">
            For homes with both Wi-Fi and Zigbee networks, follow this simple guideline:
          </p>
          <div className="text-sm text-foreground bg-elec-dark rounded p-3">
            <p className="font-mono">Wi-Fi Channel 1 → Zigbee Channel 15</p>
            <p className="font-mono">Wi-Fi Channel 6 → Zigbee Channel 20</p>
            <p className="font-mono">Wi-Fi Channel 11 → Zigbee Channel 25</p>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">What's the minimum recommended distance between a Wi-Fi router and a Zigbee hub?</p>
        </div>
      </CardContent>
    </Card>
  );
};