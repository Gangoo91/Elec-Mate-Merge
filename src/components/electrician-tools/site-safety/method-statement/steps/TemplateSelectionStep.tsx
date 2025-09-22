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
      {/* Header */}
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

      {/* Search and Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray mobile-card">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            {/* Search Input - Full width on mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            
            {/* Filters Row - Responsive layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 flex-shrink-0" />
                      <SelectValue placeholder="All Categories" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        <span className="break-words">{category}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                onClick={onSkipTemplate}
                className="flex items-center justify-center gap-2 h-12 px-4 sm:px-6 text-base whitespace-nowrap"
              >
                <SkipForward className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Start from Scratch</span>
                <span className="sm:hidden">Skip Template</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Grid - Mobile-first responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer mobile-interactive mobile-card-compact border-2 h-full ${
              selectedTemplate?.id === template.id
                ? 'border-elec-yellow bg-elec-yellow/10 shadow-lg'
                : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40'
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <CardHeader className="pb-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base sm:text-lg text-elec-yellow flex items-start gap-2 flex-1 min-w-0">
                  <span className="break-words line-clamp-2">{template.name}</span>
                  {template.isPopular && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0 mt-0.5" />}
                </CardTitle>
                <Badge className={`${getDifficultyColor(template.difficultyLevel)} text-xs flex-shrink-0`}>
                  {template.difficultyLevel}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {template.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-3 p-4 pt-0 flex-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">{template.estimatedDuration}</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs sm:text-sm font-medium text-elec-yellow">Required Qualifications:</div>
                <div className="flex flex-wrap gap-1">
                  {template.requiredQualifications.slice(0, 2).map((qual, index) => (
                    <Badge key={index} variant="outline" className="text-xs break-words max-w-full">
                      <span className="truncate">{qual}</span>
                    </Badge>
                  ))}
                  {template.requiredQualifications.length > 2 && (
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      +{template.requiredQualifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs sm:text-sm font-medium text-elec-yellow">
                  Method Steps ({template.steps.length}):
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {template.steps.slice(0, 3).map((step, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="break-words line-clamp-2">{step.title}</span>
                    </div>
                  ))}
                  {template.steps.length > 3 && (
                    <div className="text-xs text-muted-foreground pl-7">
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
                className="bg-green-600 hover:bg-green-700 h-12 px-6 text-base w-full sm:w-auto flex-shrink-0"
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
              className="h-12 px-6 text-base"
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