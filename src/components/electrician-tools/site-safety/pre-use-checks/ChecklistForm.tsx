import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { SignatureField } from '../common/SignatureField';
import {
  useCreatePreUseCheck,
  REGULATION_REFS,
  getStatutoryInspectionStatus,
  type CheckItem,
} from '@/hooks/usePreUseChecks';
import { useSafetyEquipment, type SafetyEquipment } from '@/hooks/useSafetyEquipment';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import {
  Eyebrow,
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  type Tone,
} from '@/components/college/primitives';
import { SafetyMasthead } from '../common/SafetyModuleShell';
import { ReadinessGate } from '../common/ReadinessGate';

// Map pre-use check equipment types to equipment register categories
const CHECK_TYPE_TO_CATEGORIES: Record<string, string[]> = {
  ladder: ['ladders'],
  scaffold: ['other'],
  power_tool: ['power-tools'],
  test_instrument: ['test-equipment', 'pat-tester'],
  access_equipment: ['other'],
};

interface ChecklistFormProps {
  equipmentType: string;
  items: CheckItem[];
  onSubmit: () => void;
  onCancel: () => void;
}

type CheckResult = 'pass' | 'fail' | 'na';

const RESULT_BTN: Record<CheckResult, { on: string; label: string }> = {
  pass: { on: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400', label: 'Pass' },
  fail: { on: 'bg-red-500/15 border-red-500/40 text-red-400', label: 'Fail' },
  na: { on: 'bg-white/15 border-white/30 text-white', label: 'N/A' },
};

const STATUS_TONE: Record<'overdue' | 'due_soon' | 'unknown' | 'ok', Tone> = {
  overdue: 'red',
  due_soon: 'amber',
  unknown: 'blue',
  ok: 'green',
};
const STATUS_CLASS: Record<Tone, string> = {
  red: 'border-red-500/30 bg-red-500/[0.08] text-red-400',
  amber: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-400',
  blue: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-400',
  green: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400',
  emerald: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400',
  orange: 'border-orange-500/30 bg-orange-500/[0.08] text-orange-400',
  yellow: 'border-elec-yellow/30 bg-elec-yellow/[0.08] text-elec-yellow',
  purple: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-400',
  cyan: 'border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400',
  indigo: 'border-indigo-500/30 bg-indigo-500/[0.08] text-indigo-400',
};

export function ChecklistForm({
  equipmentType,
  items: initialItems,
  onSubmit,
  onCancel,
}: ChecklistFormProps) {
  const [items, setItems] = useState<CheckItem[]>(initialItems);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [inspectorSigName, setInspectorSigName] = useState('');
  const [inspectorSigDate, setInspectorSigDate] = useState(new Date().toISOString().split('T')[0]);
  const [inspectorSigData, setInspectorSigData] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const createCheck = useCreatePreUseCheck();

  // Equipment register integration
  const { equipment = [] } = useSafetyEquipment();
  const matchingCategories = CHECK_TYPE_TO_CATEGORIES[equipmentType] || [];
  const matchingEquipment = useMemo(
    () => equipment.filter((e: SafetyEquipment) => matchingCategories.includes(e.category)),
    [equipment, matchingCategories]
  );

  const selectEquipment = (eq: SafetyEquipment) => {
    setSelectedEquipmentId(eq.id);
    const desc = [eq.name, eq.serial_number ? `S/N: ${eq.serial_number}` : '']
      .filter(Boolean)
      .join(', ');
    setEquipmentDescription(desc);
  };

  const clearEquipmentSelection = () => {
    setSelectedEquipmentId(null);
    setEquipmentDescription('');
  };

  const updateItemResult = (id: string, result: CheckResult) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, result } : item)));
  };

  const handleAllPass = () => {
    setItems((prev) => prev.map((item) => ({ ...item, result: 'pass' as const })));
  };

  const computeOverallResult = (): CheckResult => {
    if (items.some((i) => i.result === 'fail')) return 'fail';
    if (items.every((i) => i.result === 'pass' || i.result === 'na')) return 'pass';
    return 'na';
  };

  const hasAtLeastOneResult = items.some((i) => i.result === 'pass' || i.result === 'fail');

  const handleSubmit = async () => {
    await createCheck.mutateAsync({
      equipment_type: equipmentType,
      equipment_id: selectedEquipmentId || undefined,
      equipment_description: equipmentDescription || undefined,
      site_address: siteAddress || undefined,
      items,
      overall_result: computeOverallResult(),
      photos: photoUrls,
      checked_by: inspectorSigName.trim() || undefined,
      signature: inspectorSigData || undefined,
    });
    setPhotoUrls([]);
    onSubmit();
  };

  // Grouped sections (preserves section ordering from template)
  const sections = useMemo(() => {
    const out: { name: string; items: CheckItem[] }[] = [];
    const map = new Map<string, CheckItem[]>();
    for (const item of items) {
      const sec = item.section || 'General';
      if (!map.has(sec)) {
        const arr: CheckItem[] = [];
        map.set(sec, arr);
        out.push({ name: sec, items: arr });
      }
      map.get(sec)!.push(item);
    }
    return out;
  }, [items]);

  const linkedStatus =
    selectedEquipmentId &&
    (() => {
      const linked = matchingEquipment.find((e: SafetyEquipment) => e.id === selectedEquipmentId);
      if (!linked) return null;
      return getStatutoryInspectionStatus(equipmentType, linked.last_inspection);
    })();

  const reg = REGULATION_REFS[equipmentType];

  const readiness = [
    { ok: hasAtLeastOneResult, label: 'At least one item passed or failed' },
    { ok: !!inspectorSigName.trim(), label: 'Inspector name' },
    { ok: !!inspectorSigData, label: 'Inspector signature' },
  ];

  return (
    <div className="bg-elec-dark min-h-screen pb-28">
      <SafetyMasthead
        onBack={onCancel}
        backLabel="Checks"
        moduleName={`${equipmentType.replace(/_/g, ' ')} check`}
      />

      <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
        {/* Regulation reference */}
        {reg && (
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-blue-400">
              {reg.shortName}
            </p>
            <p className="mt-1.5 text-[12.5px] text-white/85 leading-relaxed">{reg.description}</p>
          </div>
        )}

        {/* Statutory inspection warning for linked equipment */}
        {linkedStatus && linkedStatus.status !== 'ok' && (
          <div className={cn('rounded-2xl border p-4', STATUS_CLASS[STATUS_TONE[linkedStatus.status]])}>
            <p className="text-[12.5px] font-medium">{linkedStatus.label}</p>
          </div>
        )}

        {/* All-pass shortcut */}
        <SecondaryButton fullWidth onClick={handleAllPass}>
          Mark all as pass
        </SecondaryButton>

        {/* Equipment register picker */}
        {matchingEquipment.length > 0 && (
          <FormCard eyebrow="Link equipment register">
            <div className="flex flex-wrap gap-2">
              {matchingEquipment.map((eq: SafetyEquipment) => {
                const active = selectedEquipmentId === eq.id;
                return (
                  <button
                    key={eq.id}
                    onClick={() => (active ? clearEquipmentSelection() : selectEquipment(eq))}
                    className={cn(
                      'h-11 px-3 rounded-xl text-[12.5px] font-medium flex items-center gap-2 touch-manipulation active:scale-[0.97] transition-all border',
                      active
                        ? 'bg-elec-yellow/15 border-elec-yellow/50 text-elec-yellow'
                        : 'bg-[hsl(0_0%_9%)] border-white/[0.08] text-white'
                    )}
                  >
                    <span className="truncate max-w-[180px]">{eq.name}</span>
                    {eq.serial_number && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/70">
                        {eq.serial_number}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedEquipmentId && (
              <p className="text-[11.5px] text-emerald-400">Linked to equipment register</p>
            )}
          </FormCard>
        )}

        {/* Identity */}
        <FormCard eyebrow="Equipment & location">
          <Field
            label={`Equipment description${matchingEquipment.length > 0 ? ' (auto-filled or manual)' : ' (optional)'}`}
          >
            <input
              value={equipmentDescription}
              onChange={(e) => {
                setEquipmentDescription(e.target.value);
                if (selectedEquipmentId) setSelectedEquipmentId(null);
              }}
              placeholder="e.g. Fluke 1664 FC, serial #12345"
              className={inputClass}
            />
          </Field>
          <LocationAutoFill
            value={siteAddress}
            onChange={setSiteAddress}
            placeholder="e.g. 14 King Street, London"
            label="Site address (optional)"
          />
        </FormCard>

        {/* Checklist items — grouped by section */}
        <div className="space-y-3">
          {sections.map((sec) => {
            const passN = sec.items.filter((i) => i.result === 'pass').length;
            const failN = sec.items.filter((i) => i.result === 'fail').length;
            const total = sec.items.length;
            return (
              <div
                key={sec.name}
                className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                  <Eyebrow>{sec.name}</Eyebrow>
                  <div className="flex items-center gap-2">
                    {passN > 0 && (
                      <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                        {passN}P
                      </span>
                    )}
                    {failN > 0 && (
                      <span className="text-[10px] font-medium text-red-400 bg-red-500/15 px-2 py-0.5 rounded-full">
                        {failN}F
                      </span>
                    )}
                    <span className="text-[10.5px] text-white/45 tabular-nums">
                      {passN + failN}/{total}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {sec.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                      <span className="flex-1 text-[13px] text-white/90 leading-snug">{item.label}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {(['pass', 'fail', 'na'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => updateItemResult(item.id, r)}
                            className={cn(
                              'h-10 px-2.5 min-w-[40px] flex items-center justify-center rounded-lg border text-[11px] font-medium touch-manipulation active:scale-90 transition-all',
                              item.result === r
                                ? RESULT_BTN[r].on
                                : 'bg-[hsl(0_0%_9%)] border-white/[0.08] text-white/40'
                            )}
                            aria-label={RESULT_BTN[r].label}
                          >
                            {RESULT_BTN[r].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Evidence + inspector */}
        <FormCard eyebrow="Evidence & inspector">
          <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} label="Evidence photos" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Inspector name">
              <input
                value={inspectorSigName}
                onChange={(e) => setInspectorSigName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                value={inspectorSigDate}
                onChange={(e) => setInspectorSigDate(e.target.value)}
                className={cn(inputClass, '[color-scheme:dark]')}
              />
            </Field>
          </div>
          <SignatureField
            label="Inspector signature"
            value={inspectorSigData}
            onChange={setInspectorSigData}
          />
        </FormCard>

        <ReadinessGate items={readiness} title="Ready to submit?" />
      </div>

      {/* Sticky submit */}
      <div
        className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-3xl">
          <PrimaryButton
            fullWidth
            size="lg"
            disabled={!hasAtLeastOneResult || createCheck.isPending}
            onClick={handleSubmit}
          >
            {createCheck.isPending ? 'Saving…' : 'Submit check'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default ChecklistForm;
