
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, XCircle, BookOpen, Lightbulb, HelpCircle, Wrench, X, Info } from 'lucide-react';
import { RegulationWarning } from '@/utils/autoRegChecker';
import { getRegulationExplanation, getContextualSuggestions, generateRegulationReport } from '@/utils/regulationAssistant';

interface EnhancedRegulationWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warnings: RegulationWarning[];
  circuitDescription?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

const EnhancedRegulationWarningDialog: React.FC<EnhancedRegulationWarningDialogProps> = ({
  open,
  onOpenChange,
  warnings,
  circuitDescription = 'Circuit',
  onApprove,
  onReject
}) => {
  const [selectedWarning, setSelectedWarning] = useState<RegulationWarning | null>(null);
  
  const criticalWarnings = warnings.filter(w => w.severity === 'critical');
  const generalWarnings = warnings.filter(w => w.severity === 'warning');
  const infoWarnings = warnings.filter(w => w.severity === 'info');
  const report = generateRegulationReport(warnings);

  const getIcon = (severity: 'info' | 'warning' | 'critical') => {
    if (severity === 'critical') return <XCircle className="h-6 w-6 text-red-400" />;
    if (severity === 'warning') return <AlertTriangle className="h-6 w-6 text-amber-400" />;
    return <Info className="h-6 w-6 text-blue-400" />;
  };

  const getSeverityBadge = (severity: 'info' | 'warning' | 'critical') => {
    if (severity === 'critical') return <Badge variant="destructive" className="text-xs font-semibold bg-red-500/90 border-red-400">Critical</Badge>;
    if (severity === 'warning') return <Badge variant="outline" className="text-xs font-semibold border-2 border-amber-400 text-amber-100 bg-amber-500/20">Warning</Badge>;
    return <Badge variant="outline" className="text-xs font-semibold border-2 border-blue-400 text-blue-100 bg-blue-500/20">Info</Badge>;
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  if (warnings.length === 0) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-4xl w-[calc(100vw-1rem)] sm:w-full h-[85vh] sm:h-auto max-h-[85vh] overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 shadow-2xl shadow-elec-yellow/5 border border-border p-4 md:p-6 rounded-lg sm:rounded-2xl">
        <AlertDialogHeader className="relative pb-3 border-b border-border">{/* Removed sticky/negative margins */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 h-10 w-10 p-0 rounded-full bg-muted/80 hover:bg-muted touch-manipulation z-30"
            aria-label="Close dialog"
          >
            <X className="h-6 w-6 sm:h-5 sm:w-5" />
            <span className="sr-only">Close</span>
          </Button>
          <AlertDialogTitle className="flex items-center gap-3 pr-12 sm:pr-14 text-xl sm:text-2xl font-bold bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">
            {criticalWarnings.length > 0 ? (
              <XCircle className="h-7 w-7 text-red-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-7 w-7 text-amber-400 flex-shrink-0" />
            )}
            <span className="hidden sm:inline">BS 7671 Regulation Analysis: {circuitDescription}</span>
            <span className="sm:hidden">BS 7671</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base pt-2 leading-relaxed">
            {circuitDescription && <span className="sm:hidden block text-muted-foreground mb-2 font-medium">{circuitDescription}</span>}
            <span className="text-foreground/90">{report.overallAssessment}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <MobileTabs defaultValue="warnings" className="flex-1 min-h-0">
          <MobileTabsList className="grid w-full grid-cols-3 bg-transparent border-b-2 border-border/50 mb-4 gap-0">
            <MobileTabsTrigger 
              value="warnings" 
              className="min-h-[44px] text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground data-[state=active]:text-elec-yellow data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow data-[state=active]:-mb-[2px] rounded-t-md transition-all duration-200"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Issues</span>
              <span className="sm:hidden">Issues</span>
              <Badge variant="outline" className="ml-2 text-[11px] sm:text-xs border-current">{warnings.length}</Badge>
            </MobileTabsTrigger>
            <MobileTabsTrigger 
              value="assistant" 
              className="min-h-[44px] text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground data-[state=active]:text-elec-yellow data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow data-[state=active]:-mb-[2px] rounded-t-md transition-all duration-200"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Regulation Guide</span>
              <span className="sm:hidden">Guide</span>
            </MobileTabsTrigger>
            <MobileTabsTrigger 
              value="fixes" 
              className="min-h-[44px] text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground data-[state=active]:text-elec-yellow data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow data-[state=active]:-mb-[2px] rounded-t-md transition-all duration-200"
            >
              <Wrench className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Fix Guidance</span>
              <span className="sm:hidden">Fixes</span>
            </MobileTabsTrigger>
          </MobileTabsList>

          <MobileTabsContent value="warnings" className="mt-0 scroll-smooth">
            <ScrollArea className="h-[calc(85vh-240px)] sm:h-[52vh] pr-2 sm:pr-4">
              <div className="space-y-4">
                {criticalWarnings.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-red-400 flex items-center gap-2 text-base sm:text-lg pb-2 border-b border-red-500/30 mb-3">
                      <XCircle className="h-6 w-6 sm:h-5 sm:w-5 flex-shrink-0" />
                      Critical Issues ({criticalWarnings.length})
                    </h4>
                    {criticalWarnings.map((warning, index) => (
                      <Card 
                        key={index} 
                        className="border-2 border-red-500/40 bg-gradient-to-br from-red-900/40 to-rose-900/30 cursor-pointer hover:from-red-900/50 hover:to-rose-900/40 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200 touch-manipulation min-h-[56px] shadow-lg shadow-red-500/20"
                        onClick={() => setSelectedWarning(warning)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="font-semibold text-red-50 text-base sm:text-lg leading-tight">{warning.title}</h5>
                              {getSeverityBadge(warning.severity)}
                            </div>
                            <p className="text-base text-red-50/90 leading-relaxed">{warning.description}</p>
                            <div className="flex items-center gap-2 text-sm text-red-200 pt-1">
                              <BookOpen className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium">{warning.regulation}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {generalWarnings.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-amber-400 flex items-center gap-2 text-base sm:text-lg pb-2 border-b border-amber-500/30 mb-3">
                      <AlertTriangle className="h-6 w-6 sm:h-5 sm:w-5 flex-shrink-0" />
                      Warnings ({generalWarnings.length})
                    </h4>
                    {generalWarnings.map((warning, index) => (
                      <Card 
                        key={index} 
                        className="border-2 border-amber-500/40 bg-gradient-to-br from-amber-900/30 to-yellow-900/20 cursor-pointer hover:from-amber-900/40 hover:to-yellow-900/30 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-200 touch-manipulation min-h-[56px] shadow-lg shadow-amber-500/20"
                        onClick={() => setSelectedWarning(warning)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="font-semibold text-amber-50 text-base sm:text-lg leading-tight">{warning.title}</h5>
                              {getSeverityBadge(warning.severity)}
                            </div>
                            <p className="text-base text-amber-50/90 leading-relaxed">{warning.description}</p>
                            <div className="flex items-center gap-2 text-sm text-amber-200 pt-1">
                              <BookOpen className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium">{warning.regulation}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </MobileTabsContent>

          <MobileTabsContent value="assistant" className="mt-0 scroll-smooth">
            <ScrollArea className="h-[calc(85vh-240px)] sm:h-[52vh] pr-2 sm:pr-4">
              <div className="space-y-4">
                {selectedWarning ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedWarning(null)}
                      >
                        ← Back to Overview
                      </Button>
                      <h3 className="font-semibold">{selectedWarning.regulation}</h3>
                    </div>
                    
                    {(() => {
                      const explanation = getRegulationExplanation(selectedWarning.regulation);
                      
                      if (!explanation) {
                        return (
                          <div className="space-y-4">
                            <Card className="border-elec-yellow/30 bg-elec-gray-dark">
                              <CardContent className="pt-4">
                                <div className="flex items-start gap-2">
                                  <HelpCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-elec-yellow">About This Regulation</h4>
                                    <p className="text-sm text-foreground">
                                      This relates to <strong>{selectedWarning.regulation}</strong> from BS 7671, the UK wiring regulations.
                                    </p>
                                    <p className="text-sm text-foreground">
                                      <strong>Issue:</strong> {selectedWarning.description}
                                    </p>
                                    {selectedWarning.suggestion && (
                                      <div className="mt-3 p-2 bg-elec-gray-dark rounded border-l-2 border-elec-yellow">
                                        <p className="text-sm text-foreground">
                                          <strong>Suggestion:</strong> {selectedWarning.suggestion}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-elec-gray-dark">
                              <CardContent className="pt-4">
                                <div className="text-center space-y-2">
                                  <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
                                  <p className="text-sm text-muted-foreground">
                                    Detailed explanation for this specific regulation is not yet available in our database.
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Please refer to BS 7671 or consult with a qualified electrician for detailed guidance.
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <HelpCircle className="h-4 w-4" />
                                Plain English Explanation
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">{explanation.plainEnglish}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Why This Matters</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">{explanation.why}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Common Causes</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="text-sm space-y-1">
                                {explanation.commonCauses.map((cause, index) => (
                                  <li key={index} className="ml-2">• {cause}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-3 py-6">
                      <BookOpen className="h-12 w-12 text-primary mx-auto" />
                      <h3 className="font-semibold text-lg">BS 7671 Regulation Guide</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Click on any issue in the first tab to see detailed explanations, common causes, and guidance specific to that regulation.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Regulations Found in This Analysis:</h4>
                      <div className="grid gap-2">
                        {Array.from(new Set(warnings.map(w => w.regulation))).map((regulation, index) => (
                          <Card key={index} className="cursor-pointer hover:bg-muted/50"
                                onClick={() => {
                                  const warning = warnings.find(w => w.regulation === regulation);
                                  if (warning) setSelectedWarning(warning);
                                }}>
                            <CardContent className="py-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{regulation}</span>
                                <span className="text-xs text-muted-foreground">
                                  {warnings.filter(w => w.regulation === regulation).length} issue(s)
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </MobileTabsContent>

          <MobileTabsContent value="fixes" className="mt-0 scroll-smooth">
            <ScrollArea className="h-[calc(85vh-240px)] sm:h-[52vh] pr-2 sm:pr-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2 text-foreground pb-2 border-b border-elec-yellow/20">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  Fix Guidance & Recommendations
                </h3>
                
                {warnings.map((warning, index) => {
                  const contextualSuggestions = getContextualSuggestions(warning);
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          {getIcon(warning.severity)}
                          {warning.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {warning.suggestion && (
                          <div className="flex items-start gap-2 p-2 bg-elec-gray-dark rounded border-l-2 border-elec-yellow">
                            <Lightbulb className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-foreground">{warning.suggestion}</p>
                          </div>
                        )}
                        
                        {contextualSuggestions.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2">Additional Suggestions:</h4>
                            <ul className="text-sm space-y-1">
                              {contextualSuggestions.map((suggestion, suggestionIndex) => (
                                <li key={suggestionIndex} className="ml-2">• {suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </MobileTabsContent>
        </MobileTabs>

        <AlertDialogFooter className="pt-4 border-t border-elec-yellow/20 flex-col sm:flex-row gap-3 sm:gap-2">
          {criticalWarnings.length > 0 ? (
            <>
              <AlertDialogCancel onClick={onReject} className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px] text-base sm:text-sm font-medium touch-manipulation">
                Review & Fix Issues
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={onApprove}
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px] text-base sm:text-sm font-semibold bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-foreground shadow-lg shadow-red-500/30 touch-manipulation"
              >
                Accept with Critical Issues
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogCancel onClick={onReject} className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px] text-base sm:text-sm font-medium touch-manipulation">
                Review Warnings
              </AlertDialogCancel>
              <AlertDialogAction onClick={onApprove} className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px] text-base sm:text-sm font-semibold bg-gradient-to-r from-elec-yellow to-amber-400 hover:from-amber-400 hover:to-elec-yellow text-elec-gray shadow-lg shadow-elec-yellow/30 touch-manipulation">
                Understood
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EnhancedRegulationWarningDialog;
