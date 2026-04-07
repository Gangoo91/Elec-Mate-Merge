/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 4: Defects & Observations
 * Previous defects tracking + new defects + photos
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useParams } from 'react-router-dom';
import { Trash2 as TrashPhoto } from 'lucide-react';

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
}

export default function FAG6DefectsObservations({ formData, onUpdate }: Props) {
  const { id } = useParams<{ id: string }>();
  const { photos: uploadedPhotos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: id || 'new', reportType: 'fire-alarm-inspection', itemId: 'general-photos',
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
    <div className="space-y-5">
      {/* Previous Defects */}
      <Section
        title="Previous Defects (from last visit)"
        accentColor="from-amber-500/40 to-yellow-400/20"
        count={previousDefects.length}
      >
        {previousDefects.length === 0 && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <p className="text-sm font-medium text-green-400">No previous defects recorded</p>
          </div>
        )}
        {/* Auto-sort: outstanding first */}
        {[...previousDefects]
          .sort(
            (a, b) => (a.status === 'outstanding' ? -1 : 1) - (b.status === 'outstanding' ? -1 : 1)
          )
          .map((d: any, idx: number) => (
            <div
              key={d.id}
              className={cn(
                'rounded-xl border overflow-hidden',
                d.status === 'outstanding'
                  ? 'border-red-500/30'
                  : d.status === 'rectified'
                    ? 'border-green-500/30'
                    : 'border-white/[0.06]'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-between px-3.5 py-2 border-b border-white/[0.06]',
                  d.status === 'outstanding'
                    ? 'bg-red-500/[0.05]'
                    : d.status === 'rectified'
                      ? 'bg-green-500/[0.05]'
                      : 'bg-white/[0.04]'
                )}
              >
                <span
                  className={cn(
                    'text-xs font-bold',
                    d.status === 'outstanding'
                      ? 'text-red-400'
                      : d.status === 'rectified'
                        ? 'text-green-400'
                        : 'text-amber-400'
                  )}
                >
                  Previous Defect {idx + 1} —{' '}
                  {d.status === 'outstanding'
                    ? 'OUTSTANDING'
                    : d.status === 'rectified'
                      ? 'RECTIFIED'
                      : 'N/A'}
                </span>
                <button
                  onClick={() => removePreviousDefect(d.id)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3.5 space-y-3 bg-white/[0.02]">
                <Field label="Description">
                  <Input
                    value={d.description || ''}
                    onChange={(e) => updatePreviousDefect(d.id, 'description', e.target.value)}
                    className={inputSmCn}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Original Date">
                    <Input
                      type="date"
                      value={d.originalDate || ''}
                      onChange={(e) => updatePreviousDefect(d.id, 'originalDate', e.target.value)}
                      className={cn(inputSmCn, '[color-scheme:dark]')}
                    />
                  </Field>
                  <Field label="Status">
                    <ComboboxCell
                      value={d.status || 'outstanding'}
                      onChange={(v) => updatePreviousDefect(d.id, 'status', v)}
                      options={statusOptions}
                      placeholder="Status..."
                      className="h-10 text-sm"
                      allowCustom={false}
                    />
                  </Field>
                </div>
                <Field label="Notes">
                  <Input
                    value={d.notes || ''}
                    onChange={(e) => updatePreviousDefect(d.id, 'notes', e.target.value)}
                    className={inputSmCn}
                    placeholder="Action taken..."
                  />
                </Field>
              </div>
            </div>
          ))}
        <button
          onClick={addPreviousDefect}
          className="w-full h-12 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Previous Defect
        </button>
      </Section>

      {/* New Defects */}
      <Section
        title="New Defects Found This Visit"
        accentColor="from-red-500/40 to-rose-400/20"
        count={newDefects.length}
      >
        {newDefects.length === 0 && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <p className="text-sm font-medium text-green-400">No new defects found</p>
          </div>
        )}
        {newDefects.map((d: any, idx: number) => (
          <div key={d.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-red-400">New Defect {idx + 1}</span>
              <button
                onClick={() => removeNewDefect(d.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Description">
                <Textarea
                  value={d.description || ''}
                  onChange={(e) => updateNewDefect(d.id, 'description', e.target.value)}
                  className="touch-manipulation text-base min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500"
                />
              </Field>
              <Field label="Severity">
                <ComboboxCell
                  value={d.severity || 'non-critical'}
                  onChange={(v) => updateNewDefect(d.id, 'severity', v)}
                  options={severityOptions}
                  placeholder="Select..."
                  className="h-10 text-sm"
                  allowCustom={false}
                />
              </Field>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => updateNewDefect(d.id, 'rectified', !d.rectified)}
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
                    onChange={(e) => updateNewDefect(d.id, 'rectificationDate', e.target.value)}
                    className={cn(inputSmCn, '[color-scheme:dark]')}
                  />
                </Field>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={addNewDefect}
          className="w-full h-12 rounded-xl border-2 border-dashed border-red-500/20 flex items-center justify-center gap-2 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add New Defect
        </button>
      </Section>

      {/* Photos */}
      <Section title="Inspection Photos" accentColor="from-cyan-500/40 to-blue-400/20">
        <InspectionPhotoUpload onPhotoCapture={async (file) => { await uploadPhoto(file); }} isUploading={isUploading} />
        {uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.map((p) => (
              <div key={p.id} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={p.url || p.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => deletePhoto(p.id)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center touch-manipulation active:scale-90">
                  <TrashPhoto className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
