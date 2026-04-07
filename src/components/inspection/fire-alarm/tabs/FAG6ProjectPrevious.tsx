/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 1: Project & Previous Certificate
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';
import { AlertTriangle, Download, Loader2 } from 'lucide-react';

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';

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
    <div className="space-y-5">
      <div className="border-b border-red-500/20 pb-3">
        <p className="text-sm font-bold text-red-400">
          FIRE ALARM INSPECTION & SERVICING CERTIFICATE (G6)
        </p>
        <p className="text-xs text-white mt-1">
          BS 5839-1:2025 — Periodic inspection and servicing
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
        <Field label="Inspection Date">
          <Input
            type="date"
            value={formData.inspectionDate || ''}
            onChange={(e) => onUpdate('inspectionDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>

      {/* Load from Previous */}
      <Section title="Load from Previous" accentColor="from-elec-yellow/40 to-amber-400/20">
        <Button
          variant="outline"
          onClick={handleLoadPrevious}
          disabled={loadingPrevious}
          className="w-full h-12 text-sm border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-[0.98] rounded-xl"
        >
          {loadingPrevious ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {loadingPrevious ? 'Searching...' : 'Load from Previous Certificate'}
        </Button>
        <p className="text-xs text-white text-center">
          Pre-fills client, premises, system details, and previous defects
        </p>

        {/* Cert Picker Sheet */}
        <Sheet open={showCertPicker} onOpenChange={setShowCertPicker}>
          <SheetContent side="bottom" className="h-[70dvh] p-0 rounded-t-2xl flex flex-col">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
                <SheetTitle className="text-lg font-bold text-white">
                  Select Previous Certificate
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                {previousCerts.length === 0 ? (
                  <p className="text-sm text-white text-center py-8">
                    No previous certificates found
                  </p>
                ) : (
                  <div className="space-y-2">
                    {previousCerts.map((report: any) => {
                      const d = report.data || {};
                      const typeLabel =
                        report.report_type === 'fire-alarm'
                          ? 'G2 Install'
                          : report.report_type === 'fire-alarm-commissioning'
                            ? 'G3 Commission'
                            : 'G6 Inspection';
                      const date =
                        d.commissioningDate || d.inspectionDate || d.installationDate || '';
                      return (
                        <button
                          key={report.report_id}
                          type="button"
                          onClick={() => handleSelectCert(d)}
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
                          {date && <p className="text-xs text-white mt-0.5">{date}</p>}
                          {d.defectsFound?.length > 0 && (
                            <p className="text-xs text-amber-400 mt-0.5">
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
      </Section>

      <Section title="Previous Certificate" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Previous Cert Reference">
            <Input
              value={formData.previousCertificateRef || ''}
              onChange={(e) => onUpdate('previousCertificateRef', e.target.value)}
              className={inputCn}
              placeholder="G6 or G3 cert ref"
            />
          </Field>
          <Field label="Previous Cert Date">
            <Input
              type="date"
              value={formData.previousInspectionDate || ''}
              onChange={(e) => onUpdate('previousInspectionDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Previous Inspector">
            <Input
              value={formData.previousInspector || ''}
              onChange={(e) => onUpdate('previousInspector', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Previous Company">
            <Input
              value={formData.previousInspectorCompany || ''}
              onChange={(e) => onUpdate('previousInspectorCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        {intervalWarning && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-400">{intervalWarning}</p>
          </div>
        )}
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

      <Section title="Premises" accentColor="from-red-500/40 to-orange-400/20">
        <Field label="Premises Name">
          <Input
            value={formData.premisesName || ''}
            onChange={(e) => onUpdate('premisesName', e.target.value)}
            className={inputCn}
          />
        </Field>
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
      </Section>

      <Section title="System Reference" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="System Category">
            <ComboboxCell
              value={formData.systemCategory || ''}
              onChange={(v) => onUpdate('systemCategory', v)}
              options={categoryOptions}
              placeholder="Select..."
              className="h-12 text-base"
            />
          </Field>
          <Field label="Panel Make / Model">
            <Input
              value={formData.systemMake || ''}
              onChange={(e) => onUpdate('systemMake', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Panel Location">
          <Input
            value={formData.panelLocation || ''}
            onChange={(e) => onUpdate('panelLocation', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>
    </div>
  );
}
