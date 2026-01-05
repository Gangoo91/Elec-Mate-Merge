import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, Clock, Users, Phone } from 'lucide-react';

const BMSModule7Section6Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Best Practices for Handover
            </h4>
            
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                <Clock className="h-5 w-5 text-elec-yellow mb-2" />
                <h5 className="font-medium text-foreground mb-1">Start Documentation Early</h5>
                <p className="text-sm text-foreground">
                  Don't leave IO list updates until the last day. Begin documenting changes 
                  as they occur during installation and commissioning.
                </p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <Users className="h-5 w-5 text-elec-yellow mb-2" />
                <h5 className="font-medium text-foreground mb-1">Interactive Demonstrations</h5>
                <p className="text-sm text-gray-300">
                  Walk through the system with the client, showing real examples. Trigger 
                  an alarm, change a setpoint, demonstrate actual system responses.
                </p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <CheckCircle className="h-5 w-5 text-elec-yellow mb-2" />
                <h5 className="font-medium text-foreground mb-1">Dual Format Documentation</h5>
                <p className="text-sm text-gray-300">
                  Provide both digital and hard copies of all documentation. Digital for 
                  easy searching and sharing, hard copies for emergency reference.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Training Best Practices
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">Keep Training Simple</h5>
                <p className="text-sm text-gray-300">
                  Focus on what the client actually needs: checking alarms, adjusting 
                  schedules, generating reports. Avoid overwhelming with technical details.
                </p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">Hands-On Practice</h5>
                <p className="text-sm text-gray-300">
                  Let operators practice common tasks during training. Create realistic 
                  scenarios they'll encounter in daily operations.
                </p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <Phone className="h-5 w-5 text-elec-yellow mb-2" />
                <h5 className="font-medium text-foreground mb-1">Support Contact Details</h5>
                <p className="text-sm text-gray-300">
                  Provide clear contact details for warranty support, emergency assistance, 
                  and ongoing maintenance services.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">✅ Handover Checklist</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-sm space-y-1 text-gray-300">
              <li>☐ All field devices correctly labelled</li>
              <li>☐ As-built drawings completed and accurate</li>
              <li>☐ IO lists updated with final addressing</li>
              <li>☐ Software backups created and tested</li>
              <li>☐ Commissioning records organised</li>
            </ul>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>☐ O&M manuals collated and indexed</li>
              <li>☐ Operator training completed</li>
              <li>☐ Warranty terms explained</li>
              <li>☐ Support contacts provided</li>
              <li>☐ Client sign-off obtained</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { BMSModule7Section6Practical };