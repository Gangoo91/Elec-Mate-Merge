import React from 'react';
import { cn } from '@/lib/utils';
import { useHazardDatabase } from '../../hooks/useHazardDatabase';
import { MethodStatementData } from '@/types/method-statement';
import {
  FilterBar,
  FormCard,
  Eyebrow,
  ListCard,
  ListRow,
  EmptyState,
  type Tone,
} from '@/components/college/primitives';

interface HazardIntegrationStepProps {
  data: MethodStatementData;
  onDataChange: (updates: Partial<MethodStatementData>) => void;
  linkedHazards: string[];
  onHazardLink: (hazardId: string) => void;
  onHazardUnlink: (hazardId: string) => void;
}

// Risk level → single colour dimension.
const RISK_TONE: Record<string, Tone> = {
  Low: 'green',
  Medium: 'amber',
  High: 'orange',
  'Very High': 'red',
};

const RISK_PILL: Record<string, string> = {
  Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  High: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  'Very High': 'bg-red-500/10 text-red-400 border-red-500/25',
};

function RiskPill({ level }: { level: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        RISK_PILL[level] ?? 'bg-white/[0.05] text-white/55 border-white/10'
      )}
    >
      {level}
    </span>
  );
}

const HazardIntegrationStep: React.FC<HazardIntegrationStepProps> = ({
  linkedHazards,
  onHazardLink,
  onHazardUnlink,
}) => {
  const {
    filteredHazards,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    getHazardById,
  } = useHazardDatabase();

  const linkedHazardObjects = linkedHazards
    .map((id) => getHazardById(id))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <div className="space-y-5">
      <FormCard eyebrow="Hazard assessment">
        <p className="text-[13px] text-white/70 leading-relaxed">
          Link relevant hazards from the database to your method statement. Each hazard carries its
          recommended control measures and the regulations it sits under.
        </p>
      </FormCard>

      {/* Linked hazards */}
      {linkedHazardObjects.length > 0 && (
        <div className="space-y-2">
          <Eyebrow>Linked hazards ({linkedHazardObjects.length})</Eyebrow>
          <ListCard>
            {linkedHazardObjects.map((hazard) => (
              <ListRow
                key={hazard.id}
                accent="green"
                title={hazard.name}
                subtitle={`${hazard.category} · ${hazard.description}`}
                trailing={
                  <div className="flex flex-col items-end gap-1.5">
                    <RiskPill level={hazard.riskLevel} />
                    <button
                      type="button"
                      onClick={() => onHazardUnlink(hazard.id)}
                      className="text-[11px] text-red-400 hover:text-red-300 touch-manipulation"
                    >
                      Unlink
                    </button>
                  </div>
                }
              />
            ))}
          </ListCard>
        </div>
      )}

      {/* Hazard database */}
      <FilterBar
        tabs={categories.map((c) => ({ value: c, label: c }))}
        activeTab={selectedCategory}
        onTabChange={setSelectedCategory}
        search={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search hazards…"
      />

      {filteredHazards.length === 0 ? (
        <EmptyState
          title="No hazards found"
          description="Try adjusting your search terms or category filter."
        />
      ) : (
        <div className="space-y-2">
          <Eyebrow>Hazard database</Eyebrow>
          <ListCard>
            {filteredHazards.map((hazard) => {
              const isLinked = linkedHazards.includes(hazard.id);
              return (
                <ListRow
                  key={hazard.id}
                  onClick={() => (isLinked ? onHazardUnlink(hazard.id) : onHazardLink(hazard.id))}
                  accent={isLinked ? 'green' : RISK_TONE[hazard.riskLevel]}
                  title={hazard.name}
                  subtitle={`${hazard.category} · ${hazard.description}`}
                  trailing={
                    <div className="flex flex-col items-end gap-1.5">
                      <RiskPill level={hazard.riskLevel} />
                      <span
                        className={cn(
                          'text-[11px] font-medium',
                          isLinked ? 'text-emerald-400' : 'text-elec-yellow/90'
                        )}
                      >
                        {isLinked ? 'Linked' : 'Link +'}
                      </span>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
        </div>
      )}
    </div>
  );
};

export default HazardIntegrationStep;
