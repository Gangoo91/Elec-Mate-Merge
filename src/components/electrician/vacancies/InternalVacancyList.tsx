import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Search, SlidersHorizontal, Briefcase, MapPin, RefreshCw, X, Mail, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { InternalVacancyCard, type InternalVacancy } from './InternalVacancyCard';
import {
  useInternalVacancies,
  useMyInvitations,
  useMyApplications,
  useRespondToInvitation,
  type VacancyFilters,
} from '@/hooks/useInternalVacancies';

const APPLICATION_STATUS_TONE: Record<string, string> = {
  New: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Reviewing: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Shortlisted: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  Interviewed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  Offered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Hired: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
};

interface InternalVacancyListProps {
  onApply: (vacancy: InternalVacancy) => void;
  onMessage: (vacancy: InternalVacancy) => void;
  onViewDetails: (vacancy: InternalVacancy) => void;
}

const EMPLOYMENT_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Temporary', label: 'Temporary' },
];

export function InternalVacancyList({
  onApply,
  onMessage,
  onViewDetails,
}: InternalVacancyListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<VacancyFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState<VacancyFilters>({});

  const {
    data: vacancies,
    isLoading,
    refetch,
    isRefetching,
  } = useInternalVacancies({
    ...filters,
    searchQuery: searchQuery || undefined,
  });
  const { data: invitations = [] } = useMyInvitations();
  const { data: myApplications = [] } = useMyApplications();
  const respondToInvitation = useRespondToInvitation();

  const handleDeclineInvitation = (invitationId: string) => {
    respondToInvitation.mutate(
      { invitationId, response: 'declined' },
      {
        onSuccess: () => toast.success('Invitation declined'),
        onError: () => toast.error('Could not decline the invitation — try again'),
      }
    );
  };

  const handleAcceptInvitation = (inv: {
    vacancy_id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vacancy?: any;
  }) => {
    // Find the full vacancy in the open list, else build enough for the dialog
    const full = (vacancies || []).find((v) => v.id === inv.vacancy_id);
    if (full) {
      onApply(full);
    } else if (inv.vacancy) {
      onApply({
        id: inv.vacancy.id,
        title: inv.vacancy.title,
        location: inv.vacancy.location,
        type: inv.vacancy.type || 'Full-time',
        status: 'Open',
        salary_min: null,
        salary_max: null,
        salary_period: 'annual',
        description: '',
        requirements: [],
        benefits: [],
        closing_date: null,
        views: 0,
        created_at: '',
        employer: inv.vacancy.employer,
        has_applied: false,
      } as InternalVacancy);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive through the query
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({});
    setTempFilters({});
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Invitations — employers asked YOU to apply */}
      {invitations.length > 0 && (
        <div className="space-y-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {invitations.map((inv: any) => (
            <div
              key={inv.id}
              className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.07] p-4"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-elec-yellow/15">
                  <Mail className="h-4 w-4 text-elec-yellow" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-white">
                    {inv.vacancy?.employer?.company_name || 'An employer'} invited you to apply
                  </p>
                  <p className="text-[12.5px] text-white/70 mt-0.5 truncate">
                    {inv.vacancy?.title}
                    {inv.vacancy?.location ? ` · ${inv.vacancy.location}` : ''}
                  </p>
                  {inv.message && (
                    <p className="text-[12px] text-white/60 mt-2 line-clamp-2">“{inv.message}”</p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation"
                  onClick={() => handleDeclineInvitation(inv.id)}
                  disabled={respondToInvitation.isPending}
                >
                  Decline
                </Button>
                <Button
                  className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                  onClick={() => handleAcceptInvitation(inv)}
                >
                  <Check className="h-4 w-4 mr-1.5" />
                  View & apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My applications — live status */}
      {myApplications.length > 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/50 font-medium mb-3">
            Your applications
          </p>
          <div className="space-y-2.5">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {myApplications.slice(0, 4).map((app: any) => (
              <div key={app.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-white truncate">{app.vacancy?.title || 'Vacancy'}</p>
                  <p className="text-[11.5px] text-white/50 truncate">
                    {app.vacancy?.employer?.company_name || 'Employer'}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium',
                    APPLICATION_STATUS_TONE[app.status] ||
                      'bg-white/[0.06] text-white/70 border-white/[0.1]'
                  )}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="flex gap-2">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies..."
              className={cn('pr-4', !searchQuery && 'pl-9')}
            />
          </div>
        </form>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTempFilters(filters);
            setShowFilters(true);
          }}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-elec-yellow text-black text-xs rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isRefetching}>
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <Badge variant="secondary" className="gap-1">
              <Briefcase className="h-3 w-3" />
              {filters.type}
              <button
                onClick={() => setFilters({ ...filters, type: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {filters.location}
              <button
                onClick={() => setFilters({ ...filters, location: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs">
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      {!isLoading && (
        <p className="text-sm text-white">
          {vacancies?.length || 0} {vacancies?.length === 1 ? 'vacancy' : 'vacancies'} found
        </p>
      )}

      {/* Vacancy List */}
      <div className="space-y-3">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : vacancies && vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <InternalVacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              onApply={onApply}
              onMessage={onMessage}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Briefcase className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No vacancies found</h3>
              <p className="text-white mb-4">
                {searchQuery || activeFilterCount > 0
                  ? 'Try adjusting your search or filters'
                  : 'Check back later for new opportunities'}
              </p>
              {(searchQuery || activeFilterCount > 0) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filter Vacancies</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Employment Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Employment Type</label>
              <Select
                value={tempFilters.type || 'all'}
                onValueChange={(v) =>
                  setTempFilters({ ...tempFilters, type: v === 'all' ? undefined : v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={tempFilters.location || ''}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, location: e.target.value || undefined })
                }
                placeholder="e.g. Manchester, London"
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Salary (Annual)</label>
              <Select
                value={tempFilters.minSalary?.toString() || 'any'}
                onValueChange={(v) =>
                  setTempFilters({
                    ...tempFilters,
                    minSalary: v === 'any' ? undefined : parseInt(v),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="25000">£25,000+</SelectItem>
                  <SelectItem value="30000">£30,000+</SelectItem>
                  <SelectItem value="35000">£35,000+</SelectItem>
                  <SelectItem value="40000">£40,000+</SelectItem>
                  <SelectItem value="45000">£45,000+</SelectItem>
                  <SelectItem value="50000">£50,000+</SelectItem>
                  <SelectItem value="60000">£60,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setTempFilters({});
                }}
              >
                Reset
              </Button>
              <Button
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
