import { TestTube, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PolarityMethodsIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TestTube className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          This section explains how to safely and effectively test for correct polarity throughout 
          an electrical installation, using the correct instruments and procedures.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">What You'll Learn</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Proper equipment setup and test procedures</li>
            <li>• Standard test points at switches, sockets, and lighting</li>
            <li>• How to verify correct terminal connections</li>
            <li>• When and how to use different testing methods</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Safety First</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Polarity testing is performed on dead circuits using continuity settings. 
                Always ensure the installation is safely isolated and proven dead before testing.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};