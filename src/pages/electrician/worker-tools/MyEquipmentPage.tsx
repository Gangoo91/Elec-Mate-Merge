/**
 * MyEquipmentPage — tools/equipment the employer has assigned to this worker,
 * with PAT-test and calibration status. Read-only: the employer manages the kit
 * in Procurement (employer_company_tools.assigned_to_employee_id), the worker
 * sees what's on their name and what's due.
 *
 * Routed page version of MyEquipmentSheet — same data layer (useMyEmployeeRecord
 * + the my-equipment query), now with summary stats, a due-soon / all filter,
 * highlighted PAT/calibration alerts and an in-page detail view.
 */
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { differenceInCalendarDays, parseISO, format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  AlertRow,
  EmptyState,
  LoadingBlocks,
  ListCard,
  ListCardHeader,
  StatStrip,
  FilterBar,
  Pill,
  SecondaryButton,
  toneDot,
  type Tone,
} from '@/components/employer/editorial';

interface AssignedTool {
  id: string;
  name: string;
  category: string | null;
  serial_number: string | null;
  status: string | null;
  pat_due: string | null;
  next_calibration: string | null;
}

type DueState = { label: string; tone: string; pillTone: Tone; days: number | null };

const dueState = (iso: string | null): DueState => {
  if (!iso) return { label: 'Not set', tone: 'text-white/40', pillTone: 'amber', days: null };
  const days = differenceInCalendarDays(parseISO(iso), new Date());
  if (days < 0)
    return { label: `Overdue ${Math.abs(days)}d`, tone: 'text-red-400', pillTone: 'red', days };
  if (days <= 30)
    return { label: `Due in ${days}d`, tone: 'text-amber-400', pillTone: 'orange', days };
  return {
    label: format(parseISO(iso), 'd MMM yyyy'),
    tone: 'text-white/60',
    pillTone: 'green',
    days,
  };
};

const isDueSoon = (tool: AssignedTool): boolean => {
  const p = dueState(tool.pat_due).days;
  const c = dueState(tool.next_calibration).days;
  return (p != null && p <= 30) || (c != null && c <= 30);
};

const isOverdue = (tool: AssignedTool): boolean => {
  const p = dueState(tool.pat_due).days;
  const c = dueState(tool.next_calibration).days;
  return (p != null && p < 0) || (c != null && c < 0);
};

/* ────────────────────────────────────────────────────────
   Due-date tile (PAT / calibration)
   ──────────────────────────────────────────────────────── */
