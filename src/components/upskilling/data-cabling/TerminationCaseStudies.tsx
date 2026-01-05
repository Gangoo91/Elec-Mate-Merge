import { Database, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TerminationCaseStudies = () => {
  return (
    <>
      {/* Tool Calibration */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-400" />
            Tool Calibration and Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          <div className="bg-blue-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">Calibration Requirements</h4>
            <p className="text-sm text-gray-300 mb-2">
              Professional tools require regular calibration to maintain accuracy and compliance:
            </p>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Quarterly calibration for high-use tools</li>
              <li>• Annual calibration for occasional use</li>
              <li>• After any suspected damage or misuse</li>
              <li>• Before critical installations</li>
              <li>• When changing tool operators</li>
            </ul>
          </div>

          <div className="bg-blue-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">Maintenance Schedule</h4>
            <p className="text-sm text-gray-300 mb-2">
              Regular maintenance ensures tool longevity:
            </p>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Daily cleaning and inspection</li>
              <li>• Weekly lubrication of moving parts</li>
              <li>• Monthly die wear assessment</li>
              <li>• Quarterly deep cleaning and calibration</li>
              <li>• Annual professional service</li>
            </ul>
          </div>

          <div className="bg-blue-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">Storage Requirements</h4>
            <p className="text-sm text-gray-300 mb-2">
              Proper storage protects tool investment:
            </p>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Climate-controlled environment</li>
              <li>• Protective cases for transport</li>
              <li>• Organised tool inventory system</li>
              <li>• Regular inspection schedule</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Termination Techniques */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Professional Termination Techniques
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          <div className="bg-[#323232] p-4 rounded-lg">
            <h4 className="font-semibold text-elec-yellow mb-2">Cat 6A Specific Requirements</h4>
            <p className="text-sm text-gray-300 mb-2">
              High-performance cables require precise techniques:
            </p>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Maximum untwist length: 13mm (0.5")</li>
              <li>• Maintain pair integrity throughout termination</li>
              <li>• Proper strain relief to prevent pair separation</li>
              <li>• Consistent conductor insertion depth</li>
              <li>• Avoid excessive bending of individual conductors</li>
            </ul>
          </div>

          <div className="bg-[#323232] p-4 rounded-lg">
            <h4 className="font-semibold text-elec-yellow mb-2">Quality Control Steps</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-foreground text-sm">Pre-Termination</h5>
                <p className="text-xs text-gray-400">Cable preparation, tool calibration check, workspace setup</p>
              </div>
              <div>
                <h5 className="font-semibold text-foreground text-sm">During Termination</h5>
                <p className="text-xs text-gray-400">Consistent technique, proper untwist lengths, careful insertion</p>
              </div>
              <div>
                <h5 className="font-semibold text-foreground text-sm">Post-Termination</h5>
                <p className="text-xs text-gray-400">Visual inspection, pull testing, electrical verification</p>
              </div>
              <div>
                <h5 className="font-semibold text-foreground text-sm">Documentation</h5>
                <p className="text-xs text-gray-400">Record termination parameters, test results, quality metrics</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Common Termination Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          <div className="bg-red-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Tool-Related Issues</h4>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Using uncalibrated or worn tools</li>
              <li>• Incorrect die selection for connector type</li>
              <li>• Insufficient or excessive compression force</li>
              <li>• Poor tool maintenance causing inconsistent results</li>
              <li>• Wrong tool type for cable category</li>
            </ul>
          </div>

          <div className="bg-red-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Technique Problems</h4>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Excessive untwist length compromising performance</li>
              <li>• Inconsistent conductor insertion depth</li>
              <li>• Damaged conductors from poor handling</li>
              <li>• Inadequate strain relief causing failures</li>
              <li>• Contamination affecting connection quality</li>
            </ul>
          </div>

          <div className="bg-red-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Quality Control Failures</h4>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Skipping post-termination testing</li>
              <li>• Inadequate visual inspection</li>
              <li>• Missing documentation of parameters</li>
              <li>• Failure to verify electrical performance</li>
              <li>• Not following manufacturer specifications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
};