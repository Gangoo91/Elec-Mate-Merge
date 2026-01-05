import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

export const HubBasedEcosystemsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Hub-Based Ecosystems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 bg-green-900/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <span className="text-lg">✓</span>
              Advantages
            </h4>
            <ul className="text-green-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Reliable:</strong> Mesh networks provide redundancy, local control continues even when internet fails</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Scalable:</strong> Can manage hundreds of devices without performance degradation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Better interoperability:</strong> Bridges different protocols and manufacturers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Local automations:</strong> Continue to work even if internet connection is lost</span>
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
                <span><strong>Higher upfront cost:</strong> Hub device plus compatible sensors and actuators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Technical complexity:</strong> Requires more knowledge to set up and configure properly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Single point of failure:</strong> If hub fails, entire system may stop working</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Device compatibility:</strong> Limited to devices that support the hub's protocols</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-elec-dark border border-gray-600 rounded-lg">
          <h4 className="font-medium text-elec-yellow mb-2">Best Use Cases:</h4>
          <p className="text-gray-300 text-sm">
            Medium to large installations (10+ devices), homes requiring high reliability, 
            multi-protocol environments, and installations where local control is critical for security or convenience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};