function DueTile({ label, iso }: { label: string; iso: string | null }) {
  const state = dueState(iso);
  return (
    <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-white/40">{label}</div>
      <div className={`text-[12.5px] font-medium mt-0.5 ${state.tone}`}>{state.label}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Equipment card — tappable grid item
   ──────────────────────────────────────────────────────── */
function EquipmentCard({ tool, onClick }: { tool: AssignedTool; onClick: () => void }) {
  const overdue = isOverdue(tool);
  const dueSoon = !overdue && isDueSoon(tool);
  const accent = overdue ? 'red' : dueSoon ? 'orange' : undefined;
  const meta =
    [tool.category, tool.serial_number && `SN ${tool.serial_number}`].filter(Boolean).join(' · ') ||
    'Tool';
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:p-5 text-left transition-colors hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60 touch-manipulation"
    >
      <div className="flex items-start gap-3">
        {accent && (
          <span aria-hidden className={`mt-0.5 w-[3px] h-9 rounded-full shrink-0 ${toneDot[accent]}`} />
        )}
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-medium text-white truncate">{tool.name}</div>
          <div className="mt-0.5 text-[11.5px] text-white/50 truncate">{meta}</div>
        </div>
        {tool.status && <Pill tone="blue">{tool.status}</Pill>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <DueTile label="PAT test" iso={tool.pat_due} />
        <DueTile label="Calibration" iso={tool.next_calibration} />
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   Detail view — single tool
   ──────────────────────────────────────────────────────── */
function EquipmentDetail({ tool, onBack }: { tool: AssignedTool; onBack: () => void }) {
  const meta =
    [tool.category, tool.serial_number && `SN ${tool.serial_number}`].filter(Boolean).join(' · ') ||
    'Tool';
  const overdue = isOverdue(tool);
  const dueSoon = !overdue && isDueSoon(tool);

  return (
    <div className="space-y-5 lg:max-w-2xl">
      <button
        type="button"
        onClick={onBack}
        className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
      >
        ← All equipment
      </button>

      {overdue && (
        <AlertRow
          tone="red"
          title="This item is overdue"
          subtitle="PAT or calibration has passed its due date — speak to your employer before using it."
        />
      )}
      {dueSoon && (
        <AlertRow
          tone="orange"
          title="PAT or calibration due soon"
          subtitle="Speak to your employer to get this booked in."
        />
      )}

      <ListCard>
        <ListCardHeader
          title={tool.name}
          meta={
            tool.status ? (
              <Pill tone="blue">{tool.status}</Pill>
            ) : undefined
          }
        />
        <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-4">
          <div className="text-[12.5px] text-white/55">{meta}</div>
          <div className="grid grid-cols-2 gap-3">
            <DueTile label="PAT test" iso={tool.pat_due} />
            <DueTile label="Calibration" iso={tool.next_calibration} />
          </div>
        </div>
      </ListCard>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────── */
export default function MyEquipmentPage() {
  const { data: employee } = useMyEmployeeRecord();
  const employeeId = employee?.id;

  const [filter, setFilter] = useState<'all' | 'due'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: tools = [], isLoading } = useQuery<AssignedTool[]>({
    queryKey: ['my-equipment', employeeId],
    enabled: !!employeeId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_company_tools')
        .select('id, name, category, serial_number, status, pat_due, next_calibration')
        .eq('assigned_to_employee_id', employeeId!)
        .order('name');
      if (error) throw error;
      return (data as AssignedTool[]) || [];
    },
  });

  const dueCount = useMemo(() => tools.filter(isDueSoon).length, [tools]);
  const overdueCount = useMemo(() => tools.filter(isOverdue).length, [tools]);

  const filtered = useMemo(
    () => (filter === 'due' ? tools.filter(isDueSoon) : tools),
    [tools, filter]
  );

  const selectedTool = useMemo(
    () => tools.find((t) => t.id === selectedId) ?? null,
    [tools, selectedId]
  );

  return (
    <WorkerToolPage
      eyebrow="Kit"
      title="My Equipment"
      description="Tools assigned to you, with PAT and calibration status."
    >
      {isLoading ? (
        <LoadingBlocks />
      ) : selectedTool ? (
        <EquipmentDetail tool={selectedTool} onBack={() => setSelectedId(null)} />
      ) : tools.length === 0 ? (
        <EmptyState
          title="No equipment assigned to you"
          description="Your employer assigns tools to your name in Procurement. Anything on your name will show here with its PAT and calibration dates."
        />
      ) : (
        <div className="space-y-6">
          <StatStrip
            columns={3}
            stats={[
              { label: 'Assigned', value: tools.length },
              {
                label: 'Due soon',
                value: dueCount,
                tone: dueCount > 0 ? 'orange' : undefined,
              },
              {
                label: 'Overdue',
                value: overdueCount,
                tone: overdueCount > 0 ? 'red' : undefined,
              },
            ]}
          />

          {overdueCount > 0 && (
            <AlertRow
              tone="red"
              title={`${overdueCount} item${overdueCount === 1 ? '' : 's'} overdue for PAT or calibration`}
              subtitle="Speak to your employer before using overdue kit."
              onClick={() => setFilter('due')}
            />
          )}
          {overdueCount === 0 && dueCount > 0 && (
            <AlertRow
              tone="orange"
              title={`${dueCount} item${dueCount === 1 ? '' : 's'} need PAT or calibration soon`}
              subtitle="Tap to view what's due."
              onClick={() => setFilter('due')}
            />
          )}

          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: tools.length },
              { value: 'due', label: 'Due soon', count: dueCount },
            ]}
            activeTab={filter}
            onTabChange={(v) => setFilter(v as 'all' | 'due')}
          />

          {filtered.length === 0 ? (
            <EmptyState
              title="Nothing due soon"
              description="None of your assigned equipment needs PAT or calibration in the next 30 days."
              action="Show all equipment"
              onAction={() => setFilter('all')}
            />
          ) : (
            <div className="space-y-3">
              <ListCardHeader
                title={filter === 'due' ? 'Due soon' : 'Assigned equipment'}
                meta={<span className="text-[11px] text-white/45 tabular-nums">{filtered.length}</span>}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tool) => (
                  <EquipmentCard
                    key={tool.id}
                    tool={tool}
                    onClick={() => setSelectedId(tool.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {filter === 'due' && (
            <SecondaryButton fullWidth onClick={() => setFilter('all')}>
              Show all equipment
            </SecondaryButton>
          )}
        </div>
      )}
    </WorkerToolPage>
  );
}
