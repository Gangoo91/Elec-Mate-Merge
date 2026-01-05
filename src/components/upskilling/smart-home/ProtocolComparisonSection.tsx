import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Zap, Signal, Battery, Network } from 'lucide-react';

export const ProtocolComparisonSection = () => {
  const comparisonData = [
    {
      factor: "Range",
      icon: Signal,
      wifi: { value: "30-50m", description: "Limited by walls and obstacles", rating: 3 },
      zigbee: { value: "10m + mesh", description: "Extended through mesh networking", rating: 4 },
      zwave: { value: "30m + mesh", description: "Good base range plus mesh", rating: 5 },
      bluetooth: { value: "<10m", description: "Short range, direct connection", rating: 2 }
    },
    {
      factor: "Speed/Bandwidth",
      icon: Zap,
      wifi: { value: "High (Mbps)", description: "Excellent for video/audio", rating: 5 },
      zigbee: { value: "Low (kbps)", description: "Sufficient for sensors", rating: 3 },
      zwave: { value: "Low (kbps)", description: "Good for control signals", rating: 3 },
      bluetooth: { value: "Medium", description: "Good for small data transfers", rating: 4 }
    },
    {
      factor: "Power Consumption",
      icon: Battery,
      wifi: { value: "High", description: "Continuous high power use", rating: 2 },
      zigbee: { value: "Very Low", description: "Years of battery life", rating: 5 },
      zwave: { value: "Very Low", description: "Excellent battery efficiency", rating: 5 },
      bluetooth: { value: "Ultra Low", description: "BLE is extremely efficient", rating: 5 }
    },
    {
      factor: "Network Topology",
      icon: Network,
      wifi: { value: "Star", description: "All devices connect to router", rating: 3 },
      zigbee: { value: "Mesh", description: "Self-healing, redundant paths", rating: 5 },
      zwave: { value: "Mesh", description: "Reliable mesh with routing", rating: 5 },
      bluetooth: { value: "Point-to-Point", description: "Direct device connections", rating: 2 }
    }
  ];

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case 'wifi': return 'text-purple-300';
      case 'zigbee': return 'text-blue-300';
      case 'zwave': return 'text-green-300';
      case 'bluetooth': return 'text-cyan-300';
      default: return 'text-gray-300';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          4. Comparing Key Characteristics
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-6">
          Understanding how different protocols perform across key metrics helps in selecting the right technology for specific applications.
        </p>
        
        {/* Comparison Table */}
        <div className="space-y-6">
          {comparisonData.map((comparison, index) => (
            <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <comparison.icon className="h-5 w-5 text-elec-yellow" />
                <h4 className="font-semibold text-foreground text-lg">{comparison.factor}</h4>
              </div>
              
              {/* Mobile-first responsive design */}
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
                <div className="p-3 bg-purple-900/20 border border-purple-600 rounded">
                  <div className="flex justify-between items-center sm:block">
                    <h5 className="font-semibold text-purple-200 mb-0 sm:mb-1">Wi-Fi</h5>
                    <div className="text-xs text-yellow-400">{getRatingStars(comparison.wifi.rating)}</div>
                  </div>
                  <div className="font-medium text-purple-100 text-sm">{comparison.wifi.value}</div>
                  <div className="text-xs text-purple-100 opacity-75 hidden sm:block mt-1">{comparison.wifi.description}</div>
                </div>
                
                <div className="p-3 bg-blue-900/20 border border-blue-600 rounded">
                  <div className="flex justify-between items-center sm:block">
                    <h5 className="font-semibold text-blue-200 mb-0 sm:mb-1">Zigbee</h5>
                    <div className="text-xs text-yellow-400">{getRatingStars(comparison.zigbee.rating)}</div>
                  </div>
                  <div className="font-medium text-blue-100 text-sm">{comparison.zigbee.value}</div>
                  <div className="text-xs text-blue-100 opacity-75 hidden sm:block mt-1">{comparison.zigbee.description}</div>
                </div>
                
                <div className="p-3 bg-green-900/20 border border-green-600 rounded">
                  <div className="flex justify-between items-center sm:block">
                    <h5 className="font-semibold text-green-200 mb-0 sm:mb-1">Z-Wave</h5>
                    <div className="text-xs text-yellow-400">{getRatingStars(comparison.zwave.rating)}</div>
                  </div>
                  <div className="font-medium text-green-100 text-sm">{comparison.zwave.value}</div>
                  <div className="text-xs text-green-100 opacity-75 hidden sm:block mt-1">{comparison.zwave.description}</div>
                </div>
                
                <div className="p-3 bg-cyan-900/20 border border-cyan-600 rounded">
                  <div className="flex justify-between items-center sm:block">
                    <h5 className="font-semibold text-cyan-200 mb-0 sm:mb-1">Bluetooth</h5>
                    <div className="text-xs text-yellow-400">{getRatingStars(comparison.bluetooth.rating)}</div>
                  </div>
                  <div className="font-medium text-cyan-100 text-sm">{comparison.bluetooth.value}</div>
                  <div className="text-xs text-cyan-100 opacity-75 hidden sm:block mt-1">{comparison.bluetooth.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <div className="p-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Protocol Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-sm">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h5 className="font-medium text-purple-200 mb-2">Wi-Fi</h5>
              <div className="space-y-1 text-purple-100 text-xs">
                <div>High bandwidth ★★★★★</div>
                <div>Short range ★★★☆☆</div>
                <div>High power ★★☆☆☆</div>
              </div>
            </div>
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h5 className="font-medium text-blue-200 mb-2">Zigbee</h5>
              <div className="space-y-1 text-blue-100 text-xs">
                <div>Low bandwidth ★★★☆☆</div>
                <div>Mesh range ★★★★☆</div>
                <div>Ultra low power ★★★★★</div>
              </div>
            </div>
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h5 className="font-medium text-green-200 mb-2">Z-Wave</h5>
              <div className="space-y-1 text-green-100 text-xs">
                <div>Low bandwidth ★★★☆☆</div>
                <div>Good mesh range ★★★★★</div>
                <div>Ultra low power ★★★★★</div>
              </div>
            </div>
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h5 className="font-medium text-cyan-200 mb-2">Bluetooth</h5>
              <div className="space-y-1 text-cyan-100 text-xs">
                <div>Medium bandwidth ★★★★☆</div>
                <div>Very short range ★★☆☆☆</div>
                <div>Ultra low power ★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};