/**
 * SafetyObservationCard — Safety Observations module (gold-standard editorial).
 *
 * SafetyModuleShell (masthead + PageHero + StatStrip + FilterBar) over a
 * day-grouped observation list. Logging happens in a bottom-sheet form with
 * draft recovery and a pre-save readiness gate. One colour dimension only
 * (type / severity) — monochrome everywhere else.
 *
 * `safety_observations` stores no lifecycle state (no `status` column, and no
 * UPDATE policy on the table — verified against the live schema), so nothing
 * here counts "open" or "closed" items. Follow-up is tracked as corrective
 * actions on the detail sheet, which is a table that does persist.
 */

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useHaptic } from '@/hooks/useHaptic';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useShowMore } from '@/hooks/useShowMore';
import {
  useSafetyObservations,
  useCreateObservation,
  OBSERVATION_CATEGORIES,
  type SafetyObservation,
  type ObservationSeverity,
} from '@/hooks/useSafetyObservations';

import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { JobLinkField } from '../common/JobLinkField';
import { SignatureField } from '../common/SignatureField';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { SmartTextarea } from '../common/SmartTextarea';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { DraftRecoveryBanner } from '../common/DraftRecoveryBanner';
import { DraftSaveIndicator } from '../common/DraftSaveIndicator';
import { LoadMoreButton } from '../common/LoadMoreButton';
import { ReadinessGate } from '../common/ReadinessGate';
import { SaveAsTemplateSheet } from '../common/SaveAsTemplateSheet';
import { LoadTemplateSheet } from '../common/LoadTemplateSheet';
import { OBSERVATION_STANDARD_TEMPLATES } from '@/data/site-safety/observation-templates';

import { ObservationFeed } from './ObservationFeed';
import { ObservationDetailSheet } from './ObservationDetailSheet';

import {
  FilterBar,
  EmptyState,
  LoadingState,
  Field,
  FormCard,
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  TextAction,
  selectContentClass,
} from '@/components/college/primitives';
import { safetyInputCn, safetySelectTriggerCn, safetyTextareaCn } from '../common/SafetyDocField';
import { SafetyPageHeader, SafetyStatStrip } from '../common/SafetyPageHeader';

type TypeFilter = 'all' | 'positive' | 'improvement_needed';
type ObservationType = 'positive' | 'improvement_needed';

/** Neutral surface, coloured text — the Document Hub convention. */
const COUNT_PILL =
  'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap bg-white/[0.05] text-amber-400 border-white/10';

/**
 * FormCard's own body is a flat `hsl(0 0% 12%)` fill. `bg-transparent` clears
 * it so the card recipe's white-alpha ramp sits on near-black — the material
 * every other card in the app is made of. Layered over a mid-grey base it is a
 * different, flatter surface, which is what made these sheets look assembled
 * from parts.
 */
const CARD_CN = cn('bg-transparent border-elec-yellow/35', CARD_SURFACE);

/** Segmented control: one container, equal cells, 44px targets. */
const SEGMENT_WRAP = 'grid gap-1 rounded-xl border border-white/[0.12] bg-white/[0.04] p-1';
const SEGMENT_CELL =
  'h-11 rounded-lg text-[13px] font-medium touch-manipulation transition-all ' +
  'active:scale-[0.99] active:brightness-125 [-webkit-tap-highlight-color:transparent]';

interface SafetyObservationCardProps {
  onBack?: () => void;
}

