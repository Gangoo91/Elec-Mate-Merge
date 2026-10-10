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
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeEmpty,
  CollegePageHeader,
} from '@/components/college/ui/CollegeUi';
import {
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
import { JoinedToggle, QuietTabs } from '@/components/college/otj/hoursUi';

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
        : 'Evidence';

const typeVerb = (type: WorkQueueItem['type']) =>
  type === 'grade' ? 'Grade' : type === 'ilp' ? 'Review' : type === 'gateway' ? 'Check' : 'Assess';

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const HELP: PageHelpContent = {
  id: 'college-work-queue',
  title: 'Work queue',
  what: 'The assessment jobs waiting on tutors: grades to record, learning plan reviews that are overdue, learners near gateway and evidence to assess. It reads like the inbox, longest waiting first.',
  steps: [
    {
      title: 'Start at the top',
      body: 'Anything past its due date, marked urgent or waiting a week or more is under Waiting too long, the same rule the inbox uses.',
    },
    {
      title: 'Open the item',
      body: 'The button says what to do: Grade, Review, Check or Assess. Evidence opens the submission itself; the others open the screen where the work is done.',
    },
    {
      title: 'Keep your own place',
      body: 'Mark items as started or done, or add a note, from the ... menu. That is your own record; the item leaves the queue when the work itself is done.',
    },
    {
      title: 'Many at once',
      body: 'Tick rows and Start or Complete them together. On a computer: j and k move, Enter opens, s starts, c completes, x ticks.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-500',
      label: 'Waiting too long',
      body: 'Past its due date, urgent, or waiting a week or more.',
    },
  ],
  notes: [
    {
      title: 'Whose work',
      body: 'The switch at the top picks Mine, My cohorts or Whole college for the whole College Hub.',
    },
    {
      title: 'The inbox',
      body: 'Off-the-job hours, messages, comments and progress reviews are in the inbox, not here.',
    },
  ],
};

export function WorkQueueSection({ onNavigate }: WorkQueueSectionProps) {
  const { items: allItems, isLoading, refresh } = useWorkQueue();
  const { stateMap, setStatus, saveNotes, staffId } = useWorkQueueState();
  const canPersist = !!staffId;
  const { toast } = useToast();
  const navigate = useNavigate();
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

  // The inbox's rule, so the two pages agree on what "waiting too long"
  // means: past its due date, marked urgent, or waiting a week or more.
  const isLate = (item: WorkQueueItem) =>
    getItemStatus(item) !== 'Completed' &&
    (isOverdue(item) || item.priority === 'Urgent' || (daysSince(item.createdAt) ?? 0) >= 7);

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

  const lateCount = items.filter(isLate).length;
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
        const oa = isLate(a) ? 0 : 1;
        const ob = isLate(b) ? 0 : 1;
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

  const urgentRows = sortedItems.filter(isLate);
  const otherRows = sortedItems.filter((i) => !urgentRows.includes(i));

  const renderRow = (item: WorkQueueItem) => {
    const currentStatus = getItemStatus(item);
    const overdue = isOverdue(item);
    const urgent = isLate(item);
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
                  // Outlined on every row: one solid yellow action per screen.
                  'hidden h-11 min-w-[96px] items-center justify-center rounded-xl border px-3 text-[13px] font-semibold text-white touch-manipulation sm:inline-flex',
                  overdue || urgent ? 'border-orange-400/60' : 'border-white/[0.18]'
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

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-8 sm:space-y-10">
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
              ? 'Grades, plan reviews, gateway checks and evidence to assess.'
              : `${lateCount ? `${lateCount} waiting too long. ` : ''}Grades, plan reviews, gateway checks and evidence to assess, longest waiting first. Hours, messages and progress reviews are in the inbox.`
          }
          help={HELP}
          actions={
            <>
              <ScopeToggle
                scope={scope}
                onChange={setScope}
                my={my}
                mineCount={mineItems.filter((i) => getItemStatus(i) !== 'Completed').length}
                allCount={allItems.filter((i) => getItemStatus(i) !== 'Completed').length}
              />
              <button
                type="button"
                onClick={() => navigate('/college/inbox')}
                className={COLLEGE_BTN}
              >
                Open the inbox
              </button>
            </>
          }
        />

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
          <div className="flex flex-col gap-2">
            {/* Status: a joined toggle (four choices). Kind: quiet text tabs. */}
            <JoinedToggle
              label="Filter by status"
              value={filterStatus}
              onChange={setFilterStatus}
              className="w-full sm:max-w-md"
              options={[
                { key: 'Pending', label: `Open ${countOfStatus('Pending')}` },
                { key: 'In Progress', label: `Started ${countOfStatus('In Progress')}` },
                { key: 'Completed', label: `Done ${countOfStatus('Completed')}` },
                { key: 'all', label: `All ${items.length}` },
              ]}
            />
            <QuietTabs
              label="Filter by kind"
              value={filterType}
              onChange={setFilterType}
              tabs={[
                { key: 'all', label: 'Every kind' },
                ...(['grade', 'ilp', 'gateway', 'portfolio'] as const).map((t) => ({
                  key: t,
                  label: typeLabel(t),
                  count: countOfType(t),
                })),
              ]}
            />
            <div className="hidden justify-end lg:flex">
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
                    ? 'Nothing is waiting for your learners. Pick Whole college at the top to see everyone’s.'
                    : 'Grades to record, overdue plan reviews, learners near gateway and evidence to assess land here.'
                  : filterStatus === 'Pending' && filterType === 'all' && !q
                    ? 'Nothing open: everything is started or done.'
                    : 'Try another status or kind, or clear the search.'
              }
            />
          ) : (
            <>
              {urgentRows.length > 0 && (
                <QueueGroup title="Waiting too long" urgent count={urgentRows.length}>
                  {urgentRows.map(renderRow)}
                </QueueGroup>
              )}
              {otherRows.length > 0 && (
                <QueueGroup
                  title={urgentRows.length ? 'Everything else' : 'To do'}
                  count={otherRows.length}
                >
                  {otherRows.map(renderRow)}
                </QueueGroup>
              )}
            </>
          )}
        </section>
      </div>

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
