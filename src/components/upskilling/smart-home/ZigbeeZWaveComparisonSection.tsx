import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Signal, Battery, Zap, Network, Users } from 'lucide-react';

export const ZigbeeZWaveComparisonSection = () => {
  const comparisonData = [
    {
      factor: "Range",
      icon: Signal,
      zigbee: { value: "10-20m per hop", rating: 3, description: "Shorter range but extends via mesh" },
      zwave: { value: "30-100m per hop", rating: 5, description: "Excellent range and wall penetration" }
    },
    {
      factor: "Mesh Strength",
      icon: Network,
      zigbee: { value: "Excellent", rating: 5, description: "Supports thousands of devices" },
      zwave: { value: "Very Good", rating: 4, description: "Reliable but limited to 232 devices" }
    },
    {
      factor: "Power Consumption",
      icon: Battery,
      zigbee: { value: "Ultra Low", rating: 5, description: "1-2 years battery life typical" },
      zwave: { value: "Ultra Low", rating: 5, description: "Similar battery performance" }
    },
    {
      factor: "Network Latency",
      icon: Zap,
      zigbee: { value: "Very Fast", rating: 5, description: "Quick response for automation" },
      zwave: { value: "Fast", rating: 4, description: "Slightly slower but adequate" }
    },
    {
      factor: "Device Ecosystem",
      icon: Users,
      zigbee: { value: "Extensive", rating: 5, description: "Hundreds of manufacturers" },
      zwave: { value: "Smaller", rating: 3, description: "Fewer but certified options" }
    }
  ];

  const practicalComparison = [
    {
      scenario: "Large house (5+ bedrooms)",
      zigbee: "May need strategic device placement",
      zwave: "Excellent coverage with fewer devices",
      winner: "Z-Wave"
    },
    {
      scenario: "Dense device network (50+ devices)",
      zigbee: "Handles high device count well",
      zwave: "Limited to 232 devices max",
      winner: "Zigbee"
    },
    {
      scenario: "Thick walls (stone/concrete)",
      zigbee: "May struggle with penetration",
      zwave: "Superior wall penetration",
      winner: "Z-Wave"
    },
    {
      scenario: "Budget-conscious installation",
      zigbee: "More affordable device options",
      zwave: "Higher device costs",
      winner: "Zigbee"
    },
    {
      scenario: "Wi-Fi crowded environment",
      zigbee: "May experience interference",
      zwave: "No interference issues",
      winner: "Z-Wave"
    }
  ];

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getWinnerColor = (winner: string) => {
    return winner === 'Zigbee' ? 'text-blue-400' : winner === 'Z-Wave' ? 'text-green-400' : 'text-gray-400';
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          4. Range, Mesh, and Power Use Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-6">
          Direct comparison of key performance factors between Zigbee and Z-Wave protocols.
        </p>
        
        {/* Performance Comparison */}
        <div className="space-y-4">
          {comparisonData.map((comparison, index) => (
            <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <comparison.icon className="h-5 w-5 text-elec-yellow" />
                <h4 className="font-semibold text-foreground text-lg">{comparison.factor}</h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-900/20 border border-blue-600 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-blue-200">Zigbee</h5>
                    <div className="text-xs text-yellow-400">{getRatingStars(comparison.zigbee.rating)}</div>
                  </div>
                  <div className="font-medium text-blue-100 mb-1">{comparison.zigbee.value}</div>
                  <div className="text-xs text-blue-100 opacity-75">{comparison.zigbee.description}</div>
                </div>
                
                <div className="p-3 bg-green-900/20 border border-green-600 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-green-200">Z-Wave</h5>
                    <div className="text-xs text-yellow-400">{getRatingStars(comparison.zwave.rating)}</div>
                  </div>
                  <div className="font-medium text-green-100 mb-1">{comparison.zwave.value}</div>
                  <div className="text-xs text-green-100 opacity-75">{comparison.zwave.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Practical Scenario Comparison */}
        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Practical Scenario Analysis</h4>
          <div className="space-y-3">
            {practicalComparison.map((scenario, index) => (
              <div key={index} className="p-3 bg-[#1a1a1a] border border-gray-700 rounded">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h5 className="font-medium text-foreground">{scenario.scenario}</h5>
                  <span className={`text-sm font-medium ${getWinnerColor(scenario.winner)}`}>
                    Winner: {scenario.winner}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-blue-300 font-medium">Zigbee: </span>
                    <span className="text-gray-300">{scenario.zigbee}</span>
                  </div>
                  <div>
                    <span className="text-green-300 font-medium">Z-Wave: </span>
                    <span className="text-gray-300">{scenario.zwave}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3">Zigbee Strengths</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Massive device ecosystem</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Lower device costs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>High device density support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Open standard</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3">Z-Wave Strengths</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Superior range and penetration</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>No interference issues</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Guaranteed interoperability</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Professional reliability</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Summary */}
        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Bottom Line Comparison</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="p-3 bg-elec-gray border border-gray-600 rounded">
              <h5 className="font-medium text-yellow-200 mb-2">Range Winner</h5>
              <div className="text-green-300 font-medium">Z-Wave</div>
              <div className="text-xs text-gray-400 mt-1">Better wall penetration</div>
            </div>
            <div className="p-3 bg-elec-gray border border-gray-600 rounded">
              <h5 className="font-medium text-yellow-200 mb-2">Ecosystem Winner</h5>
              <div className="text-blue-300 font-medium">Zigbee</div>
              <div className="text-xs text-gray-400 mt-1">More devices & brands</div>
            </div>
            <div className="p-3 bg-elec-gray border border-gray-600 rounded">
              <h5 className="font-medium text-yellow-200 mb-2">Power Use</h5>
              <div className="text-foreground font-medium">Tie</div>
              <div className="text-xs text-gray-400 mt-1">Both ultra-low power</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};