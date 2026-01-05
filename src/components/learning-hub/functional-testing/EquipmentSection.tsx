
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Shield, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';

const EquipmentSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Required Equipment & Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-white">
          
          {/* Basic Equipment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Wrench className="h-4 w-4 text-blue-400" />
                Basic Testing Equipment
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Visual Inspection Checklist</h6>
                    <p className="text-xs text-white/80">Standardised inspection forms</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">Essential</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Torch/Inspection Light</h6>
                    <p className="text-xs text-white/80">LED torch with focusing beam</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">Essential</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Communication Equipment</h6>
                    <p className="text-xs text-white/80">Two-way radios or mobile phones</p>
                  </div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">Important</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Basic Hand Tools</h6>
                    <p className="text-xs text-white/80">Screwdrivers, spanners, pliers</p>
                  </div>
                  <Badge variant="outline" className="text-white/80 border-gray-400">Useful</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-400" />
                Safety Equipment
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Personal Protective Equipment</h6>
                    <p className="text-xs text-white/80">Hard hat, safety glasses, gloves</p>
                  </div>
                  <Badge variant="outline" className="text-red-400 border-red-400">Critical</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Warning Notices</h6>
                    <p className="text-xs text-white/80">Test in progress signs</p>
                  </div>
                  <Badge variant="outline" className="text-red-400 border-red-400">Critical</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Barriers/Tape</h6>
                    <p className="text-xs text-white/80">Area isolation if required</p>
                  </div>
                  <Badge variant="outline" className="text-orange-400 border-orange-400">Conditional</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h6 className="font-medium text-foreground">Emergency Contact List</h6>
                    <p className="text-xs text-white/80">Key personnel contact details</p>
                  </div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">Important</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Specialized Equipment */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              Specialised Testing Equipment
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">RCD Test Button Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-white">
                    Built-in test mechanism - no external equipment required
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs text-green-400 border-green-400">No Cost</Badge>
                    <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">Always Available</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Stopwatch/Timer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-white">
                    For measuring response times of safety systems
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">Optional</Badge>
                    <Badge variant="outline" className="text-xs text-white/80 border-gray-400">Digital Preferred</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Digital Camera</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-white">
                    Document equipment condition and defects
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs text-green-400 border-green-400">Recommended</Badge>
                    <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">Evidence</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Test Certificates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-white">
                    Blank forms for recording test results
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs text-red-400 border-red-400">Essential</Badge>
                    <Badge variant="outline" className="text-xs text-purple-400 border-purple-400">Legal Requirement</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Equipment Preparation */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Pre-Test Equipment Checks
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="font-medium text-foreground mb-2">Before Starting:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• Verify all safety equipment is functional</li>
                  <li>• Check communication equipment works</li>
                  <li>• Ensure adequate lighting for inspection</li>
                  <li>• Confirm access to emergency procedures</li>
                  <li>• Test any measuring instruments if used</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-foreground mb-2">Documentation Ready:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• Installation drawings and schematics</li>
                  <li>• Previous test results for comparison</li>
                  <li>• Manufacturer's operation manuals</li>
                  <li>• Site-specific safety procedures</li>
                  <li>• Emergency contact information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cost Considerations */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Cost-Effective Testing
            </h4>
            <div className="text-sm text-white">
              <p className="mb-2">
                Functional testing is one of the most cost-effective electrical tests because:
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Most tests use built-in mechanisms (RCD test buttons)</li>
                <li>• Minimal specialized equipment required</li>
                <li>• Quick to perform with proper preparation</li>
                <li>• Prevents costly equipment failures</li>
                <li>• Reduces liability and insurance risks</li>
              </ul>
            </div>
          </div>

          {/* Equipment Standards */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Equipment Standards & Calibration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h6 className="font-medium text-foreground mb-2">Not Required:</h6>
                <ul className="space-y-1">
                  <li>• RCD test buttons are self-contained</li>
                  <li>• Visual inspection needs no calibration</li>
                  <li>• Emergency stops are go/no-go tests</li>
                  <li>• Most functional tests are qualitative</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-foreground mb-2">Best Practice:</h6>
                <ul className="space-y-1">
                  <li>• Use calibrated timing devices if measuring response</li>
                  <li>• Document equipment used for traceability</li>
                  <li>• Regular equipment condition checks</li>
                  <li>• Follow manufacturer's test procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentSection;
