import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, RefreshCw, Search, ScanBarcode } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  PageFrame,
  PageHero,
  StatStrip,
  IconButton,
  PrimaryButton,
} from '@/components/employer/editorial';
import {
  PanelTitle,
  PlainEmpty,
  Row,
  RowList,
  Segments,
  StatusPill,
  asideFirstClass,
  colClass,
  frameClass,
  heroPrimaryClass,
  searchInputClass,
  twoColClass,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { FormSheet } from '@/components/forms/FormSheet';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { KIT_REGISTER_HELP as HELP } from '@/components/employer/help/jobs-quality';
import {
  inputCn,
  labelCn,
  cardCn,
  grid2Cn,
  fieldFullCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useCompanyTools, useDeleteTool, type CompanyTool } from '@/hooks/useCompanyTools';
import { useToolChecks, useLogToolCheck, type ToolCheckType } from '@/hooks/useToolChecks';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { CreateToolDialog } from '@/components/employer/dialogs/CreateToolDialog';
import { gbp } from '@/hooks/useFirmPriceBook';
import { useToolEvents, useIssueTool, useMarkToolRepaired, type ToolEvent } from '@/hooks/useKit';
import { IssueToolSheet } from '@/components/employer/kit/IssueToolSheet';
import { VanStockPanel } from '@/components/employer/kit/VanStockPanel';
import { KitPhoto } from '@/components/employer/kit/KitPhoto';
import { EquipmentBarcodeScanner } from '@/components/electrician-tools/site-safety/equipment/EquipmentBarcodeScanner';

/* ==========================================================================
   Kit register (ELE-1978, moved out of Procurement). Company tools and test
   instruments with PAT and calibration — each test a real record
   (employer_tool_checks) instead of a dated line in a notes field. The
   newest check sets the tool's due dates, which Worker Tools → My equipment
   already reads.

   ELE-2008 / ELE-1829: kit is ISSUED to one holder, a person or a van, and
   the holder confirms it in My equipment; every movement is kept
   (employer_tool_events). Faults and losses come back here with a photo.
   The Van stock tab (?tab=stock&van=<id>) holds each van's materials.
   Deep links: ?section=kit&tool=<id>.
   ========================================================================== */

type Filter = 'all' | 'due' | 'overdue' | 'repair' | 'pending';

const fmtDate = (v?: string | null) =>
  v
    ? new Date(v).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

const todayIso = () => new Date().toISOString().split('T')[0];
const plusMonths = (iso: string, m: number) => {
  const d = new Date(`${iso}T12:00:00`);
  d.setMonth(d.getMonth() + m);
  return d.toISOString().split('T')[0];
};

function dueState(tool: CompanyTool): { overdue: boolean; soon: boolean; label: string | null } {
  const today = todayIso();
  const in30 = plusMonths(today, 1);
  const dates = [
    tool.pat_due ? { kind: 'PAT', d: tool.pat_due } : null,
    tool.next_calibration ? { kind: 'Calibration', d: tool.next_calibration } : null,
  ].filter((x): x is { kind: string; d: string } => !!x);
  const overdue = dates.filter((x) => x.d < today);
  if (overdue.length)
    return {
      overdue: true,
      soon: false,
      label: `${overdue[0].kind} overdue since ${fmtDate(overdue[0].d)}`,
    };
  const soon = dates.filter((x) => x.d <= in30).sort((a, b) => a.d.localeCompare(b.d));
  if (soon.length)
    return { overdue: false, soon: true, label: `${soon[0].kind} due ${fmtDate(soon[0].d)}` };
  return { overdue: false, soon: false, label: null };
}

/** The earliest PAT or calibration date, for sorting the "Due next" queue. */
function earliestDue(tool: CompanyTool): string {
  return [tool.pat_due, tool.next_calibration].filter(Boolean).sort()[0] ?? '9999-12-31';
}

function eventLine(e: ToolEvent): string {
  switch (e.kind) {
    case 'issued':
      return `Issued to ${e.to_label ?? 'someone'}`;
    case 'confirmed':
      return `${e.actor_name ?? 'The holder'} confirmed they have it`;
    case 'transferred':
      return `Passed from ${e.from_label ?? 'someone'} to ${e.to_label ?? 'someone'}`;
    case 'returned':
      return e.from_label && e.from_label !== 'the office'
        ? `Back in the office from ${e.from_label}`
        : 'Back in the office';
    case 'fault':
      return 'Fault reported';
    case 'lost':
      return 'Reported lost';
    case 'repaired':
      return 'Marked back in use';
    default:
      return e.kind;
  }
}

export function KitRegisterSection() {
  const { data: tools = [], isLoading, isError, refetch, isFetching } = useCompanyTools();
  const { data: role } = useEmployerRole();
  const money = role?.canSeeMoney ?? false;
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: 'kit' | 'stock' = searchParams.get('tab') === 'stock' ? 'stock' : 'kit';
  const vanId = searchParams.get('van');
  const selectedId = searchParams.get('tool');
  const setParam = (patch: Record<string, string | null>) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [k, v] of Object.entries(patch)) {
          if (v == null) next.delete(k);
          else next.set(k, v);
        }
        return next;
      },
      { replace: true }
    );
  const setSelectedId = (id: string | null) => setParam({ tool: id });
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [showTool, setShowTool] = useState(false);
  const [editTool, setEditTool] = useState<CompanyTool | null>(null);
  const [scan, setScan] = useState(false);
  const selected = tools.find((t) => t.id === selectedId) ?? null;

  // A deep link to an item that is not (or no longer) on the register.
  useEffect(() => {
    if (!isLoading && !isError && selectedId && !tools.some((t) => t.id === selectedId)) {
      toast.message('That item is no longer on the register');
      setSelectedId(null);
    }
  }, [isLoading, isError, selectedId, tools]); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = useMemo(() => {
    let overdue = 0;
    let soon = 0;
    for (const t of tools) {
      const s = dueState(t);
      if (s.overdue) overdue++;
      else if (s.soon) soon++;
    }
    return {
      overdue,
      soon,
      repair: tools.filter((t) => t.status === 'Under Repair' || t.status === 'Lost').length,
      pending: tools.filter((t) => t.issue_state === 'pending').length,
    };
  }, [tools]);

  const filtered = useMemo(() => {
    const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return tools
      .filter((t) => {
        const s = dueState(t);
        if (filter === 'overdue' && !s.overdue) return false;
        if (filter === 'due' && !(s.overdue || s.soon)) return false;
        if (filter === 'repair' && t.status !== 'Under Repair' && t.status !== 'Lost') return false;
        if (filter === 'pending' && t.issue_state !== 'pending') return false;
        const hay =
          `${t.name} ${t.category} ${t.serial_number ?? ''} ${t.barcode ?? ''} ${t.assigned_to ?? ''}`.toLowerCase();
        return words.every((w) => hay.includes(w));
      })
      .sort((a, b) => {
        const sa = dueState(a);
        const sb = dueState(b);
        const rank = (s: ReturnType<typeof dueState>) => (s.overdue ? 0 : s.soon ? 1 : 2);
        return rank(sa) - rank(sb) || a.name.localeCompare(b.name);
      });
  }, [tools, search, filter]);

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  if (!isLoading && !isError && tools.length === 0) {
    helpBlockers.push({
      text: 'Nothing on the register yet. Start with your testers.',
      fixLabel: 'Add kit',
      onFix: () => {
        setEditTool(null);
        setShowTool(true);
      },
    });
  } else if (stats.overdue > 0) {
    helpBlockers.push({
      text: `${stats.overdue} ${stats.overdue === 1 ? 'item is' : 'items are'} past its PAT or calibration date.`,
      fixLabel: 'Show overdue',
      onFix: () => setFilter('overdue'),
    });
  }
  const askContext = { page: 'kit', tab: tab === 'stock' ? 'van stock' : filter };

  const addKit = () => {
    setEditTool(null);
    setShowTool(true);
  };

  const headlineParts = [
    stats.overdue > 0 ? `${stats.overdue} past PAT or calibration` : null,
    stats.soon > 0 ? `${stats.soon} due in 30 days` : null,
    stats.pending > 0 ? `${stats.pending} waiting for the holder to confirm` : null,
    stats.repair > 0 ? `${stats.repair} faulty or lost` : null,
  ].filter(Boolean) as string[];
  const headline =
    tab === 'stock'
      ? 'What is on each van. Pick a van to see and count its stock.'
      : isLoading
        ? 'Loading the register.'
        : isError
          ? "Couldn't load the kit register."
          : tools.length === 0
            ? 'Nothing on the register yet. Start with your testers.'
            : headlineParts.length > 0
              ? `${headlineParts.join(', ').replace(/^./, (c) => c.toUpperCase())}.`
              : `${tools.length} item${tools.length === 1 ? '' : 's'}, all in date.`;

  // The queue on the right: what needs doing next, most urgent first.
  const dueNext = useMemo(
    () =>
      tools
        .map((t) => ({ t, s: dueState(t) }))
        .filter(({ s }) => s.overdue || s.soon)
        .sort(
          (x, y) =>
            Number(y.s.overdue) - Number(x.s.overdue) ||
            earliestDue(x.t).localeCompare(earliestDue(y.t))
        )
        .slice(0, 6),
    [tools]
  );
  const waiting = useMemo(
    () => tools.filter((t) => t.issue_state === 'pending').slice(0, 6),
    [tools]
  );

  const toolStatusTone = (t: CompanyTool): PillTone =>
    t.status === 'Under Repair' || t.status === 'Lost'
      ? 'red'
      : t.status === 'In Use'
        ? 'green'
        : 'neutral';

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero
          title="Kit register"
          description={headline}
          actions={
            <>
              <PrimaryButton data-help="kit.add" onClick={addKit} className={heroPrimaryClass}>
                <Plus className="h-4 w-4 mr-1.5" aria-hidden /> Add kit
              </PrimaryButton>
              <IconButton onClick={() => refetch()} aria-label="Refresh">
                <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
              </IconButton>
              <PageHelpButton help={HELP} blockers={helpBlockers} askContext={askContext} />
            </>
          }
        />
        <HowItWorks help={HELP} blockers={helpBlockers} askContext={askContext} />

        <div data-help="kit.tabs">
          <Segments
            wrap
            items={[
              { value: 'kit', label: 'Tools and testers' },
              { value: 'stock', label: 'Van stock' },
            ]}
            value={tab}
            onChange={(v) => setParam({ tab: v === 'kit' ? null : v, van: null })}
          />
        </div>

        {tab === 'stock' ? (
          <VanStockPanel
            vanId={vanId}
            onVanChange={(id) => setParam({ van: id })}
            tools={tools}
            onOpenTool={(id) => setSelectedId(id)}
          />
        ) : (
          <>
            {tools.length > 0 && (
              <StatStrip
                columns={4}
                stats={[
                  {
                    label: 'Items',
                    value: tools.length,
                    sub: 'On the register',
                    onClick: () => setFilter('all'),
                  },
                  {
                    label: 'Overdue',
                    value: stats.overdue,
                    sub: 'PAT or calibration',
                    tone: stats.overdue ? 'red' : undefined,
                    onClick: () => setFilter('overdue'),
                  },
                  {
                    label: 'Due in 30 days',
                    value: stats.soon,
                    sub: 'Book the test',
                    tone: stats.soon ? 'yellow' : undefined,
                    onClick: () => setFilter('due'),
                  },
                  {
                    label: 'Faulty or lost',
                    value: stats.repair,
                    sub: stats.repair ? 'Out of use' : 'None',
                    tone: stats.repair ? 'red' : undefined,
                    onClick: () => setFilter('repair'),
                  },
                ]}
              />
            )}

            <div className={tools.length > 0 ? twoColClass : undefined}>
              <section className={colClass}>
                <div>
                  <PanelTitle
                    title="The register"
                    meta={tools.length > 0 ? `${filtered.length}` : undefined}
                  />
                  {tools.length > 0 && (
                    <div className="mb-3 space-y-3">
                      <div className="relative">
                        <Search
                          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                          aria-hidden
                        />
                        <input
                          type="search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search kit, serial numbers, who has it"
                          aria-label="Search the kit register"
                          className={cn(searchInputClass, 'pr-12')}
                        />
                        <button
                          type="button"
                          onClick={() => setScan(true)}
                          aria-label="Scan a barcode to find kit"
                          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white touch-manipulation"
                        >
                          <ScanBarcode className="h-5 w-5" />
                        </button>
                      </div>
                      <div data-help="kit.filters">
                        <Segments
                          wrap
                          items={[
                            { value: 'all', label: 'All', count: tools.length },
                            { value: 'due', label: 'Due soon', count: stats.overdue + stats.soon },
                            { value: 'overdue', label: 'Overdue', count: stats.overdue },
                            { value: 'repair', label: 'Faulty or lost', count: stats.repair },
                            { value: 'pending', label: 'Waiting to confirm', count: stats.pending },
                          ]}
                          value={filter}
                          onChange={(v) => setFilter(v as Filter)}
                        />
                      </div>
                    </div>
                  )}

                  {isLoading ? (
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
                      ))}
                    </div>
                  ) : isError ? (
                    <PlainEmpty
                      stacked
                      text="Couldn't load the kit register."
                      action="Try again"
                      onAction={() => refetch()}
                    />
                  ) : tools.length === 0 ? (
                    <PlainEmpty
                      stacked
                      text="Your tools and testers show here with who has them and when PAT and calibration are due. Start with your testers: their calibration is what makes your certificates stand up."
                    />
                  ) : filtered.length === 0 ? (
                    <PlainEmpty
                      stacked
                      text={
                        search.trim()
                          ? 'Nothing matches that search.'
                          : 'Nothing matches. Everything here is in date.'
                      }
                      action="Show all"
                      onAction={() => {
                        setFilter('all');
                        setSearch('');
                      }}
                    />
                  ) : (
                    <div data-help="kit.list">
                      <RowList>
                        {filtered.map((t) => {
                          const s = dueState(t);
                          return (
                            <Row
                              wrapDetail
                              key={t.id}
                              onClick={() => setSelectedId(t.id)}
                              title={t.name}
                              detail={[
                                t.category,
                                t.serial_number ? `S/N ${t.serial_number}` : null,
                                t.assigned_to || 'In the office',
                              ]
                                .filter(Boolean)
                                .join(' · ')}
                              meta={
                                t.issue_state === 'pending' || s.label ? (
                                  <span className={s.overdue ? 'text-red-300' : 'text-elec-yellow'}>
                                    {[
                                      s.label,
                                      t.issue_state === 'pending'
                                        ? 'Waiting for them to confirm'
                                        : null,
                                    ]
                                      .filter(Boolean)
                                      .join(' · ')}
                                  </span>
                                ) : undefined
                              }
                              trailing={
                                <StatusPill tone={toolStatusTone(t)}>{t.status}</StatusPill>
                              }
                            />
                          );
                        })}
                      </RowList>
                    </div>
                  )}
                </div>
              </section>

              {tools.length > 0 && (
                <aside
                  className={cn(colClass, dueNext.length + waiting.length > 0 && asideFirstClass)}
                >
                  <div>
                    <PanelTitle
                      title="Due next"
                      meta={dueNext.length > 0 ? `${stats.overdue + stats.soon}` : undefined}
                      action={stats.overdue + stats.soon > dueNext.length ? 'All' : undefined}
                      onAction={() => setFilter('due')}
                    />
                    {dueNext.length === 0 ? (
                      <PlainEmpty stacked text="Nothing due in the next 30 days." />
                    ) : (
                      <RowList>
                        {dueNext.map(({ t, s }) => (
                          <Row
                            wrapDetail
                            key={t.id}
                            title={t.name}
                            detail={t.assigned_to || 'In the office'}
                            meta={
                              <span className={s.overdue ? 'text-red-300' : 'text-elec-yellow'}>
                                {s.label}
                              </span>
                            }
                            onClick={() => setSelectedId(t.id)}
                          />
                        ))}
                      </RowList>
                    )}
                  </div>
                  {waiting.length > 0 && (
                    <div>
                      <PanelTitle
                        title="Waiting to confirm"
                        meta={`${stats.pending}`}
                        action={stats.pending > waiting.length ? 'All' : undefined}
                        onAction={() => setFilter('pending')}
                      />
                      <RowList>
                        {waiting.map((t) => (
                          <Row
                            wrapDetail
                            key={t.id}
                            title={t.name}
                            detail={`Issued to ${t.assigned_to ?? 'someone'}${t.issued_at ? `, ${fmtDate(t.issued_at)}` : ''}`}
                            onClick={() => setSelectedId(t.id)}
                          />
                        ))}
                      </RowList>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </>
        )}
      </PageFrame>

      <EquipmentBarcodeScanner
        open={scan}
        onClose={() => setScan(false)}
        title="Find kit"
        description="Scan the barcode or serial label on the item"
        onScan={({ text }) => {
          setScan(false);
          const code = text.trim().toLowerCase();
          const hit = tools.find(
            (t) =>
              (t.barcode ?? '').trim().toLowerCase() === code ||
              (t.serial_number ?? '').trim().toLowerCase() === code
          );
          if (hit) setSelectedId(hit.id);
          else {
            setSearch(text.trim());
            toast.message('No kit with that code', {
              description: 'Add the barcode to the item with Edit details.',
            });
          }
        }}
      />

      <ToolSheet
        tool={selected}
        money={money}
        onClose={() => setSelectedId(null)}
        onEdit={(t) => {
          setSelectedId(null);
          setEditTool(t);
          setShowTool(true);
        }}
      />
      <CreateToolDialog
        open={showTool}
        tool={editTool}
        onOpenChange={(o) => {
          setShowTool(o);
          if (!o) setEditTool(null);
        }}
      />
    </>
  );
}

