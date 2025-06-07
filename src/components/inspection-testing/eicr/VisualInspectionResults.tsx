
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { outcomeDefinitions, type InspectionSection } from '@/data/eicr/enhancedVisualInspectionData';

interface VisualInspectionResultsProps {
  onExport?: () => void;
}

const VisualInspectionResults = ({ onExport }: VisualInspectionResultsProps) => {
  const [inspectionResults, setInspectionResults] = useState<{
    sections: InspectionSection[];
    stats: any;
    overallAssessment: string;
    completedAt: string;
  } | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('eicr-visual-inspection-results');
    if (savedResults) {
      setInspectionResults(JSON.parse(savedResults));
    }
  }, []);

  const exportToPDF = () => {
    console.log('Exporting enhanced visual inspection results to PDF...');
    onExport?.();
  };

  if (!inspectionResults) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No visual inspection results available</p>
        </CardContent>
      </Card>
    );
  }

  const { sections, stats, overallAssessment, completedAt } = inspectionResults;
  const hasDefects = stats.c1 > 0 || stats.c2 > 0 || stats.c3 > 0;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card className={`border-2 ${overallAssessment === 'satisfactory' ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${overallAssessment === 'satisfactory' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {overallAssessment === 'satisfactory' ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                )}
              </div>
              <div>
                <CardTitle className={overallAssessment === 'satisfactory' ? 'text-green-300' : 'text-red-300'}>
                  Enhanced Visual Inspection: {overallAssessment.toUpperCase()}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Completed: {new Date(completedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <Button onClick={exportToPDF} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Statistics */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Inspection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(stats).filter(([key]) => key !== 'total').map(([key, count]) => {
              const outcome = outcomeDefinitions[key as keyof typeof outcomeDefinitions];
              return (
                <div key={key} className={`text-center p-3 rounded border ${outcome.bgColor} ${outcome.borderColor}`}>
                  <div className={`text-2xl font-bold ${outcome.color}`}>{count as number}</div>
                  <div className={`text-xs ${outcome.color} font-medium`}>
                    {outcome.label.split(' - ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Defects Summary */}
      {hasDefects && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Defects Requiring Action
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sections.map(section => {
                const sectionDefects = section.items.filter(item => 
                  ['c1', 'c2', 'c3'].includes(item.outcome)
                );
                
                if (sectionDefects.length === 0) return null;

                return (
                  <div key={section.id} className="space-y-2">
                    <h4 className="font-medium text-red-200">{section.title}</h4>
                    {sectionDefects.map(item => (
                      <div key={item.id} className="pl-4 border-l-2 border-red-500/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`${outcomeDefinitions[item.outcome].bgColor} ${outcomeDefinitions[item.outcome].color} border-0`}>
                            {outcomeDefinitions[item.outcome].label.split(' - ')[0]}
                          </Badge>
                          <span className="text-sm font-medium">{item.item}</span>
                        </div>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground ml-2">{item.notes}</p>
                        )}
                        {item.regulation && (
                          <p className="text-xs text-blue-300 ml-2">{item.regulation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map(section => {
          const sectionStats = {
            total: section.items.length,
            acceptable: section.items.filter(item => item.outcome === 'acceptable').length,
            defects: section.items.filter(item => ['c1', 'c2', 'c3'].includes(item.outcome)).length
          };

          return (
            <Card key={section.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <p className="text-xs text-blue-300 mt-1">{section.regulation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {section.isComplete && (
                      <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                        Complete
                      </Badge>
                    )}
                    {sectionStats.defects > 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        {sectionStats.defects} defects
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                        No defects
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-3">
                  {sectionStats.acceptable}/{sectionStats.total} items acceptable
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {section.items.filter(item => item.outcome !== 'acceptable' || item.notes).map(item => (
                    <div key={item.id} className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${outcomeDefinitions[item.outcome].bgColor.replace('/20', '')}`} />
                        <span className="font-medium truncate">{item.item}</span>
                      </div>
                      {item.notes && (
                        <p className="text-muted-foreground ml-4 mt-1">{item.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VisualInspectionResults;
