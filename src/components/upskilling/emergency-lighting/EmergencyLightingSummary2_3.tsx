import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock, Wrench, BookOpen, Target } from 'lucide-react';

export const EmergencyLightingSummary2_3 = () => {
  return (
    <Card className="bg-[#323232] border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-green-400" />
          Section Summary & Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Key Requirements Summary */}
        <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-green-400" />
            <Badge className="bg-green-600/40 text-green-300 text-xs">Critical Requirements</Badge>
            <span className="text-green-300 font-medium text-sm">High-Risk Task Area Lighting Essentials</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Illuminance Standards:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• Minimum: 15 lux maintained</li>
                   <li>• Alternative: 10% of normal task illuminance</li>
                   <li>• Use whichever value is higher</li>
                   <li>• Measured at the task plane (work surface)</li>
                 </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Coverage Requirements:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• Direct illumination of dangerous equipment</li>
                   <li>• Control panels and shutdown switches</li>
                   <li>• Work areas requiring visual confirmation</li>
                   <li>• Emergency stop locations clearly lit</li>
                 </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Duration Standards:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• Minimum: 1 hour (BS 5266 standard)</li>
                   <li>• Industrial: Typically 3 hours</li>
                   <li>• Complex processes: Up to 8 hours</li>
                   <li>• Based on shutdown procedure analysis</li>
                 </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Activation Requirements:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• Automatic operation on mains failure</li>
                   <li>• Maximum 5 seconds to initial light</li>
                   <li>• Full output within 60 seconds</li>
                   <li>• Maintained throughout duration</li>
                 </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Wrench className="h-4 w-4 text-elec-yellow" />
            Practical Implementation Guidance
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 font-medium text-sm">Best Practices</span>
              </div>
              <ul className="space-y-1 text-xs">
                <li className="text-foreground">• Always conduct formal risk assessment first</li>
                <li className="text-foreground">• Involve machine operators in planning</li>
                <li className="text-foreground">• Use fittings with high reliability ratings</li>
                <li className="text-foreground">• Ensure clear circuit identification</li>
                <li className="text-foreground">• Test under realistic operating conditions</li>
                <li className="text-foreground">• Provide operator training on procedures</li>
                <li className="text-foreground">• Document all systems and test results</li>
              </ul>
            </div>

            <div className="bg-orange-600/15 border border-orange-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <span className="text-orange-300 font-medium text-sm">Common Mistakes to Avoid</span>
              </div>
              <ul className="space-y-1 text-xs">
                <li className="text-foreground">• Relying on general escape lighting only</li>
                <li className="text-foreground">• Underestimating required illuminance levels</li>
                <li className="text-foreground">• Insufficient battery duration for shutdown</li>
                <li className="text-foreground">• Poor luminaire positioning causing shadows</li>
                <li className="text-foreground">• Mixing high-risk with standard circuits</li>
                <li className="text-foreground">• Inadequate testing and maintenance</li>
                <li className="text-foreground">• Lack of operator training and procedures</li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* Testing & Maintenance Schedule */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-elec-yellow" />
            Testing & Maintenance Schedule
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-blue-600/15 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-blue-600/40 text-blue-300 text-xs">Monthly</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Functional Test</p>
               <ul className="space-y-1 text-xs text-foreground">
                 <li>• Brief operation test (5 minutes)</li>
                 <li>• Visual inspection of all fittings</li>
                 <li>• Check indication lamps/LEDs</li>
                 <li>• Test activation switches</li>
                 <li>• Record any defects found</li>
                 <li>• Immediate fault rectification required</li>
               </ul>
            </div>

            <div className="bg-orange-600/15 border border-orange-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-orange-600/40 text-orange-300 text-xs">Annual</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Full Duration Test</p>
               <ul className="space-y-1 text-xs text-foreground">
                 <li>• Complete battery discharge test</li>
                 <li>• Verify full rated duration</li>
                 <li>• Measure lux levels at task planes</li>
                 <li>• Test automatic recharge function</li>
                 <li>• Check uniformity ratios</li>
                 <li>• Update test certificates</li>
               </ul>
            </div>

            <div className="bg-purple-600/15 border border-purple-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-purple-600/40 text-purple-300 text-xs">Periodic</Badge>
              </div>
              <p className="text-foreground text-sm font-medium mb-2">Enhanced Checks</p>
               <ul className="space-y-1 text-xs text-foreground">
                 <li>• Detailed lux measurement surveys</li>
                 <li>• Battery performance trending</li>
                 <li>• Environmental condition monitoring</li>
                 <li>• Risk assessment reviews</li>
                 <li>• Operator procedure updates</li>
                 <li>• System upgrade planning</li>
               </ul>
            </div>
            
          </div>
        </div>

        {/* Industry Applications */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-elec-yellow" />
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
              Common Industry Applications
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Manufacturing & Engineering:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• CNC machines and automated lathes</li>
                   <li>• Press and stamping operations</li>
                   <li>• Welding and hot work areas</li>
                   <li>• Material handling systems</li>
                   <li>• Quality control inspection stations</li>
                 </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Process Industries:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• Chemical processing plants</li>
                   <li>• Pharmaceutical manufacturing</li>
                   <li>• Food processing and packaging</li>
                   <li>• Oil and gas facilities</li>
                   <li>• Water treatment plants</li>
                 </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Infrastructure & Utilities:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• Power generation facilities</li>
                   <li>• Electrical substations and switch rooms</li>
                   <li>• Data centres and server rooms</li>
                   <li>• Building plant rooms</li>
                   <li>• Emergency services control rooms</li>
                 </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Special Environments:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                   <li>• ATEX/hazardous area installations</li>
                   <li>• Clean rooms and sterile environments</li>
                   <li>• High temperature or corrosive areas</li>
                   <li>• Outdoor industrial installations</li>
                   <li>• Mobile plant and equipment</li>
                 </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final Recommendations */}
        <div className="bg-red-600/15 border border-red-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <Badge className="bg-red-600/40 text-red-300 text-xs">Critical Reminders</Badge>
          </div>
          
          <div className="space-y-3">
            <p className="text-foreground text-sm">
              <strong>Remember:</strong> High-risk task area lighting is about enabling safe completion of dangerous processes, 
              not just providing light for evacuation. The consequences of getting it wrong can include serious injury, 
              equipment damage worth hundreds of thousands of pounds, and potential legal liability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-red-300 font-medium text-sm mb-2">Never compromise on:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Minimum 15 lux illuminance levels</li>
                  <li>• Adequate battery duration for shutdown</li>
                  <li>• Regular testing and maintenance</li>
                  <li>• Proper risk assessment procedures</li>
                </ul>
              </div>
              <div>
                <p className="text-red-300 font-medium text-sm mb-2">Always ensure:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Operator training on emergency procedures</li>
                  <li>• Clear documentation and test records</li>
                  <li>• Immediate rectification of any faults</li>
                  <li>• Regular review of changing processes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};