
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Hash, ArrowRight, ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  numberedVisualInspectionSections, 
  outcomeDefinitions, 
  getInspectionStats, 
  getOverallAssessment,
  TOTAL_INSPECTION_ITEMS,
  type InspectionOutcome,
  type NumberedInspectionSection,
  type NumberedInspectionItem
} from '@/data/eicr/numberedVisualInspectionData';

interface NumberedVisualInspectionProps {
  reportType: string;
  onComplete: () => void;
}

const NumberedVisualInspection = ({ reportType, onComplete }: NumberedVisualInspectionProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sections, setSections] = useState<NumberedInspectionSection[]>(numberedVisualInspectionSections);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage if available
    const savedData = localStorage.getItem('eicr-numbered-visual-inspection');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSections(parsedData.sections || numberedVisualInspectionSections);
        setCurrentSectionIndex(parsedData.currentSectionIndex || 0);
        setIsComplete(parsedData.isComplete || false);
      } catch (error) {
        console.error('Error loading saved inspection data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Auto-save to localStorage
    const dataToSave = {
      sections,
      currentSectionIndex,
      isComplete,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('eicr-numbered-visual-inspection', JSON.stringify(dataToSave));
  }, [sections, currentSectionIndex, isComplete]);

  const updateItemOutcome = (sectionId: string, itemId: string, outcome: InspectionOutcome) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              items: section.items.map(item => 
                item.id === itemId ? { ...item, outcome } : item
              )
            }
          : section
      )
    );
  };

  const updateItemNotes = (sectionId: string, itemId: string, notes: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              items: section.items.map(item => 
                item.id === itemId ? { ...item, notes } : item
              )
            }
          : section
      )
    );
  };

  const markSectionComplete = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId ? { ...section, isComplete: true } : section
      )
    );
  };

  const nextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      markSectionComplete(sections[currentSectionIndex].id);
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      completeInspection();
    }
  };

  const previousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const completeInspection = () => {
    markSectionComplete(sections[currentSectionIndex].id);
    
    const stats = getInspectionStats(sections);
    const overallAssessment = getOverallAssessment(sections);
    
    const results = {
      sections,
      stats,
      overallAssessment,
      completedAt: new Date().toISOString(),
      totalItems: TOTAL_INSPECTION_ITEMS
    };
    
    localStorage.setItem('eicr-visual-inspection-results', JSON.stringify(results));
    setIsComplete(true);
    onComplete();
  };

  const currentSection = sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;
  const stats = getInspectionStats(sections);

  if (isComplete) {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Official EICR Numbered Visual Inspection Complete</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            All {TOTAL_INSPECTION_ITEMS} numbered inspection items across 10 sections have been completed according to the official EICR Schedule of Inspections.
          </p>
          <Button onClick={onComplete} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Continue to Results
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Official EICR Notice */}
      <Alert className="bg-blue-500/10 border-blue-500/30">
        <AlertCircle className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Official EICR Form:</strong> This inspection uses the exact numbered items from the official EICR Schedule of Inspections 
          as per BS 7671:2018+A3:2024. Total items: {TOTAL_INSPECTION_ITEMS} across 10 sections.
        </AlertDescription>
      </Alert>

      {/* Progress Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <Hash className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle>
                  Section {currentSection.number}: {currentSection.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{currentSection.description}</p>
                <p className="text-xs text-blue-300 mt-1">{currentSection.regulation}</p>
                <p className="text-xs text-elec-yellow mt-1">
                  {currentSection.items.length} inspection items in this section
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Section Progress</p>
              <Progress value={progress} className="w-32 h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {currentSectionIndex + 1} of {sections.length}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Overall Progress Statistics
            <Badge variant="outline" className="text-xs">
              {stats.total}/{TOTAL_INSPECTION_ITEMS} Items Reviewed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {Object.entries(stats).filter(([key]) => key !== 'total').map(([key, count]) => {
              const outcome = outcomeDefinitions[key as keyof typeof outcomeDefinitions];
              return (
                <div key={key} className={`text-center p-2 rounded border ${outcome.bgColor} ${outcome.borderColor}`}>
                  <div className={`text-xl font-bold ${outcome.color}`}>{count}</div>
                  <div className={`text-xs ${outcome.color} font-medium`}>
                    {outcome.label.split(' - ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Section Items */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-2 py-1 bg-elec-yellow/20 rounded border border-elec-yellow/30">
              <Hash className="h-4 w-4 text-elec-yellow" />
              <span className="text-elec-yellow font-mono">{currentSection.number}</span>
            </div>
            Inspection Items ({currentSection.items.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentSection.items.map((item) => (
            <Card key={item.id} className="border-elec-yellow/10 bg-elec-dark">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-2 py-1 bg-elec-yellow/10 rounded border border-elec-yellow/20">
                      <span className="text-elec-yellow font-mono text-sm">{item.number}</span>
                    </div>
                    <CardTitle className="text-base">{item.item}</CardTitle>
                  </div>
                  <Badge 
                    className={`${outcomeDefinitions[item.outcome].bgColor} ${outcomeDefinitions[item.outcome].color} border-0`}
                  >
                    {outcomeDefinitions[item.outcome].label.split(' - ')[0]}
                  </Badge>
                </div>
                <p className="text-xs text-blue-300">{item.regulation}</p>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Inspection Outcome</label>
                  <Select
                    value={item.outcome}
                    onValueChange={(value: InspectionOutcome) => updateItemOutcome(currentSection.id, item.id, value)}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(outcomeDefinitions).map(([key, def]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${def.bgColor.replace('/20', '')}`} />
                            {def.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {item.outcome !== 'acceptable' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Detailed Notes and Observations 
                      {(item.outcome === 'c1' || item.outcome === 'c2') && 
                        <span className="text-red-400 ml-1">*Required for defect codes</span>
                      }
                    </label>
                    <Textarea
                      placeholder="Provide detailed description of the defect, location, and recommended remedial action..."
                      value={item.notes || ''}
                      onChange={(e) => updateItemNotes(currentSection.id, item.id, e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                      rows={3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={previousSection}
              disabled={currentSectionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Section
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Section {currentSectionIndex + 1} of {sections.length}
              </p>
              <p className="text-xs text-elec-yellow">
                {currentSection.items.length} items in current section
              </p>
            </div>

            <Button
              onClick={nextSection}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              {currentSectionIndex === sections.length - 1 ? (
                <>
                  Complete Inspection
                  <FileText className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next Section
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberedVisualInspection;
