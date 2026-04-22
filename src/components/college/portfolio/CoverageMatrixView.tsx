import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoverageMatrixEntry, KSBMapping } from '@/hooks/college/useCollegePortfolios';
import {
  SectionHeader,
  StatStrip,
  ListCard,
  Pill,
  EmptyState,
  type Tone,
} from '@/components/college/primitives';

interface CoverageMatrixViewProps {
  coverageMatrix: CoverageMatrixEntry[];
  ksbMappings?: KSBMapping[];
  onCategoryClick?: (categoryId: string) => void;
  studentName?: string;
  qualificationTitle?: string;
}

const CoverageMatrixView: React.FC<CoverageMatrixViewProps> = ({
  coverageMatrix,
  ksbMappings = [],
  onCategoryClick,
  studentName,
  qualificationTitle,
}) => {
  const [activeTab, setActiveTab] = useState('categories');

  const knowledgeKSBs = ksbMappings.filter((k) => k.ksbType === 'knowledge');
  const skillKSBs = ksbMappings.filter((k) => k.ksbType === 'skill');
  const behaviourKSBs = ksbMappings.filter((k) => k.ksbType === 'behaviour');

  const totalCategories = coverageMatrix.length;
  const completedCategories = coverageMatrix.filter((c) => c.status === 'complete').length;
  const inProgressCategories = coverageMatrix.filter((c) => c.status === 'in_progress').length;
  const notStartedCategories = coverageMatrix.filter((c) => c.status === 'not_started').length;

  const totalKSBs = ksbMappings.length;
  const verifiedKSBs = ksbMappings.filter((k) => k.mappingStatus === 'verified').length;

  const getStatusTone = (status: string): Tone => {
    switch (status) {
      case 'complete':
        return 'green';
      case 'in_progress':
        return 'amber';
      default:
        return 'blue';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  const getKSBMappingTone = (status: string): Tone => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'partial':
        return 'amber';
      default:
        return 'blue';
    }
  };

  const KSBSection = ({
    title,
    items,
    tone,
  }: {
    title: string;
    items: KSBMapping[];
    tone: Tone;
  }) => {
    const verified = items.filter((k) => k.mappingStatus === 'verified').length;
    const progress = items.length > 0 ? Math.round((verified / items.length) * 100) : 0;

    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={
                tone === 'blue'
                  ? 'inline-block h-1.5 w-1.5 rounded-full bg-blue-400'
                  : tone === 'green'
                    ? 'inline-block h-1.5 w-1.5 rounded-full bg-green-400'
                    : 'inline-block h-1.5 w-1.5 rounded-full bg-purple-400'
              }
            />
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              {title}
            </div>
          </div>
          <Pill tone={tone}>
            {verified}/{items.length}
          </Pill>
        </div>

        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow/80 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 space-y-1.5 max-h-64 overflow-y-auto">
          {items.map((ksb) => (
            <div
              key={ksb.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Pill tone="indigo">{ksb.ksbCode}</Pill>
                <span className="text-[13px] text-white/70 truncate">{ksb.ksbTitle}</span>
              </div>
              <Pill tone={getKSBMappingTone(ksb.mappingStatus)}>
                {ksb.mappingStatus === 'verified'
                  ? 'Verified'
                  : ksb.mappingStatus === 'partial'
                    ? 'Partial'
                    : 'Pending'}
              </Pill>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center text-white/45 py-4 text-[12.5px]">
              No {title.toLowerCase()} mapped yet
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Student Header */}
      {(studentName || qualificationTitle) && (
        <div>
          {studentName && (
            <h3 className="text-xl font-semibold text-white tracking-tight">{studentName}</h3>
          )}
          {qualificationTitle && (
            <p className="mt-1 text-[13px] text-white/55">{qualificationTitle}</p>
          )}
        </div>
      )}

      {/* Stats */}
      <StatStrip
        stats={[
          {
            value: `${completedCategories}/${totalCategories}`,
            label: 'Categories',
            tone: 'blue',
          },
          {
            value: `${verifiedKSBs}/${totalKSBs}`,
            label: 'KSBs Verified',
            tone: 'green',
          },
          { value: inProgressCategories, label: 'In Progress', tone: 'amber' },
          { value: notStartedCategories, label: 'Not Started' },
        ]}
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-1 h-auto">
          <TabsTrigger
            value="categories"
            className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Unit Coverage
          </TabsTrigger>
          <TabsTrigger
            value="ksbs"
            className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            KSB Mapping
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-6 space-y-4">
          <SectionHeader
            eyebrow="Units"
            title="Qualification Unit Coverage"
          />
          <p className="text-[13px] text-white/55">
            Track evidence coverage across all qualification units
          </p>

          {coverageMatrix.length === 0 ? (
            <EmptyState
              title="No coverage data available"
              description="Coverage will appear here once evidence is submitted against units."
            />
          ) : (
            <ListCard>
              {coverageMatrix.map((entry) => {
                const Inner = (
                  <div className="px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-4 w-full">
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-medium text-white truncate">
                        {entry.categoryName}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-white/50">
                        <span>
                          Evidence{' '}
                          <span className="text-white/70 tabular-nums">
                            {entry.completedEntries}/{entry.requiredEntries}
                          </span>
                        </span>
                        <span>
                          Verified{' '}
                          <span className="text-white/70 tabular-nums">
                            {entry.verifiedCriteria}/{entry.totalCriteria}
                          </span>
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden max-w-[180px]">
                          <div
                            className="h-full bg-elec-yellow/80 rounded-full"
                            style={{ width: `${entry.completionPercentage}%` }}
                          />
                        </div>
                        <span className="text-[11.5px] text-white/55 tabular-nums">
                          {entry.completionPercentage}%
                        </span>
                      </div>
                    </div>
                    <Pill tone={getStatusTone(entry.status)} className="shrink-0">
                      {getStatusLabel(entry.status)}
                    </Pill>
                    {onCategoryClick && (
                      <span className="text-[13px] font-medium text-elec-yellow/90 shrink-0">
                        →
                      </span>
                    )}
                  </div>
                );

                return onCategoryClick ? (
                  <button
                    key={entry.id}
                    onClick={() => onCategoryClick(entry.categoryId)}
                    className="w-full text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                  >
                    {Inner}
                  </button>
                ) : (
                  <div key={entry.id} className="w-full">
                    {Inner}
                  </div>
                );
              })}
            </ListCard>
          )}
        </TabsContent>

        <TabsContent value="ksbs" className="mt-6 space-y-4">
          <SectionHeader eyebrow="Standards" title="KSB Mapping" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KSBSection title="Knowledge" items={knowledgeKSBs} tone="blue" />
            <KSBSection title="Skills" items={skillKSBs} tone="green" />
            <KSBSection title="Behaviours" items={behaviourKSBs} tone="purple" />
          </div>

          {ksbMappings.length === 0 && (
            <EmptyState
              title="No KSB mappings available yet"
              description="KSBs will appear here once evidence is mapped to apprenticeship standards"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoverageMatrixView;
