
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EssentialDocuments } from './documentation/EssentialDocuments';
import { DesignInformation } from './documentation/DesignInformation';
import { ComplianceDocuments } from './documentation/ComplianceDocuments';
import { DocumentationChecklist } from './documentation/DocumentationChecklist';
import { MissingDocuments } from './documentation/MissingDocuments';
import { DocumentStorage } from './documentation/DocumentStorage';

export const DocumentationContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Complete Guide to Documentation Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Essential Documents */}
        <EssentialDocuments />

        {/* Design Information */}
        <DesignInformation />

        {/* Compliance Documents */}
        <ComplianceDocuments />

        {/* Documentation Checklist */}
        <DocumentationChecklist />

        {/* What to Do When Documents Are Missing */}
        <MissingDocuments />

        {/* Document Storage & Management */}
        <DocumentStorage />

      </CardContent>
    </Card>
  );
};
