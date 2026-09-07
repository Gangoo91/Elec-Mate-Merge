import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  containerVariants,
  itemVariants,
  EmptyState,
  LoadingState,
} from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import {
  useQualifications,
  useQualificationUnits,
  useUnitDetail,
  useAcRagMatches,
  type QualificationRow,
  type UnitRow,
  type AcRow,
  type DocType,
} from '@/hooks/useCurriculum';
import { LessonGeneratorDialog } from '@/components/college/dialogs/LessonGeneratorDialog';

/**
 * Curriculum browser. Three levels:
 *   1. Qualifications list — the real UK quals from the RAG (C&G, EAL, ECS)
 *   2. Qualification detail — units (derived from v_qualification_units)
 *   3. Unit detail — LO/AC hierarchy with a slide-over on AC tap
 *
 * The AC panel pulls matched BS 7671 A4:2026 facets + GN3 + OSG supplements
 * via the match_bs7671_for_curriculum_ac RPC.
 *
 * Renders CONTENT ONLY — the masthead is CollegeDashboard's. Built on the
 * shared hub language: gold-edged CARD_SURFACE lists, HubWorkList rows, h-11
 * chips, underline search, one solid volt control per screen.
 */

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[12.5px] font-medium transition-colors touch-manipulation';
const CHIP_ON = 'border-white bg-white text-black';
const CHIP_OFF = 'border-white/[0.14] text-white hover:bg-white/[0.06]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation hover:brightness-105 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white disabled:opacity-60 sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);
const ROW =
  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';

