import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const SmartHomeSection3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-[#1a1a1a] rounded-lg">
          <h3 className="font-semibold text-foreground mb-3">Smart Heating System Installation</h3>
          <p className="mb-4">A family installs a smart heating system in their home:</p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-foreground text-sm font-bold mt-0.5">S</div>
              <div>
                <h4 className="font-medium text-foreground">Sensors</h4>
                <p className="text-sm">Temperature and occupancy sensors measure room conditions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-foreground text-sm font-bold mt-0.5">C</div>
              <div>
                <h4 className="font-medium text-foreground">Controller</h4>
                <p className="text-sm">Decides: "If room &lt; 20°C and occupied → turn on heating"</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-foreground text-sm font-bold mt-0.5">A</div>
              <div>
                <h4 className="font-medium text-foreground">Actuator</h4>
                <p className="text-sm">Boiler relay switches on heating system</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-amber-900/30 border border-amber-600 rounded-lg">
          <h4 className="font-semibold text-amber-200 mb-2">👉 Critical Thinking Question:</h4>
          <p className="text-amber-100 mb-2">If the temperature sensor fails, what could happen?</p>
          <p className="text-amber-100">What redundancy should be built in to prevent heating system failures?</p>
        </div>
      </CardContent>
    </Card>
  );
};