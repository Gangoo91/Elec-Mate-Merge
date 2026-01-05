import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Zap, AlertCircle, TrendingUp } from 'lucide-react';

export const BMSModule5Section3ContentPart5 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Gauge className="h-5 w-5 text-elec-yellow" />
          Performance Characteristics & Optimisation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Understanding the performance characteristics of Modbus helps electricians make informed decisions about 
          system design and troubleshooting. Real-world performance depends on many factors beyond basic specifications.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              RTU Performance Factors
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-foreground font-medium">Polling Speed Limitations:</p>
                <p className="text-foreground">• 30 devices at 9600 bps = ~3 second update cycle</p>
                <p className="text-foreground">• Each transaction takes ~100-200ms minimum</p>
                <p className="text-foreground">• Higher baud rates help but distance limits apply</p>
              </div>
              <div className="space-y-1">
                <p className="text-foreground font-medium">Distance vs Speed Trade-offs:</p>
                <p className="text-foreground">• 1200m max at 9600 bps</p>
                <p className="text-foreground">• 500m typical at 19200 bps</p>
                <p className="text-foreground">• 100m maximum at 115200 bps</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              TCP/IP Performance Benefits
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Concurrent connections: Multiple masters can communicate simultaneously</p>
              <p className="text-foreground">• Faster response times: Typically 10-50ms vs 100-200ms for RTU</p>
              <p className="text-foreground">• Better error detection: TCP handles packet loss and retransmission</p>
              <p className="text-foreground">• Scalability: Hundreds of devices possible on single network</p>
              <p className="text-foreground">• Remote access: Can monitor devices across IP networks</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-elec-yellow" />
              Optimisation Strategies
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-foreground font-medium">For RTU Networks:</p>
                <p className="text-foreground">• Poll devices in sequential address order</p>
                <p className="text-foreground">• Use multiple register reads where possible</p>
                <p className="text-foreground">• Adjust timeout values based on network size</p>
                <p className="text-foreground">• Consider poll rate based on data criticality</p>
              </div>
              <div>
                <p className="text-foreground font-medium">For TCP/IP Networks:</p>
                <p className="text-foreground">• Use keep-alive connections to reduce overhead</p>
                <p className="text-foreground">• Implement quality of service (QoS) for critical data</p>
                <p className="text-foreground">• Monitor network utilisation and plan capacity</p>
                <p className="text-foreground">• Use VLANs to separate traffic types</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Real-World Performance Example</h4>
          <p className="text-foreground text-sm">
            A building with 50 electricity meters on Modbus RTU at 19200 bps achieved a 5-minute update cycle for all points. 
            When upgraded to Modbus TCP/IP, the same data updated every 30 seconds with much better reliability. The TCP/IP 
            version also allowed real-time alarms and remote monitoring capabilities that weren't practical with RTU.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};