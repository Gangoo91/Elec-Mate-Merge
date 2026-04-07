/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G3 Commissioning — Tab 4: Handover & Documentation
 * Handover checklist, defects
 */

import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const inputSmCn =
  'h-10 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({
  title,
  accentColor,
  count,
  children,
}: {
  title: string;
  accentColor?: string;
  count?: number;
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
      <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
        {title}
        {count !== undefined && (
          <span className="text-[10px] font-bold text-white bg-white/[0.1] px-2 py-0.5 rounded">
            {count}
          </span>
        )}
      </h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG3Handover({ formData, onUpdate }: Props) {
  const defects: any[] = formData.defectsFound || [];
  const haptic = useHaptic();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    e.target.value = '';
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdate('photos', [...(formData.photos || []), reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDefect = () => {
    haptic.light();
    onUpdate('defectsFound', [
      ...defects,
      {
        id: crypto.randomUUID(),
        description: '',
        severity: 'non-critical',
        rectified: false,
        rectificationDate: '',
      },
    ]);
  };
  const removeDefect = (id: string) => {
    haptic.medium();
    onUpdate(
      'defectsFound',
      defects.filter((d: any) => d.id !== id)
    );
  };
  const updateDefect = (id: string, field: string, value: any) =>
    onUpdate(
      'defectsFound',
      defects.map((d: any) => (d.id === id ? { ...d, [field]: value } : d))
    );

  return (
    <div className="space-y-5">
      {/* Handover Date */}
      <Section title="Handover" accentColor="from-green-500/40 to-emerald-400/20">
        <Field label="Handover Date">
          <Input
            type="date"
            value={formData.handoverDate || ''}
            onChange={(e) => onUpdate('handoverDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>

      {/* Documentation Checklist */}
      <Section title="Documentation Checklist" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="space-y-2">
          {[
            { field: 'handoverAsBuiltDrawings', label: 'As-built drawings provided' },
            { field: 'handoverOperatingInstructions', label: 'Operating instructions provided' },
            { field: 'handoverLogBook', label: 'Log book provided' },
            { field: 'handoverSpares', label: 'Spares provided (keys, fuses, glasses)' },
            { field: 'handoverTraining', label: 'Training provided to responsible person' },
            { field: 'handoverZoneChart', label: 'Zone chart mounted at panel' },
            { field: 'handoverCauseEffect', label: 'Cause & effect matrix provided' },
            { field: 'handoverOperationManual', label: 'Operation & maintenance manual' },
          ].map(({ field, label }) => (
            <button
              key={field}
              type="button"
              onClick={() => onUpdate(field, !formData[field])}
              className={cn(
                'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
                formData[field]
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/[0.03] border-white/[0.06]'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  formData[field] ? 'bg-green-500 border-green-500' : 'border-white/30'
                )}
              >
                {formData[field] && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  formData[field] ? 'text-green-400' : 'text-white'
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* Defects */}
      <Section
        title="Defects & Observations"
        accentColor="from-red-500/40 to-rose-400/20"
        count={defects.length}
      >
        {defects.length === 0 && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <p className="text-sm font-medium text-green-400">No defects found</p>
          </div>
        )}
        {defects.map((d: any, idx: number) => (
          <div key={d.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-red-400">
                Defect {idx + 1} of {defects.length}
              </span>
              <button
                onClick={() => removeDefect(d.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Description">
                <Textarea
                  value={d.description || ''}
                  onChange={(e) => updateDefect(d.id, 'description', e.target.value)}
                  className="touch-manipulation text-base min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500"
                />
              </Field>
              <Field label="Severity">
                <ComboboxCell
                  value={d.severity || 'non-critical'}
                  onChange={(v) => updateDefect(d.id, 'severity', v)}
                  options={[
                    { value: 'critical', label: 'Critical' },
                    { value: 'non-critical', label: 'Non-critical' },
                    { value: 'recommendation', label: 'Recommendation' },
                  ]}
                  placeholder="Select..."
                  className="h-12 text-base"
                  allowCustom={false}
                />
              </Field>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => updateDefect(d.id, 'rectified', !d.rectified)}
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                    d.rectified ? 'bg-green-500 border-green-500' : 'border-white/30'
                  )}
                >
                  {d.rectified && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span
                  className={cn(
                    'text-sm',
                    d.rectified ? 'text-green-400 font-medium' : 'text-white'
                  )}
                >
                  Rectified
                </span>
              </div>
              {d.rectified && (
                <Field label="Rectification Date">
                  <Input
                    type="date"
                    value={d.rectificationDate || ''}
                    onChange={(e) => updateDefect(d.id, 'rectificationDate', e.target.value)}
                    className={cn(inputSmCn, '[color-scheme:dark]')}
                  />
                </Field>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={addDefect}
          className="w-full h-12 rounded-xl border-2 border-dashed border-red-500/20 flex items-center justify-center gap-2 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Defect
        </button>
      </Section>
      {/* Photos */}
      <Section title="Commissioning Photos" accentColor="from-cyan-500/40 to-blue-400/20">
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handlePhotoCapture}
        />
        <label
          onClick={(e) => {
            e.preventDefault();
            photoInputRef.current?.click();
          }}
          className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98] cursor-pointer"
        >
          <Camera className="h-4 w-4" /> Add Photos
        </label>
        {formData.photos?.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {formData.photos.map((photo: string, i: number) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() =>
                    onUpdate(
                      'photos',
                      formData.photos.filter((_: any, j: number) => j !== i)
                    )
                  }
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"
                >
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
