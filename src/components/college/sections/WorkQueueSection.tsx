import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useWorkQueue } from '@/hooks/college/useWorkQueue';
import type { WorkItemPriority, WorkItemStatus, WorkQueueItem } from '@/hooks/college/useWorkQueue';
import { useToast } from '@/hooks/use-toast';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WorkQueueCardSkeletonList } from '@/components/college/ui/WorkQueueCardSkeleton';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import {
  PageFrame,
  PeopleListRow,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  Pill,
  EmptyState,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface WorkQueueSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

export function WorkQueueSection({ onNavigate }: WorkQueueSectionProps) {
  const { items, isLoading, stats, refresh } = useWorkQueue();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [noteItemId, setNoteItemId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const handleRefresh = async () => {
    refresh();
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const [localStatus, setLocalStatus] = useState<Record<string, WorkItemStatus>>({});
  const getItemStatus = (item: WorkQueueItem) => localStatus[item.id] || item.status;
  const handleStartWork = (id: string) =>
    setLocalStatus((prev) => ({ ...prev, [id]: 'In Progress' }));
  const handleCompleteWork = (id: string) =>
    setLocalStatus((prev) => ({ ...prev, [id]: 'Completed' }));

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

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || getItemStatus(item) === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesPriority && matchesStatus && matchesType;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const priorityOrder: Record<WorkItemPriority, number> = { Urgent: 0, High: 1, Normal: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority])
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (a.dueDate && b.dueDate)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    return 0;
  });

  const priorityTone = (priority: WorkItemPriority): Tone =>
    priority === 'Urgent' ? 'red' : priority === 'High' ? 'amber' : 'blue';
  const statusTone = (status: WorkItemStatus): Tone =>
    status === 'Pending' ? 'amber' : status === 'In Progress' ? 'blue' : 'green';
  const typeLabel = (type: WorkQueueItem['type']) =>
    type === 'grade' ? 'Grade' : type === 'ilp' ? 'ILP' : type === 'gateway' ? 'Gateway' : 'Portfolio';

  const isOverdue = (dueDate?: string) => !!dueDate && new Date(dueDate) < new Date();

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Assessment · Work Queue"
            title="Review queue"
            description={`${stats.pending} item${stats.pending === 1 ? '' : 's'} awaiting action.`}
            tone="amber"
            actions={
              <button
                onClick={refresh}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Refresh →
              </button>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatStrip
            columns={4}
            stats={[
              {
                value: stats.pending,
                label: 'Pending',
                sub: 'Awaiting action',
                accent: stats.pending > 0,
              },
              { value: stats.urgent, label: 'Urgent', sub: 'Immediate', tone: 'red' },
              { value: stats.high, label: 'High', sub: 'Priority', tone: 'amber' },
              { value: stats.total, label: 'Total', sub: 'All items' },
            ]}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: items.length },
              { value: 'Urgent', label: 'Urgent', count: stats.urgent },
              { value: 'High', label: 'High', count: stats.high },
              { value: 'Normal', label: 'Normal' },
            ]}
            activeTab={filterPriority}
            onTabChange={setFilterPriority}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search work items…"
            actions={
              <>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                >
                  <option value="all">All Types</option>
                  <option value="grade">Grades</option>
                  <option value="ilp">ILP</option>
                  <option value="gateway">Gateway</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              </>
            }
          />
        </motion.div>

        {isLoading ? (
          <WorkQueueCardSkeletonList count={4} />
        ) : sortedItems.length === 0 ? (
          <EmptyState
            title="Queue is clear"
            description="No work items match your criteria. Your queue is empty or all items are filtered out."
          />
        ) : (
          <motion.div variants={itemVariants}>
            <ListCard>
              {sortedItems.map((item) => {
                const currentStatus = getItemStatus(item);
                const overdue = isOverdue(item.dueDate) && currentStatus !== 'Completed';
                const accent = overdue ? 'red' : item.priority === 'Urgent' ? 'amber' : 'none';
                const leadInitials = (item.studentName || '?')
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase();
                return (
                  <div key={item.id}>
                    <PeopleListRow
                      id={item.id}
                      accent={accent}
                      lead={{
                        kind: 'initials',
                        text: leadInitials,
                        tone: accent === 'none' ? 'yellow' : accent,
                      }}
                      title={item.title}
                      subtitle={
                        <>
                          <span className="uppercase tracking-[0.16em] text-white/50 text-[10px] mr-2">
                            {typeLabel(item.type)}
                          </span>
                          {item.studentName}
                        </>
                      }
                      titleChips={<Pill tone={priorityTone(item.priority)}>{item.priority}</Pill>}
                      status={{ label: currentStatus, tone: statusTone(currentStatus) }}
                      meta={
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/70">
                          <span className="tabular-nums">
                            Created{' '}
                            {new Date(item.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                          {item.dueDate && (
                            <span
                              className={cn('tabular-nums', overdue && 'text-red-400')}
                            >
                              Due{' '}
                              {new Date(item.dueDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                              {overdue && ' · overdue'}
                            </span>
                          )}
                          {currentStatus === 'Pending' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartWork(item.id);
                              }}
                              className="text-elec-yellow/90 hover:text-elec-yellow font-medium touch-manipulation"
                            >
                              Start work →
                            </button>
                          )}
                          {currentStatus === 'In Progress' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteWork(item.id);
                              }}
                              className="text-emerald-400 hover:text-emerald-300 font-medium touch-manipulation"
                            >
                              Mark complete →
                            </button>
                          )}
                        </div>
                      }
                      onOpen={() => handleViewDetails(item)}
                      actions={[
                        {
                          label: 'View details',
                          onClick: () => handleViewDetails(item),
                        },
                        ...(currentStatus === 'Pending'
                          ? [
                              {
                                label: 'Start work',
                                onClick: () => handleStartWork(item.id),
                                divider: true,
                              },
                            ]
                          : []),
                        ...(currentStatus === 'In Progress'
                          ? [
                              {
                                label: 'Mark complete',
                                onClick: () => handleCompleteWork(item.id),
                                variant: 'success' as const,
                                divider: true,
                              },
                            ]
                          : []),
                        {
                          label: 'Add note',
                          onClick: () => {
                            setNoteItemId(noteItemId === item.id ? null : item.id);
                            setNoteText('');
                          },
                          divider: true,
                        },
                      ]}
                    />
                    {noteItemId === item.id && (
                      <div className="px-4 sm:px-6 pb-4 -mt-1 flex items-center gap-2">
                        <Input
                          placeholder="Add a note…"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="h-11 touch-manipulation flex-1 bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow"
                        />
                        <button
                          onClick={() => {
                            toast({ title: 'Note added', description: noteText });
                            setNoteItemId(null);
                            setNoteText('');
                          }}
                          disabled={!noteText.trim()}
                          className="h-11 px-4 bg-elec-yellow text-black rounded-full text-[12.5px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </ListCard>
          </motion.div>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}
