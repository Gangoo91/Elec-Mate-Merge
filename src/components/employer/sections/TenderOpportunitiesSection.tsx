import { useState } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  Search,
  MapPin,
  Filter,
  Bookmark,
  BookmarkCheck,
  Clock,
  Zap,
  ExternalLink,
  ChevronRight,
  Loader2,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  IconButton,
  Eyebrow,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

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
    categories: ['electrical'], // Default to electrical jobs only
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
    return savedQuery.data?.some((s) => s.id === opportunityId) || false;
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search Header */}
      <div className="p-4 border-b border-white/[0.06] bg-[hsl(0_0%_12%)] flex-shrink-0">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none z-10" />
            <Input
              placeholder="Enter postcode (e.g. B15 2TT)"
              value={searchPostcode}
              onChange={(e) => setSearchPostcode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className={`${inputClass} pl-10`}
            />
          </div>
          <PrimaryButton
            onClick={handleSearch}
            disabled={!searchPostcode.trim() || searchQuery.isFetching}
          >
            {searchQuery.isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </PrimaryButton>
        </div>

        {/* Radius Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] text-white">Within:</span>
          {[10, 25, 50, 100].map((miles) => {
            const active = filters.radius_miles === miles;
            return (
              <button
                key={miles}
                onClick={() => setFilters({ ...filters, radius_miles: miles })}
                className={`h-9 px-3 rounded-full text-[12px] font-medium border touch-manipulation transition-colors ${active ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
              >
                {miles} miles
              </button>
            );
          })}
          <SecondaryButton onClick={() => setShowFilters(true)} size="sm" className="ml-auto">
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </SecondaryButton>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col min-h-0 overflow-hidden"
      >
        <TabsList className="w-full justify-start rounded-none border-b border-white/[0.06] bg-transparent h-auto p-0 flex-shrink-0">
          <TabsTrigger
            value="search"
            className="rounded-none border-b-2 border-transparent text-white data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent data-[state=active]:text-white px-4 py-3"
          >
            Search results
            {opportunities.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-elec-yellow/20 text-elec-yellow border-0">
                {opportunities.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="rounded-none border-b-2 border-transparent text-white data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent data-[state=active]:text-white px-4 py-3"
          >
            Saved
            {(savedQuery.data?.length || 0) > 0 && (
              <Badge variant="secondary" className="ml-2 bg-white/[0.08] text-white border-0">
                {savedQuery.data?.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="sources"
            className="rounded-none border-b-2 border-transparent text-white data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent data-[state=active]:text-white px-4 py-3"
          >
            Sources
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 min-h-0 overflow-auto">
          {/* Search Results */}
          <TabsContent value="search" className="m-0 p-4 min-h-full">
            {!activePostcode ? (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Find electrical contracts near you</h3>
                <p className="text-white max-w-sm mx-auto">
                  Enter your postcode to discover live tender opportunities from councils, NHS,
                  housing associations and more.
                </p>
              </div>
            ) : searchQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : searchQuery.error ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Search failed</h3>
                <p className="text-white">{(searchQuery.error as Error).message}</p>
              </div>
            ) : opportunities.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No opportunities found</h3>
                <p className="text-white max-w-sm mx-auto">
                  Try expanding your search radius or adjusting filters. New opportunities are added
                  daily.
                </p>
              </div>
            ) : (
              <>
                {/* Stats Bar */}
                {stats && (
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-white">
                      <span className="font-semibold text-white">{stats.total}</span>{' '}
                      opportunities
                    </span>
                    {stats.avg_value > 0 && (
                      <span className="text-white">
                        Avg:{' '}
                        <span className="font-semibold text-white">
                          £{stats.avg_value.toLocaleString()}
                        </span>
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
          <TabsContent value="saved" className="m-0 p-4 min-h-full">
            {savedQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : (savedQuery.data?.length || 0) === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No saved opportunities</h3>
                <p className="text-white max-w-sm mx-auto">
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
          <TabsContent value="sources" className="m-0 p-4 min-h-full">
            <div className="mb-4">
              <h3 className="font-semibold text-white mb-1">20 Integrated tender sources</h3>
              <p className="text-[13px] text-white">
                We aggregate opportunities from government, housing, NHS, education, and
                construction platforms.
              </p>
            </div>

            <div className="space-y-3">
              {sourcesQuery.data?.map((source) => (
                <Card key={source.id} className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{source.display_name}</span>
                          {source.is_free ? (
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-500/10 text-green-400 border-green-500/30"
                            >
                              Free
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/30"
                            >
                              Premium
                            </Badge>
                          )}
                          {source.is_active && (
                            <div className="w-2 h-2 rounded-full bg-green-500" title="Active" />
                          )}
                        </div>
                        <p className="text-[13px] text-white line-clamp-2">
                          {source.description}
                        </p>
                        {source.last_sync_at && (
                          <p className="text-[11.5px] text-white mt-2">
                            Last sync: {new Date(source.last_sync_at).toLocaleDateString('en-GB')} (
                            {source.last_sync_count} opportunities)
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {source.website_url && (
                          <IconButton
                            onClick={() => openExternalUrl(source.website_url!)}
                            aria-label="Open source website"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </IconButton>
                        )}
                        {source.source_type === 'api' && source.name === 'contracts_finder' && (
                          <IconButton
                            onClick={() => syncOpportunities.mutate(source.name)}
                            disabled={syncOpportunities.isPending}
                            aria-label="Sync source"
                          >
                            <RefreshCw
                              className={`h-4 w-4 ${syncOpportunities.isPending ? 'animate-spin' : ''}`}
                            />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0 overflow-hidden">
          <SheetShell
            eyebrow="Opportunities"
            title="Filter opportunities"
            description="Narrow by contract value, sector or sort order."
            footer={
              <PrimaryButton onClick={() => setShowFilters(false)} fullWidth size="lg">
                Apply filters
              </PrimaryButton>
            }
          >
            <FormCard eyebrow="Contract value">
              <FormGrid cols={2}>
                <Field label="Min (£)">
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.min_value || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, min_value: Number(e.target.value) || undefined })
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="Max (£)">
                  <Input
                    type="number"
                    placeholder="No limit"
                    value={filters.max_value || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, max_value: Number(e.target.value) || undefined })
                    }
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Sector & sort">
              <Field label="Sector">
                <Select
                  value={filters.sector || 'all'}
                  onValueChange={(v) =>
                    setFilters({ ...filters, sector: v === 'all' ? undefined : v })
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="All sectors" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="all">All sectors</SelectItem>
                    <SelectItem value="public">Public sector</SelectItem>
                    <SelectItem value="local_authority">Local council</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="healthcare">NHS / healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Sort by">
                <Select
                  value={filters.sort_by || 'deadline'}
                  onValueChange={(v) => setFilters({ ...filters, sort_by: v as any })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="deadline">Deadline (soonest first)</SelectItem>
                    <SelectItem value="distance">Distance (nearest first)</SelectItem>
                    <SelectItem value="value">Value (highest first)</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>
          </SheetShell>
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

function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSave,
  onView,
  onStartTender,
}: OpportunityCardProps) {
  const deadline = formatDeadline(opportunity.deadline);
  const complexity = getComplexityBadge(opportunity.estimated_complexity);

  // Get scope preview text
  const scopePreview = opportunity.scope_of_works || opportunity.description || '';
  const hasScope = scopePreview.length > 0;

  return (
    <Card
      className="bg-[hsl(0_0%_12%)] border-white/[0.06] hover:bg-[hsl(0_0%_14%)] active:bg-[hsl(0_0%_15%)] transition-colors cursor-pointer touch-manipulation active:scale-[0.99]"
      onClick={onView}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Title and Client */}
            <div className="flex items-start gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 text-white">{opportunity.title}</h4>
                <p className="text-xs text-white truncate">{opportunity.client_name}</p>
              </div>
            </div>

            {/* Location and Key Info */}
            <div className="flex items-center gap-3 text-xs text-white mb-2 flex-wrap">
              {opportunity.location_text && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {opportunity.location_text}
                </span>
              )}
              {opportunity.distance_miles !== null && opportunity.distance_miles !== undefined && (
                <span className="text-elec-yellow font-medium">
                  {opportunity.distance_miles} miles
                </span>
              )}
              <span className="font-semibold text-white">
                {formatOpportunityValue(opportunity)}
              </span>
              <span
                className={`flex items-center gap-1 ${deadline.urgent ? 'text-orange-400' : ''}`}
              >
                <Clock className="h-3 w-3" />
                {deadline.text}
              </span>
            </div>

            {/* Scope Preview */}
            {hasScope && (
              <div className="mb-2 p-2 rounded-lg bg-[hsl(0_0%_9%)] border border-white/[0.06]">
                <p className="text-xs text-white line-clamp-2">{scopePreview}</p>
              </div>
            )}

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
                <Badge variant="outline" className="bg-white/[0.06] text-white border-white/[0.08]">
                  {getSectorDisplayName(opportunity.sector)}
                </Badge>
              )}
              {opportunity.framework_required && (
                <Badge
                  variant="outline"
                  className="bg-orange-500/10 text-orange-400 border-orange-500/30"
                >
                  Framework
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-1">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave();
              }}
              aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 text-elec-yellow" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </IconButton>
            <ChevronRight className="h-4 w-4 text-white mr-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TenderOpportunitiesSection;
