import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const HandoverDocumentationQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: Name three key documents that must be handed to the client at project completion.
            </p>
            <div className="text-foreground text-sm sm:text-base space-y-1">
              <p><strong>1.</strong> Commissioning certificates (BS 5266-1 Annex G)</p>
              <p><strong>2.</strong> As-built layout drawings showing luminaire positions and circuit routes</p>
              <p><strong>3.</strong> Emergency lighting logbook with recorded test results and blank future entries</p>
              <p className="mt-2 text-gray-300 italic">Other essential documents: Electrical installation certificate, maintenance instructions, user training notes, and contact details for technical support.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
