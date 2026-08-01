/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G3 Commissioning — Tab 4: Handover & Documentation
 * Handover checklist, defects
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
  'h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white hover:bg-transparent hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const addButtonCn =
  'w-full h-11 rounded-xl border border-dashed border-white/[0.25] text-sm font-medium text-white touch-manipulation active:scale-[0.98] transition-transform';

const removeButtonCn =
  'h-11 px-2 text-sm font-medium text-red-400 touch-manipulation active:scale-95 transition-transform shrink-0';

const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <h2 className="mb-3 flex items-center gap-2 text-[15px] font-semibold tracking-tight text-white">
    {title}
    {count !== undefined && (
      <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-medium text-white/80">
        {count}
      </span>
    )}
  </h2>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

const CheckSquare = ({ checked }: { checked: boolean }) => (
  <div
    className={cn(
      'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
      checked ? 'bg-green-500 border-green-500' : 'border-white/30'
    )}
  >
    {checked && (
      <svg
        className="w-3 h-3 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  /** Saved report id from the page — useParams stays 'new' after autosave
   *  because the page rewrites the URL via history.replaceState. */
  reportId?: string;
}

export default function FAG3Handover({ formData, onUpdate, reportId }: Props) {
  const { id } = useParams<{ id: string }>();
  const { photos: uploadedPhotos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: reportId || id || 'new', reportType: 'fire-alarm-commissioning', itemId: 'general-photos',
  });
  const defects: any[] = formData.defectsFound || [];
  const haptic = useHaptic();

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
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Handover */}
      <div className={cardCn}>
        <SectionHeader title="Handover" />
        <Field label="Handover date">
          <Input
            type="date"
            value={formData.handoverDate || ''}
            onChange={(e) => onUpdate('handoverDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Documentation checklist */}
      <div className={cardCn}>
        <SectionHeader title="Documentation checklist" />
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
                'w-full text-left px-3.5 py-3 min-h-11 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
                formData[field]
                  ? 'bg-white/[0.06] border-green-500/40'
                  : 'bg-white/[0.06] border-white/[0.12]'
              )}
            >
              <CheckSquare checked={!!formData[field]} />
              <span className="text-sm font-medium text-white">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Defects */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Defects & observations" count={defects.length} />
        {defects.length === 0 && (
          <div className="rounded-xl bg-white/[0.05] p-4 text-center">
            <p className="text-sm font-medium text-green-400">No defects found</p>
          </div>
        )}
        {defects.map((d: any, idx: number) => (
          <div key={d.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                Defect {idx + 1} of {defects.length}
              </span>
              <button type="button" onClick={() => removeDefect(d.id)} className={removeButtonCn}>
                Remove
              </button>
            </div>
            <Field label="Description">
              <Textarea
                value={d.description || ''}
                onChange={(e) => updateDefect(d.id, 'description', e.target.value)}
                className={textareaCn}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
                  className={comboTriggerCn}
                  allowCustom={false}
                />
              </Field>
              {d.rectified && (
                <Field label="Rectification date">
                  <Input
                    type="date"
                    value={d.rectificationDate || ''}
                    onChange={(e) => updateDefect(d.id, 'rectificationDate', e.target.value)}
                    className={inputCn}
                  />
                </Field>
              )}
            </div>
            <button
              type="button"
              onClick={() => updateDefect(d.id, 'rectified', !d.rectified)}
              className="flex min-h-11 items-center gap-3 touch-manipulation"
            >
              <CheckSquare checked={!!d.rectified} />
              <span className={cn('text-sm text-white', d.rectified && 'font-medium')}>
                Rectified
              </span>
            </button>
          </div>
        ))}
        <button type="button" onClick={addDefect} className={addButtonCn}>
          Add defect
        </button>
      </div>

      {/* Photos */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Commissioning photos" />
        <InspectionPhotoUpload onPhotoCapture={async (file) => { await uploadPhoto(file); }} isUploading={isUploading} />
        {uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.map((p) => (
              <div key={p.id} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={p.url || p.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => deletePhoto(p.id)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center touch-manipulation active:scale-90">
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
