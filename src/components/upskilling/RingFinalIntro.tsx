
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RingFinalIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <RotateCcw className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          Ring final circuits require a specific continuity testing method to confirm correct connections 
          and compliance. This section explains how to test a ring properly and what the results should tell you.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">What Makes Ring Circuits Special</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Current flows in both directions around the ring</li>
            <li>• Each conductor must form a complete loop</li>
            <li>• Requires specific three-stage testing method</li>
            <li>• Faults can create dangerous overload conditions</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Why Ring Testing Is Critical</h3>
              <p className="text-foreground text-sm leading-relaxed">
                A break in either leg (line, neutral, or CPC) can lead to overloaded conductors, 
                no earth protection at some outlets, and unsafe disconnection during a fault. 
                That's why continuity testing is essential to confirm each conductor forms a complete loop.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
