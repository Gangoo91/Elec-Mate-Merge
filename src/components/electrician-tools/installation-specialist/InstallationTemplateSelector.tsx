import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { InstallationTemplate, DOMESTIC_TEMPLATES, COMMERCIAL_TEMPLATES, INDUSTRIAL_TEMPLATES } from '@/lib/installation-templates';
import { Home, Building2, Factory, Star, Clock, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InstallationTemplateSelectorProps {
  selectedCategory: 'domestic' | 'commercial' | 'industrial';
  onCategoryChange: (category: 'domestic' | 'commercial' | 'industrial') => void;
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
    className="p-4 cursor-pointer hover:border-blue-400/40 hover:scale-[1.02] transition-all duration-200 touch-manipulation"
    onClick={onSelect}
  >
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-base mb-1 text-foreground flex items-center gap-2">
            {template.name}
            {template.isPopular && (
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            )}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {template.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={getComplexityColor(template.complexity)}>
          {template.complexity}
        </Badge>
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          {template.estimatedDuration}
        </Badge>
      </div>
    </div>
  </Card>
);

export const InstallationTemplateSelector = ({
  selectedCategory,
  onCategoryChange,
  onSelectTemplate
}: InstallationTemplateSelectorProps) => {
  const handleSelectTemplate = (template: InstallationTemplate) => {
    onSelectTemplate(template);
    toast({
      title: "Template Selected",
      description: `${template.name} - ${template.estimatedDuration}`,
    });
  };

  return (
    <Card className="p-4 sm:p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold">Quick Start Templates</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Choose a template to get started quickly with pre-configured installation guidance
        </p>

        <Tabs value={selectedCategory} onValueChange={(v: any) => onCategoryChange(v)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="domestic" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Domestic</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Commercial</span>
            </TabsTrigger>
            <TabsTrigger value="industrial" className="gap-2">
              <Factory className="h-4 w-4" />
              <span className="hidden sm:inline">Industrial</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="domestic" className="space-y-3 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOMESTIC_TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commercial" className="space-y-3 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMMERCIAL_TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="industrial" className="space-y-3 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INDUSTRIAL_TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
