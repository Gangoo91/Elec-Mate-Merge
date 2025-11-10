import React, { memo, useState } from 'react';
import { ChevronDown, AlertTriangle, FileText, Copy, Check, Share2, Bookmark, Ban, RefreshCw, Wrench, ClipboardList, Shield, Zap, Skull, Lightbulb, Search, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getRiskLevel } from '@/utils/risk-level-helpers';
import { MobileGestureHandler } from '@/components/ui/mobile-gesture-handler';
import { cn } from '@/lib/utils';

interface HazardCardProps {
  hazard: any;
  viewMode: 'detailed' | 'compact' | 'list';
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onShare: (hazard: any) => void;
  onCopy: (hazard: any) => void;
  isCopied: boolean;
  filteredHazards?: any[];
}

export const HazardCard = memo(({ 
  hazard, 
  viewMode, 
  isBookmarked,
  onToggleBookmark,
  onShare,
  onCopy,
  isCopied,
  filteredHazards = []
}: HazardCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set(['elimination', 'substitution', 'engineering', 'administrative', 'ppe']));

  const riskScore = hazard.likelihood * hazard.severity;
  const riskLevel = getRiskLevel(riskScore);

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const getControlHierarchyIcon = (type: string) => {
    switch (type) {
      case 'elimination': return <Ban className="w-4 h-4" />;
      case 'substitution': return <RefreshCw className="w-4 h-4" />;
      case 'engineering': return <Wrench className="w-4 h-4" />;
      case 'administrative': return <ClipboardList className="w-4 h-4" />;
      case 'ppe': return <Shield className="w-4 h-4" />;
      default: return null;
    }
  };

  const getControlHierarchyColor = (type: string) => {
    switch (type) {
      case 'elimination': return 'bg-red-500/10 border-red-500/30';
      case 'substitution': return 'bg-orange-500/10 border-orange-500/30';
      case 'engineering': return 'bg-blue-500/10 border-blue-500/30';
      case 'administrative': return 'bg-purple-500/10 border-purple-500/30';
      case 'ppe': return 'bg-green-500/10 border-green-500/30';
      default: return 'bg-elec-gray/10 border-border/30';
    }
  };

  const getControlHierarchyLabel = (type: string) => {
    switch (type) {
      case 'elimination': return 'ELIMINATION (Priority 1)';
      case 'substitution': return 'SUBSTITUTION (Priority 2)';
      case 'engineering': return 'ENGINEERING CONTROLS (Priority 3)';
      case 'administrative': return 'ADMINISTRATIVE CONTROLS (Priority 4)';
      case 'ppe': return 'PPE (Priority 5 - Last Resort)';
      default: return type.toUpperCase();
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 15) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (score >= 12) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (score >= 6) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  // LIST VIEW - Ultra compact
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-elec-card/30 rounded border border-border/50 p-3 flex items-center justify-between hover:bg-elec-card/50 transition-all cursor-pointer active:scale-[0.98]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <Zap className="w-5 h-5 text-elec-yellow" />
          </div>
          <span className="font-medium truncate">{hazard.hazard}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className={`text-xs ${getRiskScoreColor(riskScore)}`}>
            {riskScore}
          </Badge>
          {isBookmarked && <Bookmark className="w-3 h-3 text-elec-yellow fill-elec-yellow" />}
          <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
        </div>
      </div>
    );
  }

  // COMPACT VIEW - Just consequence and risk
  if (viewMode === 'compact') {
    return (
      <MobileGestureHandler
        onSwipeRight={() => onToggleBookmark(hazard.id)}
        onSwipeLeft={() => onShare(hazard)}
      >
        <div 
          className="bg-elec-card/50 rounded-lg border border-border/50 p-4 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <Zap className="w-5 h-5 text-elec-yellow" />
              </div>
              <h3 className="font-bold truncate">{hazard.hazard}</h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {isBookmarked && <Bookmark className="w-4 h-4 text-elec-yellow fill-elec-yellow" />}
              <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
            </div>
          </div>

          {/* Risk Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Risk Score</span>
              <Badge className={`text-xs ${getRiskScoreColor(riskScore)}`}>
                {riskScore}/25 {riskLevel.toUpperCase()}
              </Badge>
            </div>
            <div className="w-full h-2 bg-elec-gray/30 rounded overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all",
                  riskScore >= 15 ? 'bg-red-500' :
                  riskScore >= 12 ? 'bg-orange-500' :
                  riskScore >= 6 ? 'bg-amber-500' : 'bg-green-500'
                )}
                style={{ width: `${(riskScore / 25) * 100}%` }}
              />
            </div>
          </div>

          {/* Consequence */}
          {hazard.consequence && (
            <div className="bg-red-500/10 border border-red-500/30 rounded p-2 text-sm flex items-start gap-2">
              <Skull className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{hazard.consequence}</span>
            </div>
          )}

          {/* Expanded content in compact view */}
          {isExpanded && (
            <div className="space-y-3 mt-4 pt-4 border-t border-border/30 animate-accordion-down">
              {/* Control Measures - Compact Version */}
              {hazard.controlMeasures && (
                <div className="space-y-2">
                  {['elimination', 'substitution', 'engineering', 'administrative', 'ppe'].map(type => {
                    const measures = hazard.controlMeasures[type];
                    if (!measures || measures.length === 0) return null;
                    
                    return (
                      <div key={type} className={cn("rounded border p-2", getControlHierarchyColor(type))}>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-1 flex items-center gap-1">
                          {getControlHierarchyIcon(type)}
                          <span>{getControlHierarchyLabel(type)}</span>
                        </div>
                        <ul className="space-y-1 text-xs">
                          {measures.slice(0, 3).map((measure: string, idx: number) => (
                            <li key={idx} className="flex gap-1">
                              <span className="text-muted-foreground">•</span>
                              <span>{measure}</span>
                            </li>
                          ))}
                          {measures.length > 3 && (
                            <li className="text-muted-foreground italic">
                              +{measures.length - 3} more controls
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Emergency Procedures - First 3 */}
              {hazard.emergencyProcedures && hazard.emergencyProcedures.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    Emergency Procedures
                  </div>
                  <div className="space-y-1">
                    {hazard.emergencyProcedures.slice(0, 3).map((proc: string, idx: number) => (
                      <div key={idx} className="text-xs bg-red-500/5 p-2 rounded border border-red-500/20">
                        {idx + 1}. {proc}
                      </div>
                    ))}
                    {hazard.emergencyProcedures.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{hazard.emergencyProcedures.length - 3} more steps
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Guidance Notes - First 2 */}
              {hazard.guidanceNotes && hazard.guidanceNotes.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-indigo-400" />
                    Guidance Notes
                  </div>
                  <div className="space-y-1">
                    {hazard.guidanceNotes.slice(0, 2).map((note: string, idx: number) => (
                      <div key={idx} className="text-xs bg-indigo-500/5 p-2 rounded border border-indigo-500/20">
                        • {note}
                      </div>
                    ))}
                    {hazard.guidanceNotes.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{hazard.guidanceNotes.length - 2} more notes
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tap to expand hint */}
          {!isExpanded && (
            <div className="text-center text-xs text-muted-foreground mt-2">
              Tap to expand
            </div>
          )}
        </div>
      </MobileGestureHandler>
    );
  }

  // DETAILED VIEW - Full card with collapsible sections
  return (
    <MobileGestureHandler
      onSwipeRight={() => onToggleBookmark(hazard.id)}
      onSwipeLeft={() => onShare(hazard)}
    >
      <div className="bg-elec-card/50 rounded-lg border-l-4 border-elec-yellow hover:shadow-xl transition-all overflow-hidden">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-elec-yellow" />
                <h3 className="text-lg md:text-xl font-bold">{hazard.hazard}</h3>
                {isBookmarked && <Bookmark className="w-5 h-5 text-elec-yellow fill-elec-yellow" />}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="outline" className="text-xs">
                  {hazard.category}
                </Badge>
                <Badge className={`text-xs ${getRiskScoreColor(riskScore)}`}>
                  Risk: {riskScore}/25 ({riskLevel.toUpperCase()})
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
            </Button>
          </div>

          {/* Consequence - Always visible */}
          {hazard.consequence && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-red-400 uppercase mb-1">Consequence</div>
                  <p className="text-sm leading-relaxed">{hazard.consequence}</p>
                </div>
              </div>
            </div>
          )}

          {/* Risk Assessment - Always visible */}
          <div className="bg-background/50 rounded-lg p-3 mb-4">
            <div className="text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
              <FileText className="w-3 h-3" />
              Risk Assessment
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Likelihood</div>
                <div className="flex justify-center gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-8 rounded ${i < hazard.likelihood ? 'bg-elec-yellow' : 'bg-elec-gray/30'}`}
                    />
                  ))}
                </div>
                <div className="text-sm font-semibold">{hazard.likelihood}/5</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Severity</div>
                <div className="flex justify-center gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-8 rounded ${i < hazard.severity ? 'bg-red-500' : 'bg-elec-gray/30'}`}
                    />
                  ))}
                </div>
                <div className="text-sm font-semibold">{hazard.severity}/5</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Combined</div>
                <div className="w-full h-8 bg-elec-gray/30 rounded mb-1 overflow-hidden">
                  <div 
                    className={cn(
                      "h-full",
                      riskScore >= 15 ? 'bg-red-500' :
                      riskScore >= 12 ? 'bg-orange-500' :
                      riskScore >= 6 ? 'bg-amber-500' : 'bg-green-500'
                    )}
                    style={{ width: `${(riskScore / 25) * 100}%` }}
                  />
                </div>
                <div className="text-sm font-semibold">{riskScore}/25</div>
              </div>
            </div>
          </div>

          {/* Control Measures - COLLAPSIBLE */}
          {hazard.controlMeasures && (
            <div className="space-y-2 mb-4">
              {['elimination', 'substitution', 'engineering', 'administrative', 'ppe'].map(type => {
                const measures = hazard.controlMeasures[type];
                if (!measures || measures.length === 0) return null;
                const isCollapsed = collapsedSections.has(type);

                return (
                  <Collapsible key={type} open={!isCollapsed} onOpenChange={() => toggleSection(type)}>
                    <div className={cn("rounded-lg border", getControlHierarchyColor(type))}>
                      <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-background/5 transition-colors">
                        <div className="flex items-center gap-2">
                          {getControlHierarchyIcon(type)}
                          <div className="text-xs font-semibold uppercase tracking-wide">
                            {getControlHierarchyLabel(type)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {measures.length}
                          </Badge>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", !isCollapsed && "rotate-180")} />
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="px-3 pb-3">
                        <ul className="space-y-1.5 text-sm leading-relaxed pt-2">
                          {measures.map((measure: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-muted-foreground flex-shrink-0">•</span>
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          )}

          {/* Expanded Details */}
          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-border/30 animate-accordion-down">
              {/* Regulations */}
              {hazard.bs7671References && hazard.bs7671References.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                    Regulations & Standards
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hazard.bs7671References.map((reg: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="font-mono text-xs">
                        BS7671: {reg}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Types */}
              {hazard.workType && hazard.workType.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                    Work Types
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hazard.workType.map((type: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Environments */}
              {hazard.environment && hazard.environment.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                    Environments
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hazard.environment.map((env: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {env}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Guidance Notes */}
              {hazard.guidanceNotes && hazard.guidanceNotes.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-indigo-400" />
                    Guidance Notes
                  </div>
                  <div className="space-y-2">
                    {hazard.guidanceNotes.map((note: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm bg-indigo-500/5 p-2 rounded border border-indigo-500/20">
                        <span className="text-indigo-400 flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Procedures */}
              {hazard.emergencyProcedures && hazard.emergencyProcedures.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Emergency Procedures
                  </div>
                  <div className="space-y-2">
                    {hazard.emergencyProcedures.map((proc: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 bg-red-500/5 p-3 rounded border border-red-500/20">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <span className="text-sm text-muted-foreground">{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inspection Checks */}
              {hazard.inspectionChecks && hazard.inspectionChecks.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan-400" />
                    Inspection Checks
                  </div>
                  <div className="space-y-1">
                    {hazard.inspectionChecks.map((check: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm bg-cyan-500/5 p-2 rounded border border-cyan-500/20">
                        <Check className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Training Required */}
              {hazard.trainingRequired && hazard.trainingRequired.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    Training Required
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hazard.trainingRequired.map((training: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-amber-500/5 border-amber-500/30">
                        {training}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Real World Scenarios */}
              {hazard.realWorldScenarios && hazard.realWorldScenarios.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-pink-400" />
                    Real-World Scenarios
                  </div>
                  <div className="space-y-2">
                    {hazard.realWorldScenarios.map((scenario: string, idx: number) => (
                      <div key={idx} className="p-3 bg-pink-500/5 rounded border border-pink-500/20">
                        <p className="text-sm text-muted-foreground italic">{scenario}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Hazards */}
              {(hazard as any).relatedHazards && Array.isArray((hazard as any).relatedHazards) && (hazard as any).relatedHazards.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                    Related Hazards
                  </div>
                  <div className="space-y-1">
                    {(hazard as any).relatedHazards.map((relatedId: string, idx: number) => {
                      const related = filteredHazards.find(h => h.id === relatedId);
                      if (!related) return null;
                      const relatedScore = related.likelihood * related.severity;
                      return (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <span>→</span>
                          <span>{related.hazard}</span>
                          <Badge variant="outline" className="text-xs">
                            Risk: {relatedScore}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleBookmark(hazard.id)}
              className="text-xs min-h-[44px]"
            >
              <Bookmark className={cn("w-3 h-3 mr-1", isBookmarked && "fill-elec-yellow text-elec-yellow")} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare(hazard)}
              className="text-xs min-h-[44px]"
            >
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCopy(hazard)}
              className="text-xs min-h-[44px]"
            >
              {isCopied ? (
                <><Check className="w-3 h-3 mr-1" /> Copied</>
              ) : (
                <><Copy className="w-3 h-3 mr-1" /> Copy Controls</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </MobileGestureHandler>
  );
});

HazardCard.displayName = 'HazardCard';
