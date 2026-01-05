import { Waves, Wifi, Radio, Signal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ChannelsFrequenciesSection = () => {
  const protocols = [
    {
      name: "Wi-Fi",
      frequency: "2.4 GHz & 5 GHz",
      channels: "2.4GHz: 1, 6, 11 (non-overlapping)",
      characteristics: [
        "High bandwidth, shorter range on 5GHz",
        "2.4GHz more crowded but better range",
        "Automatic channel selection available"
      ],
      color: "blue"
    },
    {
      name: "Zigbee",
      frequency: "2.4 GHz",
      channels: "15, 20, 25 (recommended)",
      characteristics: [
        "Can overlap with Wi-Fi channels",
        "Mesh self-healing capabilities",
        "Lower power than Wi-Fi"
      ],
      color: "green"
    },
    {
      name: "Z-Wave",
      frequency: "Sub-1 GHz",
      channels: "UK: 868.4 MHz, US: 908.4 MHz",
      characteristics: [
        "Avoids 2.4GHz congestion entirely",
        "Excellent wall penetration",
        "Regional frequency allocation"
      ],
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600/10 border-blue-600/20 text-blue-400';
      case 'green': return 'bg-green-600/10 border-green-600/20 text-green-400';
      case 'orange': return 'bg-orange-600/10 border-orange-600/20 text-orange-400';
      default: return 'bg-gray-600/10 border-gray-600/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Waves className="h-5 w-5 text-elec-yellow" />
          Channels and Frequencies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Wireless protocols divide frequency bands into channels - think of them as lanes on a motorway. Proper channel planning prevents devices from interfering with each other and ensures reliable communication across your smart home network.
        </p>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Protocol Frequency Breakdown</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {protocols.map((protocol, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getColorClasses(protocol.color)}`}>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  {protocol.name === 'Wi-Fi' && <Wifi className="h-4 w-4" />}
                  {protocol.name === 'Zigbee' && <Radio className="h-4 w-4" />}
                  {protocol.name === 'Z-Wave' && <Signal className="h-4 w-4" />}
                  {protocol.name}
                </h5>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium">Frequency:</p>
                    <p>{protocol.frequency}</p>
                  </div>
                  <div>
                    <p className="font-medium">Best channels:</p>
                    <p>{protocol.channels}</p>
                  </div>
                  <div className="mt-3">
                    <p className="font-medium mb-1">Key characteristics:</p>
                    <ul className="space-y-1">
                      {protocol.characteristics.map((char, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></div>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Channel Planning Strategy</h4>
          <p className="text-sm text-foreground mb-2">
            For homes with both Wi-Fi and Zigbee networks, use this spacing to minimise interference:
          </p>
          <ul className="text-sm text-foreground space-y-1">
            <li>• Wi-Fi on channel 1 or 6 → Zigbee on channel 15 or 20</li>
            <li>• Wi-Fi on channel 11 → Zigbee on channel 25</li>
            <li>• Always use 5 GHz Wi-Fi for high-bandwidth devices when possible</li>
            <li>• Z-Wave automatically avoids 2.4 GHz interference</li>
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">Why does Z-Wave have better wall penetration than 2.4 GHz protocols?</p>
        </div>
      </CardContent>
    </Card>
  );
};