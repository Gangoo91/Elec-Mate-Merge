import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertCircle, CheckCircle } from 'lucide-react';

export const BMSModule5Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Hospital BMS Project</h4>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-red-400 font-medium mb-1">The Problem</h5>
                <p className="text-sm text-gray-300">
                  Electricians wired BACnet MSTP devices but forgot to install termination resistors 
                  at the ends of the RS-485 loop. During commissioning, communication kept dropping 
                  intermittently, causing frustration and delays.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-green-400 font-medium mb-1">The Solution</h5>
                <p className="text-sm text-gray-300">
                  Once termination resistors were added and polarity was double-checked, 
                  the network stabilised immediately. All devices began communicating reliably.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3">
              <h5 className="text-foreground font-medium mb-1">Impact</h5>
              <p className="text-sm text-gray-300">
                This simple fix saved days of troubleshooting and prevented project delays. 
                It highlighted the critical importance of following RS-485 wiring standards 
                for reliable BMS communication.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="text-orange-400 font-semibold mb-2">Key Takeaway</h4>
          <p className="text-sm text-gray-300">
            Small electrical details like termination resistors can make or break entire BMS networks. 
            Always follow protocol-specific wiring requirements to avoid costly commissioning delays.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};