/**
 * WorkQueueSection — everything waiting on a tutor, ranked.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → filters → the queue
 *
 * What went: the PageHero, the amber StatStrip, two `bg-[hsl(0_0%_9%)]`
 * selects, and a solid volt "Start work" pill on EVERY pending row — a page
 * of twelve items had twelve maximum-emphasis buttons on it. The row is now
 * the action (it opens the item's home section) and Start / Complete / Note
 * live in the row's menu. Colour encodes state only: red for overdue, a volt
 * rule for Urgent.
 *
 * The hub's card already shows the queue total, so this row carries what the
 * total hides — how many are urgent, how many are past their due date, and
 * how many are already started or done (per-tutor state from
 * `useWorkQueueState`).
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useWorkQueue } from '@/hooks/college/useWorkQueue';
import type { WorkItemPriority, WorkItemStatus, WorkQueueItem } from '@/hooks/college/useWorkQueue';
import { useWorkQueueState, type WorkQueueSourceType } from '@/hooks/college/useWorkQueueState';
import { useToast } from '@/hooks/use-toast';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
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

const DAY_MS = 86_400_000;

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

const typeLabel = (type: WorkQueueItem['type']) =>
  type === 'grade' ? 'Grade' : type === 'ilp' ? 'ILP' : type === 'gateway' ? 'Gateway' : 'Portfolio';

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function WorkQueueSection({ onNavigate }: WorkQueueSectionProps) {
  const { items, isLoading, stats, refresh } = useWorkQueue();
  const { stateMap, setStatus, saveNotes, staffId } = useWorkQueueState();
  const canPersist = !!staffId;
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | WorkItemStatus>('Pending');
  const [filterType, setFilterType] = useState<'all' | WorkQueueItem['type']>('all');
  const [noteItemId, setNoteItemId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingItemId, setSavingItemId] = useState<string | null>(null);

  const handleRefresh = async () => {
    refresh();
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  // Merge persisted per-tutor state on top of the source-derived 'Pending'.
  // Composite key matches what useWorkQueueState builds: `${type}:${sourceId}`.
  const getItemStatus = (item: WorkQueueItem): WorkItemStatus =>
    stateMap.get(`${item.type}:${item.sourceId}`)?.status ?? item.status;

  const isOverdue = (item: WorkQueueItem) =>
    !!item.dueDate && new Date(item.dueDate).getTime() < Date.now() && getItemStatus(item) !== 'Completed';

  const persistStatus = async (item: WorkQueueItem, status: 'In Progress' | 'Completed') => {
    setSavingItemId(item.id);
    try {
      await setStatus.mutateAsync({
        sourceType: item.type as WorkQueueSourceType,
        sourceId: item.sourceId,
        status,
      });
      toast({ title: status === 'In Progress' ? 'Started' : 'Marked complete', description: item.title });
    } catch (e) {
      toast({ title: 'Could not update status', description: (e as Error).message, variant: 'destructive' });
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
        onNavigate('portfolio');
        break;
    }
  };

  const overdueCount = items.filter(isOverdue).length;
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
        if (a.dueDate && b.dueDate) return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, stateMap, q, filterStatus, filterType]);

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      {/* The hub card shows the total; this row shows what the total hides. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Urgent"
          value={String(stats.urgent)}
          verdict={stats.urgent > 0 ? 'Overdue ILP reviews — do these first' : 'Nothing urgent'}
          context={stats.high > 0 ? `${stats.high} high priority` : undefined}
          sentiment={stats.urgent > 0 ? 'bad' : 'neutral'}
          onClick={() => {
            setFilterStatus('Pending');
            setFilterType('ilp');
          }}
        />
        <HubKpi
          label="Overdue"
          value={String(overdueCount)}
          verdict={overdueCount > 0 ? 'Past their due date' : 'Nothing past due'}
          sentiment={overdueCount > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="In progress"
          value={String(inProgressCount)}
          verdict={inProgressCount > 0 ? 'Started, not yet finished' : 'Nothing started'}
          onClick={() => setFilterStatus('In Progress')}
        />
        <HubKpi
          label="Done"
          value={String(completedCount)}
          verdict={completedCount > 0 ? 'Marked complete by you' : 'Nothing marked complete yet'}
          context={!canPersist ? 'Sign in as staff to track progress' : undefined}
          onClick={() => setFilterStatus('Completed')}
        />
      </HubKpiRow>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Queue</HubSectionHeading>
          <button
            type="button"
            onClick={refresh}
            className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
          >
            Refresh
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by item or learner"
            aria-label="Search the queue"
            className="h-11 w-full border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {(
              [
                ['Pending', 'Open'],
                ['In Progress', 'In progress'],
                ['Completed', 'Done'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilterStatus(value)}
                className={chipCn(filterStatus === value)}
              >
                {label} · {countOfStatus(value)}
              </button>
            ))}
            <button type="button" onClick={() => setFilterStatus('all')} className={chipCn(filterStatus === 'all')}>
              All · {items.length}
            </button>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" onClick={() => setFilterType('all')} className={chipCn(filterType === 'all')}>
              All types
            </button>
            {(['grade', 'ilp', 'gateway', 'portfolio'] as const).map((t) => (
              <button key={t} type="button" onClick={() => setFilterType(t)} className={chipCn(filterType === t)}>
                {typeLabel(t)} · {countOfType(t)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : sortedItems.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">
              {items.length === 0
                ? 'Queue is clear — nothing waiting on you.'
                : filterStatus === 'Pending' && filterType === 'all' && !q
                  ? 'Nothing open — everything is started or done.'
                  : 'Nothing matches these filters.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {sortedItems.map((item) => {
                const currentStatus = getItemStatus(item);
                const overdue = isOverdue(item);
                const urgent = item.priority === 'Urgent' && currentStatus !== 'Completed';
                const age = Math.max(0, Math.floor((Date.now() - new Date(item.createdAt).getTime()) / DAY_MS));
                const reason = [
                  typeLabel(item.type),
                  item.studentName,
                  item.dueDate ? `${overdue ? 'was due' : 'due'} ${shortDate(item.dueDate)}` : null,
                  currentStatus !== 'Pending' ? currentStatus : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                const noteOpen = noteItemId === item.id;
                const saving = savingItemId === item.id;

                return (
                  <li key={item.id}>
                    <div className="flex items-stretch">
                      <button
                        type="button"
                        onClick={() => handleViewDetails(item)}
                        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-8 w-[3px] shrink-0 rounded-full',
                            overdue ? 'bg-red-400' : urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                            {reason}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'shrink-0 text-[12px] font-semibold tabular-nums',
                            overdue ? 'text-red-300' : urgent ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          {overdue ? 'Overdue' : item.priority === 'Normal' ? `${age}d` : item.priority}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                      </button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label="More actions"
                            disabled={saving}
                            className="flex h-11 w-11 shrink-0 items-center justify-center self-center text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
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
                                <DropdownMenuItem className="h-11" onClick={() => persistStatus(item, 'In Progress')}>
                                  Start work
                                </DropdownMenuItem>
                              )}
                              {currentStatus === 'In Progress' && (
                                <DropdownMenuItem className="h-11" onClick={() => persistStatus(item, 'Completed')}>
                                  Mark complete
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => {
                                  const existing = stateMap.get(`${item.type}:${item.sourceId}`);
                                  setNoteItemId(noteOpen ? null : item.id);
                                  setNoteText(noteOpen ? '' : (existing?.notes ?? ''));
                                }}
                              >
                                {noteOpen ? 'Close note' : 'Add note'}
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

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
                            // Scroll into view so the mobile keyboard doesn't
                            // hide the input when it slides up from the bottom.
                            if (el) {
                              setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50);
                            }
                          }}
                          className="h-11 min-w-0 flex-1 border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
                        />
                        {/* The one solid volt control on this screen, and only
                            while a note is open. */}
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
                          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white disabled:opacity-60"
                        >
                          {saveNotes.isPending ? 'Saving…' : 'Save note'}
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>
    </PullToRefresh>
  );
}
