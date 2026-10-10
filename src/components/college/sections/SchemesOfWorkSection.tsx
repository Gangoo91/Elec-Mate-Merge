import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { itemVariants, LoadingState } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import {
  StatusChip,
  TEACH_BTN,
  TEACH_BTN_PRIMARY,
  TEACH_CARD,
  TeachingEmpty as CollegeEmpty,
  TeachingHeader,
  TeachingScreen,
  TopLine,
  plural,
  TeachTabs,
} from '@/components/college/teaching/TeachingKit';
import {
  SchemeOfWorkSheet,
  useSchemeCoverage,
} from '@/components/college/teaching/SchemeOfWorkSheet';
import { StartLessonPlanSheet } from '@/components/college/sheets/StartLessonPlanSheet';
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
 * header sentence with the one "New scheme" → filters → scheme cards.
 *
 * 8 Oct 2026: linked to lessons. Each card says how many of the cohort's
 * lesson plans fall in its dates and how many of the qualification's
 * criteria they cover; tapping it opens SchemeOfWorkSheet (lessons by week,
 * unit coverage, "Plan a lesson for this cohort" into the same composer as
 * the lesson plans list). The overflow menu keeps edit, duplicate, archive
 * and delete. The figure tiles went into the header sentence.
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
    {
      title: 'Create a scheme',
      body: 'Pick the qualification, the cohort and the start and end dates.',
    },
    {
      title: 'Plan its lessons',
      body: "Open the scheme to see the cohort's lessons dated inside it, week by week, and which units still have criteria no lesson covers. Plan a lesson for the cohort from there.",
    },
    {
      title: 'Set it active',
      body: 'An active scheme shows how far through the year the cohort is. Archive it when the year ends.',
    },
  ],
  notes: [
    {
      title: 'Drafts',
      body: "A draft is not shown as a cohort's plan yet. Set it active once the weeks are planned.",
    },
  ],
  legend: [
    {
      swatch: 'bg-elec-yellow',
      label: 'Yellow bar',
      body: 'how far through its dates the scheme is today',
    },
  ],
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
  const { toast } = useToast();
  const { schemes, isLoading, error, refetch, update, remove, duplicate } = useSchemesOfWork();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<SchemeStatus | 'all'>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<SchemeOfWorkRow | null>(null);
  const [deletingScheme, setDeletingScheme] = useState<SchemeOfWorkRow | null>(null);
  const [viewing, setViewing] = useState<SchemeOfWorkRow | null>(null);
  const [planCohort, setPlanCohort] = useState<string | null>(null);
  const coverage = useSchemeCoverage(schemes);

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
        (s) =>
          s.status === 'published' && computeProgress(s.start_date, s.end_date).phase === 'running'
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
      <TeachingHeader
        eyebrow="Curriculum"
        title="Schemes of work"
        help={HELP}
        summary={
          isLoading
            ? 'Loading the schemes…'
            : error
              ? 'How each qualification is delivered to a cohort across the year.'
              : schemes.length === 0
                ? 'No scheme of work yet. A scheme spreads a qualification across the year for one cohort.'
                : [
                    counts.published > 0
                      ? `${plural(counts.published, 'active scheme')}${inProgress > 0 ? `, ${inProgress} running now` : ''}`
                      : 'No active scheme',
                    counts.draft > 0 ? `${plural(counts.draft, 'draft')} to finish` : null,
                  ]
                    .filter(Boolean)
                    .join(', ') + '.'
        }
        sub={
          !isLoading && !error && schemes.length > 0
            ? `Covering ${plural(cohortOptions.length, 'cohort')}. Open a scheme to see the lessons in its dates and the criteria they cover.`
            : undefined
        }
        actions={
          <button
            type="button"
            onClick={openCreate}
            className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
          >
            New scheme
          </button>
        }
      />

      <section className="space-y-4">
        {schemes.length > 0 && (
          <CollegeSectionTitle
            title="Schemes"
            sub={
              !isLoading && !error
                ? filtered.length === schemes.length
                  ? `${schemes.length} on file`
                  : `${filtered.length} of ${schemes.length}`
                : undefined
            }
          />
        )}

        {schemes.length > 0 && (
          <>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_280px]"
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

            <motion.div variants={itemVariants}>
              <TeachTabs
                label="Status"
                value={filterStatus}
                onChange={setFilterStatus}
                tabs={[
                  { value: 'all', label: 'All', count: schemes.length },
                  ...STATUS_ORDER.map((s) => ({
                    value: s,
                    label: SCHEME_STATUS_LABEL[s],
                    count: counts[s],
                  })),
                ]}
              />
            </motion.div>
          </>
        )}

        {error ? (
          <CollegeEmpty
            title="Could not load schemes"
            body={error.message}
            action={
              <button type="button" className={TEACH_BTN} onClick={() => refetch()}>
                Try again
              </button>
            }
          />
        ) : isLoading ? (
          <LoadingState />
        ) : schemes.length === 0 ? (
          <CollegeEmpty
            title="No schemes yet"
            body="Create the first one for each group you teach. It lays the units out week by week, so you can see what is due and what is behind."
          />
        ) : (
          <motion.div variants={itemVariants}>
            {filtered.length === 0 ? (
              <CollegeEmpty title="Nothing matches" body="Clear the search or filters." />
            ) : (
              <ul className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((scheme) => {
                  const progress = computeProgress(scheme.start_date, scheme.end_date);
                  const cov = coverage.byScheme.get(scheme.id);
                  const trailing =
                    scheme.status === 'published' &&
                    progress.totalWeeks > 0 &&
                    progress.phase === 'running'
                      ? `Week ${Math.max(1, progress.elapsedWeeks)} of ${progress.totalWeeks}`
                      : null;
                  return (
                    <li key={scheme.id} className={TEACH_CARD}>
                      <TopLine />
                      <button
                        type="button"
                        onClick={() => setViewing(scheme)}
                        className="flex flex-1 flex-col p-4 pr-14 text-left touch-manipulation sm:p-5 sm:pr-14"
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <StatusChip
                            tone={
                              scheme.status === 'published'
                                ? 'done'
                                : scheme.status === 'draft'
                                  ? 'action'
                                  : 'neutral'
                            }
                          >
                            {SCHEME_STATUS_LABEL[scheme.status]}
                          </StatusChip>
                          {scheme.academic_year && (
                            <span className="text-[12px] font-medium text-white">
                              {scheme.academic_year}
                            </span>
                          )}
                        </span>
                        <span className="mt-2 line-clamp-2 text-[15.5px] font-semibold leading-snug text-white">
                          {scheme.title}
                        </span>
                        <span className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-white">
                          {[
                            scheme.qualification_title || scheme.qualification_code,
                            scheme.cohort_name,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                        <span className="mt-3 block text-[12.5px] leading-snug text-white">
                          {!cov
                            ? coverage.loading
                              ? 'Checking its lessons…'
                              : ''
                            : cov.lessons.length === 0
                              ? 'No lessons dated in it yet'
                              : `${plural(cov.lessons.length, 'lesson')} in its dates`}
                          {cov && cov.totalCriteria > 0
                            ? ` · ${cov.coveredCriteria} of ${cov.totalCriteria} criteria covered`
                            : ''}
                        </span>
                        <span className="mt-auto block pt-4">
                          <span className="flex items-baseline justify-between gap-2 text-[12px] text-white">
                            <span className="truncate">{progress.label}</span>
                            {trailing && <span className="shrink-0 font-semibold">{trailing}</span>}
                          </span>
                          <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                            <span
                              className={cn(
                                'block h-full rounded-full',
                                progress.phase === 'complete' ? 'bg-emerald-400' : 'bg-elec-yellow'
                              )}
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
                              onClick={() => setViewing(scheme)}
                            >
                              Lessons and coverage
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

      <SchemeOfWorkSheet
        scheme={viewing}
        coverage={viewing ? coverage.byScheme.get(viewing.id) : undefined}
        onOpenChange={(v) => !v && setViewing(null)}
        onEdit={(sc) => {
          setViewing(null);
          openEdit(sc);
        }}
        onPlanLesson={(cohortId) => {
          setViewing(null);
          setPlanCohort(cohortId);
        }}
      />

      <StartLessonPlanSheet
        open={planCohort !== null}
        onOpenChange={(v) => !v && setPlanCohort(null)}
        initialCohortId={planCohort}
      />

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
