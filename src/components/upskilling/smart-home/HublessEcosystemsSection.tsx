import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi } from 'lucide-react';

export const HublessEcosystemsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          Hubless Ecosystems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
          <h4 className="font-semibold text-blue-200 mb-2">How It Works</h4>
          <p className="text-blue-100 text-sm mb-3">
            Devices connect directly to Wi-Fi or Bluetooth, communicating through cloud services or local network protocols.
          </p>
          <div className="text-xs text-blue-100">
            <strong>Examples:</strong> Wi-Fi smart plugs, smart bulbs, Alexa-enabled devices, Google Nest products
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 bg-green-900/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <span className="text-lg">✓</span>
              Advantages
            </h4>
            <ul className="text-green-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Easy setup:</strong> No additional hardware required, simple app-based installation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Lower initial cost:</strong> No hub purchase needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Ideal for small-scale:</strong> Perfect for single room or flat installations (1-10 devices)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Wide device choice:</strong> Many manufacturers offer direct Wi-Fi connectivity</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-900/10 border border-red-600/20 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
              <span className="text-lg">✗</span>
              Disadvantages
            </h4>
            <ul className="text-red-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Wi-Fi congestion:</strong> Can overload router with too many connected devices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Limited scalability:</strong> Performance degrades as device count increases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Cloud dependency:</strong> Most features require internet connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Interoperability issues:</strong> Devices may not work well together across brands</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-elec-dark border border-gray-600 rounded-lg">
          <h4 className="font-medium text-elec-yellow mb-2">Best Use Cases:</h4>
          <p className="text-gray-300 text-sm">
            Small installations (1-10 devices), rental properties, budget-conscious projects, 
            and situations where simple setup is more important than advanced features.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};