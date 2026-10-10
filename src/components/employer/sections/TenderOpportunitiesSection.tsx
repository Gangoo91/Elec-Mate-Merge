import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Bookmark, BookmarkCheck, ExternalLink, ChevronRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FormSheet from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import { panel, Segments } from '@/components/employer/pageParts/PageParts';
import {
  useSearchOpportunities,
  useSavedOpportunities,
  useSaveOpportunity,
  useRemoveSavedOpportunity,
  formatOpportunityValue,
  formatDeadline,
  getSectorDisplayName,
  type TenderOpportunity,
  type SearchFilters,
} from '@/hooks/useOpportunities';
import { useTenderFeedSources } from '@/hooks/useTenderMatches';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { OpportunityDetailSheet, type OpportunityEstimate } from '../sheets/OpportunityDetailSheet';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  IconButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

const tabTrigger =
  'h-11 shrink-0 whitespace-nowrap rounded-full border border-white/[0.14] bg-white/[0.04] px-3.5 text-[13px] font-semibold text-white touch-manipulation data-[state=active]:border-elec-yellow data-[state=active]:bg-elec-yellow data-[state=active]:text-black';

const quietBtn =
  'h-11 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]';

/** One plain sentence inside a panel: the empty and error states. */
function Note({ title, text }: { title: string; text: string }) {
  return (
    <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
      <p className="text-[15px] font-semibold text-white">{title}</p>
      <p className="mt-0.5 max-w-xl text-[13px] leading-relaxed text-white">{text}</p>
    </div>
  );
}

function Spinner({ text }: { text: string }) {
  return (
    <div className={cn(panel, 'flex items-center gap-2 px-4 py-4 text-[14px] text-white sm:px-5')}>
      <Loader2 className="h-4 w-4 animate-spin" /> {text}
    </div>
  );
}

interface TenderOpportunitiesSectionProps {
  onStartTender?: (opportunity: TenderOpportunity, estimate?: OpportunityEstimate) => void;
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
  // Same rule as the matches card: notice values are for roles that see firm money.
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;

  // Queries
  const searchQuery = useSearchOpportunities(
    { ...filters, postcode: activePostcode },
    !!activePostcode
  );
  const savedQuery = useSavedOpportunities();
  const feedsQuery = useTenderFeedSources();
  const liveFeeds = (feedsQuery.data ?? []).filter((f) => f.live > 0);
  const saveOpportunity = useSaveOpportunity();
  const removeSavedOpportunity = useRemoveSavedOpportunity();

