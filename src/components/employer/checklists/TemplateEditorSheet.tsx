/**
 * Build or edit a firm checklist template (ELE-1826): name, the kind of job,
 * typed items in "Before start" and "On completion" groups, and when it goes
 * on jobs automatically. Wide on desktop: details on the left, items right.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  textareaCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useJobLabels } from '@/hooks/useJobLabels';
import {
  useChecklistOfficeActions,
  checklistErrorMessage,
  ITEM_TYPE_LABEL,
  type ChecklistItem,
  type ChecklistItemType,
  type ChecklistPhase,
  type ChecklistTemplate,
} from '@/hooks/usePrestartChecklists';

type Draft = Partial<ChecklistItem> & {
  uid: string;
  label: string;
  type: ChecklistItemType;
  phase: ChecklistPhase;
  required: boolean;
};

const TYPE_OPTIONS: { value: ChecklistItemType; label: string; description: string }[] = [
  { value: 'tick', label: ITEM_TYPE_LABEL.tick, description: 'One tap: done' },
  { value: 'photo', label: ITEM_TYPE_LABEL.photo, description: 'At least one photo' },
  {
    value: 'signature',
    label: ITEM_TYPE_LABEL.signature,
    description: 'The worker or the customer signs',
  },
  { value: 'number', label: ITEM_TYPE_LABEL.number, description: 'A reading or a count' },
  {
    value: 'yes_no',
    label: ITEM_TYPE_LABEL.yes_no,
    description: 'Only Yes counts as done; No needs a reason',
  },
  { value: 'rams', label: ITEM_TYPE_LABEL.rams, description: 'Reads the job pack sign-offs' },
];

const uid = () => Math.random().toString(36).slice(2, 10);

const toDraft = (i: ChecklistItem): Draft => ({ ...i, uid: uid() });

export function TemplateEditorSheet({
  open,
  onOpenChange,
  template,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** null = a new checklist */
  template: ChecklistTemplate | null;
  onSaved?: (id: string) => void;
}) {
  const { save, archive } = useChecklistOfficeActions();
  const { data: labels = [] } = useJobLabels();
  const [name, setName] = useState('');
  const [jobType, setJobType] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<Draft[]>([]);
  const [autoAll, setAutoAll] = useState(false);
  const [labelIds, setLabelIds] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    setName(template?.name ?? '');
    setJobType(template?.job_type ?? '');
    setDescription(template?.description ?? '');
    setItems(
      template?.items?.length
        ? template.items.map(toDraft)
        : [
            {
              uid: uid(),
              label: 'RAMS for this job read and signed',
              type: 'rams',
              phase: 'before',
              required: true,
            },
            { uid: uid(), label: '', type: 'tick', phase: 'before', required: true },
          ]
    );
    setAutoAll(template?.auto_all_jobs ?? false);
    setLabelIds(template?.auto_label_ids ?? []);
  }, [open, template]);

  const before = items.filter((i) => i.phase === 'before');
  const after = items.filter((i) => i.phase === 'after');
  const filled = items.filter((i) => i.label.trim());
  const canSave = name.trim().length > 0 && filled.length > 0 && !save.isPending;

  const update = (id: string, patch: Partial<Draft>) =>
    setItems((prev) =>
      prev.map((i) => {
        if (i.uid !== id) return i;
        const next = { ...i, ...patch };
        if (next.type === 'rams') next.phase = 'before';
        return next;
      })
    );
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.uid !== id));
  const move = (id: string, dir: -1 | 1) =>
    setItems((prev) => {
      const item = prev.find((i) => i.uid === id);
      if (!item) return prev;
      const group = prev.filter((i) => i.phase === item.phase);
      const idx = group.findIndex((i) => i.uid === id);
      const swap = group[idx + dir];
      if (!swap) return prev;
      const a = prev.indexOf(item);
      const b = prev.indexOf(swap);
      const next = [...prev];
      next[a] = swap;
      next[b] = item;
      return next;
    });
  const add = (phase: ChecklistPhase) =>
    setItems((prev) => [...prev, { uid: uid(), label: '', type: 'tick', phase, required: true }]);

  const submit = () => {
    const payload = filled.map(({ uid: _u, ...rest }) => ({ ...rest, label: rest.label.trim() }));
    save.mutate(
      {
        id: template?.id ?? null,
        name: name.trim(),
        description,
        jobType,
        items: payload,
        autoAllJobs: autoAll,
        autoLabelIds: labelIds,
      },
      {
        onSuccess: (id) => {
          toast.success(template ? 'Checklist saved' : 'Checklist added');
          onSaved?.(id);
          onOpenChange(false);
        },
        onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t save the checklist')),
      }
    );
  };

  const doArchive = () => {
    if (!template) return;
    archive.mutate(template.id, {
      onSuccess: () => {
        toast.success('Checklist removed. Jobs that already have it keep it.');
        onOpenChange(false);
      },
      onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t remove it')),
    });
  };

  const autoSummary = useMemo(() => {
    if (autoAll) return 'Goes on every new job automatically.';
    if (labelIds.length) {
      const names = labels.filter((l) => labelIds.includes(l.id)).map((l) => l.name);
      return `Goes on a job as soon as it gets the label ${names.join(' or ')}.`;
    }
    return 'Only goes on the jobs you attach it to.';
  }, [autoAll, labelIds, labels]);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Checklist"
      title={template ? `Edit ${template.name}` : 'New checklist'}
      description="What the crew must tick, photograph and sign. Jobs keep the version they were given."
      width="wide"
      bodyClassName="space-y-6 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:space-y-0"
      footer={
        <div className="flex items-center gap-2">
          {template && (
            <button
              type="button"
              onClick={doArchive}
              disabled={archive.isPending}
              className={cn(buttonSecondaryCn, 'px-4 text-red-300 hover:text-red-200')}
            >
              Remove
            </button>
          )}
          <div className="flex flex-1 gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                buttonSecondaryCn,
                'hidden px-5 sm:inline-flex sm:items-center sm:justify-center sm:w-32'
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!canSave}
              className={cn(buttonPrimaryCn, 'flex-1 sm:w-56 sm:flex-none')}
            >
              {save.isPending ? (
                <Loader2 className="mx-auto h-5 w-5 animate-spin" />
              ) : (
                'Save checklist'
              )}
            </button>
          </div>
        </div>
      }
    >
      {/* Left: what it is and when it goes on a job */}
      <div className="space-y-5">
        <div>
          <label className={labelCn} htmlFor="tpl-name">
            Name
          </label>
          <input
            id="tpl-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Distribution board change"
            maxLength={120}
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="tpl-type">
            What kind of job it is for
          </label>
          <input
            id="tpl-type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder="e.g. DB / consumer unit change"
            maxLength={80}
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="tpl-desc">
            Note for the crew (optional)
          </label>
          <textarea
            id="tpl-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={600}
            placeholder="One or two lines on why these checks matter"
            className={cn(textareaCn, 'min-h-[80px]')}
          />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
          <p className="text-[14px] font-semibold text-white">When it goes on a job</p>
          <button
            type="button"
            onClick={() => setAutoAll((v) => !v)}
            className={cn(chipBase, 'w-full px-4 text-left', autoAll ? chipOn : chipOff)}
            aria-pressed={autoAll}
          >
            {autoAll ? 'On every new job' : 'Not on every job'}
          </button>
          {labels.length > 0 && !autoAll && (
            <div>
              <span className={labelCn}>Or on jobs with one of these labels</span>
              <div className="flex flex-wrap gap-2">
                {labels.map((l) => {
                  const on = labelIds.includes(l.id);
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() =>
                        setLabelIds((prev) =>
                          on ? prev.filter((x) => x !== l.id) : [...prev, l.id]
                        )
                      }
                      className={cn(chipBase, 'px-4', on ? chipOn : chipOff)}
                      aria-pressed={on}
                    >
                      {l.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <p className="text-[13px] leading-snug text-white">{autoSummary}</p>
        </div>
      </div>

      {/* Right: the items */}
      <div className="space-y-6">
        <ItemGroup
          title="Before start"
          note="Each person on the crew does these. Required ones hold back their clock-in."
          items={before}
          onAdd={() => add('before')}
          onUpdate={update}
          onRemove={remove}
          onMove={move}
        />
        <ItemGroup
          title="On completion"
          note="Done once for the job. End with the customer’s signature."
          items={after}
          onAdd={() => add('after')}
          onUpdate={update}
          onRemove={remove}
          onMove={move}
        />
      </div>
    </FormSheet>
  );
}

function ItemGroup({
  title,
  note,
  items,
  onAdd,
  onUpdate,
  onRemove,
  onMove,
}: {
  title: string;
  note: string;
  items: Draft[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<Draft>) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  return (
    <section>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-[12.5px] text-white">{note}</p>
        </div>
        <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-white">
          {items.length}
        </span>
      </div>
      <div className="space-y-2.5">
        {items.map((it, idx) => (
          <div
            key={it.uid}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3.5 sm:p-4"
          >
            <div className="flex items-start gap-2">
              <span className="mt-3 w-5 shrink-0 text-[13px] font-semibold tabular-nums text-white">
                {idx + 1}
              </span>
              <textarea
                rows={2}
                value={it.label}
                onChange={(e) => onUpdate(it.uid, { label: e.target.value.replace(/\n/g, ' ') })}
                placeholder={
                  it.type === 'photo'
                    ? 'e.g. Photo of the isolation and lock-off'
                    : it.type === 'signature'
                      ? 'e.g. Customer’s signature'
                      : 'What has to be done'
                }
                maxLength={200}
                aria-label={`Item ${idx + 1}`}
                className="min-h-11 flex-1 resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base font-medium leading-snug text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
              <button
                type="button"
                onClick={() => onRemove(it.uid)}
                aria-label="Remove item"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2 pl-7">
              <div className="min-w-0 flex-1">
                <MobileSelectPicker
                  value={it.type}
                  onValueChange={(v) => onUpdate(it.uid, { type: v as ChecklistItemType })}
                  options={TYPE_OPTIONS.filter((o) => o.value !== 'rams' || it.phase === 'before')}
                  title="Item type"
                  triggerClassName={cn(selectTriggerCn, 'w-full')}
                />
              </div>
              <button
                type="button"
                onClick={() => onUpdate(it.uid, { required: !it.required })}
                className={cn(
                  chipBase,
                  'shrink-0 px-3 text-[13px]',
                  it.required ? chipOn : chipOff
                )}
                aria-pressed={it.required}
              >
                {it.required ? 'Required' : 'Optional'}
              </button>
              <button
                type="button"
                onClick={() => onMove(it.uid, -1)}
                disabled={idx === 0}
                aria-label="Move up"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] text-white touch-manipulation disabled:opacity-40"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onMove(it.uid, 1)}
                disabled={idx === items.length - 1}
                aria-label="Move down"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] text-white touch-manipulation disabled:opacity-40"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
            {it.type !== 'rams' && (
              <div className="mt-2 space-y-2 pl-7">
                {it.type === 'number' && (
                  <div className="max-w-[16rem]">
                    <label className={labelCn}>Unit</label>
                    <input
                      value={it.unit ?? ''}
                      onChange={(e) => onUpdate(it.uid, { unit: e.target.value })}
                      placeholder="e.g. circuits, kW, MΩ"
                      maxLength={20}
                      className={inputCn}
                    />
                  </div>
                )}
                {it.type === 'signature' && (
                  <div className="grid max-w-sm grid-cols-2 gap-2">
                    {(['worker', 'customer'] as const).map((sg) => (
                      <button
                        key={sg}
                        type="button"
                        onClick={() => onUpdate(it.uid, { signer: sg })}
                        className={cn(
                          chipBase,
                          'text-[13px]',
                          (it.signer ?? 'worker') === sg ? chipOn : chipOff
                        )}
                      >
                        {sg === 'worker' ? 'Worker signs' : 'Customer signs'}
                      </button>
                    ))}
                  </div>
                )}
                <label className="flex min-h-11 cursor-pointer items-center gap-3 touch-manipulation">
                  <input
                    type="checkbox"
                    checked={!!it.countersign}
                    onChange={() => onUpdate(it.uid, { countersign: !it.countersign })}
                    className="h-5 w-5 shrink-0 accent-[hsl(48_100%_50%)]"
                  />
                  <span className="text-[13px] leading-snug text-white">
                    Supervisor countersigns when an apprentice does it
                  </span>
                </label>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/[0.2] text-[14px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
        >
          <Plus className="h-4 w-4 text-elec-yellow" />
          Add an item
        </button>
      </div>
    </section>
  );
}
