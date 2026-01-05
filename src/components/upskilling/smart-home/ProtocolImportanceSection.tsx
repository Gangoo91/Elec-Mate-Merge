import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Link, Battery, Shield } from 'lucide-react';

export const ProtocolImportanceSection = () => {
  const importanceFactors = [
    {
      factor: "Compatibility",
      icon: Link,
      description: "Not all devices use the same 'language'",
      impact: "Device integration challenges",
      example: "Zigbee lights may not work directly with Wi-Fi hubs",
      color: "blue"
    },
    {
      factor: "Reliability",
      icon: AlertTriangle,
      description: "Some protocols cope better with interference",
      impact: "System stability and performance",
      example: "2.4GHz protocols compete with Wi-Fi and microwaves",
      color: "orange"
    },
    {
      factor: "Power Use",
      icon: Battery,
      description: "Impacts battery life of smart sensors",
      impact: "Maintenance frequency and costs",
      example: "Wi-Fi sensors need frequent battery changes vs Zigbee",
      color: "green"
    },
    {
      factor: "Security",
      icon: Shield,
      description: "Encryption levels differ between standards",
      impact: "Data protection and privacy",
      example: "Some protocols offer military-grade encryption",
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-600 bg-blue-900/20';
      case 'orange': return 'border-orange-600 bg-orange-900/20';
      case 'green': return 'border-green-600 bg-green-900/20';
      case 'red': return 'border-red-600 bg-red-900/20';
      default: return 'border-gray-600 bg-gray-900/20';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          2. Why Protocols Matter
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-4">
          Protocol choice affects every aspect of your smart home system's performance and user experience.
        </p>
        
        {/* Key Factors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {importanceFactors.map((factor, index) => (
            <div key={index} className={`p-4 border rounded-lg ${getColorClasses(factor.color)}`}>
              <div className="flex items-start gap-3 mb-3">
                <factor.icon className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{factor.factor}</h4>
                  <p className="text-gray-300 text-sm mb-3">{factor.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-gray-400">Impact: </span>
                      <span className="text-xs text-foreground">{factor.impact}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-400">Example: </span>
                      <span className="text-xs text-gray-300">{factor.example}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Practical Implications */}
        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Practical Implications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-yellow-200 mb-3">Installation Considerations</h5>
              <ul className="space-y-1 text-yellow-100">
                <li>• Hub and bridge requirements</li>
                <li>• Device placement for optimal range</li>
                <li>• Interference mitigation strategies</li>
                <li>• Power supply planning</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-cyan-200 mb-3">User Experience Factors</h5>
              <ul className="space-y-1 text-cyan-100">
                <li>• Response time and latency</li>
                <li>• Battery replacement frequency</li>
                <li>• System reliability and uptime</li>
                <li>• Cross-platform compatibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Impact */}
        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Real-World Impact Example</h4>
          <p className="text-gray-300 text-sm mb-3">
            A homeowner installed Wi-Fi smart door sensors throughout their large house. After a few weeks, they noticed:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="text-red-300 font-medium">Problems Encountered:</div>
              <ul className="space-y-1 text-red-100">
                <li>• Batteries dying every 2-3 weeks</li>
                <li>• Sensors losing connection in distant rooms</li>
                <li>• High data usage on home internet</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="text-green-300 font-medium">Better Solution:</div>
              <ul className="space-y-1 text-green-100">
                <li>• Zigbee sensors with 1-2 year battery life</li>
                <li>• Mesh network extending throughout house</li>
                <li>• Minimal internet bandwidth usage</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};