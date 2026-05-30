import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MethodTemplate } from '@/types/method-statement';
import { methodTemplates } from '@/data/method-statement-templates';
import TemplatePreviewModal from './TemplatePreviewModal';
import TemplateComparisonModal from './TemplateComparisonModal';
import SmartRecommendations from './SmartRecommendations';
import {
  FilterBar,
  FormCard,
  Field,
  Eyebrow,
  ListCard,
  ListRow,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  TextAction,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/college/primitives';

interface TemplateSelectionStepProps {
  onTemplateSelect: (template: MethodTemplate) => void;
  onSkipTemplate: () => void;
}

// Difficulty maps to a single status dimension (the one meaningful colour).
const DIFFICULTY_TONE: Record<string, Tone> = {
  basic: 'green',
  intermediate: 'blue',
  advanced: 'red',
};

const DIFFICULTY_PILL: Record<string, string> = {
  basic: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  intermediate: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  advanced: 'bg-red-500/10 text-red-400 border-red-500/25',
};

function DifficultyPill({ level }: { level: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        DIFFICULTY_PILL[level] ?? 'bg-white/[0.05] text-white/55 border-white/10'
      )}
    >
      {level}
    </span>
  );
}

const TemplateSelectionStep = ({
  onTemplateSelect,
  onSkipTemplate,
}: TemplateSelectionStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<MethodTemplate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<MethodTemplate | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonTemplates, setComparisonTemplates] = useState<MethodTemplate[]>([]);
  const [favoriteTemplates, setFavoriteTemplates] = useState<Set<string>>(new Set());
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced search to improve UX
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timeout = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timeout);
    }
    setIsSearching(false);
  }, [searchTerm]);

  const categories = Array.from(new Set(methodTemplates.map((t) => t.category)));

  const filteredTemplates = methodTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.requiredQualifications.some((qual) =>
        qual.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    const matchesDifficulty =
      !selectedDifficulty ||
      selectedDifficulty === 'all-difficulty' ||
      template.difficultyLevel === selectedDifficulty;
    const matchesDuration =
      !selectedDuration ||
      selectedDuration === 'all-duration' ||
      (selectedDuration === 'quick' && parseInt(template.estimatedDuration.split('-')[0]) <= 2) ||
      (selectedDuration === 'medium' &&
        parseInt(template.estimatedDuration.split('-')[0]) > 2 &&
        parseInt(template.estimatedDuration.split('-')[0]) <= 6) ||
      (selectedDuration === 'long' && parseInt(template.estimatedDuration.split('-')[0]) > 6);
    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
  });

  const handlePreviewTemplate = (template: MethodTemplate) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const handleUseTemplate = (template: MethodTemplate) => {
    setShowPreview(false);
    setShowComparison(false);
    onTemplateSelect(template);
  };

  const handleCompareTemplates = () => {
    if (comparisonTemplates.length > 0) setShowComparison(true);
  };

  const toggleFavorite = (templateId: string) => {
    const next = new Set(favoriteTemplates);
    if (next.has(templateId)) next.delete(templateId);
    else next.add(templateId);
    setFavoriteTemplates(next);
  };

  const toggleComparison = (template: MethodTemplate) => {
    const next = [...comparisonTemplates];
    const index = next.findIndex((t) => t.id === template.id);
    if (index > -1) next.splice(index, 1);
    else if (next.length < 3) next.push(template);
    setComparisonTemplates(next);
  };

  const clearFilters = () => {
    setSelectedDifficulty('');
    setSelectedDuration('');
    setSelectedCategory('');
    setSearchTerm('');
  };

  return (
    <div className="space-y-5">
      {/* Intro + skip */}
      <FormCard eyebrow="Choose a template">
        <p className="text-[13px] text-white/70 leading-relaxed">
          Start with a proven template or build from scratch. Templates include BS 7671-compliant
          safety requirements and detailed step-by-step procedures.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <SecondaryButton onClick={onSkipTemplate}>Start from scratch</SecondaryButton>
          {comparisonTemplates.length > 0 && (
            <PrimaryButton onClick={handleCompareTemplates}>
              Compare {comparisonTemplates.length}
            </PrimaryButton>
          )}
        </div>
      </FormCard>

      {/* Search + category filter */}
      <FilterBar
        tabs={[
          { value: '', label: 'All', count: methodTemplates.length },
          ...categories.map((c) => ({
            value: c,
            label: c,
            count: methodTemplates.filter((t) => t.category === c).length,
          })),
        ]}
        activeTab={selectedCategory}
        onTabChange={setSelectedCategory}
        search={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search templates…"
        actions={
          <SecondaryButton size="sm" onClick={() => setShowAdvancedFilters((v) => !v)}>
            {showAdvancedFilters ? 'Hide filters' : 'More filters'}
          </SecondaryButton>
        }
      />

      {/* Advanced filters */}
      {showAdvancedFilters && (
        <FormCard eyebrow="Refine">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Difficulty level">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Any difficulty" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="all-difficulty">Any difficulty</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Project duration">
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Any duration" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="all-duration">Any duration</SelectItem>
                  <SelectItem value="quick">Quick (≤2 hours)</SelectItem>
                  <SelectItem value="medium">Medium (2-6 hours)</SelectItem>
                  <SelectItem value="long">Long (6+ hours)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="flex justify-end pt-1">
            <TextAction onClick={clearFilters}>Clear all filters</TextAction>
          </div>
        </FormCard>
      )}

      {/* Results summary */}
      {searchTerm && !isSearching && (
        <div className="flex items-center justify-between text-[12px] text-white/55">
          <span>
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
          </span>
          <TextAction
            onClick={() => {
              setSearchTerm('');
              searchInputRef.current?.focus();
            }}
          >
            Clear search
          </TextAction>
        </div>
      )}

      {/* Smart recommendations */}
      {!searchTerm && filteredTemplates.length > 0 && (
        <SmartRecommendations
          templates={filteredTemplates}
          searchTerm={searchTerm}
          onSelectTemplate={onTemplateSelect}
          onViewTemplate={handlePreviewTemplate}
        />
      )}

      {/* Template list */}
      {filteredTemplates.length === 0 ? (
        <EmptyState
          title="No templates found"
          description="Try adjusting your search terms or create a method statement from scratch."
          action="Start from scratch"
          onAction={onSkipTemplate}
        />
      ) : (
        <div className="space-y-2">
          <Eyebrow>{filteredTemplates.length} templates</Eyebrow>
          <ListCard>
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplate?.id === template.id;
              const inComparison = comparisonTemplates.some((t) => t.id === template.id);
              const isFavorite = favoriteTemplates.has(template.id);
              return (
                <ListRow
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  accent={isSelected ? 'yellow' : DIFFICULTY_TONE[template.difficultyLevel]}
                  title={template.name}
                  subtitle={`${template.category} · ${template.steps.length} steps · ${template.estimatedDuration}`}
                  trailing={
                    <div className="flex flex-col items-end gap-1.5">
                      <DifficultyPill level={template.difficultyLevel} />
                      <div className="flex items-center gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreviewTemplate(template);
                          }}
                          className="text-white/55 hover:text-white touch-manipulation"
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(template.id);
                          }}
                          className={cn(
                            'touch-manipulation',
                            isFavorite ? 'text-elec-yellow' : 'text-white/55 hover:text-white'
                          )}
                        >
                          {isFavorite ? 'Saved' : 'Save'}
                        </button>
                        <button
                          type="button"
                          disabled={!inComparison && comparisonTemplates.length >= 3}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComparison(template);
                          }}
                          className={cn(
                            'touch-manipulation disabled:opacity-40',
                            inComparison ? 'text-elec-yellow' : 'text-white/55 hover:text-white'
                          )}
                        >
                          {inComparison ? 'Comparing' : 'Compare'}
                        </button>
                      </div>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
        </div>
      )}

      {/* Selection action */}
      {selectedTemplate && (
        <FormCard eyebrow="Selected template">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[15px] font-medium text-white truncate">
                {selectedTemplate.name}
              </div>
              <p className="text-[12px] text-white/55 mt-0.5">
                Includes {selectedTemplate.steps.length} pre-configured steps
              </p>
            </div>
            <PrimaryButton onClick={() => onTemplateSelect(selectedTemplate)}>
              Use this template
            </PrimaryButton>
          </div>
        </FormCard>
      )}

      {/* Modals */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onUseTemplate={handleUseTemplate}
      />
      <TemplateComparisonModal
        templates={comparisonTemplates}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        onSelectTemplate={handleUseTemplate}
      />
    </div>
  );
};

export default TemplateSelectionStep;
