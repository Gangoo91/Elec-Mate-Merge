import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Bluetooth, Radio, Globe, Network, Sparkles } from 'lucide-react';

export const CommonProtocolsSection = () => {
  const protocols = [
    {
      name: "Zigbee",
      icon: Radio,
      frequency: "2.4GHz",
      characteristics: [
        "Low power consumption",
        "Mesh networking capability", 
        "Self-healing network",
        "Used in lighting and sensors"
      ],
      pros: ["Long battery life", "Reliable mesh network", "Good range when meshed"],
      cons: ["Requires hub", "Can be affected by Wi-Fi interference"],
      commonUses: "Smart bulbs, motion sensors, door/window sensors, smart switches",
      color: "blue"
    },
    {
      name: "Z-Wave",
      icon: Radio,
      frequency: "Sub-1GHz (868/908MHz)",
      characteristics: [
        "Similar to Zigbee but different frequency",
        "Less interference from Wi-Fi",
        "Mesh networking",
        "Maximum 232 devices per network"
      ],
      pros: ["Minimal Wi-Fi interference", "Strong mesh capability", "Interoperability certification"],
      cons: ["More expensive devices", "Requires hub", "Regional frequency differences"],
      commonUses: "Smart locks, thermostats, lighting controls, security systems",
      color: "green"
    },
    {
      name: "Wi-Fi",
      icon: Wifi,
      frequency: "2.4GHz / 5GHz",
      characteristics: [
        "High bandwidth capability",
        "Direct internet connection",
        "Star network topology",
        "Higher power consumption"
      ],
      pros: ["High speed", "No hub required", "Existing infrastructure", "Good for video/audio"],
      cons: ["High power use", "Network congestion", "Range limitations"],
      commonUses: "Security cameras, voice assistants, smart TVs, streaming devices",
      color: "purple"
    },
    {
      name: "Bluetooth (inc. BLE)",
      icon: Bluetooth,
      frequency: "2.4GHz",
      characteristics: [
        "Short-range communication",
        "Very low power (BLE)",
        "Point-to-point topology",
        "Mobile device integration"
      ],
      pros: ["Ultra-low power", "Smartphone integration", "Fast pairing"],
      cons: ["Limited range", "Point-to-point only", "Device limit per hub"],
      commonUses: "Smart locks, fitness trackers, beacons, proximity sensors",
      color: "cyan"
    },
    {
      name: "Thread",
      icon: Network,
      frequency: "2.4GHz",
      characteristics: [
        "IPv6-based mesh networking",
        "Designed specifically for IoT",
        "Self-healing mesh capability",
        "Low power consumption"
      ],
      pros: ["Future-proof IPv6", "Robust mesh", "Industry backing", "Low power"],
      cons: ["Newer standard", "Limited device selection", "Requires Thread-compatible hub"],
      commonUses: "Smart home sensors, lighting, thermostats, door locks",
      color: "orange"
    },
    {
      name: "Matter",
      icon: Sparkles,
      frequency: "Works over Wi-Fi, Thread, Ethernet",
      characteristics: [
        "Interoperability standard",
        "Works across different protocols",
        "Industry-wide adoption",
        "Local network operation"
      ],
      pros: ["Cross-platform compatibility", "No vendor lock-in", "Local control", "Industry standard"],
      cons: ["Still developing", "Requires compatible devices", "Limited current device selection"],
      commonUses: "Smart speakers, lighting, thermostats, sensors (when Matter-certified)",
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-600 bg-blue-900/20';
      case 'green': return 'border-green-600 bg-green-900/20';
      case 'purple': return 'border-purple-600 bg-purple-900/20';
      case 'cyan': return 'border-cyan-600 bg-cyan-900/20';
      case 'orange': return 'border-orange-600 bg-orange-900/20';
      case 'yellow': return 'border-yellow-600 bg-yellow-900/20';
      default: return 'border-gray-600 bg-gray-900/20';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Globe className="h-5 w-5 text-elec-yellow" />
          3. Common Protocols in Smart Homes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-6">
          Each protocol has unique characteristics that make it suitable for different smart home applications.
        </p>
        
        {/* Protocol Cards */}
        <div className="space-y-6">
          {protocols.map((protocol, index) => (
            <div key={index} className={`p-4 border rounded-lg ${getColorClasses(protocol.color)}`}>
              <div className="flex items-start gap-3 mb-4">
                <protocol.icon className="h-6 w-6 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-lg">{protocol.name}</h4>
                    <span className="text-sm text-gray-400 font-medium">{protocol.frequency}</span>
                  </div>
                  
                  {/* Characteristics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Key Characteristics</h5>
                      <ul className="space-y-1 text-sm">
                        {protocol.characteristics.map((char, charIndex) => (
                          <li key={charIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                            <span className="text-gray-300">{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Common Uses</h5>
                      <p className="text-sm text-gray-300">{protocol.commonUses}</p>
                    </div>
                  </div>
                  
                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-300 mb-2">Advantages</h5>
                      <ul className="space-y-1 text-xs">
                        {protocol.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0"></div>
                            <span className="text-green-100">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-red-300 mb-2">Limitations</h5>
                      <ul className="space-y-1 text-xs">
                        {protocol.cons.map((con, conIndex) => (
                          <li key={conIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0"></div>
                            <span className="text-red-100">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Quick Protocol Reference</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="p-3 bg-elec-gray border border-gray-600 rounded-lg">
              <h5 className="font-medium text-blue-200 mb-2">Mesh Protocols</h5>
              <div className="space-y-1 text-blue-100">
                <div>Zigbee, Z-Wave, Thread</div>
                <div className="text-xs text-gray-400">Self-extending networks</div>
              </div>
            </div>
            <div className="p-3 bg-elec-gray border border-gray-600 rounded-lg">
              <h5 className="font-medium text-purple-200 mb-2">High Bandwidth</h5>
              <div className="space-y-1 text-purple-100">
                <div>Wi-Fi</div>
                <div className="text-xs text-gray-400">Video, audio, data-heavy devices</div>
              </div>
            </div>
            <div className="p-3 bg-elec-gray border border-gray-600 rounded-lg">
              <h5 className="font-medium text-cyan-200 mb-2">Ultra Low Power</h5>
              <div className="space-y-1 text-cyan-100">
                <div>Bluetooth LE</div>
                <div className="text-xs text-gray-400">Battery-powered devices</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};