import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Plus, Trash2, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { Observation } from '@/types/lightning-protection';

const inputCn = '!h-10 !py-1 !text-xs touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-xs min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';
const pickerTrigger = 'h-10 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPObservations({ formData, onUpdate }: Props) {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const observations: Observation[] = formData.observations || [];
  const addObservation = () => onUpdate('observations', [...observations, { id: crypto.randomUUID(), reference: `OBS${observations.length + 1}`, location: '', description: '', severity: '', recommendedAction: '', photo: '', completionDate: '' }]);
  const removeObservation = (id: string) => onUpdate('observations', observations.filter((o) => o.id !== id));
  const updateObservation = (id: string, field: string, value: any) => onUpdate('observations', observations.map((o) => o.id === id ? { ...o, [field]: value } : o));

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return; e.target.value = '';
    for (const file of Array.from(files)) { const reader = new FileReader(); reader.onload = () => { onUpdate('photos', [...(formData.photos || []), reader.result as string]); }; reader.readAsDataURL(file); }
  };

  const severityColors: Record<string, string> = { C1: 'bg-red-500 text-white', C2: 'bg-amber-500 text-black', C3: 'bg-blue-500 text-white' };

  return (
    <div className="space-y-5">
      {/* Observations */}
      <div className="space-y-4">
        <SectionHeader title="Observations & Defects" />
        {observations.map((obs) => (
          <div key={obs.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-elec-yellow">{obs.reference}</span>
                {obs.severity && <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', severityColors[obs.severity])}>{obs.severity}</span>}
              </div>
              <button onClick={() => removeObservation(obs.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={obs.location} onChange={(e) => updateObservation(obs.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
              <MobileSelectPicker
                value={obs.severity}
                onValueChange={(v) => updateObservation(obs.id, 'severity', v)}
                options={[
                  { value: 'C1', label: 'C1 — Danger (immediate action)' },
                  { value: 'C2', label: 'C2 — Potentially dangerous (urgent)' },
                  { value: 'C3', label: 'C3 — Improvement recommended' },
                ]}
                placeholder="Severity"
                triggerClassName={pickerTrigger}
              />
            </div>
            <Textarea value={obs.description} onChange={(e) => updateObservation(obs.id, 'description', e.target.value)} className={textareaCn} placeholder="Description..." />
            <Input value={obs.recommendedAction} onChange={(e) => updateObservation(obs.id, 'recommendedAction', e.target.value)} className={inputCn} placeholder="Recommended action" />
          </div>
        ))}
        <button onClick={addObservation} className="w-full h-11 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-xs font-medium text-amber-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Observation
        </button>
      </div>

      {/* Risk Assessment */}
      <div className="space-y-4">
        <SectionHeader title="Risk Assessment" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Risk Assessment Ref"><Input value={formData.riskAssessmentRef} onChange={(e) => onUpdate('riskAssessmentRef', e.target.value)} className={inputCn} /></Field>
          <Field label="Risk Assessment Date"><Input type="date" value={formData.riskAssessmentDate} onChange={(e) => onUpdate('riskAssessmentDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Required LPS Class (from RA)">
            <MobileSelectPicker
              value={formData.requiredLPSClass}
              onValueChange={(v) => onUpdate('requiredLPSClass', v)}
              options={[
                { value: 'I', label: 'Class I' },
                { value: 'II', label: 'Class II' },
                { value: 'III', label: 'Class III' },
                { value: 'IV', label: 'Class IV' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Actual LPS Class Installed">
            <MobileSelectPicker
              value={formData.actualLPSClass}
              onValueChange={(v) => onUpdate('actualLPSClass', v)}
              options={[
                { value: 'I', label: 'Class I' },
                { value: 'II', label: 'Class II' },
                { value: 'III', label: 'Class III' },
                { value: 'IV', label: 'Class IV' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">LPS class meets risk assessment requirements</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('riskAssessmentCompliant', v)}
                className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                  formData.riskAssessmentCompliant === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Result */}
      <div className="space-y-4">
        <SectionHeader title="Overall Result" />
        <div className="flex flex-col gap-2">
          {[
            { value: 'satisfactory', label: 'Satisfactory', color: 'bg-green-500 text-white' },
            { value: 'satisfactory-with-observations', label: 'Satisfactory with observations', color: 'bg-amber-500 text-black' },
            { value: 'unsatisfactory', label: 'Unsatisfactory', color: 'bg-red-500 text-white' },
          ].map(({ value, label, color }) => (
            <button key={value} type="button" onClick={() => onUpdate('overallResult', value)}
              className={cn('w-full h-11 rounded-xl text-xs font-semibold touch-manipulation transition-all active:scale-[0.98]', formData.overallResult === value ? color : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Declaration & Signatures */}
      <div className="space-y-4">
        <SectionHeader title="Declaration & Signatures" />
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 mb-3">
          <p className="text-[11px] text-white leading-relaxed">I hereby certify that the lightning protection system at the above premises has been inspected and tested in accordance with BS EN 62305-3. The results and observations are recorded in this certificate.</p>
        </div>

        <Sub title="Inspector" />
        <SignatureInput label="Inspector Signature *" value={formData.inspectorSignature} onChange={(sig) => onUpdate('inspectorSignature', sig || '')} />
        <Field label="Inspector Date"><Input type="date" value={formData.inspectorDate} onChange={(e) => onUpdate('inspectorDate', e.target.value)} className={inputCn} /></Field>

        {formData.reviewerName && (
          <>
            <Sub title="Reviewer" />
            <SignatureInput label="Reviewer Signature" value={formData.reviewerSignature} onChange={(sig) => onUpdate('reviewerSignature', sig || '')} />
            <Field label="Reviewer Date"><Input type="date" value={formData.reviewerDate} onChange={(e) => onUpdate('reviewerDate', e.target.value)} className={inputCn} /></Field>
          </>
        )}

        <Sub title="Client Acknowledgement" />
        <SignatureInput label="Client Acknowledgement" value={formData.clientSignature} onChange={(sig) => onUpdate('clientSignature', sig || '')} />
        {formData.clientSignature && <Field label="Client Date"><Input type="date" value={formData.clientDate} onChange={(e) => onUpdate('clientDate', e.target.value)} className={inputCn} /></Field>}
      </div>

      {/* Photos */}
      <div className="space-y-4">
        <SectionHeader title="Photos" />
        <input ref={photoInputRef} type="file" accept="image/*" capture="environment" multiple className="hidden" onChange={handlePhotoCapture} />
        <button onClick={() => photoInputRef.current?.click()} className="w-full h-11 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-xs text-white touch-manipulation active:scale-[0.98]"><Camera className="h-4 w-4" /> Add Photos</button>
        {formData.photos?.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {formData.photos.map((photo: string, i: number) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button onClick={() => onUpdate('photos', formData.photos.filter((_: any, j: number) => j !== i))} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"><X className="h-3.5 w-3.5 text-white" /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-4">
        <SectionHeader title="Additional Notes" />
        <Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
      </div>
    </div>
  );
}
