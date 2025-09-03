import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ramsTemplates, RAMSTemplate } from '@/data/site-safety/ramsTemplates';
import { Plus, Zap } from 'lucide-react';
import { useRAMS } from './rams/RAMSContext';
import { toast } from '@/hooks/use-toast';

export const RAMSQuickAdd: React.FC = () => {
  const { addRiskFromTemplate } = useRAMS();

  const handleAddTemplate = (template: RAMSTemplate) => {
    addRiskFromTemplate(template);
    toast({
      title: 'Risk Added',
      description: `${template.hazard} has been added to your RAMS assessment.`,
      variant: 'success'
    });
  };

  const handleAddAll = () => {
    ramsTemplates.forEach(template => {
      addRiskFromTemplate(template);
    });
    toast({
      title: 'All Risks Added',
      description: `${ramsTemplates.length} common electrical risks have been added to your RAMS.`,
      variant: 'success'
    });
  };

  const getRiskLevelColor = (likelihood: number, severity: number) => {
    const score = likelihood * severity;
    if (score <= 4) return 'bg-green-500';
    if (score <= 9) return 'bg-yellow-500';
    if (score <= 16) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-green-500/50 bg-green-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Add to RAMS
          </CardTitle>
          <Button
            onClick={handleAddAll}
            size="sm"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add All
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Pre-configured risk assessments for common electrical hazards
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {ramsTemplates.map((template) => (
            <Card
              key={template.id}
              className="border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors cursor-pointer group"
            >
              <CardContent className="p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{template.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-200 truncate">
                        {template.hazard}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Badge
                      className={`${getRiskLevelColor(template.likelihood, template.severity)} text-white text-xs px-1.5 py-0.5`}
                    >
                      L{template.likelihood} S{template.severity}
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => handleAddTemplate(template)}
                    size="sm"
                    className="bg-green-600 text-white hover:bg-green-700 h-6 px-2 text-xs opacity-80 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-start gap-2">
            <span className="text-green-400 text-sm">💡</span>
            <div className="text-xs text-green-300">
              <p className="font-medium mb-1">Pro Tip:</p>
              <p>These templates provide BS 7671 compliant baseline risk assessments. You can modify them after adding to suit your specific project requirements.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};