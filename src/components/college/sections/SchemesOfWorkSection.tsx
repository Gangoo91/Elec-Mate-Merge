import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  Pill,
  itemVariants,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  useSchemesOfWork,
  SCHEME_STATUS_LABEL,
  type SchemeOfWorkRow,
  type SchemeStatus,
} from '@/hooks/college/useSchemesOfWork';
import { NewSchemeDialog } from '@/components/college/dialogs/NewSchemeDialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

const STATUS_TONE: Record<SchemeStatus, 'green' | 'amber' | 'yellow'> = {
  published: 'green',
  draft: 'amber',
  archived: 'yellow',
};

export function SchemesOfWorkSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { schemes, isLoading, error, refetch, update, remove, duplicate } = useSchemesOfWork();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<SchemeOfWorkRow | null>(null);
  const [deletingScheme, setDeletingScheme] = useState<SchemeOfWorkRow | null>(null);

  const cohortOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const s of schemes) {
      if (s.cohort_id && s.cohort_name) seen.set(s.cohort_id, s.cohort_name);
    }
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, [schemes]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return schemes.filter((s) => {
      const haystack =
        `${s.title} ${s.cohort_name ?? ''} ${s.qualification_title ?? ''} ${s.qualification_code}`.toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
      const matchesCohort = filterCohort === 'all' || s.cohort_id === filterCohort;
      return matchesSearch && matchesStatus && matchesCohort;
    });
  }, [schemes, searchQuery, filterStatus, filterCohort]);

  const counts = useMemo(() => {
    const c = { all: schemes.length, published: 0, draft: 0, archived: 0 } as Record<string, number>;
    for (const s of schemes) c[s.status] = (c[s.status] ?? 0) + 1;
    return c;
  }, [schemes]);

  const handleArchive = async (scheme: SchemeOfWorkRow) => {
    try {
      await update.mutateAsync({
        id: scheme.id,
        patch: { status: scheme.status === 'archived' ? 'published' : 'archived' },
      });
      toast({
        title: scheme.status === 'archived' ? 'Scheme reactivated' : 'Scheme archived',
        description: scheme.title,
      });
    } catch (e) {
      toast({
        title: 'Could not change status',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleDuplicate = async (scheme: SchemeOfWorkRow) => {
    try {
      await duplicate.mutateAsync(scheme.id);
      toast({ title: 'Scheme duplicated', description: `${scheme.title} (copy)` });
    } catch (e) {
      toast({
        title: 'Could not duplicate',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deletingScheme) return;
    const scheme = deletingScheme;
    try {
      await remove.mutateAsync(scheme.id);
      toast({ title: 'Scheme deleted', description: scheme.title });
      setDeletingScheme(null);
    } catch (e) {
      toast({
        title: 'Could not delete',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Schemes of Work"
          title="Scheme planning"
          description={
            isLoading
              ? 'Loading schemes…'
              : `${counts.published ?? 0} active scheme${(counts.published ?? 0) === 1 ? '' : 's'} of work across cohorts.`
          }
          tone="emerald"
          actions={
            <button
              onClick={() => {
                setEditingScheme(null);
                setDialogOpen(true);
              }}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              New scheme →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: counts.all },
            { value: 'published', label: 'Active', count: counts.published ?? 0 },
            { value: 'draft', label: 'Draft', count: counts.draft ?? 0 },
            { value: 'archived', label: 'Archived', count: counts.archived ?? 0 },
          ]}
          activeTab={filterStatus}
          onTabChange={setFilterStatus}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search schemes…"
          actions={
            <select
              value={filterCohort}
              onChange={(e) => setFilterCohort(e.target.value)}
              className="h-10 px-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            >
              <option value="all">All Cohorts</option>
              {cohortOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          }
        />
      </motion.div>

      {error ? (
        <EmptyState
          title="Could not load schemes"
          description={error.message}
          action="Retry"
          onAction={() => refetch()}
        />
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-44 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={schemes.length === 0 ? 'No schemes yet' : 'No matches'}
          description={
            schemes.length === 0
              ? 'Create your first scheme of work to plan how a qualification is delivered to a cohort across an academic year.'
              : 'Try adjusting your filters or search query.'
          }
          action={schemes.length === 0 ? 'Create scheme' : undefined}
          onAction={
            schemes.length === 0
              ? () => {
                  setEditingScheme(null);
                  setDialogOpen(true);
                }
              : undefined
          }
        />
      ) : (
        <motion.div variants={itemVariants} className="space-y-4">
          {filtered.map((scheme) => {
            const progress = computeProgress(scheme.start_date, scheme.end_date);
            return (
              <div
                key={scheme.id}
                className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
                      {scheme.qualification_title || scheme.qualification_code}
                      {scheme.cohort_name && ` · ${scheme.cohort_name}`}
                      {scheme.academic_year && ` · ${scheme.academic_year}`}
                    </div>
                    <h3 className="mt-1.5 text-lg sm:text-xl font-semibold text-white tracking-tight">
                      {scheme.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Pill tone={STATUS_TONE[scheme.status]}>{SCHEME_STATUS_LABEL[scheme.status]}</Pill>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-white hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                          aria-label="Options"
                        >
                          ⋯
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => navigate('/college?section=lessonplans')}
                        >
                          View lesson plans
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setEditingScheme(scheme);
                            setDialogOpen(true);
                          }}
                        >
                          Edit scheme
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => handleDuplicate(scheme)}
                        >
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => handleArchive(scheme)}
                        >
                          {scheme.status === 'archived' ? 'Reactivate' : 'Archive'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11 text-red-400 focus:text-red-300"
                          onClick={() => setDeletingScheme(scheme)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {progress.totalWeeks > 0 && (
                  <div className="mt-4">
                    <div className="flex items-baseline justify-between text-[11.5px]">
                      <span className="text-white/60 uppercase tracking-[0.12em]">
                        {progress.label}
                      </span>
                      <span className="font-medium text-white tabular-nums">
                        {progress.elapsedWeeks}/{progress.totalWeeks} wks · {progress.percent}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          progress.percent >= 100 ? 'bg-emerald-500/80' : 'bg-elec-yellow/80'
                        )}
                        style={{ width: `${Math.min(progress.percent, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-white/60">
                  {scheme.start_date && (
                    <span className="tabular-nums">
                      Starts{' '}
                      {new Date(scheme.start_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  {scheme.end_date && (
                    <span className="tabular-nums">
                      Ends{' '}
                      {new Date(scheme.end_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  <span>
                    Updated{' '}
                    {new Date(scheme.updated_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      <NewSchemeDialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) setEditingScheme(null);
        }}
        editing={editingScheme}
      />

      <ConfirmationDialog
        open={!!deletingScheme}
        onOpenChange={(v) => {
          if (!v) setDeletingScheme(null);
        }}
        title="Delete scheme of work?"
        description={
          deletingScheme
            ? `"${deletingScheme.title}" will be permanently removed. This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        loading={remove.isPending}
        onConfirm={handleDelete}
      />
    </PageFrame>
  );
}

interface ProgressInfo {
  totalWeeks: number;
  elapsedWeeks: number;
  percent: number;
  label: string;
}

function computeProgress(startDate: string | null, endDate: string | null): ProgressInfo {
  if (!startDate || !endDate) {
    return { totalWeeks: 0, elapsedWeeks: 0, percent: 0, label: 'Progress' };
  }
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();
  const totalDays = Math.max(0, Math.round((end - start) / 86400000));
  const totalWeeks = Math.max(1, Math.round(totalDays / 7));

  if (now < start) {
    const daysToStart = Math.round((start - now) / 86400000);
    return {
      totalWeeks,
      elapsedWeeks: 0,
      percent: 0,
      label: daysToStart === 1 ? 'Starts tomorrow' : `Starts in ${daysToStart} days`,
    };
  }

  const elapsedDays = Math.round((Math.min(now, end) - start) / 86400000);
  const elapsedWeeks = Math.min(totalWeeks, Math.max(0, Math.round(elapsedDays / 7)));
  const percent = Math.round((elapsedWeeks / totalWeeks) * 100);
  return {
    totalWeeks,
    elapsedWeeks,
    percent,
    label: now >= end ? 'Complete' : 'In progress',
  };
}
