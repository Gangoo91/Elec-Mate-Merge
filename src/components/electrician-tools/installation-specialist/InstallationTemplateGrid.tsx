import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InstallationTemplate, DOMESTIC_TEMPLATES, COMMERCIAL_TEMPLATES, INDUSTRIAL_TEMPLATES } from '@/lib/installation-templates';
import { Star, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InstallationTemplateGridProps {
  selectedCategory: 'domestic' | 'commercial' | 'industrial';
  onSelectTemplate: (template: InstallationTemplate) => void;
}

const getComplexityColor = (complexity: 'basic' | 'intermediate' | 'advanced') => {
  switch (complexity) {
    case 'basic':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'intermediate':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'advanced':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  }
};

const TemplateCard = ({ template, onSelect }: { template: InstallationTemplate; onSelect: () => void }) => (
  <Card
    className="p-3 sm:p-4 cursor-pointer hover:border-blue-400/40 hover:scale-[1.02] transition-all duration-200 touch-manipulation active:scale-[0.98] min-h-[44px]"
    onClick={onSelect}
  >
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm sm:text-base mb-1 text-foreground flex items-center gap-2">
            {template.name}
            {template.isPopular && (
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 fill-amber-400 flex-shrink-0" />
            )}
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {template.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <Badge variant="outline" className={`${getComplexityColor(template.complexity)} text-xs sm:text-sm`}>
          {template.complexity}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-xs sm:text-sm">
          <Clock className="h-3 w-3" />
          {template.estimatedDuration}
        </Badge>
      </div>
    </div>
  </Card>
);

export const InstallationTemplateGrid = ({
  selectedCategory,
  onSelectTemplate
}: InstallationTemplateGridProps) => {
  const templates = selectedCategory === 'domestic' 
    ? DOMESTIC_TEMPLATES 
    : selectedCategory === 'commercial' 
    ? COMMERCIAL_TEMPLATES 
    : INDUSTRIAL_TEMPLATES;

  const handleSelectTemplate = (template: InstallationTemplate) => {
    onSelectTemplate(template);
    toast({
      title: "Template Selected",
      description: `${template.name} - ${template.estimatedDuration}`,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onSelect={() => handleSelectTemplate(template)}
        />
      ))}
    </div>
  );
};
