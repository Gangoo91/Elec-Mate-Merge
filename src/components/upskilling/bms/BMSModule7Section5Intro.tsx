import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Zap } from 'lucide-react';

export const BMSModule7Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Commissioning is the process of proving that a Building Management System (BMS) works exactly as designed. 
          It happens in two stages: pre-functional commissioning (basic verification of wiring, power, communication, 
          and safety) and functional commissioning (testing full sequences of operations and confirming equipment 
          responds correctly to programmed logic).
        </p>
        <p>
          For electricians, this stage is critical: if signals are miswired, mislabelled, or not powered correctly, 
          commissioning stalls and delays the project. Your preparation and support during this phase directly 
          determines project success.
        </p>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Critical Success Factor</h4>
              <p className="text-sm text-foreground">
                Proper commissioning is the difference between a system that works as intended and one that creates 
                ongoing operational problems. Thorough electrical preparation ensures smooth commissioning execution.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};