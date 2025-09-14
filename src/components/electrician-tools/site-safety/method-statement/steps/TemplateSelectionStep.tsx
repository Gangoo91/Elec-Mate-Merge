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
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Choose a Method Statement Template
          </CardTitle>
          <p className="text-muted-foreground">
            Start with a proven template or build from scratch. Templates include BS7671-compliant safety requirements.
          </p>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={onSkipTemplate}
                className="flex items-center gap-2"
              >
                <SkipForward className="h-4 w-4" />
                Start from Scratch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:scale-105 border-2 ${
              selectedTemplate?.id === template.id
                ? 'border-elec-yellow bg-elec-yellow/10'
                : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40'
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                  {template.name}
                  {template.isPopular && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                </CardTitle>
                <Badge className={getDifficultyColor(template.difficultyLevel)}>
                  {template.difficultyLevel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {template.estimatedDuration}
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-elec-yellow">Required Qualifications:</div>
                <div className="flex flex-wrap gap-1">
                  {template.requiredQualifications.slice(0, 3).map((qual, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {qual}
                    </Badge>
                  ))}
                  {template.requiredQualifications.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.requiredQualifications.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-elec-yellow">
                  Method Steps ({template.steps.length}):
                </div>
                <div className="space-y-1">
                  {template.steps.slice(0, 3).map((step, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      {step.title}
                    </div>
                  ))}
                  {template.steps.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{template.steps.length - 3} more steps
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Action */}
      {selectedTemplate && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-300">
                  Selected: {selectedTemplate.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  This template includes {selectedTemplate.steps.length} pre-configured steps
                </p>
              </div>
              <Button
                onClick={() => onTemplateSelect(selectedTemplate)}
                className="bg-green-600 hover:bg-green-700"
              >
                Use This Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredTemplates.length === 0 && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-8 text-center">
            <div className="text-yellow-300 mb-2">No templates found</div>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or create a method statement from scratch.
            </p>
            <Button onClick={onSkipTemplate} variant="outline">
              Start from Scratch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TemplateSelectionStep;