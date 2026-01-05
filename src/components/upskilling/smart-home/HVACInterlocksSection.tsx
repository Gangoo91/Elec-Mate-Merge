import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const HVACInterlocksSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          2. What are Interlocks?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="leading-relaxed">
          Interlocks are safety or efficiency features that prevent two systems from operating in conflict. 
          They ensure that incompatible operations cannot run simultaneously, protecting equipment and preventing energy waste.
        </p>

        <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Common Interlock Example:</h4>
          <p className="text-sm text-gray-300 mb-2">
            Heating system interlocked with cooling system → only one runs at a time
          </p>
          <p className="text-xs text-gray-400">
            This prevents the wasteful situation where heating and cooling systems fight against each other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Types of Interlocks:</h4>
            
            <div className="space-y-3">
              <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-3">
                <h5 className="font-medium text-blue-200 mb-2">Electrical Interlocks</h5>
                <p className="text-sm text-blue-100">
                  Physical wiring connections that prevent simultaneous operation through electrical circuits.
                </p>
              </div>
              
              <div className="bg-purple-950/30 border border-purple-600 rounded-lg p-3">
                <h5 className="font-medium text-purple-200 mb-2">Software Interlocks</h5>
                <p className="text-sm text-purple-100">
                  Programmed rules in smart hubs, BMS, or thermostats that logically prevent conflicts.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">How Interlocks Work:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                Monitor system status continuously
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                Apply predefined logic rules
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                Automatically disable conflicting operations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                Provide override capabilities when needed
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};