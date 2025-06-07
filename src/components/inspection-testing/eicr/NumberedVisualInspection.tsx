
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ClipboardCheck, AlertTriangle, CheckCircle, Eye, FileText, Hash } from 'lucide-react';
import { 
  numberedVisualInspectionSections, 
  outcomeDefinitions, 
  getInspectionStats,
  getOverallAssessment,
  type InspectionOutcome, 
  type NumberedInspectionItem, 
  type NumberedInspectionSection 
} from '@/data/eicr/numberedVisualInspectionData';

interface NumberedVisualInspectionProps {
  reportType: string;
  onComplete: () => void;
}

const NumberedVisualInspection = ({ reportType, onComplete }: NumberedVisualInspectionProps) => {
  const [inspectionData, setInspectionData] = useState<NumberedInspectionSection[]>(numberedVisualInspectionSections);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    calculateProgress();
  }, [inspectionData]);

  const calculateProgress = () => {
    const totalItems = inspectionData.reduce((sum, section) => sum + section.items.length, 0);
    const inspectedItems = inspectionData.reduce((sum, section) => 
      sum + section.items.filter(item => item.outcome && item.outcome !== 'acceptable' || item.notes !== '').length, 0
    );
    setOverallProgress(totalItems > 0 ? (inspectedItems / totalItems) * 100 : 0);
  };

  const summaryStats = getInspectionStats(inspectionData);

  const updateItemOutcome = (sectionId: string, itemId: string, outcome: InspectionOutcome) => {
    setInspectionData(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.map(item =>
              item.id === itemId 
                ? { 
                    ...item, 
                    outcome,
                    requiresAction: ['c1', 'c2', 'c3'].includes(outcome)
                  }
                : item
            )
          }
        : section
    ));
  };

  const updateItemNotes = (sectionId: string, itemId: string, notes: string) => {
    setInspectionData(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.map(item =>
              item.id === itemId ? { ...item, notes } : item
            )
          }
        : section
    ));
  };

  const markSectionComplete = (sectionId: string) => {
    setInspectionData(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isComplete: true, completedAt: new Date().toISOString() }
        : section
    ));
  };

  const handleComplete = () => {
    const inspectionResults = {
      sections: inspectionData,
      stats: summaryStats,
      completedAt: new Date().toISOString(),
      overallAssessment: getOverallAssessment(inspectionData)
    };
    
    localStorage.setItem('eicr-visual-inspection-results', JSON.stringify(inspectionResults));
    onComplete();
  };

  const currentSection = inspectionData[currentSectionIndex];
  const hasDefects = summaryStats.c1 > 0 || summaryStats.c2 > 0 || summaryStats.c3 > 0;
  const completedSections = inspectionData.filter(section => section.isComplete).length;

  // Helper function to safely get outcome definition
  const getOutcomeDefinition = (outcome: InspectionOutcome | undefined) => {
    if (!outcome || !outcomeDefinitions[outcome]) {
      return outcomeDefinitions['acceptable']; // Default fallback
    }
    return outcomeDefinitions[outcome];
  };

  return (
    <div className="space-y-6">
      {/* Header and Progress */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <Hash className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle>Numbered EICR Visual Inspection</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Section {currentSection.number}: {currentSection.title}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <div className="w-32 h-2 bg-elec-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-elec-yellow transition-all duration-300" 
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{Math.round(overallProgress)}%</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Statistics */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">Inspection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.entries(summaryStats).filter(([key]) => key !== 'total').map(([key, count]) => {
              const outcome = outcomeDefinitions[key as InspectionOutcome];
              if (!outcome) return null; // Skip if outcome definition doesn't exist
              
              return (
                <div key={key} className={`text-center p-2 rounded border ${outcome.bgColor} ${outcome.borderColor}`}>
                  <div className={`text-lg font-bold ${outcome.color}`}>{count}</div>
                  <div className={`text-xs ${outcome.color}`}>{outcome.label.split(' - ')[0]}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {completedSections}/{inspectionData.length} sections completed • {summaryStats.total} total items
            </div>
            {hasDefects && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Defects Found - Remedial Action Required</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {inspectionData.map((section, index) => (
          <Button
            key={section.id}
            variant={index === currentSectionIndex ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentSectionIndex(index)}
            className="flex items-center gap-2"
          >
            <span className="text-xs font-mono">{section.number}</span>
            {section.isComplete && (
              <CheckCircle className="h-3 w-3 text-green-400" />
            )}
            {section.items.some(item => item.outcome && ['c1', 'c2', 'c3'].includes(item.outcome)) && (
              <AlertTriangle className="h-3 w-3 text-red-400" />
            )}
          </Button>
        ))}
      </div>

      {/* Current Section Inspection */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-1 bg-elec-yellow/20 rounded border border-elec-yellow/30">
                  <Hash className="h-4 w-4 text-elec-yellow" />
                  <span className="text-elec-yellow font-mono">{currentSection.number}</span>
                </div>
                {currentSection.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{currentSection.description}</p>
              <p className="text-xs text-blue-300 mt-1">{currentSection.regulation}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => markSectionComplete(currentSection.id)}
              disabled={currentSection.isComplete}
              className="flex items-center gap-2"
            >
              {currentSection.isComplete ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Complete
                </>
              ) : (
                <>
                  <ClipboardCheck className="h-4 w-4" />
                  Mark Complete
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSection.items.map((item) => {
            const itemOutcome = item.outcome || 'acceptable'; // Default to 'acceptable' if undefined
            const outcomeDefinition = getOutcomeDefinition(item.outcome);
            
            return (
              <div key={item.id} className="space-y-3 p-4 border border-elec-yellow/10 rounded-lg bg-elec-dark/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/20 rounded border border-blue-500/30">
                        <span className="text-blue-300 font-mono text-sm">{item.number}</span>
                      </div>
                      <h4 className="font-medium text-sm">{item.item}</h4>
                      {item.isCritical && (
                        <Badge variant="destructive" className="text-xs">Critical</Badge>
                      )}
                      {item.requiresAction && (
                        <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-400">
                          Action Required
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                    )}
                    {item.regulation && (
                      <p className="text-xs text-blue-300 mb-2">{item.regulation}</p>
                    )}
                  </div>
                  <div className="min-w-[200px]">
                    <Select
                      value={itemOutcome}
                      onValueChange={(value: InspectionOutcome) => 
                        updateItemOutcome(currentSection.id, item.id, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(outcomeDefinitions).map(([key, def]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${def.bgColor.replace('/20', '')}`} />
                              {def.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Textarea
                  value={item.notes || ''}
                  onChange={(e) => updateItemNotes(currentSection.id, item.id, e.target.value)}
                  placeholder="Add notes, observations, or remedial actions required..."
                  className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 text-sm"
                  rows={2}
                />

                {itemOutcome !== 'acceptable' && itemOutcome !== 'na' && (
                  <div className={`p-2 rounded text-xs ${outcomeDefinition.bgColor} ${outcomeDefinition.borderColor} border`}>
                    <span className={outcomeDefinition.color}>
                      {outcomeDefinition.description}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                disabled={currentSectionIndex === 0}
              >
                Previous Section
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentSectionIndex(Math.min(inspectionData.length - 1, currentSectionIndex + 1))}
                disabled={currentSectionIndex === inspectionData.length - 1}
              >
                Next Section
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {Math.round(overallProgress)}% Complete
                </p>
                <p className="text-xs text-muted-foreground">
                  {summaryStats.total} items • BS 7671 compliant
                </p>
              </div>
              
              <Button
                onClick={handleComplete}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={overallProgress < 80}
              >
                <FileText className="mr-2 h-4 w-4" />
                Complete Inspection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberedVisualInspection;
