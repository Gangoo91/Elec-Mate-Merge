
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle2, Target, Clock, Users, FileText, Zap } from 'lucide-react';

const PracticalGuidanceSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
          <h4 className="text-base sm:text-lg font-semibold text-green-400">Practical Guidance & Best Practices</h4>
        </div>
        <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm text-white leading-relaxed">
          
          {/* Best Practices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Testing Best Practices
              </h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h6 className="font-medium text-green-400 mb-1">Coordination is Key</h6>
                  <p className="text-xs">Always coordinate functional testing with site operations team. Unexpected shutdowns can be dangerous and costly.</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h6 className="font-medium text-blue-400 mb-1">Monthly RCD Testing</h6>
                  <p className="text-xs">Test RCD buttons monthly as part of routine maintenance. This simple test can prevent serious electrical accidents.</p>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h6 className="font-medium text-purple-400 mb-1">Clear Labelling</h6>
                  <p className="text-xs">Ensure all emergency stops and safety controls are clearly labelled and accessible. Update labels if they become unclear.</p>
                </div>
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <h6 className="font-medium text-orange-400 mb-1">Document Everything</h6>
                  <p className="text-xs">Record all functional issues found during testing. This helps track equipment deterioration and plan maintenance.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                Common Issues & Solutions
              </h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h6 className="font-medium text-red-400 mb-1">RCD Test Button Failure</h6>
                  <p className="text-xs mb-1"><strong>Issue:</strong> Button doesn't trip RCD</p>
                  <p className="text-xs"><strong>Solution:</strong> Check mechanism, clean contacts, or replace RCD if internally faulty</p>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <h6 className="font-medium text-amber-400 mb-1">Emergency Stop Incomplete</h6>
                  <p className="text-xs mb-1"><strong>Issue:</strong> Not all equipment stops</p>
                  <p className="text-xs"><strong>Solution:</strong> Review circuit design, check contactors and interlocks</p>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h6 className="font-medium text-yellow-400 mb-1">Stiff Controls</h6>
                  <p className="text-xs mb-1"><strong>Issue:</strong> Switches hard to operate</p>
                  <p className="text-xs"><strong>Solution:</strong> Clean mechanisms, lubricate if appropriate, check for corrosion</p>
                </div>
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h6 className="font-medium text-cyan-400 mb-1">Reset Procedure Problems</h6>
                  <p className="text-xs mb-1"><strong>Issue:</strong> Cannot reset after emergency stop</p>
                  <p className="text-xs"><strong>Solution:</strong> Check all interlocks, safety systems, and reset sequence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Site-Specific Considerations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-green-400" />
              Site-Specific Considerations
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    Domestic Properties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="text-xs space-y-1">
                    <li>• Test RCD in consumer unit monthly</li>
                    <li>• Check immersion heater switches</li>
                    <li>• Test cooker isolation switches</li>
                    <li>• Verify shower pull cords work</li>
                    <li>• Check garage/outbuilding isolators</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-400" />
                    Commercial Buildings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="text-xs space-y-1">
                    <li>• Emergency lighting test switches</li>
                    <li>• Fire alarm electrical isolation</li>
                    <li>• Lift motor room emergency stops</li>
                    <li>• HVAC system controls</li>
                    <li>• Automatic transfer switches</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-400" />
                    Industrial Sites
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="text-xs space-y-1">
                    <li>• Machine emergency stops</li>
                    <li>• Process control interlocks</li>
                    <li>• Gas detection shutoffs</li>
                    <li>• Conveyor safety systems</li>
                    <li>• High voltage switch operation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Timing and Scheduling */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              Testing Timing & Scheduling
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h6 className="font-medium text-white">Optimal Testing Times</h6>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span>RCD Monthly Tests</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">Low Impact</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span>Emergency Stop Tests</span>
                    <Badge variant="outline" className="text-amber-400 border-amber-400 text-xs">Planned Windows</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span>Switch Operation</span>
                    <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">During Maintenance</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span>Safety System Tests</span>
                    <Badge variant="outline" className="text-red-400 border-red-400 text-xs">Shutdown Required</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h6 className="font-medium text-white">Frequency Guidelines</h6>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">RCD Test Buttons</span>
                      <span className="text-green-400 text-xs">Monthly</span>
                    </div>
                    <p className="text-xs text-white/80">Quick test during routine maintenance</p>
                  </div>
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Emergency Stops</span>
                      <span className="text-blue-400 text-xs">Quarterly</span>
                    </div>
                    <p className="text-xs text-white/80">During planned maintenance windows</p>
                  </div>
                  <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Control Systems</span>
                      <span className="text-purple-400 text-xs">Annually</span>
                    </div>
                    <p className="text-xs text-white/80">Part of annual inspection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal and Compliance */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Legal & Compliance Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="font-medium text-foreground mb-2">Regulatory Framework:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• BS 7671 Regulation 612.13 - Functional testing mandatory</li>
                  <li>• Electricity at Work Regulations 1989</li>
                  <li>• Health and Safety at Work Act 1974</li>
                  <li>• CDM Regulations 2015 (construction sites)</li>
                  <li>• PUWER 1998 (work equipment)</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-foreground mb-2">Documentation Requirements:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• Test results recorded on certificates</li>
                  <li>• Defects noted and remedial action taken</li>
                  <li>• Next test due date clearly marked</li>
                  <li>• Competent person signature required</li>
                  <li>• Client copy provided and retained</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency Procedures */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Emergency Procedures During Testing
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="font-medium text-foreground mb-2">Before Testing:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• Identify alternative emergency procedures</li>
                  <li>• Ensure fire wardens are aware of testing</li>
                  <li>• Have manual override procedures ready</li>
                  <li>• Confirm emergency services contact details</li>
                  <li>• Establish alternative communication methods</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-foreground mb-2">During Emergency:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• Stop testing immediately</li>
                  <li>• Restore systems to safe condition</li>
                  <li>• Activate alternative emergency procedures</li>
                  <li>• Contact emergency services if required</li>
                  <li>• Document incident for investigation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalGuidanceSection;
