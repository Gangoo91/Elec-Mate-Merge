import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TerminationScenario = () => {
  return (
    <Card className="bg-[#2a4d3a] border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        
        <div className="bg-[#1e3a2a] p-4 rounded-lg">
          <h4 className="font-semibold text-green-400 mb-2">Scenario: Intermittent Network Issues</h4>
          <p className="text-sm mb-3">
            A newly installed Cat 6A network experiences intermittent connectivity issues. Testing reveals high contact resistance at several termination points. Investigation shows the crimping tool was overdue for calibration.
          </p>
          
          <h5 className="font-semibold text-green-400 mb-2">Analysis:</h5>
          <ul className="text-sm space-y-1 ml-4">
            <li>• Tool calibration directly affects termination quality</li>
            <li>• High contact resistance causes signal degradation</li>
            <li>• Intermittent issues are harder to diagnose</li>
            <li>• Customer confidence affected by poor quality</li>
          </ul>
          
          <h5 className="font-semibold text-green-400 mb-2 mt-3">Lesson:</h5>
          <p className="text-sm text-green-300">
            Regular tool calibration is essential for consistent quality—preventive maintenance saves time and reputation.
          </p>
        </div>

        <div className="bg-[#1e3a2a] p-4 rounded-lg">
          <h4 className="font-semibold text-green-400 mb-2">Additional Scenarios</h4>
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-foreground text-sm">High-Vibration Environment Failure</h5>
              <p className="text-xs text-gray-400">
                Standard crimp terminations fail in manufacturing environment. Compression terminations solve the reliability issue.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground text-sm">Excessive Untwist Length</h5>
              <p className="text-xs text-gray-400">
                Cat 6A installation fails certification due to crosstalk. Problem traced to 25mm untwist length instead of 13mm maximum.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground text-sm">Wrong Tool for Application</h5>
              <p className="text-xs text-gray-400">
                Using standard crimp tool on specialised connectors results in poor contact formation and early failures.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};