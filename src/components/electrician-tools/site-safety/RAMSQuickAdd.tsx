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
        <CardTitle className="text-green-300 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Add to RAMS
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Pre-configured risk assessments for common electrical hazards
        </p>
        <div className="pt-2">
          <Button
            onClick={handleAddAll}
            size="sm"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {ramsTemplates.map((template) => (
            <Card
              key={template.id}
              className="border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors cursor-pointer group h-full"
            >
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-green-200 leading-tight mb-1 break-words">
                      {template.hazard}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed break-words">
                      {template.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-3 border-t border-green-500/20">
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      className={`${getRiskLevelColor(template.likelihood, template.severity)} text-white text-xs px-2 py-1 flex-shrink-0`}
                    >
                      L{template.likelihood} S{template.severity}
                    </Badge>
                    
                    <Button
                      onClick={() => handleAddTemplate(template)}
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700 h-7 px-3 text-xs flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {/* Risk Level Legend */}
          <div className="p-4 bg-elec-card/50 rounded-lg border border-elec-yellow/20">
            <h4 className="text-sm font-medium text-elec-yellow mb-3">Risk Rating Scale</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 p-2 rounded bg-green-500/10 border border-green-500/20">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-green-300">1-4 Low</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs font-medium text-yellow-300">5-9 Medium</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-orange-500/10 border border-orange-500/20">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs font-medium text-orange-300">10-16 High</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-red-500/10 border border-red-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs font-medium text-red-300">17-25 Very High</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-start gap-2">
              <span className="text-green-400 text-sm">💡</span>
              <div className="text-xs text-green-300">
                <p className="font-medium mb-1">Pro Tip:</p>
                <p>These templates provide BS 7671 compliant baseline risk assessments. You can modify them after adding to suit your specific project requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};