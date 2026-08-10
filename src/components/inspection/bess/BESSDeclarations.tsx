/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { SectionHeader } from "./BESSSectionHeader";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import SignatureInput from '@/components/signature/SignatureInput';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';
const cardWideCn = cardCn + ' lg:col-span-2';
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';
const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label className="text-[12px] font-medium text-white mb-1 block">{label}</Label>{children}</div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
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
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Customer Handover */}
      <div className={cardWideCn}>
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
              <Label className="text-[12px] font-medium text-white">{label}</Label>
              <div className="flex gap-1.5">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                    className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                      formData[field] === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
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
              <Label className="text-[12px] font-medium text-white">{label}</Label>
              <div className="flex gap-1.5">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                    className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                      formData[field] === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Declaration & Signatures */}
      <div className={cardWideCn}>
        <SectionHeader title="Declaration & Signatures" />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-[12px] text-white/90 leading-relaxed">I hereby certify that the battery energy storage system installation described in this certificate has been designed, installed, inspected, tested, and commissioned in accordance with BS 7671:2018+A4:2026, the IET Code of Practice for Electrical Energy Storage Systems (3rd Edition), MCS MIS 3012:2025, PAS 63100:2024 (where applicable), and the manufacturer's installation instructions. The system is safe for use and complies with the relevant requirements of the Distribution Network Operator.</p>
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
      <div className={cardWideCn}>
        <SectionHeader title="Compliance & Next Inspection" />

        {formData.installationType === 'domestic' && (
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white">PAS 63100:2024 compliant</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('pas63100Compliant', v)}
                  className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                    formData.pas63100Compliant === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        )}

        <Sub title="Next Inspection" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Next Inspection Date"><Input type="date" value={formData.nextInspectionDate} onChange={(e) => onUpdate('nextInspectionDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Interval (months)"><Input type="number" value={formData.nextInspectionInterval} onChange={(e) => onUpdate('nextInspectionInterval', e.target.value)} className={inputCn} placeholder="12" /></Field>
        </div>

        <Sub title="References" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Building Control Ref"><Input value={formData.buildingControlRef} onChange={(e) => onUpdate('buildingControlRef', e.target.value)} className={inputCn} placeholder="If notified" /></Field>
          <Field label="Linked EIC / EICR Ref"><Input value={formData.eicReference} onChange={(e) => onUpdate('eicReference', e.target.value)} className={inputCn} placeholder="EIC-xxx" /></Field>
        </div>
      </div>

      {/* Photos — uses EICR shared components */}
      <div className={cardWideCn}>
        <SectionHeader title="Photo Evidence" />
        <InspectionPhotoUpload
          onPhotoCapture={handlePhotoCapture}
          isUploading={isUploading}
        />
        {pendingFile && reportId && reportId !== 'new' && (
          <button onClick={handleRetryPending} className="w-full h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]">
            Upload pending photo now
          </button>
        )}
        {photos.length > 0 && (
          <InspectionPhotoGallery
            photos={photos}
            onDeletePhoto={deletePhoto}
            onScanPhoto={scanPhotoWithAI}
            isScanning={isScanning}
            // No observation-level AI on this screen, so the per-photo second
            // opinion is the only route to it here.
            showAiSecondOpinion
            certificateContext={{
              certificateNumber: formData.certificateNumber || '',
              certificateType: 'BESS',
              installationAddress: formData.installationAddress || '',
              clientName: formData.clientName || '',
            }}
          />
        )}
        <p className="text-[11px] text-white/80">Recommended: battery, warning labels, AC + DC isolation, CU, meter, cable routing</p>
      </div>

      {/* Notes */}
      <div className={cardWideCn}>
        <SectionHeader title="Notes & Observations" />
        <Field label="Defects / Observations"><Textarea value={formData.defectsObservations} onChange={(e) => onUpdate('defectsObservations', e.target.value)} className={textareaCn} placeholder="Any defects found or observations..." /></Field>
        <Field label="Additional Notes"><Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes, recommendations..." /></Field>
      </div>
    </div>
  );
}
