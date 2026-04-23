import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useSubmissionQueue, SubmissionQueueItem } from '@/hooks/college/usePortfolioSubmissions';
import {
  SectionHeader,
  StatStrip,
  ListCard,
  Pill,
  EmptyState,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

interface PortfolioReviewQueueProps {
  onViewSubmission: (submissionId: string) => void;
  onStartReview?: (submissionId: string) => void;
}

const PortfolioReviewQueue: React.FC<PortfolioReviewQueueProps> = ({
  onViewSubmission,
  onStartReview,
}) => {
  const { submissions, stats, isLoading, refetch } = useSubmissionQueue();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      searchTerm === '' ||
      sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || sub.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityTone = (priority: string): Tone => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'amber';
      default:
        return 'green';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      default:
        return 'Low';
    }
  };

  const getStatusTone = (status: string): Tone => {
    switch (status) {
      case 'submitted':
        return 'blue';
      case 'under_review':
        return 'purple';
      case 'resubmitted':
        return 'amber';
      default:
        return 'yellow';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'New';
      case 'under_review':
        return 'Under Review';
      case 'resubmitted':
        return 'Resubmitted';
      default:
        return status;
    }
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatStrip
        columns={5}
        stats={[
          { value: stats.total, label: 'Total Queue' },
          { value: stats.highPriority, label: 'High Priority', tone: 'red' },
          { value: stats.mediumPriority, label: 'Medium', tone: 'amber' },
          { value: stats.lowPriority, label: 'Low', tone: 'green' },
          { value: `${stats.avgDaysWaiting}d`, label: 'Avg Wait' },
        ]}
      />

      {/* Header + Filters */}
      <div className="flex flex-col gap-4">
        <SectionHeader
          eyebrow="02 · Review"
          title="Review Queue"
          action="Refresh"
          onAction={() => refetch()}
        />
        <p className="text-[13px] text-white/55">Submissions awaiting assessor review</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search student or category…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/65 focus:border-elec-yellow/60 rounded-full px-4 touch-manipulation flex-1"
          />
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full sm:w-44 h-11 bg-[hsl(0_0%_9%)] border-white/[0.08] rounded-full text-[13px] text-white focus:border-elec-yellow/60">
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="high">High priority</SelectItem>
              <SelectItem value="medium">Medium priority</SelectItem>
              <SelectItem value="low">Low priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submission list */}
      {filteredSubmissions.length === 0 ? (
        <EmptyState
          title={
            submissions.length === 0
              ? 'No submissions awaiting review'
              : 'No submissions match your search'
          }
          description={
            submissions.length === 0
              ? 'All caught up. New submissions will appear here.'
              : 'Try adjusting your filters or search term.'
          }
        />
      ) : (
        <ListCard>
          {filteredSubmissions.map((submission) => (
            <button
              key={submission.id}
              onClick={() => onViewSubmission(submission.id)}
              className="group w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs font-semibold">
                  {getInitials(submission.studentName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm sm:text-[15px] font-medium text-white truncate">
                    {submission.studentName}
                  </div>
                  <Pill tone={getStatusTone(submission.status)} className="shrink-0">
                    {getStatusLabel(submission.status)}
                  </Pill>
                </div>
                <div className="mt-0.5 text-[11.5px] text-white/75 truncate">
                  {submission.categoryName} · {submission.qualificationTitle}
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                <div
                  className={cn(
                    'text-[13px] font-medium tabular-nums',
                    submission.daysAwaitingReview > 7
                      ? 'text-red-400'
                      : submission.daysAwaitingReview > 3
                        ? 'text-amber-400'
                        : 'text-white/70'
                  )}
                >
                  {submission.daysAwaitingReview}d wait
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">
                  Attempt #{submission.submissionCount}
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <Pill tone={getPriorityTone(submission.priority)}>
                  {getPriorityLabel(submission.priority)}
                </Pill>
                <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </div>
            </button>
          ))}
        </ListCard>
      )}
    </div>
  );
};

export default PortfolioReviewQueue;
