import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
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
  type Tone,
} from '@/components/college/primitives';

import { safetyInputCn } from '../common/SafetyDocField';
import { SafetyMasthead } from '../common/SafetyModuleShell';
import { ReadinessGate } from '../common/ReadinessGate';
import { JobLinkField } from '../common/JobLinkField';

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
  /** Carried over by "Re-check" so the same kit isn't re-typed. */
  initialEquipmentId?: string | null;
  initialEquipmentDescription?: string;
  initialSiteAddress?: string;
  initialJobId?: string | null;
  initialJobTitle?: string | null;
}

type CheckResult = 'pass' | 'fail' | 'na';

/**
 * Selected state keeps its tint: a pass/fail verdict is exactly the binary
 * safety signal the tinted fill is reserved for. Unselected is neutral.
 */
const RESULT_BTN: Record<CheckResult, { on: string; label: string }> = {
  pass: { on: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400', label: 'Pass' },
  fail: { on: 'bg-red-500/15 border-red-500/40 text-red-400', label: 'Fail' },
  na: { on: 'bg-white/15 border-white/30 text-white', label: 'N/A' },
};

/**
 * FormCard's body is a flat `hsl(0 0% 12%)` fill; `bg-transparent` clears it so
 * the card recipe's ramp sits on near-black rather than being diluted by a
 * mid-grey base. See `common/SafetyList.tsx` for the same reasoning.
 */
const CARD_CN = cn('bg-transparent border-elec-yellow/35', CARD_SURFACE);

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
  grey: 'border-white/[0.12] bg-white/[0.06] text-white',
};

