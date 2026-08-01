/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 4: Defects & Observations
 * Previous defects tracking + new defects + photos
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

const comboTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:bg-transparent hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const addButtonCn =
  'flex h-12 w-full items-center justify-center rounded-xl border-2 border-dashed border-white/[0.15] text-sm font-medium text-white touch-manipulation active:scale-[0.98]';

const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <div className="mb-3 flex items-center justify-between gap-3">
    <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
    {count !== undefined && count > 0 && (
      <span className="shrink-0 text-sm font-medium text-white/80">{count}</span>
    )}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

const statusOptions = [
  { value: 'outstanding', label: 'Outstanding' },
  { value: 'rectified', label: 'Rectified' },
  { value: 'no-longer-applicable', label: 'No Longer Applicable' },
];

const severityOptions = [
  { value: 'critical', label: 'Critical' },
  { value: 'non-critical', label: 'Non-critical' },
  { value: 'recommendation', label: 'Recommendation' },
];

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  /** Real report id from page state — useParams stays 'new' after replaceState. */
  reportId?: string | null;
}

export default function FAG6DefectsObservations({ formData, onUpdate, reportId }: Props) {
  const { id } = useParams<{ id: string }>();
  const { photos: uploadedPhotos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: reportId || id || 'new', reportType: 'fire-alarm-inspection', itemId: 'general-photos',
  });
  const previousDefects: any[] = formData.previousDefects || [];
  const newDefects: any[] = formData.defectsFound || [];
  const haptic = useHaptic();

  // Previous defects
  const addPreviousDefect = () => {
    haptic.light();
    onUpdate('previousDefects', [
      ...previousDefects,
      {
        id: crypto.randomUUID(),
        description: '',
        originalDate: '',
        status: 'outstanding',
        notes: '',
      },
    ]);
  };
  const removePreviousDefect = (id: string) => {
    haptic.medium();
    onUpdate(
      'previousDefects',
      previousDefects.filter((d: any) => d.id !== id)
    );
  };
  const updatePreviousDefect = (id: string, field: string, value: any) =>
    onUpdate(
      'previousDefects',
      previousDefects.map((d: any) => (d.id === id ? { ...d, [field]: value } : d))
    );

  // New defects
  const addNewDefect = () => {
    haptic.light();
    onUpdate('defectsFound', [
      ...newDefects,
      {
        id: crypto.randomUUID(),
        description: '',
        severity: 'non-critical',
        rectified: false,
        rectificationDate: '',
      },
    ]);
  };
  const removeNewDefect = (id: string) => {
    haptic.medium();
    onUpdate(
      'defectsFound',
      newDefects.filter((d: any) => d.id !== id)
    );
  };
  const updateNewDefect = (id: string, field: string, value: any) =>
    onUpdate(
      'defectsFound',
      newDefects.map((d: any) => (d.id === id ? { ...d, [field]: value } : d))
    );


  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Previous defects */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Previous defects (from last visit)" count={previousDefects.length} />
        {previousDefects.length === 0 && (
          <div className="rounded-xl border border-green-500/30 bg-white/[0.05] p-4 text-center">
            <p className="text-sm font-medium text-green-400">No previous defects recorded</p>
          </div>
        )}
        {/* Auto-sort: outstanding first */}
        {[...previousDefects]
          .sort(
            (a, b) => (a.status === 'outstanding' ? -1 : 1) - (b.status === 'outstanding' ? -1 : 1)
          )
          .map((d: any, idx: number) => (
            <div key={d.id} className="border-t border-white/[0.08] pt-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">
                  Previous defect {idx + 1}{' '}
                  <span
                    className={cn(
                      d.status === 'outstanding'
                        ? 'text-red-400'
                        : d.status === 'rectified'
                          ? 'text-green-400'
                          : 'text-amber-400'
                    )}
                  >
                    —{' '}
                    {d.status === 'outstanding'
                      ? 'Outstanding'
                      : d.status === 'rectified'
                        ? 'Rectified'
                        : 'N/A'}
                  </span>
                </p>
                <button
                  onClick={() => removePreviousDefect(d.id)}
                  className="min-h-11 shrink-0 px-2 text-sm font-medium text-red-400 touch-manipulation"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-4">
                <Field label="Description">
                  <Input
                    value={d.description || ''}
                    onChange={(e) => updatePreviousDefect(d.id, 'description', e.target.value)}
                    className={inputCn}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Original date">
                    <Input
                      type="date"
                      value={d.originalDate || ''}
                      onChange={(e) => updatePreviousDefect(d.id, 'originalDate', e.target.value)}
                      className={inputCn}
                    />
                  </Field>
                  <Field label="Status">
                    <ComboboxCell
                      value={d.status || 'outstanding'}
                      onChange={(v) => updatePreviousDefect(d.id, 'status', v)}
                      options={statusOptions}
                      placeholder="Status..."
                      className={comboTriggerCn}
                      allowCustom={false}
                    />
                  </Field>
                </div>
                <Field label="Notes">
                  <Input
                    value={d.notes || ''}
                    onChange={(e) => updatePreviousDefect(d.id, 'notes', e.target.value)}
                    className={inputCn}
                    placeholder="Action taken..."
                  />
                </Field>
              </div>
            </div>
          ))}
        <button onClick={addPreviousDefect} className={addButtonCn}>
          Add previous defect
        </button>
      </div>

      {/* New defects */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="New defects found this visit" count={newDefects.length} />
        {newDefects.length === 0 && (
          <div className="rounded-xl border border-green-500/30 bg-white/[0.05] p-4 text-center">
            <p className="text-sm font-medium text-green-400">No new defects found</p>
          </div>
        )}
        {newDefects.map((d: any, idx: number) => (
          <div key={d.id} className="border-t border-white/[0.08] pt-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">New defect {idx + 1}</p>
              <button
                onClick={() => removeNewDefect(d.id)}
                className="min-h-11 shrink-0 px-2 text-sm font-medium text-red-400 touch-manipulation"
              >
                Remove
              </button>
            </div>
            <div className="space-y-4">
              <Field label="Description">
                <Textarea
                  value={d.description || ''}
                  onChange={(e) => updateNewDefect(d.id, 'description', e.target.value)}
                  className={textareaCn}
                />
              </Field>
              <Field label="Severity">
                <ComboboxCell
                  value={d.severity || 'non-critical'}
                  onChange={(v) => updateNewDefect(d.id, 'severity', v)}
                  options={severityOptions}
                  placeholder="Select..."
                  className={comboTriggerCn}
                  allowCustom={false}
                />
              </Field>
              <button
                type="button"
                onClick={() => updateNewDefect(d.id, 'rectified', !d.rectified)}
                className="flex min-h-11 w-full items-center gap-3 text-left touch-manipulation"
              >
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2',
                    d.rectified ? 'border-green-500 bg-green-500' : 'border-white/40'
                  )}
                >
                  {d.rectified && (
                    <svg
                      className="h-3 w-3 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span
                  className={cn('text-sm', d.rectified ? 'font-medium text-green-400' : 'text-white')}
                >
                  Rectified
                </span>
              </button>
              {d.rectified && (
                <Field label="Rectification date">
                  <Input
                    type="date"
                    value={d.rectificationDate || ''}
                    onChange={(e) => updateNewDefect(d.id, 'rectificationDate', e.target.value)}
                    className={inputCn}
                  />
                </Field>
              )}
            </div>
          </div>
        ))}
        <button onClick={addNewDefect} className={addButtonCn}>
          Add new defect
        </button>
      </div>

      {/* Photos */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Inspection photos" />
        <InspectionPhotoUpload onPhotoCapture={async (file) => { await uploadPhoto(file); }} isUploading={isUploading} />
        {uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.map((p) => (
              <div key={p.id} className="relative aspect-square overflow-hidden rounded-xl">
                <img src={p.url || p.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => deletePhoto(p.id)}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-base leading-none text-white touch-manipulation active:scale-90"
                  aria-label="Delete photo"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
