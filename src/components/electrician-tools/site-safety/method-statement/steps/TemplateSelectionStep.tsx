import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Clock, Star, Search, Filter, SkipForward, ArrowRight, CheckCircle, Eye, GitCompare, Bookmark, Heart, Info } from 'lucide-react';
import { MethodTemplate } from '@/types/method-statement';
import { methodTemplates, getTemplatesByCategory } from '@/data/method-statement-templates';
import TemplatePreviewModal from './TemplatePreviewModal';
import TemplateComparisonModal from './TemplateComparisonModal';
import SmartRecommendations from './SmartRecommendations';
import { RequiredFieldTooltip } from '@/components/ui/required-field-tooltip';

interface TemplateSelectionStepProps {
  onTemplateSelect: (template: MethodTemplate) => void;
  onSkipTemplate: () => void;
}

const TemplateSelectionStep = ({ onTemplateSelect, onSkipTemplate }: TemplateSelectionStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<MethodTemplate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [focusedTemplate, setFocusedTemplate] = useState<string | null>(null);
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
      const timeout = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent, template: MethodTemplate) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedTemplate(template);
    }
    if (e.key === 'ArrowRight' && selectedTemplate?.id === template.id) {
      e.preventDefault();
      onTemplateSelect(template);
    }
  };

  const categories = Array.from(new Set(methodTemplates.map(t => t.category)));
  
  const filteredTemplates = methodTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.requiredQualifications.some(qual => 
                           qual.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || selectedDifficulty === 'all-difficulty' || template.difficultyLevel === selectedDifficulty;
    const matchesDuration = !selectedDuration || selectedDuration === 'all-duration' || (
      selectedDuration === 'quick' && parseInt(template.estimatedDuration.split('-')[0]) <= 2 ||
      selectedDuration === 'medium' && parseInt(template.estimatedDuration.split('-')[0]) > 2 && parseInt(template.estimatedDuration.split('-')[0]) <= 6 ||
      selectedDuration === 'long' && parseInt(template.estimatedDuration.split('-')[0]) > 6
    );
    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
  });

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-green-500/20 text-green-300';
      case 'intermediate': return 'bg-blue-500/20 text-blue-300';
      case 'advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-elec-gray/20 text-elec-gray';
    }
  };

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
    if (comparisonTemplates.length > 0) {
      setShowComparison(true);
    }
  };

  const toggleFavorite = (templateId: string) => {
    const newFavorites = new Set(favoriteTemplates);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavoriteTemplates(newFavorites);
  };

  const toggleComparison = (template: MethodTemplate) => {
    const newComparisons = [...comparisonTemplates];
    const index = newComparisons.findIndex(t => t.id === template.id);
    
    if (index > -1) {
      newComparisons.splice(index, 1);
    } else if (newComparisons.length < 3) {
      newComparisons.push(template);
    }
    
    setComparisonTemplates(newComparisons);
  };

  return (
    <div className="w-full max-w-full mx-auto space-y-4 sm:space-y-6">
      {/* Header - Enhanced mobile typography */}
      <Card className="border-blue-500/20 bg-blue-500/5 mobile-card">
        <CardHeader className="p-0">
          <CardTitle className="text-blue-300 flex items-center gap-2 mobile-heading">
            <Zap className="h-5 w-5 flex-shrink-0" />
            <span className="break-words">Choose a Method Statement Template</span>
            <RequiredFieldTooltip content="Templates are pre-built method statements that comply with BS7671:2018+A3:2024 regulations and include all necessary safety procedures" />
          </CardTitle>
          <p className="text-muted-foreground mobile-text">
            Start with a proven template or build from scratch. Templates include BS7671-compliant safety requirements and detailed step-by-step procedures.
          </p>
          {!selectedTemplate && (
            <div className="mt-3 flex items-center gap-2 text-sm text-blue-300/80">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Select a template below or use smart recommendations</span>
            </div>
          )}
          {comparisonTemplates.length > 0 && (
            <div className="mt-3 flex items-center justify-between gap-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <GitCompare className="h-4 w-4" />
                <span>{comparisonTemplates.length} template{comparisonTemplates.length !== 1 ? 's' : ''} selected for comparison</span>
              </div>
              <Button
                size="sm"
                onClick={handleCompareTemplates}
                className="h-8 px-3 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Compare
              </Button>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Search and Filters - Mobile-first responsive design */}
      <Card className="border-elec-yellow/20 bg-elec-gray mobile-card shadow-sm w-full overflow-hidden">
        <CardContent className="p-0 w-full">
          {/* Mobile-optimized layout with proper containment */}
          <div className="w-full space-y-3 sm:space-y-4">
            {/* Search Input - Contained within parent */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground flex-shrink-0 z-10" />
              <Input
                ref={searchInputRef}
                placeholder="Search templates by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 h-12 text-base border-2 border-elec-yellow/20 bg-background focus:border-elec-yellow/60 focus:bg-background transition-all duration-200 touch-manipulation focus:ring-2 focus:ring-elec-yellow/20"
                autoComplete="off"
                autoCapitalize="none"
                aria-label="Search method statement templates"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-elec-yellow/30 border-t-elec-yellow rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {/* Filters Row - Mobile-first stacked layout */}
            <div className="w-full flex flex-col gap-3">
              {/* Category Filter - Full width on mobile */}
              <div className="w-full">
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full h-12 text-base border-2 border-elec-yellow/20 bg-background focus:border-elec-yellow/60 transition-all duration-200 shadow-sm">
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                      <Filter className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                      <span className="flex-1 text-left truncate">
                        {selectedCategory || "All Categories"}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-50 max-h-60 overflow-y-auto bg-background border-elec-yellow/20 shadow-lg w-full">
                    <SelectItem value="all" className="text-base py-3 cursor-pointer w-full">
                      All Categories
                    </SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-base py-3 cursor-pointer w-full">
                        <span className="break-words w-full">{category}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Advanced Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="w-full flex items-center justify-center gap-2 h-12 px-4 text-base font-medium border-2 border-elec-yellow/20 bg-background hover:border-elec-yellow/60 hover:bg-elec-yellow/10 transition-all duration-200 touch-manipulation active:scale-[0.98] shadow-sm"
              >
                <Filter className="h-4 w-4 flex-shrink-0" />
                <span>{showAdvancedFilters ? 'Hide Filters' : 'More Filters'}</span>
              </Button>

              {/* Skip Template Button - Full width on mobile */}
              <Button
                variant="outline"
                onClick={onSkipTemplate}
                className="w-full flex items-center justify-center gap-2 h-12 px-4 text-base font-medium border-2 border-elec-yellow/20 bg-background hover:border-elec-yellow/60 hover:bg-elec-yellow/10 transition-all duration-200 touch-manipulation active:scale-[0.98] shadow-sm"
              >
                <SkipForward className="h-4 w-4 flex-shrink-0" />
                <span>Skip Template</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <Card className="border-elec-yellow/20 bg-elec-card mobile-card">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Difficulty Filter */}
              <div>
                <label className="text-sm font-medium text-elec-yellow mb-2 block">Difficulty Level</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="h-10 border-elec-yellow/20">
                    <SelectValue placeholder="Any difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-difficulty">Any difficulty</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="text-sm font-medium text-elec-yellow mb-2 block">Project Duration</label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="h-10 border-elec-yellow/20">
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-duration">Any duration</SelectItem>
                    <SelectItem value="quick">Quick (≤2 hours)</SelectItem>
                    <SelectItem value="medium">Medium (2-6 hours)</SelectItem>
                    <SelectItem value="long">Long (6+ hours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedDifficulty('');
                  setSelectedDuration('');
                  setSelectedCategory('');
                  setSearchTerm('');
                }}
                className="text-xs border-elec-yellow/20"
              >
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      {searchTerm && !isSearching && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
          </span>
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                searchInputRef.current?.focus();
              }}
              className="text-xs h-6 px-2"
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Smart Recommendations */}
      {!searchTerm && filteredTemplates.length > 0 && (
        <SmartRecommendations
          templates={filteredTemplates}
          searchTerm={searchTerm}
          onSelectTemplate={onTemplateSelect}
          onViewTemplate={handlePreviewTemplate}
        />
      )}

      {/* Template Grid - Enhanced responsive design with consistent spacing */}
      <div className="responsive-template-grid">
        {/* Custom responsive grid with optimized breakpoints for template cards */}
        {/* auto-rows-fr ensures equal card heights */}
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            tabIndex={0}
            role="button"
            aria-label={`Select ${template.name} template`}
            aria-pressed={selectedTemplate?.id === template.id}
            className={`
              cursor-pointer mobile-interactive mobile-card-compact border-2 h-full flex flex-col group
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 focus:ring-offset-2 focus:ring-offset-background
              ${selectedTemplate?.id === template.id
                ? 'border-elec-yellow bg-elec-card shadow-lg ring-2 ring-elec-yellow/20'
                : 'border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 hover:shadow-md'
              }
              ${template.isPopular ? 'relative overflow-hidden' : ''}
            `}
            onClick={() => setSelectedTemplate(template)}
            onKeyDown={(e) => handleKeyDown(e, template)}
            onFocus={() => setFocusedTemplate(template.id)}
            onBlur={() => setFocusedTemplate(null)}
          >
            {/* Card Header - Optimized spacing and alignment */}
            <CardHeader className="pt-0 px-0 flex-shrink-0">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {template.isPopular && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-blue-400 text-blue-400 flex-shrink-0" />
                        <span className="text-xs text-blue-400 font-medium">Popular</span>
                      </div>
                    )}
                    {selectedTemplate?.id === template.id && (
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 animate-in fade-in duration-200" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getDifficultyColor(template.difficultyLevel)} text-xs flex-shrink-0 px-2 py-1 transition-colors duration-200`}>
                      {template.difficultyLevel}
                    </Badge>
                    {focusedTemplate === template.id && (
                      <div className="text-xs text-elec-yellow">
                        Press Enter to select
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewTemplate(template);
                    }}
                    className="h-6 px-2 text-xs border-elec-yellow/20 hover:border-elec-yellow/40 flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(template.id);
                    }}
                    className={`h-6 px-2 text-xs border-elec-yellow/20 hover:border-elec-yellow/40 flex items-center gap-1 ${
                      favoriteTemplates.has(template.id) ? 'bg-red-500/20 text-red-400' : ''
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${favoriteTemplates.has(template.id) ? 'fill-current' : ''}`} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComparison(template);
                    }}
                    className={`h-6 px-2 text-xs border-elec-yellow/20 hover:border-elec-yellow/40 flex items-center gap-1 ${
                      comparisonTemplates.some(t => t.id === template.id) ? 'bg-purple-500/20 text-purple-400' : ''
                    }`}
                    disabled={!comparisonTemplates.some(t => t.id === template.id) && comparisonTemplates.length >= 3}
                  >
                    <GitCompare className="h-3 w-3" />
                  </Button>
                </div>
                <CardTitle className="text-base sm:text-lg text-elec-yellow">
                  <span className="break-words line-clamp-2 leading-tight">{template.name}</span>
                </CardTitle>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-2">
                {template.description}
              </p>
            </CardHeader>
            
            {/* Card Content - Flexible layout with proper spacing */}
            <CardContent className="p-0 space-y-4 flex-1 flex flex-col">
              {/* Duration Info */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                <Clock className="h-4 w-4 flex-shrink-0 text-elec-yellow group-hover:scale-110 transition-transform duration-200" />
                <span className="break-words">{template.estimatedDuration}</span>
              </div>
              
              {/* Qualifications Section */}
              <div className="space-y-2 flex-shrink-0">
                <div className="text-xs sm:text-sm font-medium text-elec-yellow">Required Qualifications:</div>
                <div className="flex flex-wrap gap-1.5">
                  {template.requiredQualifications.slice(0, 2).map((qual, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs break-words max-w-full border-elec-yellow/30 text-elec-yellow/90 hover:bg-elec-yellow/10 transition-colors"
                    >
                      <span className="truncate max-w-[120px]">{qual}</span>
                    </Badge>
                  ))}
                  {template.requiredQualifications.length > 2 && (
                    <Badge variant="outline" className="text-xs flex-shrink-0 border-elec-yellow/30 text-elec-yellow/90">
                      +{template.requiredQualifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Method Steps Section - Flexible height */}
              <div className="space-y-2 flex-1 min-h-0">
                <div className="text-xs sm:text-sm font-medium text-elec-yellow flex items-center justify-between">
                  <span>Method Steps ({template.steps.length}):</span>
                  {selectedTemplate?.id === template.id && (
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <ArrowRight className="h-3 w-3" />
                      <span>Ready to use</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                  {template.steps.slice(0, 3).map((step, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-medium">
                        {index + 1}
                      </div>
                      <span className="break-words line-clamp-2 leading-relaxed">{step.title}</span>
                    </div>
                  ))}
                  {template.steps.length > 3 && (
                    <div className="text-xs text-muted-foreground pl-7 italic bg-elec-gray/10 rounded px-2 py-1">
                      +{template.steps.length - 3} more steps
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Action - Mobile optimized */}
      {selectedTemplate && (
        <Card className="border-green-500/20 bg-green-500/5 mobile-card">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-green-300 mobile-subheading break-words">
                  Selected: {selectedTemplate.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  This template includes {selectedTemplate.steps.length} pre-configured steps
                </p>
              </div>
                <Button
                onClick={() => onTemplateSelect(selectedTemplate)}
                className="bg-green-600 hover:bg-green-700 h-12 px-6 text-base w-full sm:w-auto flex-shrink-0 transition-all duration-200 active:scale-[0.98] focus:ring-2 focus:ring-green-400/50 group"
                aria-label={`Use ${selectedTemplate.name} template to continue`}
              >
                <span>Use This Template</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </CardContent>
        </Card>
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

      {/* No Results - Mobile optimized */}
      {filteredTemplates.length === 0 && (
        <Card className="border-elec-gray/20 bg-elec-gray/5 mobile-card">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="text-elec-gray mb-3 mobile-subheading">No templates found</div>
            <p className="text-muted-foreground mb-6 mobile-text max-w-md mx-auto">
              Try adjusting your search terms or create a method statement from scratch.
            </p>
            <Button 
              onClick={onSkipTemplate} 
              variant="outline"
              className="h-12 px-6 text-base transition-all duration-200 active:scale-[0.98]"
            >
              Start from Scratch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TemplateSelectionStep;