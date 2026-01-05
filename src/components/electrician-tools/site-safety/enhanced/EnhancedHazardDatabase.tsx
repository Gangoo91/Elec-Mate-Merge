import { useState, useMemo, useCallback } from 'react';
import { Search, AlertTriangle, Shield, Bookmark, LayoutGrid, List as ListIcon, Maximize2, X, SlidersHorizontal, BarChart3, ChevronDown, AlertCircle, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { hazardDatabase } from '@/data/enhanced-hazard-database';
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedRiskLevel !== 'all',
    selectedWorkType !== 'all',
    selectedRegulation !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* MOBILE-OPTIMISED HEADER */}
      <div className="bg-[#1e1e1e] border-b border-white/10">
        <div className={cn("max-w-7xl mx-auto", isMobile ? "px-3 py-4" : "px-4 py-4")}>
          {/* Row 1: Title + Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                <Shield className="w-5 h-5 text-elec-yellow" />
              </div>
              <h1 className={cn("font-bold text-white", isMobile ? "text-lg" : "text-xl")}>Hazard Database</h1>
              <Badge variant="outline" className={cn("bg-white/5 border-white/20 text-white/70", isMobile ? "text-xs" : "")}>
                {filteredHazards.length}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Bookmarks - Desktop Only */}
              {!isMobile && bookmarkedHazards.size > 0 && (
                <Button
                  variant={showBookmarkedOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                >
                  <Bookmark className={cn("w-4 h-4 mr-1", showBookmarkedOnly && "fill-current")} />
                  {bookmarkedHazards.size}
                </Button>
              )}
              
              {/* View Toggle - Desktop Only */}
              {!isMobile && (
                <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as any)}>
                  <ToggleGroupItem value="detailed" size="sm" title="Detailed view">
                    <Maximize2 className="w-4 h-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="compact" size="sm" title="Compact grid">
                    <LayoutGrid className="w-4 h-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" size="sm" title="List view">
                    <ListIcon className="w-4 h-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              )}

              {/* Desktop: Stats Popover */}
              {!isMobile && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Stats
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 rounded bg-red-500/10 border border-red-500/20">
                          <div className="text-2xl font-bold text-red-400">{stats.veryHigh}</div>
                          <div className="text-xs text-muted-foreground">Critical</div>
                        </div>
                        <div className="text-center p-3 rounded bg-orange-500/10 border border-orange-500/20">
                          <div className="text-2xl font-bold text-orange-400">{stats.high}</div>
                          <div className="text-xs text-muted-foreground">High Risk</div>
                        </div>
                        <div className="text-center p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                          <div className="text-2xl font-bold text-yellow-400">{stats.medium}</div>
                          <div className="text-xs text-muted-foreground">Medium</div>
                        </div>
                        <div className="text-center p-3 rounded bg-green-500/10 border border-green-500/20">
                          <div className="text-2xl font-bold text-green-400">{stats.low}</div>
                          <div className="text-xs text-muted-foreground">Low</div>
                        </div>
                      </div>
                      <div className="text-center pt-2 border-t border-border/30">
                        <div className="text-xl font-bold">{stats.totalHazards}</div>
                        <div className="text-xs text-muted-foreground">Total Hazards</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}

              {/* Mobile: Filters Trigger */}
              {isMobile && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-10 relative"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <SlidersHorizontal className="w-5 h-5 mr-1" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Row 2: Search Bar - Mobile Optimised */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder={isMobile ? "Search hazards..." : "Search hazards, regulations, or keywords..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-12 text-base bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:ring-elec-yellow/20",
                isMobile ? "h-14 rounded-xl" : "h-12 rounded-xl"
              )}
              style={{ fontSize: '16px' }}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className={cn("absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white hover:bg-white/10", isMobile ? "h-10 w-10" : "")}
                onClick={() => setSearchTerm('')}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Row 3: Quick Filter Chips - Desktop Only */}
          {!isMobile && (
            <div className="flex flex-wrap gap-2">
              {/* Category Chips */}
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {hazardDatabase.slice(0, 6).map(cat => (
                <Button
                  key={cat.category}
                  variant={selectedCategory === cat.category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.category)}
                >
                  {cat.icon} {cat.category}
                </Button>
              ))}

              <Separator orientation="vertical" className="h-8" />

              {/* Risk Level Filters */}
              <Button
                variant={selectedRiskLevel === 'high' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setSelectedRiskLevel(selectedRiskLevel === 'high' ? 'all' : 'high')}
              >
                <AlertTriangle className="w-3 h-3 mr-1" />
                High ({stats.veryHigh + stats.high})
              </Button>
              <Button
                variant={selectedRiskLevel === 'medium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRiskLevel(selectedRiskLevel === 'medium' ? 'all' : 'medium')}
              >
                Medium ({stats.medium})
              </Button>
              <Button
                variant={selectedRiskLevel === 'low' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRiskLevel(selectedRiskLevel === 'low' ? 'all' : 'low')}
              >
                Low ({stats.low})
              </Button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={cn(
        "max-w-7xl mx-auto py-4 sm:py-6",
        isMobile ? "px-3 pb-20" : "px-4 sm:px-6 lg:px-8"
      )}>
        {/* Hazards Grid */}
        {filteredHazards.length > 0 ? (
          <div className={cn(
            isMobile ? "gap-3" : "gap-4",
            viewMode === 'detailed' && "grid grid-cols-1",
            viewMode === 'compact' && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
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
          <Card className={cn("bg-[#1e1e1e] border border-white/10 border-dashed rounded-2xl text-center", isMobile ? "p-6" : "p-12")}>
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                <AlertCircle className={cn("text-white/40", isMobile ? "w-10 h-10" : "w-12 h-12")} />
              </div>
              <h3 className={cn("font-semibold mb-2 text-white", isMobile ? "text-base" : "text-lg")}>No hazards found</h3>
              <p className="text-white/50 mb-6 text-sm">
                Try adjusting your filters or search term
              </p>
              <Button
                onClick={clearAllFilters}
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
              >
                Clear All Filters
              </Button>
            </div>
          </Card>
        )}
      </div>


      {/* MOBILE: Filter Sheet - Enhanced */}
      {isMobile && (
        <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl bg-[#1e1e1e] border-t border-white/10">
            <SheetHeader className="border-b border-white/10 pb-4">
              <SheetTitle className="text-white">Filter Hazards</SheetTitle>
              <SheetDescription className="flex items-center gap-2">
                <Badge variant="outline" className="text-base bg-elec-yellow/10 border-elec-yellow/20 text-elec-yellow">
                  {filteredHazards.length} / {stats.totalHazards}
                </Badge>
                <span className="text-sm text-white/50">hazards shown</span>
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(90vh-10rem)] py-4">
              <div className="space-y-6 px-4">
                {/* Quick Filter Presets */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Quick Filters</div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-16 flex-col gap-1.5 bg-[#1a1a1a] border-white/10 hover:border-red-500/30 hover:bg-red-500/10 active:scale-[0.98]"
                      onClick={() => {
                        setSelectedRiskLevel('high');
                        setShowMobileFilters(false);
                      }}
                    >
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-xs font-medium text-white">High Risk</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex-col gap-1.5 bg-[#1a1a1a] border-white/10 hover:border-elec-yellow/30 hover:bg-elec-yellow/10 active:scale-[0.98]"
                      onClick={() => {
                        setSelectedCategory('Electrical');
                        setShowMobileFilters(false);
                      }}
                    >
                      <Zap className="w-5 h-5 text-elec-yellow" />
                      <span className="text-xs font-medium text-white">Electrical</span>
                    </Button>
                  </div>
                </div>

                {/* Category Buttons */}
                <div>
                  <label className="text-sm font-semibold mb-3 block text-white">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      className={cn(
                        "h-12 text-sm active:scale-[0.98]",
                        selectedCategory === 'all'
                          ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                          : "bg-[#1a1a1a] border-white/10 text-white hover:border-white/20"
                      )}
                      onClick={() => setSelectedCategory('all')}
                    >
                      All
                    </Button>
                    {hazardDatabase.map(cat => (
                      <Button
                        key={cat.category}
                        variant={selectedCategory === cat.category ? 'default' : 'outline'}
                        className={cn(
                          "h-12 text-sm active:scale-[0.98]",
                          selectedCategory === cat.category
                            ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                            : "bg-[#1a1a1a] border-white/10 text-white hover:border-white/20"
                        )}
                        onClick={() => setSelectedCategory(cat.category)}
                      >
                        {cat.icon && <span className="mr-2">{cat.icon}</span>}
                        {cat.category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Risk Level Buttons */}
                <div>
                  <label className="text-sm font-semibold mb-3 block text-white">Risk Level</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedRiskLevel === 'all' ? 'default' : 'outline'}
                      className={cn(
                        "h-12 text-sm active:scale-[0.98]",
                        selectedRiskLevel === 'all'
                          ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                          : "bg-[#1a1a1a] border-white/10 text-white hover:border-white/20"
                      )}
                      onClick={() => setSelectedRiskLevel('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedRiskLevel === 'high' ? 'destructive' : 'outline'}
                      className={cn(
                        "h-12 text-sm active:scale-[0.98]",
                        selectedRiskLevel === 'high'
                          ? "bg-red-500 hover:bg-red-500/90 text-white"
                          : "bg-[#1a1a1a] border-white/10 text-white hover:border-red-500/30"
                      )}
                      onClick={() => setSelectedRiskLevel('high')}
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      High
                    </Button>
                    <Button
                      variant={selectedRiskLevel === 'medium' ? 'default' : 'outline'}
                      className={cn(
                        "h-12 text-sm active:scale-[0.98]",
                        selectedRiskLevel === 'medium'
                          ? "bg-orange-500 hover:bg-orange-500/90 text-white"
                          : "bg-[#1a1a1a] border-white/10 text-white hover:border-orange-500/30"
                      )}
                      onClick={() => setSelectedRiskLevel('medium')}
                    >
                      Medium
                    </Button>
                    <Button
                      variant={selectedRiskLevel === 'low' ? 'default' : 'outline'}
                      className={cn(
                        "h-12 text-sm active:scale-[0.98]",
                        selectedRiskLevel === 'low'
                          ? "bg-green-500 hover:bg-green-500/90 text-white"
                          : "bg-[#1a1a1a] border-white/10 text-white hover:border-green-500/30"
                      )}
                      onClick={() => setSelectedRiskLevel('low')}
                    >
                      Low
                    </Button>
                  </div>
                </div>

                {/* Work Type */}
                <div>
                  <label className="text-sm font-semibold mb-3 block text-white">Work Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Installation', 'Maintenance', 'Testing', 'Inspection', 'Emergency'].map(type => (
                      <Button
                        key={type}
                        variant={selectedWorkType === type ? 'default' : 'outline'}
                        className={cn(
                          "h-12 text-sm active:scale-[0.98]",
                          selectedWorkType === type
                            ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                            : "bg-[#1a1a1a] border-white/10 text-white hover:border-white/20"
                        )}
                        onClick={() => setSelectedWorkType(type)}
                      >
                        {type === 'all' ? 'All' : type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="border-t border-white/10 p-4 flex gap-3 pb-safe">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="flex-1 h-12 bg-[#1a1a1a] border-white/10 text-white hover:bg-white/5"
              >
                Clear All
              </Button>
              <Button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
              >
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* MOBILE: Fixed Bottom Action Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1e1e1e]/98 backdrop-blur-md border-t border-white/10 pb-safe">
          <div className="grid grid-cols-4 gap-1 p-2">
            {/* View Mode */}
            <Button
              variant="ghost"
              size="sm"
              className="h-14 flex-col gap-1 text-xs text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]"
              onClick={() => {
                const modes: Array<'detailed' | 'compact' | 'list'> = ['detailed', 'compact', 'list'];
                const currentIndex = modes.indexOf(viewMode);
                const nextMode = modes[(currentIndex + 1) % modes.length];
                setViewMode(nextMode);
              }}
            >
              {viewMode === 'detailed' && <Maximize2 className="w-5 h-5" />}
              {viewMode === 'compact' && <LayoutGrid className="w-5 h-5" />}
              {viewMode === 'list' && <ListIcon className="w-5 h-5" />}
              <span className="text-[10px] text-white/50">
                {viewMode === 'detailed' ? 'Detailed' : viewMode === 'compact' ? 'Grid' : 'List'}
              </span>
            </Button>

            {/* Filters */}
            <Button
              variant="ghost"
              size="sm"
              className="h-14 flex-col gap-1 text-xs relative text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]"
              onClick={() => setShowMobileFilters(true)}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-[10px] text-white/50">Filters</span>
              {hasActiveFilters && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-elec-yellow text-black">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {/* Stats */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-14 flex-col gap-1 text-xs text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-[10px] text-white/50">Stats</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="pb-safe bg-[#1e1e1e] border-t border-white/10">
                <DrawerHeader>
                  <DrawerTitle className="text-white">Statistics</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="text-3xl font-bold text-red-400">{stats.veryHigh}</div>
                      <div className="text-xs text-white/50 mt-1">Critical</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <div className="text-3xl font-bold text-orange-400">{stats.high}</div>
                      <div className="text-xs text-white/50 mt-1">High Risk</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="text-3xl font-bold text-yellow-400">{stats.medium}</div>
                      <div className="text-xs text-white/50 mt-1">Medium</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="text-3xl font-bold text-green-400">{stats.low}</div>
                      <div className="text-xs text-white/50 mt-1">Low</div>
                    </div>
                  </div>
                  <div className="text-center pt-4 mt-4 border-t border-white/10">
                    <div className="text-3xl font-bold text-white">{stats.totalHazards}</div>
                    <div className="text-sm text-white/50 mt-1">Total Hazards</div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            {/* Bookmarks (if any) */}
            {bookmarkedHazards.size > 0 ? (
              <Button
                variant={showBookmarkedOnly ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  "h-14 flex-col gap-1 text-xs relative active:scale-[0.98]",
                  showBookmarkedOnly
                    ? "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              >
                <Bookmark className={cn("w-5 h-5", showBookmarkedOnly && "fill-current")} />
                <span className={cn("text-[10px]", showBookmarkedOnly ? "text-black/70" : "text-white/50")}>Saved</span>
                {!showBookmarkedOnly && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-elec-yellow text-black">
                    {bookmarkedHazards.size}
                  </Badge>
                )}
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
