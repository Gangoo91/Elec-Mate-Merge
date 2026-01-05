import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle } from 'lucide-react';

export const BMSModule7Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-300 font-semibold mb-2">Data Centre BMS Project - Upload Failures</h4>
              <div className="space-y-3 text-sm">
                <p className="text-foreground">
                  On a data centre BMS project, engineers repeatedly failed to upload programs to several VAV controllers 
                  located throughout the facility. The upload process would start normally but then timeout or fail with 
                  communication errors partway through.
                </p>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Initial Troubleshooting Attempts:</p>
                  <ul className="space-y-1 ml-4 text-xs">
                    <li>• Engineers tried different programming software versions</li>
                    <li>• Multiple laptops were tested with same results</li>
                    <li>• Network connectivity appeared normal from BMS server</li>
                    <li>• Controllers responded to simple ping commands</li>
                    <li>• Upload worked fine on similar controllers in other areas</li>
                  </ul>
                </div>
                
                <p className="text-foreground">
                  After two days of delays, the electrical contractor was asked to verify the physical layer. 
                  Upon investigation, electricians discovered that RS-485 communication wiring had been installed with 
                  reversed polarity on multiple controllers during the initial installation phase.
                </p>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Root Cause Analysis:</p>
                  <ul className="space-y-1 ml-4 text-xs">
                    <li>• Installation drawings showed A+ and B- terminal designations</li>
                    <li>• Cable manufacturer used different colour coding than expected</li>
                    <li>• Electricians followed cable colours rather than checking polarity</li>
                    <li>• Basic communication worked due to RS-485 fault tolerance</li>
                    <li>• Complex uploads failed due to data integrity issues</li>
                  </ul>
                </div>
                
                <p className="text-foreground">
                  Once the polarity was corrected on all affected controllers, uploads completed successfully and all 
                  controllers came online without further issues. However, the project experienced a two-week delay in 
                  handover while the rework was completed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-green-300 font-semibold mb-2">Lessons Learned & Corrective Actions</h4>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Process Improvements:</p>
                    <ul className="space-y-1 ml-4 text-xs">
                      <li>• Mandatory communication testing before controller installation</li>
                      <li>• RS-485 polarity verification checklist implemented</li>
                      <li>• Cable colour coding standards documented for all projects</li>
                      <li>• Test upload procedure developed for sample controllers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Quality Control Measures:</p>
                    <ul className="space-y-1 ml-4 text-xs">
                      <li>• Pre-commissioning communication verification required</li>
                      <li>• Electrical sign-off needed before software deployment</li>
                      <li>• Standard test procedures for all communication types</li>
                      <li>• Training provided on communication troubleshooting</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                  <p className="text-blue-400 font-semibold mb-1">Key Takeaway:</p>
                  <p className="text-xs text-foreground">
                    This incident highlighted the critical importance of electricians verifying communication wiring before 
                    software deployment. Simple connectivity tests aren't always sufficient - full communication integrity 
                    must be verified under the load conditions that will occur during programming and operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-2">Additional Real-World Insights</h4>
          <div className="space-y-3 text-sm">
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground font-semibold mb-2 text-xs">Hospital Project:</p>
                <p className="text-xs text-foreground">
                  Power fluctuations during peak usage caused controller memory corruption during uploads. 
                  Solution: Scheduled uploads during low-load periods with UPS backup.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground font-semibold mb-2 text-xs">Office Building:</p>
                <p className="text-xs text-foreground">
                  IP address conflicts between BMS and corporate networks caused upload failures. 
                  Solution: Dedicated BMS VLAN with IT-coordinated address allocation.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground font-semibold mb-2 text-xs">Manufacturing Facility:</p>
                <p className="text-xs text-foreground">
                  Electromagnetic interference from production equipment corrupted serial communications. 
                  Solution: Shielded cables and dedicated cable routes away from high-power equipment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-2">Prevention Strategies</h4>
          <div className="space-y-3 text-sm">
            <p className="text-foreground">
              Based on multiple project experiences, successful software deployment depends on thorough electrical preparation:
            </p>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="text-foreground font-semibold mb-1 text-xs">Before Any Programming:</p>
                <ul className="ml-4 space-y-1 text-xs">
                  <li>• Complete continuity and polarity testing</li>
                  <li>• Verify stable power under maximum load</li>
                  <li>• Test communication at protocol level</li>
                  <li>• Confirm all addressing is unique and correct</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-xs">During Programming:</p>
                <ul className="ml-4 space-y-1 text-xs">
                  <li>• Monitor power quality continuously</li>
                  <li>• Have backup communication methods ready</li>
                  <li>• Maintain communication with field personnel</li>
                  <li>• Document any anomalies immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};