import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Filter, Search, Grid, List, Plus, Sparkles, X, Brain, CheckCircle2, Clock, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import PortfolioEntriesList from '@/components/apprentice/portfolio/PortfolioEntriesList';
import { SmartCaptureFlow } from '@/components/portfolio-hub/ai/SmartCaptureFlow';
import { KSBMappingAssistant } from '@/components/portfolio-hub/ai/KSBMappingAssistant';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';

interface EvidenceSectionProps {
  onQuickCapture: () => void;
}

/**
 * EvidenceSection - Browse and manage portfolio evidence
 *
 * Phase 2 Enhanced with:
 * - AI-powered KSB tagging via SmartCaptureFlow
 * - KSB Mapping Assistant for tracking progress
 * - Advanced filtering by category and status
 * - Visual grid and list views
 */
// Status filter options
const STATUS_OPTIONS = [
  { value: 'all', label: 'All', icon: null },
  { value: 'draft', label: 'Draft', icon: Edit },
  { value: 'pending', label: 'Pending Review', icon: Clock },
  { value: 'reviewed', label: 'Reviewed', icon: CheckCircle2 },
  { value: 'completed', label: 'Completed', icon: CheckCircle2 },
];

export function EvidenceSection({ onQuickCapture }: EvidenceSectionProps) {
  const { entries, categories, updateEntry, deleteEntry, isLoading, addEntry } = useUltraFastPortfolio();
  const { toast } = useToast();
  const { requirementCode } = useStudentQualification();
  const { tree } = useQualificationACs(requirementCode);
  const [showCaptureSheet, setShowCaptureSheet] = useState(false);
  const [showKSBAssistant, setShowKSBAssistant] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Count active filters
  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedStatus !== 'all' ? 1 : 0);

  // Get all KSBs that have been completed/evidenced
  const completedKSBs = entries
    .filter(e => e.status === 'completed' || e.status === 'reviewed')
    .flatMap(e => e.assessmentCriteria || []);

  // Filter entries based on search, category, and status
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchTerm === '' ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || entry.category?.id === selectedCategory;

    const matchesStatus = selectedStatus === 'all' || entry.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedStatus('all');
    setShowFilterSheet(false);
  };

  const handleCaptureComplete = async (data: any) => {
    try {
      // Create new portfolio entry with AI-suggested tags
      await addEntry({
        title: data.title,
        description: data.description,
        tags: data.selectedTags,
        assessmentCriteria: data.selectedKSBs,
        evidenceFiles: data.fileUrl ? [{
          id: Date.now().toString(),
          name: data.file?.name || 'Evidence',
          type: data.type,
          size: data.file?.size || 0,
          url: data.fileUrl,
          uploadDate: new Date().toISOString(),
        }] : [],
        status: 'draft',
      });

      setShowCaptureSheet(false);

      toast({
        title: "Evidence Added",
        description: `"${data.title}" has been added to your portfolio with ${data.selectedKSBs.length} KSB mappings`,
      });
    } catch (error) {
      toast({
        title: "Failed to save",
        description: error instanceof Error ? error.message : "Could not save evidence",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">My Evidence</h1>
            <p className="text-sm text-muted-foreground">{entries.length} items in your portfolio</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowKSBAssistant(true)}
              className="border-border gap-2"
            >
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">KSB Progress</span>
            </Button>
            <Button
              onClick={() => setShowCaptureSheet(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Capture
            </Button>
          </div>
        </div>

        {/* Assessment Criteria Progress */}
        <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 to-transparent">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Assessment Criteria</p>
                  <p className="text-xs text-muted-foreground">
                    {completedKSBs.length} of {tree.totalACs || '–'} criteria evidenced
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  tree.totalACs > 0 && completedKSBs.length >= tree.totalACs * 0.75
                    ? "bg-green-500/20 text-green-500 border-green-500/30"
                    : "bg-amber-500/20 text-amber-500 border-amber-500/30"
                )}
              >
                {tree.totalACs > 0
                  ? `${Math.round((completedKSBs.length / tree.totalACs) * 100)}%`
                  : '–'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Search & Filter Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            {!searchTerm && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search evidence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn("bg-card border-border", !searchTerm && "pl-9")}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "border-border shrink-0 relative touch-manipulation",
              activeFilterCount > 0 && "border-elec-yellow/50 bg-elec-yellow/10"
            )}
            onClick={() => setShowFilterSheet(true)}
          >
            <Filter className="h-4 w-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-elec-yellow text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "border-border shrink-0 hidden sm:flex",
              viewMode === 'grid' && "bg-elec-yellow/10 border-elec-yellow/30"
            )}
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            {viewMode === 'list' ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </Button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              !selectedCategory
                ? "bg-elec-yellow text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            All ({entries.length})
          </button>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                selectedCategory === cat.id
                  ? "bg-elec-yellow text-black"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {cat.name} ({entries.filter(e => e.category?.id === cat.id).length})
            </button>
          ))}
        </div>

        {/* Evidence List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border animate-pulse">
                <CardContent className="p-4">
                  <div className="h-5 w-48 bg-muted rounded mb-2" />
                  <div className="h-4 w-32 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredEntries.length === 0 ? (
          <Card className="border-dashed border-2 border-elec-yellow/30">
            <CardContent className="p-8 text-center">
              <Camera className="h-12 w-12 text-elec-yellow/50 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                {entries.length === 0 ? 'No evidence yet' : 'No matching evidence'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {entries.length === 0
                  ? 'Start building your portfolio with AI-powered capture'
                  : 'Try adjusting your search or filters'}
              </p>
              <Button
                onClick={() => setShowCaptureSheet(true)}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Capture Evidence
              </Button>
            </CardContent>
          </Card>
        ) : (
          <PortfolioEntriesList
            entries={filteredEntries}
            onUpdateEntry={updateEntry}
            onDeleteEntry={deleteEntry}
          />
        )}
      </div>

      {/* Smart Capture Sheet */}
      <Sheet open={showCaptureSheet} onOpenChange={setShowCaptureSheet}>
        <SheetContent side="bottom" className="h-[85vh] sm:h-auto sm:max-h-[85vh]">
          <SheetHeader className="sr-only">
            <SheetTitle>Add Evidence with AI</SheetTitle>
          </SheetHeader>
          <SmartCaptureFlow
            onComplete={handleCaptureComplete}
            onCancel={() => setShowCaptureSheet(false)}
          />
        </SheetContent>
      </Sheet>

      {/* KSB Mapping Assistant Sheet */}
      <Sheet open={showKSBAssistant} onOpenChange={setShowKSBAssistant}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader className="sr-only">
            <SheetTitle>KSB Mapping Assistant</SheetTitle>
          </SheetHeader>
          <div className="h-full overflow-auto -mx-6 px-6">
            <KSBMappingAssistant
              completedKSBs={completedKSBs}
              selectedKSBs={[]}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader>
            <SheetTitle>Filter Evidence</SheetTitle>
            <SheetDescription>
              Narrow down your portfolio entries
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Status Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Status</label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all touch-manipulation",
                      selectedStatus === status.value
                        ? "bg-elec-yellow text-black"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {status.icon && <status.icon className="h-4 w-4" />}
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation",
                    !selectedCategory
                      ? "bg-elec-yellow text-black"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation",
                      selectedCategory === cat.id
                        ? "bg-elec-yellow text-black"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="py-2 text-center text-sm text-muted-foreground">
              {filteredEntries.length} {filteredEntries.length === 1 ? 'result' : 'results'} found
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 pb-8">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex-1 h-12 touch-manipulation"
                disabled={activeFilterCount === 0}
              >
                Clear All
              </Button>
              <Button
                onClick={() => setShowFilterSheet(false)}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EvidenceSection;
