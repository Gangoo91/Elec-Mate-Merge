import React from 'react';
import { MethodTemplate } from '@/types/method-statement';
import { Eyebrow, ListCard, ListRow } from '@/components/college/primitives';

interface SmartRecommendationsProps {
  templates: MethodTemplate[];
  searchTerm: string;
  onSelectTemplate: (template: MethodTemplate) => void;
  onViewTemplate: (template: MethodTemplate) => void;
}

interface RecGroup {
  type: string;
  title: string;
  description: string;
  templates: MethodTemplate[];
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  templates,
  searchTerm,
  onSelectTemplate,
  onViewTemplate,
}) => {
  const getRecommendations = (): RecGroup[] => {
    const recommendations: RecGroup[] = [];

    const popularTemplates = templates.filter((t) => t.isPopular).slice(0, 2);
    if (popularTemplates.length > 0) {
      recommendations.push({
        type: 'popular',
        title: 'Most Popular',
        description: 'Templates frequently used by electricians',
        templates: popularTemplates,
      });
    }

    const quickTemplates = templates
      .filter((t) => t.difficultyLevel === 'basic' && !t.isPopular)
      .slice(0, 2);
    if (quickTemplates.length > 0) {
      recommendations.push({
        type: 'quick',
        title: 'Quick Tasks',
        description: 'Simple procedures for routine work',
        templates: quickTemplates,
      });
    }

    const comprehensiveTemplates = templates
      .filter((t) => t.difficultyLevel === 'advanced')
      .slice(0, 2);
    if (comprehensiveTemplates.length > 0) {
      recommendations.push({
        type: 'comprehensive',
        title: 'Comprehensive Projects',
        description: 'Detailed templates for complex installations',
        templates: comprehensiveTemplates,
      });
    }

    if (searchTerm) {
      const contextualTemplates = templates
        .filter(
          (t) =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3);

      if (contextualTemplates.length > 0) {
        recommendations.unshift({
          type: 'contextual',
          title: 'Related to Your Search',
          description: `Templates matching "${searchTerm}"`,
          templates: contextualTemplates,
        });
      }
    }

    return recommendations.slice(0, 3);
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.type} className="space-y-2">
          <Eyebrow>{rec.title}</Eyebrow>
          <ListCard>
            {rec.templates.map((template) => (
              <ListRow
                key={template.id}
                onClick={() => onViewTemplate(template)}
                title={template.name}
                subtitle={`${template.estimatedDuration} · ${template.steps.length} steps`}
                trailing={
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(template);
                    }}
                    className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Use →
                  </button>
                }
              />
            ))}
          </ListCard>
        </div>
      ))}
    </div>
  );
};

export default SmartRecommendations;
