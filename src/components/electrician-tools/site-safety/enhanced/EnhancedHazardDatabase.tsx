import { useState, useMemo, useRef } from 'react';
import { Search, Filter, Printer, Copy, Check, ChevronDown, AlertTriangle, Shield, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hazardDatabase } from '@/data/enhanced-hazard-database';
import { getRiskLevel } from '@/utils/risk-level-helpers';
import { HazardStatsDashboard } from './HazardStatsDashboard';
import { RiskMatrixVisual } from './RiskMatrixVisual';
import { RegulationQuickReference } from './RegulationQuickReference';
import { HazardPrintSheet } from './HazardPrintSheet';
import { useToast } from '@/hooks/use-toast';
import { useReactToPrint } from 'react-to-print';

export const EnhancedHazardDatabase = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');
  const [selectedRegulation, setSelectedRegulation] = useState<string>('all');
  const [riskScoreFilter, setRiskScoreFilter] = useState<{ min: number; max: number } | null>(null);
  const [expandedHazards, setExpandedHazards] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [printHazard, setPrintHazard] = useState<any>(null);

  // Calculate statistics
  const stats = useMemo(() => {
    const allHazards = hazardDatabase.flatMap(cat => cat.hazards);
    const totalControls = allHazards.reduce((sum, h) => {
      const measures = h.controlMeasures || {};
      return sum + 
        (measures.elimination?.length || 0) +
        (measures.substitution?.length || 0) +
        (measures.engineering?.length || 0) +
        (measures.administrative?.length || 0) +
        (measures.ppe?.length || 0);
    }, 0);

    const riskCounts = allHazards.reduce((acc, h) => {
      const score = h.likelihood * h.severity;
      if (score >= 15) acc.veryHigh++;
      else if (score >= 12) acc.high++;
      else if (score >= 6) acc.medium++;
      else acc.low++;
      return acc;
    }, { veryHigh: 0, high: 0, medium: 0, low: 0 });

    const categoryBreakdown = hazardDatabase.map(cat => ({
      category: cat.category,
      count: cat.hazards.length,
      color: cat.color || 'bg-elec-gray/20 text-foreground border-border/30'
    }));

    return {
      totalHazards: allHazards.length,
      ...riskCounts,
      totalControls,
      categoryBreakdown
    };
  }, []);

  // Filtered hazards
  const filteredHazards = useMemo(() => {
    return hazardDatabase.flatMap(category => {
      if (selectedCategory !== 'all' && category.category !== selectedCategory) {
        return [];
      }

      return category.hazards.filter(hazard => {
        const riskScore = hazard.likelihood * hazard.severity;
        const riskLevel = getRiskLevel(riskScore);

        // Search filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = !searchTerm || 
          hazard.hazard.toLowerCase().includes(searchLower) ||
          hazard.consequence?.toLowerCase().includes(searchLower) ||
          hazard.category.toLowerCase().includes(searchLower) ||
          hazard.bs7671References?.some((ref: string) => ref.toLowerCase().includes(searchLower));

        // Risk level filter
        const matchesRiskLevel = selectedRiskLevel === 'all' || riskLevel === selectedRiskLevel;

        // Work type filter
        const matchesWorkType = selectedWorkType === 'all' || 
          hazard.workTypes?.includes(selectedWorkType);

        // Regulation filter
        const matchesRegulation = selectedRegulation === 'all' ||
          hazard.bs7671References?.includes(selectedRegulation);

        // Risk score filter
        const matchesRiskScore = !riskScoreFilter || 
          (riskScore >= riskScoreFilter.min && riskScore <= riskScoreFilter.max);

        return matchesSearch && matchesRiskLevel && matchesWorkType && matchesRegulation && matchesRiskScore;
      }).map(hazard => ({
        ...hazard,
        category: category.category,
        categoryIcon: category.icon
      }));
    });
  }, [searchTerm, selectedCategory, selectedRiskLevel, selectedWorkType, selectedRegulation, riskScoreFilter]);

  const toggleHazard = (hazardId: string) => {
    setExpandedHazards(prev => {
      const next = new Set(prev);
      if (next.has(hazardId)) {
        next.delete(hazardId);
      } else {
        next.add(hazardId);
      }
      return next;
    });
  };

  const copyControlMeasures = async (hazard: any) => {
    const measures = hazard.controlMeasures || {};
    let text = `HAZARD: ${hazard.hazard}\n\nCONTROL MEASURES:\n\n`;
    
    if (measures.elimination?.length) {
      text += `🚫 ELIMINATION (Priority 1):\n${measures.elimination.map((m: string) => `• ${m}`).join('\n')}\n\n`;
    }
    if (measures.substitution?.length) {
      text += `🔄 SUBSTITUTION (Priority 2):\n${measures.substitution.map((m: string) => `• ${m}`).join('\n')}\n\n`;
    }
    if (measures.engineering?.length) {
      text += `🔧 ENGINEERING CONTROLS (Priority 3):\n${measures.engineering.map((m: string) => `• ${m}`).join('\n')}\n\n`;
    }
    if (measures.administrative?.length) {
      text += `📋 ADMINISTRATIVE CONTROLS (Priority 4):\n${measures.administrative.map((m: string) => `• ${m}`).join('\n')}\n\n`;
    }
    if (measures.ppe?.length) {
      text += `🦺 PPE (Priority 5 - Last Resort):\n${measures.ppe.map((m: string) => `• ${m}`).join('\n')}\n\n`;
    }

    await navigator.clipboard.writeText(text);
    setCopiedId(hazard.id);
    toast({
      title: "Copied to clipboard",
      description: "Control measures copied successfully",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const printHazardSheet = (hazard: any) => {
    setPrintHazard(hazard);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const handleRiskMatrixClick = (minScore: number, maxScore: number) => {
    setRiskScoreFilter({ min: minScore, max: maxScore });
  };

  const handleRegulationClick = (regulation: string) => {
    setSelectedRegulation(regulation);
  };

  const getControlHierarchyIcon = (type: string) => {
    switch (type) {
      case 'elimination': return '🚫';
      case 'substitution': return '🔄';
      case 'engineering': return '🔧';
      case 'administrative': return '📋';
      case 'ppe': return '🦺';
      default: return '•';
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 space-y-6">
      {/* Statistics Dashboard */}
      <HazardStatsDashboard
        totalHazards={stats.totalHazards}
        veryHighRisk={stats.veryHigh}
        highRisk={stats.high}
        mediumRisk={stats.medium}
        lowRisk={stats.low}
        totalControls={stats.totalControls}
        categoryBreakdown={stats.categoryBreakdown}
      />

      {/* Control Hierarchy Legend - Sticky */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-elec-card/95 to-elec-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-elec-yellow" />
          <span className="text-xs font-semibold uppercase tracking-wide">Control Hierarchy</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">🚫 P1 Elimination</Badge>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">🔄 P2 Substitution</Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">🔧 P3 Engineering</Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">📋 P4 Administrative</Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">🦺 P5 PPE</Badge>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-elec-card/50 rounded-lg border border-border/50 p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by hazard, regulation, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {hazardDatabase.map(cat => (
                <SelectItem key={cat.category} value={cat.category}>
                  {cat.icon} {cat.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedWorkType} onValueChange={setSelectedWorkType}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Work Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Work Types</SelectItem>
              <SelectItem value="Installation">Installation</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Testing">Testing</SelectItem>
              <SelectItem value="Fault-Finding">Fault-Finding</SelectItem>
              <SelectItem value="Inspection">Inspection</SelectItem>
              <SelectItem value="Emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegulation} onValueChange={setSelectedRegulation}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Regulation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regulations</SelectItem>
              <SelectItem value="411.3.3">411.3.3 - RCD Protection</SelectItem>
              <SelectItem value="514.11">514.11 - Isolation</SelectItem>
              <SelectItem value="701.415.2">701.415.2 - Bonding</SelectItem>
              <SelectItem value="522.6.101">522.6.101 - Underground</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== 'all' || selectedRiskLevel !== 'all' || selectedWorkType !== 'all' || selectedRegulation !== 'all' || riskScoreFilter) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <Badge variant="outline" className="text-xs">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-1">×</button>
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="outline" className="text-xs">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-1">×</button>
              </Badge>
            )}
            {selectedRiskLevel !== 'all' && (
              <Badge variant="outline" className="text-xs">
                {selectedRiskLevel} risk
                <button onClick={() => setSelectedRiskLevel('all')} className="ml-1">×</button>
              </Badge>
            )}
            {selectedWorkType !== 'all' && (
              <Badge variant="outline" className="text-xs">
                {selectedWorkType}
                <button onClick={() => setSelectedWorkType('all')} className="ml-1">×</button>
              </Badge>
            )}
            {selectedRegulation !== 'all' && (
              <Badge variant="outline" className="text-xs">
                BS7671: {selectedRegulation}
                <button onClick={() => setSelectedRegulation('all')} className="ml-1">×</button>
              </Badge>
            )}
            {riskScoreFilter && (
              <Badge variant="outline" className="text-xs">
                Score: {riskScoreFilter.min}-{riskScoreFilter.max}
                <button onClick={() => setRiskScoreFilter(null)} className="ml-1">×</button>
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              Showing {filteredHazards.length} of {stats.totalHazards} hazards
            </span>
          </div>
        )}
      </div>

      {/* Side Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RiskMatrixVisual 
          hazards={filteredHazards}
          onRiskLevelClick={handleRiskMatrixClick}
        />
        <RegulationQuickReference
          hazards={filteredHazards}
          onRegulationClick={handleRegulationClick}
        />
      </div>

      {/* Hazard Cards */}
      <div className="space-y-4">
        {filteredHazards.map((hazard, index) => {
          const riskScore = hazard.likelihood * hazard.severity;
          const isExpanded = expandedHazards.has(hazard.id);
          const isCopied = copiedId === hazard.id;

          return (
            <div 
              key={hazard.id}
              className="bg-elec-card/50 rounded-lg border-l-4 border-elec-yellow hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{hazard.categoryIcon || '⚡'}</span>
                      <h3 className="text-lg md:text-xl font-bold">{hazard.hazard}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge variant="outline" className="text-xs">
                        {hazard.category}
                      </Badge>
                      <Badge className={`text-xs ${getRiskScoreColor(riskScore)}`}>
                        Risk: {riskScore}/25 ({getRiskLevel(riskScore).toUpperCase()})
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleHazard(hazard.id)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </Button>
                </div>

                {/* Consequence */}
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

                {/* Risk Assessment */}
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
                          className={`h-full ${
                            riskScore >= 15 ? 'bg-red-500' :
                            riskScore >= 12 ? 'bg-orange-500' :
                            riskScore >= 6 ? 'bg-amber-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(riskScore / 25) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm font-semibold">{riskScore}/25</div>
                    </div>
                  </div>
                </div>

                {/* Control Measures - Always Visible */}
                {hazard.controlMeasures && (
                  <div className="space-y-3 mb-4">
                    {['elimination', 'substitution', 'engineering', 'administrative', 'ppe'].map(type => {
                      const measures = hazard.controlMeasures[type];
                      if (!measures || measures.length === 0) return null;

                      return (
                        <div key={type} className={`rounded-lg border p-3 ${getControlHierarchyColor(type)}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base">{getControlHierarchyIcon(type)}</span>
                            <div className="text-xs font-semibold uppercase tracking-wide">
                              {getControlHierarchyLabel(type)}
                            </div>
                            <Badge variant="outline" className="text-xs ml-auto">
                              {measures.length}
                            </Badge>
                          </div>
                          <ul className="space-y-1.5 text-sm leading-relaxed">
                            {measures.map((measure: string, idx: number) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-muted-foreground flex-shrink-0">•</span>
                                <span>{measure}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="space-y-4 pt-4 border-t border-border/30">
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
                    {hazard.workTypes && hazard.workTypes.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                          Work Types
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hazard.workTypes.map((type: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Environments */}
                    {hazard.environments && hazard.environments.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                          Environments
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hazard.environments.map((env: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {env}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Hazards */}
                    {hazard.relatedHazards && hazard.relatedHazards.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                          Related Hazards
                        </div>
                        <div className="space-y-1">
                          {hazard.relatedHazards.map((relatedId: string, idx: number) => {
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
                    onClick={() => printHazardSheet(hazard)}
                    className="text-xs"
                  >
                    <Printer className="w-3 h-3 mr-1" />
                    Print Sheet
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyControlMeasures(hazard)}
                    className="text-xs"
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
          );
        })}
      </div>

      {/* No Results */}
      {filteredHazards.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No hazards match your filters</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedRiskLevel('all');
              setSelectedWorkType('all');
              setSelectedRegulation('all');
              setRiskScoreFilter(null);
            }}
            className="mt-3"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Hidden Print Component */}
      <div className="hidden">
        {printHazard && (
          <HazardPrintSheet ref={printRef} hazard={printHazard} />
        )}
      </div>
    </div>
  );
};
