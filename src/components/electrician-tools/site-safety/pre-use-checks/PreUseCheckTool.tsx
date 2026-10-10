import { useState, useMemo } from 'react';
import type { SafetyToolLaunch } from '@/utils/safety-launch';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  usePreUseChecks,
  CHECK_TEMPLATES,
  REGULATION_REFS,
  type CheckItem,
  type PreUseCheck,
} from '@/hooks/usePreUseChecks';
import {
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/college/primitives';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { fmtCardDate } from '../common/SafetyRecordCard';
import { ChecklistForm } from './ChecklistForm';
import { useHaptic } from '@/hooks/useHaptic';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { SafetyListCard, SafetyListRow } from '../common/SafetyList';
import { SafetyPageHeader } from '../common/SafetyPageHeader';
import { FirmRecordBar } from '../common/FirmRecordBar';

interface PreUseCheckToolProps {
  onBack: () => void;
  launch?: SafetyToolLaunch;
}

const CATEGORIES = [
  { key: 'ladder', label: 'Ladder' },
  { key: 'scaffold', label: 'Scaffold' },
  { key: 'power_tool', label: 'Power Tool' },
  { key: 'test_instrument', label: 'Test Instrument' },
  { key: 'access_equipment', label: 'Access Equipment' },
  { key: 'harness', label: 'Harness & Lanyard' },
  { key: 'extension_lead', label: 'Extension Lead' },
  { key: 'portable_rcd', label: 'Portable RCD' },
  { key: 'generator', label: 'Generator' },
  { key: 'fire_extinguisher', label: 'Fire Extinguisher' },
  { key: 'first_aid_kit', label: 'First Aid Kit' },
  { key: 'ppe', label: 'PPE (General)' },
  { key: 'mewp', label: 'MEWP / Cherry Picker' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

/** "ladder" → "Ladder", "power_tool" → "Power Tool"; unknown keys de-snaked. */
const categoryLabel = (key: string | null | undefined) =>
  CATEGORIES.find((c) => c.key === key)?.label ??
  (key || 'Equipment').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());

/**
 * FormCard's body is a flat `hsl(0 0% 12%)` fill; `bg-transparent` clears it so
 * the card recipe's ramp sits on near-black. See `common/SafetyList.tsx`.
 */
const CARD_CN = cn('bg-transparent border-elec-yellow/35', CARD_SURFACE);

// One colour dimension = result.
function resultTone(result: string): Tone {
  return result === 'pass' ? 'green' : result === 'fail' ? 'red' : 'grey';
}

/**
 * Neutral surface, coloured text — the same pill the Document Hub gives these
 * very records. They wore one pill here and a different one there, which is
 * worse than either convention applied consistently.
 */
const RESULT_PILL: Record<Tone, string> = {
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  emerald: 'bg-white/[0.05] text-emerald-400 border-white/10',
  red: 'bg-white/[0.05] text-red-400 border-white/10',
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  orange: 'bg-white/[0.05] text-orange-400 border-white/10',
  blue: 'bg-white/[0.05] text-white border-white/10',
  cyan: 'bg-white/[0.05] text-white border-white/10',
  purple: 'bg-white/[0.05] text-amber-400 border-white/10',
  indigo: 'bg-white/[0.05] text-amber-400 border-white/10',
  // Volt is a LINE and TEXT colour, never a translucent fill.
  yellow: 'border-elec-yellow/35 text-elec-yellow',
  grey: 'bg-white/[0.05] text-white border-white/10',
};

function ResultPill({ result }: { result: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        RESULT_PILL[resultTone(result)]
      )}
    >
      {/* 'na' now means "partially assessed" rather than "nothing recorded"
          (see computeOverallResult in ChecklistForm). The label stays "N/A"
          because the shared Document Hub renders the raw `overall_result` for
          these records and has no entry for 'na' — one word for one state
          across both surfaces, until the hub gains a label of its own. */}
      {result === 'pass' ? 'Pass' : result === 'fail' ? 'Fail' : 'N/A'}
    </span>
  );
}

