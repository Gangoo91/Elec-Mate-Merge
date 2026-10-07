import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { itemVariants, LoadingState } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { TeachingScreen } from '@/components/college/teaching/TeachingKit';
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

const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const SELECT =
  'input-underline h-11 w-full appearance-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const HELP: PageHelpContent = {
  id: 'college-schemes-of-work',
  title: 'Schemes of work',
  what: 'A scheme of work spreads a qualification across the year for one cohort: which unit is taught in which week. Inspectors and quality reviews ask to see one for every group.',
  steps: [
    { title: 'Create a scheme', body: 'Pick the qualification, the cohort and the start and end dates.' },
    { title: 'Plan the weeks', body: 'Open the scheme and set out what is taught each week. Link lessons to it as you plan them.' },
    { title: 'Set it active', body: 'An active scheme shows how far through the year the cohort is. Archive it when the year ends.' },
  ],
  notes: [
    { title: 'Drafts', body: 'A draft is not shown as a cohort\'s plan yet. Set it active once the weeks are planned.' },
  ],
  legend: [{ swatch: 'bg-elec-yellow', label: 'Yellow bar', body: 'how far through its dates the scheme is today' }],
};

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
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Curriculum"
        title="Schemes of work"
        description="How each qualification is delivered to a cohort across the year."
        help={HELP}
        actions={
          <button type="button" onClick={openCreate} className={COLLEGE_BTN_PRIMARY}>
            New scheme
          </button>
        }
      />

      {!isLoading && !error && schemes.length > 0 && (
        <CollegeStats
          items={[
            {
              label: 'Active schemes',
              value: String(counts.published),
              sub: inProgress > 0 ? `${inProgress} running now` : counts.published > 0 ? 'none in their dates today' : 'nothing active',
              onClick: () => setFilterStatus('published'),
            },
            { label: 'Drafts', value: String(counts.draft), sub: counts.draft > 0 ? 'finish and set active' : 'no drafts waiting', warn: counts.draft > 0, onClick: () => setFilterStatus('draft') },
            { label: 'Cohorts covered', value: String(cohortOptions.length), sub: 'with at least one scheme' },
            { label: 'Archived', value: String(counts.archived), sub: 'past years', onClick: () => setFilterStatus('archived') },
          ]}
        />
      )}

      <section className="space-y-4">
        <CollegeSectionTitle
          title="Schemes"
          sub={!isLoading && !error ? (filtered.length === schemes.length ? `${schemes.length} on file` : `${filtered.length} of ${schemes.length}`) : undefined}
        />

        {schemes.length > 0 && (
          <>
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
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

            <motion.div variants={itemVariants} className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
              <button type="button" onClick={() => setFilterStatus('all')} className={chipCn(filterStatus === 'all')}>
                All · {schemes.length}
              </button>
              {STATUS_ORDER.map((s) => (
                <button key={s} type="button" onClick={() => setFilterStatus(s)} className={chipCn(filterStatus === s)}>
                  {SCHEME_STATUS_LABEL[s]} · {counts[s]}
                </button>
              ))}
            </motion.div>
          </>
        )}

        {error ? (
          <CollegeEmpty
            title="Could not load schemes"
            body={error.message}
            action={
              <button type="button" className={COLLEGE_BTN} onClick={() => refetch()}>
                Try again
              </button>
            }
          />
        ) : isLoading ? (
          <LoadingState />
        ) : schemes.length === 0 ? (
          <CollegeEmpty
            title="No schemes yet"
            body="A scheme of work plans how a qualification is delivered to a cohort across the year. Create the first one for each group you teach."
            action={
              <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={openCreate}>
                New scheme
              </button>
            }
          />
        ) : (
          <motion.div variants={itemVariants}>
            {filtered.length === 0 ? (
              <CollegeEmpty title="Nothing matches" body="Clear the search or filters." />
            ) : (
              <ul className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((scheme) => {
                  const progress = computeProgress(scheme.start_date, scheme.end_date);
                  const trailing =
                    scheme.status === 'published' && progress.totalWeeks > 0
                      ? `${progress.elapsedWeeks}/${progress.totalWeeks} wks`
                      : SCHEME_STATUS_LABEL[scheme.status];
                  return (
                    <li
                      key={scheme.id}
                      className="relative flex h-full flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] transition-colors hover:border-white/[0.2]"
                    >
                      <button
                        type="button"
                        onClick={() => openEdit(scheme)}
                        className="flex flex-1 flex-col p-5 pr-14 text-left touch-manipulation"
                      >
                        <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white">
                          {SCHEME_STATUS_LABEL[scheme.status]}
                          {scheme.academic_year ? ` · ${scheme.academic_year}` : ''}
                        </span>
                        <span className="mt-1.5 line-clamp-2 text-[15.5px] font-semibold leading-snug text-white">{scheme.title}</span>
                        <span className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-white">
                          {[scheme.qualification_title || scheme.qualification_code, scheme.cohort_name].filter(Boolean).join(' · ')}
                        </span>
                        <span className="mt-auto block pt-4">
                          <span className="flex items-baseline justify-between gap-2 text-[12px] text-white">
                            <span className="truncate">{progress.label}</span>
                            <span className="shrink-0 font-semibold tabular-nums">{trailing}</span>
                          </span>
                          <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                            <span
                              className={cn('block h-full rounded-full', progress.phase === 'complete' ? 'bg-emerald-400' : 'bg-elec-yellow')}
                              style={{ width: `${progress.percent}%` }}
                            />
                          </span>
                        </span>
                      </button>
                      <div className="absolute right-2 top-2">
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
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </section>

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
    </TeachingScreen>
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
