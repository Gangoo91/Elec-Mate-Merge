/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 1: Project & Previous Certificate
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';
import { Loader2 } from 'lucide-react';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const comboTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:bg-transparent hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

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

export default function FAG6ProjectPrevious({ formData, onUpdate }: Props) {
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [showCertPicker, setShowCertPicker] = useState(false);
  const [previousCerts, setPreviousCerts] = useState<any[]>([]);

  // Auto-load inspector details
  useEffect(() => {
    if (formData.inspectorName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        onUpdate('inspectorName', cp.inspector_name || cp.company_name || '');
        onUpdate('inspectorCompany', cp.company_name || '');
      }
    });
  }, []);

  // Fetch previous certs to show in picker
  const handleLoadPrevious = useCallback(async () => {
    setLoadingPrevious(true);
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
        toast('No previous fire alarm certificates found');
        return;
      }

      setPreviousCerts(reports);
      setShowCertPicker(true);
    } catch (err) {
      console.error('Failed to load previous certs:', err);
      toast.error('Failed to load previous certificates');
    } finally {
      setLoadingPrevious(false);
    }
  }, []);

  // Apply selected cert data
  const handleSelectCert = useCallback(
    (certData: any) => {
      if (!certData) return;

      // Pre-fill client & premises
      if (!formData.clientName && certData.clientName) onUpdate('clientName', certData.clientName);
      if (!formData.clientTelephone && certData.clientTelephone)
        onUpdate('clientTelephone', certData.clientTelephone);
      if (!formData.clientAddress && certData.clientAddress)
        onUpdate('clientAddress', certData.clientAddress);
      if (!formData.premisesName && certData.premisesName)
        onUpdate('premisesName', certData.premisesName);
      if (!formData.premisesAddress && (certData.premisesAddress || certData.installationAddress))
        onUpdate('premisesAddress', certData.premisesAddress || certData.installationAddress);
      if (!formData.premisesType && certData.premisesType)
        onUpdate('premisesType', certData.premisesType);
      if (!formData.systemCategory && certData.systemCategory)
        onUpdate('systemCategory', certData.systemCategory);
      if (!formData.systemMake && (certData.systemMake || certData.panelMake))
        onUpdate('systemMake', certData.systemMake || certData.panelMake);
      if (!formData.panelLocation && certData.panelLocation)
        onUpdate('panelLocation', certData.panelLocation);

      // Load previous defects
      if (certData.defectsFound?.length > 0) {
        const prevDefects = certData.defectsFound.map((d: any) => ({
          id: crypto.randomUUID(),
          description: d.description || '',
          originalDate:
            d.rectificationDate || certData.commissioningDate || certData.inspectionDate || '',
          status: d.rectified ? 'rectified' : 'outstanding',
          notes: '',
        }));
        onUpdate('previousDefects', prevDefects);
      }

      // Set previous cert reference
      onUpdate('previousCertificateRef', certData.certificateNumber || '');
      onUpdate(
        'previousInspectionDate',
        certData.commissioningDate || certData.inspectionDate || ''
      );

      setShowCertPicker(false);
      toast.success('Loaded from previous certificate');
    },
    [formData, onUpdate]
  );

  // Service interval warning
  const intervalWarning = (() => {
    if (!formData.previousInspectionDate || !formData.inspectionDate) return null;
    const prev = new Date(formData.previousInspectionDate);
    const curr = new Date(formData.inspectionDate);
    const months =
      (curr.getFullYear() - prev.getFullYear()) * 12 + (curr.getMonth() - prev.getMonth());
    if (months > 7)
      return `${months} months since last inspection — BS 5839-1 recommends maximum 6 months`;
    return null;
  })();

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Certificate reference */}
      <div className={cardCn}>
        <SectionHeader title="Certificate reference" />
        <p className="-mt-2 text-sm text-white/80">
          Fire alarm inspection &amp; servicing certificate (G6) — BS 5839-1:2025 periodic
          inspection and servicing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Certificate number">
            <Input
              value={formData.certificateNumber || ''}
              onChange={(e) => onUpdate('certificateNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Inspection date">
            <Input
              type="date"
              value={formData.inspectionDate || ''}
              onChange={(e) => onUpdate('inspectionDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Load from previous */}
      <div className={cardCn}>
        <SectionHeader title="Load from previous" />
        <button
          type="button"
          onClick={handleLoadPrevious}
          disabled={loadingPrevious}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation transition-transform active:scale-[0.98] disabled:bg-elec-yellow disabled:text-black disabled:opacity-100"
        >
          {loadingPrevious && <Loader2 className="h-4 w-4 animate-spin" />}
          {loadingPrevious ? 'Searching...' : 'Load from previous certificate'}
        </button>
        <p className="text-sm text-white/80">
          Pre-fills client, premises, system details, and previous defects.
        </p>

        {/* Cert picker sheet */}
        <Sheet open={showCertPicker} onOpenChange={setShowCertPicker}>
          <SheetContent side="bottom" className="h-[70dvh] p-0 rounded-t-2xl flex flex-col">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.08]">
                <SheetTitle className="text-lg font-bold text-white">
                  Select previous certificate
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                {previousCerts.length === 0 ? (
                  <p className="text-sm text-white/80 text-center py-8">
                    No previous certificates found
                  </p>
                ) : (
                  <div className="space-y-2">
                    {previousCerts.map((report: any) => {
                      const d = report.data || {};
                      const typeLabel =
                        report.report_type === 'fire-alarm'
                          ? 'G2 install'
                          : report.report_type === 'fire-alarm-commissioning'
                            ? 'G3 commission'
                            : 'G6 inspection';
                      const date =
                        d.commissioningDate || d.inspectionDate || d.installationDate || '';
                      return (
                        <button
                          key={report.report_id}
                          type="button"
                          onClick={() => handleSelectCert(d)}
                          className="w-full text-left p-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] active:scale-[0.98] transition-all touch-manipulation"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="font-semibold text-white text-sm">
                              {d.certificateNumber || 'No cert number'}
                            </p>
                            <span className="shrink-0 rounded-full border border-red-500/30 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                              {typeLabel}
                            </span>
                          </div>
                          <p className="text-[12px] text-white/80">
                            {d.premisesAddress ||
                              d.installationAddress ||
                              d.clientName ||
                              'No address'}
                          </p>
                          {date && <p className="text-[12px] text-white/80 mt-0.5">{date}</p>}
                          {d.defectsFound?.length > 0 && (
                            <p className="text-[12px] text-amber-400 mt-0.5">
                              {d.defectsFound.length} defect{d.defectsFound.length > 1 ? 's' : ''}{' '}
                              recorded
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Previous certificate */}
      <div className={cardCn}>
        <SectionHeader title="Previous certificate" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Previous cert reference">
            <Input
              value={formData.previousCertificateRef || ''}
              onChange={(e) => onUpdate('previousCertificateRef', e.target.value)}
              className={inputCn}
              placeholder="G6 or G3 cert ref"
            />
          </Field>
          <Field label="Previous cert date">
            <Input
              type="date"
              value={formData.previousInspectionDate || ''}
              onChange={(e) => onUpdate('previousInspectionDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Previous inspector">
            <Input
              value={formData.previousInspector || ''}
              onChange={(e) => onUpdate('previousInspector', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Previous company">
            <Input
              value={formData.previousInspectorCompany || ''}
              onChange={(e) => onUpdate('previousInspectorCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        {intervalWarning && (
          <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] px-3.5 py-3">
            <p className="text-sm text-amber-400">{intervalWarning}</p>
          </div>
        )}
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

      {/* Premises */}
      <div className={cardCn}>
        <SectionHeader title="Premises" />
        <Field label="Premises name">
          <Input
            value={formData.premisesName || ''}
            onChange={(e) => onUpdate('premisesName', e.target.value)}
            className={inputCn}
          />
        </Field>
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
              className={comboTriggerCn}
            />
          </Field>
          <Field label="Floors">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.numberOfFloors || ''}
              onChange={(e) => onUpdate('numberOfFloors', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* System reference */}
      <div className={cardCn}>
        <SectionHeader title="System reference" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="System category">
            <ComboboxCell
              value={formData.systemCategory || ''}
              onChange={(v) => onUpdate('systemCategory', v)}
              options={categoryOptions}
              placeholder="Select..."
              className={comboTriggerCn}
            />
          </Field>
          <Field label="Panel make / model">
            <Input
              value={formData.systemMake || ''}
              onChange={(e) => onUpdate('systemMake', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Panel location">
          <Input
            value={formData.panelLocation || ''}
            onChange={(e) => onUpdate('panelLocation', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>
    </div>
  );
}
