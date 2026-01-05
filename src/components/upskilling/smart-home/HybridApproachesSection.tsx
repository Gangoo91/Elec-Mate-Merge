import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch } from 'lucide-react';

export const HybridApproachesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-elec-yellow" />
          Hybrid Approaches
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-300">
          Some ecosystems use both hub-based and hubless devices, combining the reliability of local hubs 
          with the convenience of cloud integration and voice control.
        </p>

        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/30 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Example: Philips Hue + Amazon Alexa</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-elec-dark border border-blue-600/20 rounded">
              <h5 className="font-medium text-blue-200 mb-2">Local Hub Component</h5>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Hue bulbs connect via Zigbee to Hue Bridge</li>
                <li>• Local control and automation rules</li>
                <li>• Works during internet outages</li>
                <li>• Fast response times</li>
              </ul>
            </div>
            
            <div className="p-3 bg-elec-dark border border-purple-600/20 rounded">
              <h5 className="font-medium text-purple-200 mb-2">Cloud Integration</h5>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• Alexa voice control via cloud</li>
                <li>• Remote access from anywhere</li>
                <li>• Integration with other smart home services</li>
                <li>• Advanced scheduling and scenes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-900/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3">Benefits of Hybrid</h4>
            <ul className="text-green-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Local reliability with cloud convenience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Voice control and remote access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Best of both architectural approaches</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-900/10 border border-yellow-600/20 rounded-lg">
            <h4 className="font-semibold text-yellow-200 mb-3">Considerations</h4>
            <ul className="text-yellow-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>More complex setup and configuration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Multiple points of potential failure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Higher cost due to multiple systems</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};