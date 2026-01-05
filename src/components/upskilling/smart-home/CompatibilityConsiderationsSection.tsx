import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Link, CheckCircle, XCircle } from 'lucide-react';

export const CompatibilityConsiderationsSection = () => {
  const zigbeeCompatibility = [
    {
      issue: "Profile Compatibility",
      description: "Devices must use the same Zigbee profile (ZHA, ZLL, Zigbee 3.0)",
      impact: "Mix of profiles may not work together",
      solution: "Choose Zigbee 3.0 devices for best compatibility"
    },
    {
      issue: "Brand Ecosystems",
      description: "Some brands create closed ecosystems (e.g., Philips Hue)",
      impact: "Limited integration with other brands",
      solution: "Use universal hubs like SmartThings or Hubitat"
    },
    {
      issue: "Hub Requirements",
      description: "Most Zigbee devices need a compatible hub/bridge",
      impact: "Additional cost and complexity",
      solution: "Plan hub selection based on device ecosystem"
    }
  ];

  const zwaveCompatibility = [
    {
      issue: "Backward Compatibility",
      description: "Z-Wave devices are generally backward compatible",
      impact: "Older devices work with newer hubs",
      solution: "Strong compatibility across generations"
    },
    {
      issue: "Regional Frequencies",
      description: "Different frequencies in US (908MHz) vs Europe (868MHz)",
      impact: "Devices are region-locked",
      solution: "Ensure devices match local frequency"
    },
    {
      issue: "Limited Vendors",
      description: "Fewer manufacturers compared to Zigbee",
      impact: "Less choice but better guaranteed compatibility",
      solution: "Select from certified Z-Wave Alliance members"
    }
  ];

  const hubRequirements = [
    {
      protocol: "Zigbee",
      hubOptions: [
        { name: "Samsung SmartThings", type: "Cloud-based", compatibility: "Excellent" },
        { name: "Hubitat Elevation", type: "Local processing", compatibility: "Excellent" },
        { name: "Philips Hue Bridge", type: "Brand-specific", compatibility: "Limited" },
        { name: "Amazon Echo Plus", type: "Built-in hub", compatibility: "Basic" }
      ]
    },
    {
      protocol: "Z-Wave",
      hubOptions: [
        { name: "SmartThings Hub", type: "Cloud-based", compatibility: "Excellent" },
        { name: "Hubitat Elevation", type: "Local processing", compatibility: "Excellent" },
        { name: "Vera Controllers", type: "Dedicated Z-Wave", compatibility: "Excellent" },
        { name: "HomeSeer", type: "Professional grade", compatibility: "Excellent" }
      ]
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          5. Compatibility Considerations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-6">
          Understanding compatibility requirements ensures smooth integration and avoids costly mistakes.
        </p>
        
        {/* Zigbee Compatibility Issues */}
        <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-blue-200 mb-4 flex items-center gap-2">
            <Link className="h-4 w-4" />
            Zigbee Compatibility Considerations
          </h4>
          <div className="space-y-3">
            {zigbeeCompatibility.map((item, index) => (
              <div key={index} className="p-3 bg-[#1a1a1a] border border-gray-700 rounded">
                <h5 className="font-medium text-foreground mb-2">{item.issue}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-blue-300 font-medium">Issue: </span>
                    <span className="text-gray-300">{item.description}</span>
                  </div>
                  <div>
                    <span className="text-orange-300 font-medium">Impact: </span>
                    <span className="text-gray-300">{item.impact}</span>
                  </div>
                  <div>
                    <span className="text-green-300 font-medium">Solution: </span>
                    <span className="text-gray-300">{item.solution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Z-Wave Compatibility Issues */}
        <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
          <h4 className="font-semibold text-green-200 mb-4 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Z-Wave Compatibility Considerations
          </h4>
          <div className="space-y-3">
            {zwaveCompatibility.map((item, index) => (
              <div key={index} className="p-3 bg-[#1a1a1a] border border-gray-700 rounded">
                <h5 className="font-medium text-foreground mb-2">{item.issue}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-green-300 font-medium">Details: </span>
                    <span className="text-gray-300">{item.description}</span>
                  </div>
                  <div>
                    <span className="text-blue-300 font-medium">Impact: </span>
                    <span className="text-gray-300">{item.impact}</span>
                  </div>
                  <div>
                    <span className="text-yellow-300 font-medium">Guidance: </span>
                    <span className="text-gray-300">{item.solution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hub Requirements */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Hub Integration Requirements</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {hubRequirements.map((protocol, protocolIndex) => (
              <div key={protocolIndex} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <h5 className="font-semibold text-foreground mb-3">{protocol.protocol} Hub Options</h5>
                <div className="space-y-3">
                  {protocol.hubOptions.map((hub, hubIndex) => (
                    <div key={hubIndex} className="p-2 bg-[#0f0f0f] border border-gray-700 rounded text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{hub.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          hub.compatibility === 'Excellent' ? 'bg-green-600 text-green-100' :
                          hub.compatibility === 'Basic' ? 'bg-yellow-600 text-yellow-100' :
                          'bg-orange-600 text-orange-100'
                        }`}>
                          {hub.compatibility}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">{hub.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Compatibility Best Practices</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-purple-200 mb-3">Planning Phase</h5>
              <ul className="space-y-1 text-purple-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Choose hub before selecting devices</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Verify protocol versions and profiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Check manufacturer compatibility lists</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Plan for future expansion needs</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-indigo-200 mb-3">Common Pitfalls</h5>
              <ul className="space-y-1 text-indigo-100">
                <li className="flex items-center gap-2">
                  <XCircle className="h-3 w-3 text-red-400" />
                  <span>Mixing incompatible protocol versions</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3 w-3 text-red-400" />
                  <span>Assuming all devices of same protocol work together</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3 w-3 text-red-400" />
                  <span>Not considering regional frequency differences</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3 w-3 text-red-400" />
                  <span>Choosing incompatible hub for device ecosystem</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Recommendation */}
        <div className="p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
          <h4 className="font-semibold text-yellow-200 mb-3">Key Recommendation</h4>
          <p className="text-yellow-100 text-sm">
            <strong>Both protocols require hubs for integration with Wi-Fi/cloud ecosystems.</strong> Choose your hub platform first, 
            then select devices compatible with that hub. This approach ensures all devices can communicate effectively and be 
            controlled from a single interface, avoiding costly compatibility issues later.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};