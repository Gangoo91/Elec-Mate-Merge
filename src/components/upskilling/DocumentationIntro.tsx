
import { FileText, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DocumentationIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          Effective visual inspection cannot be conducted in isolation—it requires comprehensive documentation and design information to verify compliance and identify potential issues. Without proper documentation, inspectors cannot determine the original design intent, verify compliance with regulations, or assess whether the installation meets its intended purpose.
        </p>
        <p className="text-foreground leading-relaxed">
          This section covers the essential documentation required before, during, and after visual inspection, including design drawings, specifications, previous certificates, and regulatory compliance documentation. Understanding what information you need and how to use it effectively is crucial for thorough and compliant inspections.
        </p>
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <p className="text-blue-200 font-medium flex items-center gap-2">
            <Database className="h-4 w-4" />
            Remember: BS 7671 requires that sufficient information be available to enable proper inspection and testing. Inadequate documentation can invalidate the entire inspection process.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
