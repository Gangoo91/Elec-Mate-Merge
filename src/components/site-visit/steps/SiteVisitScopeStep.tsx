import React, { useState, useCallback } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScopeOfWorksEditor } from '../scope/ScopeOfWorksEditor';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { downloadScopePDF } from '@/utils/scope-pdf';
import type { SiteVisit } from '@/types/siteVisit';

interface SiteVisitScopeStepProps {
  visit: SiteVisit;
  assumptions: string;
  onAssumptionsChange: (assumptions: string) => void;
}

export const SiteVisitScopeStep = ({
  visit,
  assumptions,
  onAssumptionsChange,
}: SiteVisitScopeStepProps) => {
  const { companyProfile } = useCompanyProfile();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    setIsDownloading(true);
    try {
      await downloadScopePDF({
        companyName: companyProfile?.company_name || undefined,
        companyLogoUrl: companyProfile?.logo_url || undefined,
        referenceId: visit.id?.slice(0, 8).toUpperCase(),
        customerName: visit.customerName,
        customerEmail: visit.customerEmail,
        customerPhone: visit.customerPhone,
        propertyAddress: visit.propertyAddress,
        propertyPostcode: visit.propertyPostcode,
        propertyType: visit.propertyType,
        rooms: visit.rooms.map((r) => ({
          roomName: r.roomName,
          items: r.items.map((i) => ({
            itemDescription: i.itemDescription,
            quantity: i.quantity,
            unit: i.unit,
          })),
          notes: r.notes,
        })),
        prompts: visit.prompts
          .filter((p) => p.response)
          .map((p) => {
            const room = p.roomId ? visit.rooms.find((r) => r.id === p.roomId) : undefined;
            return {
              promptQuestion: p.promptQuestion,
              response: p.response || '',
              roomName: room?.roomName,
            };
          }),
        assumptions,
      });
    } finally {
      setIsDownloading(false);
    }
  }, [visit, assumptions, companyProfile]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Scope of Works</h2>
        <p className="text-sm text-white mt-1">Review and edit the scope before generating</p>
      </div>

      <ScopeOfWorksEditor
        visit={visit}
        assumptions={assumptions}
        onAssumptionsChange={onAssumptionsChange}
      />

      <Button
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        variant="outline"
        className="w-full h-11 touch-manipulation border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download Scope PDF
          </>
        )}
      </Button>
    </div>
  );
};
