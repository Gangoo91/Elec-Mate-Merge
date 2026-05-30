import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  usePreUseChecks,
  CHECK_TEMPLATES,
  REGULATION_REFS,
  type CheckItem,
  type PreUseCheck,
} from '@/hooks/usePreUseChecks';
import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  FormCard,
  ListCard,
  ListRow,
  SecondaryButton,
  type Tone,
} from '@/components/college/primitives';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { fmtCardDate } from '../common/SafetyRecordCard';
import { ChecklistForm } from './ChecklistForm';
import { useHaptic } from '@/hooks/useHaptic';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';

interface PreUseCheckToolProps {
  onBack: () => void;
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

// One colour dimension = result.
function resultTone(result: string): Tone {
  return result === 'pass' ? 'green' : result === 'fail' ? 'red' : 'blue';
}

const RESULT_PILL: Record<Tone, string> = {
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
};

function ResultPill({ result }: { result: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        RESULT_PILL[resultTone(result)]
      )}
    >
      {result === 'pass' ? 'Pass' : result === 'fail' ? 'Fail' : 'N/A'}
    </span>
  );
}

export function PreUseCheckTool({ onBack }: PreUseCheckToolProps) {
  const haptic = useHaptic();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [shareRecordId, setShareRecordId] = useState<string | null>(null);
  const [shareRecordTitle, setShareRecordTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: checks = [], isLoading } = usePreUseChecks();
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

  const passCount = useMemo(() => checks.filter((c) => c.overall_result === 'pass').length, [checks]);
  const failCount = useMemo(() => checks.filter((c) => c.overall_result === 'fail').length, [checks]);

  const filterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: checks.length },
      { value: 'pass', label: 'Pass', count: passCount },
      { value: 'fail', label: 'Fail', count: failCount },
    ],
    [checks.length, passCount, failCount]
  );

  const handleCategorySelect = (key: CategoryKey) => {
    setSelectedCategory(key);
    setShowForm(true);
  };

  const handleRecheck = (equipmentType: CategoryKey) => {
    setSelectedCategory(equipmentType);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  const handleFormSubmit = () => {
    haptic.success();
    setShowForm(false);
    setSelectedCategory(null);
  };

  const templateItems: CheckItem[] = selectedCategory
    ? CHECK_TEMPLATES[selectedCategory].map((t) => ({
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
      />
    );
  }

  // ─── List ───
  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Pre-Use Checks"
      hero={
        <PageHero
          eyebrow="Pre-Use Checks · PUWER 1998 / LOLER 1998"
          title="Inspect before you use it"
          description="Record a pre-use inspection for ladders, scaffolds, power tools, test instruments and access equipment — pass, fail or N/A against the statutory checklist, with photos and a signature."
          tone="yellow"
        />
      }
      stats={
        checks.length > 0 ? (
          <StatStrip
            stats={[
              { value: checks.length, label: 'Total', onClick: () => setResultFilter('all') },
              { value: passCount, label: 'Pass', tone: 'green', onClick: () => setResultFilter('pass') },
              { value: failCount, label: 'Fail', tone: 'red', onClick: () => setResultFilter('fail') },
            ]}
            columns={3}
          />
        ) : undefined
      }
      filter={
        checks.length > 0 ? (
          <FilterBar
            tabs={filterTabs}
            activeTab={resultFilter}
            onTabChange={setResultFilter}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search checks…"
          />
        ) : undefined
      }
    >
      {/* Start a new check */}
      <FormCard eyebrow="Start a new check">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => {
            const reg = REGULATION_REFS[cat.key];
            const itemCount = CHECK_TEMPLATES[cat.key]?.length || 0;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className="text-left p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] hover:bg-[hsl(0_0%_12%)] touch-manipulation active:scale-[0.98] transition-all"
              >
                <span className="block text-[13px] font-medium text-white">{cat.label}</span>
                <span className="mt-1.5 flex items-center gap-2">
                  {reg && (
                    <span className="text-[9.5px] font-medium px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                      {reg.shortName}
                    </span>
                  )}
                  <span className="text-[10.5px] text-white/45">{itemCount} checks</span>
                </span>
              </button>
            );
          })}
        </div>
      </FormCard>

      {/* Recent checks */}
      <div>
        <Eyebrow className="mb-2.5">Recent checks</Eyebrow>
        {isLoading ? (
          <LoadingState />
        ) : checks.length === 0 ? (
          <EmptyState
            title="No checks recorded yet"
            description="Select an equipment type above to start your first pre-use inspection check."
          />
        ) : filteredChecks.length === 0 ? (
          <EmptyState
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
              return (
                <ListCard key={check.id}>
                  <ListRow
                    accent={resultTone(check.overall_result)}
                    title={`${(check.equipment_type || '').replace(/_/g, ' ')} check`}
                    subtitle={[
                      check.equipment_description || (reg ? reg.shortName : ''),
                      check.site_address || '',
                      `${passN}P / ${failN}F / ${check.items.length} items`,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                    trailing={
                      <div className="flex flex-col items-end gap-1">
                        <ResultPill result={check.overall_result} />
                        <span className="text-[11px] text-white/45 tabular-nums">
                          {fmtCardDate(check.created_at)}
                        </span>
                      </div>
                    }
                  />
                  <div className="flex gap-1.5 px-5 sm:px-6 pb-4">
                    <SecondaryButton
                      size="sm"
                      onClick={() => handleRecheck(check.equipment_type as CategoryKey)}
                    >
                      Re-check
                    </SecondaryButton>
                    <SecondaryButton
                      size="sm"
                      disabled={exporting}
                      onClick={() => exportPDF('pre-use-check', check.id)}
                    >
                      {exporting ? 'Exporting…' : 'Export PDF'}
                    </SecondaryButton>
                    <SecondaryButton
                      size="sm"
                      onClick={() => {
                        setShareRecordTitle((check.equipment_type || '').replace(/_/g, ' '));
                        setShareRecordId(check.id);
                      }}
                    >
                      Share
                    </SecondaryButton>
                  </div>
                </ListCard>
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
