import { useState, useMemo, useCallback } from 'react';
import { Search, AlertTriangle, Shield, Bookmark, LayoutGrid, List as ListIcon, Maximize2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { hazardDatabase } from '@/data/enhanced-hazard-database';
import { HazardStatsDashboard } from './HazardStatsDashboard';
import { RiskMatrixVisual } from './RiskMatrixVisual';
import { RegulationQuickReference } from './RegulationQuickReference';
import { HazardCard } from './HazardCard';
import { useToast } from '@/hooks/use-toast';
import { useHazardFilters } from '@/hooks/useHazardFilters';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

export const EnhancedHazardDatabase = () => {
  const { toast } = useToast();
  const { isMobile } = useMobileEnhanced();
  
  // Use custom hook for filters
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedRiskLevel,
    setSelectedRiskLevel,
    selectedWorkType,
    setSelectedWorkType,
    selectedRegulation,
    setSelectedRegulation,
    riskScoreFilter,
    setRiskScoreFilter,
    showBookmarkedOnly,
    setShowBookmarkedOnly,
    stats,
    getFilteredHazards,
    hasActiveFilters,
    clearAllFilters,
  } = useHazardFilters();

  // View mode and UI state
  const [viewMode, setViewMode] = useState<'detailed' | 'compact' | 'list'>('detailed');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedHazards, setBookmarkedHazards] = useState<Set<string>>(new Set());

  // Get filtered hazards with bookmarks
  const filteredHazards = useMemo(() => 
    getFilteredHazards(bookmarkedHazards),
    [getFilteredHazards, bookmarkedHazards]
  );

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

  const shareHazard = async (hazard: any) => {
    const riskScore = hazard.likelihood * hazard.severity;
    const text = `⚠️ ${hazard.hazard}\n\nRisk Score: ${riskScore}/25\n\n${hazard.consequence}\n\nControl Measures Available`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: hazard.hazard,
          text: text,
        });
        toast({
          title: "Shared successfully",
          description: "Hazard information shared",
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Hazard information copied",
      });
    }
  };

  const toggleBookmark = (hazardId: string) => {
    setBookmarkedHazards(prev => {
      const next = new Set(prev);
      if (next.has(hazardId)) {
        next.delete(hazardId);
        toast({
          title: "Bookmark removed",
          description: "Hazard removed from bookmarks",
        });
      } else {
        next.add(hazardId);
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
        toast({
          title: "Bookmarked",
          description: "Hazard saved for quick access",
        });
      }
      return next;
    });
  };

  const handleRiskMatrixClick = useCallback((minScore: number, maxScore: number) => {
    setRiskScoreFilter({ min: minScore, max: maxScore });
  }, [setRiskScoreFilter]);

  const handleRegulationClick = useCallback((regulation: string) => {
    setSelectedRegulation(regulation);
  }, [setSelectedRegulation]);

  return (
    <div className={cn(
      "min-h-screen bg-background",
      !isMobile && "flex gap-6 p-6"
    )}>
      {/* LEFT PANEL - Desktop Only */}
      {!isMobile && (
        <aside className="w-[360px] sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto space-y-4">
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

          {/* Risk Matrix */}
          <RiskMatrixVisual 
            hazards={filteredHazards}
            onRiskLevelClick={handleRiskMatrixClick}
          />

          {/* Regulation Quick Reference */}
          <RegulationQuickReference
            hazards={filteredHazards}
            onRegulationClick={handleRegulationClick}
          />

          {/* Bookmarks */}
          {bookmarkedHazards.size > 0 && (
            <div className="bg-elec-card/50 rounded-lg border border-border/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bookmark className="w-4 h-4 text-elec-yellow" />
                <h3 className="font-semibold">Bookmarked</h3>
                <Badge variant="outline" className="ml-auto">{bookmarkedHazards.size}</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className="w-full"
              >
                {showBookmarkedOnly ? 'Show All' : 'Show Bookmarked Only'}
              </Button>
            </div>
          )}
        </aside>
      )}

      {/* RIGHT PANEL - Main Content */}
      <main className={cn("flex-1", isMobile && "p-4 space-y-6")}>
        {/* Mobile: Show stats at top */}
        {isMobile && (
          <HazardStatsDashboard
            totalHazards={stats.totalHazards}
            veryHighRisk={stats.veryHigh}
            highRisk={stats.high}
            mediumRisk={stats.medium}
            lowRisk={stats.low}
            totalControls={stats.totalControls}
            categoryBreakdown={stats.categoryBreakdown}
          />
        )}

        {/* View Mode Toggle & Control Hierarchy - Sticky */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-elec-card/95 to-elec-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-3 shadow-lg space-y-3">
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-elec-yellow" />
              <span className="text-xs font-semibold uppercase tracking-wide">Hazard Database</span>
            </div>
            <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as any)} className="gap-1">
              <ToggleGroupItem value="detailed" size="sm" className="text-xs px-2">
                <Maximize2 className="w-3 h-3 mr-1" />
                {!isMobile && 'Detail'}
              </ToggleGroupItem>
              <ToggleGroupItem value="compact" size="sm" className="text-xs px-2">
                <LayoutGrid className="w-3 h-3 mr-1" />
                {!isMobile && 'Compact'}
              </ToggleGroupItem>
              <ToggleGroupItem value="list" size="sm" className="text-xs px-2">
                <ListIcon className="w-3 h-3 mr-1" />
                {!isMobile && 'List'}
              </ToggleGroupItem>

            </ToggleGroup>
          </div>

          {/* Control Hierarchy Legend */}
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
          {hasActiveFilters && (
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
              {showBookmarkedOnly && (
                <Badge variant="outline" className="text-xs">
                  Bookmarked only
                  <button onClick={() => setShowBookmarkedOnly(false)} className="ml-1">×</button>
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                Showing {filteredHazards.length} of {stats.totalHazards} hazards
              </span>
            </div>
          )}
        </div>

        {/* Mobile: Show side panels */}
        {isMobile && (
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
        )}

        {/* Hazard Cards */}
        {filteredHazards.length > 0 ? (
          <div className={cn(
            "space-y-3",
            viewMode === 'list' && "space-y-2"
          )}>
            {filteredHazards.map((hazard) => (
              <HazardCard
                key={hazard.id}
                hazard={hazard}
                viewMode={viewMode}
                isBookmarked={bookmarkedHazards.has(hazard.id)}
                onToggleBookmark={toggleBookmark}
                onShare={shareHazard}
                onCopy={copyControlMeasures}
                isCopied={copiedId === hazard.id}
                filteredHazards={filteredHazards}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-elec-card/30 rounded-lg border border-border/50">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">No hazards match your filters</p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Mobile Quick Action Bar - Bottom Sticky */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-20 bg-elec-card/95 backdrop-blur-sm border-t border-border/50 p-3 flex justify-around items-center shadow-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              className={cn("flex flex-col items-center gap-1", showBookmarkedOnly && "text-elec-yellow")}
            >
              <Bookmark className={cn("w-5 h-5", showBookmarkedOnly && "fill-elec-yellow")} />
              <span className="text-xs">
                {showBookmarkedOnly ? 'All' : `Saved (${bookmarkedHazards.size})`}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="flex flex-col items-center gap-1"
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs">Clear</span>
            </Button>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-elec-yellow">{filteredHazards.length}</span>
              <span className="text-xs text-muted-foreground">Hazards</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
