import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftRight } from 'lucide-react';

export const BMSModule5Section5ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-elec-yellow" />
          What is a Gateway?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-foreground">
            A gateway is a device that converts messages from one protocol into another.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-2">Translation Function</h4>
              <p className="text-foreground text-sm">
                It allows subsystems using different "languages" to share data with the BMS.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-2">Essential Integration</h4>
              <p className="text-foreground text-sm">
                Without gateways, devices on different protocols would remain isolated.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-2">System Unity</h4>
              <p className="text-foreground text-sm">
                Enables all building systems to work together as one integrated solution.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Practical Example</h4>
          <p className="text-foreground text-sm">
            Imagine a building with BACnet HVAC controllers, Modbus energy meters, and KNX lighting controls. 
            A gateway allows the BMS operator to see all this data in one place - room temperatures from BACnet, 
            power consumption from Modbus, and lighting status from KNX - all displayed together on a single screen.
          </p>
        </div>

        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2">Gateway vs Other Protocols</h4>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h5 className="font-medium text-green-200 mb-2">Advantages</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Enables multi-vendor solutions</li>
                <li>• Reduces system replacement costs</li>
                <li>• Allows gradual upgrades</li>
                <li>• Maintains existing investments</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-yellow-200 mb-2">Considerations</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Additional device to install and maintain</li>
                <li>• Potential single point of failure</li>
                <li>• May introduce slight data delays</li>
                <li>• Requires proper configuration</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};