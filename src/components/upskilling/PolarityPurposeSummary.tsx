import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export const PolarityPurposeSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Key Learning Points */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Key Learning Points
          </h4>
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-sm text-green-200">
              <li><strong>Polarity testing ensures safety</strong> by verifying line and neutral conductors are correctly connected</li>
              <li><strong>BS 7671 requires polarity testing</strong> before energisation of any new installation or circuit</li>
              <li><strong>Incorrect polarity creates shock hazards</strong> from normally safe parts becoming live</li>
              <li><strong>Switches must control line conductors</strong> to provide proper isolation when off</li>
              <li><strong>Edison screw lampholders</strong> must have line connected to centre contact, neutral to thread</li>
              <li><strong>Protective devices must operate on line</strong> to provide effective protection</li>
            </ul>
          </div>
        </div>

        {/* Critical Safety Messages */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Critical Safety Messages
          </h4>
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-sm text-red-200">
              <li>Never energise circuits with incorrect polarity - always correct wiring errors first</li>
              <li>Reversed polarity can make equipment cases live even when switched off</li>
              <li>Switches in neutral don't provide proper isolation - circuits remain live</li>
              <li>Wrong lampholder connections create shock risks during bulb changes</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Best Practices Recap
          </h4>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-sm text-blue-200">
              <li>Test polarity on every outlet, switch, and connection point</li>
              <li>Use systematic approach working methodically through circuits</li>
              <li>Mark conductors clearly during installation to prevent errors</li>
              <li>Document all polarity test results on certificates</li>
              <li>Always retest after correcting any polarity errors</li>
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-elec-dark/50 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Moving Forward</h4>
          <p className="text-sm text-foreground">
            Now that you understand why polarity testing is essential, the next section will cover the practical methods 
            and procedures for performing polarity tests on different circuit types. You'll learn the step-by-step 
            testing procedures and how to interpret results correctly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};