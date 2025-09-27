import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  Users,
  ArrowRight,
  Sparkles,
  Target
} from 'lucide-react';
import { MethodTemplate } from '@/types/method-statement';

interface SmartRecommendationsProps {
  templates: MethodTemplate[];
  searchTerm: string;
  onSelectTemplate: (template: MethodTemplate) => void;
  onViewTemplate: (template: MethodTemplate) => void;
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  templates,
  searchTerm,
  onSelectTemplate,
  onViewTemplate
}) => {
  // Smart recommendation algorithm
  const getRecommendations = () => {
    const recommendations = [];

    // 1. Popular templates
    const popularTemplates = templates.filter(t => t.isPopular).slice(0, 2);
    if (popularTemplates.length > 0) {
      recommendations.push({
        type: 'popular',
        title: 'Most Popular',
        description: 'Templates frequently used by electricians',
        icon: TrendingUp,
        color: 'text-blue-400 bg-blue-500/20',
        templates: popularTemplates
      });
    }

    // 2. Quick tasks (basic difficulty, short duration)
    const quickTemplates = templates
      .filter(t => t.difficultyLevel === 'basic' && !t.isPopular)
      .slice(0, 2);
    if (quickTemplates.length > 0) {
      recommendations.push({
        type: 'quick',
        title: 'Quick Tasks',
        description: 'Simple procedures for routine work',
        icon: Clock,
        color: 'text-green-400 bg-green-500/20',
        templates: quickTemplates
      });
    }

    // 3. Comprehensive projects (advanced difficulty)
    const comprehensiveTemplates = templates
      .filter(t => t.difficultyLevel === 'advanced')
      .slice(0, 2);
    if (comprehensiveTemplates.length > 0) {
      recommendations.push({
        type: 'comprehensive',
        title: 'Comprehensive Projects',
        description: 'Detailed templates for complex installations',
        icon: Target,
        color: 'text-orange-400 bg-orange-500/20',
        templates: comprehensiveTemplates
      });
    }

    // 4. If searching, show contextual recommendations
    if (searchTerm) {
      const contextualTemplates = templates
        .filter(t => 
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
          icon: Sparkles,
          color: 'text-purple-400 bg-purple-500/20',
          templates: contextualTemplates
        });
      }
    }

    return recommendations.slice(0, 3); // Limit to 3 recommendation groups
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-elec-yellow">
        <Lightbulb className="h-4 w-4" />
        <span className="font-medium">Smart Recommendations</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={rec.type} className="border-elec-yellow/20 bg-card hover:border-elec-yellow/40 transition-colors">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <div className={`p-1.5 rounded ${rec.color}`}>
                  <rec.icon className="h-3 w-3" />
                </div>
                <span className="text-elec-yellow">{rec.title}</span>
              </CardTitle>
              <p className="text-xs text-muted-foreground">{rec.description}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {rec.templates.map((template, templateIndex) => (
                <div 
                  key={template.id}
                  className="p-3 rounded-lg border border-elec-yellow/10 bg-elec-card/30 hover:bg-elec-card/50 transition-colors cursor-pointer group"
                  onClick={() => onViewTemplate(template)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-medium text-elec-yellow break-words line-clamp-1 group-hover:text-elec-yellow/80">
                      {template.name}
                    </h4>
                    {template.isPopular && (
                      <Badge className="bg-blue-500/20 text-blue-300 text-xs flex-shrink-0">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{template.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{template.steps.length} steps</span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(template);
                      }}
                      className="h-6 px-2 text-xs bg-elec-yellow/20 hover:bg-elec-yellow/30 text-elec-yellow border-none"
                    >
                      <span>Use</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;