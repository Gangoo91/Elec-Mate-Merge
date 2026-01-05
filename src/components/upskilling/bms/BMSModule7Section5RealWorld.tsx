import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle } from 'lucide-react';

export const BMSModule7Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-foreground font-semibold mb-3">Large Office Project: AHU Fire Safety Testing</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-foreground font-semibold mb-1">The Problem</h4>
                <p className="text-sm text-foreground">
                  During functional commissioning of an AHU, fire alarm simulation revealed that dampers 
                  failed to close during emergency shutdown. The system appeared to function normally during 
                  pre-functional testing, but failed the critical safety sequence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-foreground font-semibold mb-1">Initial Response</h4>
                <p className="text-sm text-foreground">
                  Electricians initially suspected programming errors since the damper actuators had worked 
                  correctly during individual testing. The commissioning engineer began reviewing control logic 
                  and sequence programming.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-foreground font-semibold mb-1">Root Cause Discovery</h4>
                <p className="text-sm text-foreground">
                  Further testing with multimeters showed the actuator had been wired to the wrong digital output. 
                  During normal operation, this output happened to provide the correct signal, but during fire alarm 
                  sequences, the emergency logic used a different output channel.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-foreground font-semibold mb-1">Resolution and Learning</h4>
                <p className="text-sm text-foreground">
                  Once the wiring was corrected to match the IO schedule, the damper responded correctly to all 
                  sequences including emergency shutdowns. This highlighted the critical importance of thorough 
                  pre-functional I/O checks and accurate wiring verification before sequence testing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Key Lessons</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              Always verify wiring against IO schedules, not just functional operation
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              Test emergency and safety sequences separately from normal operation
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              Use multimeters to verify signals before assuming programming issues
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};