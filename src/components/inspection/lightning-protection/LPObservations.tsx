import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { Observation } from '@/types/lightning-protection';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[12px] font-semibold text-white shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.08]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className={labelCn}>{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPObservations({ formData, onUpdate }: Props) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const obsPhotoInputRef = useRef<HTMLInputElement>(null);
  const [obsPhotoTargetId, setObsPhotoTargetId] = useState<string | null>(null);

  const observations: Observation[] = formData.observations || [];
  const addObservation = () => onUpdate('observations', [...observations, { id: crypto.randomUUID(), reference: `OBS${observations.length + 1}`, location: '', description: '', severity: '', recommendedAction: '', photo: '', completionDate: '' }]);
  const removeObservation = (id: string) => onUpdate('observations', observations.filter((o) => o.id !== id));
  const updateObservation = (id: string, field: string, value: any) => onUpdate('observations', observations.map((o) => o.id === id ? { ...o, [field]: value } : o));

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return; e.target.value = '';
    for (const file of Array.from(files)) { const reader = new FileReader(); reader.onload = () => { onUpdate('photos', [...(formData.photos || []), reader.result as string]); }; reader.readAsDataURL(file); }
  };

  const handleObsPhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files || !obsPhotoTargetId) return; e.target.value = '';
    const reader = new FileReader();
    reader.onload = () => { updateObservation(obsPhotoTargetId, 'photo', reader.result as string); setObsPhotoTargetId(null); };
    reader.readAsDataURL(files[0]);
  };

  const severityColors: Record<string, string> = { C1: 'bg-red-500 text-white', C2: 'bg-amber-500 text-black', C3: 'bg-blue-500 text-white' };

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Observations */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Observations & defects" />
        <input ref={obsPhotoInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleObsPhotoCapture} />
        <div>
          {observations.map((obs, idx) => (
            <div key={obs.id} className={cn('space-y-3', idx > 0 && 'border-t border-white/[0.08] mt-4 pt-4')}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-elec-yellow">{obs.reference}</span>
                  {obs.severity && <span className={cn('rounded px-2 py-0.5 text-[11px] font-bold', severityColors[obs.severity])}>{obs.severity}</span>}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setObsPhotoTargetId(obs.id); obsPhotoInputRef.current?.click(); }}
                    className={cn('h-11 shrink-0 px-2 text-[13px] font-medium touch-manipulation active:scale-[0.97]', obs.photo ? 'text-elec-yellow' : 'text-white/85')}
                  >
                    {obs.photo ? 'Photo added' : 'Photo'}
                  </button>
                  <button onClick={() => removeObservation(obs.id)} className="h-11 shrink-0 px-2 text-[13px] font-medium text-red-400 touch-manipulation active:scale-[0.97]">Remove</button>
                </div>
              </div>
              {obs.photo && (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                  <img src={obs.photo} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => updateObservation(obs.id, 'photo', '')} className="absolute top-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white touch-manipulation">Remove</button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
              <Field label="Completion date"><Input type="date" value={obs.completionDate} onChange={(e) => updateObservation(obs.id, 'completionDate', e.target.value)} className={inputCn} /></Field>
            </div>
          ))}
        </div>
        <button onClick={addObservation} className="w-full h-11 rounded-xl border border-dashed border-white/[0.25] text-sm font-medium text-elec-yellow touch-manipulation active:scale-[0.98] transition-all">
          Add observation
        </button>
      </div>

      {/* Risk Assessment */}
      <div className={cardCn}>
        <SectionHeader title="Risk assessment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Risk assessment ref"><Input value={formData.riskAssessmentRef} onChange={(e) => onUpdate('riskAssessmentRef', e.target.value)} className={inputCn} /></Field>
          <Field label="Risk assessment date"><Input type="date" value={formData.riskAssessmentDate} onChange={(e) => onUpdate('riskAssessmentDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Required LPS class (from RA)">
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
          <Field label="Actual LPS class installed">
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
        <div className="flex min-h-11 items-center justify-between gap-3">
          <Label className="text-[13px] font-medium text-white">LPS class meets risk assessment requirements</Label>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('riskAssessmentCompliant', v)}
                className={cn('h-11 w-16 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
                  formData.riskAssessmentCompliant === v
                    ? (v ? 'bg-green-500 border border-green-500 text-black font-semibold' : 'bg-red-500 border border-red-500 text-white font-semibold')
                    : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Result */}
      <div className={cardCn}>
        <SectionHeader title="Overall result" />
        <div className="flex flex-col gap-2">
          {[
            { value: 'satisfactory', label: 'Satisfactory', color: 'bg-green-500 border border-green-500 text-black' },
            { value: 'satisfactory-with-observations', label: 'Satisfactory with observations', color: 'bg-amber-500 border border-amber-500 text-black' },
            { value: 'unsatisfactory', label: 'Unsatisfactory', color: 'bg-red-500 border border-red-500 text-white' },
          ].map(({ value, label, color }) => (
            <button key={value} type="button" onClick={() => onUpdate('overallResult', value)}
              className={cn('w-full h-11 rounded-xl text-sm font-semibold touch-manipulation transition-all active:scale-[0.98]', formData.overallResult === value ? color : 'bg-white/[0.06] text-white border border-white/[0.12]')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Declaration & Signatures */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Declaration & signatures" />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-[13px] text-white leading-relaxed">I hereby certify that the lightning protection system at the above premises has been inspected and tested in accordance with BS EN 62305-3. The results and observations are recorded in this certificate.</p>
        </div>

        <Sub title="Inspector" />
        <SignatureInput label="Inspector Signature *" value={formData.inspectorSignature} onChange={(sig) => onUpdate('inspectorSignature', sig || '')} />
        <Field label="Inspector date"><Input type="date" value={formData.inspectorDate} onChange={(e) => onUpdate('inspectorDate', e.target.value)} className={inputCn} /></Field>

        {formData.reviewerName && (
          <>
            <Sub title="Reviewer" />
            <SignatureInput label="Reviewer Signature" value={formData.reviewerSignature} onChange={(sig) => onUpdate('reviewerSignature', sig || '')} />
            <Field label="Reviewer date"><Input type="date" value={formData.reviewerDate} onChange={(e) => onUpdate('reviewerDate', e.target.value)} className={inputCn} /></Field>
          </>
        )}

        <Sub title="Client acknowledgement" />
        <SignatureInput label="Client Acknowledgement" value={formData.clientSignature} onChange={(sig) => onUpdate('clientSignature', sig || '')} />
        {formData.clientSignature && <Field label="Client date"><Input type="date" value={formData.clientDate} onChange={(e) => onUpdate('clientDate', e.target.value)} className={inputCn} /></Field>}
      </div>

      {/* Photos */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Photos" />
        <input ref={photoInputRef} type="file" accept="image/*" capture="environment" multiple className="hidden" onChange={handlePhotoCapture} />
        <button onClick={() => photoInputRef.current?.click()} className="w-full h-11 rounded-xl border border-dashed border-white/[0.25] text-sm font-medium text-white touch-manipulation active:scale-[0.98] transition-all">Add photos</button>
        {formData.photos?.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {formData.photos.map((photo: string, i: number) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button onClick={() => onUpdate('photos', formData.photos.filter((_: any, j: number) => j !== i))} className="absolute top-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white touch-manipulation">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Additional notes" />
        <Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
      </div>
    </div>
  );
}
