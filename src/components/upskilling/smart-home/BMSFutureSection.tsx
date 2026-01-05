import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Cloud, Brain, Zap } from 'lucide-react';

export const BMSFutureSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Rocket className="h-5 w-5 text-elec-yellow" />
          Future Developments in BMS
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          The future of Building Management Systems is being shaped by cloud computing, artificial 
          intelligence, and deeper integration with renewable energy systems and smart grids.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">Cloud-Based BMS</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Remote monitoring and control</li>
              <li>• Reduced on-site hardware requirements</li>
              <li>• Automatic software updates</li>
              <li>• Multi-site management capabilities</li>
              <li>• Enhanced data analytics</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">AI-Driven Optimisation</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Predictive maintenance scheduling</li>
              <li>• Occupancy pattern learning</li>
              <li>• Weather-responsive control</li>
              <li>• Energy consumption optimisation</li>
              <li>• Fault detection and diagnosis</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Grid Integration</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Smart grid communication</li>
              <li>• Renewable energy coordination</li>
              <li>• Battery storage management</li>
              <li>• Dynamic pricing response</li>
              <li>• Grid stabilisation services</li>
            </ul>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">AI Learning Example:</h4>
            <p className="text-sm">
              Future BMS will learn that Conference Room A is always booked but rarely used on Friday 
              afternoons, automatically adjusting HVAC and lighting schedules to save energy while 
              maintaining quick response if actual occupancy is detected.
            </p>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Grid Integration Benefits:</h4>
            <p className="text-sm">
              Buildings will participate in demand response programs, reducing consumption during 
              peak periods and storing energy in thermal mass or batteries when renewables generate 
              excess power, creating revenue streams for building owners.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};