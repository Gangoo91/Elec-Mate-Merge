import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Clock, Star, Search, Filter, SkipForward } from 'lucide-react';
import { MethodTemplate } from '@/types/method-statement';
import { methodTemplates, getTemplatesByCategory } from '@/data/method-statement-templates';

interface TemplateSelectionStepProps {
  onTemplateSelect: (template: MethodTemplate) => void;
  onSkipTemplate: () => void;
}

const TemplateSelectionStep = ({ onTemplateSelect, onSkipTemplate }: TemplateSelectionStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<MethodTemplate | null>(null);

  const categories = Array.from(new Set(methodTemplates.map(t => t.category)));
  
  const filteredTemplates = methodTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-green-500/20 text-green-300';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="mobile-container space-y-4 sm:space-y-6">
      {/* Header - Enhanced mobile typography */}
      <Card className="border-blue-500/20 bg-blue-500/5 mobile-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-blue-300 flex items-center gap-2 mobile-heading">
            <Zap className="h-5 w-5 flex-shrink-0" />
            <span className="break-words">Choose a Method Statement Template</span>
          </CardTitle>
          <p className="text-muted-foreground mobile-text">
            Start with a proven template or build from scratch. Templates include BS7671-compliant safety requirements.
          </p>
        </CardHeader>
      </Card>

      {/* Search and Filters - Enhanced mobile-first responsive design */}
      <Card className="border-elec-yellow/20 bg-elec-gray/95 backdrop-blur-sm mobile-card shadow-sm">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          {/* Mobile-optimized layout that prevents overflow */}
          <div className="space-y-3 sm:space-y-4">
            {/* Search Input - Full width with proper touch targets */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground flex-shrink-0 z-10" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 h-11 sm:h-12 text-sm sm:text-base border-2 border-elec-yellow/20 bg-background/80 backdrop-blur-sm focus:border-elec-yellow/60 focus:bg-background transition-all duration-200 touch-manipulation"
                autoComplete="off"
                autoCapitalize="none"
              />
            </div>
            
            {/* Filters Row - Fixed width and text overflow issues */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              {/* Category Filter - Fixed width to prevent text truncation */}
              <div className="flex-1 min-w-0 sm:min-w-[200px] lg:min-w-[240px]">
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full h-11 sm:h-12 text-sm sm:text-base border-2 border-elec-yellow/20 bg-background/80 backdrop-blur-sm focus:border-elec-yellow/60 transition-all duration-200 shadow-sm">
                    <div className="flex items-center gap-2 min-w-0 overflow-hidden pr-1">
                      <Filter className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                      <SelectValue placeholder="All Categories" className="flex-1 text-left">
                        {selectedCategory || "All Categories"}
                      </SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-50 max-h-60 overflow-y-auto bg-background/95 backdrop-blur-md border-elec-yellow/20 shadow-lg min-w-[200px]">
                    <SelectItem value="all" className="text-sm sm:text-base py-2.5 cursor-pointer">
                      All Categories
                    </SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-sm sm:text-base py-2.5 cursor-pointer">
                        <span className="break-words whitespace-normal">{category}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Skip Template Button - Improved responsive sizing */}
              <Button
                variant="outline"
                onClick={onSkipTemplate}
                className="w-full sm:w-auto sm:min-w-[160px] lg:min-w-[180px] flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base font-medium border-2 border-elec-yellow/20 bg-background/80 backdrop-blur-sm hover:border-elec-yellow/60 hover:bg-elec-yellow/10 transition-all duration-200 touch-manipulation active:scale-[0.98] flex-shrink-0 shadow-sm"
              >
                <SkipForward className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Skip Template</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Grid - Enhanced responsive design with consistent spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 auto-rows-fr">
        {/* auto-rows-fr ensures equal card heights */}
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`
              cursor-pointer mobile-interactive mobile-card-compact border-2 h-full flex flex-col
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              ${selectedTemplate?.id === template.id
                ? 'border-elec-yellow bg-elec-yellow/10 shadow-lg ring-2 ring-elec-yellow/20'
                : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 hover:shadow-md'
              }
            `}
            onClick={() => setSelectedTemplate(template)}
          >
            {/* Card Header - Optimized spacing and alignment */}
            <CardHeader className="pb-3 p-4 sm:p-5 flex-shrink-0">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base sm:text-lg text-elec-yellow flex items-start gap-2 flex-1 min-w-0">
                  <span className="break-words line-clamp-2 leading-tight">{template.name}</span>
                  {template.isPopular && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0 mt-0.5" />
                  )}
                </CardTitle>
                <Badge className={`${getDifficultyColor(template.difficultyLevel)} text-xs flex-shrink-0 px-2 py-1`}>
                  {template.difficultyLevel}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-2">
                {template.description}
              </p>
            </CardHeader>
            
            {/* Card Content - Flexible layout with proper spacing */}
            <CardContent className="space-y-4 p-4 sm:p-5 pt-0 flex-1 flex flex-col">
              {/* Duration Info */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
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
                <div className="text-xs sm:text-sm font-medium text-elec-yellow">
                  Method Steps ({template.steps.length}):
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
                    <div className="text-xs text-muted-foreground pl-7 italic">
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
          <CardContent className="p-4 sm:p-6">
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
                className="bg-green-600 hover:bg-green-700 h-12 px-6 text-base w-full sm:w-auto flex-shrink-0 transition-all duration-200 active:scale-[0.98]"
              >
                Use This Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results - Mobile optimized */}
      {filteredTemplates.length === 0 && (
        <Card className="border-yellow-500/20 bg-yellow-500/5 mobile-card">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="text-yellow-300 mb-3 mobile-subheading">No templates found</div>
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