import { useEffect, useMemo, useState } from 'react';
import { Search, Truck, User, Check } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useActiveEmployees } from '@/hooks/useEmployees';
import { useVehicles } from '@/hooks/useFleet';
import { useIssueTool } from '@/hooks/useKit';
import type { CompanyTool } from '@/hooks/useCompanyTools';

/* Issue a company tool to ONE holder: a person on the team or a van (whoever
   drives it holds it). The holder is asked to confirm in My equipment. */

type Mode = 'person' | 'van';

export function IssueToolSheet({
  tool,
  open,
  onOpenChange,
}: {
  tool: CompanyTool | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { data: people = [], isLoading: loadingPeople } = useActiveEmployees();
  const { data: vans = [], isLoading: loadingVans } = useVehicles();
  const issue = useIssueTool();
  const [mode, setMode] = useState<Mode>('person');
  const [pick, setPick] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!open || !tool) return;
    setMode(tool.assigned_vehicle_id ? 'van' : 'person');
    setPick(tool.assigned_vehicle_id ?? tool.assigned_to_employee_id ?? null);
    setSearch('');
    setNote('');
  }, [open, tool?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = search.trim().toLowerCase();
  const personRows = useMemo(
    () =>
      people
        .filter((p) => !q || `${p.name} ${p.role ?? ''}`.toLowerCase().includes(q))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [people, q]
  );
  const vanRows = useMemo(
    () =>
      vans
        .filter((v) =>
          !q ||
          `${v.registration ?? ''} ${v.make ?? ''} ${v.model ?? ''} ${v.driver?.name ?? ''}`.toLowerCase().includes(q)
        ),
    [vans, q]
  );

  if (!tool) return null;
  const current = tool.assigned_vehicle_id ?? tool.assigned_to_employee_id ?? null;
  const unchanged = pick === current;

  const submit = async () => {
    if (!pick) return;
    try {
      await issue.mutateAsync({
        toolId: tool.id,
        employeeId: mode === 'person' ? pick : null,
        vehicleId: mode === 'van' ? pick : null,
        note,
      });
      onOpenChange(false);
    } catch {
      /* hook toasts */
    }
  };

  const rowCn = (on: boolean) =>
    cn(
      'flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation transition-colors',
      on ? 'bg-elec-yellow/[0.14]' : 'hover:bg-white/[0.05]'
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Issue kit"
      title={tool.name}
      description="Pick who has it. A person, or a van so whoever drives it holds it. They are asked to confirm they have it."
      width="wide"
      footer={
        <div className="flex gap-2">
          <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'px-5')}>
            Cancel
          </button>
          <button
            type="button"
            data-help="kit.issue-confirm"
            onClick={submit}
            disabled={!pick || unchanged || issue.isPending}
            className={cn(buttonPrimaryCn, 'flex-1 px-5')}
          >
            {issue.isPending ? 'Issuing…' : unchanged && pick ? 'Already has it' : 'Issue'}
          </button>
        </div>
      }
    >
      <div className="lg:grid lg:grid-cols-[1fr_22rem] lg:items-start lg:gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2" data-help="kit.issue-mode">
            {(
              [
                ['person', 'A person', User],
                ['van', 'A van', Truck],
              ] as const
            ).map(([v, l, Icon]) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setMode(v);
                  setPick(null);
                }}
                className={cn(chipBase, 'inline-flex items-center justify-center gap-2', mode === v ? chipOn : chipOff)}
              >
                <Icon className="h-4 w-4" aria-hidden /> {l}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={mode === 'person' ? 'Search the team' : 'Search registration or driver'}
              aria-label="Search"
              className={cn(inputCn, 'pl-7')}
            />
          </div>

          <ul className="-mx-4 divide-y divide-white/[0.08] overflow-hidden border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
            {mode === 'person' ? (
              loadingPeople ? (
                <li className="h-16 animate-pulse" />
              ) : personRows.length === 0 ? (
                <li className="p-4 text-[14px] text-white">Nobody on the team matches.</li>
              ) : (
                personRows.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => setPick(p.id)} className={rowCn(pick === p.id)}>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[12px] font-semibold text-white">
                        {(p.avatar_initials || p.name.slice(0, 2)).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold text-white">{p.name}</span>
                        <span className="block truncate text-[12.5px] text-white">
                          {[p.team_role || p.role, p.user_id ? 'On the app' : 'Not on the app yet, no confirm']
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </span>
                      {current === p.id && <span className="text-[12px] font-semibold text-white">Has it now</span>}
                      {pick === p.id && <Check className="h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />}
                    </button>
                  </li>
                ))
              )
            ) : loadingVans ? (
              <li className="h-16 animate-pulse" />
            ) : vanRows.length === 0 ? (
              <li className="p-4 text-[14px] text-white">No vans on the fleet yet. Add them in Fleet first.</li>
            ) : (
              vanRows.map((v) => (
                <li key={v.id}>
                  <button type="button" onClick={() => setPick(v.id)} className={rowCn(pick === v.id)}>
                    <Truck className="h-5 w-5 shrink-0 text-white" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-semibold text-white">{v.registration}</span>
                      <span className="block truncate text-[12.5px] text-white">
                        {[`${v.make ?? ''} ${v.model ?? ''}`.trim(), v.driver?.name ? `Driven by ${v.driver.name}` : 'No driver set, so no confirm']
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>
                    {current === v.id && <span className="text-[12px] font-semibold text-white">Has it now</span>}
                    {pick === v.id && <Check className="h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-5 space-y-2 lg:mt-0">
          <label className={labelCn} htmlFor="issue-note">
            Note for them (optional)
          </label>
          <input
            id="issue-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={300}
            placeholder="e.g. Leads are in the case"
            className={inputCn}
          />
          <p className="pt-2 text-[12.5px] text-white">
            They get a notification and confirm in Worker Tools, My equipment. Until then it shows as waiting.
          </p>
        </div>
      </div>
    </FormSheet>
  );
}
