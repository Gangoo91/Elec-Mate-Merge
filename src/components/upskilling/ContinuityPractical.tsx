import { Wrench, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ContinuityPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance & Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Exercise 1 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Best Practice 1</Badge>
            <h3 className="text-foreground font-semibold">Pre-Test Equipment Setup</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Proper equipment setup is crucial for accurate continuity testing:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-elec-yellow font-medium text-sm sm:text-base">Equipment Preparation:</h4>
                <ul className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                  <li>• Verify tester calibration certificate is current</li>
                  <li>• Check battery level (low batteries affect accuracy)</li>
                  <li>• Inspect test leads for damage or wear</li>
                  <li>• Zero the leads with appropriate test current</li>
                  <li>• Verify test current is 200mA-1A as required</li>
                </ul>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-elec-yellow font-medium text-sm sm:text-base">Circuit Preparation:</h4>
                <ul className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                  <li>• Confirm complete isolation and lock-off</li>
                  <li>• Disconnect all loads and parallel paths</li>
                  <li>• Remove lamps and electronic equipment</li>
                  <li>• Identify all conductors to be tested</li>
                  <li>• Plan test sequence for efficiency</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 2 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Best Practice 2</Badge>
            <h3 className="text-foreground font-semibold">Testing Methodology</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Follow a systematic approach for accurate and comprehensive testing:
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-medium mb-3 text-sm sm:text-base">Step-by-Step Process:</h4>
                  <ol className="text-foreground text-xs sm:text-sm space-y-2 sm:space-y-3 list-decimal list-inside leading-relaxed">
                    <li><strong>Start with protective conductors:</strong> Test CPCs first as these are critical for safety</li>
                    <li><strong>Progress to bonding:</strong> Test main bonding, then supplementary bonding conductors</li>
                    <li><strong>Ring circuit testing:</strong> Test ring continuity using appropriate method (end-to-end)</li>
                    <li><strong>Record all readings:</strong> Document resistance values and any observations</li>
                    <li><strong>Compare with expectations:</strong> Check readings align with cable specifications</li>
                    <li><strong>Investigate anomalies:</strong> Any unexpected readings require investigation</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 3 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Troubleshooting</Badge>
            <h3 className="text-foreground font-semibold">Common Problems & Solutions</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Recognise and resolve common continuity testing issues:
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
                <h4 className="text-red-400 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Problem: High Resistance Readings</h4>
                <div className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                  <p><strong>Possible Causes:</strong> Poor connections, corroded terminals, damaged conductors</p>
                  <p><strong>Solutions:</strong> Clean connections, tighten terminals, check cable integrity, verify correct cable size</p>
                </div>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4 sm:p-5">
                <h4 className="text-yellow-400 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Problem: Inconsistent Readings</h4>
                <div className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                  <p><strong>Possible Causes:</strong> Loose connections, intermittent faults, parallel paths</p>
                  <p><strong>Solutions:</strong> Re-check connections, investigate for loose joints, ensure all parallel paths are identified</p>
                </div>
              </div>
              <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 sm:p-5">
                <h4 className="text-orange-400 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Problem: Open Circuit Readings</h4>
                <div className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                  <p><strong>Possible Causes:</strong> Broken conductor, disconnected joint, incorrect connection</p>
                  <p><strong>Solutions:</strong> Trace circuit path, check all joints, verify terminations, rectify before proceeding</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 4 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Safety Guidance</Badge>
            <h3 className="text-foreground font-semibold">Safety Considerations</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Essential safety practices for continuity testing:
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-medium mb-3 text-sm sm:text-base">Critical Safety Points:</h4>
                  <ul className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                    <li>• Never test on live circuits - always isolate completely</li>
                    <li>• Verify isolation using approved voltage tester before starting</li>
                    <li>• Use proper test equipment rated for the application</li>
                    <li>• Be aware of stored energy in capacitors/electronic equipment</li>
                    <li>• Consider re-energisation procedures if testing fails</li>
                    <li>• Document any safety concerns or limitations encountered</li>
                    <li>• Stop testing immediately if unexpected results suggest danger</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-green-400 font-medium mb-3 text-sm sm:text-base">Professional Standards</h4>
              <ul className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                <li>• Continuity testing is mandatory - never skip or assume results</li>
                <li>• Accurate testing requires proper equipment and methodology</li>
                <li>• Document all readings clearly for future reference</li>
                <li>• Any failures must be rectified before installation can be energised</li>
                <li>• Maintain professional competence through ongoing training</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};