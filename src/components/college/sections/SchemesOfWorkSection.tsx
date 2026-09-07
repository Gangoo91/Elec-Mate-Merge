import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  containerVariants,
  itemVariants,
  EmptyState,
  LoadingState,
} from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
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

/**
 * Schemes of work — how a qualification is delivered to a cohort across an
 * academic year. Renders CONTENT ONLY under the CollegeDashboard masthead:
 * KPI row → one solid volt "New scheme" → filters → work-list rows. Each row
 * opens the editor; the overflow menu carries the rest (lesson plans,
 * duplicate, archive, delete).
 */

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[12.5px] font-medium transition-colors touch-manipulation';
const CHIP_ON = 'border-white bg-white text-black';
const CHIP_OFF = 'border-white/[0.14] text-white hover:bg-white/[0.06]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const SELECT =
  'input-underline h-11 w-full appearance-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation sm:w-64';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation hover:brightness-105 active:scale-[0.98] sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

const STATUS_ORDER: SchemeStatus[] = ['published', 'draft', 'archived'];

function fmtDate(iso: string, withYear = false): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

export function SchemesOfWorkSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { schemes, isLoading, error, refetch, update, remove, duplicate } = useSchemesOfWork();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<SchemeStatus | 'all'>('all');
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
    const c: Record<SchemeStatus, number> = { published: 0, draft: 0, archived: 0 };
    for (const s of schemes) c[s.status] = (c[s.status] ?? 0) + 1;
    return c;
  }, [schemes]);

  const inProgress = useMemo(
    () =>
      schemes.filter(
        (s) => s.status === 'published' && computeProgress(s.start_date, s.end_date).phase === 'running'
      ).length,
    [schemes]
  );

  const openCreate = () => {
    setEditingScheme(null);
    setDialogOpen(true);
  };
  const openEdit = (scheme: SchemeOfWorkRow) => {
    setEditingScheme(scheme);
    setDialogOpen(true);
  };

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
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {!isLoading && !error && schemes.length > 0 && (
          <HubKpiRow>
            <HubKpi
              accent
              label="Active schemes"
              value={String(counts.published)}
              verdict={
                inProgress > 0
                  ? `${inProgress} running right now`
                  : counts.published > 0
                    ? 'None in their delivery window today'
                    : 'Nothing active'
              }
            />
            <HubKpi
              label="Drafts"
              value={String(counts.draft)}
              verdict={counts.draft > 0 ? 'Finish and set active' : 'No drafts waiting'}
            />
            <HubKpi
              label="Cohorts covered"
              value={String(cohortOptions.length)}
              verdict="With at least one scheme"
            />
          </HubKpiRow>
        )}

        <motion.div variants={itemVariants}>
          <button type="button" onClick={openCreate} className={PRIMARY}>
            New scheme
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Schemes</HubSectionHeading>
          {!isLoading && !error && (
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {filtered.length === schemes.length
                ? `${schemes.length}`
                : `${filtered.length} of ${schemes.length}`}
            </span>
          )}
        </motion.div>

        {schemes.length > 0 && (
          <>
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes"
                aria-label="Search schemes"
                className={SEARCH}
              />
              {cohortOptions.length > 1 && (
                <select
                  value={filterCohort}
                  onChange={(e) => setFilterCohort(e.target.value)}
                  aria-label="Filter by cohort"
                  className={SELECT}
                >
                  <option value="all">All cohorts</option>
                  {cohortOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0"
            >
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={cn(CHIP, filterStatus === 'all' ? CHIP_ON : CHIP_OFF)}
              >
                All
                <span className="text-[11px] tabular-nums opacity-70">{schemes.length}</span>
              </button>
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilterStatus(s)}
                  className={cn(CHIP, filterStatus === s ? CHIP_ON : CHIP_OFF)}
                >
                  {SCHEME_STATUS_LABEL[s]}
                  <span className="text-[11px] tabular-nums opacity-70">{counts[s]}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}

        {error ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="Could not load schemes"
              description={error.message}
              action="Retry"
              onAction={() => refetch()}
            />
          </motion.div>
        ) : isLoading ? (
          <LoadingState />
        ) : schemes.length === 0 ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="No schemes yet"
              description="A scheme of work plans how a qualification is delivered to a cohort across the year. Create the first one above."
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className={LIST_CARD}>
            {filtered.length === 0 ? (
              <p className="px-4 py-5 text-[12.5px] text-white sm:px-5">
                Nothing matches — clear the search or filters.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {filtered.map((scheme) => {
                  const progress = computeProgress(scheme.start_date, scheme.end_date);
                  const reason = [
                    scheme.qualification_title || scheme.qualification_code,
                    scheme.cohort_name,
                    scheme.academic_year,
                    progress.label,
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  const trailing =
                    scheme.status === 'published' && progress.totalWeeks > 0
                      ? `${progress.elapsedWeeks}/${progress.totalWeeks} wks`
                      : SCHEME_STATUS_LABEL[scheme.status];
                  return (
                    <li key={scheme.id} className="flex items-center gap-1 pr-2 sm:pr-3">
                      <button
                        type="button"
                        onClick={() => openEdit(scheme)}
                        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-8 w-[3px] shrink-0 rounded-full',
                            scheme.status === 'published' && progress.phase === 'running'
                              ? 'bg-elec-yellow'
                              : 'bg-white/[0.25]'
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                            {scheme.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                            {reason}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'shrink-0 text-[13px] font-semibold tabular-nums',
                            scheme.status === 'published' && progress.phase === 'running'
                              ? 'text-elec-yellow'
                              : 'text-white'
                          )}
                        >
                          {trailing}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label={`Options for ${scheme.title}`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                          >
                            <span className="text-[18px] leading-none">⋯</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => navigate('/college?section=lessonplans')}
                          >
                            View lesson plans
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => openEdit(scheme)}
                          >
                            Edit scheme
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => handleDuplicate(scheme)}
                          >
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => handleArchive(scheme)}
                          >
                            {scheme.status === 'archived' ? 'Reactivate' : 'Archive'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="h-11 touch-manipulation text-red-400 focus:text-red-300"
                            onClick={() => setDeletingScheme(scheme)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </motion.section>

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
    </>
  );
}

interface ProgressInfo {
  totalWeeks: number;
  elapsedWeeks: number;
  percent: number;
  label: string;
  phase: 'undated' | 'upcoming' | 'running' | 'complete';
}

function computeProgress(startDate: string | null, endDate: string | null): ProgressInfo {
  if (!startDate || !endDate) {
    return { totalWeeks: 0, elapsedWeeks: 0, percent: 0, label: 'No dates set', phase: 'undated' };
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
      phase: 'upcoming',
    };
  }

  const elapsedDays = Math.round((Math.min(now, end) - start) / 86400000);
  const elapsedWeeks = Math.min(totalWeeks, Math.max(0, Math.round(elapsedDays / 7)));
  const percent = Math.round((elapsedWeeks / totalWeeks) * 100);
  const complete = now >= end;
  return {
    totalWeeks,
    elapsedWeeks,
    percent,
    label: complete
      ? `Ended ${fmtDate(endDate, true)}`
      : `${fmtDate(startDate)} – ${fmtDate(endDate, true)}`,
    phase: complete ? 'complete' : 'running',
  };
}
