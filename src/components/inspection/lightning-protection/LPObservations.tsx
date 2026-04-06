import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { Observation } from '@/types/lightning-protection';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-yellow-500 to-amber-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}</Label>{children}</div>
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
      <Section title="Observations & Defects" accentColor="from-amber-500/40 to-yellow-400/20">
        {observations.map((obs) => (
          <div key={obs.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-elec-yellow">{obs.reference}</span>
                {obs.severity && <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', severityColors[obs.severity])}>{obs.severity}</span>}
              </div>
              <button onClick={() => removeObservation(obs.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={obs.location} onChange={(e) => updateObservation(obs.id, 'location', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Location" />
              <Select value={obs.severity} onValueChange={(v) => updateObservation(obs.id, 'severity', v)}>
                <SelectTrigger className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"><SelectValue placeholder="Severity" /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="C1">C1 — Danger (immediate action)</SelectItem>
                  <SelectItem value="C2">C2 — Potentially dangerous (urgent)</SelectItem>
                  <SelectItem value="C3">C3 — Improvement recommended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea value={obs.description} onChange={(e) => updateObservation(obs.id, 'description', e.target.value)} className="text-sm touch-manipulation min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500" placeholder="Description..." />
            <Input value={obs.recommendedAction} onChange={(e) => updateObservation(obs.id, 'recommendedAction', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Recommended action" />
          </div>
        ))}
        <button onClick={addObservation} className="w-full h-12 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Observation
        </button>
      </Section>

      {/* Risk Assessment */}
      <Section title="Risk Assessment" accentColor="from-red-500/40 to-orange-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Risk Assessment Ref"><Input value={formData.riskAssessmentRef} onChange={(e) => onUpdate('riskAssessmentRef', e.target.value)} className={inputCn} /></Field>
          <Field label="Risk Assessment Date"><Input type="date" value={formData.riskAssessmentDate} onChange={(e) => onUpdate('riskAssessmentDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Required LPS Class (from RA)">
            <Select value={formData.requiredLPSClass} onValueChange={(v) => onUpdate('requiredLPSClass', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}><SelectItem value="I">Class I</SelectItem><SelectItem value="II">Class II</SelectItem><SelectItem value="III">Class III</SelectItem><SelectItem value="IV">Class IV</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Actual LPS Class Installed">
            <Select value={formData.actualLPSClass} onValueChange={(v) => onUpdate('actualLPSClass', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}><SelectItem value="I">Class I</SelectItem><SelectItem value="II">Class II</SelectItem><SelectItem value="III">Class III</SelectItem><SelectItem value="IV">Class IV</SelectItem></SelectContent>
            </Select>
          </Field>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.riskAssessmentCompliant} onCheckedChange={(v) => onUpdate('riskAssessmentCompliant', v)} className={checkboxCn} />
          <Label className="text-sm text-white">LPS class meets risk assessment requirements</Label>
        </div>
      </Section>

      {/* Overall Result */}
      <Section title="Overall Result" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="flex flex-col gap-2">
          {[
            { value: 'satisfactory', label: 'Satisfactory', color: 'bg-green-500 text-white' },
            { value: 'satisfactory-with-observations', label: 'Satisfactory with observations', color: 'bg-amber-500 text-black' },
            { value: 'unsatisfactory', label: 'Unsatisfactory', color: 'bg-red-500 text-white' },
          ].map(({ value, label, color }) => (
            <button key={value} type="button" onClick={() => onUpdate('overallResult', value)}
              className={cn('w-full h-12 rounded-xl text-sm font-semibold touch-manipulation transition-all active:scale-[0.98]', formData.overallResult === value ? color : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
              {label}
            </button>
          ))}
        </div>
      </Section>

      {/* Declaration & Signatures */}
      <Section title="Declaration & Signatures" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
          <p className="text-xs text-white leading-relaxed">I hereby certify that the lightning protection system at the above premises has been inspected and tested in accordance with BS EN 62305-3. The results and observations are recorded in this certificate.</p>
        </div>

        <SignatureInput label="Inspector Signature *" value={formData.inspectorSignature} onChange={(sig) => onUpdate('inspectorSignature', sig || '')} />
        <Field label="Inspector Date"><Input type="date" value={formData.inspectorDate} onChange={(e) => onUpdate('inspectorDate', e.target.value)} className={inputCn} /></Field>

        {formData.reviewerName && (
          <>
            <SignatureInput label="Reviewer Signature" value={formData.reviewerSignature} onChange={(sig) => onUpdate('reviewerSignature', sig || '')} />
            <Field label="Reviewer Date"><Input type="date" value={formData.reviewerDate} onChange={(e) => onUpdate('reviewerDate', e.target.value)} className={inputCn} /></Field>
          </>
        )}

        <SignatureInput label="Client Acknowledgement" value={formData.clientSignature} onChange={(sig) => onUpdate('clientSignature', sig || '')} />
        {formData.clientSignature && <Field label="Client Date"><Input type="date" value={formData.clientDate} onChange={(e) => onUpdate('clientDate', e.target.value)} className={inputCn} /></Field>}
      </Section>

      {/* Photos */}
      <Section title="Photos" accentColor="from-cyan-500/40 to-blue-400/20">
        <input ref={photoInputRef} type="file" accept="image/*" capture="environment" multiple className="hidden" onChange={handlePhotoCapture} />
        <button onClick={() => photoInputRef.current?.click()} className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98]"><Camera className="h-4 w-4" /> Add Photos</button>
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
      </Section>

      {/* Notes */}
      <Section title="Additional Notes" accentColor="from-white/20 to-white/5">
        <Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
      </Section>
    </div>
  );
}
