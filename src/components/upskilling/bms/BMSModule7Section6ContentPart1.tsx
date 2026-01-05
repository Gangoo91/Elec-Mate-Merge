import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Users, Wrench, FileCheck } from 'lucide-react';

const BMSModule7Section6ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Client Handover Process
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          The handover ensures the client can safely and effectively operate the BMS. This structured 
          process prevents misunderstandings and reduces the likelihood of system misuse.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <Monitor className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">System Demonstration</h4>
              <ul className="text-sm space-y-2 text-foreground">
                <li>• Navigate dashboards and graphics</li>
                <li>• Acknowledge and clear alarms</li>
                <li>• Adjust setpoints safely</li>
                <li>• Access historical trends and reports</li>
                <li>• Override controls when necessary</li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <Users className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Operator Training</h4>
              <ul className="text-sm space-y-2 text-foreground">
                <li>• Daily operational procedures</li>
                <li>• Logging in and system navigation</li>
                <li>• Checking and responding to alarms</li>
                <li>• Generating and exporting reports</li>
                <li>• Basic troubleshooting techniques</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <Wrench className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Maintenance Overview</h4>
              <ul className="text-sm space-y-2 text-foreground">
                <li>• Escalation procedures for faults</li>
                <li>• Remote monitoring and alerts</li>
                <li>• Preventive maintenance schedules</li>
                <li>• Emergency procedures and contacts</li>
                <li>• Manual override procedures</li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <FileCheck className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Warranty Briefing</h4>
              <ul className="text-sm space-y-2 text-foreground">
                <li>• Coverage periods and limitations</li>
                <li>• Service response times</li>
                <li>• Warranty claim procedures</li>
                <li>• Maintenance requirements</li>
                <li>• Support contact information</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
          <p className="text-foreground">
            👉 <strong>Why is it important to train building operators during handover?</strong>
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-elec-yellow">Click for answer</summary>
            <p className="mt-2 text-sm text-foreground">
              Proper training ensures operators can use the system safely and effectively, preventing 
              misuse that could damage equipment, waste energy, or create uncomfortable conditions. 
              It also reduces call-backs and builds client confidence.
            </p>
          </details>
        </div>
      </CardContent>
    </Card>
  );
};

export { BMSModule7Section6ContentPart1 };