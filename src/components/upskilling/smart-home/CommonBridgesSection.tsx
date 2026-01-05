import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Speaker, Home, Smartphone, Cpu } from 'lucide-react';

export const CommonBridgesSection = () => {
  const bridges = [
    {
      name: 'Philips Hue Bridge',
      icon: Lightbulb,
      protocol: 'Zigbee → Wi-Fi/Cloud',
      description: 'Connects Zigbee bulbs to Wi-Fi networks and voice assistants',
      features: ['Cloud connectivity', 'Voice control', 'Scheduling', 'Third-party integration']
    },
    {
      name: 'Sonos Bridge',
      icon: Speaker,
      protocol: 'Proprietary → Wi-Fi',
      description: 'Legacy product for connecting older Sonos speakers wirelessly',
      features: ['Wireless audio', 'Multi-room sync', 'Legacy support', 'Network extension']
    },
    {
      name: 'Home Assistant',
      icon: Home,
      protocol: 'Multi-protocol',
      description: 'Software platform bridging multiple protocols and ecosystems',
      features: ['Open source', 'Local control', 'Extensive integrations', 'Custom automation']
    },
    {
      name: 'Apple HomeKit Bridges',
      icon: Smartphone,
      protocol: 'Various → HomeKit',
      description: 'Required for non-HomeKit accessories to integrate with Apple ecosystem',
      features: ['Siri control', 'iOS integration', 'Secure communication', 'Remote access']
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cpu className="h-5 w-5 text-elec-yellow" />
          Common Bridge Examples
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bridges.map((bridge, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <bridge.icon className="h-6 w-6 text-elec-yellow" />
                <div>
                  <h4 className="text-foreground font-semibold">{bridge.name}</h4>
                  <p className="text-xs text-gray-400">{bridge.protocol}</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{bridge.description}</p>
              
              <div className="space-y-1">
                {bridge.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-elec-yellow rounded-full"></div>
                    <span className="text-xs text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-3">Hubitat Elevation</h4>
          <p className="text-blue-100 text-sm mb-2">
            Local processing hub that bridges Zigbee, Z-Wave, and cloud services without requiring internet connectivity for basic operations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <span className="text-blue-200">• Local control</span>
            <span className="text-blue-200">• Z-Wave Plus</span>
            <span className="text-blue-200">• Zigbee 3.0</span>
            <span className="text-blue-200">• Custom apps</span>
          </div>
        </div>

        <div className="bg-purple-900/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-200 font-semibold mb-3">SmartThings Hub</h4>
          <p className="text-purple-100 text-sm mb-2">
            Samsung's hub that includes Zigbee and Z-Wave radios, acting as a bridge to Samsung's cloud ecosystem and voice assistants.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <span className="text-purple-200">• Cloud-based</span>
            <span className="text-purple-200">• Multi-protocol</span>
            <span className="text-purple-200">• Voice integration</span>
            <span className="text-purple-200">• Mobile app control</span>
          </div>
        </div>

        <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-200 font-semibold mb-2">Bridge Selection Criteria</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-green-400" />
              <span className="text-green-100">Protocol Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-green-400" />
              <span className="text-green-100">Processing Power</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-green-400" />
              <span className="text-green-100">Ecosystem Integration</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};