
import { PenTool, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RecordingIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <PenTool className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          It's not enough to carry out a visual inspection—you must record your findings clearly, accurately, and in the correct format. 
          This section shows how to document results in a way that's compliant and professional.
        </p>
        
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Critical Legal Requirement</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Your inspection report is not just paperwork—it's a legal document. If anything goes wrong, 
                your records will be used to assess your judgement and decisions. Poor documentation can lead to 
                professional liability, insurance issues, and regulatory enforcement action.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3">Documentation Principles</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• <strong>Accuracy:</strong> Record only what you have personally observed and verified</li>
            <li>• <strong>Clarity:</strong> Use unambiguous language that any competent person can understand</li>
            <li>• <strong>Completeness:</strong> Document all findings, including limitations and uncertainties</li>
            <li>• <strong>Traceability:</strong> Reference specific regulations and standards where applicable</li>
            <li>• <strong>Honesty:</strong> Never assume compliance—only record what you can verify</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
