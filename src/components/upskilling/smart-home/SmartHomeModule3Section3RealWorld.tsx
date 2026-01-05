import { AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const SmartHomeModule3Section3RealWorld = () => {
  return (
    <Card className="bg-gradient-to-br from-amber-50/10 to-orange-50/10 border-amber-200/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-amber-300">
          <Lightbulb className="h-6 w-6" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-600/30">
          <p className="text-gray-300 leading-relaxed">
            A client complains their new smart LED bulbs flicker when dimmed. On inspection, 
            the installer finds the homeowner used old-style resistive dimmer switches.
          </p>
        </div>
        
        <Alert className="border-amber-600/30 bg-amber-900/20">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-gray-300">
            <strong className="text-amber-300">Challenge:</strong> What solution should the installer recommend?
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h4 className="text-foreground font-semibold">Recommended Solution:</h4>
          <div className="space-y-2 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Replace old resistive dimmers with LED-compatible trailing-edge dimmers</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Verify all bulbs are marked as "dimmable"</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Consider smart switches that control dimming digitally via the app</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Test the system thoroughly before completion</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};