export function SafetyObservationCard({ onBack }: SafetyObservationCardProps) {
  const haptic = useHaptic();
  const { data: observations = [], isLoading } = useSafetyObservations();
  const createObservation = useCreateObservation();

  // ─── List view state ───
  const [selectedObservation, setSelectedObservation] = useState<SafetyObservation | null>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ─── Log (create) sheet state ───
  const [showLog, setShowLog] = useState(false);
  const [observationType, setObservationType] = useState<ObservationType>('positive');
  const [category, setCategory] = useState('');
  const [personObserved, setPersonObserved] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<ObservationSeverity | ''>('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [observerSigName, setObserverSigName] = useState('');
  const [observerSigDataUrl, setObserverSigDataUrl] = useState('');
  const [linkedJobId, setLinkedJobId] = useState<string | null>(null);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(null);

  // Templates
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);

  // `handleLoadTemplate` restores a description, so the saver has to offer one:
  // saving a template and loading it back silently dropped the wording, which
  // is the part a recurring observation is actually worth templating for.
  const getTemplateData = () => ({ observationType, category, severity, description });

  const handleLoadTemplate = (data: Record<string, unknown>) => {
    if (data.observationType) setObservationType(data.observationType as ObservationType);
    if (data.category) setCategory(data.category as string);
    if (data.severity) setSeverity(data.severity as ObservationSeverity);
    if (data.description) setDescription(data.description as string);
  };

  // ─── Draft persistence (log only) ───
  const draftData = useMemo(
    () => ({ observationType, category, personObserved, description, location, severity }),
    [observationType, category, personObserved, description, location, severity]
  );
  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'safety-observation',
    data: draftData,
    enabled: showLog && (description.trim().length > 0 || category.length > 0),
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.observationType) setObservationType(recoveredDraft.observationType);
    if (recoveredDraft.category) setCategory(recoveredDraft.category);
    if (recoveredDraft.personObserved) setPersonObserved(recoveredDraft.personObserved);
    if (recoveredDraft.description) setDescription(recoveredDraft.description);
    if (recoveredDraft.location) setLocation(recoveredDraft.location);
    if (recoveredDraft.severity) setSeverity(recoveredDraft.severity);
    dismissDraft();
  };

  const resetForm = () => {
    setObservationType('positive');
    setCategory('');
    setPersonObserved('');
    setDescription('');
    setLocation('');
    setSeverity('');
    setPhotoUrls([]);
    setObserverSigName('');
    setObserverSigDataUrl('');
    setLinkedJobId(null);
    setLinkedJobTitle(null);
  };

  /**
   * The readiness list and the submit gate are now the SAME predicate.
   *
   * They were not: the gate demanded "Severity rated" for an improvement, but
   * `canSubmit` only checked category and description — so the list could show
   * an unmet requirement while the Log button stayed live, and an improvement
   * could be filed with no severity. Severity is the only field that decides
   * how the row is coloured and ranked, so an unrated improvement is the one
   * record the list cannot triage.
   */
  const readiness: { ok: boolean; label: string }[] = [
    { ok: category.length > 0, label: 'Category selected' },
    { ok: description.trim().length > 0, label: 'Observation described' },
    ...(observationType === 'improvement_needed'
      ? [{ ok: !!severity, label: 'Severity rated' }]
      : []),
  ];

  const canSubmit = readiness.every((r) => r.ok);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    await createObservation.mutateAsync({
      observation_type: observationType,
      category,
      description: description.trim(),
      person_observed: personObserved.trim() || undefined,
      location: location.trim() || undefined,
      severity: severity || undefined,
      photos: photoUrls,
      observer_signature: observerSigDataUrl || undefined,
      observer_name: observerSigName || undefined,
      job_id: linkedJobId,
    });
    haptic.success();
    clearDraft();
    resetForm();
    setShowLog(false);
  };

  // ─── Derived list ───
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return observations.filter((obs) => {
      const matchesType = typeFilter === 'all' || obs.observation_type === typeFilter;
      const matchesSearch =
        !q ||
        obs.description?.toLowerCase().includes(q) ||
        obs.category?.toLowerCase().includes(q) ||
        obs.person_observed?.toLowerCase().includes(q) ||
        obs.location?.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [observations, typeFilter, searchQuery]);

  // Improvements first, then by recency. (This used to also test `o.status`,
  // a column the table does not have — the test was always true.)
  const rank = (o: SafetyObservation) => (o.observation_type === 'improvement_needed' ? 0 : 1);
  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (rank(a) !== rank(b)) return rank(a) - rank(b);
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }),
    [filtered]
  );

  const { visible, hasMore, remaining, loadMore } = useShowMore(sorted);

  // ─── Stats ───
  const positiveCount = observations.filter((o) => o.observation_type === 'positive').length;
  const improvementCount = observations.filter(
    (o) => o.observation_type === 'improvement_needed'
  ).length;
  // There was a fourth "Open" stat here. With no `status` column it counted
  // exactly the same rows as "Improvement" — two tiles, one number, and a
  // tap-to-filter that set the same filter. Removed rather than faked.

  const openSheet = () => {
    resetForm();
    setShowLog(true);
  };

  const isLogging = createObservation.isPending;

  const SEVERITY_OPTIONS = [
    { value: 'low' as const, label: 'Low' },
    { value: 'medium' as const, label: 'Medium' },
    { value: 'high' as const, label: 'High' },
  ];

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Safety Observations"
      trailing={
        improvementCount > 0 ? (
          <span className={COUNT_PILL}>
            {improvementCount} improvement{improvementCount === 1 ? '' : 's'}
          </span>
        ) : undefined
      }
      hero={
        <SafetyPageHeader
          eyebrow="Safety Observations"
          title="Log and track site observations"
          description="Capture positive behaviours and areas for improvement — rate severity, assign follow-up and close the loop. Regular observations build a strong safety culture."
          tone="green"
          actions={<PrimaryButton onClick={openSheet}>Log observation</PrimaryButton>}
        />
      }
      stats={
        observations.length > 0 ? (
          <SafetyStatStrip
            columns={3}
            stats={[
              { value: observations.length, label: 'Total', onClick: () => setTypeFilter('all') },
              {
                value: positiveCount,
                label: 'Positive',
                tone: 'green',
                onClick: () => setTypeFilter('positive'),
              },
              {
                value: improvementCount,
                label: 'Improvement',
                tone: 'amber',
                onClick: () => setTypeFilter('improvement_needed'),
              },
            ]}
          />
        ) : undefined
      }
      filter={
        observations.length > 0 ? (
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: observations.length },
              { value: 'positive', label: 'Positive', count: positiveCount },
              { value: 'improvement_needed', label: 'Improvement', count: improvementCount },
            ]}
            activeTab={typeFilter}
            onTabChange={(v) => setTypeFilter(v as TypeFilter)}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search observations…"
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : observations.length === 0 ? (
        <EmptyState
          title="No observations yet"
          description="Log your first safety observation — track both positive behaviours and areas for improvement to build a strong safety culture."
          action="Log observation"
          onAction={openSheet}
        />
      ) : (
        <div className="space-y-3">
          <ObservationFeed observations={visible} onViewDetails={setSelectedObservation} />
          {hasMore && <LoadMoreButton onLoadMore={loadMore} remaining={remaining} />}
        </div>
      )}

      {/* ─── Log observation sheet ─── */}
      <Sheet open={showLog} onOpenChange={setShowLog}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
        >
          <SheetShell
            eyebrow="New observation"
            title="Log observation"
            description={<DraftSaveIndicator status={draftStatus} />}
            footer={
              <>
                <SecondaryButton onClick={() => setShowSaveTemplate(true)}>
                  Save template
                </SecondaryButton>
                <PrimaryButton fullWidth disabled={!canSubmit || isLogging} onClick={handleSubmit}>
                  {isLogging ? 'Saving…' : 'Log observation'}
                </PrimaryButton>
              </>
            }
          >
            <AnimatePresence>
              {recoveredDraft && (
                <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
              )}
            </AnimatePresence>

            {/* 44px hit area — a 12px bare text link is not a tappable control
                on a phone, however it is styled. */}
            <TextAction
              className="inline-flex h-11 items-center"
              onClick={() => setShowLoadTemplate(true)}
            >
              Load from a saved template →
            </TextAction>

            <FormCard eyebrow="Observation type" className={CARD_CN}>
              {/* Was a `border-b` on a rounded box — a stray rule under a
                  segmented control. It is one container now, and the cells are
                  44px rather than 36px. */}
              <div className={cn(SEGMENT_WRAP, 'grid-cols-2')}>
                {[
                  { v: 'positive' as const, label: 'Positive' },
                  { v: 'improvement_needed' as const, label: 'Improvement' },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => setObservationType(opt.v)}
                    aria-pressed={observationType === opt.v}
                    className={cn(
                      SEGMENT_CELL,
                      observationType === opt.v
                        ? 'bg-elec-yellow font-semibold text-black'
                        : 'text-white'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {observationType === 'improvement_needed' && (
                <Field label="Severity" required>
                  <div className={cn(SEGMENT_WRAP, 'grid-cols-3')}>
                    {SEVERITY_OPTIONS.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSeverity(severity === s.value ? '' : s.value)}
                        aria-pressed={severity === s.value}
                        className={cn(
                          SEGMENT_CELL,
                          severity === s.value
                            ? 'bg-elec-yellow font-semibold text-black'
                            : 'text-white'
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
            </FormCard>

            <FormCard eyebrow="What did you observe?" className={CARD_CN}>
              <Field label="Category" required>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={safetySelectTriggerCn}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {OBSERVATION_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Description" required>
                <SmartTextarea
                  value={description}
                  onChange={setDescription}
                  placeholder="Describe what you observed…"
                  className={cn(safetyTextareaCn, 'min-h-[100px]')}
                />
              </Field>

              <Field label="Person observed">
                <input
                  value={personObserved}
                  onChange={(e) => setPersonObserved(e.target.value)}
                  placeholder="Name or role (optional)"
                  className={safetyInputCn}
                />
              </Field>

              <LocationAutoFill
                value={location}
                onChange={setLocation}
                placeholder="e.g. Ground floor, distribution board area"
                label="Location"
              />

              <JobLinkField
                jobId={linkedJobId}
                jobTitle={linkedJobTitle}
                onSelect={(id, title) => {
                  setLinkedJobId(id);
                  setLinkedJobTitle(title);
                }}
              />
            </FormCard>

            <FormCard eyebrow="Evidence" className={CARD_CN}>
              <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} label="" />
              <SignatureField
                label="Observer signature"
                value={observerSigDataUrl}
                onChange={setObserverSigDataUrl}
              />
              <Field label="Observer name">
                <input
                  value={observerSigName}
                  onChange={(e) => setObserverSigName(e.target.value)}
                  placeholder="Your full name (optional)"
                  className={safetyInputCn}
                />
              </Field>
            </FormCard>

            <ReadinessGate items={readiness} title="Ready to log?" />
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* ─── Detail ─── */}
      <ObservationDetailSheet
        observation={selectedObservation}
        open={selectedObservation !== null}
        onClose={() => setSelectedObservation(null)}
      />

      {/* ─── Templates ─── */}
      <SaveAsTemplateSheet
        open={showSaveTemplate}
        onOpenChange={setShowSaveTemplate}
        moduleType="observation"
        getTemplateData={getTemplateData}
      />
      <LoadTemplateSheet
        open={showLoadTemplate}
        onOpenChange={setShowLoadTemplate}
        moduleType="observation"
        onLoad={handleLoadTemplate}
        standardTemplates={OBSERVATION_STANDARD_TEMPLATES}
      />
    </SafetyModuleShell>
  );
}

export default SafetyObservationCard;
