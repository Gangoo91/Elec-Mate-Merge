import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Shield, Zap, Network, AlertTriangle } from 'lucide-react';

export const BMSModule4Section3Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          This section covered the essential aspects of access control integration in Building Management Systems.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <Shield className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Access Control in BMS</h4>
                <p className="text-sm text-gray-300">Regulates building entry and integrates with the BMS for efficiency and safety.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <Zap className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Door Relays</h4>
                <p className="text-sm text-gray-300">Control electromagnetic locks or strikes, configured as fail-safe or fail-secure.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <Network className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">System Integration</h4>
                <p className="text-sm text-gray-300">Integration with fire alarms, CCTV, and time-logging expands system value.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Professional Installation</h4>
                <p className="text-sm text-gray-300">Electricians must install, wire, label, and test access control devices to ensure security and safety.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/20 border border-elec-yellow/40 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-elec-yellow">Critical Safety Points</h4>
          <ul className="space-y-2 text-sm text-foreground">
            <li>• Fire alarm integration is mandatory for safe evacuation</li>
            <li>• Fail-safe locks must be used on emergency exits</li>
            <li>• Manual override mechanisms are required by regulations</li>
            <li>• Proper documentation prevents future safety issues</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};