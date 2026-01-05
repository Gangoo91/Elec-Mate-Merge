import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const ImportanceOfInterlocksSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          3. Why Interlocks are Important
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="leading-relaxed">
          Interlocks are crucial for both energy efficiency and equipment protection. Without them, HVAC systems can work against each other, 
          leading to significant energy waste, increased wear, and poor comfort levels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Key Benefits:</h4>
            <div className="space-y-3">
              <div className="bg-red-950/30 border border-red-600 rounded-lg p-3">
                <h5 className="font-medium text-red-200 mb-2">Prevent System Conflicts</h5>
                <p className="text-sm text-red-100">
                  Stop heating and cooling from running together, which wastes enormous amounts of energy.
                </p>
              </div>
              
              <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-3">
                <h5 className="font-medium text-blue-200 mb-2">Smart Environmental Response</h5>
                <p className="text-sm text-blue-100">
                  Disable HVAC when windows are open, preventing energy waste from conditioning outdoor air.
                </p>
              </div>
              
              <div className="bg-green-950/30 border border-green-600 rounded-lg p-3">
                <h5 className="font-medium text-green-200 mb-2">Controlled Ventilation</h5>
                <p className="text-sm text-green-100">
                  Ensure ventilation runs only when needed based on CO₂ levels or occupancy, not constantly.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Long-term Advantages:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Extend equipment lifespan by reducing unnecessary cycles
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Reduce energy waste and lower utility bills
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Improve overall system reliability
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Maintain consistent comfort levels
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Reduce maintenance requirements
              </li>
            </ul>

            <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-2">Cost Impact:</h5>
              <p className="text-sm text-gray-300">
                Studies show that buildings without proper HVAC interlocks can waste 15-30% more energy than properly integrated systems.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};