import { Settings, Wifi, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HandsOnConfigurationSection = () => {
  const wifiSteps = [
    "Access router admin panel (usually 192.168.1.1 or 192.168.0.1)",
    "Navigate to Wireless Settings > 2.4GHz configuration",
    "Set Channel to 1, 6, or 11 (avoid Auto)",
    "Set Channel Width to 20MHz for better range",
    "Create separate 2.4GHz and 5GHz network names (SSIDs)"
  ];

  const zigbeeSteps = [
    "Open hub management app or web interface",
    "Check current channel in network settings",
    "If on channel 11, 15, or 20 - check for Wi-Fi overlap",
    "Change to channel 15, 20, or 25 for best separation",
    "Restart hub and test device responses"
  ];

  const networkSeparation = [
    {
      network: "Main_WiFi_5G",
      purpose: "Phones, laptops, tablets, streaming devices",
      channel: "Auto (36-165)",
      priority: "High"
    },
    {
      network: "Main_WiFi_2G", 
      purpose: "Legacy devices, some smart home gear",
      channel: "1, 6, or 11",
      priority: "Medium"
    },
    {
      network: "SmartHome_IoT",
      purpose: "Smart switches, sensors, thermostats",
      channel: "Different from main 2.4GHz",
      priority: "Low"
    }
  ];

  const testingChecklist = [
    "Speed test from multiple locations in home",
    "Test smart device response times",
    "Check connection stability during peak hours",
    "Verify all devices can reach internet",
    "Test automation reliability"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Hands-On Configuration Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Step-by-step instructions for optimising your wireless networks. Follow these procedures for reliable smart home performance.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Wi-Fi Channel Setup
            </h4>
            <ol className="space-y-2">
              {wifiSteps.map((step, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-3">
                  <span className="bg-blue-400 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Network className="h-4 w-4" />
              Zigbee Optimisation
            </h4>
            <ol className="space-y-2">
              {zigbeeSteps.map((step, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-3">
                  <span className="bg-green-400 text-green-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-3">Network Separation Strategy</h4>
          <div className="space-y-3">
            {networkSeparation.map((network, index) => (
              <div key={index} className="bg-elec-dark border border-gray-600 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-foreground">{network.network}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    network.priority === 'High' ? 'bg-red-600/20 text-red-400' :
                    network.priority === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-green-600/20 text-green-400'
                  }`}>
                    {network.priority}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-1">{network.purpose}</p>
                <p className="text-xs text-gray-400">Channel: {network.channel}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3">Post-Configuration Testing</h4>
          <ul className="space-y-2">
            {testingChecklist.map((test, index) => (
              <li key={index} className="text-sm text-foreground flex items-center gap-3">
                <input type="checkbox" className="rounded border-gray-600 bg-transparent" />
                <span>{test}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Configuration Challenge:</h4>
          <p className="text-sm text-foreground">
            Set up a home with 15 smart switches, 8 sensors, security cameras, and a family of 4 with multiple devices. 
            Design the network architecture and channel allocation to minimise interference.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};