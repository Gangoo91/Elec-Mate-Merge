import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ResultsDocumentationScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-md">
            <h4 className="text-red-400 font-semibold mb-2">⚠️ The Problem</h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              You record "OK" in the Zs field on a certificate instead of the actual value of 2.1Ω. Later, a fatal electric shock occurs and during the legal review, experts discover the Zs value exceeded the 1.44Ω maximum for the 32A Type B MCB. You face prosecution for false certification.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-md">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              The Solution
            </h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              "OK" is unacceptable—always record actual numbers. If you had recorded 2.1Ω, it would have been clear that the result exceeded limits and corrective action was needed. Accurate documentation protects both public safety and your professional reputation.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <h4 className="text-elec-yellow font-semibold mb-2">Legal Implications</h4>
            <ul className="space-y-2 text-foreground text-sm sm:text-base">
              <li>• False certification is a criminal offence</li>
              <li>• Insurance may not cover claims if documentation is inadequate</li>
              <li>• Professional registration can be revoked</li>
              <li>• Actual test values provide evidence of due diligence</li>
              <li>• Courts require factual evidence, not subjective assessments</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};