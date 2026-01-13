import { useState } from 'react';
import { Search, MapPin, Filter, Bookmark, BookmarkCheck, Clock, Building2, Zap, ExternalLink, ChevronRight, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  useSearchOpportunities,
  useSavedOpportunities,
  useSaveOpportunity,
  useRemoveSavedOpportunity,
  useSyncOpportunities,
  useTenderSources,
  formatOpportunityValue,
  formatDeadline,
  getCategoryColor,
  getSectorDisplayName,
  getComplexityBadge,
  type TenderOpportunity,
  type SearchFilters,
} from '@/hooks/useOpportunities';
import { OpportunityDetailSheet } from '../sheets/OpportunityDetailSheet';

interface TenderOpportunitiesSectionProps {
  onStartTender?: (opportunity: TenderOpportunity) => void;
}

export function TenderOpportunitiesSection({ onStartTender }: TenderOpportunitiesSectionProps) {
  const [searchPostcode, setSearchPostcode] = useState('');
  const [activePostcode, setActivePostcode] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    radius_miles: 25,
    status: 'live',
    sort_by: 'deadline',
    limit: 20,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<TenderOpportunity | null>(null);
  const [activeTab, setActiveTab] = useState('search');

  // Queries
  const searchQuery = useSearchOpportunities(
    { ...filters, postcode: activePostcode },
    !!activePostcode
  );
  const savedQuery = useSavedOpportunities();
  const sourcesQuery = useTenderSources();
  const saveOpportunity = useSaveOpportunity();
  const removeSavedOpportunity = useRemoveSavedOpportunity();
  const syncOpportunities = useSyncOpportunities();

  const handleSearch = () => {
    if (searchPostcode.trim()) {
      setActivePostcode(searchPostcode.trim().toUpperCase());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isSaved = (opportunityId: string) => {
    return savedQuery.data?.some(s => s.id === opportunityId) || false;
  };

  const toggleSave = (opportunity: TenderOpportunity) => {
    if (isSaved(opportunity.id)) {
      removeSavedOpportunity.mutate(opportunity.id);
    } else {
      saveOpportunity.mutate({ opportunityId: opportunity.id });
    }
  };

  const opportunities = searchQuery.data?.opportunities || [];
  const stats = searchQuery.data?.stats;

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter postcode (e.g. B15 2TT)"
              value={searchPostcode}
              onChange={(e) => setSearchPostcode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="pl-10 h-11 touch-manipulation"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={!searchPostcode.trim() || searchQuery.isFetching}
            className="h-11 px-6 bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {searchQuery.isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Radius Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Within:</span>
          {[10, 25, 50, 100].map((miles) => (
            <Button
              key={miles}
              variant={filters.radius_miles === miles ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, radius_miles: miles })}
              className={`touch-manipulation ${filters.radius_miles === miles ? 'bg-elec-yellow text-black' : ''}`}
            >
              {miles} miles
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(true)}
            className="ml-auto touch-manipulation"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
          <TabsTrigger
            value="search"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent px-4 py-3"
          >
            Search Results
            {opportunities.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-elec-yellow/20 text-elec-yellow">
                {opportunities.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent px-4 py-3"
          >
            Saved
            {(savedQuery.data?.length || 0) > 0 && (
              <Badge variant="secondary" className="ml-2">
                {savedQuery.data?.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="sources"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent px-4 py-3"
          >
            Sources
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          {/* Search Results */}
          <TabsContent value="search" className="m-0 p-4">
            {!activePostcode ? (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Find Electrical Contracts Near You</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Enter your postcode to discover live tender opportunities from councils, NHS, housing associations and more.
                </p>
              </div>
            ) : searchQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : searchQuery.error ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Search Failed</h3>
                <p className="text-muted-foreground">{(searchQuery.error as Error).message}</p>
              </div>
            ) : opportunities.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Opportunities Found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Try expanding your search radius or adjusting filters. New opportunities are added daily.
                </p>
              </div>
            ) : (
              <>
                {/* Stats Bar */}
                {stats && (
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">{stats.total}</span> opportunities
                    </span>
                    {stats.avg_value > 0 && (
                      <span className="text-muted-foreground">
                        Avg: <span className="font-medium text-foreground">£{stats.avg_value.toLocaleString()}</span>
                      </span>
                    )}
                  </div>
                )}

                {/* Opportunity Cards */}
                <div className="space-y-3">
                  {opportunities.map((opp) => (
                    <OpportunityCard
                      key={opp.id}
                      opportunity={opp}
                      isSaved={isSaved(opp.id)}
                      onToggleSave={() => toggleSave(opp)}
                      onView={() => setSelectedOpportunity(opp)}
                      onStartTender={() => onStartTender?.(opp)}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Saved Opportunities */}
          <TabsContent value="saved" className="m-0 p-4">
            {savedQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : (savedQuery.data?.length || 0) === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Saved Opportunities</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Save opportunities you're interested in to track them here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedQuery.data?.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    isSaved={true}
                    onToggleSave={() => removeSavedOpportunity.mutate(opp.id)}
                    onView={() => setSelectedOpportunity(opp)}
                    onStartTender={() => onStartTender?.(opp)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sources */}
          <TabsContent value="sources" className="m-0 p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-1">20 Integrated Tender Sources</h3>
              <p className="text-sm text-muted-foreground">
                We aggregate opportunities from government, housing, NHS, education, and construction platforms.
              </p>
            </div>

            <div className="space-y-3">
              {sourcesQuery.data?.map((source) => (
                <Card key={source.id} className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{source.display_name}</span>
                          {source.is_free ? (
                            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                              Free
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/30">
                              Premium
                            </Badge>
                          )}
                          {source.is_active && (
                            <div className="w-2 h-2 rounded-full bg-green-500" title="Active" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{source.description}</p>
                        {source.last_sync_at && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Last sync: {new Date(source.last_sync_at).toLocaleDateString('en-GB')} ({source.last_sync_count} opportunities)
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {source.website_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(source.website_url!, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        {source.source_type === 'api' && source.name === 'contracts_finder' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => syncOpportunities.mutate(source.name)}
                            disabled={syncOpportunities.isPending}
                          >
                            <RefreshCw className={`h-4 w-4 ${syncOpportunities.isPending ? 'animate-spin' : ''}`} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Filter Opportunities</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            {/* Value Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Contract Value</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Min (£)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.min_value || ''}
                    onChange={(e) => setFilters({ ...filters, min_value: Number(e.target.value) || undefined })}
                    className="h-11 touch-manipulation text-base"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Max (£)</label>
                  <Input
                    type="number"
                    placeholder="No limit"
                    value={filters.max_value || ''}
                    onChange={(e) => setFilters({ ...filters, max_value: Number(e.target.value) || undefined })}
                    className="h-11 touch-manipulation text-base"
                  />
                </div>
              </div>
            </div>

            {/* Sector */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sector</label>
              <Select
                value={filters.sector || 'all'}
                onValueChange={(v) => setFilters({ ...filters, sector: v === 'all' ? undefined : v })}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="All sectors" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="public">Public Sector</SelectItem>
                  <SelectItem value="local_authority">Local Council</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="healthcare">NHS / Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select
                value={filters.sort_by || 'deadline'}
                onValueChange={(v) => setFilters({ ...filters, sort_by: v as any })}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="deadline">Deadline (soonest first)</SelectItem>
                  <SelectItem value="distance">Distance (nearest first)</SelectItem>
                  <SelectItem value="value">Value (highest first)</SelectItem>
                  <SelectItem value="relevance">Relevance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] transition-transform"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Opportunity Detail Sheet */}
      <OpportunityDetailSheet
        opportunity={selectedOpportunity}
        open={!!selectedOpportunity}
        onOpenChange={(open) => !open && setSelectedOpportunity(null)}
        onStartTender={() => {
          if (selectedOpportunity) {
            onStartTender?.(selectedOpportunity);
            setSelectedOpportunity(null);
          }
        }}
        isSaved={selectedOpportunity ? isSaved(selectedOpportunity.id) : false}
        onToggleSave={() => selectedOpportunity && toggleSave(selectedOpportunity)}
      />
    </div>
  );
}

// Opportunity Card Component
interface OpportunityCardProps {
  opportunity: TenderOpportunity;
  isSaved: boolean;
  onToggleSave: () => void;
  onView: () => void;
  onStartTender?: () => void;
}

function OpportunityCard({ opportunity, isSaved, onToggleSave, onView, onStartTender }: OpportunityCardProps) {
  const deadline = formatDeadline(opportunity.deadline);
  const complexity = getComplexityBadge(opportunity.estimated_complexity);

  return (
    <Card
      className="bg-card/50 hover:bg-card/80 active:bg-card/90 transition-colors cursor-pointer touch-manipulation active:scale-[0.99]"
      onClick={onView}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Title and Client */}
            <div className="flex items-start gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-medium text-sm line-clamp-2">{opportunity.title}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {opportunity.client_name}
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              {opportunity.distance_miles !== null && opportunity.distance_miles !== undefined && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {opportunity.distance_miles} miles
                </span>
              )}
              <span className="font-medium text-foreground">
                {formatOpportunityValue(opportunity)}
              </span>
              <span className={`flex items-center gap-1 ${deadline.urgent ? 'text-orange-400' : ''}`}>
                <Clock className="h-3 w-3" />
                {deadline.text}
              </span>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="outline" className={complexity.color}>
                {complexity.text}
              </Badge>
              {opportunity.categories?.slice(0, 2).map((cat) => (
                <Badge key={cat} variant="outline" className={getCategoryColor(cat)}>
                  {cat.replace('_', ' ')}
                </Badge>
              ))}
              {opportunity.sector && (
                <Badge variant="outline" className="bg-gray-500/10 text-gray-400">
                  {getSectorDisplayName(opportunity.sector)}
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 touch-manipulation active:scale-95 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave();
              }}
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 text-elec-yellow" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground mr-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TenderOpportunitiesSection;
