import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  LoadingState,
  itemVariants,
  PrimaryButton,
} from '@/components/college/primitives';
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
 *   1. Qualifications grid — 21 real UK quals from the RAG (C&G, EAL, ECS)
 *   2. Qualification detail — units (derived from v_qualification_units)
 *   3. Unit detail — LO/AC hierarchy with side panel on AC-click
 *
 * The AC side panel pulls matched BS 7671 A4:2026 facets + GN3 + OSG supplements
 * via the match_bs7671_for_curriculum_ac RPC.
 */
export function CoursesSection() {
  const [selectedQual, setSelectedQual] = useState<QualificationRow | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitRow | null>(null);
  const [selectedAc, setSelectedAc] = useState<AcRow | null>(null);

  return (
    <PageFrame>
      {/* Breadcrumbs — text-based, editorial */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 text-[12px] mb-4">
        <button
          onClick={() => {
            setSelectedQual(null);
            setSelectedUnit(null);
            setSelectedAc(null);
          }}
          className={cn(
            'transition-colors',
            selectedQual ? 'text-white hover:text-white' : 'text-white'
          )}
        >
          All qualifications
        </button>
        {selectedQual && (
          <>
            <span className="text-white/30">/</span>
            <button
              onClick={() => {
                setSelectedUnit(null);
                setSelectedAc(null);
              }}
              className={cn(
                'transition-colors truncate max-w-[240px]',
                selectedUnit ? 'text-white hover:text-white' : 'text-white'
              )}
            >
              {selectedQual.code}
            </button>
          </>
        )}
        {selectedUnit && (
          <>
            <span className="text-white/30">/</span>
            <span className="text-white">Unit {selectedUnit.unit_code}</span>
          </>
        )}
      </motion.div>

      {/* Level 1 */}
      {!selectedQual && <QualificationsGrid onSelect={setSelectedQual} />}

      {/* Level 2 */}
      {selectedQual && !selectedUnit && (
        <QualificationDetail
          qualification={selectedQual}
          onSelectUnit={setSelectedUnit}
        />
      )}

      {/* Level 3 */}
      {selectedQual && selectedUnit && (
        <UnitDetail
          qualification={selectedQual}
          unit={selectedUnit}
          selectedAc={selectedAc}
          onSelectAc={setSelectedAc}
        />
      )}
    </PageFrame>
  );
}

/* ──────────────────────── Level 1 ──────────────────────── */

function QualificationsGrid({ onSelect }: { onSelect: (q: QualificationRow) => void }) {
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
    <>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum Hub · Qualifications"
          title="UK electrical qualifications"
          description="Real learning outcomes and assessment criteria from City & Guilds, EAL and ECS — with BS 7671:2018+A4:2026 regulation matching built in."
          tone="blue"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by code, title, description…"
          actions={
            <div className="flex items-center gap-2 flex-wrap">
              <FilterPillGroup
                label="Level"
                value={levelFilter}
                onChange={setLevelFilter}
                options={[
                  { label: 'All', value: 'all' },
                  ...levels.map((l) => ({ label: l, value: l })),
                ]}
              />
              <FilterPillGroup
                label="Body"
                value={awardingBodyFilter}
                onChange={setAwardingBodyFilter}
                options={[
                  { label: 'All', value: 'all' },
                  ...bodies.map((b) => ({ label: shortAwardingBody(b), value: b })),
                ]}
              />
            </div>
          }
        />
      </motion.div>

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No qualifications match"
          description="Clear filters to see all 21 seeded UK qualifications."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((q) => (
            <motion.button
              key={q.id}
              variants={itemVariants}
              onClick={() => onSelect(q)}
              className="group text-left bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.06] hover:border-white/[0.1] rounded-2xl p-6 sm:p-7 transition-colors touch-manipulation focus:outline-none focus:border-elec-yellow/40 flex flex-col min-h-[200px]"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                {q.awarding_body}
                <span className="mx-2 text-white/25">·</span>
                <span className="font-mono">{q.code}</span>
              </div>
              <h3 className="mt-3 text-[17px] font-semibold text-white tracking-tight leading-snug line-clamp-2">
                {q.title}
              </h3>
              <p className="mt-2 text-[12.5px] text-white leading-relaxed line-clamp-3">
                {q.description || '\u00A0'}
              </p>
              <div className="flex-grow" />
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11.5px]">
                <span className="text-white">
                  {q.level}
                  {q.requires_portfolio && (
                    <>
                      <span className="mx-2 text-white/25">·</span>
                      <span>Portfolio</span>
                    </>
                  )}
                </span>
                <span className="text-white group-hover:text-elec-yellow transition-colors">
                  Open →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </>
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
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow={`${qualification.awarding_body} · ${qualification.code}`}
          title={qualification.title}
          description={qualification.description ?? undefined}
          tone="blue"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        {[
          { label: 'Level', value: qualification.level },
          { label: 'Units', value: units.length },
          { label: 'Assessment criteria', value: totalAcs },
          { label: 'Awarding body', value: qualification.awarding_body },
        ].map((k) => (
          <div
            key={k.label}
            className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl p-4"
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-white">{k.label}</div>
            <div className="mt-1 text-lg font-semibold text-white tabular-nums">{k.value}</div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white mb-3">
          Units
        </h3>
        {loading ? (
          <LoadingState />
        ) : units.length === 0 ? (
          <EmptyState
            title="No units seeded for this qualification yet"
            description={`We have 2,046 LO/AC rows loaded across all qualifications but ${qualification.code} may still be pending ingest.`}
          />
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
            {units.map((u) => (
              <button
                key={u.unit_code}
                onClick={() => onSelectUnit(u)}
                className="group w-full text-left px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation flex items-center gap-4"
              >
                <div className="w-12 text-[11px] font-mono text-white tabular-nums shrink-0">
                  {u.unit_code}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-medium text-white truncate">
                    {u.unit_title || `Unit ${u.unit_code}`}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white tabular-nums">
                    {u.lo_count} learning outcome{u.lo_count === 1 ? '' : 's'} · {u.ac_count} criteria
                  </div>
                </div>
                <span className="text-white group-hover:text-elec-yellow transition-colors shrink-0">
                  →
                </span>
              </button>
            ))}
          </div>
        )}
      </motion.div>
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
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow={`${qualification.code} · Unit ${unit.unit_code}`}
          title={unit.unit_title || `Unit ${unit.unit_code}`}
          description={`${unit.lo_count} learning outcome${unit.lo_count === 1 ? '' : 's'} · ${unit.ac_count} assessment criteria.`}
          tone="blue"
          actions={
            <button
              onClick={() => openGeneratorFor(selectedAc ? [selectedAc] : [])}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              AI generate lesson →
            </button>
          }
        />
      </motion.div>

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

      {/* LO list — full width, maxed to readable measure. AC side panel is a
          slide-over (right on desktop, bottom on mobile) so the list stays
          visible while the side panel is open. */}
      <div className="max-w-3xl">
        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-4">
            {los.map((lo) => (
              <motion.div
                key={lo.lo_number}
                variants={itemVariants}
                className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06]">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    Learning outcome {lo.lo_number}
                  </div>
                  <h3 className="mt-1 text-[15px] font-semibold text-white tracking-tight leading-snug">
                    {lo.lo_text}
                  </h3>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {lo.acs.map((ac) => {
                    const isActive =
                      selectedAc &&
                      selectedAc.ac_code === ac.ac_code &&
                      selectedAc.lo_number === ac.lo_number;
                    return (
                      <button
                        key={ac.ac_code}
                        onClick={() => onSelectAc(isActive ? null : ac)}
                        className={cn(
                          'group w-full text-left px-5 sm:px-6 py-3.5 sm:py-3 transition-colors touch-manipulation flex items-start gap-3 min-h-[44px]',
                          isActive
                            ? 'bg-elec-yellow/10 border-l-2 border-elec-yellow -ml-[2px] pl-[calc(1.25rem-2px)] sm:pl-[calc(1.5rem-2px)]'
                            : 'hover:bg-[hsl(0_0%_15%)]'
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 text-[11px] font-mono tabular-nums shrink-0 w-8',
                            isActive ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          {ac.ac_code}
                        </span>
                        <span className="text-[12.5px] text-white leading-relaxed flex-1">
                          {ac.ac_text}
                        </span>
                        <span
                          className={cn(
                            'text-[11px] shrink-0 self-center transition-colors',
                            isActive
                              ? 'text-elec-yellow'
                              : 'text-white/25 group-hover:text-white'
                          )}
                        >
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* AC side panel — slide-over on right for desktop, bottom on mobile */}
      <AcSheet
        selectedAc={selectedAc}
        onClose={() => onSelectAc(null)}
        onGenerate={(ac) => openGeneratorFor([ac])}
      />
    </>
  );
}

/**
 * Responsive slide-over. Right on desktop (520px wide), bottom on mobile (90vh).
 * Single Sheet component — only mounted when there's a selected AC, so no
 * phantom backdrop on desktop.
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
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          'p-0 bg-[hsl(0_0%_8%)] border-white/[0.08] overflow-hidden',
          isMobile
            ? 'h-[85vh] rounded-t-2xl'
            : 'w-full sm:max-w-[560px] border-l'
        )}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{selectedAc ? `AC ${selectedAc.ac_code}` : 'Assessment criterion'}</SheetTitle>
        </SheetHeader>
        {selectedAc && (
          <div className="h-full overflow-y-auto">
            <AcSidePanel
              ac={selectedAc}
              onClose={onClose}
              onGenerate={() => onGenerate(selectedAc)}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────────── AC side panel ──────────────────────── */

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
  // Pre-fetch counts across all doc types (for tab badges) by pulling "all" once
  const { data: allMatches, loading: allLoading } = useAcRagMatches(
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
  const loading = allLoading;

  const counts = useMemo(() => {
    return {
      all: allMatches.length,
      bs7671: allMatches.filter((m) => m.document_type === 'bs7671').length,
      gn3: allMatches.filter((m) => m.document_type === 'gn3').length,
      osg: allMatches.filter((m) => m.document_type === 'osg').length,
    };
  }, [allMatches]);

  const tabs: { label: string; value: DocType | 'all'; count: number }[] = [
    { label: 'All', value: 'all', count: counts.all },
    { label: 'BS 7671', value: 'bs7671', count: counts.bs7671 },
    { label: 'GN3', value: 'gn3', count: counts.gn3 },
    { label: 'OSG', value: 'osg', count: counts.osg },
  ];

  const a4ChangeCount = matches.filter((m) => m.is_a4_change).length;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            AC {ac.ac_code}
          </div>
          <p className="mt-1 text-[13px] text-white leading-relaxed">{ac.ac_text}</p>
        </div>
        <button
          onClick={onClose}
          className="text-[16px] text-white hover:text-white leading-none shrink-0"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="px-5 py-3 border-b border-white/[0.06] space-y-3">
        <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setDocType(t.value)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-medium whitespace-nowrap touch-manipulation transition-colors flex items-center gap-1.5',
                docType === t.value
                  ? 'bg-elec-yellow text-black'
                  : 'text-white hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <span>{t.label}</span>
              <span
                className={cn(
                  'text-[10px] tabular-nums',
                  docType === t.value ? 'text-black/55' : 'text-white'
                )}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
        {a4ChangeCount > 0 && (
          <div className="text-[11px] text-amber-300/90">
            {a4ChangeCount} match{a4ChangeCount === 1 ? '' : 'es'} flagged as new/updated in A4:2026
          </div>
        )}
        {onGenerate && (
          <PrimaryButton onClick={onGenerate} fullWidth>
            AI generate lesson for this AC →
          </PrimaryButton>
        )}
      </div>

      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {loading ? (
          <div className="px-5 py-6">
            <LoadingState />
          </div>
        ) : matches.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-[12.5px] text-white">
              No matches in{' '}
              {docType === 'all' ? 'the RAG' : docType.toUpperCase()} for this criterion.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {matches.map((m) => {
              const metaBits = [
                m.bs7671_zones?.length ? m.bs7671_zones.join(', ') : null,
                m.equipment_category,
                m.protection_method,
                m.disconnection_time_s != null ? `${m.disconnection_time_s}s` : null,
              ].filter(Boolean);
              return (
                <div key={m.facet_id} className="relative px-5 py-4 pl-6">
                  {/* Vertical accent bar keyed to doc type */}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-0 top-4 bottom-4 w-[2px] rounded-full',
                      m.document_type === 'bs7671'
                        ? 'bg-elec-yellow/70'
                        : m.document_type === 'gn3'
                          ? 'bg-blue-400/60'
                          : 'bg-emerald-400/60'
                    )}
                  />
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    {m.document_type === 'bs7671'
                      ? 'BS 7671'
                      : m.document_type === 'gn3'
                        ? 'Guidance Note 3'
                        : 'On-Site Guide'}
                    {m.reg_number && (
                      <>
                        <span className="mx-2 text-white/25">·</span>
                        <span className="font-mono font-semibold text-elec-yellow">
                          {m.reg_number}
                        </span>
                      </>
                    )}
                    {m.is_a4_change && (
                      <>
                        <span className="mx-2 text-white/25">·</span>
                        <span className="text-amber-300">A4:2026</span>
                      </>
                    )}
                  </div>
                  {m.reg_title && (
                    <div className="mt-1.5 text-[12.5px] font-medium text-white leading-snug">
                      {m.reg_title}
                    </div>
                  )}
                  <p className="mt-1.5 text-[11.5px] text-white leading-relaxed line-clamp-4">
                    {m.content}
                  </p>
                  {(metaBits.length > 0 || m.primary_topic) && (
                    <div className="mt-2 text-[10.5px] text-white">
                      {[m.primary_topic, ...metaBits].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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

/** Pill-group dropdown — compact filter selector that matches the editorial style. */
function FilterPillGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="flex items-center gap-1.5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-1 max-w-full overflow-x-auto hide-scrollbar">
      <span className="text-[10.5px] uppercase tracking-wider text-white px-2 shrink-0">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'shrink-0 px-2.5 py-1 rounded-full text-[11.5px] font-medium whitespace-nowrap transition-colors touch-manipulation',
            value === o.value
              ? 'bg-elec-yellow text-black'
              : 'text-white hover:text-white hover:bg-white/[0.06]'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
