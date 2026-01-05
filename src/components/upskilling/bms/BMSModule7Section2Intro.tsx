import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Zap } from 'lucide-react';

export const BMSModule7Section2Intro = () => {
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
          Once the design is complete and devices are mapped, the next step is to program the BMS controllers. 
          Programming defines how the system reacts to inputs, controls outputs, and maintains safe, efficient operation.
        </p>
        <p>
          Unlike general-purpose coding, BMS programming typically uses graphical logic blocks and industry-standard 
          techniques such as Boolean logic and PID (Proportional-Integral-Derivative) control.
        </p>
        <p>
          For electricians, understanding these methods doesn't mean writing full programs — it means being able to 
          recognise control logic, follow cause-and-effect sequences, and support engineers during testing.
        </p>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Programming Foundation</h4>
              <p className="text-sm text-foreground">
                BMS programming uses visual logic blocks and proven control methods to create reliable, 
                maintainable systems. Understanding these fundamentals helps electricians support commissioning 
                and troubleshooting throughout the system lifecycle.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};