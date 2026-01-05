import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Settings, Target, AlertTriangle } from 'lucide-react';

export const PolarityMethodsSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Testing Methods Mastered */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Testing Methods Mastered
          </h4>
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-sm text-green-200">
              <li><strong>Continuity testing method</strong> using 4-200mA test current on dead circuits</li>
              <li><strong>Socket outlet testing</strong> from DB line terminal to outlet line terminal</li>
              <li><strong>Lighting circuit verification</strong> including switch positions and lampholders</li>
              <li><strong>Fixed equipment testing</strong> through isolation switches and FCUs</li>
              <li><strong>Two-way switching</strong> testing with switches in various positions</li>
              <li><strong>Result interpretation</strong> recognising correct vs incorrect polarity readings</li>
            </ul>
          </div>
        </div>

        {/* Equipment and Setup */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Equipment and Setup
          </h4>
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-sm text-yellow-200">
              <li>Multifunction tester (MFT) set to continuity/low resistance mode</li>
              <li>Test leads in good condition with low resistance verification</li>
              <li>Crocodile clips and probe adaptors for efficient testing</li>
              <li>Reference point: Distribution board outgoing line terminal</li>
            </ul>
          </div>
        </div>

        {/* Expected Results */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Expected Results
          </h4>
          <div className="grid gap-3">
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
              <h5 className="text-green-200 font-medium text-sm">Correct Polarity</h5>
              <p className="text-xs text-green-200 mt-1">Low resistance (&lt;0.5Ω) from DB line to outlet line terminal</p>
            </div>
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
              <h5 className="text-red-200 font-medium text-sm">Incorrect Polarity</h5>
              <p className="text-xs text-red-200 mt-1">Continuity from DB line to outlet neutral (reversed connections)</p>
            </div>
          </div>
        </div>

        {/* Troubleshooting Skills */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            Troubleshooting Skills Developed
          </h4>
          <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-sm text-orange-200">
              <li>Identifying high resistance readings indicating poor connections</li>
              <li>Recognising no continuity suggesting open circuits or wrong test points</li>
              <li>Detecting unexpected continuity revealing cross-connected conductors</li>
              <li>Systematic circuit tracing to locate polarity errors</li>
              <li>Understanding when to correct and retest before energisation</li>
            </ul>
          </div>
        </div>

        {/* Documentation Requirements */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Documentation and Compliance</h4>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-sm text-blue-200">
              <li>Record all polarity test results on Electrical Installation Certificate</li>
              <li>Document test methods and equipment used</li>
              <li>Note any corrections made during testing process</li>
              <li>Ensure circuit references match distribution board labelling</li>
            </ul>
          </div>
        </div>

        {/* Professional Competence */}
        <div className="bg-elec-dark/50 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Professional Competence Achieved</h4>
          <p className="text-sm text-foreground">
            You now have the practical skills to perform comprehensive polarity testing on all common 
            circuit types. These methods ensure compliance with BS 7671 and maintain electrical safety 
            standards. The next section will build on these skills with earth fault loop impedance testing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};