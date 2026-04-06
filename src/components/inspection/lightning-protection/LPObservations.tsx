import { useState, useRef } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, AlertTriangle, FileCheck, Camera, X, ChevronUp, ChevronDown, MessageSquare, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { Observation } from '@/types/lightning-protection';

const inputCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const dateCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const textareaCn = 'text-base touch-manipulation min-h-[80px] border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const selectTriggerCn = 'h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

interface SH { title: string; icon: React.ReactNode; isOpen: boolean; color: string; subtitle?: string }
const SectionHeader = ({ title, icon, isOpen, color, subtitle }: SH) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-11 rounded-xl flex items-center justify-center bg-${color}/15`}>{icon}</div>
      <div className="text-left"><h3 className="text-base font-semibold text-foreground">{title}</h3>{subtitle && <span className="text-xs text-white">{subtitle}</span>}</div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPObservations({ formData, onUpdate }: Props) {
  const [obsOpen, setObsOpen] = useState(true);
  const [riskOpen, setRiskOpen] = useState(true);
  const [resultOpen, setResultOpen] = useState(true);
  const [declOpen, setDeclOpen] = useState(true);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
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
    <div className="space-y-3">
      {/* Observations */}
      <div className="eicr-section-card">
        <Collapsible open={obsOpen} onOpenChange={setObsOpen}>
          <SectionHeader title="Observations & Defects" icon={<AlertTriangle className="h-5 w-5 text-amber-400" />} isOpen={obsOpen} color="amber-500" subtitle="C1/C2/C3 severity coding" />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
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
                    <Input value={obs.location} onChange={(e) => updateObservation(obs.id, 'location', e.target.value)} className="h-9 text-sm touch-manipulation border-white/30 focus:border-yellow-500" placeholder="Location" />
                    <Select value={obs.severity} onValueChange={(v) => updateObservation(obs.id, 'severity', v)}>
                      <SelectTrigger className="h-9 text-sm touch-manipulation bg-elec-gray border-white/30"><SelectValue placeholder="Severity" /></SelectTrigger>
                      <SelectContent className={selectContentCn}>
                        <SelectItem value="C1">C1 — Danger (immediate action)</SelectItem>
                        <SelectItem value="C2">C2 — Potentially dangerous (urgent)</SelectItem>
                        <SelectItem value="C3">C3 — Improvement recommended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea value={obs.description} onChange={(e) => updateObservation(obs.id, 'description', e.target.value)} className="text-sm touch-manipulation min-h-[60px] border-white/30 focus:border-yellow-500" placeholder="Description..." />
                  <Input value={obs.recommendedAction} onChange={(e) => updateObservation(obs.id, 'recommendedAction', e.target.value)} className="h-9 text-sm touch-manipulation border-white/30 focus:border-yellow-500" placeholder="Recommended action" />
                </div>
              ))}
              <button onClick={addObservation} className="w-full h-11 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]">
                <Plus className="h-4 w-4" /> Add Observation
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Risk Assessment Reference */}
      <div className="eicr-section-card">
        <Collapsible open={riskOpen} onOpenChange={setRiskOpen}>
          <SectionHeader title="Risk Assessment" icon={<Shield className="h-5 w-5 text-red-400" />} isOpen={riskOpen} color="red-500" subtitle="BS EN 62305-2" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Risk Assessment Ref</Label><Input value={formData.riskAssessmentRef} onChange={(e) => onUpdate('riskAssessmentRef', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Risk Assessment Date</Label><Input type="date" value={formData.riskAssessmentDate} onChange={(e) => onUpdate('riskAssessmentDate', e.target.value)} className={dateCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Required LPS Class (from RA)</Label>
                  <Select value={formData.requiredLPSClass} onValueChange={(v) => onUpdate('requiredLPSClass', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="I">Class I</SelectItem><SelectItem value="II">Class II</SelectItem>
                      <SelectItem value="III">Class III</SelectItem><SelectItem value="IV">Class IV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Actual LPS Class Installed</Label>
                  <Select value={formData.actualLPSClass} onValueChange={(v) => onUpdate('actualLPSClass', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="I">Class I</SelectItem><SelectItem value="II">Class II</SelectItem>
                      <SelectItem value="III">Class III</SelectItem><SelectItem value="IV">Class IV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.riskAssessmentCompliant} onCheckedChange={(v) => onUpdate('riskAssessmentCompliant', v)} className={checkboxCn} />
                <Label className="text-sm text-white">LPS class meets risk assessment requirements</Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Overall Result */}
      <div className="eicr-section-card">
        <Collapsible open={resultOpen} onOpenChange={setResultOpen}>
          <SectionHeader title="Overall Result" icon={<FileCheck className="h-5 w-5 text-green-400" />} isOpen={resultOpen} color="green-500" />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Declaration & Signatures */}
      <div className="eicr-section-card">
        <Collapsible open={declOpen} onOpenChange={setDeclOpen}>
          <SectionHeader title="Declaration & Signatures" icon={<FileCheck className="h-5 w-5 text-elec-yellow" />} isOpen={declOpen} color="elec-yellow" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <p className="text-xs text-white leading-relaxed">I hereby certify that the lightning protection system at the above premises has been inspected and tested in accordance with BS EN 62305-3. The results and observations are recorded in this certificate.</p>
              </div>

              <SignatureInput label="Inspector Signature *" value={formData.inspectorSignature} onChange={(sig) => onUpdate('inspectorSignature', sig || '')} />
              <div className="space-y-2"><Label className="text-xs text-white">Inspector Date</Label><Input type="date" value={formData.inspectorDate} onChange={(e) => onUpdate('inspectorDate', e.target.value)} className={dateCn} /></div>

              {formData.reviewerName && (
                <>
                  <SignatureInput label="Reviewer Signature" value={formData.reviewerSignature} onChange={(sig) => onUpdate('reviewerSignature', sig || '')} />
                  <div className="space-y-2"><Label className="text-xs text-white">Reviewer Date</Label><Input type="date" value={formData.reviewerDate} onChange={(e) => onUpdate('reviewerDate', e.target.value)} className={dateCn} /></div>
                </>
              )}

              <SignatureInput label="Client Acknowledgement" value={formData.clientSignature} onChange={(sig) => onUpdate('clientSignature', sig || '')} />
              <div className="space-y-2"><Label className="text-xs text-white">Client Date</Label><Input type="date" value={formData.clientDate} onChange={(e) => onUpdate('clientDate', e.target.value)} className={dateCn} /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Photos */}
      <div className="eicr-section-card">
        <Collapsible open={photosOpen} onOpenChange={setPhotosOpen}>
          <SectionHeader title="Photos" icon={<Camera className="h-5 w-5 text-cyan-400" />} isOpen={photosOpen} color="cyan-500" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Notes */}
      <div className="eicr-section-card">
        <Collapsible open={notesOpen} onOpenChange={setNotesOpen}>
          <SectionHeader title="Additional Notes" icon={<MessageSquare className="h-5 w-5 text-white" />} isOpen={notesOpen} color="white" />
          <CollapsibleContent>
            <div className="p-4"><Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes..." /></div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
