
import { Gauge, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestProceduresIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Gauge className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          Once you know what you're testing, you need to do it right. This section outlines standard 
          continuity test procedures and the expected values you should see in a healthy installation.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">Why Proper Procedures Matter</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Ensure accurate and reliable test results</li>
            <li>• Enable proper interpretation of readings</li>
            <li>• Support compliance with BS7671 requirements</li>
            <li>• Help identify potential safety issues</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Critical Point</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Following correct test procedures isn't just about compliance—it's about safety. 
                Inaccurate readings can lead to dangerous installations being passed as safe, 
                or safe installations being unnecessarily condemned.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
