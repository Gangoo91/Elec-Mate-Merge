/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification — Tab 3: Testing
 * Reduced scope — only modified parts + system integration verification
 */

import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

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

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

// Test result row — pass/fail/na
const TestResultRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
    <span className="text-sm text-white font-medium flex-1">{label}</span>
    <div className="flex gap-1.5">
      {[
        {
          val: 'pass',
          label: 'Pass',
          active: 'bg-green-500 border-green-500 text-white',
          inactive: 'border-green-500/30 text-green-400',
        },
        {
          val: 'fail',
          label: 'Fail',
          active: 'bg-red-500 border-red-500 text-white',
          inactive: 'border-red-500/30 text-red-400',
        },
        {
          val: 'na',
          label: 'N/A',
          active: 'bg-white/20 border-white/30 text-white',
          inactive: 'border-white/20 text-white',
        },
      ].map((opt) => (
        <button
          key={opt.val}
          type="button"
          onClick={() => onChange(opt.val)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-bold border touch-manipulation active:scale-95 transition-all min-w-[44px]',
            value === opt.val ? opt.active : opt.inactive + ' bg-transparent'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const inputSmCn =
  'h-10 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

export default function FAG7Testing({ formData, onUpdate }: Props) {
  const haptic = useHaptic();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const defects: any[] = formData.modificationDefects || [];

  const addDefect = () => {
    haptic.light();
    onUpdate('modificationDefects', [
      ...defects,
      { id: crypto.randomUUID(), description: '', severity: 'non-critical', rectified: false },
    ]);
  };
  const removeDefect = (id: string) => {
    haptic.medium();
    onUpdate(
      'modificationDefects',
      defects.filter((d: any) => d.id !== id)
    );
  };
  const updateDefect = (id: string, field: string, value: any) =>
    onUpdate(
      'modificationDefects',
      defects.map((d: any) => (d.id === id ? { ...d, [field]: value } : d))
    );

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

  return (
    <div className="space-y-5">
      {/* Test completion summary */}
      {(() => {
        const tests = [
          formData.modifiedDevicesTested,
          formData.modifiedWiringTested,
          formData.interfaceEquipmentVerified,
          formData.soundLevelsChecked,
          formData.existingZonesSampled,
          formData.panelIntegrationVerified,
          formData.causeEffectVerified,
          formData.systemIntegrationTest,
        ];
        const done = tests.filter((t) => t === 'pass' || t === 'fail' || t === 'na').length;
        const total = tests.length;
        if (done === 0)
          return (
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
              <p className="text-sm font-medium text-white">
                Complete all modified section tests before signing
              </p>
              <p className="text-xs text-white mt-1">
                Test the modified parts first, then verify the existing system still works
              </p>
            </div>
          );
        const pct = Math.round((done / total) * 100);
        return (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p
              className={cn(
                'text-2xl font-bold',
                pct >= 100 ? 'text-green-400' : 'text-elec-yellow'
              )}
            >
              {done} of {total}
            </p>
            <p className="text-[10px] text-white uppercase">Tests Complete ({pct}%)</p>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mt-2">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  pct >= 100 ? 'bg-green-500' : 'bg-elec-yellow'
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })()}

      {/* Modified Section Tests */}
      <Section title="Modified Section Testing" accentColor="from-red-500/40 to-rose-400/20">
        <div className="space-y-2">
          <TestResultRow
            label="Modified devices functional test"
            value={formData.modifiedDevicesTested || ''}
            onChange={(v) => onUpdate('modifiedDevicesTested', v)}
          />
          <TestResultRow
            label="Modified wiring tested"
            value={formData.modifiedWiringTested || ''}
            onChange={(v) => onUpdate('modifiedWiringTested', v)}
          />
          <TestResultRow
            label="Interface equipment verified"
            value={formData.interfaceEquipmentVerified || ''}
            onChange={(v) => onUpdate('interfaceEquipmentVerified', v)}
          />
          <TestResultRow
            label="Sound levels checked (if sounders added)"
            value={formData.soundLevelsChecked || ''}
            onChange={(v) => onUpdate('soundLevelsChecked', v)}
          />
        </div>
      </Section>

      {/* Existing System Verification */}
      <Section title="Existing System Verification" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
          <p className="text-xs text-white leading-relaxed">
            Verify that unmodified parts of the system continue to function correctly after the
            modification.
          </p>
        </div>
        <div className="space-y-2">
          <TestResultRow
            label="Unmodified zones sample test"
            value={formData.existingZonesSampled || ''}
            onChange={(v) => onUpdate('existingZonesSampled', v)}
          />
          <TestResultRow
            label="Panel integration verified"
            value={formData.panelIntegrationVerified || ''}
            onChange={(v) => onUpdate('panelIntegrationVerified', v)}
          />
          <TestResultRow
            label="Cause & effect verified (if changed)"
            value={formData.causeEffectVerified || ''}
            onChange={(v) => onUpdate('causeEffectVerified', v)}
          />
          <TestResultRow
            label="Overall system integration test"
            value={formData.systemIntegrationTest || ''}
            onChange={(v) => onUpdate('systemIntegrationTest', v)}
          />
        </div>
      </Section>

      {/* Defects Found */}
      <Section title="Defects Found" accentColor="from-red-500/40 to-rose-400/20">
        {defects.length === 0 && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <p className="text-sm font-medium text-green-400">No defects found</p>
          </div>
        )}
        {defects.map((d: any, idx: number) => (
          <div key={d.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-red-400">Defect {idx + 1}</span>
              <button
                onClick={() => removeDefect(d.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Description">
                <Input
                  value={d.description || ''}
                  onChange={(e) => updateDefect(d.id, 'description', e.target.value)}
                  className={inputSmCn}
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
                  className="h-10 text-sm"
                  allowCustom={false}
                />
              </Field>
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

      {/* Test Notes */}
      <Section title="Test Notes" accentColor="from-amber-500/40 to-yellow-400/20">
        <Field label="Testing Notes">
          <Textarea
            value={formData.testingNotes || ''}
            onChange={(e) => onUpdate('testingNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any observations or issues found during testing..."
          />
        </Field>
      </Section>

      {/* Photos */}
      <Section title="Modification Photos" accentColor="from-cyan-500/40 to-blue-400/20">
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotoCapture}
        />
        <button
          type="button"
          onClick={() => photoInputRef.current?.click()}
          className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98]"
        >
          <Camera className="h-4 w-4" /> Add Photos
        </button>
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
