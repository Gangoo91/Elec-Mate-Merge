/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification — Tab 3: Testing
 * Reduced scope — only modified parts + system integration verification
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
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

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
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
  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3">
    <span className="text-sm text-white font-medium flex-1 min-w-[140px]">{label}</span>
    <div className="flex gap-1.5">
      {[
        { val: 'pass', label: 'Pass', active: 'bg-green-500 border-green-500 text-black' },
        { val: 'fail', label: 'Fail', active: 'bg-red-500 border-red-500 text-white' },
        { val: 'na', label: 'N/A', active: 'bg-white/[0.2] border-white/[0.3] text-white' },
      ].map((opt) => (
        <button
          key={opt.val}
          type="button"
          onClick={() => onChange(opt.val)}
          className={cn(
            'h-11 min-w-[52px] rounded-lg border px-3 text-xs font-semibold touch-manipulation active:scale-95 transition-all',
            value === opt.val ? opt.active : 'bg-white/[0.06] border-white/[0.12] text-white'
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
  /** Saved report id from the page — useParams stays 'new' after the first
   *  save (history.replaceState doesn't re-run routing), which broke uploads. */
  reportId?: string;
}

export default function FAG7Testing({ formData, onUpdate, reportId }: Props) {
  const { id } = useParams<{ id: string }>();
  const { photos: uploadedPhotos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: reportId || id || 'new', reportType: 'fire-alarm-modification', itemId: 'general-photos',
  });
  const haptic = useHaptic();
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


  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Test progress */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Test progress" />
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
              <div className="text-center py-2">
                <p className="text-sm font-medium text-white">
                  Complete all modified section tests before signing
                </p>
                <p className="text-xs text-white/80 mt-1">
                  Test the modified parts first, then verify the existing system still works
                </p>
              </div>
            );
          const pct = Math.round((done / total) * 100);
          return (
            <div className="text-center">
              <p
                className={cn(
                  'text-2xl font-bold',
                  pct >= 100 ? 'text-green-400' : 'text-elec-yellow'
                )}
              >
                {done} of {total}
              </p>
              <p className="text-[12px] text-white/80 mt-0.5">Tests complete ({pct}%)</p>
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
      </div>

      {/* Modified section testing */}
      <div className={cardCn}>
        <SectionHeader title="Modified section testing" />
        <div className="divide-y divide-white/[0.08]">
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
      </div>

      {/* Existing system verification */}
      <div className={cardCn}>
        <SectionHeader title="Existing system verification" />
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-xs text-white/85 leading-relaxed">
            Verify that unmodified parts of the system continue to function correctly after the
            modification.
          </p>
        </div>
        <div className="divide-y divide-white/[0.08]">
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
      </div>

      {/* Defects found */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Defects found" />
        {defects.length === 0 && (
          <div className="rounded-xl bg-white/[0.05] p-4 text-center">
            <p className="text-sm font-medium text-green-400">No defects found</p>
          </div>
        )}
        {defects.map((d: any, idx: number) => (
          <div key={d.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-white">Defect {idx + 1}</p>
              <button
                type="button"
                onClick={() => removeDefect(d.id)}
                className="h-11 px-2 text-sm font-medium text-red-400 touch-manipulation active:scale-95"
              >
                Remove
              </button>
            </div>
            <Field label="Description">
              <Input
                value={d.description || ''}
                onChange={(e) => updateDefect(d.id, 'description', e.target.value)}
                className={inputCn}
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
                className="h-11 text-base"
                allowCustom={false}
              />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <span className="text-sm text-white font-medium flex-1 min-w-[140px]">
                Rectified on site
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => updateDefect(d.id, 'rectified', true)}
                  className={cn(
                    'h-11 min-w-[52px] rounded-lg border px-3 text-xs font-semibold touch-manipulation active:scale-95 transition-all',
                    d.rectified === true
                      ? 'bg-green-500 border-green-500 text-black'
                      : 'bg-white/[0.06] border-white/[0.12] text-white'
                  )}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateDefect(d.id, 'rectified', false)}
                  className={cn(
                    'h-11 min-w-[52px] rounded-lg border px-3 text-xs font-semibold touch-manipulation active:scale-95 transition-all',
                    d.rectified === true
                      ? 'bg-white/[0.06] border-white/[0.12] text-white'
                      : 'bg-white/[0.2] border-white/[0.3] text-white'
                  )}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addDefect}
          className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] text-sm font-medium text-white touch-manipulation active:scale-[0.98] transition-transform"
        >
          Add defect
        </button>
      </div>

      {/* Test notes */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Test notes" />
        <Field label="Testing notes">
          <Textarea
            value={formData.testingNotes || ''}
            onChange={(e) => onUpdate('testingNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any observations or issues found during testing..."
          />
        </Field>
      </div>

      {/* Modification photos */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Modification photos" />
        <InspectionPhotoUpload onPhotoCapture={async (file) => { await uploadPhoto(file); }} isUploading={isUploading} />
        {uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.map((p) => (
              <div key={p.id} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={p.url || p.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => deletePhoto(p.id)}
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center touch-manipulation active:scale-90"
                >
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
