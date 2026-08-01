/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G2 — Tab 5: Declarations & Photos
 * Third-party cert, installer declaration, responsible person, photos
 */

import { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { PreviousCertPreFillSheet } from '../PreviousCertPreFillSheet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useParams } from 'react-router-dom';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const voltButtonCn =
  'w-full h-11 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-transform disabled:bg-elec-yellow disabled:text-black disabled:opacity-100';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  /** Database report id once autosave has created the report — the route param
   * stays 'new' after history.replaceState, so prefer this when provided. */
  savedReportId?: string | null;
}

export default function FADeclarations({ formData, onUpdate, savedReportId }: Props) {
  const { id } = useParams<{ id: string }>();
  const { photos: uploadedPhotos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: savedReportId || id || 'new',
    reportType: 'fire-alarm',
    itemId: 'general-photos',
  });
  const [preFillOpen, setPreFillOpen] = useState(false);
  const [previousCertData, setPreviousCertData] = useState<any>(null);
  const [loadingPrevious, setLoadingPrevious] = useState(false);

  // Auto-suggest service dates when installation completion date is entered
  useEffect(() => {
    if (!formData.commissioningDate) return;
    const date = new Date(formData.commissioningDate);
    if (isNaN(date.getTime())) return;

    // Only auto-fill if fields are empty
    if (!formData.nextServiceDue) {
      const service = new Date(date);
      service.setMonth(service.getMonth() + 6);
      onUpdate('nextServiceDue', service.toISOString().split('T')[0]);
    }
    if (!formData.nextInspectionDue) {
      const inspection = new Date(date);
      inspection.setFullYear(inspection.getFullYear() + 1);
      onUpdate('nextInspectionDue', inspection.toISOString().split('T')[0]);
    }
  }, [formData.commissioningDate]);

  // Fetch previous fire alarm cert at same premises
  const handlePreFillOpen = useCallback(async () => {
    if (!formData.premisesAddress && !formData.clientName) {
      toast.error('Enter a premises address or client name first');
      return;
    }
    setLoadingPrevious(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: reports } = await supabase
        .from('reports')
        .select('data')
        .eq('user_id', user.id)
        .eq('report_type', 'fire-alarm')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (!reports || reports.length === 0) {
        toast('No previous fire alarm certificates found');
        setLoadingPrevious(false);
        return;
      }

      // Find a cert matching this premises address or client
      const address = (formData.premisesAddress || '').toLowerCase();
      const client = (formData.clientName || '').toLowerCase();
      const match = reports.find((r: any) => {
        const d = r.data || {};
        const matchAddr =
          address &&
          (d.premisesAddress || d.installationAddress || '').toLowerCase().includes(address);
        const matchClient = client && (d.clientName || '').toLowerCase().includes(client);
        return matchAddr || matchClient;
      });

      const certData = match?.data || reports[0]?.data;
      if (certData) {
        setPreviousCertData(certData);
        setPreFillOpen(true);
      } else {
        toast('No matching previous certificate found');
      }
    } catch (err) {
      console.error('Failed to load previous certs:', err);
      toast.error('Failed to load previous certificates');
    } finally {
      setLoadingPrevious(false);
    }
  }, [formData.premisesAddress, formData.clientName]);

  // Apply pre-fill selections
  const handlePreFillConfirm = useCallback(
    (selectedSections: string[]) => {
      if (!previousCertData || selectedSections.length === 0) return;

      if (selectedSections.includes('thirdParty')) {
        const cert = previousCertData.thirdPartyCertification || previousCertData;
        if (cert.bafeRegistration || cert.bafeRegistered)
          onUpdate('bafeRegistered', cert.bafeRegistration || cert.bafeRegistered || true);
        if (cert.fiaMembership || cert.fiaRegistered)
          onUpdate('fiaRegistered', cert.fiaMembership || cert.fiaRegistered || true);
        if (cert.nsiSsaibCertification || cert.nsiRegistered)
          onUpdate('nsiRegistered', cert.nsiSsaibCertification || cert.nsiRegistered || true);
        if (cert.thirdPartyCertNumber) onUpdate('thirdPartyCertNumber', cert.thirdPartyCertNumber);
      }

      if (selectedSections.includes('fra')) {
        const fra = previousCertData.fireRiskAssessment || previousCertData;
        if (fra.fraReference) onUpdate('fraReference', fra.fraReference);
        if (fra.fraDate) onUpdate('fraDate', fra.fraDate);
        if (fra.fraCompany) onUpdate('fraCompany', fra.fraCompany);
        if (fra.fraAuthor) onUpdate('fraAuthor', fra.fraAuthor);
      }

      if (selectedSections.includes('monitoring')) {
        const mon = previousCertData.monitoringDetails || previousCertData;
        if (mon.isMonitored || mon.systemMonitored)
          onUpdate('systemMonitored', mon.isMonitored || mon.systemMonitored);
        if (mon.arcName) onUpdate('arcName', mon.arcName);
        if (mon.arcAccountNumber) onUpdate('arcAccountNumber', mon.arcAccountNumber);
        if (mon.arcTelephone || mon.arcPhone)
          onUpdate('arcPhone', mon.arcTelephone || mon.arcPhone);
        if (mon.signallingRoute) onUpdate('signallingRoute', mon.signallingRoute);
      }

      toast.success(
        `Pre-filled ${selectedSections.length} section${selectedSections.length > 1 ? 's' : ''}`
      );
      setPreFillOpen(false);
    },
    [previousCertData, onUpdate]
  );


  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Third-party certification */}
      <div className={cardCn}>
        <SectionHeader title="Third-party certification" />
        <div className="space-y-2">
          {[
            { field: 'bafeRegistered', label: 'BAFE SP203-1 registered' },
            { field: 'fiaRegistered', label: 'FIA member' },
            { field: 'nsiRegistered', label: 'NSI / SSAIB approved' },
          ].map(({ field, label }) => (
            <label
              key={field}
              className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation"
            >
              <Checkbox
                checked={formData[field] || false}
                onCheckedChange={(v) => onUpdate(field, v)}
                className={checkboxCn}
              />
              <span className="text-sm text-white">{label}</span>
            </label>
          ))}
        </div>
        <Field label="Registration number">
          <Input
            value={formData.thirdPartyCertNumber || ''}
            onChange={(e) => onUpdate('thirdPartyCertNumber', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Pre-fill from previous */}
      <div className={cardCn}>
        <SectionHeader title="Pre-fill" />
        <button
          type="button"
          onClick={handlePreFillOpen}
          disabled={loadingPrevious}
          className={voltButtonCn}
        >
          {loadingPrevious ? 'Searching...' : 'Pre-fill from previous certificate'}
        </button>
        <PreviousCertPreFillSheet
          open={preFillOpen}
          onOpenChange={setPreFillOpen}
          previousData={previousCertData}
          onConfirm={handlePreFillConfirm}
        />
      </div>

      {/* Installer declaration */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Installer declaration" />
        <div className="rounded-xl bg-white/[0.05] p-4">
          <p className="text-[12px] leading-relaxed text-white/85">
            I hereby certify that the fire detection and fire alarm system installation described in
            this certificate has been carried out in accordance with BS 5839-1:2025 and the design
            specification referenced above, except for any variations stated. The installation is
            complete and ready for commissioning.
          </p>
        </div>
        {(formData.installerName || formData.installerCompany) && (
          <div className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-sm font-semibold text-white">
              {formData.installerName || 'Unnamed'}
            </p>
            {formData.installerCompany && (
              <p className="text-[12px] text-white/80 mt-0.5">{formData.installerCompany}</p>
            )}
            <p className="text-[11px] text-white/80 mt-1">From tab 1 — Installer details</p>
          </div>
        )}
        <Field label="Qualifications">
          <Input
            value={formData.installerQualifications || ''}
            onChange={(e) => onUpdate('installerQualifications', e.target.value)}
            className={inputCn}
            placeholder="e.g. FIA certified, ECS card holder"
          />
        </Field>
        <SignatureInput
          label="Installer signature *"
          value={formData.installerSignature || ''}
          onChange={(sig) => onUpdate('installerSignature', sig || '')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Signature date">
            <Input
              type="date"
              value={formData.installerSignatureDate || ''}
              onChange={(e) => onUpdate('installerSignatureDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Installation completion date">
            <Input
              type="date"
              value={formData.commissioningDate || ''}
              onChange={(e) => onUpdate('commissioningDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Responsible person */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Responsible person acknowledgement" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Name">
            <Input
              value={formData.responsiblePersonName || ''}
              onChange={(e) => onUpdate('responsiblePersonName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Position">
            <Input
              value={formData.responsiblePersonPosition || ''}
              onChange={(e) => onUpdate('responsiblePersonPosition', e.target.value)}
              className={inputCn}
              placeholder="e.g. Building Manager"
            />
          </Field>
        </div>
        <SignatureInput
          label="Responsible person signature"
          value={formData.responsiblePersonSignature || ''}
          onChange={(sig) => onUpdate('responsiblePersonSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.responsiblePersonDate || ''}
            onChange={(e) => onUpdate('responsiblePersonDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Photos */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Photos" />
        <InspectionPhotoUpload onPhotoCapture={async (file) => { await uploadPhoto(file); }} isUploading={isUploading} />
        {uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.map((p) => (
              <div key={p.id} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={p.url || p.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => deletePhoto(p.id)}
                  className="absolute inset-x-1.5 bottom-1.5 rounded-lg bg-black/70 py-1.5 text-center text-[11px] font-medium text-red-400 touch-manipulation active:opacity-70"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overall result */}
      <div className={cardCn}>
        <SectionHeader title="Overall result" />
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'satisfactory')}
            className={cn(
              'w-full h-12 rounded-xl border px-4 text-left text-sm touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'satisfactory'
                ? 'bg-green-500 border-green-500 text-black font-semibold'
                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
            )}
          >
            Satisfactory
          </button>
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'unsatisfactory')}
            className={cn(
              'w-full h-12 rounded-xl border px-4 text-left text-sm touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'unsatisfactory'
                ? 'bg-red-500 border-red-500 text-white font-semibold'
                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
            )}
          >
            Unsatisfactory
          </button>
        </div>
      </div>

      {/* Next service / inspection */}
      <div className={cardCn}>
        <SectionHeader title="Service schedule" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Next service due">
            <Input
              type="date"
              value={formData.nextServiceDue || ''}
              onChange={(e) => onUpdate('nextServiceDue', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Next inspection due">
            <Input
              type="date"
              value={formData.nextInspectionDue || ''}
              onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Notes */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Notes" />
        <Textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className={textareaCn}
          placeholder="Additional notes..."
        />
      </div>
    </div>
  );
}