export function PreUseCheckTool({ onBack, launch }: PreUseCheckToolProps) {
  const haptic = useHaptic();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [shareRecordId, setShareRecordId] = useState<string | null>(null);
  const [shareRecordTitle, setShareRecordTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: checks = [], isLoading } = usePreUseChecks();
  const { projects: jobs = [] } = useSparkProjects('active');
  const jobTitleFor = (id: string | null) =>
    id ? (jobs.find((j) => j.id === id)?.title ?? null) : null;
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState('all');

  const filteredChecks = useMemo(() => {
    return checks.filter((check) => {
      const matchesSearch =
        !searchQuery ||
        check.equipment_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.equipment_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.site_address?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesResult = resultFilter === 'all' || check.overall_result === resultFilter;
      return matchesSearch && matchesResult;
    });
  }, [checks, searchQuery, resultFilter]);

  const passCount = useMemo(
    () => checks.filter((c) => c.overall_result === 'pass').length,
    [checks]
  );
  const failCount = useMemo(
    () => checks.filter((c) => c.overall_result === 'fail').length,
    [checks]
  );

  const filterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: checks.length },
      { value: 'pass', label: 'Pass', count: passCount },
      { value: 'fail', label: 'Fail', count: failCount },
    ],
    [checks.length, passCount, failCount]
  );

  /**
   * The thirteen equipment tiles were a flat grid in which every option carried
   * identical weight, so the two or three types an electrician actually checks
   * daily were no easier to reach than a generator they touch twice a year.
   * The types this user has checked before come first, with when they last did
   * it; the full list stays available underneath as the quieter group.
   */
  const recentCategories = useMemo(() => {
    // `checks` arrives newest-first, so first sighting = most recent check.
    const seen = new Map<string, string>();
    for (const c of checks) {
      if (!seen.has(c.equipment_type)) seen.set(c.equipment_type, c.created_at);
    }
    const out: { key: CategoryKey; label: string; lastChecked: string }[] = [];
    for (const [key, lastChecked] of seen) {
      const cat = CATEGORIES.find((c) => c.key === key);
      if (cat) out.push({ key: cat.key, label: cat.label, lastChecked });
      if (out.length === 3) break;
    }
    return out;
  }, [checks]);

  /**
   * "Re-check" carries the identity of the check being repeated.
   *
   * It used to set the equipment TYPE and nothing else, so re-checking the same
   * Fluke 1664 on the same site meant re-typing the description, the address
   * and the project link every single time — which is most of the reason a
   * re-check button exists at all.
   */
  const [prefill, setPrefill] = useState<{
    equipmentId: string | null;
    description: string;
    siteAddress: string;
    jobId: string | null;
    jobTitle: string | null;
    employerJobId: string | null;
  } | null>(null);

  const handleCategorySelect = (key: CategoryKey) => {
    setPrefill(null);
    setSelectedCategory(key);
    setShowForm(true);
  };

  const handleRecheck = (check: PreUseCheck) => {
    setPrefill({
      equipmentId: check.equipment_id,
      description: check.equipment_description ?? '',
      siteAddress: check.site_address ?? '',
      jobId: check.job_id,
      jobTitle: jobTitleFor(check.job_id),
      employerJobId: check.employer_job_id ?? null,
    });
    setSelectedCategory(check.equipment_type as CategoryKey);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedCategory(null);
    setPrefill(null);
  };

  const handleFormSubmit = () => {
    haptic.success();
    setShowForm(false);
    setSelectedCategory(null);
    setPrefill(null);
  };

  // `?? []` guards a record whose equipment_type is outside CHECK_TEMPLATES —
  // `.map` on undefined would have taken the whole module down rather than
  // showing an empty checklist.
  const templateItems: CheckItem[] = selectedCategory
    ? (CHECK_TEMPLATES[selectedCategory] ?? []).map((t) => ({
        ...t,
        result: 'na' as const,
      }))
    : [];

  // ─── Checklist form ───
  if (showForm && selectedCategory) {
    return (
      <ChecklistForm
        equipmentType={selectedCategory}
        items={templateItems}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        initialEquipmentId={prefill?.equipmentId ?? null}
        initialEquipmentDescription={prefill?.description ?? ''}
        initialSiteAddress={prefill?.siteAddress ?? launch?.siteAddress ?? ''}
        initialJobId={prefill?.jobId ?? launch?.jobId ?? null}
        initialJobTitle={prefill?.jobTitle ?? null}
        initialEmployerJobId={prefill?.employerJobId ?? launch?.employerJobId ?? null}
      />
    );
  }

  // ─── List ───
  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Pre-Use Checks"
      hero={
        // "against the statutory checklist" claimed more than the templates
        // are: they are drawn from a mix of regulation and industry guidance,
        // and no statute prescribes a checklist. The reference each list is
        // built against is shown on the check itself.
        <SafetyPageHeader
          eyebrow="Pre-Use Checks · PUWER 1998 / LOLER 1998"
          title="Inspect before you use it"
          description="Record a pre-use inspection for ladders, scaffolds, power tools, test instruments and access equipment — pass, fail or N/A against the inspection checklist, with photos and a signature."
          tone="yellow"
        />
      }
      /*
       * No stats strip and no filter bar up here. A Total/Pass/Fail block and
       * the search sat above the equipment chooser, so on a phone the thing
       * you came to do (start a check) began below the fold, and the search
       * was a screen away from the list it filtered. The filter tabs carry the
       * same three counts, so the strip said everything twice. Both now sit
       * with the records they act on.
       */
    >
      {/* Start a new check — the equipment this user actually uses first, the
          full list underneath as the quieter group. */}
      {recentCategories.length > 0 && (
        <FormCard eyebrow="Check again" className={CARD_CN}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {recentCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className={cn(
                  'flex min-h-[3.5rem] touch-manipulation flex-col justify-center rounded-xl border',
                  'border-elec-yellow/60 px-4 py-3 text-left transition-all',
                  'active:scale-[0.99] active:brightness-125 [-webkit-tap-highlight-color:transparent]',
                  CARD_SURFACE
                )}
              >
                <span className="text-[14px] font-semibold text-white">{cat.label}</span>
                <span className="mt-0.5 text-[11px] text-white">
                  Last checked {fmtCardDate(cat.lastChecked)}
                </span>
              </button>
            ))}
          </div>
        </FormCard>
      )}

      <FormCard
        eyebrow={recentCategories.length > 0 ? 'All equipment' : 'Start a new check'}
        className={CARD_CN}
      >
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const reg = REGULATION_REFS[cat.key];
            const itemCount = CHECK_TEMPLATES[cat.key]?.length || 0;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className={cn(
                  'min-h-[3.5rem] touch-manipulation rounded-xl border border-white/[0.12]',
                  'bg-white/[0.04] p-3 text-left transition-all',
                  // Was `hover:bg-[hsl(0_0%_12%)]` — a flat fill painted over
                  // the tile, so the material visibly changed under the cursor.
                  // Press brightens what is already there instead.
                  'active:scale-[0.98] active:brightness-125 [-webkit-tap-highlight-color:transparent]'
                )}
              >
                <span className="block text-[13px] font-medium text-white">{cat.label}</span>
                <span className="mt-1.5 flex items-center gap-2">
                  {reg && (
                    <span className="whitespace-nowrap rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[9.5px] font-medium text-elec-yellow">
                      {reg.shortName}
                    </span>
                  )}
                  <span className="text-[10.5px] text-white">{itemCount} checks</span>
                </span>
              </button>
            );
          })}
        </div>
      </FormCard>

      {/* Recent checks */}
      <div>
        <Eyebrow className="mb-2.5">Recent checks</Eyebrow>
        {checks.length > 0 && (
          <div className="mb-3">
            <FilterBar
              touch
              tabs={filterTabs}
              activeTab={resultFilter}
              onTabChange={setResultFilter}
              search={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search checks…"
            />
          </div>
        )}
        {isLoading ? (
          <LoadingState />
        ) : checks.length === 0 ? (
          <EmptyState
            touch
            title="No checks recorded yet"
            description="Pick the equipment above before you use it. A failed check is recorded with what was wrong, so nobody picks it up again by mistake."
          />
        ) : filteredChecks.length === 0 ? (
          <EmptyState
            touch
            title="No matching checks"
            description="Try a different result tab or clear your search."
          />
        ) : (
          <div className="space-y-2.5">
            {filteredChecks.map((check: PreUseCheck) => {
              const reg = REGULATION_REFS[check.equipment_type];
              const passN = check.items.filter((i) => i.result === 'pass').length;
              const failN = check.items.filter((i) => i.result === 'fail').length;
              const exporting = isExporting && exportingId === check.id;
              const jobTitle = jobTitleFor(check.job_id);
              return (
                <SafetyListCard key={check.id}>
                  <SafetyListRow
                    accent={resultTone(check.overall_result)}
                    title={`${categoryLabel(check.equipment_type)} check`}
                    subtitle={[
                      check.equipment_description || (reg ? reg.shortName : ''),
                      check.site_address || '',
                      jobTitle ? `Job: ${jobTitle}` : '',
                      // Was "14P / 1F / 15 items" — a code to decode.
                      `${passN} pass · ${failN} fail of ${check.items.length}`,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                    trailing={
                      <div className="flex flex-col items-end gap-1">
                        <ResultPill result={check.overall_result} />
                        <span className="text-[11px] text-white tabular-nums">
                          {fmtCardDate(check.created_at)}
                        </span>
                      </div>
                    }
                  />
                  <FirmRecordBar
                    table="pre_use_checks"
                    row={check}
                    invalidate={[['pre-use-checks']]}
                    className="mx-5 mb-3 block sm:mx-6"
                  />
                  {/* Three identical secondary buttons gave the row no shape.
                      Re-check is what an electrician came here to do; export
                      and share are the quieter pair beside it. `h-11` keeps
                      the 44px target that `size="sm"` (h-9) would have lost. */}
                  <div className="flex flex-wrap gap-1.5 px-5 pb-4 sm:px-6">
                    <PrimaryButton size="sm" className="h-11" onClick={() => handleRecheck(check)}>
                      Re-check
                    </PrimaryButton>
                    <SecondaryButton
                      size="sm"
                      className="h-11"
                      disabled={exporting}
                      onClick={() => exportPDF('pre-use-check', check.id)}
                    >
                      {exporting ? 'Exporting…' : 'Export PDF'}
                    </SecondaryButton>
                    <SecondaryButton
                      size="sm"
                      className="h-11"
                      onClick={() => {
                        setShareRecordTitle(categoryLabel(check.equipment_type));
                        setShareRecordId(check.id);
                      }}
                    >
                      Share
                    </SecondaryButton>
                  </div>
                </SafetyListCard>
              );
            })}
          </div>
        )}
      </div>

      {shareRecordId && (
        <SafetyDocumentShare
          open={!!shareRecordId}
          onClose={() => setShareRecordId(null)}
          pdfType="pre-use-check"
          recordId={shareRecordId}
          documentTitle={`Pre-Use Check — ${shareRecordTitle}`}
        />
      )}
    </SafetyModuleShell>
  );
}

export default PreUseCheckTool;