function ToolSheet({
  tool,
  money,
  onClose,
  onEdit,
}: {
  tool: CompanyTool | null;
  money: boolean;
  onClose: () => void;
  onEdit: (t: CompanyTool) => void;
}) {
  const { data: checks = [], isLoading } = useToolChecks(tool?.id);
  const { data: events = [] } = useToolEvents(tool?.id);
  const issue = useIssueTool();
  const repaired = useMarkToolRepaired();
  const [issueOpen, setIssueOpen] = useState(false);
  const logCheck = useLogToolCheck();
  const deleteTool = useDeleteTool();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [type, setType] = useState<ToolCheckType>('pat');
  const [result, setResult] = useState<'pass' | 'fail'>('pass');
  const [checkedOn, setCheckedOn] = useState(todayIso());
  const [nextDue, setNextDue] = useState(plusMonths(todayIso(), 12));
  const [certRef, setCertRef] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!tool) return;
    const isTester = /test|meter|mft|megger|fluke|kewtech|calib/i.test(
      `${tool.category} ${tool.name}`
    );
    setType(isTester && !tool.pat_due ? 'calibration' : 'pat');
    setResult('pass');
    setCheckedOn(todayIso());
    setNextDue(plusMonths(todayIso(), 12));
    setCertRef('');
    setNotes('');
  }, [tool?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!tool) return null;
  const s = dueState(tool);
  const held = !!(tool.assigned_to_employee_id || tool.assigned_vehicle_id);
  const lastReport = events.find((e) => e.kind === 'fault' || e.kind === 'lost') ?? null;
  const reportOpen =
    (tool.status === 'Under Repair' || tool.status === 'Lost') &&
    lastReport &&
    !events.some((e) => e.kind === 'repaired' && e.created_at > lastReport.created_at);

  const submit = async () => {
    try {
      await logCheck.mutateAsync({
        tool_id: tool.id,
        check_type: type,
        checked_on: checkedOn,
        result,
        next_due: result === 'pass' ? nextDue || null : null,
        certificate_ref: certRef,
        notes,
      });
      setCertRef('');
      setNotes('');
    } catch {
      /* hook toasts */
    }
  };

  return (
    <>
      <FormSheet
        open={!!tool}
        onOpenChange={(o) => !o && onClose()}
        title={tool.name}
        description={[
          tool.status,
          tool.category,
          tool.serial_number ? `S/N ${tool.serial_number}` : null,
          tool.assigned_to,
        ]
          .filter(Boolean)
          .join(' · ')}
        width="wide"
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="h-12 rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-[14px] font-semibold text-red-300 touch-manipulation"
            >
              Remove
            </button>
            <button
              type="button"
              data-help="kit.edit"
              onClick={() => onEdit(tool)}
              className={cn(buttonSecondaryCn, 'flex-1 px-4')}
            >
              Edit details
            </button>
          </div>
        }
      >
        <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
          <div className="space-y-5">
            {reportOpen && lastReport && (
              <section className="space-y-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <h2 className="text-[15px] font-semibold text-white">
                  {lastReport.kind === 'lost' ? 'Reported lost' : 'Fault reported'}
                  {lastReport.actor_name ? ` by ${lastReport.actor_name}` : ''}
                </h2>
                <p className="text-[13px] text-white">{fmtDate(lastReport.created_at)}</p>
                {lastReport.note && <p className="text-[14px] text-white">{lastReport.note}</p>}
                {lastReport.photo_path && <KitPhoto path={lastReport.photo_path} />}
                <button
                  type="button"
                  data-help="kit.repaired"
                  onClick={() => repaired.mutate({ toolId: tool.id })}
                  disabled={repaired.isPending}
                  className={cn(buttonSecondaryCn, 'w-full')}
                >
                  {repaired.isPending
                    ? 'Saving…'
                    : lastReport.kind === 'lost'
                      ? 'Found it, back in use'
                      : 'Fixed, back in use'}
                </button>
              </section>
            )}

            <section className={cardCn} data-help="kit.holder">
              <h2 className="text-[15px] font-semibold text-white">Who has it</h2>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-white">
                    {held ? tool.assigned_to : 'In the office'}
                  </p>
                  {held && (
                    <p
                      className={cn(
                        'text-[13px]',
                        tool.issue_state === 'pending' ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {tool.issue_state === 'pending'
                        ? `Issued${tool.issued_at ? ` ${fmtDate(tool.issued_at)}` : ''}. Waiting for them to confirm.`
                        : tool.issue_state === 'confirmed'
                          ? `Confirmed${tool.confirmed_at ? ` ${fmtDate(tool.confirmed_at)}` : ''}`
                          : 'Not on the app, so no confirmation'}
                    </p>
                  )}
                  {!held && tool.assigned_to && (
                    <p className="text-[13px] text-white">Old note: {tool.assigned_to}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  data-help="kit.issue"
                  onClick={() => setIssueOpen(true)}
                  disabled={tool.status === 'Lost' || tool.status === 'Written Off'}
                  className={cn(buttonPrimaryCn, 'flex-1 px-4')}
                >
                  {held ? 'Move to someone else' : 'Issue'}
                </button>
                {held && (
                  <button
                    type="button"
                    onClick={() =>
                      issue.mutate({ toolId: tool.id, employeeId: null, vehicleId: null })
                    }
                    disabled={issue.isPending}
                    className={cn(buttonSecondaryCn, 'px-4')}
                  >
                    Back in the office
                  </button>
                )}
              </div>
            </section>

            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Due dates</h2>
              {s.label && (
                <p
                  className={cn(
                    'text-[13px] font-medium',
                    s.overdue ? 'text-red-300' : 'text-elec-yellow'
                  )}
                >
                  {s.label}
                </p>
              )}
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[14px] text-white">
                <dt>Last PAT</dt>
                <dd className="text-right">{fmtDate(tool.pat_date)}</dd>
                <dt>PAT due</dt>
                <dd className="text-right">{fmtDate(tool.pat_due)}</dd>
                <dt>Last calibration</dt>
                <dd className="text-right">{fmtDate(tool.last_calibration)}</dd>
                <dt>Calibration due</dt>
                <dd className="text-right">{fmtDate(tool.next_calibration)}</dd>
                <dt>Bought</dt>
                <dd className="text-right">
                  {fmtDate(tool.purchase_date)}
                  {money && Number(tool.purchase_price) > 0
                    ? ` · ${gbp(Number(tool.purchase_price))}`
                    : ''}
                </dd>
              </dl>
            </section>

            <section className={cardCn} data-help="kit.log-test">
              <h2 className="text-[15px] font-semibold text-white">Log a test</h2>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ['pat', 'PAT test'],
                    ['calibration', 'Calibration'],
                  ] as const
                ).map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setType(v)}
                    className={cn(chipBase, type === v ? chipOn : chipOff)}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ['pass', 'Passed'],
                    ['fail', 'Failed'],
                  ] as const
                ).map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setResult(v)}
                    className={cn(
                      chipBase,
                      result === v
                        ? v === 'pass'
                          ? 'border-emerald-500 bg-emerald-500 font-semibold text-black'
                          : 'border-red-500 bg-red-500 font-semibold text-white'
                        : chipOff
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className={grid2Cn}>
                <div>
                  <label className={labelCn} htmlFor="check-date">
                    Tested on
                  </label>
                  <input
                    id="check-date"
                    type="date"
                    value={checkedOn}
                    max={todayIso()}
                    onChange={(e) => {
                      setCheckedOn(e.target.value);
                      if (e.target.value) setNextDue(plusMonths(e.target.value, 12));
                    }}
                    className={inputCn}
                  />
                </div>
                {result === 'pass' ? (
                  <div>
                    <label className={labelCn} htmlFor="check-next">
                      Next due
                    </label>
                    <input
                      id="check-next"
                      type="date"
                      value={nextDue}
                      min={checkedOn}
                      onChange={(e) => setNextDue(e.target.value)}
                      className={inputCn}
                    />
                  </div>
                ) : (
                  <p className="self-end pb-2 text-[12px] text-red-300">
                    Marks it Under repair until it is fixed and re-tested.
                  </p>
                )}
                <div className={fieldFullCn}>
                  <label className={labelCn} htmlFor="check-cert">
                    {type === 'calibration'
                      ? 'Calibration certificate number'
                      : 'Test reference (optional)'}
                  </label>
                  <input
                    id="check-cert"
                    value={certRef}
                    onChange={(e) => setCertRef(e.target.value)}
                    maxLength={120}
                    className={inputCn}
                  />
                </div>
                <div className={fieldFullCn}>
                  <label className={labelCn} htmlFor="check-notes">
                    Notes (optional)
                  </label>
                  <input
                    id="check-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={2000}
                    className={inputCn}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={submit}
                disabled={!checkedOn || logCheck.isPending}
                className={cn(buttonPrimaryCn, 'w-full')}
              >
                {logCheck.isPending
                  ? 'Saving…'
                  : type === 'pat'
                    ? 'Log PAT test'
                    : 'Log calibration'}
              </button>
            </section>
          </div>

          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">History</h2>
            <h3 className="text-sm font-semibold text-white">Tests</h3>
            {isLoading ? (
              <div className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
            ) : checks.length === 0 ? (
              <p className="text-[14px] text-white">No tests logged here yet.</p>
            ) : (
              <ul className="divide-y divide-white/[0.08]">
                {checks.map((c) => (
                  <li key={c.id} className="py-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[14px] font-medium text-white">
                        {c.check_type === 'pat' ? 'PAT test' : 'Calibration'} ·{' '}
                        {fmtDate(c.checked_on)}
                      </p>
                      <span
                        className={cn(
                          'text-[13px] font-semibold',
                          c.result === 'pass' ? 'text-emerald-300' : 'text-red-300'
                        )}
                      >
                        {c.result === 'pass' ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-white">
                      {[
                        c.next_due ? `Next due ${fmtDate(c.next_due)}` : null,
                        c.certificate_ref ? `Ref ${c.certificate_ref}` : null,
                        c.recorded_by_name ? `by ${c.recorded_by_name}` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    {c.notes && <p className="text-[12.5px] text-white">{c.notes}</p>}
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t border-white/[0.1] pt-3" data-help="kit.movements">
              <h3 className="text-sm font-semibold text-white">Movements</h3>
              {events.length === 0 ? (
                <p className="mt-1 text-[13px] text-white">Not issued to anyone yet.</p>
              ) : (
                <ul className="mt-1 divide-y divide-white/[0.08]">
                  {events.map((e) => (
                    <li key={e.id} className="py-2.5">
                      <p className="text-[14px] font-medium text-white">{eventLine(e)}</p>
                      <p className="text-[12.5px] text-white">
                        {[fmtDate(e.created_at), e.actor_name ? `by ${e.actor_name}` : null]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                      {e.note && <p className="text-[12.5px] text-white">{e.note}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {tool.notes && (
              <div className="border-t border-white/[0.1] pt-3">
                <h3 className="text-sm font-semibold text-white">Earlier notes</h3>
                <p className="mt-1 whitespace-pre-line text-[13px] text-white">{tool.notes}</p>
              </div>
            )}
          </section>
        </div>
      </FormSheet>

      <IssueToolSheet tool={tool} open={issueOpen} onOpenChange={setIssueOpen} />

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="border border-white/[0.1] bg-[hsl(0_0%_8%)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Remove {tool.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              It comes off the register with its test history. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation border-white/[0.12] bg-white/[0.06] text-white">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await deleteTool.mutateAsync(tool.id);
                  onClose();
                } catch {
                  /* hook toasts */
                }
              }}
              className="h-11 touch-manipulation border border-red-500/30 bg-red-500/15 text-red-300 hover:bg-red-500/25"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
