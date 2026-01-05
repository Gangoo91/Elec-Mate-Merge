import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio, Lightbulb, Eye, AlertTriangle } from 'lucide-react';

export const ZigbeeOverviewSection = () => {
  const zigbeeFeatures = [
    {
      aspect: "Operating Frequency",
      value: "2.4 GHz",
      description: "Global ISM band, same as Wi-Fi and Bluetooth",
      icon: Radio
    },
    {
      aspect: "Typical Range",
      value: "10-20m indoors",
      description: "Per hop, extends through mesh networking",
      icon: Eye
    },
    {
      aspect: "Network Capacity",
      value: "65,000+ devices",
      description: "Theoretical maximum in a single network",
      icon: Lightbulb
    },
    {
      aspect: "Interference Risk",
      value: "Moderate to High",
      description: "2.4GHz band shared with Wi-Fi, Bluetooth, microwaves",
      icon: AlertTriangle
    }
  ];

  const popularBrands = [
    { name: "Philips Hue", category: "Smart Lighting", description: "Market-leading smart bulbs and light strips" },
    { name: "IKEA TRÅDFRI", category: "Affordable Lighting", description: "Budget-friendly smart home lighting solutions" },
    { name: "Samsung SmartThings", category: "Hub Platform", description: "Central hub supporting multiple Zigbee devices" },
    { name: "Aqara", category: "Sensors & Switches", description: "Comprehensive range of smart sensors and controls" },
    { name: "Sengled", category: "Smart Bulbs", description: "Energy-efficient LED smart lighting" },
    { name: "Xiaomi Mi", category: "Ecosystem", description: "Affordable smart home devices and sensors" }
  ];

  const advantages = [
    "Wide manufacturer adoption and device variety",
    "Open standard with multiple chip vendors",
    "Excellent for dense device deployments",
    "Lower device costs due to competition",
    "Strong mesh networking capabilities",
    "Zigbee 3.0 improved interoperability"
  ];

  const limitations = [
    "2.4GHz interference from Wi-Fi networks",
    "Shorter range compared to Z-Wave",
    "Compatibility issues between profiles/versions",
    "Performance degrades in crowded RF environments",
    "May require channel planning in dense areas"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Radio className="h-5 w-5 text-elec-yellow" />
          2. Zigbee Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-4">
          Zigbee is an open standard for low-power mesh networking, widely adopted across the smart home industry.
        </p>
        
        {/* Key Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {zigbeeFeatures.map((feature, index) => (
            <div key={index} className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
              <div className="flex items-start gap-3">
                <feature.icon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{feature.aspect}</h4>
                  <div className="text-blue-200 font-medium mb-2">{feature.value}</div>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Brands */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Popular Zigbee Brands & Products</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularBrands.map((brand, index) => (
              <div key={index} className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <h5 className="font-semibold text-blue-200 text-sm">{brand.name}</h5>
                <div className="text-xs text-blue-300 mb-1">{brand.category}</div>
                <p className="text-xs text-gray-300">{brand.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages and Limitations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3">Advantages</h4>
            <ul className="space-y-2 text-sm">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span className="text-green-100">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3">Limitations</h4>
            <ul className="space-y-2 text-sm">
              {limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  <span className="text-red-100">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Details */}
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Technical Characteristics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-200 mb-3">Network Properties</h5>
              <ul className="space-y-1 text-blue-100">
                <li>• Data rate: 250 kbps</li>
                <li>• Channels: 16 (2.4GHz) globally</li>
                <li>• Encryption: AES-128 security</li>
                <li>• Power: Ultra-low consumption</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-200 mb-3">Deployment Benefits</h5>
              <ul className="space-y-1 text-purple-100">
                <li>• Large device ecosystems</li>
                <li>• Competitive pricing</li>
                <li>• Multiple hub options</li>
                <li>• Easy device pairing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Drawback Highlight */}
        <div className="p-4 bg-orange-900/20 border border-orange-600 rounded-lg">
          <h4 className="font-semibold text-orange-200 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Key Consideration: Interference
          </h4>
          <p className="text-orange-100 text-sm">
            <strong>2.4 GHz band crowding:</strong> Zigbee shares frequency space with Wi-Fi, Bluetooth, and even microwave ovens. 
            In environments with many Wi-Fi networks or heavy 2.4GHz usage, Zigbee performance may be affected. 
            Proper channel planning and mesh density can mitigate these issues.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};