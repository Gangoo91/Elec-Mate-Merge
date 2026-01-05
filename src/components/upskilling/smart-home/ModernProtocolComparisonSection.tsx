import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ModernProtocolComparisonSection = () => {
  const comparisonData = [
    {
      aspect: "Data Speed",
      wifi: "Very High (1000+ Mbps)",
      bluetooth: "Medium (1-3 Mbps)",
      thread: "Low (250 Kbps)",
      matter: "Depends on underlying protocol"
    },
    {
      aspect: "Power Consumption",
      wifi: "High",
      bluetooth: "Very Low (BLE)",
      thread: "Low",
      matter: "Depends on underlying protocol"
    },
    {
      aspect: "Range",
      wifi: "Medium (30-50m)",
      bluetooth: "Short (10m)",
      thread: "Medium (mesh extends)",
      matter: "Depends on underlying protocol"
    },
    {
      aspect: "Setup Complexity",
      wifi: "Simple",
      bluetooth: "Very Simple",
      thread: "Simple (needs border router)",
      matter: "Very Simple (QR code)"
    },
    {
      aspect: "Ecosystem Lock-in",
      wifi: "Low",
      bluetooth: "Medium",
      thread: "Low",
      matter: "None (interoperable)"
    },
    {
      aspect: "Security",
      wifi: "High (WPA3)",
      bluetooth: "Medium",
      thread: "Very High",
      matter: "Very High"
    }
  ];

  const getScoreColor = (value: string) => {
    if (value.includes('Very High') || value.includes('Very Simple') || value === 'None (interoperable)') {
      return 'text-green-400';
    } else if (value.includes('High') || value.includes('Simple')) {
      return 'text-green-300';
    } else if (value.includes('Medium')) {
      return 'text-yellow-400';
    } else if (value.includes('Low') && !value.includes('Very Low')) {
      return 'text-orange-400';
    } else if (value.includes('Short') || value.includes('Very Low')) {
      return 'text-red-400';
    }
    return 'text-gray-400';
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          5. Protocol Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p>
          Understanding the characteristics of each protocol helps in selecting the right solution for specific applications. Each has distinct advantages that make them suitable for different use cases in smart home installations.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-3 text-foreground font-semibold">Aspect</th>
                <th className="text-center p-3 text-foreground font-semibold">Wi-Fi</th>
                <th className="text-center p-3 text-foreground font-semibold">Bluetooth</th>
                <th className="text-center p-3 text-foreground font-semibold">Thread</th>
                <th className="text-center p-3 text-foreground font-semibold">Matter</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-elec-dark">
                  <td className="p-3 font-medium text-elec-yellow">{row.aspect}</td>
                  <td className={`p-3 text-center text-sm ${getScoreColor(row.wifi)}`}>
                    {row.wifi}
                  </td>
                  <td className={`p-3 text-center text-sm ${getScoreColor(row.bluetooth)}`}>
                    {row.bluetooth}
                  </td>
                  <td className={`p-3 text-center text-sm ${getScoreColor(row.thread)}`}>
                    {row.thread}
                  </td>
                  <td className={`p-3 text-center text-sm ${getScoreColor(row.matter)}`}>
                    {row.matter}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-3">Network Topology Comparison</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li><strong className="text-foreground">Wi-Fi:</strong> Star topology (all devices connect to router)</li>
              <li><strong className="text-foreground">Bluetooth:</strong> Point-to-point or small networks</li>
              <li><strong className="text-foreground">Thread:</strong> Self-healing mesh network</li>
              <li><strong className="text-foreground">Matter:</strong> Uses underlying protocol's topology</li>
            </ul>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-3">Scalability Factors</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li><strong className="text-foreground">Wi-Fi:</strong> Limited by router capacity (~50-100 devices)</li>
              <li><strong className="text-foreground">Bluetooth:</strong> 7-8 active connections per hub</li>
              <li><strong className="text-foreground">Thread:</strong> Hundreds of devices per network</li>
              <li><strong className="text-foreground">Matter:</strong> Inherits scalability of underlying protocols</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">Which protocol would you choose for a high-resolution security camera, and which for a battery-powered door sensor? Explain your reasoning.</p>
        </div>
      </CardContent>
    </Card>
  );
};