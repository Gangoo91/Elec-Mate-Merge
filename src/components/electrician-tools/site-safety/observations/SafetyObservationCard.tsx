/**
 * SafetyObservationCard — Safety Observations module (gold-standard editorial).
 *
 * SafetyModuleShell (masthead + PageHero + StatStrip + FilterBar) over a
 * day-grouped observation list. Logging happens in a bottom-sheet form with
 * draft recovery and a pre-save readiness gate. One colour dimension only
 * (type / severity / status) — monochrome everywhere else.
 */

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  Field,
  FormCard,
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  TextAction,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';

type TypeFilter = 'all' | 'positive' | 'improvement_needed';
type ObservationType = 'positive' | 'improvement_needed';

const STATUS_PILL = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap bg-emerald-500/10 text-emerald-400 border-emerald-500/25';

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

  const getTemplateData = () => ({ observationType, category, severity });

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

  const canSubmit = category.length > 0 && description.trim().length > 0;

  // Pre-save readiness gate (BS 7671-aligned: capture what makes an observation usable).
  const readiness: { ok: boolean; label: string }[] = [
    { ok: category.length > 0, label: 'Category selected' },
    { ok: description.trim().length > 0, label: 'Observation described' },
    ...(observationType === 'improvement_needed'
      ? [{ ok: !!severity, label: 'Severity rated' }]
      : []),
  ];

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

  // Open improvements first, then by recency.
  const rank = (o: SafetyObservation) =>
    o.observation_type === 'improvement_needed' && (o.status || 'open') !== 'closed' ? 0 : 1;
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
  const improvementCount = observations.filter((o) => o.observation_type === 'improvement_needed').length;
  const openCount = observations.filter(
    (o) => o.observation_type === 'improvement_needed' && (o.status || 'open') !== 'closed'
  ).length;

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
      trailing={openCount > 0 ? <span className={STATUS_PILL}>{openCount} open</span> : undefined}
      hero={
        <PageHero
          eyebrow="Safety Observations"
          title="Log and track site observations"
          description="Capture positive behaviours and areas for improvement — rate severity, assign follow-up and close the loop. Regular observations build a strong safety culture."
          tone="green"
          actions={<PrimaryButton onClick={openSheet}>Log observation</PrimaryButton>}
        />
      }
      stats={
        observations.length > 0 ? (
          <StatStrip
            stats={[
              { value: observations.length, label: 'Total', onClick: () => setTypeFilter('all') },
              { value: positiveCount, label: 'Positive', tone: 'green', onClick: () => setTypeFilter('positive') },
              { value: improvementCount, label: 'Improvement', tone: 'amber', onClick: () => setTypeFilter('improvement_needed') },
              { value: openCount, label: 'Open', accent: true, onClick: () => setTypeFilter('improvement_needed') },
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
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <SheetShell
            eyebrow="New observation"
            title="Log observation"
            description={<DraftSaveIndicator status={draftStatus} />}
            footer={
              <>
                <SecondaryButton onClick={() => setShowSaveTemplate(true)}>Save template</SecondaryButton>
                <PrimaryButton fullWidth disabled={!canSubmit || isLogging} onClick={handleSubmit}>
                  {isLogging ? 'Saving…' : 'Log observation'}
                </PrimaryButton>
              </>
            }
          >
            <AnimatePresence>
              {recoveredDraft && <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />}
            </AnimatePresence>

            <TextAction onClick={() => setShowLoadTemplate(true)}>Load from a saved template →</TextAction>

            <FormCard eyebrow="Observation type">
              <div className="grid grid-cols-2 gap-1 p-1 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl">
                {[
                  { v: 'positive' as const, label: 'Positive' },
                  { v: 'improvement_needed' as const, label: 'Improvement' },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => setObservationType(opt.v)}
                    className={cn(
                      'h-9 rounded-lg text-[12.5px] font-medium touch-manipulation transition-colors',
                      observationType === opt.v ? 'bg-elec-yellow text-black' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {observationType === 'improvement_needed' && (
                <Field label="Severity">
                  <div className="grid grid-cols-3 gap-1 p-1 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl">
                    {SEVERITY_OPTIONS.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSeverity(severity === s.value ? '' : s.value)}
                        className={cn(
                          'h-9 rounded-lg text-[12.5px] font-medium touch-manipulation transition-colors',
                          severity === s.value ? 'bg-elec-yellow text-black' : 'text-white/70 hover:text-white'
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
            </FormCard>

            <FormCard eyebrow="What did you observe?">
              <Field label="Category" required>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={selectTriggerClass}>
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
                  className="touch-manipulation text-[13px] min-h-[100px] bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                />
              </Field>

              <Field label="Person observed">
                <input
                  value={personObserved}
                  onChange={(e) => setPersonObserved(e.target.value)}
                  placeholder="Name or role (optional)"
                  className={inputClass}
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

            <FormCard eyebrow="Evidence">
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
                  className={inputClass}
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
