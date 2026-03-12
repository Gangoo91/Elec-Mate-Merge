/**
 * Previous Certificate Pre-Fill Sheet
 *
 * Bottom sheet shown when a previous fire alarm certificate exists at the same premises.
 * Lets the user choose which sections to pre-fill from the previous cert data.
 */

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileCheck, Shield, Radio, Eye } from 'lucide-react';

interface PreFillSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  fields: { key: string; label: string; value: string }[];
}

interface PreviousCertPreFillSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previousData: any;
  onConfirm: (selectedSections: string[]) => void;
}

export function PreviousCertPreFillSheet({
  open,
  onOpenChange,
  previousData,
  onConfirm,
}: PreviousCertPreFillSheetProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  if (!previousData) return null;

  const sections: PreFillSection[] = [
    {
      id: 'thirdParty',
      label: 'Third-Party Certification',
      icon: <Shield className="h-4 w-4 text-amber-400" />,
      fields: (() => {
        const cert = previousData.thirdPartyCertification || {};
        return [
          { key: 'bafeRegistration', label: 'BAFE', value: cert.bafeRegistration || '' },
          { key: 'fiaMembership', label: 'FIA', value: cert.fiaMembership || '' },
          { key: 'nsiSsaibCertification', label: 'NSI/SSAIB', value: cert.nsiSsaibCertification || '' },
        ].filter((f) => f.value);
      })(),
    },
    {
      id: 'fra',
      label: 'Fire Risk Assessment',
      icon: <FileCheck className="h-4 w-4 text-blue-400" />,
      fields: (() => {
        const fra = previousData.fireRiskAssessment || {};
        return [
          { key: 'fraReference', label: 'Reference', value: fra.fraReference || '' },
          { key: 'fraDate', label: 'Date', value: fra.fraDate || '' },
          { key: 'fraCompany', label: 'Company', value: fra.fraCompany || '' },
          { key: 'fraAuthor', label: 'Author', value: fra.fraAuthor || '' },
        ].filter((f) => f.value);
      })(),
    },
    {
      id: 'monitoring',
      label: 'Monitoring / ARC Details',
      icon: <Radio className="h-4 w-4 text-green-400" />,
      fields: (() => {
        const mon = previousData.monitoringDetails || {};
        return [
          { key: 'isMonitored', label: 'Monitored', value: mon.isMonitored ? 'Yes' : '' },
          { key: 'monitoringType', label: 'Type', value: mon.monitoringType || '' },
          { key: 'arcName', label: 'ARC', value: mon.arcName || '' },
          { key: 'arcAccountNumber', label: 'Account', value: mon.arcAccountNumber || '' },
          { key: 'arcTelephone', label: 'Phone', value: mon.arcTelephone || '' },
        ].filter((f) => f.value);
      })(),
    },
  ].filter((s) => s.fields.length > 0);

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((s) => s !== sectionId) : [...prev, sectionId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedSections);
    onOpenChange(false);
    setSelectedSections([]);
  };

  const handleSkip = () => {
    onOpenChange(false);
    setSelectedSections([]);
  };

  if (sections.length === 0) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[70vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col bg-background">
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-border/20">
            <SheetTitle className="flex items-center gap-2 text-white">
              <Eye className="h-5 w-5 text-elec-yellow" />
              Pre-Fill from Previous Certificate
            </SheetTitle>
            <p className="text-sm text-white">
              A previous certificate was found at this premises. Select sections to pre-fill:
            </p>
          </SheetHeader>

          <div className="px-4 py-4 space-y-3 overflow-y-auto flex-1">
            {sections.map((section) => (
              <div
                key={section.id}
                className="border border-white/20 rounded-lg p-3 space-y-2 touch-manipulation"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => toggleSection(section.id)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span className="text-white font-medium text-sm">{section.label}</span>
                  </div>
                </div>
                <div className="ml-9 space-y-1">
                  {section.fields.map((field) => (
                    <p key={field.key} className="text-xs text-white">
                      {field.label}: <span className="text-elec-yellow">{field.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-4 border-t border-border/20 flex gap-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 h-11 touch-manipulation border-white/30 text-white"
            >
              Skip
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedSections.length === 0}
              className="flex-1 h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50"
            >
              Pre-Fill Selected
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
