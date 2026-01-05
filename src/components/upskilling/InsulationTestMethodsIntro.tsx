
import { Settings, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationTestMethodsIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          Now that you know the purpose of insulation resistance testing, this section walks through 
          how to perform the test properly—covering test setup, procedures, and circuit configurations.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">What You'll Learn</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Proper equipment setup and test voltage selection</li>
            <li>• Standard test combinations (L-N, L-E, N-E)</li>
            <li>• How to handle different circuit configurations</li>
            <li>• When and how to adapt procedures for special circumstances</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Critical Safety Note</h3>
              <p className="text-foreground text-sm leading-relaxed">
                This test uses high voltage (typically 500V DC) which can damage electronic equipment. 
                Always disconnect sensitive devices before testing and ensure proper isolation.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
