import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import SignatureInput from '@/components/signature/SignatureInput';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}</Label>{children}</div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  reportId?: string;
  onSaveFirst?: () => Promise<void>;
}

export default function BESSDeclarations({ formData, onUpdate, reportId, onSaveFirst }: Props) {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const { photos, isUploading, isScanning, uploadPhoto, deletePhoto, scanPhotoWithAI } =
    useInspectionPhotos({
      reportId: reportId || 'new',
      reportType: 'bess',
      itemId: 'general-photos',
    });

  // Handle photo with auto-save for new reports
  const handlePhotoCapture = useCallback(async (file: File) => {
    if (!reportId || reportId === 'new') {
      if (onSaveFirst) {
        toast.info('Saving certificate first...');
        await onSaveFirst();
        // Store file — on next render reportId will be populated and user can retry
        setPendingFile(file);
        toast.success('Saved! Tap upload again to attach photo.');
        return;
      }
    }
    await uploadPhoto(file);
  }, [reportId, onSaveFirst, uploadPhoto]);

  // Auto-upload pending file once reportId is available
  const handleRetryPending = useCallback(async () => {
    if (pendingFile && reportId && reportId !== 'new') {
      try {
        await uploadPhoto(pendingFile);
        setPendingFile(null);
      } catch { /* user can retry manually */ }
    }
  }, [pendingFile, reportId, uploadPhoto]);

  return (
    <div className="space-y-6">
      {/* Customer Handover */}
      <div className="space-y-4">
        <SectionHeader title="Customer Handover" />
        <Sub title="Documentation" />
        <div className="space-y-2">
          {[
            { field: 'operatingInstructionsProvided', label: 'Operating instructions' },
            { field: 'maintenanceScheduleProvided', label: 'Maintenance schedule' },
            { field: 'dnoNotificationCopyProvided', label: 'DNO notification copy' },
            { field: 'mcsCertificateProvided', label: 'MCS certificate' },
          ].map(({ field, label }) => (
            <div key={field} className="flex items-center justify-between">
              <Label className="text-white text-xs font-medium">{label}</Label>
              <div className="flex gap-1.5">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                    className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                      formData[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Sub title="Handover" />
        <div className="space-y-2">
          {[
            { field: 'emergencyShutdownExplained', label: 'Emergency shutdown explained' },
            { field: 'customerAppSetup', label: 'App / monitoring set up' },
            { field: 'warrantyRegistered', label: 'Warranty registered' },
            { field: 'buildingControlNotified', label: 'Building control notified' },
          ].map(({ field, label }) => (
            <div key={field} className="flex items-center justify-between">
              <Label className="text-white text-xs font-medium">{label}</Label>
              <div className="flex gap-1.5">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                    className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                      formData[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warranty */}
      <div className="space-y-4">
        <SectionHeader title="Warranty" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Battery (years)"><Input value={formData.batteryWarrantyYears} onChange={(e) => onUpdate('batteryWarrantyYears', e.target.value)} className={inputCn} placeholder="e.g. 10" /></Field>
          <Field label="Inverter (years)"><Input value={formData.inverterWarrantyYears} onChange={(e) => onUpdate('inverterWarrantyYears', e.target.value)} className={inputCn} placeholder="e.g. 5" /></Field>
        </div>
      </div>

      {/* Declaration & Signatures */}
      <div className="space-y-4">
        <SectionHeader title="Declaration & Signatures" />
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
          <p className="text-[11px] text-white leading-relaxed">I hereby certify that the battery energy storage system installation described in this certificate has been designed, installed, inspected, tested, and commissioned in accordance with BS 7671:2018+A3:2024, the IET Code of Practice for Electrical Energy Storage Systems (3rd Edition), MCS MIS 3012:2025, PAS 63100:2024 (where applicable), and the manufacturer's installation instructions. The system is safe for use and complies with the relevant requirements of the Distribution Network Operator.</p>
        </div>

        <Sub title="Installer" />
        <SignatureInput label="Installer Signature *" value={formData.installerSignature} onChange={(sig) => onUpdate('installerSignature', sig || '')} />
        <Field label="Installer Date"><Input type="date" value={formData.installerDate} onChange={(e) => onUpdate('installerDate', e.target.value)} className={inputCn} /></Field>

        <Sub title="Commissioner (if different)" />
        <Field label="Commissioner Name"><Input value={formData.commissionerName} onChange={(e) => onUpdate('commissionerName', e.target.value)} className={inputCn} placeholder="Leave blank if same as installer" /></Field>
        {formData.commissionerName && <SignatureInput label="Commissioner Signature" value={formData.commissionerSignature} onChange={(sig) => onUpdate('commissionerSignature', sig || '')} />}

        <Sub title="Client Acknowledgement" />
        <SignatureInput label="Client Signature" value={formData.clientSignature} onChange={(sig) => onUpdate('clientSignature', sig || '')} />
        {formData.clientSignature && <Field label="Client Date"><Input type="date" value={formData.clientDate} onChange={(e) => onUpdate('clientDate', e.target.value)} className={inputCn} /></Field>}
      </div>

      {/* Compliance */}
      <div className="space-y-4">
        <SectionHeader title="Compliance & Next Inspection" />

        {formData.installationType === 'domestic' && (
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs font-medium">PAS 63100:2024 compliant</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('pas63100Compliant', v)}
                  className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                    formData.pas63100Compliant === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        )}

        <Sub title="Next Inspection" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Next Inspection Date"><Input type="date" value={formData.nextInspectionDate} onChange={(e) => onUpdate('nextInspectionDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Interval (months)"><Input type="number" value={formData.nextInspectionInterval} onChange={(e) => onUpdate('nextInspectionInterval', e.target.value)} className={inputCn} placeholder="12" /></Field>
        </div>

        <Sub title="References" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Building Control Ref"><Input value={formData.buildingControlRef} onChange={(e) => onUpdate('buildingControlRef', e.target.value)} className={inputCn} placeholder="If notified" /></Field>
          <Field label="Linked EIC / EICR Ref"><Input value={formData.eicReference} onChange={(e) => onUpdate('eicReference', e.target.value)} className={inputCn} placeholder="EIC-xxx" /></Field>
        </div>
      </div>

      {/* Photos — uses EICR shared components */}
      <div className="space-y-4">
        <SectionHeader title="Photo Evidence" />
        <InspectionPhotoUpload
          onPhotoCapture={handlePhotoCapture}
          isUploading={isUploading}
        />
        {pendingFile && reportId && reportId !== 'new' && (
          <button onClick={handleRetryPending} className="w-full h-11 rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow text-xs font-semibold touch-manipulation active:scale-[0.98]">
            Upload pending photo now
          </button>
        )}
        {photos.length > 0 && (
          <InspectionPhotoGallery
            photos={photos}
            onDeletePhoto={deletePhoto}
            onScanPhoto={scanPhotoWithAI}
            isScanning={isScanning}
            certificateContext={{
              certificateNumber: formData.certificateNumber || '',
              certificateType: 'BESS',
              installationAddress: formData.installationAddress || '',
              clientName: formData.clientName || '',
            }}
          />
        )}
        <p className="text-[10px] text-white/50">Recommended: battery, warning labels, AC + DC isolation, CU, meter, cable routing</p>
      </div>

      {/* Notes */}
      <div className="space-y-4">
        <SectionHeader title="Notes & Observations" />
        <Field label="Defects / Observations"><Textarea value={formData.defectsObservations} onChange={(e) => onUpdate('defectsObservations', e.target.value)} className={textareaCn} placeholder="Any defects found or observations..." /></Field>
        <Field label="Additional Notes"><Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes, recommendations..." /></Field>
      </div>
    </div>
  );
}
