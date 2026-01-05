import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const BMSModule5Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-3">Hospital Energy Monitoring Project</h4>
          
          <div className="space-y-3">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="font-medium text-foreground mb-1">The Challenge</h5>
              <p className="text-foreground text-sm">
                In a hospital, submeters reported via Modbus, but the BMS operated on BACnet. 
                The facility management team needed to monitor real-time energy use for cost allocation.
              </p>
            </div>
            
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="font-medium text-foreground mb-1">The Solution</h5>
              <p className="text-foreground text-sm">
                A Modbus-to-BACnet gateway was installed so the BMS could monitor real-time energy use. 
                The gateway converted the Modbus meter data into BACnet objects that appeared seamlessly 
                in the existing BMS interface.
              </p>
            </div>
            
            <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
              <h5 className="font-medium text-red-300 mb-1">The Problem</h5>
              <p className="text-foreground text-sm">
                During commissioning, some meters did not show up because electricians had miswired 
                polarity on the RS-485 bus.
              </p>
            </div>
            
            <div className="bg-green-900/20 border border-green-600/30 rounded p-3">
              <h5 className="font-medium text-green-300 mb-1">The Resolution</h5>
              <p className="text-foreground text-sm">
                Once corrected, the gateway translated all data successfully, allowing the hospital 
                to track energy use floor by floor. The facility team could now identify high-usage 
                areas and implement targeted energy-saving measures.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Lessons Learned</h4>
          <ul className="text-foreground text-sm space-y-1">
            <li>• Always double-check RS-485 polarity during installation</li>
            <li>• Test gateway communication before the commissioning team arrives</li>
            <li>• Keep spare gateway units on site for critical applications</li>
            <li>• Document which meters connect through which gateway</li>
            <li>• Coordinate with BMS programmers during the design phase</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};