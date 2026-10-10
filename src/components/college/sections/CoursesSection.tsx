import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { containerVariants, itemVariants, LoadingState } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import {
  TEACH_BTN,
  TEACH_BTN_PRIMARY,
  TEACH_LIST,
  TEACH_ROW,
  TeachingEmpty as CollegeEmpty,
  TeachingHeader,
  TeachTabs,
  TeachToggle,
} from '@/components/college/teaching/TeachingKit';
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
 * College Hub kit (7 Oct 2026): page header with help, kit lists, h-11
 * chips, underline search, one solid volt control per screen.
 */

const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-60 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation lg:max-w-xl';
const PRIMARY = TEACH_BTN_PRIMARY;
const LIST_CARD = TEACH_LIST;
const ROW = TEACH_ROW;

const HELP: PageHelpContent = {
  id: 'college-qualifications',
  title: 'Qualifications',
  what: 'Every electrical qualification in the catalogue, broken down into units, learning outcomes and assessment criteria, each linked to the BS 7671 regulations it touches.',
  steps: [
    {
      title: 'Find the qualification',
      body: 'Search by code or title, or narrow by level and awarding body.',
    },
    {
      title: 'Open a unit',
      body: 'Each unit lists its learning outcomes and assessment criteria.',
    },
    {
      title: 'Tap a criterion',
      body: 'See the regulations, Guidance Note 3 and On-Site Guide sections that match it, and generate a lesson plan from it.',
    },
  ],
  notes: [
    {
      title: 'Courses you run',
      body: 'This is the catalogue. The courses your learners enrol on, and their off-the-job hours, are set in Course setup.',
    },
  ],
};

