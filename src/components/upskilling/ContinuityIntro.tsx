
import { Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContinuityIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          Continuity testing is one of the first electrical tests performed after visual inspection. 
          This section explains why it's carried out, what it proves, and how it fits into the testing sequence.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">What We'll Cover</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Understanding the fundamental purpose of continuity testing</li>
            <li>• Identifying which conductors require verification</li>
            <li>• Learning when and where continuity testing fits in the sequence</li>
            <li>• Recognising the critical safety implications</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Life Safety Test</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Continuity testing is not just a procedural requirement—it's a critical life safety verification. 
                A break in protective conductor continuity could prevent fault current from causing protective 
                device operation, leaving exposed metalwork dangerously live during fault conditions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