export function ChecklistForm({
  equipmentType,
  items: initialItems,
  onSubmit,
  onCancel,
  initialEquipmentId = null,
  initialEquipmentDescription = '',
  initialSiteAddress = '',
  initialJobId = null,
  initialJobTitle = null,
}: ChecklistFormProps) {
  const [items, setItems] = useState<CheckItem[]>(initialItems);
  /**
   * Which items the inspector has actually ruled on.
   *
   * `CheckItem.result` starts at 'na', so an untouched item and an item
   * deliberately marked "not applicable" were indistinguishable — see
   * `computeOverallResult` below for what that cost.
   */
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(initialEquipmentId);
  const [equipmentDescription, setEquipmentDescription] = useState(initialEquipmentDescription);
  const [siteAddress, setSiteAddress] = useState(initialSiteAddress);
  const [inspectorSigName, setInspectorSigName] = useState('');
  const [inspectorSigData, setInspectorSigData] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [linkedJobId, setLinkedJobId] = useState<string | null>(initialJobId);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(initialJobTitle);
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
    setAnswered((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  const handleAllPass = () => {
    setItems((prev) => prev.map((item) => ({ ...item, result: 'pass' as const })));
    setAnswered(new Set(items.map((i) => i.id)));
  };

  /**
   * The verdict written to `pre_use_checks.overall_result`.
   *
   * The previous version was `fail if any fail; pass if every item is pass or
   * na; else na`. Because every item STARTS as 'na', the second test was true
   * the moment nothing had failed — so a ladder check with one item ticked and
   * fourteen never looked at was stored as a full PASS, and the third branch
   * was unreachable. A pre-use inspection record that claims a pass it never
   * made is worse than no record.
   *
   * Now: fail on any fail; pass only when every item has been ruled on and at
   * least one is an actual pass; otherwise 'na' — partially assessed. All three
   * values already exist (the column's CHECK allows pass/fail/na and the list
   * renders 'na' as "N/A"), so nothing downstream sees a new string.
   */
  const answeredCount = answered.size;
  const allAnswered = items.length > 0 && answeredCount === items.length;

  const computeOverallResult = (): CheckResult => {
    if (items.some((i) => i.result === 'fail')) return 'fail';
    if (allAnswered && items.some((i) => i.result === 'pass')) return 'pass';
    return 'na';
  };

  const hasAtLeastOneResult = answeredCount > 0;

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
      job_id: linkedJobId,
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

  /**
   * The gate and the button now agree. Submit used to need only one assessed
   * item while this list also asked for a name and a signature — so the record
   * could be filed with neither, and an unattributable, unsigned inspection is
   * not evidence of anything.
   */
  const readiness = [
    {
      ok: hasAtLeastOneResult,
      label: allAnswered
        ? `All ${items.length} items assessed`
        : `Items assessed (${answeredCount} of ${items.length})`,
    },
    { ok: !!inspectorSigName.trim(), label: 'Inspector name' },
    { ok: !!inspectorSigData, label: 'Inspector signature' },
  ];
  const canSubmit = readiness.every((r) => r.ok);

  return (
    // Site Safety's page step is hsl(0 0% 7%), not pure black — the shell every
    // other module in the hub uses. `bg-elec-dark` (#000) left this screen a
    // shade darker than the list it opens from.
    <div className="min-h-screen bg-[hsl(0_0%_7%)] pb-28">
      <SafetyMasthead
        onBack={onCancel}
        backLabel="Checks"
        moduleName={`${equipmentType.replace(/_/g, ' ')} check`}
      />

      <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
        {/* Regulation reference — the same card material as everything else,
            with the reference carried by volt TEXT. A blue-tinted panel made
            the standing reference look like an alert. */}
        {reg && (
          <div className={cn('rounded-2xl border p-4', CARD_CN)}>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-elec-yellow">
              {reg.shortName}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white">{reg.description}</p>
          </div>
        )}

        {/* Statutory inspection warning for linked equipment — a tint is right
            here: this one IS an alert. */}
        {linkedStatus && linkedStatus.status !== 'ok' && (
          <div
            className={cn('rounded-2xl border p-4', STATUS_CLASS[STATUS_TONE[linkedStatus.status]])}
          >
            <p className="text-[12.5px] font-medium">{linkedStatus.label}</p>
          </div>
        )}

        {/* Equipment register picker */}
        {matchingEquipment.length > 0 && (
          <FormCard eyebrow="Link equipment register" className={CARD_CN}>
            <div className="flex flex-wrap gap-2">
              {matchingEquipment.map((eq: SafetyEquipment) => {
                const active = selectedEquipmentId === eq.id;
                return (
                  <button
                    key={eq.id}
                    onClick={() => (active ? clearEquipmentSelection() : selectEquipment(eq))}
                    aria-pressed={active}
                    className={cn(
                      'flex h-11 touch-manipulation items-center gap-2 rounded-xl border px-3 text-[12.5px] font-medium transition-all',
                      'active:scale-[0.97] active:brightness-125 [-webkit-tap-highlight-color:transparent]',
                      // Selected = SOLID volt. A volt hairline reads as
                      // "available", not "chosen" — the two states were a
                      // border apart and you could not tell at a glance which
                      // piece of kit the check was against.
                      active
                        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                        : 'border-white/[0.12] bg-white/[0.06] text-white'
                    )}
                  >
                    <span className="max-w-[180px] truncate">{eq.name}</span>
                    {eq.serial_number && (
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.5 text-[10px]',
                          active ? 'bg-black/15 text-black' : 'bg-white/10 text-white'
                        )}
                      >
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
        <FormCard eyebrow="Equipment & location" className={CARD_CN}>
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
              className={safetyInputCn}
            />
          </Field>
          <LocationAutoFill
            value={siteAddress}
            onChange={setSiteAddress}
            placeholder="e.g. 14 King Street, London"
            label="Site address (optional)"
          />
          <JobLinkField
            jobId={linkedJobId}
            jobTitle={linkedJobTitle}
            onSelect={(id, title) => {
              setLinkedJobId(id);
              setLinkedJobTitle(title);
            }}
          />
        </FormCard>

        {/* Checklist items — grouped by section.
            The bulk "Mark all as pass" used to be a full-width button at the
            very top of the page, above the equipment it applies to: the most
            prominent control on a statutory inspection screen was the one that
            skips the inspection. It sits with the list it acts on now, and it
            is the quieter of the two things in this row. */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Eyebrow>Checklist</Eyebrow>
              <p className="mt-1 text-[12.5px] text-white tabular-nums">
                {answeredCount} of {items.length} items assessed
              </p>
            </div>
            <SecondaryButton size="sm" className="h-11" onClick={handleAllPass}>
              Mark all pass
            </SecondaryButton>
          </div>

          {!allAnswered && answeredCount > 0 && (
            <p className="text-[12px] text-amber-400">
              Items left unassessed — this check will be recorded as N/A, not a pass.
            </p>
          )}

          {sections.map((sec) => {
            const passN = sec.items.filter((i) => i.result === 'pass').length;
            const failN = sec.items.filter((i) => i.result === 'fail').length;
            const doneN = sec.items.filter((i) => answered.has(i.id)).length;
            const total = sec.items.length;
            return (
              <div key={sec.name} className={cn('overflow-hidden rounded-2xl border', CARD_CN)}>
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
                  <Eyebrow>{sec.name}</Eyebrow>
                  {/* Neutral surface, coloured text — the pill convention. */}
                  <div className="flex items-center gap-2">
                    {passN > 0 && (
                      <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        {passN}P
                      </span>
                    )}
                    {failN > 0 && (
                      <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-red-400">
                        {failN}F
                      </span>
                    )}
                    {/* Counted from `answered`, not from `result`: an untouched
                        item also reads 'na', so the old counter showed 0/15 for
                        a section the inspector had marked N/A throughout. */}
                    <span className="text-[10.5px] tabular-nums text-white">
                      {doneN}/{total}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {sec.items.map((item) => {
                    const isAnswered = answered.has(item.id);
                    return (
                      <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                        <span className="flex-1 text-[13px] leading-snug text-white">
                          {item.label}
                        </span>
                        <div className="flex flex-shrink-0 items-center gap-1">
                          {(['pass', 'fail', 'na'] as const).map((r) => (
                            <button
                              key={r}
                              onClick={() => updateItemResult(item.id, r)}
                              aria-pressed={isAnswered && item.result === r}
                              className={cn(
                                'flex h-11 min-w-[44px] touch-manipulation items-center justify-center rounded-lg border px-2.5 text-[11px] font-medium transition-all',
                                // Press BRIGHTENS. `active:scale-90` alone read
                                // as the button shrinking away from the thumb.
                                'active:scale-[0.97] active:brightness-125 [-webkit-tap-highlight-color:transparent]',
                                isAnswered && item.result === r
                                  ? RESULT_BTN[r].on
                                  : 'border-white/[0.12] bg-white/[0.06] text-white'
                              )}
                              aria-label={RESULT_BTN[r].label}
                            >
                              {RESULT_BTN[r].label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Evidence + inspector */}
        <FormCard eyebrow="Evidence & inspector" className={CARD_CN}>
          <SafetyPhotoCapture
            photos={photoUrls}
            onPhotosChange={setPhotoUrls}
            label="Evidence photos"
          />
          <Field label="Inspector name" required>
            <input
              value={inspectorSigName}
              onChange={(e) => setInspectorSigName(e.target.value)}
              placeholder="Your name"
              className={safetyInputCn}
            />
          </Field>
          {/*
           * The date was an editable <input type="date"> that was never sent.
           * `useCreatePreUseCheck` has no `check_date` field, so the column took
           * its CURRENT_DATE default and anything the inspector picked was
           * discarded in silence — a back-dated check quietly filed as today.
           * Shown as what it actually is until the mutation can carry a date.
           */}
          <Field label="Date of check">
            <p className="h-11 text-base font-medium leading-[2.75rem] text-white tabular-nums">
              {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </Field>
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
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[hsl(0_0%_7%)]/95 px-4 py-3 backdrop-blur-sm"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-3xl">
          <PrimaryButton
            fullWidth
            size="lg"
            disabled={!canSubmit || createCheck.isPending}
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
