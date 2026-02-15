import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useWorkQueue } from '@/hooks/college/useWorkQueue';
import type { WorkItemPriority, WorkItemStatus, WorkQueueItem } from '@/hooks/college/useWorkQueue';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  Search,
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MoreVertical,
  Filter,
  FolderOpen,
  ClipboardCheck,
  Calendar,
  Target,
  Award,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WorkQueueCardSkeletonList } from '@/components/college/ui/WorkQueueCardSkeleton';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';

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
  const { staggerContainer, staggerItem } = useHapticFeedback();

  const handleRefresh = async () => {
    refresh();
    // Wait for data to propagate
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  // Local state for work status (no backing table)
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
        onNavigate('epa');
        break;
      case 'portfolio':
        onNavigate('portfolio');
        break;
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || getItemStatus(item) === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;

    return matchesSearch && matchesPriority && matchesStatus && matchesType;
  });

  // Sort by priority then by due date
  const sortedItems = [...filteredItems].sort((a, b) => {
    const priorityOrder: Record<WorkItemPriority, number> = { Urgent: 0, High: 1, Normal: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  const getPriorityColor = (priority: WorkItemPriority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'High':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Normal':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-info/10 text-info border-info/20';
    }
  };

  const getStatusColor = (status: WorkItemStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'In Progress':
        return 'bg-info/10 text-info border-info/20';
      case 'Completed':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-info/10 text-info border-info/20';
    }
  };

  const getTypeIcon = (type: WorkQueueItem['type']) => {
    switch (type) {
      case 'grade':
        return <ClipboardCheck className="h-4 w-4" />;
      case 'ilp':
        return <Target className="h-4 w-4" />;
      case 'gateway':
        return <Award className="h-4 w-4" />;
      case 'portfolio':
        return <FolderOpen className="h-4 w-4" />;
      default:
        return <ClipboardCheck className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: WorkQueueItem['type']) => {
    switch (type) {
      case 'grade':
        return 'Grade';
      case 'ilp':
        return 'ILP Review';
      case 'gateway':
        return 'Gateway';
      case 'portfolio':
        return 'Portfolio';
      default:
        return type;
    }
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader title="Work Queue" description="Loading..." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 animate-pulse"
            />
          ))}
        </div>
        <WorkQueueCardSkeletonList count={4} />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader
          title="Work Queue"
          description={`${stats.pending} items awaiting action`}
          action={
            <Button
              variant="outline"
              size="sm"
              className="h-11 touch-manipulation"
              onClick={refresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          }
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-elec-yellow/10 border-elec-yellow/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Inbox className="h-4 w-4 text-elec-yellow" />
                <div>
                  <p className="text-lg font-bold text-foreground">{stats.pending}</p>
                  <p className="text-xs text-white">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elec-yellow/10 border-elec-yellow/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                <div>
                  <p className="text-lg font-bold text-foreground">{stats.urgent}</p>
                  <p className="text-xs text-white">Urgent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elec-yellow/10 border-elec-yellow/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                <div>
                  <p className="text-lg font-bold text-foreground">{stats.high}</p>
                  <p className="text-xs text-white">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elec-yellow/10 border-elec-yellow/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-elec-yellow" />
                <div>
                  <p className="text-lg font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-white">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:mx-0 md:px-0 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              placeholder="Search work items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn('h-11 touch-manipulation', !searchQuery && 'pl-9')}
            />
          </div>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full sm:w-[130px] h-11 touch-manipulation">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Priority
              </SelectItem>
              <SelectItem value="Urgent" className="h-11 touch-manipulation">
                Urgent
              </SelectItem>
              <SelectItem value="High" className="h-11 touch-manipulation">
                High
              </SelectItem>
              <SelectItem value="Normal" className="h-11 touch-manipulation">
                Normal
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Status
              </SelectItem>
              <SelectItem value="Pending" className="h-11 touch-manipulation">
                Pending
              </SelectItem>
              <SelectItem value="In Progress" className="h-11 touch-manipulation">
                In Progress
              </SelectItem>
              <SelectItem value="Completed" className="h-11 touch-manipulation">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Types
              </SelectItem>
              <SelectItem value="grade" className="h-11 touch-manipulation">
                Grades
              </SelectItem>
              <SelectItem value="ilp" className="h-11 touch-manipulation">
                ILP Reviews
              </SelectItem>
              <SelectItem value="gateway" className="h-11 touch-manipulation">
                Gateways
              </SelectItem>
              <SelectItem value="portfolio" className="h-11 touch-manipulation">
                Portfolios
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filter Chips */}
        {(filterPriority !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
          <div className="flex flex-wrap gap-2">
            {filterPriority !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterPriority('all')}
              >
                {filterPriority} <span className="ml-1">&times;</span>
              </Badge>
            )}
            {filterStatus !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterStatus('all')}
              >
                {filterStatus} <span className="ml-1">&times;</span>
              </Badge>
            )}
            {filterType !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterType('all')}
              >
                {filterType} <span className="ml-1">&times;</span>
              </Badge>
            )}
          </div>
        )}

        {/* Work Queue List */}
        <motion.div
          className="grid gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {sortedItems.map((item) => {
            const currentStatus = getItemStatus(item);
            return (
              <motion.div variants={staggerItem} key={item.id}>
                <SwipeableCard
                  leftActions={
                    currentStatus === 'Pending'
                      ? [
                          {
                            icon: <Clock className="h-5 w-5" />,
                            label: 'Start',
                            onClick: () => handleStartWork(item.id),
                            className: 'bg-info text-white',
                          },
                        ]
                      : currentStatus === 'In Progress'
                        ? [
                            {
                              icon: <CheckCircle2 className="h-5 w-5" />,
                              label: 'Complete',
                              onClick: () => handleCompleteWork(item.id),
                              className: 'bg-success text-white',
                            },
                          ]
                        : []
                  }
                  rightActions={[
                    {
                      icon: <Search className="h-5 w-5" />,
                      label: 'Details',
                      onClick: () => handleViewDetails(item),
                      className: 'bg-info text-white',
                    },
                  ]}
                >
                  <Card
                    className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 ${
                      currentStatus === 'Pending' && isOverdue(item.dueDate)
                        ? 'border-l-4 border-l-destructive'
                        : item.priority === 'Urgent'
                          ? 'border-l-4 border-l-warning'
                          : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                          {getTypeIcon(item.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{item.title}</h3>
                              <p className="text-sm text-white">{item.studentName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(currentStatus)}>
                                {currentStatus}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-11 w-11 touch-manipulation"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => handleViewDetails(item)}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  {currentStatus === 'Pending' && (
                                    <DropdownMenuItem
                                      className="h-11 touch-manipulation"
                                      onClick={() => handleStartWork(item.id)}
                                    >
                                      Start Work
                                    </DropdownMenuItem>
                                  )}
                                  {currentStatus === 'In Progress' && (
                                    <DropdownMenuItem
                                      className="h-11 touch-manipulation"
                                      onClick={() => handleCompleteWork(item.id)}
                                    >
                                      Mark Complete
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setNoteItemId(noteItemId === item.id ? null : item.id);
                                      setNoteText('');
                                    }}
                                  >
                                    Add Note
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white">
                            <Badge variant="secondary" className="text-xs capitalize">
                              {getTypeLabel(item.type)}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                Created:{' '}
                                {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            </div>
                            {item.dueDate && (
                              <div
                                className={`flex items-center gap-1 ${isOverdue(item.dueDate) ? 'text-destructive' : ''}`}
                              >
                                <Clock className="h-3.5 w-3.5" />
                                <span>
                                  Due:{' '}
                                  {new Date(item.dueDate).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </span>
                                {isOverdue(item.dueDate) && currentStatus !== 'Completed' && (
                                  <Badge
                                    variant="outline"
                                    className="bg-destructive/10 text-destructive text-xs ml-1"
                                  >
                                    Overdue
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Quick Actions */}
                          {currentStatus === 'Pending' && (
                            <div className="flex gap-2 mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-11 touch-manipulation"
                                onClick={() => handleStartWork(item.id)}
                              >
                                Start Work
                              </Button>
                            </div>
                          )}
                          {currentStatus === 'In Progress' && (
                            <div className="flex gap-2 mt-3">
                              <Button
                                size="sm"
                                className="text-xs h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                                onClick={() => handleCompleteWork(item.id)}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                Mark Complete
                              </Button>
                            </div>
                          )}
                          {noteItemId === item.id && (
                            <div className="flex gap-2 mt-3">
                              <Input
                                placeholder="Add a note..."
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="h-11 touch-manipulation flex-1"
                              />
                              <Button
                                size="sm"
                                className="h-11 touch-manipulation"
                                onClick={() => {
                                  toast({ title: 'Note added', description: noteText });
                                  setNoteItemId(null);
                                  setNoteText('');
                                }}
                                disabled={!noteText.trim()}
                              >
                                Save
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwipeableCard>
              </motion.div>
            );
          })}

          {sortedItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Inbox className="h-12 w-12 mx-auto text-white mb-3" />
                <p className="text-white">No work items found matching your criteria.</p>
                <p className="text-sm text-white mt-1">
                  Your queue is empty or all items are filtered out.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </PullToRefresh>
  );
}
