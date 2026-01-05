import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const SmartHomeSection5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">The Tale of Two Approaches</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-[#1a1a1a] border border-blue-600 rounded">
              <h5 className="font-medium text-blue-200 mb-2">Victorian Terrace Retrofit</h5>
              <p className="text-blue-100 text-sm mb-2">
                A homeowner wants to upgrade their Victorian terrace with smart lighting and heating. 
                Due to solid walls and no existing cable routes, wireless retrofits are chosen.
              </p>
              <ul className="text-xs text-blue-100 space-y-1">
                <li>• Wireless smart switches and bulbs</li>
                <li>• Zigbee mesh network</li>
                <li>• Smart thermostat with wireless sensors</li>
                <li>• Total cost: £1,200, installed in 2 days</li>
              </ul>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-green-600 rounded">
              <h5 className="font-medium text-green-200 mb-2">New Housing Estate</h5>
              <p className="text-green-100 text-sm mb-2">
                A developer designing a new housing estate integrates Cat 6 cabling and 
                centralised hubs into all units during construction.
              </p>
              <ul className="text-xs text-green-100 space-y-1">
                <li>• Structured cabling throughout</li>
                <li>• Central control panels</li>
                <li>• Integrated lighting and HVAC</li>
                <li>• Total cost: £8,000 per unit during build</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-elec-yellow mb-2">Discussion Question:</h5>
            <p className="text-gray-300 text-sm">
              Which system will be easier to expand in 10 years? Why?
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Consider: device compatibility, infrastructure limitations, and emerging technologies.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};