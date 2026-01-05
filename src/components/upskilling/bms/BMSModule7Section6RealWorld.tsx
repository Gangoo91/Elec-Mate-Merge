import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const BMSModule7Section6RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 border-l-4 border-l-red-500">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            School Project: Incomplete Handover Consequences
          </h4>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-red-400 mb-2">The Situation</h5>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• BMS installed and tested successfully</li>
                  <li>• System was functioning correctly</li>
                  <li>• Client was eager to take control</li>
                  <li>• Pressure to complete project quickly</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-400 mb-2">Missing Documentation</h5>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• No updated IO list provided</li>
                  <li>• Software backups not created</li>
                  <li>• As-built drawings incomplete</li>
                  <li>• Minimal operator training given</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-3">
              <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-400" />
                One Month Later...
              </h5>
              <p className="text-sm text-gray-300">
                A fault occurred in the ventilation system. The facilities team couldn't diagnose 
                the problem because they had no documentation to identify which sensor was 
                malfunctioning or how to access the relevant control parameters.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-red-400 mb-2">Immediate Consequences</h5>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• System remained faulty for days</li>
                  <li>• Poor indoor air quality in classrooms</li>
                  <li>• Client lost confidence in the installation</li>
                  <li>• Emergency contractor call-out required</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-400 mb-2">Financial Impact</h5>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Costly emergency site visit</li>
                  <li>• Time spent recreating documentation</li>
                  <li>• Damaged professional reputation</li>
                  <li>• Potential warranty claim issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Lessons Learned: New Company Policy
          </h4>
          
          <p className="text-gray-300 mb-3">
            After this expensive lesson, the contractor introduced a strict policy:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-green-400 mb-2">Mandatory Requirements</h5>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Complete as-built documentation before handover</li>
                <li>• Tested software backups on separate media</li>
                <li>• Verified IO lists with physical device checks</li>
                <li>• Minimum 2-hour operator training session</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-green-400 mb-2">Quality Assurance</h5>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Project manager sign-off on all documentation</li>
                <li>• Client acknowledgment of training received</li>
                <li>• 30-day follow-up support included</li>
                <li>• No final payment until handover complete</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">🎯 Key Takeaway</h4>
          <p className="text-gray-300">
            The short-term pressure to complete quickly cost far more than the time needed for 
            proper handover. Professional standards protect both the contractor's reputation 
            and the client's interests.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { BMSModule7Section6RealWorld };