export function CoursesSection() {
  const [selectedQual, setSelectedQual] = useState<QualificationRow | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitRow | null>(null);
  const [selectedAc, setSelectedAc] = useState<AcRow | null>(null);

  return (
    <>
      <TeachingHeader
        eyebrow="Curriculum"
        title={
          selectedUnit
            ? selectedUnit.unit_title || `Unit ${selectedUnit.unit_code}`
            : selectedQual
              ? selectedQual.title
              : 'Qualifications'
        }
        summary={
          selectedUnit
            ? `${selectedQual?.code}, unit ${selectedUnit.unit_code}.`
            : selectedQual
              ? selectedQual.description || 'Units, learning outcomes and assessment criteria.'
              : 'Every qualification in the catalogue, down to the assessment criteria and the regulations each one touches.'
        }
        help={HELP}
      />
      {/* Breadcrumb — plain text buttons at 44px. The masthead's Back goes to
          the hub; this walks back within the browser. Hidden at the top
          level, where it would only say where you already are. */}
      {selectedQual && (
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
      )}

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
      <motion.div variants={itemVariants}>
        <CollegeSectionTitle
          title="Catalogue"
          sub={
            loading
              ? undefined
              : filtered.length === data.length
                ? `${data.length} qualifications`
                : `${filtered.length} of ${data.length} shown`
          }
        />
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
          {(levels.length > 1 || bodies.length > 1) && (
            <div className="flex flex-wrap items-center gap-2">
              {levels.length > 1 && (
                <TeachToggle
                  label="Level"
                  value={levelFilter}
                  onChange={setLevelFilter}
                  options={[
                    { label: 'All levels', value: 'all' },
                    ...levels.map((l) => ({ label: l, value: l })),
                  ]}
                />
              )}
              {bodies.length > 1 && (
                <TeachToggle
                  label="Awarding body"
                  value={awardingBodyFilter}
                  onChange={setAwardingBodyFilter}
                  options={[
                    { label: 'All bodies', value: 'all' },
                    ...bodies.map((b) => ({ label: shortAwardingBody(b), value: b })),
                  ]}
                />
              )}
            </div>
          )}
        </motion.div>
      )}

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <motion.div variants={itemVariants}>
          <CollegeEmpty
            title={data.length === 0 ? 'No qualifications loaded' : 'No qualifications match'}
            body={
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
                <button
                  type="button"
                  data-testid="qualification-card"
                  onClick={() => onSelect(q)}
                  className={ROW}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold leading-snug text-white">
                      {q.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
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
        {/* One sentence in place of the four figure tiles (8 Oct 2026). */}
        <motion.p variants={itemVariants} className="text-[14px] leading-relaxed text-white">
          {loading
            ? 'Loading the units…'
            : units.length === 0
              ? 'No units are loaded for this qualification yet.'
              : `${units.length} unit${units.length === 1 ? '' : 's'} and ${totalAcs} assessment criteria.`}{' '}
          {[qualification.level, qualification.awarding_body].filter(Boolean).join(', ')}.
        </motion.p>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <CollegeSectionTitle
          title="Units"
          sub="Tap a unit for its learning outcomes and criteria."
        />
        {loading ? (
          <LoadingState />
        ) : units.length === 0 ? (
          <motion.div variants={itemVariants}>
            <CollegeEmpty
              title="No units loaded for this qualification"
              body={`${qualification.code} is in the catalogue but its learning outcomes have not been ingested yet.`}
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className={LIST_CARD}>
            <ul className="divide-y divide-white/[0.10]">
              {units.map((u) => (
                <li key={u.unit_code}>
                  <button
                    type="button"
                    data-testid="unit-row"
                    onClick={() => onSelectUnit(u)}
                    className={ROW}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold leading-snug text-white">
                        {u.unit_title || `Unit ${u.unit_code}`}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                        Unit {u.unit_code} · {u.lo_count} learning outcome
                        {u.lo_count === 1 ? '' : 's'}
                      </span>
                    </span>
                    <span className="shrink-0 text-[12.5px] font-medium text-white">
                      {u.ac_count} criteri{u.ac_count === 1 ? 'on' : 'a'}
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
  // The generator reads its criteria and cohort once, on mount (the same
  // reason StartLessonPlanSheet keys it). It used to stay mounted here with
  // the first criteria it was given, so "Plan a lesson for this criterion"
  // could open on a different criterion, and with none picked it quietly
  // chose the unit's first three. Now each opening mounts it fresh with
  // exactly the criterion tapped, or none (the dialog then opens its own
  // criteria picker), and the criterion sheet closes first.
  const [gen, setGen] = useState<{ key: number; acs: AcRow[] } | null>(null);

  const allAcs = useMemo(() => los.flatMap((lo) => lo.acs), [los]);

  const openGeneratorFor = (acs: AcRow[]) => {
    onSelectAc(null);
    setGen((g) => ({ key: (g?.key ?? 0) + 1, acs }));
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.p variants={itemVariants} className="text-[14px] leading-relaxed text-white">
          {unit.lo_count} learning outcome{unit.lo_count === 1 ? '' : 's'} and {unit.ac_count}{' '}
          assessment criteria. Plan a lesson from the unit and pick its criteria, or tap one
          criterion to see the regulations it touches and plan a lesson for it.
        </motion.p>

        {/* The one solid volt control on this screen. */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => openGeneratorFor([])}
            disabled={loading || allAcs.length === 0}
            className={cn(PRIMARY, 'w-full sm:w-auto')}
          >
            Plan a lesson from this unit
          </button>
        </motion.div>
      </motion.section>

      {gen && (
        <LessonGeneratorDialog
          key={gen.key}
          open
          onOpenChange={(v) => {
            if (!v) setGen(null);
          }}
          qualificationCode={qualification.code}
          qualificationTitle={qualification.title}
          unitCode={unit.unit_code}
          unitTitle={unit.unit_title}
          initialAcs={gen.acs}
          availableAcs={allAcs}
        />
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <CollegeSectionTitle
          title="Learning outcomes"
          sub="Tap a criterion for the regulations it touches."
        />
        {loading ? (
          <LoadingState />
        ) : los.length === 0 ? (
          <motion.div variants={itemVariants}>
            <CollegeEmpty
              title="No learning outcomes loaded"
              body="This unit is in the catalogue but its criteria have not been ingested yet."
            />
          </motion.div>
        ) : (
          <div className="grid items-start gap-3 sm:gap-4 xl:grid-cols-2">
            {los.map((lo) => (
              <motion.div key={lo.lo_number} variants={itemVariants} className={LIST_CARD}>
                <div className="px-5 py-4 sm:px-6">
                  <div className="text-[13px] font-semibold text-white">
                    Learning outcome {lo.lo_number}
                  </div>
                  <h3 className="mt-1 text-[14px] font-semibold leading-snug tracking-tight text-white">
                    {sentenceCase(lo.lo_text)}
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
                          data-testid="ac-row"
                          onClick={() => onSelectAc(isActive ? null : ac)}
                          aria-pressed={isActive}
                          className={cn(
                            'flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation sm:px-5',
                            isActive
                              ? 'bg-white/[0.08]'
                              : 'hover:bg-white/[0.06] active:bg-white/[0.09]'
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                'block text-[12px] font-semibold tabular-nums',
                                isActive ? 'text-elec-yellow' : 'text-white'
                              )}
                            >
                              AC {ac.ac_code}
                            </span>
                            <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white">
                              {sentenceCase(ac.ac_text)}
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
          <SheetTitle>
            {selectedAc ? `AC ${selectedAc.ac_code}` : 'Assessment criterion'}
          </SheetTitle>
        </SheetHeader>
        {selectedAc && (
          <AcSidePanel
            ac={selectedAc}
            onClose={onClose}
            onGenerate={() => onGenerate(selectedAc)}
          />
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
  const navigate = useNavigate();
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

  // A4 tags removed 7 Oct: updated_in is the source edition, not "changed by A4".
  // 8 Oct: the tag line under each match (zones, equipment category,
  // protection method, topic) went too; it was index metadata, not guidance.

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/[0.10] px-4 pb-3 pt-4 sm:px-5">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-elec-yellow">AC {ac.ac_code}</div>
          <p className="mt-1 text-[13px] leading-relaxed text-white">{sentenceCase(ac.ac_text)}</p>
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
        <TeachTabs
          label="Source"
          value={docType}
          onChange={setDocType}
          tabs={tabs}
          className="sm:-mx-0"
        />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {onGenerate && (
            <button type="button" onClick={onGenerate} className={cn(PRIMARY, 'w-full')}>
              Plan a lesson for this criterion
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              navigate(
                `/college/curriculum/ac/${[ac.qualification_code, ac.unit_code, ac.ac_code]
                  .map(encodeURIComponent)
                  .join('/')}`
              )
            }
            className={cn(TEACH_BTN, 'w-full')}
          >
            Learners, resources and lessons
          </button>
        </div>
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
              return (
                <li key={m.facet_id} className="flex gap-3 px-4 py-4 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 text-[12px] font-semibold text-white">
                      <span>{docLabel(m.document_type)}</span>
                      {m.reg_number && (
                        <span className="tabular-nums text-elec-yellow">{m.reg_number}</span>
                      )}
                    </div>
                    {m.reg_title && (
                      <div className="mt-1 text-[13px] font-semibold leading-snug text-white">
                        {m.reg_title}
                      </div>
                    )}
                    <p className="mt-1 line-clamp-4 text-[12px] leading-relaxed text-white">
                      {m.content}
                    </p>
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

/** A source's name in words; never the raw document_type id. */
function docLabel(t: string): string {
  if (t in DOC_LABEL) return DOC_LABEL[t as DocType];
  if (t === 'approved_doc') return 'Approved Document';
  const words = t.replace(/[_-]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Catalogue text often starts lower case ("identify roles…"). */
function sentenceCase(t: string | null | undefined): string {
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : '';
}

function shortAwardingBody(b: string): string {
  if (b === 'City & Guilds') return 'C&G';
  if (b.includes('ECS')) return 'ECS';
  return b;
}