  const handleSearch = () => {
    if (searchPostcode.trim()) {
      setActivePostcode(searchPostcode.trim().toUpperCase());
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
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
    // Phone: one scroll, the search controls scroll away above the list.
    // Desktop: search on the left, results on the right, each scrolling.
    <div className="h-full overflow-y-auto overscroll-contain lg:flex lg:overflow-hidden">
      <div className="space-y-4 px-4 py-4 sm:px-6 lg:w-[24rem] lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-white/[0.08] lg:py-5 lg:pl-10">
        <div>
          <label
            htmlFor="tender-postcode"
            className="mb-1 block text-[13px] font-semibold text-white"
          >
            Postcode
          </label>
          <div className="flex gap-2">
            <Input
              id="tender-postcode"
              placeholder="e.g. B15 2TT"
              value={searchPostcode}
              onChange={(e) => setSearchPostcode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className={cn(inputClass, 'flex-1')}
            />
            <PrimaryButton
              onClick={handleSearch}
              disabled={!searchPostcode.trim() || searchQuery.isFetching}
              className="shrink-0 text-[14px]"
            >
              {searchQuery.isFetching && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              Search
            </PrimaryButton>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-semibold text-white">Within</p>
          <Segments<string>
            wrap
            items={[10, 25, 50, 100].map((miles) => ({
              value: String(miles),
              label: `${miles} miles`,
            }))}
            value={String(filters.radius_miles)}
            onChange={(v) => setFilters({ ...filters, radius_miles: Number(v) })}
          />
        </div>

        <div>
          <p className="mb-2 text-[13px] font-semibold text-white">Show</p>
          <Segments<string>
            wrap
            items={[
              { value: 'live', label: 'Open to bid' },
              { value: 'all', label: 'Open and closed' },
              { value: 'closed', label: 'Recently closed' },
            ]}
            value={filters.status || 'live'}
            onChange={(v) => setFilters({ ...filters, status: v })}
          />
        </div>

        <button type="button" onClick={() => setShowFilters(true)} className={quietBtn}>
          Value, sector and sort
        </button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col lg:min-h-0 lg:flex-1 lg:overflow-hidden"
      >
        <TabsList className="sticky top-0 z-10 flex h-auto w-full flex-wrap justify-start gap-2 rounded-none border-y border-white/[0.08] bg-[hsl(0_0%_8%)] px-4 py-2.5 sm:px-6 lg:static lg:border-t-0 lg:px-8">
          <TabsTrigger value="search" className={tabTrigger}>
            Results
            {opportunities.length > 0 && (
              <span className="ml-1.5 tabular-nums">{opportunities.length}</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="saved" className={tabTrigger}>
            Saved
            {(savedQuery.data?.length || 0) > 0 && (
              <span className="ml-1.5 tabular-nums">{savedQuery.data?.length}</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="sources" className={tabTrigger}>
            Sources
          </TabsTrigger>
        </TabsList>

        <div className="px-4 pb-8 pt-4 sm:px-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:px-8">
          <TabsContent value="search" className="m-0">
            {!activePostcode ? (
              <Note
                title="Find electrical contracts near you"
                text="Enter your postcode to see live tenders from councils, the NHS, housing associations and more."
              />
            ) : searchQuery.isLoading ? (
              <Spinner text="Searching" />
            ) : searchQuery.error ? (
              <Note title="Search failed" text={(searchQuery.error as Error).message} />
            ) : opportunities.length === 0 ? (
              <Note
                title="Nothing found"
                text="Try a wider distance or fewer filters. New tenders are added every day."
              />
            ) : (
              <>
                {stats && (
                  <p className="mb-3 text-[13px] text-white">
                    <span className="font-semibold">{stats.total}</span> found near {activePostcode}
                    {canSeeMoney && stats.avg_value > 0 && (
                      <>
                        , average{' '}
                        <span className="font-semibold">£{stats.avg_value.toLocaleString()}</span>
                      </>
                    )}
                  </p>
                )}
                <OpportunityList>
                  {opportunities.map((opp) => (
                    <OpportunityCard
                      key={opp.id}
                      opportunity={opp}
                      isSaved={isSaved(opp.id)}
                      onToggleSave={() => toggleSave(opp)}
                      onView={() => setSelectedOpportunity(opp)}
                      onStartTender={() => onStartTender?.(opp)}
                      showValue={canSeeMoney}
                    />
                  ))}
                </OpportunityList>
              </>
            )}
          </TabsContent>

          <TabsContent value="saved" className="m-0">
            {savedQuery.isLoading ? (
              <Spinner text="Loading saved tenders" />
            ) : (savedQuery.data?.length || 0) === 0 ? (
              <Note
                title="Nothing saved"
                text="Tap the bookmark on a tender to keep it here while you decide."
              />
            ) : (
              <OpportunityList>
                {savedQuery.data?.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    isSaved={true}
                    onToggleSave={() => removeSavedOpportunity.mutate(opp.id)}
                    onView={() => setSelectedOpportunity(opp)}
                    onStartTender={() => onStartTender?.(opp)}
                    showValue={canSeeMoney}
                  />
                ))}
              </OpportunityList>
            )}
          </TabsContent>

          {/* Sources: only the ones that actually feed the list (ELE-1994).
              The catalogue table lists 27, most of which have never synced. */}
          <TabsContent value="sources" className="m-0">
            <div className="mb-3">
              <h3 className="text-[16px] font-semibold tracking-tight text-white">
                {liveFeeds.length
                  ? `${liveFeeds.length} public tender sources`
                  : 'Public tender sources'}
              </h3>
              <p className="mt-0.5 max-w-2xl text-[13px] leading-relaxed text-white">
                Checked every morning. A notice drops off once its closing date passes. One with no
                closing date drops off after 14 days without an update from its source.
              </p>
            </div>

            {feedsQuery.isLoading ? (
              <Spinner text="Loading sources" />
            ) : liveFeeds.length === 0 ? (
              <Note
                title={feedsQuery.error ? "Couldn't load the sources" : 'No sources checked yet'}
                text={
                  feedsQuery.error
                    ? 'Check your connection, then open this tab again.'
                    : 'The morning check has not brought in any notices yet.'
                }
              />
            ) : (
              <div className={cn(panel, 'overflow-hidden')}>
                <ul className="divide-y divide-white/[0.07]">
                  {liveFeeds.map((source) => (
                    <li key={source.source} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold text-white">
                          {source.display_name}
                        </p>
                        <p className="mt-0.5 text-[13px] text-white">
                          {source.live} open now
                          {source.last_fetched
                            ? ` · checked ${new Date(source.last_fetched).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                            : ''}
                        </p>
                      </div>
                      {source.website_url && (
                        <IconButton
                          onClick={() => openExternalUrl(source.website_url!)}
                          aria-label={`Open ${source.display_name}`}
                          className="shrink-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </IconButton>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      <FormSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        width="wide"
        title="Value, sector and sort"
        description="Narrow by contract value, sector or sort order."
        bodyClassName="grid gap-4 lg:grid-cols-2 lg:items-start"
        footer={
          <PrimaryButton onClick={() => setShowFilters(false)} fullWidth>
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

        <FormCard eyebrow="Sector and sort">
          <Field label="Sector">
            <Select
              value={filters.sector || 'all'}
              onValueChange={(v) => setFilters({ ...filters, sector: v === 'all' ? undefined : v })}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="All sectors" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="all">All sectors</SelectItem>
                <SelectItem value="public">Public sector</SelectItem>
                <SelectItem value="local_authority">Local council</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="healthcare">NHS and healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Sort by">
            <Select
              value={filters.sort_by || 'deadline'}
              onValueChange={(v) =>
                setFilters({ ...filters, sort_by: v as SearchFilters['sort_by'] })
              }
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="deadline">Deadline (soonest first)</SelectItem>
                <SelectItem value="distance">Distance (nearest first)</SelectItem>
                {canSeeMoney && <SelectItem value="value">Value (highest first)</SelectItem>}
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FormCard>
      </FormSheet>

      {/* Opportunity Detail Sheet */}
      <OpportunityDetailSheet
        opportunity={selectedOpportunity}
        open={!!selectedOpportunity}
        onOpenChange={(open) => !open && setSelectedOpportunity(null)}
        onStartTender={(estimate) => {
          if (selectedOpportunity) {
            onStartTender?.(selectedOpportunity, estimate);
            setSelectedOpportunity(null);
          }
        }}
        isSaved={selectedOpportunity ? isSaved(selectedOpportunity.id) : false}
        onToggleSave={() => selectedOpportunity && toggleSave(selectedOpportunity)}
        canSeeMoney={canSeeMoney}
      />
    </div>
  );
}

function OpportunityList({ children }: { children: ReactNode }) {
  return (
    <div className={cn(panel, 'overflow-hidden')}>
      <ul className="divide-y divide-white/[0.07]">{children}</ul>
    </div>
  );
}

interface OpportunityCardProps {
  opportunity: TenderOpportunity;
  isSaved: boolean;
  onToggleSave: () => void;
  onView: () => void;
  onStartTender?: () => void;
  showValue?: boolean;
}

/** What kind of lead it is, and what to do about it. */
function kindOf(o: TenderOpportunity): string {
  if (o.status === 'closed') return 'Recently closed, approach the buyer';
  const t = o.opportunity_type || 'tender';
  if (t === 'planning') return 'Planning lead, approach early';
  if (t === 'award') return 'Award, pitch as a subcontractor';
  return 'Tender, open to bid';
}

function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSave,
  onView,
  showValue = true,
}: OpportunityCardProps) {
  const deadline = formatDeadline(opportunity.deadline);
  const deadlineText =
    opportunity.opportunity_type === 'planning' && !opportunity.deadline
      ? 'Pre-tender'
      : deadline.text;
  const detail = [
    opportunity.client_name,
    // Some sources append "Estimated value …" to the place name
    (opportunity.location_text || '').replace(/\s*Estimated value.*$/i, '').trim() || null,
    opportunity.distance_miles !== null && opportunity.distance_miles !== undefined
      ? `${opportunity.distance_miles} miles`
      : null,
    opportunity.sector ? getSectorDisplayName(opportunity.sector) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        onClick={onView}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onView();
          }
        }}
        className="flex min-h-[60px] cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60 sm:px-5"
      >
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-white">
            {opportunity.title}
          </p>
          {detail && <p className="mt-0.5 line-clamp-2 text-[13px] text-white">{detail}</p>}
          <p className="mt-0.5 text-[12.5px] font-medium text-white">
            <span className={deadline.urgent ? 'text-elec-yellow' : undefined}>{deadlineText}</span>
            {showValue && ` · ${formatOpportunityValue(opportunity)}`}
            {' · '}
            {kindOf(opportunity)}
            {opportunity.framework_required ? ' · Framework needed' : ''}
          </p>
        </div>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}
          className={cn('shrink-0', isSaved && 'border-elec-yellow text-elec-yellow')}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </IconButton>
        <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-white" />
      </div>
    </li>
  );
}

export default TenderOpportunitiesSection;
