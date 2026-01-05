import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Signal, Shield, AlertCircle } from 'lucide-react';

export const ZWaveOverviewSection = () => {
  const zwaveFeatures = [
    {
      aspect: "Operating Frequency",
      value: "Sub-1GHz",
      description: "868MHz (Europe), 908MHz (US), varies by region",
      icon: Waves
    },
    {
      aspect: "Typical Range",
      value: "30-100m indoors",
      description: "Excellent wall penetration due to lower frequency",
      icon: Signal
    },
    {
      aspect: "Network Capacity",
      value: "232 devices",
      description: "Maximum per network, can have multiple networks",
      icon: Shield
    },
    {
      aspect: "Interference Risk",
      value: "Very Low",
      description: "Dedicated frequency band, minimal interference",
      icon: AlertCircle
    }
  ];

  const commonDevices = [
    { category: "Smart Locks", examples: "Yale, Kwikset, Schlage door locks", reason: "Reliable security applications" },
    { category: "Thermostats", examples: "Honeywell, Trane HVAC controls", reason: "Professional HVAC integration" },
    { category: "Lighting Controls", examples: "Leviton, GE switches and dimmers", reason: "Reliable lighting automation" },
    { category: "Security Systems", examples: "Ring, ADT professional systems", reason: "Mission-critical reliability" },
    { category: "Window Coverings", examples: "Somfy, Lutron motorized blinds", reason: "Large motor control applications" },
    { category: "Pool/Spa Controls", examples: "Pentair, Hayward automation", reason: "Outdoor and industrial reliability" }
  ];

  const advantages = [
    "Excellent range and wall penetration",
    "Minimal interference from other devices",
    "Strong backward compatibility",
    "Professional-grade reliability",
    "Dedicated frequency allocation",
    "Interoperability certification (Z-Wave Plus)"
  ];

  const limitations = [
    "Proprietary standard (Silicon Labs ownership)",
    "Higher device costs compared to Zigbee",
    "Limited to 232 devices per network",
    "Fewer manufacturers compared to Zigbee",
    "Regional frequency variations"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Waves className="h-5 w-5 text-elec-yellow" />
          3. Z-Wave Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-4">
          Z-Wave is a proprietary wireless protocol optimised for reliability and range in smart home applications.
        </p>
        
        {/* Key Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {zwaveFeatures.map((feature, index) => (
            <div key={index} className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
              <div className="flex items-start gap-3">
                <feature.icon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{feature.aspect}</h4>
                  <div className="text-green-200 font-medium mb-2">{feature.value}</div>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Common Device Categories */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Common Z-Wave Device Categories</h4>
          <div className="grid grid-cols-1 gap-3">
            {commonDevices.map((device, index) => (
              <div key={index} className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex-1">
                    <h5 className="font-semibold text-green-200 text-sm">{device.category}</h5>
                    <p className="text-xs text-gray-300">{device.examples}</p>
                  </div>
                  <div className="text-xs text-gray-400 italic">{device.reason}</div>
                </div>
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
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Technical Characteristics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-green-200 mb-3">Network Properties</h5>
              <ul className="space-y-1 text-green-100">
                <li>• Data rate: 9.6-100 kbps</li>
                <li>• Hop limit: 4 hops maximum</li>
                <li>• Encryption: AES-128 security</li>
                <li>• Power: Ultra-low consumption</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-200 mb-3">Deployment Benefits</h5>
              <ul className="space-y-1 text-blue-100">
                <li>• Excellent for large homes</li>
                <li>• Professional installations</li>
                <li>• Guaranteed interoperability</li>
                <li>• Robust mesh networking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Strength Highlight */}
        <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
            <Signal className="h-4 w-4" />
            Key Strength: Superior Range & Penetration
          </h4>
          <p className="text-blue-100 text-sm">
            <strong>Sub-1GHz advantage:</strong> Z-Wave's lower frequency provides significantly better wall penetration 
            and longer range compared to 2.4GHz protocols. This makes it ideal for large homes, thick-walled buildings, 
            and professional installations where reliability is paramount.
          </p>
        </div>

        {/* Professional Focus */}
        <div className="p-4 bg-purple-900/20 border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-purple-200 mb-3">Professional Market Focus</h4>
          <p className="text-purple-100 text-sm mb-3">
            Z-Wave is often preferred in professional installations due to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-medium text-purple-200">Reliability:</span>
              <span className="text-purple-100 ml-2">Consistent performance in challenging environments</span>
            </div>
            <div>
              <span className="font-medium text-purple-200">Certification:</span>
              <span className="text-purple-100 ml-2">Guaranteed interoperability between devices</span>
            </div>
            <div>
              <span className="font-medium text-purple-200">Support:</span>
              <span className="text-purple-100 ml-2">Professional installer training and support</span>
            </div>
            <div>
              <span className="font-medium text-purple-200">Warranty:</span>
              <span className="text-purple-100 ml-2">Commercial-grade warranty terms</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};