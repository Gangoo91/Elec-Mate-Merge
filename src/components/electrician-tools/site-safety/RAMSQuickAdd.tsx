import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ramsTemplates, RAMSTemplate } from '@/data/site-safety/ramsTemplates';
import { Plus, Zap, ChevronDown, ChevronUp, Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useRAMS } from './rams/RAMSContext';
import { toast } from '@/hooks/use-toast';

export const RAMSQuickAdd: React.FC = () => {
  const { addRiskFromTemplate } = useRAMS();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const filteredTemplates = useMemo(() => {
    if (!searchTerm.trim()) return ramsTemplates;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return ramsTemplates.filter(template => 
      template.specificActivity.toLowerCase().includes(lowerSearchTerm) ||
      template.hazard.toLowerCase().includes(lowerSearchTerm) ||
      template.category.toLowerCase().includes(lowerSearchTerm) ||
      template.detailedControls.some(control => control.toLowerCase().includes(lowerSearchTerm)) ||
      template.ppe.some(ppe => ppe.toLowerCase().includes(lowerSearchTerm))
    );
  }, [searchTerm]);

  const handleAddTemplate = (template: RAMSTemplate) => {
    addRiskFromTemplate(template);
    toast({
      title: 'Risk Added',
      description: `${template.specificActivity} has been added to your RAMS assessment.`,
      variant: 'success'
    });
  };

  const handleAddAll = () => {
    filteredTemplates.forEach(template => {
      addRiskFromTemplate(template);
    });
    toast({
      title: 'All Risks Added',
      description: `${filteredTemplates.length} electrical risks have been added to your RAMS.`,
      variant: 'success'
    });
  };

  const getRiskLevelColor = (likelihood: number, severity: number) => {
    const riskScore = likelihood * severity;
    if (riskScore <= 4) return 'text-green-300 bg-green-500/10 border-green-500/20';
    if (riskScore <= 9) return 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20';
    if (riskScore <= 16) return 'text-orange-300 bg-orange-500/10 border-orange-500/20';
    return 'text-red-300 bg-red-500/10 border-red-500/20';
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Icons.AlertTriangle;
  };

  return (
    <Card className="border-green-500/50 bg-green-500/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-green-300 flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5" />
          Quick Add to RAMS
        </CardTitle>
        <CardDescription className="text-white/70 text-sm">
          Search and select from realistic electrical hazards with detailed control measures
        </CardDescription>
        
        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search hazards, activities, or controls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-green-500/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-500/50 h-10"
          />
        </div>
        
        <Button 
          onClick={handleAddAll}
          className="w-full bg-green-600 text-white hover:bg-green-700 mt-3"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add All ({filteredTemplates.length} items)
        </Button>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filteredTemplates.map((template) => {
            const IconComponent = getIcon(template.icon);
            const isExpanded = expandedCards.has(template.id);
            
            return (
              <Card key={template.id} className="bg-green-500/5 border-white/10 hover:border-green-500/30 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-green-600/20 rounded-lg border border-green-500/30">
                      <IconComponent className="w-4 h-4 text-green-300" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm leading-tight">{template.specificActivity}</h4>
                          <p className="text-xs text-white/60 mt-1">{template.hazard}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddTemplate(template)}
                          className="bg-green-600 text-white hover:bg-green-700 text-xs px-2 py-1 h-6 flex-shrink-0"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded border ${getRiskLevelColor(template.likelihood, template.severity)}`}>
                          Risk: {template.likelihood * template.severity}
                        </span>
                        <span className="text-xs text-white/50">|</span>
                        <span className="text-xs text-white/70">{template.category}</span>
                      </div>
                      
                      {/* Quick Controls Preview */}
                      <div className="text-xs text-white/80 mb-2">
                        <span className="font-medium text-white">Key Controls: </span>
                        <span>{template.detailedControls.slice(0, 2).join(', ')}</span>
                        {template.detailedControls.length > 2 && '...'}
                      </div>
                      
                      {/* Expand/Collapse Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(template.id)}
                        className="h-6 px-2 text-xs text-white/60 hover:text-white hover:bg-white/5"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3 h-3 mr-1" />
                            Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3 mr-1" />
                            More
                          </>
                        )}
                      </Button>
                      
                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-3 space-y-3 border-t border-white/10 pt-3">
                          {/* Detailed Controls */}
                          <div>
                            <h5 className="text-xs font-medium text-green-300 mb-2">Control Measures:</h5>
                            <ul className="space-y-1">
                              {template.detailedControls.map((control, index) => (
                                <li key={index} className="text-xs text-white/80 flex items-start gap-2">
                                  <span className="text-green-300 mt-0.5">•</span>
                                  <span>{control}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* PPE Requirements */}
                          <div>
                            <h5 className="text-xs font-medium text-green-300 mb-2">Required PPE:</h5>
                            <div className="flex flex-wrap gap-1">
                              {template.ppe.map((item, index) => (
                                <span key={index} className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Regulations */}
                          <div>
                            <h5 className="text-xs font-medium text-green-300 mb-2">Applicable Regulations:</h5>
                            <div className="flex flex-wrap gap-1">
                              {template.regulations.map((reg, index) => (
                                <span key={index} className="text-xs bg-purple-500/10 text-purple-300 px-2 py-1 rounded border border-purple-500/20">
                                  {reg}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Risk Level Legend */}
        <div className="mt-6 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
          <h4 className="text-sm font-medium text-green-300 mb-3">Risk Rating Scale</h4>
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
        
        <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-start gap-2">
            <span className="text-green-400 text-sm">💡</span>
            <div className="text-xs text-green-300">
              <p className="font-medium mb-1">BS 7671:2018+A3:2024 Compliant:</p>
              <p>These templates provide regulation-compliant baseline risk assessments. Expand each item to see detailed control measures, PPE requirements, and applicable regulations.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};