export function CoursesSection() {
  const [selectedQual, setSelectedQual] = useState<QualificationRow | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitRow | null>(null);
  const [selectedAc, setSelectedAc] = useState<AcRow | null>(null);

  return (
    <>
      {/* Breadcrumb — plain text buttons at 44px. The masthead's Back goes to
          the hub; this walks back within the browser. */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="-mb-4 flex items-center gap-1 text-[12.5px] sm:-mb-6"
      >
        <motion.button
          variants={itemVariants}
          type="button"
          onClick={() => {
            setSelectedQual(null);
            setSelectedUnit(null);
            setSelectedAc(null);
          }}
          className={cn(
            '-ml-2 flex h-11 items-center px-2 font-medium transition-colors touch-manipulation',
            selectedQual ? 'text-elec-yellow' : 'text-white'
          )}
        >
          All qualifications
        </motion.button>
        {selectedQual && (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white" aria-hidden />
            <motion.button
              variants={itemVariants}
              type="button"
              onClick={() => {
                setSelectedUnit(null);
                setSelectedAc(null);
              }}
              className={cn(
                'flex h-11 max-w-[200px] items-center truncate px-2 font-medium transition-colors touch-manipulation',
                selectedUnit ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {selectedQual.code}
            </motion.button>
          </>
        )}
        {selectedUnit && (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white" aria-hidden />
            <motion.span variants={itemVariants} className="px-2 font-medium text-white">
              Unit {selectedUnit.unit_code}
            </motion.span>
          </>
        )}
      </motion.div>

      {!selectedQual && <QualificationsList onSelect={setSelectedQual} />}

      {selectedQual && !selectedUnit && (
        <QualificationDetail qualification={selectedQual} onSelectUnit={setSelectedUnit} />
      )}

      {selectedQual && selectedUnit && (
        <UnitDetail
          qualification={selectedQual}
          unit={selectedUnit}
          selectedAc={selectedAc}
          onSelectAc={setSelectedAc}
        />
      )}
    </>
  );
}

/* ──────────────────────── Level 1 ──────────────────────── */

function QualificationsList({ onSelect }: { onSelect: (q: QualificationRow) => void }) {
  const { data, loading } = useQualifications();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [awardingBodyFilter, setAwardingBodyFilter] = useState('all');

  const filtered = useMemo(() => {
    return data.filter((q) => {
      if (search) {
        const s = search.toLowerCase();
        if (
          !q.title.toLowerCase().includes(s) &&
          !q.code.toLowerCase().includes(s) &&
          !(q.description ?? '').toLowerCase().includes(s)
        )
          return false;
      }
      if (levelFilter !== 'all' && q.level !== levelFilter) return false;
      if (awardingBodyFilter !== 'all' && q.awarding_body !== awardingBodyFilter) return false;
      return true;
    });
  }, [data, search, levelFilter, awardingBodyFilter]);

  const levels = Array.from(new Set(data.map((q) => q.level))).sort();
  const bodies = Array.from(new Set(data.map((q) => q.awarding_body))).sort();

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
        <HubSectionHeading>Qualifications</HubSectionHeading>
        {!loading && (
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {filtered.length === data.length
              ? `${data.length}`
              : `${filtered.length} of ${data.length}`}
          </span>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code, title or description"
          aria-label="Search qualifications"
          className={SEARCH}
        />
      </motion.div>

      {(levels.length > 1 || bodies.length > 1) && (
        <motion.div variants={itemVariants} className="space-y-2">
          {levels.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
              {[{ label: 'All levels', value: 'all' }, ...levels.map((l) => ({ label: l, value: l }))].map(
                (o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setLevelFilter(o.value)}
                    className={cn(CHIP, levelFilter === o.value ? CHIP_ON : CHIP_OFF)}
                  >
                    {o.label}
                  </button>
                )
              )}
            </div>
          )}
          {bodies.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
              {[
                { label: 'All bodies', value: 'all' },
                ...bodies.map((b) => ({ label: shortAwardingBody(b), value: b })),
              ].map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setAwardingBodyFilter(o.value)}
                  className={cn(CHIP, awardingBodyFilter === o.value ? CHIP_ON : CHIP_OFF)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <motion.div variants={itemVariants}>
          <EmptyState
            title={data.length === 0 ? 'No qualifications loaded' : 'No qualifications match'}
            description={
              data.length === 0
                ? 'The curriculum catalogue has not been ingested for this college yet.'
                : 'Clear the search or filters to see the full catalogue.'
            }
          />
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className={LIST_CARD}>
          <ul className="divide-y divide-white/[0.10]">
            {filtered.map((q) => (
              <li key={q.id}>
                <button type="button" onClick={() => onSelect(q)} className={ROW}>
                  <span
                    aria-hidden="true"
                    className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {q.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {[
                        shortAwardingBody(q.awarding_body),
                        q.code,
                        q.level,
                        q.requires_portfolio ? 'Portfolio' : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.section>
  );
}

/* ──────────────────────── Level 2 ──────────────────────── */

function QualificationDetail({
  qualification,
  onSelectUnit,
}: {
  qualification: QualificationRow;
  onSelectUnit: (u: UnitRow) => void;
}) {
  const { data: units, loading } = useQualificationUnits(qualification.code);
  const totalAcs = units.reduce((s, u) => s + u.ac_count, 0);

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-white sm:text-[19px]">
            {qualification.title}
          </h2>
          {qualification.description && (
            <p className="mt-1.5 max-w-prose text-[12.5px] leading-relaxed text-white">
              {qualification.description}
            </p>
          )}
        </motion.div>

        {/* Live figures for this qualification. One accent — the unit count is
            the thing the tutor is here to browse. */}
        <HubKpiRow>
          <HubKpi
            accent
            label="Units"
            value={loading ? '—' : String(units.length)}
            verdict={loading ? undefined : units.length > 0 ? 'Tap a unit for its criteria' : 'Not ingested yet'}
          />
          <HubKpi
            label="Assessment criteria"
            value={loading ? '—' : String(totalAcs)}
            verdict={loading ? undefined : 'Across all units'}
          />
          <HubKpi label="Level" value={qualification.level} />
          <HubKpi
            label="Awarding body"
            value={shortAwardingBody(qualification.awarding_body)}
            context={
              qualification.awarding_body !== shortAwardingBody(qualification.awarding_body)
                ? qualification.awarding_body
                : undefined
            }
          />
        </HubKpiRow>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Units</HubSectionHeading>
        {loading ? (
          <LoadingState />
        ) : units.length === 0 ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="No units loaded for this qualification"
              description={`${qualification.code} is in the catalogue but its learning outcomes have not been ingested yet.`}
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className={LIST_CARD}>
            <ul className="divide-y divide-white/[0.10]">
              {units.map((u) => (
                <li key={u.unit_code}>
                  <button type="button" onClick={() => onSelectUnit(u)} className={ROW}>
                    <span
                      aria-hidden="true"
                      className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {u.unit_title || `Unit ${u.unit_code}`}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                        Unit {u.unit_code} · {u.lo_count} learning outcome
                        {u.lo_count === 1 ? '' : 's'}
                      </span>
                    </span>
                    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                      {u.ac_count} AC{u.ac_count === 1 ? '' : 's'}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.section>
    </>
  );
}

/* ──────────────────────── Level 3 ──────────────────────── */

function UnitDetail({
  qualification,
  unit,
  selectedAc,
  onSelectAc,
}: {
  qualification: QualificationRow;
  unit: UnitRow;
  selectedAc: AcRow | null;
  onSelectAc: (ac: AcRow | null) => void;
}) {
  const { data: los, loading } = useUnitDetail(qualification.code, unit.unit_code);
  const [genOpen, setGenOpen] = useState(false);
  const [genInitialAcs, setGenInitialAcs] = useState<AcRow[]>([]);

  const allAcs = useMemo(() => los.flatMap((lo) => lo.acs), [los]);

  const openGeneratorFor = (acs: AcRow[]) => {
    setGenInitialAcs(acs.length > 0 ? acs : allAcs.slice(0, 3));
    setGenOpen(true);
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-white sm:text-[19px]">
            {unit.unit_title || `Unit ${unit.unit_code}`}
          </h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white">
            {qualification.code} · Unit {unit.unit_code} · {unit.lo_count} learning outcome
            {unit.lo_count === 1 ? '' : 's'} · {unit.ac_count} assessment criteria
          </p>
        </motion.div>

        {/* The one solid volt control on this screen. */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => openGeneratorFor(selectedAc ? [selectedAc] : [])}
            disabled={loading || allAcs.length === 0}
            className={PRIMARY}
          >
            AI generate lesson
          </button>
        </motion.div>
      </motion.section>

      <LessonGeneratorDialog
        open={genOpen}
        onOpenChange={setGenOpen}
        qualificationCode={qualification.code}
        qualificationTitle={qualification.title}
        unitCode={unit.unit_code}
        unitTitle={unit.unit_title}
        initialAcs={genInitialAcs}
        availableAcs={allAcs}
      />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Learning outcomes</HubSectionHeading>
        {loading ? (
          <LoadingState />
        ) : los.length === 0 ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="No learning outcomes loaded"
              description="This unit is in the catalogue but its criteria have not been ingested yet."
            />
          </motion.div>
        ) : (
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            {los.map((lo) => (
              <motion.div
                key={lo.lo_number}
                variants={itemVariants}
                className={cn(
                  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
                  CARD_SURFACE
                )}
              >
                <div className="border-b border-white/[0.10] px-4 py-3.5 sm:px-5">
                  <div className="text-[11px] font-semibold text-elec-yellow">
                    Learning outcome {lo.lo_number}
                  </div>
                  <h3 className="mt-1 text-[14px] font-semibold leading-snug tracking-tight text-white">
                    {lo.lo_text}
                  </h3>
                </div>
                <ul className="divide-y divide-white/[0.10]">
                  {lo.acs.map((ac) => {
                    const isActive =
                      !!selectedAc &&
                      selectedAc.ac_code === ac.ac_code &&
                      selectedAc.lo_number === ac.lo_number;
                    return (
                      <li key={ac.ac_code}>
                        <button
                          type="button"
                          onClick={() => onSelectAc(isActive ? null : ac)}
                          aria-pressed={isActive}
                          className={cn(
                            'flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation sm:px-5',
                            isActive
                              ? 'bg-white/[0.08]'
                              : 'hover:bg-white/[0.06] active:bg-white/[0.09]'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              'mt-0.5 h-8 w-[3px] shrink-0 rounded-full',
                              isActive ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                            )}
                          />
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                'block text-[11px] font-semibold tabular-nums',
                                isActive ? 'text-elec-yellow' : 'text-white'
                              )}
                            >
                              AC {ac.ac_code}
                            </span>
                            <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white">
                              {ac.ac_text}
                            </span>
                          </span>
                          <ChevronRight
                            className="mt-2 h-4 w-4 shrink-0 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* AC side panel — slide-over on the right for desktop, bottom on mobile */}
      <AcSheet
        selectedAc={selectedAc}
        onClose={() => onSelectAc(null)}
        onGenerate={(ac) => openGeneratorFor([ac])}
      />
    </>
  );
}

/**
 * Responsive slide-over. Right on desktop (560px wide), bottom on mobile
 * (85vh). Only populated when there is a selected AC, so no phantom backdrop.
 */
function AcSheet({
  selectedAc,
  onClose,
  onGenerate,
}: {
  selectedAc: AcRow | null;
  onClose: () => void;
  onGenerate: (ac: AcRow) => void;
}) {
  const isMobile = useIsMobile();
  const open = !!selectedAc;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        hideCloseButton
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          'overflow-hidden border-white/[0.10] bg-elec-dark p-0',
          isMobile ? 'h-[85vh] rounded-t-2xl' : 'w-full border-l sm:max-w-[560px]'
        )}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{selectedAc ? `AC ${selectedAc.ac_code}` : 'Assessment criterion'}</SheetTitle>
        </SheetHeader>
        {selectedAc && (
          <AcSidePanel ac={selectedAc} onClose={onClose} onGenerate={() => onGenerate(selectedAc)} />
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────────── AC side panel ──────────────────────── */

const DOC_LABEL: Record<DocType, string> = {
  bs7671: 'BS 7671',
  gn3: 'Guidance Note 3',
  osg: 'On-Site Guide',
};

function AcSidePanel({
  ac,
  onClose,
  onGenerate,
}: {
  ac: AcRow;
  onClose: () => void;
  onGenerate?: () => void;
}) {
  const [docType, setDocType] = useState<DocType | 'all'>('all');
  // One fetch across all doc types; the chips filter client-side.
  const { data: allMatches, loading } = useAcRagMatches(
    ac.qualification_code,
    ac.unit_code,
    ac.ac_code,
    null,
    40
  );
  const matches = useMemo(
    () => (docType === 'all' ? allMatches : allMatches.filter((m) => m.document_type === docType)),
    [allMatches, docType]
  );

  const counts = useMemo(
    () => ({
      all: allMatches.length,
      bs7671: allMatches.filter((m) => m.document_type === 'bs7671').length,
      gn3: allMatches.filter((m) => m.document_type === 'gn3').length,
      osg: allMatches.filter((m) => m.document_type === 'osg').length,
    }),
    [allMatches]
  );

  const tabs: { label: string; value: DocType | 'all'; count: number }[] = [
    { label: 'All', value: 'all', count: counts.all },
    { label: 'BS 7671', value: 'bs7671', count: counts.bs7671 },
    { label: 'GN3', value: 'gn3', count: counts.gn3 },
    { label: 'OSG', value: 'osg', count: counts.osg },
  ];

  const a4ChangeCount = matches.filter((m) => m.is_a4_change).length;

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/[0.10] px-4 pb-3 pt-4 sm:px-5">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold text-elec-yellow">AC {ac.ac_code}</div>
          <p className="mt-1 text-[13px] leading-relaxed text-white">{ac.ac_text}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center text-[20px] leading-none text-white transition-colors touch-manipulation hover:text-elec-yellow"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="shrink-0 space-y-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setDocType(t.value)}
              className={cn(CHIP, docType === t.value ? CHIP_ON : CHIP_OFF)}
            >
              <span>{t.label}</span>
              <span className="text-[11px] tabular-nums opacity-70">{t.count}</span>
            </button>
          ))}
        </div>
        {a4ChangeCount > 0 && (
          <div className="text-[11.5px] font-medium text-elec-yellow">
            {a4ChangeCount} match{a4ChangeCount === 1 ? '' : 'es'} new or updated in A4:2026
          </div>
        )}
        {onGenerate && (
          <button type="button" onClick={onGenerate} className={cn(PRIMARY, 'sm:w-full')}>
            AI generate lesson for this AC
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {loading ? (
          <LoadingState />
        ) : matches.length === 0 ? (
          <p className="px-4 py-8 text-center text-[12.5px] text-white sm:px-5">
            No matches in {docType === 'all' ? 'BS 7671, GN3 or the OSG' : DOC_LABEL[docType]} for
            this criterion.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.10]">
            {matches.map((m) => {
              const metaBits = [
                m.bs7671_zones?.length ? m.bs7671_zones.join(', ') : null,
                m.equipment_category,
                m.protection_method,
                m.disconnection_time_s != null ? `${m.disconnection_time_s}s` : null,
              ].filter(Boolean);
              return (
                <li key={m.facet_id} className="flex gap-3 px-4 py-4 sm:px-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 h-8 w-[3px] shrink-0 rounded-full',
                      m.is_a4_change ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 text-[11px] font-semibold text-white">
                      <span>{DOC_LABEL[m.document_type as DocType] ?? m.document_type}</span>
                      {m.reg_number && (
                        <span className="tabular-nums text-elec-yellow">{m.reg_number}</span>
                      )}
                      {m.is_a4_change && <span className="text-elec-yellow">A4:2026</span>}
                    </div>
                    {m.reg_title && (
                      <div className="mt-1 text-[13px] font-semibold leading-snug text-white">
                        {m.reg_title}
                      </div>
                    )}
                    <p className="mt-1 line-clamp-4 text-[12px] leading-relaxed text-white">
                      {m.content}
                    </p>
                    {(metaBits.length > 0 || m.primary_topic) && (
                      <div className="mt-1.5 text-[11px] text-white">
                        {[m.primary_topic, ...metaBits].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────── helpers ──────────────────────── */

function shortAwardingBody(b: string): string {
  if (b === 'City & Guilds') return 'C&G';
  if (b.includes('ECS')) return 'ECS';
  return b;
}
