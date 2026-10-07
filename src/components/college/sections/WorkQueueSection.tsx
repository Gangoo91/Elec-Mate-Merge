/**
 * WorkQueueSection — everything waiting on a tutor, ranked.
 *
 * Redesigned 7 Oct 2026 on the College Hub kit. CollegeDashboard draws the
 * masthead and ground; this is the body:
 *
 *   header → figures → what the queue is made of → filters → the queue
 *
 * ELE-1889: rows are the College inbox row (initials, kind, "Yours", how
 * long it has waited, one verb), with tick boxes to Start or Complete many
 * at once and a desktop keyboard (j/k move, Enter opens, s start, c
 * complete, x tick). ELE-1886: "My learners" first.
 *
 * Data unchanged: useWorkQueue (grades, overdue ILP reviews, gateway,
 * portfolio) and the per-tutor state in useWorkQueueState.
 */
import { useMemo, useState } from 'react';
import { MoreHorizontal, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LINK,
  CollegeEmpty,
  CollegePageHeader,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import {
  Bars,
  BulkBar,
  KeyHint,
  QueueGroup,
  QueueRow,
  ScopeToggle,
  daysSince,
  useQueueKeys,
  useScope,
  useSelection,
  waitingLabel,
} from '@/components/college/assessment/AssessmentKit';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { useWorkQueue } from '@/hooks/college/useWorkQueue';
import type { WorkItemPriority, WorkItemStatus, WorkQueueItem } from '@/hooks/college/useWorkQueue';
import { useWorkQueueState, type WorkQueueSourceType } from '@/hooks/college/useWorkQueueState';
import { useToast } from '@/hooks/use-toast';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { SubmissionDrawerById } from '@/components/college/sheets/PortfolioSubmissionDrawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WorkQueueSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const typeLabel = (type: WorkQueueItem['type']) =>
  type === 'grade'
    ? 'Grade'
    : type === 'ilp'
      ? 'Plan review'
      : type === 'gateway'
        ? 'Gateway'
        : 'Portfolio';

const typeVerb = (type: WorkQueueItem['type']) =>
  type === 'grade' ? 'Grade' : type === 'ilp' ? 'Review' : type === 'gateway' ? 'Check' : 'Assess';

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const HELP: PageHelpContent = {
  id: 'college-work-queue',
  title: 'Work queue',
  what: 'The assessment jobs waiting on tutors: grades to record, learning plan reviews that are overdue, learners near gateway and portfolio work to assess. Ranked so the overdue and urgent ones come first.',
  steps: [
    {
      title: 'Start at the top',
      body: 'Overdue items are orange and come first, then urgent, then the oldest.',
    },
    {
      title: 'Open the item',
      body: 'Tap a row to go where the work is done: grading, learning plans, EPA or portfolios.',
    },
    {
      title: 'Keep your own place',
      body: 'Mark items as started or done, or add a note. That is your own record; the item leaves the queue when the work itself is done.',
    },
    {
      title: 'Many at once',
      body: 'Tick rows and Start or Complete them together. On a computer: j and k move, Enter opens, s starts, c completes, x ticks.',
    },
  ],
  legend: [
    { swatch: 'bg-orange-500', label: 'Overdue', body: 'Past its due date.' },
    { swatch: 'bg-elec-yellow', label: 'Urgent', body: 'Overdue learning plan reviews.' },
  ],
  notes: [
    {
      title: 'My learners or everyone',
      body: 'My learners is the cohorts you lead. Everyone is the whole college.',
    },
  ],
};

export function WorkQueueSection({ onNavigate }: WorkQueueSectionProps) {
  const { items: allItems, isLoading, refresh } = useWorkQueue();
  const { stateMap, setStatus, saveNotes, staffId } = useWorkQueueState();
  const canPersist = !!staffId;
  const { toast } = useToast();
  const my = useMyLearners();
  const [scope, setScope] = useScope('workqueue', my);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | WorkItemStatus>('Pending');
  const [filterType, setFilterType] = useState<'all' | WorkQueueItem['type']>('all');
  const [noteItemId, setNoteItemId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingItemId, setSavingItemId] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  // ELE-1863: a portfolio row opens the submission itself, decisions included.
  const [openSubmissionId, setOpenSubmissionId] = useState<string | null>(null);

  const isMineItem = (i: WorkQueueItem) =>
    my.isMine({ studentId: i.studentId, userId: i.studentId });
  const mineItems = useMemo(
    () => allItems.filter(isMineItem),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allItems, my.loading]
  );
  const items = scope === 'mine' ? mineItems : allItems;

  const handleRefresh = async () => {
    refresh();
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  // Per-tutor state on top of the source-derived 'Pending'. Key: `${type}:${sourceId}`.
  const getItemStatus = (item: WorkQueueItem): WorkItemStatus =>
    stateMap.get(`${item.type}:${item.sourceId}`)?.status ?? item.status;

  const isOverdue = (item: WorkQueueItem) =>
    !!item.dueDate &&
    new Date(item.dueDate).getTime() < Date.now() &&
    getItemStatus(item) !== 'Completed';

  const persistStatus = async (
    item: WorkQueueItem,
    status: 'In Progress' | 'Completed',
    quiet = false
  ) => {
    setSavingItemId(item.id);
    try {
      await setStatus.mutateAsync({
        sourceType: item.type as WorkQueueSourceType,
        sourceId: item.sourceId,
        status,
      });
      if (!quiet)
        toast({
          title: status === 'In Progress' ? 'Started' : 'Marked complete',
          description: item.title,
        });
      return true;
    } catch (e) {
      if (!quiet)
        toast({
          title: 'Could not update status',
          description: (e as Error).message,
          variant: 'destructive',
        });
      return false;
    } finally {
      setSavingItemId(null);
    }
  };

  const handleViewDetails = (item: WorkQueueItem) => {
    switch (item.type) {
      case 'grade':
        onNavigate('grading');
        break;
      case 'ilp':
        onNavigate('ilpmanagement');
        break;
      case 'gateway':
        onNavigate('epatracking');
        break;
      case 'portfolio':
        setOpenSubmissionId(item.sourceId);
        break;
    }
  };

  const overdueCount = items.filter(isOverdue).length;
  const urgentCount = items.filter(
    (i) => i.priority === 'Urgent' && getItemStatus(i) !== 'Completed'
  ).length;
  const highCount = items.filter((i) => i.priority === 'High').length;
  const inProgressCount = items.filter((i) => getItemStatus(i) === 'In Progress').length;
  const completedCount = items.filter((i) => getItemStatus(i) === 'Completed').length;
  const openCount = items.filter((i) => getItemStatus(i) === 'Pending').length;
  const countOfStatus = (s: WorkItemStatus) =>
    s === 'Pending' ? openCount : s === 'In Progress' ? inProgressCount : completedCount;
  const countOfType = (t: WorkQueueItem['type']) => items.filter((i) => i.type === t).length;

  const q = searchQuery.trim().toLowerCase();
  const sortedItems = useMemo(() => {
    const priorityOrder: Record<WorkItemPriority, number> = { Urgent: 0, High: 1, Normal: 2 };
    return items
      .filter((item) => {
        const matchesSearch =
          !q || item.title.toLowerCase().includes(q) || item.studentName.toLowerCase().includes(q);
        const matchesStatus = filterStatus === 'all' || getItemStatus(item) === filterStatus;
        const matchesType = filterType === 'all' || item.type === filterType;
        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        const oa = isOverdue(a) ? 0 : 1;
        const ob = isOverdue(b) ? 0 : 1;
        if (oa !== ob) return oa - ob;
        if (priorityOrder[a.priority] !== priorityOrder[b.priority])
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        if (a.dueDate && b.dueDate)
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, stateMap, q, filterStatus, filterType]);

  const keys = useMemo(() => sortedItems.map((i) => i.id), [sortedItems]);
  const sel = useSelection(keys);
  const byId = useMemo(() => new Map(sortedItems.map((i) => [i.id, i])), [sortedItems]);

  const bulk = async (status: 'In Progress' | 'Completed') => {
    const targets = Array.from(sel.selected)
      .map((k) => byId.get(k))
      .filter(
        (i): i is WorkQueueItem =>
          !!i && getItemStatus(i) !== status && getItemStatus(i) !== 'Completed'
      );
    if (targets.length === 0) return;
    setBulkBusy(true);
    let ok = 0;
    for (const t of targets) if (await persistStatus(t, status, true)) ok += 1;
    setBulkBusy(false);
    sel.clear();
    toast({
      title: `${status === 'In Progress' ? 'Started' : 'Completed'} ${ok}${ok < targets.length ? ` of ${targets.length}` : ''}`,
      variant: ok < targets.length ? 'destructive' : undefined,
    });
  };

  const kb = useQueueKeys({
    keys,
    onOpen: (k) => {
      const it = byId.get(k);
      if (it) handleViewDetails(it);
    },
    onToggle: canPersist ? (k) => sel.toggle(k) : undefined,
    onClear: () => sel.clear(),
    extra: canPersist
      ? {
          s: (k) => {
            const it = byId.get(k);
            if (it && getItemStatus(it) === 'Pending') void persistStatus(it, 'In Progress');
          },
          c: (k) => {
            const it = byId.get(k);
            if (it && getItemStatus(it) !== 'Completed') void persistStatus(it, 'Completed');
          },
        }
      : undefined,
  });

  const urgentRows = sortedItems.filter(
    (i) => isOverdue(i) || (i.priority === 'Urgent' && getItemStatus(i) !== 'Completed')
  );
  const otherRows = sortedItems.filter((i) => !urgentRows.includes(i));

  const renderRow = (item: WorkQueueItem) => {
    const currentStatus = getItemStatus(item);
    const overdue = isOverdue(item);
    const urgent = item.priority === 'Urgent' && currentStatus !== 'Completed';
    const noteOpen = noteItemId === item.id;
    const saving = savingItemId === item.id;
    const note = stateMap.get(`${item.type}:${item.sourceId}`)?.notes;
    return (
      <li key={item.id} data-qkey={item.id}>
        <QueueRow
          name={item.studentName}
          kind={typeLabel(item.type)}
          mine={scope === 'all' && isMineItem(item)}
          title={item.title}
          body={
            [
              item.dueDate ? `${overdue ? 'Was due' : 'Due'} ${shortDate(item.dueDate)}` : null,
              item.priority !== 'Normal' ? item.priority : null,
              currentStatus !== 'Pending'
                ? currentStatus === 'In Progress'
                  ? 'Started'
                  : 'Done'
                : null,
            ]
              .filter(Boolean)
              .join(' · ') || undefined
          }
          meta={
            <>
              <b className="font-semibold">
                {overdue ? 'Overdue' : waitingLabel(daysSince(item.createdAt))}
              </b>
              {note ? ` · Note: ${note}` : ''}
            </>
          }
          urgent={overdue || urgent}
          onOpen={() => handleViewDetails(item)}
          selectable={canPersist}
          selected={sel.has(item.id)}
          onToggle={() => sel.toggle(item.id)}
          focused={kb.focus === item.id}
          trailing={
            <span className="flex shrink-0 items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => handleViewDetails(item)}
                className={cn(
                  'hidden h-11 min-w-[96px] items-center justify-center rounded-xl px-3 text-[13px] font-bold touch-manipulation sm:inline-flex',
                  overdue || urgent
                    ? 'bg-elec-yellow text-black'
                    : 'border border-white/[0.18] text-white'
                )}
              >
                {typeVerb(item.type)}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="More actions"
                    disabled={saving}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
                  >
                    <MoreHorizontal className="h-4 w-4" aria-hidden />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="h-11" onClick={() => handleViewDetails(item)}>
                    View details
                  </DropdownMenuItem>
                  {canPersist && (
                    <>
                      <DropdownMenuSeparator />
                      {currentStatus === 'Pending' && (
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => persistStatus(item, 'In Progress')}
                        >
                          Start work
                        </DropdownMenuItem>
                      )}
                      {currentStatus === 'In Progress' && (
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => persistStatus(item, 'Completed')}
                        >
                          Mark complete
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="h-11"
                        onClick={() => {
                          setNoteItemId(noteOpen ? null : item.id);
                          setNoteText(noteOpen ? '' : (note ?? ''));
                        }}
                      >
                        {noteOpen ? 'Close note' : 'Add note'}
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          }
        />
        {noteOpen && (
          <div className="flex items-end gap-3 px-4 pb-4 sm:px-5">
            <input
              type="text"
              placeholder="Add a note"
              aria-label="Note"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              autoFocus
              inputMode="text"
              autoCapitalize="sentences"
              ref={(el) => {
                if (el)
                  setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50);
              }}
              className="input-underline h-11 min-w-0 flex-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
            />
            <button
              type="button"
              disabled={!noteText.trim() || saveNotes.isPending}
              onClick={async () => {
                try {
                  await saveNotes.mutateAsync({
                    sourceType: item.type as WorkQueueSourceType,
                    sourceId: item.sourceId,
                    notes: noteText,
                  });
                  toast({ title: 'Note saved' });
                  setNoteItemId(null);
                  setNoteText('');
                } catch (e) {
                  toast({
                    title: 'Could not save note',
                    description: (e as Error).message,
                    variant: 'destructive',
                  });
                }
              }}
              className={COLLEGE_BTN_PRIMARY}
            >
              {saveNotes.isPending ? 'Saving…' : 'Save note'}
            </button>
          </div>
        )}
      </li>
    );
  };

  const typeRows = (['grade', 'ilp', 'gateway', 'portfolio'] as const).map((t) => ({
    key: t,
    label: typeLabel(t),
    n: items.filter((i) => i.type === t && getItemStatus(i) !== 'Completed').length,
    cls: t === 'ilp' ? 'bg-elec-yellow' : 'bg-white',
  }));
  const ageRows = (() => {
    const open = items
      .filter((i) => getItemStatus(i) !== 'Completed')
      .map((i) => daysSince(i.createdAt) ?? 0);
    return [
      { label: 'Under a week', n: open.filter((d) => d < 7).length, cls: 'bg-emerald-500' },
      { label: '1 to 4 weeks', n: open.filter((d) => d >= 7 && d < 28).length, cls: 'bg-white' },
      { label: 'Over 4 weeks', n: open.filter((d) => d >= 28).length, cls: 'bg-orange-500' },
    ];
  })();

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Assessment"
        title={
          isLoading
            ? 'Gathering the queue…'
            : openCount + inProgressCount === 0
              ? 'Nothing in the queue'
              : `${openCount + inProgressCount} ${openCount + inProgressCount === 1 ? 'job' : 'jobs'} waiting`
        }
        description={
          isLoading
            ? 'Grades, plan reviews, gateway checks and portfolio work.'
            : `${overdueCount ? `${overdueCount} overdue. ` : ''}Grades, plan reviews, gateway checks and portfolio work, overdue and urgent first.`
        }
        help={HELP}
        actions={
          <>
            <ScopeToggle
              scope={scope}
              onChange={setScope}
              my={my}
              mineCount={mineItems.length}
              allCount={allItems.length}
            />
            <button type="button" onClick={refresh} className={COLLEGE_LINK}>
              Refresh
            </button>
          </>
        }
      />

      <CollegeStats
        items={[
          {
            label: 'Urgent',
            value: String(urgentCount),
            sub: urgentCount
              ? 'Overdue plan reviews: do these first'
              : highCount
                ? `${highCount} high priority`
                : 'Nothing urgent',
            warn: urgentCount > 0,
            onClick: () => {
              setFilterStatus('Pending');
              setFilterType('ilp');
            },
          },
          {
            label: 'Overdue',
            value: String(overdueCount),
            sub: overdueCount ? 'Past their due date' : 'Nothing past due',
            warn: overdueCount > 0,
          },
          {
            label: 'Started',
            value: String(inProgressCount),
            sub: inProgressCount ? 'Started, not finished' : 'Nothing started',
            onClick: () => setFilterStatus('In Progress'),
          },
          {
            label: 'Done',
            value: String(completedCount),
            sub: canPersist ? 'Marked complete by you' : 'Sign in as staff to track',
            good: completedCount > 0,
            onClick: () => setFilterStatus('Completed'),
          },
        ]}
      />

      {!isLoading && items.length > 0 && (
        <section className={cn(COLLEGE_CARD, 'grid gap-6 lg:grid-cols-2')}>
          <div className="min-w-0">
            <p className="mb-3 text-[13px] font-semibold text-white">Open jobs by kind</p>
            <Bars
              rows={typeRows}
              onPick={(k) => {
                setFilterType(k as WorkQueueItem['type']);
                setFilterStatus('all');
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="mb-3 text-[13px] font-semibold text-white">
              How long open jobs have waited
            </p>
            <Bars rows={ageRows} />
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a learner or job"
            aria-label="Search the queue"
            className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
          />
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {(
              [
                ['Pending', 'Open'],
                ['In Progress', 'Started'],
                ['Completed', 'Done'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilterStatus(value)}
                className={chipCn(filterStatus === value)}
              >
                {label} {countOfStatus(value)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={chipCn(filterStatus === 'all')}
            >
              All {items.length}
            </button>
            <span className="mx-1 hidden w-px self-stretch bg-white/[0.12] sm:block" aria-hidden />
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={chipCn(filterType === 'all')}
            >
              Every kind
            </button>
            {(['grade', 'ilp', 'gateway', 'portfolio'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={chipCn(filterType === t)}
              >
                {typeLabel(t)} {countOfType(t)}
              </button>
            ))}
          </div>
          <div className="shrink-0">
            <KeyHint
              items={[
                ['j k', 'move'],
                ['s', 'start'],
                ['c', 'complete'],
                ['x', 'tick'],
              ]}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-white/[0.04]" />
            ))}
          </div>
        ) : sortedItems.length === 0 ? (
          <CollegeEmpty
            title={items.length === 0 ? 'The queue is clear' : 'Nothing matches this view'}
            body={
              items.length === 0
                ? scope === 'mine'
                  ? 'Nothing is waiting for your learners. Switch to Everyone to see the whole college.'
                  : 'Grades to record, overdue plan reviews, learners near gateway and portfolio work land here.'
                : filterStatus === 'Pending' && filterType === 'all' && !q
                  ? 'Nothing open: everything is started or done.'
                  : 'Try another status or kind, or clear the search.'
            }
          />
        ) : (
          <>
            {urgentRows.length > 0 && (
              <QueueGroup title="Overdue and urgent" urgent count={urgentRows.length}>
                {urgentRows.map(renderRow)}
              </QueueGroup>
            )}
            {otherRows.length > 0 && (
              <QueueGroup
                title={urgentRows.length ? 'Everything else' : 'The queue'}
                count={otherRows.length}
              >
                {otherRows.map(renderRow)}
              </QueueGroup>
            )}
          </>
        )}
      </section>

      <BulkBar count={sel.count} onClear={sel.clear}>
        <button
          type="button"
          onClick={() => void bulk('In Progress')}
          disabled={bulkBusy}
          className={COLLEGE_BTN}
        >
          Start
        </button>
        <button
          type="button"
          onClick={() => void bulk('Completed')}
          disabled={bulkBusy}
          className={COLLEGE_BTN_PRIMARY}
        >
          {bulkBusy ? 'Saving…' : `Complete ${sel.count}`}
        </button>
      </BulkBar>

      <SubmissionDrawerById
        submissionId={openSubmissionId}
        onOpenChange={(o) => {
          if (!o) setOpenSubmissionId(null);
        }}
        onChanged={refresh}
      />
    </PullToRefresh>
  );
}
