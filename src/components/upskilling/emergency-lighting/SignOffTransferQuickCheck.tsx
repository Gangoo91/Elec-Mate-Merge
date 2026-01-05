import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const SignOffTransferQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: What document confirms the transfer of responsibility from installer to client?
            </p>
            <div className="text-foreground text-sm sm:text-base">
              <p className="mb-2"><strong>Answer:</strong> The <strong>Handover Form</strong> (or Handover Certificate)</p>
              <p className="mb-2">This document must include:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Client or Responsible Person's signature acknowledging receipt</li>
                <li>Date of handover</li>
                <li>List of all documents provided</li>
                <li>Confirmation of training provided</li>
                <li>Installer's signature and company details</li>
              </ul>
              <p className="mt-3 text-amber-400 font-semibold">⚠️ Both parties must retain a signed copy for their records.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
