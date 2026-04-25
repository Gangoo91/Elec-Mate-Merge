/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Solar PV Declarations Tab — Best-in-Class Mobile
 * Defects, handover, installer/electrician declarations, photos
 */

import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SolarPVFormData, Defect, COMPETENCE_SCHEMES } from '@/types/solar-pv';
import { useHaptic } from '@/hooks/useHaptic';
import { toast } from 'sonner';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import SignatureInput from '@/components/signature/SignatureInput';
import { Section, Field, inputCn, textareaCn, CheckboxCard } from './SolarPVSection';

interface Props {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: unknown) => void;
}

const severityOptions = [
  { value: 'critical', label: 'Critical (C1)' },
  { value: 'non-critical', label: 'Non-Critical (C2)' },
  { value: 'recommendation', label: 'Recommendation (C3)' },
];

// ============================================================================
// Main Component
// ============================================================================

const SolarPVDeclarations: React.FC<Props> = ({ formData, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const haptic = useHaptic();

  const { photos: uploadedPhotos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: id || 'new',
    reportType: 'solar-pv',
    itemId: 'general-photos',
  });

  // Critical defects check — blocks "Satisfactory"
  const hasCriticalDefects = (formData.defects || []).some(
    (d: any) => d.severity === 'critical' && !d.rectified
  );

  // Auto-calculate next service date (12 months from commissioning)
  const autoNextService = (() => {
    if ((formData as any).nextServiceDue) return (formData as any).nextServiceDue;
    const commDate = formData.commissioningDate || formData.installationDate;
    if (!commDate) return '';
    const d = new Date(commDate);
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  })();

  const addDefect = useCallback(() => {
    haptic.light();
    const newDefect: Defect = {
      id: crypto.randomUUID(),
      description: '',
      severity: 'non-critical',
      location: '',
      rectified: false,
    };
    onUpdate('defects', [...(formData.defects || []), newDefect]);
  }, [formData.defects, onUpdate]);

  const updateDefect = useCallback(
    (id: string, field: string, value: unknown) => {
      onUpdate('defects', (formData.defects || []).map((d: any) => (d.id === id ? { ...d, [field]: value } : d)));
    },
    [formData.defects, onUpdate]
  );

  const removeDefect = useCallback(
    (id: string) => {
      haptic.medium();
      onUpdate('defects', (formData.defects || []).filter((d: any) => d.id !== id));
    },
    [formData.defects, onUpdate]
  );

  const updateInstaller = useCallback(
    (field: string, value: unknown) => onUpdate('installerDeclaration', { ...formData.installerDeclaration, [field]: value }),
    [formData.installerDeclaration, onUpdate]
  );

  const updateElectrician = useCallback(
    (field: string, value: unknown) => onUpdate('electricianDeclaration', { ...formData.electricianDeclaration, [field]: value }),
    [formData.electricianDeclaration, onUpdate]
  );

  const updateHandover = useCallback(
    (field: string, value: unknown) => onUpdate('handover', { ...formData.handover, [field]: value }),
    [formData.handover, onUpdate]
  );

  return (
    <div className="space-y-6">
      {/* Defects */}
      <Section title="Defects & Observations" accentColor="from-orange-500/40 to-red-400/20" count={(formData.defects || []).length}>
        {(formData.defects || []).length === 0 && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <p className="text-sm font-medium text-green-400">No defects recorded</p>
          </div>
        )}

        {(formData.defects || []).map((defect: any, idx: number) => (
          <div key={defect.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className={cn(
                'text-xs font-bold',
                defect.severity === 'critical' ? 'text-red-400' : defect.severity === 'recommendation' ? 'text-blue-400' : 'text-orange-400'
              )}>
                Defect {idx + 1}
              </span>
              <button
                onClick={() => removeDefect(defect.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Description">
                <Textarea value={defect.description || ''} onChange={(e) => updateDefect(defect.id, 'description', e.target.value)} placeholder="Describe the defect..." className={textareaCn} />
              </Field>
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Severity">
                  <ComboboxCell value={defect.severity || 'non-critical'} onChange={(v) => updateDefect(defect.id, 'severity', v)} options={severityOptions} className="h-10 text-sm" allowCustom />
                </Field>
                <Field label="Location">
                  <Input value={defect.location || ''} onChange={(e) => updateDefect(defect.id, 'location', e.target.value)} placeholder="Where?" className={inputSmCn} />
                </Field>
              </div>
              <CheckboxCard
                label="Rectified"
                checked={!!defect.rectified}
                onChange={(v) => {
                  updateDefect(defect.id, 'rectified', v);
                  if (v) updateDefect(defect.id, 'rectificationDate', new Date().toISOString().split('T')[0]);
                }}
                accentColor="green"
              />
              {defect.rectified && (
                <Field label="Rectification Date">
                  <Input type="date" value={defect.rectificationDate || ''} onChange={(e) => updateDefect(defect.id, 'rectificationDate', e.target.value)} className={cn(inputSmCn, '[color-scheme:dark]')} />
                </Field>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addDefect}
          className="w-full h-12 rounded-xl border-2 border-dashed border-orange-500/20 flex items-center justify-center gap-2 text-sm font-medium text-orange-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Defect
        </button>
      </Section>

      {/* Handover Documentation */}
      <Section title="Handover Documentation" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[10px] text-white"><strong className="text-white">MCS Required:</strong> All items must be provided to the customer</p>
        </div>
        <div className="space-y-2">
          {[
            { field: 'userManualProvided', label: 'User Manual Provided' },
            { field: 'warrantyDocsProvided', label: 'Warranty Documents Provided' },
            { field: 'mcsDocumentProvided', label: 'MCS Certificate Provided' },
            { field: 'maintenanceScheduleProvided', label: 'Maintenance Schedule Provided' },
            { field: 'emergencyShutdownExplained', label: 'Emergency Shutdown Explained' },
            { field: 'systemDesignProvided', label: 'System Design Documents' },
            { field: 'g98g99ConfirmationProvided', label: 'G98/G99 Confirmation' },
            { field: 'performanceEstimateProvided', label: 'Performance Estimate' },
            { field: 'dnoNotificationCopyProvided', label: 'DNO Notification Copy' },
          ].map((item) => (
            <CheckboxCard
              key={item.field}
              label={item.label}
              checked={!!(formData.handover as any)?.[item.field]}
              onChange={(v) => updateHandover(item.field, v)}
              accentColor="green"
            />
          ))}
        </div>
      </Section>

      {/* Installer Declaration */}
      <Section title="Installer Declaration" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-xs text-white">
            I certify that this Solar PV system has been designed, installed and commissioned in accordance with BS 7671, BS EN 62446, and MCS MIS-3002.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Installer Name *">
            <Input value={formData.installerDeclaration?.installerName || ''} onChange={(e) => updateInstaller('installerName', e.target.value)} placeholder="Full name" className={inputCn} />
          </Field>
          <Field label="Company">
            <Input value={formData.installerDeclaration?.installerCompany || ''} onChange={(e) => updateInstaller('installerCompany', e.target.value)} placeholder="Company name" className={inputCn} />
          </Field>
          <Field label="MCS Number *">
            <Input value={formData.installerDeclaration?.installerMcsNumber || ''} onChange={(e) => updateInstaller('installerMcsNumber', e.target.value)} placeholder="e.g., NAP-12345" className={inputCn} />
          </Field>
          <Field label="Phone">
            <Input value={formData.installerDeclaration?.installerPhone || ''} onChange={(e) => updateInstaller('installerPhone', e.target.value)} placeholder="Contact number" className={inputCn} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email">
              <Input type="email" value={formData.installerDeclaration?.installerEmail || ''} onChange={(e) => updateInstaller('installerEmail', e.target.value)} placeholder="email@company.com" className={inputCn} />
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SignatureInput
            label="Installer Signature *"
            value={formData.installerDeclaration?.installerSignature || ''}
            onChange={(sig) => updateInstaller('installerSignature', sig || '')}
          />
          <Field label="Date *">
            <Input type="date" value={formData.installerDeclaration?.installerDate || ''} onChange={(e) => updateInstaller('installerDate', e.target.value)} className={inputCn} />
          </Field>
        </div>
      </Section>

      {/* Electrician Declaration */}
      <Section title="Electrician Declaration" accentColor="from-blue-500/40 to-cyan-400/20">
        <CheckboxCard
          label="AC Electrical Work by Different Person"
          description="If a separate electrician carried out the AC installation"
          checked={!!formData.electricianDeclaration?.required}
          onChange={(v) => updateElectrician('required', v)}
          accentColor="blue"
        />

        {formData.electricianDeclaration?.required && (
          <>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-xs text-white">
                I certify the AC electrical installation has been designed, installed and tested in accordance with BS 7671.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Electrician Name">
                <Input value={formData.electricianDeclaration?.electricianName || ''} onChange={(e) => updateElectrician('electricianName', e.target.value)} placeholder="Full name" className={inputCn} />
              </Field>
              <Field label="Company">
                <Input value={formData.electricianDeclaration?.electricianCompany || ''} onChange={(e) => updateElectrician('electricianCompany', e.target.value)} placeholder="Company name" className={inputCn} />
              </Field>
              <Field label="Registration Number">
                <Input value={formData.electricianDeclaration?.electricianRegistration || ''} onChange={(e) => updateElectrician('electricianRegistration', e.target.value)} placeholder="e.g., NICEIC number" className={inputCn} />
              </Field>
              <Field label="Scheme">
                <ComboboxCell
                  value={formData.electricianDeclaration?.electricianScheme || ''}
                  onChange={(v) => updateElectrician('electricianScheme', v)}
                  options={COMPETENCE_SCHEMES.map((s) => ({ value: s.value, label: s.label }))}
                  placeholder="Select scheme..."
                  className="h-12 text-base"
                  allowCustom
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SignatureInput
                label="Electrician Signature"
                value={formData.electricianDeclaration?.electricianSignature || ''}
                onChange={(sig) => updateElectrician('electricianSignature', sig || '')}
              />
              <Field label="Date">
                <Input type="date" value={formData.electricianDeclaration?.electricianDate || ''} onChange={(e) => updateElectrician('electricianDate', e.target.value)} className={inputCn} />
              </Field>
            </div>
          </>
        )}
      </Section>

      {/* Customer / Responsible Person */}
      <Section title="Customer / Responsible Person" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Customer Name *">
            <Input value={(formData as any).customerName || ''} onChange={(e) => onUpdate('customerName', e.target.value)} placeholder="Full name" className={inputCn} />
          </Field>
          <Field label="Position">
            <Input value={(formData as any).customerPosition || ''} onChange={(e) => onUpdate('customerPosition', e.target.value)} placeholder="e.g., Homeowner" className={inputCn} />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SignatureInput
            label="Customer Signature *"
            value={(formData as any).customerSignature || ''}
            onChange={(sig) => onUpdate('customerSignature', sig || '')}
          />
          <Field label="Date *">
            <Input type="date" value={(formData as any).customerDate || ''} onChange={(e) => onUpdate('customerDate', e.target.value)} className={inputCn} />
          </Field>
        </div>
      </Section>

      {/* Overall Assessment */}
      <Section title="Overall Assessment" accentColor="from-amber-500/40 to-yellow-400/20">
        {/* Block satisfactory if critical defects not rectified */}
        {hasCriticalDefects && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-300">
              <strong>⚠ Critical defects not rectified</strong> — cannot mark as Satisfactory until all C1 defects are resolved.
            </p>
          </div>
        )}

        {/* Signature warnings */}
        {!formData.installerDeclaration?.installerSignature && (
          <div className="p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
            <p className="text-[10px] text-yellow-200/80">⚡ Installer signature required before completion</p>
          </div>
        )}
        {!(formData as any).customerSignature && (
          <div className="p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
            <p className="text-[10px] text-yellow-200/80">⚡ Customer signature required before completion</p>
          </div>
        )}

        <Field label="Assessment Result *">
          <div className="flex gap-2">
            {[
              { val: true, label: 'Satisfactory', color: 'green' },
              { val: false, label: 'Unsatisfactory', color: 'red' },
            ].map((opt) => (
              <button
                key={String(opt.val)}
                type="button"
                onClick={() => {
                  if (opt.val === true && hasCriticalDefects) {
                    toast.error('Cannot mark as Satisfactory — critical defects not rectified');
                    return;
                  }
                  onUpdate('overallSatisfactory', opt.val);
                }}
                className={cn(
                  'flex-1 h-14 rounded-xl border text-sm font-bold touch-manipulation active:scale-[0.98] transition-all',
                  formData.overallSatisfactory === opt.val
                    ? opt.color === 'green'
                      ? 'bg-green-500/15 border-green-500/30 text-green-400'
                      : 'bg-red-500/15 border-red-500/30 text-red-400'
                    : 'bg-white/[0.03] border-white/[0.06] text-white/50',
                  opt.val === true && hasCriticalDefects && 'opacity-40 cursor-not-allowed'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Next Service / Inspection Due">
          <Input type="date" value={(formData as any).nextServiceDue || autoNextService} onChange={(e) => onUpdate('nextServiceDue', e.target.value)} className={inputCn} />
        </Field>
      </Section>

      {/* Photos — same pattern as EICR, uploads to Supabase Storage */}
      <Section title="Installation Photos" accentColor="from-cyan-500/40 to-blue-400/20">
        <InspectionPhotoUpload
          onPhotoCapture={async (file) => { await uploadPhoto(file); }}
          isUploading={isUploading}
        />
        {uploadedPhotos.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-white">{uploadedPhotos.length} photo{uploadedPhotos.length !== 1 ? 's' : ''} uploaded</p>
            <div className="grid grid-cols-3 gap-2">
              {uploadedPhotos.map((photo) => (
                <div key={photo.id} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo.url || photo.thumbnailUrl} alt="Photo" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center touch-manipulation active:scale-90"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {uploadedPhotos.length === 0 && !isUploading && (
          <div className="rounded-xl bg-white/[0.02] border border-dashed border-white/[0.08] p-6 text-center">
            <p className="text-xs text-white">No photos yet</p>
            <p className="text-[10px] text-white/30 mt-0.5">Take a photo or upload from gallery</p>
          </div>
        )}
      </Section>

      {/* Additional Notes */}
      <Section title="Additional Notes" accentColor="from-white/20 to-white/5">
        <Field label="Notes">
          <Textarea
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            placeholder="Any additional notes, special conditions, or comments..."
            className={textareaCn}
          />
        </Field>
      </Section>
    </div>
  );
};

export default SolarPVDeclarations;
