/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification — Tab 1: Project & Original System
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, Download, Loader2 } from 'lucide-react';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';

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

const Section = ({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div
        className={cn(
          'h-[2px] w-full rounded-full bg-gradient-to-r mb-2',
          accentColor || 'from-red-500 to-rose-400'
        )}
      />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
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
    <Label className="text-white text-xs mb-1.5 block">
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
        .in('report_type', ['fire-alarm', 'fire-alarm-commissioning'])
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
    (certData: any) => {
      if (!certData) return;
      onUpdate('originalCertRef', certData.certificateNumber || '');
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
      setShowCertPicker(false);
      toast.success('Loaded from original certificate');
    },
    [formData, onUpdate]
  );

  return (
    <div className="space-y-5">
      <div className="border-b border-red-500/20 pb-3">
        <p className="text-sm font-bold text-red-400">FIRE ALARM MODIFICATION CERTIFICATE (G7)</p>
        <p className="text-xs text-white mt-1">
          BS 5839-1:2025 — Extension or alteration to existing system
        </p>
      </div>

      <Section title="Certificate Reference" accentColor="from-white/20 to-white/5">
        <Field label="Certificate Number">
          <Input
            value={formData.certificateNumber || ''}
            onChange={(e) => onUpdate('certificateNumber', e.target.value)}
            className={inputCn}
          />
        </Field>
        <Field label="Modification Date">
          <Input
            type="date"
            value={formData.modificationDate || ''}
            onChange={(e) => onUpdate('modificationDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>

      {/* Load from Original */}
      <Section title="Load from Original" accentColor="from-elec-yellow/40 to-amber-400/20">
        <Button
          variant="outline"
          onClick={handleLoadOriginal}
          disabled={loadingOriginal}
          className="w-full h-12 text-sm border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-[0.98] rounded-xl"
        >
          {loadingOriginal ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {loadingOriginal ? 'Searching...' : 'Load from Original G2 or G3 Certificate'}
        </Button>
        <p className="text-xs text-white text-center">
          Pre-fills client, premises, and system details from original installation
        </p>
        <Sheet open={showCertPicker} onOpenChange={setShowCertPicker}>
          <SheetContent side="bottom" className="h-[70dvh] p-0 rounded-t-2xl flex flex-col">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
                <SheetTitle className="text-lg font-bold text-white">
                  Select Original Certificate
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                <div className="space-y-2">
                  {originalCerts.map((report: any) => {
                    const d = report.data || {};
                    const typeLabel =
                      report.report_type === 'fire-alarm' ? 'G2 Install' : 'G3 Commission';
                    return (
                      <button
                        key={report.report_id}
                        type="button"
                        onClick={() => handleSelectOriginalCert(d)}
                        className="w-full text-left p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] active:scale-[0.98] transition-all touch-manipulation"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-white text-sm">
                            {d.certificateNumber || 'No cert number'}
                          </p>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                            {typeLabel}
                          </span>
                        </div>
                        <p className="text-xs text-white">
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
      </Section>

      <Section
        title="Original System Certificates"
        accentColor="from-amber-500/40 to-yellow-400/20"
      >
        {missingOriginalCert && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-red-400">
              Original certificate reference is mandatory for G7. If original certs are not
              available, a new G1+G2+G3 is required.
            </p>
          </div>
        )}
        <Field label="Original Cert Reference" required>
          <Input
            value={formData.originalCertRef || ''}
            onChange={(e) => onUpdate('originalCertRef', e.target.value)}
            className={inputCn}
            placeholder="G2 or G3 cert reference"
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="G1 Design Ref">
            <Input
              value={formData.designCertReference || ''}
              onChange={(e) => onUpdate('designCertReference', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="G3 Commission Ref">
            <Input
              value={formData.commissioningCertRef || ''}
              onChange={(e) => onUpdate('commissioningCertRef', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </Section>

      <Section title="Client Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <CertificateClientSection formData={formData} onUpdate={onUpdate} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Client Name" required>
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
        <Field label="Client Address">
          <Input
            value={formData.clientAddress || ''}
            onChange={(e) => onUpdate('clientAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>

      {/* Original system summary (shown after loading) */}
      {formData.originalCertRef && formData.systemCategory && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
          <p className="text-[10px] text-white uppercase tracking-wider mb-2">
            Original System (before modification)
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-white">
              Category:{' '}
              <span className="font-semibold text-elec-yellow">{formData.systemCategory}</span>
            </p>
            {formData.systemMake && (
              <p className="text-white">
                Panel: <span className="font-semibold">{formData.systemMake}</span>
              </p>
            )}
            {formData.existingZones && (
              <p className="text-white">
                Zones: <span className="font-semibold">{formData.existingZones}</span>
              </p>
            )}
          </div>
        </div>
      )}

      <Section title="Premises & Existing System" accentColor="from-red-500/40 to-orange-400/20">
        <Field label="Premises Address" required>
          <Input
            value={formData.premisesAddress || ''}
            onChange={(e) => onUpdate('premisesAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Premises Type">
            <ComboboxCell
              value={formData.premisesType || ''}
              onChange={(v) => onUpdate('premisesType', v)}
              options={premisesTypeOptions}
              placeholder="Select..."
              className="h-12 text-base"
            />
          </Field>
          <Field label="Existing Category">
            <ComboboxCell
              value={formData.systemCategory || ''}
              onChange={(v) => onUpdate('systemCategory', v)}
              options={categoryOptions}
              placeholder="Select..."
              className="h-12 text-base"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Panel Make / Model">
            <Input
              value={formData.systemMake || ''}
              onChange={(e) => onUpdate('systemMake', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Existing Zones">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.existingZones || ''}
              onChange={(e) => onUpdate('existingZones', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </Section>
    </div>
  );
}
