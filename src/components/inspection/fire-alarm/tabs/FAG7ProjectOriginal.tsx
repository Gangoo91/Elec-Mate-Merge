/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification — Tab 1: Project & Original System
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const voltButtonCn =
  'w-full h-11 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-transform flex items-center justify-center disabled:bg-elec-yellow disabled:text-black disabled:opacity-100';

const categoryOptions = [
  { value: 'L1', label: 'L1 — Full Coverage' },
  { value: 'L2', label: 'L2 — Enhanced' },
  { value: 'L3', label: 'L3 — Standard' },
  { value: 'L4', label: 'L4 — Escape Route' },
  { value: 'L5', label: 'L5 — Engineered' },
  { value: 'M', label: 'M — Manual' },
  { value: 'P1', label: 'P1 — Property Full' },
  { value: 'P2', label: 'P2 — Property Partial' },
];

const premisesTypeOptions = [
  { value: 'Office', label: 'Office' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Warehouse', label: 'Warehouse' },
  { value: 'Factory', label: 'Factory / Industrial' },
  { value: 'School', label: 'School / Education' },
  { value: 'Hospital', label: 'Hospital / Healthcare' },
  { value: 'Care Home', label: 'Care Home / Residential' },
  { value: 'Hotel', label: 'Hotel / B&B' },
  { value: 'HMO', label: 'HMO' },
  { value: 'Data Centre', label: 'Data Centre' },
];

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG7ProjectOriginal({ formData, onUpdate }: Props) {
  const missingOriginalCert = !formData.originalCertRef;
  const [loadingOriginal, setLoadingOriginal] = useState(false);
  const [showCertPicker, setShowCertPicker] = useState(false);
  const [originalCerts, setOriginalCerts] = useState<any[]>([]);

  const handleLoadOriginal = useCallback(async () => {
    setLoadingOriginal(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: reports } = await supabase
        .from('reports')
        .select('data, report_type, updated_at, report_id')
        .eq('user_id', user.id)
        .in('report_type', ['fire-alarm', 'fire-alarm-commissioning', 'fire-alarm-inspection'])
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(20);
      if (!reports || reports.length === 0) {
        toast('No original certificates found');
        return;
      }
      setOriginalCerts(reports);
      setShowCertPicker(true);
    } catch (err) {
      toast.error('Failed to load certificates');
    } finally {
      setLoadingOriginal(false);
    }
  }, []);

  const handleSelectOriginalCert = useCallback(
    (certData: any, reportType?: string) => {
      if (!certData) return;
      onUpdate('originalCertRef', certData.certificateNumber || '');
      if (!formData.designCertReference && certData.designCertReference)
        onUpdate('designCertReference', certData.designCertReference);
      if (!formData.commissioningCertRef) {
        if (reportType === 'fire-alarm-commissioning' && certData.certificateNumber)
          onUpdate('commissioningCertRef', certData.certificateNumber);
        else if (certData.commissioningCertRef)
          onUpdate('commissioningCertRef', certData.commissioningCertRef);
      }
      if (!formData.clientName && certData.clientName) onUpdate('clientName', certData.clientName);
      if (!formData.clientTelephone && certData.clientTelephone)
        onUpdate('clientTelephone', certData.clientTelephone);
      if (!formData.clientAddress && certData.clientAddress)
        onUpdate('clientAddress', certData.clientAddress);
      if (!formData.premisesAddress && (certData.premisesAddress || certData.installationAddress))
        onUpdate('premisesAddress', certData.premisesAddress || certData.installationAddress);
      if (!formData.premisesType && certData.premisesType)
        onUpdate('premisesType', certData.premisesType);
      if (!formData.systemCategory && certData.systemCategory)
        onUpdate('systemCategory', certData.systemCategory);
      if (!formData.systemMake && (certData.systemMake || certData.panelMake))
        onUpdate('systemMake', certData.systemMake || certData.panelMake);
      if (!formData.existingZones && (certData.existingZones || certData.zonesCount))
        onUpdate('existingZones', String(certData.existingZones || certData.zonesCount));
      setShowCertPicker(false);
      toast.success('Loaded from original certificate');
    },
    [formData, onUpdate]
  );

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Certificate reference */}
      <div className={cardCn}>
        <SectionHeader title="Certificate reference" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Certificate number">
            <Input
              value={formData.certificateNumber || ''}
              onChange={(e) => onUpdate('certificateNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Modification date">
            <Input
              type="date"
              value={formData.modificationDate || ''}
              onChange={(e) => onUpdate('modificationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Load from original */}
      <div className={cardCn}>
        <SectionHeader title="Load from original" />
        <button
          type="button"
          onClick={handleLoadOriginal}
          disabled={loadingOriginal}
          className={voltButtonCn}
        >
          {loadingOriginal ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
              Searching...
            </>
          ) : (
            'Load from original G2, G3 or G6 certificate'
          )}
        </button>
        <p className="text-[12px] text-white/85 text-center">
          Pre-fills client, premises, and system details from original installation
        </p>
        <Sheet open={showCertPicker} onOpenChange={setShowCertPicker}>
          <SheetContent side="bottom" className="h-[70dvh] p-0 rounded-t-2xl flex flex-col">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.08]">
                <SheetTitle className="text-lg font-bold text-white">
                  Select original certificate
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                <div className="space-y-2">
                  {originalCerts.map((report: any) => {
                    const d = report.data || {};
                    const typeLabel =
                      report.report_type === 'fire-alarm'
                        ? 'G2 install'
                        : report.report_type === 'fire-alarm-commissioning'
                          ? 'G3 commission'
                          : 'G6 inspection';
                    return (
                      <button
                        key={report.report_id}
                        type="button"
                        onClick={() => handleSelectOriginalCert(d, report.report_type)}
                        className="w-full text-left p-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] active:scale-[0.98] transition-all touch-manipulation"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-white text-sm">
                            {d.certificateNumber || 'No cert number'}
                          </p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-red-500/40 text-red-400">
                            {typeLabel}
                          </span>
                        </div>
                        <p className="text-xs text-white/85">
                          {d.premisesAddress ||
                            d.installationAddress ||
                            d.clientName ||
                            'No address'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Original system certificates */}
      <div className={cardCn}>
        <SectionHeader title="Original system certificates" />
        {missingOriginalCert && (
          <div className="rounded-xl border border-red-500/40 bg-white/[0.05] p-3">
            <p className="text-xs text-red-400 leading-relaxed">
              Original certificate reference is mandatory for G7. If original certs are not
              available, a new G1+G2+G3 is required.
            </p>
          </div>
        )}
        <Field label="Original cert reference" required>
          <Input
            value={formData.originalCertRef || ''}
            onChange={(e) => onUpdate('originalCertRef', e.target.value)}
            className={inputCn}
            placeholder="G2 or G3 cert reference"
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="G1 design ref">
            <Input
              value={formData.designCertReference || ''}
              onChange={(e) => onUpdate('designCertReference', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="G3 commission ref">
            <Input
              value={formData.commissioningCertRef || ''}
              onChange={(e) => onUpdate('commissioningCertRef', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Client details */}
      <div className={cardCn}>
        <SectionHeader title="Client details" />
        <CertificateClientSection formData={formData} onUpdate={onUpdate} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Client name" required>
            <Input
              value={formData.clientName || ''}
              onChange={(e) => onUpdate('clientName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Phone">
            <Input
              type="tel"
              value={formData.clientTelephone || ''}
              onChange={(e) => onUpdate('clientTelephone', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Client address">
          <Input
            value={formData.clientAddress || ''}
            onChange={(e) => onUpdate('clientAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Premises & existing system */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Premises & existing system" />

        {/* Original system summary (shown after loading) */}
        {formData.originalCertRef && formData.systemCategory && (
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <p className="text-[12px] font-medium text-white mb-2">
              Original system (before modification)
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-white/85">
                Category:{' '}
                <span className="font-semibold text-elec-yellow">{formData.systemCategory}</span>
              </p>
              {formData.systemMake && (
                <p className="text-white/85">
                  Panel: <span className="font-semibold text-white">{formData.systemMake}</span>
                </p>
              )}
              {formData.existingZones && (
                <p className="text-white/85">
                  Zones: <span className="font-semibold text-white">{formData.existingZones}</span>
                </p>
              )}
            </div>
          </div>
        )}

        <Field label="Premises address" required>
          <Input
            value={formData.premisesAddress || ''}
            onChange={(e) => onUpdate('premisesAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Premises type">
            <ComboboxCell
              value={formData.premisesType || ''}
              onChange={(v) => onUpdate('premisesType', v)}
              options={premisesTypeOptions}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
          <Field label="Existing category">
            <ComboboxCell
              value={formData.systemCategory || ''}
              onChange={(v) => onUpdate('systemCategory', v)}
              options={categoryOptions}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Panel make / model">
            <Input
              value={formData.systemMake || ''}
              onChange={(e) => onUpdate('systemMake', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Existing zones">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.existingZones || ''}
              onChange={(e) => onUpdate('existingZones', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
