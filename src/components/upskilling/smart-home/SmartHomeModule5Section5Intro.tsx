import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Shield, AlertTriangle } from 'lucide-react';

export const SmartHomeModule5Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Smart homes aren't just about convenience — they can be programmed to respond automatically 
          to emergencies and security events. By linking security systems with lighting, homeowners 
          gain extra safety, deterrence against intruders, and reassurance in high-risk situations. 
          For electricians, this means understanding how lighting automation ties into alarms, sensors, 
          and pre-set "scenes."
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-600/30">
            <Lightbulb className="h-6 w-6 text-blue-400 mb-2" />
            <h4 className="text-blue-400 font-semibold mb-2">Smart Scenes</h4>
            <p className="text-xs">Pre-programmed lighting configurations activated by triggers</p>
          </div>
          
          <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30">
            <Shield className="h-6 w-6 text-green-400 mb-2" />
            <h4 className="text-green-400 font-semibold mb-2">Security Integration</h4>
            <p className="text-xs">Lighting responds to sensors for deterrence and safety</p>
          </div>
          
          <div className="bg-red-600/20 p-4 rounded-lg border border-red-600/30">
            <AlertTriangle className="h-6 w-6 text-red-400 mb-2" />
            <h4 className="text-red-400 font-semibold mb-2">Emergency Response</h4>
            <p className="text-xs">Automated lighting guidance during critical situations</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};