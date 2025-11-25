import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TemplateCard } from './TemplateCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { EditableProjectPlan } from '@/types/projectPlan';
import { v4 as uuidv4 } from 'uuid';

interface TemplateLibraryProps {
  onSelectTemplate: (plan: Partial<EditableProjectPlan>) => void;
}

export const TemplateLibrary = ({ onSelectTemplate }: TemplateLibraryProps) => {
  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['project-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_templates')
        .select('*')
        .order('usage_count', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleUseTemplate = (template: any) => {
    // Parse phases and add unique IDs
    const parsedPhases = (Array.isArray(template.phases) ? template.phases : JSON.parse(template.phases || '[]')).map((phase: any) => ({
      ...phase,
      id: uuidv4(),
      tasks: (phase.tasks || []).map((task: any) => ({
        id: uuidv4(),
        text: typeof task === 'string' ? task : task.text || task,
        completed: false,
      })),
      materials: (phase.materials || []).map((material: any) => ({
        ...material,
        id: uuidv4(),
        ordered: false,
      })),
      tradeCoordination: (phase.tradeCoordination || []).map((coord: any) => ({
        ...coord,
        id: uuidv4(),
        contacted: false,
      })),
      completed: false,
    }));

    // Parse risks and add unique IDs
    const parsedRisks = (template.risk_factors?.risks || []).map((risk: any) => ({
      ...risk,
      id: uuidv4(),
      status: 'open',
      severity: 'medium',
    }));

    const templatePlan: Partial<EditableProjectPlan> = {
      phases: parsedPhases,
      risks: parsedRisks,
      milestones: [],
      metadata: {
        estimatedDuration: template.typical_duration_days || 0,
        projectType: template.template_type || 'domestic',
      },
    };

    // Update usage count
    supabase
      .from('project_templates')
      .update({ usage_count: (template.usage_count || 0) + 1 })
      .eq('id', template.id)
      .then();

    onSelectTemplate(templatePlan);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-lg flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <div>
          <p className="font-medium text-sm">Failed to load templates</p>
          <p className="text-xs text-muted-foreground">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="p-6 border border-border/40 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">No templates available yet.</p>
      </div>
    );
  }

  // Group templates by type
  const grouped = templates.reduce((acc: any, template) => {
    const type = template.template_type || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(template);
    return acc;
  }, {});

  const typeLabels: Record<string, string> = {
    domestic_rewire: 'Domestic Rewires',
    domestic_upgrade: 'Domestic Upgrades',
    domestic_installation: 'Domestic Installations',
    domestic_new_build: 'New Build',
    commercial_office: 'Commercial Office',
    commercial_retail: 'Commercial Retail',
    commercial: 'Commercial',
    industrial: 'Industrial',
    'multi-trade': 'Multi-Trade Projects',
  };

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([type, typeTemplates]: [string, any]) => (
        <div key={type} className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            {typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typeTemplates.map((template: any) => (
              <TemplateCard
                key={template.id}
                templateName={template.title}
                description={template.description || 'No description'}
                estimatedDays={template.typical_duration_days || 0}
                difficulty={template.difficulty || 'moderate'}
                icon={template.icon_name || 'Home'}
                tags={template.tags || []}
                onUseTemplate={() => handleUseTemplate(template)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
