import { Network, Server, Cloud, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HubDetailedOverviewSection = () => {
  const hubTypes = [
    {
      name: "Dedicated Smart Home Hubs",
      examples: ["Samsung SmartThings", "Hubitat Elevation", "Aeotec Smart Home Hub"],
      protocols: ["Zigbee", "Z-Wave", "Thread", "Wi-Fi"],
      colorClass: "blue"
    },
    {
      name: "Voice Assistant Hubs", 
      examples: ["Amazon Echo Plus", "Google Nest Hub Max"],
      protocols: ["Zigbee", "Thread", "Wi-Fi", "Bluetooth"],
      colorClass: "green"
    },
    {
      name: "Open-Source Platforms",
      examples: ["Home Assistant", "OpenHAB", "Domoticz"],
      protocols: ["All protocols via add-ons", "Custom integrations"],
      colorClass: "purple"
    }
  ];

  const hubFunctions = [
    "Protocol Translation: Converts between different wireless standards",
    "Local Automation: Runs rules and scenes without internet dependency",
    "Device Discovery: Automatically finds and pairs compatible devices",
    "Network Management: Maintains mesh topology and routing tables",
    "Security: Encrypts communications and manages device authentication",
    "Data Processing: Stores sensor readings and usage statistics locally"
  ];

  const architectureComparison = [
    {
      aspect: "Command Processing",
      hub: "Local processing with instant response",
      hubless: "Cloud processing with 100-500ms latency"
    },
    {
      aspect: "Internet Outage",
      hub: "Local automation continues working",
      hubless: "Most features stop functioning"
    },
    {
      aspect: "Privacy",
      hub: "Data stays local unless explicitly shared",
      hubless: "Data typically processed in cloud"
    },
    {
      aspect: "Device Limit",
      hub: "Hundreds of devices per hub",
      hubless: "Limited by router and bandwidth"
    }
  ];

  const getColorClasses = (colorClass: string) => {
    switch (colorClass) {
      case 'blue':
        return {
          bg: 'bg-blue-600/10',
          border: 'border-blue-600/20',
          text: 'text-blue-400',
          dot: 'bg-blue-400'
        };
      case 'green':
        return {
          bg: 'bg-green-600/10',
          border: 'border-green-600/20',
          text: 'text-green-400',
          dot: 'bg-green-400'
        };
      case 'purple':
        return {
          bg: 'bg-purple-600/10',
          border: 'border-purple-600/20',
          text: 'text-purple-400',
          dot: 'bg-purple-400'
        };
      default:
        return {
          bg: 'bg-gray-600/10',
          border: 'border-gray-600/20',
          text: 'text-gray-400',
          dot: 'bg-gray-400'
        };
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Server className="h-5 w-5 text-elec-yellow" />
          Deep Dive: Hub Architecture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Smart home hubs serve as the central nervous system, coordinating all device communication and automation. 
          Understanding their role is essential for designing reliable, scalable systems.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {hubTypes.map((type, index) => {
            const colors = getColorClasses(type.colorClass);
            return (
              <div key={index} className={`${colors.bg} ${colors.border} rounded-lg p-4 border`}>
                <h4 className={`${colors.text} font-semibold mb-3`}>{type.name}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-foreground">Examples:</span>
                    <ul className="text-xs text-foreground space-y-1 mt-1">
                      {type.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className={`w-1 h-1 ${colors.dot} rounded-full mt-1.5 flex-shrink-0`}></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-foreground">Protocols:</span>
                    <ul className="text-xs text-foreground space-y-1 mt-1">
                      {type.protocols.map((protocol, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className={`w-1 h-1 ${colors.dot} rounded-full mt-1.5 flex-shrink-0`}></div>
                          <span>{protocol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <Network className="h-4 w-4" />
            Core Hub Functions
          </h4>
          <ul className="space-y-2">
            {hubFunctions.map((func, index) => (
              <li key={index} className="text-sm text-foreground flex items-start gap-3">
                <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{func}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Hub vs Hubless Architecture Comparison</h4>
          <div className="space-y-3">
            {architectureComparison.map((comparison, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-800/30 rounded">
                <div className="font-medium text-foreground">{comparison.aspect}</div>
                <div className="text-sm text-green-400">Hub: {comparison.hub}</div>
                <div className="text-sm text-blue-400">Hubless: {comparison.hubless}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">
            A client wants their smart home to work during internet outages. Which architecture would you recommend and why?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};