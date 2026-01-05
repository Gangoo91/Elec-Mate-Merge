import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ResultsDocumentationIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Documenting & Verifying Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-foreground text-sm sm:text-base">
          <p>
            This final section explains how to record Zs, Ze, and PFC values accurately—and what to do if results fall outside acceptable limits. Proper documentation is legally required and critical for ongoing safety.
          </p>
          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <p className="text-elec-yellow font-semibold">Legal Requirement:</p>
            <p>Record actual test values—never write "pass" or "OK" on certificates.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};