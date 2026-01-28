import { Wrench, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ReadinessPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Learning Exercises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Exercise 1 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 1</Badge>
            <h3 className="text-foreground font-semibold">Pre-Testing Safety Checklist</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Create a comprehensive pre-testing checklist to ensure readiness and safety:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-elec-yellow font-medium">Visual Inspection Status:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>□ Visual inspection completed satisfactorily</li>
                  <li>□ All defects identified and assessed</li>
                  <li>□ No immediate dangers (C1) present</li>
                  <li>□ Installation deemed safe for testing</li>
                  <li>□ Access to all test points confirmed</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-elec-yellow font-medium">Isolation & Documentation:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>□ Circuit schedules available and accurate</li>
                  <li>□ Isolation methods identified and tested</li>
                  <li>□ All loads disconnected where required</li>
                  <li>□ Parallel paths identified and managed</li>
                  <li>□ Earthing arrangements understood</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 2 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 2</Badge>
            <h3 className="text-foreground font-semibold">Safe Isolation Procedure</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Practice the complete safe isolation procedure:
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium mb-2">Step-by-Step Procedure:</h4>
                  <ol className="text-foreground text-sm space-y-2 list-decimal list-inside">
                    <li><strong>Identify the circuit:</strong> Verify correct circuit using circuit schedule</li>
                    <li><strong>Test your tester:</strong> Verify voltage tester with proving unit</li>
                    <li><strong>Switch off:</strong> Operate appropriate isolation device</li>
                    <li><strong>Secure isolation:</strong> Lock off and tag isolation point</li>
                    <li><strong>Test dead:</strong> Confirm no voltage present at work location</li>
                    <li><strong>Test your tester again:</strong> Re-verify with proving unit</li>
                    <li><strong>Begin work:</strong> Only now is it safe to commence testing</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 3 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 3</Badge>
            <h3 className="text-foreground font-semibold">Equipment Verification Workshop</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Learn to properly verify test equipment before use:
            </p>
            <div className="space-y-3">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Multifunction Tester Check:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Verify calibration certificate is current</li>
                  <li>• Check battery level and charging status</li>
                  <li>• Test continuity function with known short circuit</li>
                  <li>• Verify insulation tester with known resistance</li>
                  <li>• Check RCD test function with RCD test box</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Voltage Tester Verification:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Test on known live source (proving unit)</li>
                  <li>• Verify indicator lights/sounds work correctly</li>
                  <li>• Check leads for damage or wear</li>
                  <li>• Test on different voltage levels if applicable</li>
                  <li>• Re-test after use to ensure still functional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 4 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 4</Badge>
            <h3 className="text-foreground font-semibold">Problem Scenarios Assessment</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Analyse challenging pre-testing scenarios and determine appropriate actions:
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">Scenario Analysis:</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-foreground text-sm font-medium">Scenario A: Critical Equipment Cannot Be Disconnected</h5>
                      <p className="text-foreground text-sm">Life support equipment in care home cannot be switched off for testing.</p>
                      <p className="text-yellow-400 text-sm"><strong>Action:</strong> Arrange planned maintenance window or use specialised testing methods.</p>
                    </div>
                    <div>
                      <h5 className="text-foreground text-sm font-medium">Scenario B: Isolation Device Faulty</h5>
                      <p className="text-foreground text-sm">Main isolator contacts are welded closed and cannot isolate circuit.</p>
                      <p className="text-red-400 text-sm"><strong>Action:</strong> Stop work immediately. Repair isolation before any testing.</p>
                    </div>
                    <div>
                      <h5 className="text-foreground text-sm font-medium">Scenario C: Parallel Paths Discovered</h5>
                      <p className="text-foreground text-sm">Circuit shows continuity when it should be isolated due to undocumented parallel path.</p>
                      <p className="text-blue-400 text-sm"><strong>Action:</strong> Investigate parallel path, update documentation, reassess test approach.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-medium mb-2">Key Learning Points</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Safety cannot be compromised - never test unsafe installations</li>
                <li>• Proper isolation is fundamental to electrical testing safety</li>
                <li>• Equipment verification prevents false results and dangerous situations</li>
                <li>• Thorough preparation saves time and ensures comprehensive testing</li>
                <li>• Professional judgement is required when dealing with complex scenarios</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};